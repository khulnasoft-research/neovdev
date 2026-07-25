import { h as e } from "./dist-CrxV2rsR.js";
import {
  C as t,
  D as n,
  E as r,
  O as i,
  S as a,
  T as o,
  g as s,
  h as c,
  l,
  p as u,
  r as d,
  s as f,
  t as p,
  w as m,
  x as h,
} from "./dist-B3qkUnLJ.js";
import {
  $ as ee,
  Bt as g,
  D as _,
  H as v,
  Jt as y,
  N as b,
  P as x,
  Pn as S,
  U as C,
  W as w,
  _ as T,
  _n as E,
  a as D,
  et as O,
  fn as k,
  g as A,
  gn as j,
  k as M,
  n as N,
  nn as P,
  qt as te,
  r as F,
  rn as ne,
  rt as re,
  s as ie,
  t as ae,
  vn as I,
  w as L,
  yn as R,
} from "./attribute-changes-Dk1fP6vt.js";
import { J as z, i as B, o as V, q as H, s as U } from "./dist-BX517Nmz.js";
const W = new Set([`PARSE_ERROR`, `SCHEMA_VALIDATION`, i.WORLD_CONTRACT_ERROR]),
  G = new Set([`TRANSPORT`, `TIMEOUT`]),
  K = [r.is, c.is, h.is, u.is];
