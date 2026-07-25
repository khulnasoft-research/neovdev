import { i as e, o as t, t as n } from "../../_chunks/workflow/chunk-BTyA9uPd.js";
import { i as r, n as i, r as a, t as o } from "../../_chunks/workflow/dist-CrxV2rsR.js";
import {
  D as s,
  T as c,
  _ as l,
  d as u,
  f as d,
  o as f,
  r as p,
} from "../../_chunks/workflow/dist-B3qkUnLJ.js";
import {
  A as m,
  B as h,
  H as g,
  K as _,
  M as v,
  N as y,
  O as b,
  P as x,
  Q as S,
  R as ee,
  U as te,
  V as ne,
  W as C,
  X as re,
  Y as ie,
  a as w,
  b as T,
  c as ae,
  ct as E,
  d as oe,
  h as se,
  it as D,
  k as ce,
  n as le,
  o as O,
  ot as k,
  p as A,
  r as ue,
  s as de,
  tt as j,
  v as M,
  z as fe,
} from "../../_chunks/workflow/dist-BX517Nmz.js";
import { t as N } from "../../_chunks/workflow/undici-C2ZhYnV9.js";
import { createHash as pe } from "node:crypto";
import { promisify as me } from "node:util";
import { fileURLToPath as he } from "node:url";
import { promises as P } from "node:fs";
import F, {
  access as ge,
  constants as _e,
  mkdir as ve,
  readFile as I,
  readdir as ye,
  readlink as be,
  rm as xe,
  unlink as Se,
  writeFile as Ce,
} from "node:fs/promises";
import L from "node:path";
import { execFile as we } from "node:child_process";
import { setTimeout as Te } from "node:timers/promises";
import { EventEmitter as Ee } from "node:events";
function De(e, t = 10) {
  let n = parseInt(e, t);
  if (!Number.isNaN(n) && n >= 0 && n <= 65535) return n;
}
function Oe(e, t) {
  let n = [],
    r = e.trim().split(`
`);
  for (let e of r) {
    let r = e.trim().split(/\s+/);
    if (r.length < 5 || r[0]?.toUpperCase() !== `TCP`) continue;
    let [, i, , a, o] = r;
    if (a?.toUpperCase() !== `LISTENING` || o !== t.toString()) continue;
    let s = i.lastIndexOf(`:`);
    if (s === -1) continue;
    let c = De(i.slice(s + 1));
    c !== void 0 && n.push(c);
  }
  return n;
}
const ke = me(we);
function Ae(e, t = 10) {
  let n = parseInt(e, t);
  if (!Number.isNaN(n) && n >= 0 && n <= 65535) return n;
}
const je = ((e, t) => e.join(t))([``, `proc`], `/`);
async function Me(e) {
  let t = [`${je}/net/tcp`, `${je}/net/tcp6`],
    n = [],
    r = new Set(),
    i = `${je}/${e}/fd`;
  try {
    let e = (await ye(i)).sort((e, t) => Number.parseInt(e, 10) - Number.parseInt(t, 10)),
      t = await Promise.allSettled(
        e.map(async (e) => (await be(`${i}/${e}`)).match(/^socket:\[(\d+)\]$/)?.[1] ?? null),
      );
    for (let e of t) e.status === `fulfilled` && e.value && (n.push(e.value), r.add(e.value));
  } catch {
    return [];
  }
  if (n.length === 0) return [];
  let a = new Map();
  for (let e of t)
    try {
      let t = (await I(e, `utf8`))
        .split(`
`)
        .slice(1);
      for (let e of t) {
        if (!e.trim()) continue;
        let t = e.trim().split(/\s+/);
        if (t.length < 10) continue;
        let n = t[1],
          i = t[3],
          o = t[9];
        if (!n || i !== `0A` || !o || !r.has(o)) continue;
        let s = n.indexOf(`:`);
        if (s === -1) continue;
        let c = n.slice(s + 1);
        if (!c) continue;
        let l = Ae(c, 16);
        l !== void 0 && a.set(o, l);
      }
    } catch {}
  let o = [];
  for (let e of n) {
    let t = a.get(e);
    t !== void 0 && o.push(t);
  }
  return o;
}
async function Ne(e) {
  try {
    let { stdout: t } = await ke(`lsof`, [`-a`, `-i`, `-P`, `-n`, `-p`, e.toString()]),
      n = [],
      r = t.split(`
`);
    for (let e of r)
      if (e.includes(`LISTEN`)) {
        let t = e.trim().split(/\s+/)[8];
        if (t) {
          let e = t.lastIndexOf(`:`);
          if (e !== -1) {
            let r = Ae(t.slice(e + 1));
            r !== void 0 && n.push(r);
          }
        }
      }
    return n;
  } catch {
    return [];
  }
}
async function Pe(e) {
  try {
    let { stdout: t } = await ke(`cmd`, [`/c`, `netstat -ano -p tcp | findstr LISTENING`]);
    return Oe(t, e);
  } catch {
    return [];
  }
}
async function Fe() {
  let { pid: e, platform: t } = process;
  try {
    switch (t) {
      case `linux`:
        return await Me(e);
      case `darwin`:
        return await Ne(e);
      case `win32`:
        return await Pe(e);
      default:
        return [];
    }
  } catch (e) {
    return (
      process.env.NODE_ENV === `development` && console.debug(`[getAllPorts] Detection failed:`, e),
      []
    );
  }
}
const Ie = `${o}/flow?__health`;
async function Le(e, t = {}) {
  let { endpoint: n = Ie, timeout: r = 500 } = t,
    i = new AbortController(),
    a = setTimeout(() => i.abort(), r);
  try {
    return (
      (await fetch(`http://localhost:${e}${n}`, { method: `HEAD`, signal: i.signal })).status ===
      200
    );
  } catch {
    return !1;
  } finally {
    clearTimeout(a);
  }
}
async function Re(e) {
  let t = await Fe();
  if (t.length === 0) return;
  if (t.length === 1) return t[0];
  let n = (await Promise.all(t.map(async (t) => ({ port: t, isWorkflow: await Le(t, e) })))).find(
    (e) => e.isWorkflow,
  );
  return n
    ? n.port
    : (process.env.NODE_ENV === `development` &&
        console.debug(`[getWorkflowPort] Probing failed, falling back to first port:`, t[0]),
      t[0]);
}
function ze(e) {
  let t = {
    get value() {
      let n = e();
      return (Object.defineProperty(t, "value", { value: n }), n);
    },
  };
  return t;
}
const Be = () => process.env.WORKFLOW_LOCAL_DATA_DIR || `.workflow-data`,
  Ve = () => process.env.WORKFLOW_LOCAL_BASE_URL,
  He = ze(() => ({ dataDir: Be(), baseUrl: Ve() }));
function Ue(e) {
  if (e.recoverActiveRuns !== void 0) return e.recoverActiveRuns;
  let t = process.env.WORKFLOW_LOCAL_RECOVER_ACTIVE_RUNS?.toLowerCase();
  return !(t === `0` || t === `false`);
}
function We(e) {
  return e.baseUrl ?? process.env.WORKFLOW_LOCAL_BASE_URL ?? i(`http://localhost`);
}
async function Ge(e) {
  if (e.baseUrl) return e.baseUrl;
  if (process.env.WORKFLOW_LOCAL_BASE_URL) return process.env.WORKFLOW_LOCAL_BASE_URL;
  if (typeof e.port == `number`) return i(`http://localhost:${e.port}`);
  if (process.env.PORT) return i(`http://localhost:${process.env.PORT}`);
  let t = await Re({ endpoint: a() });
  if (t) return i(`http://localhost:${t}`);
  throw Error(`Unable to resolve base URL for workflow queue.`);
}
const Ke = O(() => Math.random());
function qe(e) {
  let t = typeof e == `string` ? e : String(e);
  return t.length > 48 ? `${t.slice(0, 48)}…` : t;
}
var Je = class extends s {
  constructor(e, t) {
    (super(`Unsafe ${e} "${qe(t)}": must not be empty, contain ".", "/", "\\", or null bytes`),
      (this.name = `UnsafeEntityIdError`));
  }
  static is(e) {
    return e instanceof Error && e.name === `UnsafeEntityIdError`;
  }
};
function R(e, t) {
  if (
    t.length === 0 ||
    t.startsWith(`.`) ||
    t.includes(`/`) ||
    t.includes(`\\`) ||
    t.includes(`\0`) ||
    t.includes(`.`)
  )
    throw new Je(e, t);
}
function z(e, ...t) {
  let n = L.resolve(e),
    r = L.resolve(e, ...t);
  if (r !== n && !r.startsWith(n + L.sep)) throw new Je(`path`, t.join(`/`));
  return r;
}
const Ye = process.platform === `win32`;
async function B(e, t = 5) {
  if (!Ye) return e();
  let n = [`EPERM`, `EBUSY`, `EACCES`];
  for (let r = 0; r <= t; r++)
    try {
      return await e();
    } catch (e) {
      if (!(r < t && n.includes(e.code))) throw e;
      let i = 10 * 2 ** r + Math.random() * 10;
      await new Promise((e) => setTimeout(e, i));
    }
  throw Error(`Retry loop exited unexpectedly`);
}
const Xe = new Set(),
  Ze = new Set();
