import { i as e, o as t, r as n, t as r } from "../../_chunks/workflow/chunk-BTyA9uPd.js";
import {
  a as i,
  c as a,
  h as o,
  l as s,
  m as c,
  n as l,
  o as u,
  p as d,
} from "../../_chunks/workflow/dist-CrxV2rsR.js";
import {
  D as f,
  E as p,
  O as m,
  _ as h,
  a as g,
  c as _,
  d as v,
  g as y,
  i as b,
  l as x,
  m as S,
  n as C,
  o as w,
  r as T,
  s as E,
  t as D,
  u as O,
  x as k,
} from "../../_chunks/workflow/dist-B3qkUnLJ.js";
import {
  $t as A,
  A as j,
  An as M,
  At as N,
  B as P,
  Bn as F,
  Bt as I,
  C as L,
  Cn as R,
  Ct as ee,
  Dt as te,
  Et as ne,
  F as re,
  Fn as ie,
  Ft as z,
  G as B,
  Gt as ae,
  H as oe,
  Hn as se,
  Ht as ce,
  I as V,
  It as le,
  J as ue,
  Jt as de,
  K as fe,
  Kt as pe,
  L as me,
  Lt as H,
  M as he,
  Mn as ge,
  Mt as _e,
  N as ve,
  Nn as ye,
  Nt as be,
  Ot as xe,
  Pn as Se,
  Pt as Ce,
  Qt as we,
  R as U,
  Rt as Te,
  S as Ee,
  St as De,
  T as Oe,
  Tt as ke,
  U as Ae,
  Un as je,
  Ut as Me,
  V as Ne,
  Vt as Pe,
  W,
  Wn as Fe,
  Wt as Ie,
  X as Le,
  Xt as Re,
  Y as ze,
  Yt as Be,
  Z as Ve,
  Zt as He,
  _t as Ue,
  a as G,
  an as We,
  at as Ge,
  b as Ke,
  bt as qe,
  c as Je,
  cn as Ye,
  d as Xe,
  dn as K,
  dt as Ze,
  en as Qe,
  et as q,
  f as J,
  ft as $e,
  gn as et,
  gt as tt,
  h as nt,
  hn as rt,
  ht as it,
  i as at,
  in as ot,
  it as st,
  j as ct,
  jn as lt,
  jt as ut,
  kn as dt,
  kt as ft,
  l as Y,
  ln as pt,
  m as mt,
  mt as ht,
  n as gt,
  nn as _t,
  nt as vt,
  o as yt,
  on as bt,
  ot as xt,
  p as St,
  pn as Ct,
  pt as wt,
  q as Tt,
  qt as Et,
  rn as X,
  s as Dt,
  sn as Ot,
  tn as kt,
  tt as At,
  u as jt,
  un as Z,
  ut as Mt,
  vt as Nt,
  wn as Pt,
  wt as Ft,
  x as It,
  xt as Lt,
  y as Rt,
  yn as zt,
  yt as Bt,
  z as Vt,
  zt as Ht,
} from "../../_chunks/workflow/attribute-changes-Dk1fP6vt.js";
import {
  J as Ut,
  K as Wt,
  _ as Gt,
  a as Kt,
  g as qt,
  o as Jt,
  s as Yt,
  x as Xt,
  y as Zt,
} from "../../_chunks/workflow/dist-BX517Nmz.js";
import {
  awaitEarlierDeliveries as Qt,
  getStepFunction as $t,
  registerDeliveryBarrier as en,
  scheduleWhenIdle as tn,
} from "./private.js";
import { n as nn, r as rn, t as an } from "../../_chunks/workflow/resume-hook-czpG5xnP.js";
import {
  a as on,
  c as sn,
  d as cn,
  f as ln,
  i as un,
  l as dn,
  n as fn,
  o as pn,
  r as mn,
  s as hn,
  t as gn,
  u as _n,
} from "../../_chunks/workflow/run-6zaMjFY6.js";
import { t as vn } from "../../_chunks/workflow/run-id-BdE0MZz9.js";
import { createRequire as yn } from "node:module";
import "node:crypto";
import { types as bn } from "node:util";
import { pathToFileURL as xn } from "node:url";
import { Script as Sn, createContext as Cn, runInContext as wn } from "node:vm";
function Tn(e) {
  return e instanceof je || e instanceof se || e instanceof Fe || e instanceof ie;
}
const En = `The workflow event log contains orphaned or mismatched events and cannot be replayed. This is an internal workflow SDK error; please report it with the runId.`;
function Dn(e, t) {
  let n = t ?? _n(e);
  return S.is(e)
    ? {
        attribution: `user`,
        errorCode: n,
        hint: `A value passed across a workflow/step boundary could not be serialized. See the error message for the offending path and the Learn More link for details.`,
      }
    : Tn(e)
      ? {
          attribution: `user`,
          errorCode: n,
          hint: `A workflow-only or step-only API was called from the wrong context. The error message includes the exact API and how to move the call.`,
        }
      : D.is(e)
        ? { attribution: `sdk`, errorCode: n, hint: En }
        : e instanceof p
          ? {
              attribution: `sdk`,
              errorCode: n,
              hint: `This is an internal workflow SDK error, not a bug in your code. If it keeps happening, please report it with the stack trace and the runId.`,
            }
          : n === m.REPLAY_TIMEOUT
            ? {
                attribution: `sdk`,
                errorCode: n,
                hint: 'The workflow replay between step boundaries took too long. This bounds workflow-VM and event-log replay time only — step bodies (`"use step"` functions) are excluded. This usually means the event log is unusually large or the workflow function is doing heavy synchronous work in workflow code outside of step bodies. Override the default budget via the WORKFLOW_REPLAY_TIMEOUT_MS env var if needed.',
              }
            : n === m.MAX_DELIVERIES_EXCEEDED
              ? {
                  attribution: `sdk`,
                  errorCode: n,
                  hint: `The workflow queue exceeded its max-delivery budget. This usually indicates a persistent runtime failure — check the most recent stack traces for the underlying cause.`,
                }
              : n === m.MAX_EVENTS_EXCEEDED
                ? {
                    attribution: `user`,
                    errorCode: n,
                    hint: `The workflow exceeded the maximum number of events per run. This usually means unbounded work in the workflow function — e.g. a loop that keeps creating steps without terminating. Break long-running workflows into child workflows to stay under the limit.`,
                  }
                : n === m.CORRUPTED_EVENT_LOG
                  ? { attribution: `sdk`, errorCode: n, hint: En }
                  : n === m.WORLD_CONTRACT_ERROR
                    ? {
                        attribution: `sdk`,
                        errorCode: n,
                        hint: `The workflow backend returned data that violated the SDK contract. This is not retryable; please report it with the stack trace and runId.`,
                      }
                    : { attribution: `user`, errorCode: n };
}
const On = 4096;
function kn(e) {
  if (e === null) return !0;
  let t = typeof e;
  return t === `object` || t === `function`
    ? !1
    : t === `string`
      ? e.length <= On
      : t === `bigint`
        ? e.toString().length <= On
        : !0;
}
var An = class {
  encryptionKey;
  preparer;
  preparedPayloads = new Map();
  primitiveStepResults = new Map();
  constructor(e, t = re) {
    ((this.encryptionKey = e), (this.preparer = t));
  }
  async prewarm(e, t) {
    let n = [],
      r = (e, t) => {
        t instanceof Uint8Array &&
          (this.preparedPayloads.has(e) || n.push(this.ensurePreparation(e, t)));
      };
    r(this.workflowInputKey(e.runId), e.input);
    for (let e of t)
      switch (e.eventType) {
        case `step_completed`:
          r(this.eventPayloadKey(e.eventId, `result`), e.eventData?.result);
          break;
        case `step_failed`:
          r(this.eventPayloadKey(e.eventId, `error`), e.eventData?.error);
          break;
        case `hook_received`:
          r(this.eventPayloadKey(e.eventId, `payload`), e.eventData?.payload);
          break;
      }
    await Promise.allSettled(n);
  }
  prepareWorkflowInput(e) {
    return this.consumePreparation(this.workflowInputKey(e.runId), e.input);
  }
  prepareEventPayload(e, t, n) {
    return this.consumePreparation(this.eventPayloadKey(e, t), n);
  }
  async getStepResult(e, t) {
    if (this.primitiveStepResults.has(e)) return this.primitiveStepResults.get(e);
    let n = await t();
    return (kn(n) && this.primitiveStepResults.set(e, n), n);
  }
  consumePreparation(e, t) {
    if (!(t instanceof Uint8Array)) return this.runPreparation(t);
    let n = this.ensurePreparation(e, t);
    return (
      n.catch(() => {
        this.preparedPayloads.get(e) === n && this.preparedPayloads.delete(e);
      }),
      n
    );
  }
  ensurePreparation(e, t) {
    let n = this.preparedPayloads.get(e);
    if (n) return n;
    let r = this.runPreparation(t);
    return (this.preparedPayloads.set(e, r), r);
  }
  async runPreparation(e) {
    return this.preparer(e, this.encryptionKey);
  }
  workflowInputKey(e) {
    return `run:${e}:input`;
  }
  eventPayloadKey(e, t) {
    return `event:${e}:${t}`;
  }
};
function jn() {
  return Xt(`WORKFLOW_MAX_QUEUE_DELIVERIES`, 48, { integer: !0, min: 1, max: 48 });
}
const Mn = 24e4,
  Nn = 3e4,
  Pn = 78e4,
  Fn = new Set();
function In(e, t, n) {
  Fn.has(e) || (Fn.add(e), W.warn(t, n));
}
function Ln() {
  let e = process.env.WORKFLOW_REPLAY_TIMEOUT_MS;
  if (!e) return Mn;
  let t = Number(e);
  return !Number.isFinite(t) || t <= 0
    ? (In(e, `Ignoring WORKFLOW_REPLAY_TIMEOUT_MS: not a positive finite number; using default`, {
        raw: e,
        defaultMs: Mn,
      }),
      Mn)
    : t < 3e4
      ? (In(e, `WORKFLOW_REPLAY_TIMEOUT_MS below minimum; clamped`, {
          raw: e,
          clampedMs: Nn,
          minMs: Nn,
        }),
        Nn)
      : t > 78e4
        ? (In(e, `WORKFLOW_REPLAY_TIMEOUT_MS above maximum; clamped`, {
            raw: e,
            clampedMs: Pn,
            maxMs: Pn,
          }),
          Pn)
        : t;
}
function Rn() {
  return Xt(`WORKFLOW_REPLAY_TIMEOUT_MAX_RETRIES`, 3, { integer: !0 });
}
const zn = new Set();
function Bn() {
  let e = process.env.WORKFLOW_MAX_INLINE_STEPS;
  if (!e) return 3;
  let t = Number(e);
  return !Number.isInteger(t) || t <= 0
    ? (zn.has(e) ||
        (zn.add(e),
        W.warn(`Ignoring WORKFLOW_MAX_INLINE_STEPS: not a positive integer; using default`, {
          raw: e,
          defaultValue: 3,
        })),
      3)
    : t < 1
      ? 1
      : t > 16
        ? (zn.has(e) ||
            (zn.add(e),
            W.warn(`WORKFLOW_MAX_INLINE_STEPS above maximum; clamped`, {
              raw: e,
              clampedValue: 16,
              maxValue: 16,
            })),
          16)
        : t;
}
const Vn = new Set();
function Hn() {
  let e = process.env.WORKFLOW_MAX_EVENTS_OVERRIDE;
  if (!e) return;
  let t = Number(e);
  if (!Number.isInteger(t) || t <= 0) {
    Vn.has(e) ||
      (Vn.add(e),
      W.warn(`Ignoring WORKFLOW_MAX_EVENTS_OVERRIDE: not a positive integer; using server limit`, {
        raw: e,
      }));
    return;
  }
  return t;
}
function Un() {
  let e = process.env.WORKFLOW_OPTIMISTIC_INLINE_START;
  return e === void 0 || e === `` ? !1 : e === `1` || e.toLowerCase() === `true`;
}
function Wn() {
  let e = process.env.WORKFLOW_OPTIMISTIC_INLINE_START;
  return e === void 0 || e === `` ? !1 : e === `0` || e.toLowerCase() === `false`;
}
function Gn() {
  let e = process.env.WORKFLOW_TURBO;
  return e === void 0 || e === `` ? !0 : !(e === `0` || e.toLowerCase() === `false`);
}
function Kn() {
  let e = process.env.WORKFLOW_INLINE_OWNERSHIP;
  return e === void 0 || e === `` ? !0 : !(e === `0` || e.toLowerCase() === `false`);
}
function qn() {
  return Xt(`WORKFLOW_INLINE_OWNERSHIP_LEASE_SECONDS`, 860, { integer: !0, min: 1, max: 900 });
}
function Jn() {
  return Xt(`WORKFLOW_REPLAY_DIVERGENCE_MAX_RETRIES`, 3, { integer: !0 });
}
var Yn = n({ createWorld: () => Zn });
function Xn() {
  throw Error(
    `Workflow target world was not statically injected. Configure a Workflow builder/framework plugin so @workflow/core/runtime/world-target is aliased to the selected world package.`,
  );
}
function Zn() {
  Xn();
}
const Qn = Symbol.for(`@workflow/world//cache`),
  $n = Symbol.for(`@workflow/world//stubbedCache`),
  er = Symbol.for(`@workflow/world//cachePromise`),
  tr = Symbol.for(`@workflow/world//stubbedCachePromise`),
  Q = globalThis;
function nr(e) {
  if (typeof e.createWorld == `function`) return e.createWorld();
  if (typeof e.createLocalWorld == `function`) return e.createLocalWorld();
  if (typeof e.createVercelWorld == `function`) return e.createVercelWorld();
  if (typeof e.default == `function`) return e.default();
  if (e.default && typeof e.default == `object`) return e.default;
  throw Error(
    `Invalid target world module: must export createWorld(), a default factory, or a default World instance.`,
  );
}
const rr = async () => {
    let e = await nr(Yn),
      t = [
        `WORKFLOW_VERCEL_PROJECT`,
        `WORKFLOW_VERCEL_TEAM`,
        `WORKFLOW_VERCEL_AUTH_TOKEN`,
        `WORKFLOW_VERCEL_ENV`,
      ].filter((e) => process.env[e]);
    return (
      t.length > 0 &&
        process.env.VERCEL === `1` &&
        console.warn(
          `[workflow] Warning: ${t.join(`, `)} env var(s) are set but have no effect at runtime. These are only used by the Workflow CLI. Remove them from your Vercel project environment variables.`,
        ),
      e
    );
  },
  ir = async () => {
    if (Q[$n]) return (zt(Q[$n]), Q[$n]);
    Q[tr] ||
      (Q[tr] = rr().catch((e) => {
        throw ((Q[tr] = void 0), e);
      }));
    let e = await Q[tr];
    return (
      zt(e), (Q[$n] = e), { createQueueHandler: e.createQueueHandler, specVersion: e.specVersion }
    );
  },
  ar = async () =>
    Q[Qn]
      ? (zt(Q[Qn]), Q[Qn])
      : (Q[er] ||
          (Q[er] = rr().catch((e) => {
            throw ((Q[er] = void 0), e);
          })),
        (Q[Qn] = await Q[er]),
        zt(Q[Qn]),
        Q[Qn]),
  or = (e) => {
    ((Q[Qn] = e), (Q[$n] = e), (Q[er] = void 0), (Q[tr] = void 0));
  },
  sr = Symbol.for(`@workflow/world//getWorldFn`);
