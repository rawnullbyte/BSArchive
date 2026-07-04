'use strict';

// Made by NullByte for BS V67
// Special thanks to pri.nter, S.B., and risporce

// std::string reader
function fromsc(ptr) {
    if (!ptr || ptr.isNull()) return "";
    try {
        let stringPtr = ptr.add(4).readInt() >= 8 
            ? ptr.add(8).readPointer() 
            : ptr.add(8);
        return stringPtr.readUtf8String() || "";
    } catch (e) {
        return "";
    }
}

// Main Hook
const baseModule = Process.findModuleByName("libg.so");

if (baseModule) {
    const base = baseModule.base;
    console.log("[+] libg.so found at: " + base);

    const GameMain__Init = base.add(0x7F3470);

    const originalFunction = new NativeFunction(
        GameMain__Init,
        'pointer',
        ['pointer', 'pointer', 'pointer', 'uint32', 'uint32', 'pointer', 'int']
    );

    const replacementCallback = new NativeCallback(function (a1, a2, a3, a4, a5, a6, a7) {
        console.log("Triggered");
        // a6 contains players country code, to get it use: fromsc(ptr(a6))

        const ret = originalFunction(a1, a2, a3, a4, a5, a6, a7); // call to populate token offsets

        console.log(
            `sessionToken: ${
                fromsc(
                    ptr(a1).add(152)
            )}`
        );

        console.log(
            `playerToken: ${
                fromsc(
                    ptr(a1).add(688)
            )}`
        );
        
        // Scanner used to find offsets
        
        // console.log(" --- scanning a1+0 .. a1+2000 as std::string ---");
        // for (let off = 0; off <= 2000; off++) {
        //     try {
        //         const s = fromsc(n_a1.add(off));
        //         if (s && s.length > 0 && /^[\x20-\x7E]+$/.test(s)) {
        //             console.log(" [+" + off + "] " + s);
        //         }
        //     } catch (e) {}
        // }
        // console.log(" --- scan complete ---");
        

        return ret;
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'uint32', 'pointer', 'int']);

    Interceptor.replace(GameMain__Init, replacementCallback);
    console.log("[+] Interceptor.replace successfully applied at " + GameMain__Init);

} else {
    console.log("[-] libg.so not found");
}