function Qe() {
  (Xe.clear(), Ze.clear());
}
const $e = /\.[a-zA-Z][a-zA-Z0-9-]*$/;
function V(e) {
  return e.replace($e, ``);
}
function et(e, t) {
  return e.endsWith(`.${t}`);
}
function tt(e) {
  return !$e.test(e);
}
function H(e, t, n, r) {
  return (R(`fileId`, n), r !== void 0 && R(`tag`, r), z(e, t, r ? `${n}.${r}.json` : `${n}.json`));
}
async function U(e, t, n, r, i) {
  if ((R(`fileId`, n), i !== void 0 && R(`tag`, i), i)) {
    let a = await K(z(e, t, `${n}.${i}.json`), r);
    if (a !== null) return a;
  }
  return K(z(e, t, `${n}.json`), r);
}
async function nt(e, t) {
  let n = `.${t}.json`;
  try {
    return (await P.readdir(e)).filter((e) => e.endsWith(n));
  } catch (e) {
    if (e.code === `ENOENT`) return [];
    throw e;
  }
}
async function rt(e, t, n) {
  let r = `.${t}${n}`;
  try {
    return (await P.readdir(e)).filter((e) => e.endsWith(r));
  } catch (e) {
    if (e.code === `ENOENT`) return [];
    throw e;
  }
}
async function it(e) {
  let t = L.resolve(e);
  if (!Ze.has(t))
    try {
      (await P.mkdir(t, { recursive: !0 }), Ze.add(t));
    } catch {}
}
async function at(e, t) {
  await it(e);
  try {
    return await t();
  } catch (n) {
    if (n.code !== `ENOENT`) throw n;
    return (Ze.delete(L.resolve(e)), await it(e), t());
  }
}
function W(e, t) {
  return t instanceof Uint8Array
    ? { __type: `Uint8Array`, data: Buffer.from(t).toString(`base64`) }
    : t;
}
function ot(e, t) {
  return typeof t == `object` && t && t.__type === `Uint8Array` && typeof t.data == `string`
    ? new Uint8Array(Buffer.from(t.data, `base64`))
    : t;
}
async function G(e, t, n) {
  return st(e, JSON.stringify(t, W, 2), n);
}
async function st(e, t, n) {
  if (!n?.overwrite) {
    if (Xe.has(e)) throw new p(`File ${e} already exists and 'overwrite' is false`);
    try {
      throw (
        await P.access(e), Xe.add(e), new p(`File ${e} already exists and 'overwrite' is false`)
      );
    } catch (e) {
      if (e.code !== `ENOENT`) throw e;
    }
  }
  let r = `${e}.tmp.${Ke()}`,
    i = !1;
  try {
    (await at(L.dirname(e), async () => {
      (await P.writeFile(r, t), (i = !0), await B(() => P.rename(r, e)));
    }),
      Xe.add(e));
  } catch (e) {
    throw (i && (await B(() => P.unlink(r), 3).catch(() => {})), e);
  }
}
async function K(e, t) {
  try {
    let n = await P.readFile(e, `utf-8`);
    return t.parse(JSON.parse(n, ot));
  } catch (e) {
    if (e.code === `ENOENT`) return null;
    throw e;
  }
}
async function ct(e) {
  return await P.readFile(e);
}
async function lt(e) {
  let t = await P.open(e, `r`);
  try {
    let e = Buffer.allocUnsafe(1),
      { bytesRead: n } = await t.read(e, 0, 1, 0);
    return n === 0 ? void 0 : e[0];
  } finally {
    await t.close();
  }
}
async function q(e) {
  try {
    await P.unlink(e);
  } catch (e) {
    if (e.code !== `ENOENT`) throw e;
  }
}
async function J(e, t) {
  let n = `${e}.tmp.${Ke()}`,
    r = !1;
  try {
    return await at(L.dirname(e), async () => {
      (await P.writeFile(n, t, { flag: `wx` }), (r = !0));
      try {
        return (await B(() => P.link(n, e)), !0);
      } catch (e) {
        if (e.code === `EEXIST`) return !1;
        throw e;
      }
    });
  } finally {
    r && (await B(() => P.unlink(n), 3).catch(() => {}));
  }
}
async function ut(e, t) {
  try {
    return (await at(L.dirname(t), () => B(() => P.link(e, t))), `linked`);
  } catch (e) {
    if (e.code === `EEXIST`) return `exists`;
    if (e.code === `ENOENT`) return `missing`;
    throw e;
  }
}
async function Y(e) {
  return dt(e, `.json`);
}
async function dt(e, t) {
  try {
    return (await P.readdir(e)).filter((e) => e.endsWith(t)).map((e) => e.slice(0, -t.length));
  } catch (e) {
    if (e.code === `ENOENT`) return [];
    throw e;
  }
}
function ft(e) {
  if (!e) return null;
  let t = e.split(`|`);
  return { timestamp: new Date(t[0]), id: t[1] || null };
}
function pt(e, t) {
  return t ? `${e.toISOString()}|${t}` : e.toISOString();
}
async function X(e) {
  let {
    directory: t,
    schema: n,
    cachedItems: r,
    filePrefix: i,
    fileIdFilter: a,
    filter: o,
    sortOrder: s = `desc`,
    limit: c = 20,
    cursor: l,
    getCreatedAt: u,
    getId: d,
  } = e;
  i !== void 0 && R(`filePrefix`, i);
  let f = L.resolve(t),
    p = await Y(f),
    m = i ? p.filter((e) => e.startsWith(i)) : p,
    h = a ? m.filter(a) : m,
    g = ft(l),
    _ = h;
  g &&
    (_ = h.filter((e) => {
      let t = u(`${e}.json`);
      if (t) {
        let e = g.timestamp.getTime(),
          n = t.getTime();
        return g.id ? (s === `desc` ? n <= e : n >= e) : s === `desc` ? n < e : n > e;
      }
      return !0;
    }));
  let v = [];
  for (let e = 0; e < _.length; e += 32) {
    let t = _.slice(e, e + 32),
      i = await Promise.all(
        t.map(async (e) => {
          let t = L.join(f, `${e}.json`);
          try {
            let e = r?.get(t);
            return e === void 0 ? await K(t, n) : structuredClone(e);
          } catch (t) {
            if (t instanceof E)
              return (console.warn(`Skipping item ${e} due to malformed JSON: ${t.message}`), null);
            throw t;
          }
        }),
      );
    for (let e of i)
      if (e && !(o && !o(e))) {
        if (g) {
          let t = e.createdAt.getTime(),
            n = g.timestamp.getTime();
          if (s === `desc`) {
            if (t > n || (t === n && g.id && d && d(e) >= g.id)) continue;
          } else if (t < n || (t === n && g.id && d && d(e) <= g.id)) continue;
        }
        v.push(e);
      }
  }
  v.sort((e, t) => {
    let n = e.createdAt.getTime(),
      r = t.createdAt.getTime(),
      i = s === `asc` ? n - r : r - n;
    if (i === 0 && d) {
      let n = d(e),
        r = d(t);
      return s === `asc` ? n.localeCompare(r) : r.localeCompare(n);
    }
    return i;
  });
  let y = v.length > c,
    b = y ? v.slice(0, c) : v;
  return {
    data: b,
    cursor: b.length > 0 ? pt(b[b.length - 1].createdAt, d?.(b[b.length - 1])) : null,
    hasMore: y,
  };
}
let Z = null;
function mt() {
  return typeof import.meta.url == `string` && import.meta.url
    ? L.dirname(he(import.meta.url))
    : null;
}
async function ht() {
  if (Z) return Z;
  let e = mt();
  if (e)
    try {
      let t = await I(L.join(e, `../package.json`), `utf-8`);
      return ((Z = JSON.parse(t)), Z);
    } catch {}
  return ((Z = { name: `@workflow/world-local`, version: `5.0.0-beta.30` }), Z);
}
const gt = `version.txt`;
var _t = class extends Error {
    dataDir;
    code;
    constructor(e, t, n) {
      (super(e), (this.name = `DataDirAccessError`), (this.dataDir = t), (this.code = n));
    }
  },
  vt = class extends Error {
    oldVersion;
    newVersion;
    suggestedVersion;
    constructor(e, t, n, r) {
      (super(e),
        (this.name = `DataDirVersionError`),
        (this.oldVersion = t),
        (this.newVersion = n),
        (this.suggestedVersion = r));
    }
  };