globalThis[sr] ??= ar;
var cr = class {
  limitMs;
  elapsedMs = 0;
  intervalStart;
  constructor(e = Ln()) {
    ((this.limitMs = e), (this.intervalStart = Date.now()));
  }
  get configuredLimitMs() {
    return this.limitMs;
  }
  elapsed() {
    let e = this.intervalStart === null ? 0 : Date.now() - this.intervalStart;
    return this.elapsedMs + e;
  }
  pause() {
    this.intervalStart !== null &&
      ((this.elapsedMs += Date.now() - this.intervalStart), (this.intervalStart = null));
  }
  resume() {
    this.intervalStart = Date.now();
  }
  isExhausted() {
    return this.elapsed() >= this.limitMs;
  }
};
async function lr(e) {
  let { runId: t, workflowName: n, requestId: r, attempt: i, limitMs: a } = e,
    o = W.forRun(t, n),
    s = await ar();
  if (s.processExitTriggersQueueRedelivery !== !0) {
    o.warn(
      `Workflow replay exceeded timeout; current World does not support process exit for redelivery — failing the run and returning`,
      { timeoutMs: a, attempt: i },
    );
    try {
      let e = jt(s, t),
        n = new b(`Workflow replay exceeded maximum duration (${a / 1e3}s)`);
      await s.events.create(
        t,
        {
          eventType: `run_failed`,
          specVersion: 5,
          eventData: { error: await Ke(n, t, await e()), errorCode: m.REPLAY_TIMEOUT },
        },
        { requestId: r },
      );
    } catch (e) {
      o.warn(`Unable to mark run as failed`, {
        attempt: i,
        errorName: e instanceof Error ? e.name : `UnknownError`,
        errorMessage: e instanceof Error ? e.message : String(e),
      });
    }
    return;
  }
  let c = Rn();
  i <= c &&
    (o.warn(`Workflow replay exceeded timeout but will be re-attempted (attempt < maxRetries)`, {
      timeoutMs: a,
      attempt: i,
      maxRetries: c,
    }),
    process.exit(1));
  let l = Dn(void 0, m.REPLAY_TIMEOUT);
  o.error(`Workflow replay exceeded timeout and max retries exceeded. Failing the run`, {
    timeoutMs: a,
    attempt: i,
    maxRetries: c,
    errorCode: l.errorCode,
    errorAttribution: l.attribution,
  });
  try {
    let e = jt(s, t),
      n = new b(`Workflow replay exceeded maximum duration (${a / 1e3}s) after ${i} attempts`);
    await s.events.create(
      t,
      {
        eventType: `run_failed`,
        specVersion: 5,
        eventData: { error: await Ke(n, t, await e()), errorCode: m.REPLAY_TIMEOUT },
      },
      { requestId: r },
    );
  } catch (e) {
    o.warn(`Unable to mark run as failed. The queue will continue to retry`, {
      attempt: i,
      errorName: e instanceof Error ? e.name : `UnknownError`,
      errorMessage: e instanceof Error ? e.message : String(e),
      errorStack: e instanceof Error ? e.stack : void 0,
    });
  }
  process.exit(1);
}
function ur(e) {
  let t = e.startsWith(`wrun_`) ? e.slice(5) : e;
  try {
    return Kt(vn(t).ulid);
  } catch {
    return;
  }
}
function dr(e) {
  return bn.isNativeError(e) ? e.name : `Error`;
}
function fr(e) {
  return bn.isNativeError(e) ? (e.stack ?? ``) : ``;
}
function pr(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `name` in e &&
    e.name === `AbortError` &&
    `message` in e &&
    typeof e.message == `string` &&
    (!(`stack` in e) || e.stack === void 0 || typeof e.stack == `string`)
  );
}
function mr(e) {
  if (!pr(e) || b.is(e)) return e;
  let t = new b(`Aborted: ${e.message}`);
  return (e.stack && (t.stack = e.stack), t);
}
function hr(e) {
  return typeof e == `object` && !!e && `then` in e && typeof e.then == `function`;
}
function gr(e) {
  if (bn.isNativeError(e)) return { name: e.name, message: e.message, stack: e.stack ?? `` };
  if (typeof e == `string`) return { name: `Error`, message: e, stack: `` };
  try {
    return { name: `Error`, message: JSON.stringify(e), stack: `` };
  } catch {
    return { name: `Error`, message: String(e), stack: `` };
  }
}
async function _r(e) {
  if (hr(e))
    try {
      let t = await _r(await e);
      return { ...t, message: `Promise rejection: ${t.message}` };
    } catch (e) {
      let t = await _r(e);
      return { ...t, message: `Promise rejection: ${t.message}` };
    }
  return gr(e);
}
let vr, yr, br;
async function xr() {
  if (yr !== void 0) return yr;
  if (br) return br;
  if (!vr)
    try {
      let e = [`@workflow/utils`, `get-port`].join(`/`);
      vr = yn(xn(process.cwd() + `/package.json`).href)(e).getPort;
    } catch {
      vr = async () => void 0;
    }
  return (
    (br = (vr ?? (async () => void 0))()
      .then((e) => (typeof e == `number` && (yr = e), e))
      .finally(() => {
        br = void 0;
      })),
    br
  );
}
const Sr = new Set([
  `step_created`,
  `step_started`,
  `step_completed`,
  `step_failed`,
  `step_retrying`,
  `hook_received`,
  `wait_created`,
  `wait_completed`,
]);
function Cr(e) {
  let { events: t } = e,
    n = e.invocationStartedClean && e.runCreatedAtMs !== void 0 && !e.suspensionHasWaits,
    r;
  if (n)
    for (let e of t) {
      if (Sr.has(e.eventType)) {
        n = !1;
        break;
      }
      if (e.eventType === `attr_set`) {
        let t = +(e.occurredAt ?? e.createdAt);
        r = r === void 0 ? t : Math.min(r, t);
      }
    }
  let i,
    a,
    o,
    s = t[t.length - 1];
  if (
    !e.suspensionHasWaits &&
    !e.suspensionCreatedHooks &&
    s &&
    (s.eventType === `step_completed` || s.eventType === `step_failed`)
  ) {
    i = +(s.occurredAt ?? s.createdAt);
    let e = new Set();
    for (let n of t)
      (n.eventType === `step_completed` || n.eventType === `step_failed`) &&
        n.correlationId !== void 0 &&
        e.add(n.correlationId);
    ((a = e.size), (o = t.length));
  }
  let c = n && e.runStartedReceivedAtMs !== void 0;
  if (!(!n && i === void 0))
    return {
      ...(n
        ? {
            ttfsAnchorMs: e.runCreatedAtMs,
            preStepBlockingMs:
              r === void 0 ? e.preStepBlockingMs : (e.preStepBlockingBeforeAttrMs ?? 0),
            ...(r === void 0 ? {} : { preStepAttrStartMs: r }),
          }
        : {}),
      ...(c ? { rsfsAnchorMs: e.runStartedReceivedAtMs, replayMs: e.replayMs } : {}),
      ...(i === void 0 ? {} : { prevStepEndMs: i, stepCount: a, eventCount: o }),
      turbo: e.turbo,
    };
}
function wr(e) {
  let { tracking: t } = e;
  if (!t || e.attempt !== 1) return;
  let n = t.preStepAttrStartMs ?? e.stepCodeStartedAtMs,
    r = t.ttfsAnchorMs === void 0 ? void 0 : n - t.ttfsAnchorMs - (t.preStepBlockingMs ?? 0),
    i = r !== void 0 && r >= -6e4 ? Math.max(0, r) : void 0,
    a = t.prevStepEndMs === void 0 ? void 0 : e.stepCodeStartedAtMs - t.prevStepEndMs,
    o = a !== void 0 && a >= -6e4 ? Math.max(0, a) : void 0,
    s =
      t.rsfsAnchorMs !== void 0 && e.stepStartPostSentAtMs !== void 0
        ? Math.max(0, e.stepStartPostSentAtMs - t.rsfsAnchorMs)
        : void 0,
    c = t.replayMs === void 0 ? void 0 : Math.max(0, t.replayMs);
  if (i === void 0 && o === void 0) return;
  let l = [];
  return (
    t.turbo && l.push(`turbo`),
    e.lazyStepStart && l.push(`lazyStepStart`),
    e.optimisticStart && l.push(`optimisticStart`),
    {
      ...(i === void 0 ? {} : { ttfs: i }),
      ...(o === void 0 ? {} : { stso: o }),
      ...(o !== void 0 && t.stepCount !== void 0 ? { stepCount: t.stepCount } : {}),
      ...(o !== void 0 && t.eventCount !== void 0 ? { eventCount: t.eventCount } : {}),
      ...(s === void 0 ? {} : { rsfs: s }),
      ...(c === void 0 ? {} : { finalSchedulingReplay: c }),
      optimizations: l,
    }
  );
}
function Tr(e, t) {
  if (t && !(!e.events || e.cursor === void 0))
    return { events: e.events, cursor: e.cursor, hasMore: e.hasMore ?? !1 };
}
async function Er(e) {
  let {
      world: t,
      workflowRunId: n,
      workflowName: r,
      workflowStartedAt: i,
      stepId: a,
      stepName: o,
    } = e,
    u = process.env.VERCEL_URL !== void 0,
    d = (e.runSpecVersion ?? 0) >= 5;
  return q(`step.execute ${c(o)}`, {}, async (c) => {
    c?.setAttributes({ ...ft(o), ...Et(r), ..._t(n), ...ne(a) });
    let f = jt(t, n),
      m = $t(o);
    if (!m || typeof m != `function`) {
      let i = `Step "${o}" is not registered in the current deployment. This usually indicates a build or bundling issue that caused the step to not be included in the deployment.`;
      if (
        (W.error(`Step function not registered, failing step`, {
          workflowRunId: n,
          stepName: o,
          stepId: a,
        }),
        e.lazyStepInput !== void 0)
      )
        try {
          (e.runReadyBarrier && (await e.runReadyBarrier.catch(() => {})),
            await t.events.create(n, {
              eventType: `step_started`,
              specVersion: 5,
              correlationId: a,
              eventData: {
                stepName: o,
                workflowName: r,
                input: e.lazyStepInput,
                ...(e.ownerMessageId === void 0 ? {} : { ownerMessageId: e.ownerMessageId }),
              },
            }));
        } catch (e) {
          if (T.is(e)) return { type: `skipped` };
          if (v.is(e)) return { type: `gone` };
          throw e;
        }
      try {
        await t.events.create(n, {
          eventType: `step_failed`,
          specVersion: 5,
          correlationId: a,
          eventData: { stepName: o, error: await Ee(new b(i), n, await f(), [], globalThis, d) },
        });
      } catch (e) {
        if (T.is(e)) return { type: `skipped` };
        throw e;
      }
      return (c?.setAttributes({ ...H(`failed`), ...Ft(!0) }), { type: `failed` });
    }
    let g = m.maxRetries ?? 3;
    if (
      (c?.setAttributes({ ...xe(g) }),
      e.authoritativeAttempt !== void 0 && e.authoritativeAttempt > g + 1)
    ) {
      let r = g,
        i = `Step "${o}" exceeded max retries (${r} ${s(`retry`, `retries`, r)})`;
      B.error(`Step exceeded max retries`, {
        workflowRunId: n,
        stepName: o,
        stepId: a,
        attempt: e.authoritativeAttempt,
        maxRetries: g,
      });
      try {
        await t.events.create(n, {
          eventType: `step_failed`,
          specVersion: 5,
          correlationId: a,
          eventData: { stepName: o, error: await Ee(new b(i), n, await f(), [], globalThis, d) },
        });
      } catch (e) {
        if (T.is(e))
          return (
            W.info(`Tried failing step for exceeded retries, but step has already finished.`, {
              workflowRunId: n,
              stepId: a,
              stepName: o,
              message: e instanceof Error ? e.message : String(e),
            }),
            { type: `skipped` }
          );
        if (v.is(e)) return { type: `gone` };
        throw e;
      }
      return (c?.setAttributes({ ...H(`failed`), ...ut(!0) }), { type: `failed` });
    }
    let _ = (e) => {
        if (y.is(e)) {
          let t = Math.max(1, typeof e.retryAfter == `number` ? e.retryAfter : 1);
          return (
            W.info(`Throttled on step_started, deferring`, { retryAfterSeconds: t }),
            { type: `throttled`, timeoutSeconds: t }
          );
        }
        if (v.is(e))
          return (
            W.info(`Workflow run "${n}" has already completed, skipping step "${a}": ${e.message}`),
            { type: `gone` }
          );
        if (T.is(e))
          return (
            W.debug(`Step in terminal state, skipping`, {
              stepName: o,
              stepId: a,
              workflowRunId: n,
              error: e instanceof Error ? e.message : String(e),
            }),
            c?.setAttributes({ ...le(!0), ...z(`completed`) }),
            { type: `skipped` }
          );
        if (h.is(e)) {
          let t = Math.max(1, e.retryAfter ?? 1);
          return (
            W.debug(`Step retryAfter timestamp not yet reached`, {
              stepName: o,
              stepId: a,
              timeoutSeconds: t,
            }),
            { type: `retry`, timeoutSeconds: t }
          );
        }
      },
      x =
        e.lazyStepInput !== void 0 &&
        e.suppressOptimisticStart !== !0 &&
        (Un() || (e.forceOptimisticStart === !0 && !Wn())),
      S,
      C,
      w,
      E = async () => {
        if (!w) return;
        let e = await w;
        if (e.ok) return;
        let t = _(e.err);
        if (!t) throw e.err;
        return t;
      };
    if (x) {
      w = (e.runReadyBarrier ?? Promise.resolve())
        .then(
          () => (
            (C = Date.now()),
            t.events.create(
              n,
              {
                eventType: `step_started`,
                specVersion: 5,
                correlationId: a,
                eventData: {
                  stepName: o,
                  workflowName: r,
                  input: e.lazyStepInput,
                  ...(e.ownerMessageId === void 0 ? {} : { ownerMessageId: e.ownerMessageId }),
                },
              },
              e.stateUpdatedAt === void 0 ? void 0 : { stateUpdatedAt: e.stateUpdatedAt },
            )
          ),
        )
        .then(
          () => ({ ok: !0 }),
          (e) => ({ ok: !1, err: e }),
        );
      let i = new Date();
      S = {
        runId: n,
        stepId: a,
        stepName: o,
        status: `running`,
        input: e.lazyStepInput,
        attempt: 1,
        startedAt: i,
        createdAt: i,
        updatedAt: i,
      };
    } else
      try {
        let i = e.ownerMessageId === void 0 ? {} : { ownerMessageId: e.ownerMessageId };
        C = Date.now();
        let s = await t.events.create(
          n,
          {
            eventType: `step_started`,
            specVersion: 5,
            correlationId: a,
            eventData:
              e.lazyStepInput === void 0
                ? { stepName: o, ...i }
                : { stepName: o, workflowName: r, input: e.lazyStepInput, ...i },
          },
          e.stateUpdatedAt === void 0 ? void 0 : { stateUpdatedAt: e.stateUpdatedAt },
        );
        if (!s.step) throw new p(`step_started event for "${a}" did not return step entity`);
        S = s.step;
      } catch (e) {
        let t = _(e);
        if (t) return t;
        throw e;
      }
    (W.debug(`Step execution details`, {
      stepName: o,
      stepId: S.stepId,
      status: S.status,
      attempt: S.attempt,
    }),
      c?.setAttributes({ ...H(S.status) }));
    let D;
    if (S.attempt > g + 1 && S.error) {
      let e = S.attempt - 1,
        r = `Step "${o}" exceeded max retries (${e} ${s(`retry`, `retries`, e)})`;
      B.error(`Step exceeded max retries`, { workflowRunId: n, stepName: o, retryCount: e });
      let i = new b(r);
      if (S.error != null)
        try {
          i.cause = await ct(S.error, n, await f());
        } catch {}
      try {
        await t.events.create(n, {
          eventType: `step_failed`,
          specVersion: 5,
          correlationId: a,
          eventData: { stepName: o, error: await Ee(i, n, await f(), [], globalThis, d) },
        });
      } catch (e) {
        if (T.is(e))
          return (
            W.info(`Tried failing step, but step has already finished.`, {
              workflowRunId: n,
              stepId: a,
              stepName: o,
              message: e.message,
            }),
            { type: `skipped` }
          );
        throw e;
      }
      return (c?.setAttributes({ ...H(`failed`), ...ut(!0) }), { type: `failed` });
    }
    let k = [],
      A = [],
      M = !0,
      P,
      F = () => {
        if (!P || P.rsfs !== void 0) return;
        let t = e.latencyTracking?.rsfsAnchorMs;
        t === void 0 ||
          C === void 0 ||
          ((P.rsfs = Math.max(0, C - t)), c && c.setAttributes({ ...Ce(P.rsfs) }));
      };
    try {
      let t = S.attempt;
      if (!S.startedAt) throw new p(`Step "${a}" has no "startedAt" timestamp`);
      let s = S.startedAt,
        h = e.encryptionKey ?? (await f()),
        g = await q(`step.hydrate`, {}, async (t) => {
          let r = Date.now(),
            i = await j(S.input, n, h, A, globalThis, {}, e.workflowDeploymentId),
            a = Date.now() - r;
          return (t?.setAttributes({ ...qe(i.args.length), ...Ue(a) }), i);
        }),
        _ = g.args,
        v = g.thisVal ?? null,
        y = l(u ? `https://${process.env.VERCEL_URL}` : `http://localhost:${(await xr()) ?? 3e3}`),
        b,
        w = !1,
        T = Date.now();
      ((P = wr({
        tracking: e.latencyTracking,
        stepCodeStartedAtMs: T,
        attempt: t,
        lazyStepStart: e.lazyStepInput !== void 0,
        optimisticStart: x,
        stepStartPostSentAtMs: C,
      })),
        P &&
          c?.setAttributes({
            ...(P.ttfs === void 0 ? {} : Ht(P.ttfs)),
            ...(P.stso === void 0 ? {} : Te(P.stso)),
            ...(P.rsfs === void 0 ? {} : Ce(P.rsfs)),
            ...(P.finalSchedulingReplay === void 0 ? {} : ke(P.finalSchedulingReplay)),
            ...te(P.optimizations ?? []),
          }));
      try {
        D = await q(
          `step.execute`,
          {},
          async () =>
            await Ae.run(
              {
                stepMetadata: { stepName: o, stepId: a, stepStartedAt: new Date(+s), attempt: t },
                workflowMetadata: {
                  workflowName: r,
                  workflowRunId: n,
                  workflowStartedAt: new Date(+i),
                  url: y,
                  features: { encryption: !!h },
                },
                workflowDeploymentId: e.workflowDeploymentId,
                rootRunId: e.rootRunId,
                ops: A,
                preCompletionOps: k,
                closureVars: g.closureVars,
                encryptionKey: h,
                runReadyBarrier: x ? e.runReadyBarrier : void 0,
              },
              () => m.apply(v, _),
            ),
        );
      } catch (e) {
        ((b = e), (w = !0));
      }
      let O = Date.now() - T;
      if ((Rt(..._, v, g.closureVars), w)) throw b;
      if (
        (c?.setAttributes({ ...Nt(O) }),
        (D = await q(`step.dehydrate`, {}, async (t) => {
          let r = Date.now(),
            i = await L(D, n, h, A, globalThis, !1, !1, d, x ? e.runReadyBarrier : void 0),
            a = Date.now() - r;
          return (t?.setAttributes({ ...Bt(a), ...N(typeof i) }), i);
        })),
        A.length > 0)
      ) {
        let e = Promise.all(A);
        (gt(e, (e) => {
          W.warn(`Background flush of step stream ops failed`, {
            workflowRunId: n,
            stepId: a,
            error: e instanceof Error ? e.message : String(e),
          });
        }),
          (M = await Promise.race([
            e.then(
              () => !0,
              (e) => {
                if (e?.name === `AbortError` || e?.name === `ResponseAborted`) return !0;
                throw e;
              },
            ),
            new Promise((e) => setTimeout(() => e(!1), 500)),
          ])));
      }
      if (x) {
        let e = await E();
        if (e) return e;
        F();
      }
      k.length > 0 && (await Promise.all(k).catch(() => {}));
    } catch (e) {
      if (x) {
        let e = await E();
        if (e) return e;
        F();
      }
      k.length > 0 && (await Promise.all(k).catch(() => {}));
      let r = mr(e),
        i = await _r(r),
        l = i.stack || fr(r) || ``;
      r instanceof Error && c?.recordException?.(r);
      let u = b.is(r);
      if (
        (c?.setAttributes({
          ...ee(dr(r)),
          ...De(i.message),
          ...xt(dr(r)),
          ...st(u ? `fatal` : O.is(r) ? `retryable` : `transient`),
          ...Ge(!u),
        }),
        v.is(e))
      )
        return (
          B.info(`Workflow run already completed, skipping step`, {
            workflowRunId: n,
            stepId: a,
            message: e.message,
          }),
          { type: `gone` }
        );
      if (u) {
        (B.error(`Encountered FatalError while executing step, bubbling up to parent workflow`, {
          workflowRunId: n,
          stepName: o,
          errorStack: l,
        }),
          bn.isNativeError(r) && l && (r.stack = l));
        try {
          await t.events.create(n, {
            eventType: `step_failed`,
            specVersion: 5,
            correlationId: a,
            eventData: { stepName: o, error: await Ee(r, n, await f(), [], globalThis, d), ...P },
          });
        } catch (e) {
          if (T.is(e))
            return (
              W.info(`Tried failing step, but step has already finished.`, {
                workflowRunId: n,
                stepId: a,
                stepName: o,
                message: e.message,
              }),
              { type: `skipped` }
            );
          throw e;
        }
        return (c?.setAttributes({ ...H(`failed`), ...Ft(!0) }), { type: `failed` });
      }
      let p = S.attempt;
      if ((c?.setAttributes({ ...Lt(p), ...xe(g) }), p >= g + 1)) {
        let r = S.attempt - 1;
        B.error(`Max retries reached, bubbling error to parent workflow`, {
          workflowRunId: n,
          stepName: o,
          attempt: S.attempt,
          retryCount: r,
          errorStack: l,
        });
        let u = new b(`Step "${o}" failed after ${g} ${s(`retry`, `retries`, g)}: ${i.message}`);
        ((u.cause = e), l && (u.stack = l));
        try {
          await t.events.create(n, {
            eventType: `step_failed`,
            specVersion: 5,
            correlationId: a,
            eventData: { stepName: o, error: await Ee(u, n, await f(), [], globalThis, d), ...P },
          });
        } catch (e) {
          if (T.is(e))
            return (
              W.info(`Tried failing step, but step has already finished.`, {
                workflowRunId: n,
                stepId: a,
                stepName: o,
                message: e.message,
              }),
              { type: `skipped` }
            );
          throw e;
        }
        return (c?.setAttributes({ ...H(`failed`), ...ut(!0) }), { type: `failed` });
      }
      (O.is(e)
        ? B.info(`Encountered RetryableError, step will be retried`, {
            workflowRunId: n,
            stepName: o,
            attempt: p,
            message: e.message,
          })
        : B.info(`Encountered Error, step will be retried`, {
            workflowRunId: n,
            stepName: o,
            attempt: p,
            errorStack: l,
          }),
        bn.isNativeError(e) && l && (e.stack = l));
      try {
        await t.events.create(n, {
          eventType: `step_retrying`,
          specVersion: 5,
          correlationId: a,
          eventData: {
            stepName: o,
            error: await Ee(e, n, await f(), [], globalThis, d),
            ...(O.is(e) && { retryAfter: e.retryAfter }),
          },
        });
      } catch (e) {
        if (T.is(e))
          return (
            W.info(`Tried retrying step, but step has already finished.`, {
              workflowRunId: n,
              stepId: a,
              stepName: o,
              message: e.message,
            }),
            { type: `skipped` }
          );
        throw e;
      }
      let m = Math.max(1, O.is(e) ? Math.ceil((+e.retryAfter.getTime() - Date.now()) / 1e3) : 1);
      return (c?.setAttributes({ ..._e(m), ...be(!0) }), { type: `retry`, timeoutSeconds: m });
    }
    let I;
    try {
      I = await t.events.create(
        n,
        {
          eventType: `step_completed`,
          specVersion: 5,
          correlationId: a,
          eventData: { stepName: o, workflowName: r, result: D, ...P },
        },
        e.inlineDeltaSinceCursor === void 0 ? void 0 : { sinceCursor: e.inlineDeltaSinceCursor },
      );
    } catch (e) {
      if (T.is(e))
        return (
          W.info(`Tried completing step, but step has already finished.`, {
            workflowRunId: n,
            stepId: a,
            stepName: o,
            message: e.message,
          }),
          { type: `skipped` }
        );
      if (v.is(e))
        return (
          B.info(`Workflow run already completed, skipping step`, {
            workflowRunId: n,
            stepId: a,
            message: e.message,
          }),
          { type: `gone` }
        );
      throw e;
    }
    let R = Tr(I, e.inlineDeltaSinceCursor !== void 0);
    return (
      c?.setAttributes({ ...H(`completed`), ...N(typeof D) }),
      A.length > 0 &&
        B.debug(`Step has pending ops`, { workflowRunId: n, stepName: o, opsCount: A.length }),
      { type: `completed`, hasPendingOps: !M, inlineDelta: R }
    );
  });
}
function Dr(e) {
  return e.hasCreatedEvent === !0 && e.ownerMessageId !== void 0 && e.sawRetrying !== !0;
}
function Or(e, t) {
  if (e.lastStartedAt === void 0) return 0;
  let n = qn(),
    r = e.lastStartedAt + n * 1e3 - t;
  return Math.min(n, Math.max(0, Math.ceil(r / 1e3)));
}
function kr(e) {
  return `${e.correlationId}:backstop:${e.lastStartedAt}`;
}
function Ar(e, t, n) {
  let r = new Map(),
    i = new Set();
  for (let t of e)
    if (t.correlationId !== void 0)
      if (t.eventType === `step_started`) {
        let e =
          `eventData` in t &&
          t.eventData &&
          `ownerMessageId` in t.eventData &&
          typeof t.eventData.ownerMessageId == `string`
            ? t.eventData.ownerMessageId
            : void 0;
        r.set(t.correlationId, e);
      } else t.eventType === `step_retrying` && i.add(t.correlationId);
  for (let e of t) if (e !== void 0 && !i.has(e) && r.get(e) === n) return !0;
  return !1;
}
const jr = new Map();
async function Mr(e, t, n) {
  let r = `${e}:${t}`,
    i = jr.get(r);
  if (i) {
    W.warn(
      `Step execution already in flight in this process; awaiting its settlement instead of executing again`,
      { workflowRunId: e, stepId: t },
    );
    try {
      await i;
    } catch {}
    return { type: `skipped` };
  }
  let a = n();
  jr.set(r, a);
  try {
    return await a;
  } finally {
    jr.delete(r);
  }
}
async function Nr({ runId: e, hookEvent: t, queueItem: n, requestId: r, createEvent: i }) {
  try {
    return (await i(t, { requestId: r })).event?.eventType === `hook_conflict`
      ? { hasHookConflict: !0, hasAwaitedHookCreation: !1 }
      : { hasHookConflict: !1, hasAwaitedHookCreation: n.hasConflictAwaiter === !0 };
  } catch (t) {
    if (T.is(t))
      return (
        W.info(`Hook already exists, continuing`, { workflowRunId: e, message: t.message }),
        { hasHookConflict: !1, hasAwaitedHookCreation: n.hasConflictAwaiter === !0 }
      );
    if (v.is(t))
      return (
        W.info(`Workflow run already completed, skipping hook`, {
          workflowRunId: e,
          message: t.message,
        }),
        { hasHookConflict: !1, hasAwaitedHookCreation: !1 }
      );
    throw t;
  }
}
async function Pr({
  suspension: e,
  world: t,
  run: n,
  span: r,
  requestId: i,
  eventLog: a,
  runReadyBarrier: o,
}) {
  let s = n.runId,
    c = async () => {
      if (o)
        try {
          await o;
        } catch {}
    },
    l = (e, n) =>
      a
        ? nt(s, a, (r) => t.events.create(s, e, { ...n, stateUpdatedAt: r }))
        : t.events.create(s, e, n),
    u = e.steps.filter((e) => e.type === `step`),
    d = e.steps.filter((e) => e.type === `hook`),
    f = e.steps.filter((e) => e.type === `wait`),
    p = e.steps.filter((e) => e.type === `attribute`),
    m = d.filter((e) => !e.hasCreatedEvent),
    h = new Map();
  for (let e of d) {
    if (e.hasCreatedEvent && !e.disposed) continue;
    let t = h.get(e.token);
    t ? t.push(e) : h.set(e.token, [e]);
  }
  let g = await t.getEncryptionKeyForRun?.(n),
    _ = g ? await Se(g) : void 0,
    y = (n.specVersion ?? 0) >= 5;
  async function x(e) {
    let t = {
      eventType: `hook_disposed`,
      specVersion: 5,
      correlationId: e.correlationId,
      eventData: { token: e.token },
    };
    try {
      await l(t, { requestId: i });
    } catch (t) {
      if (T.is(t))
        W.info(`Hook already disposed, skipping duplicate disposal`, {
          workflowRunId: s,
          correlationId: e.correlationId,
          message: t.message,
        });
      else if (v.is(t))
        W.info(`Workflow run already completed, skipping hook disposal`, {
          workflowRunId: s,
          correlationId: e.correlationId,
          message: t.message,
        });
      else if (w.is(t))
        W.info(`Hook not found for disposal, continuing`, {
          workflowRunId: s,
          correlationId: e.correlationId,
          message: t.message,
        });
      else throw t;
    }
  }
  let S = !1,
    C = !1,
    E = 0;
  if (h.size > 0) {
    let t = Date.now();
    (await c(),
      await Promise.all(
        [...h.values()].map(async (t) => {
          for (let n of t) {
            let t = !1;
            if (!n.hasCreatedEvent) {
              let r =
                  n.metadata === void 0 ? void 0 : await It(n.metadata, s, _, e.globalThis, !1, y),
                a = await Nr({
                  runId: s,
                  hookEvent: {
                    eventType: `hook_created`,
                    specVersion: 5,
                    correlationId: n.correlationId,
                    eventData: {
                      token: n.token,
                      tokenRetentionUntil: n.tokenRetentionUntil,
                      metadata: r,
                      isWebhook: n.isWebhook ?? !1,
                      ...(n.isSystem && { isSystem: !0 }),
                    },
                  },
                  queueItem: n,
                  requestId: i,
                  createEvent: l,
                });
              ((S ||= a.hasHookConflict),
                (C ||= a.hasAwaitedHookCreation),
                (t = a.hasHookConflict));
            }
            n.disposed && !t && (await x(n));
          }
        }),
      ),
      (E = Date.now() - t));
  }
  let D = d.filter((e) => e.abortRequested && !e.disposed);
  D.length > 0 &&
    (await c(),
    await Promise.all(
      D.map(async (n) => {
        try {
          let r = await It({ aborted: !0, reason: n.abortReason }, s, _, e.globalThis, !1, y);
          await l({
            eventType: `hook_received`,
            specVersion: 5,
            correlationId: n.correlationId,
            eventData: { token: n.token, payload: r },
          });
          try {
            let e = Ne(n.token);
            (await t.streams.write(s, e, r), await t.streams.close(s, e));
          } catch {
            W.debug(`Failed to write abort stream packet, hook event will provide fallback`, {
              workflowRunId: s,
              correlationId: n.correlationId,
            });
          }
        } catch (e) {
          if (T.is(e) || v.is(e))
            W.info(`Workflow run already completed, skipping abort`, {
              workflowRunId: s,
              correlationId: n.correlationId,
              message: e.message,
            });
          else throw e;
        }
      }),
    ));
  let O = new Set(u.filter((e) => !e.hasCreatedEvent).map((e) => e.correlationId)),
    k = new Set(),
    A = new Set(
      C === !1
        ? u
            .filter((e) => O.has(e.correlationId))
            .slice(0, Bn())
            .map((e) => e.correlationId)
        : [],
    ),
    j = new Map(),
    M = [];
  for (let t of u)
    O.has(t.correlationId) &&
      M.push(
        (async () => {
          let r = await It(
            { args: t.args, closureVars: t.closureVars, thisVal: t.thisVal },
            s,
            _,
            e.globalThis,
            !1,
            y,
          );
          if (A.has(t.correlationId)) {
            j.set(t.correlationId, {
              correlationId: t.correlationId,
              stepName: t.stepName,
              dehydratedInput: r,
            });
            return;
          }
          let a = {
            eventType: `step_created`,
            specVersion: 5,
            correlationId: t.correlationId,
            eventData: { stepName: t.stepName, workflowName: n.workflowName, input: r },
          };
          try {
            (await c(), await l(a, { requestId: i }), k.add(t.correlationId));
          } catch (e) {
            if (T.is(e))
              W.info(`Step already exists, continuing`, {
                workflowRunId: s,
                correlationId: t.correlationId,
                message: e.message,
              });
            else throw e;
          }
        })(),
      );
  for (let e of f)
    e.hasCreatedEvent ||
      M.push(
        (async () => {
          let t = {
            eventType: `wait_created`,
            specVersion: 5,
            correlationId: e.correlationId,
            eventData: { resumeAt: e.resumeAt },
          };
          try {
            (await c(), await l(t, { requestId: i }));
          } catch (t) {
            if (T.is(t))
              W.info(`Wait already exists, continuing`, {
                workflowRunId: s,
                correlationId: e.correlationId,
                message: t.message,
              });
            else throw t;
          }
        })(),
      );
  for (let e of p)
    M.push(
      (async () => {
        try {
          (await c(),
            await t.events.create(
              s,
              {
                eventType: `attr_set`,
                specVersion: 5,
                correlationId: e.correlationId,
                eventData: {
                  changes: e.changes,
                  writer: { type: `workflow` },
                  ...(e.allowReservedAttributes ? { allowReservedAttributes: !0 } : {}),
                },
              },
              { requestId: i },
            ));
        } catch (t) {
          if (T.is(t))
            W.info(`Workflow attribute event already exists, continuing`, {
              workflowRunId: s,
              correlationId: e.correlationId,
              message: t.message,
            });
          else if (Fr(t)) {
            let e = new b(
              `setAttributes failed World validation: ${t instanceof Error ? t.message : String(t)}`,
            );
            throw ((e.cause = t), e);
          } else throw t;
        }
      })(),
    );
  await Promise.all(M);
  let N = [];
  for (let e of A) {
    let t = j.get(e);
    t && N.push(t);
  }
  let P = Date.now(),
    F;
  for (let e of f) {
    let t = e.resumeAt.getTime(),
      n = Math.max(1e3, t - P),
      r = Math.ceil(n / 1e3);
    (!F || r < F.seconds) && (F = { seconds: r, correlationId: e.correlationId });
  }
  return (
    r?.setAttributes({
      ...X(`workflow_suspended`),
      ...We(u.length),
      ...pe(m.length),
      ...pt(f.length),
    }),
    {
      pendingSteps: u,
      createdStepCorrelationIds: k,
      lazyInlineSteps: N,
      waitTimeout: S ? void 0 : F,
      hasHookConflict: S,
      hasAwaitedHookCreation: C,
      hasAttributeEvents: p.length > 0,
      hasHookEvents: m.length > 0,
      hookCreationMs: E,
    }
  );
}
function Fr(e) {
  return e instanceof Wt || (e instanceof Error && e.name === `AttributeValidationError`)
    ? !0
    : f.is(e) && e.status === 400;
}
const Ir = () => Xt(`WORKFLOW_WAIT_CONTINUATION_MAX_DELAY_SECONDS`, 82800, { integer: !0, min: 1 }),
  Lr = () => Xt(`WORKFLOW_NEAR_ELAPSED_WAIT_THRESHOLD_SECONDS`, 2);
