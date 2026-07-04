const Libg = {
  init() {
    Libg.module = Process.findModuleByName("libg.so");
    Libg.size = Libg.module.size;
    Libg.begin = Libg.module.base;
    Libg.end = ptr(Libg.begin.toInt32() + Libg.size);
  },
  offset(value) {
    return Libg.begin.add(value);
  },
};

const Armceptor = {
  replace(ptr, arr) {
    Memory.protect(ptr, arr.length, "rwx");
    Memory.writeByteArray(ptr, arr);
    Memory.protect(ptr, arr.length, "rx");
  },
  jumpout(addr, target) {
    Memory.patchCode(addr, Process.pageSize, function (code) {
      var writer = new ArmWriter(code, {
        pc: addr,
      });
      writer.putBranchAddress(target);
      writer.flush();
    });
  },
  ret(ptr) {
    Armceptor.replace(ptr, [0x1E, 0xFF, 0x2F, 0xE1]);
  },
};

const Connect = {
  init() {
    Interceptor.attach(Module.findExportByName(null, "getaddrinfo"), {
      onEnter(args) {
        if (args[1].readUtf8String() == "9339") {
          args[0].writeUtf8String("127.0.0.1");
          SetupMessaging.init();
        }
      },
    });
  },
};

const SetupMessaging = {
  init() {
    Interceptor.replace(
      Libg.offset(0xE86AD0),
      new NativeCallback(
        function () {
          console.warn("[+][PepperCrypto::secretbox_open] Skipped decryption");
          return 1;
        },
        "int",
        [],
      ),
    );

    Interceptor.attach(Libg.offset(0x1310000), {
      // Messaging::sendPepperAuthentication
      onEnter(args) {
        this.messaging = args[0];
        console.warn(
          "[+][PepperState::State][1] Pepper State Is",
          Memory.readU32(this.messaging.add(24)),
        );
        Memory.writeU32(this.messaging.add(24), 5);
        args[1] = args[2];
        console.warn(
          "[+][PepperState::State][2] Pepper State Is",
          Memory.readU32(this.messaging.add(24)),
        );
      },
      onLeave(retval) {
        Memory.writeU32(this.messaging.add(24), 5);
        console.warn(
          "[+][PepperState::State][3] Pepper State Is",
          Memory.readU32(this.messaging.add(24)),
        );
      },
    });

    Interceptor.attach(Libg.offset(0xE87C30), function () {
      // Messaging::encryptAndWrite
      this.context.w0 = this.context.w8; // not tested
    });
  },
};

setTimeout(() => {
  Libg.init();
  Connect.init();
}, 1000);