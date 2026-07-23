import { i as e } from "../../_chunks/workflow/dist-CrxV2rsR.js";
import { i as t, u as n } from "../../_chunks/workflow/dist-B3qkUnLJ.js";
import {
  An as r,
  In as i,
  Ln as a,
  Tn as o,
  Vn as s,
  jn as c,
  kn as l,
  mn as u,
  pn as d,
  t as f,
  zn as p,
} from "../../_chunks/workflow/attribute-changes-Dk1fP6vt.js";
import { t as m } from "../../_chunks/workflow/sleep-B2u06FWc.js";
import { t as h } from "../../_chunks/workflow/run-6zaMjFY6.js";
u(d, h);
function g(e) {
  let t = globalThis[l];
  return (
    t || a(`createHook()`, `https://workflow-sdk.dev/docs/api-reference/workflow/create-hook`, g),
    t(e)
  );
}
function _(t) {
  let { respondWith: n, token: r, ...i } = t ?? {};
  if (r !== void 0)
    throw Error(
      "`createWebhook()` does not accept a `token` option. Webhook tokens are always randomly generated. Use `createHook()` with `resumeHook()` for deterministic token patterns.",
    );
  let a;
  n !== void 0 && (a = { respondWith: n });
  let o = g({ ...i, metadata: a, isWebhook: !0 }),
    { url: c } = s();
  return ((o.url = e(c, { type: `webhook`, token: o.token })), o);
}
function v() {
  function e(t, n) {
    p(
      `defineHook().resume()`,
      `https://workflow-sdk.dev/docs/api-reference/workflow-api/resume-hook`,
      e,
    );
  }
  return {
    create(e) {
      return g(e);
    },
    resume: e,
  };
}
async function y(e, n = {}) {
  let r = f(e, n);
  if (r.length === 0) return;
  let i = n.allowReservedAttributes === !0,
    a = globalThis[c];
  if (!a)
    throw new t(
      "setAttributes() called outside a workflow runtime context. It must be called from within a workflow body (`use workflow`).",
    );
  await a(r, i ? { allowReservedAttributes: !0 } : {});
}
const b = y;
function x(e = {}) {
  let { namespace: t } = e,
    n = globalThis[r](t);
  return Object.create(globalThis.WritableStream.prototype, { [o]: { value: n, writable: !1 } });
}
function S() {
  i(
    `getStepMetadata()`,
    `https://workflow-sdk.dev/docs/api-reference/workflow/get-step-metadata`,
    S,
  );
}
function C() {
  p(`resumeHook()`, `https://workflow-sdk.dev/docs/api-reference/workflow-api/resume-hook`, C);
}
export {
  t as FatalError,
  n as RetryableError,
  g as createHook,
  _ as createWebhook,
  v as defineHook,
  b as experimental_setAttributes,
  S as getStepMetadata,
  s as getWorkflowMetadata,
  x as getWritable,
  C as resumeHook,
  y as setAttributes,
  m as sleep,
};