function Rr(e, t, n = Date.now()) {
  let r = Ir();
  if (e <= Math.min(Lr(), r))
    return { delaySeconds: e, idempotencyKey: `${t}:${Math.floor(n / 1e3)}` };
  let i = Math.ceil(e / r);
  return { delaySeconds: Math.min(e, r), idempotencyKey: i === 1 ? t : `${t}:hop-${i}` };
}
var zr = 44,
  Br = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
  Vr = new Uint8Array(64),
  Hr = new Uint8Array(128);
for (let e = 0; e < Br.length; e++) {
  let t = Br.charCodeAt(e);
  ((Vr[e] = t), (Hr[t] = e));
}
function Ur(e, t) {
  let n = 0,
    r = 0,
    i = 0;
  do ((i = Hr[e.next()]), (n |= (i & 31) << r), (r += 5));
  while (i & 32);
  let a = n & 1;
  return ((n >>>= 1), a && (n = -2147483648 | -n), t + n);
}
function Wr(e, t) {
  return e.pos >= t ? !1 : e.peek() !== zr;
}
var Gr = class {
  constructor(e) {
    ((this.pos = 0), (this.buffer = e));
  }
  next() {
    return this.buffer.charCodeAt(this.pos++);
  }
  peek() {
    return this.buffer.charCodeAt(this.pos);
  }
  indexOf(e) {
    let { buffer: t, pos: n } = this,
      r = t.indexOf(e, n);
    return r === -1 ? t.length : r;
  }
};
function Kr(e) {
  let { length: t } = e,
    n = new Gr(e),
    r = [],
    i = 0,
    a = 0,
    o = 0,
    s = 0,
    c = 0;
  do {
    let e = n.indexOf(`;`),
      t = [],
      l = !0,
      u = 0;
    for (i = 0; n.pos < e;) {
      let r;
      ((i = Ur(n, i)),
        i < u && (l = !1),
        (u = i),
        Wr(n, e)
          ? ((a = Ur(n, a)),
            (o = Ur(n, o)),
            (s = Ur(n, s)),
            Wr(n, e) ? ((c = Ur(n, c)), (r = [i, a, o, s, c])) : (r = [i, a, o, s]))
          : (r = [i]),
        t.push(r),
        n.pos++);
    }
    (l || qr(t), r.push(t), (n.pos = e + 1));
  } while (n.pos <= t);
  return r;
}
function qr(e) {
  e.sort(Jr);
}
function Jr(e, t) {
  return e[0] - t[0];
}
const Yr = /^[\w+.-]+:\/\//,
  Xr = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/,
  Zr = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
