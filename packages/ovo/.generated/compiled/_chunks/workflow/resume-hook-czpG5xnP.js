import { r as e } from "./chunk-BTyA9uPd.js";
import { E as t, n, o as r } from "./dist-B3qkUnLJ.js";
import {
  A as i,
  C as a,
  On as o,
  Pn as s,
  Q as c,
  W as l,
  _ as u,
  a as d,
  ct as f,
  et as p,
  fn as m,
  lt as h,
  n as g,
  nn as _,
  qt as v,
  r as y,
  st as b,
  vn as x,
} from "./attribute-changes-Dk1fP6vt.js";
import { N as S, s as C } from "./dist-BX517Nmz.js";
var w = e({ getHookByToken: () => D, resumeHook: () => O, resumeWebhook: () => k });
async function T(e) {
  let t = await x(),
    n = await t.hooks.getByToken(e);
  return { hook: n, run: await t.runs.get(n.runId) };
}
async function E(e) {
  let { hook: t, run: n } = await T(e),
    r = await (await x()).getEncryptionKeyForRun?.(n),
    a = r ? await s(r) : void 0;
  return (
    t.metadata !== void 0 && (t.metadata = await i(t.metadata, t.runId, a)),
    { hook: t, encryptionKey: a }
  );
}
async function D(e) {
  let { hook: t } = await E(e);
  return t;
}
async function O(e, t, n) {
  return await y(() =>
    p(`hook.resume`, async (i) => {
      let o = await x();
      try {
        let p, y;
        if (typeof e == `string`) {
          let t = await T(e);
          ((p = t.hook), (y = t.run));
        } else ((p = e), (y = await o.runs.get(p.runId)));
        if ((i?.setAttributes({ ...h(p.token), ...f(p.hookId), ..._(p.runId) }), S(y.status)))
          throw new r(p.token);
        let b = n;
        if (!b) {
          let e = await o.getEncryptionKeyForRun?.(y);
          b = e ? await s(e) : void 0;
        }
        let x = y.executionContext?.workflowCoreVersion,
          w = u(typeof x == `string` ? x : void 0);
        w.supportedFormats.has(m.ENCRYPTED) || (b = void 0);
        let E = (y.specVersion ?? 0) >= 5 && w.supportedFormats.has(m.GZIP),
          D = [],
          O = C(p.specVersion),
          k = await a(t, p.runId, b, D, globalThis, O, w.framedByteStreams, E);
        (g(Promise.all(D), (e) => {
          e !== void 0 &&
            l.warn(`Background flush of hook payload ops failed`, {
              workflowRunId: p.runId,
              hookId: p.hookId,
              error: e instanceof Error ? e.message : String(e),
            });
        }),
          await o.events.create(
            p.runId,
            {
              eventType: `hook_received`,
              specVersion: 5,
              correlationId: p.hookId,
              eventData: { ...(O ? {} : { token: p.token }), payload: k },
            },
            { v1Compat: O },
          ),
          i?.setAttributes({ ...v(y.workflowName) }));
        let A = await c(y.executionContext?.traceCarrier);
        return (
          A && i?.addLink?.(A),
          await o.queue(
            d(y.workflowName),
            { runId: p.runId, traceCarrier: y.executionContext?.traceCarrier ?? void 0 },
            { deploymentId: y.deploymentId, specVersion: y.specVersion ?? 1 },
          ),
          p
        );
      } catch (t) {
        throw (i?.setAttributes({ ...h(typeof e == `string` ? e : e.token), ...b(!1) }), t);
      }
    }),
  );
}
async function k(e, i) {
  let { hook: a, encryptionKey: s } = await E(e);
  if (a.isWebhook === !1) throw new r(e);
  let c, l;
  if (a.metadata && typeof a.metadata == `object` && `respondWith` in a.metadata)
    if (a.metadata.respondWith === `manual`) {
      let { readable: e, writable: t } = new TransformStream();
      ((l = e), (i[o] = t));
    } else if (a.metadata.respondWith instanceof Response) c = a.metadata.respondWith;
    else
      throw new t(`Invalid \`respondWith\` value: ${a.metadata.respondWith}`, {
        slug: n.WEBHOOK_INVALID_RESPOND_WITH_VALUE,
      });
  else c = new Response(null, { status: 202 });
  if ((await O(a, i, s), l)) {
    let e = l.getReader(),
      t = await e.read();
    (t.value && (c = t.value), e.cancel());
  }
  if (!c)
    throw new t(`Workflow run did not send a response`, { slug: n.WEBHOOK_RESPONSE_NOT_SENT });
  return c;
}
export { w as i, O as n, k as r, D as t };
