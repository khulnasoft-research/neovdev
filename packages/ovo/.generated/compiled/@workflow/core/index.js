import { i as e, u as t } from "../../_chunks/workflow/dist-B3qkUnLJ.js";
import {
  Dn as n,
  E as r,
  En as i,
  H as a,
  In as o,
  Ln as s,
  O as c,
  Rn as l,
  Sn as u,
  Tn as d,
  U as f,
  bn as p,
  t as m,
  v as h,
  vn as g,
  xn as _,
} from "../../_chunks/workflow/attribute-changes-Dk1fP6vt.js";
import "../../_chunks/workflow/dist-BX517Nmz.js";
import { n as v } from "../../_chunks/workflow/resume-hook-czpG5xnP.js";
import { t as y } from "../../_chunks/workflow/sleep-B2u06FWc.js";
function b(e) {
  s(`createHook()`, `https://workflow-sdk.dev/docs/api-reference/workflow/create-hook`, b);
}
function x(e) {
  s(`createWebhook()`, `https://workflow-sdk.dev/docs/api-reference/workflow/create-webhook`, x);
}
function S({ schema: e } = {}) {
  function t(e) {
    s(
      `defineHook().create()`,
      `https://workflow-sdk.dev/docs/api-reference/workflow/define-hook`,
      t,
    );
  }
  return {
    create: t,
    async resume(t, n) {
      if (!e?.[`~standard`]) return await v(t, n);
      let r = e[`~standard`].validate(n);
      if ((r instanceof Promise && (r = await r), r.issues)) {
        let e = r.issues.map((e) => {
          let t = e.path?.map((e) => String(typeof e == `object` && e ? e.key : e)).join(`.`);
          return t ? `  at "${t}": ${e.message}` : `  ${e.message}`;
        });
        throw Error(
          `Hook payload did not match the defined schema:\n${e.join(`
`)}`,
        );
      }
      return await v(t, r.value);
    },
  };
}
async function C(t, n = {}) {
  let r = f.getStore(),
    i = r?.workflowMetadata?.workflowRunId;
  if (!i)
    throw new e(
      `setAttributes() must be called from a 'use workflow' or 'use step' function. Calling it from plain host code is not supported.`,
    );
  let a = m(t, n);
  if (a.length !== 0) {
    if (r.runReadyBarrier)
      try {
        await r.runReadyBarrier;
      } catch {}
    await (
      await g()
    ).events.create(i, {
      eventType: `attr_set`,
      specVersion: 5,
      eventData: {
        changes: a,
        writer: { type: `step`, stepId: r.stepMetadata.stepId, attempt: r.stepMetadata.attempt },
        ...(n.allowReservedAttributes === !0 ? { allowReservedAttributes: !0 } : {}),
      },
    });
  }
}
const w = C;
function T() {
  let e = f.getStore();
  return (
    e ||
      o(
        `getStepMetadata()`,
        `https://workflow-sdk.dev/docs/api-reference/workflow/get-step-metadata`,
        T,
      ),
    e.stepMetadata
  );
}
function E() {
  let e = f.getStore();
  return (
    e ||
      l(
        `getWorkflowMetadata()`,
        `https://workflow-sdk.dev/docs/api-reference/workflow/get-workflow-metadata`,
        E,
      ),
    e.workflowMetadata
  );
}
function D(e = {}) {
  let t = f.getStore();
  t || l(`getWritable()`, `https://workflow-sdk.dev/docs/api-reference/workflow/get-writable`, D);
  let { namespace: o } = e,
    s = t.workflowMetadata.workflowRunId,
    m = a(s, o),
    g = (t.writables ??= new Map()),
    v = g.get(m);
  if (v) return v.writable;
  let y = c(r(globalThis, t.ops, s, t.encryptionKey, !0, t.runReadyBarrier), t.encryptionKey),
    b = new h(s, m, t.runReadyBarrier),
    x = p();
  return (
    t.ops.push(x.promise),
    _(y.readable, b, x).catch(() => {}),
    u(y.writable, x),
    Object.defineProperty(y.writable, d, { value: m, writable: !1 }),
    Object.defineProperty(y.writable, n, { value: s, writable: !1 }),
    t.workflowDeploymentId &&
      Object.defineProperty(y.writable, i, { value: t.workflowDeploymentId, writable: !1 }),
    g.set(m, { writable: y.writable, state: x }),
    y.writable
  );
}
export {
  e as FatalError,
  t as RetryableError,
  b as createHook,
  x as createWebhook,
  S as defineHook,
  w as experimental_setAttributes,
  T as getStepMetadata,
  E as getWorkflowMetadata,
  D as getWritable,
  C as setAttributes,
  y as sleep,
};