function Qr(e) {
  return Yr.test(e);
}
function $r(e) {
  return e.startsWith(`//`);
}
function ei(e) {
  return e.startsWith(`/`);
}
function ti(e) {
  return e.startsWith(`file:`);
}
function ni(e) {
  return /^[.?#]/.test(e);
}
function ri(e) {
  let t = Xr.exec(e);
  return ai(t[1], t[2] || ``, t[3], t[4] || ``, t[5] || `/`, t[6] || ``, t[7] || ``);
}
function ii(e) {
  let t = Zr.exec(e),
    n = t[2];
  return ai(`file:`, ``, t[1] || ``, ``, ei(n) ? n : `/` + n, t[3] || ``, t[4] || ``);
}
function ai(e, t, n, r, i, a, o) {
  return { scheme: e, user: t, host: n, port: r, path: i, query: a, hash: o, type: 7 };
}
function oi(e) {
  if ($r(e)) {
    let t = ri(`http:` + e);
    return ((t.scheme = ``), (t.type = 6), t);
  }
  if (ei(e)) {
    let t = ri(`http://foo.com` + e);
    return ((t.scheme = ``), (t.host = ``), (t.type = 5), t);
  }
  if (ti(e)) return ii(e);
  if (Qr(e)) return ri(e);
  let t = ri(`http://foo.com/` + e);
  return (
    (t.scheme = ``),
    (t.host = ``),
    (t.type = e ? (e.startsWith(`?`) ? 3 : e.startsWith(`#`) ? 2 : 4) : 1),
    t
  );
}
function si(e) {
  if (e.endsWith(`/..`)) return e;
  let t = e.lastIndexOf(`/`);
  return e.slice(0, t + 1);
}
function ci(e, t) {
  (li(t, t.type), e.path === `/` ? (e.path = t.path) : (e.path = si(t.path) + e.path));
}
function li(e, t) {
  let n = t <= 4,
    r = e.path.split(`/`),
    i = 1,
    a = 0,
    o = !1;
  for (let e = 1; e < r.length; e++) {
    let t = r[e];
    if (!t) {
      o = !0;
      continue;
    }
    if (((o = !1), t !== `.`)) {
      if (t === `..`) {
        a ? ((o = !0), a--, i--) : n && (r[i++] = t);
        continue;
      }
      ((r[i++] = t), a++);
    }
  }
  let s = ``;
  for (let e = 1; e < i; e++) s += `/` + r[e];
  ((!s || (o && !s.endsWith(`/..`))) && (s += `/`), (e.path = s));
}
function ui(e, t) {
  if (!e && !t) return ``;
  let n = oi(e),
    r = n.type;
  if (t && r !== 7) {
    let e = oi(t),
      i = e.type;
    switch (r) {
      case 1:
        n.hash = e.hash;
      case 2:
        n.query = e.query;
      case 3:
      case 4:
        ci(n, e);
      case 5:
        ((n.user = e.user), (n.host = e.host), (n.port = e.port));
      case 6:
        n.scheme = e.scheme;
    }
    i > r && (r = i);
  }
  li(n, r);
  let i = n.query + n.hash;
  switch (r) {
    case 2:
    case 3:
      return i;
    case 4: {
      let r = n.path.slice(1);
      return r ? (ni(t || e) && !ni(r) ? `./` + r + i : r + i) : i || `.`;
    }
    case 5:
      return n.path + i;
    default:
      return n.scheme + `//` + n.user + n.host + n.port + n.path + i;
  }
}
function di(e) {
  if (!e) return ``;
  let t = e.lastIndexOf(`/`);
  return e.slice(0, t + 1);
}
function fi(e, t) {
  let n = di(e),
    r = t ? t + `/` : ``;
  return (e) => ui(r + (e || ``), n);
}
var $ = 0,
  pi = 1,
  mi = 2,
  hi = 3,
  gi = 4;
function _i(e, t) {
  let n = vi(e, 0);
  if (n === e.length) return e;
  t || (e = e.slice());
  for (let r = n; r < e.length; r = vi(e, r + 1)) e[r] = bi(e[r], t);
  return e;
}
function vi(e, t) {
  for (let n = t; n < e.length; n++) if (!yi(e[n])) return n;
  return e.length;
}
function yi(e) {
  for (let t = 1; t < e.length; t++) if (e[t][$] < e[t - 1][$]) return !1;
  return !0;
}
function bi(e, t) {
  return (t || (e = e.slice()), e.sort(xi));
}
function xi(e, t) {
  return e[$] - t[$];
}
var Si = !1;
function Ci(e, t, n, r) {
  for (; n <= r;) {
    let i = n + ((r - n) >> 1),
      a = e[i][$] - t;
    if (a === 0) return ((Si = !0), i);
    a < 0 ? (n = i + 1) : (r = i - 1);
  }
  return ((Si = !1), n - 1);
}
function wi(e, t, n) {
  for (let r = n + 1; r < e.length && e[r][$] === t; n = r++);
  return n;
}
function Ti(e, t, n) {
  for (let r = n - 1; r >= 0 && e[r][$] === t; n = r--);
  return n;
}
function Ei() {
  return { lastKey: -1, lastNeedle: -1, lastIndex: -1 };
}
function Di(e, t, n, r) {
  let { lastKey: i, lastNeedle: a, lastIndex: o } = n,
    s = 0,
    c = e.length - 1;
  if (r === i) {
    if (t === a) return ((Si = o !== -1 && e[o][$] === t), o);
    t >= a ? (s = o === -1 ? 0 : o) : (c = o);
  }
  return ((n.lastKey = r), (n.lastNeedle = t), (n.lastIndex = Ci(e, t, s, c)));
}
function Oi(e) {
  return typeof e == `string` ? JSON.parse(e) : e;
}
var ki = "`line` must be greater than 0 (lines start at line 1)",
  Ai = "`column` must be greater than or equal to 0 (columns start at column 0)",
  ji = class {
    constructor(e, t) {
      let n = typeof e == `string`;
      if (!n && e._decodedMemo) return e;
      let r = Oi(e),
        { version: i, file: a, names: o, sourceRoot: s, sources: c, sourcesContent: l } = r;
      ((this.version = i),
        (this.file = a),
        (this.names = o || []),
        (this.sourceRoot = s),
        (this.sources = c),
        (this.sourcesContent = l),
        (this.ignoreList = r.ignoreList || r.x_google_ignoreList || void 0));
      let u = fi(t, s);
      this.resolvedSources = c.map(u);
      let { mappings: d } = r;
      if (typeof d == `string`) ((this._encoded = d), (this._decoded = void 0));
      else if (Array.isArray(d)) ((this._encoded = void 0), (this._decoded = _i(d, n)));
      else if (r.sections)
        throw Error(`TraceMap passed sectioned source map, please use FlattenMap export instead`);
      else throw Error(`invalid source map: ${JSON.stringify(r)}`);
      ((this._decodedMemo = Ei()), (this._bySources = void 0), (this._bySourceMemos = void 0));
    }
  };
function Mi(e) {
  return e;
}
function Ni(e) {
  var t;
  return (t = Mi(e))._decoded || (t._decoded = Kr(Mi(e)._encoded));
}
function Pi(e, t) {
  let { line: n, column: r, bias: i } = t;
  if ((n--, n < 0)) throw Error(ki);
  if (r < 0) throw Error(Ai);
  let a = Ni(e);
  if (n >= a.length) return Fi(null, null, null, null);
  let o = a[n],
    s = Ii(o, Mi(e)._decodedMemo, n, r, i || 1);
  if (s === -1) return Fi(null, null, null, null);
  let c = o[s];
  if (c.length === 1) return Fi(null, null, null, null);
  let { names: l, resolvedSources: u } = e;
  return Fi(u[c[pi]], c[mi] + 1, c[hi], c.length === 5 ? l[c[gi]] : null);
}
function Fi(e, t, n, r) {
  return { source: e, line: t, column: n, name: r };
}
function Ii(e, t, n, r, i) {
  let a = Di(e, r, t, n);
  return (
    Si ? (a = (i === -1 ? wi : Ti)(e, r, a)) : i === -1 && a++, a === -1 || a === e.length ? -1 : a
  );
}
function Li(e) {
  return (
    (e >= 65 && e <= 90) ||
    (e >= 97 && e <= 122) ||
    (e >= 48 && e <= 57) ||
    e === 43 ||
    e === 47 ||
    e === 61
  );
}
function Ri(e) {
  let t = 0;
  for (; t < e.length;) {
    let n = e.indexOf(`//# sourceMappingURL=data:application/json`, t);
    if (n === -1) return;
    let r = e.indexOf(`;base64,`, n + 42);
    if (r === -1) {
      t = n + 42;
      continue;
    }
    let i = e.indexOf(`,`, n);
    if (i !== -1 && i < r) {
      t = r + 8;
      continue;
    }
    let a = r + 8,
      o = a;
    for (; o < e.length && Li(e.charCodeAt(o));) o++;
    if (o > a) return e.slice(a, o);
    t = o;
  }
}
const zi = new Map();
function Bi(e) {
  let t = zi.get(e);
  if (t !== void 0) return (zi.delete(e), zi.set(e, t), t);
  let n = null,
    r = Ri(e);
  if (r)
    try {
      let e = Buffer.from(r, `base64`).toString(`utf-8`);
      n = new ji(JSON.parse(e));
    } catch {
      n = null;
    }
  for (zi.set(e, n); zi.size > 8;) {
    let e = zi.keys().next().value;
    if (e === void 0) break;
    zi.delete(e);
  }
  return n;
}
function Vi(e, t, n) {
  if (!e.includes(t)) return e;
  let r = Bi(n);
  if (!r) return e;
  try {
    return e
      .split(`
`)
      .map((e) => {
        let n = e.match(/^\s*at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?$/);
        if (!n) return e;
        let [, i, a, o, s] = n;
        if (!a.includes(t)) return e;
        let c = parseInt(o, 10),
          l = parseInt(s, 10),
          u = Pi(r, { line: c, column: l });
        if (u.source && u.line !== null) {
          let e = i || u.name || `anonymous`,
            t = u.column === null ? l : u.column;
          return `    at ${e} (${u.source}:${u.line}:${t})`;
        }
        return e;
      }).join(`
`);
  } catch {
    return e;
  }
}
function Hi(e, t, n) {
  let r = (2 << (31 - Math.clz32((e.length - 1) | 1))) - 1,
    i = Math.ceil((1.6 * r * t) / e.length);
  return (a = t) => {
    if (!a) return ``;
    let o = ``;
    for (;;) {
      let t = n(i),
        s = i;
      for (; s--;) if (((o += e[t[s] & r] || ``), o.length >= a)) return o;
    }
  };
}
function Ui(e) {
  return function (t, n) {
    let r = function (...r) {
        let { promise: i, resolve: o, reject: s } = a(),
          c = `step_${e.generateUlid()}`,
          l = { type: `step`, correlationId: c, stepName: t, args: r };
        this !== void 0 && this !== null && this !== globalThis && (l.thisVal = this);
        let u = n?.();
        return (
          u && (l.closureVars = u),
          e.invocationsQueue.set(c, l),
          B.debug(`Step consumer setup`, { correlationId: c, stepName: t, args: r }),
          e.eventsConsumer.subscribe((n) => {
            if (!n)
              return (
                tn(e, () => {
                  e.onWorkflowError(new K(e.invocationsQueue, e.globalThis));
                }),
                U.NotConsumed
              );
            if (
              (B.debug(`Step consumer event processing`, {
                correlationId: c,
                stepName: t,
                args: r.join(`, `),
                incomingCorrelationId: n.correlationId,
                isMatch: c === n.correlationId,
                eventType: n.eventType,
              }),
              n.correlationId !== c)
            )
              return U.NotConsumed;
            let i =
              `eventData` in n && n.eventData && `stepName` in n.eventData
                ? n.eventData.stepName
                : void 0;
            if (typeof i == `string` && i !== t)
              return (
                (e.promiseQueue = e.promiseQueue.then(() => {
                  e.onWorkflowError(
                    new x(
                      `Replay divergence: step event ${n.eventType} for ${c} belongs to "${i}", but the current step consumer is "${t}"`,
                      { eventId: n.eventId },
                    ),
                  );
                })),
                U.Finished
              );
            if (n.eventType === `step_created`) {
              let r = e.invocationsQueue.get(c);
              return !r || r.type !== `step`
                ? ((e.promiseQueue = e.promiseQueue.then(() => {
                    s(
                      new x(
                        `Replay divergence: step ${c} (${t}) created but not found in invocation queue`,
                        { eventId: n.eventId },
                      ),
                    );
                  })),
                  U.Finished)
                : ((r.hasCreatedEvent = !0), U.Consumed);
            }
            if (n.eventType === `step_started`) {
              let t = e.invocationsQueue.get(c);
              return (
                t &&
                  t.type === `step` &&
                  ((t.ownerMessageId =
                    `eventData` in n &&
                    n.eventData &&
                    `ownerMessageId` in n.eventData &&
                    typeof n.eventData.ownerMessageId == `string`
                      ? n.eventData.ownerMessageId
                      : void 0),
                  (t.lastStartedAt = +n.createdAt)),
                U.Consumed
              );
            }
            if (n.eventType === `step_retrying`) {
              let t = e.invocationsQueue.get(c);
              return (
                t && t.type === `step` && ((t.sawRetrying = !0), (t.ownerMessageId = void 0)),
                U.Consumed
              );
            }
            if (n.eventType === `step_failed`)
              return (
                e.invocationsQueue.delete(n.correlationId),
                (e.promiseQueue = e.promiseQueue.then(async () => {
                  try {
                    let t = await e.replayPayloadCache.prepareEventPayload(
                      n.eventId,
                      `error`,
                      n.eventData.error,
                    );
                    s(await ct(n.eventData.error, e.runId, e.encryptionKey, e.globalThis, {}, t));
                  } catch (e) {
                    (B.error(`Failed to hydrate step_failed error`, {
                      correlationId: n.correlationId,
                      error: e instanceof Error ? e.message : String(e),
                    }),
                      s(
                        new b(
                          `Failed to hydrate step error: ${e instanceof Error ? e.message : String(e)}`,
                        ),
                      ));
                  }
                })),
                U.Finished
              );
            if (n.eventType === `step_completed`) {
              e.invocationsQueue.delete(n.correlationId);
              let t = n.eventId,
                r = n.eventData.result;
              return (
                e.pendingDeliveries++,
                (e.promiseQueue = e.promiseQueue.then(async () => {
                  try {
                    o(
                      await e.replayPayloadCache.getStepResult(t, async () => {
                        let n = await e.replayPayloadCache.prepareEventPayload(t, `result`, r);
                        return await he(r, e.runId, e.encryptionKey, e.globalThis, {}, n);
                      }),
                    );
                  } catch (e) {
                    s(e);
                  } finally {
                    e.pendingDeliveries--;
                  }
                })),
                U.Finished
              );
            }
            return (
              (e.promiseQueue = e.promiseQueue.then(() => {
                e.onWorkflowError(
                  new x(
                    `Replay divergence: Unexpected event type for step ${c} (name: ${t}) "${n.eventType}"`,
                    { eventId: n.eventId },
                  ),
                );
              })),
              U.Finished
            );
          }),
          i
        );
      },
      i = t.split(`//`).pop();
    return (
      Object.defineProperty(r, "name", { value: i }),
      Object.defineProperty(r, "stepId", {
        value: t,
        writable: !1,
        enumerable: !1,
        configurable: !1,
      }),
      n &&
        Object.defineProperty(r, "__closureVarsFn", {
          value: n,
          writable: !1,
          enumerable: !1,
          configurable: !1,
        }),
      Object.defineProperty(r, "bind", {
        value: function (e, ...r) {
          let i = Function.prototype.bind.call(this, e, ...r);
          return (
            Object.defineProperty(i, "stepId", {
              value: t,
              writable: !1,
              enumerable: !1,
              configurable: !1,
            }),
            n &&
              Object.defineProperty(i, "__closureVarsFn", {
                value: n,
                writable: !1,
                enumerable: !1,
                configurable: !1,
              }),
            Object.defineProperty(i, "__boundThis", {
              value: e,
              writable: !1,
              enumerable: !1,
              configurable: !1,
            }),
            r.length > 0 &&
              Object.defineProperty(i, "__boundArgs", {
                value: r,
                writable: !1,
                enumerable: !1,
                configurable: !1,
              }),
            i
          );
        },
        writable: !1,
        enumerable: !1,
        configurable: !1,
      }),
      r
    );
  };
}
var Wi = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = o();
        ((t.next = function () {
          var e = 2091639 * t.s0 + t.c * 23283064365386963e-26;
          return ((t.s0 = t.s1), (t.s1 = t.s2), (t.s2 = e - (t.c = e | 0)));
        }),
          (t.c = 1),
          (t.s0 = n(` `)),
          (t.s1 = n(` `)),
          (t.s2 = n(` `)),
          (t.s0 -= n(e)),
          t.s0 < 0 && (t.s0 += 1),
          (t.s1 -= n(e)),
          t.s1 < 0 && (t.s1 += 1),
          (t.s2 -= n(e)),
          t.s2 < 0 && (t.s2 += 1),
          (n = null));
      }
      function i(e, t) {
        return ((t.c = e.c), (t.s0 = e.s0), (t.s1 = e.s1), (t.s2 = e.s2), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = n.next;
        return (
          (o.int32 = function () {
            return (n.next() * 4294967296) | 0;
          }),
          (o.double = function () {
            return o() + ((o() * 2097152) | 0) * 11102230246251565e-32;
          }),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      function o() {
        var e = 4022871197;
        return function (t) {
          t = String(t);
          for (var n = 0; n < t.length; n++) {
            e += t.charCodeAt(n);
            var r = 0.02519603282416938 * e;
            ((e = r >>> 0), (r -= e), (r *= e), (e = r >>> 0), (r -= e), (e += r * 4294967296));
          }
          return (e >>> 0) * 23283064365386963e-26;
        };
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.alea = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  Gi = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = ``;
        ((t.x = 0),
          (t.y = 0),
          (t.z = 0),
          (t.w = 0),
          (t.next = function () {
            var e = t.x ^ (t.x << 11);
            return ((t.x = t.y), (t.y = t.z), (t.z = t.w), (t.w ^= (t.w >>> 19) ^ e ^ (e >>> 8)));
          }),
          e === (e | 0) ? (t.x = e) : (n += e));
        for (var r = 0; r < n.length + 64; r++) ((t.x ^= n.charCodeAt(r) | 0), t.next());
      }
      function i(e, t) {
        return ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xor128 = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  Ki = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = ``;
        ((t.next = function () {
          var e = t.x ^ (t.x >>> 2);
          return (
            (t.x = t.y),
            (t.y = t.z),
            (t.z = t.w),
            (t.w = t.v),
            ((t.d = (t.d + 362437) | 0) + (t.v = t.v ^ (t.v << 4) ^ (e ^ (e << 1)))) | 0
          );
        }),
          (t.x = 0),
          (t.y = 0),
          (t.z = 0),
          (t.w = 0),
          (t.v = 0),
          e === (e | 0) ? (t.x = e) : (n += e));
        for (var r = 0; r < n.length + 64; r++)
          ((t.x ^= n.charCodeAt(r) | 0),
            r == n.length && (t.d = (t.x << 10) ^ (t.x >>> 4)),
            t.next());
      }
      function i(e, t) {
        return ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), (t.v = e.v), (t.d = e.d), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xorwow = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  qi = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this;
        t.next = function () {
          var e = t.x,
            n = t.i,
            r = e[n],
            i;
          return (
            (r ^= r >>> 7),
            (i = r ^ (r << 24)),
            (r = e[(n + 1) & 7]),
            (i ^= r ^ (r >>> 10)),
            (r = e[(n + 3) & 7]),
            (i ^= r ^ (r >>> 3)),
            (r = e[(n + 4) & 7]),
            (i ^= r ^ (r << 7)),
            (r = e[(n + 7) & 7]),
            (r ^= r << 13),
            (i ^= r ^ (r << 9)),
            (e[n] = i),
            (t.i = (n + 1) & 7),
            i
          );
        };
        function n(e, t) {
          var n,
            r = [];
          if (t === (t | 0)) r[0] = t;
          else
            for (t = `` + t, n = 0; n < t.length; ++n)
              r[n & 7] = (r[n & 7] << 15) ^ ((t.charCodeAt(n) + r[(n + 1) & 7]) << 13);
          for (; r.length < 8;) r.push(0);
          for (n = 0; n < 8 && r[n] === 0; ++n);
          for (n == 8 ? (r[7] = -1) : r[n], e.x = r, e.i = 0, n = 256; n > 0; --n) e.next();
        }
        n(t, e);
      }
      function i(e, t) {
        return ((t.x = e.x.slice()), (t.i = e.i), t);
      }
      function a(e, t) {
        e ??= +new Date();
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (a.x && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xorshift7 = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  Ji = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this;
        t.next = function () {
          var e = t.w,
            n = t.X,
            r = t.i,
            i,
            a;
          return (
            (t.w = e = (e + 1640531527) | 0),
            (a = n[(r + 34) & 127]),
            (i = n[(r = (r + 1) & 127)]),
            (a ^= a << 13),
            (i ^= i << 17),
            (a ^= a >>> 15),
            (i ^= i >>> 12),
            (a = n[r] = a ^ i),
            (t.i = r),
            (a + (e ^ (e >>> 16))) | 0
          );
        };
        function n(e, t) {
          var n,
            r,
            i,
            a,
            o,
            s = [],
            c = 128;
          for (
            t === (t | 0)
              ? ((r = t), (t = null))
              : ((t += `\0`), (r = 0), (c = Math.max(c, t.length))),
              i = 0,
              a = -32;
            a < c;
            ++a
          )
            (t && (r ^= t.charCodeAt((a + 32) % t.length)),
              a === 0 && (o = r),
              (r ^= r << 10),
              (r ^= r >>> 15),
              (r ^= r << 4),
              (r ^= r >>> 13),
              a >= 0 &&
                ((o = (o + 1640531527) | 0), (n = s[a & 127] ^= r + o), (i = n == 0 ? i + 1 : 0)));
          for (i >= 128 && (s[((t && t.length) || 0) & 127] = -1), i = 127, a = 512; a > 0; --a)
            ((r = s[(i + 34) & 127]),
              (n = s[(i = (i + 1) & 127)]),
              (r ^= r << 13),
              (n ^= n << 17),
              (r ^= r >>> 15),
              (n ^= n >>> 12),
              (s[i] = r ^ n));
          ((e.w = o), (e.X = s), (e.i = i));
        }
        n(t, e);
      }
      function i(e, t) {
        return ((t.i = e.i), (t.w = e.w), (t.X = e.X.slice()), t);
      }
      function a(e, t) {
        e ??= +new Date();
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (a.X && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xor4096 = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  Yi = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = ``;
        ((t.next = function () {
          var e = t.b,
            n = t.c,
            r = t.d,
            i = t.a;
          return (
            (e = (e << 25) ^ (e >>> 7) ^ n),
            (n = (n - r) | 0),
            (r = (r << 24) ^ (r >>> 8) ^ i),
            (i = (i - e) | 0),
            (t.b = e = (e << 20) ^ (e >>> 12) ^ n),
            (t.c = n = (n - r) | 0),
            (t.d = (r << 16) ^ (n >>> 16) ^ i),
            (t.a = (i - e) | 0)
          );
        }),
          (t.a = 0),
          (t.b = 0),
          (t.c = -1640531527),
          (t.d = 1367130551),
          e === Math.floor(e) ? ((t.a = (e / 4294967296) | 0), (t.b = e | 0)) : (n += e));
        for (var r = 0; r < n.length + 20; r++) ((t.b ^= n.charCodeAt(r) | 0), t.next());
      }
      function i(e, t) {
        return ((t.a = e.a), (t.b = e.b), (t.c = e.c), (t.d = e.d), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.tychei = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  Xi = r((t, n) => {
    (function (t, r, i) {
      var a = 256,
        o = 6,
        s = 52,
        c = `random`,
        l = i.pow(a, o),
        u = i.pow(2, s),
        d = u * 2,
        f = a - 1,
        p;
      function m(e, t, n) {
        var s = [];
        t = t == 1 ? { entropy: !0 } : t || {};
        var f = v(_(t.entropy ? [e, b(r)] : (e ?? y()), 3), s),
          p = new h(s),
          m = function () {
            for (var e = p.g(o), t = l, n = 0; e < u;) ((e = (e + n) * a), (t *= a), (n = p.g(1)));
            for (; e >= d;) ((e /= 2), (t /= 2), (n >>>= 1));
            return (e + n) / t;
          };
        return (
          (m.int32 = function () {
            return p.g(4) | 0;
          }),
          (m.quick = function () {
            return p.g(4) / 4294967296;
          }),
          (m.double = m),
          v(b(p.S), r),
          (
            t.pass ||
            n ||
            function (e, t, n, r) {
              return (
                r &&
                  (r.S && g(r, p),
                  (e.state = function () {
                    return g(p, {});
                  })),
                n ? ((i[c] = e), t) : e
              );
            }
          )(m, f, `global` in t ? t.global : this == i, t.state)
        );
      }
      function h(e) {
        var t,
          n = e.length,
          r = this,
          i = 0,
          o = (r.i = r.j = 0),
          s = (r.S = []);
        for (n || (e = [n++]); i < a;) s[i] = i++;
        for (i = 0; i < a; i++) ((s[i] = s[(o = f & (o + e[i % n] + (t = s[i])))]), (s[o] = t));
        (r.g = function (e) {
          for (var t, n = 0, i = r.i, o = r.j, s = r.S; e--;)
            ((t = s[(i = f & (i + 1))]),
              (n = n * a + s[f & ((s[i] = s[(o = f & (o + t))]) + (s[o] = t))]));
          return ((r.i = i), (r.j = o), n);
        })(a);
      }
      function g(e, t) {
        return ((t.i = e.i), (t.j = e.j), (t.S = e.S.slice()), t);
      }
      function _(e, t) {
        var n = [],
          r = typeof e,
          i;
        if (t && r == `object`)
          for (i in e)
            try {
              n.push(_(e[i], t - 1));
            } catch {}
        return n.length ? n : r == `string` ? e : e + `\0`;
      }
      function v(e, t) {
        for (var n = e + ``, r, i = 0; i < n.length;)
          t[f & i] = f & ((r ^= t[f & i] * 19) + n.charCodeAt(i++));
        return b(t);
      }
      function y() {
        try {
          var e;
          return (
            p && (e = p.randomBytes)
              ? (e = e(a))
              : ((e = new Uint8Array(a)), (t.crypto || t.msCrypto).getRandomValues(e)),
            b(e)
          );
        } catch {
          var n = t.navigator,
            i = n && n.plugins;
          return [+new Date(), t, i, t.screen, b(r)];
        }
      }
      function b(e) {
        return String.fromCharCode.apply(0, e);
      }
      if ((v(i.random(), r), typeof n == `object` && n.exports)) {
        n.exports = m;
        try {
          p = e(`crypto`);
        } catch {}
      } else
        typeof define == `function` && define.amd
          ? define(function () {
              return m;
            })
          : (i[`seed` + c] = m);
    })(typeof self < `u` ? self : t, [], Math);
  }),
  Zi = t(
    r((e, t) => {
      var n = Wi(),
        r = Gi(),
        i = Ki(),
        a = qi(),
        o = Ji(),
        s = Yi(),
        c = Xi();
      ((c.alea = n),
        (c.xor128 = r),
        (c.xorwow = i),
        (c.xorshift7 = a),
        (c.xor4096 = o),
        (c.tychei = s),
        (t.exports = c));
    })(),
    1,
  );
const Qi = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
  $i = new Uint8Array(128).fill(255);
for (let e = 0; e < 64; e++) $i[Qi.charCodeAt(e)] = e;
function ea(e) {
  return e === 9 || e === 10 || e === 12 || e === 13 || e === 32;
}
function ta(e, t) {
  for (; t < e.length && ea(e.charCodeAt(t));) t++;
  return t;
}
function na(e, t) {
  let n = e.length,
    r = e;
  n === 2 ? (r = e + `AA`) : n === 3 && (r = e + `A`);
  let i = $i[r.charCodeAt(0)],
    a = $i[r.charCodeAt(1)],
    o = $i[r.charCodeAt(2)],
    s = $i[r.charCodeAt(3)],
    c = (i << 2) | (a >> 4),
    l = ((a & 15) << 4) | (o >> 2),
    u = ((o & 3) << 6) | s;
  if (n === 2) {
    if (t && l !== 0) throw SyntaxError(`Extra bits in base64 chunk`);
    return [c];
  }
  if (n === 3) {
    if (t && u !== 0) throw SyntaxError(`Extra bits in base64 chunk`);
    return [c, l];
  }
  return [c, l, u];
}
function ra(e, t, n, r) {
  if ((r === void 0 && (r = 2 ** 53 - 1), r === 0)) return { read: 0, bytes: [], error: null };
  let i = 0,
    a = [],
    o = ``,
    s = 0,
    c = 0,
    l = e.length;
  for (;;) {
    if (((c = ta(e, c)), c === l)) {
      if (s > 0) {
        if (n === `stop-before-partial`) return { read: i, bytes: a, error: null };
        if (n === `loose`) {
          if (s === 1)
            return {
              read: i,
              bytes: a,
              error: SyntaxError(`Invalid base64: lone character in final chunk`),
            };
          a.push(...na(o, !1));
        } else
          return {
            read: i,
            bytes: a,
            error: SyntaxError(`Invalid base64: incomplete chunk in strict mode`),
          };
      }
      return { read: l, bytes: a, error: null };
    }
    let u = e[c];
    if ((c++, u === `=`)) {
      if (s < 2)
        return {
          read: i,
          bytes: a,
          error: SyntaxError(`Invalid base64: padding in unexpected place`),
        };
      if (((c = ta(e, c)), s === 2)) {
        if (c === l)
          return n === `stop-before-partial`
            ? { read: i, bytes: a, error: null }
            : {
                read: i,
                bytes: a,
                error: SyntaxError(`Invalid base64: missing second padding character`),
              };
        ((u = e[c]), u === `=` && (c = ta(e, c + 1)));
      }
      if (c < l)
        return {
          read: i,
          bytes: a,
          error: SyntaxError(`Invalid base64: unexpected characters after padding`),
        };
      let t = n === `strict`;
      try {
        a.push(...na(o, t));
      } catch (e) {
        return { read: i, bytes: a, error: e };
      }
      return { read: l, bytes: a, error: null };
    }
    if (t === `base64url`) {
      if (u === `+` || u === `/`)
        return {
          read: i,
          bytes: a,
          error: SyntaxError(`Invalid base64url: unexpected character '${u}'`),
        };
      u === `-` ? (u = `+`) : u === `_` && (u = `/`);
    }
    let d = u.charCodeAt(0);
    if (d >= 128 || $i[d] === 255)
      return {
        read: i,
        bytes: a,
        error: SyntaxError(`Invalid base64: unexpected character '${e[c - 1]}'`),
      };
    let f = r - a.length;
    if (
      (f === 1 && s === 2) ||
      (f === 2 && s === 3) ||
      ((o += u),
      (s = o.length),
      s === 4 && (a.push(...na(o)), (o = ``), (s = 0), (i = c), a.length === r))
    )
      return { read: i, bytes: a, error: null };
  }
}
function ia(e, t) {
  t === void 0 && (t = 2 ** 53 - 1);
  let n = e.length,
    r = [],
    i = 0;
  if (n % 2 != 0)
    return { read: 0, bytes: [], error: SyntaxError(`Invalid hex: string length must be even`) };
  for (; i < n && r.length < t;) {
    let t = e.substring(i, i + 2);
    if (!/^[0-9a-fA-F]{2}$/.test(t))
      return {
        read: i,
        bytes: r,
        error: SyntaxError(`Invalid hex: unexpected character at position ${i}`),
      };
    ((i += 2), r.push(Number.parseInt(t, 16)));
  }
  return { read: i, bytes: r, error: null };
}
function aa(e, t) {
  let n = t?.alphabet ?? `base64`;
  if (n !== `base64` && n !== `base64url`)
    throw TypeError(`Invalid alphabet: expected "base64" or "base64url", got "${n}"`);
  let r = !!t?.omitPadding,
    i = ``,
    a = e.length;
  for (let t = 0; t < a; t += 3) {
    let n = e[t],
      o = t + 1 < a ? e[t + 1] : 0,
      s = t + 2 < a ? e[t + 2] : 0;
    ((i += Qi[(n >> 2) & 63]),
      (i += Qi[((n & 3) << 4) | ((o >> 4) & 15)]),
      t + 1 < a ? (i += Qi[((o & 15) << 2) | ((s >> 6) & 3)]) : r || (i += `=`),
      t + 2 < a ? (i += Qi[s & 63]) : r || (i += `=`));
  }
  return (n === `base64url` && (i = i.replace(/\+/g, `-`).replace(/\//g, `_`)), i);
}
function oa(e) {
  let t = ``;
  for (let n = 0; n < e.length; n++) t += e[n].toString(16).padStart(2, `0`);
  return t;
}
function sa(e) {
  let t = e.prototype,
    n = e;
  (t.toBase64 ||
    Object.defineProperty(t, "toBase64", {
      value: function (t) {
        if (!(this instanceof e)) throw TypeError(`this is not a Uint8Array`);
        return aa(this, t);
      },
      writable: !0,
      enumerable: !1,
      configurable: !0,
    }),
    t.toHex ||
      Object.defineProperty(t, "toHex", {
        value: function () {
          if (!(this instanceof e)) throw TypeError(`this is not a Uint8Array`);
          return oa(this);
        },
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
    t.setFromBase64 ||
      Object.defineProperty(t, "setFromBase64", {
        value: function (t, n) {
          if (!(this instanceof e)) throw TypeError(`this is not a Uint8Array`);
          if (typeof t != `string`) throw TypeError(`expected a string`);
          let r = n?.alphabet ?? `base64`;
          if (r !== `base64` && r !== `base64url`)
            throw TypeError(`Invalid alphabet: expected "base64" or "base64url", got "${r}"`);
          let i = n?.lastChunkHandling ?? `loose`;
          if (i !== `loose` && i !== `strict` && i !== `stop-before-partial`)
            throw TypeError(
              `Invalid lastChunkHandling: expected "loose", "strict", or "stop-before-partial", got "${i}"`,
            );
          let a = ra(t, r, i, this.length),
            o = a.bytes,
            s = o.length;
          for (let e = 0; e < s; e++) this[e] = o[e];
          if (a.error) throw a.error;
          return { read: a.read, written: s };
        },
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
    t.setFromHex ||
      Object.defineProperty(t, "setFromHex", {
        value: function (t) {
          if (!(this instanceof e)) throw TypeError(`this is not a Uint8Array`);
          if (typeof t != `string`) throw TypeError(`expected a string`);
          let n = ia(t, this.length),
            r = n.bytes,
            i = r.length;
          for (let e = 0; e < i; e++) this[e] = r[e];
          if (n.error) throw n.error;
          return { read: n.read, written: i };
        },
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
    n.fromBase64 ||
      Object.defineProperty(e, "fromBase64", {
        value: function (t, n) {
          if (typeof t != `string`) throw TypeError(`expected a string`);
          let r = n?.alphabet ?? `base64`;
          if (r !== `base64` && r !== `base64url`)
            throw TypeError(`Invalid alphabet: expected "base64" or "base64url", got "${r}"`);
          let i = n?.lastChunkHandling ?? `loose`;
          if (i !== `loose` && i !== `strict` && i !== `stop-before-partial`)
            throw TypeError(
              `Invalid lastChunkHandling: expected "loose", "strict", or "stop-before-partial", got "${i}"`,
            );
          let a = ra(t, r, i);
          if (a.error) throw a.error;
          return new e(a.bytes);
        },
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
    n.fromHex ||
      Object.defineProperty(e, "fromHex", {
        value: function (t) {
          if (typeof t != `string`) throw TypeError(`expected a string`);
          let n = ia(t);
          if (n.error) throw n.error;
          return new e(n.bytes);
        },
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }));
}
function ca(e) {
  return function () {
    let t = `0123456789abcdef`,
      n = ``;
    for (let r = 0; r < 36; r++)
      r === 8 || r === 13 || r === 18 || r === 23
        ? (n += `-`)
        : r === 14
          ? (n += `4`)
          : r === 19
            ? (n += t[Math.floor(e() * 4) + 8])
            : (n += t[Math.floor(e() * 16)]);
    return n;
  };
}
function la(e) {
  let { fixedTimestamp: t } = e,
    { seed: n } = e,
    r = (0, Zi.default)(n),
    i = Cn(),
    a = wn(`globalThis`, i);
  a.Math.random = r;
  let o = a.Date;
  ((a.Date = function (...e) {
    return e.length === 0 ? new o(t) : new o(...e);
  }),
    (a.Date.prototype = o.prototype),
    Object.setPrototypeOf(a.Date, o),
    (a.Date.now = () => t));
  let s = globalThis.crypto,
    c = s.subtle;
  function l(e) {
    for (let t = 0; t < e.length; t++) e[t] = Math.floor(r() * 256);
    return e;
  }
  let u = ca(r),
    d = c.digest.bind(c);
  return (
    (a.crypto = new Proxy(s, {
      get(e, t) {
        return t === `getRandomValues`
          ? l
          : t === `randomUUID`
            ? u
            : t === `subtle`
              ? new Proxy(c, {
                  get(e, t) {
                    return t === `generateKey`
                      ? () => {
                          throw new p(
                            "`crypto.subtle.generateKey()` is not available inside a workflow function. Move key generation to a step function where full Node.js crypto is available.",
                          );
                        }
                      : t === `digest`
                        ? d
                        : e[t];
                  },
                })
              : e[t];
      },
    })),
    (a.process = { env: Object.freeze({ ...process.env }) }),
    (a.DOMException = globalThis.DOMException),
    (a.Headers = globalThis.Headers),
    (a.TextEncoder = globalThis.TextEncoder),
    (a.TextDecoder = globalThis.TextDecoder),
    (a.console = globalThis.console),
    (a.URL = globalThis.URL),
    (a.URLSearchParams = globalThis.URLSearchParams),
    (a.structuredClone = globalThis.structuredClone),
    (a.atob = globalThis.atob),
    (a.btoa = globalThis.btoa),
    sa(a.Uint8Array),
    (a.Symbol.dispose ??= Symbol.for(`Symbol.dispose`)),
    (a.Symbol.asyncDispose ??= Symbol.for(`Symbol.asyncDispose`)),
    (a.exports = {}),
    (a.module = { exports: a.exports }),
    {
      context: i,
      globalThis: a,
      updateTimestamp: (e) => {
        t = e;
      },
    }
  );
}
const ua = new Map();
function da(e) {
  let t = ua.get(e);
  if (t !== void 0) return (ua.delete(e), ua.set(e, t), t);
}
function fa(e, t) {
  let n = da(e);
  if (n === void 0)
    for (n = new Map(), ua.set(e, n); ua.size > 8;) {
      let e = ua.keys().next().value;
      if (e === void 0) break;
      ua.delete(e);
    }
  let r = n.get(t);
  return (r === void 0 && ((r = new Sn(e, { filename: t })), n.set(t, r)), r);
}
function pa(e, t, n) {
  return fa(e, t).runInContext(n);
}
function ma(e) {
  return async function (t, n = {}) {
    let { promise: r, resolve: i } = a(),
      o = `attr_${e.generateUlid()}`,
      s = {
        type: `attribute`,
        correlationId: o,
        changes: t,
        ...(n.allowReservedAttributes === !0 ? { allowReservedAttributes: !0 } : {}),
      };
    return (
      e.invocationsQueue.set(o, s),
      e.eventsConsumer.subscribe((r) =>
        r
          ? r.correlationId === o
            ? r.eventType !== `attr_set` ||
              r.eventData.writer.type !== `workflow` ||
              JSON.stringify(r.eventData.changes) !== JSON.stringify(t) ||
              (r.eventData.allowReservedAttributes === !0) != (n.allowReservedAttributes === !0)
              ? ((e.promiseQueue = e.promiseQueue.then(() => {
                  e.onWorkflowError(
                    new x(`Replay divergence: Unexpected attribute event for ${o}`, {
                      eventId: r.eventId,
                    }),
                  );
                })),
                U.Finished)
              : (e.invocationsQueue.delete(o),
                (e.promiseQueue = e.promiseQueue.then(() => {
                  i();
                })),
                U.Finished)
            : U.NotConsumed
          : (tn(e, () => {
              e.onWorkflowError(new K(e.invocationsQueue, e.globalThis));
            }),
            U.NotConsumed),
      ),
      r
    );
  };
}
function ha(e, t) {
  if (typeof t != `string`) return null;
  let n = rt(Ct, e.globalThis),
    r = n?.[et];
  return typeof r == `function` ? r.call(n, { runId: t }) : null;
}
function ga(e) {
  return function (t = {}) {
    if (t.token === ``)
      throw Error(
        "`createHook()` was called with an empty string token. Pass a non-empty token, or omit the `token` option to use a randomly generated one.",
      );
    if (t.isWebhook === !0 && t.experimental_minRetention !== void 0)
      throw Error(
        "Webhook hooks do not support `experimental_minRetention`. Use a non-webhook `createHook()` with `resumeHook()`.",
      );
    if (t.experimental_minRetention !== void 0 && e.worldCapabilities?.hookRetention?.active !== !0)
      throw new b("The configured World does not support `experimental_minRetention` for Hooks.");
    let n = `hook_${e.generateUlid()}`,
      r = t.token ?? e.generateNanoid(),
      i = t.experimental_minRetention === void 0 ? void 0 : u(t.experimental_minRetention),
      o = t.isWebhook ?? !1;
    e.invocationsQueue.set(n, {
      type: `hook`,
      correlationId: n,
      token: r,
      tokenRetentionUntil: i,
      metadata: t.metadata,
      isWebhook: o,
    });
    let s = [],
      c = [],
      l = [],
      d = !1,
      f = !1,
      p = !1,
      m = !1,
      h = null,
      _ = null;
    (fe.debug(`Hook consumer setup`, { correlationId: n, token: r }),
      e.eventsConsumer.subscribe((t) => {
        if (!t)
          return (
            (d = !0),
            ((c.length > 0 && s.length === 0) || (l.length > 0 && !f && !m)) &&
              tn(e, () => {
                e.onWorkflowError(new K(e.invocationsQueue, e.globalThis));
              }),
            U.NotConsumed
          );
        if (t.correlationId !== n) return U.NotConsumed;
        let i =
          `eventData` in t && t.eventData && `token` in t.eventData ? t.eventData.token : void 0;
        if (typeof i == `string` && i !== r)
          return (
            (e.promiseQueue = e.promiseQueue.then(() => {
              e.onWorkflowError(
                new x(
                  `Replay divergence: hook event ${t.eventType} for ${n} belongs to token "${i}", but the current hook consumer expects "${r}"`,
                  { eventId: t.eventId },
                ),
              );
            })),
            U.Finished
          );
        if (t.eventType === `hook_created`) {
          let r = e.invocationsQueue.get(n);
          (r &&
            r.type === `hook` &&
            ((r.hasCreatedEvent = !0), (r.tokenRetentionUntil = t.eventData.tokenRetentionUntil)),
            (f = !0));
          let i = l.slice();
          return (
            (l.length = 0),
            (e.promiseQueue = e.promiseQueue.then(() => {
              for (let e of i) e.resolve(null);
            })),
            U.Consumed
          );
        }
        if (t.eventType === `hook_conflict`) {
          e.invocationsQueue.delete(n);
          let r = t,
            i = new g(r.eventData.token, r.eventData.conflictingRunId);
          ((m = !0), (h = i), (_ = ha(e, r.eventData.conflictingRunId)));
          let a = c.slice();
          c.length = 0;
          let o = l.slice();
          return (
            (l.length = 0),
            (e.promiseQueue = e.promiseQueue.then(() => {
              for (let e of a) e.reject(i);
              for (let e of o) _ ? e.resolve(_) : e.reject(i);
            })),
            U.Consumed
          );
        }
        if (t.eventType === `hook_received`) {
          let n = e.eventsConsumer.eventIndex,
            r = en(e, n, `hook`);
          if (c.length > 0) {
            let i = c.shift();
            if (i) {
              e.pendingDeliveries++;
              let a;
              e.promiseQueue = e.promiseQueue.then(async () => {
                try {
                  let n = await e.replayPayloadCache.prepareEventPayload(
                    t.eventId,
                    `payload`,
                    t.eventData.payload,
                  );
                  a = {
                    ok: !0,
                    value: await he(
                      t.eventData.payload,
                      e.runId,
                      e.encryptionKey,
                      e.globalThis,
                      {},
                      n,
                    ),
                  };
                } catch (e) {
                  a = { ok: !1, error: e };
                } finally {
                  e.pendingDeliveries--;
                }
                Qt(e, n, [`wait`]).then(() => {
                  (r.markDelivered(), a.ok ? i.resolve(a.value) : i.reject(a.error));
                });
              });
            }
          } else {
            let i,
              o = a();
            (e.pendingDeliveries++,
              (e.promiseQueue = e.promiseQueue.then(async () => {
                try {
                  let n = await e.replayPayloadCache.prepareEventPayload(
                    t.eventId,
                    `payload`,
                    t.eventData.payload,
                  );
                  i = {
                    ok: !0,
                    value: await he(
                      t.eventData.payload,
                      e.runId,
                      e.encryptionKey,
                      e.globalThis,
                      {},
                      n,
                    ),
                  };
                } catch (e) {
                  i = { ok: !1, error: e };
                } finally {
                  (e.pendingDeliveries--, o.resolve());
                }
              })),
              s.push({
                claim: () =>
                  o.promise
                    .then(() => Qt(e, n, [`wait`]))
                    .then(() => {
                      if ((r.markDelivered(), i && !i.ok)) throw i.error;
                      return i.value;
                    }),
              }));
          }
          return U.Consumed;
        }
        return t.eventType === `hook_disposed`
          ? (e.invocationsQueue.delete(n), (p = !0), U.Finished)
          : ((e.promiseQueue = e.promiseQueue.then(() => {
              e.onWorkflowError(
                new x(
                  `Replay divergence: Unexpected event type for hook ${n} (token: ${r}) "${t.eventType}"`,
                  { eventId: t.eventId },
                ),
              );
            })),
            U.Finished);
      }));
    let v = !1;
    function y() {
      let t = a();
      if (m && h)
        return (
          (e.promiseQueue = e.promiseQueue.then(() => {
            t.reject(h);
          })),
          t.promise
        );
      if (s.length > 0) {
        let e = s.shift();
        if (e) return e.claim();
      }
      return (
        d &&
          tn(e, () => {
            e.onWorkflowError(new K(e.invocationsQueue, e.globalThis));
          }),
        c.push(t),
        t.promise
      );
    }
    function S() {
      let t = a();
      if (f)
        return (
          (e.promiseQueue = e.promiseQueue.then(() => {
            t.resolve(null);
          })),
          t.promise
        );
      if (m)
        return (
          (e.promiseQueue = e.promiseQueue.then(() => {
            _ ? t.resolve(_) : t.reject(h);
          })),
          t.promise
        );
      let r = e.invocationsQueue.get(n);
      return (
        r && r.type === `hook` && (r.hasConflictAwaiter = !0),
        d &&
          tn(e, () => {
            e.onWorkflowError(new K(e.invocationsQueue, e.globalThis));
          }),
        l.push(t),
        t.promise
      );
    }
    function C() {
      if (v || ((v = !0), p)) return;
      let t = e.invocationsQueue.get(n);
      (t && t.type === `hook` && (t.disposed = !0),
        c.length > 0 &&
          ((c.length = 0),
          tn(e, () => {
            e.onWorkflowError(new K(e.invocationsQueue, e.globalThis));
          })),
        fe.debug(`Hook disposed`, { correlationId: n, token: r }));
    }
    let w = {
        token: r,
        getConflict() {
          return S();
        },
        then(e, t) {
          return y().then(e, t);
        },
        async *[Symbol.asyncIterator]() {
          for (; !v;) yield await this;
        },
        dispose: C,
        [Symbol.dispose]: C,
      },
      T = e.globalThis.Symbol.dispose;
    return (T && T !== Symbol.dispose && (w[T] = C), w);
  };
}
function _a(e) {
  return async function (t) {
    let { promise: n, resolve: r } = a(),
      i = `wait_${e.generateUlid()}`,
      o = u(t),
      s = { type: `wait`, correlationId: i, resumeAt: o };
    return (
      e.invocationsQueue.set(i, s),
      e.eventsConsumer.subscribe((t) => {
        if (!t)
          return (
            tn(e, () => {
              e.onWorkflowError(new K(e.invocationsQueue, e.globalThis));
            }),
            U.NotConsumed
          );
        if (t.correlationId !== i) return U.NotConsumed;
        if (t.eventType === `wait_created`) {
          let n = e.invocationsQueue.get(i);
          return (
            n &&
              n.type === `wait` &&
              ((n.hasCreatedEvent = !0), (n.resumeAt = t.eventData.resumeAt)),
            U.Consumed
          );
        }
        if (t.eventType === `wait_completed`) {
          let n = t.eventData?.resumeAt;
          if (n !== void 0) {
            let r = e.invocationsQueue.get(i),
              a = r && r.type === `wait` ? r.resumeAt : o,
              s = new Date(n),
              c = s.getTime(),
              l = a.getTime(),
              u = Number.isFinite(c) ? s.toISOString() : String(n);
            if (c !== l)
              return (
                (e.promiseQueue = e.promiseQueue.then(() => {
                  e.onWorkflowError(
                    new x(
                      `Replay divergence: wait_completed event for ${i} has resumeAt "${u}", but the current wait consumer expects "${a.toISOString()}"`,
                      { eventId: t.eventId },
                    ),
                  );
                })),
                U.Finished
              );
          }
          e.invocationsQueue.delete(i);
          let a = e.eventsConsumer.eventIndex,
            s = en(e, a, `wait`);
          return (
            e.promiseQueue
              .then(() => Qt(e, a, [`hook`]))
              .then(() => {
                (s.markDelivered(), r());
              }),
            U.Finished
          );
        }
        return (
          (e.promiseQueue = e.promiseQueue.then(() => {
            e.onWorkflowError(
              new x(`Replay divergence: Unexpected event type for wait ${i} "${t.eventType}"`, {
                eventId: t.eventId,
              }),
            );
          })),
          U.Finished
        );
      }),
      n
    );
  };
}
async function va(e, t, n, r, i, a) {
  if (t.size !== 0) {
    for (let e of t.values())
      e.type === `hook` && e.isSystem && !e.disposed && !e.abortRequested && (e.disposed = !0);
    try {
      let e = await ar();
      await Pr({ suspension: new K(t, n), world: e, run: r, runReadyBarrier: a });
    } catch (t) {
      W.warn(`Failed to drain pending queue items for ${i} workflow run`, {
        workflowRunId: e,
        message: t instanceof Error ? t.message : String(t),
      });
    }
  }
}
async function ya(e, t, n, r, i = new An(r), o, s) {
  return q(`workflow.run ${t.workflowName}`, async (c) => {
    c?.setAttributes({ ...Et(t.workflowName), ..._t(t.runId), ...X(t.status), ...ae(n.length) });
    let u = t.startedAt;
    if (!u)
      throw new p(`Workflow run "${t.runId}" has no "startedAt" timestamp (should not happen)`);
    let f = ur(t.runId) ?? +t.createdAt,
      m = l(
        process.env.VERCEL_URL === void 0
          ? `http://localhost:${(await xr()) ?? 3e3}`
          : `https://${process.env.VERCEL_URL}`,
      ),
      {
        context: h,
        globalThis: g,
        updateTimestamp: _,
      } = la({ seed: `${t.runId}:${t.workflowName}:${t.deploymentId}`, fixedTimestamp: f }),
      v = a(),
      y = Jt(() => g.Math.random()),
      b = Hi(`useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict`, 21, (e) =>
        new Uint8Array(e).map(() => 256 * g.Math.random()),
      ),
      S = { current: Promise.resolve() },
      w = new Vt(n, {
        onConsumedEvent: (e) => {
          _(+e.createdAt);
        },
        onUnconsumedEvent: (e) => {
          v.reject(
            new x(
              `Replay could not consume event: eventType=${e.eventType}, correlationId=${e.correlationId}, eventId=${e.eventId}.`,
              { eventId: e.eventId },
            ),
          );
        },
        getPromiseQueue: () => S.current,
      }),
      T = {
        runId: t.runId,
        encryptionKey: r,
        worldCapabilities: s,
        globalThis: g,
        onWorkflowError: v.reject,
        eventsConsumer: w,
        generateUlid: () => y(f),
        generateNanoid: b,
        invocationsQueue: new Map(),
        get promiseQueue() {
          return S.current;
        },
        set promiseQueue(e) {
          S.current = e;
        },
        pendingDeliveries: 0,
        pendingDeliveryBarriers: new Map(),
        replayPayloadCache: i,
      };
    T.eventsConsumer.subscribe((e) =>
      e &&
      (e.eventType === `run_created` ||
        e.eventType === `run_started` ||
        (e.eventType === `attr_set` && e.eventData.writer.type === `step`))
        ? U.Consumed
        : U.NotConsumed,
    );
    let E = Ui(T),
      D = ga(T),
      O = _a(T),
      A = ma(T);
    ((g[ye] = E),
      (g[lt] = A),
      (g[dt] = D),
      (g[ge] = O),
      (g[M] = (e) => oe(t.runId, e)),
      (g[F] = {
        workflowName: t.workflowName,
        workflowRunId: t.runId,
        workflowStartedAt: new g.Date(+u),
        url: m,
        features: { encryption: !!r },
      }),
      (g[Pt] = y),
      (g.fetch = () => {
        throw new g.Error(
          `Global "fetch" is unavailable in workflow functions. Use the "fetch" step function from "workflow" to make HTTP requests.\n\nLearn more: https://workflow-sdk.dev/err/${C.FETCH_IN_WORKFLOW_FUNCTION}`,
        );
      }));
    let j = `Timeout functions like "setTimeout" and "setInterval" are not supported in workflow functions. Use the "sleep" function from "workflow" for time-based delays.`;
    ((g.setTimeout = () => {
      throw new p(j, { slug: C.TIMEOUT_FUNCTIONS_IN_WORKFLOW });
    }),
      (g.setInterval = () => {
        throw new p(j, { slug: C.TIMEOUT_FUNCTIONS_IN_WORKFLOW });
      }),
      (g.clearTimeout = () => {
        throw new p(j, { slug: C.TIMEOUT_FUNCTIONS_IN_WORKFLOW });
      }),
      (g.clearInterval = () => {
        throw new p(j, { slug: C.TIMEOUT_FUNCTIONS_IN_WORKFLOW });
      }),
      (g.setImmediate = () => {
        throw new p(j, { slug: C.TIMEOUT_FUNCTIONS_IN_WORKFLOW });
      }),
      (g.clearImmediate = () => {
        throw new p(j, { slug: C.TIMEOUT_FUNCTIONS_IN_WORKFLOW });
      }),
      (g.AbortController = me(T)));
    let N = V();
    g.AbortSignal = { abort: N.abort, any: N.any, timeout: N.timeout };
    class P {
      cache;
      credentials;
      destination;
      headers;
      integrity;
      method;
      mode;
      redirect;
      referrer;
      referrerPolicy;
      url;
      keepalive;
      signal;
      duplex;
      body;
      constructor(e, t) {
        if (typeof e == `string` || e instanceof g.URL) {
          let t = String(e);
          try {
            (new g.URL(t), (this.url = t));
          } catch (e) {
            throw TypeError(`Failed to parse URL from ${t}`, { cause: e });
          }
        } else {
          if (((this.url = e.url), !t)) {
            ((this.method = e.method),
              (this.headers = new g.Headers(e.headers)),
              (this.body = e.body),
              (this.mode = e.mode),
              (this.credentials = e.credentials),
              (this.cache = e.cache),
              (this.redirect = e.redirect),
              (this.referrer = e.referrer),
              (this.referrerPolicy = e.referrerPolicy),
              (this.integrity = e.integrity),
              (this.keepalive = e.keepalive),
              (this.signal = e.signal),
              (this.duplex = e.duplex),
              (this.destination = e.destination));
            return;
          }
          ((this.method = e.method),
            (this.headers = new g.Headers(e.headers)),
            (this.body = e.body),
            (this.mode = e.mode),
            (this.credentials = e.credentials),
            (this.cache = e.cache),
            (this.redirect = e.redirect),
            (this.referrer = e.referrer),
            (this.referrerPolicy = e.referrerPolicy),
            (this.integrity = e.integrity),
            (this.keepalive = e.keepalive),
            (this.signal = e.signal),
            (this.duplex = e.duplex),
            (this.destination = e.destination));
        }
        (t?.method
          ? (this.method = t.method.toUpperCase())
          : typeof this.method != `string` && (this.method = `GET`),
          t?.headers
            ? (this.headers = new g.Headers(t.headers))
            : (typeof e == `string` || e instanceof g.URL) && (this.headers = new g.Headers()),
          t?.mode === void 0
            ? typeof this.mode != `string` && (this.mode = `cors`)
            : (this.mode = t.mode),
          t?.credentials === void 0
            ? typeof this.credentials != `string` && (this.credentials = `same-origin`)
            : (this.credentials = t.credentials),
          t?.cache === void 0
            ? typeof this.cache != `string` && (this.cache = `default`)
            : (this.cache = t.cache),
          t?.redirect === void 0
            ? typeof this.redirect != `string` && (this.redirect = `follow`)
            : (this.redirect = t.redirect),
          t?.referrer === void 0
            ? typeof this.referrer != `string` && (this.referrer = `about:client`)
            : (this.referrer = t.referrer),
          t?.referrerPolicy === void 0
            ? typeof this.referrerPolicy != `string` && (this.referrerPolicy = ``)
            : (this.referrerPolicy = t.referrerPolicy),
          t?.integrity === void 0
            ? typeof this.integrity != `string` && (this.integrity = ``)
            : (this.integrity = t.integrity),
          t?.keepalive === void 0
            ? typeof this.keepalive != `boolean` && (this.keepalive = !1)
            : (this.keepalive = t.keepalive),
          t?.signal === void 0 ? (this.signal ||= { aborted: !1 }) : (this.signal = t.signal),
          (this.duplex ||= `half`),
          (this.destination ||= `document`));
        let n = t?.body;
        if (n != null && (this.method === `GET` || this.method === `HEAD`))
          throw TypeError(`Request with GET/HEAD method cannot have body.`);
        n == null
          ? (this.body = null)
          : (this.body = Object.create(g.ReadableStream.prototype, {
              [R]: { value: n, writable: !1 },
            }));
      }
      clone() {
        Z();
      }
      get bodyUsed() {
        return !1;
      }
      blob;
      formData;
      arrayBuffer;
      json;
      text;
      async bytes() {
        return new Uint8Array(await this.arrayBuffer());
      }
    }
    ((g.Request = P),
      Object.defineProperties(P.prototype, {
        arrayBuffer: {
          value: E(`__builtin_response_array_buffer`),
          writable: !0,
          configurable: !0,
        },
        json: { value: E(`__builtin_response_json`), writable: !0, configurable: !0 },
        text: { value: E(`__builtin_response_text`), writable: !0, configurable: !0 },
      }));
    class L {
      type;
      url;
      status;
      statusText;
      body;
      headers;
      redirected;
      constructor(e, t) {
        if (
          ((this.status = t?.status ?? 200),
          (this.statusText = t?.statusText ?? ``),
          (this.headers = new g.Headers(t?.headers)),
          (this.type = `default`),
          (this.url = ``),
          (this.redirected = !1),
          e != null && (this.status === 204 || this.status === 205 || this.status === 304))
        )
          throw TypeError(`Response constructor: Invalid response status code ${this.status}`);
        e == null
          ? (this.body = null)
          : (this.body = Object.create(g.ReadableStream.prototype, {
              [R]: { value: e, writable: !1 },
            }));
      }
      clone;
      blob;
      formData;
      get ok() {
        return this.status >= 200 && this.status < 300;
      }
      get bodyUsed() {
        return !1;
      }
      arrayBuffer;
      json;
      text;
      async bytes() {
        return new Uint8Array(await this.arrayBuffer());
      }
      static json(e, t) {
        let n = JSON.stringify(e),
          r = new g.Headers(t?.headers);
        return (
          r.has(`content-type`) || r.set(`content-type`, `application/json`),
          new L(n, { ...t, headers: r })
        );
      }
      static error() {
        Z();
      }
      static redirect(e, t = 302) {
        if (![301, 302, 303, 307, 308].includes(t))
          throw RangeError(
            `Invalid redirect status code: ${t}. Must be one of: 301, 302, 303, 307, 308`,
          );
        let n = new g.Headers();
        n.set(`Location`, String(e));
        let r = Object.create(L.prototype);
        return (
          (r.status = t),
          (r.statusText = ``),
          (r.headers = n),
          (r.body = null),
          (r.type = `default`),
          (r.url = ``),
          (r.redirected = !1),
          r
        );
      }
    }
    ((g.Response = L),
      Object.defineProperties(L.prototype, {
        arrayBuffer: {
          value: E(`__builtin_response_array_buffer`),
          writable: !0,
          configurable: !0,
        },
        json: { value: E(`__builtin_response_json`), writable: !0, configurable: !0 },
        text: { value: E(`__builtin_response_text`), writable: !0, configurable: !0 },
      }));
    class ee {
      constructor() {
        Z();
      }
      get locked() {
        return !1;
      }
      cancel() {
        Z();
      }
      getReader() {
        Z();
      }
      pipeThrough() {
        Z();
      }
      pipeTo() {
        Z();
      }
      tee() {
        Z();
      }
      values() {
        Z();
      }
      static from() {
        Z();
      }
      [Symbol.asyncIterator]() {
        Z();
      }
    }
    g.ReadableStream = ee;
    class te {
      constructor() {
        Z();
      }
      get locked() {
        return !1;
      }
      abort() {
        Z();
      }
      close() {
        Z();
      }
      getWriter() {
        Z();
      }
    }
    g.WritableStream = te;
    class ne {
      readable;
      writable;
      constructor() {
        Z();
      }
    }
    ((g.TransformStream = ne), (g.console = globalThis.console));
    let re = Symbol.for(`@vercel/request-context`);
    g[re] = globalThis[re];
    let ie = d(t.workflowName)?.moduleSpecifier || t.workflowName;
    pa(e, ie, h);
    let z = pa(`globalThis.__private_workflows?.get(${JSON.stringify(t.workflowName)})`, ie, h);
    if (typeof z != `function`) throw new k(t.workflowName);
    let B = [];
    ((T.promiseQueue = T.promiseQueue.then(async () => {
      let e = await i.prepareWorkflowInput(t);
      B = await ve(t.input, t.runId, r, g, {}, e);
    })),
      await T.promiseQueue,
      c?.setAttributes({ ...I(B.length) }));
    try {
      let e = await Promise.race([z(...B), v.promise]),
        n = await Oe(e, t.runId, r, g, !1, (t.specVersion ?? 0) >= 5);
      return (
        c?.setAttributes({ ...Re(typeof e) }),
        await va(t.runId, T.invocationsQueue, g, t, `completed`, o),
        n
      );
    } catch (e) {
      throw (K.is(e) || x.is(e) || (await va(t.runId, T.invocationsQueue, g, t, `failed`, o)), e);
    }
  });
}
function ba(e) {
  let t = Hn();
  return t === void 0 ? e : e === void 0 ? t : Math.min(e, t);
}
function xa(e) {
  return p.is(e) ? m.RUNTIME_ERROR : ln(e) ? m.WORLD_CONTRACT_ERROR : null;
}
async function Sa({
  world: e,
  workflowRun: t,
  runId: n,
  requestId: r,
  err: i,
  errorCode: a,
  logMessage: o,
}) {
  W.error(o, { workflowRunId: n, errorCode: a, error: i instanceof Error ? i.message : String(i) });
  try {
    let o = jt(e, t ?? n);
    await e.events.create(
      n,
      {
        eventType: `run_failed`,
        specVersion: 5,
        eventData: {
          error: await Ke(i, n, await o(), globalThis, (t?.specVersion ?? 0) >= 5),
          errorCode: a,
        },
      },
      { requestId: r },
    );
  } catch (e) {
    if (T.is(e) || v.is(e)) return;
    if (ln(e)) {
      W.error(`Fatal world contract error while recording workflow failure`, {
        workflowRunId: n,
        errorCode: m.WORLD_CONTRACT_ERROR,
        error: e instanceof Error ? e.message : String(e),
      });
      return;
    }
    throw e;
  }
}
function Ca(e, t) {
  let n = e.find(
    (e) =>
      e.runId === t &&
      (e.eventType === `run_completed` ||
        e.eventType === `run_failed` ||
        e.eventType === `run_cancelled`),
  );
  return n
    ? (W.debug(`Run reached terminal event, exiting`, {
        workflowRunId: t,
        eventType: n.eventType,
        eventId: n.eventId,
      }),
      !0)
    : !1;
}
function wa(e, t) {
  if (!e) return 0;
  let n = 0;
  for (let r of e) r.eventType === `step_started` && r.correlationId === t && n++;
  return n;
}
function Ta(e, t) {
  return e?.[Ut] ?? t;
}
function Ea(e) {
  let t = new Set(),
    n = new Set();
  for (let r of e)
    r.eventType === `hook_disposed`
      ? t.add(r.correlationId)
      : r.eventType === `wait_completed` && n.add(r.correlationId);
  let r = !1,
    i = !1;
  for (let a of e)
    if (
      (a.eventType === `hook_created` && !t.has(a.correlationId)
        ? (r = !0)
        : a.eventType === `wait_created` && !n.has(a.correlationId) && (i = !0),
      r && i)
    )
      break;
  return { openHook: r, openWait: i };
}
function Da(e, t) {
  i(t?.basePath);
  let n = Number(process.env.WORKFLOW_V2_TIMEOUT_MS) || 12e4,
    r = Zt(t?.namespace),
    a = Gt(`workflow`, r),
    s = (t) =>
      t.createQueueHandler(a, async (i, s) => {
        let c = Xe(i);
        if (c) {
          await yt(c, `workflow`, t.specVersion);
          return;
        }
        let {
            runId: l,
            traceCarrier: u,
            requestedAt: f,
            stepId: h,
            stepName: g,
            replayDivergence: y,
            runInput: S,
          } = qt.parse(i),
          C = Ve(u) ? u : void 0,
          { requestId: w } = s,
          O = s.queueName.slice(a.length),
          k = W.forRun(l, O),
          A = jn();
        if (s.attempt > A) {
          let e = Dn(void 0, m.MAX_DELIVERIES_EXCEEDED);
          k.error(`Workflow handler exceeded max deliveries (${s.attempt}/${A})`, {
            attempt: s.attempt,
            errorCode: e.errorCode,
            errorAttribution: e.attribution,
          });
          try {
            let e = await ar(),
              t = jt(e, l),
              n = new b(`Workflow exceeded maximum queue deliveries (${s.attempt}/${A})`);
            await e.events.create(
              l,
              {
                eventType: `run_failed`,
                specVersion: 5,
                eventData: {
                  error: await Ke(n, l, await t()),
                  errorCode: m.MAX_DELIVERIES_EXCEEDED,
                },
              },
              { requestId: w },
            );
          } catch (e) {
            if (T.is(e) || v.is(e)) return;
            k.error(
              `Failed to mark run as failed after ${s.attempt} delivery attempts. A persistent error is preventing the run from being terminated. The run will remain in its current state until manually resolved. This is most likely due to a persistent outage of the workflow backend or a bug in the workflow runtime and should be reported to the Workflow team.`,
              {
                attempt: s.attempt,
                errorName: e instanceof Error ? e.name : `UnknownError`,
                errorMessage: e instanceof Error ? e.message : String(e),
                errorStack: e instanceof Error ? e.stack : void 0,
              },
            );
          }
          return;
        }
        let j = Le(),
          M = () => ue(j, C),
          N = await Tt(j, C),
          F = new cr(),
          I = j === `continuous` ? C : void 0,
          L = await ze(`CONSUMER`);
        return await At(
          I,
          async () =>
            await vt({ workflowRunId: l, workflowName: O }, async () => {
              let t = await q(`workflow.route.get_world`, async () => ar());
              return q(`workflow.execute ${o(O)}`, { kind: L, links: N }, async (i) => {
                i?.setAttributes({
                  ...Et(O),
                  ...de(`execute_v2`),
                  ...tt(`vercel-queue`),
                  ...wt(s.queueName),
                  ...ht(s.messageId),
                  ...it(`process`),
                  ...at({ requestedAt: f }),
                  ..._t(l),
                  ...Ot(!!C),
                  ...bt(j),
                });
                let a = Date.now(),
                  o = 0,
                  c = null,
                  u = null,
                  A = null,
                  N,
                  I,
                  L = -1,
                  R,
                  ee,
                  te,
                  ne,
                  re = 0,
                  ie,
                  z = Gn() && S !== void 0 && s.attempt === 1 && h === void 0 && !y;
                i?.setAttributes(Ye(z));
                let B,
                  ae = async () => {
                    if (B)
                      try {
                        await B;
                      } catch {}
                  },
                  oe = new Set(),
                  se = (e) => {
                    oe.size > 0 &&
                      W.error(
                        `Invariant violation: acking the workflow message while owned inline steps are still executing — crash recovery for these steps is broken`,
                        { workflowRunId: l, ackPath: e, stepIds: [...oe] },
                      );
                  },
                  V = async (e) => {
                    if ((se(`reinvoke`), !z)) return { timeoutSeconds: e };
                    await J(
                      t,
                      G(O, r),
                      { runId: l, traceCarrier: await M(), requestedAt: new Date() },
                      e > 0 ? { delaySeconds: e } : void 0,
                    );
                  };
                if (h && g)
                  try {
                    let e = await t.runs.get(l, { resolveData: `none` });
                    if (e.status !== `running`) {
                      W.debug(`Run already finished, skipping background step`, {
                        workflowRunId: l,
                        status: e.status,
                      });
                      return;
                    }
                    let n = e.startedAt ? +e.startedAt : Date.now(),
                      i = s.attempt,
                      a = $t(g)?.maxRetries ?? 3;
                    if (s.attempt > a + 1) {
                      let e = await Y(l);
                      ((c = e.events), (u = e.cursor), (i = wa(c, h) + 1));
                    }
                    F.pause();
                    let o;
                    try {
                      o = await Mr(l, h, () =>
                        Er({
                          world: t,
                          workflowRunId: l,
                          workflowDeploymentId: e.deploymentId,
                          workflowName: O,
                          workflowStartedAt: n,
                          rootRunId: Ta(e.attributes, l),
                          stepId: h,
                          stepName: g,
                          runSpecVersion: e.specVersion,
                          authoritativeAttempt: i,
                        }),
                      );
                    } finally {
                      F.resume();
                    }
                    if (o.type === `retry` || o.type === `throttled`)
                      return { timeoutSeconds: o.timeoutSeconds };
                    if (o.type === `completed` && o.hasPendingOps) {
                      await J(t, G(O, r), {
                        runId: l,
                        traceCarrier: await M(),
                        requestedAt: new Date(),
                      });
                      return;
                    }
                    if (o.type === `completed` || o.type === `failed` || o.type === `skipped`) {
                      let r = await Y(l);
                      ((c = r.events), (u = r.cursor));
                      let i = new Set(),
                        a = new Set();
                      for (let e of c)
                        e.eventType === `step_created`
                          ? i.add(e.correlationId)
                          : (e.eventType === `step_completed` || e.eventType === `step_failed`) &&
                            a.add(e.correlationId);
                      let o = new Set();
                      for (let e of i) a.has(e) || o.add(e);
                      if (o.size > 0)
                        if (Kn() && Ar(c, o, s.messageId))
                          W.debug(
                            `Background step done; falling through to recover an inline step owned by this message`,
                            { workflowRunId: l },
                          );
                        else {
                          W.debug(`Background step done but other steps pending, returning`, {
                            workflowRunId: l,
                          });
                          return;
                        }
                      W.debug(`All parallel steps done, replaying inline after background step`, {
                        workflowRunId: l,
                      });
                      let d = c.find((e) => e.eventType === `run_created`),
                        f;
                      if (d) f = d.eventData.input;
                      else {
                        if (!Yt(e.specVersion))
                          throw new p(`Workflow run "${l}" has no "run_created" event`);
                        let n = await t.runs.get(l, { resolveData: `all` });
                        if (n.status !== `running`) return;
                        f = n.input;
                      }
                      ((N = {
                        ...e,
                        input: f,
                        status: `running`,
                        output: void 0,
                        error: void 0,
                        completedAt: void 0,
                      }),
                        (L = n));
                    } else return;
                  } catch (e) {
                    let n = xa(e);
                    if (!n) throw e;
                    await Sa({
                      world: t,
                      workflowRun: N,
                      runId: l,
                      requestId: w,
                      err: e,
                      errorCode: n,
                      logMessage: `Fatal error while preparing background workflow step`,
                    });
                    return;
                  }
                if (!N) {
                  let e = {
                      eventType: `run_started`,
                      specVersion: S?.specVersion ?? 5,
                      ...(S
                        ? {
                            eventData: {
                              input: S.input,
                              deploymentId: S.deploymentId,
                              workflowName: S.workflowName,
                              executionContext: S.executionContext,
                              attributes: S.attributes,
                              allowReservedAttributes: S.allowReservedAttributes,
                            },
                          }
                        : {}),
                    },
                    n = (e) => {
                      i?.addEvent(`workflow.run_started.create.start`, {
                        "workflow.run_started.skip_preload": e,
                      });
                    };
                  if (z && S) {
                    n(!0);
                    let r = t.events.create(l, e, { requestId: w, skipPreload: !0 });
                    ((B = r),
                      r.then(
                        (e) => {
                          let t = ba(e?.maxEvents);
                          t !== void 0 && (I = t);
                        },
                        () => {},
                      ),
                      r.catch(() => {}),
                      (R = []));
                    let a = new Date();
                    ((N = {
                      runId: l,
                      status: `running`,
                      deploymentId: S.deploymentId,
                      workflowName: S.workflowName,
                      specVersion: S.specVersion,
                      executionContext: S.executionContext,
                      input: S.input,
                      attributes: S.attributes ?? {},
                      startedAt: a,
                      createdAt: a,
                      updatedAt: a,
                    }),
                      (L = +a),
                      (ne = +a),
                      i?.setAttributes({ ...X(`running`), ...ot(L) }));
                  } else {
                    try {
                      n(!1);
                      let r = await t.events.create(l, e, { requestId: w });
                      if (!r.run)
                        throw new p(
                          `Event creation for 'run_started' did not return the run entity for run "${l}"`,
                        );
                      if (
                        ((N = r.run),
                        (I = ba(r.maxEvents)),
                        (ne = Date.now()),
                        r.events &&
                          r.events.length > 0 &&
                          r.hasMore !== !0 &&
                          ((R = r.events), (ee = r.cursor)),
                        !N.startedAt)
                      )
                        throw new p(`Workflow run "${l}" has no "startedAt" timestamp`);
                    } catch (e) {
                      if (T.is(e) || v.is(e)) {
                        W.info(`Run already finished during setup, skipping`, {
                          workflowRunId: l,
                          message: e.message,
                        });
                        return;
                      } else {
                        let n = xa(e);
                        if (!n) throw e;
                        await Sa({
                          world: t,
                          workflowRun: N,
                          runId: l,
                          requestId: w,
                          err: e,
                          errorCode: n,
                          logMessage: `Fatal runtime error during workflow setup`,
                        });
                        return;
                      }
                    }
                    if (
                      ((L = +N.startedAt),
                      i?.setAttributes({ ...X(N.status), ...ot(L) }),
                      N.status !== `running`)
                    ) {
                      W.info(`Workflow already completed or failed, skipping`, {
                        workflowRunId: l,
                        status: N.status,
                      });
                      return;
                    }
                  }
                }
                let le = await jt(t, N)(),
                  ue = new An(le);
                for (;;) {
                  if ((o++, F.isExhausted())) {
                    await lr({
                      runId: l,
                      workflowName: O,
                      requestId: w,
                      attempt: s.attempt,
                      limitMs: F.configuredLimitMs,
                    });
                    return;
                  }
                  if (Date.now() - a >= n) {
                    (W.info(`V2 timeout reached, re-scheduling workflow`, {
                      workflowRunId: l,
                      loopIteration: o,
                      elapsedMs: Date.now() - a,
                    }),
                      await J(t, G(O, r), {
                        runId: l,
                        traceCarrier: await M(),
                        requestedAt: new Date(),
                      }));
                    return;
                  }
                  let f = 0,
                    p = null;
                  try {
                    let n;
                    if (A && c) {
                      let e = A;
                      if (((A = null), e.events.length > 0)) {
                        let t = new Set(c.map((e) => e.eventId));
                        for (let n of e.events) t.has(n.eventId) || (t.add(n.eventId), c.push(n));
                      }
                      ((u = e.cursor ?? u), (n = c));
                    } else if (c === null)
                      if (R) ((n = R), (u = ee ?? null));
                      else {
                        let e = await Y(l);
                        ((n = e.events), (u = e.cursor));
                      }
                    else if (u) {
                      let e = await Y(l, u);
                      if (e.events.length > 0) {
                        let t = new Set(c.map((e) => e.eventId));
                        for (let n of e.events) t.has(n.eventId) || (t.add(n.eventId), c.push(n));
                      }
                      ((u = e.cursor ?? u), (n = c));
                    } else if (R) {
                      W.debug(
                        `No cursor after preloaded-events first iteration; doing full reload to pick up cursor.`,
                        { workflowRunId: l },
                      );
                      let e = await Y(l);
                      ((c = e.events), (u = e.cursor), (n = c));
                    } else {
                      W.warn(
                        `Event cursor missing after initial load — falling back to full reload. This indicates a bug in the World implementation.`,
                        { workflowRunId: l },
                      );
                      let e = await Y(l);
                      ((c = e.events), (u = e.cursor), (n = c));
                    }
                    if (Ca(n, l)) return;
                    let r = Date.now(),
                      a = new Set(
                        n
                          .filter((e) => e.eventType === `wait_completed`)
                          .map((e) => e.correlationId),
                      ),
                      s = n
                        .filter(
                          (e) =>
                            e.eventType === `wait_created` &&
                            e.correlationId !== void 0 &&
                            !a.has(e.correlationId) &&
                            r >= e.eventData.resumeAt.getTime(),
                        )
                        .map((e) => ({
                          eventType: `wait_completed`,
                          specVersion: 5,
                          correlationId: e.correlationId,
                          eventData: { resumeAt: e.eventData.resumeAt },
                        }));
                    for (let e of s) {
                      let r = { events: n, cursor: u };
                      try {
                        await nt(l, r, (n) =>
                          t.events.create(l, e, { requestId: w, stateUpdatedAt: n }),
                        );
                      } catch (t) {
                        if (T.is(t)) {
                          W.info(`Wait already completed, skipping`, {
                            workflowRunId: l,
                            correlationId: e.correlationId,
                          });
                          continue;
                        }
                        throw t;
                      } finally {
                        u = r.cursor;
                      }
                    }
                    if (s.length > 0)
                      if (u) {
                        let e = await Y(l, u),
                          t = new Set(
                            e.events
                              .filter((e) => e.eventType === `wait_completed`)
                              .map((e) => e.correlationId),
                          );
                        if (s.every((e) => t.has(e.correlationId))) {
                          let t = new Set(n.map((e) => e.eventId));
                          for (let r of e.events) t.has(r.eventId) || (t.add(r.eventId), n.push(r));
                          u = e.cursor ?? u;
                        } else {
                          let e = await Y(l);
                          ((n = e.events), (u = e.cursor));
                        }
                      } else {
                        let e = await Y(l);
                        ((n = e.events), (u = e.cursor));
                      }
                    if (Ca(n, l)) return;
                    if (I !== void 0 && n.length >= I) throw new E(n.length, I);
                    ((c = n),
                      (te ??= n.every(
                        (e) =>
                          e.eventType === `run_created` ||
                          e.eventType === `run_started` ||
                          e.eventType === `attr_set`,
                      )),
                      (p = u),
                      W.debug(`Starting workflow replay`, {
                        workflowRunId: l,
                        loopIteration: o,
                        eventCount: n.length,
                      }),
                      (f = Date.now()));
                    let d = ue.prewarm(N, n),
                      m = await ya(e, N, n, le, ue, B, t.capabilities);
                    (await d,
                      W.debug(`Workflow replay completed`, {
                        workflowRunId: l,
                        loopIteration: o,
                        replayMs: Date.now() - f,
                      }));
                    try {
                      (await ae(),
                        await t.events.create(
                          l,
                          { eventType: `run_completed`, specVersion: 5, eventData: { output: m } },
                          { requestId: w, stateUpdatedAt: St(n) },
                        ));
                    } catch (e) {
                      if (T.is(e) || v.is(e)) {
                        W.info(`Tried completing workflow run, but run has already finished.`, {
                          workflowRunId: l,
                          message: e.message,
                        });
                        return;
                      }
                      throw e;
                    }
                    i?.setAttributes({ ...X(`completed`) });
                    return;
                  } catch (n) {
                    if (K.is(n)) {
                      let e = Date.now() - f;
                      W.debug(`Workflow suspended`, {
                        workflowRunId: l,
                        loopIteration: o,
                        replayMs: e,
                        steps: n.stepCount,
                        hooks: n.hookCount,
                        waits: n.waitCount,
                      });
                      let a = P(n.stepCount, n.hookCount, n.waitCount);
                      a && W.debug(a);
                      let d = Date.now();
                      if (!c)
                        throw Error(
                          `Invariant violation: workflow suspended before its event log was loaded`,
                        );
                      let m = { events: c, cursor: u },
                        h;
                      try {
                        h = await Pr({
                          suspension: n,
                          world: t,
                          run: N,
                          span: i,
                          requestId: w,
                          eventLog: m,
                          runReadyBarrier: B,
                        });
                      } catch (e) {
                        if (_.is(e))
                          return (
                            W.warn(
                              `Suspension event creation rejected as stale after reload retries; re-invoking run for a fresh replay`,
                              { workflowRunId: l, loopIteration: o },
                            ),
                            await V(0)
                          );
                        if (!b.is(e)) throw e;
                        let n = _n(e);
                        W.error(
                          `Non-retryable error while committing workflow suspension; failing run`,
                          {
                            workflowRunId: l,
                            errorCode: n,
                            errorName: e.name,
                            errorMessage: e.message,
                          },
                        );
                        try {
                          (await ae(),
                            await t.events.create(
                              l,
                              {
                                eventType: `run_failed`,
                                specVersion: 5,
                                eventData: {
                                  error: await Ke(e, l, le, globalThis, (N?.specVersion ?? 0) >= 5),
                                  errorCode: n,
                                },
                              },
                              { requestId: w },
                            ));
                        } catch (e) {
                          if (T.is(e) || v.is(e)) {
                            W.info(`Tried failing workflow run, but run has already finished.`, {
                              workflowRunId: l,
                              message: e.message,
                            });
                            return;
                          }
                          throw e;
                        }
                        i?.setAttributes({
                          ...X(`failed`),
                          ...ce(n),
                          ...Ie(e.name),
                          ...Me(e.message),
                          ...xt(e.name),
                        });
                        return;
                      }
                      if (
                        ((u = m.cursor),
                        (re += h.hookCreationMs),
                        h.hasAttributeEvents && ie === void 0 && (ie = re),
                        W.debug(`Suspension handled`, {
                          workflowRunId: l,
                          suspensionMs: Date.now() - d,
                          pendingSteps: h.pendingSteps.length,
                          timeoutSeconds: h.waitTimeout?.seconds,
                          hasHookConflict: h.hasHookConflict,
                          hasAwaitedHookCreation: h.hasAwaitedHookCreation,
                          hasAttributeEvents: h.hasAttributeEvents,
                        }),
                        h.hasHookConflict)
                      )
                        return await V(0);
                      if (h.hasAttributeEvents) continue;
                      let g = h.pendingSteps,
                        y = h.lazyInlineSteps,
                        x = new Set(y.map((e) => e.correlationId)),
                        S = await M(),
                        C = [],
                        E = Kn(),
                        D = Date.now(),
                        k = [],
                        j = 0;
                      for (let e of g) {
                        if (x.has(e.correlationId)) continue;
                        let n = E && Dr(e);
                        if (n && e.ownerMessageId === s.messageId) {
                          k.push(e);
                          continue;
                        }
                        let i = n ? Or(e, D) : 0;
                        if (i > 0) {
                          (j++,
                            W.debug(
                              `Pending step is inline-owned by a live invocation; ensuring delayed backstop wake instead of immediate requeue`,
                              {
                                workflowRunId: l,
                                stepId: e.correlationId,
                                ownerMessageId: e.ownerMessageId,
                                backstopDelaySeconds: i,
                              },
                            ),
                            C.push(
                              J(
                                t,
                                G(O, r),
                                { runId: l, traceCarrier: S, requestedAt: new Date() },
                                { delaySeconds: i, idempotencyKey: kr(e) },
                              ),
                            ));
                          continue;
                        }
                        C.push(
                          J(
                            t,
                            G(O, r),
                            {
                              runId: l,
                              stepId: e.correlationId,
                              stepName: e.stepName,
                              traceCarrier: S,
                              requestedAt: new Date(),
                            },
                            { idempotencyKey: e.correlationId },
                          ),
                        );
                      }
                      (h.waitTimeout &&
                        C.push(
                          J(
                            t,
                            G(O, r),
                            { runId: l, traceCarrier: S, requestedAt: new Date() },
                            Rr(h.waitTimeout.seconds, h.waitTimeout.correlationId),
                          ),
                        ),
                        await Promise.all(C));
                      let I = [
                        ...y.map((e) => ({
                          correlationId: e.correlationId,
                          stepName: e.stepName,
                          lazyStepInput: e.dehydratedInput,
                        })),
                        ...k.map((e) => ({ correlationId: e.correlationId, stepName: e.stepName })),
                      ];
                      if (
                        ((j > 0 || k.length > 0) &&
                          i?.setAttributes({
                            ...(k.length > 0 ? Be(k.length) : {}),
                            ...(j > 0 ? Pe(j) : {}),
                          }),
                        k.length > 0 &&
                          W.warn(
                            `Re-executing inline steps owned by this queue message — a previous delivery crashed mid-body and this redelivery is recovering them`,
                            { workflowRunId: l, stepIds: k.map((e) => e.correlationId) },
                          ),
                        I.length === 0)
                      )
                        return h.hasAwaitedHookCreation ? await V(0) : void 0;
                      let R = Ea(c ?? []),
                        ee = Je() && t.capabilities?.preconditionGuard === !0,
                        se =
                          typeof p == `string` &&
                          n.stepCount === 1 &&
                          n.waitCount === 0 &&
                          g.length === 1 &&
                          y.length === 1 &&
                          k.length === 0 &&
                          !h.waitTimeout &&
                          !R.openWait &&
                          (ee || (n.hookCount === 0 && !R.openHook)),
                        ue = ee && (R.openHook || n.hookCount > 0 || h.hasHookEvents),
                        de =
                          z &&
                          !h.hasAttributeEvents &&
                          !h.waitTimeout &&
                          !h.hasHookEvents &&
                          !h.hasAwaitedHookCreation &&
                          !R.openHook &&
                          !R.openWait,
                        fe = Cr({
                          events: c ?? [],
                          invocationStartedClean: te === !0,
                          runCreatedAtMs: ur(l) ?? (z ? void 0 : +N.createdAt),
                          runStartedReceivedAtMs: ne,
                          replayMs: e,
                          preStepBlockingMs: re,
                          preStepBlockingBeforeAttrMs: ie,
                          suspensionHasWaits: n.waitCount > 0 || h.waitTimeout !== void 0,
                          suspensionCreatedHooks: n.hookCount > 0 || h.hasHookEvents,
                          turbo: z,
                        }),
                        pe = St(c ?? []);
                      F.pause();
                      let me,
                        H = I.map((e, n) => {
                          let r = () =>
                            Er({
                              world: t,
                              workflowRunId: l,
                              workflowDeploymentId: N.deploymentId,
                              workflowName: O,
                              workflowStartedAt: L,
                              rootRunId: Ta(N.attributes, l),
                              stepId: e.correlationId,
                              stepName: e.stepName,
                              runSpecVersion: N.specVersion,
                              authoritativeAttempt:
                                e.lazyStepInput === void 0 ? wa(c, e.correlationId) + 1 : 1,
                              lazyStepInput: e.lazyStepInput,
                              ownerMessageId: s.messageId,
                              forceOptimisticStart: de,
                              suppressOptimisticStart: ue,
                              runReadyBarrier: B,
                              stateUpdatedAt: pe,
                              ...(n === 0 && e.lazyStepInput !== void 0 && fe
                                ? { latencyTracking: fe }
                                : {}),
                              ...(se && p ? { inlineDeltaSinceCursor: p } : {}),
                            });
                          return (
                            oe.add(e.correlationId),
                            (e.lazyStepInput === void 0 ? Mr(l, e.correlationId, r) : r()).finally(
                              () => oe.delete(e.correlationId),
                            )
                          );
                        });
                      try {
                        me = await Promise.all(H);
                      } catch (e) {
                        if (_.is(e))
                          return (
                            await Promise.allSettled(H),
                            W.warn(
                              `Inline step claim rejected as stale; re-invoking run for a fresh replay`,
                              { workflowRunId: l, loopIteration: o },
                            ),
                            await V(0)
                          );
                        throw e;
                      } finally {
                        F.resume();
                      }
                      let he = [],
                        ge = !1,
                        _e;
                      for (let e = 0; e < I.length; e++) {
                        let t = me[e],
                          n = I[e];
                        t.type === `retry`
                          ? he.push({ step: n, delaySeconds: t.timeoutSeconds })
                          : t.type === `throttled`
                            ? (_e = Math.max(_e ?? 0, t.timeoutSeconds))
                            : t.type === `completed` && t.hasPendingOps && (ge = !0);
                      }
                      if (_e !== void 0) return await V(_e);
                      if (he.length > 0) {
                        let e = await M();
                        await Promise.all(
                          he.map(({ step: n, delaySeconds: i }) =>
                            J(
                              t,
                              G(O, r),
                              {
                                runId: l,
                                stepId: n.correlationId,
                                stepName: n.stepName,
                                traceCarrier: e,
                                requestedAt: new Date(),
                              },
                              { delaySeconds: i, idempotencyKey: n.correlationId },
                            ),
                          ),
                        );
                      }
                      if (ge) {
                        (W.debug(`Breaking loop: inline step has pending ops`, {
                          workflowRunId: l,
                          loopIteration: o,
                        }),
                          await J(t, G(O, r), {
                            runId: l,
                            traceCarrier: await M(),
                            requestedAt: new Date(),
                          }));
                        return;
                      }
                      if (he.length > 0) return;
                      if (I.length === 1) {
                        let e = me[0];
                        e.type === `completed` &&
                          e.inlineDelta &&
                          !e.inlineDelta.hasMore &&
                          (A = { events: e.inlineDelta.events, cursor: e.inlineDelta.cursor });
                      }
                    } else {
                      if (_.is(n))
                        return (
                          W.warn(
                            `Event creation rejected as stale; re-invoking run for a fresh replay`,
                            { workflowRunId: l, loopIteration: o },
                          ),
                          await V(0)
                        );
                      if (cn(n))
                        throw (
                          k.warn(
                            `Transient world error during replay; redelivering via queue instead of failing the run`,
                            {
                              errorName: n instanceof Error ? n.name : `UnknownError`,
                              errorMessage: n instanceof Error ? n.message : String(n),
                              deliveryAttempt: s.attempt,
                            },
                          ),
                          n
                        );
                      let a = n;
                      if (x.is(n)) {
                        let e = (y?.count ?? 0) + 1,
                          i = Jn();
                        if (e <= i) {
                          (k.warn(
                            `Workflow replay diverged; queueing a recovery replay before declaring the event log corrupted`,
                            {
                              errorCode: m.REPLAY_DIVERGENCE,
                              divergenceEventId: n.eventId,
                              priorDivergenceEventId: y?.eventId,
                              divergenceCount: e,
                              deliveryAttempt: s.attempt,
                              maxRecoveryReplays: i,
                              errorMessage: n.message,
                            },
                          ),
                            await J(t, G(O, r), {
                              runId: l,
                              traceCarrier: await M(),
                              requestedAt: new Date(),
                              replayDivergence: { eventId: n.eventId, count: e },
                            }));
                          return;
                        }
                        a = new D(
                          `Workflow replay diverged ${e} times after ${i} recovery replays; latest divergent event was ${n.eventId}. Last divergence: ${n.message}`,
                          { cause: n },
                        );
                      }
                      a instanceof Error && i?.recordException?.(a);
                      let c = await _r(a),
                        u = c.name || dr(a),
                        f = c.message,
                        p = c.stack || fr(a);
                      if (p) {
                        let t = d(O)?.moduleSpecifier || O;
                        p = Vi(p, t, e);
                      }
                      let h = _n(a);
                      (W.error(`Error while running workflow`, {
                        workflowRunId: l,
                        errorCode: h,
                        errorName: u,
                        errorStack: p,
                      }),
                        bn.isNativeError(a) && p && (a.stack = p));
                      try {
                        (await ae(),
                          await t.events.create(
                            l,
                            {
                              eventType: `run_failed`,
                              specVersion: 5,
                              eventData: {
                                error: await Ke(a, l, le, globalThis, (N?.specVersion ?? 0) >= 5),
                                errorCode: h,
                              },
                            },
                            { requestId: w },
                          ));
                      } catch (e) {
                        if (T.is(e) || v.is(e)) {
                          W.info(`Tried failing workflow run, but run has already finished.`, {
                            workflowRunId: l,
                            message: e.message,
                          });
                          return;
                        }
                        if (ln(e)) {
                          W.error(`Fatal world contract error while recording workflow failure`, {
                            workflowRunId: l,
                            errorCode: m.WORLD_CONTRACT_ERROR,
                            error: e instanceof Error ? e.message : String(e),
                          });
                          return;
                        }
                        throw e;
                      }
                      i?.setAttributes({ ...X(`failed`), ...ce(h), ...Ie(u), ...Me(f), ...xt(u) });
                      return;
                    }
                  }
                }
              });
            }),
        );
      }),
    c,
    l = 0,
    u = Date.now(),
    f = typeof t?.routeModuleBodyStartedAt == `number` ? u - t.routeModuleBodyStartedAt : void 0;
  return mt(async (e) => {
    l += 1;
    let t = c !== void 0;
    return q(
      `workflow.route.flow`,
      {
        kind: await ze(`SERVER`),
        attributes: {
          ...kt(`flow`),
          ...we(t),
          ...A(l),
          ...He(Date.now() - u),
          ...(f === void 0 ? {} : Qe(f)),
          ...Mt(e.method),
          ...$e(`/.well-known/workflow/v1/flow`),
        },
      },
      async (t) => {
        c ||= await q(`workflow.route.init`, async () =>
          s(await q(`workflow.route.get_world_handlers`, async () => ir())),
        );
        let n = await c(e);
        return (n instanceof Response && t?.setAttributes(Ze(n.status)), n);
      },
    );
  });
}
export {
  gn as Run,
  K as WorkflowSuspension,
  mn as cancelRun,
  rr as createWorld,
  nr as createWorldFromModule,
  an as getHookByToken,
  fn as getRun,
  ar as getWorld,
  ir as getWorldHandlers,
  Dt as healthCheck,
  un as listStreams,
  on as readStream,
  pn as recreateRunFromExisting,
  hn as reenqueueRun,
  nn as resumeHook,
  rn as resumeWebhook,
  or as setWorld,
  dn as start,
  sn as wakeUpRun,
  Da as workflowEntrypoint,
};
