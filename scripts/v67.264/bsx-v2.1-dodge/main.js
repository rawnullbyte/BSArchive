const INJECT_DELAY_MS = 6500;
let _loadScheduled = !1;

function scheduleLoad() {
    _loadScheduled || (_loadScheduled = !0, setTimeout(load, 6500))
}

function load() {
    "use strict";
    let t = !0,
        e = !1,
        n = "",
        r = null,
        i = null,
        o = !0,
        c = !1,
        a = !1,
        l = 0,
        f = 0;
    let u = !1,
        s = !1,
        d = !1,
        y = !1,
        m = 0,
        g = 0,
        p = null,
        v = null,
        h = null,
        M = null;
    const b = Process.getModuleByName("libg.so").base,
        N = 12119776,
        S = 9785056,
        w = 7978812,
        x = 11876968,
        U = 8426312,
        A = 12127116,
        B = 8399200,
        E = 11422236,
        T = 11422244,
        P = 11422152,
        I = 11421436,
        _ = 12126760,
        L = 12125824,
        F = 12126632,
        C = 11015628,
        D = 11015756,
        k = 11016048,
        O = 18153904,
        R = 10728748,
        j = 10352716,
        q = 11235644,
        K = 8475104,
        G = 8398668,
        X = 5838404,
        J = 14481648,
        Y = 8490204,
        V = 19108832,
        H = 12902348,
        $ = 5864520,
        z = 12903160,
        W = 12793504,
        Z = 5866136,
        Q = 12675916,
        tt = 12502976,
        et = 12504672,
        nt = 12699916,
        rt = 12703664,
        it = 12675944,
        ot = 12703056,
        ct = 5881860,
        at = 5883912,
        lt = 5882920,
        ft = 12770204,
        ut = 12676776,
        st = (t, e, n) => new NativeFunction(b.add(t), e, n),
        dt = st(17758960, "pointer", ["uint64"]),
        yt = st(E, "int32", ["pointer"]),
        mt = st(T, "int32", ["pointer"]),
        gt = st(P, "uint32", ["pointer"]),
        pt = st(I, "pointer", ["pointer"]),
        vt = st(C, "uint32", ["pointer"]),
        ht = st(D, "uint32", ["pointer"]),
        Mt = st(R, "uint32", ["pointer"]),
        bt = st(_, "pointer", ["pointer"]),
        Nt = st(L, "uint32", ["pointer"]),
        St = st(S, "pointer", []),
        wt = (st(F, "pointer", ["pointer"]), st(j, "uint32", ["pointer", "int32", "int32", "int32", "int32"]), st(x, "pointer", ["pointer", "int"])),
        xt = st(w, "void", ["pointer", "pointer"]),
        Ut = st(A, "void", ["pointer", "int32", "int32", "int32"]),
        At = (st(q, "uint32", ["pointer", "uint32", "int32"]), new NativeFunction(b.add(k), "bool", ["pointer"])),
        Bt = (st(ft, "pointer", ["pointer", "pointer"]), st(B, "int", ["pointer", "pointer"])),
        Et = st(ut, "void", ["pointer"]),
        Tt = st(X, "pointer", []),
        Pt = st(Y, "void", ["pointer", "pointer", "int", "int"]),
        It = st(J, "pointer", ["pointer", "pointer"]),
        _t = st($, "void", ["pointer"]),
        Lt = st(z, "void", ["pointer", "pointer", "bool"]),
        Ft = st(W, "pointer", ["pointer", "pointer", "double"]),
        Ct = st(Z, "pointer", ["pointer", "pointer", "bool"]),
        Dt = st(Q, "void", ["pointer", "float", "float"]),
        kt = st(tt, "pointer", ["pointer", "int"]),
        Ot = st(et, "pointer", ["pointer", "pointer"]),
        Rt = st(nt, "void", ["pointer", "int"]),
        jt = st(rt, "pointer", ["pointer", "pointer"]),
        qt = st(it, "void", ["pointer", "float"]),
        Kt = (st(ot, "pointer", ["pointer", "pointer"]), st(ct, "void", ["pointer", "pointer", "pointer", "int", "int"]), st(at, "void", ["pointer", "int", "int"]), st(lt, "void", ["pointer"]), function() {
            try {
                return Process.getModuleByName("libc.so").findExportByName("malloc")
            } catch (t) {}
            const t = Module.findExportByName(null, "malloc");
            if (t) return t;
            throw new Error("malloc not found")
        }()),
        Gt = new NativeFunction(Kt, "pointer", ["uint"]);
    ! function() {
        try {
            var t = Module.findExportByName(null, "free");
            return t ? new NativeFunction(t, "void", ["pointer"]) : null
        } catch (t) {
            return null
        }
    }();

    function Xt(t) {
        const e = Gt(40);
        return It(e, Memory.allocUtf8String(t)), e
    }

    function Jt(t) {
        try {
            const e = Tt();
            if (!e || e.isNull()) return;
            const n = Xt(t);
            if (!n || n.isNull()) return;
            Pt(e, n, 0, -1)
        } catch (t) {}
    }
    const Yt = {
        lastN: 5,
        projSpd: 3800,
        timeMul: .95
    };

    function Vt(t) {
        const e = [];
        return {
            data: e,
            add: n => {
                e.push(n), e.length > t && e.shift()
            },
            setMax: n => {
                for (t = n; e.length > t;) e.shift()
            }
        }
    }
    const Ht = Vt(Yt.lastN),
        $t = Vt(Yt.lastN),
        zt = Vt(Yt.lastN - 1);
    let Wt = 0,
        Zt = null,
        Qt = -1;

    function te(t, e, n, r) {
        return function(t, e, n, r) {
            return Math.sqrt((n - t) ** 2 + (r - e) ** 2)
        }(t, e, n, r) / Yt.projSpd
    }
    let ee = !1;

    function ne(t, e, n) {
        try {
            const r = St();
            if (!r || r.isNull()) return !1;
            const i = r.add(88).readPointer();
            if (!i || i.isNull()) return !1;
            const o = dt(64);
            return !(!o || o.isNull()) && (wt(o, t), o.add(12).writeS32(Math.round(e)), o.add(16).writeS32(Math.round(n)), ee = !0, xt(i, o), ee = !1, !0)
        } catch (t) {
            return ee = !1, !1
        }
    }
    const re = (t, e) => ne(2, t, e),
        ie = {
            active: !1
        };
    let oe = 0,
        ce = 0,
        ae = null,
        le = 0,
        fe = 0,
        ue = null,
        se = 0,
        de = 0,
        ye = 720,
        me = {},
        ge = [],
        pe = [];

    function ve() {
        const t = Math.max(4, Math.min(64, he.rd || 24));
        pe = [];
        for (let e = 0; e < t; e++) {
            const n = 2 * Math.PI * e / t;
            pe.push({
                x: Math.cos(n),
                y: Math.sin(n)
            })
        }
    }
    let he = {
        margin: 40,
        lockMs: 120,
        maxAge: 550,
        rateMs: 0,
        coastMs: 80,
        hitMul: 1.35,
        evadeLen: 360,
        minTTC: 1,
        rd: 24,
        wm: 60
    };
    ve();

    function Me(t, e, n) {
        if (!n || !n.length) return null;
        let r = null,
            i = 902500;
        for (const o of n) {
            const n = t - o.x,
                c = e - o.y,
                a = n * n + c * c;
            a < i && (i = a, r = o)
        }
        return r ? {
            id: r.brawlerId
        } : null
    }

    function be(t, e, n, r) {
        const i = Ie();
        if (!i) return !0;
        const o = _e(),
            c = Le(),
            a = t / 300 | 0,
            l = e / 300 | 0,
            f = n / 300 | 0,
            u = r / 300 | 0;
        if (a === f && l === u) return !0;
        let s = a,
            d = l,
            y = 60;
        const m = f > a ? 1 : -1,
            g = u > l ? 1 : -1,
            p = Math.abs(f - a),
            v = Math.abs(u - l);
        let h = p - v;
        for (; y-- > 0;) {
            if (s >= 0 && s < o && d >= 0 && d < c) try {
                if (64 & i[d * o + s]) return !1
            } catch (t) {}
            const t = 2 * h;
            if (t > -v && (h -= v, s += m), t < p && (h += p, d += g), s === f && d === u) return !0
        }
        return !0
    }

    function Ne(t, e, n, r, i, o) {
        const c = n - t,
            a = r - e,
            l = c * c + a * a;
        if (l < 1) {
            const n = i - t,
                r = o - e;
            return n * n + r * r
        }
        let f = ((i - t) * c + (o - e) * a) / l;
        f < 0 && (f = 0), f > 1 && (f = 1);
        const u = i - (t + c * f),
            s = o - (e + a * f);
        return u * u + s * s
    }

    function Se(t, e) {
        const n = Ie();
        if (!n) return !1;
        const r = _e(),
            i = Le(),
            o = Math.floor(t / 300),
            c = Math.floor(e / 300);
        if (o < 0 || o >= r || c < 0 || c >= i) return !1;
        if (128 & n[c * r + o]) return !0;
        if (he.wm > 0) {
            const a = t - 300 * o,
                l = e - 300 * c,
                f = he.wm,
                u = [];
            a < f && o > 0 && u.push(c * r + (o - 1)), a > 300 - f && o + 1 < r && u.push(c * r + (o + 1)), l < f && c > 0 && u.push((c - 1) * r + o), l > 300 - f && c + 1 < i && u.push((c + 1) * r + o);
            for (let t = 0; t < u.length; t++)
                if (128 & n[u[t]]) return !0
        }
        return !1
    }

    function we(t, e, n, r, i) {
        const o = n - t,
            c = r - e,
            a = Math.sqrt(o * o + c * c);
        if (a < 1) return !Se(t, e);
        const l = o / a,
            f = c / a,
            u = Math.ceil(a / 70);
        for (let n = 0; n <= u; n++) {
            const r = n / u,
                a = t + o * r,
                s = e + c * r;
            if (Se(a, s)) return !1;
            if (i > 0) {
                const t = -f * i,
                    e = l * i;
                if (Se(a + t, s + e) || Se(a - t, s - e)) return !1
            }
        }
        return !0
    }

    function xe(t, e) {
        for (let n = 0; n < ge.length; n++) {
            const r = ge[n];
            if (Ne(r.ox, r.oy, r.tx, r.ty, t, e) <= r.rad2) return !0
        }
        return !1
    }

    function Ue(t, e, n, r, i, o) {
        if (Se(t, e)) return -99999;
        const c = t - n,
            a = e - r,
            l = Math.sqrt(c * c + a * a);
        let f = l;
        if (i || o) {
            let t = 0;
            for (let e = 0; e < ge.length; e++) {
                const c = ge[e],
                    a = c.ox - n,
                    l = c.oy - r,
                    f = Math.sqrt(a * a + l * l);
                if (f > 0) {
                    const e = i * (a / f) + o * (l / f);
                    e > t && (t = e)
                }
            }
            const e = i * c + o * a;
            f += t > .1 ? 1 * e : 2.4 * e
        }
        for (let n = 0; n < ge.length; n++) {
            const r = ge[n],
                i = Ne(r.ox, r.oy, r.tx, r.ty, t, e);
            i < r.rad2 && (f -= .003 * (r.rad2 - i))
        }
        for (let t = 0; t < ge.length; t++) {
            const e = ge[t],
                i = e.ox - n,
                o = e.oy - r,
                u = Math.sqrt(i * i + o * o);
            if (u > 0 && l > 0) {
                const t = c / l * (i / u) + a / l * (o / u);
                t > .15 && (f -= 200 * t)
            }
        }
        return f
    }

    function Ae(t, e, n, r) {
        const i = Date.now();
        if (i - de < he.rateMs) return;
        de = i;
        const o = Math.floor(e / 300),
            c = Math.floor(n / 300);
        if (ye = Ce.mySpeed || 720, function(t, e, n) {
                const r = {};
                for (const i of e) {
                    const e = i.gid;
                    if (r[e] = !0, me[e]) {
                        const r = me[e],
                            o = i.x - r.lx,
                            c = i.y - r.ly,
                            a = Math.sqrt(o * o + c * c);
                        if (a > 5 && (r.dx = o / a, r.dy = c / a, r.raw = !1), !r.matched) {
                            const t = Me(i.x, i.y, n);
                            t && (r.matched = !0, r.owner = t.id, r.scaled = (i.radius || 8) * he.hitMul)
                        }
                        r.x = i.x, r.y = i.y, r.lx = i.x, r.ly = i.y, r.tick = t
                    } else {
                        const r = Me(i.x, i.y, n);
                        let o = 0,
                            c = 0;
                        null !== i.spawnAngle && void 0 !== i.spawnAngle && isFinite(i.spawnAngle) && (o = Math.cos(i.spawnAngle), c = Math.sin(i.spawnAngle)), me[e] = {
                            x: i.x,
                            y: i.y,
                            dx: o,
                            dy: c,
                            spd: i.speed,
                            rad: i.radius,
                            scaled: (i.radius || 8) * he.hitMul,
                            lx: i.x,
                            ly: i.y,
                            tick: t,
                            raw: !0,
                            owner: r ? r.id : 0,
                            matched: !!r,
                            losOk: !1,
                            losX: -999,
                            losY: -999,
                            losTx: -999,
                            losTy: -999
                        }
                    }
                }
                for (const e in me) !r[e] && t - me[e].tick > 300 && delete me[e]
            }(i, Ce.projectiles || [], Ce.enemies || []), function(t, e, n, r, i) {
                ge.length = 0;
                for (const o in me) {
                    const c = me[o];
                    if (c.raw) continue;
                    if (c.losTx === r && c.losTy === i && c.losX === Math.floor(c.x / 300) && c.losY === Math.floor(c.y / 300) || (c.losOk = be(c.x, c.y, t, e), c.losTx = r, c.losTy = i, c.losX = Math.floor(c.x / 300), c.losY = Math.floor(c.y / 300)), !c.losOk) continue;
                    if (he.minTTC > 0 && c.spd > 0) {
                        const n = c.x - t,
                            r = c.y - e,
                            i = Math.sqrt(n * n + r * r);
                        if (c.dx * (-n / (i || 1)) + c.dy * (-r / (i || 1)) < .1) continue;
                        if (i / c.spd > he.minTTC) continue
                    }
                    const a = n + (c.scaled || c.rad) + he.margin,
                        l = Math.min(.65 * c.spd, 1800);
                    ge.push({
                        ox: c.x,
                        oy: c.y,
                        tx: c.x + c.dx * l,
                        ty: c.y + c.dy * l,
                        rad: a,
                        rad2: a * a,
                        dx: c.dx,
                        dy: c.dy,
                        spd: c.spd
                    })
                }
            }(e, n, r, o, c), se > i) {
            if (ue && we(e, n, e + ue.x * he.evadeLen, n + ue.y * he.evadeLen, r)) {
                const r = Math.round(e + ue.x * he.evadeLen),
                    i = Math.round(n + ue.y * he.evadeLen);
                return Ut(t, r, i, 0), void re(r, i)
            }
            se = 0
        }
        const a = xe(e, n),
            l = i < fe,
            f = le > 0 && i - le >= he.maxAge;
        if (ae && !l && !a) return se = i + he.coastMs, ue = ae, ae = null, le = 0, void(fe = 0);
        if (f && !a) return ae = null, le = 0, void(fe = 0);
        if (ae && (a || l)) {
            const i = Math.round(e + ae.x * he.evadeLen),
                o = Math.round(n + ae.y * he.evadeLen);
            if (we(e, n, i, o, r) && !xe(i, o)) return Ut(t, i, o, 0), void re(i, o)
        }
        if (a) {
            if (Math.abs(oe) <= .05 && Math.abs(ce) <= .05 && ae) return ae = null, le = 0, void(fe = 0);
            const r = function(t, e, n, r, i) {
                let o = null,
                    c = -99999,
                    a = null,
                    l = -99999;
                for (let n = 0; n < pe.length; n++) {
                    const f = pe[n];
                    let u = null,
                        s = null;
                    for (let n = 80; n <= 380; n += 80) {
                        const r = t + f.x * n,
                            i = e + f.y * n;
                        if (Se(r, i)) break;
                        s = {
                            x: r,
                            y: i
                        }, xe(r, i) || (u = {
                            x: r,
                            y: i
                        })
                    }
                    if (u) {
                        const n = Ue(u.x, u.y, t, e, r, i);
                        n > c && (c = n, o = u)
                    }
                    if (s) {
                        const n = Ue(s.x, s.y, t, e, r, i);
                        n > l && (l = n, a = s)
                    }
                }
                return o || a
            }(e, n, 0, oe, ce);
            if (r) {
                const o = r.x - e,
                    c = r.y - n,
                    a = Math.sqrt(o * o + c * c);
                if (a > 1) {
                    const e = {
                        x: o / a,
                        y: c / a
                    };
                    return (!ae || Math.abs(e.x - ae.x) + Math.abs(e.y - ae.y) > .05) && (le = i, fe = i + he.lockMs, ne(10, -1, -1)), ae = e, Ut(t, r.x, r.y, 0), void re(r.x, r.y)
                }
            }
        }
        ae = null, le = 0, fe = 0
    }
    let Be = null,
        Ee = 0,
        Te = 0,
        Pe = null;

    function Ie() {
        return Be
    }

    function _e() {
        return Ee
    }

    function Le() {
        return Te
    }
    Interceptor.attach(b.add(10338704), {
        onEnter(t) {
            Pe = t[0]
        }
    }), setInterval(function() {
        if (Pe && !Pe.isNull()) try {
            ! function(t) {
                Pe = t;
                const e = t.add(12).readU32(),
                    n = t.add(16).readU32();
                if (e < 2 || e > 200 || n < 2 || n > 200) return;
                const r = t.add(20).readPointer();
                if (!r || r.isNull()) return;
                const i = e * n,
                    o = r.readByteArray(i);
                o && (Be = o, Ee = e, Te = n)
            }(Pe)
        } catch (t) {}
    }, 1e3);
    let Fe = 0;
    const Ce = {
        ownCharacter: ptr(0),
        myTeamId: 0,
        myX: 0,
        myY: 0,
        myRadius: 60,
        mySpeed: 720,
        myBrawlerId: 0,
        myBrawlerName: null,
        enemies: [],
        projectiles: [],
        lastUpdate: 0
    };
    let De = {};

    function ke(t) {
        for (var e = 0; e < 4; e++) try {
            var n = [72, 80, 64, 88][e],
                r = t.add(n).readPointer();
            if (!r || r.isNull()) continue;
            var i = r.readCString();
            if (!i) continue;
            if (0 === i.indexOf("hero_icon_")) return i.slice(10).toUpperCase();
            if (i.length > 2 && i.length < 32 && /^[A-Za-z0-9_]+$/.test(i)) return i.toUpperCase()
        } catch (t) {}
        return null
    }
    const Oe = "/data/local/tmp/brawlx_key.txt";

    function Re(t) {
        try {
            const e = Process.getModuleByName("libc.so"),
                n = new NativeFunction(e.findExportByName("popen"), "pointer", ["pointer", "pointer"]),
                r = new NativeFunction(e.findExportByName("fgets"), "pointer", ["pointer", "int", "pointer"]),
                i = new NativeFunction(e.findExportByName("pclose"), "int", ["pointer"]),
                o = n(Memory.allocUtf8String(t), Memory.allocUtf8String("r"));
            if (!o || o.isNull()) return "";
            const c = Memory.alloc(256);
            let a, l = "";
            for (; !(a = r(c, 256, o)).isNull();) l += c.readUtf8String();
            return i(o), l.trim()
        } catch (t) {
            return ""
        }
    }

    function je(t) {
        Re("echo '" + t + "' > " + Oe)
    }
    let qe = "",
        Ke = 12e3,
        Ge = null,
        Xe = null;
    var Je = "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        Ye = "";

    function Ve(t) {
        try {
            var e = Process.getModuleByName("libc.so"),
                n = new NativeFunction(e.findExportByName("popen"), "pointer", ["pointer", "pointer"]),
                r = new NativeFunction(e.findExportByName("fgets"), "pointer", ["pointer", "int", "pointer"]),
                i = new NativeFunction(e.findExportByName("pclose"), "int", ["pointer"]),
                o = n(Memory.allocUtf8String(t), Memory.allocUtf8String("r"));
            if (o.isNull()) return "";
            for (var c = "", a = Memory.alloc(256); !r(a, 256, o).isNull();) c += a.readUtf8String();
            return i(o), c.trim()
        } catch (t) {
            return ""
        }
    }

    function He(t, e) {
        for (var n = Math.ceil((e || 12e3) / 1e3), r = ["curl -sk -A '" + Je + "' --max-time " + n + " --connect-timeout 8 '" + t + "'", "/system/bin/curl -sk --max-time " + n + " '" + t + "'", "toybox wget -q -O - '" + t + "'", "busybox wget -q -O - '" + t + "'", "wget -q -O - '" + t + "'"], i = 0; i < r.length; i++) {
            var o = Ve(r[i]);
            if (o && o.length > 0 && "{" === o.charAt(0)) return o;
            if (o && o.length > 0 && 0 === i) return o
        }
        return ""
    }

    function $e(t, e, n) {
        var r = He(t, e);
        r || (Ye += (Ye ? "; " : "") + "shell-empty"), n(r)
    }

    function ze(t, e, n) {
        Ye = "";
        var r = !1;
        try {
            r = "undefined" != typeof Java && Java.available
        } catch (t) {
            r = !1
        }
        if (!r) return Ye = "no-java-bridge", void $e(t, e, n);
        try {
            Java.perform(function() {
                ! function() {
                    if (Xe) return !0;
                    try {
                        return Xe = Java.registerClass({
                            name: "brawlx.HttpRunnable",
                            implements: [Java.use("java.lang.Runnable")],
                            methods: {
                                run: function() {
                                    var t = "",
                                        e = "",
                                        n = 0;
                                    try {
                                        var r = Java.use("java.net.URL").$new(qe),
                                            i = Java.cast(r.openConnection(), Java.use("java.net.HttpURLConnection"));
                                        i.setConnectTimeout(8e3), i.setReadTimeout(0 | Ke), i.setRequestMethod("GET"), i.setInstanceFollowRedirects(!0), i.setRequestProperty("User-Agent", Je), i.setRequestProperty("Accept", "application/json,text/plain,*/*");
                                        try {
                                            n = i.getResponseCode()
                                        } catch (t) {
                                            e = "connect: " + t.message
                                        }
                                        var o = null;
                                        try {
                                            o = n >= 200 && n < 400 ? i.getInputStream() : i.getErrorStream()
                                        } catch (t) {
                                            e = "stream: " + t.message, o = null
                                        }
                                        if (o) {
                                            for (var c, a = Java.use("java.io.BufferedReader").$new(Java.use("java.io.InputStreamReader").$new(o)); null !== (c = a.readLine());) t += c;
                                            a.close()
                                        }
                                        try {
                                            i.disconnect()
                                        } catch (t) {}
                                    } catch (n) {
                                        e = "java: " + n.message, t = ""
                                    }
                                    var l = t,
                                        f = e,
                                        u = n;
                                    setTimeout(function() {
                                        Ye = f || "HTTP " + u;
                                        var t = Ge;
                                        Ge = null, t && t(l)
                                    }, 0)
                                }
                            }
                        }), !0
                    } catch (t) {
                        return Ye = "registerClass: " + t.message, Xe = null, !1
                    }
                }() ? $e(t, e, n): (qe = t, Ke = e || 12e3, Ge = function(r) {
                    r && r.length > 0 ? n(r) : $e(t, e, n)
                }, Java.use("java.lang.Thread").$new(Xe.$new()).start())
            })
        } catch (r) {
            Ye = "perform: " + r.message, $e(t, e, n)
        }
    }

    function We(e) {
        t = !0;
        const n = e.expiresIn || "?";
        !0 === e.premium ? (_activatePremium(), Jt("<cffaa00>* PREMIUM KEY LOADED *</c>"), setTimeout(function() {
            Jt("<cffd700>Premium active for: " + n + "</c>")
        }, 1500), setTimeout(function() {
            Jt("<cffd700>Enhanced dodge + aimbot ON</c>")
        }, 3e3)) : Jt("<c00ff00>Key OK! Expires in: " + n + "</c>"), setTimeout(function() {
            try {
                Kn()
            } catch (t) {}
        }, 300)
    }
    const Ze = ["https://brawlxx.tech", "https://brawlxx.brawlx.workers.dev"];

    function Qe(t, e, n) {
        var r = 0;
        ! function i() {
            r >= Ze.length ? n("") : ze(Ze[r++] + t, e, function(t) {
                t && t.length > 0 ? n(t) : i()
            })
        }()
    }

    function tn(e, r) {
        const i = ["<cffffff>Checking...</c>", "<cffaa00>Retrying...</c>", "<cff8800>Last attempt...</c>"];
        Jt(i[(r = r || 1) - 1] || i[2]), Qe("/check?key=" + e, 12e3, function(i) {
            if (!i || 0 === i.length) return r < 3 ? void tn(e, r + 1) : void Jt("<cff0000>Server unreachable. Try again in 30s.</c>");
            try {
                const r = JSON.parse(i);
                !0 === r.valid ? (je(e), We(r)) : (t = !1, n = "", Jt("<cff0000>" + (r.reason || "Invalid key") + "!</c>"))
            } catch (t) {
                Jt("<cff0000>Bad server response</c>")
            }
        })
    }

    function en() {
        return (r || "????").substring(0, 4).toUpperCase()
    }

    function nn() {
        Qe("/check?hwid=" + r, 12e3, function(e) {
            if (e) try {
                var n = JSON.parse(e);
                !0 === n.active ? (i && (clearInterval(i), i = null), t = !0, n.validUntil && Jt("<c00ff00>ACTIVATED - Valid until: " + n.validUntil + "</c>"), !0 === n.premium && (_activatePremium(), Jt("<cffaa00>PREMIUM ACTIVE</c>"))) : Jt("<cffd700>Not activated | Code: KEY:" + en() + " | Visit brawlxx.tech</c>")
            } catch (t) {}
        })
    }
    let rn = null,
        on = 0,
        cn = 1080,
        an = 2340,
        ln = !1,
        fn = [];
    const un = 32,
        sn = new Float32Array(un),
        dn = new Float32Array(un);
    ! function() {
        for (let t = 0; t < un; t++) {
            const e = t * (2 * Math.PI / un);
            sn[t] = Math.cos(e), dn[t] = Math.sin(e)
        }
    }();
    let yn = {},
        mn = 0,
        gn = -1,
        pn = -1,
        vn = 0;
    const hn = new Float32Array(12288),
        Mn = new Uint8Array(hn.buffer),
        bn = Memory.alloc(hn.byteLength);
    let Nn = 0;
    const Sn = new Float32Array(16);

    function wn(t, e) {
        try {
            const n = Process.findModuleByName(t);
            if (!n) return null;
            let r = null;
            try {
                r = n.findExportByName(e)
            } catch (t) {}
            if (!r) try {
                r = n.getExportByName(e)
            } catch (t) {}
            return r
        } catch (t) {
            return null
        }
    }

    function xn() {
        if (!ln) try {
            if (! function() {
                    const t = ["libGLESv2.so", "libGLES_mali.so", "libGLES_adreno.so", "libGL.so"];
                    let e = null;
                    for (const n of t)
                        if (wn(n, "glCreateShader")) {
                            e = n;
                            break
                        } if (!e) return !1;
                    const n = (t, n, r) => new NativeFunction(wn(e, t), n, r);
                    return yn.cs = n("glCreateShader", "uint", ["uint"]), yn.ss = n("glShaderSource", "void", ["uint", "int", "pointer", "pointer"]), yn.cps = n("glCompileShader", "void", ["uint"]), yn.cp = n("glCreateProgram", "uint", []), yn.as = n("glAttachShader", "void", ["uint", "uint"]), yn.lp = n("glLinkProgram", "void", ["uint"]), yn.ds = n("glDeleteShader", "void", ["uint"]), yn.up = n("glUseProgram", "void", ["uint"]), yn.gal = n("glGetAttribLocation", "int", ["uint", "pointer"]), yn.eva = n("glEnableVertexAttribArray", "void", ["uint"]), yn.vap = n("glVertexAttribPointer", "void", ["uint", "int", "uint", "uint8", "int", "pointer"]), yn.da = n("glDrawArrays", "void", ["uint", "int", "int"]), yn.gb = n("glGenBuffers", "void", ["int", "pointer"]), yn.bb = n("glBindBuffer", "void", ["uint", "uint"]), yn.bd = n("glBufferData", "void", ["uint", "int64", "pointer", "uint"]), yn.en = n("glEnable", "void", ["uint"]), yn.dis = n("glDisable", "void", ["uint"]), yn.bf = n("glBlendFunc", "void", ["uint", "uint"]), yn.lw = n("glLineWidth", "void", ["float"]), !0
                }()) return;
            const t = yn.cs(35633);
            if (t) {
                const e = Memory.allocUtf8String("attribute vec2 p;attribute vec4 vc;varying vec4 fc;void main(){fc=vc;gl_Position=vec4(p,0.0,1.0);}"),
                    n = Memory.alloc(Process.pointerSize);
                n.writePointer(e), yn.ss(t, 1, n, ptr(0)), yn.cps(t)
            }
            const e = yn.cs(35632);
            if (e) {
                const t = Memory.allocUtf8String("precision mediump float;varying vec4 fc;void main(){gl_FragColor=fc;}"),
                    n = Memory.alloc(Process.pointerSize);
                n.writePointer(t), yn.ss(e, 1, n, ptr(0)), yn.cps(e)
            }
            if (!t || !e) return;
            if (mn = yn.cp(), !mn) return;
            yn.as(mn, t), yn.as(mn, e), yn.lp(mn), yn.ds(t), yn.ds(e), gn = yn.gal(mn, Memory.allocUtf8String("p")), pn = yn.gal(mn, Memory.allocUtf8String("vc"));
            const n = Memory.alloc(4);
            yn.gb(1, n), vn = n.readU32(), ln = !0
        } catch (t) {}
    }

    function Un(t, e, n) {
        const r = Sn,
            i = -e,
            o = r[0] * t + r[4] * i + r[12],
            c = r[1] * t + r[5] * i + r[13],
            a = r[3] * t + r[7] * i + r[15];
        if (a <= 1e-6) return void(n.v = !1);
        const l = 1 / a;
        n.x = (o * l * .5 + .5) * cn, n.y = (1 - (c * l * .5 + .5)) * an, n.v = !0
    }

    function An(t, e, n, r, i, o, c) {
        const a = 6 * t;
        hn[a] = e, hn[a + 1] = n, hn[a + 2] = r, hn[a + 3] = i, hn[a + 4] = o, hn[a + 5] = c
    }

    function Bn(t, e, n, r, i, o, c, a, l) {
        return t + 2 > 2048 ? t : (An(t, e, n, o, c, a, l), An(t + 1, r, i, o, c, a, l), t + 2)
    }

    function En(t, e, n, r, i, o, c) {
        const a = e / cn * 2 - 1,
            l = 1 - n / an * 2,
            f = 60 / cn,
            u = 80 / an,
            s = a - f / 2,
            d = a + f / 2;
        return t = Bn(t, s, l, d, l, r, i, o, c), t = Bn(t, d, l, d, l + u, r, i, o, c), t = Bn(t, d, l + u, s, l + u, r, i, o, c), t = Bn(t, s, l + u, s, l, r, i, o, c)
    }
    let Tn = !1;

    function Pn() {
        if (!d || !rn || rn.isNull() || !Ce.lastUpdate) return fn = [], cn = 1080, an = 2340, void(Nn = 0);
        if (! function() {
                if (!rn || rn.isNull()) return !1;
                try {
                    if (cn = rn.add(2180).readFloat(), an = rn.add(2184).readFloat(), cn <= 0 || an <= 0) return !1;
                    const t = rn.add(2024).readByteArray(64);
                    if (!t) return !1;
                    const e = new DataView(t);
                    for (let t = 0; t < 16; t++) Sn[t] = e.getFloat32(4 * t, !0);
                    return !0
                } catch (t) {
                    return !1
                }
            }()) return void(Nn = 0);
        const t = Ce.myX,
            e = Ce.myY,
            n = {
                x: 0,
                y: 0,
                v: !1
            };
        Un(t, e, n);
        let r = 0;
        if (Ce.myRadius > 0) {
            const n = [];
            for (let t = 0; t < un; t++) n.push({
                x: 0,
                y: 0,
                v: !1
            });
            ! function(t, e, n, r) {
                for (let i = 0; i < un; i++) Un(t + sn[i] * n, e + dn[i] * n, r[i])
            }(t, e, 3 * Ce.myRadius, n);
            for (let t = 0; t < un; t++) {
                const e = n[t],
                    i = n[(t + 1) % un];
                e.v && i.v && (r = Bn(r, e.x / cn * 2 - 1, 1 - e.y / an * 2, i.x / cn * 2 - 1, 1 - i.y / an * 2, .2, .9, .95, .55))
            }
        }
        for (const i of Ce.enemies) {
            if (Un(i.x, i.y, n), !n.v) continue;
            const o = n.x,
                c = n.y;
            if (!(o < -500 || o > cn + 500 || c < -500 || c > an + 500) && (r = En(r, o, c, 1, .2, .2, .9), i.gid === String(Qt) && n.v)) {
                const n = {
                    x: 0,
                    y: 0,
                    v: !1
                };
                Un(t, e, n), n.v && (r = Bn(r, n.x / cn * 2 - 1, 1 - n.y / an * 2, o / cn * 2 - 1, 1 - c / an * 2, 1, 1, .15, .95))
            }
        }
        Nn = r
    }
    Interceptor.attach(b.add(N), {
        onEnter(e) {
            try {
                const r = e[0];
                if (!r || r.isNull()) return;
                if (!t) return;
                if (Zt = r, ie.ownCharacter = bt(r), ie.ownTeamId = Nt(r), !ie.ownCharacter || ie.ownCharacter.isNull()) return;
                if (function(t) {
                        const e = Date.now();
                        if (!(e - Fe < 33)) {
                            Fe = e;
                            try {
                                const r = bt(t);
                                if (!r || r.isNull()) return void(Ce.lastUpdate = 0);
                                Ce.ownCharacter = r, Ce.myTeamId = Nt(t), Ce.myX = 0 | yt(r), Ce.myY = 0 | mt(r), Ce.mySpeed = 720;
                                const i = pt(r);
                                if (i && !i.isNull()) {
                                    Ce.myRadius = Mt(i) || 60;
                                    try {
                                        Ce.myBrawlerId = 0 | i.add(24).readU8()
                                    } catch (t) {}
                                    try {
                                        const t = i.add(452).readU32();
                                        t >= 300 && t <= 2500 && (Ce.mySpeed = t)
                                    } catch (t) {}
                                    try {
                                        var n = ke(i);
                                        n && (Ce.myBrawlerName = n)
                                    } catch (t) {}
                                }
                                const o = t.add(40).readPointer();
                                if (!o || o.isNull()) return;
                                const c = o.add(0).readPointer(),
                                    a = o.add(12).readU32();
                                if (!c || c.isNull() || 0 === a || a > 1200) return;
                                const l = b.add(O),
                                    f = 8,
                                    u = [],
                                    s = [];
                                for (let t = 0; t < a; t++) try {
                                    const e = c.add(t * f).readPointer();
                                    if (!e || e.isNull()) continue;
                                    const n = e.add(64).readU32(),
                                        i = n !== Ce.myTeamId,
                                        o = pt(e);
                                    if (!o || o.isNull()) continue;
                                    if (o.readPointer().equals(l)) {
                                        if (!i) continue;
                                        if (0 !== e.add(208).readU32()) continue;
                                        let t = null;
                                        try {
                                            const n = e.add(184).readFloat();
                                            isFinite(n) && (t = n)
                                        } catch (t) {}
                                        s.push({
                                            gid: gt(e).toString(),
                                            x: 0 | yt(e),
                                            y: 0 | mt(e),
                                            speed: vt(o) || 1200,
                                            radius: 1.05 * (ht(o) || 8),
                                            spawnAngle: t,
                                            isBeam: At(o)
                                        })
                                    } else {
                                        if (!i || e.equals(r)) continue;
                                        if (0 !== e.add(208).readU32()) continue;
                                        const t = gt(e).toString();
                                        let c = De[t];
                                        void 0 === c && (c = ke(o), De[t] = c);
                                        let a = 0;
                                        try {
                                            const t = o.add(452).readU32();
                                            t >= 300 && t <= 8500 && (a = t)
                                        } catch (t) {}
                                        u.push({
                                            gid: t,
                                            brawlerName: c,
                                            x: 0 | yt(e),
                                            y: 0 | mt(e),
                                            brawlerId: 0 | o.add(24).readU8(),
                                            teamId: n,
                                            moveSpeed: a
                                        })
                                    }
                                } catch (t) {}
                                const d = new Set(u.map(t => t.gid));
                                for (const t of Object.keys(De)) null === De[t] || d.has(t) || delete De[t];
                                Ce.enemies = u, Ce.projectiles = s, Ce.lastUpdate = e
                            } catch (t) {}
                        }
                    }(r), a && Ce.lastUpdate > 0 && Date.now() - f > 600) try {
                    var n = .0174533 * l;
                    l = (l + 120) % 360, re(Ce.myX + (203 * Math.cos(n) + .5) | 0, Ce.myY + (203 * Math.sin(n) + .5) | 0)
                } catch (t) {}
                if (ie.active && Ce.lastUpdate > 0) {
                    const t = Ce.myX,
                        e = Ce.myY;
                    Ae(r, t, e, Ce.myRadius || 60), ie.isDodging = !!ae
                } else ie.isDodging = !1;
                if (Ce.lastUpdate > 0) try {
                    Pn()
                } catch (t) {}
                if (Ce.lastUpdate > 0 && c) try {
                    ! function() {
                        if (!c || !rn || rn.isNull()) return;
                        const t = Ce.ownCharacter;
                        if (!t || t.isNull()) return;
                        const e = Ce.myX,
                            n = Ce.myY,
                            r = 784e4;
                        let i = 1e18,
                            o = 0,
                            a = 0;
                        for (const t of Ce.enemies) {
                            const c = t.x - e,
                                l = t.y - n,
                                f = c * c + l * l;
                            f >= r || f >= i || be(e, n, t.x, t.y) && (i = f, o = t.x, a = t.y)
                        }
                        if (!(i >= r)) {
                            rn.add(3844).writeS32(o), rn.add(3848).writeS32(a), rn.add(3692).writeS32(o), rn.add(3696).writeS32(a), rn.add(1644).writeS32(0);
                            try {
                                Bt(rn, t)
                            } catch (t) {}
                        }
                    }()
                } catch (t) {}
            } catch (t) {}
        }
    });
    const In = new NativeFunction(b.add(w), "void", ["pointer", "pointer"]);
    Interceptor.replace(b.add(w), new NativeCallback((t, e) => {
            if (e && !e.isNull()) try {
                const t = e.add(8).readS32();
                if (2 === t) {
                    const t = e.add(12).readS32(),
                        n = e.add(16).readS32(),
                        r = Math.sqrt(t * t + n * n);
                    if (!(r > 20) || ee || a && Date.now() - f < 200 || (oe = t / r, ce = n / r), ie.active && (ie.isDodging || ie.extActive || ie.forceBlock) && !ee) return
                } else if (10 === t && ie.active && (ie.isDodging || ie.extActive || ie.forceBlock) && !ee) return
            } catch (t) {}
            In(t, e)
        }, "void", ["pointer", "pointer"])), Interceptor.attach(b.add(K), {
            onLeave(e) {
                if (!t) return;
                if (!e || e.equals(ptr(0))) return;
                const n = Date.now();
                let r = -1;
                try {
                    r = gt(e)
                } catch (t) {}(r !== Qt || 0 !== Wt && n - Wt > 250) && (Ht.data.length = 0, $t.data.length = 0, zt.data.length = 0, Wt = 0, Qt = r), Ht.add(yt(e)), $t.add(mt(e)), 0 !== Wt && zt.add(n - Wt), Wt = n
            }
        }), Interceptor.attach(b.add(G), {
            onEnter(n) {
                if (!t) return;
                if (0 === parseInt(n[6])) return;
                if (!o || !Zt) return;
                if (Ht.data.length < 1) return;
                const r = bt(Zt);
                if (!r || r.isNull()) return;
                const i = yt(r),
                    c = mt(r),
                    a = Ht.data[Ht.data.length - 1],
                    l = $t.data[$t.data.length - 1];
                let f = a,
                    u = l;
                if (Ht.data.length >= 2) {
                    const t = function(t) {
                        if (Ht.data.length < 2 || zt.data.length < 1) return {
                            x: Ht.data[Ht.data.length - 1] || 0,
                            y: $t.data[$t.data.length - 1] || 0
                        };
                        if (e && Ht.data.length >= 3) {
                            const e = Ht.data.length - 1,
                                n = zt.data[e - 1] / 1e3,
                                r = zt.data[e - 2] / 1e3;
                            if (n > 0 && r > 0) {
                                const i = (Ht.data[e] - Ht.data[e - 1]) / n,
                                    o = ($t.data[e] - $t.data[e - 1]) / n,
                                    c = (Ht.data[e - 1] - Ht.data[e - 2]) / r,
                                    a = ($t.data[e - 1] - $t.data[e - 2]) / r,
                                    l = Math.sqrt(i * i + o * o),
                                    f = Math.sqrt(c * c + a * a);
                                if (l > 50 && f > 50) {
                                    const n = (i * c + o * a) / (l * f);
                                    if (Math.acos(Math.max(-1, Math.min(1, n))) > 2) {
                                        const n = Math.min(t, .25);
                                        return {
                                            x: Ht.data[e] + i * n,
                                            y: $t.data[e] + o * n
                                        }
                                    }
                                }
                            }
                        }
                        let n = 0,
                            r = 0,
                            i = 0;
                        for (let t = 1; t < Ht.data.length; t++) {
                            const e = zt.data[t - 1] / 1e3;
                            if (e <= 0) continue;
                            const o = t;
                            n += (Ht.data[t] - Ht.data[t - 1]) / e * o, r += ($t.data[t] - $t.data[t - 1]) / e * o, i += o
                        }
                        const o = i > 0 ? n / i : 0,
                            c = i > 0 ? r / i : 0,
                            a = Ht.data[Ht.data.length - 1],
                            l = $t.data[$t.data.length - 1],
                            f = Math.sqrt(o * o + c * c);
                        if (f < 1) return {
                            x: a,
                            y: l
                        };
                        if (f > 2200 || isNaN(f)) return {
                            x: a,
                            y: l
                        };
                        const u = a + o * t,
                            s = l + c * t;
                        return isNaN(u) || isNaN(s) ? {
                            x: a,
                            y: l
                        } : {
                            x: u,
                            y: s
                        }
                    }(Yt.timeMul * te(i, c, a, l));
                    isNaN(t.x) || isNaN(t.y) || (f = t.x, u = t.y)
                }
                const s = f - i,
                    d = u - c;
                s * s + d * d < 6400 || (n[5] = ptr(0), n[1] = ptr(Math.round(f)), n[2] = ptr(Math.round(u)))
            }
        }), Interceptor.attach(b.add(U), {
            onEnter(t) {
                rn = t[0], on = Date.now()
            }
        }),
        function() {
            if (!Tn) try {
                const t = Process.findModuleByName("libEGL.so");
                if (!t) return;
                let e = null;
                try {
                    e = t.findExportByName("eglSwapBuffers")
                } catch (t) {}
                if (!e) try {
                    e = t.getExportByName("eglSwapBuffers")
                } catch (t) {}
                if (!e) try {
                    e = Module.findExportByName(null, "eglSwapBuffersWithDamageKHR")
                } catch (t) {}
                if (!e) return;
                Interceptor.attach(e, {
                    onEnter: function() {
                        ln || xn(),
                            function() {
                                if (!(!d || !ln || cn <= 0 || an <= 0))
                                    if (Date.now() - on > 2e3) Nn = 0;
                                    else if (Nn) try {
                                    bn.writeByteArray(Mn.subarray(0, 24 * Nn)), yn.dis(2929), yn.dis(2884), yn.dis(3089), yn.en(3042), yn.bf(770, 771), yn.up(mn), yn.bb(34962, vn), yn.bd(34962, 24 * Nn, bn, 35048), yn.eva(gn), yn.vap(gn, 2, 5126, 0, 24, ptr(0)), yn.eva(pn), yn.vap(pn, 4, 5126, 0, 24, ptr(8)), yn.lw(2.5), yn.da(1, 0, Nn), yn.up(0), yn.bb(34962, 0)
                                } catch (t) {}
                            }()
                    }
                }), Tn = !0
            } catch (t) {}
        }();
    const _n = [];
    Interceptor.attach(b.add(H), {
        onEnter(t) {
            try {
                const e = t[0];
                if (!e || e.isNull()) return;
                for (const t of _n) try {
                    if (t.btn && !t.btn.isNull() && e.equals(t.btn)) return void t.callback()
                } catch (t) {}
            } catch (t) {}
        }
    });
    let Ln = null;

    function Fn(t) {
        try {
            if (v) try {
                Et(v)
            } catch (t) {}
        } catch (t) {
            v = null, Ln = null
        }
        try {
            kt(Memory.allocUtf8String("sc/debug.sc"), 0);
            var e = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
            if (!e || e.isNull()) return;
            var n = Gt(544);
            n.writeByteArray(new Array(544).fill(0)), _t(n), Lt(n, e, 0), Rt(e, 1), Ct(n, Xt("FPS: " + t), 1);
            var r = jt(e, Memory.allocUtf8String("Text"));
            if (!r || r.isNull()) return;
            Dt(r, -55, 70);
            var i = b.add(V).readPointer();
            if (!i || i.isNull()) return;
            Ft(i, r, 99999), p = n, v = r, Ln = i
        } catch (t) {
            p = null, v = null, Ln = null
        }
    }

    function Cn() {
        try {
            if (m = 0, !M) try {
                M = Interceptor.attach(b.add(4934524), {
                    onEnter: function() {
                        m++
                    }
                })
            } catch (t) {}
            h && clearInterval(h), h = setInterval(function() {
                var t = m;
                m = 0, Fn(t)
            }, 1e3), Fn(0)
        } catch (t) {
            setTimeout(Cn, 800)
        }
    }

    function Dn(t, e, n, r) {
        var i = null,
            o = function() {
                i && (clearTimeout(i), i = null);
                try {
                    kt(Memory.allocUtf8String("sc/ui.sc"), 0);
                    var c = Ot(Memory.allocUtf8String("sc/ui.sc"), Memory.allocUtf8String("map_editor_exit_button"));
                    if (!c || c.isNull()) return i = setTimeout(o, 50), null;
                    var a = Gt(544);
                    a.writeByteArray(new Array(544).fill(0)), _t(a), Lt(a, c, 1);
                    var l = Gt(128);
                    l.writeByteArray(new Array(128).fill(0)), It(l, Memory.allocUtf8String(t)), Ct(a, l, 1), Dt(a, e, n), a.add(78).writeU8(1), Rt(c, 1);
                    var f = b.add(V).readPointer();
                    if (!f || f.isNull()) return i = setTimeout(o, 50), null;
                    Ft(f, a, 99999);
                    var u = jt(c, Memory.allocUtf8String("Text"));
                    return _n.push({
                        btn: a,
                        mc: c,
                        callback: r,
                        name: t
                    }), {
                        btn: a,
                        mc: c,
                        tf: u,
                        mem: a
                    }
                } catch (t) {
                    return i = setTimeout(o, 50), null
                }
            };
        return o()
    }
    const kn = [];
    let On = null;
    const Rn = [];
    let jn = null;

    function qn(t) {
        if (t) try {
            t.btn && !t.btn.isNull() && Dt(t.btn, -9999, -9999)
        } catch (t) {}
    }

    function Kn() {
        for (const t of kn) {
            try {
                qn(t)
            } catch (t) {}
            Rn.push(t)
        }
        if (kn.length = 0, On) {
            try {
                qn(On)
            } catch (t) {}
            Rn.push(On), On = null
        }! function() {
            if (jn) return;
            let t = 0,
                e = 33;
            jn = setInterval(function n() {
                for (const t of Rn) try {
                    t.btn && !t.btn.isNull() && Dt(t.btn, -9999, -9999)
                } catch (t) {}
                t++, 33 === e && t >= 60 && (clearInterval(jn), e = 250, jn = setInterval(n, 250))
            }, 33)
        }()
    }

    function Gn() {
        if (kn.length > 0) return;
        ["1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].forEach(function(t, e) {
            t.split("").forEach(function(t, r) {
                const i = Dn(t, 40 + 68 * r, 250 + 70 * e, function() {
                    n += t, Jt("<cffffff>Key: " + n + "</c>")
                });
                i && kn.push(i)
            })
        });
        const t = Dn("DEL", 516, 530, function() {
            n.length > 0 && (n = n.slice(0, -1), Jt("<cffffff>Key: " + n + "</c>"))
        });
        t && kn.push(t);
        const e = Dn("SEND", 40, 530, function() {
            if (u) {
                const t = parseInt(n.trim());
                return !isNaN(t) && t > 0 ? (Yt.projSpd = t, Jt("Speed set: <c00ff00>" + t + "</c>")) : Jt("<cff0000>Invalid number!</c>"), u = !1, n = "", void Kn()
            }
            0 !== n.trim().length ? tn(n.trim()) : Jt("<cff0000>No key entered!</c>")
        });
        e && kn.push(e), Jt("<cffffff>Type your key</c>")
    }

    function Xn() {
        try {
            const L = b.add(V).readPointer();
            if (!L || L.isNull()) return void setTimeout(Xn, 1e3);
            kt(Memory.allocUtf8String("sc/ui.sc"), 0), kt(Memory.allocUtf8String("sc/debug.sc"), 0);
            const F = Dn("KEY", 50, 100, function() {
                t ? Jt("<c00ff00>Key already validated!</c>") : Gn()
            });
            F && (On = F);
            var e = [],
                n = null,
                r = null,
                i = null;

            function C() {
                if (i && (clearInterval(i), i = null), n) {
                    try {
                        Et(n)
                    } catch (t) {}
                    n = null
                }
                if (r) {
                    try {
                        Et(r)
                    } catch (t) {}
                    r = null
                }
                for (const t of e)
                    if (t && t.btn) try {
                        Et(t.btn)
                    } catch (t) {}
                e = [], u.length && k(), N.length && O(), s = !1
            }

            function D() {
                const i = b.add(V).readPointer();
                if (!i || i.isNull()) return !1;
                kt(Memory.allocUtf8String("sc/ui.sc"), 0), kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                var u = Ot(Memory.allocUtf8String("sc/ui.sc"), Memory.allocUtf8String("clan_select_badge"));
                if (!u || u.isNull()) return !1;
                Dt(u, 510, 45), qt(u, .7);
                const s = Gt(544);
                s.writeByteArray(new Array(544).fill(0)), _t(s), Lt(s, u, 0), s.add(78).writeU8(1), Ft(i, s, 99999), n = s;
                var N = Gt(544);
                N.writeByteArray(new Array(544).fill(0)), _t(N), Lt(N, u, 0), N.add(78).writeU8(1), Ft(i, N, 99999), r = N, kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                const S = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                if (S && !S.isNull()) {
                    var w = Gt(544);
                    w.writeByteArray(new Array(544).fill(0)), _t(w), Rt(S, 1), Lt(w, S, 0), Ct(w, Xt("BSX <cff00ff>V2.1</c>"), 1);
                    var x = jt(S, Memory.allocUtf8String("Text"));
                    x && !x.isNull() && (Dt(x, 380, 115), Ft(i, x, 99999), e.push({
                        btn: x
                    }));
                    var U = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                    if (U && !U.isNull()) {
                        var A = Gt(544);
                        A.writeByteArray(new Array(544).fill(0)), _t(A), Rt(U, 1), Lt(A, U, 0), Ct(A, Xt("<cff0000>disc</c><cffaa00>ord</c><c00ff44>.gg</c><c00ddff>/BS</c><c4488ff>X</c>"), 1);
                        var B = jt(U, Memory.allocUtf8String("Text"));
                        B && !B.isNull() && (Dt(B, 570, 115), Ft(i, B, 99999), e.push({
                            btn: B
                        }))
                    }
                }(O = Dn("DODGE", 340, 170, function() {
                    t ? (ie.active = !ie.active, Jt(ie.active ? "DODGE <c00ff00>ON</c>" : "DODGE <cff0000>OFF</c>")) : Jt("<cff0000>Enter key first!</c>")
                })) && e.push(O);
                var E = Dn("AIMBOT", 430, 170, function() {
                    t ? (o = !o, Jt(o ? "AIMBOT <c00ff00>ON</c>" : "AIMBOT <cff0000>OFF</c>")) : Jt("<cff0000>Enter key first!</c>")
                });
                E && e.push(E);
                var T = Dn("KILLAURA", 520, 170, function() {
                    t ? (c = !c, Jt(c ? "KILLAURA <c00ff00>ON</c> <cff0000>(</c><cff7700>C</c><cffaa00>r</c><c00ff00>e</c><c00ff88>d</c><c00ffff>i</c><c0088ff>t</c><c4400ff>s</c> <cff0000>t</c><cff7700>o</c> <cffaa00>R</c><c00ff00>E</c><c00ff88>v</c><c00ffff>e</c><c0088ff>n</c><c4400ff>g</c><cff0000>e</c><cff7700>!</c><cffaa00>)</c>" : "KILLAURA <cff0000>OFF</c>")) : Jt("<cff0000>Enter key first!</c>")
                });
                T && e.push(T);
                var P = Dn("AUTO-SPIN", 610, 220, function() {
                    t ? (a = !a, l = 0, f = 0, Jt(a ? "AUTO-SPIN <c00ff00>ON</c>" : "AUTO-SPIN <cff0000>OFF</c>")) : Jt("<cff0000>Enter key first!</c>")
                });
                P && e.push(P);
                var I = Dn("FPS", 700, 170, function() {
                    t ? (y = !y, y ? Cn() : function() {
                        if (M) {
                            try {
                                M.detach()
                            } catch (t) {}
                            M = null
                        }
                        if (h && (clearInterval(h), h = null), v) try {
                            Et(v)
                        } catch (t) {}
                        if (p) try {
                            qn({
                                btn: p
                            })
                        } catch (t) {}
                        p = null, v = null, Ln = null, m = 0, g = 0
                    }(), Jt(y ? "FPS <c00ff00>ON</c>" : "FPS <cff0000>OFF</c>")) : Jt("<cff0000>Enter key first!</c>")
                });
                I && e.push(I);
                var _ = Dn("DODGE Sets", 340, 220, function() {
                    t ? R() : Jt("<cff0000>Enter key first!</c>")
                });
                _ && e.push(_);
                var L = Dn("Aimbot Sets", 430, 220, function() {
                    t ? j() : Jt("<cff0000>Enter key first!</c>")
                });
                L && e.push(L);
                var F = Dn("Empty-Pin", 520, 220, function() {
                    if (t) try {
                        var e = St();
                        if (!e || e.isNull()) return void Jt("<cff0000>No battle!</c>");
                        var n = e.add(88).readPointer();
                        if (!n || n.isNull()) return void Jt("<cff0000>No input mgr</c>");
                        var r = dt(64);
                        if (!r || r.isNull()) return void Jt("<cff0000>Alloc failed</c>");
                        for (var i = new NativePointer(r), o = 0; o < 64; o++) i.add(o).writeU8(0);
                        wt(r, 9), r.add(36).writeU32(0), xt(n, r), Jt("<c00ff00>Empty pin sent!</c>")
                    } catch (t) {
                        Jt("<cff0000>PIN error</c>")
                    } else Jt("<cff0000>Enter key first!</c>")
                });
                F && e.push(F);
                var D = Dn("ESP", 610, 170, function() {
                    t ? (d = !d, d || (Nn = 0), Jt(d ? "ESP <c00ff00>ON</c> <cff0000>(</c><cff7700>C</c><cffaa00>r</c><c00ff00>e</c><c00ff88>d</c><c00ffff>i</c><c0088ff>t</c><c4400ff>s</c> <cff0000>t</c><cff7700>o</c> <cffaa00>R</c><c00ff00>E</c><c00ff88>v</c><c00ffff>e</c><c0088ff>n</c><c4400ff>g</c><cff0000>e</c><cff7700>!</c><cffaa00>)</c>" : "ESP <cff0000>OFF</c>")) : Jt("<cff0000>Enter key first!</c>")
                });
                D && e.push(D);
                var k = [{
                    t: "CLOSE",
                    x: 515,
                    y: 405,
                    cb: function() {
                        C()
                    }
                }];
                for (const t of k) {
                    var O;
                    (O = Dn(t.t, t.x, t.y, t.cb)) && e.push(O)
                }
                return !0
            }
            var u = [],
                N = [],
                S = null,
                w = null;
            try {
                kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                var x = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                if (x && !x.isNull()) {
                    var U = Gt(544);
                    if (U && !U.isNull()) {
                        U.writeByteArray(new Array(544).fill(0)), _t(U), Lt(U, x, 0), Rt(x, 1), Ct(U, Xt("<cffd700>Dodge Settings</c>"), 1);
                        var A = jt(x, Memory.allocUtf8String("Text"));
                        A && !A.isNull() && (S = A)
                    }
                }
                var B = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                if (B && !B.isNull()) {
                    var E = Gt(544);
                    if (E && !E.isNull()) {
                        E.writeByteArray(new Array(544).fill(0)), _t(E), Lt(E, B, 0), Rt(B, 1), Ct(E, Xt("<cffd700>Aimbot Settings</c>"), 1);
                        var T = jt(B, Memory.allocUtf8String("Text"));
                        T && !T.isNull() && (w = T)
                    }
                }
            } catch (q) {}

            function k() {
                for (var t = 0; t < u.length; t++) {
                    var e = u[t];
                    if (e && e.btn && !e.btn.isNull()) try {
                        Et(e.btn)
                    } catch (t) {}
                }
                u = []
            }

            function O() {
                for (var t = 0; t < N.length; t++) {
                    var e = N[t];
                    if (e && e.btn && !e.btn.isNull()) try {
                        Et(e.btn)
                    } catch (t) {}
                }
                N = []
            }

            function R() {
                try {
                    C();
                    const i = b.add(V).readPointer();
                    if (!i || i.isNull()) return;
                    kt(Memory.allocUtf8String("sc/ui.sc"), 0), kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                    var t = Ot(Memory.allocUtf8String("sc/ui.sc"), Memory.allocUtf8String("clan_select_badge"));
                    if (!t || t.isNull()) return;

                    function o() {
                        var e = Gt(544);
                        return !e || e.isNull() ? null : (e.writeByteArray(new Array(544).fill(0)), _t(e), Lt(e, t, 0), e.add(78).writeU8(1), Ft(i, e, 99999), e)
                    }
                    Dt(t, 510, 45), qt(t, .7);
                    var e = o();
                    e && u.push({
                        btn: e
                    });
                    var n = o();
                    n && u.push({
                        btn: n
                    });
                    var r = {};

                    function c(t, e, n, r) {
                        var i = Dn(t, e, n, r);
                        return i && u.push(i), i
                    }

                    function a(t, e, n) {
                        kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                        var r = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                        if (r && !r.isNull()) {
                            var o = Gt(544);
                            o.writeByteArray(new Array(544).fill(0)), _t(o), Rt(r, 1), Lt(o, r, 0), Ct(o, Xt(t), 1);
                            var c = jt(r, Memory.allocUtf8String("Text"));
                            c && !c.isNull() && (Dt(c, e, n), Ft(i, c, 99999), u.push({
                                btn: c
                            }))
                        }
                    }

                    function l(t, e, n) {
                        kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                        var r = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                        if (!r || r.isNull()) return null;
                        var o = Gt(544);
                        o.writeByteArray(new Array(544).fill(0)), _t(o), Rt(r, 1), Lt(o, r, 0), Ct(o, Xt(t), 1);
                        var c = jt(r, Memory.allocUtf8String("Text"));
                        return !c || c.isNull() ? null : (Dt(c, e, n), Ft(i, c, 99999), u.push({
                            btn: c
                        }), {
                            btn: c
                        })
                    }

                    function f(t, e, n, r, o) {
                        if (t[e]) try {
                            Et(t[e].btn)
                        } catch (t) {}
                        kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                        var c = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                        if (c && !c.isNull()) {
                            var a = Gt(544);
                            a.writeByteArray(new Array(544).fill(0)), _t(a), Rt(c, 1), Lt(a, c, 0), Ct(a, Xt(n), 1);
                            var l = jt(c, Memory.allocUtf8String("Text"));
                            l && !l.isNull() && (Dt(l, r, o), Ft(i, l, 99999), u.push({
                                btn: l
                            }), t[e] = {
                                btn: l
                            })
                        }
                    }
                    S && (Dt(S, 380, 120), Ft(i, S, 99999), u.push({
                        btn: S
                    })), r.pr = l("" + he.rd, 570, 170), a("Dodge Rays:", 205, 170), c("<cff0000>-</c>", 462, 180, function() {
                        he.rd > 8 && (he.rd -= 2), ve(), f(r, "pr", "" + he.rd, 570, 170), Jt("Dodge Rays: " + he.rd)
                    }), c("<c00ff00>+</c>", 554, 180, function() {
                        he.rd < 48 && (he.rd += 2), ve(), f(r, "pr", "" + he.rd, 570, 170), Jt("Dodge Rays: " + he.rd)
                    }), r.wm = l("" + he.wm, 570, 225), a("Collision Margin:", 205, 225), c("<cff0000>-</c>", 462, 235, function() {
                        he.wm > 0 && (he.wm -= 5), f(r, "wm", "" + he.wm, 570, 225), Jt("Collision Margin: " + he.wm)
                    }), c("<c00ff00>+</c>", 554, 235, function() {
                        he.wm < 200 && (he.wm += 5), f(r, "wm", "" + he.wm, 570, 225), Jt("Collision Margin: " + he.wm)
                    }), r.ev = l("" + he.evadeLen, 570, 280), a("Dodge Length:", 205, 280), c("<cff0000>-</c>", 462, 290, function() {
                        he.evadeLen > 50 && (he.evadeLen -= 25), f(r, "ev", "" + he.evadeLen, 570, 280), Jt("Dodge Length: " + he.evadeLen)
                    }), c("<c00ff00>+</c>", 554, 290, function() {
                        he.evadeLen < 600 && (he.evadeLen += 25), f(r, "ev", "" + he.evadeLen, 570, 280), Jt("Dodge Length: " + he.evadeLen)
                    }), c("BACK", 520, 405, function() {
                        k(), D(), s = !0
                    }), s = !0
                } catch (d) {
                    Jt("<cff0000>Dodge error</c>")
                }
            }

            function j() {
                try {
                    C();
                    const i = b.add(V).readPointer();
                    if (!i || i.isNull()) return;
                    kt(Memory.allocUtf8String("sc/ui.sc"), 0), kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                    var t = Ot(Memory.allocUtf8String("sc/ui.sc"), Memory.allocUtf8String("clan_select_badge"));
                    if (!t || t.isNull()) return;

                    function o() {
                        var e = Gt(544);
                        return !e || e.isNull() ? null : (e.writeByteArray(new Array(544).fill(0)), _t(e), Lt(e, t, 0), e.add(78).writeU8(1), Ft(i, e, 99999), e)
                    }
                    Dt(t, 510, 45), qt(t, .7);
                    var e = o();
                    e && N.push({
                        btn: e
                    });
                    var n = o();
                    n && N.push({
                        btn: n
                    });
                    var r = {};

                    function c(t, e, n, r) {
                        var i = Dn(t, e, n, r);
                        return i && N.push(i), i
                    }

                    function a(t, e, n) {
                        kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                        var r = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                        if (r && !r.isNull()) {
                            var o = Gt(544);
                            o.writeByteArray(new Array(544).fill(0)), _t(o), Rt(r, 1), Lt(o, r, 0), Ct(o, Xt(t), 1);
                            var c = jt(r, Memory.allocUtf8String("Text"));
                            c && !c.isNull() && (Dt(c, e, n), Ft(i, c, 99999), N.push({
                                btn: c
                            }))
                        }
                    }

                    function l(t, e, n) {
                        kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                        var r = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                        if (!r || r.isNull()) return null;
                        var o = Gt(544);
                        o.writeByteArray(new Array(544).fill(0)), _t(o), Rt(r, 1), Lt(o, r, 0), Ct(o, Xt(t), 1);
                        var c = jt(r, Memory.allocUtf8String("Text"));
                        return !c || c.isNull() ? null : (Dt(c, e, n), Ft(i, c, 99999), N.push({
                            btn: c
                        }), {
                            btn: c
                        })
                    }

                    function f(t, e, n, r, o) {
                        if (t[e]) try {
                            Et(t[e].btn)
                        } catch (t) {}
                        kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                        var c = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                        if (c && !c.isNull()) {
                            var a = Gt(544);
                            a.writeByteArray(new Array(544).fill(0)), _t(a), Rt(c, 1), Lt(a, c, 0), Ct(a, Xt(n), 1);
                            var l = jt(c, Memory.allocUtf8String("Text"));
                            l && !l.isNull() && (Dt(l, r, o), Ft(i, l, 99999), N.push({
                                btn: l
                            }), t[e] = {
                                btn: l
                            })
                        }
                    }
                    w && (Dt(w, 380, 120), Ft(i, w, 99999), N.push({
                        btn: w
                    })), r.s = l("" + Yt.projSpd, 570, 170), a("Projectile Speed:", 205, 170), c("<cff0000>-</c>", 462, 180, function() {
                        Yt.projSpd > 2e3 && (Yt.projSpd -= 100), f(r, "s", "" + Yt.projSpd, 570, 170), Jt("Projectile Speed: " + Yt.projSpd)
                    }), c("<c00ff00>+</c>", 554, 180, function() {
                        Yt.projSpd < 8e3 && (Yt.projSpd += 100), f(r, "s", "" + Yt.projSpd, 570, 170), Jt("Projectile Speed: " + Yt.projSpd)
                    }), r.t = l("" + Yt.timeMul.toFixed(2), 570, 225), a("Foresight:", 205, 225), c("<cff0000>-</c>", 462, 235, function() {
                        Yt.timeMul > .5 && (Yt.timeMul = Math.round(100 * (Yt.timeMul - .05)) / 100), f(r, "t", "" + Yt.timeMul.toFixed(2), 570, 225), Jt("Foresight: " + Yt.timeMul.toFixed(2))
                    }), c("<c00ff00>+</c>", 554, 235, function() {
                        Yt.timeMul < 2 && (Yt.timeMul = Math.round(100 * (Yt.timeMul + .05)) / 100), f(r, "t", "" + Yt.timeMul.toFixed(2), 570, 225), Jt("Foresight: " + Yt.timeMul.toFixed(2))
                    }), r.n = l("" + Yt.lastN, 570, 280), a("Position Logging:", 205, 280), c("<cff0000>-</c>", 462, 290, function() {
                        Yt.lastN > 3 && (Yt.lastN--, Ht.setMax(Yt.lastN), $t.setMax(Yt.lastN), zt.setMax(Yt.lastN - 1)), f(r, "n", "" + Yt.lastN, 570, 280), Jt("Position Logging: " + Yt.lastN)
                    }), c("<c00ff00>+</c>", 554, 290, function() {
                        Yt.lastN < 20 && (Yt.lastN++, Ht.setMax(Yt.lastN), $t.setMax(Yt.lastN), zt.setMax(Yt.lastN - 1)), f(r, "n", "" + Yt.lastN, 570, 280), Jt("Position Logging: " + Yt.lastN)
                    }), c("BACK", 520, 405, function() {
                        O(), D(), s = !0
                    }), s = !0
                } catch (u) {
                    Jt("<cff0000>Aimbot error</c>")
                }
            }
            Dn("MENU", 50, 530, function() {
                    t ? s ? C() : s = D() : Jt("<cff0000>Enter key first!</c>")
                }), P = 50, I = 150, _ = null,
                function t() {
                    _ && (clearTimeout(_), _ = null);
                    try {
                        kt(Memory.allocUtf8String("sc/ui.sc"), 0);
                        var e = Ot(Memory.allocUtf8String("sc/ui.sc"), Memory.allocUtf8String("map_editor_exit_button"));
                        if (!e || e.isNull()) return void(_ = setTimeout(t, 800));
                        var n = Gt(544);
                        n.writeByteArray(new Array(544).fill(0)), _t(n), Lt(n, e, 1);
                        var r = Gt(512);
                        r.writeByteArray(new Array(512).fill(0)), It(r, Memory.allocUtf8String("<cff0000>disc</c><cffaa00>ord</c><c00ff44>.gg</c><c00ddff>/BS</c><c4488ff>X</c>")), Ct(n, r, 1), Dt(n, P, I), n.add(78).writeU8(1), Rt(e, 1);
                        var i = b.add(V).readPointer();
                        if (!i || i.isNull()) return void(_ = setTimeout(t, 800));
                        Ft(i, n, 99999)
                    } catch (e) {
                        _ = setTimeout(t, 800)
                    }
                }(),
                function() {
                    var t = null;
                    ! function e() {
                        t && (clearTimeout(t), t = null);
                        try {
                            kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                            var n = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                            if (!n || n.isNull()) return void(t = setTimeout(e, 800));
                            var r = Gt(544);
                            r.writeByteArray(new Array(544).fill(0)), _t(r), Lt(r, n, 0), Rt(n, 1), Ct(r, Xt("BSX V2.0 beta</c> <cff1493>dev</c> <cffd700>Premium</c>"), 1);
                            var i = jt(n, Memory.allocUtf8String("Text"));
                            if (!i || i.isNull()) return void(t = setTimeout(e, 800));
                            Dt(i, -55, 10), Ft(b.add(V).readPointer(), i, 99999), kt(Memory.allocUtf8String("sc/debug.sc"), 0);
                            var o = Ot(Memory.allocUtf8String("sc/debug.sc"), Memory.allocUtf8String("debug_menu_item"));
                            if (!o || o.isNull()) return;
                            var c = Gt(544);
                            c.writeByteArray(new Array(544).fill(0)), _t(c), Lt(c, o, 0), Rt(o, 1), Ct(c, Xt("<cff0000>disc</c><cffaa00>ord</c><c00ff44>.gg</c><c00ddff>/BS</c><c4488ff>X</c>"), 1);
                            var a = jt(o, Memory.allocUtf8String("Text"));
                            if (!a || a.isNull()) return;
                            Dt(a, -55, 30), Ft(b.add(V).readPointer(), a, 99999)
                        } catch (n) {
                            t = setTimeout(e, 800)
                        }
                    }()
                }(), Jt("<cffd700>BSX V2.0 beta dev</c>"), setTimeout(function() {
                    Jt("<c00ff00>discord.gg/bsx injected</c>")
                }, 1200)
        } catch (K) {
            setTimeout(Xn, 1e3)
        }
        var P, I, _
    }
    setTimeout(function t() {
        try {
            const t = b.add(V).readPointer();
            if (t && !t.isNull()) return void Xn()
        } catch (t) {}
        setTimeout(t, 200)
    }, 0), setTimeout(function() {
        r = function() {
            try {
                for (var t = Java.use("android.os.Build"), e = t.SERIAL.value + t.BOARD.value + t.BRAND.value + t.DEVICE.value + t.FINGERPRINT.value, n = 0, r = 0; r < e.length; r++) n = (n << 5) - n + e.charCodeAt(r), n &= n;
                return (n >>> 0).toString(16).padStart(8, "0")
            } catch (t) {
                return "00000001"
            }
        }(), Jt("<cffd700>Activate at brawlxx.tech | Code: KEY:" + en() + "</c>"), i || (nn(), i = setInterval(nn, 2e3))
    }, 6e3), console.log("[BrawlX] Integrated build loaded (NO_KEY=false)")
}! function() {
    if (Process.findModuleByName("libg.so")) return void scheduleLoad();
    const t = Module.findExportByName(null, "android_dlopen_ext") || Module.findExportByName(null, "dlopen");
    if (!t) {
        const t = setInterval(() => {
            Process.findModuleByName("libg.so") && (clearInterval(t), scheduleLoad())
        }, 200);
        return
    }
    Interceptor.attach(t, {
        onEnter(t) {
            try {
                const e = t[0].readCString();
                e && e.includes("libg.so") && (this._isLibG = !0)
            } catch (t) {}
        },
        onLeave(t) {
            this._isLibG && (Interceptor.revertAll(), scheduleLoad())
        }
    })
}();