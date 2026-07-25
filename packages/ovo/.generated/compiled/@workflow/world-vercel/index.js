import { i as e, n as t, o as n, r, t as i } from "../../_chunks/workflow/chunk-BTyA9uPd.js";
import {
  D as a,
  T as o,
  _ as s,
  c,
  d as l,
  g as u,
  o as d,
  r as f,
} from "../../_chunks/workflow/dist-B3qkUnLJ.js";
import {
  $ as p,
  C as m,
  D as h,
  E as g,
  F as _,
  G as v,
  I as y,
  L as b,
  P as ee,
  S as te,
  T as ne,
  W as re,
  Z as ie,
  at as ae,
  b as oe,
  et as se,
  h as ce,
  it as le,
  j as ue,
  k as de,
  l as fe,
  m as pe,
  nt as me,
  o as he,
  ot as ge,
  p as _e,
  r as ve,
  rt as ye,
  st as be,
  tt as xe,
  u as Se,
  w as Ce,
  x as we,
  z as Te,
} from "../../_chunks/workflow/dist-BX517Nmz.js";
import {
  a as Ee,
  i as De,
  n as Oe,
  o as ke,
  r as Ae,
  s as je,
  t as Me,
} from "../../_chunks/workflow/run-id-BdE0MZz9.js";
import { t as Ne } from "../../_chunks/workflow/undici-C2ZhYnV9.js";
import { i as Pe, r as Fe, t as Ie } from "../../_chunks/workflow/token-util-B6qBs3-0.js";
import * as Le from "node:crypto";
import {
  KeyObject as x,
  constants as Re,
  createCipheriv as ze,
  createDecipheriv as Be,
  createHash as Ve,
  createHmac as He,
  createPrivateKey as Ue,
  createPublicKey as We,
  createSecretKey as Ge,
  diffieHellman as Ke,
  generateKeyPair as qe,
  getCiphers as Je,
  pbkdf2 as Ye,
  privateDecrypt as Xe,
  publicEncrypt as Ze,
  randomFillSync as Qe,
  timingSafeEqual as $e,
  webcrypto as et,
} from "node:crypto";
import * as tt from "node:util";
import { deprecate as nt, inspect as rt, promisify as it } from "node:util";
import { AsyncLocalStorage as at } from "node:async_hooks";
import * as ot from "node:http";
import { once as st } from "node:events";
import { Buffer as ct } from "node:buffer";
import lt from "node:os";
import * as ut from "path";
import * as dt from "fs";
import { createRequire as ft } from "module";
import * as pt from "net";
import * as mt from "node:https";
var ht = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { SYMBOL_FOR_REQ_CONTEXT: () => u, getContext: () => d }), (t.exports = c(l)));
    let u = Symbol.for(`@vercel/request-context`);
    function d() {
      return globalThis[u]?.get?.() ?? {};
    }
    0 && (t.exports = { SYMBOL_FOR_REQ_CONTEXT: u, getContext: d });
  }),
  gt = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { VercelOidcTokenError: () => u }), (t.exports = c(l)));
    var u = class extends Error {
      constructor(e, t) {
        (super(e), (this.name = `VercelOidcTokenError`), (this.cause = t));
      }
      toString() {
        return this.cause
          ? `${this.name}: ${this.message}: ${this.cause}`
          : `${this.name}: ${this.message}`;
      }
    };
    0 && (t.exports = { VercelOidcTokenError: u });
  }),
  _t = i((e, t) => {
    var r = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      a = Object.getOwnPropertyNames,
      o = Object.prototype.hasOwnProperty,
      s = (e, t) => {
        for (var n in t) r(e, n, { get: t[n], enumerable: !0 });
      },
      c = (e, t, n, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of a(t))
            !o.call(e, c) &&
              c !== n &&
              r(e, c, { get: () => t[c], enumerable: !(s = i(t, c)) || s.enumerable });
        return e;
      },
      l = (e) => c(r({}, `__esModule`, { value: !0 }), e),
      u = {};
    (s(u, { getVercelOidcToken: () => p, getVercelOidcTokenSync: () => m }), (t.exports = l(u)));
    var d = ht(),
      f = gt();
    async function p(e) {
      let t = ``,
        r;
      try {
        t = m();
      } catch (e) {
        r = e;
      }
      try {
        let [{ getTokenPayload: r, isExpired: i }, { refreshToken: a }] = await Promise.all([
          await Promise.resolve().then(() => n(St())),
          await import(`../../_chunks/workflow/token-Cz223z3C.js`).then((e) => n(e.default)),
        ]);
        (!t || i(r(t), e?.expirationBufferMs)) && (await a(e), (t = m()));
      } catch (e) {
        let t = r instanceof Error ? r.message : ``;
        throw (
          e instanceof Error &&
            (t = `${t}
${e.message}`),
          t ? new f.VercelOidcTokenError(t) : e
        );
      }
      return t;
    }
    function m() {
      let e = (0, d.getContext)().headers?.[`x-vercel-oidc-token`] ?? process.env.VERCEL_OIDC_TOKEN;
      if (!e)
        throw Error(
          `The 'x-vercel-oidc-token' header is missing from the request. Do you have the OIDC option enabled in the Vercel project settings?`,
        );
      return e;
    }
    0 && (t.exports = { getVercelOidcToken: p, getVercelOidcTokenSync: m });
  }),
  vt = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { AccessTokenMissingError: () => u, RefreshAccessTokenFailedError: () => d }),
      (t.exports = c(l)));
    var u = class extends Error {
        constructor() {
          (super(`No authentication found. Please log in with the Vercel CLI (vercel login).`),
            (this.name = `AccessTokenMissingError`));
        }
      },
      d = class extends Error {
        constructor(e) {
          (super(`Failed to refresh authentication token.`, { cause: e }),
            (this.name = `RefreshAccessTokenFailedError`));
        }
      };
    0 && (t.exports = { AccessTokenMissingError: u, RefreshAccessTokenFailedError: d });
  }),
  yt = i((t, n) => {
    var r = Object.create,
      i = Object.defineProperty,
      a = Object.getOwnPropertyDescriptor,
      o = Object.getOwnPropertyNames,
      s = Object.getPrototypeOf,
      c = Object.prototype.hasOwnProperty,
      l = (e, t) => {
        for (var n in t) i(e, n, { get: t[n], enumerable: !0 });
      },
      u = (e, t, n, r) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let s of o(t))
            !c.call(e, s) &&
              s !== n &&
              i(e, s, { get: () => t[s], enumerable: !(r = a(t, s)) || r.enumerable });
        return e;
      },
      d = (e, t, n) => (
        (n = e == null ? {} : r(s(e))),
        u(t || !e || !e.__esModule ? i(n, `default`, { value: e, enumerable: !0 }) : n, e)
      ),
      f = (e) => u(i({}, `__esModule`, { value: !0 }), e),
      p = {};
    (l(p, { findRootDir: () => v, getUserDataDir: () => y }), (n.exports = f(p)));
    var m = d(e(`path`)),
      h = d(e(`fs`)),
      g = d(e(`os`)),
      _ = gt();
    function v() {
      try {
        let e = process.cwd();
        for (; e !== m.default.dirname(e);) {
          let t = m.default.join(e, `.vercel`);
          if (h.default.existsSync(t)) return e;
          e = m.default.dirname(e);
        }
      } catch {
        throw new _.VercelOidcTokenError(
          `Token refresh only supported in node server environments`,
        );
      }
      return null;
    }
    function y() {
      if (process.env.XDG_DATA_HOME) return process.env.XDG_DATA_HOME;
      switch (g.default.platform()) {
        case `darwin`:
          return m.default.join(g.default.homedir(), `Library/Application Support`);
        case `linux`:
          return m.default.join(g.default.homedir(), `.local/share`);
        case `win32`:
          return process.env.LOCALAPPDATA ? process.env.LOCALAPPDATA : null;
        default:
          return null;
      }
    }
    0 && (n.exports = { findRootDir: v, getUserDataDir: y });
  }),
  bt = i((t, n) => {
    var r = Object.create,
      i = Object.defineProperty,
      a = Object.getOwnPropertyDescriptor,
      o = Object.getOwnPropertyNames,
      s = Object.getPrototypeOf,
      c = Object.prototype.hasOwnProperty,
      l = (e, t) => {
        for (var n in t) i(e, n, { get: t[n], enumerable: !0 });
      },
      u = (e, t, n, r) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let s of o(t))
            !c.call(e, s) &&
              s !== n &&
              i(e, s, { get: () => t[s], enumerable: !(r = a(t, s)) || r.enumerable });
        return e;
      },
      d = (e, t, n) => (
        (n = e == null ? {} : r(s(e))),
        u(t || !e || !e.__esModule ? i(n, `default`, { value: e, enumerable: !0 }) : n, e)
      ),
      f = (e) => u(i({}, `__esModule`, { value: !0 }), e),
      p = {};
    (l(p, { isValidAccessToken: () => b, readAuthConfig: () => v, writeAuthConfig: () => y }),
      (n.exports = f(p)));
    var m = d(e(`fs`)),
      h = d(e(`path`)),
      g = St();
    function _() {
      let e = (0, g.getVercelDataDir)();
      if (!e)
        throw Error(
          `Unable to find Vercel CLI data directory. Your platform: ${process.platform}. Supported: darwin, linux, win32.`,
        );
      return h.join(e, `auth.json`);
    }
    function v() {
      try {
        let e = _();
        if (!m.existsSync(e)) return null;
        let t = m.readFileSync(e, `utf8`);
        return t ? JSON.parse(t) : null;
      } catch {
        return null;
      }
    }
    function y(e) {
      let t = _(),
        n = h.dirname(t);
      (m.existsSync(n) || m.mkdirSync(n, { mode: 504, recursive: !0 }),
        m.writeFileSync(t, JSON.stringify(e, null, 2), { mode: 384 }));
    }
    function b(e, t = 0) {
      if (!e.token) return !1;
      if (typeof e.expiresAt != `number`) return !0;
      let n = Math.floor(Date.now() / 1e3),
        r = t / 1e3;
      return e.expiresAt >= n + r;
    }
    0 && (n.exports = { isValidAccessToken: b, readAuthConfig: v, writeAuthConfig: y });
  }),
  xt = i((t, n) => {
    var r = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      a = Object.getOwnPropertyNames,
      o = Object.prototype.hasOwnProperty,
      s = (e, t) => {
        for (var n in t) r(e, n, { get: t[n], enumerable: !0 });
      },
      c = (e, t, n, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of a(t))
            !o.call(e, c) &&
              c !== n &&
              r(e, c, { get: () => t[c], enumerable: !(s = i(t, c)) || s.enumerable });
        return e;
      },
      l = (e) => c(r({}, `__esModule`, { value: !0 }), e),
      u = {};
    (s(u, { processTokenResponse: () => g, refreshTokenRequest: () => h }), (n.exports = l(u)));
    var d = e(`os`);
    let f = `@vercel/oidc node-${process.version} ${(0, d.platform)()} (${(0, d.arch)()}) ${(0, d.hostname)()}`,
      p = null;
    async function m() {
      if (p) return p;
      let e = await fetch(`https://vercel.com/.well-known/openid-configuration`, {
        headers: { "user-agent": f },
      });
      if (!e.ok) throw Error(`Failed to discover OAuth endpoints`);
      let t = await e.json();
      if (!t || typeof t.token_endpoint != `string`)
        throw Error(`Invalid OAuth discovery response`);
      let n = t.token_endpoint;
      return ((p = n), n);
    }
    async function h(e) {
      let t = await m();
      return await fetch(t, {
        method: `POST`,
        headers: { "Content-Type": `application/x-www-form-urlencoded`, "user-agent": f },
        body: new URLSearchParams({
          client_id: `cl_HYyOPBNtFMfHhaUn9L4QPfTZz6TP47bp`,
          grant_type: `refresh_token`,
          ...e,
        }),
      });
    }
    async function g(e) {
      let t = await e.json();
      if (!e.ok) {
        let e =
          typeof t == `object` && t && `error` in t ? String(t.error) : `Token refresh failed`;
        return [Error(e)];
      }
      return typeof t != `object` || !t
        ? [Error(`Invalid token response`)]
        : typeof t.access_token == `string`
          ? t.token_type === `Bearer`
            ? typeof t.expires_in == `number`
              ? [null, t]
              : [Error(`Missing expires_in in response`)]
            : [Error(`Invalid token_type in response`)]
          : [Error(`Missing access_token in response`)];
    }
    0 && (n.exports = { processTokenResponse: g, refreshTokenRequest: h });
  }),
  St = i((t, n) => {
    var r = Object.create,
      i = Object.defineProperty,
      a = Object.getOwnPropertyDescriptor,
      o = Object.getOwnPropertyNames,
      s = Object.getPrototypeOf,
      c = Object.prototype.hasOwnProperty,
      l = (e, t) => {
        for (var n in t) i(e, n, { get: t[n], enumerable: !0 });
      },
      u = (e, t, n, r) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let s of o(t))
            !c.call(e, s) &&
              s !== n &&
              i(e, s, { get: () => t[s], enumerable: !(r = a(t, s)) || r.enumerable });
        return e;
      },
      d = (e, t, n) => (
        (n = e == null ? {} : r(s(e))),
        u(t || !e || !e.__esModule ? i(n, `default`, { value: e, enumerable: !0 }) : n, e)
      ),
      f = (e) => u(i({}, `__esModule`, { value: !0 }), e),
      p = {};
    (l(p, {
      assertVercelOidcTokenResponse: () => re,
      findProjectInfo: () => ie,
      getTokenPayload: () => se,
      getVercelDataDir: () => ee,
      getVercelOidcToken: () => ne,
      getVercelToken: () => te,
      isExpired: () => ce,
      loadToken: () => oe,
      saveToken: () => ae,
    }),
      (n.exports = f(p)));
    var m = d(e(`path`)),
      h = d(e(`fs`)),
      g = gt(),
      _ = yt(),
      v = bt(),
      y = xt(),
      b = vt();
    function ee() {
      let e = (0, _.getUserDataDir)();
      return e ? m.join(e, `com.vercel.cli`) : null;
    }
    async function te(e) {
      let t = (0, v.readAuthConfig)();
      if (!t?.token) throw new b.AccessTokenMissingError();
      if ((0, v.isValidAccessToken)(t, e?.expirationBufferMs)) return t.token;
      if (!t.refreshToken)
        throw (
          (0, v.writeAuthConfig)({}),
          new b.RefreshAccessTokenFailedError(`No refresh token available`)
        );
      try {
        let e = await (0, y.refreshTokenRequest)({ refresh_token: t.refreshToken }),
          [n, r] = await (0, y.processTokenResponse)(e);
        if (n || !r) throw ((0, v.writeAuthConfig)({}), new b.RefreshAccessTokenFailedError(n));
        let i = { token: r.access_token, expiresAt: Math.floor(Date.now() / 1e3) + r.expires_in };
        return (
          r.refresh_token && (i.refreshToken = r.refresh_token), (0, v.writeAuthConfig)(i), i.token
        );
      } catch (e) {
        throw (
          (0, v.writeAuthConfig)({}),
          e instanceof b.AccessTokenMissingError || e instanceof b.RefreshAccessTokenFailedError
            ? e
            : new b.RefreshAccessTokenFailedError(e)
        );
      }
    }
    async function ne(e, t, n) {
      let r = `https://api.vercel.com/v1/projects/${t}/token?source=vercel-oidc-refresh${n ? `&teamId=${n}` : ``}`,
        i = await fetch(r, { method: `POST`, headers: { Authorization: `Bearer ${e}` } });
      if (!i.ok) throw new g.VercelOidcTokenError(`Failed to refresh OIDC token: ${i.statusText}`);
      let a = await i.json();
      return (re(a), a);
    }
    function re(e) {
      if (!e || typeof e != `object`)
        throw TypeError(
          "Vercel OIDC token is malformed. Expected an object. Please run `vc env pull` and try again",
        );
      if (!(`token` in e) || typeof e.token != `string`)
        throw TypeError(
          "Vercel OIDC token is malformed. Expected a string-valued token property. Please run `vc env pull` and try again",
        );
    }
    function ie() {
      let e = (0, _.findRootDir)();
      if (!e)
        throw new g.VercelOidcTokenError(
          "Unable to find project root directory. Have you linked your project with `vc link?`",
        );
      let t = m.join(e, `.vercel`, `project.json`);
      if (!h.existsSync(t))
        throw new g.VercelOidcTokenError(
          "project.json not found, have you linked your project with `vc link?`",
        );
      let n = JSON.parse(h.readFileSync(t, `utf8`));
      if (typeof n.projectId != `string` && typeof n.orgId != `string`)
        throw TypeError(
          "Expected a string-valued projectId property. Try running `vc link` to re-link your project.",
        );
      return { projectId: n.projectId, teamId: n.orgId };
    }
    function ae(e, t) {
      let n = (0, _.getUserDataDir)();
      if (!n)
        throw new g.VercelOidcTokenError(
          `Unable to find user data directory. Please reach out to Vercel support.`,
        );
      let r = m.join(n, `com.vercel.token`, `${t}.json`),
        i = JSON.stringify(e);
      (h.mkdirSync(m.dirname(r), { mode: 504, recursive: !0 }),
        h.writeFileSync(r, i),
        h.chmodSync(r, 432));
    }
    function oe(e) {
      let t = (0, _.getUserDataDir)();
      if (!t)
        throw new g.VercelOidcTokenError(
          `Unable to find user data directory. Please reach out to Vercel support.`,
        );
      let n = m.join(t, `com.vercel.token`, `${e}.json`);
      if (!h.existsSync(n)) return null;
      let r = JSON.parse(h.readFileSync(n, `utf8`));
      return (re(r), r);
    }
    function se(e) {
      let t = e.split(`.`);
      if (t.length !== 3)
        throw new g.VercelOidcTokenError("Invalid token. Please run `vc env pull` and try again");
      let n = t[1].replace(/-/g, `+`).replace(/_/g, `/`),
        r = n.padEnd(n.length + ((4 - (n.length % 4)) % 4), `=`);
      return JSON.parse(Buffer.from(r, `base64`).toString(`utf8`));
    }
    function ce(e, t = 0) {
      return e.exp * 1e3 < Date.now() + t;
    }
    0 &&
      (n.exports = {
        assertVercelOidcTokenResponse: re,
        findProjectInfo: ie,
        getTokenPayload: se,
        getVercelDataDir: ee,
        getVercelOidcToken: ne,
        getVercelToken: te,
        isExpired: ce,
        loadToken: oe,
        saveToken: ae,
      });
  }),
  Ct = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, {
      AccessTokenMissingError: () => f.AccessTokenMissingError,
      RefreshAccessTokenFailedError: () => f.RefreshAccessTokenFailedError,
      getContext: () => d.getContext,
      getVercelOidcToken: () => u.getVercelOidcToken,
      getVercelOidcTokenSync: () => u.getVercelOidcTokenSync,
      getVercelToken: () => p.getVercelToken,
    }),
      (t.exports = c(l)));
    var u = _t(),
      d = ht(),
      f = vt(),
      p = St();
    0 &&
      (t.exports = {
        AccessTokenMissingError,
        RefreshAccessTokenFailedError,
        getContext,
        getVercelOidcToken,
        getVercelOidcTokenSync,
        getVercelToken,
      });
  })();
let wt;
try {
  wt = new TextDecoder();
} catch {}
let S,
  Tt,
  C = 0;
const Et = [],
  Dt = 57337,
  Ot = {};
let kt = 11281e4,
  At = 1681e4,
  jt = Et,
  Mt = 0,
  w = {},
  T,
  Nt,
  Pt = 0,
  Ft = 0,
  E,
  It,
  D = [],
  Lt = [],
  Rt,
  O,
  zt,
  Bt = { useRecords: !1, mapsAsObjects: !0 },
  Vt = !1,
  Ht = 2;
try {
  Function(``);
} catch {
  Ht = 1 / 0;
}
var Ut = class e {
  constructor(e) {
    if (
      e &&
      ((e.keyMap || e._keyMap) && !e.useRecords && ((e.useRecords = !1), (e.mapsAsObjects = !0)),
      e.useRecords === !1 && e.mapsAsObjects === void 0 && (e.mapsAsObjects = !0),
      e.getStructures && (e.getShared = e.getStructures),
      e.getShared && !e.structures && ((e.structures = []).uninitialized = !0),
      e.keyMap)
    ) {
      this.mapKey = new Map();
      for (let [t, n] of Object.entries(e.keyMap)) this.mapKey.set(n, t);
    }
    Object.assign(this, e);
  }
  decodeKey(e) {
    return (this.keyMap && this.mapKey.get(e)) || e;
  }
  encodeKey(e) {
    return this.keyMap && this.keyMap.hasOwnProperty(e) ? this.keyMap[e] : e;
  }
  encodeKeys(e) {
    if (!this._keyMap) return e;
    let t = new Map();
    for (let [n, r] of Object.entries(e))
      t.set(this._keyMap.hasOwnProperty(n) ? this._keyMap[n] : n, r);
    return t;
  }
  decodeKeys(e) {
    if (!this._keyMap || e.constructor.name != `Map`) return e;
    if (!this._mapKey) {
      this._mapKey = new Map();
      for (let [e, t] of Object.entries(this._keyMap)) this._mapKey.set(t, e);
    }
    let t = {};
    return (e.forEach((e, n) => (t[qt(this._mapKey.has(n) ? this._mapKey.get(n) : n)] = e)), t);
  }
  mapDecode(e, t) {
    let n = this.decode(e);
    if (this._keyMap)
      switch (n.constructor.name) {
        case `Array`:
          return n.map((e) => this.decodeKeys(e));
      }
    return n;
  }
  decode(t, n) {
    if (S) return _n(() => (vn(), this ? this.decode(t, n) : e.prototype.decode.call(Bt, t, n)));
    ((Tt = n > -1 ? n : t.length),
      (C = 0),
      (Mt = 0),
      (Ft = 0),
      (Nt = null),
      (jt = Et),
      (E = null),
      (S = t));
    try {
      O = t.dataView ||= new DataView(t.buffer, t.byteOffset, t.byteLength);
    } catch (e) {
      throw (
        (S = null),
        t instanceof Uint8Array
          ? e
          : Error(
              `Source must be a Uint8Array or Buffer but was a ` +
                (t && typeof t == `object` ? t.constructor.name : typeof t),
            )
      );
    }
    if (this instanceof e) {
      if (
        ((w = this),
        (Rt =
          this.sharedValues &&
          (this.pack
            ? Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues)
            : this.sharedValues)),
        this.structures)
      )
        return ((T = this.structures), Wt());
      (!T || T.length > 0) && (T = []);
    } else ((w = Bt), (!T || T.length > 0) && (T = []), (Rt = null));
    return Wt();
  }
  decodeMultiple(e, t) {
    let n,
      r = 0;
    try {
      let i = e.length;
      Vt = !0;
      let a = this ? this.decode(e, i) : bn.decode(e, i);
      if (t) {
        if (t(a) === !1) return;
        for (; C < i;) if (((r = C), t(Wt()) === !1)) return;
      } else {
        for (n = [a]; C < i;) ((r = C), n.push(Wt()));
        return n;
      }
    } catch (e) {
      throw ((e.lastPosition = r), (e.values = n), e);
    } finally {
      ((Vt = !1), vn());
    }
  }
};
function Wt() {
  try {
    let e = k();
    if (E) {
      if (C >= E.postBundlePosition) {
        let e = Error(`Unexpected bundle position`);
        throw ((e.incomplete = !0), e);
      }
      ((C = E.postBundlePosition), (E = null));
    }
    if (C == Tt) ((T = null), (S = null), (It &&= null));
    else if (C > Tt) {
      let e = Error(`Unexpected end of CBOR data`);
      throw ((e.incomplete = !0), e);
    } else if (!Vt) throw Error(`Data read, but end of buffer not reached`);
    return e;
  } catch (e) {
    throw (
      vn(),
      (e instanceof RangeError || e.message.startsWith(`Unexpected end of buffer`)) &&
        (e.incomplete = !0),
      e
    );
  }
}
function k() {
  let e = S[C++],
    t = e >> 5;
  if (((e &= 31), e > 23))
    switch (e) {
      case 24:
        e = S[C++];
        break;
      case 25:
        if (t == 7) return nn();
        ((e = O.getUint16(C)), (C += 2));
        break;
      case 26:
        if (t == 7) {
          let e = O.getFloat32(C);
          if (w.useFloat32 > 2) {
            let t = yn[((S[C] & 127) << 1) | (S[C + 1] >> 7)];
            return ((C += 4), ((t * e + (e > 0 ? 0.5 : -0.5)) >> 0) / t);
          }
          return ((C += 4), e);
        }
        ((e = O.getUint32(C)), (C += 4));
        break;
      case 27:
        if (t == 7) {
          let e = O.getFloat64(C);
          return ((C += 8), e);
        }
        if (t > 1) {
          if (O.getUint32(C) > 0)
            throw Error(
              `JavaScript does not support arrays, maps, or strings with length over 4294967295`,
            );
          e = O.getUint32(C + 4);
        } else
          w.int64AsNumber
            ? ((e = O.getUint32(C) * 4294967296), (e += O.getUint32(C + 4)))
            : (e = O.getBigUint64(C));
        C += 8;
        break;
      case 31:
        switch (t) {
          case 2:
          case 3:
            throw Error(`Indefinite length not supported for byte or text strings`);
          case 4:
            let e = [],
              n,
              r = 0;
            for (; (n = k()) != Ot;) {
              if (r >= kt) throw Error(`Array length exceeds ${kt}`);
              e[r++] = n;
            }
            return t == 4 ? e : t == 3 ? e.join(``) : Buffer.concat(e);
          case 5:
            let i;
            if (w.mapsAsObjects) {
              let e = {},
                t = 0;
              if (w.keyMap)
                for (; (i = k()) != Ot;) {
                  if (t++ >= At) throw Error(`Property count exceeds ${At}`);
                  e[qt(w.decodeKey(i))] = k();
                }
              else
                for (; (i = k()) != Ot;) {
                  if (t++ >= At) throw Error(`Property count exceeds ${At}`);
                  e[qt(i)] = k();
                }
              return e;
            } else {
              zt &&= ((w.mapsAsObjects = !0), !1);
              let e = new Map();
              if (w.keyMap) {
                let t = 0;
                for (; (i = k()) != Ot;) {
                  if (t++ >= At) throw Error(`Map size exceeds ${At}`);
                  e.set(w.decodeKey(i), k());
                }
              } else {
                let t = 0;
                for (; (i = k()) != Ot;) {
                  if (t++ >= At) throw Error(`Map size exceeds ${At}`);
                  e.set(i, k());
                }
              }
              return e;
            }
          case 7:
            return Ot;
          default:
            throw Error(`Invalid major type for indefinite length ` + t);
        }
      default:
        throw Error(`Unknown token ` + e);
    }
  switch (t) {
    case 0:
      return e;
    case 1:
      return ~e;
    case 2:
      return $t(e);
    case 3:
      if (Ft >= C) return Nt.slice(C - Pt, (C += e) - Pt);
      if (Ft == 0 && Tt < 140 && e < 32) {
        let t = e < 16 ? Qt(e) : Zt(e);
        if (t != null) return t;
      }
      return Jt(e);
    case 4:
      if (e >= kt) throw Error(`Array length exceeds ${kt}`);
      let t = Array(e);
      for (let n = 0; n < e; n++) t[n] = k();
      return t;
    case 5:
      if (e >= At) throw Error(`Map size exceeds ${kt}`);
      if (w.mapsAsObjects) {
        let t = {};
        if (w.keyMap) for (let n = 0; n < e; n++) t[qt(w.decodeKey(k()))] = k();
        else for (let n = 0; n < e; n++) t[qt(k())] = k();
        return t;
      } else {
        zt &&= ((w.mapsAsObjects = !0), !1);
        let t = new Map();
        if (w.keyMap) for (let n = 0; n < e; n++) t.set(w.decodeKey(k()), k());
        else for (let n = 0; n < e; n++) t.set(k(), k());
        return t;
      }
    case 6:
      if (e >= Dt) {
        let t = T[e & 8191];
        if (t) return ((t.read ||= Kt(t)), t.read());
        if (e < 65536) {
          if (e == 57343) {
            let e = hn(),
              t = k(),
              n = k();
            an(t, n);
            let r = {};
            if (w.keyMap)
              for (let t = 2; t < e; t++) {
                let e = w.decodeKey(n[t - 2]);
                r[qt(e)] = k();
              }
            else
              for (let t = 2; t < e; t++) {
                let e = n[t - 2];
                r[qt(e)] = k();
              }
            return r;
          } else if (e == 57342) {
            let e = hn(),
              t = k();
            for (let n = 2; n < e; n++) an(t++, k());
            return k();
          } else if (e == Dt) return mn();
          if (w.getShared && (gn(), (t = T[e & 8191]), t)) return ((t.read ||= Kt(t)), t.read());
        }
      }
      let n = D[e];
      if (n) return n.handlesRead ? n(k) : n(k());
      {
        let t = k();
        for (let n = 0; n < Lt.length; n++) {
          let r = Lt[n](e, t);
          if (r !== void 0) return r;
        }
        return new rn(t, e);
      }
    case 7:
      switch (e) {
        case 20:
          return !1;
        case 21:
          return !0;
        case 22:
          return null;
        case 23:
          return;
        default:
          let t = (Rt || ln())[e];
          if (t !== void 0) return t;
          throw Error(`Unknown token ` + e);
      }
    default:
      if (isNaN(e)) {
        let e = Error(`Unexpected end of CBOR data`);
        throw ((e.incomplete = !0), e);
      }
      throw Error(`Unknown CBOR token ` + e);
  }
}
const Gt = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function Kt(e) {
  if (!e) throw Error(`Structure is required in record definition`);
  function t() {
    let e = S[C++];
    if (((e &= 31), e > 23))
      switch (e) {
        case 24:
          e = S[C++];
          break;
        case 25:
          ((e = O.getUint16(C)), (C += 2));
          break;
        case 26:
          ((e = O.getUint32(C)), (C += 4));
          break;
        default:
          throw Error(`Expected array header, but got ` + S[C - 1]);
      }
    let t = this.compiledReader;
    for (; t;) {
      if (t.propertyCount === e) return t(k);
      t = t.next;
    }
    if (this.slowReads++ >= Ht) {
      let n = this.length == e ? this : this.slice(0, e);
      return (
        (t = w.keyMap
          ? Function(
              `r`,
              `return {` +
                n
                  .map((e) => w.decodeKey(e))
                  .map((e) => (Gt.test(e) ? qt(e) + `:r()` : `[` + JSON.stringify(e) + `]:r()`))
                  .join(`,`) +
                `}`,
            )
          : Function(
              `r`,
              `return {` +
                n
                  .map((e) => (Gt.test(e) ? qt(e) + `:r()` : `[` + JSON.stringify(e) + `]:r()`))
                  .join(`,`) +
                `}`,
            )),
        this.compiledReader && (t.next = this.compiledReader),
        (t.propertyCount = e),
        (this.compiledReader = t),
        t(k)
      );
    }
    let n = {};
    if (w.keyMap) for (let t = 0; t < e; t++) n[qt(w.decodeKey(this[t]))] = k();
    else for (let t = 0; t < e; t++) n[qt(this[t])] = k();
    return n;
  }
  return ((e.slowReads = 0), t);
}
function qt(e) {
  if (typeof e == `string`) return e === `__proto__` ? `__proto_` : e;
  if (typeof e == `number` || typeof e == `boolean` || typeof e == `bigint`) return e.toString();
  if (e == null) return e + ``;
  throw Error(`Invalid property name type ` + typeof e);
}
let Jt = Xt;
function Yt(e) {
  Jt = t(1);
  function t(t) {
    return function (t) {
      let n = jt[Mt++];
      if (n == null) {
        if (E) return Xt(t);
        let r = e(C, Tt, t, S);
        if (typeof r == `string`) ((n = r), (jt = Et));
        else if (((jt = r), (Mt = 1), (Ft = 1), (n = jt[0]), n === void 0))
          throw Error(`Unexpected end of buffer`);
      }
      let r = n.length;
      return r <= t ? ((C += t), n) : ((Nt = n), (Pt = C), (Ft = C + r), (C += t), n.slice(0, t));
    };
  }
}
function Xt(e) {
  let t;
  if (e < 16 && (t = Qt(e))) return t;
  if (e > 64 && wt) return wt.decode(S.subarray(C, (C += e)));
  let n = C + e,
    r = [];
  for (t = ``; C < n;) {
    let e = S[C++];
    if (!(e & 128)) r.push(e);
    else if ((e & 224) == 192) {
      let t = S[C++] & 63;
      r.push(((e & 31) << 6) | t);
    } else if ((e & 240) == 224) {
      let t = S[C++] & 63,
        n = S[C++] & 63;
      r.push(((e & 31) << 12) | (t << 6) | n);
    } else if ((e & 248) == 240) {
      let t = S[C++] & 63,
        n = S[C++] & 63,
        i = S[C++] & 63,
        a = ((e & 7) << 18) | (t << 12) | (n << 6) | i;
      (a > 65535 && ((a -= 65536), r.push(((a >>> 10) & 1023) | 55296), (a = 56320 | (a & 1023))),
        r.push(a));
    } else r.push(e);
    r.length >= 4096 && ((t += A.apply(String, r)), (r.length = 0));
  }
  return (r.length > 0 && (t += A.apply(String, r)), t);
}
let A = String.fromCharCode;
function Zt(e) {
  let t = C,
    n = Array(e);
  for (let r = 0; r < e; r++) {
    let e = S[C++];
    if ((e & 128) > 0) {
      C = t;
      return;
    }
    n[r] = e;
  }
  return A.apply(String, n);
}
function Qt(e) {
  if (e < 4)
    if (e < 2) {
      if (e === 0) return ``;
      {
        let e = S[C++];
        if ((e & 128) > 1) {
          --C;
          return;
        }
        return A(e);
      }
    } else {
      let t = S[C++],
        n = S[C++];
      if ((t & 128) > 0 || (n & 128) > 0) {
        C -= 2;
        return;
      }
      if (e < 3) return A(t, n);
      let r = S[C++];
      if ((r & 128) > 0) {
        C -= 3;
        return;
      }
      return A(t, n, r);
    }
  else {
    let t = S[C++],
      n = S[C++],
      r = S[C++],
      i = S[C++];
    if ((t & 128) > 0 || (n & 128) > 0 || (r & 128) > 0 || (i & 128) > 0) {
      C -= 4;
      return;
    }
    if (e < 6) {
      if (e === 4) return A(t, n, r, i);
      {
        let e = S[C++];
        if ((e & 128) > 0) {
          C -= 5;
          return;
        }
        return A(t, n, r, i, e);
      }
    } else if (e < 8) {
      let a = S[C++],
        o = S[C++];
      if ((a & 128) > 0 || (o & 128) > 0) {
        C -= 6;
        return;
      }
      if (e < 7) return A(t, n, r, i, a, o);
      let s = S[C++];
      if ((s & 128) > 0) {
        C -= 7;
        return;
      }
      return A(t, n, r, i, a, o, s);
    } else {
      let a = S[C++],
        o = S[C++],
        s = S[C++],
        c = S[C++];
      if ((a & 128) > 0 || (o & 128) > 0 || (s & 128) > 0 || (c & 128) > 0) {
        C -= 8;
        return;
      }
      if (e < 10) {
        if (e === 8) return A(t, n, r, i, a, o, s, c);
        {
          let e = S[C++];
          if ((e & 128) > 0) {
            C -= 9;
            return;
          }
          return A(t, n, r, i, a, o, s, c, e);
        }
      } else if (e < 12) {
        let l = S[C++],
          u = S[C++];
        if ((l & 128) > 0 || (u & 128) > 0) {
          C -= 10;
          return;
        }
        if (e < 11) return A(t, n, r, i, a, o, s, c, l, u);
        let d = S[C++];
        if ((d & 128) > 0) {
          C -= 11;
          return;
        }
        return A(t, n, r, i, a, o, s, c, l, u, d);
      } else {
        let l = S[C++],
          u = S[C++],
          d = S[C++],
          f = S[C++];
        if ((l & 128) > 0 || (u & 128) > 0 || (d & 128) > 0 || (f & 128) > 0) {
          C -= 12;
          return;
        }
        if (e < 14) {
          if (e === 12) return A(t, n, r, i, a, o, s, c, l, u, d, f);
          {
            let e = S[C++];
            if ((e & 128) > 0) {
              C -= 13;
              return;
            }
            return A(t, n, r, i, a, o, s, c, l, u, d, f, e);
          }
        } else {
          let p = S[C++],
            m = S[C++];
          if ((p & 128) > 0 || (m & 128) > 0) {
            C -= 14;
            return;
          }
          if (e < 15) return A(t, n, r, i, a, o, s, c, l, u, d, f, p, m);
          let h = S[C++];
          if ((h & 128) > 0) {
            C -= 15;
            return;
          }
          return A(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
        }
      }
    }
  }
}
function $t(e) {
  return w.copyBuffers ? Uint8Array.prototype.slice.call(S, C, (C += e)) : S.subarray(C, (C += e));
}
let en = new Float32Array(1),
  tn = new Uint8Array(en.buffer, 0, 4);
function nn() {
  let e = S[C++],
    t = S[C++],
    n = (e & 127) >> 2;
  if (n === 31) return t || e & 3 ? NaN : e & 128 ? -1 / 0 : 1 / 0;
  if (n === 0) {
    let n = (((e & 3) << 8) | t) / (1 << 24);
    return e & 128 ? -n : n;
  }
  return (
    (tn[3] = (e & 128) | ((n >> 1) + 56)),
    (tn[2] = ((e & 7) << 5) | (t >> 3)),
    (tn[1] = t << 5),
    (tn[0] = 0),
    en[0]
  );
}
Array(4096);
var rn = class {
  constructor(e, t) {
    ((this.value = e), (this.tag = t));
  }
};
((D[0] = (e) => new Date(e)),
  (D[1] = (e) => new Date(Math.round(e * 1e3))),
  (D[2] = (e) => {
    let t = BigInt(0);
    for (let n = 0, r = e.byteLength; n < r; n++) t = BigInt(e[n]) + (t << BigInt(8));
    return t;
  }),
  (D[3] = (e) => BigInt(-1) - D[2](e)),
  (D[4] = (e) => +(e[1] + `e` + e[0])),
  (D[5] = (e) => e[1] * Math.exp(e[0] * Math.log(2))));
const an = (e, t) => {
  e -= 57344;
  let n = T[e];
  (n && n.isShared && ((T.restoreStructures ||= [])[e] = n), (T[e] = t), (t.read = Kt(t)));
};
((D[105] = (e) => {
  let t = e.length,
    n = e[1];
  an(e[0], n);
  let r = {};
  for (let i = 2; i < t; i++) {
    let t = n[i - 2];
    r[qt(t)] = e[i];
  }
  return r;
}),
  (D[14] = (e) => (E ? E[0].slice(E.position0, (E.position0 += e)) : new rn(e, 14))),
  (D[15] = (e) => (E ? E[1].slice(E.position1, (E.position1 += e)) : new rn(e, 15))));
let on = { Error, RegExp };
D[27] = (e) => (on[e[0]] || Error)(e[1], e[2]);
const sn = (e) => {
  if (S[C++] != 132) {
    let e = Error(`Packed values structure must be followed by a 4 element array`);
    throw (S.length < C && (e.incomplete = !0), e);
  }
  let t = e();
  if (!t || !t.length) {
    let e = Error(`Packed values structure must be followed by a 4 element array`);
    throw ((e.incomplete = !0), e);
  }
  return (
    (Rt = Rt ? t.concat(Rt.slice(t.length)) : t), (Rt.prefixes = e()), (Rt.suffixes = e()), e()
  );
};
((sn.handlesRead = !0),
  (D[51] = sn),
  (D[6] = (e) => {
    if (!Rt)
      if (w.getShared) gn();
      else return new rn(e, 6);
    if (typeof e == `number`) return Rt[16 + (e >= 0 ? 2 * e : -2 * e - 1)];
    let t = Error(`No support for non-integer packed references yet`);
    throw (e === void 0 && (t.incomplete = !0), t);
  }),
  (D[28] = (e) => {
    It || ((It = new Map()), (It.id = 0));
    let t = It.id++,
      n = C,
      r = S[C],
      i;
    i = r >> 5 == 4 ? [] : {};
    let a = { target: i };
    It.set(t, a);
    let o = e();
    return a.used
      ? (Object.getPrototypeOf(i) !== Object.getPrototypeOf(o) &&
          ((C = n), (i = o), It.set(t, { target: i }), (o = e())),
        Object.assign(i, o))
      : ((a.target = o), o);
  }),
  (D[28].handlesRead = !0),
  (D[29] = (e) => {
    let t = It.get(e);
    return ((t.used = !0), t.target);
  }),
  (D[258] = (e) => new Set(e)),
  ((D[259] = (e) => (w.mapsAsObjects && ((w.mapsAsObjects = !1), (zt = !0)), e())).handlesRead =
    !0));
function cn(e, t) {
  return typeof e == `string` ? e + t : e instanceof Array ? e.concat(t) : Object.assign({}, e, t);
}
function ln() {
  if (!Rt)
    if (w.getShared) gn();
    else throw Error(`No packed values available`);
  return Rt;
}
Lt.push((e, t) => {
  if (e >= 225 && e <= 255) return cn(ln().prefixes[e - 224], t);
  if (e >= 28704 && e <= 32767) return cn(ln().prefixes[e - 28672], t);
  if (e >= 1879052288 && e <= 2147483647) return cn(ln().prefixes[e - 1879048192], t);
  if (e >= 216 && e <= 223) return cn(t, ln().suffixes[e - 216]);
  if (e >= 27647 && e <= 28671) return cn(t, ln().suffixes[e - 27639]);
  if (e >= 1811940352 && e <= 1879048191) return cn(t, ln().suffixes[e - 1811939328]);
  if (e == 1399353956) return { packedValues: Rt, structures: T.slice(0), version: t };
  if (e == 55799) return t;
});
const un = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1,
  dn = [
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    typeof BigUint64Array > `u` ? { name: `BigUint64Array` } : BigUint64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    typeof BigInt64Array > `u` ? { name: `BigInt64Array` } : BigInt64Array,
    Float32Array,
    Float64Array,
  ],
  fn = [64, 68, 69, 70, 71, 72, 77, 78, 79, 85, 86];
for (let e = 0; e < dn.length; e++) pn(dn[e], fn[e]);
function pn(e, t) {
  let n = `get` + e.name.slice(0, -5),
    r;
  typeof e == `function` ? (r = e.BYTES_PER_ELEMENT) : (e = null);
  for (let i = 0; i < 2; i++) {
    if (!i && r == 1) continue;
    let a = r == 2 ? 1 : r == 4 ? 2 : r == 8 ? 3 : 0;
    D[i ? t : t - 4] =
      r == 1 || i == un
        ? (n) => {
            if (!e) throw Error(`Could not find typed array for code ` + t);
            return !w.copyBuffers &&
              (r === 1 ||
                (r === 2 && !(n.byteOffset & 1)) ||
                (r === 4 && !(n.byteOffset & 3)) ||
                (r === 8 && !(n.byteOffset & 7)))
              ? new e(n.buffer, n.byteOffset, n.byteLength >> a)
              : new e(Uint8Array.prototype.slice.call(n, 0).buffer);
          }
        : (r) => {
            if (!e) throw Error(`Could not find typed array for code ` + t);
            let o = new DataView(r.buffer, r.byteOffset, r.byteLength),
              s = r.length >> a,
              c = new e(s),
              l = o[n];
            for (let e = 0; e < s; e++) c[e] = l.call(o, e << a, i);
            return c;
          };
  }
}
function mn() {
  let e = hn(),
    t = C + k();
  for (let t = 2; t < e; t++) {
    let e = hn();
    C += e;
  }
  let n = C;
  return (
    (C = t),
    (E = [Xt(hn()), Xt(hn())]),
    (E.position0 = 0),
    (E.position1 = 0),
    (E.postBundlePosition = C),
    (C = n),
    k()
  );
}
function hn() {
  let e = S[C++] & 31;
  if (e > 23)
    switch (e) {
      case 24:
        e = S[C++];
        break;
      case 25:
        ((e = O.getUint16(C)), (C += 2));
        break;
      case 26:
        ((e = O.getUint32(C)), (C += 4));
        break;
    }
  return e;
}
function gn() {
  if (w.getShared) {
    let e = _n(() => ((S = null), w.getShared())) || {},
      t = e.structures || [];
    ((w.sharedVersion = e.version),
      (Rt = w.sharedValues = e.packedValues),
      T === !0 ? (w.structures = T = t) : T.splice.apply(T, [0, t.length].concat(t)));
  }
}
function _n(e) {
  let t = Tt,
    n = C,
    r = Mt,
    i = Pt,
    a = Ft,
    o = Nt,
    s = jt,
    c = It,
    l = E,
    u = new Uint8Array(S.slice(0, Tt)),
    d = T,
    f = w,
    p = Vt,
    m = e();
  return (
    (Tt = t),
    (C = n),
    (Mt = r),
    (Pt = i),
    (Ft = a),
    (Nt = o),
    (jt = s),
    (It = c),
    (E = l),
    (S = u),
    (Vt = p),
    (T = d),
    (w = f),
    (O = new DataView(S.buffer, S.byteOffset, S.byteLength)),
    m
  );
}
function vn() {
  ((S = null), (It = null), (T = null));
}
const yn = Array(147);
for (let e = 0; e < 256; e++) yn[e] = +(`1e` + Math.floor(45.15 - e * 0.30103));
let bn = new Ut({ useRecords: !1 });
const xn = bn.decode;
bn.decodeMultiple;
const Sn = { NEVER: 0, ALWAYS: 1, DECIMAL_ROUND: 3, DECIMAL_FIT: 4 };
let Cn;
try {
  Cn = new TextEncoder();
} catch {}
let wn, Tn;
const En = typeof globalThis == `object` && globalThis.Buffer,
  Dn = En !== void 0,
  On = Dn ? En.allocUnsafeSlow : Uint8Array,
  kn = Dn ? En : Uint8Array,
  An = Dn ? 4294967296 : 2144337920;
let jn,
  j,
  M,
  N = 0,
  Mn,
  P = null;
const Nn = /[\u0080-\uFFFF]/,
  Pn = Symbol(`record-id`);
var Fn = class extends Ut {
  constructor(e) {
    (super(e), (this.offset = 0));
    let t, n, r, i, a;
    e ||= {};
    let o = kn.prototype.utf8Write
        ? function (e, t, n) {
            return j.utf8Write(e, t, n);
          }
        : Cn && Cn.encodeInto
          ? function (e, t) {
              return Cn.encodeInto(e, j.subarray(t)).written;
            }
          : !1,
      s = this,
      c = e.structures || e.saveStructures,
      l = e.maxSharedStructures;
    if (((l ??= c ? 128 : 0), l > 8190)) throw Error(`Maximum maxSharedStructure is 8190`);
    let u = e.sequential;
    (u && (l = 0),
      (this.structures ||= []),
      this.saveStructures && (this.saveShared = this.saveStructures));
    let d,
      f,
      p = e.sharedValues,
      m;
    if (p) {
      m = Object.create(null);
      for (let e = 0, t = p.length; e < t; e++) m[p[e]] = e;
    }
    let h = [],
      g = 0,
      _ = 0;
    ((this.mapEncode = function (e, t) {
      if (this._keyMap && !this._mapped)
        switch (e.constructor.name) {
          case `Array`:
            e = e.map((e) => this.encodeKeys(e));
            break;
        }
      return this.encode(e, t);
    }),
      (this.encode = function (o, c) {
        if (
          (j || ((j = new On(8192)), (M = new DataView(j.buffer, 0, 8192)), (N = 0)),
          (Mn = j.length - 10),
          Mn - N < 2048
            ? ((j = new On(j.length)),
              (M = new DataView(j.buffer, 0, j.length)),
              (Mn = j.length - 10),
              (N = 0))
            : c === 512 && (N = (N + 7) & 2147483640),
          (t = N),
          s.useSelfDescribedHeader && (M.setUint32(N, 3654940416), (N += 3)),
          (a = s.structuredClone ? new Map() : null),
          s.bundleStrings && typeof o != `string` ? ((P = []), (P.size = 1 / 0)) : (P = null),
          (n = s.structures),
          n)
        ) {
          if (n.uninitialized) {
            let e = s.getShared() || {};
            ((s.structures = n = e.structures || []), (s.sharedVersion = e.version));
            let t = (s.sharedValues = e.packedValues);
            if (t) {
              m = {};
              for (let e = 0, n = t.length; e < n; e++) m[t[e]] = e;
            }
          }
          let e = n.length;
          if ((e > l && !u && (e = l), !n.transitions)) {
            n.transitions = Object.create(null);
            for (let t = 0; t < e; t++) {
              let e = n[t];
              if (!e) continue;
              let r,
                i = n.transitions;
              for (let n = 0, a = e.length; n < a; n++) {
                i[Pn] === void 0 && (i[Pn] = t);
                let a = e[n];
                ((r = i[a]), (r ||= i[a] = Object.create(null)), (i = r));
              }
              i[Pn] = t | 1048576;
            }
          }
          u || (n.nextId = e);
        }
        if (((r &&= !1), (i = n || []), (f = m), e.pack)) {
          let t = new Map();
          if (
            ((t.values = []),
            (t.encoder = s),
            (t.maxValues = e.maxPrivatePackedValues || (m ? 16 : 1 / 0)),
            (t.objectMap = m || !1),
            (t.samplingPackedValues = d),
            Vn(o, t),
            t.values.length > 0)
          ) {
            ((j[N++] = 216), (j[N++] = 51), Rn(4));
            let e = t.values;
            (v(e), Rn(0), Rn(0), (f = Object.create(m || null)));
            for (let t = 0, n = e.length; t < n; t++) f[e[t]] = t;
          }
        }
        jn = c & $n;
        try {
          if (jn) return;
          if ((v(o), P && Kn(t, v), (s.offset = N), a && a.idsToInsert)) {
            ((N += a.idsToInsert.length * 2), N > Mn && b(N), (s.offset = N));
            let e = Gn(j.subarray(t, N), a.idsToInsert);
            return ((a = null), e);
          }
          return c & 512 ? ((j.start = t), (j.end = N), j) : j.subarray(t, N);
        } finally {
          if (n) {
            if ((_ < 10 && _++, n.length > l && (n.length = l), g > 1e4))
              ((n.transitions = null), (_ = 0), (g = 0), h.length > 0 && (h = []));
            else if (h.length > 0 && !u) {
              for (let e = 0, t = h.length; e < t; e++) h[e][Pn] = void 0;
              h = [];
            }
          }
          if (r && s.saveShared) {
            s.structures.length > l && (s.structures = s.structures.slice(0, l));
            let e = j.subarray(t, N);
            return s.updateSharedData() === !1 ? s.encode(o) : e;
          }
          c & 1024 && (N = t);
        }
      }),
      (this.findCommonStringsToPack = () => (
        (d = new Map()),
        (m ||= Object.create(null)),
        (e) => {
          let t = (e && e.threshold) || 4,
            n = this.pack ? e.maxPrivatePackedValues || 16 : 0;
          p ||= this.sharedValues = [];
          for (let [e, i] of d) i.count > t && ((m[e] = n++), p.push(e), (r = !0));
          for (; this.saveShared && this.updateSharedData() === !1;);
          d = null;
        }
      )));
    let v = (n) => {
        N > Mn && (j = b(N));
        var r = typeof n,
          i;
        if (r === `string`) {
          if (f) {
            let t = f[n];
            if (t >= 0) {
              t < 16
                ? (j[N++] = t + 224)
                : ((j[N++] = 198), t & 1 ? v((15 - t) >> 1) : v((t - 16) >> 1));
              return;
            } else if (d && !e.pack) {
              let e = d.get(n);
              e ? e.count++ : d.set(n, { count: 1 });
            }
          }
          let r = n.length;
          if (P && r >= 4 && r < 1024) {
            if ((P.size += r) > 61440) {
              let e,
                n = (P[0] ? P[0].length * 3 + P[1].length : 0) + 10;
              (N + n > Mn && (j = b(N + n)),
                (j[N++] = 217),
                (j[N++] = 223),
                (j[N++] = 249),
                (j[N++] = P.position ? 132 : 130),
                (j[N++] = 26),
                (e = N - t),
                (N += 4),
                P.position && Kn(t, v),
                (P = [``, ``]),
                (P.size = 0),
                (P.position = e));
            }
            let e = Nn.test(n);
            ((P[+!e] += n), (j[N++] = e ? 206 : 207), v(r));
            return;
          }
          let a;
          a = r < 32 ? 1 : r < 256 ? 2 : r < 65536 ? 3 : 5;
          let s = r * 3;
          if ((N + s > Mn && (j = b(N + s)), r < 64 || !o)) {
            let e,
              t,
              o,
              s = N + a;
            for (e = 0; e < r; e++)
              ((t = n.charCodeAt(e)),
                t < 128
                  ? (j[s++] = t)
                  : t < 2048
                    ? ((j[s++] = (t >> 6) | 192), (j[s++] = (t & 63) | 128))
                    : (t & 64512) == 55296 && ((o = n.charCodeAt(e + 1)) & 64512) == 56320
                      ? ((t = 65536 + ((t & 1023) << 10) + (o & 1023)),
                        e++,
                        (j[s++] = (t >> 18) | 240),
                        (j[s++] = ((t >> 12) & 63) | 128),
                        (j[s++] = ((t >> 6) & 63) | 128),
                        (j[s++] = (t & 63) | 128))
                      : ((j[s++] = (t >> 12) | 224),
                        (j[s++] = ((t >> 6) & 63) | 128),
                        (j[s++] = (t & 63) | 128)));
            i = s - N - a;
          } else i = o(n, N + a, s);
          (i < 24
            ? (j[N++] = 96 | i)
            : i < 256
              ? (a < 2 && j.copyWithin(N + 2, N + 1, N + 1 + i), (j[N++] = 120), (j[N++] = i))
              : i < 65536
                ? (a < 3 && j.copyWithin(N + 3, N + 2, N + 2 + i),
                  (j[N++] = 121),
                  (j[N++] = i >> 8),
                  (j[N++] = i & 255))
                : (a < 5 && j.copyWithin(N + 5, N + 3, N + 3 + i),
                  (j[N++] = 122),
                  M.setUint32(N, i),
                  (N += 4)),
            (N += i));
        } else if (r === `number`)
          if (!this.alwaysUseFloat && n >>> 0 === n)
            n < 24
              ? (j[N++] = n)
              : n < 256
                ? ((j[N++] = 24), (j[N++] = n))
                : n < 65536
                  ? ((j[N++] = 25), (j[N++] = n >> 8), (j[N++] = n & 255))
                  : ((j[N++] = 26), M.setUint32(N, n), (N += 4));
          else if (!this.alwaysUseFloat && n >> 0 === n)
            n >= -24
              ? (j[N++] = 31 - n)
              : n >= -256
                ? ((j[N++] = 56), (j[N++] = ~n))
                : n >= -65536
                  ? ((j[N++] = 57), M.setUint16(N, ~n), (N += 2))
                  : ((j[N++] = 58), M.setUint32(N, ~n), (N += 4));
          else {
            let e;
            if ((e = this.useFloat32) > 0 && n < 4294967296 && n >= -2147483648) {
              ((j[N++] = 250), M.setFloat32(N, n));
              let t;
              if (e < 4 || (t = n * yn[((j[N] & 127) << 1) | (j[N + 1] >> 7)]) >> 0 === t) {
                N += 4;
                return;
              } else N--;
            }
            ((j[N++] = 251), M.setFloat64(N, n), (N += 8));
          }
        else if (r === `object`)
          if (!n) j[N++] = 246;
          else {
            if (a) {
              let e = a.get(n);
              if (e) {
                if (((j[N++] = 216), (j[N++] = 29), (j[N++] = 25), !e.references)) {
                  let t = (a.idsToInsert ||= []);
                  ((e.references = []), t.push(e));
                }
                (e.references.push(N - t), (N += 2));
                return;
              } else a.set(n, { offset: N - t });
            }
            let e = n.constructor;
            if (e === Object) y(n);
            else if (e === Array) {
              ((i = n.length), i < 24 ? (j[N++] = 128 | i) : Rn(i));
              for (let e = 0; e < i; e++) v(n[e]);
            } else if (e === Map)
              if (
                ((this.mapsAsObjects ? this.useTag259ForMaps !== !1 : this.useTag259ForMaps) &&
                  ((j[N++] = 217), (j[N++] = 1), (j[N++] = 3)),
                (i = n.size),
                i < 24
                  ? (j[N++] = 160 | i)
                  : i < 256
                    ? ((j[N++] = 184), (j[N++] = i))
                    : i < 65536
                      ? ((j[N++] = 185), (j[N++] = i >> 8), (j[N++] = i & 255))
                      : ((j[N++] = 186), M.setUint32(N, i), (N += 4)),
                s.keyMap)
              )
                for (let [e, t] of n) (v(s.encodeKey(e)), v(t));
              else for (let [e, t] of n) (v(e), v(t));
            else {
              for (let e = 0, t = wn.length; e < t; e++) {
                let t = Tn[e];
                if (n instanceof t) {
                  let t = wn[e],
                    r = t.tag;
                  ((r ??= t.getTag && t.getTag.call(this, n)),
                    r < 24
                      ? (j[N++] = 192 | r)
                      : r < 256
                        ? ((j[N++] = 216), (j[N++] = r))
                        : r < 65536
                          ? ((j[N++] = 217), (j[N++] = r >> 8), (j[N++] = r & 255))
                          : r > -1 && ((j[N++] = 218), M.setUint32(N, r), (N += 4)),
                    t.encode.call(this, n, v, b));
                  return;
                }
              }
              if (n[Symbol.iterator]) {
                if (jn) {
                  let e = Error(`Iterable should be serialized as iterator`);
                  throw ((e.iteratorNotHandled = !0), e);
                }
                j[N++] = 159;
                for (let e of n) v(e);
                j[N++] = 255;
                return;
              }
              if (n[Symbol.asyncIterator] || Bn(n)) {
                let e = Error(`Iterable/blob should be serialized as iterator`);
                throw ((e.iteratorNotHandled = !0), e);
              }
              if (this.useToJSON && n.toJSON) {
                let e = n.toJSON();
                if (e !== n) return v(e);
              }
              y(n);
            }
          }
        else if (r === `boolean`) j[N++] = n ? 245 : 244;
        else if (r === `bigint`) {
          if (n < BigInt(1) << BigInt(64) && n >= 0) ((j[N++] = 27), M.setBigUint64(N, n));
          else if (n > -(BigInt(1) << BigInt(64)) && n < 0)
            ((j[N++] = 59), M.setBigUint64(N, -n - BigInt(1)));
          else if (this.largeBigIntToFloat) ((j[N++] = 251), M.setFloat64(N, Number(n)));
          else {
            n >= BigInt(0) ? (j[N++] = 194) : ((j[N++] = 195), (n = BigInt(-1) - n));
            let e = [];
            for (; n;) (e.push(Number(n & BigInt(255))), (n >>= BigInt(8)));
            Wn(new Uint8Array(e.reverse()), b);
            return;
          }
          N += 8;
        } else if (r === `undefined`) j[N++] = 247;
        else throw Error(`Unknown type: ` + r);
      },
      y =
        this.useRecords === !1
          ? this.variableMapSize
            ? (e) => {
                let t = Object.keys(e),
                  n = Object.values(e),
                  r = t.length;
                if (
                  (r < 24
                    ? (j[N++] = 160 | r)
                    : r < 256
                      ? ((j[N++] = 184), (j[N++] = r))
                      : r < 65536
                        ? ((j[N++] = 185), (j[N++] = r >> 8), (j[N++] = r & 255))
                        : ((j[N++] = 186), M.setUint32(N, r), (N += 4)),
                  s.keyMap)
                )
                  for (let e = 0; e < r; e++) (v(s.encodeKey(t[e])), v(n[e]));
                else for (let e = 0; e < r; e++) (v(t[e]), v(n[e]));
              }
            : (e) => {
                j[N++] = 185;
                let n = N - t;
                N += 2;
                let r = 0;
                if (s.keyMap)
                  for (let t in e)
                    (typeof e.hasOwnProperty != `function` || e.hasOwnProperty(t)) &&
                      (v(s.encodeKey(t)), v(e[t]), r++);
                else
                  for (let t in e)
                    (typeof e.hasOwnProperty != `function` || e.hasOwnProperty(t)) &&
                      (v(t), v(e[t]), r++);
                ((j[n++ + t] = r >> 8), (j[n + t] = r & 255));
              }
          : (e, t) => {
              let n,
                a = (i.transitions ||= Object.create(null)),
                o = 0,
                s = 0,
                c,
                u;
              if (this.keyMap) {
                ((u = Object.keys(e).map((e) => this.encodeKey(e))), (s = u.length));
                for (let e = 0; e < s; e++) {
                  let t = u[e];
                  ((n = a[t]), n || ((n = a[t] = Object.create(null)), o++), (a = n));
                }
              } else
                for (let t in e)
                  (typeof e.hasOwnProperty != `function` || e.hasOwnProperty(t)) &&
                    ((n = a[t]),
                    n ||
                      (a[Pn] & 1048576 && (c = a[Pn] & 65535),
                      (n = a[t] = Object.create(null)),
                      o++),
                    (a = n),
                    s++);
              let d = a[Pn];
              if (d !== void 0)
                ((d &= 65535), (j[N++] = 217), (j[N++] = (d >> 8) | 224), (j[N++] = d & 255));
              else if (
                ((u ||= a.__keys__ ||= Object.keys(e)),
                c === void 0
                  ? ((d = i.nextId++),
                    d || ((d = 0), (i.nextId = 1)),
                    d >= 256 && (i.nextId = (d = l) + 1))
                  : (d = c),
                (i[d] = u),
                d < l)
              ) {
                ((j[N++] = 217),
                  (j[N++] = (d >> 8) | 224),
                  (j[N++] = d & 255),
                  (a = i.transitions));
                for (let e = 0; e < s; e++)
                  ((a[Pn] === void 0 || a[Pn] & 1048576) && (a[Pn] = d), (a = a[u[e]]));
                ((a[Pn] = d | 1048576), (r = !0));
              } else {
                if (
                  ((a[Pn] = d),
                  M.setUint32(N, 3655335680),
                  (N += 3),
                  o && (g += _ * o),
                  h.length >= 256 - l && (h.shift()[Pn] = void 0),
                  h.push(a),
                  Rn(s + 2),
                  v(57344 + d),
                  v(u),
                  t)
                )
                  return;
                for (let t in e)
                  (typeof e.hasOwnProperty != `function` || e.hasOwnProperty(t)) && v(e[t]);
                return;
              }
              if ((s < 24 ? (j[N++] = 128 | s) : Rn(s), !t))
                for (let t in e)
                  (typeof e.hasOwnProperty != `function` || e.hasOwnProperty(t)) && v(e[t]);
            },
      b = (e) => {
        let n;
        if (e > 16777216) {
          if (e - t > An) throw Error(`Encoded buffer would be larger than maximum buffer size`);
          n = Math.min(
            An,
            Math.round(Math.max((e - t) * (e > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096,
          );
        } else n = ((Math.max((e - t) << 2, j.length - 1) >> 12) + 1) << 12;
        let r = new On(n);
        return (
          (M = new DataView(r.buffer, 0, n)),
          j.copy ? j.copy(r, 0, t, e) : r.set(j.slice(t, e)),
          (N -= t),
          (t = 0),
          (Mn = r.length - 10),
          (j = r)
        );
      },
      ee = 100,
      te = 1e3;
    ((this.encodeAsIterable = function (e, t) {
      return ae(e, t, ne);
    }),
      (this.encodeAsAsyncIterable = function (e, t) {
        return ae(e, t, oe);
      }));
    function* ne(e, n, r) {
      let i = e.constructor;
      if (i === Object) {
        let t = s.useRecords !== !1;
        t ? y(e, !0) : In(Object.keys(e).length, 160);
        for (let r in e) {
          let i = e[r];
          (t || v(r),
            i && typeof i == `object` ? (n[r] ? yield* ne(i, n[r]) : yield* re(i, n, r)) : v(i));
        }
      } else if (i === Array) {
        let r = e.length;
        Rn(r);
        for (let i = 0; i < r; i++) {
          let r = e[i];
          r && (typeof r == `object` || N - t > ee)
            ? n.element
              ? yield* ne(r, n.element)
              : yield* re(r, n, `element`)
            : v(r);
        }
      } else if (e[Symbol.iterator] && !e.buffer) {
        j[N++] = 159;
        for (let r of e)
          r && (typeof r == `object` || N - t > ee)
            ? n.element
              ? yield* ne(r, n.element)
              : yield* re(r, n, `element`)
            : v(r);
        j[N++] = 255;
      } else
        Bn(e)
          ? (In(e.size, 64), yield j.subarray(t, N), yield e, ie())
          : e[Symbol.asyncIterator]
            ? ((j[N++] = 159), yield j.subarray(t, N), yield e, ie(), (j[N++] = 255))
            : v(e);
      r && N > t ? yield j.subarray(t, N) : N - t > ee && (yield j.subarray(t, N), ie());
    }
    function* re(e, n, r) {
      let i = N - t;
      try {
        (v(e), N - t > ee && (yield j.subarray(t, N), ie()));
      } catch (a) {
        if (a.iteratorNotHandled) ((n[r] = {}), (N = t + i), yield* ne.call(this, e, n[r]));
        else throw a;
      }
    }
    function ie() {
      ((ee = te), s.encode(null, $n));
    }
    function ae(e, t, n) {
      return (
        (ee = t && t.chunkThreshold ? (te = t.chunkThreshold) : 100),
        e && typeof e == `object`
          ? (s.encode(null, $n), n(e, (s.iterateProperties ||= {}), !0))
          : [s.encode(e)]
      );
    }
    async function* oe(e, t) {
      for (let n of ne(e, t, !0)) {
        let e = n.constructor;
        if (e === kn || e === Uint8Array) yield n;
        else if (Bn(n)) {
          let e = n.stream().getReader(),
            t;
          for (; !(t = await e.read()).done;) yield t.value;
        } else if (n[Symbol.asyncIterator])
          for await (let e of n) (ie(), e ? yield* oe(e, (t.async ||= {})) : yield s.encode(e));
        else yield n;
      }
    }
  }
  useBuffer(e) {
    ((j = e), (M = new DataView(j.buffer, j.byteOffset, j.byteLength)), (N = 0));
  }
  clearSharedData() {
    ((this.structures &&= []), (this.sharedValues &&= void 0));
  }
  updateSharedData() {
    let e = this.sharedVersion || 0;
    this.sharedVersion = e + 1;
    let t = this.structures.slice(0),
      n = new Ln(t, this.sharedValues, this.sharedVersion),
      r = this.saveShared(n, (t) => ((t && t.version) || 0) == e);
    return (
      r === !1
        ? ((n = this.getShared() || {}),
          (this.structures = n.structures || []),
          (this.sharedValues = n.packedValues),
          (this.sharedVersion = n.version),
          (this.structures.nextId = this.structures.length))
        : t.forEach((e, t) => (this.structures[t] = e)),
      r
    );
  }
};
function In(e, t) {
  e < 24
    ? (j[N++] = t | e)
    : e < 256
      ? ((j[N++] = t | 24), (j[N++] = e))
      : e < 65536
        ? ((j[N++] = t | 25), (j[N++] = e >> 8), (j[N++] = e & 255))
        : ((j[N++] = t | 26), M.setUint32(N, e), (N += 4));
}
var Ln = class {
  constructor(e, t, n) {
    ((this.structures = e), (this.packedValues = t), (this.version = n));
  }
};
function Rn(e) {
  e < 24
    ? (j[N++] = 128 | e)
    : e < 256
      ? ((j[N++] = 152), (j[N++] = e))
      : e < 65536
        ? ((j[N++] = 153), (j[N++] = e >> 8), (j[N++] = e & 255))
        : ((j[N++] = 154), M.setUint32(N, e), (N += 4));
}
const zn = typeof Blob > `u` ? function () {} : Blob;
function Bn(e) {
  if (e instanceof zn) return !0;
  let t = e[Symbol.toStringTag];
  return t === `Blob` || t === `File`;
}
function Vn(e, t) {
  switch (typeof e) {
    case `string`:
      if (e.length > 3) {
        if (t.objectMap[e] > -1 || t.values.length >= t.maxValues) return;
        let n = t.get(e);
        if (n) ++n.count == 2 && t.values.push(e);
        else if ((t.set(e, { count: 1 }), t.samplingPackedValues)) {
          let n = t.samplingPackedValues.get(e);
          n ? n.count++ : t.samplingPackedValues.set(e, { count: 1 });
        }
      }
      break;
    case `object`:
      if (e)
        if (e instanceof Array) for (let n = 0, r = e.length; n < r; n++) Vn(e[n], t);
        else {
          let r = !t.encoder.useRecords;
          for (var n in e) e.hasOwnProperty(n) && (r && Vn(n, t), Vn(e[n], t));
        }
      break;
    case `function`:
      console.log(e);
  }
}
const Hn = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
((Tn = [
  Date,
  Set,
  Error,
  RegExp,
  rn,
  ArrayBuffer,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  typeof BigUint64Array > `u` ? function () {} : BigUint64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  typeof BigInt64Array > `u` ? function () {} : BigInt64Array,
  Float32Array,
  Float64Array,
  Ln,
]),
  (wn = [
    {
      tag: 1,
      encode(e, t) {
        let n = e.getTime() / 1e3;
        (this.useTimestamp32 || e.getMilliseconds() === 0) && n >= 0 && n < 4294967296
          ? ((j[N++] = 26), M.setUint32(N, n), (N += 4))
          : ((j[N++] = 251), M.setFloat64(N, n), (N += 8));
      },
    },
    {
      tag: 258,
      encode(e, t) {
        t(Array.from(e));
      },
    },
    {
      tag: 27,
      encode(e, t) {
        t([e.name, e.message]);
      },
    },
    {
      tag: 27,
      encode(e, t) {
        t([`RegExp`, e.source, e.flags]);
      },
    },
    {
      getTag(e) {
        return e.tag;
      },
      encode(e, t) {
        t(e.value);
      },
    },
    {
      encode(e, t, n) {
        Wn(e, n);
      },
    },
    {
      getTag(e) {
        if (
          e.constructor === Uint8Array &&
          (this.tagUint8Array || (Dn && this.tagUint8Array !== !1))
        )
          return 64;
      },
      encode(e, t, n) {
        Wn(e, n);
      },
    },
    Un(68, 1),
    Un(69, 2),
    Un(70, 4),
    Un(71, 8),
    Un(72, 1),
    Un(77, 2),
    Un(78, 4),
    Un(79, 8),
    Un(85, 4),
    Un(86, 8),
    {
      encode(e, t) {
        let n = e.packedValues || [],
          r = e.structures || [];
        if (n.values.length > 0) {
          ((j[N++] = 216), (j[N++] = 51), Rn(4));
          let e = n.values;
          (t(e), Rn(0), Rn(0), (packedObjectMap = Object.create(sharedPackedObjectMap || null)));
          for (let t = 0, n = e.length; t < n; t++) packedObjectMap[e[t]] = t;
        }
        if (r) {
          (M.setUint32(N, 3655335424), (N += 3));
          let n = r.slice(0);
          (n.unshift(57344), n.push(new rn(e.version, 1399353956)), t(n));
        } else t(new rn(e.version, 1399353956));
      },
    },
  ]));
function Un(e, t) {
  return (
    !Hn && t > 1 && (e -= 4),
    {
      tag: e,
      encode: function (e, t) {
        let n = e.byteLength,
          r = e.byteOffset || 0,
          i = e.buffer || e;
        t(Dn ? En.from(i, r, n) : new Uint8Array(i, r, n));
      },
    }
  );
}
function Wn(e, t) {
  let n = e.byteLength;
  (n < 24
    ? (j[N++] = 64 + n)
    : n < 256
      ? ((j[N++] = 88), (j[N++] = n))
      : n < 65536
        ? ((j[N++] = 89), (j[N++] = n >> 8), (j[N++] = n & 255))
        : ((j[N++] = 90), M.setUint32(N, n), (N += 4)),
    N + n >= j.length && t(N + n),
    j.set(e.buffer ? e : new Uint8Array(e), N),
    (N += n));
}
function Gn(e, t) {
  let n,
    r = t.length * 2,
    i = e.length - r;
  t.sort((e, t) => (e.offset > t.offset ? 1 : -1));
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    r.id = n;
    for (let t of r.references) ((e[t++] = n >> 8), (e[t] = n & 255));
  }
  for (; (n = t.pop());) {
    let t = n.offset;
    (e.copyWithin(t + r, t, i), (r -= 2));
    let a = t + r;
    ((e[a++] = 216), (e[a++] = 28), (i = t));
  }
  return e;
}
function Kn(e, t) {
  M.setUint32(P.position + e, N - P.position - e + 1);
  let n = P;
  ((P = null), t(n[0]), t(n[1]));
}
let qn = new Fn({ useRecords: !1 });
const Jn = qn.encode;
(qn.encodeAsIterable, qn.encodeAsAsyncIterable);
const { NEVER: Yn, ALWAYS: Xn, DECIMAL_ROUND: Zn, DECIMAL_FIT: Qn } = Sn,
  $n = 2048;
var er = i((e, t) => {
    let n = () => process.platform === `linux`,
      r = null;
    t.exports = {
      isLinux: n,
      getReport: () => {
        if (!r)
          if (n() && process.report) {
            let e = process.report.excludeNetwork;
            ((process.report.excludeNetwork = !0),
              (r = process.report.getReport()),
              (process.report.excludeNetwork = e));
          } else r = {};
        return r;
      },
    };
  }),
  tr = i((t, n) => {
    let r = e(`fs`),
      i = 2048;
    n.exports = {
      LDD_PATH: `/usr/bin/ldd`,
      SELF_PATH: `/proc/self/exe`,
      readFileSync: (e) => {
        let t = r.openSync(e, `r`),
          n = Buffer.alloc(i),
          a = r.readSync(t, n, 0, i, 0);
        return (r.close(t, () => {}), n.subarray(0, a));
      },
      readFile: (e) =>
        new Promise((t, n) => {
          r.open(e, `r`, (e, a) => {
            if (e) n(e);
            else {
              let e = Buffer.alloc(i);
              r.read(a, e, 0, i, 0, (n, i) => {
                (t(e.subarray(0, i)), r.close(a, () => {}));
              });
            }
          });
        }),
    };
  }),
  nr = i((e, t) => {
    t.exports = {
      interpreterPath: (e) => {
        if (
          e.length < 64 ||
          e.readUInt32BE(0) !== 2135247942 ||
          e.readUInt8(4) !== 2 ||
          e.readUInt8(5) !== 1
        )
          return null;
        let t = e.readUInt32LE(32),
          n = e.readUInt16LE(54),
          r = e.readUInt16LE(56);
        for (let i = 0; i < r; i++) {
          let r = t + i * n;
          if (e.readUInt32LE(r) === 3) {
            let t = e.readUInt32LE(r + 8),
              n = e.readUInt32LE(r + 32);
            return e
              .subarray(t, t + n)
              .toString()
              .replace(/\0.*$/g, ``);
          }
        }
        return null;
      },
    };
  }),
  rr = i((t, n) => {
    let r = e(`child_process`),
      { isLinux: i, getReport: a } = er(),
      { LDD_PATH: o, SELF_PATH: s, readFile: c, readFileSync: l } = tr(),
      { interpreterPath: u } = nr(),
      d,
      f,
      p,
      m = `getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true`,
      h = ``,
      g = () =>
        h ||
        new Promise((e) => {
          r.exec(m, (t, n) => {
            ((h = t ? ` ` : n), e(h));
          });
        }),
      _ = () => {
        if (!h)
          try {
            h = r.execSync(m, { encoding: `utf8` });
          } catch {
            h = ` `;
          }
        return h;
      },
      v = `glibc`,
      y = /LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i,
      b = `musl`,
      ee = (e) => e.includes(`libc.musl-`) || e.includes(`ld-musl-`),
      te = () => {
        let e = a();
        return e.header && e.header.glibcVersionRuntime
          ? v
          : Array.isArray(e.sharedObjects) && e.sharedObjects.some(ee)
            ? b
            : null;
      },
      ne = (e) => {
        let [t, n] = e.split(/[\r\n]+/);
        return t && t.includes(v) ? v : n && n.includes(b) ? b : null;
      },
      re = (e) => {
        if (e) {
          if (e.includes(`/ld-musl-`)) return b;
          if (e.includes(`/ld-linux-`)) return v;
        }
        return null;
      },
      ie = (e) => (
        (e = e.toString()),
        e.includes(`musl`) ? b : e.includes(`GNU C Library`) ? v : null
      ),
      ae = async () => {
        if (f !== void 0) return f;
        f = null;
        try {
          f = ie(await c(o));
        } catch {}
        return f;
      },
      oe = () => {
        if (f !== void 0) return f;
        f = null;
        try {
          f = ie(l(o));
        } catch {}
        return f;
      },
      se = async () => {
        if (d !== void 0) return d;
        d = null;
        try {
          d = re(u(await c(s)));
        } catch {}
        return d;
      },
      ce = () => {
        if (d !== void 0) return d;
        d = null;
        try {
          d = re(u(l(s)));
        } catch {}
        return d;
      },
      le = async () => {
        let e = null;
        return (
          i() && ((e = await se()), e || ((e = await ae()), (e ||= te()), (e ||= ne(await g())))), e
        );
      },
      ue = () => {
        let e = null;
        return (i() && ((e = ce()), e || ((e = oe()), (e ||= te()), (e ||= ne(_())))), e);
      },
      de = async () => i() && (await le()) !== v,
      fe = () => i() && ue() !== v,
      pe = async () => {
        if (p !== void 0) return p;
        p = null;
        try {
          let e = (await c(o)).match(y);
          e && (p = e[1]);
        } catch {}
        return p;
      },
      me = () => {
        if (p !== void 0) return p;
        p = null;
        try {
          let e = l(o).match(y);
          e && (p = e[1]);
        } catch {}
        return p;
      },
      he = () => {
        let e = a();
        return e.header && e.header.glibcVersionRuntime ? e.header.glibcVersionRuntime : null;
      },
      ge = (e) => e.trim().split(/\s+/)[1],
      _e = (e) => {
        let [t, n, r] = e.split(/[\r\n]+/);
        return t && t.includes(v) ? ge(t) : n && r && n.includes(b) ? ge(r) : null;
      };
    n.exports = {
      GLIBC: v,
      MUSL: b,
      family: le,
      familySync: ue,
      isNonGlibcLinux: de,
      isNonGlibcLinuxSync: fe,
      version: async () => {
        let e = null;
        return (i() && ((e = await pe()), (e ||= he()), (e ||= _e(await g()))), e);
      },
      versionSync: () => {
        let e = null;
        return (i() && ((e = me()), (e ||= he()), (e ||= _e(_()))), e);
      },
    };
  }),
  ir = i((t, n) => {
    var r = e(`fs`),
      i = e(`path`),
      a = e(`url`),
      o = (process.config && process.config.variables) || {},
      s = !!process.env.PREBUILDS_ONLY,
      c = process.versions,
      l = c.modules;
    (c.deno || process.isBun) && (l = `unsupported`);
    var u = oe() ? `electron` : `node`,
      d = process.arch,
      f = process.platform,
      p = process.env.LIBC || (se(f) ? `musl` : `glibc`),
      m = process.env.ARM_VERSION || (d === `arm64` ? `8` : o.arm_version) || ``,
      h = (c.uv || ``).split(`.`)[0];
    n.exports = g;
    function g(t) {
      return typeof __webpack_require__ == `function`
        ? __non_webpack_require__(g.path(t))
        : e(g.path(t));
    }
    g.path = function (t) {
      t = i.resolve(t || `.`);
      var n = ``;
      try {
        n =
          typeof __webpack_require__ == `function`
            ? __non_webpack_require__(i.join(t, `package.json`)).name
            : e(i.join(t, `package.json`)).name;
        var r = n.toUpperCase().replace(/-/g, `_`) + `_PREBUILD`;
        process.env[r] && (t = process.env[r]);
      } catch {}
      if (!s) {
        var o = v(i.join(t, `build/Release`), y);
        if (o) return o;
        var c = v(i.join(t, `build/Debug`), y);
        if (c) return c;
      }
      var g = ce(t);
      if (g) return g;
      var ie = ce(i.dirname(process.execPath));
      if (ie) return ie;
      var oe = (n[0] == `@` ? `` : `@` + n + `/`) + n + `-` + f + `-` + d;
      try {
        return le(
          i.dirname(
            e(`module`)
              .createRequire(a.pathToFileURL(i.join(t, `package.json`)))
              .resolve(oe),
          ),
        );
      } catch {}
      var se = [
        `platform=` + f,
        `arch=` + d,
        `runtime=` + u,
        `abi=` + l,
        `uv=` + h,
        m ? `armv=` + m : ``,
        `libc=` + p,
        `node=` + process.versions.node,
        process.versions.electron ? `electron=` + process.versions.electron : ``,
        typeof __webpack_require__ == `function` ? `webpack=true` : ``,
      ]
        .filter(Boolean)
        .join(` `);
      throw Error(
        `No native build was found for ` +
          se +
          `
    attempted loading from: ` +
          t +
          ` and package: ` +
          oe +
          `
`,
      );
      function ce(e) {
        var t = _(i.join(e, `prebuilds`)).map(b).filter(ee(f, d)).sort(te)[0];
        if (t) return le(i.join(e, `prebuilds`, t.name));
      }
      function le(e) {
        var t = _(e).map(ne).filter(re(u, l)).sort(ae(u))[0];
        if (t) return i.join(e, t.file);
      }
    };
    function _(e) {
      try {
        return r.readdirSync(e);
      } catch {
        return [];
      }
    }
    function v(e, t) {
      var n = _(e).filter(t);
      return n[0] && i.join(e, n[0]);
    }
    function y(e) {
      return /\.node$/.test(e);
    }
    function b(e) {
      var t = e.split(`-`);
      if (t.length === 2) {
        var n = t[0],
          r = t[1].split(`+`);
        if (n && r.length && r.every(Boolean)) return { name: e, platform: n, architectures: r };
      }
    }
    function ee(e, t) {
      return function (n) {
        return n == null || n.platform !== e ? !1 : n.architectures.includes(t);
      };
    }
    function te(e, t) {
      return e.architectures.length - t.architectures.length;
    }
    function ne(e) {
      var t = e.split(`.`),
        n = t.pop(),
        r = { file: e, specificity: 0 };
      if (n === `node`) {
        for (var i = 0; i < t.length; i++) {
          var a = t[i];
          if (a === `node` || a === `electron` || a === `node-webkit`) r.runtime = a;
          else if (a === `napi`) r.napi = !0;
          else if (a.slice(0, 3) === `abi`) r.abi = a.slice(3);
          else if (a.slice(0, 2) === `uv`) r.uv = a.slice(2);
          else if (a.slice(0, 4) === `armv`) r.armv = a.slice(4);
          else if (a === `glibc` || a === `musl`) r.libc = a;
          else continue;
          r.specificity++;
        }
        return r;
      }
    }
    function re(e, t) {
      return function (n) {
        return !(
          n == null ||
          (n.runtime !== e && !ie(n)) ||
          (n.abi !== t && !n.napi) ||
          (n.uv && n.uv !== h) ||
          (n.armv && n.armv !== m) ||
          (n.libc && n.libc !== p)
        );
      };
    }
    function ie(e) {
      return e.runtime === `node` && e.napi;
    }
    function ae(e) {
      return function (t, n) {
        return t.runtime === n.runtime
          ? t.abi === n.abi
            ? t.specificity === n.specificity
              ? 0
              : t.specificity > n.specificity
                ? -1
                : 1
            : t.abi
              ? -1
              : 1
          : t.runtime === e
            ? -1
            : 1;
      };
    }
    function oe() {
      return (process.versions && process.versions.electron) || process.env.ELECTRON_RUN_AS_NODE
        ? !0
        : typeof window < `u` && window.process && window.process.type === `renderer`;
    }
    function se(e) {
      if (e !== `linux`) return !1;
      let { familySync: t, MUSL: n } = rr();
      return t() === n;
    }
    ((g.parseTags = ne),
      (g.matchTags = re),
      (g.compareTags = ae),
      (g.parseTuple = b),
      (g.matchTuple = ee),
      (g.compareTuples = te));
  }),
  ar = i((e, t) => {
    t.exports = ir()(__dirname);
  });
if (
  !(
    process.env.CBOR_NATIVE_ACCELERATION_DISABLED !== void 0 &&
    process.env.CBOR_NATIVE_ACCELERATION_DISABLED.toLowerCase() === `true`
  )
) {
  let t;
  try {
    ((t = typeof e == `function` ? ar() : ft(import.meta.url)(`cbor-extract`)),
      t && Yt(t.extractStrings));
  } catch {}
}
var or = Ne();
let sr, cr, lr, ur;
const dr = { connections: 8, keepAliveTimeout: 1e4, pipelining: 1 },
  fr = { ...dr, allowH2: !1 },
  pr = { ...dr, allowH2: !0 },
  mr = { retryAfter: !0, statusCodes: [500, 502, 503, 504] },
  hr = { retryAfter: !0, methods: [`PUT`], statusCodes: [429] },
  gr = { retryAfter: !0, methods: [`PUT`], statusCodes: [429, 500, 502, 503, 504] };
function _r(e) {
  return e?.dispatcher ?? Sr();
}
function vr(e) {
  return e?.dispatcher ?? Cr();
}
function yr(e) {
  return e?.dispatcher ?? wr();
}
function br(e) {
  return e?.dispatcher ?? Tr();
}
function xr(e, t) {
  return new or.RetryAgent(new or.Agent(e), t);
}
function Sr() {
  return ((sr ??= xr(fr, mr)), sr);
}
function Cr() {
  return ((cr ??= xr(pr, mr)), cr);
}
function wr() {
  return ((lr ??= xr(pr, hr)), lr);
}
function Tr() {
  return ((ur ??= xr(pr, gr)), ur);
}
let Er = null;
async function Dr() {
  return (
    (Er ||= import(`../../_chunks/workflow/src-D1EltLDA.js`)
      .then((e) => n(e.t(), 1))
      .catch(
        (e) => (
          typeof process < `u` &&
            typeof process.env.DEBUG == `string` &&
            (process.env.DEBUG.includes(`workflow:`) || process.env.DEBUG === `*`) &&
            console.warn(
              `[workflow] @opentelemetry/api unavailable — world-vercel spans disabled:`,
              e instanceof Error ? e.message : e,
            ),
          null
        ),
      )),
    Er
  );
}
let Or = null;
function kr() {
  return (
    typeof process < `u` &&
    typeof process.env.DEBUG == `string` &&
    (process.env.DEBUG.includes(`workflow:`) || process.env.DEBUG === `*`)
  );
}
let Ar = !1;
function jr(e, t) {
  if (!(Ar || !kr())) {
    Ar = !0;
    try {
      let n = globalThis[Symbol.for(`opentelemetry.js.api.1`)],
        r = e.trace.getTracerProvider(),
        i = r.getDelegate?.() ?? r,
        a = t.startSpan(`workflow.otel.probe.world_vercel`);
      (console.warn(
        `[workflow:otel-diag] world-vercel`,
        JSON.stringify({
          globalRegistrationVersion: n?.version ?? null,
          providerCtor: r?.constructor?.name ?? null,
          delegateCtor: i?.constructor?.name ?? null,
          tracerCtor: t?.constructor?.name ?? null,
          probeCtor: a?.constructor?.name ?? null,
          probeRecording: a.isRecording(),
        }),
      ),
        a.end());
    } catch (e) {
      console.warn(`[workflow:otel-diag] world-vercel failed:`, e instanceof Error ? e.message : e);
    }
  }
}
async function Mr() {
  return (
    (Or ||= Dr().then((e) => {
      if (!e) return null;
      let t = e.trace.getTracer(`workflow`);
      return (jr(e, t), t);
    })),
    Or
  );
}
async function Nr(e, ...t) {
  let [n, r] = await Promise.all([Mr(), Dr()]),
    { fn: i, opts: a } =
      typeof t[0] == `function` ? { fn: t[0], opts: {} } : { fn: t[1], opts: t[0] };
  if (!i) throw Error(`Function to trace must be provided`);
  return !n || !r
    ? await i()
    : n.startActiveSpan(e, a, async (e) => {
        try {
          let t = await i(e);
          return (e.setStatus({ code: r.SpanStatusCode.OK }), t);
        } catch (t) {
          throw (e.setStatus({ code: r.SpanStatusCode.ERROR, message: t.message }), t);
        } finally {
          e.end();
        }
      });
}
async function Pr(e) {
  let t = await Dr();
  if (t) return t.SpanKind[e];
}
async function Fr(e) {
  let t = await Dr();
  if (!t) return;
  let n = {};
  t.propagation.inject(t.context.active(), n);
  for (let [t, r] of Object.entries(n)) e.set(t, r);
}
function F(...e) {
  return (t) => Object.fromEntries(e.map((e) => [e, t]));
}
const Ir = F(`http.request.method`),
  Lr = F(`url.full`),
  Rr = F(`server.address`),
  zr = F(`server.port`),
  Br = F(`http.response.status_code`),
  Vr = F(`error.type`),
  Hr = F(`workflow.world.parse.format`),
  Ur = F(`peer.service`),
  Wr = F(`rpc.system`),
  Gr = F(`rpc.service`),
  Kr = F(`rpc.method`),
  qr = F(`workflow.run.id`),
  Jr = F(`step.id`),
  Yr = F(`workflow.stream.name`),
  Xr = F(`workflow.stream.operation`),
  Zr = F(`workflow.stream.start_index`),
  Qr = () => we(`WORKFLOW_REQUEST_TIMEOUT_MS`, 6e4, { integer: !0, min: 1 }),
  $r =
    typeof process < `u` &&
    typeof process.env.DEBUG == `string` &&
    (process.env.DEBUG.includes(`workflow:`) || process.env.DEBUG === `*`),
  ei = [`x-vercel-id`, `x-vercel-error`, `x-vercel-mitigated`];
function ti(e) {
  return ei.flatMap((t) => {
    let n = e.get(t);
    return n ? [`${t}=${n}`] : [];
  });
}
function ni(e) {
  let t = ti(e);
  return t.length > 0 ? ` (${t.join(`; `)})` : ``;
}
function ri(e, t, n, r) {
  if (!$r) return;
  let i = ti(n.headers),
    a = i.length > 0 ? `; ${i.join(`; `)}` : ``;
  console.debug(`[workflow:world-vercel:http] ${e} ${t} -> ${n.status} (${r}ms${a})`);
}
function ii(e, t, n) {
  if (!process.env.DEBUG) return;
  let r = Array.from(n.entries())
    .filter(([e]) => e.toLowerCase() !== `authorization`)
    .map(([e, t]) => `-H "${e}: ${t}"`)
    .join(` `);
  console.error(`Failed to fetch, reproduce with:\ncurl -X ${e} ${r} "${t}"`);
}
function ai(e) {
  if (!e) return;
  let t = parseInt(e, 10);
  return Number.isNaN(t) ? void 0 : t;
}
function oi(e, t, n = {}) {
  let { retryAfter: r, code: i, url: o, mitigated: d } = n;
  return e === 409
    ? new f(t)
    : e === 410
      ? new l(t)
      : e === 412
        ? new c(t, { retryAfter: r })
        : e === 425
          ? new s(t, { retryAfter: r })
          : e === 429
            ? si(e, d)
              ? new a(`${t} (x-vercel-mitigated=challenge)`, {
                  url: o,
                  status: e,
                  code: `TRANSPORT`,
                  retryAfter: r,
                })
              : new u(t, { retryAfter: r })
            : new a(t, { url: o, status: e, code: i, retryAfter: r });
}
function si(e, t) {
  return e === 429 && t === `challenge`;
}
async function ci(e) {
  return (
    e?.token ?? process.env.VERCEL_TOKEN ?? (await (0, Ct.getVercelOidcToken)().catch(() => null))
  );
}
function li(e) {
  try {
    let t = new URL(e);
    return {
      serverAddress: t.hostname,
      serverPort: t.port ? parseInt(t.port, 10) : t.protocol === `https:` ? 443 : 80,
    };
  } catch {
    return {};
  }
}
function ui(e) {
  let { method: t, url: n, peerService: r } = e,
    { serverAddress: i, serverPort: a } = li(n);
  return {
    ...Ir(t),
    ...Lr(n),
    ...(i ? Rr(i) : {}),
    ...(a ? zr(a) : {}),
    ...Ur(r),
    ...Wr(`http`),
    ...Gr(r),
  };
}
async function di(e) {
  let {
      method: t,
      url: n,
      headers: r,
      body: i,
      dispatcher: o,
      peerService: s = `workflow-server`,
      timeoutMs: c = Qr(),
      signal: l,
      injectTraceContext: u = !0,
      cacheBust: d = !0,
      logLabel: f,
      buildError: p,
      spanName: m,
      attributes: h,
      durationAttribute: g,
    } = e,
    _ = f ?? n;
  return Nr(m ?? `http ${t}`, { kind: await Pr(`CLIENT`) }, async (e) => {
    if (m && $r && e) {
      let t = e.spanContext();
      console.warn(
        `[workflow:otel-diag] span-open`,
        JSON.stringify({
          spanName: m,
          traceId: t.traceId,
          spanId: t.spanId,
          recording: e.isRecording(),
        }),
      );
    }
    (e?.setAttributes(ui({ method: t, url: n, peerService: s })),
      h && e?.setAttributes(h),
      u && (await Fr(r)),
      d && r.set(`X-Request-Time`, Date.now().toString()));
    let f = c == null ? void 0 : AbortSignal.timeout(c),
      v = l && f ? AbortSignal.any([l, f]) : (l ?? f),
      y = Date.now(),
      b;
    try {
      b = await fetch(n, { method: t, headers: r, body: i, signal: v, dispatcher: o });
    } catch (r) {
      let i = Date.now() - y;
      if (r instanceof Error && (r.name === `TimeoutError` || r.name === `AbortError`)) {
        let o = new a(`${t} ${_} timed out after ${i}ms`, { url: n, cause: r });
        throw (e?.setAttributes({ ...Vr(`TIMEOUT`) }), e?.recordException?.(o), o);
      }
      throw r;
    }
    let ee = Date.now() - y;
    if (
      (ri(t, _, b, ee),
      e?.setAttributes({ ...Br(b.status) }),
      g && e?.setAttributes({ [g]: ee }),
      !b.ok)
    ) {
      if ((e?.setAttributes({ ...Vr(`HTTP ${b.status}`) }), ii(t, n, r), p)) {
        let t = await p(b);
        throw (e?.recordException?.(t), t);
      }
      let i = await b.text().catch(() => ``),
        a = oi(
          b.status,
          `${t} ${_} -> HTTP ${b.status}: ${b.statusText}${i ? ` ${i}` : ``}${ni(b.headers)}`,
          { url: n, retryAfter: ai(b.headers.get(`Retry-After`)) },
        );
      throw (e?.recordException?.(a), a);
    }
    return b;
  });
}
const fi = `5.0.0-beta.32`,
  pi = new Set([`GET`, `HEAD`]),
  mi = new Set([
    `UND_ERR_REQ_RETRY`,
    `UND_ERR_SOCKET`,
    `UND_ERR_CONNECT`,
    `UND_ERR_CONNECT_TIMEOUT`,
    `UND_ERR_HEADERS_TIMEOUT`,
    `UND_ERR_BODY_TIMEOUT`,
    `UND_ERR_CLOSED`,
    `ECONNRESET`,
    `ECONNREFUSED`,
    `ENOTFOUND`,
    `EAI_AGAIN`,
    `EPIPE`,
  ]);
function hi(e) {
  let t = e;
  for (let e = 0; t != null && e < 5; e++) {
    if (typeof t == `object` && `code` in t) {
      let e = t.code;
      if (typeof e == `string` && mi.has(e)) return e;
    }
    t = t?.cause;
  }
}
const gi = () => process.env.VERCEL_WORKFLOW_SERVER_URL || ``,
  _i = () => process.env.WORKFLOW_TEST_LIMIT_OVERRIDES?.trim() || ``;
function vi(e) {
  return e;
}
const yi = (...e) => e.filter(Boolean).join(` `),
  bi = () => {
    let e = process.env.VERCEL_DEPLOYMENT_ID;
    return e
      ? `@workflow/world-vercel/${fi} node-${process.version} ${lt.platform()} (${lt.arch()}) ${e}`
      : `@workflow/world-vercel/${fi} node-${process.version} ${lt.platform()} (${lt.arch()})`;
  },
  xi = (e) => {
    let t = e?.projectConfig,
      n = gi() || `https://vercel-workflow.com`,
      r = process.env.WORKFLOW_VERCEL_BACKEND_URL,
      i = !!(t?.projectId && t?.teamId);
    return { baseUrl: i ? r || `https://api.vercel.com/v1/workflow` : `${n}/api`, usingProxy: i };
  },
  Si = (e, t) => {
    let n = e?.projectConfig,
      r = new Headers(e?.headers);
    r.set(`User-Agent`, yi(bi(), r.get(`User-Agent`)));
    let i = _i();
    (i && r.set(`x-workflow-test-limit-overrides`, i),
      n &&
        (r.set(`x-vercel-environment`, n.environment || `production`),
        n.projectId && r.set(`x-vercel-project-id`, n.projectId),
        n.teamId && r.set(`x-vercel-team-id`, n.teamId)));
    let a = gi();
    return (a && t.usingProxy && r.set(`x-vercel-workflow-api-url`, a), r);
  };
async function Ci(e) {
  let { baseUrl: t, usingProxy: n } = xi(e),
    r = Si(e, { usingProxy: n });
  if (n) {
    if (!e?.token)
      throw Error(
        `world-vercel: api-workflow proxy requested (${t}) but no Vercel auth token was provided. Pass one as \`config.token\` (the SDK reads it from \`WORKFLOW_VERCEL_AUTH_TOKEN\`).`,
      );
    r.set(`Authorization`, `Bearer ${e.token}`);
  } else {
    let t;
    try {
      t = await (0, Ct.getVercelOidcToken)();
    } catch {}
    let n = e?.token ?? t;
    (n && r.set(`Authorization`, `Bearer ${n}`), t && r.set(`x-vercel-trusted-oidc-idp-token`, t));
  }
  return { baseUrl: t, headers: r, usingProxy: n };
}
async function I({
  endpoint: e,
  options: t = {},
  config: n = {},
  schema: r,
  data: i,
  onResponse: o,
  retryConnectTimeout: s = !1,
}) {
  let c = t.method || `GET`,
    { baseUrl: l, headers: u } = await Ci(n),
    d = `${l}${e}`;
  return Nr(`http ${c}`, { kind: await Pr(`CLIENT`) }, async (l) => {
    (l?.setAttributes(ui({ method: c, url: d, peerService: `workflow-server` })),
      u.set(`Accept`, `application/cbor`),
      await Fr(u));
    let f;
    i !== void 0 && (u.set(`Content-Type`, `application/cbor`), (f = Jn(i)));
    let p = pi.has(c.toUpperCase()),
      m,
      h = ``;
    for (let r = 0; ; r++) {
      u.set(`X-Request-Time`, Date.now().toString());
      let i = AbortSignal.timeout(Qr()),
        g = t.signal ? AbortSignal.any([t.signal, i]) : i,
        _ = new Request(d, { ...t, body: f, headers: u, signal: g }),
        v = Date.now(),
        y;
      try {
        y = await fetch(_, { dispatcher: _r(n) });
      } catch (t) {
        let n = Date.now() - v;
        if (t instanceof Error && (t.name === `TimeoutError` || t.name === `AbortError`)) {
          let r = new a(`${c} ${e} timed out after ${n}ms`, { url: d, code: `TIMEOUT`, cause: t });
          throw (l?.setAttributes({ ...Vr(`TIMEOUT`) }), l?.recordException?.(r), r);
        }
        let i = hi(t);
        if (i) {
          if (s && p && i === `UND_ERR_CONNECT_TIMEOUT` && r === 0) {
            await new Promise((e) => setTimeout(e, 100));
            continue;
          }
          let o = new a(`${c} ${e} transport failure after ${n}ms (${i})`, {
            url: d,
            code: `TRANSPORT`,
            cause: t,
          });
          throw (l?.setAttributes({ ...Vr(`TRANSPORT`) }), l?.recordException?.(o), o);
        }
        throw t;
      }
      let b = Date.now() - v;
      if (((h = ni(y.headers)), ri(c, e, y, b), l?.setAttributes({ ...Br(y.status) }), !y.ok)) {
        let t = await Ti(y)
            .then((e) => e.data)
            .catch(() => ({})),
          n = t.code ?? t.error;
        ii(_.method, d, u);
        let r = ai(y.headers.get(`Retry-After`)),
          i = (t.message || `${_.method} ${e} -> HTTP ${y.status}: ${y.statusText}`) + h,
          a = oi(y.status, i, {
            url: d,
            code: n,
            retryAfter: r,
            mitigated: y.headers.get(`x-vercel-mitigated`),
          });
        throw (l?.setAttributes({ ...Vr(n || `HTTP ${y.status}`) }), l?.recordException?.(a), a);
      }
      o?.(y);
      try {
        m = await Nr(`world.parse`, async (e) => {
          let t = await Ti(y),
            n = (y.headers.get(`Content-Type`) || ``).includes(`application/cbor`);
          return (e?.setAttributes({ ...Hr(n ? `cbor` : `json`) }), t);
        });
        break;
      } catch (t) {
        if (p && r < 2) {
          let n = 100 * 2 ** r;
          (l?.setAttributes({ ...Vr(`PARSE_ERROR_RETRYING`) }),
            $r &&
              console.debug(
                `[workflow:world-vercel:http] ${c} ${e} body parse failed (attempt ${r + 1}/3); retrying in ${n}ms: ${t}`,
              ),
            await new Promise((e) => setTimeout(e, n)));
          continue;
        }
        let n = y.headers.get(`Content-Type`) || `unknown`;
        throw new a(
          `Failed to parse response body for ${c} ${e}${h} (Content-Type: ${n}):\n\n${t}`,
          { url: d, code: `PARSE_ERROR`, cause: t },
        );
      }
    }
    return await Nr(`world.validate`, async () => {
      let t = r.safeParse(m.data);
      if (!t.success) {
        let n = t.error.issues.map(
            (e) => `  ${e.path.length > 0 ? e.path.join(`.`) : `<root>`}: ${e.message}`,
          ).join(`
`),
          r = process.env.DEBUG ? `\n\nResponse context: ${m.getDebugContext()}` : ``;
        throw new a(`Schema validation failed for ${c} ${e}${h}:\n${n}${r}`, {
          url: d,
          code: `SCHEMA_VALIDATION`,
          cause: t.error,
        });
      }
      return t.data;
    });
  });
}
function wi(e) {
  let t = rt(e, { depth: 3, maxArrayLength: 10, breakLength: 120 });
  return t.length > 500 ? `${t.slice(0, 500)}...` : t;
}
async function Ti(e) {
  let t = e.headers.get(`Content-Type`) || ``;
  if (t.includes(`application/cbor`)) {
    let n = await e.arrayBuffer(),
      r = xn(new Uint8Array(n));
    return {
      data: r,
      getDebugContext: () => `Content-Type: ${t}, ${n.byteLength} bytes (CBOR), preview: ${wi(r)}`,
    };
  }
  let n = await e.text(),
    r = JSON.parse(n);
  return {
    data: r,
    getDebugContext: () => `Content-Type: ${t}, ${n.length} bytes, preview: ${wi(r)}`,
  };
}
function Ei(e, t) {
  (t?.limit && e.set(`limit`, t.limit.toString()),
    t?.cursor && e.set(`cursor`, t.cursor),
    t?.sortOrder && e.set(`sortOrder`, t.sortOrder));
}
function Di(e) {
  let t = e.toString();
  return t ? `?${t}` : ``;
}
function Oi(e, t) {
  (t.workflowName && e.set(`workflowName`, t.workflowName),
    t.startTime && t.endTime && (e.set(`startTime`, t.startTime), e.set(`endTime`, t.endTime)),
    Ei(e, t.pagination));
}
function ki(e) {
  return {
    runs: {
      get(t) {
        return I({
          endpoint: `/v2/analytics/runs/${encodeURIComponent(t)}`,
          config: e,
          schema: ne,
        });
      },
      list(t = {}) {
        let n = new URLSearchParams();
        return (
          t.workflowName && n.set(`workflowName`, t.workflowName),
          t.status && n.set(`status`, t.status),
          t.startTime &&
            t.endTime &&
            (n.set(`startTime`, t.startTime), n.set(`endTime`, t.endTime)),
          t.attributes &&
            Object.keys(t.attributes).length > 0 &&
            n.set(`attributes`, JSON.stringify(t.attributes)),
          Ei(n, t.pagination),
          I({ endpoint: `/v2/analytics/runs${Di(n)}`, config: e, schema: fe(ne) })
        );
      },
    },
    attributes: {
      list(t = {}) {
        let n = new URLSearchParams();
        return (
          Oi(n, t), I({ endpoint: `/v2/analytics/attributes${Di(n)}`, config: e, schema: fe(te) })
        );
      },
    },
    steps: {
      get(t, n) {
        return I({
          endpoint: `/v2/analytics/runs/${encodeURIComponent(t)}/steps/${encodeURIComponent(n)}`,
          config: e,
          schema: g,
        });
      },
      list(t) {
        let n = new URLSearchParams();
        return (
          Ei(n, t.pagination),
          I({
            endpoint: `/v2/analytics/runs/${encodeURIComponent(t.runId)}/steps${Di(n)}`,
            config: e,
            schema: fe(g),
          })
        );
      },
    },
    events: {
      get(t, n) {
        return I({
          endpoint: `/v2/analytics/runs/${encodeURIComponent(t)}/events/${encodeURIComponent(n)}`,
          config: e,
          schema: m,
        });
      },
      list(t) {
        let n = new URLSearchParams();
        return (
          t.eventType && n.set(`eventType`, t.eventType),
          t.correlationId && n.set(`correlationId`, t.correlationId),
          Ei(n, t.pagination),
          I({
            endpoint: `/v2/analytics/runs/${encodeURIComponent(t.runId)}/events${Di(n)}`,
            config: e,
            schema: fe(m),
          })
        );
      },
      listByCorrelationId(t) {
        let n = new URLSearchParams();
        return (
          n.set(`correlationId`, t.correlationId),
          Ei(n, t.pagination),
          I({ endpoint: `/v2/analytics/events${Di(n)}`, config: e, schema: fe(m) })
        );
      },
    },
    hooks: {
      get(t, n) {
        let r = new URLSearchParams();
        return (
          n?.runId && r.set(`runId`, n.runId),
          I({
            endpoint: `/v2/analytics/hooks/${encodeURIComponent(t)}${Di(r)}`,
            config: e,
            schema: Ce,
          })
        );
      },
      list(t) {
        let n = new URLSearchParams();
        return (
          n.set(`runId`, t.runId),
          Ei(n, t.pagination),
          I({ endpoint: `/v2/analytics/hooks${Di(n)}`, config: e, schema: fe(Ce) })
        );
      },
    },
    waits: {
      get(t, n) {
        return I({
          endpoint: `/v2/analytics/runs/${encodeURIComponent(t)}/waits/${encodeURIComponent(n)}`,
          config: e,
          schema: h,
        });
      },
      list(t) {
        let n = new URLSearchParams();
        return (
          t.status && n.set(`status`, t.status),
          Ei(n, t.pagination),
          I({
            endpoint: `/v2/analytics/runs/${encodeURIComponent(t.runId)}/waits${Di(n)}`,
            config: e,
            schema: fe(h),
          })
        );
      },
    },
  };
}
const Ai = he();
let ji;
function Mi(e) {
  let t = je(e),
    n = 5,
    r = 1;
  for (; n >= 0 && r > 0;) {
    let e = t[n] + r;
    ((t[n] = e & 255), (r = e >> 8), n--);
  }
  if (r > 0) throw Error(`ULID space exhausted`);
  return ke(t);
}
function Ni(e) {
  return typeof e != `string` || e === `` || e === `unknown`
    ? null
    : Object.hasOwn(De, e)
      ? e
      : null;
}
function Pi(e) {
  return Ni(e?.region) ?? Ni(process.env.VERCEL_REGION) ?? `iad1`;
}
function Fi(e) {
  let t = De[Pi(e)],
    n = Oe(Ai(), t);
  if (ji !== void 0) for (; n <= ji;) n = Oe(Mi(ji), t);
  return ((ji = n), n);
}
function Ii(e) {
  let t = e.startsWith(`wrun_`) ? e.slice(5) : e;
  try {
    let e = Me(t);
    return e.tagged && e.region ? e.region : Ae;
  } catch {
    return null;
  }
}
function Li(e) {
  let t = e.runId;
  return typeof t != `string` || t.length === 0 ? null : { region: Ii(t) };
}
async function Ri(e, t, n) {
  if (e.length !== 32)
    throw Error(
      `Invalid deployment key length: expected 32 bytes for AES-256, got ${e.length} bytes`,
    );
  if (!t || typeof t != `string`) throw Error(`projectId must be a non-empty string`);
  let r = await et.subtle.importKey(`raw`, e, `HKDF`, !1, [`deriveBits`]),
    i = new TextEncoder().encode(`${t}|${n}`),
    a = await et.subtle.deriveBits(
      { name: `HKDF`, hash: `SHA-256`, salt: new Uint8Array(32), info: i },
      r,
      256,
    );
  return new Uint8Array(a);
}
async function zi(e, t, n, r) {
  let i = await ci({ token: r?.token });
  if (!i) throw Error(`Cannot fetch run key: no OIDC token or VERCEL_TOKEN available`);
  let a = new URLSearchParams({ projectId: t, runId: n });
  r?.teamId && a.set(`teamId`, r.teamId);
  let o = await (
      await di({
        method: `GET`,
        url: `https://api.vercel.com/v1/workflow/run-key/${e}?${a}`,
        headers: new Headers({ Authorization: `Bearer ${i}` }),
        dispatcher: _r({ dispatcher: r?.dispatcher }),
        peerService: `vercel-api`,
        timeoutMs: null,
        buildError: async (t) => {
          let r;
          try {
            r = await t.text();
          } catch {
            r = `<unable to read response body>`;
          }
          return Error(
            `Failed to fetch run key for ${n} (deployment ${e}): HTTP ${t.status} ${t.statusText}${r ? ` — ${r}` : ``}`,
          );
        },
      })
    ).json(),
    s = le({ key: ge().nullable() }).safeParse(o);
  if (!s.success)
    throw Error(
      `Invalid response from Vercel API: expected { key: string | null }. Zod error: ${s.error.message}`,
    );
  if (s.data.key !== null) return Buffer.from(s.data.key, `base64`);
}
function Bi(e, t, n, r) {
  if (!e) return;
  let i = process.env.VERCEL === `1`,
    a;
  function o() {
    if (a) return a;
    let e = process.env.VERCEL_DEPLOYMENT_KEY;
    if (e) return ((a = Buffer.from(e, `base64`)), a);
  }
  return async function (a, s) {
    let c = typeof a == `string` ? a : a.runId,
      l = typeof a == `string` ? s?.deploymentId : a.deploymentId;
    if (i && (!l || l === process.env.VERCEL_DEPLOYMENT_ID)) {
      let t = o();
      return t ? Ri(t, e, c) : void 0;
    }
    if (l) return zi(l, e, c, { token: n, teamId: t, dispatcher: r });
  };
}
const Vi = { peerService: `workflow-server`, rpcSystem: `http`, rpcService: `workflow-server` },
  Hi = {
    "world.runs.get": 0,
    "world.runs.experimentalSetAttributes": 0,
    "world.steps.get": 0,
    "world.events.create": 0,
    "world.events.get": 0,
  },
  Ui = new Set([`world.steps.list`, `world.events.list`, `world.hooks.list`]);
function Wi(e) {
  if (e.length >= 2 && typeof e[1] == `object` && e[1] !== null) {
    let t = e[1];
    if (typeof t.eventType == `string`) return t.eventType;
  }
}
function Gi(e, t) {
  return typeof e[t] == `string` ? e[t] : void 0;
}
function Ki(e) {
  if (typeof e != `object` || !e) return;
  let t = e.runId;
  return typeof t == `string` ? t : void 0;
}
function qi(e) {
  if (typeof e != `object` || !e) return;
  let t = e;
  if (typeof t.runId == `string`) return t.runId;
  for (let e of [`run`, `step`, `hook`, `wait`]) {
    let n = t[e];
    if (typeof n == `object` && n) {
      let e = n.runId;
      if (typeof e == `string`) return e;
    }
  }
}
function Ji(e, t, n) {
  let r = `${e}.${t}`,
    i = {},
    a = Hi[r],
    o = a === void 0 ? (Ui.has(r) ? Ki(n[0]) : void 0) : Gi(n, a);
  if ((o && Object.assign(i, qr(o)), r === `world.steps.get`)) {
    let e = Gi(n, 1);
    e && Object.assign(i, Jr(e));
  }
  return i;
}
function Yi(e, t) {
  let n = {};
  for (let r of Object.keys(t))
    if (typeof t[r] != `function`) n[r] = t[r];
    else {
      let i = t[r],
        a = String(r);
      n[r] = async (...t) => {
        let n = `${e}.${a}`;
        if (e === `world.events` && a === `create`) {
          let r = Wi(t);
          r && (n = `${e}.${a} ${r}`);
        }
        return Nr(n, { kind: await Pr(`CLIENT`) }, async (r) => {
          r?.setAttributes({
            ...Ur(Vi.peerService),
            ...Wr(Vi.rpcSystem),
            ...Gr(Vi.rpcService),
            ...Kr(n),
            ...Ji(e, a, t),
          });
          let o = await i(...t),
            s = qi(o);
          return (s && r?.setAttributes(qr(s)), o);
        });
      };
    }
  return n;
}
var L = class extends Error {
  constructor(e) {
    (super(e), (this.name = `MultipartParseError`));
  }
};
function Xi(e) {
  let t = new TextEncoder().encode(e);
  return (e, n = 0) => Buffer.prototype.indexOf.call(e, t, n);
}
function Zi(e) {
  let t = new TextEncoder().encode(e),
    n = {};
  for (let e = 0; e < t.length; ++e) {
    let r = t[e];
    (n[r] === void 0 && (n[r] = []), n[r].push(e));
  }
  return function (e) {
    let r = e.length - 1;
    if (e[r] in n) {
      let i = n[e[r]];
      for (let n = i.length - 1; n >= 0; --n)
        for (let a = i[n], o = r; a >= 0 && e[o] === t[a]; --a, --o) if (a === 0) return o;
    }
    return -1;
  };
}
function Qi(e) {
  let t = new TextDecoder(`iso-8859-1`).decode(e).trim().split(/\r?\n/),
    n = [];
  for (let e of t) {
    let t = e.indexOf(`:`);
    if (t > 0) {
      let r = e.slice(0, t).trim(),
        i = e.slice(t + 1).trim();
      n.push([r, i]);
    }
  }
  return new Headers(n);
}
function $i(e) {
  let t = e.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!t) throw new L(`No boundary found in Content-Type header`);
  return t[1] ?? t[2];
}
var ea = class {
  queue = [];
  waiters = [];
  finished = !1;
  cancelled = !1;
  error = null;
  enqueue(e) {
    this.finished ||
      this.cancelled ||
      (this.waiters.length > 0 ? this.waiters.shift().resolve(e) : this.queue.push(e));
  }
  finish(e) {
    if (!this.finished)
      for (this.finished = !0, this.error = e || null; this.waiters.length > 0;) {
        let t = this.waiters.shift();
        e ? t.reject(e) : t.resolve(null);
      }
  }
  cancel() {
    if (!(this.cancelled || this.finished))
      for (this.cancelled = !0; this.waiters.length > 0;) this.waiters.shift().resolve(null);
  }
  async dequeue() {
    if (this.queue.length > 0) return this.queue.shift();
    if (this.finished || this.cancelled) {
      if (this.error) throw this.error;
      return null;
    }
    return new Promise((e, t) => {
      this.waiters.push({ resolve: e, reject: t });
    });
  }
  get isTerminal() {
    return this.finished || this.cancelled;
  }
};
async function* ta(e, t) {
  if (!e.body) throw new L(`Response body is null`);
  let n = e.headers.get(`content-type`);
  if (!n) throw new L(`Missing Content-Type header`);
  yield* new na($i(n), t).parseStream(e.body);
}
var na = class {
  boundary;
  findOpeningBoundary;
  openingBoundaryLength;
  findBoundary;
  findPartialTailBoundary;
  boundaryLength;
  findDoubleNewline;
  maxHeaderSize;
  maxBoundaryBuffer;
  state = 0;
  buffer = null;
  currentHeaders = new Headers();
  currentPayloadController = null;
  constructor(e, t = {}) {
    ((this.boundary = e),
      (this.findOpeningBoundary = Xi(`--${e}`)),
      (this.openingBoundaryLength = 2 + e.length),
      (this.findBoundary = Xi(`\r
--${e}`)),
      (this.findPartialTailBoundary = Zi(`\r
--${e}`)),
      (this.boundaryLength = 4 + e.length),
      (this.findDoubleNewline = Xi(`\r
\r
`)),
      (this.maxHeaderSize = t.maxHeaderSize ?? 65536),
      (this.maxBoundaryBuffer = t.maxBoundaryBuffer ?? 8192));
  }
  async *parseStream(e) {
    let t = e.getReader(),
      n = new ea(),
      r = this.startProducer(t, n);
    try {
      yield* this.consumeMessages(n);
    } finally {
      (n.cancel(), this.closeCurrentPayload());
      try {
        await t.cancel();
      } catch {}
      await r;
    }
  }
  async startProducer(e, t) {
    try {
      for (; !t.isTerminal;) {
        let n;
        try {
          n = await e.read();
        } catch (e) {
          if (
            e instanceof Error &&
            (e.name === `AbortError` ||
              e.constructor.name === `AbortError` ||
              e.name === `TimeoutError` ||
              e.constructor.name === `TimeoutError`)
          )
            break;
          throw e;
        }
        let { done: r, value: i } = n;
        if (r) {
          if (this.buffer !== null && this.buffer.length > 0) {
            let e = this.write(new Uint8Array());
            for (let n of e) {
              if (t.isTerminal) break;
              t.enqueue(n);
            }
          }
          if (this.state !== 4)
            throw this.state === 0
              ? new L(`Invalid multipart stream: missing initial boundary`)
              : new L(`Unexpected end of stream`);
          break;
        }
        if (!(i instanceof Uint8Array))
          throw new L(`Invalid chunk type: expected Uint8Array, got ${typeof i}`);
        let a = this.write(i);
        for (let e of a) {
          if (t.isTerminal) break;
          t.enqueue(e);
        }
      }
      t.isTerminal || t.finish();
    } catch (e) {
      (this.closeCurrentPayload(e), t.isTerminal || t.finish(e));
    } finally {
      try {
        e.releaseLock();
      } catch {}
    }
  }
  async *consumeMessages(e) {
    for (;;) {
      let t = await e.dequeue();
      if (t === null) break;
      yield t;
    }
  }
  write(e) {
    let t = [];
    if (this.state === 4) throw new L(`Unexpected data after end of stream`);
    let n = 0,
      r = e.length;
    if (this.buffer !== null) {
      let t = this.buffer.length,
        n = t + r;
      if (this.state === 2) {
        if (n > this.maxHeaderSize)
          throw new L(
            `Buffer size limit exceeded: ${n} bytes > ${this.maxHeaderSize} bytes. This may indicate malformed multipart data with oversized headers.`,
          );
      } else if (t > this.maxBoundaryBuffer)
        throw new L(
          `Boundary buffer limit exceeded: ${t} bytes > ${this.maxBoundaryBuffer} bytes. This may indicate malformed multipart data with invalid boundaries.`,
        );
      let i = new Uint8Array(n);
      (i.set(this.buffer, 0), i.set(e, t), (e = i), (r = e.length), (this.buffer = null));
    }
    if (r === 0 && this.state === 0)
      throw new L(`Invalid multipart stream: missing initial boundary`);
    for (;;) {
      if (this.state === 3) {
        if (r - n < this.boundaryLength) {
          let t = e.subarray(n);
          if (t.length > this.maxBoundaryBuffer)
            throw new L(`Boundary buffer limit exceeded: ${t.length} > ${this.maxBoundaryBuffer}`);
          this.buffer = t;
          break;
        }
        let t = this.findBoundary(e, n);
        if (t === -1) {
          let t = this.findPartialTailBoundary(e);
          if (t === -1) this.writeBody(n === 0 ? e : e.subarray(n));
          else {
            this.writeBody(e.subarray(n, t));
            let r = e.subarray(t);
            if (r.length > this.maxBoundaryBuffer)
              throw new L(`Partial boundary too large: ${r.length} > ${this.maxBoundaryBuffer}`);
            this.buffer = r;
          }
          break;
        }
        (this.writeBody(e.subarray(n, t)),
          this.finishMessage(),
          (n = t + this.boundaryLength),
          (this.state = 1));
      }
      if (this.state === 1) {
        if (r - n < 2) {
          let t = e.subarray(n);
          if (t.length > this.maxBoundaryBuffer)
            throw new L(
              `After-boundary buffer limit exceeded: ${t.length} > ${this.maxBoundaryBuffer}`,
            );
          this.buffer = t;
          break;
        }
        if (e[n] === 45 && e[n + 1] === 45) {
          this.state = 4;
          break;
        }
        if (e[n] === 13 && e[n + 1] === 10) n += 2;
        else if (e[n] === 10) n += 1;
        else
          throw new L(
            `Invalid character after boundary: expected CRLF or LF, got 0x${e[n].toString(16)}`,
          );
        this.state = 2;
      }
      if (this.state === 2) {
        if (r - n < 4) {
          let t = e.subarray(n);
          if (t.length > this.maxHeaderSize)
            throw new L(`Header buffer limit exceeded: ${t.length} > ${this.maxHeaderSize}`);
          this.buffer = t;
          break;
        }
        let i = this.findDoubleNewline(e, n),
          a = 4;
        if (
          (i === -1 &&
            ((i = Xi(`

`)(e, n)),
            (a = 2)),
          i === -1)
        ) {
          let t = e.subarray(n);
          if (t.length > this.maxHeaderSize)
            throw new L(`Headers too large: ${t.length} > ${this.maxHeaderSize} bytes`);
          this.buffer = t;
          break;
        }
        let o = e.subarray(n, i);
        this.currentHeaders = Qi(o);
        let s = this.createStreamingMessage();
        (t.push(s), (n = i + a), (this.state = 3));
        continue;
      }
      if (this.state === 0) {
        if (r < this.openingBoundaryLength) {
          if (e.length > this.maxBoundaryBuffer)
            throw new L(
              `Initial chunk too large for boundary detection: ${e.length} > ${this.maxBoundaryBuffer}`,
            );
          this.buffer = e;
          break;
        }
        if (this.findOpeningBoundary(e) !== 0)
          throw new L(`Invalid multipart stream: missing initial boundary`);
        ((n = this.openingBoundaryLength), (this.state = 1));
      }
    }
    return t;
  }
  createStreamingMessage() {
    let e = new Headers(this.currentHeaders),
      t = new ReadableStream({
        start: (e) => {
          this.currentPayloadController = e;
        },
      });
    return ((this.currentHeaders = new Headers()), { headers: e, payload: t });
  }
  writeBody(e) {
    this.currentPayloadController && this.currentPayloadController.enqueue(e);
  }
  finishMessage() {
    this.currentPayloadController &&= (this.currentPayloadController.close(), null);
  }
  closeCurrentPayload(e) {
    if (this.currentPayloadController) {
      try {
        e ? this.currentPayloadController.error(e) : this.currentPayloadController.close();
      } catch {}
      this.currentPayloadController = null;
    }
  }
};
const ra = (e, t, n) => {
    let r = e instanceof RegExp ? ia(e, n) : e,
      i = t instanceof RegExp ? ia(t, n) : t,
      a = r !== null && i != null && aa(r, i, n);
    return (
      a && {
        start: a[0],
        end: a[1],
        pre: n.slice(0, a[0]),
        body: n.slice(a[0] + r.length, a[1]),
        post: n.slice(a[1] + i.length),
      }
    );
  },
  ia = (e, t) => {
    let n = t.match(e);
    return n ? n[0] : null;
  },
  aa = (e, t, n) => {
    let r,
      i,
      a,
      o,
      s,
      c = n.indexOf(e),
      l = n.indexOf(t, c + 1),
      u = c;
    if (c >= 0 && l > 0) {
      if (e === t) return [c, l];
      for (r = [], a = n.length; u >= 0 && !s;) {
        if (u === c) (r.push(u), (c = n.indexOf(e, u + 1)));
        else if (r.length === 1) {
          let e = r.pop();
          e !== void 0 && (s = [e, l]);
        } else
          ((i = r.pop()), i !== void 0 && i < a && ((a = i), (o = l)), (l = n.indexOf(t, u + 1)));
        u = c < l && c >= 0 ? c : l;
      }
      r.length && o !== void 0 && (s = [a, o]);
    }
    return s;
  },
  oa = `\0SLASH` + Math.random() + `\0`,
  sa = `\0OPEN` + Math.random() + `\0`,
  ca = `\0CLOSE` + Math.random() + `\0`,
  la = `\0COMMA` + Math.random() + `\0`,
  ua = `\0PERIOD` + Math.random() + `\0`,
  da = new RegExp(oa, `g`),
  fa = new RegExp(sa, `g`),
  pa = new RegExp(ca, `g`),
  ma = new RegExp(la, `g`),
  ha = new RegExp(ua, `g`),
  ga = /\\\\/g,
  _a = /\\{/g,
  va = /\\}/g,
  ya = /\\,/g,
  ba = /\\\./g;
function xa(e) {
  return isNaN(e) ? e.charCodeAt(0) : parseInt(e, 10);
}
function Sa(e) {
  return e.replace(ga, oa).replace(_a, sa).replace(va, ca).replace(ya, la).replace(ba, ua);
}
function Ca(e) {
  return e.replace(da, `\\`).replace(fa, `{`).replace(pa, `}`).replace(ma, `,`).replace(ha, `.`);
}
function wa(e) {
  if (!e) return [``];
  let t = [],
    n = ra(`{`, `}`, e);
  if (!n) return e.split(`,`);
  let { pre: r, body: i, post: a } = n,
    o = r.split(`,`);
  o[o.length - 1] += `{` + i + `}`;
  let s = wa(a);
  return (a.length && ((o[o.length - 1] += s.shift()), o.push.apply(o, s)), t.push.apply(t, o), t);
}
function Ta(e, t = {}) {
  if (!e) return [];
  let { max: n = 1e5 } = t;
  return (e.slice(0, 2) === `{}` && (e = `\\{\\}` + e.slice(2)), Aa(Sa(e), n, !0).map(Ca));
}
function Ea(e) {
  return `{` + e + `}`;
}
function Da(e) {
  return /^-?0\d/.test(e);
}
function Oa(e, t) {
  return e <= t;
}
function ka(e, t) {
  return e >= t;
}
function Aa(e, t, n) {
  let r = [];
  for (;;) {
    let i = ra(`{`, `}`, e);
    if (!i) return [e];
    let a = i.pre;
    if (/\$$/.test(i.pre)) {
      let e = i.post.length ? Aa(i.post, t, !1) : [``];
      for (let n = 0; n < e.length && n < t; n++) {
        let t = a + `{` + i.body + `}` + e[n];
        r.push(t);
      }
      return r;
    }
    let o = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body),
      s = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body),
      c = o || s,
      l = i.body.indexOf(`,`) >= 0;
    if (!c && !l) {
      if (i.post.match(/,(?!,).*\}/)) {
        ((e = i.pre + `{` + i.body + ca + i.post), (n = !0));
        continue;
      }
      return [e];
    }
    let u = i.post.length ? Aa(i.post, t, !1) : [``],
      d;
    if (c) d = i.body.split(/\.\./);
    else if (
      ((d = wa(i.body)),
      d.length === 1 && d[0] !== void 0 && ((d = Aa(d[0], t, !1).map(Ea)), d.length === 1))
    )
      return u.map((e) => i.pre + d[0] + e);
    let f;
    if (c && d[0] !== void 0 && d[1] !== void 0) {
      let e = xa(d[0]),
        n = xa(d[1]),
        r = Math.max(d[0].length, d[1].length),
        i = d.length === 3 && d[2] !== void 0 ? Math.max(Math.abs(xa(d[2])), 1) : 1,
        a = Oa;
      n < e && ((i *= -1), (a = ka));
      let o = d.some(Da);
      f = [];
      for (let c = e; a(c, n) && f.length < t; c += i) {
        let e;
        if (s) ((e = String.fromCharCode(c)), e === `\\` && (e = ``));
        else if (((e = String(c)), o)) {
          let t = r - e.length;
          if (t > 0) {
            let n = Array(t + 1).join(`0`);
            e = c < 0 ? `-` + n + e.slice(1) : n + e;
          }
        }
        f.push(e);
      }
    } else {
      f = [];
      for (let e = 0; e < d.length; e++) f.push.apply(f, Aa(d[e], t, !1));
    }
    for (let e = 0; e < f.length; e++)
      for (let i = 0; i < u.length && r.length < t; i++) {
        let t = a + f[e] + u[i];
        (!n || c || t) && r.push(t);
      }
    return r;
  }
}
const ja = (e) => {
    if (typeof e != `string`) throw TypeError(`invalid pattern`);
    if (e.length > 65536) throw TypeError(`pattern is too long`);
  },
  Ma = {
    "[:alnum:]": [`\\p{L}\\p{Nl}\\p{Nd}`, !0],
    "[:alpha:]": [`\\p{L}\\p{Nl}`, !0],
    "[:ascii:]": [`\\x00-\\x7f`, !1],
    "[:blank:]": [`\\p{Zs}\\t`, !0],
    "[:cntrl:]": [`\\p{Cc}`, !0],
    "[:digit:]": [`\\p{Nd}`, !0],
    "[:graph:]": [`\\p{Z}\\p{C}`, !0, !0],
    "[:lower:]": [`\\p{Ll}`, !0],
    "[:print:]": [`\\p{C}`, !0],
    "[:punct:]": [`\\p{P}`, !0],
    "[:space:]": [`\\p{Z}\\t\\r\\n\\v\\f`, !0],
    "[:upper:]": [`\\p{Lu}`, !0],
    "[:word:]": [`\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}`, !0],
    "[:xdigit:]": [`A-Fa-f0-9`, !1],
  },
  Na = (e) => e.replace(/[[\]\\-]/g, `\\$&`),
  Pa = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, `\\$&`),
  Fa = (e) => e.join(``),
  Ia = (e, t) => {
    let n = t;
    if (e.charAt(n) !== `[`) throw Error(`not in a brace expression`);
    let r = [],
      i = [],
      a = n + 1,
      o = !1,
      s = !1,
      c = !1,
      l = !1,
      u = n,
      d = ``;
    WHILE: for (; a < e.length;) {
      let t = e.charAt(a);
      if ((t === `!` || t === `^`) && a === n + 1) {
        ((l = !0), a++);
        continue;
      }
      if (t === `]` && o && !c) {
        u = a + 1;
        break;
      }
      if (((o = !0), t === `\\` && !c)) {
        ((c = !0), a++);
        continue;
      }
      if (t === `[` && !c) {
        for (let [t, [o, c, l]] of Object.entries(Ma))
          if (e.startsWith(t, a)) {
            if (d) return [`$.`, !1, e.length - n, !0];
            ((a += t.length), l ? i.push(o) : r.push(o), (s ||= c));
            continue WHILE;
          }
      }
      if (((c = !1), d)) {
        (t > d ? r.push(Na(d) + `-` + Na(t)) : t === d && r.push(Na(t)), (d = ``), a++);
        continue;
      }
      if (e.startsWith(`-]`, a + 1)) {
        (r.push(Na(t + `-`)), (a += 2));
        continue;
      }
      if (e.startsWith(`-`, a + 1)) {
        ((d = t), (a += 2));
        continue;
      }
      (r.push(Na(t)), a++);
    }
    if (u < a) return [``, !1, 0, !1];
    if (!r.length && !i.length) return [`$.`, !1, e.length - n, !0];
    if (i.length === 0 && r.length === 1 && /^\\?.$/.test(r[0]) && !l)
      return [Pa(r[0].length === 2 ? r[0].slice(-1) : r[0]), !1, u - n, !1];
    let f = `[` + (l ? `^` : ``) + Fa(r) + `]`,
      p = `[` + (l ? `` : `^`) + Fa(i) + `]`;
    return [r.length && i.length ? `(` + f + `|` + p + `)` : r.length ? f : p, s, u - n, !0];
  },
  La = (e, { windowsPathsNoEscape: t = !1, magicalBraces: n = !0 } = {}) =>
    n
      ? t
        ? e.replace(/\[([^/\\])\]/g, `$1`)
        : e.replace(/((?!\\).|^)\[([^/\\])\]/g, `$1$2`).replace(/\\([^/])/g, `$1`)
      : t
        ? e.replace(/\[([^/\\{}])\]/g, `$1`)
        : e.replace(/((?!\\).|^)\[([^/\\{}])\]/g, `$1$2`).replace(/\\([^/{}])/g, `$1`);
var Ra;
const za = new Set([`!`, `?`, `+`, `*`, `@`]),
  Ba = (e) => za.has(e),
  Va = (e) => Ba(e.type),
  Ha = new Map([
    [`!`, [`@`]],
    [`?`, [`?`, `@`]],
    [`@`, [`@`]],
    [`*`, [`*`, `+`, `?`, `@`]],
    [`+`, [`+`, `@`]],
  ]),
  Ua = new Map([
    [`!`, [`?`]],
    [`@`, [`?`]],
    [`+`, [`?`, `*`]],
  ]),
  Wa = new Map([
    [`!`, [`?`, `@`]],
    [`?`, [`?`, `@`]],
    [`@`, [`?`, `@`]],
    [`*`, [`*`, `+`, `?`, `@`]],
    [`+`, [`+`, `@`, `?`, `*`]],
  ]),
  Ga = new Map([
    [`!`, new Map([[`!`, `@`]])],
    [
      `?`,
      new Map([
        [`*`, `*`],
        [`+`, `*`],
      ]),
    ],
    [
      `@`,
      new Map([
        [`!`, `!`],
        [`?`, `?`],
        [`@`, `@`],
        [`*`, `*`],
        [`+`, `+`],
      ]),
    ],
    [
      `+`,
      new Map([
        [`?`, `*`],
        [`*`, `*`],
      ]),
    ],
  ]),
  Ka = `(?!\\.)`,
  qa = new Set([`[`, `.`]),
  Ja = new Set([`..`, `.`]),
  Ya = new Set(`().*{}+?[]^$\\!`),
  Xa = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, `\\$&`),
  Za = `[^/]+?`;
let Qa = 0;
var $a = class {
  type;
  #e;
  #t;
  #n = !1;
  #r = [];
  #i;
  #a;
  #o;
  #s = !1;
  #c;
  #l;
  #u = !1;
  id = ++Qa;
  get depth() {
    return (this.#i?.depth ?? -1) + 1;
  }
  [Symbol.for(`nodejs.util.inspect.custom`)]() {
    return {
      "@@type": `AST`,
      id: this.id,
      type: this.type,
      root: this.#e.id,
      parent: this.#i?.id,
      depth: this.depth,
      partsLength: this.#r.length,
      parts: this.#r,
    };
  }
  constructor(e, t, n = {}) {
    ((this.type = e),
      e && (this.#t = !0),
      (this.#i = t),
      (this.#e = this.#i ? this.#i.#e : this),
      (this.#c = this.#e === this ? n : this.#e.#c),
      (this.#o = this.#e === this ? [] : this.#e.#o),
      e === `!` && !this.#e.#s && this.#o.push(this),
      (this.#a = this.#i ? this.#i.#r.length : 0));
  }
  get hasMagic() {
    if (this.#t !== void 0) return this.#t;
    for (let e of this.#r)
      if (typeof e != `string` && (e.type || e.hasMagic)) return (this.#t = !0);
    return this.#t;
  }
  toString() {
    return this.#l === void 0
      ? this.type
        ? (this.#l = this.type + `(` + this.#r.map((e) => String(e)).join(`|`) + `)`)
        : (this.#l = this.#r.map((e) => String(e)).join(``))
      : this.#l;
  }
  #d() {
    if (this !== this.#e) throw Error(`should only call on root`);
    if (this.#s) return this;
    (this.toString(), (this.#s = !0));
    let e;
    for (; (e = this.#o.pop());) {
      if (e.type !== `!`) continue;
      let t = e,
        n = t.#i;
      for (; n;) {
        for (let r = t.#a + 1; !n.type && r < n.#r.length; r++)
          for (let t of e.#r) {
            if (typeof t == `string`) throw Error(`string part in extglob AST??`);
            t.copyIn(n.#r[r]);
          }
        ((t = n), (n = t.#i));
      }
    }
    return this;
  }
  push(...e) {
    for (let t of e)
      if (t !== ``) {
        if (typeof t != `string` && !(t instanceof Ra && t.#i === this))
          throw Error(`invalid part: ` + t);
        this.#r.push(t);
      }
  }
  toJSON() {
    let e =
      this.type === null
        ? this.#r.slice().map((e) => (typeof e == `string` ? e : e.toJSON()))
        : [this.type, ...this.#r.map((e) => e.toJSON())];
    return (
      this.isStart() && !this.type && e.unshift([]),
      this.isEnd() && (this === this.#e || (this.#e.#s && this.#i?.type === `!`)) && e.push({}),
      e
    );
  }
  isStart() {
    if (this.#e === this) return !0;
    if (!this.#i?.isStart()) return !1;
    if (this.#a === 0) return !0;
    let e = this.#i;
    for (let t = 0; t < this.#a; t++) {
      let n = e.#r[t];
      if (!(n instanceof Ra && n.type === `!`)) return !1;
    }
    return !0;
  }
  isEnd() {
    if (this.#e === this || this.#i?.type === `!`) return !0;
    if (!this.#i?.isEnd()) return !1;
    if (!this.type) return this.#i?.isEnd();
    let e = this.#i ? this.#i.#r.length : 0;
    return this.#a === e - 1;
  }
  copyIn(e) {
    typeof e == `string` ? this.push(e) : this.push(e.clone(this));
  }
  clone(e) {
    let t = new Ra(this.type, e);
    for (let e of this.#r) t.copyIn(e);
    return t;
  }
  static #f(e, t, n, r, i) {
    let a = r.maxExtglobRecursion ?? 2,
      o = !1,
      s = !1,
      c = -1,
      l = !1;
    if (t.type === null) {
      let u = n,
        d = ``;
      for (; u < e.length;) {
        let n = e.charAt(u++);
        if (o || n === `\\`) {
          ((o = !o), (d += n));
          continue;
        }
        if (s) {
          (u === c + 1
            ? (n === `^` || n === `!`) && (l = !0)
            : n === `]` && !(u === c + 2 && l) && (s = !1),
            (d += n));
          continue;
        } else if (n === `[`) {
          ((s = !0), (c = u), (l = !1), (d += n));
          continue;
        }
        if (!r.noext && Ba(n) && e.charAt(u) === `(` && i <= a) {
          (t.push(d), (d = ``));
          let a = new Ra(n, t);
          ((u = Ra.#f(e, a, u, r, i + 1)), t.push(a));
          continue;
        }
        d += n;
      }
      return (t.push(d), u);
    }
    let u = n + 1,
      d = new Ra(null, t),
      f = [],
      p = ``;
    for (; u < e.length;) {
      let n = e.charAt(u++);
      if (o || n === `\\`) {
        ((o = !o), (p += n));
        continue;
      }
      if (s) {
        (u === c + 1
          ? (n === `^` || n === `!`) && (l = !0)
          : n === `]` && !(u === c + 2 && l) && (s = !1),
          (p += n));
        continue;
      } else if (n === `[`) {
        ((s = !0), (c = u), (l = !1), (p += n));
        continue;
      }
      if (!r.noext && Ba(n) && e.charAt(u) === `(` && (i <= a || (t && t.#h(n)))) {
        let a = t && t.#h(n) ? 0 : 1;
        (d.push(p), (p = ``));
        let o = new Ra(n, d);
        (d.push(o), (u = Ra.#f(e, o, u, r, i + a)));
        continue;
      }
      if (n === `|`) {
        (d.push(p), (p = ``), f.push(d), (d = new Ra(null, t)));
        continue;
      }
      if (n === `)`)
        return (
          p === `` && t.#r.length === 0 && (t.#u = !0), d.push(p), (p = ``), t.push(...f, d), u
        );
      p += n;
    }
    return ((t.type = null), (t.#t = void 0), (t.#r = [e.substring(n - 1)]), u);
  }
  #p(e) {
    return this.#m(e, Ua);
  }
  #m(e, t = Ha) {
    if (!e || typeof e != `object` || e.type !== null || e.#r.length !== 1 || this.type === null)
      return !1;
    let n = e.#r[0];
    return !n || typeof n != `object` || n.type === null ? !1 : this.#h(n.type, t);
  }
  #h(e, t = Wa) {
    return !!t.get(this.type)?.includes(e);
  }
  #g(e, t) {
    let n = e.#r[0],
      r = new Ra(null, n, this.options);
    (r.#r.push(``), n.push(r), this.#_(e, t));
  }
  #_(e, t) {
    let n = e.#r[0];
    this.#r.splice(t, 1, ...n.#r);
    for (let e of n.#r) typeof e == `object` && (e.#i = this);
    this.#l = void 0;
  }
  #v(e) {
    return !!Ga.get(this.type)?.has(e);
  }
  #y(e) {
    if (
      !e ||
      typeof e != `object` ||
      e.type !== null ||
      e.#r.length !== 1 ||
      this.type === null ||
      this.#r.length !== 1
    )
      return !1;
    let t = e.#r[0];
    return !t || typeof t != `object` || t.type === null ? !1 : this.#v(t.type);
  }
  #b(e) {
    let t = Ga.get(this.type),
      n = e.#r[0],
      r = t?.get(n.type);
    if (!r) return !1;
    this.#r = n.#r;
    for (let e of this.#r) typeof e == `object` && (e.#i = this);
    ((this.type = r), (this.#l = void 0), (this.#u = !1));
  }
  static fromGlob(e, t = {}) {
    let n = new Ra(null, void 0, t);
    return (Ra.#f(e, n, 0, t, 0), n);
  }
  toMMPattern() {
    if (this !== this.#e) return this.#e.toMMPattern();
    let e = this.toString(),
      [t, n, r, i] = this.toRegExpSource();
    if (
      !(
        r ||
        this.#t ||
        (this.#c.nocase && !this.#c.nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase())
      )
    )
      return n;
    let a = (this.#c.nocase ? `i` : ``) + (i ? `u` : ``);
    return Object.assign(RegExp(`^${t}$`, a), { _src: t, _glob: e });
  }
  get options() {
    return this.#c;
  }
  toRegExpSource(e) {
    let t = e ?? !!this.#c.dot;
    if ((this.#e === this && (this.#x(), this.#d()), !Va(this))) {
      let n = this.isStart() && this.isEnd() && !this.#r.some((e) => typeof e != `string`),
        r = this.#r
          .map((t) => {
            let [r, i, a, o] = typeof t == `string` ? Ra.#C(t, this.#t, n) : t.toRegExpSource(e);
            return ((this.#t = this.#t || a), (this.#n = this.#n || o), r);
          })
          .join(``),
        i = ``;
      if (
        this.isStart() &&
        typeof this.#r[0] == `string` &&
        !(this.#r.length === 1 && Ja.has(this.#r[0]))
      ) {
        let n = qa,
          a =
            (t && n.has(r.charAt(0))) ||
            (r.startsWith(`\\.`) && n.has(r.charAt(2))) ||
            (r.startsWith(`\\.\\.`) && n.has(r.charAt(4))),
          o = !t && !e && n.has(r.charAt(0));
        i = a ? `(?!(?:^|/)\\.\\.?(?:$|/))` : o ? Ka : ``;
      }
      let a = ``;
      return (
        this.isEnd() && this.#e.#s && this.#i?.type === `!` && (a = `(?:$|\\/)`),
        [i + r + a, La(r), (this.#t = !!this.#t), this.#n]
      );
    }
    let n = this.type === `*` || this.type === `+`,
      r = this.type === `!` ? `(?:(?!(?:` : `(?:`,
      i = this.#S(t);
    if (this.isStart() && this.isEnd() && !i && this.type !== `!`) {
      let e = this.toString(),
        t = this;
      return ((t.#r = [e]), (t.type = null), (t.#t = void 0), [e, La(this.toString()), !1, !1]);
    }
    let a = !n || e || t ? `` : this.#S(!0);
    (a === i && (a = ``), a && (i = `(?:${i})(?:${a})*?`));
    let o = ``;
    if (this.type === `!` && this.#u) o = (this.isStart() && !t ? Ka : ``) + Za;
    else {
      let n =
        this.type === `!`
          ? `))` + (this.isStart() && !t && !e ? Ka : ``) + `[^/]*?)`
          : this.type === `@`
            ? `)`
            : this.type === `?`
              ? `)?`
              : this.type === `+` && a
                ? `)`
                : this.type === `*` && a
                  ? `)?`
                  : `)${this.type}`;
      o = r + i + n;
    }
    return [o, La(i), (this.#t = !!this.#t), this.#n];
  }
  #x() {
    if (Va(this)) {
      let e = 0,
        t = !1;
      do {
        t = !0;
        for (let e = 0; e < this.#r.length; e++) {
          let n = this.#r[e];
          typeof n == `object` &&
            (n.#x(),
            this.#m(n)
              ? ((t = !1), this.#_(n, e))
              : this.#p(n)
                ? ((t = !1), this.#g(n, e))
                : this.#y(n) && ((t = !1), this.#b(n)));
        }
      } while (!t && ++e < 10);
    } else for (let e of this.#r) typeof e == `object` && e.#x();
    this.#l = void 0;
  }
  #S(e) {
    return this.#r
      .map((t) => {
        if (typeof t == `string`) throw Error(`string type in extglob ast??`);
        let [n, r, i, a] = t.toRegExpSource(e);
        return ((this.#n = this.#n || a), n);
      })
      .filter((e) => !(this.isStart() && this.isEnd()) || !!e)
      .join(`|`);
  }
  static #C(e, t, n = !1) {
    let r = !1,
      i = ``,
      a = !1,
      o = !1;
    for (let s = 0; s < e.length; s++) {
      let c = e.charAt(s);
      if (r) {
        ((r = !1), (i += (Ya.has(c) ? `\\` : ``) + c));
        continue;
      }
      if (c === `*`) {
        if (o) continue;
        ((o = !0), (i += n && /^[*]+$/.test(e) ? Za : `[^/]*?`), (t = !0));
        continue;
      } else o = !1;
      if (c === `\\`) {
        s === e.length - 1 ? (i += `\\\\`) : (r = !0);
        continue;
      }
      if (c === `[`) {
        let [n, r, o, c] = Ia(e, s);
        if (o) {
          ((i += n), (a ||= r), (s += o - 1), (t ||= c));
          continue;
        }
      }
      if (c === `?`) {
        ((i += `[^/]`), (t = !0));
        continue;
      }
      i += Xa(c);
    }
    return [i, La(e), !!t, a];
  }
};
Ra = $a;
const eo = (e, { windowsPathsNoEscape: t = !1, magicalBraces: n = !1 } = {}) =>
    n
      ? t
        ? e.replace(/[?*()[\]{}]/g, `[$&]`)
        : e.replace(/[?*()[\]\\{}]/g, `\\$&`)
      : t
        ? e.replace(/[?*()[\]]/g, `[$&]`)
        : e.replace(/[?*()[\]\\]/g, `\\$&`),
  R = (e, t, n = {}) => (ja(t), !n.nocomment && t.charAt(0) === `#` ? !1 : new Oo(t, n).match(e)),
  to = /^\*+([^+@!?*[(]*)$/,
  no = (e) => (t) => !t.startsWith(`.`) && t.endsWith(e),
  ro = (e) => (t) => t.endsWith(e),
  io = (e) => ((e = e.toLowerCase()), (t) => !t.startsWith(`.`) && t.toLowerCase().endsWith(e)),
  ao = (e) => ((e = e.toLowerCase()), (t) => t.toLowerCase().endsWith(e)),
  oo = /^\*+\.\*+$/,
  so = (e) => !e.startsWith(`.`) && e.includes(`.`),
  co = (e) => e !== `.` && e !== `..` && e.includes(`.`),
  lo = /^\.\*+$/,
  uo = (e) => e !== `.` && e !== `..` && e.startsWith(`.`),
  fo = /^\*+$/,
  po = (e) => e.length !== 0 && !e.startsWith(`.`),
  mo = (e) => e.length !== 0 && e !== `.` && e !== `..`,
  ho = /^\?+([^+@!?*[(]*)?$/,
  go = ([e, t = ``]) => {
    let n = bo([e]);
    return t ? ((t = t.toLowerCase()), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
  },
  _o = ([e, t = ``]) => {
    let n = xo([e]);
    return t ? ((t = t.toLowerCase()), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
  },
  vo = ([e, t = ``]) => {
    let n = xo([e]);
    return t ? (e) => n(e) && e.endsWith(t) : n;
  },
  yo = ([e, t = ``]) => {
    let n = bo([e]);
    return t ? (e) => n(e) && e.endsWith(t) : n;
  },
  bo = ([e]) => {
    let t = e.length;
    return (e) => e.length === t && !e.startsWith(`.`);
  },
  xo = ([e]) => {
    let t = e.length;
    return (e) => e.length === t && e !== `.` && e !== `..`;
  },
  So =
    typeof process == `object` && process
      ? (typeof process.env == `object` &&
          process.env &&
          process.env.__MINIMATCH_TESTING_PLATFORM__) ||
        process.platform
      : `posix`,
  Co = { win32: { sep: `\\` }, posix: { sep: `/` } };
R.sep = So === `win32` ? Co.win32.sep : Co.posix.sep;
const z = Symbol(`globstar **`);
((R.GLOBSTAR = z),
  (R.filter =
    (e, t = {}) =>
    (n) =>
      R(n, e, t)));
const wo = (e, t = {}) => Object.assign({}, e, t);
R.defaults = (e) => {
  if (!e || typeof e != `object` || !Object.keys(e).length) return R;
  let t = R;
  return Object.assign((n, r, i = {}) => t(n, r, wo(e, i)), {
    Minimatch: class extends t.Minimatch {
      constructor(t, n = {}) {
        super(t, wo(e, n));
      }
      static defaults(n) {
        return t.defaults(wo(e, n)).Minimatch;
      }
    },
    AST: class extends t.AST {
      constructor(t, n, r = {}) {
        super(t, n, wo(e, r));
      }
      static fromGlob(n, r = {}) {
        return t.AST.fromGlob(n, wo(e, r));
      }
    },
    unescape: (n, r = {}) => t.unescape(n, wo(e, r)),
    escape: (n, r = {}) => t.escape(n, wo(e, r)),
    filter: (n, r = {}) => t.filter(n, wo(e, r)),
    defaults: (n) => t.defaults(wo(e, n)),
    makeRe: (n, r = {}) => t.makeRe(n, wo(e, r)),
    braceExpand: (n, r = {}) => t.braceExpand(n, wo(e, r)),
    match: (n, r, i = {}) => t.match(n, r, wo(e, i)),
    sep: t.sep,
    GLOBSTAR: z,
  });
};
const To = (e, t = {}) => (
  ja(e),
  t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : Ta(e, { max: t.braceExpandMax })
);
((R.braceExpand = To),
  (R.makeRe = (e, t = {}) => new Oo(e, t).makeRe()),
  (R.match = (e, t, n = {}) => {
    let r = new Oo(t, n);
    return ((e = e.filter((e) => r.match(e))), r.options.nonull && !e.length && e.push(t), e);
  }));
const Eo = /[?*]|[+@!]\(.*?\)|\[|\]/,
  Do = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, `\\$&`);
var Oo = class {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  maxGlobstarRecursion;
  regexp;
  constructor(e, t = {}) {
    (ja(e),
      (t ||= {}),
      (this.options = t),
      (this.maxGlobstarRecursion = t.maxGlobstarRecursion ?? 200),
      (this.pattern = e),
      (this.platform = t.platform || So),
      (this.isWindows = this.platform === `win32`),
      (this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t.allowWindowsEscape === !1),
      this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, `/`)),
      (this.preserveMultipleSlashes = !!t.preserveMultipleSlashes),
      (this.regexp = null),
      (this.negate = !1),
      (this.nonegate = !!t.nonegate),
      (this.comment = !1),
      (this.empty = !1),
      (this.partial = !!t.partial),
      (this.nocase = !!this.options.nocase),
      (this.windowsNoMagicRoot =
        t.windowsNoMagicRoot === void 0 ? !!(this.isWindows && this.nocase) : t.windowsNoMagicRoot),
      (this.globSet = []),
      (this.globParts = []),
      (this.set = []),
      this.make());
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return !0;
    for (let e of this.set) for (let t of e) if (typeof t != `string`) return !0;
    return !1;
  }
  debug(...e) {}
  make() {
    let e = this.pattern,
      t = this.options;
    if (!t.nocomment && e.charAt(0) === `#`) {
      this.comment = !0;
      return;
    }
    if (!e) {
      this.empty = !0;
      return;
    }
    (this.parseNegate(),
      (this.globSet = [...new Set(this.braceExpand())]),
      t.debug && (this.debug = (...e) => console.error(...e)),
      this.debug(this.pattern, this.globSet));
    let n = this.globSet.map((e) => this.slashSplit(e));
    ((this.globParts = this.preprocess(n)), this.debug(this.pattern, this.globParts));
    let r = this.globParts.map((e, t, n) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let t = e[0] === `` && e[1] === `` && (e[2] === `?` || !Eo.test(e[2])) && !Eo.test(e[3]),
          n = /^[a-z]:/i.test(e[0]);
        if (t) return [...e.slice(0, 4), ...e.slice(4).map((e) => this.parse(e))];
        if (n) return [e[0], ...e.slice(1).map((e) => this.parse(e))];
      }
      return e.map((e) => this.parse(e));
    });
    if (
      (this.debug(this.pattern, r),
      (this.set = r.filter((e) => e.indexOf(!1) === -1)),
      this.isWindows)
    )
      for (let e = 0; e < this.set.length; e++) {
        let t = this.set[e];
        t[0] === `` &&
          t[1] === `` &&
          this.globParts[e][2] === `?` &&
          typeof t[3] == `string` &&
          /^[a-z]:$/i.test(t[3]) &&
          (t[2] = `?`);
      }
    this.debug(this.pattern, this.set);
  }
  preprocess(e) {
    if (this.options.noglobstar)
      for (let t of e) for (let e = 0; e < t.length; e++) t[e] === `**` && (t[e] = `*`);
    let { optimizationLevel: t = 1 } = this.options;
    return (
      t >= 2
        ? ((e = this.firstPhasePreProcess(e)), (e = this.secondPhasePreProcess(e)))
        : (e = t >= 1 ? this.levelOneOptimize(e) : this.adjascentGlobstarOptimize(e)),
      e
    );
  }
  adjascentGlobstarOptimize(e) {
    return e.map((e) => {
      let t = -1;
      for (; (t = e.indexOf(`**`, t + 1)) !== -1;) {
        let n = t;
        for (; e[n + 1] === `**`;) n++;
        n !== t && e.splice(t, n - t);
      }
      return e;
    });
  }
  levelOneOptimize(e) {
    return e.map(
      (e) => (
        (e = e.reduce((e, t) => {
          let n = e[e.length - 1];
          return t === `**` && n === `**`
            ? e
            : t === `..` && n && n !== `..` && n !== `.` && n !== `**`
              ? (e.pop(), e)
              : (e.push(t), e);
        }, [])),
        e.length === 0 ? [``] : e
      ),
    );
  }
  levelTwoFileOptimize(e) {
    Array.isArray(e) || (e = this.slashSplit(e));
    let t = !1;
    do {
      if (((t = !1), !this.preserveMultipleSlashes)) {
        for (let n = 1; n < e.length - 1; n++) {
          let r = e[n];
          (n === 1 && r === `` && e[0] === ``) ||
            ((r === `.` || r === ``) && ((t = !0), e.splice(n, 1), n--));
        }
        e[0] === `.` && e.length === 2 && (e[1] === `.` || e[1] === ``) && ((t = !0), e.pop());
      }
      let n = 0;
      for (; (n = e.indexOf(`..`, n + 1)) !== -1;) {
        let r = e[n - 1];
        r &&
          r !== `.` &&
          r !== `..` &&
          r !== `**` &&
          !(this.isWindows && /^[a-z]:$/i.test(r)) &&
          ((t = !0), e.splice(n - 1, 2), (n -= 2));
      }
    } while (t);
    return e.length === 0 ? [``] : e;
  }
  firstPhasePreProcess(e) {
    let t = !1;
    do {
      t = !1;
      for (let n of e) {
        let r = -1;
        for (; (r = n.indexOf(`**`, r + 1)) !== -1;) {
          let i = r;
          for (; n[i + 1] === `**`;) i++;
          i > r && n.splice(r + 1, i - r);
          let a = n[r + 1],
            o = n[r + 2],
            s = n[r + 3];
          if (a !== `..` || !o || o === `.` || o === `..` || !s || s === `.` || s === `..`)
            continue;
          ((t = !0), n.splice(r, 1));
          let c = n.slice(0);
          ((c[r] = `**`), e.push(c), r--);
        }
        if (!this.preserveMultipleSlashes) {
          for (let e = 1; e < n.length - 1; e++) {
            let r = n[e];
            (e === 1 && r === `` && n[0] === ``) ||
              ((r === `.` || r === ``) && ((t = !0), n.splice(e, 1), e--));
          }
          n[0] === `.` && n.length === 2 && (n[1] === `.` || n[1] === ``) && ((t = !0), n.pop());
        }
        let i = 0;
        for (; (i = n.indexOf(`..`, i + 1)) !== -1;) {
          let e = n[i - 1];
          if (e && e !== `.` && e !== `..` && e !== `**`) {
            t = !0;
            let e = i === 1 && n[i + 1] === `**` ? [`.`] : [];
            (n.splice(i - 1, 2, ...e), n.length === 0 && n.push(``), (i -= 2));
          }
        }
      }
    } while (t);
    return e;
  }
  secondPhasePreProcess(e) {
    for (let t = 0; t < e.length - 1; t++)
      for (let n = t + 1; n < e.length; n++) {
        let r = this.partsMatch(e[t], e[n], !this.preserveMultipleSlashes);
        if (r) {
          ((e[t] = []), (e[n] = r));
          break;
        }
      }
    return e.filter((e) => e.length);
  }
  partsMatch(e, t, n = !1) {
    let r = 0,
      i = 0,
      a = [],
      o = ``;
    for (; r < e.length && i < t.length;)
      if (e[r] === t[i]) (a.push(o === `b` ? t[i] : e[r]), r++, i++);
      else if (n && e[r] === `**` && t[i] === e[r + 1]) (a.push(e[r]), r++);
      else if (n && t[i] === `**` && e[r] === t[i + 1]) (a.push(t[i]), i++);
      else if (
        e[r] === `*` &&
        t[i] &&
        (this.options.dot || !t[i].startsWith(`.`)) &&
        t[i] !== `**`
      ) {
        if (o === `b`) return !1;
        ((o = `a`), a.push(e[r]), r++, i++);
      } else if (
        t[i] === `*` &&
        e[r] &&
        (this.options.dot || !e[r].startsWith(`.`)) &&
        e[r] !== `**`
      ) {
        if (o === `a`) return !1;
        ((o = `b`), a.push(t[i]), r++, i++);
      } else return !1;
    return e.length === t.length && a;
  }
  parseNegate() {
    if (this.nonegate) return;
    let e = this.pattern,
      t = !1,
      n = 0;
    for (let r = 0; r < e.length && e.charAt(r) === `!`; r++) ((t = !t), n++);
    (n && (this.pattern = e.slice(n)), (this.negate = t));
  }
  matchOne(e, t, n = !1) {
    let r = 0,
      i = 0;
    if (this.isWindows) {
      let n = typeof e[0] == `string` && /^[a-z]:$/i.test(e[0]),
        a = !n && e[0] === `` && e[1] === `` && e[2] === `?` && /^[a-z]:$/i.test(e[3]),
        o = typeof t[0] == `string` && /^[a-z]:$/i.test(t[0]),
        s =
          !o &&
          t[0] === `` &&
          t[1] === `` &&
          t[2] === `?` &&
          typeof t[3] == `string` &&
          /^[a-z]:$/i.test(t[3]),
        c = a ? 3 : n ? 0 : void 0,
        l = s ? 3 : o ? 0 : void 0;
      if (typeof c == `number` && typeof l == `number`) {
        let [n, a] = [e[c], t[l]];
        n.toLowerCase() === a.toLowerCase() && ((t[l] = n), (i = l), (r = c));
      }
    }
    let { optimizationLevel: a = 1 } = this.options;
    return (
      a >= 2 && (e = this.levelTwoFileOptimize(e)),
      t.includes(z) ? this.#e(e, t, n, r, i) : this.#n(e, t, n, r, i)
    );
  }
  #e(e, t, n, r, i) {
    let a = t.indexOf(z, i),
      o = t.lastIndexOf(z),
      [s, c, l] = n
        ? [t.slice(i, a), t.slice(a + 1), []]
        : [t.slice(i, a), t.slice(a + 1, o), t.slice(o + 1)];
    if (s.length) {
      let t = e.slice(r, r + s.length);
      if (!this.#n(t, s, n, 0, 0)) return !1;
      ((r += s.length), (i += s.length));
    }
    let u = 0;
    if (l.length) {
      if (l.length + r > e.length) return !1;
      let t = e.length - l.length;
      if (this.#n(e, l, n, t, 0)) u = l.length;
      else {
        if (e[e.length - 1] !== `` || r + l.length === e.length || (t--, !this.#n(e, l, n, t, 0)))
          return !1;
        u = l.length + 1;
      }
    }
    if (!c.length) {
      let t = !!u;
      for (let n = r; n < e.length - u; n++) {
        let r = String(e[n]);
        if (((t = !0), r === `.` || r === `..` || (!this.options.dot && r.startsWith(`.`))))
          return !1;
      }
      return n || t;
    }
    let d = [[[], 0]],
      f = d[0],
      p = 0,
      m = [0];
    for (let e of c) e === z ? (m.push(p), (f = [[], 0]), d.push(f)) : (f[0].push(e), p++);
    let h = d.length - 1,
      g = e.length - u;
    for (let e of d) e[1] = g - (m[h--] + e[0].length);
    return !!this.#t(e, d, r, 0, n, 0, !!u);
  }
  #t(e, t, n, r, i, a, o) {
    let s = t[r];
    if (!s) {
      for (let t = n; t < e.length; t++) {
        o = !0;
        let n = e[t];
        if (n === `.` || n === `..` || (!this.options.dot && n.startsWith(`.`))) return !1;
      }
      return o;
    }
    let [c, l] = s;
    for (; n <= l;) {
      if (this.#n(e.slice(0, n + c.length), c, i, n, 0) && a < this.maxGlobstarRecursion) {
        let s = this.#t(e, t, n + c.length, r + 1, i, a + 1, o);
        if (s !== !1) return s;
      }
      let s = e[n];
      if (s === `.` || s === `..` || (!this.options.dot && s.startsWith(`.`))) return !1;
      n++;
    }
    return i || null;
  }
  #n(e, t, n, r, i) {
    let a, o, s, c;
    for (a = r, o = i, c = e.length, s = t.length; a < c && o < s; a++, o++) {
      this.debug(`matchOne loop`);
      let n = t[o],
        r = e[a];
      if ((this.debug(t, n, r), n === !1 || n === z)) return !1;
      let i;
      if (
        (typeof n == `string`
          ? ((i = r === n), this.debug(`string match`, n, r, i))
          : ((i = n.test(r)), this.debug(`pattern match`, n, r, i)),
        !i)
      )
        return !1;
    }
    if (a === c && o === s) return !0;
    if (a === c) return n;
    if (o === s) return a === c - 1 && e[a] === ``;
    throw Error(`wtf?`);
  }
  braceExpand() {
    return To(this.pattern, this.options);
  }
  parse(e) {
    ja(e);
    let t = this.options;
    if (e === `**`) return z;
    if (e === ``) return ``;
    let n,
      r = null;
    (n = e.match(fo))
      ? (r = t.dot ? mo : po)
      : (n = e.match(to))
        ? (r = (t.nocase ? (t.dot ? ao : io) : t.dot ? ro : no)(n[1]))
        : (n = e.match(ho))
          ? (r = (t.nocase ? (t.dot ? _o : go) : t.dot ? vo : yo)(n))
          : (n = e.match(oo))
            ? (r = t.dot ? co : so)
            : (n = e.match(lo)) && (r = uo);
    let i = $a.fromGlob(e, this.options).toMMPattern();
    return (r && typeof i == `object` && Reflect.defineProperty(i, "test", { value: r }), i);
  }
  makeRe() {
    if (this.regexp || this.regexp === !1) return this.regexp;
    let e = this.set;
    if (!e.length) return ((this.regexp = !1), this.regexp);
    let t = this.options,
      n = t.noglobstar
        ? `[^/]*?`
        : t.dot
          ? `(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?`
          : `(?:(?!(?:\\/|^)\\.).)*?`,
      r = new Set(t.nocase ? [`i`] : []),
      i = e
        .map((e) => {
          let t = e.map((e) => {
            if (e instanceof RegExp) for (let t of e.flags.split(``)) r.add(t);
            return typeof e == `string` ? Do(e) : e === z ? z : e._src;
          });
          t.forEach((e, r) => {
            let i = t[r + 1],
              a = t[r - 1];
            e !== z ||
              a === z ||
              (a === void 0
                ? i !== void 0 && i !== z
                  ? (t[r + 1] = `(?:\\/|` + n + `\\/)?` + i)
                  : (t[r] = n)
                : i === void 0
                  ? (t[r - 1] = a + `(?:\\/|\\/` + n + `)?`)
                  : i !== z && ((t[r - 1] = a + `(?:\\/|\\/` + n + `\\/)` + i), (t[r + 1] = z)));
          });
          let i = t.filter((e) => e !== z);
          if (this.partial && i.length >= 1) {
            let e = [];
            for (let t = 1; t <= i.length; t++) e.push(i.slice(0, t).join(`/`));
            return `(?:` + e.join(`|`) + `)`;
          }
          return i.join(`/`);
        })
        .join(`|`),
      [a, o] = e.length > 1 ? [`(?:`, `)`] : [``, ``];
    ((i = `^` + a + i + o + `$`),
      this.partial && (i = `^(?:\\/|` + a + i.slice(1, -1) + o + `)$`),
      this.negate && (i = `^(?!` + i + `).+$`));
    try {
      this.regexp = new RegExp(i, [...r].join(``));
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  slashSplit(e) {
    return this.preserveMultipleSlashes
      ? e.split(`/`)
      : this.isWindows && /^\/\/[^/]+/.test(e)
        ? [``, ...e.split(/\/+/)]
        : e.split(/\/+/);
  }
  match(e, t = this.partial) {
    if ((this.debug(`match`, e, this.pattern), this.comment)) return !1;
    if (this.empty) return e === ``;
    if (e === `/` && t) return !0;
    let n = this.options;
    this.isWindows && (e = e.split(`\\`).join(`/`));
    let r = this.slashSplit(e);
    this.debug(this.pattern, `split`, r);
    let i = this.set;
    this.debug(this.pattern, `set`, i);
    let a = r[r.length - 1];
    if (!a) for (let e = r.length - 2; !a && e >= 0; e--) a = r[e];
    for (let e of i) {
      let i = r;
      if ((n.matchBase && e.length === 1 && (i = [a]), this.matchOne(i, e, t)))
        return n.flipNegate ? !0 : !this.negate;
    }
    return n.flipNegate ? !1 : this.negate;
  }
  static defaults(e) {
    return R.defaults(e).Minimatch;
  }
};
((R.AST = $a), (R.Minimatch = Oo), (R.escape = eo), (R.unescape = La));
var ko = i((e, t) => {
    let n = process || {},
      r = n.argv || [],
      i = n.env || {},
      a =
        !(i.NO_COLOR || r.includes(`--no-color`)) &&
        (!!i.FORCE_COLOR ||
          r.includes(`--color`) ||
          n.platform === `win32` ||
          ((n.stdout || {}).isTTY && i.TERM !== `dumb`) ||
          !!i.CI),
      o =
        (e, t, n = e) =>
        (r) => {
          let i = `` + r,
            a = i.indexOf(t, e.length);
          return ~a ? e + s(i, t, n, a) + t : e + i + t;
        },
      s = (e, t, n, r) => {
        let i = ``,
          a = 0;
        do ((i += e.substring(a, r) + n), (a = r + t.length), (r = e.indexOf(t, a)));
        while (~r);
        return i + e.substring(a);
      },
      c = (e = a) => {
        let t = e ? o : () => String;
        return {
          isColorSupported: e,
          reset: t(`\x1B[0m`, `\x1B[0m`),
          bold: t(`\x1B[1m`, `\x1B[22m`, `\x1B[22m\x1B[1m`),
          dim: t(`\x1B[2m`, `\x1B[22m`, `\x1B[22m\x1B[2m`),
          italic: t(`\x1B[3m`, `\x1B[23m`),
          underline: t(`\x1B[4m`, `\x1B[24m`),
          inverse: t(`\x1B[7m`, `\x1B[27m`),
          hidden: t(`\x1B[8m`, `\x1B[28m`),
          strikethrough: t(`\x1B[9m`, `\x1B[29m`),
          black: t(`\x1B[30m`, `\x1B[39m`),
          red: t(`\x1B[31m`, `\x1B[39m`),
          green: t(`\x1B[32m`, `\x1B[39m`),
          yellow: t(`\x1B[33m`, `\x1B[39m`),
          blue: t(`\x1B[34m`, `\x1B[39m`),
          magenta: t(`\x1B[35m`, `\x1B[39m`),
          cyan: t(`\x1B[36m`, `\x1B[39m`),
          white: t(`\x1B[37m`, `\x1B[39m`),
          gray: t(`\x1B[90m`, `\x1B[39m`),
          bgBlack: t(`\x1B[40m`, `\x1B[49m`),
          bgRed: t(`\x1B[41m`, `\x1B[49m`),
          bgGreen: t(`\x1B[42m`, `\x1B[49m`),
          bgYellow: t(`\x1B[43m`, `\x1B[49m`),
          bgBlue: t(`\x1B[44m`, `\x1B[49m`),
          bgMagenta: t(`\x1B[45m`, `\x1B[49m`),
          bgCyan: t(`\x1B[46m`, `\x1B[49m`),
          bgWhite: t(`\x1B[47m`, `\x1B[49m`),
          blackBright: t(`\x1B[90m`, `\x1B[39m`),
          redBright: t(`\x1B[91m`, `\x1B[39m`),
          greenBright: t(`\x1B[92m`, `\x1B[39m`),
          yellowBright: t(`\x1B[93m`, `\x1B[39m`),
          blueBright: t(`\x1B[94m`, `\x1B[39m`),
          magentaBright: t(`\x1B[95m`, `\x1B[39m`),
          cyanBright: t(`\x1B[96m`, `\x1B[39m`),
          whiteBright: t(`\x1B[97m`, `\x1B[39m`),
          bgBlackBright: t(`\x1B[100m`, `\x1B[49m`),
          bgRedBright: t(`\x1B[101m`, `\x1B[49m`),
          bgGreenBright: t(`\x1B[102m`, `\x1B[49m`),
          bgYellowBright: t(`\x1B[103m`, `\x1B[49m`),
          bgBlueBright: t(`\x1B[104m`, `\x1B[49m`),
          bgMagentaBright: t(`\x1B[105m`, `\x1B[49m`),
          bgCyanBright: t(`\x1B[106m`, `\x1B[49m`),
          bgWhiteBright: t(`\x1B[107m`, `\x1B[49m`),
        };
      };
    ((t.exports = c()), (t.exports.createColors = c));
  }),
  Ao = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { version: () => u }), (t.exports = c(l)));
    let u = `3.8.0`;
    0 && (t.exports = { version: u });
  }),
  jo = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { exchangeVercelOidcToken: () => p }), (t.exports = c(l)));
    var u = Ao();
    let d = new (class {
      constructor(e) {
        ((this.maxEntries = e), (this.entries = new Map()));
      }
      get(e) {
        let t = this.entries.get(e);
        if (t !== void 0) {
          if (t.expiresAt <= Date.now()) {
            this.entries.delete(e);
            return;
          }
          return (this.entries.delete(e), this.entries.set(e, t), t.token);
        }
      }
      set({ key: e, token: t, expiresAt: n }) {
        for (
          this.entries.delete(e), this.entries.set(e, { token: t, expiresAt: n });
          this.entries.size > this.maxEntries;
        ) {
          let e = this.entries.keys().next().value;
          if (e === void 0) break;
          this.entries.delete(e);
        }
      }
    })(1e3);
    async function f(e) {
      let t = JSON.stringify([e.token, e.audience, e.jti]),
        n = await crypto.subtle.digest(`SHA-256`, new TextEncoder().encode(t));
      return Array.from(new Uint8Array(n))
        .map((e) => e.toString(16).padStart(2, `0`))
        .join(``);
    }
    async function p(e) {
      let t = await f(e);
      if (!e.skipCache) {
        let e = d.get(t);
        if (e !== void 0) return e;
      }
      let n = await fetch(`https://oidc.vercel.com/~token`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
          "User-Agent": `@vercel/oidc@${u.version}`,
        },
        body: JSON.stringify({
          token: e.token,
          aud: e.audience,
          ...(e.jti ? { jti: e.jti } : void 0),
        }),
      });
      if (!n.ok) throw Error(`Failed to exchange token: ${await m(n)}`);
      let r;
      try {
        r = await n.json();
      } catch {
        throw Error(`Failed to exchange token: response was not valid JSON`);
      }
      if (!r || typeof r != `object` || !(`token` in r) || typeof r.token != `string`)
        throw Error(`Failed to exchange token: response did not contain a token`);
      let { token: i } = r,
        a = `expiry` in r && typeof r.expiry == `number` ? r.expiry : void 0;
      if (a !== void 0) {
        let e = a * 1e3;
        e > Date.now() && d.set({ key: t, token: i, expiresAt: e });
      }
      return i;
    }
    async function m(e) {
      try {
        let t = await e.json();
        if (t && typeof t == `object` && `error` in t && typeof t.error == `string`) return t.error;
      } catch {}
      return e.statusText || `HTTP ${e.status}`;
    }
    0 && (t.exports = { exchangeVercelOidcToken: p });
  }),
  Mo = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { SYMBOL_FOR_REQ_CONTEXT: () => u, getContext: () => d }), (t.exports = c(l)));
    let u = Symbol.for(`@vercel/request-context`);
    function d() {
      return globalThis[u]?.get?.() ?? {};
    }
    0 && (t.exports = { SYMBOL_FOR_REQ_CONTEXT: u, getContext: d });
  }),
  No = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { getVercelOidcTokenSync: () => d }), (t.exports = c(l)));
    var u = Mo();
    function d() {
      let e = (0, u.getContext)().headers?.[`x-vercel-oidc-token`] ?? process.env.VERCEL_OIDC_TOKEN;
      if (!e) throw Error(`The 'x-vercel-oidc-token' header is missing from the request.`);
      return e;
    }
    0 && (t.exports = { getVercelOidcTokenSync: d });
  }),
  Po = i((e, t) => {
    var r = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      a = Object.getOwnPropertyNames,
      o = Object.prototype.hasOwnProperty,
      s = (e, t) => {
        for (var n in t) r(e, n, { get: t[n], enumerable: !0 });
      },
      c = (e, t, n, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of a(t))
            !o.call(e, c) &&
              c !== n &&
              r(e, c, { get: () => t[c], enumerable: !(s = i(t, c)) || s.enumerable });
        return e;
      },
      l = (e) => c(r({}, `__esModule`, { value: !0 }), e),
      u = {};
    (s(u, { getVercelOidcToken: () => m }), (t.exports = l(u)));
    var d = jo(),
      f = No(),
      p = Pe();
    async function m(e) {
      let t = ``,
        r;
      try {
        t = (0, f.getVercelOidcTokenSync)();
      } catch (e) {
        r = e;
      }
      try {
        let [{ getTokenPayload: r, isExpired: i }, { refreshToken: a }] = await Promise.all([
          await import(`../../_chunks/workflow/token-util-B6qBs3-0.js`).then((e) => n(e.t())),
          await import(`../../_chunks/workflow/token-DWqA5-DA.js`).then((e) => n(e.default)),
        ]);
        (!t || i(r(t), e?.expirationBufferMs)) &&
          (await a(e), (t = (0, f.getVercelOidcTokenSync)()));
      } catch (e) {
        let t = r instanceof Error ? r.message : ``;
        throw (
          e instanceof Error &&
            (t = `${t}
${e.message}`),
          t ? new p.VercelOidcTokenError(t) : e
        );
      }
      return (
        e?.audience &&
          (t = await (0, d.exchangeVercelOidcToken)({
            token: t,
            audience: e.audience,
            jti: e.jti,
            skipCache: e.skipCache,
          })),
        t
      );
    }
    0 && (t.exports = { getVercelOidcToken: m });
  }),
  Fo,
  Io = t(() => {
    Fo = (e, t) => Ve(e).update(t).digest();
  });
function Lo(...e) {
  let t = e.reduce((e, { length: t }) => e + t, 0),
    n = new Uint8Array(t),
    r = 0;
  for (let t of e) (n.set(t, r), (r += t.length));
  return n;
}
function Ro(e, t) {
  return Lo(B.encode(e), new Uint8Array([0]), t);
}
function zo(e, t, n) {
  if (t < 0 || t >= Go) throw RangeError(`value must be >= 0 and <= ${Go - 1}. Received ${t}`);
  e.set([t >>> 24, t >>> 16, t >>> 8, t & 255], n);
}
function Bo(e) {
  let t = Math.floor(e / Go),
    n = e % Go,
    r = new Uint8Array(8);
  return (zo(r, t, 0), zo(r, n, 4), r);
}
function Vo(e) {
  let t = new Uint8Array(4);
  return (zo(t, e), t);
}
function Ho(e) {
  return Lo(Vo(e.length), e);
}
async function Uo(e, t, n) {
  let r = Math.ceil((t >> 3) / 32),
    i = new Uint8Array(r * 32);
  for (let t = 0; t < r; t++) {
    let r = new Uint8Array(4 + e.length + n.length);
    (r.set(Vo(t + 1)), r.set(e, 4), r.set(n, 4 + e.length), i.set(await Fo(`sha256`, r), t * 32));
  }
  return i.slice(0, t >> 3);
}
var B,
  Wo,
  Go,
  V = t(() => {
    (Io(), (B = new TextEncoder()), (Wo = new TextDecoder()), (Go = 2 ** 32));
  });
function Ko(e) {
  let t = e;
  return (t instanceof Uint8Array && (t = Wo.decode(t)), t);
}
var H,
  U,
  qo = t(() => {
    (V(),
      (H = (e) => ct.from(e).toString(`base64url`)),
      (U = (e) => new Uint8Array(ct.from(Ko(e), `base64url`))));
  }),
  Jo = r({
    JOSEAlgNotAllowed: () => Zo,
    JOSEError: () => W,
    JOSENotSupported: () => G,
    JWEDecryptionFailed: () => Qo,
    JWEInvalid: () => K,
    JWKInvalid: () => es,
    JWKSInvalid: () => ts,
    JWKSMultipleMatchingKeys: () => rs,
    JWKSNoMatchingKey: () => ns,
    JWKSTimeout: () => is,
    JWSInvalid: () => q,
    JWSSignatureVerificationFailed: () => as,
    JWTClaimValidationFailed: () => Yo,
    JWTExpired: () => Xo,
    JWTInvalid: () => $o,
  }),
  W,
  Yo,
  Xo,
  Zo,
  G,
  Qo,
  K,
  q,
  $o,
  es,
  ts,
  ns,
  rs,
  is,
  as,
  J = t(() => {
    ((W = class extends Error {
      static code = `ERR_JOSE_GENERIC`;
      code = `ERR_JOSE_GENERIC`;
      constructor(e, t) {
        (super(e, t),
          (this.name = this.constructor.name),
          Error.captureStackTrace?.(this, this.constructor));
      }
    }),
      (Yo = class extends W {
        static code = `ERR_JWT_CLAIM_VALIDATION_FAILED`;
        code = `ERR_JWT_CLAIM_VALIDATION_FAILED`;
        claim;
        reason;
        payload;
        constructor(e, t, n = `unspecified`, r = `unspecified`) {
          (super(e, { cause: { claim: n, reason: r, payload: t } }),
            (this.claim = n),
            (this.reason = r),
            (this.payload = t));
        }
      }),
      (Xo = class extends W {
        static code = `ERR_JWT_EXPIRED`;
        code = `ERR_JWT_EXPIRED`;
        claim;
        reason;
        payload;
        constructor(e, t, n = `unspecified`, r = `unspecified`) {
          (super(e, { cause: { claim: n, reason: r, payload: t } }),
            (this.claim = n),
            (this.reason = r),
            (this.payload = t));
        }
      }),
      (Zo = class extends W {
        static code = `ERR_JOSE_ALG_NOT_ALLOWED`;
        code = `ERR_JOSE_ALG_NOT_ALLOWED`;
      }),
      (G = class extends W {
        static code = `ERR_JOSE_NOT_SUPPORTED`;
        code = `ERR_JOSE_NOT_SUPPORTED`;
      }),
      (Qo = class extends W {
        static code = `ERR_JWE_DECRYPTION_FAILED`;
        code = `ERR_JWE_DECRYPTION_FAILED`;
        constructor(e = `decryption operation failed`, t) {
          super(e, t);
        }
      }),
      (K = class extends W {
        static code = `ERR_JWE_INVALID`;
        code = `ERR_JWE_INVALID`;
      }),
      (q = class extends W {
        static code = `ERR_JWS_INVALID`;
        code = `ERR_JWS_INVALID`;
      }),
      ($o = class extends W {
        static code = `ERR_JWT_INVALID`;
        code = `ERR_JWT_INVALID`;
      }),
      (es = class extends W {
        static code = `ERR_JWK_INVALID`;
        code = `ERR_JWK_INVALID`;
      }),
      (ts = class extends W {
        static code = `ERR_JWKS_INVALID`;
        code = `ERR_JWKS_INVALID`;
      }),
      (ns = class extends W {
        static code = `ERR_JWKS_NO_MATCHING_KEY`;
        code = `ERR_JWKS_NO_MATCHING_KEY`;
        constructor(e = `no applicable key found in the JSON Web Key Set`, t) {
          super(e, t);
        }
      }),
      (rs = class extends W {
        [Symbol.asyncIterator];
        static code = `ERR_JWKS_MULTIPLE_MATCHING_KEYS`;
        code = `ERR_JWKS_MULTIPLE_MATCHING_KEYS`;
        constructor(e = `multiple matching keys found in the JSON Web Key Set`, t) {
          super(e, t);
        }
      }),
      (is = class extends W {
        static code = `ERR_JWKS_TIMEOUT`;
        code = `ERR_JWKS_TIMEOUT`;
        constructor(e = `request timed out`, t) {
          super(e, t);
        }
      }),
      (as = class extends W {
        static code = `ERR_JWS_SIGNATURE_VERIFICATION_FAILED`;
        code = `ERR_JWS_SIGNATURE_VERIFICATION_FAILED`;
        constructor(e = `signature verification failed`, t) {
          super(e, t);
        }
      }));
  }),
  os = t(() => {});
function ss(e) {
  switch (e) {
    case `A128GCM`:
    case `A128GCMKW`:
    case `A192GCM`:
    case `A192GCMKW`:
    case `A256GCM`:
    case `A256GCMKW`:
      return 96;
    case `A128CBC-HS256`:
    case `A192CBC-HS384`:
    case `A256CBC-HS512`:
      return 128;
    default:
      throw new G(`Unsupported JWE Algorithm: ${e}`);
  }
}
var cs,
  ls = t(() => {
    (J(), os(), (cs = (e) => Qe(new Uint8Array(ss(e) >> 3))));
  }),
  us,
  ds = t(() => {
    (J(),
      ls(),
      (us = (e, t) => {
        if (t.length << 3 !== ss(e)) throw new K(`Invalid Initialization Vector length`);
      }));
  }),
  Y,
  fs = t(() => {
    Y = (e) => tt.types.isKeyObject(e);
  }),
  ps,
  ms = t(() => {
    (J(),
      fs(),
      (ps = (e, t) => {
        let n;
        switch (e) {
          case `A128CBC-HS256`:
          case `A192CBC-HS384`:
          case `A256CBC-HS512`:
            n = parseInt(e.slice(-3), 10);
            break;
          case `A128GCM`:
          case `A192GCM`:
          case `A256GCM`:
            n = parseInt(e.slice(1, 4), 10);
            break;
          default:
            throw new G(
              `Content Encryption Algorithm ${e} is not supported either by JOSE or your javascript runtime`,
            );
        }
        if (t instanceof Uint8Array) {
          let e = t.byteLength << 3;
          if (e !== n)
            throw new K(`Invalid Content Encryption Key length. Expected ${n} bits, got ${e} bits`);
          return;
        }
        if (Y(t) && t.type === `secret`) {
          let e = t.symmetricKeySize << 3;
          if (e !== n)
            throw new K(`Invalid Content Encryption Key length. Expected ${n} bits, got ${e} bits`);
          return;
        }
        throw TypeError(`Invalid Content Encryption Key type`);
      }));
  }),
  hs,
  gs = t(() => {
    hs = $e;
  });
function _s(e, t, n, r, i, a) {
  let o = Lo(e, t, n, Bo(e.length << 3)),
    s = He(`sha${r}`, i);
  return (s.update(o), s.digest().slice(0, a >> 3));
}
var vs = t(() => {
    V();
  }),
  ys,
  bs,
  xs = t(() => {
    ((ys = Le.webcrypto), (bs = (e) => tt.types.isCryptoKey(e)));
  });
function X(e, t = `algorithm.name`) {
  return TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
function Ss(e, t) {
  return e.name === t;
}
function Cs(e) {
  return parseInt(e.name.slice(4), 10);
}
function ws(e) {
  switch (e) {
    case `ES256`:
      return `P-256`;
    case `ES384`:
      return `P-384`;
    case `ES512`:
      return `P-521`;
    default:
      throw Error(`unreachable`);
  }
}
function Ts(e, t) {
  if (t.length && !t.some((t) => e.usages.includes(t))) {
    let e = `CryptoKey does not support this operation, its usages must include `;
    if (t.length > 2) {
      let n = t.pop();
      e += `one of ${t.join(`, `)}, or ${n}.`;
    } else t.length === 2 ? (e += `one of ${t[0]} or ${t[1]}.`) : (e += `${t[0]}.`);
    throw TypeError(e);
  }
}
function Es(e, t, ...n) {
  switch (t) {
    case `HS256`:
    case `HS384`:
    case `HS512`: {
      if (!Ss(e.algorithm, `HMAC`)) throw X(`HMAC`);
      let n = parseInt(t.slice(2), 10);
      if (Cs(e.algorithm.hash) !== n) throw X(`SHA-${n}`, `algorithm.hash`);
      break;
    }
    case `RS256`:
    case `RS384`:
    case `RS512`: {
      if (!Ss(e.algorithm, `RSASSA-PKCS1-v1_5`)) throw X(`RSASSA-PKCS1-v1_5`);
      let n = parseInt(t.slice(2), 10);
      if (Cs(e.algorithm.hash) !== n) throw X(`SHA-${n}`, `algorithm.hash`);
      break;
    }
    case `PS256`:
    case `PS384`:
    case `PS512`: {
      if (!Ss(e.algorithm, `RSA-PSS`)) throw X(`RSA-PSS`);
      let n = parseInt(t.slice(2), 10);
      if (Cs(e.algorithm.hash) !== n) throw X(`SHA-${n}`, `algorithm.hash`);
      break;
    }
    case `EdDSA`:
      if (e.algorithm.name !== `Ed25519` && e.algorithm.name !== `Ed448`)
        throw X(`Ed25519 or Ed448`);
      break;
    case `Ed25519`:
      if (!Ss(e.algorithm, `Ed25519`)) throw X(`Ed25519`);
      break;
    case `ES256`:
    case `ES384`:
    case `ES512`: {
      if (!Ss(e.algorithm, `ECDSA`)) throw X(`ECDSA`);
      let n = ws(t);
      if (e.algorithm.namedCurve !== n) throw X(n, `algorithm.namedCurve`);
      break;
    }
    default:
      throw TypeError(`CryptoKey does not support this operation`);
  }
  Ts(e, n);
}
function Ds(e, t, ...n) {
  switch (t) {
    case `A128GCM`:
    case `A192GCM`:
    case `A256GCM`: {
      if (!Ss(e.algorithm, `AES-GCM`)) throw X(`AES-GCM`);
      let n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n) throw X(n, `algorithm.length`);
      break;
    }
    case `A128KW`:
    case `A192KW`:
    case `A256KW`: {
      if (!Ss(e.algorithm, `AES-KW`)) throw X(`AES-KW`);
      let n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n) throw X(n, `algorithm.length`);
      break;
    }
    case `ECDH`:
      switch (e.algorithm.name) {
        case `ECDH`:
        case `X25519`:
        case `X448`:
          break;
        default:
          throw X(`ECDH, X25519, or X448`);
      }
      break;
    case `PBES2-HS256+A128KW`:
    case `PBES2-HS384+A192KW`:
    case `PBES2-HS512+A256KW`:
      if (!Ss(e.algorithm, `PBKDF2`)) throw X(`PBKDF2`);
      break;
    case `RSA-OAEP`:
    case `RSA-OAEP-256`:
    case `RSA-OAEP-384`:
    case `RSA-OAEP-512`: {
      if (!Ss(e.algorithm, `RSA-OAEP`)) throw X(`RSA-OAEP`);
      let n = parseInt(t.slice(9), 10) || 1;
      if (Cs(e.algorithm.hash) !== n) throw X(`SHA-${n}`, `algorithm.hash`);
      break;
    }
    default:
      throw TypeError(`CryptoKey does not support this operation`);
  }
  Ts(e, n);
}
var Os = t(() => {});
function ks(e, t, ...n) {
  if (((n = n.filter(Boolean)), n.length > 2)) {
    let t = n.pop();
    e += `one of type ${n.join(`, `)}, or ${t}.`;
  } else n.length === 2 ? (e += `one of type ${n[0]} or ${n[1]}.`) : (e += `of type ${n[0]}.`);
  return (
    t == null
      ? (e += ` Received ${t}`)
      : typeof t == `function` && t.name
        ? (e += ` Received function ${t.name}`)
        : typeof t == `object` &&
          t &&
          t.constructor?.name &&
          (e += ` Received an instance of ${t.constructor.name}`),
    e
  );
}
function As(e, t, ...n) {
  return ks(`Key for the ${e} algorithm must be `, t, ...n);
}
var js,
  Ms = t(() => {
    js = (e, ...t) => ks(`Key must be `, e, ...t);
  }),
  Ns,
  Ps,
  Fs = t(() => {
    Ps = (e) => ((Ns ||= new Set(Je())), Ns.has(e));
  }),
  Is,
  Z,
  Ls = t(() => {
    (xs(),
      fs(),
      (Is = (e) => Y(e) || bs(e)),
      (Z = [`KeyObject`]),
      (globalThis.CryptoKey || ys?.CryptoKey) && Z.push(`CryptoKey`));
  });
function Rs(e, t, n, r, i, a) {
  let o = parseInt(e.slice(1, 4), 10);
  Y(t) && (t = t.export());
  let s = t.subarray(o >> 3),
    c = t.subarray(0, o >> 3),
    l = parseInt(e.slice(-3), 10),
    u = `aes-${o}-cbc`;
  if (!Ps(u)) throw new G(`alg ${e} is not supported by your javascript runtime`);
  let d = _s(a, r, n, l, c, o),
    f;
  try {
    f = hs(i, d);
  } catch {}
  if (!f) throw new Qo();
  let p;
  try {
    let e = Be(u, s, r);
    p = Lo(e.update(n), e.final());
  } catch {}
  if (!p) throw new Qo();
  return p;
}
function zs(e, t, n, r, i, a) {
  let o = `aes-${parseInt(e.slice(1, 4), 10)}-gcm`;
  if (!Ps(o)) throw new G(`alg ${e} is not supported by your javascript runtime`);
  try {
    let e = Be(o, t, r, { authTagLength: 16 });
    (e.setAuthTag(i), a.byteLength && e.setAAD(a, { plaintextLength: n.length }));
    let s = e.update(n);
    return (e.final(), s);
  } catch {
    throw new Qo();
  }
}
var Bs,
  Vs = t(() => {
    (ds(),
      ms(),
      V(),
      J(),
      gs(),
      vs(),
      xs(),
      Os(),
      fs(),
      Ms(),
      Fs(),
      Ls(),
      (Bs = (e, t, n, r, i, a) => {
        let o;
        if (bs(t)) (Ds(t, e, `decrypt`), (o = x.from(t)));
        else if (t instanceof Uint8Array || Y(t)) o = t;
        else throw TypeError(js(t, ...Z, `Uint8Array`));
        if (!r) throw new K(`JWE Initialization Vector missing`);
        if (!i) throw new K(`JWE Authentication Tag missing`);
        switch ((ps(e, o), us(e, r), e)) {
          case `A128CBC-HS256`:
          case `A192CBC-HS384`:
          case `A256CBC-HS512`:
            return Rs(e, o, n, r, i, a);
          case `A128GCM`:
          case `A192GCM`:
          case `A256GCM`:
            return zs(e, o, n, r, i, a);
          default:
            throw new G(`Unsupported JWE Content Encryption Algorithm`);
        }
      }));
  }),
  Hs,
  Us = t(() => {
    Hs = (...e) => {
      let t = e.filter(Boolean);
      if (t.length === 0 || t.length === 1) return !0;
      let n;
      for (let e of t) {
        let t = Object.keys(e);
        if (!n || n.size === 0) {
          n = new Set(t);
          continue;
        }
        for (let e of t) {
          if (n.has(e)) return !1;
          n.add(e);
        }
      }
      return !0;
    };
  });
function Ws(e) {
  return typeof e == `object` && !!e;
}
function Q(e) {
  if (!Ws(e) || Object.prototype.toString.call(e) !== `[object Object]`) return !1;
  if (Object.getPrototypeOf(e) === null) return !0;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
var Gs = t(() => {});
function Ks(e, t) {
  if (e.symmetricKeySize << 3 !== parseInt(t.slice(1, 4), 10))
    throw TypeError(`Invalid key size for alg: ${t}`);
}
function qs(e, t, n) {
  if (Y(e)) return e;
  if (e instanceof Uint8Array) return Ge(e);
  if (bs(e)) return (Ds(e, t, n), x.from(e));
  throw TypeError(js(e, ...Z, `Uint8Array`));
}
var Js,
  Ys,
  Xs = t(() => {
    (J(),
      V(),
      xs(),
      Os(),
      fs(),
      Ms(),
      Fs(),
      Ls(),
      (Js = (e, t, n) => {
        let r = `aes${parseInt(e.slice(1, 4), 10)}-wrap`;
        if (!Ps(r))
          throw new G(`alg ${e} is not supported either by JOSE or your javascript runtime`);
        let i = qs(t, e, `wrapKey`);
        Ks(i, e);
        let a = ze(r, i, ct.alloc(8, 166));
        return Lo(a.update(n), a.final());
      }),
      (Ys = (e, t, n) => {
        let r = `aes${parseInt(e.slice(1, 4), 10)}-wrap`;
        if (!Ps(r))
          throw new G(`alg ${e} is not supported either by JOSE or your javascript runtime`);
        let i = qs(t, e, `unwrapKey`);
        Ks(i, e);
        let a = Be(r, i, ct.alloc(8, 166));
        return Lo(a.update(n), a.final());
      }));
  });
function Zs(e) {
  return Q(e) && typeof e.kty == `string`;
}
function Qs(e) {
  return e.kty !== `oct` && typeof e.d == `string`;
}
function $s(e) {
  return e.kty !== `oct` && e.d === void 0;
}
function ec(e) {
  return Zs(e) && e.kty === `oct` && typeof e.k == `string`;
}
var tc = t(() => {
    Gs();
  }),
  nc,
  rc,
  ic = t(() => {
    (J(),
      xs(),
      fs(),
      Ms(),
      Ls(),
      tc(),
      (nc = (e) => {
        switch (e) {
          case `prime256v1`:
            return `P-256`;
          case `secp384r1`:
            return `P-384`;
          case `secp521r1`:
            return `P-521`;
          case `secp256k1`:
            return `secp256k1`;
          default:
            throw new G(`Unsupported key curve for this operation`);
        }
      }),
      (rc = (e, t) => {
        let n;
        if (bs(e)) n = x.from(e);
        else if (Y(e)) n = e;
        else if (Zs(e)) return e.crv;
        else throw TypeError(js(e, ...Z));
        if (n.type === `secret`)
          throw TypeError(`only "private" or "public" type keys can be used for this operation`);
        switch (n.asymmetricKeyType) {
          case `ed25519`:
          case `ed448`:
            return `Ed${n.asymmetricKeyType.slice(2)}`;
          case `x25519`:
          case `x448`:
            return `X${n.asymmetricKeyType.slice(1)}`;
          case `ec`: {
            let e = n.asymmetricKeyDetails.namedCurve;
            return t ? e : nc(e);
          }
          default:
            throw TypeError(`Invalid asymmetric key type for this operation`);
        }
      }));
  });
async function ac(e, t, n, r, i = new Uint8Array(), a = new Uint8Array()) {
  let o;
  if (bs(e)) (Ds(e, `ECDH`), (o = x.from(e)));
  else if (Y(e)) o = e;
  else throw TypeError(js(e, ...Z));
  let s;
  if (bs(t)) (Ds(t, `ECDH`, `deriveBits`), (s = x.from(t)));
  else if (Y(t)) s = t;
  else throw TypeError(js(t, ...Z));
  let c = Lo(Ho(B.encode(n)), Ho(i), Ho(a), Vo(r));
  return Uo(Ke({ privateKey: s, publicKey: o }), r, c);
}
async function oc(e) {
  let t;
  if (bs(e)) t = x.from(e);
  else if (Y(e)) t = e;
  else throw TypeError(js(e, ...Z));
  switch (t.asymmetricKeyType) {
    case `x25519`:
      return sc(`x25519`);
    case `x448`:
      return sc(`x448`);
    case `ec`:
      return sc(`ec`, { namedCurve: rc(t) });
    default:
      throw new G(`Invalid or unsupported EPK`);
  }
}
var sc,
  cc,
  lc = t(() => {
    (ic(),
      V(),
      J(),
      xs(),
      Os(),
      fs(),
      Ms(),
      Ls(),
      (sc = it(qe)),
      (cc = (e) => [`P-256`, `P-384`, `P-521`, `X25519`, `X448`].includes(rc(e))));
  });
function uc(e) {
  if (!(e instanceof Uint8Array) || e.length < 8)
    throw new K(`PBES2 Salt Input must be 8 or more octets`);
}
var dc = t(() => {
  J();
});
function fc(e, t) {
  if (Y(e)) return e.export();
  if (e instanceof Uint8Array) return e;
  if (bs(e)) return (Ds(e, t, `deriveBits`, `deriveKey`), x.from(e).export());
  throw TypeError(js(e, ...Z, `Uint8Array`));
}
var pc,
  mc,
  hc,
  gc = t(() => {
    (os(),
      V(),
      qo(),
      Xs(),
      dc(),
      xs(),
      Os(),
      fs(),
      Ms(),
      Ls(),
      (pc = it(Ye)),
      (mc = async (e, t, n, r = 2048, i = Qe(new Uint8Array(16))) => {
        uc(i);
        let a = Ro(e, i),
          o = parseInt(e.slice(13, 16), 10) >> 3,
          s = await pc(fc(t, e), a, r, o, `sha${e.slice(8, 11)}`);
        return { encryptedKey: await Js(e.slice(-6), s, n), p2c: r, p2s: H(i) };
      }),
      (hc = async (e, t, n, r, i) => {
        uc(i);
        let a = Ro(e, i),
          o = parseInt(e.slice(13, 16), 10) >> 3,
          s = await pc(fc(t, e), a, r, o, `sha${e.slice(8, 11)}`);
        return Ys(e.slice(-6), s, n);
      }));
  }),
  _c,
  vc = t(() => {
    _c = (e, t) => {
      let n;
      try {
        n =
          e instanceof x
            ? e.asymmetricKeyDetails?.modulusLength
            : Buffer.from(e.n, `base64url`).byteLength << 3;
      } catch {}
      if (typeof n != `number` || n < 2048)
        throw TypeError(`${t} requires key modulusLength to be 2048 bits or larger`);
    };
  });
function yc(e, t, ...n) {
  if (Y(e)) return e;
  if (bs(e)) return (Ds(e, t, ...n), x.from(e));
  throw TypeError(js(e, ...Z));
}
var bc,
  xc,
  Sc,
  Cc,
  wc,
  Tc,
  Ec = t(() => {
    (vc(),
      xs(),
      Os(),
      fs(),
      Ms(),
      Ls(),
      (bc = (e, t) => {
        if (e.asymmetricKeyType !== `rsa`)
          throw TypeError(`Invalid key for this operation, its asymmetricKeyType must be rsa`);
        _c(e, t);
      }),
      (xc = nt(
        () => Re.RSA_PKCS1_PADDING,
        `The RSA1_5 "alg" (JWE Algorithm) is deprecated and will be removed in the next major revision.`,
      )),
      (Sc = (e) => {
        switch (e) {
          case `RSA-OAEP`:
          case `RSA-OAEP-256`:
          case `RSA-OAEP-384`:
          case `RSA-OAEP-512`:
            return Re.RSA_PKCS1_OAEP_PADDING;
          case `RSA1_5`:
            return xc();
          default:
            return;
        }
      }),
      (Cc = (e) => {
        switch (e) {
          case `RSA-OAEP`:
            return `sha1`;
          case `RSA-OAEP-256`:
            return `sha256`;
          case `RSA-OAEP-384`:
            return `sha384`;
          case `RSA-OAEP-512`:
            return `sha512`;
          default:
            return;
        }
      }),
      (wc = (e, t, n) => {
        let r = Sc(e),
          i = Cc(e),
          a = yc(t, e, `wrapKey`, `encrypt`);
        return (bc(a, e), Ze({ key: a, oaepHash: i, padding: r }, n));
      }),
      (Tc = (e, t, n) => {
        let r = Sc(e),
          i = Cc(e),
          a = yc(t, e, `unwrapKey`, `decrypt`);
        return (bc(a, e), Xe({ key: a, oaepHash: i, padding: r }, n));
      }));
  }),
  Dc,
  Oc = t(() => {
    Dc = {};
  });
function kc(e) {
  switch (e) {
    case `A128GCM`:
      return 128;
    case `A192GCM`:
      return 192;
    case `A256GCM`:
    case `A128CBC-HS256`:
      return 256;
    case `A192CBC-HS384`:
      return 384;
    case `A256CBC-HS512`:
      return 512;
    default:
      throw new G(`Unsupported JWE Algorithm: ${e}`);
  }
}
var Ac,
  jc = t(() => {
    (J(), os(), (Ac = (e) => Qe(new Uint8Array(kc(e) >> 3))));
  }),
  Mc,
  Nc,
  Pc,
  Fc,
  Ic,
  Lc,
  Rc = t(() => {
    (xs(),
      fs(),
      Ms(),
      Ls(),
      (Mc = (e, t, n) => {
        let r;
        if (bs(n)) {
          if (!n.extractable) throw TypeError(`CryptoKey is not extractable`);
          r = x.from(n);
        } else if (Y(n)) r = n;
        else throw TypeError(js(n, ...Z));
        if (r.type !== e) throw TypeError(`key is not a ${e} key`);
        return r.export({ format: `pem`, type: t });
      }),
      (Nc = (e) => Mc(`public`, `spki`, e)),
      (Pc = (e) => Mc(`private`, `pkcs8`, e)),
      (Fc = (e) =>
        Ue({
          key: ct.from(e.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, ``), `base64`),
          type: `pkcs8`,
          format: `der`,
        })),
      (Ic = (e) =>
        We({
          key: ct.from(e.replace(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, ``), `base64`),
          type: `spki`,
          format: `der`,
        })),
      (Lc = (e) => We({ key: e, type: `spki`, format: `pem` })));
  }),
  zc,
  Bc = t(() => {
    zc = (e) => (e.d ? Ue({ format: `jwk`, key: e }) : We({ format: `jwk`, key: e }));
  });
async function Vc(e, t, n) {
  if (typeof e != `string` || e.indexOf(`-----BEGIN PUBLIC KEY-----`) !== 0)
    throw TypeError(`"spki" must be SPKI formatted string`);
  return Ic(e, t, n);
}
async function Hc(e, t, n) {
  if (typeof e != `string` || e.indexOf(`-----BEGIN CERTIFICATE-----`) !== 0)
    throw TypeError(`"x509" must be X.509 formatted string`);
  return Lc(e, t, n);
}
async function Uc(e, t, n) {
  if (typeof e != `string` || e.indexOf(`-----BEGIN PRIVATE KEY-----`) !== 0)
    throw TypeError(`"pkcs8" must be PKCS#8 formatted string`);
  return Fc(e, t, n);
}
async function Wc(e, t) {
  if (!Q(e)) throw TypeError(`JWK must be an object`);
  switch (((t ||= e.alg), e.kty)) {
    case `oct`:
      if (typeof e.k != `string` || !e.k)
        throw TypeError(`missing "k" (Key Value) Parameter value`);
      return U(e.k);
    case `RSA`:
      if (`oth` in e && e.oth !== void 0)
        throw new G(`RSA JWK "oth" (Other Primes Info) Parameter value is not supported`);
    case `EC`:
    case `OKP`:
      return zc({ ...e, alg: t });
    default:
      throw new G(`Unsupported "kty" (Key Type) Parameter value`);
  }
}
var Gc = t(() => {
  (qo(), Rc(), Bc(), J(), Gs());
});
function Kc(e, t, n, r) {
  t.startsWith(`HS`) || t === `dir` || t.startsWith(`PBES2`) || /^A\d{3}(?:GCM)?KW$/.test(t)
    ? Yc(t, n, r, e)
    : Xc(t, n, r, e);
}
var qc,
  Jc,
  Yc,
  Xc,
  Zc,
  Qc,
  $c = t(() => {
    (Ms(),
      Ls(),
      tc(),
      (qc = (e) => e?.[Symbol.toStringTag]),
      (Jc = (e, t, n) => {
        if (t.use !== void 0 && t.use !== `sig`)
          throw TypeError(`Invalid key for this operation, when present its use must be sig`);
        if (t.key_ops !== void 0 && t.key_ops.includes?.(n) !== !0)
          throw TypeError(
            `Invalid key for this operation, when present its key_ops must include ${n}`,
          );
        if (t.alg !== void 0 && t.alg !== e)
          throw TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
        return !0;
      }),
      (Yc = (e, t, n, r) => {
        if (!(t instanceof Uint8Array)) {
          if (r && Zs(t)) {
            if (ec(t) && Jc(e, t, n)) return;
            throw TypeError(
              `JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`,
            );
          }
          if (!Is(t)) throw TypeError(As(e, t, ...Z, `Uint8Array`, r ? `JSON Web Key` : null));
          if (t.type !== `secret`)
            throw TypeError(`${qc(t)} instances for symmetric algorithms must be of type "secret"`);
        }
      }),
      (Xc = (e, t, n, r) => {
        if (r && Zs(t))
          switch (n) {
            case `sign`:
              if (Qs(t) && Jc(e, t, n)) return;
              throw TypeError(`JSON Web Key for this operation be a private JWK`);
            case `verify`:
              if ($s(t) && Jc(e, t, n)) return;
              throw TypeError(`JSON Web Key for this operation be a public JWK`);
          }
        if (!Is(t)) throw TypeError(As(e, t, ...Z, r ? `JSON Web Key` : null));
        if (t.type === `secret`)
          throw TypeError(
            `${qc(t)} instances for asymmetric algorithms must not be of type "secret"`,
          );
        if (n === `sign` && t.type === `public`)
          throw TypeError(
            `${qc(t)} instances for asymmetric algorithm signing must be of type "private"`,
          );
        if (n === `decrypt` && t.type === `public`)
          throw TypeError(
            `${qc(t)} instances for asymmetric algorithm decryption must be of type "private"`,
          );
        if (t.algorithm && n === `verify` && t.type === `private`)
          throw TypeError(
            `${qc(t)} instances for asymmetric algorithm verifying must be of type "public"`,
          );
        if (t.algorithm && n === `encrypt` && t.type === `private`)
          throw TypeError(
            `${qc(t)} instances for asymmetric algorithm encryption must be of type "public"`,
          );
      }),
      (Zc = Kc.bind(void 0, !1)),
      (Qc = Kc.bind(void 0, !0)));
  });
function el(e, t, n, r, i) {
  let a = parseInt(e.slice(1, 4), 10);
  Y(n) && (n = n.export());
  let o = n.subarray(a >> 3),
    s = n.subarray(0, a >> 3),
    c = `aes-${a}-cbc`;
  if (!Ps(c)) throw new G(`alg ${e} is not supported by your javascript runtime`);
  let l = ze(c, o, r),
    u = Lo(l.update(t), l.final());
  return { ciphertext: u, tag: _s(i, r, u, parseInt(e.slice(-3), 10), s, a), iv: r };
}
function tl(e, t, n, r, i) {
  let a = `aes-${parseInt(e.slice(1, 4), 10)}-gcm`;
  if (!Ps(a)) throw new G(`alg ${e} is not supported by your javascript runtime`);
  let o = ze(a, n, r, { authTagLength: 16 });
  i.byteLength && o.setAAD(i, { plaintextLength: t.length });
  let s = o.update(t);
  return (o.final(), { ciphertext: s, tag: o.getAuthTag(), iv: r });
}
var nl,
  rl = t(() => {
    (ds(),
      ms(),
      V(),
      vs(),
      xs(),
      Os(),
      fs(),
      Ms(),
      ls(),
      J(),
      Fs(),
      Ls(),
      (nl = (e, t, n, r, i) => {
        let a;
        if (bs(n)) (Ds(n, e, `encrypt`), (a = x.from(n)));
        else if (n instanceof Uint8Array || Y(n)) a = n;
        else throw TypeError(js(n, ...Z, `Uint8Array`));
        switch ((ps(e, a), r ? us(e, r) : (r = cs(e)), e)) {
          case `A128CBC-HS256`:
          case `A192CBC-HS384`:
          case `A256CBC-HS512`:
            return el(e, t, a, r, i);
          case `A128GCM`:
          case `A192GCM`:
          case `A256GCM`:
            return tl(e, t, a, r, i);
          default:
            throw new G(`Unsupported JWE Content Encryption Algorithm`);
        }
      }));
  });
async function il(e, t, n, r) {
  let i = await nl(e.slice(0, 7), n, t, r, new Uint8Array());
  return { encryptedKey: i.ciphertext, iv: H(i.iv), tag: H(i.tag) };
}
async function al(e, t, n, r, i) {
  return Bs(e.slice(0, 7), t, n, r, i, new Uint8Array());
}
var ol = t(() => {
  (rl(), Vs(), qo());
});
async function sl(e, t, n, r, i) {
  switch ((Zc(e, t, `decrypt`), (t = (await Dc.normalizePrivateKey?.(t, e)) || t), e)) {
    case `dir`:
      if (n !== void 0) throw new K(`Encountered unexpected JWE Encrypted Key`);
      return t;
    case `ECDH-ES`:
      if (n !== void 0) throw new K(`Encountered unexpected JWE Encrypted Key`);
    case `ECDH-ES+A128KW`:
    case `ECDH-ES+A192KW`:
    case `ECDH-ES+A256KW`: {
      if (!Q(r.epk)) throw new K(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
      if (!cc(t))
        throw new G(
          `ECDH with the provided key is not allowed or not supported by your javascript runtime`,
        );
      let i = await Wc(r.epk, e),
        a,
        o;
      if (r.apu !== void 0) {
        if (typeof r.apu != `string`)
          throw new K(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
        try {
          a = U(r.apu);
        } catch {
          throw new K(`Failed to base64url decode the apu`);
        }
      }
      if (r.apv !== void 0) {
        if (typeof r.apv != `string`)
          throw new K(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
        try {
          o = U(r.apv);
        } catch {
          throw new K(`Failed to base64url decode the apv`);
        }
      }
      let s = await ac(
        i,
        t,
        e === `ECDH-ES` ? r.enc : e,
        e === `ECDH-ES` ? kc(r.enc) : parseInt(e.slice(-5, -2), 10),
        a,
        o,
      );
      if (e === `ECDH-ES`) return s;
      if (n === void 0) throw new K(`JWE Encrypted Key missing`);
      return Ys(e.slice(-6), s, n);
    }
    case `RSA1_5`:
    case `RSA-OAEP`:
    case `RSA-OAEP-256`:
    case `RSA-OAEP-384`:
    case `RSA-OAEP-512`:
      if (n === void 0) throw new K(`JWE Encrypted Key missing`);
      return Tc(e, t, n);
    case `PBES2-HS256+A128KW`:
    case `PBES2-HS384+A192KW`:
    case `PBES2-HS512+A256KW`: {
      if (n === void 0) throw new K(`JWE Encrypted Key missing`);
      if (typeof r.p2c != `number`)
        throw new K(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
      let a = i?.maxPBES2Count || 1e4;
      if (r.p2c > a) throw new K(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
      if (typeof r.p2s != `string`)
        throw new K(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
      let o;
      try {
        o = U(r.p2s);
      } catch {
        throw new K(`Failed to base64url decode the p2s`);
      }
      return hc(e, t, n, r.p2c, o);
    }
    case `A128KW`:
    case `A192KW`:
    case `A256KW`:
      if (n === void 0) throw new K(`JWE Encrypted Key missing`);
      return Ys(e, t, n);
    case `A128GCMKW`:
    case `A192GCMKW`:
    case `A256GCMKW`: {
      if (n === void 0) throw new K(`JWE Encrypted Key missing`);
      if (typeof r.iv != `string`)
        throw new K(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
      if (typeof r.tag != `string`)
        throw new K(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
      let i;
      try {
        i = U(r.iv);
      } catch {
        throw new K(`Failed to base64url decode the iv`);
      }
      let a;
      try {
        a = U(r.tag);
      } catch {
        throw new K(`Failed to base64url decode the tag`);
      }
      return al(e, t, n, i, a);
    }
    default:
      throw new G(`Invalid or unsupported "alg" (JWE Algorithm) header value`);
  }
}
var cl = t(() => {
  (Xs(), lc(), gc(), Ec(), qo(), Oc(), J(), jc(), Gc(), $c(), Gs(), ol());
});
function ll(e, t, n, r, i) {
  if (i.crit !== void 0 && r?.crit === void 0)
    throw new e(`"crit" (Critical) Header Parameter MUST be integrity protected`);
  if (!r || r.crit === void 0) return new Set();
  if (
    !Array.isArray(r.crit) ||
    r.crit.length === 0 ||
    r.crit.some((e) => typeof e != `string` || e.length === 0)
  )
    throw new e(
      `"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present`,
    );
  let a;
  a = n === void 0 ? t : new Map([...Object.entries(n), ...t.entries()]);
  for (let t of r.crit) {
    if (!a.has(t)) throw new G(`Extension Header Parameter "${t}" is not recognized`);
    if (i[t] === void 0) throw new e(`Extension Header Parameter "${t}" is missing`);
    if (a.get(t) && r[t] === void 0)
      throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
  }
  return new Set(r.crit);
}
var ul = t(() => {
    J();
  }),
  dl,
  fl = t(() => {
    dl = (e, t) => {
      if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != `string`)))
        throw TypeError(`"${e}" option must be an array of strings`);
      if (t) return new Set(t);
    };
  });
async function pl(e, t, n) {
  if (!Q(e)) throw new K(`Flattened JWE must be an object`);
  if (e.protected === void 0 && e.header === void 0 && e.unprotected === void 0)
    throw new K(`JOSE Header missing`);
  if (e.iv !== void 0 && typeof e.iv != `string`)
    throw new K(`JWE Initialization Vector incorrect type`);
  if (typeof e.ciphertext != `string`) throw new K(`JWE Ciphertext missing or incorrect type`);
  if (e.tag !== void 0 && typeof e.tag != `string`)
    throw new K(`JWE Authentication Tag incorrect type`);
  if (e.protected !== void 0 && typeof e.protected != `string`)
    throw new K(`JWE Protected Header incorrect type`);
  if (e.encrypted_key !== void 0 && typeof e.encrypted_key != `string`)
    throw new K(`JWE Encrypted Key incorrect type`);
  if (e.aad !== void 0 && typeof e.aad != `string`) throw new K(`JWE AAD incorrect type`);
  if (e.header !== void 0 && !Q(e.header))
    throw new K(`JWE Shared Unprotected Header incorrect type`);
  if (e.unprotected !== void 0 && !Q(e.unprotected))
    throw new K(`JWE Per-Recipient Unprotected Header incorrect type`);
  let r;
  if (e.protected)
    try {
      let t = U(e.protected);
      r = JSON.parse(Wo.decode(t));
    } catch {
      throw new K(`JWE Protected Header is invalid`);
    }
  if (!Hs(r, e.header, e.unprotected))
    throw new K(
      `JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint`,
    );
  let i = { ...r, ...e.header, ...e.unprotected };
  if ((ll(K, new Map(), n?.crit, r, i), i.zip !== void 0))
    throw new G(`JWE "zip" (Compression Algorithm) Header Parameter is not supported.`);
  let { alg: a, enc: o } = i;
  if (typeof a != `string` || !a) throw new K(`missing JWE Algorithm (alg) in JWE Header`);
  if (typeof o != `string` || !o)
    throw new K(`missing JWE Encryption Algorithm (enc) in JWE Header`);
  let s = n && dl(`keyManagementAlgorithms`, n.keyManagementAlgorithms),
    c = n && dl(`contentEncryptionAlgorithms`, n.contentEncryptionAlgorithms);
  if ((s && !s.has(a)) || (!s && a.startsWith(`PBES2`)))
    throw new Zo(`"alg" (Algorithm) Header Parameter value not allowed`);
  if (c && !c.has(o))
    throw new Zo(`"enc" (Encryption Algorithm) Header Parameter value not allowed`);
  let l;
  if (e.encrypted_key !== void 0)
    try {
      l = U(e.encrypted_key);
    } catch {
      throw new K(`Failed to base64url decode the encrypted_key`);
    }
  let u = !1;
  typeof t == `function` && ((t = await t(r, e)), (u = !0));
  let d;
  try {
    d = await sl(a, t, l, i, n);
  } catch (e) {
    if (e instanceof TypeError || e instanceof K || e instanceof G) throw e;
    d = Ac(o);
  }
  let f, p;
  if (e.iv !== void 0)
    try {
      f = U(e.iv);
    } catch {
      throw new K(`Failed to base64url decode the iv`);
    }
  if (e.tag !== void 0)
    try {
      p = U(e.tag);
    } catch {
      throw new K(`Failed to base64url decode the tag`);
    }
  let m = B.encode(e.protected ?? ``),
    h;
  h = e.aad === void 0 ? m : Lo(m, B.encode(`.`), B.encode(e.aad));
  let g;
  try {
    g = U(e.ciphertext);
  } catch {
    throw new K(`Failed to base64url decode the ciphertext`);
  }
  let _ = { plaintext: await Bs(o, d, g, f, p, h) };
  if ((e.protected !== void 0 && (_.protectedHeader = r), e.aad !== void 0))
    try {
      _.additionalAuthenticatedData = U(e.aad);
    } catch {
      throw new K(`Failed to base64url decode the aad`);
    }
  return (
    e.unprotected !== void 0 && (_.sharedUnprotectedHeader = e.unprotected),
    e.header !== void 0 && (_.unprotectedHeader = e.header),
    u ? { ..._, key: t } : _
  );
}
var ml = t(() => {
  (qo(), Vs(), J(), Us(), Gs(), cl(), V(), jc(), ul(), fl());
});
async function hl(e, t, n) {
  if ((e instanceof Uint8Array && (e = Wo.decode(e)), typeof e != `string`))
    throw new K(`Compact JWE must be a string or Uint8Array`);
  let { 0: r, 1: i, 2: a, 3: o, 4: s, length: c } = e.split(`.`);
  if (c !== 5) throw new K(`Invalid Compact JWE`);
  let l = await pl(
      {
        ciphertext: o,
        iv: a || void 0,
        protected: r,
        tag: s || void 0,
        encrypted_key: i || void 0,
      },
      t,
      n,
    ),
    u = { plaintext: l.plaintext, protectedHeader: l.protectedHeader };
  return typeof t == `function` ? { ...u, key: l.key } : u;
}
var gl = t(() => {
  (ml(), J(), V());
});
async function _l(e, t, n) {
  if (!Q(e)) throw new K(`General JWE must be an object`);
  if (!Array.isArray(e.recipients) || !e.recipients.every(Q))
    throw new K(`JWE Recipients missing or incorrect type`);
  if (!e.recipients.length) throw new K(`JWE Recipients has no members`);
  for (let r of e.recipients)
    try {
      return await pl(
        {
          aad: e.aad,
          ciphertext: e.ciphertext,
          encrypted_key: r.encrypted_key,
          header: r.header,
          iv: e.iv,
          protected: e.protected,
          tag: e.tag,
          unprotected: e.unprotected,
        },
        t,
        n,
      );
    } catch {}
  throw new Qo();
}
var vl = t(() => {
    (ml(), J(), Gs());
  }),
  yl,
  bl = t(() => {
    yl = Symbol();
  }),
  xl,
  Sl = t(() => {
    (qo(),
      J(),
      xs(),
      fs(),
      Ms(),
      Ls(),
      (xl = (e) => {
        let t;
        if (bs(e)) {
          if (!e.extractable) throw TypeError(`CryptoKey is not extractable`);
          t = x.from(e);
        } else if (Y(e)) t = e;
        else if (e instanceof Uint8Array) return { kty: `oct`, k: H(e) };
        else throw TypeError(js(e, ...Z, `Uint8Array`));
        if (
          t.type !== `secret` &&
          ![`rsa`, `ec`, `ed25519`, `x25519`, `ed448`, `x448`].includes(t.asymmetricKeyType)
        )
          throw new G(`Unsupported key asymmetricKeyType`);
        return t.export({ format: `jwk` });
      }));
  });
async function Cl(e) {
  return Nc(e);
}
async function wl(e) {
  return Pc(e);
}
async function Tl(e) {
  return xl(e);
}
var El = t(() => {
  (Rc(), Sl());
});
async function Dl(e, t, n, r, i = {}) {
  let a, o, s;
  switch ((Zc(e, n, `encrypt`), (n = (await Dc.normalizePublicKey?.(n, e)) || n), e)) {
    case `dir`:
      s = n;
      break;
    case `ECDH-ES`:
    case `ECDH-ES+A128KW`:
    case `ECDH-ES+A192KW`:
    case `ECDH-ES+A256KW`: {
      if (!cc(n))
        throw new G(
          `ECDH with the provided key is not allowed or not supported by your javascript runtime`,
        );
      let { apu: c, apv: l } = i,
        { epk: u } = i;
      u ||= (await oc(n)).privateKey;
      let { x: d, y: f, crv: p, kty: m } = await Tl(u),
        h = await ac(
          n,
          u,
          e === `ECDH-ES` ? t : e,
          e === `ECDH-ES` ? kc(t) : parseInt(e.slice(-5, -2), 10),
          c,
          l,
        );
      if (
        ((o = { epk: { x: d, crv: p, kty: m } }),
        m === `EC` && (o.epk.y = f),
        c && (o.apu = H(c)),
        l && (o.apv = H(l)),
        e === `ECDH-ES`)
      ) {
        s = h;
        break;
      }
      ((s = r || Ac(t)), (a = await Js(e.slice(-6), h, s)));
      break;
    }
    case `RSA1_5`:
    case `RSA-OAEP`:
    case `RSA-OAEP-256`:
    case `RSA-OAEP-384`:
    case `RSA-OAEP-512`:
      ((s = r || Ac(t)), (a = await wc(e, n, s)));
      break;
    case `PBES2-HS256+A128KW`:
    case `PBES2-HS384+A192KW`:
    case `PBES2-HS512+A256KW`: {
      s = r || Ac(t);
      let { p2c: c, p2s: l } = i;
      ({ encryptedKey: a, ...o } = await mc(e, n, s, c, l));
      break;
    }
    case `A128KW`:
    case `A192KW`:
    case `A256KW`:
      ((s = r || Ac(t)), (a = await Js(e, n, s)));
      break;
    case `A128GCMKW`:
    case `A192GCMKW`:
    case `A256GCMKW`: {
      s = r || Ac(t);
      let { iv: c } = i;
      ({ encryptedKey: a, ...o } = await il(e, n, s, c));
      break;
    }
    default:
      throw new G(`Invalid or unsupported "alg" (JWE Algorithm) header value`);
  }
  return { cek: s, encryptedKey: a, parameters: o };
}
var Ol = t(() => {
    (Xs(), lc(), gc(), Ec(), qo(), Oc(), jc(), J(), El(), $c(), ol());
  }),
  kl,
  Al = t(() => {
    (qo(),
      bl(),
      rl(),
      Ol(),
      J(),
      Us(),
      V(),
      ul(),
      (kl = class {
        _plaintext;
        _protectedHeader;
        _sharedUnprotectedHeader;
        _unprotectedHeader;
        _aad;
        _cek;
        _iv;
        _keyManagementParameters;
        constructor(e) {
          if (!(e instanceof Uint8Array))
            throw TypeError(`plaintext must be an instance of Uint8Array`);
          this._plaintext = e;
        }
        setKeyManagementParameters(e) {
          if (this._keyManagementParameters)
            throw TypeError(`setKeyManagementParameters can only be called once`);
          return ((this._keyManagementParameters = e), this);
        }
        setProtectedHeader(e) {
          if (this._protectedHeader) throw TypeError(`setProtectedHeader can only be called once`);
          return ((this._protectedHeader = e), this);
        }
        setSharedUnprotectedHeader(e) {
          if (this._sharedUnprotectedHeader)
            throw TypeError(`setSharedUnprotectedHeader can only be called once`);
          return ((this._sharedUnprotectedHeader = e), this);
        }
        setUnprotectedHeader(e) {
          if (this._unprotectedHeader)
            throw TypeError(`setUnprotectedHeader can only be called once`);
          return ((this._unprotectedHeader = e), this);
        }
        setAdditionalAuthenticatedData(e) {
          return ((this._aad = e), this);
        }
        setContentEncryptionKey(e) {
          if (this._cek) throw TypeError(`setContentEncryptionKey can only be called once`);
          return ((this._cek = e), this);
        }
        setInitializationVector(e) {
          if (this._iv) throw TypeError(`setInitializationVector can only be called once`);
          return ((this._iv = e), this);
        }
        async encrypt(e, t) {
          if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader)
            throw new K(
              `either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()`,
            );
          if (!Hs(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader))
            throw new K(
              `JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint`,
            );
          let n = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader,
          };
          if ((ll(K, new Map(), t?.crit, this._protectedHeader, n), n.zip !== void 0))
            throw new G(`JWE "zip" (Compression Algorithm) Header Parameter is not supported.`);
          let { alg: r, enc: i } = n;
          if (typeof r != `string` || !r)
            throw new K(`JWE "alg" (Algorithm) Header Parameter missing or invalid`);
          if (typeof i != `string` || !i)
            throw new K(`JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid`);
          let a;
          if (this._cek && (r === `dir` || r === `ECDH-ES`))
            throw TypeError(
              `setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${r}`,
            );
          let o;
          {
            let n;
            (({
              cek: o,
              encryptedKey: a,
              parameters: n,
            } = await Dl(r, i, e, this._cek, this._keyManagementParameters)),
              n &&
                (t && yl in t
                  ? this._unprotectedHeader
                    ? (this._unprotectedHeader = { ...this._unprotectedHeader, ...n })
                    : this.setUnprotectedHeader(n)
                  : this._protectedHeader
                    ? (this._protectedHeader = { ...this._protectedHeader, ...n })
                    : this.setProtectedHeader(n)));
          }
          let s, c, l;
          ((c = this._protectedHeader
            ? B.encode(H(JSON.stringify(this._protectedHeader)))
            : B.encode(``)),
            this._aad ? ((l = H(this._aad)), (s = Lo(c, B.encode(`.`), B.encode(l)))) : (s = c));
          let { ciphertext: u, tag: d, iv: f } = await nl(i, this._plaintext, o, this._iv, s),
            p = { ciphertext: H(u) };
          return (
            f && (p.iv = H(f)),
            d && (p.tag = H(d)),
            a && (p.encrypted_key = H(a)),
            l && (p.aad = l),
            this._protectedHeader && (p.protected = Wo.decode(c)),
            this._sharedUnprotectedHeader && (p.unprotected = this._sharedUnprotectedHeader),
            this._unprotectedHeader && (p.header = this._unprotectedHeader),
            p
          );
        }
      }));
  }),
  jl,
  Ml,
  Nl = t(() => {
    (Al(),
      bl(),
      J(),
      jc(),
      Us(),
      Ol(),
      qo(),
      ul(),
      (jl = class {
        parent;
        unprotectedHeader;
        key;
        options;
        constructor(e, t, n) {
          ((this.parent = e), (this.key = t), (this.options = n));
        }
        setUnprotectedHeader(e) {
          if (this.unprotectedHeader)
            throw TypeError(`setUnprotectedHeader can only be called once`);
          return ((this.unprotectedHeader = e), this);
        }
        addRecipient(...e) {
          return this.parent.addRecipient(...e);
        }
        encrypt(...e) {
          return this.parent.encrypt(...e);
        }
        done() {
          return this.parent;
        }
      }),
      (Ml = class {
        _plaintext;
        _recipients = [];
        _protectedHeader;
        _unprotectedHeader;
        _aad;
        constructor(e) {
          this._plaintext = e;
        }
        addRecipient(e, t) {
          let n = new jl(this, e, { crit: t?.crit });
          return (this._recipients.push(n), n);
        }
        setProtectedHeader(e) {
          if (this._protectedHeader) throw TypeError(`setProtectedHeader can only be called once`);
          return ((this._protectedHeader = e), this);
        }
        setSharedUnprotectedHeader(e) {
          if (this._unprotectedHeader)
            throw TypeError(`setSharedUnprotectedHeader can only be called once`);
          return ((this._unprotectedHeader = e), this);
        }
        setAdditionalAuthenticatedData(e) {
          return ((this._aad = e), this);
        }
        async encrypt() {
          if (!this._recipients.length) throw new K(`at least one recipient must be added`);
          if (this._recipients.length === 1) {
            let [e] = this._recipients,
              t = await new kl(this._plaintext)
                .setAdditionalAuthenticatedData(this._aad)
                .setProtectedHeader(this._protectedHeader)
                .setSharedUnprotectedHeader(this._unprotectedHeader)
                .setUnprotectedHeader(e.unprotectedHeader)
                .encrypt(e.key, { ...e.options }),
              n = { ciphertext: t.ciphertext, iv: t.iv, recipients: [{}], tag: t.tag };
            return (
              t.aad && (n.aad = t.aad),
              t.protected && (n.protected = t.protected),
              t.unprotected && (n.unprotected = t.unprotected),
              t.encrypted_key && (n.recipients[0].encrypted_key = t.encrypted_key),
              t.header && (n.recipients[0].header = t.header),
              n
            );
          }
          let e;
          for (let t = 0; t < this._recipients.length; t++) {
            let n = this._recipients[t];
            if (!Hs(this._protectedHeader, this._unprotectedHeader, n.unprotectedHeader))
              throw new K(
                `JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint`,
              );
            let r = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...n.unprotectedHeader,
              },
              { alg: i } = r;
            if (typeof i != `string` || !i)
              throw new K(`JWE "alg" (Algorithm) Header Parameter missing or invalid`);
            if (i === `dir` || i === `ECDH-ES`)
              throw new K(`"dir" and "ECDH-ES" alg may only be used with a single recipient`);
            if (typeof r.enc != `string` || !r.enc)
              throw new K(`JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid`);
            if (!e) e = r.enc;
            else if (e !== r.enc)
              throw new K(
                `JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients`,
              );
            if ((ll(K, new Map(), n.options.crit, this._protectedHeader, r), r.zip !== void 0))
              throw new G(`JWE "zip" (Compression Algorithm) Header Parameter is not supported.`);
          }
          let t = Ac(e),
            n = { ciphertext: ``, iv: ``, recipients: [], tag: `` };
          for (let r = 0; r < this._recipients.length; r++) {
            let i = this._recipients[r],
              a = {};
            n.recipients.push(a);
            let o = {
              ...this._protectedHeader,
              ...this._unprotectedHeader,
              ...i.unprotectedHeader,
            }.alg.startsWith(`PBES2`)
              ? 2048 + r
              : void 0;
            if (r === 0) {
              let e = await new kl(this._plaintext)
                .setAdditionalAuthenticatedData(this._aad)
                .setContentEncryptionKey(t)
                .setProtectedHeader(this._protectedHeader)
                .setSharedUnprotectedHeader(this._unprotectedHeader)
                .setUnprotectedHeader(i.unprotectedHeader)
                .setKeyManagementParameters({ p2c: o })
                .encrypt(i.key, { ...i.options, [yl]: !0 });
              ((n.ciphertext = e.ciphertext),
                (n.iv = e.iv),
                (n.tag = e.tag),
                e.aad && (n.aad = e.aad),
                e.protected && (n.protected = e.protected),
                e.unprotected && (n.unprotected = e.unprotected),
                (a.encrypted_key = e.encrypted_key),
                e.header && (a.header = e.header));
              continue;
            }
            let { encryptedKey: s, parameters: c } = await Dl(
              i.unprotectedHeader?.alg ||
                this._protectedHeader?.alg ||
                this._unprotectedHeader?.alg,
              e,
              i.key,
              t,
              { p2c: o },
            );
            ((a.encrypted_key = H(s)),
              (i.unprotectedHeader || c) && (a.header = { ...i.unprotectedHeader, ...c }));
          }
          return n;
        }
      }));
  });
function Pl(e) {
  switch (e) {
    case `PS256`:
    case `RS256`:
    case `ES256`:
    case `ES256K`:
      return `sha256`;
    case `PS384`:
    case `RS384`:
    case `ES384`:
      return `sha384`;
    case `PS512`:
    case `RS512`:
    case `ES512`:
      return `sha512`;
    case `Ed25519`:
    case `EdDSA`:
      return;
    default:
      throw new G(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
var Fl = t(() => {
  J();
});
function Il(e, t) {
  let n, r, i;
  if (t instanceof x) ((n = t.asymmetricKeyType), (r = t.asymmetricKeyDetails));
  else
    switch (((i = !0), t.kty)) {
      case `RSA`:
        n = `rsa`;
        break;
      case `EC`:
        n = `ec`;
        break;
      case `OKP`:
        if (t.crv === `Ed25519`) {
          n = `ed25519`;
          break;
        }
        if (t.crv === `Ed448`) {
          n = `ed448`;
          break;
        }
        throw TypeError(`Invalid key for this operation, its crv must be Ed25519 or Ed448`);
      default:
        throw TypeError(`Invalid key for this operation, its kty must be RSA, OKP, or EC`);
    }
  let a;
  switch (e) {
    case `Ed25519`:
      if (n !== `ed25519`)
        throw TypeError(`Invalid key for this operation, its asymmetricKeyType must be ed25519`);
      break;
    case `EdDSA`:
      if (![`ed25519`, `ed448`].includes(n))
        throw TypeError(
          `Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448`,
        );
      break;
    case `RS256`:
    case `RS384`:
    case `RS512`:
      if (n !== `rsa`)
        throw TypeError(`Invalid key for this operation, its asymmetricKeyType must be rsa`);
      _c(t, e);
      break;
    case `PS256`:
    case `PS384`:
    case `PS512`:
      if (n === `rsa-pss`) {
        let { hashAlgorithm: t, mgf1HashAlgorithm: n, saltLength: i } = r,
          a = parseInt(e.slice(-3), 10);
        if (t !== void 0 && (t !== `sha${a}` || n !== t))
          throw TypeError(
            `Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${e}`,
          );
        if (i !== void 0 && i > a >> 3)
          throw TypeError(
            `Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${e}`,
          );
      } else if (n !== `rsa`)
        throw TypeError(
          `Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss`,
        );
      (_c(t, e),
        (a = { padding: Re.RSA_PKCS1_PSS_PADDING, saltLength: Re.RSA_PSS_SALTLEN_DIGEST }));
      break;
    case `ES256`:
    case `ES256K`:
    case `ES384`:
    case `ES512`: {
      if (n !== `ec`)
        throw TypeError(`Invalid key for this operation, its asymmetricKeyType must be ec`);
      let r = rc(t),
        i = Ll.get(e);
      if (r !== i)
        throw TypeError(`Invalid key curve for the algorithm, its curve must be ${i}, got ${r}`);
      a = { dsaEncoding: `ieee-p1363` };
      break;
    }
    default:
      throw new G(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
  return i ? { format: `jwk`, key: t, ...a } : a ? { ...a, key: t } : t;
}
var Ll,
  Rl = t(() => {
    (ic(),
      J(),
      vc(),
      (Ll = new Map([
        [`ES256`, `P-256`],
        [`ES256K`, `secp256k1`],
        [`ES384`, `P-384`],
        [`ES512`, `P-521`],
      ])));
  });
function zl(e) {
  switch (e) {
    case `HS256`:
      return `sha256`;
    case `HS384`:
      return `sha384`;
    case `HS512`:
      return `sha512`;
    default:
      throw new G(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
var Bl = t(() => {
  J();
});
function Vl(e, t, n) {
  if (t instanceof Uint8Array) {
    if (!e.startsWith(`HS`)) throw TypeError(js(t, ...Z));
    return Ge(t);
  }
  if (t instanceof x) return t;
  if (bs(t)) return (Es(t, e, n), x.from(t));
  if (Zs(t)) return e.startsWith(`HS`) ? Ge(Buffer.from(t.k, `base64url`)) : t;
  throw TypeError(js(t, ...Z, `Uint8Array`, `JSON Web Key`));
}
var Hl = t(() => {
    (xs(), Os(), Ms(), Ls(), tc());
  }),
  Ul,
  Wl,
  Gl = t(() => {
    (Fl(),
      Bl(),
      Rl(),
      Hl(),
      (Ul = it(Le.sign)),
      (Wl = async (e, t, n) => {
        let r = Vl(e, t, `sign`);
        if (e.startsWith(`HS`)) {
          let t = Le.createHmac(zl(e), r);
          return (t.update(n), t.digest());
        }
        return Ul(Pl(e), n, Il(e, r));
      }));
  }),
  Kl,
  ql,
  Jl = t(() => {
    (Fl(),
      Rl(),
      Gl(),
      Hl(),
      (Kl = it(Le.verify)),
      (ql = async (e, t, n, r) => {
        let i = Vl(e, t, `verify`);
        if (e.startsWith(`HS`)) {
          let t = await Wl(e, i, r),
            a = n;
          try {
            return Le.timingSafeEqual(a, t);
          } catch {
            return !1;
          }
        }
        let a = Pl(e),
          o = Il(e, i);
        try {
          return await Kl(a, r, o, n);
        } catch {
          return !1;
        }
      }));
  });
async function Yl(e, t, n) {
  if (!Q(e)) throw new q(`Flattened JWS must be an object`);
  if (e.protected === void 0 && e.header === void 0)
    throw new q(`Flattened JWS must have either of the "protected" or "header" members`);
  if (e.protected !== void 0 && typeof e.protected != `string`)
    throw new q(`JWS Protected Header incorrect type`);
  if (e.payload === void 0) throw new q(`JWS Payload missing`);
  if (typeof e.signature != `string`) throw new q(`JWS Signature missing or incorrect type`);
  if (e.header !== void 0 && !Q(e.header)) throw new q(`JWS Unprotected Header incorrect type`);
  let r = {};
  if (e.protected)
    try {
      let t = U(e.protected);
      r = JSON.parse(Wo.decode(t));
    } catch {
      throw new q(`JWS Protected Header is invalid`);
    }
  if (!Hs(r, e.header))
    throw new q(`JWS Protected and JWS Unprotected Header Parameter names must be disjoint`);
  let i = { ...r, ...e.header },
    a = ll(q, new Map([[`b64`, !0]]), n?.crit, r, i),
    o = !0;
  if (a.has(`b64`) && ((o = r.b64), typeof o != `boolean`))
    throw new q(`The "b64" (base64url-encode payload) Header Parameter must be a boolean`);
  let { alg: s } = i;
  if (typeof s != `string` || !s)
    throw new q(`JWS "alg" (Algorithm) Header Parameter missing or invalid`);
  let c = n && dl(`algorithms`, n.algorithms);
  if (c && !c.has(s)) throw new Zo(`"alg" (Algorithm) Header Parameter value not allowed`);
  if (o) {
    if (typeof e.payload != `string`) throw new q(`JWS Payload must be a string`);
  } else if (typeof e.payload != `string` && !(e.payload instanceof Uint8Array))
    throw new q(`JWS Payload must be a string or an Uint8Array instance`);
  let l = !1;
  typeof t == `function`
    ? ((t = await t(r, e)), (l = !0), Qc(s, t, `verify`), Zs(t) && (t = await Wc(t, s)))
    : Qc(s, t, `verify`);
  let u = Lo(
      B.encode(e.protected ?? ``),
      B.encode(`.`),
      typeof e.payload == `string` ? B.encode(e.payload) : e.payload,
    ),
    d;
  try {
    d = U(e.signature);
  } catch {
    throw new q(`Failed to base64url decode the signature`);
  }
  if (!(await ql(s, t, d, u))) throw new as();
  let f;
  if (o)
    try {
      f = U(e.payload);
    } catch {
      throw new q(`Failed to base64url decode the payload`);
    }
  else f = typeof e.payload == `string` ? B.encode(e.payload) : e.payload;
  let p = { payload: f };
  return (
    e.protected !== void 0 && (p.protectedHeader = r),
    e.header !== void 0 && (p.unprotectedHeader = e.header),
    l ? { ...p, key: t } : p
  );
}
var Xl = t(() => {
  (qo(), Jl(), J(), V(), Us(), Gs(), $c(), ul(), fl(), tc(), Gc());
});
async function Zl(e, t, n) {
  if ((e instanceof Uint8Array && (e = Wo.decode(e)), typeof e != `string`))
    throw new q(`Compact JWS must be a string or Uint8Array`);
  let { 0: r, 1: i, 2: a, length: o } = e.split(`.`);
  if (o !== 3) throw new q(`Invalid Compact JWS`);
  let s = await Yl({ payload: i, protected: r, signature: a }, t, n),
    c = { payload: s.payload, protectedHeader: s.protectedHeader };
  return typeof t == `function` ? { ...c, key: s.key } : c;
}
var Ql = t(() => {
  (Xl(), J(), V());
});
async function $l(e, t, n) {
  if (!Q(e)) throw new q(`General JWS must be an object`);
  if (!Array.isArray(e.signatures) || !e.signatures.every(Q))
    throw new q(`JWS Signatures missing or incorrect type`);
  for (let r of e.signatures)
    try {
      return await Yl(
        { header: r.header, payload: e.payload, protected: r.protected, signature: r.signature },
        t,
        n,
      );
    } catch {}
  throw new as();
}
var eu = t(() => {
    (Xl(), J(), Gs());
  }),
  tu,
  nu = t(() => {
    tu = (e) => Math.floor(e.getTime() / 1e3);
  }),
  ru,
  iu,
  au,
  ou,
  su,
  cu,
  lu,
  uu = t(() => {
    ((ru = 60),
      (iu = ru * 60),
      (au = iu * 24),
      (ou = au * 7),
      (su = au * 365.25),
      (cu =
        /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i),
      (lu = (e) => {
        let t = cu.exec(e);
        if (!t || (t[4] && t[1])) throw TypeError(`Invalid time period format`);
        let n = parseFloat(t[2]),
          r = t[3].toLowerCase(),
          i;
        switch (r) {
          case `sec`:
          case `secs`:
          case `second`:
          case `seconds`:
          case `s`:
            i = Math.round(n);
            break;
          case `minute`:
          case `minutes`:
          case `min`:
          case `mins`:
          case `m`:
            i = Math.round(n * ru);
            break;
          case `hour`:
          case `hours`:
          case `hr`:
          case `hrs`:
          case `h`:
            i = Math.round(n * iu);
            break;
          case `day`:
          case `days`:
          case `d`:
            i = Math.round(n * au);
            break;
          case `week`:
          case `weeks`:
          case `w`:
            i = Math.round(n * ou);
            break;
          default:
            i = Math.round(n * su);
            break;
        }
        return t[1] === `-` || t[4] === `ago` ? -i : i;
      }));
  }),
  du,
  fu,
  pu,
  mu = t(() => {
    (J(),
      V(),
      nu(),
      uu(),
      Gs(),
      (du = (e) => e.toLowerCase().replace(/^application\//, ``)),
      (fu = (e, t) =>
        typeof e == `string`
          ? t.includes(e)
          : Array.isArray(e)
            ? t.some(Set.prototype.has.bind(new Set(e)))
            : !1),
      (pu = (e, t, n = {}) => {
        let r;
        try {
          r = JSON.parse(Wo.decode(t));
        } catch {}
        if (!Q(r)) throw new $o(`JWT Claims Set must be a top-level JSON object`);
        let { typ: i } = n;
        if (i && (typeof e.typ != `string` || du(e.typ) !== du(i)))
          throw new Yo(`unexpected "typ" JWT header value`, r, `typ`, `check_failed`);
        let { requiredClaims: a = [], issuer: o, subject: s, audience: c, maxTokenAge: l } = n,
          u = [...a];
        (l !== void 0 && u.push(`iat`),
          c !== void 0 && u.push(`aud`),
          s !== void 0 && u.push(`sub`),
          o !== void 0 && u.push(`iss`));
        for (let e of new Set(u.reverse()))
          if (!(e in r)) throw new Yo(`missing required "${e}" claim`, r, e, `missing`);
        if (o && !(Array.isArray(o) ? o : [o]).includes(r.iss))
          throw new Yo(`unexpected "iss" claim value`, r, `iss`, `check_failed`);
        if (s && r.sub !== s)
          throw new Yo(`unexpected "sub" claim value`, r, `sub`, `check_failed`);
        if (c && !fu(r.aud, typeof c == `string` ? [c] : c))
          throw new Yo(`unexpected "aud" claim value`, r, `aud`, `check_failed`);
        let d;
        switch (typeof n.clockTolerance) {
          case `string`:
            d = lu(n.clockTolerance);
            break;
          case `number`:
            d = n.clockTolerance;
            break;
          case `undefined`:
            d = 0;
            break;
          default:
            throw TypeError(`Invalid clockTolerance option type`);
        }
        let { currentDate: f } = n,
          p = tu(f || new Date());
        if ((r.iat !== void 0 || l) && typeof r.iat != `number`)
          throw new Yo(`"iat" claim must be a number`, r, `iat`, `invalid`);
        if (r.nbf !== void 0) {
          if (typeof r.nbf != `number`)
            throw new Yo(`"nbf" claim must be a number`, r, `nbf`, `invalid`);
          if (r.nbf > p + d)
            throw new Yo(`"nbf" claim timestamp check failed`, r, `nbf`, `check_failed`);
        }
        if (r.exp !== void 0) {
          if (typeof r.exp != `number`)
            throw new Yo(`"exp" claim must be a number`, r, `exp`, `invalid`);
          if (r.exp <= p - d)
            throw new Xo(`"exp" claim timestamp check failed`, r, `exp`, `check_failed`);
        }
        if (l) {
          let e = p - r.iat,
            t = typeof l == `number` ? l : lu(l);
          if (e - d > t)
            throw new Xo(
              `"iat" claim timestamp check failed (too far in the past)`,
              r,
              `iat`,
              `check_failed`,
            );
          if (e < 0 - d)
            throw new Yo(
              `"iat" claim timestamp check failed (it should be in the past)`,
              r,
              `iat`,
              `check_failed`,
            );
        }
        return r;
      }));
  });
async function hu(e, t, n) {
  let r = await Zl(e, t, n);
  if (r.protectedHeader.crit?.includes(`b64`) && r.protectedHeader.b64 === !1)
    throw new $o(`JWTs MUST NOT use unencoded payload`);
  let i = { payload: pu(r.protectedHeader, r.payload, n), protectedHeader: r.protectedHeader };
  return typeof t == `function` ? { ...i, key: r.key } : i;
}
var gu = t(() => {
  (Ql(), mu(), J());
});
async function _u(e, t, n) {
  let r = await hl(e, t, n),
    i = pu(r.protectedHeader, r.plaintext, n),
    { protectedHeader: a } = r;
  if (a.iss !== void 0 && a.iss !== i.iss)
    throw new Yo(`replicated "iss" claim header parameter mismatch`, i, `iss`, `mismatch`);
  if (a.sub !== void 0 && a.sub !== i.sub)
    throw new Yo(`replicated "sub" claim header parameter mismatch`, i, `sub`, `mismatch`);
  if (a.aud !== void 0 && JSON.stringify(a.aud) !== JSON.stringify(i.aud))
    throw new Yo(`replicated "aud" claim header parameter mismatch`, i, `aud`, `mismatch`);
  let o = { payload: i, protectedHeader: a };
  return typeof t == `function` ? { ...o, key: r.key } : o;
}
var vu = t(() => {
    (gl(), mu(), J());
  }),
  yu,
  bu = t(() => {
    (Al(),
      (yu = class {
        _flattened;
        constructor(e) {
          this._flattened = new kl(e);
        }
        setContentEncryptionKey(e) {
          return (this._flattened.setContentEncryptionKey(e), this);
        }
        setInitializationVector(e) {
          return (this._flattened.setInitializationVector(e), this);
        }
        setProtectedHeader(e) {
          return (this._flattened.setProtectedHeader(e), this);
        }
        setKeyManagementParameters(e) {
          return (this._flattened.setKeyManagementParameters(e), this);
        }
        async encrypt(e, t) {
          let n = await this._flattened.encrypt(e, t);
          return [n.protected, n.encrypted_key, n.iv, n.ciphertext, n.tag].join(`.`);
        }
      }));
  }),
  xu,
  Su = t(() => {
    (qo(),
      Gl(),
      Us(),
      J(),
      V(),
      $c(),
      ul(),
      (xu = class {
        _payload;
        _protectedHeader;
        _unprotectedHeader;
        constructor(e) {
          if (!(e instanceof Uint8Array))
            throw TypeError(`payload must be an instance of Uint8Array`);
          this._payload = e;
        }
        setProtectedHeader(e) {
          if (this._protectedHeader) throw TypeError(`setProtectedHeader can only be called once`);
          return ((this._protectedHeader = e), this);
        }
        setUnprotectedHeader(e) {
          if (this._unprotectedHeader)
            throw TypeError(`setUnprotectedHeader can only be called once`);
          return ((this._unprotectedHeader = e), this);
        }
        async sign(e, t) {
          if (!this._protectedHeader && !this._unprotectedHeader)
            throw new q(
              `either setProtectedHeader or setUnprotectedHeader must be called before #sign()`,
            );
          if (!Hs(this._protectedHeader, this._unprotectedHeader))
            throw new q(
              `JWS Protected and JWS Unprotected Header Parameter names must be disjoint`,
            );
          let n = { ...this._protectedHeader, ...this._unprotectedHeader },
            r = ll(q, new Map([[`b64`, !0]]), t?.crit, this._protectedHeader, n),
            i = !0;
          if (r.has(`b64`) && ((i = this._protectedHeader.b64), typeof i != `boolean`))
            throw new q(`The "b64" (base64url-encode payload) Header Parameter must be a boolean`);
          let { alg: a } = n;
          if (typeof a != `string` || !a)
            throw new q(`JWS "alg" (Algorithm) Header Parameter missing or invalid`);
          Qc(a, e, `sign`);
          let o = this._payload;
          i && (o = B.encode(H(o)));
          let s;
          s = this._protectedHeader
            ? B.encode(H(JSON.stringify(this._protectedHeader)))
            : B.encode(``);
          let c = { signature: H(await Wl(a, e, Lo(s, B.encode(`.`), o))), payload: `` };
          return (
            i && (c.payload = Wo.decode(o)),
            this._unprotectedHeader && (c.header = this._unprotectedHeader),
            this._protectedHeader && (c.protected = Wo.decode(s)),
            c
          );
        }
      }));
  }),
  Cu,
  wu = t(() => {
    (Su(),
      (Cu = class {
        _flattened;
        constructor(e) {
          this._flattened = new xu(e);
        }
        setProtectedHeader(e) {
          return (this._flattened.setProtectedHeader(e), this);
        }
        async sign(e, t) {
          let n = await this._flattened.sign(e, t);
          if (n.payload === void 0)
            throw TypeError(`use the flattened module for creating JWS with b64: false`);
          return `${n.protected}.${n.payload}.${n.signature}`;
        }
      }));
  }),
  Tu,
  Eu,
  Du = t(() => {
    (Su(),
      J(),
      (Tu = class {
        parent;
        protectedHeader;
        unprotectedHeader;
        options;
        key;
        constructor(e, t, n) {
          ((this.parent = e), (this.key = t), (this.options = n));
        }
        setProtectedHeader(e) {
          if (this.protectedHeader) throw TypeError(`setProtectedHeader can only be called once`);
          return ((this.protectedHeader = e), this);
        }
        setUnprotectedHeader(e) {
          if (this.unprotectedHeader)
            throw TypeError(`setUnprotectedHeader can only be called once`);
          return ((this.unprotectedHeader = e), this);
        }
        addSignature(...e) {
          return this.parent.addSignature(...e);
        }
        sign(...e) {
          return this.parent.sign(...e);
        }
        done() {
          return this.parent;
        }
      }),
      (Eu = class {
        _payload;
        _signatures = [];
        constructor(e) {
          this._payload = e;
        }
        addSignature(e, t) {
          let n = new Tu(this, e, t);
          return (this._signatures.push(n), n);
        }
        async sign() {
          if (!this._signatures.length) throw new q(`at least one signature must be added`);
          let e = { signatures: [], payload: `` };
          for (let t = 0; t < this._signatures.length; t++) {
            let n = this._signatures[t],
              r = new xu(this._payload);
            (r.setProtectedHeader(n.protectedHeader), r.setUnprotectedHeader(n.unprotectedHeader));
            let { payload: i, ...a } = await r.sign(n.key, n.options);
            if (t === 0) e.payload = i;
            else if (e.payload !== i)
              throw new q(`inconsistent use of JWS Unencoded Payload (RFC7797)`);
            e.signatures.push(a);
          }
          return e;
        }
      }));
  });
function Ou(e, t) {
  if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
  return t;
}
var ku,
  Au = t(() => {
    (nu(),
      Gs(),
      uu(),
      (ku = class {
        _payload;
        constructor(e = {}) {
          if (!Q(e)) throw TypeError(`JWT Claims Set MUST be an object`);
          this._payload = e;
        }
        setIssuer(e) {
          return ((this._payload = { ...this._payload, iss: e }), this);
        }
        setSubject(e) {
          return ((this._payload = { ...this._payload, sub: e }), this);
        }
        setAudience(e) {
          return ((this._payload = { ...this._payload, aud: e }), this);
        }
        setJti(e) {
          return ((this._payload = { ...this._payload, jti: e }), this);
        }
        setNotBefore(e) {
          return (
            typeof e == `number`
              ? (this._payload = { ...this._payload, nbf: Ou(`setNotBefore`, e) })
              : e instanceof Date
                ? (this._payload = { ...this._payload, nbf: Ou(`setNotBefore`, tu(e)) })
                : (this._payload = { ...this._payload, nbf: tu(new Date()) + lu(e) }),
            this
          );
        }
        setExpirationTime(e) {
          return (
            typeof e == `number`
              ? (this._payload = { ...this._payload, exp: Ou(`setExpirationTime`, e) })
              : e instanceof Date
                ? (this._payload = { ...this._payload, exp: Ou(`setExpirationTime`, tu(e)) })
                : (this._payload = { ...this._payload, exp: tu(new Date()) + lu(e) }),
            this
          );
        }
        setIssuedAt(e) {
          return (
            e === void 0
              ? (this._payload = { ...this._payload, iat: tu(new Date()) })
              : e instanceof Date
                ? (this._payload = { ...this._payload, iat: Ou(`setIssuedAt`, tu(e)) })
                : typeof e == `string`
                  ? (this._payload = {
                      ...this._payload,
                      iat: Ou(`setIssuedAt`, tu(new Date()) + lu(e)),
                    })
                  : (this._payload = { ...this._payload, iat: Ou(`setIssuedAt`, e) }),
            this
          );
        }
      }));
  }),
  ju,
  Mu = t(() => {
    (wu(),
      J(),
      V(),
      Au(),
      (ju = class extends ku {
        _protectedHeader;
        setProtectedHeader(e) {
          return ((this._protectedHeader = e), this);
        }
        async sign(e, t) {
          let n = new Cu(B.encode(JSON.stringify(this._payload)));
          if (
            (n.setProtectedHeader(this._protectedHeader),
            Array.isArray(this._protectedHeader?.crit) &&
              this._protectedHeader.crit.includes(`b64`) &&
              this._protectedHeader.b64 === !1)
          )
            throw new $o(`JWTs MUST NOT use unencoded payload`);
          return n.sign(e, t);
        }
      }));
  }),
  Nu,
  Pu = t(() => {
    (bu(),
      V(),
      Au(),
      (Nu = class extends ku {
        _cek;
        _iv;
        _keyManagementParameters;
        _protectedHeader;
        _replicateIssuerAsHeader;
        _replicateSubjectAsHeader;
        _replicateAudienceAsHeader;
        setProtectedHeader(e) {
          if (this._protectedHeader) throw TypeError(`setProtectedHeader can only be called once`);
          return ((this._protectedHeader = e), this);
        }
        setKeyManagementParameters(e) {
          if (this._keyManagementParameters)
            throw TypeError(`setKeyManagementParameters can only be called once`);
          return ((this._keyManagementParameters = e), this);
        }
        setContentEncryptionKey(e) {
          if (this._cek) throw TypeError(`setContentEncryptionKey can only be called once`);
          return ((this._cek = e), this);
        }
        setInitializationVector(e) {
          if (this._iv) throw TypeError(`setInitializationVector can only be called once`);
          return ((this._iv = e), this);
        }
        replicateIssuerAsHeader() {
          return ((this._replicateIssuerAsHeader = !0), this);
        }
        replicateSubjectAsHeader() {
          return ((this._replicateSubjectAsHeader = !0), this);
        }
        replicateAudienceAsHeader() {
          return ((this._replicateAudienceAsHeader = !0), this);
        }
        async encrypt(e, t) {
          let n = new yu(B.encode(JSON.stringify(this._payload)));
          return (
            this._replicateIssuerAsHeader &&
              (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }),
            this._replicateSubjectAsHeader &&
              (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }),
            this._replicateAudienceAsHeader &&
              (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }),
            n.setProtectedHeader(this._protectedHeader),
            this._iv && n.setInitializationVector(this._iv),
            this._cek && n.setContentEncryptionKey(this._cek),
            this._keyManagementParameters &&
              n.setKeyManagementParameters(this._keyManagementParameters),
            n.encrypt(e, t)
          );
        }
      }));
  });
async function Fu(e, t) {
  if (!Q(e)) throw TypeError(`JWK must be an object`);
  if (((t ??= `sha256`), t !== `sha256` && t !== `sha384` && t !== `sha512`))
    throw TypeError(`digestAlgorithm must one of "sha256", "sha384", or "sha512"`);
  let n;
  switch (e.kty) {
    case `EC`:
      (Lu(e.crv, `"crv" (Curve) Parameter`),
        Lu(e.x, `"x" (X Coordinate) Parameter`),
        Lu(e.y, `"y" (Y Coordinate) Parameter`),
        (n = { crv: e.crv, kty: e.kty, x: e.x, y: e.y }));
      break;
    case `OKP`:
      (Lu(e.crv, `"crv" (Subtype of Key Pair) Parameter`),
        Lu(e.x, `"x" (Public Key) Parameter`),
        (n = { crv: e.crv, kty: e.kty, x: e.x }));
      break;
    case `RSA`:
      (Lu(e.e, `"e" (Exponent) Parameter`),
        Lu(e.n, `"n" (Modulus) Parameter`),
        (n = { e: e.e, kty: e.kty, n: e.n }));
      break;
    case `oct`:
      (Lu(e.k, `"k" (Key Value) Parameter`), (n = { k: e.k, kty: e.kty }));
      break;
    default:
      throw new G(`"kty" (Key Type) Parameter missing or unsupported`);
  }
  let r = B.encode(JSON.stringify(n));
  return H(await Fo(t, r));
}
async function Iu(e, t) {
  t ??= `sha256`;
  let n = await Fu(e, t);
  return `urn:ietf:params:oauth:jwk-thumbprint:sha-${t.slice(-3)}:${n}`;
}
var Lu,
  Ru = t(() => {
    (Io(),
      qo(),
      J(),
      V(),
      Gs(),
      (Lu = (e, t) => {
        if (typeof e != `string` || !e) throw new es(`${t} missing or invalid`);
      }));
  });
async function zu(e, t) {
  let n = { ...e, ...t?.header };
  if (!Q(n.jwk)) throw new q(`"jwk" (JSON Web Key) Header Parameter must be a JSON object`);
  let r = await Wc({ ...n.jwk, ext: !0 }, n.alg);
  if (r instanceof Uint8Array || r.type !== `public`)
    throw new q(`"jwk" (JSON Web Key) Header Parameter must be a public key`);
  return r;
}
var Bu = t(() => {
  (Gc(), Gs(), J());
});
function Vu(e) {
  switch (typeof e == `string` && e.slice(0, 2)) {
    case `RS`:
    case `PS`:
      return `RSA`;
    case `ES`:
      return `EC`;
    case `Ed`:
      return `OKP`;
    default:
      throw new G(`Unsupported "alg" value for a JSON Web Key Set`);
  }
}
function Hu(e) {
  return e && typeof e == `object` && Array.isArray(e.keys) && e.keys.every(Uu);
}
function Uu(e) {
  return Q(e);
}
function Wu(e) {
  return typeof structuredClone == `function` ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
async function Gu(e, t, n) {
  let r = e.get(t) || e.set(t, {}).get(t);
  if (r[n] === void 0) {
    let e = await Wc({ ...t, ext: !0 }, n);
    if (e instanceof Uint8Array || e.type !== `public`)
      throw new ts(`JSON Web Key Set members must be public keys`);
    r[n] = e;
  }
  return r[n];
}
function Ku(e) {
  let t = new qu(e),
    n = async (e, n) => t.getKey(e, n);
  return (
    Object.defineProperties(n, {
      jwks: { value: () => Wu(t._jwks), enumerable: !0, configurable: !1, writable: !1 },
    }),
    n
  );
}
var qu,
  Ju = t(() => {
    (Gc(),
      J(),
      Gs(),
      (qu = class {
        _jwks;
        _cached = new WeakMap();
        constructor(e) {
          if (!Hu(e)) throw new ts(`JSON Web Key Set malformed`);
          this._jwks = Wu(e);
        }
        async getKey(e, t) {
          let { alg: n, kid: r } = { ...e, ...t?.header },
            i = Vu(n),
            a = this._jwks.keys.filter((e) => {
              let t = i === e.kty;
              if (
                (t && typeof r == `string` && (t = r === e.kid),
                t && typeof e.alg == `string` && (t = n === e.alg),
                t && typeof e.use == `string` && (t = e.use === `sig`),
                t && Array.isArray(e.key_ops) && (t = e.key_ops.includes(`verify`)),
                t)
              )
                switch (n) {
                  case `ES256`:
                    t = e.crv === `P-256`;
                    break;
                  case `ES256K`:
                    t = e.crv === `secp256k1`;
                    break;
                  case `ES384`:
                    t = e.crv === `P-384`;
                    break;
                  case `ES512`:
                    t = e.crv === `P-521`;
                    break;
                  case `Ed25519`:
                    t = e.crv === `Ed25519`;
                    break;
                  case `EdDSA`:
                    t = e.crv === `Ed25519` || e.crv === `Ed448`;
                    break;
                }
              return t;
            }),
            { 0: o, length: s } = a;
          if (s === 0) throw new ns();
          if (s !== 1) {
            let e = new rs(),
              { _cached: t } = this;
            throw (
              (e[Symbol.asyncIterator] = async function* () {
                for (let e of a)
                  try {
                    yield await Gu(t, e, n);
                  } catch {}
              }),
              e
            );
          }
          return Gu(this._cached, o, n);
        }
      }));
  }),
  Yu,
  Xu = t(() => {
    (J(),
      V(),
      (Yu = async (e, t, n) => {
        let r;
        switch (e.protocol) {
          case `https:`:
            r = mt.get;
            break;
          case `http:`:
            r = ot.get;
            break;
          default:
            throw TypeError(`Unsupported URL protocol.`);
        }
        let { agent: i, headers: a } = n,
          o = r(e.href, { agent: i, timeout: t, headers: a }),
          [s] = await Promise.race([st(o, `response`), st(o, `timeout`)]);
        if (!s) throw (o.destroy(), new is());
        if (s.statusCode !== 200)
          throw new W(`Expected 200 OK from the JSON Web Key Set HTTP response`);
        let c = [];
        for await (let e of s) c.push(e);
        try {
          return JSON.parse(Wo.decode(Lo(...c)));
        } catch {
          throw new W(`Failed to parse the JSON Web Key Set HTTP response as JSON`);
        }
      }));
  });
function Zu() {
  return (
    typeof WebSocketPair < `u` ||
    (typeof navigator < `u` && navigator.userAgent === `Cloudflare-Workers`) ||
    (typeof EdgeRuntime < `u` && EdgeRuntime === `vercel`)
  );
}
function Qu(e, t) {
  return !(
    typeof e != `object` ||
    !e ||
    !(`uat` in e) ||
    typeof e.uat != `number` ||
    Date.now() - e.uat >= t ||
    !(`jwks` in e) ||
    !Q(e.jwks) ||
    !Array.isArray(e.jwks.keys) ||
    !Array.prototype.every.call(e.jwks.keys, Q)
  );
}
function $u(e, t) {
  let n = new nd(e, t),
    r = async (e, t) => n.getKey(e, t);
  return (
    Object.defineProperties(r, {
      coolingDown: { get: () => n.coolingDown(), enumerable: !0, configurable: !1 },
      fresh: { get: () => n.fresh(), enumerable: !0, configurable: !1 },
      reload: { value: () => n.reload(), enumerable: !0, configurable: !1, writable: !1 },
      reloading: { get: () => !!n._pendingFetch, enumerable: !0, configurable: !1 },
      jwks: { value: () => n._local?.jwks(), enumerable: !0, configurable: !1, writable: !1 },
    }),
    r
  );
}
var ed,
  td,
  nd,
  rd,
  id = t(() => {
    (Xu(),
      J(),
      Ju(),
      Gs(),
      (typeof navigator > `u` || !navigator.userAgent?.startsWith?.(`Mozilla/5.0 `)) &&
        (ed = `jose/v5.10.0`),
      (td = Symbol()),
      (nd = class {
        _url;
        _timeoutDuration;
        _cooldownDuration;
        _cacheMaxAge;
        _jwksTimestamp;
        _pendingFetch;
        _options;
        _local;
        _cache;
        constructor(e, t) {
          if (!(e instanceof URL)) throw TypeError(`url must be an instance of URL`);
          ((this._url = new URL(e.href)),
            (this._options = { agent: t?.agent, headers: t?.headers }),
            (this._timeoutDuration =
              typeof t?.timeoutDuration == `number` ? t?.timeoutDuration : 5e3),
            (this._cooldownDuration =
              typeof t?.cooldownDuration == `number` ? t?.cooldownDuration : 3e4),
            (this._cacheMaxAge = typeof t?.cacheMaxAge == `number` ? t?.cacheMaxAge : 6e5),
            t?.[td] !== void 0 &&
              ((this._cache = t?.[td]),
              Qu(t?.[td], this._cacheMaxAge) &&
                ((this._jwksTimestamp = this._cache.uat), (this._local = Ku(this._cache.jwks)))));
        }
        coolingDown() {
          return typeof this._jwksTimestamp == `number`
            ? Date.now() < this._jwksTimestamp + this._cooldownDuration
            : !1;
        }
        fresh() {
          return typeof this._jwksTimestamp == `number`
            ? Date.now() < this._jwksTimestamp + this._cacheMaxAge
            : !1;
        }
        async getKey(e, t) {
          (!this._local || !this.fresh()) && (await this.reload());
          try {
            return await this._local(e, t);
          } catch (n) {
            if (n instanceof ns && this.coolingDown() === !1)
              return (await this.reload(), this._local(e, t));
            throw n;
          }
        }
        async reload() {
          this._pendingFetch && Zu() && (this._pendingFetch = void 0);
          let e = new Headers(this._options.headers);
          (ed &&
            !e.has(`User-Agent`) &&
            (e.set(`User-Agent`, ed), (this._options.headers = Object.fromEntries(e.entries()))),
            (this._pendingFetch ||= Yu(this._url, this._timeoutDuration, this._options)
              .then((e) => {
                ((this._local = Ku(e)),
                  this._cache && ((this._cache.uat = Date.now()), (this._cache.jwks = e)),
                  (this._jwksTimestamp = Date.now()),
                  (this._pendingFetch = void 0));
              })
              .catch((e) => {
                throw ((this._pendingFetch = void 0), e);
              })),
            await this._pendingFetch);
        }
      }),
      (rd = td));
  }),
  ad,
  od = t(() => {
    (qo(),
      V(),
      J(),
      mu(),
      Au(),
      (ad = class extends ku {
        encode() {
          return `${H(JSON.stringify({ alg: `none` }))}.${H(JSON.stringify(this._payload))}.`;
        }
        static decode(e, t) {
          if (typeof e != `string`) throw new $o(`Unsecured JWT must be a string`);
          let { 0: n, 1: r, 2: i, length: a } = e.split(`.`);
          if (a !== 3 || i !== ``) throw new $o(`Invalid Unsecured JWT`);
          let o;
          try {
            if (((o = JSON.parse(Wo.decode(U(n)))), o.alg !== `none`)) throw Error();
          } catch {
            throw new $o(`Invalid Unsecured JWT`);
          }
          return { payload: pu(o, U(r), t), header: o };
        }
      }));
  }),
  sd = r({ decode: () => ld, encode: () => cd }),
  cd,
  ld,
  ud = t(() => {
    (qo(), (cd = H), (ld = U));
  });
function dd(e) {
  let t;
  if (typeof e == `string`) {
    let n = e.split(`.`);
    (n.length === 3 || n.length === 5) && ([t] = n);
  } else if (typeof e == `object` && e)
    if (`protected` in e) t = e.protected;
    else throw TypeError(`Token does not contain a Protected Header`);
  try {
    if (typeof t != `string` || !t) throw Error();
    let e = JSON.parse(Wo.decode(ld(t)));
    if (!Q(e)) throw Error();
    return e;
  } catch {
    throw TypeError(`Invalid Token or Protected Header formatting`);
  }
}
var fd = t(() => {
  (ud(), V(), Gs());
});
function pd(e) {
  if (typeof e != `string`)
    throw new $o(`JWTs must use Compact JWS serialization, JWT must be a string`);
  let { 1: t, length: n } = e.split(`.`);
  if (n === 5) throw new $o(`Only JWTs using Compact JWS serialization can be decoded`);
  if (n !== 3) throw new $o(`Invalid JWT`);
  if (!t) throw new $o(`JWTs must contain a payload`);
  let r;
  try {
    r = ld(t);
  } catch {
    throw new $o(`Failed to base64url decode the payload`);
  }
  let i;
  try {
    i = JSON.parse(Wo.decode(r));
  } catch {
    throw new $o(`Failed to parse the decoded payload as JSON`);
  }
  if (!Q(i)) throw new $o(`Invalid JWT Claims Set`);
  return i;
}
var md = t(() => {
  (ud(), V(), Gs(), J());
});
async function hd(e, t) {
  let n;
  switch (e) {
    case `HS256`:
    case `HS384`:
    case `HS512`:
    case `A128CBC-HS256`:
    case `A192CBC-HS384`:
    case `A256CBC-HS512`:
      n = parseInt(e.slice(-3), 10);
      break;
    case `A128KW`:
    case `A192KW`:
    case `A256KW`:
    case `A128GCMKW`:
    case `A192GCMKW`:
    case `A256GCMKW`:
    case `A128GCM`:
    case `A192GCM`:
    case `A256GCM`:
      n = parseInt(e.slice(1, 4), 10);
      break;
    default:
      throw new G(`Invalid or unsupported JWK "alg" (Algorithm) Parameter value`);
  }
  return Ge(Qe(new Uint8Array(n >> 3)));
}
async function gd(e, t) {
  switch (e) {
    case `RS256`:
    case `RS384`:
    case `RS512`:
    case `PS256`:
    case `PS384`:
    case `PS512`:
    case `RSA-OAEP`:
    case `RSA-OAEP-256`:
    case `RSA-OAEP-384`:
    case `RSA-OAEP-512`:
    case `RSA1_5`: {
      let e = t?.modulusLength ?? 2048;
      if (typeof e != `number` || e < 2048)
        throw new G(
          `Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used`,
        );
      return await _d(`rsa`, { modulusLength: e, publicExponent: 65537 });
    }
    case `ES256`:
      return _d(`ec`, { namedCurve: `P-256` });
    case `ES256K`:
      return _d(`ec`, { namedCurve: `secp256k1` });
    case `ES384`:
      return _d(`ec`, { namedCurve: `P-384` });
    case `ES512`:
      return _d(`ec`, { namedCurve: `P-521` });
    case `Ed25519`:
      return _d(`ed25519`);
    case `EdDSA`:
      switch (t?.crv) {
        case void 0:
        case `Ed25519`:
          return _d(`ed25519`);
        case `Ed448`:
          return _d(`ed448`);
        default:
          throw new G(
            `Invalid or unsupported crv option provided, supported values are Ed25519 and Ed448`,
          );
      }
    case `ECDH-ES`:
    case `ECDH-ES+A128KW`:
    case `ECDH-ES+A192KW`:
    case `ECDH-ES+A256KW`: {
      let e = t?.crv ?? `P-256`;
      switch (e) {
        case void 0:
        case `P-256`:
        case `P-384`:
        case `P-521`:
          return _d(`ec`, { namedCurve: e });
        case `X25519`:
          return _d(`x25519`);
        case `X448`:
          return _d(`x448`);
        default:
          throw new G(
            `Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448`,
          );
      }
    }
    default:
      throw new G(`Invalid or unsupported JWK "alg" (Algorithm) Parameter value`);
  }
}
var _d,
  vd = t(() => {
    (os(), J(), (_d = it(qe)));
  });
async function yd(e, t) {
  return gd(e, t);
}
var bd = t(() => {
  vd();
});
async function xd(e, t) {
  return hd(e, t);
}
var Sd = t(() => {
    vd();
  }),
  Cd,
  wd = t(() => {
    Cd = `node:crypto`;
  }),
  Td,
  Ed = t(() => {
    (wd(), (Td = Cd));
  }),
  Dd = r({
    CompactEncrypt: () => yu,
    CompactSign: () => Cu,
    EmbeddedJWK: () => zu,
    EncryptJWT: () => Nu,
    FlattenedEncrypt: () => kl,
    FlattenedSign: () => xu,
    GeneralEncrypt: () => Ml,
    GeneralSign: () => Eu,
    SignJWT: () => ju,
    UnsecuredJWT: () => ad,
    base64url: () => sd,
    calculateJwkThumbprint: () => Fu,
    calculateJwkThumbprintUri: () => Iu,
    compactDecrypt: () => hl,
    compactVerify: () => Zl,
    createLocalJWKSet: () => Ku,
    createRemoteJWKSet: () => $u,
    cryptoRuntime: () => Td,
    decodeJwt: () => pd,
    decodeProtectedHeader: () => dd,
    errors: () => Jo,
    experimental_jwksCache: () => rd,
    exportJWK: () => Tl,
    exportPKCS8: () => wl,
    exportSPKI: () => Cl,
    flattenedDecrypt: () => pl,
    flattenedVerify: () => Yl,
    generalDecrypt: () => _l,
    generalVerify: () => $l,
    generateKeyPair: () => yd,
    generateSecret: () => xd,
    importJWK: () => Wc,
    importPKCS8: () => Uc,
    importSPKI: () => Vc,
    importX509: () => Hc,
    jwksCache: () => td,
    jwtDecrypt: () => _u,
    jwtVerify: () => hu,
  }),
  Od = t(() => {
    (gl(),
      ml(),
      vl(),
      Nl(),
      Ql(),
      Xl(),
      eu(),
      gu(),
      vu(),
      bu(),
      Al(),
      wu(),
      Su(),
      Du(),
      Mu(),
      Pu(),
      Ru(),
      Bu(),
      Ju(),
      id(),
      od(),
      El(),
      Gc(),
      fd(),
      md(),
      J(),
      bd(),
      Sd(),
      ud(),
      Ed());
  }),
  kd = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, { verifyVercelOidcToken: () => h }), (t.exports = c(l)));
    var u = (Od(), c(Dd));
    let d = `https://oidc.vercel.com`,
      f = new URL(`https://oidc.vercel.com/.well-known/jwks`),
      p = [`RS256`],
      m = (0, u.createRemoteJWKSet)(f);
    async function h(e, t) {
      let {
        algorithms: n,
        projectId: r = process.env.VERCEL_PROJECT_ID,
        environment: i = process.env.VERCEL_TARGET_ENV || process.env.VERCEL_ENV,
        ownerId: a,
        ...o
      } = t ?? {};
      if (r === `*` && a === void 0 && !g(o.audience))
        throw TypeError(`Expected ownerId or audience to be provided when projectId is '*'.`);
      let s = await (0, u.jwtVerify)(e, m, { ...o, algorithms: n ?? p });
      return (
        _(s.payload.iss),
        v({
          actual: s.payload.project_id,
          claim: `project_id`,
          env: `VERCEL_PROJECT_ID`,
          expected: r,
          option: `projectId`,
        }),
        v({
          actual: s.payload.environment,
          claim: `environment`,
          env: `VERCEL_TARGET_ENV or VERCEL_ENV`,
          expected: i,
          option: `environment`,
        }),
        y({ actual: s.payload.owner_id, claim: `owner_id`, expected: a }),
        s
      );
    }
    function g(e) {
      return Array.isArray(e) ? e.length > 0 : e !== void 0;
    }
    function _(e) {
      if (e !== d && (typeof e != `string` || !e.startsWith(`${d}/`)))
        throw TypeError(
          `Expected Vercel OIDC token iss claim to be "${d}" or to start with "${d}/".`,
        );
    }
    function v({ actual: e, claim: t, env: n, expected: r, option: i }) {
      if (r !== `*`) {
        if (r === void 0 || r.length === 0)
          throw TypeError(
            `Expected ${n} to be set or ${i} to be provided. Pass ${i}: '*' to allow any ${t} claim.`,
          );
        if (!(Array.isArray(r) && typeof e == `string` && r.includes(e)) && e !== r)
          throw TypeError(
            Array.isArray(r)
              ? `Expected Vercel OIDC token ${t} claim to be one of: ${r.map((e) => `"${e}"`).join(`, `)}.`
              : `Expected Vercel OIDC token ${t} claim to be "${r}".`,
          );
      }
    }
    function y({ actual: e, claim: t, expected: n }) {
      if (n !== void 0 && e !== n)
        throw TypeError(`Expected Vercel OIDC token ${t} claim to be "${n}".`);
    }
    0 && (t.exports = { verifyVercelOidcToken: h });
  }),
  Ad = i((e, t) => {
    var n = Object.defineProperty,
      r = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = (e, t) => {
        for (var r in t) n(e, r, { get: t[r], enumerable: !0 });
      },
      s = (e, t, o, s) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
          for (let c of i(t))
            !a.call(e, c) &&
              c !== o &&
              n(e, c, { get: () => t[c], enumerable: !(s = r(t, c)) || s.enumerable });
        return e;
      },
      c = (e) => s(n({}, `__esModule`, { value: !0 }), e),
      l = {};
    (o(l, {
      AccessTokenMissingError: () => m.AccessTokenMissingError,
      RefreshAccessTokenFailedError: () => m.RefreshAccessTokenFailedError,
      exchangeVercelOidcToken: () => h.exchangeVercelOidcToken,
      getContext: () => f.getContext,
      getVercelOidcToken: () => u.getVercelOidcToken,
      getVercelOidcTokenSync: () => d.getVercelOidcTokenSync,
      getVercelToken: () => g.getVercelToken,
      verifyVercelOidcToken: () => p.verifyVercelOidcToken,
    }),
      (t.exports = c(l)));
    var u = Po(),
      d = No(),
      f = Mo(),
      p = kd(),
      m = Fe(),
      h = jo(),
      g = Ie();
    0 &&
      (t.exports = {
        AccessTokenMissingError,
        RefreshAccessTokenFailedError,
        exchangeVercelOidcToken,
        getContext,
        getVercelOidcToken,
        getVercelOidcTokenSync,
        getVercelToken,
        verifyVercelOidcToken,
      });
  }),
  jd = n(ko(), 1),
  Md = Ad();
async function Nd(e) {
  let t = 0,
    n = e.getReader(),
    r = [];
  try {
    for (;;) {
      let { done: e, value: i } = await n.read();
      if (e) break;
      (r.push(i), (t += i.length));
    }
  } finally {
    n.releaseLock();
  }
  return Buffer.concat(r, t);
}
var Pd = class {
    contentType = `application/json`;
    replacer;
    reviver;
    constructor(e = {}) {
      ((this.replacer = e.replacer), (this.reviver = e.reviver));
    }
    serialize(e) {
      return Buffer.from(JSON.stringify(e, this.replacer), `utf8`);
    }
    async deserialize(e) {
      let t = await Nd(e);
      return JSON.parse(t.toString(`utf8`), this.reviver);
    }
  },
  Fd = class extends Error {
    constructor(e) {
      (super(`Message ${e} not found`), (this.name = `MessageNotFoundError`));
    }
  },
  Id = class extends Error {
    constructor(e, t) {
      (super(`Message ${e} not available for processing${t ? `: ${t}` : ``}`),
        (this.name = `MessageNotAvailableError`));
    }
  },
  Ld = class extends Error {
    constructor(e, t) {
      (super(`Message ${e} is corrupted: ${t}`), (this.name = `MessageCorruptedError`));
    }
  },
  Rd = class extends Error {
    retryAfter;
    constructor(e = `Too many requests`, t) {
      (super(e), (this.name = `TooManyRequestsError`), (this.retryAfter = t));
    }
  },
  zd = class extends Error {
    constructor(e = `Missing or invalid authentication token`) {
      (super(e), (this.name = `UnauthorizedError`));
    }
  },
  Bd = class extends Error {
    constructor(e = `Queue environment doesn't match token environment`) {
      (super(e), (this.name = `ForbiddenError`));
    }
  },
  Vd = class extends Error {
    constructor(e) {
      (super(e), (this.name = `BadRequestError`));
    }
  },
  Hd = class extends Error {
    constructor(e = `Unexpected server error`) {
      (super(e), (this.name = `InternalServerError`));
    }
  },
  Ud = class extends Error {
    constructor(e, t = 1, n = 10) {
      (super(`Invalid limit: ${e}. Limit must be between ${t} and ${n}.`),
        (this.name = `InvalidLimitError`));
    }
  },
  Wd = class extends Error {
    constructor(e) {
      (super(`Message ${e} has already been processed`),
        (this.name = `MessageAlreadyProcessedError`));
    }
  },
  Gd = class extends Error {
    idempotencyKey;
    constructor(e, t) {
      (super(e), (this.name = `DuplicateMessageError`), (this.idempotencyKey = t));
    }
  },
  Kd = class extends Error {
    deploymentId;
    constructor(e, t) {
      (super(e), (this.name = `ConsumerDiscoveryError`), (this.deploymentId = t));
    }
  },
  qd = class extends Error {
    constructor(e = `Consumer registry not configured`) {
      (super(e), (this.name = `ConsumerRegistryNotConfiguredError`));
    }
  },
  Jd = 300,
  Yd = 30,
  Xd = 60,
  Zd = 10,
  Qd = 3e3,
  $d = 3,
  ef = 250;
function tf(e) {
  return Math.min(Xd, Math.max(Zd, e / 5));
}
var nf = class {
    client;
    topicName;
    consumerGroupName;
    visibilityTimeout;
    constructor(e, t, n, r = {}) {
      ((this.client = e),
        (this.topicName = t),
        (this.consumerGroupName = n),
        (this.visibilityTimeout = Math.max(Yd, r.visibilityTimeoutSeconds ?? Jd)));
    }
    isClientError(e) {
      return (
        e instanceof Id || e instanceof Fd || e instanceof Vd || e instanceof zd || e instanceof Bd
      );
    }
    isNetworkError(e) {
      return e instanceof TypeError;
    }
    async directiveCallWithRetries(e) {
      let t;
      for (let n = 1; n <= $d; n++)
        try {
          return await e();
        } catch (e) {
          if (((t = e), n === $d)) throw e;
          if (e instanceof Rd) {
            if (e.retryAfter === void 0) throw e;
            await new Promise((t) => setTimeout(t, e.retryAfter * 1e3));
            continue;
          }
          if (!this.isNetworkError(e)) throw e;
          let r = ef * n,
            i = r / 2 + (r / 2) * Math.random();
          await new Promise((e) => setTimeout(e, i));
        }
      throw t;
    }
    startVisibilityExtension(e, t) {
      let n = !0,
        r = !1,
        i,
        a = null,
        o = tf(this.visibilityTimeout) * 1e3,
        s = o;
      if (t?.visibilityDeadline) {
        let e = t.visibilityDeadline.getTime() - Date.now();
        s = e > 0 ? tf(e / 1e3) * 1e3 : 0;
      }
      let c = new Promise((e) => {
          i = e;
        }),
        l = () => {
          r || ((r = !0), i());
        },
        u = async () => {
          if (!n) {
            l();
            return;
          }
          try {
            (await this.client.changeVisibility({
              queueName: this.topicName,
              consumerGroup: this.consumerGroupName,
              receiptHandle: e,
              visibilityTimeoutSeconds: this.visibilityTimeout,
            }),
              n ? (a = setTimeout(() => u(), o)) : l());
          } catch (t) {
            if (this.isClientError(t)) {
              (console.error(
                `Visibility extension failed with client error for receipt handle ${e} (stopping retries):`,
                t,
              ),
                l());
              return;
            }
            (console.error(
              `Failed to extend visibility for receipt handle ${e} (will retry in ${Qd / 1e3}s):`,
              t,
            ),
              n ? (a = setTimeout(() => u(), Qd)) : l());
          }
        };
      return (
        (a = setTimeout(() => u(), s)),
        async (e = !1) => {
          ((n = !1), (a &&= (clearTimeout(a), null)), e ? await c : l());
        }
      );
    }
    async finalizePayload(e) {
      let t = this.client.getTransport();
      if (t.finalize && e != null)
        try {
          await t.finalize(e);
        } catch (e) {
          console.warn(`Failed to finalize message payload:`, e);
        }
    }
    async processMessage(e, t, n) {
      let r = this.startVisibilityExtension(e.receiptHandle, n),
        i = {
          messageId: e.messageId,
          deliveryCount: e.deliveryCount,
          createdAt: e.createdAt,
          expiresAt: e.expiresAt ?? new Date(e.createdAt.getTime() + 864e5),
          topicName: this.topicName,
          consumerGroup: this.consumerGroupName,
          region: this.client.getRegion(),
        };
      try {
        (await t(e.payload, i),
          await r(),
          await this.client.acknowledgeMessage({
            queueName: this.topicName,
            consumerGroup: this.consumerGroupName,
            receiptHandle: e.receiptHandle,
          }));
      } catch (t) {
        if ((await r(), n?.retry)) {
          let r;
          try {
            r = n.retry(t, i);
          } catch (e) {
            console.warn(`retry handler threw:`, e);
          }
          if (r) {
            if (`acknowledge` in r && r.acknowledge) {
              try {
                await this.directiveCallWithRetries(() =>
                  this.client.acknowledgeMessage({
                    queueName: this.topicName,
                    consumerGroup: this.consumerGroupName,
                    receiptHandle: e.receiptHandle,
                  }),
                );
              } catch (e) {
                console.warn(`Failed to acknowledge message:`, e);
              }
              await this.finalizePayload(e.payload);
              return;
            }
            if (`afterSeconds` in r && typeof r.afterSeconds == `number`) {
              try {
                await this.directiveCallWithRetries(() =>
                  this.client.changeVisibility({
                    queueName: this.topicName,
                    consumerGroup: this.consumerGroupName,
                    receiptHandle: e.receiptHandle,
                    visibilityTimeoutSeconds: r.afterSeconds,
                  }),
                );
              } catch (e) {
                console.warn(`Failed to reschedule message for retry:`, e);
              }
              await this.finalizePayload(e.payload);
              return;
            }
          }
        }
        throw (await this.finalizePayload(e.payload), t);
      }
    }
    async consumeMessage(e, t, n) {
      await this.processMessage(t, e, n);
    }
    async consume(e, t) {
      let n = t?.retry;
      if (t && `messageId` in t) {
        let r = await this.client.receiveMessageById({
          queueName: this.topicName,
          consumerGroup: this.consumerGroupName,
          messageId: t.messageId,
          visibilityTimeoutSeconds: this.visibilityTimeout,
        });
        return (await this.processMessage(r.message, e, { retry: n }), 1);
      } else {
        let r = t && `limit` in t ? t.limit : 1,
          i = 0;
        for await (let t of this.client.receiveMessages({
          queueName: this.topicName,
          consumerGroup: this.consumerGroupName,
          visibilityTimeoutSeconds: this.visibilityTimeout,
          limit: r,
        }))
          (i++, await this.processMessage(t, e, { retry: n }));
        return i;
      }
    }
    get name() {
      return this.consumerGroupName;
    }
    get topic() {
      return this.topicName;
    }
  },
  rf = class {
    client;
    topicName;
    constructor(e, t) {
      ((this.client = e), (this.topicName = t));
    }
    async publish(e, t) {
      let n = await this.client.sendMessage({
        queueName: this.topicName,
        payload: e,
        idempotencyKey: t?.idempotencyKey,
        retentionSeconds: t?.retentionSeconds,
        delaySeconds: t?.delaySeconds,
        headers: t?.headers,
        telemetry: t?.telemetry,
      });
      return (
        n.messageId &&
          vf() &&
          ip(
            this.topicName,
            n.messageId,
            this.client.getRegion(),
            t?.delaySeconds,
            t?.retentionSeconds,
          ),
        { messageId: n.messageId }
      );
    }
    consumerGroup(e, t) {
      return new nf(this.client, this.topicName, e, t);
    }
    get name() {
      return this.topicName;
    }
  },
  af = `com.vercel.queue.v1beta`,
  of = `com.vercel.queue.v2beta`;
function sf(e, t) {
  let n = t.slice(0, -1);
  return e.startsWith(n);
}
function cf(e) {
  return typeof e == `object` && !!e;
}
function lf(e, t) {
  if (!t || !t.includes(`application/cloudevents+json`))
    throw Error(`Invalid content type: expected 'application/cloudevents+json'`);
  if (!cf(e) || !e.type || !e.source || !e.id || !cf(e.data))
    throw Error(`Invalid CloudEvent: missing required fields`);
  if (e.type !== `com.vercel.queue.v1beta`)
    throw Error(`Invalid CloudEvent type: expected '${af}', got '${String(e.type)}'`);
  let { data: n } = e,
    r = [];
  if (
    (`queueName` in n || r.push(`queueName`),
    `consumerGroup` in n || r.push(`consumerGroup`),
    `messageId` in n || r.push(`messageId`),
    r.length > 0)
  )
    throw Error(`Missing required CloudEvent data fields: ${r.join(`, `)}`);
  return {
    queueName: String(n.queueName),
    consumerGroup: String(n.consumerGroup),
    messageId: String(n.messageId),
  };
}
function uf(e, t) {
  if (e instanceof Headers) return e.get(t);
  let n = e[t];
  return Array.isArray(n) ? (n[0] ?? null) : (n ?? null);
}
function df(e) {
  let t = uf(e, `ce-type`);
  if (t !== `com.vercel.queue.v2beta`)
    throw Error(`Invalid CloudEvent type: expected '${of}', got '${t}'`);
  let n = uf(e, `ce-vqsqueuename`),
    r = uf(e, `ce-vqsconsumergroup`),
    i = uf(e, `ce-vqsmessageid`),
    a = [];
  if (
    (n || a.push(`ce-vqsqueuename`),
    r || a.push(`ce-vqsconsumergroup`),
    i || a.push(`ce-vqsmessageid`),
    a.length > 0)
  )
    throw Error(`Missing required CloudEvent headers: ${a.join(`, `)}`);
  let o = uf(e, `ce-vqsregion`) ?? void 0;
  if (o !== void 0 && !/^[a-z]{2,5}[0-9]{1,2}$/.test(o))
    throw Error(
      `Invalid ce-vqsregion header: ${JSON.stringify(o)}. Region must match /^[a-z]{2,5}[0-9]{1,2}$/ (e.g. "iad1", "lhr1").`,
    );
  let s = { queueName: n, consumerGroup: r, messageId: i, region: o },
    c = uf(e, `ce-vqsreceipthandle`);
  if (!c) return s;
  let l = { ...s, receiptHandle: c },
    u = uf(e, `ce-vqsdeliverycount`);
  u && (l.deliveryCount = parseInt(u, 10));
  let d = uf(e, `ce-vqscreatedat`);
  d && (l.createdAt = d);
  let f = uf(e, `ce-vqsexpiresat`);
  f && (l.expiresAt = f);
  let p = uf(e, `content-type`);
  p && (l.contentType = p);
  let m = uf(e, `ce-vqsvisibilitydeadline`);
  return (m && (l.visibilityDeadline = m), l);
}
function ff(e, t) {
  if (uf(t, `ce-type`) === `com.vercel.queue.v2beta`) {
    let n = df(t);
    return (`receiptHandle` in n && (n.parsedPayload = e), n);
  }
  return lf(e, uf(t, `content-type`));
}
async function pf(e) {
  if (e.headers.get(`ce-type`) === `com.vercel.queue.v2beta`) {
    let t = df(e.headers);
    return (`receiptHandle` in t && e.body && (t.rawBody = e.body), t);
  }
  let t;
  try {
    t = await e.json();
  } catch {
    throw Error(`Failed to parse CloudEvent from request body`);
  }
  let n = {};
  return (
    e.headers.forEach((e, t) => {
      n[t] = e;
    }),
    ff(t, n)
  );
}
async function mf(e, t, n) {
  let { queueName: r, consumerGroup: i, messageId: a } = t;
  if (!n?.client) throw Error(`HandleCallbackOptions.client is required`);
  let o = Lp(n.client);
  t.region && (o = o.withRegion(t.region));
  let s = new rf(o, r).consumerGroup(
    i,
    n?.visibilityTimeoutSeconds === void 0
      ? void 0
      : { visibilityTimeoutSeconds: n.visibilityTimeoutSeconds },
  );
  if (`receiptHandle` in t) {
    let r = o.getTransport(),
      i;
    if (t.rawBody) i = await r.deserialize(t.rawBody);
    else if (t.parsedPayload !== void 0) i = t.parsedPayload;
    else throw Error(`Binary mode callback with receipt handle is missing payload`);
    let c = {
        messageId: a,
        payload: i,
        deliveryCount: t.deliveryCount ?? 1,
        createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
        expiresAt: t.expiresAt ? new Date(t.expiresAt) : void 0,
        contentType: t.contentType ?? r.contentType,
        receiptHandle: t.receiptHandle,
      },
      l = t.visibilityDeadline ? new Date(t.visibilityDeadline) : void 0;
    await s.consumeMessage(e, c, { visibilityDeadline: l, retry: n?.retry });
  } else await s.consume(e, { messageId: a, retry: n?.retry });
}
var $ = jd.default.cyan(`[queue]`),
  hf = jd.default.green(`✓`),
  gf = jd.default.red(`✗`),
  _f = jd.default.yellow(`↻`);
function vf() {
  return process.env.NODE_ENV === `development` && process.env.VERCEL_DEPLOYMENT_ID === void 0;
}
var yf = Symbol.for(`@vercel/queue.devRouteMappings`);
function bf(e) {
  let t = ``;
  for (let n of e)
    n === `_`
      ? (t += `__`)
      : n === `/`
        ? (t += `_S`)
        : n === `.`
          ? (t += `_D`)
          : /[A-Za-z0-9-]/.test(n)
            ? (t += n)
            : (t += `_` + n.charCodeAt(0).toString(16).toUpperCase().padStart(2, `0`));
  return t;
}
function xf() {
  let e = globalThis;
  if (yf in e) return e[yf] ?? null;
  try {
    let t = ut.join(process.cwd(), `vercel.json`);
    if (!dt.existsSync(t)) return ((e[yf] = null), null);
    let n = JSON.parse(dt.readFileSync(t, `utf-8`));
    if (!n.functions) return ((e[yf] = null), null);
    let r = [];
    for (let [e, t] of Object.entries(n.functions))
      if (t.experimentalTriggers) {
        for (let n of t.experimentalTriggers)
          if (!(!n.type?.startsWith(`queue/`) || !n.topic)) {
            if (n.type !== `queue/v2beta`) {
              console.warn(
                `${$} Unsupported trigger type "${n.type}" for topic "${n.topic}" in ${e}. Use "queue/v2beta" instead.`,
              );
              continue;
            }
            r.push({
              filePath: e,
              topic: n.topic,
              consumer: bf(e),
              retryAfterSeconds: n.retryAfterSeconds,
            });
          }
      }
    return ((e[yf] = r.length > 0 ? r : null), e[yf]);
  } catch (t) {
    return (console.warn(`${$} Failed to read vercel.json:`, t), (e[yf] = null), null);
  }
}
function Sf(e) {
  let t = xf();
  return t ? t.filter((t) => (t.topic.includes(`*`) ? sf(e, t.topic) : t.topic === e)) : [];
}
function Cf(e, t) {
  return Sf(e).find((e) => e.consumer === t)?.retryAfterSeconds;
}
function wf(e) {
  return /^src\/(app|pages|server)\//.test(e) ? e.slice(4) : null;
}
function Tf(e, t) {
  return e === t || R(e, t);
}
function Ef(e) {
  let t = xf();
  if (!t) return [];
  let n = process.cwd(),
    r;
  try {
    r = ut.relative(n, e);
  } catch {
    return [];
  }
  let i = r.replace(/\\/g, `/`),
    a = wf(i);
  return t.filter((e) => Tf(i, e.filePath) || (a !== null && Tf(a, e.filePath)));
}
function Df(e) {
  let t = e.match(/\((.+?):\d+:\d+\)/);
  if (((t ||= e.match(/at\s+(.+?):\d+:\d+/)), !t)) return null;
  let n = t[1].trim();
  if (n === `native` || n.startsWith(`node:`) || n.startsWith(`internal`)) return null;
  if (n.startsWith(`file://`))
    try {
      n = new URL(n).pathname;
    } catch {
      return null;
    }
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(n)
    ? null
    : (n.startsWith(`./`) && (n = n.slice(2)), n);
}
var Of;
function kf() {
  if (Of) return Of;
  try {
    let e = typeof __dirname < `u` ? __dirname : ut.dirname(new URL(import.meta.url).pathname);
    Of = ut.resolve(e, `..`);
  } catch {
    Of = ``;
  }
  return Of;
}
function Af() {
  let e = Error().stack;
  if (!e) return null;
  let t = e
      .split(`
`)
      .slice(1),
    n = kf();
  for (let e of t) {
    let t = Df(e);
    if (!t) continue;
    let r = ut.isAbsolute(t) ? t : ut.resolve(process.cwd(), t),
      i;
    try {
      i = dt.realpathSync(r);
    } catch {
      i = r;
    }
    if (!(n && i.startsWith(n))) return i;
  }
  return null;
}
var jf = Symbol.for(`@vercel/queue.devHandlerRegistry`);
function Mf() {
  let e = globalThis;
  return (e[jf] || (e[jf] = new Map()), e[jf]);
}
function Nf(e, t, n, r) {
  let i = Ef(ut.isAbsolute(e) ? e : ut.resolve(process.cwd(), e));
  if (i.length === 0) return !1;
  let a = Mf();
  for (let e of i) {
    let i = e.topic,
      o = a.get(i) ?? [],
      s = { consumerGroup: e.consumer, handler: t, client: n, options: r },
      c = o.findIndex((t) => t.consumerGroup === e.consumer);
    (c >= 0 ? (o[c] = s) : o.push(s), a.set(i, o));
  }
  return !0;
}
function Pf(e, t, n, r) {
  let i = r ?? Af();
  if (!i) {
    console.warn(`${$} Could not determine caller file path for handler registration.`);
    return;
  }
  if (!Nf(i, e, t, n)) {
    let e = xf();
    if (e && e.length > 0) return;
    let t = process.cwd(),
      n;
    try {
      n = ut.relative(t, i).replace(/\\/g, `/`);
    } catch {
      n = i;
    }
    console.warn(`${$} handleCallback() in ${n} has no matching experimentalTriggers in vercel.json. This handler won't receive messages.

Add a trigger to vercel.json:
  "${n}": {
    "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "your-topic" }]
  }`);
  }
}
function Ff(e) {
  let t = Mf(),
    n = [];
  for (let [r, i] of t) (r.includes(`*`) ? sf(e, r) : r === e) && n.push(...i);
  return n;
}
var If = 50,
  Lf = 5e3,
  Rf = 2,
  zf = 250,
  Bf = [
    `PORT`,
    `NEXT_PORT`,
    `NEXTJS_PORT`,
    `NUXT_PORT`,
    `NITRO_PORT`,
    `SVELTEKIT_PORT`,
    `VITE_PORT`,
    `DEV_PORT`,
    `npm_config_port`,
  ],
  Vf = [`__NEXT_PRIVATE_ORIGIN`, `NUXT_PUBLIC_SITE_URL`, `URL`];
function Hf(e) {
  return e instanceof Error ? e.message : String(e);
}
function Uf(e) {
  return e instanceof Fd || (e instanceof Error && e.name === `MessageNotFoundError`);
}
function Wf(e) {
  if (!e) return null;
  let t = Number.parseInt(e, 10);
  return !Number.isFinite(t) || t < 1 || t > 65535 ? null : t;
}
function Gf(e) {
  if (!e) return null;
  try {
    let t = new URL(e).port;
    return Wf(t);
  } catch {
    return null;
  }
}
function Kf() {
  let e = [],
    t = new Set(),
    n = (n) => {
      n && !t.has(n) && (t.add(n), e.push(n));
    };
  for (let e of Bf) n(Wf(process.env[e]));
  for (let e of Vf) n(Gf(process.env[e]));
  return e;
}
function qf(e) {
  return new Promise((t) => {
    let n = pt.connect({ host: `localhost`, port: e }),
      r = !1,
      i = (e) => {
        r || ((r = !0), n.destroy(), t(e));
      };
    (n.once(`connect`, () => i(!0)), n.once(`error`, () => i(!1)), n.setTimeout(zf, () => i(!1)));
  });
}
async function Jf(e, t, n) {
  let r = 0,
    i = If;
  for (;;)
    try {
      await mf(e, t, n);
      return;
    } catch (e) {
      if (Uf(e) && r < Lf) {
        (await new Promise((e) => setTimeout(e, i)), (r += i), (i = Math.min(i * Rf, Lf - r)));
        continue;
      }
      throw e;
    }
}
function Yf(e) {
  let t = e
    .replace(/^src\/app\//, `/`)
    .replace(/^src\/pages\//, `/`)
    .replace(/^src\/server\//, `/`)
    .replace(/^src\/routes\//, `/`)
    .replace(/^app\//, `/`)
    .replace(/^pages\//, `/`)
    .replace(/^server\//, `/`)
    .replace(/\/route\.(ts|mts|js|mjs|tsx|jsx)$/, ``)
    .replace(/\/\+server\.(ts|mts|js|mjs|tsx|jsx)$/, ``)
    .replace(/\.(ts|mts|js|mjs|tsx|jsx)$/, ``);
  return (t.startsWith(`/`) || (t = `/` + t), t);
}
async function Xf(e, t = {}) {
  let n = {
      triedPorts: Kf(),
      listeningPorts: [],
      unavailablePorts: [],
      importFailures: [],
      primeFailures: [],
    },
    r = Sf(e);
  if (r.length === 0) return n;
  let i = t.refreshRegistered === !0;
  for (let e of n.triedPorts) (await qf(e)) ? n.listeningPorts.push(e) : n.unavailablePorts.push(e);
  for (let t of r) {
    let r = Qf(e, t.consumer);
    if (!(r && !i)) {
      if (!r) {
        let r = ut.resolve(process.cwd(), t.filePath);
        try {
          await import(r);
        } catch (e) {
          n.importFailures.push({ filePath: t.filePath, reason: Hf(e) });
        }
        if (Qf(e, t.consumer)) continue;
      }
      for (let r of n.listeningPorts) {
        let i = `http://localhost:${r}${Yf(t.filePath)}`;
        try {
          let r = await fetch(i, {
            method: `POST`,
            headers: { "x-vercel-queue-prime": `1`, "x-vercel-queue-prime-file": t.filePath },
          });
          try {
            await r.text();
          } catch {}
          if (Qf(e, t.consumer)) break;
          n.primeFailures.push({
            filePath: t.filePath,
            url: i,
            reason: `HTTP ${r.status}${r.statusText ? ` ${r.statusText}` : ``}`.trim(),
          });
        } catch (e) {
          n.primeFailures.push({ filePath: t.filePath, url: i, reason: Hf(e) });
        }
      }
    }
  }
  return n;
}
function Zf(e, t, n) {
  let r = t.map((e) => e.filePath),
    i = n.listeningPorts[0] ?? n.triedPorts[0],
    a = i ? t.map((e) => `http://localhost:${i}${Yf(e.filePath)}`) : [],
    o;
  if (n.triedPorts.length === 0)
    o = `No local dev port detected from env. Set PORT (or NEXT_PORT/NUXT_PORT/VITE_PORT).`;
  else if (n.listeningPorts.length === 0)
    o = `Detected env ports: [${n.triedPorts.join(`, `)}], but none are listening.`;
  else {
    let e =
      n.unavailablePorts.length > 0 ? ` Not listening: [${n.unavailablePorts.join(`, `)}].` : ``;
    o =
      `Detected env ports: [${n.triedPorts.join(`, `)}]. Listening: [${n.listeningPorts.join(`, `)}].` +
      e;
  }
  let s =
      n.importFailures.length > 0
        ? `
Import failures: ` +
          n.importFailures
            .slice(0, 2)
            .map((e) => `${e.filePath} (${e.reason})`)
            .join(`; `)
        : ``,
    c =
      n.primeFailures.length > 0
        ? `
Prime failures: ` +
          n.primeFailures
            .slice(0, 3)
            .map((e) => `${e.url} (${e.reason})`)
            .join(`; `)
        : ``;
  return (
    `${$} No registered handler for topic "${e}". vercel.json maps this topic to [${r.join(`, `)}] but auto-loading failed.
${o}${s}${c}
Ensure your dev server is running, set PORT if needed, and confirm mapped route files call handleCallback()/handleNodeCallback() at module scope.
` +
    (a.length > 0
      ? `Try opening: ${a.join(` or `)}`
      : `Set PORT (or NEXT_PORT/NUXT_PORT/VITE_PORT) and try sending again.`)
  );
}
function Qf(e, t) {
  return Ff(e).some((e) => e.consumerGroup === t);
}
var $f = 10,
  ep = 2,
  tp = 10,
  np = 86400;
function rp(e, t) {
  let n = Math.min(Math.max(t, 0), $f);
  (console.log(
    `${$} ${_f} Scheduling re-delivery in ${n}s: topic="${e.topicName}" consumer="${e.consumerGroup}" messageId="${e.messageId}"`,
  ),
    setTimeout(async () => {
      let t = e.deliveryCount + 1,
        n = new Date(e.createdAt.getTime() + e.retentionSeconds * 1e3);
      if (Date.now() >= n.getTime()) {
        console.log(
          `${$} Message expired, stopping retries: topic="${e.topicName}" messageId="${e.messageId}"`,
        );
        return;
      }
      if (t > tp) {
        console.log(
          `${$} Max re-deliveries (${tp}) reached: topic="${e.topicName}" messageId="${e.messageId}"`,
        );
        return;
      }
      let r = {
        messageId: e.messageId,
        deliveryCount: t,
        createdAt: e.createdAt,
        expiresAt: n,
        topicName: e.topicName,
        consumerGroup: e.consumerGroup,
        region: e.region,
      };
      console.log(
        `${$} Re-delivering: topic="${e.topicName}" consumer="${e.consumerGroup}" messageId="${e.messageId}" deliveryCount=${t}`,
      );
      let i = !0,
        a = null,
        o = !1;
      try {
        await e.handler(e.payload, r);
      } catch (t) {
        if (((i = !1), e.retry)) {
          let n;
          try {
            n = e.retry(t, r);
          } catch (e) {
            console.warn(`${$} retry handler threw:`, e);
          }
          n && `afterSeconds` in n ? (a = n.afterSeconds) : n && `acknowledge` in n && (o = !0);
        }
        o ||
          console.error(
            `${$} ${gf} Handler error on re-delivery: topic="${e.topicName}" messageId="${e.messageId}"`,
            t,
          );
      }
      if (i)
        console.log(
          `${$} ${hf} Message processed on re-delivery: topic="${e.topicName}" consumer="${e.consumerGroup}" messageId="${e.messageId}"`,
        );
      else if (o)
        console.log(
          `${$} ${hf} Message acknowledged (will not retry): topic="${e.topicName}" consumer="${e.consumerGroup}" messageId="${e.messageId}"`,
        );
      else {
        let n = a ?? e.defaultRetryDelayS;
        rp({ ...e, deliveryCount: t }, n);
      }
    }, n * 1e3));
}
function ip(e, t, n, r, i) {
  if (r && r > 0) {
    (console.log(`${$} Message sent with delay: topic="${e}" messageId="${t}" delay=${r}s`),
      setTimeout(() => {
        ip(e, t, n, void 0, i);
      }, r * 1e3));
    return;
  }
  (console.log(`${$} Message sent: topic="${e}" messageId="${t}"`),
    (async () => {
      let r = Ff(e),
        a = null;
      if (
        (r.length > 0
          ? (await Xf(e, { refreshRegistered: !0 }), (r = Ff(e)))
          : ((a = await Xf(e)), (r = Ff(e))),
        r.length === 0)
      ) {
        let t = Sf(e);
        if (t.length > 0) {
          let n = a ?? {
            triedPorts: Kf(),
            listeningPorts: [],
            unavailablePorts: [],
            importFailures: [],
            primeFailures: [],
          };
          console.warn(Zf(e, t, n));
        } else
          console.warn(`${$} No registered handler for topic "${e}".
Ensure vercel.json has a matching experimentalTriggers entry and the route file calls handleCallback().`);
        return;
      }
      let o = r.map((e) => e.consumerGroup);
      console.log(
        `${$} Invoking handlers for topic="${e}" messageId="${t}" \u2192 consumers: [${o.join(`, `)}]`,
      );
      let s = i ?? np;
      for (let i of r) {
        let r,
          a = new Date(),
          o = 1,
          c = !0,
          l = null,
          u = !1,
          d = async (e, t) => {
            ((r = e), (a = t.createdAt), (o = t.deliveryCount));
            try {
              await i.handler(e, t);
            } catch (e) {
              throw ((c = !1), e);
            }
          },
          f = i.options?.retry
            ? (e, t) => {
                let n = i.options.retry(e, t);
                return (
                  n && `afterSeconds` in n
                    ? (l = n.afterSeconds)
                    : n && `acknowledge` in n && (u = !0),
                  n
                );
              }
            : void 0,
          p = { queueName: e, consumerGroup: i.consumerGroup, messageId: t, region: n },
          m = {
            client: i.client,
            visibilityTimeoutSeconds: i.options?.visibilityTimeoutSeconds,
            retry: f,
          },
          h = Math.min(Cf(e, i.consumerGroup) ?? ep, $f),
          g = () => ({
            handler: i.handler,
            retry: i.options?.retry,
            payload: r,
            topicName: e,
            consumerGroup: i.consumerGroup,
            messageId: t,
            region: n,
            createdAt: a,
            retentionSeconds: s,
            deliveryCount: o,
            defaultRetryDelayS: h,
          });
        try {
          if ((await Jf(d, p, m), c))
            console.log(
              `${$} ${hf} Message processed: topic="${e}" consumer="${i.consumerGroup}" messageId="${t}"`,
            );
          else if (u)
            console.log(
              `${$} ${hf} Message acknowledged (will not retry): topic="${e}" consumer="${i.consumerGroup}" messageId="${t}"`,
            );
          else if (l !== null) {
            let e = Math.min(l, $f);
            rp(g(), e);
          }
        } catch (n) {
          (console.error(
            `${$} ${gf} Handler failed: topic="${e}" consumer="${i.consumerGroup}" messageId="${t}"`,
            n,
          ),
            c || rp(g(), h));
        }
      }
    })());
}
function ap() {
  let e = globalThis;
  (delete e[yf], delete e[jf]);
}
(process.env.NODE_ENV === `test` || process.env.VITEST) &&
  ((globalThis.__clearDevState = ap),
  (globalThis.__filePathToConsumerGroup = bf),
  (globalThis.__filePathToUrlPath = Yf),
  (globalThis.__matchesFunctionsPattern = Tf),
  (globalThis.__stripSrcPrefix = wf));
function op(e, t) {
  let n = { ...e?.metadata, ...t?.metadata };
  return {
    isEnabled: t?.isEnabled ?? e?.isEnabled ?? !0,
    tracer: e?.tracer,
    metadata: Object.keys(n).length > 0 ? n : void 0,
  };
}
var sp;
function cp() {
  return (
    (sp ||= import(`../../_chunks/workflow/src-D1EltLDA.js`)
      .then((e) => n(e.t(), 1))
      .then(
        (e) => e,
        () => null,
      )),
    sp
  );
}
function lp() {
  let e = process.env.VERCEL_QUEUE_TRACE_PROPAGATION?.toLowerCase();
  return e === `off` || e === `0` || e === `false`;
}
var up = [`traceparent`, `tracestate`, `baggage`];
async function dp(e, t) {
  if (lp() || (t && !t.isEnabled)) return;
  let n = await cp();
  if (n)
    try {
      let t = {};
      n.propagation.inject(n.context.active(), t);
      for (let n of up) {
        let r = t[n];
        r !== void 0 && e.set(n, r);
      }
    } catch {}
}
function fp(e, t, n) {
  try {
    t.setStatus({
      code: e.SpanStatusCode.ERROR,
      message: n instanceof Error ? n.message : String(n),
    });
  } catch {}
}
function pp(e) {
  try {
    e.end();
  } catch {}
}
async function mp(e, t, n) {
  if (lp() || (n && !n.isEnabled)) return t(null);
  let r = await cp();
  if (!r) return t(null);
  let i = null;
  try {
    let t = n?.tracer ?? r.trace.getTracer(`@vercel/queue`),
      a = { "messaging.system": `vercel-queue`, "messaging.destination.name": e };
    if (n?.metadata) for (let [e, t] of Object.entries(n.metadata)) a[`vqs.metadata.${e}`] = t;
    let o = t.startSpan(`vqs.send`, { kind: r.SpanKind.PRODUCER, attributes: a });
    i = { span: o, ctx: r.trace.setSpan(r.context.active(), o) };
  } catch {}
  if (!i) return t(null);
  let { span: a, ctx: o } = i;
  try {
    return await r.context.with(o, () =>
      t({
        setMessageId(e) {
          try {
            a.setAttribute(`messaging.message.id`, e);
          } catch {}
        },
      }),
    );
  } catch (e) {
    throw (fp(r, a, e), e);
  } finally {
    pp(a);
  }
}
var hp = `x-vercel-queue-traceparent`,
  gp = `x-vercel-queue-tracestate`,
  _p = `x-vercel-queue-baggage`;
async function vp(e, t, n) {
  if (lp() || (n && !n.isEnabled)) return t();
  let r = await cp();
  if (!r) return t();
  let i = null;
  try {
    let t = yp(r, bp(e)),
      a = n?.tracer ?? r.trace.getTracer(`@vercel/queue`),
      o = { "messaging.system": `vercel-queue`, "messaging.operation": `process` };
    if (n?.metadata) for (let [e, t] of Object.entries(n.metadata)) o[`vqs.metadata.${e}`] = t;
    let s = a.startSpan(`vqs.process`, { kind: r.SpanKind.CONSUMER, attributes: o, links: t });
    i = { span: s, ctx: r.trace.setSpan(r.context.active(), s) };
  } catch {}
  if (!i) return t();
  let { span: a, ctx: o } = i;
  try {
    return await r.context.with(o, t);
  } catch (e) {
    throw (fp(r, a, e), e);
  } finally {
    pp(a);
  }
}
function yp(e, t) {
  let n = t[hp];
  if (!n) return [];
  let r = { traceparent: n },
    i = t[gp];
  i && (r.tracestate = i);
  let a = t[_p];
  a && (r.baggage = a);
  let o = e.propagation.extract(e.ROOT_CONTEXT, r),
    s = e.trace.getSpanContext(o);
  return !s || !e.trace.isSpanContextValid(s) ? [] : [{ context: s }];
}
function bp(e) {
  let t = {};
  if (e instanceof Headers)
    return (
      e.forEach((e, n) => {
        t[n.toLowerCase()] = e;
      }),
      t
    );
  for (let [n, r] of Object.entries(e)) {
    let e = Array.isArray(r) ? r[0] : r;
    e !== void 0 && (t[n.toLowerCase()] = e);
  }
  return t;
}
function xp() {
  return process.env.VERCEL_QUEUE_DEBUG === `1` || process.env.VERCEL_QUEUE_DEBUG === `true`;
}
async function Sp(e) {
  let t = e.getReader();
  try {
    for (;;) {
      let { done: e } = await t.read();
      if (e) break;
    }
  } finally {
    t.releaseLock();
  }
}
function Cp(e) {
  if (!e) return;
  let t = Number(e);
  if (Number.isFinite(t) && t >= 0) return t;
  let n = Date.parse(e);
  if (!Number.isNaN(n)) return Math.max(0, (n - Date.now()) / 1e3);
}
function wp(e, t, n, r, i = `Invalid parameters`, a) {
  throw e === 400
    ? new Vd(n || i)
    : e === 429
      ? new Rd(n || `Too many requests: ${r}`, Cp(a))
      : e === 401
        ? new zd(n || void 0)
        : e === 403
          ? new Bd(n || void 0)
          : e >= 500
            ? new Hd(n || `Server error: ${e} ${t}`)
            : Error(`Failed to ${r}: ${e} ${t}`);
}
function Tp(e) {
  let t = e.get(`Vqs-Message-Id`),
    n = e.get(`Vqs-Delivery-Count`) || `0`,
    r = e.get(`Vqs-Timestamp`),
    i = e.get(`Content-Type`) || `application/octet-stream`,
    a = e.get(`Vqs-Receipt-Handle`),
    o = e.get(`Vqs-Expires-At`);
  if (!t || !r || !a) return null;
  let s = parseInt(n, 10);
  return Number.isNaN(s)
    ? null
    : {
        messageId: t,
        deliveryCount: s,
        createdAt: new Date(r),
        expiresAt: o ? new Date(o) : void 0,
        contentType: i,
        receiptHandle: a,
      };
}
var Ep = /^[a-z]{2,5}[0-9]{1,2}$/;
function Dp(e) {
  if (!Ep.test(e))
    throw Error(
      `Invalid region code: ${JSON.stringify(e)}. Region must match the pattern /^[a-z]{2,5}[0-9]{1,2}$/ (e.g. "iad1", "lhr1").`,
    );
}
var Op = (e) => new URL(`https://${e}.vercel-queue.com`);
function kp(e, t) {
  return (t ?? Op)(e);
}
var Ap = `/api/v3/topic`,
  jp = class e {
    baseUrl;
    customHeaders;
    providedToken;
    resolvedDeploymentId;
    pinSends;
    explicitlyUnpinned;
    transport;
    region;
    baseUrlResolver;
    dispatcher;
    telemetry;
    constructor(e) {
      (Dp(e.region),
        (this.region = e.region),
        (this.baseUrlResolver = e.resolveBaseUrl),
        (this.baseUrl = kp(this.region, this.baseUrlResolver)),
        (this.customHeaders = e.headers || {}),
        (this.providedToken = e.token),
        (this.transport = e.transport || new Pd()),
        (this.dispatcher = e.dispatcher),
        (this.telemetry = e.telemetry),
        e.deploymentId === null
          ? ((this.pinSends = !1), (this.explicitlyUnpinned = !0))
          : ((this.resolvedDeploymentId = e.deploymentId || process.env.VERCEL_DEPLOYMENT_ID),
            (this.pinSends = !0),
            (this.explicitlyUnpinned = !1)));
    }
    withRegion(t) {
      return new e({
        region: t,
        resolveBaseUrl: this.baseUrlResolver,
        token: this.providedToken,
        headers: { ...this.customHeaders },
        deploymentId: this.explicitlyUnpinned ? null : this.resolvedDeploymentId,
        transport: this.transport,
        dispatcher: this.dispatcher,
        telemetry: this.telemetry,
      });
    }
    getRegion() {
      return this.region;
    }
    getTransport() {
      return this.transport;
    }
    getTelemetry() {
      return this.telemetry;
    }
    requireDeploymentId() {
      if (!(vf() || this.explicitlyUnpinned || this.resolvedDeploymentId))
        throw Error(`No deployment ID available. VERCEL_DEPLOYMENT_ID is not set.

This usually means the code is running outside a Vercel deployment (e.g. during build or in a non-Vercel environment).

To fix this, create a client with an explicit deploymentId:
  new QueueClient({ deploymentId: "dpl_xxx" })
Or explicitly opt out of deployment pinning:
  new QueueClient({ deploymentId: null })`);
    }
    getSendDeploymentId() {
      if (!vf())
        return (this.requireDeploymentId(), this.pinSends ? this.resolvedDeploymentId : void 0);
    }
    getConsumeDeploymentId() {
      if (!vf()) return (this.requireDeploymentId(), this.resolvedDeploymentId);
    }
    async getToken() {
      if (this.providedToken) return this.providedToken;
      try {
        return await (0, Md.getVercelOidcToken)();
      } catch (e) {
        let t = e instanceof Error ? e.message : String(e);
        throw Error(
          vf()
            ? `Failed to get OIDC token for local development.

To fix this, pull your environment variables with Vercel CLI:
  \`vercel env pull\`

Cause: ${t}`
            : `Failed to get OIDC token. This usually means the function is running outside of a Vercel Function environment.

To fix this, either:
  - Deploy to Vercel (OIDC tokens are provisioned automatically)
  - Provide a token explicitly: \`new QueueClient({ token: '...' })\`

Cause: ${t}`,
        );
      }
    }
    buildUrl(e, ...t) {
      let n = encodeURIComponent(e),
        r = t.map((e) => encodeURIComponent(e)),
        i = r.length > 0 ? `/` + r.join(`/`) : ``,
        a = this.baseUrl.pathname.replace(/\/+$/, ``);
      return `${this.baseUrl.origin}${a}${Ap}/${n}${i}`;
    }
    async fetch(e, t) {
      let n = t.method || `GET`;
      if (xp()) {
        let r = { method: n, url: e, headers: t.headers },
          i = t.body;
        (i != null &&
          (i instanceof ArrayBuffer || i instanceof Uint8Array
            ? (r.bodySize = i.byteLength)
            : typeof i == `string`
              ? (r.bodySize = i.length)
              : (r.bodyType = typeof i)),
          console.debug(`[VQS Debug] Request:`, JSON.stringify(r, null, 2)));
      }
      (t.headers.set(`User-Agent`, `@vercel/queue/0.4.0`),
        t.headers.set(`Vqs-Client-Ts`, new Date().toISOString()));
      let r = this.dispatcher ? { ...t, dispatcher: this.dispatcher } : t,
        i = await fetch(e, r);
      if (xp()) {
        let t = {
          method: n,
          url: e,
          status: i.status,
          statusText: i.statusText,
          headers: i.headers,
        };
        console.debug(`[VQS Debug] Response:`, JSON.stringify(t, null, 2));
      }
      return i;
    }
    async sendMessage(e) {
      let t = this.transport,
        {
          queueName: n,
          payload: r,
          idempotencyKey: i,
          retentionSeconds: a,
          delaySeconds: o,
          headers: s,
          telemetry: c,
        } = e,
        l = new Headers();
      if (this.customHeaders) for (let [e, t] of Object.entries(this.customHeaders)) l.append(e, t);
      if (s) {
        let e = new Set([`authorization`, `content-type`]),
          t = (t) => {
            let n = t.toLowerCase();
            return e.has(n) ? !0 : n.startsWith(`vqs-`);
          };
        for (let [e, n] of Object.entries(s)) !t(e) && n !== void 0 && l.append(e, n);
      }
      (l.set(`Authorization`, `Bearer ${await this.getToken()}`),
        l.set(`Content-Type`, t.contentType));
      let u = this.getSendDeploymentId();
      (u && l.set(`Vqs-Deployment-Id`, u),
        i && l.set(`Vqs-Idempotency-Key`, i),
        a !== void 0 && l.set(`Vqs-Retention-Seconds`, a.toString()),
        o !== void 0 && l.set(`Vqs-Delay-Seconds`, o.toString()));
      let d = t.serialize(r),
        f = Buffer.isBuffer(d) ? new Uint8Array(d) : d,
        p = op(this.telemetry, c);
      return mp(
        n,
        async (e) => {
          await dp(l, p);
          let t = await this.fetch(this.buildUrl(n), { method: `POST`, body: f, headers: l });
          if (!t.ok) {
            let e = await t.text();
            if (t.status === 409) throw new Gd(e || `Duplicate idempotency key detected`, i);
            if (t.status === 502) throw new Kd(e || `Consumer discovery failed`, u);
            if (t.status === 503) throw new qd(e || `Consumer registry not configured`);
            wp(t.status, t.statusText, e, `send message`);
          }
          if (t.status === 202) return (await t.text(), { messageId: null });
          let r = await t.json();
          return (e && r.messageId && e.setMessageId(r.messageId), r);
        },
        p,
      );
    }
    async *receiveMessages(e) {
      let t = this.transport,
        { queueName: n, consumerGroup: r, visibilityTimeoutSeconds: i, limit: a } = e;
      if (a !== void 0 && (a < 1 || a > 10)) throw new Ud(a);
      let o = new Headers({
        Authorization: `Bearer ${await this.getToken()}`,
        Accept: `multipart/mixed`,
        ...this.customHeaders,
      });
      (i !== void 0 && o.set(`Vqs-Visibility-Timeout-Seconds`, i.toString()),
        a !== void 0 && o.set(`Vqs-Max-Messages`, a.toString()));
      let s = this.getConsumeDeploymentId();
      s && o.set(`Vqs-Deployment-Id`, s);
      let c = await this.fetch(this.buildUrl(n, `consumer`, r), { method: `POST`, headers: o });
      if (c.status === 204) {
        await c.text();
        return;
      }
      if (!c.ok) {
        let e = await c.text();
        wp(c.status, c.statusText, e, `receive messages`);
      }
      for await (let e of ta(c))
        try {
          let n = Tp(e.headers);
          if (!n) {
            (console.warn(`Missing required queue headers in multipart part`), await Sp(e.payload));
            continue;
          }
          let r = await t.deserialize(e.payload);
          yield { ...n, payload: r };
        } catch (t) {
          (console.warn(`Failed to process multipart message:`, t), await Sp(e.payload));
        }
    }
    async receiveMessageById(e) {
      let t = this.transport,
        { queueName: n, consumerGroup: r, messageId: i, visibilityTimeoutSeconds: a } = e,
        o = new Headers({
          Authorization: `Bearer ${await this.getToken()}`,
          Accept: `multipart/mixed`,
          ...this.customHeaders,
        });
      a !== void 0 && o.set(`Vqs-Visibility-Timeout-Seconds`, a.toString());
      let s = this.getConsumeDeploymentId();
      s && o.set(`Vqs-Deployment-Id`, s);
      let c = await this.fetch(this.buildUrl(n, `consumer`, r, `id`, i), {
        method: `POST`,
        headers: o,
      });
      if (!c.ok) {
        let e = await c.text();
        if (c.status === 404) throw new Fd(i);
        if (c.status === 409) {
          let t = {};
          try {
            t = JSON.parse(e);
          } catch {}
          throw t.originalMessageId
            ? new Id(
                i,
                `This message was a duplicate - use originalMessageId: ${t.originalMessageId}`,
              )
            : new Id(i);
        }
        if (c.status === 410) throw new Wd(i);
        wp(c.status, c.statusText, e, `receive message by ID`);
      }
      for await (let e of ta(c)) {
        let n = Tp(e.headers);
        if (!n)
          throw (await Sp(e.payload), new Ld(i, `Missing required queue headers in response`));
        let r = await t.deserialize(e.payload);
        return { message: { ...n, payload: r } };
      }
      throw new Fd(i);
    }
    async acknowledgeMessage(e) {
      let { queueName: t, consumerGroup: n, receiptHandle: r } = e,
        i = new Headers({
          Authorization: `Bearer ${await this.getToken()}`,
          ...this.customHeaders,
        }),
        a = this.getConsumeDeploymentId();
      a && i.set(`Vqs-Deployment-Id`, a);
      let o = await this.fetch(this.buildUrl(t, `consumer`, n, `lease`, r), {
        method: `DELETE`,
        headers: i,
      });
      if (!o.ok) {
        let e = await o.text();
        if (o.status === 404) throw new Fd(r);
        if (o.status === 409)
          throw new Id(
            r,
            e || `Invalid receipt handle, message not in correct state, or already processed`,
          );
        wp(
          o.status,
          o.statusText,
          e,
          `acknowledge message`,
          `Missing or invalid receipt handle`,
          o.headers?.get(`Retry-After`) ?? null,
        );
      }
      return (await o.text(), { acknowledged: !0 });
    }
    async changeVisibility(e) {
      let { queueName: t, consumerGroup: n, receiptHandle: r, visibilityTimeoutSeconds: i } = e,
        a = new Headers({
          Authorization: `Bearer ${await this.getToken()}`,
          "Content-Type": `application/json`,
          ...this.customHeaders,
        }),
        o = this.getConsumeDeploymentId();
      o && a.set(`Vqs-Deployment-Id`, o);
      let s = await this.fetch(this.buildUrl(t, `consumer`, n, `lease`, r), {
        method: `PATCH`,
        headers: a,
        body: JSON.stringify({ visibilityTimeoutSeconds: i }),
      });
      if (!s.ok) {
        let e = await s.text();
        if (s.status === 404) throw new Fd(r);
        if (s.status === 409)
          throw new Id(
            r,
            e || `Invalid receipt handle, message not in correct state, or already processed`,
          );
        wp(
          s.status,
          s.statusText,
          e,
          `change visibility`,
          `Missing receipt handle or invalid visibility timeout`,
          s.headers?.get(`Retry-After`) ?? null,
        );
      }
      return (await s.text(), { success: !0 });
    }
  },
  Mp = new WeakMap(),
  Np = Symbol.for(`@vercel/queue.apiClient`);
function Pp(e, t) {
  (Mp.set(e, t),
    Object.defineProperty(e, Np, { value: t, writable: !1, enumerable: !1, configurable: !1 }));
}
function Fp(e) {
  let t = Mp.get(e);
  if (t) return t;
  let n = e[Np];
  if (typeof n == `object` && n) {
    let t = n;
    return (Mp.set(e, t), t);
  }
  throw Error(
    `QueueClient not initialized. This may happen when multiple bundled copies of @vercel/queue are loaded in local dev.`,
  );
}
function Ip(e) {
  return `request` in e ? e.request : e;
}
function Lp(e) {
  return Fp(e);
}
var Rp = `iad1`;
function zp(e) {
  return (
    e ||
    process.env.VERCEL_REGION ||
    (vf() ||
      console.warn(
        `[QueueClient] Region not detected \u2014 defaulting to "${Rp}". On Vercel this is set automatically via VERCEL_REGION. To silence this warning, pass region explicitly: new QueueClient({ region: "iad1" })`,
      ),
    Rp)
  );
}
var Bp = class {
    constructor(e = {}) {
      let t = zp(e.region);
      Pp(this, new jp({ ...e, region: t }));
    }
    send = async (e, t, n) => {
      let r = Fp(this),
        i = await r.sendMessage({
          queueName: e,
          payload: t,
          idempotencyKey: n?.idempotencyKey,
          retentionSeconds: n?.retentionSeconds,
          delaySeconds: n?.delaySeconds,
          headers: n?.headers,
          telemetry: n?.telemetry,
        });
      return (
        i.messageId &&
          vf() &&
          ip(e, i.messageId, r.getRegion(), n?.delaySeconds, n?.retentionSeconds),
        { messageId: i.messageId }
      );
    };
    handleCallback = (e, t) => {
      vf() && Pf(e, this, t);
      let n = op(Fp(this).getTelemetry?.());
      return async (r) => {
        let i = Ip(r);
        if (vf() && i.headers.get(`x-vercel-queue-prime`) === `1`) {
          let n = i.headers.get(`x-vercel-queue-prime-file`);
          return (n && Pf(e, this, t, n), Response.json({ status: `primed` }));
        }
        try {
          let r = await pf(i);
          return (
            await vp(
              i.headers,
              () =>
                mf(e, r, {
                  client: this,
                  visibilityTimeoutSeconds: t?.visibilityTimeoutSeconds,
                  retry: t?.retry,
                }),
              n,
            ),
            Response.json({ status: `success` })
          );
        } catch (e) {
          return (
            console.error(`Queue callback error:`, e),
            e instanceof Error &&
            (e.message.includes(`Invalid content type`) ||
              e.message.includes(`Invalid CloudEvent`) ||
              e.message.includes(`Missing required CloudEvent`) ||
              e.message.includes(`Failed to parse CloudEvent`) ||
              e.message.includes(`Binary mode callback`))
              ? Response.json({ error: e.message }, { status: 400 })
              : Response.json({ error: `Failed to process queue message` }, { status: 500 })
          );
        }
      };
    };
    handleNodeCallback = (e, t) => {
      vf() && Pf(e, this, t);
      let n = op(Fp(this).getTelemetry?.());
      return async (r, i) => {
        if (r.method !== `POST`) {
          i.status(200).end();
          return;
        }
        let a = r.headers[`x-vercel-queue-prime`];
        if (vf() && a === `1`) {
          let n = r.headers[`x-vercel-queue-prime-file`],
            a = Array.isArray(n) ? n[0] : n;
          (a && Pf(e, this, t, a), i.status(200).json({ status: `primed` }));
          return;
        }
        try {
          let a = ff(r.body, r.headers);
          (await vp(
            r.headers,
            () =>
              mf(e, a, {
                client: this,
                visibilityTimeoutSeconds: t?.visibilityTimeoutSeconds,
                retry: t?.retry,
              }),
            n,
          ),
            i.status(200).json({ status: `success` }));
        } catch (e) {
          if (
            (console.error(`Queue callback error:`, e),
            e instanceof Error &&
              (e.message.includes(`Invalid content type`) ||
                e.message.includes(`Invalid CloudEvent`) ||
                e.message.includes(`Missing required CloudEvent`) ||
                e.message.includes(`Failed to parse CloudEvent`) ||
                e.message.includes(`Binary mode callback`)))
          ) {
            i.status(400).json({ error: e.message });
            return;
          }
          i.status(500).json({ error: `Failed to process queue message` });
        }
      };
    };
  },
  Vp = class {
    contentType = `application/cbor`;
    serialize(e) {
      return Buffer.from(Jn(e));
    }
    async deserialize(e) {
      let t = [],
        n = e.getReader();
      for (;;) {
        let { done: e, value: r } = await n.read();
        if (e) break;
        r && t.push(r);
      }
      return xn(Buffer.concat(t));
    }
  },
  Hp = class {
    contentType = `application/json`;
    serialize(e) {
      return Buffer.from(JSON.stringify(e));
    }
    async deserialize(e) {
      let t = [],
        n = e.getReader();
      for (;;) {
        let { done: e, value: r } = await n.read();
        if (e) break;
        r && t.push(r);
      }
      return JSON.parse(Buffer.concat(t).toString());
    }
  },
  Up = class {
    contentType = `application/cbor`;
    serialize(e) {
      return Buffer.from(Jn(e));
    }
    async deserialize(e) {
      let t = [],
        n = e.getReader();
      for (;;) {
        let { done: e, value: r } = await n.read();
        if (e) break;
        r && t.push(r);
      }
      let r = Buffer.concat(t);
      try {
        return xn(r);
      } catch {
        return JSON.parse(r.toString());
      }
    }
  };
const Wp = new at(),
  Gp = le({ payload: pe, queueName: ce, deploymentId: ge().optional() }),
  Kp = Number(process.env.VERCEL_QUEUE_MAX_DELAY_SECONDS || 82800);
function qp(e) {
  let t = Math.min(Math.max(1, 2 ** (e - 1)), 900),
    n = Math.floor(Math.random() * (Math.ceil(t * 0.25) + 1));
  return Math.max(1, t - n);
}
function Jp(e) {
  if (`runId` in e && typeof e.runId == `string`) return e.runId;
  if (`workflowRunId` in e && typeof e.workflowRunId == `string`) return e.workflowRunId;
}
function Yp(e) {
  if (!e) return;
  let t = e.startsWith(`wrun_`) ? e.slice(5) : e;
  try {
    let e = Me(t);
    return !e.tagged || e.regionId === De.unknown ? void 0 : (e.region ?? void 0);
  } catch {
    return;
  }
}
function Xp(e, t) {
  if (Ee(t?.region)) return t.region;
  let n = Yp(Jp(e));
  if (n) return n;
  let r = process.env.VERCEL_REGION;
  return Ee(r) ? r : `iad1`;
}
function Zp(e) {
  let t = {};
  return (
    `runId` in e && typeof e.runId == `string` && (t[`x-vercel-workflow-run-id`] = e.runId),
    `workflowRunId` in e &&
      typeof e.workflowRunId == `string` &&
      (t[`x-vercel-workflow-run-id`] = e.workflowRunId),
    `stepId` in e && typeof e.stepId == `string` && (t[`x-vercel-workflow-step-id`] = e.stepId),
    Object.keys(t).length > 0 ? t : void 0
  );
}
const Qp = /^__([a-z][a-z0-9]*_)?wkf_workflow_/;
let $p = !1;
function em() {
  return process.env.WORKFLOW_SEQUENTIAL_REPLAYS === `1`;
}
function tm(e, t) {
  return !em() || !Qp.test(e)
    ? e
    : ($p ||
        (($p = !0),
        console.warn(
          `[workflow] WORKFLOW_SEQUENTIAL_REPLAYS=1: routing flow messages to per-run queue topics`,
        )),
      `runId` in t && typeof t.runId == `string`
        ? `stepId` in t && typeof t.stepId == `string`
          ? `${e}_${t.runId}_${t.stepId}`
          : `${e}_${t.runId}`
        : `__healthCheck` in t && typeof t.correlationId == `string`
          ? `${e}_${t.correlationId}`
          : e);
}
function nm(e) {
  let { baseUrl: t, usingProxy: n } = xi(e),
    r = Si(e, { usingProxy: n }),
    i = new Vp(),
    a = new Hp(),
    o = new Up(),
    s = {
      dispatcher: _r(e),
      transport: o,
      ...(n && { resolveBaseUrl: () => new URL(`${t}/queues-proxy`), token: e?.token }),
      headers: Object.fromEntries(r.entries()),
    },
    c = async (e, t, r) => {
      let o = r?.deploymentId ?? process.env.VERCEL_DEPLOYMENT_ID;
      if (!o)
        throw Error(
          `No deploymentId provided and VERCEL_DEPLOYMENT_ID environment variable is not set. Queue messages require a deployment ID to route correctly. Either set VERCEL_DEPLOYMENT_ID or provide deploymentId in options.`,
        );
      let c = (r?.specVersion ?? 5) >= 3 ? i : a,
        l = Xp(t, r),
        u = new Bp({
          ...s,
          ...(n && { headers: { ...s.headers, "x-vercel-queue-region": l } }),
          region: l,
          deploymentId: o,
          transport: c,
        }),
        d = { payload: t, queueName: e, deploymentId: r?.deploymentId },
        f = tm(e, t).replace(/[^A-Za-z0-9-_]/g, `-`);
      try {
        let { messageId: e } = await u.send(f, d, {
          idempotencyKey: r?.idempotencyKey,
          delaySeconds: r?.delaySeconds,
          headers: { ...Zp(t), ...r?.headers },
        });
        return { messageId: e ? _e.parse(e) : null };
      } catch (e) {
        if (e instanceof Gd)
          return {
            messageId: _e.parse(
              `msg_duplicate_${e.idempotencyKey ?? r?.idempotencyKey ?? `unknown`}`,
            ),
          };
        throw e;
      }
    };
  return {
    queue: c,
    createQueueHandler: (e, t) => {
      let n = new Bp(s).handleCallback(
        async (e, n) => {
          if (!e || !n) return;
          let r = Wp.getStore(),
            { payload: i, queueName: a, deploymentId: o } = Gp.parse(e),
            s = await t(i, {
              queueName: a,
              messageId: _e.parse(n.messageId),
              attempt: n.deliveryCount,
              requestId: r,
            });
          typeof s?.timeoutSeconds == `number` &&
            (await c(a, i, {
              deploymentId: o,
              delaySeconds: s.timeoutSeconds > 0 ? Math.min(s.timeoutSeconds, Kp) : void 0,
            }));
        },
        {
          retry: (e, { messageId: t, deliveryCount: n }) => {
            let r = qp(n);
            return (
              console.error(
                `[workflow] Queue handler failed for message "${t}" on delivery attempt ${n}; retrying in ${r}s:`,
                e,
              ),
              { afterSeconds: r }
            );
          },
        },
      );
      return async (e) => {
        let t = e.headers.get(`x-vercel-id`)?.trim() || void 0;
        return Wp.run(t, () => n(e));
      };
    },
    getDeploymentId: async () => {
      let e = process.env.VERCEL_DEPLOYMENT_ID;
      if (!e) throw Error(`VERCEL_DEPLOYMENT_ID environment variable is not set`);
      return e;
    },
  };
}
const rm = le({ id: ge() });
function im(e) {
  return async function () {
    let t = process.env.VERCEL_DEPLOYMENT_ID;
    if (!t)
      throw Error(
        `Cannot resolve latest deployment: VERCEL_DEPLOYMENT_ID environment variable is not set`,
      );
    let n = await ci(e);
    if (!n)
      throw Error(`Cannot resolve latest deployment: no OIDC token or VERCEL_TOKEN available`);
    let r = await (
        await di({
          method: `GET`,
          url: `https://api.vercel.com/v1/workflow/resolve-latest-deployment/${encodeURIComponent(t)}`,
          headers: new Headers({ Authorization: `Bearer ${n}` }),
          dispatcher: _r(e),
          peerService: `vercel-api`,
          timeoutMs: null,
          buildError: async (e) => {
            let n;
            try {
              n = await e.text();
            } catch {
              n = `<unable to read response body>`;
            }
            return Error(
              `Failed to resolve latest deployment for ${t}: HTTP ${e.status} ${e.statusText}${n ? ` — ${n}` : ``}`,
            );
          },
        })
      ).json(),
      i = rm.safeParse(r);
    if (!i.success)
      throw Error(
        `Invalid response from Vercel API: expected { id: string }. Zod error: ${i.error.message}`,
      );
    return i.data.id;
  };
}
const am = {
    run_created: { retryable: !0, reason: `conditional create → 409 if exists` },
    step_created: { retryable: !0, reason: `conditional create → 409 if exists` },
    wait_created: { retryable: !0, reason: `conditional create → 409 if exists` },
    hook_created: { retryable: !0, reason: `transactional token uniqueness → 409 if exists` },
    run_started: { retryable: !0, reason: `early-returns if already running, no duplicate row` },
    run_completed: { retryable: !0, reason: `terminal-state guard → 409, no duplicate row` },
    run_failed: { retryable: !0, reason: `terminal-state guard → 409, no duplicate row` },
    run_cancelled: { retryable: !0, reason: `terminal-state guard → 409, no duplicate row` },
    step_completed: { retryable: !0, reason: `terminal-state guard → 409, no duplicate row` },
    step_failed: { retryable: !0, reason: `terminal-state guard → 409, no duplicate row` },
    wait_completed: { retryable: !0, reason: `waiting-state guard → 409, no duplicate row` },
    hook_disposed: { retryable: !0, reason: `conditional delete (exists) → 409, no duplicate row` },
    attr_set: {
      retryable: !0,
      reason: `correlationId constraint reuses eventId (idempotent replay)`,
    },
    step_started: {
      retryable: !1,
      reason: `unconditional attempt increment → a retry double-counts attempts`,
    },
    step_retrying: {
      retryable: !1,
      reason: `no duplicate guard → a retry appends a second event row`,
    },
    hook_received: {
      retryable: !1,
      reason: `no server guard → a retry duplicates the row / re-delivers payload`,
    },
    hook_conflict: { retryable: !1, reason: `server-originated; never POSTed by the SDK` },
  },
  om = new Set([
    `ECONNRESET`,
    `ECONNREFUSED`,
    `ENOTFOUND`,
    `ENETDOWN`,
    `ENETUNREACH`,
    `EHOSTDOWN`,
    `EHOSTUNREACH`,
    `EPIPE`,
    `ETIMEDOUT`,
    `UND_ERR_SOCKET`,
    `UND_ERR_REQ_RETRY`,
    `UND_ERR_CONNECT_TIMEOUT`,
    `UND_ERR_HEADERS_TIMEOUT`,
    `UND_ERR_BODY_TIMEOUT`,
    `TimeoutError`,
    `RequestRetryError`,
  ]);
function sm(e, t = 0) {
  if (t > 5 || typeof e != `object` || !e) return [];
  let n = [],
    r = e;
  return (
    typeof r.code == `string` && n.push(r.code),
    typeof r.name == `string` && n.push(r.name),
    r.cause && n.push(...sm(r.cause, t + 1)),
    n
  );
}
function cm(e) {
  if (f.is(e) || l.is(e) || s.is(e) || u.is(e)) return !1;
  if (a.is(e)) {
    if (e.code === `PARSE_ERROR`) return !0;
    if (typeof e.status == `number`) return e.status >= 500 && e.status <= 599;
  }
  return sm(e).some((e) => om.has(e));
}
const lm = (e) => new Promise((t) => setTimeout(t, e)),
  um =
    typeof process < `u` &&
    typeof process.env.DEBUG == `string` &&
    (process.env.DEBUG.includes(`workflow:`) || process.env.DEBUG === `*`);
function dm(e, t) {
  if (!um) return;
  let n = Object.entries(t)
    .map(([e, t]) => `${e}=${t}`)
    .join(` `);
  console.debug(`[workflow:world-vercel:event-retry] ${e} ${n}`);
}
function fm(e) {
  return a.is(e)
    ? (e.code ?? (e.status == null ? e.name : `status_${e.status}`))
    : (sm(e)[0] ?? (e instanceof Error ? e.name : `unknown`));
}
async function pm(e, t) {
  let n = am[t]?.retryable ?? !1;
  for (let r = 0; ; r++)
    try {
      return await e();
    } catch (e) {
      let i = n && cm(e);
      if (i && r < 2) {
        let n = 100 * 2 ** r + Math.floor(Math.random() * 50);
        (dm(`retrying event POST after transient failure`, {
          eventType: t,
          attempt: r + 1,
          backoffMs: n,
          error: fm(e),
        }),
          await lm(n));
        continue;
      }
      throw (
        i &&
          dm(`exhausted in-process retries; surfacing for queue redelivery`, {
            eventType: t,
            attempts: r + 1,
            error: fm(e),
          }),
        e
      );
    }
}
const mm = `application/vnd.workflow.v4-frames`;
function hm(e, t) {
  let n = new Uint8Array(Jn(e)),
    r = new Uint8Array(4 + n.byteLength + 4 + t.byteLength),
    i = new DataView(r.buffer);
  return (
    i.setUint32(0, n.byteLength, !1),
    r.set(n, 4),
    i.setUint32(4 + n.byteLength, t.byteLength, !1),
    r.set(t, 4 + n.byteLength + 4),
    r
  );
}
async function* gm(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : vm(e.getReader()),
    n = new Uint8Array(),
    r = async (e) => {
      for (; n.byteLength < e;) {
        let { done: e, value: r } = await t.next();
        if (e) return !1;
        if (!r || r.byteLength === 0) continue;
        let i = new Uint8Array(n.byteLength + r.byteLength);
        (i.set(n, 0), i.set(r, n.byteLength), (n = i));
      }
      return !0;
    },
    i = (e) => {
      let t = n.subarray(0, e);
      return ((n = n.subarray(e)), t);
    };
  try {
    for (;;) {
      if (!(await r(4))) return;
      let e = new DataView(n.buffer, n.byteOffset, 4).getUint32(0, !1);
      if ((i(4), !(await r(e)))) throw Error(`decodeFrames: truncated meta block`);
      let t = xn(i(e));
      if (!(await r(4))) throw Error(`decodeFrames: truncated body length`);
      let a = new DataView(n.buffer, n.byteOffset, 4).getUint32(0, !1);
      if ((i(4), a > 0 && !(await r(a)))) throw Error(`decodeFrames: truncated body bytes`);
      if ((yield { meta: t, body: n.slice(0, a) }, i(a), t._end === 1)) return;
    }
  } finally {
    _m(() => t.return?.());
  }
}
function _m(e) {
  try {
    Promise.resolve(e()).catch(() => {});
  } catch {}
}
async function* vm(e) {
  try {
    for (;;) {
      let { done: t, value: n } = await e.read();
      if (t) return;
      n && (yield n);
    }
  } finally {
    _m(() => e.cancel());
  }
}
async function ym(e, t, n, r) {
  return di({
    method: t.method,
    url: e,
    headers: t.headers,
    body: t.body,
    dispatcher: vr(n),
    timeoutMs: null,
    logLabel: r,
    buildError: async (t) => Cm(t.status, bm(t.headers), await t.text(), r, e),
  });
}
function bm(e) {
  let t = {};
  return (
    e.forEach((e, n) => {
      t[n] = e;
    }),
    t
  );
}
const xm = { eventId: `x-wf-event-id`, runId: `x-wf-run-id`, createdAt: `x-wf-created-at` };
function Sm(e) {
  let t = { eventType: e.eventType, specVersion: e.specVersion };
  return (
    e.correlationId !== void 0 && (t.correlationId = e.correlationId),
    e.vercelId !== void 0 && (t.vercelId = e.vercelId),
    e.occurredAt !== void 0 && (t.occurredAt = e.occurredAt),
    e.remoteRefBehavior !== void 0 && (t.remoteRefBehavior = e.remoteRefBehavior),
    e.deploymentId !== void 0 && (t.deploymentId = e.deploymentId),
    e.workflowName !== void 0 && (t.workflowName = e.workflowName),
    e.stepName !== void 0 && (t.stepName = e.stepName),
    e.attempt !== void 0 && (t.attempt = e.attempt),
    e.resumeAt !== void 0 && (t.resumeAt = e.resumeAt),
    e.retryAfter !== void 0 && (t.retryAfter = e.retryAfter),
    e.hookToken !== void 0 && (t.hookToken = e.hookToken),
    e.hookTokenRetentionUntil !== void 0 && (t.hookTokenRetentionUntil = e.hookTokenRetentionUntil),
    e.hookIsWebhook !== void 0 && (t.hookIsWebhook = e.hookIsWebhook),
    e.hookIsSystem !== void 0 && (t.hookIsSystem = e.hookIsSystem),
    e.errorCode !== void 0 && (t.errorCode = e.errorCode),
    e.cancelReason !== void 0 && (t.cancelReason = e.cancelReason),
    e.ownerMessageId !== void 0 && (t.ownerMessageId = e.ownerMessageId),
    e.executionContext !== void 0 && (t.executionContext = e.executionContext),
    e.attributes !== void 0 && (t.attributes = e.attributes),
    e.changes !== void 0 && (t.changes = e.changes),
    e.writer !== void 0 && (t.writer = e.writer),
    e.allowReservedAttributes !== void 0 && (t.allowReservedAttributes = e.allowReservedAttributes),
    e.ttfs !== void 0 && (t.ttfs = e.ttfs),
    e.stso !== void 0 && (t.stso = e.stso),
    e.stepCount !== void 0 && (t.stepCount = e.stepCount),
    e.eventCount !== void 0 && (t.eventCount = e.eventCount),
    e.rsfs !== void 0 && (t.rsfs = e.rsfs),
    e.finalSchedulingReplay !== void 0 && (t.finalSchedulingReplay = e.finalSchedulingReplay),
    e.optimizations !== void 0 && (t.optimizations = e.optimizations),
    e.sinceCursor !== void 0 && (t.sinceCursor = e.sinceCursor),
    e.skipPreload !== void 0 && (t.skipPreload = e.skipPreload),
    e.stateUpdatedAt !== void 0 && (t.stateUpdatedAt = e.stateUpdatedAt),
    t
  );
}
function Cm(e, t, n, r, i) {
  let a = `v4 ${r} failed: HTTP ${e}`,
    o;
  try {
    let e = JSON.parse(n);
    (typeof e.message == `string` && (a = e.message), typeof e.code == `string` && (o = e.code));
  } catch {
    n && (a += ` ${n}`);
  }
  let s = ai(Tm(t, `retry-after`));
  return oi(e, a, { retryAfter: s, code: o, url: i, mitigated: Tm(t, `x-vercel-mitigated`) });
}
async function wm(e, t) {
  let { baseUrl: n, headers: r } = await Ci(t),
    i = new Headers(r);
  i.set(`Content-Type`, `application/octet-stream`);
  let a = hm(Sm(e), e.payload ?? new Uint8Array()),
    o = await ym(
      `${n}/v4/runs/${encodeURIComponent(e.runId)}/events/${encodeURIComponent(e.eventType)}`,
      { method: `POST`, headers: i, body: a },
      t,
      `createEvent`,
    ),
    s = o.headers.get(xm.eventId),
    c = o.headers.get(xm.runId),
    l = o.headers.get(xm.createdAt);
  if (typeof s != `string` || typeof c != `string` || typeof l != `string`)
    throw Error(`v4 createEvent: response missing required x-wf-* headers`);
  let u = new Uint8Array(await o.arrayBuffer());
  return { eventId: s, runId: c, createdAt: l, body: u.byteLength > 0 ? xn(u) : {} };
}
function Tm(e, t) {
  let n = e[t];
  if (typeof n == `string`) return n;
  if (Array.isArray(n) && n.length > 0) return n[0];
}
async function Em(e, t, n) {
  let { baseUrl: r, headers: i } = await Ci(n),
    a = await ym(
      `${r}/v4/runs/${encodeURIComponent(e)}/events/${encodeURIComponent(t)}`,
      { method: `GET`, headers: i },
      n,
      `getEvent`,
    ),
    o = a.headers.get(`content-type`);
  if (!o?.startsWith(`application/vnd.workflow.v4-frames`))
    throw Error(`v4 getEvent: expected ${mm}, got ${o ?? `(none)`}`);
  let s = a.body;
  for await (let e of gm(s)) return { event: e.meta, body: e.body };
  throw Error(`v4 getEvent: empty frame stream for ${t}`);
}
async function Dm(e, t, n, r) {
  let i = await ym(e, { method: `GET`, headers: t }, n, r),
    a = i.headers.get(`content-type`);
  if (!a?.startsWith(`application/vnd.workflow.v4-frames`))
    throw Error(`v4 ${r}: expected ${mm}, got ${a ?? `(none)`}`);
  let o = i.body,
    s = [],
    c,
    l,
    u = !1;
  for await (let e of gm(o)) {
    if (e.meta._end === 1) {
      (typeof e.meta.next == `string` && (c = e.meta.next),
        typeof e.meta.hasMore == `boolean` && (l = e.meta.hasMore),
        (u = !0));
      break;
    }
    s.push({ event: e.meta, body: e.body });
  }
  if (!u)
    throw Error(
      `v4 ${r}: frame stream ended without the end-of-stream sentinel (${s.length} events read) — truncated response?`,
    );
  return { events: s, ...(c ? { next: c } : {}), ...(l === void 0 ? {} : { hasMore: l }) };
}
function Om(e, t) {
  (t.cursor && e.set(`cursor`, t.cursor),
    t.limit !== void 0 && e.set(`limit`, String(t.limit)),
    t.sortOrder && e.set(`sortOrder`, t.sortOrder),
    t.remoteRefBehavior && e.set(`remoteRefBehavior`, t.remoteRefBehavior));
}
function km(e) {
  let t = new URLSearchParams();
  Om(t, e);
  let n = t.toString();
  return n ? `?${n}` : ``;
}
async function Am(e, t = {}, n) {
  let { baseUrl: r, headers: i } = await Ci(n);
  return Dm(`${r}/v4/runs/${encodeURIComponent(e)}/events` + km(t), i, n, `listEvents`);
}
async function jm(e, t = {}, n) {
  let { baseUrl: r, headers: i } = await Ci(n),
    a = new URLSearchParams();
  return (
    a.set(`correlationId`, e),
    Om(a, t),
    Dm(`${r}/v4/events?${a.toString()}`, i, n, `listEventsByCorrelationId`)
  );
}
const Mm = `gzip`,
  Nm = `zstd`,
  Pm = new TextDecoder(),
  Fm = new Set([`devl`, `encr`, Mm, Nm]);
function Im() {
  try {
    return globalThis.process?.getBuiltinModule?.(`node:zlib`);
  } catch {
    return;
  }
}
function Lm(e) {
  return !(e instanceof Uint8Array) || e.byteLength < 4 ? null : Pm.decode(e.subarray(0, 4));
}
function Rm(e) {
  let t = Lm(e);
  return t !== null && Fm.has(t);
}
function zm(e, t) {
  let n = Im(),
    r = e === Nm ? n?.zstdDecompressSync : n?.gunzipSync;
  if (!r)
    throw new a(
      `Received ${e}-compressed workflow data, but this Node.js runtime does not support ${e} decompression. Use a compatible Node.js runtime or request unresolved data.`,
    );
  return new Uint8Array(r(t));
}
function Bm(e) {
  let t = Lm(e);
  return t !== Nm && t !== Mm ? e : zm(t, e.subarray(4));
}
function Vm(e) {
  return { ...e, input: Bm(e.input), output: Bm(e.output), error: Bm(e.error) };
}
function Hm(e) {
  return { ...e, input: Bm(e.input), output: Bm(e.output), error: Bm(e.error) };
}
function Um(e) {
  return { ...e, metadata: Bm(e.metadata) };
}
function Wm(e) {
  let t = e.eventData;
  if (!t || typeof t != `object`) return e;
  let n = b(typeof e.eventType == `string` ? e.eventType : ``);
  if (n.length === 0) return e;
  let r = { ...t },
    i = !1;
  for (let e of n) {
    if (!(e in r)) continue;
    let t = r[e],
      n = Bm(t);
    n !== t && ((r[e] = n), (i = !0));
  }
  return i ? { ...e, eventData: r } : e;
}
const Gm = ue
    .omit({ error: !0, errorCode: !0 })
    .extend({
      error: be([v, se()]).optional(),
      errorCode: ge().optional(),
      blobStorageBytes: ye().optional(),
      streamStorageBytes: ye().optional(),
    }),
  Km = Gm,
  qm = Gm.omit({ input: !0, output: !0 }).extend({
    inputRef: se().optional(),
    outputRef: se().optional(),
    input: be([p(Uint8Array), se()]).optional(),
    output: be([p(Uint8Array), se()]).optional(),
  });
function Jm(e, t) {
  if (t === `none`) {
    let { inputRef: t, outputRef: n, ...r } = e;
    return { ...Vm(vi(r)), input: void 0, output: void 0 };
  }
  return Vm(vi(e));
}
async function Ym(e = {}, t) {
  let { workflowName: n, status: r, pagination: i, resolveData: a = `all` } = e,
    o = new URLSearchParams();
  (n && o.set(`workflowName`, n),
    r && o.set(`status`, r),
    i?.limit && o.set(`limit`, i.limit.toString()),
    i?.cursor && o.set(`cursor`, i.cursor),
    i?.sortOrder && o.set(`sortOrder`, i.sortOrder));
  let s = a === `none` ? `lazy` : `resolve`;
  o.set(`remoteRefBehavior`, s);
  let c = o.toString(),
    l = await I({
      endpoint: `/v2/runs${c ? `?${c}` : ``}`,
      options: { method: `GET` },
      config: t,
      schema: fe(s === `lazy` ? qm : Km),
    });
  return { ...l, data: l.data.map((e) => Jm(e, a)) };
}
async function Xm(e, t) {
  return vi(
    await I({
      endpoint: `/v1/runs/create`,
      options: { method: `POST` },
      data: e,
      config: t,
      schema: Km,
    }),
  );
}
async function Zm(e, t, n) {
  let r = t?.resolveData ?? `all`,
    i = r === `none` ? `lazy` : `resolve`,
    s = new URLSearchParams();
  s.set(`remoteRefBehavior`, i);
  let c = s.toString(),
    l = `/v2/runs/${encodeURIComponent(e)}${c ? `?${c}` : ``}`;
  try {
    return Jm(
      await I({
        endpoint: l,
        options: { method: `GET` },
        config: n,
        retryConnectTimeout: !0,
        schema: i === `lazy` ? qm : Km,
      }),
      r,
    );
  } catch (t) {
    throw t instanceof a && t.status === 404 ? new o(e) : t;
  }
}
async function Qm(e, t, n) {
  let r = [...new Set(e)],
    i = await Promise.all(
      r.map(async (e) => {
        try {
          return await Zm(e, t, n);
        } catch (e) {
          if (e instanceof o) return null;
          throw e;
        }
      }),
    ),
    a = new Map(r.map((e, t) => [e, i[t]]));
  return e.map((e) => a.get(e) ?? null);
}
async function $m(e, t, n) {
  let r = t?.resolveData ?? `all`,
    i = r === `none` ? `lazy` : `resolve`,
    s = new URLSearchParams();
  s.set(`remoteRefBehavior`, i);
  let c = s.toString(),
    l = `/v1/runs/${encodeURIComponent(e)}/cancel${c ? `?${c}` : ``}`;
  try {
    return Jm(
      await I({
        endpoint: l,
        options: { method: `PUT` },
        config: n,
        schema: i === `lazy` ? qm : Km,
      }),
      r,
    );
  } catch (t) {
    throw t instanceof a && t.status === 404 ? new o(e) : t;
  }
}
const eh = le({ attributes: ae(ge(), ge()) });
async function th(e, t, n, r) {
  try {
    return {
      attributes: (
        await I({
          endpoint: `/v2/runs/${encodeURIComponent(e)}/attributes`,
          options: { method: `POST` },
          data: n?.allowReservedAttributes
            ? { changes: t, allowReservedAttributes: !0 }
            : { changes: t },
          config: r,
          schema: eh,
        })
      ).attributes,
    };
  } catch (t) {
    throw t instanceof a && t.status === 404 ? new o(e) : t;
  }
}
const nh = de
    .omit({ error: !0 })
    .extend({ error: be([v, se()]).optional(), errorRef: se().optional() }),
  rh = nh
    .omit({ input: !0, output: !0 })
    .extend({
      inputRef: se().optional(),
      outputRef: se().optional(),
      input: p(Uint8Array).optional(),
      output: p(Uint8Array).optional(),
    });
function ih(e) {
  let { error: t, errorRef: n, ...r } = e,
    i = { ...r },
    a = t ?? n;
  return (a != null && (i.error = a), i);
}
function ah(e, t) {
  if (t === `none`) {
    let { inputRef: t, outputRef: n, ...r } = e;
    return { ...Hm(ih(r)), input: void 0, output: void 0 };
  }
  return Hm(ih(e));
}
async function oh(e, t) {
  let { runId: n, pagination: r, resolveData: i = `all` } = e,
    a = new URLSearchParams();
  (r?.cursor && a.set(`cursor`, r.cursor),
    r?.limit && a.set(`limit`, r.limit.toString()),
    r?.sortOrder && a.set(`sortOrder`, r.sortOrder));
  let o = i === `none` ? `lazy` : `resolve`;
  a.set(`remoteRefBehavior`, o);
  let s = a.toString(),
    c = await I({
      endpoint: `/v2/runs/${encodeURIComponent(n)}/steps${s ? `?${s}` : ``}`,
      options: { method: `GET` },
      config: t,
      schema: fe(o === `lazy` ? rh : nh),
    });
  return { ...c, data: c.data.map((e) => ah(e, i)) };
}
async function sh(e, t, n, r) {
  let i = n?.resolveData ?? `all`,
    a = i === `none` ? `lazy` : `resolve`,
    o = new URLSearchParams();
  o.set(`remoteRefBehavior`, a);
  let s = o.toString();
  return ah(
    await I({
      endpoint: `/v2/runs/${encodeURIComponent(e)}/steps/${encodeURIComponent(t)}${s ? `?${s}` : ``}`,
      options: { method: `GET` },
      config: r,
      schema: a === `lazy` ? rh : nh,
    }),
    i,
  );
}
function ch(e) {
  let t = e.startsWith(`wrun_`) ? e.slice(5) : e;
  try {
    return ve(`wrun_${Me(t).ulid}`, `wrun_`);
  } catch {
    return ve(e, `wrun_`);
  }
}
const lh = new Set([`run_created`, `run_started`, `step_started`]),
  uh = new Set([`run_failed`, `step_failed`, `step_retrying`]);
function dh(e) {
  let t = e.eventData ?? {},
    n = y(e.eventType),
    r = {};
  if (
    (typeof t.deploymentId == `string` && (r.deploymentId = t.deploymentId),
    typeof t.workflowName == `string` && (r.workflowName = t.workflowName),
    typeof t.stepName == `string` && (r.stepName = t.stepName),
    typeof t.attempt == `number` && (r.attempt = t.attempt),
    t.resumeAt instanceof Date)
  )
    r.resumeAt = t.resumeAt;
  else if (typeof t.resumeAt == `string`) {
    let e = new Date(t.resumeAt);
    Number.isNaN(e.getTime()) || (r.resumeAt = e);
  }
  if (t.retryAfter instanceof Date) r.retryAfter = t.retryAfter;
  else if (typeof t.retryAfter == `string`) {
    let e = new Date(t.retryAfter);
    Number.isNaN(e.getTime()) || (r.retryAfter = e);
  }
  (typeof t.token == `string` && (r.hookToken = t.token),
    t.tokenRetentionUntil instanceof Date && (r.hookTokenRetentionUntil = t.tokenRetentionUntil),
    typeof t.isWebhook == `boolean` && (r.hookIsWebhook = t.isWebhook),
    typeof t.isSystem == `boolean` && (r.hookIsSystem = t.isSystem),
    typeof t.errorCode == `string` && (r.errorCode = t.errorCode),
    typeof t.cancelReason == `string` && (r.cancelReason = t.cancelReason),
    typeof t.ownerMessageId == `string` && (r.ownerMessageId = t.ownerMessageId),
    t.executionContext !== void 0 &&
      t.executionContext !== null &&
      typeof t.executionContext == `object` &&
      (r.executionContext = t.executionContext),
    t.attributes !== void 0 &&
      t.attributes !== null &&
      typeof t.attributes == `object` &&
      (r.attributes = t.attributes),
    Array.isArray(t.changes) && (r.changes = t.changes),
    t.writer !== void 0 &&
      t.writer !== null &&
      typeof t.writer == `object` &&
      (r.writer = t.writer),
    typeof t.allowReservedAttributes == `boolean` &&
      (r.allowReservedAttributes = t.allowReservedAttributes),
    typeof t.ttfs == `number` && (r.ttfs = t.ttfs),
    typeof t.stso == `number` && (r.stso = t.stso),
    typeof t.stepCount == `number` &&
      Number.isSafeInteger(t.stepCount) &&
      t.stepCount > 0 &&
      (r.stepCount = t.stepCount),
    typeof t.eventCount == `number` &&
      Number.isSafeInteger(t.eventCount) &&
      t.eventCount > 0 &&
      (r.eventCount = t.eventCount),
    typeof t.rsfs == `number` && (r.rsfs = t.rsfs),
    typeof t.finalSchedulingReplay == `number` &&
      (r.finalSchedulingReplay = t.finalSchedulingReplay),
    Array.isArray(t.optimizations) &&
      t.optimizations.every((e) => typeof e == `string`) &&
      (r.optimizations = t.optimizations));
  let i;
  if (n && n in t) {
    let r = t[n];
    if (r !== void 0) {
      if (!(r instanceof Uint8Array))
        throw TypeError(
          `world-vercel v4: eventData.${n} for ${e.eventType} must be a Uint8Array (the runtime's dehydrated wire form); got ${typeof r == `object` ? (r === null ? `null` : (r.constructor?.name ?? typeof r)) : typeof r}.`,
        );
      i = r;
    }
  }
  return { payload: i, meta: r };
}
function fh(e) {
  let t = ee.safeParse(e);
  return t.success
    ? t.data
    : (_.safeParse(e.eventType).success &&
        console.debug(
          `[workflow:world-vercel] v4 event ${e.eventId} failed EventSchema parse for known eventType '${e.eventType}'; passing through unparsed: ${t.error.message}`,
        ),
      e);
}
function ph(e) {
  return fh(Wm(e));
}
function mh(e) {
  if (Rm(e)) return e;
  try {
    let t = Se.safeParse(xn(e.slice()));
    return t.success ? t.data : e;
  } catch {
    return e;
  }
}
function hh(e, t, n) {
  let r = e.eventData ?? {};
  if (t.byteLength > 0) {
    let n = y(e.eventType),
      i = Bm(t);
    n && i instanceof Uint8Array && (r[n] = uh.has(e.eventType) ? mh(i) : i);
  }
  let i = ph({
    eventId: e.eventId,
    runId: e.runId,
    eventType: e.eventType,
    createdAt: e.createdAt instanceof Date ? e.createdAt : new Date(e.createdAt),
    ...(e.occurredAt === void 0
      ? {}
      : { occurredAt: e.occurredAt instanceof Date ? e.occurredAt : new Date(e.occurredAt) }),
    ...(e.correlationId ? { correlationId: e.correlationId } : {}),
    eventData: r,
    ...(e.specVersion === void 0 ? {} : { specVersion: e.specVersion }),
  });
  return n === `none` ? re(i, `none`) : i;
}
async function gh(e, t, n, r) {
  let i = n?.resolveData ?? `all`,
    { event: a, body: o } = await Em(e, t, r);
  return hh(a, o, i);
}
async function _h(e, t) {
  let { pagination: n, resolveData: r = `all` } = e,
    i = {
      cursor: n?.cursor ?? void 0,
      limit: n?.limit,
      sortOrder: n?.sortOrder,
      remoteRefBehavior: r === `none` ? `lazy` : `resolve`,
    },
    a = await (`correlationId` in e ? jm(e.correlationId, i, t) : Am(e.runId, i, t));
  return {
    data: a.events.map((e) => hh(e.event, e.body, r)),
    cursor: a.next ?? null,
    hasMore: typeof a.hasMore == `boolean` ? a.hasMore : !!a.next,
  };
}
async function vh(e, t, n, r) {
  try {
    return await pm(() => yh(e, t, n, r), t.eventType);
  } catch (e) {
    throw Te(t.eventType) && a.is(e) && e.status === 404 && t.correlationId
      ? new d(t.correlationId)
      : e;
  }
}
async function yh(e, t, n, r) {
  if (n?.v1Compat) {
    if (t.eventType === `run_cancelled` && e) return { run: await $m(e, n, r) };
    if (t.eventType === `run_created`) return { run: await Xm(t.eventData, r) };
    if (e === null)
      throw new a(`world-vercel: v1Compat=true requires a runId for ${t.eventType}`, {
        status: 400,
      });
    return {
      event: await I({
        endpoint: `/v1/runs/${encodeURIComponent(e)}/events`,
        options: { method: `POST` },
        data: t,
        config: r,
        schema: ee,
      }),
    };
  }
  if (e === null)
    throw new a(
      `world-vercel v4: createWorkflowRunEvent requires a client-generated runId for run_created (the runId is part of the payload storage ref key). Generate a wrun_ ULID before calling.`,
      { status: 400 },
    );
  if (t.eventType === `run_created`) {
    let t = ch(e);
    if (t) throw new a(t, { status: 400 });
  }
  let i = lh.has(t.eventType) ? `resolve` : `lazy`,
    { payload: o, meta: s } = dh(t),
    c = await wm(
      {
        runId: e,
        eventType: t.eventType,
        specVersion: t.specVersion ?? 2,
        ...(t.correlationId ? { correlationId: t.correlationId } : {}),
        ...(n?.requestId ? { vercelId: n.requestId } : {}),
        ...(n?.stateUpdatedAt === void 0 ? {} : { stateUpdatedAt: n.stateUpdatedAt }),
        occurredAt: n?.occurredAt ?? new Date(),
        ...(n?.sinceCursor ? { sinceCursor: n.sinceCursor } : {}),
        ...(n?.skipPreload ? { skipPreload: !0 } : {}),
        remoteRefBehavior: i,
        payload: o,
        ...s,
      },
      r,
    ),
    l = n?.resolveData ?? `all`,
    u = c.body;
  return {
    event: u.event ? re(fh(u.event), l) : void 0,
    run: u.run ? vi(u.run) : void 0,
    step: u.step ? ih(u.step) : void 0,
    hook: u.hook,
    wait: u.wait,
    events: u.events ? u.events.map(fh) : void 0,
    cursor: u.cursor ?? void 0,
    hasMore: u.hasMore,
    ...(u.stepCreated ? { stepCreated: !0 } : {}),
    ...(typeof u.maxEvents == `number` ? { maxEvents: u.maxEvents } : {}),
  };
}
function bh(e, t) {
  if (t === `none`) {
    let { metadataRef: t, ...n } = e;
    return n;
  }
  return Um(e);
}
const xh = oe.omit({ metadata: !0 }).extend({ metadataRef: ie.any().optional() });
async function Sh(e, t) {
  let { runId: n, pagination: r, resolveData: i = `all` } = e,
    a = new URLSearchParams();
  (r?.limit && a.set(`limit`, r.limit.toString()),
    r?.cursor && a.set(`cursor`, r.cursor),
    r?.sortOrder && a.set(`sortOrder`, r.sortOrder));
  let o = i === `none` ? `lazy` : `resolve`;
  (a.set(`remoteRefBehavior`, o), n && a.set(`runId`, n));
  let s = a.toString(),
    c = await I({
      endpoint: `/v2/hooks${s ? `?${s}` : ``}`,
      options: { method: `GET` },
      config: t,
      schema: fe(o === `lazy` ? xh : oe),
    });
  return { ...c, data: c.data.map((e) => bh(e, i)) };
}
async function Ch(e, t, n) {
  let r = t?.resolveData || `all`;
  return bh(
    await I({
      endpoint: `/v2/hooks/${encodeURIComponent(e)}`,
      options: { method: `GET` },
      config: n,
      schema: oe,
    }),
    r,
  );
}
async function wh(e, t) {
  try {
    return await I({
      endpoint: `/v2/hooks/by-token?token=${encodeURIComponent(e)}`,
      options: { method: `GET` },
      config: t,
      schema: oe,
    });
  } catch (t) {
    throw a.is(t) && t.status === 404 ? new d(e) : t;
  }
}
function Th(e) {
  let t = {
    runs: {
      get: (t, n) => Zm(t, n, e),
      getMany: (t, n) => Qm(t, n, e),
      list: (t) => Ym(t, e),
      experimentalSetAttributes: (t, n, r) => th(t, n, r, e),
    },
    steps: { get: (t, n, r) => sh(t, n, r, e), list: (t) => oh(t, e) },
    events: {
      create: (t, n, r) => vh(t, n, r, e),
      get: (t, n, r) => gh(t, n, r, e),
      list: (t) => _h(t, e),
      listByCorrelationId: (t) => _h(t, e),
    },
    hooks: { get: (t, n) => Ch(t, n, e), getByToken: (t) => wh(t, e), list: (t) => Sh(t, e) },
  };
  return {
    runs: Yi(`world.runs`, t.runs),
    steps: Yi(`world.steps`, t.steps),
    events: Yi(`world.events`, t.events),
    hooks: Yi(`world.hooks`, t.hooks),
  };
}
const Eh = () => we(`WORKFLOW_MAX_CHUNKS_PER_REQUEST`, 1e3, { integer: !0, min: 1 });
function Dh(e, t, n) {
  return new URL(`${n.baseUrl}/v2/runs/${encodeURIComponent(t)}/stream/${encodeURIComponent(e)}`);
}
function Oh(e, t, n) {
  return new URL(`${n.baseUrl}/v3/runs/${encodeURIComponent(t)}/stream/${encodeURIComponent(e)}`);
}
function kh(e) {
  return {
    ...qr(e.runId),
    ...Yr(e.name),
    ...Xr(e.operation),
    ...(typeof e.startIndex == `number` ? Zr(e.startIndex) : {}),
  };
}
function Ah(e, t, n, r) {
  let i = [`PUT ${t.origin}${t.pathname}`, ...ti(n.headers)];
  return Error(`Stream ${e} failed: HTTP ${n.status} (${i.join(`; `)}): ${r}`);
}
function jh(e) {
  let t = new TextEncoder(),
    n = [],
    r = 0;
  for (let i of e) {
    let e = typeof i == `string` ? t.encode(i) : i;
    (n.push(e), (r += 4 + e.length));
  }
  let i = new Uint8Array(r),
    a = new DataView(i.buffer),
    o = 0;
  for (let e of n) (a.setUint32(o, e.length, !1), (o += 4), i.set(e, o), (o += e.length));
  return i;
}
const Mh = le({ tailIndex: ye(), done: me() }),
  Nh = le({
    data: xe(le({ index: ye(), data: p(Uint8Array) })),
    cursor: ge().nullable(),
    hasMore: me(),
    done: me(),
  });
function Ph(e) {
  return {
    streams: {
      async write(t, n, r) {
        let i = await t,
          a = await Ci(e),
          o = Dh(n, i, a);
        await (
          await di({
            method: `PUT`,
            url: o.toString(),
            body: r,
            headers: a.headers,
            dispatcher: yr(e),
            timeoutMs: null,
            logLabel: o.pathname,
            spanName: `workflow.stream.write`,
            durationAttribute: `workflow.stream.write.chunk_rtt`,
            attributes: kh({ runId: i, name: n, operation: `write` }),
            buildError: async (e) => Ah(`write`, o, e, await e.text()),
          })
        ).text();
      },
      async writeMulti(t, n, r) {
        if (r.length === 0) return;
        let i = await t,
          a = await Ci(e);
        a.headers.set(`X-Stream-Multi`, `true`);
        let o = Eh();
        for (let t = 0; t < r.length; t += o) {
          let s = jh(r.slice(t, t + o)),
            c = Dh(n, i, a);
          await (
            await di({
              method: `PUT`,
              url: c.toString(),
              body: s,
              headers: a.headers,
              dispatcher: yr(e),
              timeoutMs: null,
              logLabel: c.pathname,
              spanName: `workflow.stream.write`,
              durationAttribute: `workflow.stream.write.chunk_rtt`,
              attributes: kh({ runId: i, name: n, operation: `write_multi` }),
              buildError: async (e) => Ah(`write`, c, e, await e.text()),
            })
          ).text();
        }
      },
      async close(t, n) {
        let r = await t,
          i = await Ci(e);
        i.headers.set(`X-Stream-Done`, `true`);
        let a = Dh(n, r, i);
        await (
          await di({
            method: `PUT`,
            url: a.toString(),
            headers: i.headers,
            dispatcher: br(e),
            timeoutMs: null,
            logLabel: a.pathname,
            spanName: `workflow.stream.write`,
            durationAttribute: `workflow.stream.write.chunk_rtt`,
            attributes: kh({ runId: r, name: n, operation: `close` }),
            buildError: async (e) => Ah(`close`, a, e, await e.text()),
          })
        ).text();
      },
      async get(t, n, r) {
        let i = await Ci(e),
          a = Oh(n, t, i);
        typeof r == `number` && a.searchParams.set(`startIndex`, String(r));
        let o = await di({
          method: `GET`,
          url: a.toString(),
          headers: i.headers,
          dispatcher: void 0,
          timeoutMs: null,
          logLabel: a.pathname,
          spanName: `workflow.stream.read.connect`,
          attributes: kh({ runId: t, name: n, operation: `read`, startIndex: r }),
          buildError: (e) => Error(`Failed to fetch stream: ${e.status}`),
        });
        if (!o.body) throw Error(`No response body for stream`);
        return o.body;
      },
      async getChunks(t, n, r) {
        let i = new URLSearchParams();
        (r?.limit != null && i.set(`limit`, String(r.limit)),
          r?.cursor && i.set(`cursor`, r.cursor));
        let a = i.toString();
        return I({
          endpoint: `/v2/runs/${encodeURIComponent(t)}/streams/${encodeURIComponent(n)}/chunks${a ? `?${a}` : ``}`,
          config: e,
          schema: Nh,
        });
      },
      async getInfo(t, n) {
        return I({
          endpoint: `/v2/runs/${encodeURIComponent(t)}/streams/${encodeURIComponent(n)}/info`,
          config: e,
          schema: Mh,
        });
      },
      async list(t) {
        let n = await Ci(e),
          r = new URL(`${n.baseUrl}/v2/runs/${encodeURIComponent(t)}/streams`);
        return await (
          await di({
            method: `GET`,
            url: r.toString(),
            headers: n.headers,
            dispatcher: void 0,
            timeoutMs: null,
            logLabel: r.pathname,
            buildError: (e) => Error(`Failed to list streams: ${e.status}`),
          })
        ).json();
      },
    },
  };
}
function Fh(e) {
  let t = e?.projectConfig?.projectId || process.env.VERCEL_PROJECT_ID;
  return {
    specVersion: 5,
    capabilities: { preconditionGuard: !0, maxConcurrency: !0 },
    processExitTriggersQueueRedelivery: !0,
    ...nm(e),
    ...Th(e),
    analytics: ki(e),
    ...Yi(`world.streams`, Ph(e)),
    createRunId: Fi,
    describeRun: Li,
    getEncryptionKeyForRun: Bi(t, e?.projectConfig?.teamId, e?.token, e?.dispatcher),
    resolveLatestDeploymentId: im(e),
  };
}
function Ih(e) {
  return Fh(e);
}
export {
  ki as createAnalytics,
  Bi as createGetEncryptionKeyForRun,
  nm as createQueue,
  Fi as createRunId,
  Th as createStorage,
  Ph as createStreamer,
  Ih as createVercelWorld,
  Fh as createWorld,
  Ri as deriveRunKey,
  Li as describeRun,
  zi as fetchRunKey,
  gt as n,
  Ii as regionForRunId,
  St as t,
};