function q(e) {
  if (!n.is(e) || e.status !== void 0) return !1;
  let t = `cause` in e ? e.cause : void 0;
  return (
    (e.code !== void 0 && W.has(e.code)) ||
    e.message.startsWith(`Failed to parse response body for `) ||
    e.message.startsWith(`Schema validation failed for `) ||
    (typeof t == `object` && !!t && `name` in t && t.name === `ZodError`)
  );
}
function J(e) {
  return s.is(e)
    ? !0
    : n.is(e)
      ? e.status !== void 0 && e.status >= 500
        ? !0
        : e.code !== void 0 && G.has(e.code)
      : !1;
}
function oe(e) {
  if (l.is(e)) return i.REPLAY_DIVERGENCE;
  if (p.is(e)) return i.CORRUPTED_EVENT_LOG;
  if (f.is(e)) return i.MAX_EVENTS_EXCEEDED;
  if (q(e) || J(e)) return i.WORLD_CONTRACT_ERROR;
  for (let t of K) if (t(e)) return i.RUNTIME_ERROR;
  return i.USER_ERROR;
}
const se = V();
function ce() {
  let e = C.getStore(),
    t = e?.workflowMetadata?.workflowRunId;
  if (t) return { [z]: e.rootRunId ?? t, [H]: t };
}
let Y = !1;
async function X(t, n, i) {
  "use step";
  return await F(() => {
    let a = t?.workflowId;
    if (!a)
      throw new r(
        `'start' received an invalid workflow function. Ensure the Workflow SDK is configured correctly and the function includes a 'use workflow' directive.`,
        { slug: `start-invalid-workflow-function` },
      );
    return O(`workflow.start ${e(a)}`, async (e) => {
      e?.setAttributes({ ...te(a), ...y(`start`) });
      let t = [],
        o = i ?? {};
      (Array.isArray(n) ? (t = n) : typeof n == `object` && (o = n),
        e?.setAttributes({ ...g(t.length) }));
      let s = o.world ?? (await I());
      R(s);
      let c = await s.getDeploymentId(),
        l = o.deploymentId ?? c;
      l === `latest` &&
        (s.resolveLatestDeploymentId
          ? (l = await s.resolveLatestDeploymentId())
          : (Y ||
              ((Y = !0),
              w.warn(
                `deploymentId: 'latest' has no effect in this world and was ignored. It is only supported by worlds with atomic deployments, such as Vercel. The run will target the current deployment.`,
                { currentDeploymentId: c },
              )),
            (l = c)));
      let u, f;
      if (l === c) ((u = !0), (f = !0));
      else if (typeof s.streams?.get != `function`) ((u = !1), (f = !1));
      else {
        let e = T(
          (
            await ie(s, `workflow`, {
              deploymentId: l,
              timeout: 2e3,
              namespace: o.namespace,
            }).catch(() => void 0)
          )?.workflowCoreVersion,
        );
        ((u = e.framedByteStreams), (f = e.supportedFormats.has(k.GZIP)));
      }
      let p = [],
        m = `wrun_${s.createRunId ? s.createRunId(o) : se()}`,
        h = await ee(),
        _ = o.specVersion ?? s.specVersion,
        v = U(_),
        b = o.allowReservedAttributes === !0,
        x;
      if (o.attributes && Object.keys(o.attributes).length > 0) {
        if (_ < 4)
          throw new r(
            `Initial workflow attributes require a World that supports spec version 4 or later.`,
          );
        for (let [e, t] of Object.entries(o.attributes))
          if (typeof t != `string`)
            throw new r(`Initial workflow attribute ${JSON.stringify(e)} must be a string value.`);
        let e = ae(o.attributes, { allowReservedAttributes: b });
        x = Object.fromEntries(e.map(({ key: e, value: t }) => [e, t]));
      }
      let C = _ >= 4 ? ce() : void 0,
        E = C ? { ...C, ...x } : x,
        O = E ? { attributes: E, ...(b || C != null ? { allowReservedAttributes: !0 } : {}) } : {};
      if (o.replayedFromRunId !== void 0 && !B.safeParse(o.replayedFromRunId).success)
        throw new r(
          `replayedFromRunId must be a run ID (wrun_<ulid>); received ${JSON.stringify(String(o.replayedFromRunId).slice(0, 64))}.`,
        );
      let j = await s.getEncryptionKeyForRun?.(m, { ...o, deploymentId: l }),
        M = j ? await S(j) : void 0,
        F = await L(t, m, M, p, globalThis, v, u, f && _ >= 5),
        z = {
          traceCarrier: h,
          workflowCoreVersion: A,
          features: { encryption: !!M },
          ...(o.replayedFromRunId ? { replayedFromRunId: o.replayedFromRunId } : {}),
        },
        [V, H] = await Promise.allSettled([
          s.events.create(
            m,
            {
              eventType: `run_created`,
              specVersion: _,
              eventData: { deploymentId: l, workflowName: a, input: F, executionContext: z, ...O },
            },
            { v1Compat: v },
          ),
          s.queue(
            D(a, o.namespace),
            {
              runId: m,
              traceCarrier: h,
              ...(_ >= 3
                ? {
                    runInput: {
                      input: F,
                      deploymentId: l,
                      workflowName: a,
                      specVersion: _,
                      executionContext: z,
                      ...O,
                    },
                  }
                : {}),
            },
            {
              deploymentId: l,
              specVersion: _,
              ...(o.region === void 0 ? {} : { region: o.region }),
            },
          ),
        ]);
      if (H.status === `rejected`) throw H.reason;
      let W = !1;
      if (V.status === `rejected`) {
        let e = V.reason;
        if (!d.is(e))
          if (J(e))
            ((W = !0),
              w.warn(
                `Run creation event failed, but the run was accepted via the queue. The run_created event will be re-tried async by the runtime.`,
                { workflowRunId: m, error: e.message },
              ));
          else throw e;
      } else {
        let e = V.value;
        if (!e.run) throw new r(`Missing 'run' in server response for 'run_created' event`);
        if (!v && e.run.runId !== m)
          throw new r(
            `Server returned different runId than requested: expected ${m}, got ${e.run.runId}`,
          );
      }
      return (
        N(Promise.all(p), (e) => {
          w.warn(`Background flush of workflow argument streams failed`, {
            workflowRunId: m,
            error: e instanceof Error ? e.message : String(e),
          });
        }),
        e?.setAttributes({
          ...P(m),
          ...re(l),
          ...(V.status === `fulfilled` && V.value.run ? ne(V.value.run.status) : {}),
        }),
        new $(m, { resilientStart: W })
      );
    });
  });
}
const Z = (e) => (Array.isArray(e) ? e : [e]);
async function le(e, t, n = {}) {
  try {
    let r = await e.runs.get(t, { resolveData: `all` }),
      i = await e.getEncryptionKeyForRun?.(r),
      a = i ? await S(i) : void 0,
      o = Z(await b(r.input, t, a, globalThis)),
      s = n.specVersion ?? r.specVersion ?? 1,
      c = n.deploymentId ?? r.deploymentId;
    return (
      await X({ workflowId: r.workflowName }, o, {
        deploymentId: c,
        world: e,
        specVersion: s,
        replayedFromRunId: t,
        namespace: n.namespace,
      })
    ).runId;
  } catch (e) {
    throw Error(`Failed to recreate run from ${t}: ${e instanceof Error ? e.message : String(e)}`, {
      cause: e,
    });
  }
}
async function ue(e, t, n) {
  try {
    let r = (await e.runs.get(t, { resolveData: `none` })).specVersion ?? 1,
      i = U(r),
      a = {
        eventType: `run_cancelled`,
        specVersion: r,
        ...(n?.cancelReason === void 0 ? {} : { eventData: { cancelReason: n.cancelReason } }),
      };
    await e.events.create(t, a, { v1Compat: i });
  } catch (e) {
    throw Error(`Failed to cancel run ${t}: ${e instanceof Error ? e.message : String(e)}`, {
      cause: e,
    });
  }
}
async function de(e, t, n) {
  try {
    let r = await e.runs.get(t, { resolveData: `none` });
    await e.queue(
      D(r.workflowName, n?.namespace),
      { runId: t },
      { deploymentId: r.deploymentId, specVersion: r.specVersion ?? 1 },
    );
  } catch (e) {
    throw Error(`Failed to re-enqueue run ${t}: ${e instanceof Error ? e.message : String(e)}`, {
      cause: e,
    });
  }
}
async function Q(e, t, n) {
  try {
    let r = await e.runs.get(t, { resolveData: `none` }),
      i = U(r.specVersion),
      a = [],
      o = null;
    do {
      let n = await e.events.list({
        runId: t,
        pagination: { limit: 1e3, ...(o ? { cursor: o } : {}) },
        resolveData: `none`,
      });
      (a.push(...n.data), (o = n.hasMore ? n.cursor : null));
    } while (o);
    let s = a.filter((e) => e.eventType === `wait_created`),
      c = new Set(a.filter((e) => e.eventType === `wait_completed`).map((e) => e.correlationId)),
      l = s.filter((e) => !c.has(e.correlationId));
    if (n?.correlationIds && n.correlationIds.length > 0) {
      let e = new Set(n.correlationIds);
      l = l.filter((t) => t.correlationId && e.has(t.correlationId));
    }
    let u = [],
      f = 0;
    for (let n of l) {
      if (!n.correlationId) continue;
      let a = i
        ? { eventType: `wait_completed`, correlationId: n.correlationId }
        : {
            eventType: `wait_completed`,
            correlationId: n.correlationId,
            specVersion: r.specVersion,
            eventData: { resumeAt: n.eventData.resumeAt },
          };
      try {
        (await e.events.create(t, a, { v1Compat: i }), f++);
      } catch (e) {
        d.is(e) ? f++ : u.push(e instanceof Error ? e : Error(String(e)));
      }
    }
    if (
      (f > 0 &&
        (await e.queue(
          D(r.workflowName, n?.namespace),
          { runId: t },
          { deploymentId: r.deploymentId, specVersion: r.specVersion ?? 1 },
        )),
      u.length > 0)
    )
      throw AggregateError(
        u,
        `Failed to complete ${u.length}/${l.length} pending wait(s) for run ${t}`,
      );
    return { stoppedCount: f };
  } catch (e) {
    throw e instanceof AggregateError
      ? e
      : Error(`Failed to wake up run ${t}: ${e instanceof Error ? e.message : String(e)}`, {
          cause: e,
        });
  }
}
async function fe(e, t, n, r) {
  try {
    return await e.streams.get(t, n, r?.startIndex);
  } catch (e) {
    throw Error(`Failed to read stream ${n}: ${e instanceof Error ? e.message : String(e)}`, {
      cause: e,
    });
  }
}
async function pe(e, t) {
  try {
    return await e.streams.list(t);
  } catch (e) {
    throw Error(
      `Failed to list streams for run ${t}: ${e instanceof Error ? e.message : String(e)}`,
      { cause: e },
    );
  }
}
var $ = class e {
  static [E](e) {
    return { runId: e.runId, resilientStart: e.#r };
  }
  static [j](t) {
    return new e(t.runId, { resilientStart: t.resilientStart });
  }
  runId;
  #e;
  get #t() {
    return ((this.#e ||= I()), this.#e);
  }
  #n = null;
  #r = !1;
  constructor(e, t) {
    ((this.runId = e), (this.#r = t?.resilientStart ?? !1));
  }
  #i() {
    return (
      (this.#n ||= (async () => {
        let e = await this.#t,
          t = await e.runs.get(this.runId),
          n = await e.getEncryptionKeyForRun?.(t);
        return n ? await S(n) : void 0;
      })()),
      this.#n
    );
  }
  #a() {
    return () => this.#i();
  }
  async wakeUp(e) {
    "use step";
    return Q(await this.#t, this.runId, e);
  }
  async cancel(e) {
    "use step";
    await (
      await this.#t
    ).events.create(this.runId, {
      eventType: `run_cancelled`,
      specVersion: 5,
      ...(e?.cancelReason === void 0 ? {} : { eventData: { cancelReason: e.cancelReason } }),
    });
  }
  get exists() {
    "use step";
    return this.#t.then((e) =>
      e.runs
        .get(this.runId, { resolveData: `none` })
        .then(() => !0)
        .catch((e) => {
          if (o.is(e)) return !1;
          throw e;
        }),
    );
  }
  get status() {
    "use step";
    return this.#t.then((e) => e.runs.get(this.runId).then((e) => e.status));
  }
  get returnValue() {
    "use step";
    return this.#o();
  }
  get workflowName() {
    "use step";
    return this.#t.then((e) => e.runs.get(this.runId).then((e) => e.workflowName));
  }
  get createdAt() {
    "use step";
    return this.#t.then((e) => e.runs.get(this.runId).then((e) => e.createdAt));
  }
  get startedAt() {
    "use step";
    return this.#t.then((e) => e.runs.get(this.runId).then((e) => e.startedAt));
  }
  get completedAt() {
    "use step";
    return this.#t.then((e) => e.runs.get(this.runId).then((e) => e.completedAt));
  }
  get readable() {
    return this.getReadable();
  }
  getReadable(e = {}) {
    "use step";
    let { ops: t = [], global: n = globalThis, startIndex: r, namespace: i } = e,
      a = v(this.runId, i),
      o = this.#a(),
      s = _(n, t, this.runId, o).ReadableStream({ name: a, startIndex: r }),
      c = this.#t,
      l = this.runId;
    return Object.assign(s, {
      getTailIndex: async () => (await (await c).streams.getInfo(l, a)).tailIndex,
    });
  }
  async #o() {
    let e = await this.#t,
      n = 0,
      r = this.#r ? 3 : 0,
      i = [1e3, 3e3, 6e3];
    for (;;)
      try {
        let n = await e.runs.get(this.runId);
        if (n.status === `completed`) {
          let e = await this.#i();
          return await x(n.output, this.runId, e);
        }
        if (n.status === `cancelled`) throw new a(this.runId);
        if (n.status === `failed`) {
          let e = await this.#i(),
            r;
          try {
            r = await M(n.error, this.runId, e);
          } catch {
            r = Error(`Failed to hydrate workflow run error`);
          }
          throw new t(this.runId, r, { errorCode: n.errorCode });
        }
        throw new m(this.runId, n.status);
      } catch (e) {
        if (m.is(e)) {
          await new Promise((e) => setTimeout(e, 1e3));
          continue;
        }
        if (o.is(e) && n < r) {
          let e = i[n];
          (n++, await new Promise((t) => setTimeout(t, e)));
          continue;
        }
        throw e;
      }
  }
};
function me(e) {
  return new $(e);
}
export {
  fe as a,
  Q as c,
  J as d,
  q as f,
  pe as i,
  X as l,
  me as n,
  le as o,
  ue as r,
  de as s,
  $ as t,
  oe as u,
};