function yt(e) {
  let t = e.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!t) throw Error(`Invalid version string: "${e}"`);
  return {
    major: parseInt(t[1], 10),
    minor: parseInt(t[2], 10),
    patch: parseInt(t[3], 10),
    prerelease: t[4],
    raw: e,
  };
}
function Q(e) {
  let t = `${e.major}.${e.minor}.${e.patch}`;
  return e.prerelease ? `${t}-${e.prerelease}` : t;
}
function bt(e) {
  let t = e.trim(),
    n = t.lastIndexOf(`@`);
  if (n <= 0) throw Error(`Invalid version file content: "${e}"`);
  return { packageName: t.substring(0, n), version: yt(t.substring(n + 1)) };
}
function xt(e, t) {
  return `${e}@${Q(t)}`;
}
function St(e, t) {
  console.log(`[world-local] Upgrading from version ${Q(e)} to ${Q(t)}`);
}
async function Ct(e) {
  let t = L.resolve(e);
  try {
    await ve(t, { recursive: !0 });
  } catch (e) {
    let n = e;
    if (n.code !== `EEXIST`)
      throw new _t(`Failed to create data directory "${t}": ${n.message}`, t, n.code);
  }
  try {
    await ge(t, _e.R_OK);
  } catch (e) {
    let n = e;
    throw new _t(`Data directory "${t}" is not readable: ${n.message}`, t, n.code);
  }
  let n = L.join(t, `.workflow-write-test-${Date.now()}`);
  try {
    (await Ce(n, ``),
      await Se(n).catch((e) => {
        if (e.code !== `ENOENT`) throw e;
      }));
  } catch (e) {
    let n = e;
    throw new _t(`Data directory "${t}" is not writable: ${n.message}`, t, n.code);
  }
}
async function wt(e) {
  let t = L.join(L.resolve(e), gt);
  try {
    return bt(await I(t, `utf-8`));
  } catch (e) {
    if (e.code === `ENOENT`) return null;
    throw e;
  }
}
async function Tt(e, t) {
  await Ce(L.join(L.resolve(e), gt), xt((await ht()).name, t));
}
function Et(e, t) {
  return t || Q(e);
}
async function Dt(e) {
  await Ct(e);
  let t = await ht(),
    n = yt(t.version),
    r = await wt(e);
  if (r === null) {
    await Tt(e, n);
    return;
  }
  let { version: i } = r;
  if (Q(i) !== Q(n))
    try {
      (St(i, n), await Tt(e, n));
    } catch (e) {
      let r = Et(i, e instanceof vt ? e.suggestedVersion : void 0);
      throw (
        console.error(
          `[world-local] Failed to upgrade data directory from version ${Q(i)} to ${Q(n)}:`,
          e instanceof Error ? e.message : e,
        ),
        console.error(
          `[world-local] Data is not compatible with the current version. Please downgrade to ${t.name}@${r}`,
        ),
        e
      );
    }
}
let Ot = null;
async function kt() {
  return (
    (Ot ||= import(`../../_chunks/workflow/src-D1EltLDA.js`)
      .then((e) => t(e.t(), 1))
      .catch(() => null)),
    Ot
  );
}
let At = null;
async function jt() {
  return ((At ||= kt().then((e) => (e ? e.trace.getTracer(`workflow`) : null))), At);
}
async function Mt(e, ...t) {
  let [n, r] = await Promise.all([jt(), kt()]),
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
async function Nt(e) {
  let t = await kt();
  if (t) return t.SpanKind[e];
}
function Pt(...e) {
  return (t) => Object.fromEntries(e.map((e) => [e, t]));
}
const Ft = Pt(`peer.service`),
  It = Pt(`rpc.system`),
  Lt = Pt(`rpc.service`),
  Rt = Pt(`rpc.method`),
  zt = Pt(`workflow.run.id`),
  Bt = Pt(`step.id`),
  Vt = { peerService: `world-local`, rpcSystem: `local`, rpcService: `world-local` },
  Ht = {
    "world.runs.get": 0,
    "world.runs.experimentalSetAttributes": 0,
    "world.steps.get": 0,
    "world.events.create": 0,
    "world.events.get": 0,
  },
  Ut = new Set([`world.steps.list`, `world.events.list`, `world.hooks.list`]);
function Wt(e) {
  if (e.length >= 2 && typeof e[1] == `object` && e[1] !== null) {
    let t = e[1];
    if (typeof t.eventType == `string`) return t.eventType;
  }
}
function Gt(e, t) {
  return typeof e[t] == `string` ? e[t] : void 0;
}
function Kt(e) {
  if (typeof e != `object` || !e) return;
  let t = e.runId;
  return typeof t == `string` ? t : void 0;
}
function qt(e) {
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
function Jt(e, t, n) {
  let r = `${e}.${t}`,
    i = {},
    a = Ht[r],
    o = a === void 0 ? (Ut.has(r) ? Kt(n[0]) : void 0) : Gt(n, a);
  if ((o && Object.assign(i, zt(o)), r === `world.steps.get`)) {
    let e = Gt(n, 1);
    e && Object.assign(i, Bt(e));
  }
  return i;
}
function Yt(e, t) {
  let n = {};
  for (let r of Object.keys(t))
    if (typeof t[r] != `function`) n[r] = t[r];
    else {
      let i = t[r],
        a = String(r);
      n[r] = async (...t) => {
        let n = `${e}.${a}`;
        if (e === `world.events` && a === `create`) {
          let r = Wt(t);
          r && (n = `${e}.${a} ${r}`);
        }
        return Mt(n, { kind: await Nt(`INTERNAL`) }, async (r) => {
          r?.setAttributes({
            ...Ft(Vt.peerService),
            ...It(Vt.rpcSystem),
            ...Lt(Vt.rpcService),
            ...Rt(n),
            ...Jt(e, a, t),
          });
          let o = await i(...t),
            s = qt(o);
          return (s && r?.setAttributes(zt(s)), o);
        });
      };
    }
  return n;
}
var Xt = n((t) => {
    var n =
      (t && t.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
    (Object.defineProperty(t, "__esModule", { value: !0 }), (t.RateLimit = t.Sema = void 0));
    let r = n(e(`events`));
    function i(e, t, n, r, i) {
      for (let a = 0; a < i; ++a) ((n[a + r] = e[a + t]), (e[a + t] = void 0));
    }
    function a(e) {
      return (
        (e >>>= 0),
        --e,
        (e |= e >> 1),
        (e |= e >> 2),
        (e |= e >> 4),
        (e |= e >> 8),
        (e |= e >> 16),
        e + 1
      );
    }
    function o(e) {
      return a(Math.min(Math.max(16, e), 1073741824));
    }
    var s = class {
        constructor(e) {
          ((this._capacity = o(e)), (this._length = 0), (this._front = 0), (this.arr = []));
        }
        push(e) {
          let t = this._length;
          this.checkCapacity(t + 1);
          let n = (this._front + t) & (this._capacity - 1);
          return ((this.arr[n] = e), (this._length = t + 1), t + 1);
        }
        pop() {
          let e = this._length;
          if (e === 0) return;
          let t = (this._front + e - 1) & (this._capacity - 1),
            n = this.arr[t];
          return ((this.arr[t] = void 0), (this._length = e - 1), n);
        }
        shift() {
          let e = this._length;
          if (e === 0) return;
          let t = this._front,
            n = this.arr[t];
          return (
            (this.arr[t] = void 0),
            (this._front = (t + 1) & (this._capacity - 1)),
            (this._length = e - 1),
            n
          );
        }
        get length() {
          return this._length;
        }
        checkCapacity(e) {
          this._capacity < e && this.resizeTo(o(this._capacity * 1.5 + 16));
        }
        resizeTo(e) {
          let t = this._capacity;
          this._capacity = e;
          let n = this._front,
            r = this._length;
          if (n + r > t) {
            let e = (n + r) & (t - 1);
            i(this.arr, 0, this.arr, t, e);
          }
        }
      },
      c = class extends r.default {};
    function l(e) {
      return typeof e == `function`;
    }
    function u() {
      return `1`;
    }
    var d = class {
      constructor(e, { initFn: t = u, pauseFn: n, resumeFn: r, capacity: i = 10 } = {}) {
        if (l(n) !== l(r)) throw Error(`pauseFn and resumeFn must be both set for pausing`);
        ((this.nrTokens = e),
          (this.free = new s(e)),
          (this.waiting = new s(i)),
          (this.releaseEmitter = new c()),
          (this.noTokens = t === u),
          (this.pauseFn = n),
          (this.resumeFn = r),
          (this.paused = !1),
          this.releaseEmitter.on(`release`, (e) => {
            let t = this.waiting.shift();
            t
              ? t.resolve(e)
              : (this.resumeFn && this.paused && ((this.paused = !1), this.resumeFn()),
                this.free.push(e));
          }));
        for (let n = 0; n < e; n++) this.free.push(t());
      }
      tryAcquire() {
        return this.free.pop();
      }
      async acquire() {
        let e = this.tryAcquire();
        return e === void 0
          ? new Promise((e, t) => {
              (this.pauseFn && !this.paused && ((this.paused = !0), this.pauseFn()),
                this.waiting.push({ resolve: e, reject: t }));
            })
          : e;
      }
      release(e) {
        this.releaseEmitter.emit(`release`, this.noTokens ? `1` : e);
      }
      drain() {
        let e = Array(this.nrTokens);
        for (let t = 0; t < this.nrTokens; t++) e[t] = this.acquire();
        return Promise.all(e);
      }
      nrWaiting() {
        return this.waiting.length;
      }
    };
    t.Sema = d;
    function f(e, { timeUnit: t = 1e3, uniformDistribution: n = !1 } = {}) {
      let r = new d(n ? 1 : e),
        i = n ? t / e : t;
      return async function () {
        (await r.acquire(), setTimeout(() => r.release(), i));
      };
    }
    t.RateLimit = f;
  })(),
  Zt = N(),
  Qt = class {
    contentType = `application/json`;
    serialize(e) {
      return Buffer.from(JSON.stringify(e, W));
    }
    async deserialize(e) {
      let t = [],
        n = e.getReader();
      for (;;) {
        let { done: e, value: r } = await n.read();
        if (e) break;
        r && t.push(r);
      }
      let r = Buffer.concat(t).toString();
      return JSON.parse(r, ot);
    }
  };
const $t = parseInt(process.env.WORKFLOW_LOCAL_QUEUE_MAX_VISIBILITY ?? `0`, 10) || 1 / 0,
  en = 2147483647,
  tn = parseInt(process.env.WORKFLOW_LOCAL_QUEUE_CONCURRENCY ?? `0`, 10) || 1e3,
  nn = `Cannot perform ArrayBuffer.prototype.slice on a detached ArrayBuffer`;
function rn(e) {
  let t = e,
    n = new Set();
  for (; t && typeof t == `object` && !n.has(t);) {
    if ((n.add(t), `message` in t && typeof t.message == `string` && t.message.includes(nn)))
      return !0;
    t = `cause` in t ? t.cause : void 0;
  }
  return !1;
}
function an(e) {
  let { kind: t, prefix: n } = M(e);
  return { pathname: t === `workflow` ? `flow` : `step`, prefix: n };
}
function on(e) {
  let t = new Zt.Agent({ headersTimeout: 0, connections: 1e3, keepAliveTimeout: 3e4 }),
    n = new Qt(),
    i = O(),
    a = new Xt.Sema(tn),
    o = new AbortController(),
    s = o.signal,
    c = new Map(),
    l = new Map(),
    u = async (o, u, d) => {
      let f = [];
      if (d?.idempotencyKey) {
        let e = c.get(d.idempotencyKey);
        if (e) return { messageId: e };
      }
      let p = n.serialize(u),
        { pathname: m, prefix: h } = an(o),
        g = A.parse(`msg_${i()}`),
        _ = u,
        v = _.runId ?? _.workflowRunId ?? void 0,
        y = _.stepId ?? void 0;
      if (d?.idempotencyKey) {
        let e = d.idempotencyKey;
        (c.set(e, g),
          f.push(() => {
            c.delete(e);
          }));
      }
      return (
        (async () => {
          (d?.delaySeconds &&
            d.delaySeconds > 0 &&
            (await Te(Math.min(d.delaySeconds * 1e3, en), void 0, { signal: s })),
            a.tryAcquire() ||
              (console.warn(
                `[world-local]: concurrency limit (${tn}) reached, waiting for queue to free up`,
              ),
              await a.acquire()));
          let n = 0;
          try {
            for (let i = 0; i < 256; i++) {
              let a = {
                  ...d?.headers,
                  "content-type": `application/json`,
                  "x-vqs-queue-name": o,
                  "x-vqs-message-id": g,
                  "x-vqs-message-attempt": String(n + 1),
                },
                c = l.get(h),
                u;
              try {
                if (c)
                  u = await c(
                    new Request(r(We(e), { type: m }), { method: `POST`, headers: a, body: p }),
                  );
                else {
                  let n = await Ge(e);
                  u = await fetch(r(n, { type: m }), {
                    method: `POST`,
                    duplex: `half`,
                    dispatcher: t,
                    headers: a,
                    body: p,
                  });
                }
              } catch (e) {
                let t = e?.name;
                if (s.aborted || t === `AbortError` || t === `ResponseAborted`) return;
                if (rn(e)) throw e;
                (console.error(
                  `[world-local] Queue delivery failed at the transport (loop ${i + 1}), retrying`,
                  {
                    queueName: o,
                    messageId: g,
                    ...(v && { runId: v }),
                    ...(y && { stepId: y }),
                    error: String(e),
                  },
                ),
                  await Te(5e3, void 0, { signal: s }));
                continue;
              }
              n++;
              let f = await u.text();
              if (u.ok) {
                try {
                  let e = Number(JSON.parse(f).timeoutSeconds);
                  if (Number.isFinite(e) && e >= 0) {
                    e > 0 && (await Te(Math.min(e * 1e3, en), void 0, { signal: s }));
                    continue;
                  }
                } catch {}
                return;
              }
              (console.error(
                `[world-local] Queue message failed (attempt ${n}, HTTP ${u.status})`,
                {
                  queueName: o,
                  messageId: g,
                  ...(v && { runId: v }),
                  ...(y && { stepId: y }),
                  handlerError: f,
                },
              ),
                await Te(5e3, void 0, { signal: s }));
            }
            console.error(`[world-local] Queue message exhausted safety limit (256 attempts)`, {
              queueName: o,
              messageId: g,
              ...(v && { runId: v }),
              ...(y && { stepId: y }),
            });
          } finally {
            a.release();
          }
        })()
          .catch((e) => {
            e?.name === `AbortError` ||
              e?.name === `ResponseAborted` ||
              (rn(e)
                ? console.error(
                    `[local world] Queue operation failed: detected "${nn}". This usually means a Next.js proxy/middleware consumed Workflow's internal request before the executor could read it. Exclude \`/.well-known/workflow/*\` from your matcher. See https://workflow-sdk.dev/docs/getting-started/next#configure-proxy-handler`,
                    {
                      queueName: o,
                      messageId: g,
                      ...(v && { runId: v }),
                      ...(y && { stepId: y }),
                      originalError: e,
                    },
                  )
                : console.error(`[local world] Queue operation failed:`, e));
          })
          .finally(() => {
            for (let e of f) e();
          }),
        { messageId: g }
      );
    },
    d = D({ "x-vqs-queue-name": se, "x-vqs-message-id": A, "x-vqs-message-attempt": S() });
  return {
    queue: u,
    createQueueHandler: (e, t) => async (n) => {
      let r = d.safeParse(Object.fromEntries(n.headers));
      if (!r.success || !n.body)
        return Response.json(
          { error: n.body ? `Missing required headers` : `Missing request body` },
          { status: 400 },
        );
      let i = r.data[`x-vqs-queue-name`],
        a = r.data[`x-vqs-message-id`],
        o = r.data[`x-vqs-message-attempt`];
      if (!i.startsWith(e)) return Response.json({ error: `Unhandled queue` }, { status: 400 });
      let s = await new Qt().deserialize(n.body);
      try {
        let e = await t(s, { attempt: o, queueName: i, messageId: a }),
          n = null;
        return (
          typeof e?.timeoutSeconds == `number` && (n = Math.min(e.timeoutSeconds, $t)),
          n == null ? Response.json({ ok: !0 }) : Response.json({ timeoutSeconds: n })
        );
      } catch (e) {
        return Response.json(String(e), { status: 500 });
      }
    },
    getDeploymentId: async () => `dpl_local@${(await ht()).version}`,
    registerHandler(e, t) {
      l.set(e, t);
    },
    async close() {
      s.aborted || (o.abort(), await t.close());
    },
  };
}
function sn(e) {
  return pe(`sha256`).update(e).digest(`hex`);
}
function cn(e, t, n) {
  return z(e, `.locks`, `hooks`, n ? `${t}.disposed.${n}` : `${t}.disposed`);
}
async function ln(e, t, n) {
  let r = [cn(e, t)];
  n && r.push(cn(e, t, n));
  for (let e of r)
    try {
      return (await F.access(e), !0);
    } catch {}
  return !1;
}
function un(e, t, n) {
  return z(e, `.locks`, `runs`, n ? `${t}.terminal.${n}` : `${t}.terminal`);
}
async function dn(e, t, n) {
  let r = [un(e, t)];
  n && r.push(un(e, t, n));
  for (let e of r)
    try {
      return (await F.access(e), !0);
    } catch (e) {
      if (e.code !== `ENOENT`) throw e;
    }
  return !1;
}
function fn(e, t, n) {
  return z(e, `.locks`, `runs`, n ? `${t}.pending.${n}` : `${t}.pending`);
}
function pn(e, t, n, r) {
  return L.join(fn(e, t, r), `${n}.json`);
}
async function mn(e, t, n) {
  let r = [fn(e, t)];
  n && r.push(fn(e, t, n));
  for (let e of r) {
    let t;
    try {
      t = await F.readdir(e);
    } catch (e) {
      if (e.code === `ENOENT`) continue;
      throw e;
    }
    for (let n of t)
      try {
        await B(() => F.unlink(L.join(e, n)));
      } catch (e) {
        if (e.code !== `ENOENT`) throw e;
      }
    await F.rmdir(e).catch(() => {});
  }
}
async function hn(e, t, n) {
  let r = [];
  try {
    r = await F.readdir(L.join(e, `events`));
  } catch (e) {
    if (e.code !== `ENOENT`) throw e;
  }
  let i = `${t}-`,
    a = null;
  for (let e of r) {
    if (!e.startsWith(i) || !e.endsWith(`.json`)) continue;
    let t = e.slice(0, -5);
    if (!tt(t) && !(n && et(t, n))) continue;
    let r = V(t).slice(i.length);
    (!a || r > a) && (a = r);
  }
  let o = Date.now();
  if (a)
    try {
      let e = w(a.replace(/^evnt_/, ``));
      o <= e && (o = e + 1);
    } catch {}
  return { eventId: `evnt_${yn(o)}`, createdAt: new Date(o) };
}
function gn(e, t) {
  return L.join(e, `hooks`, `tokens`, `${sn(t)}.json`);
}
async function _n(e, t, n, r) {
  let i = gn(e, t),
    a;
  try {
    a = JSON.parse(await F.readFile(i, `utf8`));
  } catch {
    return;
  }
  a.runId !== n || a.hookId !== r || (await F.unlink(i).catch(() => {}));
}
function vn(e, t, n, r) {
  let i = pe(`sha256`).update(`${t}\x00${n}\x00${r}`).digest(`hex`);
  return L.join(e, `hooks`, `tokens`, `${i}.recovery.json`);
}
const yn = O(() => Math.random()),
  $ = (e) => {
    let t = RegExp(`^${e}_`, `g`);
    return (n) => {
      let r = V(n.replace(/\.json$/, ``)) + `.json`,
        i = r.indexOf(`-`);
      return i === -1
        ? le(r.replace(/\.json$/, ``).replace(t, ``))
        : e === `step`
          ? null
          : le(
              r
                .substring(i + 1)
                .replace(/\.json$/, ``)
                .replace(t, ``),
            );
    };
  },
  bn = D({ runId: k() }),
  xn = D({ hookId: k(), tag: k().optional() });
function Sn(e, t) {
  return z(e, `hooks`, `token-index`, sn(t));
}
function Cn(e, t) {
  return (R(`hookId`, t), z(e, `hooks`, `id-index`, t));
}
function wn(e) {
  return z(e, `hooks`, `by-run`);
}
function Tn(e) {
  let t = V(e);
  return t === e ? void 0 : e.slice(t.length + 1);
}
function En(e, t) {
  return t ? tt(e) || et(e, t) : tt(e);
}
async function Dn(e) {
  try {
    return await K(e, x);
  } catch (e) {
    if (e instanceof SyntaxError || e instanceof E) return null;
    throw e;
  }
}
async function On(e, t, n, r, i, a) {
  (R(`runId`, n), R(`eventId`, i), a !== void 0 && R(`tag`, a));
  let o = a ? `${i}.${a}.json` : `${i}.json`,
    s = JSON.stringify({ runId: n });
  await Promise.all([J(L.join(Sn(e, t), o), s), J(L.join(Cn(e, r), o), s)]);
}
function kn(e, t, n, r) {
  return H(e, `hooks/by-run`, `${t}-${n}`, r);
}
async function An(e, t, n, r) {
  await J(kn(e, t, n, r), JSON.stringify(r ? { hookId: n, tag: r } : { hookId: n }));
}
async function jn(e, t, n, r) {
  (await q(kn(e, t, n, r)), r && (await q(kn(e, t, n))));
}
async function Mn(e, t) {
  R(`runId`, t);
  let n = wn(e),
    r = `${t}-`,
    i = [];
  for (let e of await Y(n)) {
    if (!e.startsWith(r)) continue;
    let t = null;
    try {
      t = await K(L.join(n, `${e}.json`), xn);
    } catch (e) {
      if (!(e instanceof SyntaxError || e instanceof E)) throw e;
    }
    i.push({ fileId: e, hookId: t?.hookId ?? null, tag: t?.tag });
  }
  return i;
}
async function Nn(e, t) {
  await q(L.join(wn(e), `${t}.json`));
}
const Pn = new Map();
function Fn() {
  Pn.clear();
}
async function In(e) {
  let t = L.resolve(e),
    n = Pn.get(t);
  return (
    n ||
      ((n = Rn(t).catch((e) => {
        throw (Pn.delete(t), e);
      })),
      Pn.set(t, n)),
    n
  );
}
async function Ln(e, t, n) {
  for (let r = 0; r < e.length; r += t) await Promise.all(e.slice(r, r + t).map(n));
}
async function Rn(e) {
  let t = L.join(e, `hooks`, `.hook-index-complete`);
  try {
    await F.access(t);
    return;
  } catch {}
  let n = L.join(e, `events`);
  await Ln(await Y(n), 32, async (t) => {
    let r = await Dn(L.join(n, `${t}.json`));
    if (!r || r.eventType !== `hook_created` || typeof r.correlationId != `string`) return;
    let i = r.eventData?.token;
    if (typeof i == `string`)
      try {
        await On(e, i, r.runId, r.correlationId, r.eventId, Tn(t));
      } catch {}
  });
  let r = L.join(e, `hooks`);
  (await Ln(await Y(r), 32, async (t) => {
    let n = null;
    try {
      n = await K(L.join(r, `${t}.json`), T);
    } catch (e) {
      if (!(e instanceof SyntaxError || e instanceof E)) throw e;
    }
    if (n)
      try {
        await An(e, n.runId, n.hookId, Tn(t));
      } catch {}
  }),
    await J(t, ``));
}
async function zn(e, t, n, r) {
  await In(e);
  let i;
  try {
    i = t.kind === `token` ? Sn(e, t.token) : Cn(e, t.hookId);
  } catch {
    return null;
  }
  let a = (await Y(i)).filter((e) => En(e, r)).sort((e, t) => V(t).localeCompare(V(e)));
  for (let t of a) {
    let r = null;
    try {
      r = await K(L.join(i, `${t}.json`), bn);
    } catch (e) {
      if (!(e instanceof SyntaxError || e instanceof E)) throw e;
    }
    if (!r) continue;
    let a = V(t),
      o;
    try {
      o = H(e, `events`, `${r.runId}-${a}`, Tn(t));
    } catch {
      continue;
    }
    let s = await Dn(o);
    if (s && s.eventType === `hook_created` && typeof s.correlationId == `string` && n(s)) return s;
  }
  return null;
}
function Bn(e, t) {
  return t === `none` ? { ...e, input: void 0, output: void 0 } : e;
}
function Vn(e, t) {
  return t === `none` ? { ...e, input: void 0, output: void 0 } : e;
}
function Hn(e, t) {
  if (t === `none`) {
    let { metadata: t, ...n } = e;
    return n;
  }
  return e;
}
function Un(e) {
  if (e.eventType !== `hook_created`) return;
  let t = e.eventData.token;
  return typeof t == `string` ? t : void 0;
}
function Wn(e) {
  let { token: t, metadata: n, isWebhook: r, isSystem: i } = e.eventData;
  return {
    runId: e.runId,
    hookId: e.correlationId,
    token: t,
    metadata: n,
    ownerId: `local-owner`,
    projectId: `local-project`,
    environment: `local`,
    createdAt: e.createdAt,
    specVersion: e.specVersion,
    isWebhook: r ?? !0,
    isSystem: i ?? !1,
  };
}
function Gn(e, t) {
  return e.eventType === `hook_created` && typeof e.correlationId == `string` && t(e);
}
async function Kn(e, t, n) {
  let r = await U(e, `runs`, t, v, n);
  return r ? y(r.status) : !1;
}
async function qn(e, t, n, r) {
  let i = await zn(e, t, (e) => Gn(e, n), r);
  return !i || !Gn(i, n) || (await Kn(e, i.runId, r)) || (await ln(e, i.correlationId, r))
    ? null
    : i;
}
async function Jn(e, t, n) {
  let r = Wn(t);
  return (
    await J(
      L.join(e, `hooks`, `tokens`, `${sn(r.token)}.json`),
      JSON.stringify({ token: r.token, hookId: r.hookId, runId: r.runId, eventId: t.eventId }),
    ),
    await An(e, r.runId, r.hookId, n),
    await J(H(e, `hooks`, r.hookId, n), JSON.stringify(r, W, 2)),
    r
  );
}
async function Yn(e, t, n) {
  let r = await qn(e, { kind: `token`, token: t }, (e) => Un(e) === t, n);
  return r ? Jn(e, r, n) : null;
}
async function Xn(e, t, n) {
  let r = await qn(e, { kind: `id`, hookId: t }, (e) => e.correlationId === t, n);
  return r ? Jn(e, r, n) : null;
}
function Zn(e, t) {
  let n = D({ hookId: k().optional() });
  async function r(r) {
    let i = null;
    try {
      i = await K(gn(e, r), n);
    } catch (e) {
      if (!(e instanceof SyntaxError || e instanceof E)) throw e;
    }
    if (i?.hookId)
      try {
        let n = await U(e, `hooks`, i.hookId, T, t);
        if (n && n.token === r) return { ...n, isWebhook: n.isWebhook ?? !0 };
      } catch (e) {
        if (!Je.is(e)) throw e;
      }
    let a = L.join(e, `hooks`),
      o = await Y(a);
    for (let e of o) {
      let t = await K(L.join(a, `${e}.json`), T);
      if (t && t.token === r) return { ...t, isWebhook: t.isWebhook ?? !0 };
    }
    return null;
  }
  async function i(n, r) {
    R(`hookId`, n);
    let i = await U(e, `hooks`, n, T, t);
    if (!i) {
      let i = await Xn(e, n, t);
      if (!i) throw new f(n);
      let a = r?.resolveData || `all`;
      return Hn({ ...i, isWebhook: i.isWebhook ?? !0 }, a);
    }
    let a = r?.resolveData || `all`;
    return Hn({ ...i, isWebhook: i.isWebhook ?? !0 }, a);
  }
  async function a(n) {
    let i = (await r(n)) ?? (await Yn(e, n, t));
    if (!i) throw new f(n);
    return i;
  }
  async function o(t) {
    let n = L.join(e, `hooks`),
      r = t.resolveData || `all`,
      i = await X({
        directory: n,
        schema: T,
        sortOrder: t.pagination?.sortOrder ?? `asc`,
        limit: t.pagination?.limit,
        cursor: t.pagination?.cursor,
        filePrefix: void 0,
        filter: (e) => !(t.runId && e.runId !== t.runId),
        getCreatedAt: () => null,
        getId: (e) => e.hookId,
      });
    return { ...i, data: i.data.map((e) => Hn(e, r)) };
  }
  return { get: i, getByToken: a, list: o };
}
async function Qn(e, t) {
  await In(e);
  for (let n of await Mn(e, t)) {
    if (n.hookId) {
      let r = null,
        i = null;
      try {
        ((i = H(e, `hooks`, n.hookId, n.tag)), (r = await K(i, T)));
      } catch (e) {
        if (!Je.is(e) && !(e instanceof SyntaxError || e instanceof E)) throw e;
      }
      r &&
        i &&
        r.runId === t &&
        (await _n(e, r.token, r.runId, r.hookId),
        await q(vn(e, r.token, r.runId, r.hookId)),
        await q(i));
    }
    await Nn(e, n.fileId);
  }
}
async function $n(e, t, n, r, i, a) {
  if (y(a.status) || (await dn(e, t)))
    throw new u(`Workflow run "${t}" is already in a terminal state`);
  let o = pn(e, t, n);
  await J(o, r);
  try {
    if ((await dn(e, t)) || (await ut(o, i)) !== `linked`)
      throw new u(`Workflow run "${t}" is already in a terminal state`);
  } finally {
    await F.unlink(o).catch(() => {});
  }
}
async function er(e, t, n, r, i) {
  R(`runId`, t);
  let a = i?.resolveData ?? `all`;
  switch (n.eventType) {
    case `run_cancelled`: {
      (await J(un(e, t), ``), await mn(e, t));
      let n = new Date(),
        i = {
          runId: r.runId,
          deploymentId: r.deploymentId,
          workflowName: r.workflowName,
          specVersion: r.specVersion,
          executionContext: r.executionContext,
          input: r.input,
          createdAt: r.createdAt,
          expiredAt: r.expiredAt,
          startedAt: r.startedAt,
          status: `cancelled`,
          output: void 0,
          error: void 0,
          completedAt: n,
          updatedAt: n,
          attributes: r.attributes,
        };
      return (
        await G(z(e, `runs`, `${t}.json`), i, { overwrite: !0 }),
        await Qn(e, t),
        { event: void 0, run: Bn(i, a) }
      );
    }
    case `wait_completed`:
    case `hook_received`: {
      let i = `evnt_${yn()}`,
        o = new Date(),
        s = { ...n, runId: t, eventId: i, createdAt: o, specVersion: 5 },
        c = z(e, `events`, `${`${t}-${i}`}.json`);
      return (
        n.eventType === `hook_received`
          ? await $n(e, t, i, JSON.stringify(s, W, 2), c, r)
          : await G(c, s),
        { event: C(s, a) }
      );
    }
    default:
      throw Error(
        `Event type '${n.eventType}' not supported for legacy runs (specVersion: ${r.specVersion || `undefined`}). Please upgrade 'workflow' package.`,
      );
  }
}
const tr = new Map();
function nr(e, t) {
  let n = tr.get(e),
    r = {},
    i = (async () => {
      n && (await n.catch(() => void 0));
      try {
        return await t();
      } finally {
        tr.get(e) === r.task && tr.delete(e);
      }
    })();
  return ((r.task = i), tr.set(e, i), i);
}
function rr(e, t) {
  let n = async (n, r) => {
    R(`runId`, n);
    let i = await U(e, `runs`, n, v, t);
    if (!i) throw new c(n);
    return Bn(i, r?.resolveData ?? `all`);
  };
  return {
    get: n,
    getMany: async (e, t) => {
      let r = [...new Set(e)],
        i = await Promise.all(
          r.map(async (e) => {
            try {
              return await n(e, t);
            } catch (e) {
              if (e instanceof c) return null;
              throw e;
            }
          }),
        ),
        a = new Map(r.map((e, t) => [e, i[t]]));
      return e.map((e) => a.get(e) ?? null);
    },
    list: async (t) => {
      let n = t?.resolveData ?? `all`,
        r = await X({
          directory: L.join(e, `runs`),
          schema: v,
          fileIdFilter: t?.fileIdFilter,
          filter: (e) =>
            !(
              (t?.workflowName && e.workflowName !== t.workflowName) ||
              (t?.status && e.status !== t.status)
            ),
          sortOrder: t?.pagination?.sortOrder ?? `desc`,
          limit: t?.pagination?.limit ?? 200,
          cursor: t?.pagination?.cursor,
          getCreatedAt: $(`wrun`),
          getId: (e) => e.runId,
        });
      return n === `none`
        ? { ...r, data: r.data.map((e) => ({ ...e, input: void 0, output: void 0 })) }
        : r;
    },
    experimentalSetAttributes: async (n, r, i) => (
      R(`runId`, n),
      nr(n, async () => {
        let a = await U(e, `runs`, n, v, t);
        if (!a) throw new c(n);
        try {
          re(r, {
            existingKeys: Object.keys(a.attributes ?? {}),
            allowReservedAttributes: i?.allowReservedAttributes,
          });
        } catch (e) {
          throw (e instanceof _, e);
        }
        let o = ie(a.attributes, r),
          s = { ...a, attributes: o, updatedAt: new Date() };
        return (await G(H(e, `runs`, n, t), s, { overwrite: !0 }), { attributes: o });
      })
    ),
  };
}
function ir() {
  let e = process.env.WORKFLOW_MAX_EVENTS,
    t = e === void 0 ? NaN : Number(e);
  return Number.isInteger(t) && t > 0 ? t : 25e3;
}
const ar = D({ hookId: k().optional(), runId: k(), eventId: k().optional() }),
  or = D({ eventId: k() });
async function sr(e) {
  try {
    return await K(e, ar);
  } catch (e) {
    if (e instanceof SyntaxError || e instanceof E) return null;
    throw e;
  }
}
async function cr(e, t, n) {
  if (t.hookId && (await ln(e, t.hookId, n))) return !0;
  let r = await U(e, `runs`, t.runId, v, n);
  return r ? y(r.status) : !0;
}
async function lr(e) {
  try {
    return await K(e, or);
  } catch (e) {
    if (e instanceof SyntaxError || e instanceof E) return null;
    throw e;
  }
}
async function ur(e, t, n) {
  return (
    (
      await X({
        directory: L.join(e, `events`),
        schema: x,
        filePrefix: `${t}-`,
        filter: (e) => e.eventType === `hook_created` && e.correlationId === n,
        limit: 1,
        getCreatedAt: $(`evnt`),
        getId: (e) => e.eventId,
      })
    ).data[0]?.eventId ?? null
  );
}
async function dr(e, t, n, r, i) {
  let a = await U(e, `events`, `${t}-${r}`, x, i);
  if (
    !a ||
    a.eventType !== `hook_created` ||
    a.correlationId !== n ||
    (await U(e, `hooks`, n, T, i))
  )
    return;
  let o = a.eventData ?? {};
  if (typeof o.token != `string`) return;
  let s = {
    runId: t,
    hookId: n,
    token: o.token,
    metadata: o.metadata,
    ownerId: `local-owner`,
    projectId: `local-project`,
    environment: `local`,
    createdAt: a.createdAt,
    specVersion: a.specVersion,
    isWebhook: o.isWebhook ?? !0,
    isSystem: o.isSystem ?? !1,
  };
  (await On(e, o.token, t, n, r, i),
    await An(e, t, n, i),
    await J(H(e, `hooks`, n, i), JSON.stringify(s, W, 2)));
}
async function fr(e, t, n, r, i) {
  let a = vn(e, t, n, r);
  return (await J(a, JSON.stringify({ eventId: i }))) ? i : ((await lr(a))?.eventId ?? null);
}
function pr(e, t, n) {
  let r = e.get(t),
    i = {},
    a = (async () => {
      r && (await r.catch(() => void 0));
      try {
        return await n();
      } finally {
        e.get(t) === i.task && e.delete(t);
      }
    })();
  return ((i.task = a), e.set(t, a), a);
}
async function mr(e, t) {
  let n = L.join(e, `waits`),
    r = await Y(n);
  for (let e of r) e.startsWith(`${t}-`) && (await q(L.join(n, `${e}.json`)));
}
async function hr(e, t, n, r) {
  return nr(t, async () => {
    let i = await K(H(e, `runs`, t, n), v),
      a = { ...r, attributes: i?.attributes ?? r.attributes };
    return (await G(H(e, `runs`, t, n), a, { overwrite: !0 }), a);
  });
}
function gr(e, t) {
  let n = 4 * 1024 * 1024,
    r = new Map(),
    i = new Map(),
    a = new Map(),
    o = 0;
  function _(e) {
    let t = r.get(e);
    if (!t) return;
    (r.delete(e), (o -= i.get(e) ?? 0), i.delete(e));
    let n = a.get(t.runId);
    (n?.delete(e), n?.size === 0 && a.delete(t.runId));
  }
  function S(e) {
    for (let t of a.get(e) ?? []) _(t);
  }
  function w() {
    (r.clear(), i.clear(), a.clear(), (o = 0));
  }
  function E(e, t, s) {
    if (s > n) return;
    for (; r.size > 0 && (r.size >= 1e3 || o + s > n);) {
      let e = r.keys().next().value;
      _(e);
    }
    (r.set(e, t), i.set(e, s), (o += s));
    let c = a.get(t.runId) ?? new Set();
    (c.add(e), a.set(t.runId, c));
  }
  function oe(e, t, r) {
    if (g(e.eventType)) {
      S(e.runId);
      return;
    }
    let i = Buffer.byteLength(r);
    if (i > n) return;
    let a = x.safeParse(JSON.parse(r, ot));
    a.success && E(t, a.data, i);
  }
  async function se(n) {
    let r = H(e, `events`, `${n.runId}-${n.eventId}`, t),
      i = JSON.stringify(n, W, 2);
    (await st(r, i), oe(n, r, i));
  }
  let D = new Map(),
    O = new Map();
  return {
    clearCache: w,
    async create(n, i, a) {
      if (
        (n != null && n !== `` && R(`runId`, n),
        `correlationId` in i &&
          typeof i.correlationId == `string` &&
          R(`correlationId`, i.correlationId),
        ne(i.eventType) && n && i.correlationId)
      )
        return pr(D, t ? `${n}-${i.correlationId}.${t}` : `${n}-${i.correlationId}`, () => o());
      if (h(i.eventType) && n && i.correlationId)
        return pr(O, t ? `${n}-${i.correlationId}.hook.${t}` : `${n}-${i.correlationId}.hook`, () =>
          o(),
        );
      return o();
      async function o() {
        let o = `evnt_${yn()}`,
          h = new Date(),
          _;
        if (i.eventType === `run_created` && (!n || n === ``)) _ = `wrun_${yn()}`;
        else if (n) _ = n;
        else throw Error(`runId is required for non-run_created events`);
        if (i.eventType === `run_created` && n && n !== ``) {
          let e = ue(_, `wrun_`);
          if (e) throw new s(e);
        }
        let S = i.specVersion ?? 5,
          w = null;
        if (
          i.eventType !== `run_created` &&
          ![`step_completed`, `step_retrying`].includes(i.eventType) &&
          ((w = await U(e, `runs`, _, v, t)),
          i.eventType === `run_started` && !w && `eventData` in i && i.eventData)
        ) {
          let n = i.eventData;
          if (n.deploymentId && n.workflowName && n.input !== void 0) {
            re(
              Object.entries(n.attributes ?? {}).map(([e, t]) => ({ key: e, value: t })),
              { allowReservedAttributes: n.allowReservedAttributes === !0 },
            );
            let r = {
              runId: _,
              deploymentId: n.deploymentId,
              status: `pending`,
              workflowName: n.workflowName,
              specVersion: S,
              executionContext: n.executionContext,
              input: n.input,
              output: void 0,
              error: void 0,
              startedAt: void 0,
              completedAt: void 0,
              attributes: n.attributes ?? {},
              createdAt: h,
              updatedAt: h,
            };
            if (await J(H(e, `runs`, _, t), JSON.stringify(r, W))) {
              let e = `evnt_${yn()}`;
              (await se({
                eventType: `run_created`,
                runId: _,
                eventId: e,
                createdAt: h,
                specVersion: S,
                eventData: {
                  deploymentId: n.deploymentId,
                  workflowName: n.workflowName,
                  input: n.input,
                  executionContext: n.executionContext,
                  attributes: n.attributes,
                  allowReservedAttributes: n.allowReservedAttributes,
                },
              }),
                (w = r));
            } else w = await U(e, `runs`, _, v, t);
          }
        }
        if ((i.eventType === `run_failed` && !w) || (i.eventType === `attr_set` && !w))
          throw new c(_);
        if (w) {
          if (ae(w.specVersion)) throw new d(w.specVersion, 5);
          if (de(w.specVersion)) return er(e, _, i, w, a);
        }
        let E = ee(i),
          D = E && i.eventType === `step_started`;
        if (w && y(w.status)) {
          if (i.eventType === `run_cancelled` && w.status === `cancelled`) {
            let e = { ...i, runId: _, eventId: o, createdAt: h, specVersion: S };
            return (
              await se(e),
              { event: C(e, a?.resolveData ?? `all`), run: w, ...(w ? { maxEvents: ir() } : {}) }
            );
          }
          if (i.eventType === `run_started`)
            throw new u(`Workflow run "${_}" is already in terminal state "${w.status}"`);
          if (g(i.eventType))
            throw new p(`Cannot transition run from terminal state "${w.status}"`);
          if (E) throw new p(`Cannot create new entities on run in terminal state "${w.status}"`);
          if (i.eventType === `attr_set`)
            throw new p(`Cannot set attributes on run in terminal state "${w.status}"`);
        }
        let O = null;
        if (ne(i.eventType) && i.eventType !== `step_created` && i.correlationId) {
          if (((O = await U(e, `steps`, `${_}-${i.correlationId}`, ce, t)), !O && !D))
            throw new s(`Step "${i.correlationId}" not found`);
          if (D && O) throw new p(`Step "${i.correlationId}" already created`);
          if (O) {
            if (m(O.status)) throw new p(`Cannot modify step in terminal state "${O.status}"`);
            if (w && y(w.status) && O.status !== `running`)
              throw new u(`Cannot modify non-running step on run in terminal state "${w.status}"`);
          }
        }
        if (
          fe(i.eventType) &&
          i.correlationId &&
          ((i.eventType === `hook_received` && (await ln(e, i.correlationId, t))) ||
            !(await U(e, `hooks`, i.correlationId, T, t)))
        )
          throw new f(i.correlationId);
        let k = { ...i, runId: _, eventId: o, createdAt: h, specVersion: S };
        if (
          (i.eventType === `run_started` && `eventData` in k && delete k.eventData,
          D && k.eventType === `step_started` && k.eventData)
        ) {
          let { input: e, ...t } = k.eventData;
          k = { ...k, eventData: t };
        }
        let A,
          j,
          M,
          N,
          pe = !1,
          me;
        if (g(i.eventType) && w) {
          (await J(un(e, _, t), ``), await mn(e, _, t));
          let n = await hn(e, _, t);
          ((o = n.eventId), (k = { ...k, eventId: o, createdAt: n.createdAt }));
        }
        if (i.eventType === `run_created` && `eventData` in i) {
          let n = i.eventData;
          if (
            (re(
              Object.entries(n.attributes ?? {}).map(([e, t]) => ({ key: e, value: t })),
              { allowReservedAttributes: n.allowReservedAttributes === !0 },
            ),
            (A = {
              runId: _,
              deploymentId: n.deploymentId,
              status: `pending`,
              workflowName: n.workflowName,
              specVersion: S,
              executionContext: n.executionContext,
              input: n.input,
              output: void 0,
              error: void 0,
              startedAt: void 0,
              completedAt: void 0,
              attributes: n.attributes ?? {},
              createdAt: h,
              updatedAt: h,
            }),
            !(await J(H(e, `runs`, _, t), JSON.stringify(A, W, 2))))
          )
            throw new p(`Workflow run "${_}" already exists`);
        } else if (i.eventType === `run_started`) {
          if (w) {
            if (w.status === `running`) return { run: w, maxEvents: ir() };
            A = await hr(e, _, t, {
              runId: w.runId,
              deploymentId: w.deploymentId,
              workflowName: w.workflowName,
              specVersion: w.specVersion,
              executionContext: w.executionContext,
              input: w.input,
              createdAt: w.createdAt,
              expiredAt: w.expiredAt,
              status: `running`,
              output: void 0,
              error: void 0,
              completedAt: void 0,
              startedAt: w.startedAt ?? h,
              updatedAt: h,
              attributes: w.attributes,
            });
          }
        } else if (i.eventType === `run_completed` && `eventData` in i) {
          let n = i.eventData;
          w &&
            ((A = await hr(e, _, t, {
              runId: w.runId,
              deploymentId: w.deploymentId,
              workflowName: w.workflowName,
              specVersion: w.specVersion,
              executionContext: w.executionContext,
              input: w.input,
              createdAt: w.createdAt,
              expiredAt: w.expiredAt,
              startedAt: w.startedAt,
              status: `completed`,
              output: n.output,
              error: void 0,
              completedAt: h,
              updatedAt: h,
              attributes: w.attributes,
            })),
            await Promise.all([Qn(e, _), mr(e, _)]));
        } else if (i.eventType === `run_failed` && `eventData` in i) {
          let n = i.eventData;
          w &&
            ((A = await hr(e, _, t, {
              runId: w.runId,
              deploymentId: w.deploymentId,
              workflowName: w.workflowName,
              specVersion: w.specVersion,
              executionContext: w.executionContext,
              input: w.input,
              createdAt: w.createdAt,
              expiredAt: w.expiredAt,
              startedAt: w.startedAt,
              status: `failed`,
              output: void 0,
              error: n.error,
              errorCode: n.errorCode,
              completedAt: h,
              updatedAt: h,
              attributes: w.attributes,
            })),
            await Promise.all([Qn(e, _), mr(e, _)]));
        } else if (i.eventType === `run_cancelled`)
          w &&
            ((A = await hr(e, _, t, {
              runId: w.runId,
              deploymentId: w.deploymentId,
              workflowName: w.workflowName,
              specVersion: w.specVersion,
              executionContext: w.executionContext,
              input: w.input,
              createdAt: w.createdAt,
              expiredAt: w.expiredAt,
              startedAt: w.startedAt,
              status: `cancelled`,
              output: void 0,
              error: void 0,
              completedAt: h,
              updatedAt: h,
              attributes: w.attributes,
            })),
            await Promise.all([Qn(e, _), mr(e, _)]));
        else if (i.eventType === `attr_set` && w)
          A = await nr(_, async () => {
            let n = await K(H(e, `runs`, _, t), v);
            if (!n) throw new c(_);
            if (
              (re(i.eventData.changes, {
                existingKeys: Object.keys(n.attributes),
                allowReservedAttributes: i.eventData.allowReservedAttributes === !0,
              }),
              i.correlationId &&
                i.eventData.writer.type === `workflow` &&
                !(await J(
                  z(
                    e,
                    `.locks`,
                    `attributes`,
                    t ? `${_}-${i.correlationId}.created.${t}` : `${_}-${i.correlationId}.created`,
                  ),
                  ``,
                )))
            )
              throw new p(`Attribute event "${i.correlationId}" already exists`);
            let r = { ...n, attributes: ie(n.attributes, i.eventData.changes), updatedAt: h };
            return (await G(H(e, `runs`, _, t), r, { overwrite: !0 }), r);
          });
        else if (i.eventType === `step_created` && `eventData` in i) {
          if (
            !(await J(
              z(
                e,
                `.locks`,
                `steps`,
                t ? `${_}-${i.correlationId}.created.${t}` : `${_}-${i.correlationId}.created`,
              ),
              ``,
            ))
          )
            throw new p(`Step "${i.correlationId}" already created`);
          let n = i.eventData;
          ((j = {
            runId: _,
            stepId: i.correlationId,
            stepName: n.stepName,
            status: `pending`,
            input: n.input,
            output: void 0,
            error: void 0,
            attempt: 0,
            startedAt: void 0,
            completedAt: void 0,
            createdAt: h,
            updatedAt: h,
            specVersion: S,
          }),
            await G(H(e, `steps`, `${_}-${i.correlationId}`, t), j));
        } else if (i.eventType === `step_started`) {
          if (!O && D) {
            let n = i.eventData;
            if (
              await J(
                z(
                  e,
                  `.locks`,
                  `steps`,
                  t ? `${_}-${i.correlationId}.created.${t}` : `${_}-${i.correlationId}.created`,
                ),
                ``,
              )
            ) {
              let r = {
                runId: _,
                stepId: i.correlationId,
                stepName: n.stepName,
                status: `pending`,
                input: n.input,
                output: void 0,
                error: void 0,
                attempt: 0,
                startedAt: void 0,
                completedAt: void 0,
                createdAt: h,
                updatedAt: h,
                specVersion: S,
              };
              await G(H(e, `steps`, `${_}-${i.correlationId}`, t), r);
              let a = `evnt_${yn()}`,
                o = {
                  eventType: `step_created`,
                  runId: _,
                  eventId: a,
                  createdAt: h,
                  specVersion: S,
                  correlationId: i.correlationId,
                  eventData: { stepName: n.stepName, input: n.input },
                };
              (await G(H(e, `events`, `${_}-${a}`, t), o), (O = r), (pe = !0));
            } else throw new p(`Step "${i.correlationId}" already created`);
          }
          if (O) {
            if (O.retryAfter && O.retryAfter.getTime() > Date.now())
              throw new l(
                `Cannot start step "${i.correlationId}": retryAfter timestamp has not been reached yet`,
                { retryAfter: Math.ceil((O.retryAfter.getTime() - Date.now()) / 1e3) },
              );
            let n = `${_}-${i.correlationId}`,
              r = await U(e, `steps`, n, ce, t);
            if (r && m(r.status)) throw new p(`Cannot modify step in terminal state "${r.status}"`);
            ((j = {
              ...O,
              status: `running`,
              startedAt: O.startedAt ?? h,
              attempt: O.attempt + 1,
              retryAfter: void 0,
              updatedAt: h,
            }),
              await G(H(e, `steps`, n, t), j, { overwrite: !0 }));
          }
        } else if (i.eventType === `step_completed` && `eventData` in i) {
          let n = i.eventData;
          if (O) {
            let r = `${_}-${i.correlationId}`;
            if (!(await J(z(e, `.locks`, `steps`, t ? `${r}.terminal.${t}` : `${r}.terminal`), ``)))
              throw new p(`Cannot modify step in terminal state`);
            ((j = { ...O, status: `completed`, output: n.result, completedAt: h, updatedAt: h }),
              await G(H(e, `steps`, r, t), j, { overwrite: !0 }));
          }
        } else if (i.eventType === `step_failed` && `eventData` in i) {
          let n = i.eventData;
          if (O) {
            let r = `${_}-${i.correlationId}`;
            if (!(await J(z(e, `.locks`, `steps`, t ? `${r}.terminal.${t}` : `${r}.terminal`), ``)))
              throw new p(`Cannot modify step in terminal state`);
            ((j = { ...O, status: `failed`, error: n.error, completedAt: h, updatedAt: h }),
              await G(H(e, `steps`, r, t), j, { overwrite: !0 }));
          }
        } else if (i.eventType === `step_retrying` && `eventData` in i) {
          let n = i.eventData;
          if (O) {
            let r = `${_}-${i.correlationId}`;
            ((j = {
              ...O,
              status: `pending`,
              error: n.error,
              retryAfter: n.retryAfter,
              updatedAt: h,
            }),
              await G(H(e, `steps`, r, t), j, { overwrite: !0 }));
          }
        } else if (i.eventType === `hook_created` && `eventData` in i) {
          let n = i.eventData,
            r = gn(e, n.token),
            s = JSON.stringify({ token: n.token, hookId: i.correlationId, runId: _, eventId: o }),
            c = !1,
            l = null,
            u = 0,
            d = 0;
          for (
            let a = 0;
            a < 10 && ((await sr(r)) || (await Yn(e, n.token, t)), (c = await J(r, s)), !c);
            a++
          ) {
            if (((l = await sr(r)), !l)) {
              (d++, d >= 3 && (await q(r)));
              continue;
            }
            if ((l.runId === _ && l.hookId === i.correlationId) || !(await cr(e, l, t))) break;
            (u++,
              u < 3
                ? await new Promise((e) => setTimeout(e, 10))
                : (await q(r),
                  l.hookId &&
                    (await q(H(e, `hooks`, l.hookId, t)),
                    await q(vn(e, n.token, l.runId, l.hookId)))),
              (l = null));
          }
          let f = !1;
          if (!c)
            if (l?.runId === _ && l.hookId === i.correlationId) {
              let r;
              if (l.eventId) r = l.eventId;
              else {
                let a = await ur(e, _, i.correlationId);
                if (a !== null)
                  throw (
                    await dr(e, _, i.correlationId, a, t),
                    new p(`Hook "${i.correlationId}" already created`)
                  );
                let s = await fr(e, n.token, _, i.correlationId, o);
                if (s === null) throw new p(`Hook "${i.correlationId}" already created`);
                r = s;
              }
              o = r;
              let a = le(o.replace(/^evnt_/, ``)) ?? h;
              ((k = { ...i, runId: _, eventId: o, createdAt: a, specVersion: S }), (f = !0));
            } else {
              let e = {
                eventType: `hook_conflict`,
                correlationId: i.correlationId,
                eventData: { token: n.token, ...(l ? { conflictingRunId: l.runId } : {}) },
                runId: _,
                eventId: o,
                createdAt: h,
                specVersion: S,
              };
              return (
                await se(e), { event: C(e, a?.resolveData ?? `all`), run: A, step: j, hook: void 0 }
              );
            }
          ((M = {
            runId: _,
            hookId: i.correlationId,
            token: n.token,
            metadata: n.metadata,
            ownerId: `local-owner`,
            projectId: `local-project`,
            environment: `local`,
            createdAt: k.createdAt,
            specVersion: S,
            isWebhook: n.isWebhook ?? !1,
            isSystem: n.isSystem ?? !1,
          }),
            (me = f ? { overwrite: !0 } : void 0),
            await On(e, n.token, _, i.correlationId, o, t));
        } else if (i.eventType === `hook_disposed`) {
          if (!(await J(cn(e, i.correlationId, t), ``)))
            throw new p(`Hook "${i.correlationId}" already disposed`);
          let n = H(e, `hooks`, i.correlationId, t),
            r = await U(e, `hooks`, i.correlationId, T, t);
          (r &&
            (await _n(e, r.token, r.runId, r.hookId), await q(vn(e, r.token, r.runId, r.hookId))),
            await q(n),
            await jn(e, _, i.correlationId, t));
        } else if (i.eventType === `wait_created` && `eventData` in i) {
          let n = `${_}-${i.correlationId}`;
          if (!(await J(z(e, `.locks`, `waits`, t ? `${n}.created.${t}` : `${n}.created`), ``)))
            throw new p(`Wait "${i.correlationId}" already exists`);
          let r = i.eventData;
          ((N = {
            waitId: n,
            runId: _,
            status: `waiting`,
            resumeAt: r.resumeAt,
            completedAt: void 0,
            createdAt: h,
            updatedAt: h,
            specVersion: S,
          }),
            await G(H(e, `waits`, n, t), N));
        } else if (i.eventType === `wait_completed`) {
          let n = `${_}-${i.correlationId}`,
            r = z(e, `.locks`, `waits`, t ? `${n}.completed.${t}` : `${n}.completed`);
          if (!(await J(r, ``))) throw new p(`Wait "${i.correlationId}" already completed`);
          let a = await U(e, `waits`, n, b, t);
          if (!a)
            throw (await F.unlink(r).catch(() => {}), new s(`Wait "${i.correlationId}" not found`));
          ((N = { ...a, status: `completed`, completedAt: h, updatedAt: h }),
            await G(H(e, `waits`, n, t), N, { overwrite: !0 }));
        }
        if (i.eventType === `hook_received` && i.correlationId && (await ln(e, i.correlationId, t)))
          throw new f(i.correlationId);
        let he = H(e, `events`, `${_}-${o}`, t),
          P = JSON.stringify(k, W, 2),
          ge;
        if (i.eventType === `hook_received`) {
          let n = await dn(e, _, t),
            r = n ? null : await U(e, `runs`, _, v, t);
          if (n || (r && y(r.status)))
            throw new u(`Workflow run "${_}" is already in a terminal state`);
          let i = pn(e, _, o, t);
          if (!(await J(i, P))) throw new p(`Event "${o}" already exists for run "${_}"`);
          try {
            if (await dn(e, _, t))
              throw new u(`Workflow run "${_}" is already in a terminal state`);
            let n = await ut(i, he);
            if (n === `missing`) throw new u(`Workflow run "${_}" is already in a terminal state`);
            ge = n === `linked`;
          } finally {
            await q(i).catch(() => {});
          }
        } else ge = await J(he, P);
        if (!ge)
          throw (
            i.eventType === `hook_created` &&
              i.correlationId &&
              (await dr(e, _, i.correlationId, o, t)),
            new p(`Event "${o}" already exists for run "${_}"`)
          );
        (oe(k, he, P),
          M &&
            i.eventType === `hook_created` &&
            (await An(e, M.runId, M.hookId, t), await G(H(e, `hooks`, M.hookId, t), M, me)));
        let _e = a?.resolveData ?? `all`,
          ve = C(k, _e),
          I,
          ye,
          be;
        if (i.eventType === `run_started` && A) {
          let t = await X({
            directory: L.join(e, `events`),
            schema: x,
            cachedItems: r,
            filePrefix: `${_}-`,
            sortOrder: `asc`,
            limit: 1e3,
            getCreatedAt: $(`evnt`),
            getId: (e) => e.eventId,
          });
          ((I = t.data), (ye = t.cursor), (be = t.hasMore));
        }
        if (te(i.eventType) && typeof a?.sinceCursor == `string`) {
          let t = await X({
            directory: L.join(e, `events`),
            schema: x,
            filePrefix: `${_}-`,
            sortOrder: `asc`,
            cursor: a.sinceCursor,
            getCreatedAt: $(`evnt`),
            getId: (e) => e.eventId,
          });
          ((I = _e === `none` ? t.data.map((e) => C(e, _e)) : t.data),
            (ye = t.cursor),
            (be = t.hasMore));
        }
        return {
          event: ve,
          run: A,
          step: j,
          hook: M,
          wait: N,
          events: I,
          cursor: ye,
          hasMore: be,
          ...(pe ? { stepCreated: !0 } : {}),
          ...(A ? { maxEvents: ir() } : {}),
        };
      }
    },
    async get(n, r, i) {
      (R(`runId`, n), R(`eventId`, r));
      let a = await U(e, `events`, `${n}-${r}`, x, t);
      if (!a) throw Error(`Event ${r} in run ${n} not found`);
      return C(a, i?.resolveData ?? `all`);
    },
    async list(t) {
      let { runId: n } = t;
      R(`runId`, n);
      let i = t.resolveData ?? `all`,
        a = await X({
          directory: L.join(e, `events`),
          schema: x,
          cachedItems: r,
          filePrefix: `${n}-`,
          sortOrder: t.pagination?.sortOrder ?? `asc`,
          limit: t.pagination?.limit,
          cursor: t.pagination?.cursor,
          getCreatedAt: $(`evnt`),
          getId: (e) => e.eventId,
        });
      return i === `none` ? { ...a, data: a.data.map((e) => C(e, i)) } : a;
    },
    async listByCorrelationId(t) {
      let n = t.correlationId;
      R(`correlationId`, n);
      let i = t.resolveData ?? `all`,
        a = await X({
          directory: L.join(e, `events`),
          schema: x,
          cachedItems: r,
          filter: (e) => e.correlationId === n,
          sortOrder: t.pagination?.sortOrder ?? `asc`,
          limit: t.pagination?.limit,
          cursor: t.pagination?.cursor,
          getCreatedAt: $(`evnt`),
          getId: (e) => e.eventId,
        });
      return i === `none` ? { ...a, data: a.data.map((e) => C(e, i)) } : a;
    },
  };
}
function _r(e, t) {
  return {
    get: async (n, r, i) => {
      (R(`runId`, n), R(`stepId`, r));
      let a = await U(e, `steps`, `${n}-${r}`, ce, t);
      if (!a) throw Error(`Step ${r} in run ${n} not found`);
      return Vn(a, i?.resolveData ?? `all`);
    },
    list: async (t) => {
      R(`runId`, t.runId);
      let n = t.resolveData ?? `all`,
        r = await X({
          directory: L.join(e, `steps`),
          schema: ce,
          filePrefix: `${t.runId}-`,
          sortOrder: t.pagination?.sortOrder ?? `desc`,
          limit: t.pagination?.limit,
          cursor: t.pagination?.cursor,
          getCreatedAt: $(`step`),
          getId: (e) => e.stepId,
        });
      return n === `none`
        ? { ...r, data: r.data.map((e) => ({ ...e, input: void 0, output: void 0 })) }
        : r;
    },
  };
}
function vr(e, t) {
  let n = rr(e, t),
    r = _r(e, t),
    i = gr(e, t),
    a = Zn(e, t);
  return {
    runs: Yt(`world.runs`, n),
    steps: Yt(`world.steps`, r),
    events: Yt(`world.events`, i),
    hooks: Yt(`world.hooks`, a),
    clearCache: () => i.clearCache(),
  };
}
const yr = O(() => Math.random()),
  br = D({ streams: j(k()) });
function xr(e) {
  return e === 1;
}
function Sr(e) {
  let t = Buffer.from([+!!e.eof]);
  return Buffer.concat([t, e.chunk]);
}
function Cr(e) {
  return xr(e[0]);
}
function wr(e) {
  return { eof: Cr(e), chunk: Buffer.from(e.subarray(1)) };
}
async function Tr(e) {
  try {
    return await F.readdir(e);
  } catch (e) {
    if (e.code === `ENOENT`) return [];
    throw e;
  }
}
function Er(e, t, n, r = n, i = () => !0) {
  for (let a of t) {
    if (!a.endsWith(n)) continue;
    let t = a.slice(0, -n.length);
    i(t) && e.set(t, r);
  }
}
function Dr(e, t) {
  return (R(`streamName`, t), L.join(e, t));
}
async function Or(e, t, n) {
  let r = Dr(e, t),
    i = await Tr(r),
    a = new Map();
  return (
    Er(a, i, `.json`),
    Er(a, i, `.bin`, `.bin`, n ? (e) => !e.endsWith(`.${n}`) : void 0),
    n && Er(a, i, `.${n}.bin`),
    { files: [...a.keys()].sort(), extMap: a, dir: r }
  );
}
function kr(e, t) {
  let n = t ? `.${t}` : ``,
    r = new Ee(),
    i = new Set();
  async function a(n, r) {
    (R(`runId`, n), R(`streamName`, r));
    let a = `${n}:${r}`;
    if (i.has(a)) return;
    let o = H(e, `streams/runs`, n, t),
      s = (await U(e, `streams/runs`, n, br, t))?.streams ?? [];
    (s.includes(r) || (s.push(r), await G(o, { streams: s }, { overwrite: !0 })), i.add(a));
  }
  function o(e) {
    return typeof e == `string`
      ? Buffer.from(new TextEncoder().encode(e))
      : e instanceof Buffer
        ? e
        : Buffer.from(e);
  }
  return {
    streams: {
      async write(t, i, s) {
        let c = `chnk_${yr()}`;
        await a(await t, i);
        let l = o(s),
          u = Sr({ chunk: l, eof: !1 });
        await st(L.join(Dr(L.join(e, `streams`, `chunks`), i), `${c}${n}.bin`), u);
        let d = Uint8Array.from(l);
        r.emit(`chunk:${i}`, { streamName: i, chunkData: d, chunkId: c });
      },
      async writeMulti(t, i, s) {
        if (s.length === 0) return;
        let c = s.map(() => `chnk_${yr()}`);
        await a(await t, i);
        let l = s
          .map((e) => o(e))
          .map(async (t, r) => {
            let a = c[r],
              o = Sr({ chunk: t, eof: !1 });
            return (
              await st(L.join(Dr(L.join(e, `streams`, `chunks`), i), `${a}${n}.bin`), o),
              { chunkId: a, chunkData: Uint8Array.from(t) }
            );
          });
        for (let e of l) {
          let { chunkId: t, chunkData: n } = await e;
          r.emit(`chunk:${i}`, { streamName: i, chunkData: n, chunkId: t });
        }
      },
      async close(t, i) {
        let o = `chnk_${yr()}`;
        (await a(await t, i),
          await st(
            L.join(Dr(L.join(e, `streams`, `chunks`), i), `${o}${n}.bin`),
            Sr({ chunk: Buffer.from([]), eof: !0 }),
          ),
          r.emit(`close:${i}`, { streamName: i }));
      },
      async list(n) {
        return (R(`runId`, n), (await U(e, `streams/runs`, n, br, t))?.streams ?? []);
      },
      async getChunks(n, r, i) {
        let a = i?.limit ?? 100,
          { files: o, extMap: s, dir: c } = await Or(L.join(e, `streams`, `chunks`), r, t),
          l = 0;
        if (i?.cursor)
          try {
            l = JSON.parse(Buffer.from(i.cursor, `base64`).toString(`utf-8`)).i;
          } catch {
            l = 0;
          }
        let u = !1,
          d = [],
          f = 0;
        for (let e of o) {
          let t = s.get(e) ?? `.bin`,
            n = L.join(c, `${e}${t}`);
          if (f < l) {
            if (xr(await lt(n))) {
              u = !0;
              break;
            }
            f++;
            continue;
          }
          if (d.length >= a) {
            xr(await lt(n)) ? (u = !0) : f++;
            break;
          }
          let r = wr(await ct(n));
          if (r.eof) {
            u = !0;
            break;
          }
          (d.push({ index: f, data: Uint8Array.from(r.chunk) }), f++);
        }
        let p = !u && f > l + d.length,
          m = l + d.length;
        return {
          data: d,
          cursor: p ? Buffer.from(JSON.stringify({ i: m })).toString(`base64`) : null,
          hasMore: p,
          done: u,
        };
      },
      async getInfo(n, r) {
        let { files: i, extMap: a, dir: o } = await Or(L.join(e, `streams`, `chunks`), r, t),
          s = !1,
          c = 0;
        for (let e of i) {
          let t = a.get(e) ?? `.bin`;
          if (xr(await lt(L.join(o, `${e}${t}`)))) {
            s = !0;
            break;
          }
          c++;
        }
        return { tailIndex: c - 1, done: s };
      },
      async get(n, i, a = 0) {
        let o = L.join(e, `streams`, `chunks`),
          s = () => {},
          c = null,
          l = !1;
        return new ReadableStream({
          async start(e) {
            let n = new Set(),
              u = [],
              d = !0,
              f = !1,
              p = (t) => {
                if (t.chunkData.byteLength === 0) {
                  n.add(t.chunkId);
                  return;
                }
                d
                  ? (n.add(t.chunkId),
                    u.push({ chunkId: t.chunkId, chunkData: Uint8Array.from(t.chunkData) }))
                  : n.has(t.chunkId) || (n.add(t.chunkId), e.enqueue(Uint8Array.from(t.chunkData)));
              },
              m = () => {
                if (d) {
                  f = !0;
                  return;
                }
                ((l = !0), s());
                try {
                  e.close();
                } catch {}
              };
            ((s = () => {
              (r.off(`chunk:${i}`, p), r.off(`close:${i}`, m), (c &&= (clearInterval(c), null)));
            }),
              r.on(`chunk:${i}`, p),
              r.on(`close:${i}`, m));
            let { files: h, extMap: g, dir: _ } = await Or(o, i, t),
              v = h.length;
            if (typeof a == `number` && a < 0 && h.length > 0) {
              let e = h[h.length - 1],
                t = g.get(e) ?? `.bin`;
              xr(await lt(L.join(_, `${e}${t}`))) && v--;
            }
            let y = typeof a == `number` && a < 0 ? Math.max(0, v + a) : a,
              b = !1;
            for (let t = y; t < h.length; t++) {
              let r = h[t],
                i = r;
              if (n.has(i)) continue;
              let a = g.get(r) ?? `.bin`,
                o = wr(await ct(L.join(_, `${r}${a}`)));
              if (o?.eof === !0) {
                b = !0;
                break;
              }
              (n.add(i), o.chunk.byteLength && e.enqueue(Uint8Array.from(o.chunk)));
            }
            ((d = !1), u.sort((e, t) => e.chunkId.localeCompare(t.chunkId)));
            for (let t of u) e.enqueue(Uint8Array.from(t.chunkData));
            if (b) {
              ((l = !0), s());
              try {
                e.close();
              } catch {}
              return;
            }
            if (f) {
              ((l = !0), s());
              try {
                e.close();
              } catch {}
              return;
            }
            for (let e = 0; e < y && e < h.length; e++) n.add(h[e]);
            if (l) {
              s();
              return;
            }
            let x = !1;
            c = setInterval(async () => {
              if (!x) {
                x = !0;
                try {
                  let { files: r, extMap: a } = await Or(o, i, t);
                  for (let t of r) {
                    let r = t;
                    if (n.has(r)) continue;
                    n.add(r);
                    let i = a.get(t) ?? `.bin`,
                      o = wr(await ct(L.join(_, `${t}${i}`)));
                    if (o?.eof === !0) {
                      ((l = !0), s());
                      try {
                        e.close();
                      } catch {}
                      return;
                    }
                    if (l) return;
                    o.chunk.byteLength && e.enqueue(Uint8Array.from(o.chunk));
                  }
                } catch (e) {
                  (e instanceof Error && `code` in e) ||
                    console.error(`[world-local] Unexpected polling error:`, e);
                } finally {
                  x = !1;
                }
              }
            }, 100);
          },
          cancel() {
            ((l = !0), s());
          },
        });
      },
    },
  };
}
function Ar(e) {
  let t = e ? Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0)) : {},
    n = { ...He.value, ...t },
    r = n.tag,
    i = on(n),
    { clearCache: a, ...o } = vr(n.dataDir, r),
    s = Ue(n);
  return {
    specVersion: 5,
    ...i,
    ...o,
    ...Yt(`world.streams`, {
      ...kr(n.dataDir, r),
      ...(n.streamFlushIntervalMs !== void 0 && { streamFlushIntervalMs: n.streamFlushIntervalMs }),
    }),
    async start() {
      if ((await Dt(n.dataDir), !s)) return;
      let e = r ? (e) => et(e, r) : tt;
      await oe(
        { ...o.runs, list: (t) => o.runs.list({ ...t, fileIdFilter: e }) },
        i.queue,
        `world-local`,
      );
    },
    async close() {
      (a(), await i.close());
    },
    async clear() {
      if ((a(), r)) {
        let e = n.dataDir,
          t = L.join(e, `hooks`),
          i = await nt(t, r),
          { HookSchema: a } = await import(`../../_chunks/workflow/dist-BX517Nmz.js`).then(
            (e) => e.t,
          );
        (await Promise.all(
          i.map(async (n) => {
            let r = await K(L.join(t, n), a);
            r?.token &&
              (await q(L.join(t, `tokens`, `${sn(r.token)}.json`)),
              await q(vn(e, r.token, r.runId, r.hookId)));
          }),
        ),
          await Promise.all(
            [`runs`, `steps`, `events`, `hooks`, `hooks/by-run`, `waits`, `streams/runs`].map(
              async (t) => {
                let n = L.join(e, t),
                  i = await nt(n, r);
                await Promise.all(i.map((e) => q(L.join(n, e))));
              },
            ),
          ));
        for (let t of [`token-index`, `id-index`]) {
          let n = L.join(e, `hooks`, t),
            i;
          try {
            i = await P.readdir(n, { withFileTypes: !0 });
          } catch {
            i = [];
          }
          await Promise.all(
            i
              .filter((e) => e.isDirectory())
              .map(async (e) => {
                let t = L.join(n, e.name),
                  i = await nt(t, r);
                await Promise.all(i.map((e) => q(L.join(t, e))));
              }),
          );
        }
        await P.rm(L.join(e, `.locks`), { recursive: !0, force: !0 }).catch(() => {});
        let o = L.join(e, `streams`, `chunks`),
          s;
        try {
          s = await P.readdir(o, { withFileTypes: !0 });
        } catch {
          s = [];
        }
        (await Promise.all(
          s
            .filter((e) => e.isDirectory())
            .map(async (e) => {
              let t = L.join(o, e.name),
                n = await rt(t, r, `.bin`);
              await Promise.all(n.map((e) => P.unlink(L.join(t, e)).catch(() => {})));
            }),
        ),
          Qe());
      } else (Qe(), Fn(), await xe(n.dataDir, { recursive: !0, force: !0 }), await Dt(n.dataDir));
    },
  };
}
function jr(e) {
  return Ar(e);
}
export {
  _t as DataDirAccessError,
  vt as DataDirVersionError,
  jr as createLocalWorld,
  Ar as createWorld,
  Ct as ensureDataDir,
  Dt as initDataDir,
  yt as parseVersion,
};
