import {
  AISDKError as e,
  APICallError as t,
  EmptyResponseBodyError as n,
  InvalidArgumentError as r,
  InvalidResponseDataError as i,
  JSONParseError as a,
  LoadAPIKeyError as o,
  NoSuchProviderReferenceError as s,
  TypeValidationError as c,
  UnsupportedFunctionalityError as l,
  getErrorMessage as u,
} from "../../@ai-sdk/provider/index.js";
var d;
const f = Object.freeze({ status: `aborted` });
function p(e, t, n) {
  function r(n, r) {
    if (
      (n._zod ||
        Object.defineProperty(n, "_zod", {
          value: { def: r, constr: o, traits: new Set() },
          enumerable: !1,
        }),
      n._zod.traits.has(e))
    )
      return;
    (n._zod.traits.add(e), t(n, r));
    let i = o.prototype,
      a = Object.keys(i);
    for (let e = 0; e < a.length; e++) {
      let t = a[e];
      t in n || (n[t] = i[t].bind(n));
    }
  }
  let i = n?.Parent ?? Object;
  class a extends i {}
  Object.defineProperty(a, "name", { value: e });
  function o(e) {
    var t;
    let i = n?.Parent ? new a() : this;
    (r(i, e), (t = i._zod).deferred ?? (t.deferred = []));
    for (let e of i._zod.deferred) e();
    return i;
  }
  return (
    Object.defineProperty(o, "init", { value: r }),
    Object.defineProperty(o, Symbol.hasInstance, {
      value: (t) => (n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e)),
    }),
    Object.defineProperty(o, "name", { value: e }),
    o
  );
}
var m = class extends Error {
    constructor() {
      super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
    }
  },
  h = class extends Error {
    constructor(e) {
      (super(`Encountered unidirectional transform during encode: ${e}`),
        (this.name = `ZodEncodeError`));
    }
  };
(d = globalThis).__zod_globalConfig ?? (d.__zod_globalConfig = {});
const ee = globalThis.__zod_globalConfig;
function g(e) {
  return (e && Object.assign(ee, e), ee);
}
function te(e) {
  let t = Object.values(e).filter((e) => typeof e == `number`);
  return Object.entries(e)
    .filter(([e, n]) => t.indexOf(+e) === -1)
    .map(([e, t]) => t);
}
function ne(e, t) {
  return typeof t == `bigint` ? t.toString() : t;
}
function re(e) {
  return {
    get value() {
      {
        let t = e();
        return (Object.defineProperty(this, "value", { value: t }), t);
      }
      throw Error(`cached value already set`);
    },
  };
}
function ie(e) {
  return e == null;
}
function ae(e) {
  let t = +!!e.startsWith(`^`),
    n = e.endsWith(`$`) ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function oe(e, t) {
  let n = e / t,
    r = Math.round(n),
    i = 2 ** -52 * Math.max(Math.abs(n), 1);
  return Math.abs(n - r) < i ? 0 : n - r;
}
const se = Symbol(`evaluating`);
function _(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== se) return (r === void 0 && ((r = se), (r = n())), r);
    },
    set(n) {
      Object.defineProperty(e, t, { value: n });
    },
    configurable: !0,
  });
}
function ce(e, t, n) {
  Object.defineProperty(e, t, { value: n, writable: !0, enumerable: !0, configurable: !0 });
}
function v(...e) {
  let t = {};
  for (let n of e) Object.assign(t, Object.getOwnPropertyDescriptors(n));
  return Object.defineProperties({}, t);
}
function le(e) {
  return JSON.stringify(e);
}
function ue(e) {
  return e
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ``)
    .replace(/[\s_-]+/g, `-`)
    .replace(/^-+|-+$/g, ``);
}
const de = `captureStackTrace` in Error ? Error.captureStackTrace : (...e) => {};
function fe(e) {
  return typeof e == `object` && !!e && !Array.isArray(e);
}
const pe = re(() => {
  if (ee.jitless || (typeof navigator < `u` && navigator?.userAgent?.includes(`Cloudflare`)))
    return !1;
  try {
    return (Function(``), !0);
  } catch {
    return !1;
  }
});
function me(e) {
  if (fe(e) === !1) return !1;
  let t = e.constructor;
  if (t === void 0 || typeof t != `function`) return !0;
  let n = t.prototype;
  return !(fe(n) === !1 || Object.prototype.hasOwnProperty.call(n, `isPrototypeOf`) === !1);
}
function he(e) {
  return me(e)
    ? { ...e }
    : Array.isArray(e)
      ? [...e]
      : e instanceof Map
        ? new Map(e)
        : e instanceof Set
          ? new Set(e)
          : e;
}
const ge = new Set([`string`, `number`, `symbol`]);
function _e(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function ve(e, t, n) {
  let r = new e._zod.constr(t ?? e._zod.def);
  return ((!t || n?.parent) && (r._zod.parent = e), r);
}
function y(e) {
  let t = e;
  if (!t) return {};
  if (typeof t == `string`) return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return (delete t.message, typeof t.error == `string` ? { ...t, error: () => t.error } : t);
}
function ye(e) {
  return Object.keys(e).filter(
    (t) => e[t]._zod.optin === `optional` && e[t]._zod.optout === `optional`,
  );
}
const be = {
  safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function xe(e, t) {
  let n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw Error(`.pick() cannot be used on object schemas containing refinements`);
  return ve(
    e,
    v(e._zod.def, {
      get shape() {
        let e = {};
        for (let r in t) {
          if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
          t[r] && (e[r] = n.shape[r]);
        }
        return (ce(this, `shape`, e), e);
      },
      checks: [],
    }),
  );
}
function Se(e, t) {
  let n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw Error(`.omit() cannot be used on object schemas containing refinements`);
  return ve(
    e,
    v(e._zod.def, {
      get shape() {
        let r = { ...e._zod.def.shape };
        for (let e in t) {
          if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
          t[e] && delete r[e];
        }
        return (ce(this, `shape`, r), r);
      },
      checks: [],
    }),
  );
}
function Ce(e, t) {
  if (!me(t)) throw Error(`Invalid input to extend: expected a plain object`);
  let n = e._zod.def.checks;
  if (n && n.length > 0) {
    let n = e._zod.def.shape;
    for (let e in t)
      if (Object.getOwnPropertyDescriptor(n, e) !== void 0)
        throw Error(
          "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
        );
  }
  return ve(
    e,
    v(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t };
        return (ce(this, `shape`, n), n);
      },
    }),
  );
}
function we(e, t) {
  if (!me(t)) throw Error(`Invalid input to safeExtend: expected a plain object`);
  return ve(
    e,
    v(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t };
        return (ce(this, `shape`, n), n);
      },
    }),
  );
}
function Te(e, t) {
  if (e._zod.def.checks?.length)
    throw Error(
      `.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`,
    );
  return ve(
    e,
    v(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t._zod.def.shape };
        return (ce(this, `shape`, n), n);
      },
      get catchall() {
        return t._zod.def.catchall;
      },
      checks: t._zod.def.checks ?? [],
    }),
  );
}
function Ee(e, t, n) {
  let r = t._zod.def.checks;
  if (r && r.length > 0)
    throw Error(`.partial() cannot be used on object schemas containing refinements`);
  return ve(
    t,
    v(t._zod.def, {
      get shape() {
        let r = t._zod.def.shape,
          i = { ...r };
        if (n)
          for (let t in n) {
            if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
            n[t] && (i[t] = e ? new e({ type: `optional`, innerType: r[t] }) : r[t]);
          }
        else for (let t in r) i[t] = e ? new e({ type: `optional`, innerType: r[t] }) : r[t];
        return (ce(this, `shape`, i), i);
      },
      checks: [],
    }),
  );
}
function De(e, t, n) {
  return ve(
    t,
    v(t._zod.def, {
      get shape() {
        let r = t._zod.def.shape,
          i = { ...r };
        if (n)
          for (let t in n) {
            if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
            n[t] && (i[t] = new e({ type: `nonoptional`, innerType: r[t] }));
          }
        else for (let t in r) i[t] = new e({ type: `nonoptional`, innerType: r[t] });
        return (ce(this, `shape`, i), i);
      },
    }),
  );
}
function Oe(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
  return !1;
}
function ke(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
  return !1;
}
function b(e, t) {
  return t.map((t) => {
    var n;
    return ((n = t).path ?? (n.path = []), t.path.unshift(e), t);
  });
}
function Ae(e) {
  return typeof e == `string` ? e : e?.message;
}
function x(e, t, n) {
  let r = e.message
      ? e.message
      : (Ae(e.inst?._zod.def?.error?.(e)) ??
        Ae(t?.error?.(e)) ??
        Ae(n.customError?.(e)) ??
        Ae(n.localeError?.(e)) ??
        `Invalid input`),
    { inst: i, continue: a, input: o, ...s } = e;
  return ((s.path ??= []), (s.message = r), t?.reportInput && (s.input = o), s);
}
function je(e) {
  return Array.isArray(e) ? `array` : typeof e == `string` ? `string` : `unknown`;
}
function Me(...e) {
  let [t, n, r] = e;
  return typeof t == `string` ? { message: t, code: `custom`, input: n, inst: r } : { ...t };
}
const Ne = (e, t) => {
    ((e.name = `$ZodError`),
      Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
      (e.message = JSON.stringify(t, ne, 2)),
      Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
  },
  Pe = p(`$ZodError`, Ne),
  Fe = p(`$ZodError`, Ne, { Parent: Error });
function Ie(e, t = (e) => e.message) {
  let n = {},
    r = [];
  for (let i of e.issues)
    i.path.length > 0
      ? ((n[i.path[0]] = n[i.path[0]] || []), n[i.path[0]].push(t(i)))
      : r.push(t(i));
  return { formErrors: r, fieldErrors: n };
}
function Le(e, t = (e) => e.message) {
  let n = { _errors: [] },
    r = (e, i = []) => {
      for (let a of e.issues)
        if (a.code === `invalid_union` && a.errors.length)
          a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
        else if (a.code === `invalid_key`) r({ issues: a.issues }, [...i, ...a.path]);
        else if (a.code === `invalid_element`) r({ issues: a.issues }, [...i, ...a.path]);
        else {
          let e = [...i, ...a.path];
          if (e.length === 0) n._errors.push(t(a));
          else {
            let r = n,
              i = 0;
            for (; i < e.length;) {
              let n = e[i];
              (i === e.length - 1
                ? ((r[n] = r[n] || { _errors: [] }), r[n]._errors.push(t(a)))
                : (r[n] = r[n] || { _errors: [] }),
                (r = r[n]),
                i++);
            }
          }
        }
    };
  return (r(e), n);
}
const Re = (e) => (t, n, r, i) => {
    let a = r ? { ...r, async: !1 } : { async: !1 },
      o = t._zod.run({ value: n, issues: [] }, a);
    if (o instanceof Promise) throw new m();
    if (o.issues.length) {
      let t = new (i?.Err ?? e)(o.issues.map((e) => x(e, a, g())));
      throw (de(t, i?.callee), t);
    }
    return o.value;
  },
  ze = (e) => async (t, n, r, i) => {
    let a = r ? { ...r, async: !0 } : { async: !0 },
      o = t._zod.run({ value: n, issues: [] }, a);
    if ((o instanceof Promise && (o = await o), o.issues.length)) {
      let t = new (i?.Err ?? e)(o.issues.map((e) => x(e, a, g())));
      throw (de(t, i?.callee), t);
    }
    return o.value;
  },
  Be = (e) => (t, n, r) => {
    let i = r ? { ...r, async: !1 } : { async: !1 },
      a = t._zod.run({ value: n, issues: [] }, i);
    if (a instanceof Promise) throw new m();
    return a.issues.length
      ? { success: !1, error: new (e ?? Pe)(a.issues.map((e) => x(e, i, g()))) }
      : { success: !0, data: a.value };
  },
  Ve = Be(Fe),
  He = (e) => async (t, n, r) => {
    let i = r ? { ...r, async: !0 } : { async: !0 },
      a = t._zod.run({ value: n, issues: [] }, i);
    return (
      a instanceof Promise && (a = await a),
      a.issues.length
        ? { success: !1, error: new e(a.issues.map((e) => x(e, i, g()))) }
        : { success: !0, data: a.value }
    );
  },
  Ue = He(Fe),
  We = (e) => (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return Re(e)(t, n, i);
  },
  Ge = (e) => (t, n, r) => Re(e)(t, n, r),
  Ke = (e) => async (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return ze(e)(t, n, i);
  },
  qe = (e) => async (t, n, r) => ze(e)(t, n, r),
  Je = (e) => (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return Be(e)(t, n, i);
  },
  Ye = (e) => (t, n, r) => Be(e)(t, n, r),
  Xe = (e) => async (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return He(e)(t, n, i);
  },
  Ze = (e) => async (t, n, r) => He(e)(t, n, r),
  Qe = /^[cC][0-9a-z]{6,}$/,
  $e = /^[0-9a-z]+$/,
  et = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  tt = /^[0-9a-vA-V]{20}$/,
  nt = /^[A-Za-z0-9]{27}$/,
  rt = /^[a-zA-Z0-9_-]{21}$/,
  it =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  at = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  ot = (e) =>
    e
      ? RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  st =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
function ct() {
  return RegExp(`^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`, `u`);
}
const lt =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ut =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  dt =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  ft =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  pt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  mt = /^[A-Za-z0-9_-]*$/,
  ht = /^https?$/,
  gt = /^\+[1-9]\d{6,14}$/,
  _t = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`,
  vt = RegExp(`^${_t}$`);
function yt(e) {
  let t = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  return typeof e.precision == `number`
    ? e.precision === -1
      ? `${t}`
      : e.precision === 0
        ? `${t}:[0-5]\\d`
        : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function bt(e) {
  return RegExp(`^${yt(e)}$`);
}
function xt(e) {
  let t = yt({ precision: e.precision }),
    n = [`Z`];
  (e.local && n.push(``), e.offset && n.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`));
  let r = `${t}(?:${n.join(`|`)})`;
  return RegExp(`^${_t}T(?:${r})$`);
}
const St = (e) => {
    let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ``}}` : `[\\s\\S]*`;
    return RegExp(`^${t}$`);
  },
  Ct = /^-?\d+$/,
  wt = /^-?\d+(?:\.\d+)?$/,
  Tt = /^(?:true|false)$/i,
  Et = /^null$/i,
  Dt = /^[^A-Z]*$/,
  Ot = /^[^a-z]*$/,
  S = p(`$ZodCheck`, (e, t) => {
    var n;
    ((e._zod ??= {}), (e._zod.def = t), (n = e._zod).onattach ?? (n.onattach = []));
  }),
  kt = { number: `number`, bigint: `bigint`, object: `date` },
  At = p(`$ZodCheckLessThan`, (e, t) => {
    S.init(e, t);
    let n = kt[typeof t.value];
    (e._zod.onattach.push((e) => {
      let n = e._zod.bag,
        r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? 1 / 0;
      t.value < r && (t.inclusive ? (n.maximum = t.value) : (n.exclusiveMaximum = t.value));
    }),
      (e._zod.check = (r) => {
        (t.inclusive ? r.value <= t.value : r.value < t.value) ||
          r.issues.push({
            origin: n,
            code: `too_big`,
            maximum: typeof t.value == `object` ? t.value.getTime() : t.value,
            input: r.value,
            inclusive: t.inclusive,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  jt = p(`$ZodCheckGreaterThan`, (e, t) => {
    S.init(e, t);
    let n = kt[typeof t.value];
    (e._zod.onattach.push((e) => {
      let n = e._zod.bag,
        r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -1 / 0;
      t.value > r && (t.inclusive ? (n.minimum = t.value) : (n.exclusiveMinimum = t.value));
    }),
      (e._zod.check = (r) => {
        (t.inclusive ? r.value >= t.value : r.value > t.value) ||
          r.issues.push({
            origin: n,
            code: `too_small`,
            minimum: typeof t.value == `object` ? t.value.getTime() : t.value,
            input: r.value,
            inclusive: t.inclusive,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Mt = p(`$ZodCheckMultipleOf`, (e, t) => {
    (S.init(e, t),
      e._zod.onattach.push((e) => {
        var n;
        (n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
      }),
      (e._zod.check = (n) => {
        if (typeof n.value != typeof t.value)
          throw Error(`Cannot mix number and bigint in multiple_of check.`);
        (typeof n.value == `bigint`
          ? n.value % t.value === BigInt(0)
          : oe(n.value, t.value) === 0) ||
          n.issues.push({
            origin: typeof n.value,
            code: `not_multiple_of`,
            divisor: t.value,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Nt = p(`$ZodCheckNumberFormat`, (e, t) => {
    (S.init(e, t), (t.format = t.format || `float64`));
    let n = t.format?.includes(`int`),
      r = n ? `int` : `number`,
      [i, a] = be[t.format];
    (e._zod.onattach.push((e) => {
      let r = e._zod.bag;
      ((r.format = t.format), (r.minimum = i), (r.maximum = a), n && (r.pattern = Ct));
    }),
      (e._zod.check = (o) => {
        let s = o.value;
        if (n) {
          if (!Number.isInteger(s)) {
            o.issues.push({
              expected: r,
              format: t.format,
              code: `invalid_type`,
              continue: !1,
              input: s,
              inst: e,
            });
            return;
          }
          if (!Number.isSafeInteger(s)) {
            s > 0
              ? o.issues.push({
                  input: s,
                  code: `too_big`,
                  maximum: 2 ** 53 - 1,
                  note: `Integers must be within the safe integer range.`,
                  inst: e,
                  origin: r,
                  inclusive: !0,
                  continue: !t.abort,
                })
              : o.issues.push({
                  input: s,
                  code: `too_small`,
                  minimum: -(2 ** 53 - 1),
                  note: `Integers must be within the safe integer range.`,
                  inst: e,
                  origin: r,
                  inclusive: !0,
                  continue: !t.abort,
                });
            return;
          }
        }
        (s < i &&
          o.issues.push({
            origin: `number`,
            input: s,
            code: `too_small`,
            minimum: i,
            inclusive: !0,
            inst: e,
            continue: !t.abort,
          }),
          s > a &&
            o.issues.push({
              origin: `number`,
              input: s,
              code: `too_big`,
              maximum: a,
              inclusive: !0,
              inst: e,
              continue: !t.abort,
            }));
      }));
  }),
  Pt = p(`$ZodCheckMaxLength`, (e, t) => {
    var n;
    (S.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !ie(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag.maximum ?? 1 / 0;
        t.maximum < n && (e._zod.bag.maximum = t.maximum);
      }),
      (e._zod.check = (n) => {
        let r = n.value;
        if (r.length <= t.maximum) return;
        let i = je(r);
        n.issues.push({
          origin: i,
          code: `too_big`,
          maximum: t.maximum,
          inclusive: !0,
          input: r,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  Ft = p(`$ZodCheckMinLength`, (e, t) => {
    var n;
    (S.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !ie(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag.minimum ?? -1 / 0;
        t.minimum > n && (e._zod.bag.minimum = t.minimum);
      }),
      (e._zod.check = (n) => {
        let r = n.value;
        if (r.length >= t.minimum) return;
        let i = je(r);
        n.issues.push({
          origin: i,
          code: `too_small`,
          minimum: t.minimum,
          inclusive: !0,
          input: r,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  It = p(`$ZodCheckLengthEquals`, (e, t) => {
    var n;
    (S.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !ie(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag;
        ((n.minimum = t.length), (n.maximum = t.length), (n.length = t.length));
      }),
      (e._zod.check = (n) => {
        let r = n.value,
          i = r.length;
        if (i === t.length) return;
        let a = je(r),
          o = i > t.length;
        n.issues.push({
          origin: a,
          ...(o
            ? { code: `too_big`, maximum: t.length }
            : { code: `too_small`, minimum: t.length }),
          inclusive: !0,
          exact: !0,
          input: n.value,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  Lt = p(`$ZodCheckStringFormat`, (e, t) => {
    var n, r;
    (S.init(e, t),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag;
        ((n.format = t.format),
          t.pattern && ((n.patterns ??= new Set()), n.patterns.add(t.pattern)));
      }),
      t.pattern
        ? ((n = e._zod).check ??
          (n.check = (n) => {
            ((t.pattern.lastIndex = 0),
              !t.pattern.test(n.value) &&
                n.issues.push({
                  origin: `string`,
                  code: `invalid_format`,
                  format: t.format,
                  input: n.value,
                  ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
                  inst: e,
                  continue: !t.abort,
                }));
          }))
        : ((r = e._zod).check ?? (r.check = () => {})));
  }),
  Rt = p(`$ZodCheckRegex`, (e, t) => {
    (Lt.init(e, t),
      (e._zod.check = (n) => {
        ((t.pattern.lastIndex = 0),
          !t.pattern.test(n.value) &&
            n.issues.push({
              origin: `string`,
              code: `invalid_format`,
              format: `regex`,
              input: n.value,
              pattern: t.pattern.toString(),
              inst: e,
              continue: !t.abort,
            }));
      }));
  }),
  zt = p(`$ZodCheckLowerCase`, (e, t) => {
    ((t.pattern ??= Dt), Lt.init(e, t));
  }),
  Bt = p(`$ZodCheckUpperCase`, (e, t) => {
    ((t.pattern ??= Ot), Lt.init(e, t));
  }),
  Vt = p(`$ZodCheckIncludes`, (e, t) => {
    S.init(e, t);
    let n = _e(t.includes),
      r = new RegExp(typeof t.position == `number` ? `^.{${t.position}}${n}` : n);
    ((t.pattern = r),
      e._zod.onattach.push((e) => {
        let t = e._zod.bag;
        ((t.patterns ??= new Set()), t.patterns.add(r));
      }),
      (e._zod.check = (n) => {
        n.value.includes(t.includes, t.position) ||
          n.issues.push({
            origin: `string`,
            code: `invalid_format`,
            format: `includes`,
            includes: t.includes,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Ht = p(`$ZodCheckStartsWith`, (e, t) => {
    S.init(e, t);
    let n = RegExp(`^${_e(t.prefix)}.*`);
    ((t.pattern ??= n),
      e._zod.onattach.push((e) => {
        let t = e._zod.bag;
        ((t.patterns ??= new Set()), t.patterns.add(n));
      }),
      (e._zod.check = (n) => {
        n.value.startsWith(t.prefix) ||
          n.issues.push({
            origin: `string`,
            code: `invalid_format`,
            format: `starts_with`,
            prefix: t.prefix,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Ut = p(`$ZodCheckEndsWith`, (e, t) => {
    S.init(e, t);
    let n = RegExp(`.*${_e(t.suffix)}$`);
    ((t.pattern ??= n),
      e._zod.onattach.push((e) => {
        let t = e._zod.bag;
        ((t.patterns ??= new Set()), t.patterns.add(n));
      }),
      (e._zod.check = (n) => {
        n.value.endsWith(t.suffix) ||
          n.issues.push({
            origin: `string`,
            code: `invalid_format`,
            format: `ends_with`,
            suffix: t.suffix,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Wt = p(`$ZodCheckOverwrite`, (e, t) => {
    (S.init(e, t),
      (e._zod.check = (e) => {
        e.value = t.tx(e.value);
      }));
  });
var Gt = class {
  constructor(e = []) {
    ((this.content = []), (this.indent = 0), this && (this.args = e));
  }
  indented(e) {
    ((this.indent += 1), e(this), --this.indent);
  }
  write(e) {
    if (typeof e == `function`) {
      (e(this, { execution: `sync` }), e(this, { execution: `async` }));
      return;
    }
    let t = e
        .split(`
`)
        .filter((e) => e),
      n = Math.min(...t.map((e) => e.length - e.trimStart().length)),
      r = t.map((e) => e.slice(n)).map((e) => ` `.repeat(this.indent * 2) + e);
    for (let e of r) this.content.push(e);
  }
  compile() {
    let e = Function,
      t = this?.args,
      n = [...(this?.content ?? [``]).map((e) => `  ${e}`)];
    return new e(
      ...t,
      n.join(`
`),
    );
  }
};
const Kt = { major: 4, minor: 4, patch: 3 },
  C = p(`$ZodType`, (e, t) => {
    var n;
    ((e ??= {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = Kt));
    let r = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has(`$ZodCheck`) && r.unshift(e);
    for (let t of r) for (let n of t._zod.onattach) n(e);
    if (r.length === 0)
      ((n = e._zod).deferred ?? (n.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse;
        }));
    else {
      let t = (e, t, n) => {
          let r = Oe(e),
            i;
          for (let a of t) {
            if (a._zod.def.when) {
              if (ke(e) || !a._zod.def.when(e)) continue;
            } else if (r) continue;
            let t = e.issues.length,
              o = a._zod.check(e);
            if (o instanceof Promise && n?.async === !1) throw new m();
            if (i || o instanceof Promise)
              i = (i ?? Promise.resolve()).then(async () => {
                (await o, e.issues.length !== t && (r ||= Oe(e, t)));
              });
            else {
              if (e.issues.length === t) continue;
              r ||= Oe(e, t);
            }
          }
          return i ? i.then(() => e) : e;
        },
        n = (n, i, a) => {
          if (Oe(n)) return ((n.aborted = !0), n);
          let o = t(i, r, a);
          if (o instanceof Promise) {
            if (a.async === !1) throw new m();
            return o.then((t) => e._zod.parse(t, a));
          }
          return e._zod.parse(o, a);
        };
      e._zod.run = (i, a) => {
        if (a.skipChecks) return e._zod.parse(i, a);
        if (a.direction === `backward`) {
          let t = e._zod.parse({ value: i.value, issues: [] }, { ...a, skipChecks: !0 });
          return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
        }
        let o = e._zod.parse(i, a);
        if (o instanceof Promise) {
          if (a.async === !1) throw new m();
          return o.then((e) => t(e, r, a));
        }
        return t(o, r, a);
      };
    }
    _(e, `~standard`, () => ({
      validate: (t) => {
        try {
          let n = Ve(e, t);
          return n.success ? { value: n.data } : { issues: n.error?.issues };
        } catch {
          return Ue(e, t).then((e) =>
            e.success ? { value: e.data } : { issues: e.error?.issues },
          );
        }
      },
      vendor: `zod`,
      version: 1,
    }));
  }),
  qt = p(`$ZodString`, (e, t) => {
    (C.init(e, t),
      (e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? St(e._zod.bag)),
      (e._zod.parse = (n, r) => {
        if (t.coerce)
          try {
            n.value = String(n.value);
          } catch {}
        return (
          typeof n.value == `string` ||
            n.issues.push({ expected: `string`, code: `invalid_type`, input: n.value, inst: e }),
          n
        );
      }));
  }),
  w = p(`$ZodStringFormat`, (e, t) => {
    (Lt.init(e, t), qt.init(e, t));
  }),
  Jt = p(`$ZodGUID`, (e, t) => {
    ((t.pattern ??= at), w.init(e, t));
  }),
  Yt = p(`$ZodUUID`, (e, t) => {
    if (t.version) {
      let e = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
      if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
      t.pattern ??= ot(e);
    } else t.pattern ??= ot();
    w.init(e, t);
  }),
  Xt = p(`$ZodEmail`, (e, t) => {
    ((t.pattern ??= st), w.init(e, t));
  }),
  Zt = p(`$ZodURL`, (e, t) => {
    (w.init(e, t),
      (e._zod.check = (n) => {
        try {
          let r = n.value.trim();
          if (!t.normalize && t.protocol?.source === ht.source && !/^https?:\/\//i.test(r)) {
            n.issues.push({
              code: `invalid_format`,
              format: `url`,
              note: `Invalid URL format`,
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
            return;
          }
          let i = new URL(r);
          (t.hostname &&
            ((t.hostname.lastIndex = 0),
            t.hostname.test(i.hostname) ||
              n.issues.push({
                code: `invalid_format`,
                format: `url`,
                note: `Invalid hostname`,
                pattern: t.hostname.source,
                input: n.value,
                inst: e,
                continue: !t.abort,
              })),
            t.protocol &&
              ((t.protocol.lastIndex = 0),
              t.protocol.test(i.protocol.endsWith(`:`) ? i.protocol.slice(0, -1) : i.protocol) ||
                n.issues.push({
                  code: `invalid_format`,
                  format: `url`,
                  note: `Invalid protocol`,
                  pattern: t.protocol.source,
                  input: n.value,
                  inst: e,
                  continue: !t.abort,
                })),
            t.normalize ? (n.value = i.href) : (n.value = r));
          return;
        } catch {
          n.issues.push({
            code: `invalid_format`,
            format: `url`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  Qt = p(`$ZodEmoji`, (e, t) => {
    ((t.pattern ??= ct()), w.init(e, t));
  }),
  $t = p(`$ZodNanoID`, (e, t) => {
    ((t.pattern ??= rt), w.init(e, t));
  }),
  en = p(`$ZodCUID`, (e, t) => {
    ((t.pattern ??= Qe), w.init(e, t));
  }),
  tn = p(`$ZodCUID2`, (e, t) => {
    ((t.pattern ??= $e), w.init(e, t));
  }),
  nn = p(`$ZodULID`, (e, t) => {
    ((t.pattern ??= et), w.init(e, t));
  }),
  rn = p(`$ZodXID`, (e, t) => {
    ((t.pattern ??= tt), w.init(e, t));
  }),
  an = p(`$ZodKSUID`, (e, t) => {
    ((t.pattern ??= nt), w.init(e, t));
  }),
  on = p(`$ZodISODateTime`, (e, t) => {
    ((t.pattern ??= xt(t)), w.init(e, t));
  }),
  sn = p(`$ZodISODate`, (e, t) => {
    ((t.pattern ??= vt), w.init(e, t));
  }),
  cn = p(`$ZodISOTime`, (e, t) => {
    ((t.pattern ??= bt(t)), w.init(e, t));
  }),
  ln = p(`$ZodISODuration`, (e, t) => {
    ((t.pattern ??= it), w.init(e, t));
  }),
  un = p(`$ZodIPv4`, (e, t) => {
    ((t.pattern ??= lt), w.init(e, t), (e._zod.bag.format = `ipv4`));
  }),
  dn = p(`$ZodIPv6`, (e, t) => {
    ((t.pattern ??= ut),
      w.init(e, t),
      (e._zod.bag.format = `ipv6`),
      (e._zod.check = (n) => {
        try {
          new URL(`http://[${n.value}]`);
        } catch {
          n.issues.push({
            code: `invalid_format`,
            format: `ipv6`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  fn = p(`$ZodCIDRv4`, (e, t) => {
    ((t.pattern ??= dt), w.init(e, t));
  }),
  pn = p(`$ZodCIDRv6`, (e, t) => {
    ((t.pattern ??= ft),
      w.init(e, t),
      (e._zod.check = (n) => {
        let r = n.value.split(`/`);
        try {
          if (r.length !== 2) throw Error();
          let [e, t] = r;
          if (!t) throw Error();
          let n = Number(t);
          if (`${n}` !== t || n < 0 || n > 128) throw Error();
          new URL(`http://[${e}]`);
        } catch {
          n.issues.push({
            code: `invalid_format`,
            format: `cidrv6`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  });
function mn(e) {
  if (e === ``) return !0;
  if (/\s/.test(e) || e.length % 4 != 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}
const hn = p(`$ZodBase64`, (e, t) => {
  ((t.pattern ??= pt),
    w.init(e, t),
    (e._zod.bag.contentEncoding = `base64`),
    (e._zod.check = (n) => {
      mn(n.value) ||
        n.issues.push({
          code: `invalid_format`,
          format: `base64`,
          input: n.value,
          inst: e,
          continue: !t.abort,
        });
    }));
});
function gn(e) {
  if (!mt.test(e)) return !1;
  let t = e.replace(/[-_]/g, (e) => (e === `-` ? `+` : `/`));
  return mn(t.padEnd(Math.ceil(t.length / 4) * 4, `=`));
}
const _n = p(`$ZodBase64URL`, (e, t) => {
    ((t.pattern ??= mt),
      w.init(e, t),
      (e._zod.bag.contentEncoding = `base64url`),
      (e._zod.check = (n) => {
        gn(n.value) ||
          n.issues.push({
            code: `invalid_format`,
            format: `base64url`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  vn = p(`$ZodE164`, (e, t) => {
    ((t.pattern ??= gt), w.init(e, t));
  });
function yn(e, t = null) {
  try {
    let n = e.split(`.`);
    if (n.length !== 3) return !1;
    let [r] = n;
    if (!r) return !1;
    let i = JSON.parse(atob(r));
    return !((`typ` in i && i?.typ !== `JWT`) || !i.alg || (t && (!(`alg` in i) || i.alg !== t)));
  } catch {
    return !1;
  }
}
const bn = p(`$ZodJWT`, (e, t) => {
    (w.init(e, t),
      (e._zod.check = (n) => {
        yn(n.value, t.alg) ||
          n.issues.push({
            code: `invalid_format`,
            format: `jwt`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  xn = p(`$ZodNumber`, (e, t) => {
    (C.init(e, t),
      (e._zod.pattern = e._zod.bag.pattern ?? wt),
      (e._zod.parse = (n, r) => {
        if (t.coerce)
          try {
            n.value = Number(n.value);
          } catch {}
        let i = n.value;
        if (typeof i == `number` && !Number.isNaN(i) && Number.isFinite(i)) return n;
        let a =
          typeof i == `number`
            ? Number.isNaN(i)
              ? `NaN`
              : Number.isFinite(i)
                ? void 0
                : `Infinity`
            : void 0;
        return (
          n.issues.push({
            expected: `number`,
            code: `invalid_type`,
            input: i,
            inst: e,
            ...(a ? { received: a } : {}),
          }),
          n
        );
      }));
  }),
  Sn = p(`$ZodNumberFormat`, (e, t) => {
    (Nt.init(e, t), xn.init(e, t));
  }),
  Cn = p(`$ZodBoolean`, (e, t) => {
    (C.init(e, t),
      (e._zod.pattern = Tt),
      (e._zod.parse = (n, r) => {
        if (t.coerce)
          try {
            n.value = !!n.value;
          } catch {}
        let i = n.value;
        return (
          typeof i == `boolean` ||
            n.issues.push({ expected: `boolean`, code: `invalid_type`, input: i, inst: e }),
          n
        );
      }));
  }),
  wn = p(`$ZodNull`, (e, t) => {
    (C.init(e, t),
      (e._zod.pattern = Et),
      (e._zod.values = new Set([null])),
      (e._zod.parse = (t, n) => {
        let r = t.value;
        return (
          r === null ||
            t.issues.push({ expected: `null`, code: `invalid_type`, input: r, inst: e }),
          t
        );
      }));
  }),
  Tn = p(`$ZodAny`, (e, t) => {
    (C.init(e, t), (e._zod.parse = (e) => e));
  }),
  En = p(`$ZodUnknown`, (e, t) => {
    (C.init(e, t), (e._zod.parse = (e) => e));
  }),
  Dn = p(`$ZodNever`, (e, t) => {
    (C.init(e, t),
      (e._zod.parse = (t, n) => (
        t.issues.push({ expected: `never`, code: `invalid_type`, input: t.value, inst: e }),
        t
      )));
  });
function On(e, t, n) {
  (e.issues.length && t.issues.push(...b(n, e.issues)), (t.value[n] = e.value));
}
const kn = p(`$ZodArray`, (e, t) => {
  (C.init(e, t),
    (e._zod.parse = (n, r) => {
      let i = n.value;
      if (!Array.isArray(i))
        return (n.issues.push({ expected: `array`, code: `invalid_type`, input: i, inst: e }), n);
      n.value = Array(i.length);
      let a = [];
      for (let e = 0; e < i.length; e++) {
        let o = i[e],
          s = t.element._zod.run({ value: o, issues: [] }, r);
        s instanceof Promise ? a.push(s.then((t) => On(t, n, e))) : On(s, n, e);
      }
      return a.length ? Promise.all(a).then(() => n) : n;
    }));
});
function An(e, t, n, r, i, a) {
  let o = n in r;
  if (e.issues.length) {
    if (i && a && !o) return;
    t.issues.push(...b(n, e.issues));
  }
  if (!o && !i) {
    e.issues.length ||
      t.issues.push({ code: `invalid_type`, expected: `nonoptional`, input: void 0, path: [n] });
    return;
  }
  e.value === void 0 ? o && (t.value[n] = void 0) : (t.value[n] = e.value);
}
function jn(e) {
  let t = Object.keys(e.shape);
  for (let n of t)
    if (!e.shape?.[n]?._zod?.traits?.has(`$ZodType`))
      throw Error(`Invalid element at key "${n}": expected a Zod schema`);
  let n = ye(e.shape);
  return { ...e, keys: t, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(n) };
}
function Mn(e, t, n, r, i, a) {
  let o = [],
    s = i.keySet,
    c = i.catchall._zod,
    l = c.def.type,
    u = c.optin === `optional`,
    d = c.optout === `optional`;
  for (let i in t) {
    if (i === `__proto__` || s.has(i)) continue;
    if (l === `never`) {
      o.push(i);
      continue;
    }
    let a = c.run({ value: t[i], issues: [] }, r);
    a instanceof Promise ? e.push(a.then((e) => An(e, n, i, t, u, d))) : An(a, n, i, t, u, d);
  }
  return (
    o.length && n.issues.push({ code: `unrecognized_keys`, keys: o, input: t, inst: a }),
    e.length ? Promise.all(e).then(() => n) : n
  );
}
const Nn = p(`$ZodObject`, (e, t) => {
    if ((C.init(e, t), !Object.getOwnPropertyDescriptor(t, `shape`)?.get)) {
      let e = t.shape;
      Object.defineProperty(t, "shape", {
        get: () => {
          let n = { ...e };
          return (Object.defineProperty(t, "shape", { value: n }), n);
        },
      });
    }
    let n = re(() => jn(t));
    _(e._zod, `propValues`, () => {
      let e = t.shape,
        n = {};
      for (let t in e) {
        let r = e[t]._zod;
        if (r.values) {
          n[t] ?? (n[t] = new Set());
          for (let e of r.values) n[t].add(e);
        }
      }
      return n;
    });
    let r = fe,
      i = t.catchall,
      a;
    e._zod.parse = (t, o) => {
      a ??= n.value;
      let s = t.value;
      if (!r(s))
        return (t.issues.push({ expected: `object`, code: `invalid_type`, input: s, inst: e }), t);
      t.value = {};
      let c = [],
        l = a.shape;
      for (let e of a.keys) {
        let n = l[e],
          r = n._zod.optin === `optional`,
          i = n._zod.optout === `optional`,
          a = n._zod.run({ value: s[e], issues: [] }, o);
        a instanceof Promise ? c.push(a.then((n) => An(n, t, e, s, r, i))) : An(a, t, e, s, r, i);
      }
      return i ? Mn(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
    };
  }),
  Pn = p(`$ZodObjectJIT`, (e, t) => {
    Nn.init(e, t);
    let n = e._zod.parse,
      r = re(() => jn(t)),
      i = (e) => {
        let t = new Gt([`shape`, `payload`, `ctx`]),
          n = r.value,
          i = (e) => {
            let t = le(e);
            return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
          };
        t.write(`const input = payload.value;`);
        let a = Object.create(null),
          o = 0;
        for (let e of n.keys) a[e] = `key_${o++}`;
        t.write(`const newResult = {};`);
        for (let r of n.keys) {
          let n = a[r],
            o = le(r),
            s = e[r],
            c = s?._zod?.optin === `optional`,
            l = s?._zod?.optout === `optional`;
          (t.write(`const ${n} = ${i(r)};`),
            c && l
              ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `)
              : c
                ? t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `)
                : t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `));
        }
        (t.write(`payload.value = newResult;`), t.write(`return payload;`));
        let s = t.compile();
        return (t, n) => s(e, t, n);
      },
      a,
      o = fe,
      s = !ee.jitless,
      c = s && pe.value,
      l = t.catchall,
      u;
    e._zod.parse = (d, f) => {
      u ??= r.value;
      let p = d.value;
      return o(p)
        ? s && c && f?.async === !1 && f.jitless !== !0
          ? ((a ||= i(t.shape)), (d = a(d, f)), l ? Mn([], p, d, f, u, e) : d)
          : n(d, f)
        : (d.issues.push({ expected: `object`, code: `invalid_type`, input: p, inst: e }), d);
    };
  });
function Fn(e, t, n, r) {
  for (let n of e) if (n.issues.length === 0) return ((t.value = n.value), t);
  let i = e.filter((e) => !Oe(e));
  return i.length === 1
    ? ((t.value = i[0].value), i[0])
    : (t.issues.push({
        code: `invalid_union`,
        input: t.value,
        inst: n,
        errors: e.map((e) => e.issues.map((e) => x(e, r, g()))),
      }),
      t);
}
const In = p(`$ZodUnion`, (e, t) => {
    (C.init(e, t),
      _(e._zod, `optin`, () =>
        t.options.some((e) => e._zod.optin === `optional`) ? `optional` : void 0,
      ),
      _(e._zod, `optout`, () =>
        t.options.some((e) => e._zod.optout === `optional`) ? `optional` : void 0,
      ),
      _(e._zod, `values`, () => {
        if (t.options.every((e) => e._zod.values))
          return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
      }),
      _(e._zod, `pattern`, () => {
        if (t.options.every((e) => e._zod.pattern)) {
          let e = t.options.map((e) => e._zod.pattern);
          return RegExp(`^(${e.map((e) => ae(e.source)).join(`|`)})$`);
        }
      }));
    let n = t.options.length === 1 ? t.options[0]._zod.run : null;
    e._zod.parse = (r, i) => {
      if (n) return n(r, i);
      let a = !1,
        o = [];
      for (let e of t.options) {
        let t = e._zod.run({ value: r.value, issues: [] }, i);
        if (t instanceof Promise) (o.push(t), (a = !0));
        else {
          if (t.issues.length === 0) return t;
          o.push(t);
        }
      }
      return a ? Promise.all(o).then((t) => Fn(t, r, e, i)) : Fn(o, r, e, i);
    };
  }),
  Ln = p(`$ZodDiscriminatedUnion`, (e, t) => {
    ((t.inclusive = !1), In.init(e, t));
    let n = e._zod.parse;
    _(e._zod, `propValues`, () => {
      let e = {};
      for (let n of t.options) {
        let r = n._zod.propValues;
        if (!r || Object.keys(r).length === 0)
          throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
        for (let [t, n] of Object.entries(r)) {
          e[t] || (e[t] = new Set());
          for (let r of n) e[t].add(r);
        }
      }
      return e;
    });
    let r = re(() => {
      let e = t.options,
        n = new Map();
      for (let r of e) {
        let e = r._zod.propValues?.[t.discriminator];
        if (!e || e.size === 0)
          throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
        for (let t of e) {
          if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
          n.set(t, r);
        }
      }
      return n;
    });
    e._zod.parse = (i, a) => {
      let o = i.value;
      if (!fe(o))
        return (i.issues.push({ code: `invalid_type`, expected: `object`, input: o, inst: e }), i);
      let s = r.value.get(o?.[t.discriminator]);
      return s
        ? s._zod.run(i, a)
        : t.unionFallback || a.direction === `backward`
          ? n(i, a)
          : (i.issues.push({
              code: `invalid_union`,
              errors: [],
              note: `No matching discriminator`,
              discriminator: t.discriminator,
              options: Array.from(r.value.keys()),
              input: o,
              path: [t.discriminator],
              inst: e,
            }),
            i);
    };
  }),
  Rn = p(`$ZodIntersection`, (e, t) => {
    (C.init(e, t),
      (e._zod.parse = (e, n) => {
        let r = e.value,
          i = t.left._zod.run({ value: r, issues: [] }, n),
          a = t.right._zod.run({ value: r, issues: [] }, n);
        return i instanceof Promise || a instanceof Promise
          ? Promise.all([i, a]).then(([t, n]) => Bn(e, t, n))
          : Bn(e, i, a);
      }));
  });
function zn(e, t) {
  if (e === t || (e instanceof Date && t instanceof Date && +e == +t))
    return { valid: !0, data: e };
  if (me(e) && me(t)) {
    let n = Object.keys(t),
      r = Object.keys(e).filter((e) => n.indexOf(e) !== -1),
      i = { ...e, ...t };
    for (let n of r) {
      let r = zn(e[n], t[n]);
      if (!r.valid) return { valid: !1, mergeErrorPath: [n, ...r.mergeErrorPath] };
      i[n] = r.data;
    }
    return { valid: !0, data: i };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
    let n = [];
    for (let r = 0; r < e.length; r++) {
      let i = e[r],
        a = t[r],
        o = zn(i, a);
      if (!o.valid) return { valid: !1, mergeErrorPath: [r, ...o.mergeErrorPath] };
      n.push(o.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Bn(e, t, n) {
  let r = new Map(),
    i;
  for (let n of t.issues)
    if (n.code === `unrecognized_keys`) {
      i ??= n;
      for (let e of n.keys) (r.has(e) || r.set(e, {}), (r.get(e).l = !0));
    } else e.issues.push(n);
  for (let t of n.issues)
    if (t.code === `unrecognized_keys`)
      for (let e of t.keys) (r.has(e) || r.set(e, {}), (r.get(e).r = !0));
    else e.issues.push(t);
  let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
  if ((a.length && i && e.issues.push({ ...i, keys: a }), Oe(e))) return e;
  let o = zn(t.value, n.value);
  if (!o.valid)
    throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
  return ((e.value = o.data), e);
}
const Vn = p(`$ZodTuple`, (e, t) => {
  C.init(e, t);
  let n = t.items;
  e._zod.parse = (r, i) => {
    let a = r.value;
    if (!Array.isArray(a))
      return (r.issues.push({ input: a, inst: e, expected: `tuple`, code: `invalid_type` }), r);
    r.value = [];
    let o = [],
      s = Hn(n, `optin`),
      c = Hn(n, `optout`);
    if (!t.rest) {
      if (a.length < s)
        return (
          r.issues.push({
            code: `too_small`,
            minimum: s,
            inclusive: !0,
            input: a,
            inst: e,
            origin: `array`,
          }),
          r
        );
      a.length > n.length &&
        r.issues.push({
          code: `too_big`,
          maximum: n.length,
          inclusive: !0,
          input: a,
          inst: e,
          origin: `array`,
        });
    }
    let l = Array(n.length);
    for (let e = 0; e < n.length; e++) {
      let t = n[e]._zod.run({ value: a[e], issues: [] }, i);
      t instanceof Promise
        ? o.push(
            t.then((t) => {
              l[e] = t;
            }),
          )
        : (l[e] = t);
    }
    if (t.rest) {
      let e = n.length - 1,
        s = a.slice(n.length);
      for (let n of s) {
        e++;
        let a = t.rest._zod.run({ value: n, issues: [] }, i);
        a instanceof Promise ? o.push(a.then((t) => Un(t, r, e))) : Un(a, r, e);
      }
    }
    return o.length ? Promise.all(o).then(() => Wn(l, r, n, a, c)) : Wn(l, r, n, a, c);
  };
});
function Hn(e, t) {
  for (let n = e.length - 1; n >= 0; n--) if (e[n]._zod[t] !== `optional`) return n + 1;
  return 0;
}
function Un(e, t, n) {
  (e.issues.length && t.issues.push(...b(n, e.issues)), (t.value[n] = e.value));
}
function Wn(e, t, n, r, i) {
  for (let a = 0; a < n.length; a++) {
    let n = e[a],
      o = a < r.length;
    if (n.issues.length) {
      if (!o && a >= i) {
        t.value.length = a;
        break;
      }
      t.issues.push(...b(a, n.issues));
    }
    t.value[a] = n.value;
  }
  for (
    let e = t.value.length - 1;
    e >= r.length && n[e]._zod.optout === `optional` && t.value[e] === void 0;
    e--
  )
    t.value.length = e;
  return t;
}
const Gn = p(`$ZodRecord`, (e, t) => {
    (C.init(e, t),
      (e._zod.parse = (n, r) => {
        let i = n.value;
        if (!me(i))
          return (
            n.issues.push({ expected: `record`, code: `invalid_type`, input: i, inst: e }), n
          );
        let a = [],
          o = t.keyType._zod.values;
        if (o) {
          n.value = {};
          let s = new Set();
          for (let c of o)
            if (typeof c == `string` || typeof c == `number` || typeof c == `symbol`) {
              s.add(typeof c == `number` ? c.toString() : c);
              let o = t.keyType._zod.run({ value: c, issues: [] }, r);
              if (o instanceof Promise)
                throw Error(`Async schemas not supported in object keys currently`);
              if (o.issues.length) {
                n.issues.push({
                  code: `invalid_key`,
                  origin: `record`,
                  issues: o.issues.map((e) => x(e, r, g())),
                  input: c,
                  path: [c],
                  inst: e,
                });
                continue;
              }
              let l = o.value,
                u = t.valueType._zod.run({ value: i[c], issues: [] }, r);
              u instanceof Promise
                ? a.push(
                    u.then((e) => {
                      (e.issues.length && n.issues.push(...b(c, e.issues)), (n.value[l] = e.value));
                    }),
                  )
                : (u.issues.length && n.issues.push(...b(c, u.issues)), (n.value[l] = u.value));
            }
          let c;
          for (let e in i) s.has(e) || ((c ??= []), c.push(e));
          c &&
            c.length > 0 &&
            n.issues.push({ code: `unrecognized_keys`, input: i, inst: e, keys: c });
        } else {
          n.value = {};
          for (let o of Reflect.ownKeys(i)) {
            if (o === `__proto__` || !Object.prototype.propertyIsEnumerable.call(i, o)) continue;
            let s = t.keyType._zod.run({ value: o, issues: [] }, r);
            if (s instanceof Promise)
              throw Error(`Async schemas not supported in object keys currently`);
            if (typeof o == `string` && wt.test(o) && s.issues.length) {
              let e = t.keyType._zod.run({ value: Number(o), issues: [] }, r);
              if (e instanceof Promise)
                throw Error(`Async schemas not supported in object keys currently`);
              e.issues.length === 0 && (s = e);
            }
            if (s.issues.length) {
              t.mode === `loose`
                ? (n.value[o] = i[o])
                : n.issues.push({
                    code: `invalid_key`,
                    origin: `record`,
                    issues: s.issues.map((e) => x(e, r, g())),
                    input: o,
                    path: [o],
                    inst: e,
                  });
              continue;
            }
            let c = t.valueType._zod.run({ value: i[o], issues: [] }, r);
            c instanceof Promise
              ? a.push(
                  c.then((e) => {
                    (e.issues.length && n.issues.push(...b(o, e.issues)),
                      (n.value[s.value] = e.value));
                  }),
                )
              : (c.issues.length && n.issues.push(...b(o, c.issues)), (n.value[s.value] = c.value));
          }
        }
        return a.length ? Promise.all(a).then(() => n) : n;
      }));
  }),
  Kn = p(`$ZodEnum`, (e, t) => {
    C.init(e, t);
    let n = te(t.entries),
      r = new Set(n);
    ((e._zod.values = r),
      (e._zod.pattern = RegExp(
        `^(${n
          .filter((e) => ge.has(typeof e))
          .map((e) => (typeof e == `string` ? _e(e) : e.toString()))
          .join(`|`)})$`,
      )),
      (e._zod.parse = (t, i) => {
        let a = t.value;
        return (
          r.has(a) || t.issues.push({ code: `invalid_value`, values: n, input: a, inst: e }), t
        );
      }));
  }),
  qn = p(`$ZodLiteral`, (e, t) => {
    if ((C.init(e, t), t.values.length === 0))
      throw Error(`Cannot create literal schema with no valid values`);
    let n = new Set(t.values);
    ((e._zod.values = n),
      (e._zod.pattern = RegExp(
        `^(${t.values.map((e) => (typeof e == `string` ? _e(e) : e ? _e(e.toString()) : String(e))).join(`|`)})$`,
      )),
      (e._zod.parse = (r, i) => {
        let a = r.value;
        return (
          n.has(a) || r.issues.push({ code: `invalid_value`, values: t.values, input: a, inst: e }),
          r
        );
      }));
  }),
  Jn = p(`$ZodTransform`, (e, t) => {
    (C.init(e, t),
      (e._zod.optin = `optional`),
      (e._zod.parse = (n, r) => {
        if (r.direction === `backward`) throw new h(e.constructor.name);
        let i = t.transform(n.value, n);
        if (r.async)
          return (i instanceof Promise ? i : Promise.resolve(i)).then(
            (e) => ((n.value = e), (n.fallback = !0), n),
          );
        if (i instanceof Promise) throw new m();
        return ((n.value = i), (n.fallback = !0), n);
      }));
  });
function Yn(e, t) {
  return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
const Xn = p(`$ZodOptional`, (e, t) => {
    (C.init(e, t),
      (e._zod.optin = `optional`),
      (e._zod.optout = `optional`),
      _(e._zod, `values`, () =>
        t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0,
      ),
      _(e._zod, `pattern`, () => {
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${ae(e.source)})?$`) : void 0;
      }),
      (e._zod.parse = (e, n) => {
        if (t.innerType._zod.optin === `optional`) {
          let r = e.value,
            i = t.innerType._zod.run(e, n);
          return i instanceof Promise ? i.then((e) => Yn(e, r)) : Yn(i, r);
        }
        return e.value === void 0 ? e : t.innerType._zod.run(e, n);
      }));
  }),
  Zn = p(`$ZodExactOptional`, (e, t) => {
    (Xn.init(e, t),
      _(e._zod, `values`, () => t.innerType._zod.values),
      _(e._zod, `pattern`, () => t.innerType._zod.pattern),
      (e._zod.parse = (e, n) => t.innerType._zod.run(e, n)));
  }),
  Qn = p(`$ZodNullable`, (e, t) => {
    (C.init(e, t),
      _(e._zod, `optin`, () => t.innerType._zod.optin),
      _(e._zod, `optout`, () => t.innerType._zod.optout),
      _(e._zod, `pattern`, () => {
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${ae(e.source)}|null)$`) : void 0;
      }),
      _(e._zod, `values`, () =>
        t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0,
      ),
      (e._zod.parse = (e, n) => (e.value === null ? e : t.innerType._zod.run(e, n))));
  }),
  $n = p(`$ZodDefault`, (e, t) => {
    (C.init(e, t),
      (e._zod.optin = `optional`),
      _(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) return t.innerType._zod.run(e, n);
        if (e.value === void 0) return ((e.value = t.defaultValue), e);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((e) => er(e, t)) : er(r, t);
      }));
  });
function er(e, t) {
  return (e.value === void 0 && (e.value = t.defaultValue), e);
}
const tr = p(`$ZodPrefault`, (e, t) => {
    (C.init(e, t),
      (e._zod.optin = `optional`),
      _(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => (
        n.direction === `backward` || (e.value === void 0 && (e.value = t.defaultValue)),
        t.innerType._zod.run(e, n)
      )));
  }),
  nr = p(`$ZodNonOptional`, (e, t) => {
    (C.init(e, t),
      _(e._zod, `values`, () => {
        let e = t.innerType._zod.values;
        return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
      }),
      (e._zod.parse = (n, r) => {
        let i = t.innerType._zod.run(n, r);
        return i instanceof Promise ? i.then((t) => rr(t, e)) : rr(i, e);
      }));
  });
function rr(e, t) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({ code: `invalid_type`, expected: `nonoptional`, input: e.value, inst: t }),
    e
  );
}
const ir = p(`$ZodCatch`, (e, t) => {
    (C.init(e, t),
      (e._zod.optin = `optional`),
      _(e._zod, `optout`, () => t.innerType._zod.optout),
      _(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise
          ? r.then(
              (r) => (
                (e.value = r.value),
                r.issues.length &&
                  ((e.value = t.catchValue({
                    ...e,
                    error: { issues: r.issues.map((e) => x(e, n, g())) },
                    input: e.value,
                  })),
                  (e.issues = []),
                  (e.fallback = !0)),
                e
              ),
            )
          : ((e.value = r.value),
            r.issues.length &&
              ((e.value = t.catchValue({
                ...e,
                error: { issues: r.issues.map((e) => x(e, n, g())) },
                input: e.value,
              })),
              (e.issues = []),
              (e.fallback = !0)),
            e);
      }));
  }),
  ar = p(`$ZodPipe`, (e, t) => {
    (C.init(e, t),
      _(e._zod, `values`, () => t.in._zod.values),
      _(e._zod, `optin`, () => t.in._zod.optin),
      _(e._zod, `optout`, () => t.out._zod.optout),
      _(e._zod, `propValues`, () => t.in._zod.propValues),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) {
          let r = t.out._zod.run(e, n);
          return r instanceof Promise ? r.then((e) => or(e, t.in, n)) : or(r, t.in, n);
        }
        let r = t.in._zod.run(e, n);
        return r instanceof Promise ? r.then((e) => or(e, t.out, n)) : or(r, t.out, n);
      }));
  });
function or(e, t, n) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, n);
}
const sr = p(`$ZodReadonly`, (e, t) => {
  (C.init(e, t),
    _(e._zod, `propValues`, () => t.innerType._zod.propValues),
    _(e._zod, `values`, () => t.innerType._zod.values),
    _(e._zod, `optin`, () => t.innerType?._zod?.optin),
    _(e._zod, `optout`, () => t.innerType?._zod?.optout),
    (e._zod.parse = (e, n) => {
      if (n.direction === `backward`) return t.innerType._zod.run(e, n);
      let r = t.innerType._zod.run(e, n);
      return r instanceof Promise ? r.then(cr) : cr(r);
    }));
});
function cr(e) {
  return ((e.value = Object.freeze(e.value)), e);
}
const lr = p(`$ZodLazy`, (e, t) => {
    (C.init(e, t),
      _(e._zod, `innerType`, () => {
        let e = t;
        return ((e._cachedInner ||= t.getter()), e._cachedInner);
      }),
      _(e._zod, `pattern`, () => e._zod.innerType?._zod?.pattern),
      _(e._zod, `propValues`, () => e._zod.innerType?._zod?.propValues),
      _(e._zod, `optin`, () => e._zod.innerType?._zod?.optin ?? void 0),
      _(e._zod, `optout`, () => e._zod.innerType?._zod?.optout ?? void 0),
      (e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n)));
  }),
  ur = p(`$ZodCustom`, (e, t) => {
    (S.init(e, t),
      C.init(e, t),
      (e._zod.parse = (e, t) => e),
      (e._zod.check = (n) => {
        let r = n.value,
          i = t.fn(r);
        if (i instanceof Promise) return i.then((t) => dr(t, n, r, e));
        dr(i, n, r, e);
      }));
  });
function dr(e, t, n, r) {
  if (!e) {
    let e = {
      code: `custom`,
      input: n,
      inst: r,
      path: [...(r._zod.def.path ?? [])],
      continue: !r._zod.def.abort,
    };
    (r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Me(e)));
  }
}
var fr,
  pr = class {
    constructor() {
      ((this._map = new WeakMap()), (this._idmap = new Map()));
    }
    add(e, ...t) {
      let n = t[0];
      return (
        this._map.set(e, n),
        n && typeof n == `object` && `id` in n && this._idmap.set(n.id, e),
        this
      );
    }
    clear() {
      return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
    }
    remove(e) {
      let t = this._map.get(e);
      return (
        t && typeof t == `object` && `id` in t && this._idmap.delete(t.id),
        this._map.delete(e),
        this
      );
    }
    get(e) {
      let t = e._zod.parent;
      if (t) {
        let n = { ...(this.get(t) ?? {}) };
        delete n.id;
        let r = { ...n, ...this._map.get(e) };
        return Object.keys(r).length ? r : void 0;
      }
      return this._map.get(e);
    }
    has(e) {
      return this._map.has(e);
    }
  };
function mr() {
  return new pr();
}
(fr = globalThis).__zod_globalRegistry ?? (fr.__zod_globalRegistry = mr());
const hr = globalThis.__zod_globalRegistry;
function gr(e, t) {
  return new e({ type: `string`, ...y(t) });
}
function _r(e, t) {
  return new e({ type: `string`, format: `email`, check: `string_format`, abort: !1, ...y(t) });
}
function vr(e, t) {
  return new e({ type: `string`, format: `guid`, check: `string_format`, abort: !1, ...y(t) });
}
function yr(e, t) {
  return new e({ type: `string`, format: `uuid`, check: `string_format`, abort: !1, ...y(t) });
}
function br(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v4`,
    ...y(t),
  });
}
function xr(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v6`,
    ...y(t),
  });
}
function Sr(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v7`,
    ...y(t),
  });
}
function Cr(e, t) {
  return new e({ type: `string`, format: `url`, check: `string_format`, abort: !1, ...y(t) });
}
function wr(e, t) {
  return new e({ type: `string`, format: `emoji`, check: `string_format`, abort: !1, ...y(t) });
}
function Tr(e, t) {
  return new e({ type: `string`, format: `nanoid`, check: `string_format`, abort: !1, ...y(t) });
}
function Er(e, t) {
  return new e({ type: `string`, format: `cuid`, check: `string_format`, abort: !1, ...y(t) });
}
function Dr(e, t) {
  return new e({ type: `string`, format: `cuid2`, check: `string_format`, abort: !1, ...y(t) });
}
function Or(e, t) {
  return new e({ type: `string`, format: `ulid`, check: `string_format`, abort: !1, ...y(t) });
}
function kr(e, t) {
  return new e({ type: `string`, format: `xid`, check: `string_format`, abort: !1, ...y(t) });
}
function Ar(e, t) {
  return new e({ type: `string`, format: `ksuid`, check: `string_format`, abort: !1, ...y(t) });
}
function jr(e, t) {
  return new e({ type: `string`, format: `ipv4`, check: `string_format`, abort: !1, ...y(t) });
}
function Mr(e, t) {
  return new e({ type: `string`, format: `ipv6`, check: `string_format`, abort: !1, ...y(t) });
}
function Nr(e, t) {
  return new e({ type: `string`, format: `cidrv4`, check: `string_format`, abort: !1, ...y(t) });
}
function Pr(e, t) {
  return new e({ type: `string`, format: `cidrv6`, check: `string_format`, abort: !1, ...y(t) });
}
function Fr(e, t) {
  return new e({ type: `string`, format: `base64`, check: `string_format`, abort: !1, ...y(t) });
}
function Ir(e, t) {
  return new e({ type: `string`, format: `base64url`, check: `string_format`, abort: !1, ...y(t) });
}
function Lr(e, t) {
  return new e({ type: `string`, format: `e164`, check: `string_format`, abort: !1, ...y(t) });
}
function Rr(e, t) {
  return new e({ type: `string`, format: `jwt`, check: `string_format`, abort: !1, ...y(t) });
}
function zr(e, t) {
  return new e({
    type: `string`,
    format: `datetime`,
    check: `string_format`,
    offset: !1,
    local: !1,
    precision: null,
    ...y(t),
  });
}
function Br(e, t) {
  return new e({ type: `string`, format: `date`, check: `string_format`, ...y(t) });
}
function Vr(e, t) {
  return new e({
    type: `string`,
    format: `time`,
    check: `string_format`,
    precision: null,
    ...y(t),
  });
}
function Hr(e, t) {
  return new e({ type: `string`, format: `duration`, check: `string_format`, ...y(t) });
}
function Ur(e, t) {
  return new e({ type: `number`, checks: [], ...y(t) });
}
function Wr(e, t) {
  return new e({ type: `number`, coerce: !0, checks: [], ...y(t) });
}
function Gr(e, t) {
  return new e({ type: `number`, check: `number_format`, abort: !1, format: `safeint`, ...y(t) });
}
function Kr(e, t) {
  return new e({ type: `boolean`, ...y(t) });
}
function qr(e, t) {
  return new e({ type: `null`, ...y(t) });
}
function Jr(e) {
  return new e({ type: `any` });
}
function Yr(e) {
  return new e({ type: `unknown` });
}
function Xr(e, t) {
  return new e({ type: `never`, ...y(t) });
}
function Zr(e, t) {
  return new At({ check: `less_than`, ...y(t), value: e, inclusive: !1 });
}
function Qr(e, t) {
  return new At({ check: `less_than`, ...y(t), value: e, inclusive: !0 });
}
function $r(e, t) {
  return new jt({ check: `greater_than`, ...y(t), value: e, inclusive: !1 });
}
function ei(e, t) {
  return new jt({ check: `greater_than`, ...y(t), value: e, inclusive: !0 });
}
function ti(e, t) {
  return new Mt({ check: `multiple_of`, ...y(t), value: e });
}
function ni(e, t) {
  return new Pt({ check: `max_length`, ...y(t), maximum: e });
}
function ri(e, t) {
  return new Ft({ check: `min_length`, ...y(t), minimum: e });
}
function ii(e, t) {
  return new It({ check: `length_equals`, ...y(t), length: e });
}
function ai(e, t) {
  return new Rt({ check: `string_format`, format: `regex`, ...y(t), pattern: e });
}
function oi(e) {
  return new zt({ check: `string_format`, format: `lowercase`, ...y(e) });
}
function si(e) {
  return new Bt({ check: `string_format`, format: `uppercase`, ...y(e) });
}
function ci(e, t) {
  return new Vt({ check: `string_format`, format: `includes`, ...y(t), includes: e });
}
function li(e, t) {
  return new Ht({ check: `string_format`, format: `starts_with`, ...y(t), prefix: e });
}
function ui(e, t) {
  return new Ut({ check: `string_format`, format: `ends_with`, ...y(t), suffix: e });
}
function di(e) {
  return new Wt({ check: `overwrite`, tx: e });
}
function fi(e) {
  return di((t) => t.normalize(e));
}
function pi() {
  return di((e) => e.trim());
}
function mi() {
  return di((e) => e.toLowerCase());
}
function hi() {
  return di((e) => e.toUpperCase());
}
function gi() {
  return di((e) => ue(e));
}
function _i(e, t, n) {
  return new e({ type: `array`, element: t, ...y(n) });
}
function vi(e, t, n) {
  return new e({ type: `custom`, check: `custom`, fn: t, ...y(n) });
}
function yi(e, t) {
  let n = bi(
    (t) => (
      (t.addIssue = (e) => {
        if (typeof e == `string`) t.issues.push(Me(e, t.value, n._zod.def));
        else {
          let r = e;
          (r.fatal && (r.continue = !1),
            (r.code ??= `custom`),
            (r.input ??= t.value),
            (r.inst ??= n),
            (r.continue ??= !n._zod.def.abort),
            t.issues.push(Me(r)));
        }
      }),
      e(t.value, t)
    ),
    t,
  );
  return n;
}
function bi(e, t) {
  let n = new S({ check: `custom`, ...y(t) });
  return ((n._zod.check = e), n);
}
function xi(e) {
  let t = e?.target ?? `draft-2020-12`;
  return (
    t === `draft-4` && (t = `draft-04`),
    t === `draft-7` && (t = `draft-07`),
    {
      processors: e.processors ?? {},
      metadataRegistry: e?.metadata ?? hr,
      target: t,
      unrepresentable: e?.unrepresentable ?? `throw`,
      override: e?.override ?? (() => {}),
      io: e?.io ?? `output`,
      counter: 0,
      seen: new Map(),
      cycles: e?.cycles ?? `ref`,
      reused: e?.reused ?? `inline`,
      external: e?.external ?? void 0,
    }
  );
}
function T(e, t, n = { path: [], schemaPath: [] }) {
  var r;
  let i = e._zod.def,
    a = t.seen.get(e);
  if (a) return (a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema);
  let o = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, o);
  let s = e._zod.toJSONSchema?.();
  if (s) o.schema = s;
  else {
    let r = { ...n, schemaPath: [...n.schemaPath, e], path: n.path };
    if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
    else {
      let n = o.schema,
        a = t.processors[i.type];
      if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
      a(e, t, n, r);
    }
    let a = e._zod.parent;
    a && ((o.ref ||= a), T(a, t, r), (t.seen.get(a).isParent = !0));
  }
  let c = t.metadataRegistry.get(e);
  return (
    c && Object.assign(o.schema, c),
    t.io === `input` && E(e) && (delete o.schema.examples, delete o.schema.default),
    t.io === `input` &&
      `_prefault` in o.schema &&
      ((r = o.schema).default ?? (r.default = o.schema._prefault)),
    delete o.schema._prefault,
    t.seen.get(e).schema
  );
}
function Si(e, t) {
  let n = e.seen.get(t);
  if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
  let r = new Map();
  for (let t of e.seen.entries()) {
    let n = e.metadataRegistry.get(t[0])?.id;
    if (n) {
      let e = r.get(n);
      if (e && e !== t[0])
        throw Error(
          `Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
        );
      r.set(n, t[0]);
    }
  }
  let i = (t) => {
      let r = e.target === `draft-2020-12` ? `$defs` : `definitions`;
      if (e.external) {
        let n = e.external.registry.get(t[0])?.id,
          i = e.external.uri ?? ((e) => e);
        if (n) return { ref: i(n) };
        let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
        return ((t[1].defId = a), { defId: a, ref: `${i(`__shared`)}#/${r}/${a}` });
      }
      if (t[1] === n) return { ref: `#` };
      let i = `#/${r}/`,
        a = t[1].schema.id ?? `__schema${e.counter++}`;
      return { defId: a, ref: i + a };
    },
    a = (e) => {
      if (e[1].schema.$ref) return;
      let t = e[1],
        { ref: n, defId: r } = i(e);
      ((t.def = { ...t.schema }), r && (t.defId = r));
      let a = t.schema;
      for (let e in a) delete a[e];
      a.$ref = n;
    };
  if (e.cycles === `throw`)
    for (let t of e.seen.entries()) {
      let e = t[1];
      if (e.cycle)
        throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (let n of e.seen.entries()) {
    let r = n[1];
    if (t === n[0]) {
      a(n);
      continue;
    }
    if (e.external) {
      let r = e.external.registry.get(n[0])?.id;
      if (t !== n[0] && r) {
        a(n);
        continue;
      }
    }
    if (e.metadataRegistry.get(n[0])?.id) {
      a(n);
      continue;
    }
    if (r.cycle) {
      a(n);
      continue;
    }
    if (r.count > 1 && e.reused === `ref`) {
      a(n);
      continue;
    }
  }
}
function Ci(e, t) {
  let n = e.seen.get(t);
  if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
  let r = (t) => {
    let n = e.seen.get(t);
    if (n.ref === null) return;
    let i = n.def ?? n.schema,
      a = { ...i },
      o = n.ref;
    if (((n.ref = null), o)) {
      r(o);
      let n = e.seen.get(o),
        s = n.schema;
      if (
        (s.$ref &&
        (e.target === `draft-07` || e.target === `draft-04` || e.target === `openapi-3.0`)
          ? ((i.allOf = i.allOf ?? []), i.allOf.push(s))
          : Object.assign(i, s),
        Object.assign(i, a),
        t._zod.parent === o)
      )
        for (let e in i) e === `$ref` || e === `allOf` || e in a || delete i[e];
      if (s.$ref && n.def)
        for (let e in i)
          e === `$ref` ||
            e === `allOf` ||
            (e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e]);
    }
    let s = t._zod.parent;
    if (s && s !== o) {
      r(s);
      let t = e.seen.get(s);
      if (t?.schema.$ref && ((i.$ref = t.schema.$ref), t.def))
        for (let e in i)
          e === `$ref` ||
            e === `allOf` ||
            (e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e]);
    }
    e.override({ zodSchema: t, jsonSchema: i, path: n.path ?? [] });
  };
  for (let t of [...e.seen.entries()].reverse()) r(t[0]);
  let i = {};
  if (
    (e.target === `draft-2020-12`
      ? (i.$schema = `https://json-schema.org/draft/2020-12/schema`)
      : e.target === `draft-07`
        ? (i.$schema = `http://json-schema.org/draft-07/schema#`)
        : e.target === `draft-04`
          ? (i.$schema = `http://json-schema.org/draft-04/schema#`)
          : e.target,
    e.external?.uri)
  ) {
    let n = e.external.registry.get(t)?.id;
    if (!n) throw Error("Schema is missing an `id` property");
    i.$id = e.external.uri(n);
  }
  Object.assign(i, n.def ?? n.schema);
  let a = e.metadataRegistry.get(t)?.id;
  a !== void 0 && i.id === a && delete i.id;
  let o = e.external?.defs ?? {};
  for (let t of e.seen.entries()) {
    let e = t[1];
    e.def && e.defId && (e.def.id === e.defId && delete e.def.id, (o[e.defId] = e.def));
  }
  e.external ||
    (Object.keys(o).length > 0 &&
      (e.target === `draft-2020-12` ? (i.$defs = o) : (i.definitions = o)));
  try {
    let n = JSON.parse(JSON.stringify(i));
    return (
      Object.defineProperty(n, "~standard", {
        value: {
          ...t[`~standard`],
          jsonSchema: {
            input: Ti(t, `input`, e.processors),
            output: Ti(t, `output`, e.processors),
          },
        },
        enumerable: !1,
        writable: !1,
      }),
      n
    );
  } catch {
    throw Error(`Error converting schema to JSON.`);
  }
}
function E(e, t) {
  let n = t ?? { seen: new Set() };
  if (n.seen.has(e)) return !1;
  n.seen.add(e);
  let r = e._zod.def;
  if (r.type === `transform`) return !0;
  if (r.type === `array`) return E(r.element, n);
  if (r.type === `set`) return E(r.valueType, n);
  if (r.type === `lazy`) return E(r.getter(), n);
  if (
    r.type === `promise` ||
    r.type === `optional` ||
    r.type === `nonoptional` ||
    r.type === `nullable` ||
    r.type === `readonly` ||
    r.type === "default" ||
    r.type === `prefault`
  )
    return E(r.innerType, n);
  if (r.type === `intersection`) return E(r.left, n) || E(r.right, n);
  if (r.type === `record` || r.type === `map`) return E(r.keyType, n) || E(r.valueType, n);
  if (r.type === `pipe`) return e._zod.traits.has(`$ZodCodec`) ? !0 : E(r.in, n) || E(r.out, n);
  if (r.type === `object`) {
    for (let e in r.shape) if (E(r.shape[e], n)) return !0;
    return !1;
  }
  if (r.type === `union`) {
    for (let e of r.options) if (E(e, n)) return !0;
    return !1;
  }
  if (r.type === `tuple`) {
    for (let e of r.items) if (E(e, n)) return !0;
    return !!(r.rest && E(r.rest, n));
  }
  return !1;
}
const wi =
    (e, t = {}) =>
    (n) => {
      let r = xi({ ...n, processors: t });
      return (T(e, r), Si(r, e), Ci(r, e));
    },
  Ti =
    (e, t, n = {}) =>
    (r) => {
      let { libraryOptions: i, target: a } = r ?? {},
        o = xi({ ...(i ?? {}), target: a, io: t, processors: n });
      return (T(e, o), Si(o, e), Ci(o, e));
    },
  Ei = { guid: `uuid`, url: `uri`, datetime: `date-time`, json_string: `json-string`, regex: `` },
  Di = (e, t, n, r) => {
    let i = n;
    i.type = `string`;
    let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
    if (
      (typeof a == `number` && (i.minLength = a),
      typeof o == `number` && (i.maxLength = o),
      s &&
        ((i.format = Ei[s] ?? s),
        i.format === `` && delete i.format,
        s === `time` && delete i.format),
      l && (i.contentEncoding = l),
      c && c.size > 0)
    ) {
      let e = [...c];
      e.length === 1
        ? (i.pattern = e[0].source)
        : e.length > 1 &&
          (i.allOf = [
            ...e.map((e) => ({
              ...(t.target === `draft-07` || t.target === `draft-04` || t.target === `openapi-3.0`
                ? { type: `string` }
                : {}),
              pattern: e.source,
            })),
          ]);
    }
  },
  Oi = (e, t, n, r) => {
    let i = n,
      {
        minimum: a,
        maximum: o,
        format: s,
        multipleOf: c,
        exclusiveMaximum: l,
        exclusiveMinimum: u,
      } = e._zod.bag;
    typeof s == `string` && s.includes(`int`) ? (i.type = `integer`) : (i.type = `number`);
    let d = typeof u == `number` && u >= (a ?? -1 / 0),
      f = typeof l == `number` && l <= (o ?? 1 / 0),
      p = t.target === `draft-04` || t.target === `openapi-3.0`;
    (d
      ? p
        ? ((i.minimum = u), (i.exclusiveMinimum = !0))
        : (i.exclusiveMinimum = u)
      : typeof a == `number` && (i.minimum = a),
      f
        ? p
          ? ((i.maximum = l), (i.exclusiveMaximum = !0))
          : (i.exclusiveMaximum = l)
        : typeof o == `number` && (i.maximum = o),
      typeof c == `number` && (i.multipleOf = c));
  },
  ki = (e, t, n, r) => {
    n.type = `boolean`;
  },
  Ai = (e, t, n, r) => {
    if (t.unrepresentable === `throw`) throw Error(`BigInt cannot be represented in JSON Schema`);
  },
  ji = (e, t, n, r) => {
    if (t.unrepresentable === `throw`) throw Error(`Symbols cannot be represented in JSON Schema`);
  },
  Mi = (e, t, n, r) => {
    t.target === `openapi-3.0`
      ? ((n.type = `string`), (n.nullable = !0), (n.enum = [null]))
      : (n.type = `null`);
  },
  Ni = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Undefined cannot be represented in JSON Schema`);
  },
  Pi = (e, t, n, r) => {
    if (t.unrepresentable === `throw`) throw Error(`Void cannot be represented in JSON Schema`);
  },
  Fi = (e, t, n, r) => {
    n.not = {};
  },
  Ii = (e, t, n, r) => {},
  Li = (e, t, n, r) => {},
  Ri = (e, t, n, r) => {
    if (t.unrepresentable === `throw`) throw Error(`Date cannot be represented in JSON Schema`);
  },
  zi = (e, t, n, r) => {
    let i = e._zod.def,
      a = te(i.entries);
    (a.every((e) => typeof e == `number`) && (n.type = `number`),
      a.every((e) => typeof e == `string`) && (n.type = `string`),
      (n.enum = a));
  },
  Bi = (e, t, n, r) => {
    let i = e._zod.def,
      a = [];
    for (let e of i.values)
      if (e === void 0) {
        if (t.unrepresentable === `throw`)
          throw Error("Literal `undefined` cannot be represented in JSON Schema");
      } else if (typeof e == `bigint`) {
        if (t.unrepresentable === `throw`)
          throw Error(`BigInt literals cannot be represented in JSON Schema`);
        a.push(Number(e));
      } else a.push(e);
    if (a.length !== 0)
      if (a.length === 1) {
        let e = a[0];
        ((n.type = e === null ? `null` : typeof e),
          t.target === `draft-04` || t.target === `openapi-3.0` ? (n.enum = [e]) : (n.const = e));
      } else
        (a.every((e) => typeof e == `number`) && (n.type = `number`),
          a.every((e) => typeof e == `string`) && (n.type = `string`),
          a.every((e) => typeof e == `boolean`) && (n.type = `boolean`),
          a.every((e) => e === null) && (n.type = `null`),
          (n.enum = a));
  },
  Vi = (e, t, n, r) => {
    if (t.unrepresentable === `throw`) throw Error(`NaN cannot be represented in JSON Schema`);
  },
  Hi = (e, t, n, r) => {
    let i = n,
      a = e._zod.pattern;
    if (!a) throw Error(`Pattern not found in template literal`);
    ((i.type = `string`), (i.pattern = a.source));
  },
  Ui = (e, t, n, r) => {
    let i = n,
      a = { type: `string`, format: `binary`, contentEncoding: `binary` },
      { minimum: o, maximum: s, mime: c } = e._zod.bag;
    (o !== void 0 && (a.minLength = o),
      s !== void 0 && (a.maxLength = s),
      c
        ? c.length === 1
          ? ((a.contentMediaType = c[0]), Object.assign(i, a))
          : (Object.assign(i, a), (i.anyOf = c.map((e) => ({ contentMediaType: e }))))
        : Object.assign(i, a));
  },
  Wi = (e, t, n, r) => {
    n.type = `boolean`;
  },
  Gi = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Custom types cannot be represented in JSON Schema`);
  },
  Ki = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Function types cannot be represented in JSON Schema`);
  },
  qi = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Transforms cannot be represented in JSON Schema`);
  },
  Ji = (e, t, n, r) => {
    if (t.unrepresentable === `throw`) throw Error(`Map cannot be represented in JSON Schema`);
  },
  Yi = (e, t, n, r) => {
    if (t.unrepresentable === `throw`) throw Error(`Set cannot be represented in JSON Schema`);
  },
  Xi = (e, t, n, r) => {
    let i = n,
      a = e._zod.def,
      { minimum: o, maximum: s } = e._zod.bag;
    (typeof o == `number` && (i.minItems = o),
      typeof s == `number` && (i.maxItems = s),
      (i.type = `array`),
      (i.items = T(a.element, t, { ...r, path: [...r.path, `items`] })));
  },
  Zi = (e, t, n, r) => {
    let i = n,
      a = e._zod.def;
    ((i.type = `object`), (i.properties = {}));
    let o = a.shape;
    for (let e in o) i.properties[e] = T(o[e], t, { ...r, path: [...r.path, `properties`, e] });
    let s = new Set(Object.keys(o)),
      c = new Set(
        [...s].filter((e) => {
          let n = a.shape[e]._zod;
          return t.io === `input` ? n.optin === void 0 : n.optout === void 0;
        }),
      );
    (c.size > 0 && (i.required = Array.from(c)),
      a.catchall?._zod.def.type === `never`
        ? (i.additionalProperties = !1)
        : a.catchall
          ? a.catchall &&
            (i.additionalProperties = T(a.catchall, t, {
              ...r,
              path: [...r.path, `additionalProperties`],
            }))
          : t.io === `output` && (i.additionalProperties = !1));
  },
  Qi = (e, t, n, r) => {
    let i = e._zod.def,
      a = i.inclusive === !1,
      o = i.options.map((e, n) => T(e, t, { ...r, path: [...r.path, a ? `oneOf` : `anyOf`, n] }));
    a ? (n.oneOf = o) : (n.anyOf = o);
  },
  $i = (e, t, n, r) => {
    let i = e._zod.def,
      a = T(i.left, t, { ...r, path: [...r.path, `allOf`, 0] }),
      o = T(i.right, t, { ...r, path: [...r.path, `allOf`, 1] }),
      s = (e) => `allOf` in e && Object.keys(e).length === 1;
    n.allOf = [...(s(a) ? a.allOf : [a]), ...(s(o) ? o.allOf : [o])];
  },
  ea = (e, t, n, r) => {
    let i = n,
      a = e._zod.def;
    i.type = `array`;
    let o = t.target === `draft-2020-12` ? `prefixItems` : `items`,
      s = t.target === `draft-2020-12` || t.target === `openapi-3.0` ? `items` : `additionalItems`,
      c = a.items.map((e, n) => T(e, t, { ...r, path: [...r.path, o, n] })),
      l = a.rest
        ? T(a.rest, t, {
            ...r,
            path: [...r.path, s, ...(t.target === `openapi-3.0` ? [a.items.length] : [])],
          })
        : null;
    t.target === `draft-2020-12`
      ? ((i.prefixItems = c), l && (i.items = l))
      : t.target === `openapi-3.0`
        ? ((i.items = { anyOf: c }),
          l && i.items.anyOf.push(l),
          (i.minItems = c.length),
          l || (i.maxItems = c.length))
        : ((i.items = c), l && (i.additionalItems = l));
    let { minimum: u, maximum: d } = e._zod.bag;
    (typeof u == `number` && (i.minItems = u), typeof d == `number` && (i.maxItems = d));
  },
  ta = (e, t, n, r) => {
    let i = n,
      a = e._zod.def;
    i.type = `object`;
    let o = a.keyType,
      s = o._zod.bag?.patterns;
    if (a.mode === `loose` && s && s.size > 0) {
      let e = T(a.valueType, t, { ...r, path: [...r.path, `patternProperties`, `*`] });
      i.patternProperties = {};
      for (let t of s) i.patternProperties[t.source] = e;
    } else
      ((t.target === `draft-07` || t.target === `draft-2020-12`) &&
        (i.propertyNames = T(a.keyType, t, { ...r, path: [...r.path, `propertyNames`] })),
        (i.additionalProperties = T(a.valueType, t, {
          ...r,
          path: [...r.path, `additionalProperties`],
        })));
    let c = o._zod.values;
    if (c) {
      let e = [...c].filter((e) => typeof e == `string` || typeof e == `number`);
      e.length > 0 && (i.required = e);
    }
  },
  na = (e, t, n, r) => {
    let i = e._zod.def,
      a = T(i.innerType, t, r),
      o = t.seen.get(e);
    t.target === `openapi-3.0`
      ? ((o.ref = i.innerType), (n.nullable = !0))
      : (n.anyOf = [a, { type: `null` }]);
  },
  ra = (e, t, n, r) => {
    let i = e._zod.def;
    T(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
  },
  ia = (e, t, n, r) => {
    let i = e._zod.def;
    T(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType), (n.default = JSON.parse(JSON.stringify(i.defaultValue))));
  },
  aa = (e, t, n, r) => {
    let i = e._zod.def;
    T(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType),
      t.io === `input` && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue))));
  },
  oa = (e, t, n, r) => {
    let i = e._zod.def;
    T(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
    let o;
    try {
      o = i.catchValue(void 0);
    } catch {
      throw Error(`Dynamic catch values are not supported in JSON Schema`);
    }
    n.default = o;
  },
  sa = (e, t, n, r) => {
    let i = e._zod.def,
      a = i.in._zod.traits.has(`$ZodTransform`),
      o = t.io === `input` ? (a ? i.out : i.in) : i.out;
    T(o, t, r);
    let s = t.seen.get(e);
    s.ref = o;
  },
  ca = (e, t, n, r) => {
    let i = e._zod.def;
    T(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType), (n.readOnly = !0));
  },
  la = (e, t, n, r) => {
    let i = e._zod.def;
    T(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
  },
  ua = (e, t, n, r) => {
    let i = e._zod.def;
    T(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
  },
  da = (e, t, n, r) => {
    let i = e._zod.innerType;
    T(i, t, r);
    let a = t.seen.get(e);
    a.ref = i;
  },
  fa = {
    string: Di,
    number: Oi,
    boolean: ki,
    bigint: Ai,
    symbol: ji,
    null: Mi,
    undefined: Ni,
    void: Pi,
    never: Fi,
    any: Ii,
    unknown: Li,
    date: Ri,
    enum: zi,
    literal: Bi,
    nan: Vi,
    template_literal: Hi,
    file: Ui,
    success: Wi,
    custom: Gi,
    function: Ki,
    transform: qi,
    map: Ji,
    set: Yi,
    array: Xi,
    object: Zi,
    union: Qi,
    intersection: $i,
    tuple: ea,
    record: ta,
    nullable: na,
    nonoptional: ra,
    default: ia,
    prefault: aa,
    catch: oa,
    pipe: sa,
    readonly: ca,
    promise: la,
    optional: ua,
    lazy: da,
  };
function pa(e, t) {
  if (`_idmap` in e) {
    let n = e,
      r = xi({ ...t, processors: fa }),
      i = {};
    for (let e of n._idmap.entries()) {
      let [t, n] = e;
      T(n, r);
    }
    let a = {};
    r.external = { registry: n, uri: t?.uri, defs: i };
    for (let e of n._idmap.entries()) {
      let [t, n] = e;
      (Si(r, n), (a[t] = Ci(r, n)));
    }
    return (
      Object.keys(i).length > 0 &&
        (a.__shared = { [r.target === `draft-2020-12` ? `$defs` : `definitions`]: i }),
      { schemas: a }
    );
  }
  let n = xi({ ...t, processors: fa });
  return (T(e, n), Si(n, e), Ci(n, e));
}
const ma = p(`ZodISODateTime`, (e, t) => {
  (on.init(e, t), k.init(e, t));
});
function ha(e) {
  return zr(ma, e);
}
const ga = p(`ZodISODate`, (e, t) => {
  (sn.init(e, t), k.init(e, t));
});
function _a(e) {
  return Br(ga, e);
}
const va = p(`ZodISOTime`, (e, t) => {
  (cn.init(e, t), k.init(e, t));
});
function ya(e) {
  return Vr(va, e);
}
const ba = p(`ZodISODuration`, (e, t) => {
  (ln.init(e, t), k.init(e, t));
});
function xa(e) {
  return Hr(ba, e);
}
const D = p(
    `ZodError`,
    (e, t) => {
      (Pe.init(e, t),
        (e.name = `ZodError`),
        Object.defineProperties(e, {
          format: { value: (t) => Le(e, t) },
          flatten: { value: (t) => Ie(e, t) },
          addIssue: {
            value: (t) => {
              (e.issues.push(t), (e.message = JSON.stringify(e.issues, ne, 2)));
            },
          },
          addIssues: {
            value: (t) => {
              (e.issues.push(...t), (e.message = JSON.stringify(e.issues, ne, 2)));
            },
          },
          isEmpty: {
            get() {
              return e.issues.length === 0;
            },
          },
        }));
    },
    { Parent: Error },
  ),
  Sa = Re(D),
  Ca = ze(D),
  wa = Be(D),
  Ta = He(D),
  Ea = We(D),
  Da = Ge(D),
  Oa = Ke(D),
  ka = qe(D),
  Aa = Je(D),
  ja = Ye(D),
  Ma = Xe(D),
  Na = Ze(D),
  Pa = new WeakMap();
function Fa(e, t, n) {
  let r = Object.getPrototypeOf(e),
    i = Pa.get(r);
  if ((i || ((i = new Set()), Pa.set(r, i)), !i.has(t))) {
    i.add(t);
    for (let e in n) {
      let t = n[e];
      Object.defineProperty(r, e, {
        configurable: !0,
        enumerable: !1,
        get() {
          let n = t.bind(this);
          return (
            Object.defineProperty(this, e, {
              configurable: !0,
              writable: !0,
              enumerable: !0,
              value: n,
            }),
            n
          );
        },
        set(t) {
          Object.defineProperty(this, e, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: t,
          });
        },
      });
    }
  }
}
const O = p(
    `ZodType`,
    (e, t) => (
      C.init(e, t),
      Object.assign(e[`~standard`], {
        jsonSchema: { input: Ti(e, `input`), output: Ti(e, `output`) },
      }),
      (e.toJSONSchema = wi(e, {})),
      (e.def = t),
      (e.type = t.type),
      Object.defineProperty(e, "_def", { value: t }),
      (e.parse = (t, n) => Sa(e, t, n, { callee: e.parse })),
      (e.safeParse = (t, n) => wa(e, t, n)),
      (e.parseAsync = async (t, n) => Ca(e, t, n, { callee: e.parseAsync })),
      (e.safeParseAsync = async (t, n) => Ta(e, t, n)),
      (e.spa = e.safeParseAsync),
      (e.encode = (t, n) => Ea(e, t, n)),
      (e.decode = (t, n) => Da(e, t, n)),
      (e.encodeAsync = async (t, n) => Oa(e, t, n)),
      (e.decodeAsync = async (t, n) => ka(e, t, n)),
      (e.safeEncode = (t, n) => Aa(e, t, n)),
      (e.safeDecode = (t, n) => ja(e, t, n)),
      (e.safeEncodeAsync = async (t, n) => Ma(e, t, n)),
      (e.safeDecodeAsync = async (t, n) => Na(e, t, n)),
      Fa(e, `ZodType`, {
        check(...e) {
          let t = this.def;
          return this.clone(
            v(t, {
              checks: [
                ...(t.checks ?? []),
                ...e.map((e) =>
                  typeof e == `function`
                    ? { _zod: { check: e, def: { check: `custom` }, onattach: [] } }
                    : e,
                ),
              ],
            }),
            { parent: !0 },
          );
        },
        with(...e) {
          return this.check(...e);
        },
        clone(e, t) {
          return ve(this, e, t);
        },
        brand() {
          return this;
        },
        register(e, t) {
          return (e.add(this, t), this);
        },
        refine(e, t) {
          return this.check(cs(e, t));
        },
        superRefine(e, t) {
          return this.check(ls(e, t));
        },
        overwrite(e) {
          return this.check(di(e));
        },
        optional() {
          return Ho(this);
        },
        exactOptional() {
          return Wo(this);
        },
        nullable() {
          return Ko(this);
        },
        nullish() {
          return Ho(Ko(this));
        },
        nonoptional(e) {
          return Qo(this, e);
        },
        array() {
          return xo(this);
        },
        or(e) {
          return Eo([this, e]);
        },
        and(e) {
          return Ao(this, e);
        },
        transform(e) {
          return ns(this, Bo(e));
        },
        default(e) {
          return Jo(this, e);
        },
        prefault(e) {
          return Xo(this, e);
        },
        catch(e) {
          return es(this, e);
        },
        pipe(e) {
          return ns(this, e);
        },
        readonly() {
          return is(this);
        },
        describe(e) {
          let t = this.clone();
          return (hr.add(t, { description: e }), t);
        },
        meta(...e) {
          if (e.length === 0) return hr.get(this);
          let t = this.clone();
          return (hr.add(t, e[0]), t);
        },
        isOptional() {
          return this.safeParse(void 0).success;
        },
        isNullable() {
          return this.safeParse(null).success;
        },
        apply(e) {
          return e(this);
        },
      }),
      Object.defineProperty(e, "description", {
        get() {
          return hr.get(e)?.description;
        },
        configurable: !0,
      }),
      e
    ),
  ),
  Ia = p(`_ZodString`, (e, t) => {
    (qt.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (t, n, r) => Di(e, t, n, r)));
    let n = e._zod.bag;
    ((e.format = n.format ?? null),
      (e.minLength = n.minimum ?? null),
      (e.maxLength = n.maximum ?? null),
      Fa(e, `_ZodString`, {
        regex(...e) {
          return this.check(ai(...e));
        },
        includes(...e) {
          return this.check(ci(...e));
        },
        startsWith(...e) {
          return this.check(li(...e));
        },
        endsWith(...e) {
          return this.check(ui(...e));
        },
        min(...e) {
          return this.check(ri(...e));
        },
        max(...e) {
          return this.check(ni(...e));
        },
        length(...e) {
          return this.check(ii(...e));
        },
        nonempty(...e) {
          return this.check(ri(1, ...e));
        },
        lowercase(e) {
          return this.check(oi(e));
        },
        uppercase(e) {
          return this.check(si(e));
        },
        trim() {
          return this.check(pi());
        },
        normalize(...e) {
          return this.check(fi(...e));
        },
        toLowerCase() {
          return this.check(mi());
        },
        toUpperCase() {
          return this.check(hi());
        },
        slugify() {
          return this.check(gi());
        },
      }));
  }),
  La = p(`ZodString`, (e, t) => {
    (qt.init(e, t),
      Ia.init(e, t),
      (e.email = (t) => e.check(_r(za, t))),
      (e.url = (t) => e.check(Cr(Ha, t))),
      (e.jwt = (t) => e.check(Rr(io, t))),
      (e.emoji = (t) => e.check(wr(Ua, t))),
      (e.guid = (t) => e.check(vr(Ba, t))),
      (e.uuid = (t) => e.check(yr(Va, t))),
      (e.uuidv4 = (t) => e.check(br(Va, t))),
      (e.uuidv6 = (t) => e.check(xr(Va, t))),
      (e.uuidv7 = (t) => e.check(Sr(Va, t))),
      (e.nanoid = (t) => e.check(Tr(Wa, t))),
      (e.guid = (t) => e.check(vr(Ba, t))),
      (e.cuid = (t) => e.check(Er(Ga, t))),
      (e.cuid2 = (t) => e.check(Dr(Ka, t))),
      (e.ulid = (t) => e.check(Or(qa, t))),
      (e.base64 = (t) => e.check(Fr(eo, t))),
      (e.base64url = (t) => e.check(Ir(no, t))),
      (e.xid = (t) => e.check(kr(Ja, t))),
      (e.ksuid = (t) => e.check(Ar(Ya, t))),
      (e.ipv4 = (t) => e.check(jr(Xa, t))),
      (e.ipv6 = (t) => e.check(Mr(Za, t))),
      (e.cidrv4 = (t) => e.check(Nr(Qa, t))),
      (e.cidrv6 = (t) => e.check(Pr($a, t))),
      (e.e164 = (t) => e.check(Lr(ro, t))),
      (e.datetime = (t) => e.check(ha(t))),
      (e.date = (t) => e.check(_a(t))),
      (e.time = (t) => e.check(ya(t))),
      (e.duration = (t) => e.check(xa(t))));
  });
function Ra(e) {
  return gr(La, e);
}
const k = p(`ZodStringFormat`, (e, t) => {
    (w.init(e, t), Ia.init(e, t));
  }),
  za = p(`ZodEmail`, (e, t) => {
    (Xt.init(e, t), k.init(e, t));
  }),
  Ba = p(`ZodGUID`, (e, t) => {
    (Jt.init(e, t), k.init(e, t));
  }),
  Va = p(`ZodUUID`, (e, t) => {
    (Yt.init(e, t), k.init(e, t));
  }),
  Ha = p(`ZodURL`, (e, t) => {
    (Zt.init(e, t), k.init(e, t));
  }),
  Ua = p(`ZodEmoji`, (e, t) => {
    (Qt.init(e, t), k.init(e, t));
  }),
  Wa = p(`ZodNanoID`, (e, t) => {
    ($t.init(e, t), k.init(e, t));
  }),
  Ga = p(`ZodCUID`, (e, t) => {
    (en.init(e, t), k.init(e, t));
  }),
  Ka = p(`ZodCUID2`, (e, t) => {
    (tn.init(e, t), k.init(e, t));
  }),
  qa = p(`ZodULID`, (e, t) => {
    (nn.init(e, t), k.init(e, t));
  }),
  Ja = p(`ZodXID`, (e, t) => {
    (rn.init(e, t), k.init(e, t));
  }),
  Ya = p(`ZodKSUID`, (e, t) => {
    (an.init(e, t), k.init(e, t));
  }),
  Xa = p(`ZodIPv4`, (e, t) => {
    (un.init(e, t), k.init(e, t));
  }),
  Za = p(`ZodIPv6`, (e, t) => {
    (dn.init(e, t), k.init(e, t));
  }),
  Qa = p(`ZodCIDRv4`, (e, t) => {
    (fn.init(e, t), k.init(e, t));
  }),
  $a = p(`ZodCIDRv6`, (e, t) => {
    (pn.init(e, t), k.init(e, t));
  }),
  eo = p(`ZodBase64`, (e, t) => {
    (hn.init(e, t), k.init(e, t));
  });
function to(e) {
  return Fr(eo, e);
}
const no = p(`ZodBase64URL`, (e, t) => {
    (_n.init(e, t), k.init(e, t));
  }),
  ro = p(`ZodE164`, (e, t) => {
    (vn.init(e, t), k.init(e, t));
  }),
  io = p(`ZodJWT`, (e, t) => {
    (bn.init(e, t), k.init(e, t));
  }),
  ao = p(`ZodNumber`, (e, t) => {
    (xn.init(e, t),
      O.init(e, t),
      (e._zod.processJSONSchema = (t, n, r) => Oi(e, t, n, r)),
      Fa(e, `ZodNumber`, {
        gt(e, t) {
          return this.check($r(e, t));
        },
        gte(e, t) {
          return this.check(ei(e, t));
        },
        min(e, t) {
          return this.check(ei(e, t));
        },
        lt(e, t) {
          return this.check(Zr(e, t));
        },
        lte(e, t) {
          return this.check(Qr(e, t));
        },
        max(e, t) {
          return this.check(Qr(e, t));
        },
        int(e) {
          return this.check(co(e));
        },
        safe(e) {
          return this.check(co(e));
        },
        positive(e) {
          return this.check($r(0, e));
        },
        nonnegative(e) {
          return this.check(ei(0, e));
        },
        negative(e) {
          return this.check(Zr(0, e));
        },
        nonpositive(e) {
          return this.check(Qr(0, e));
        },
        multipleOf(e, t) {
          return this.check(ti(e, t));
        },
        step(e, t) {
          return this.check(ti(e, t));
        },
        finite() {
          return this;
        },
      }));
    let n = e._zod.bag;
    ((e.minValue = Math.max(n.minimum ?? -1 / 0, n.exclusiveMinimum ?? -1 / 0) ?? null),
      (e.maxValue = Math.min(n.maximum ?? 1 / 0, n.exclusiveMaximum ?? 1 / 0) ?? null),
      (e.isInt = (n.format ?? ``).includes(`int`) || Number.isSafeInteger(n.multipleOf ?? 0.5)),
      (e.isFinite = !0),
      (e.format = n.format ?? null));
  });
function oo(e) {
  return Ur(ao, e);
}
const so = p(`ZodNumberFormat`, (e, t) => {
  (Sn.init(e, t), ao.init(e, t));
});
function co(e) {
  return Gr(so, e);
}
const lo = p(`ZodBoolean`, (e, t) => {
  (Cn.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r)));
});
function uo(e) {
  return Kr(lo, e);
}
const fo = p(`ZodNull`, (e, t) => {
  (wn.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (t, n, r) => Mi(e, t, n, r)));
});
function po(e) {
  return qr(fo, e);
}
const mo = p(`ZodAny`, (e, t) => {
  (Tn.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (e, t, n) => void 0));
});
function ho() {
  return Jr(mo);
}
const go = p(`ZodUnknown`, (e, t) => {
  (En.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (e, t, n) => void 0));
});
function _o() {
  return Yr(go);
}
const vo = p(`ZodNever`, (e, t) => {
  (Dn.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (t, n, r) => Fi(e, t, n, r)));
});
function yo(e) {
  return Xr(vo, e);
}
const bo = p(`ZodArray`, (e, t) => {
  (kn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Xi(e, t, n, r)),
    (e.element = t.element),
    Fa(e, `ZodArray`, {
      min(e, t) {
        return this.check(ri(e, t));
      },
      nonempty(e) {
        return this.check(ri(1, e));
      },
      max(e, t) {
        return this.check(ni(e, t));
      },
      length(e, t) {
        return this.check(ii(e, t));
      },
      unwrap() {
        return this.element;
      },
    }));
});
function xo(e, t) {
  return _i(bo, e, t);
}
const So = p(`ZodObject`, (e, t) => {
  (Pn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Zi(e, t, n, r)),
    _(e, `shape`, () => t.shape),
    Fa(e, `ZodObject`, {
      keyof() {
        return Io(Object.keys(this._zod.def.shape));
      },
      catchall(e) {
        return this.clone({ ...this._zod.def, catchall: e });
      },
      passthrough() {
        return this.clone({ ...this._zod.def, catchall: _o() });
      },
      loose() {
        return this.clone({ ...this._zod.def, catchall: _o() });
      },
      strict() {
        return this.clone({ ...this._zod.def, catchall: yo() });
      },
      strip() {
        return this.clone({ ...this._zod.def, catchall: void 0 });
      },
      extend(e) {
        return Ce(this, e);
      },
      safeExtend(e) {
        return we(this, e);
      },
      merge(e) {
        return Te(this, e);
      },
      pick(e) {
        return xe(this, e);
      },
      omit(e) {
        return Se(this, e);
      },
      partial(...e) {
        return Ee(Vo, this, e[0]);
      },
      required(...e) {
        return De(Zo, this, e[0]);
      },
    }));
});
function Co(e, t) {
  return new So({ type: `object`, shape: e ?? {}, ...y(t) });
}
function wo(e, t) {
  return new So({ type: `object`, shape: e, catchall: _o(), ...y(t) });
}
const To = p(`ZodUnion`, (e, t) => {
  (In.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Qi(e, t, n, r)),
    (e.options = t.options));
});
function Eo(e, t) {
  return new To({ type: `union`, options: e, ...y(t) });
}
const Do = p(`ZodDiscriminatedUnion`, (e, t) => {
  (To.init(e, t), Ln.init(e, t));
});
function Oo(e, t, n) {
  return new Do({ type: `union`, options: t, discriminator: e, ...y(n) });
}
const ko = p(`ZodIntersection`, (e, t) => {
  (Rn.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (t, n, r) => $i(e, t, n, r)));
});
function Ao(e, t) {
  return new ko({ type: `intersection`, left: e, right: t });
}
const jo = p(`ZodTuple`, (e, t) => {
  (Vn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ea(e, t, n, r)),
    (e.rest = (t) => e.clone({ ...e._zod.def, rest: t })));
});
function Mo(e, t, n) {
  let r = t instanceof C;
  return new jo({ type: `tuple`, items: e, rest: r ? t : null, ...y(r ? n : t) });
}
const No = p(`ZodRecord`, (e, t) => {
  (Gn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ta(e, t, n, r)),
    (e.keyType = t.keyType),
    (e.valueType = t.valueType));
});
function Po(e, t, n) {
  return !t || !t._zod
    ? new No({ type: `record`, keyType: Ra(), valueType: e, ...y(t) })
    : new No({ type: `record`, keyType: e, valueType: t, ...y(n) });
}
const Fo = p(`ZodEnum`, (e, t) => {
  (Kn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => zi(e, t, n, r)),
    (e.enum = t.entries),
    (e.options = Object.values(t.entries)));
  let n = new Set(Object.keys(t.entries));
  ((e.extract = (e, r) => {
    let i = {};
    for (let r of e)
      if (n.has(r)) i[r] = t.entries[r];
      else throw Error(`Key ${r} not found in enum`);
    return new Fo({ ...t, checks: [], ...y(r), entries: i });
  }),
    (e.exclude = (e, r) => {
      let i = { ...t.entries };
      for (let t of e)
        if (n.has(t)) delete i[t];
        else throw Error(`Key ${t} not found in enum`);
      return new Fo({ ...t, checks: [], ...y(r), entries: i });
    }));
});
function Io(e, t) {
  return new Fo({
    type: `enum`,
    entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
    ...y(t),
  });
}
const Lo = p(`ZodLiteral`, (e, t) => {
  (qn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Bi(e, t, n, r)),
    (e.values = new Set(t.values)),
    Object.defineProperty(e, "value", {
      get() {
        if (t.values.length > 1)
          throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
        return t.values[0];
      },
    }));
});
function Ro(e, t) {
  return new Lo({ type: `literal`, values: Array.isArray(e) ? e : [e], ...y(t) });
}
const zo = p(`ZodTransform`, (e, t) => {
  (Jn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => qi(e, t, n, r)),
    (e._zod.parse = (n, r) => {
      if (r.direction === `backward`) throw new h(e.constructor.name);
      n.addIssue = (r) => {
        if (typeof r == `string`) n.issues.push(Me(r, n.value, t));
        else {
          let t = r;
          (t.fatal && (t.continue = !1),
            (t.code ??= `custom`),
            (t.input ??= n.value),
            (t.inst ??= e),
            n.issues.push(Me(t)));
        }
      };
      let i = t.transform(n.value, n);
      return i instanceof Promise
        ? i.then((e) => ((n.value = e), (n.fallback = !0), n))
        : ((n.value = i), (n.fallback = !0), n);
    }));
});
function Bo(e) {
  return new zo({ type: `transform`, transform: e });
}
const Vo = p(`ZodOptional`, (e, t) => {
  (Xn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ua(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function Ho(e) {
  return new Vo({ type: `optional`, innerType: e });
}
const Uo = p(`ZodExactOptional`, (e, t) => {
  (Zn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ua(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function Wo(e) {
  return new Uo({ type: `optional`, innerType: e });
}
const Go = p(`ZodNullable`, (e, t) => {
  (Qn.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => na(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function Ko(e) {
  return new Go({ type: `nullable`, innerType: e });
}
const qo = p(`ZodDefault`, (e, t) => {
  ($n.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ia(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap));
});
function Jo(e, t) {
  return new qo({
    type: `default`,
    innerType: e,
    get defaultValue() {
      return typeof t == `function` ? t() : he(t);
    },
  });
}
const Yo = p(`ZodPrefault`, (e, t) => {
  (tr.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => aa(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function Xo(e, t) {
  return new Yo({
    type: `prefault`,
    innerType: e,
    get defaultValue() {
      return typeof t == `function` ? t() : he(t);
    },
  });
}
const Zo = p(`ZodNonOptional`, (e, t) => {
  (nr.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ra(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function Qo(e, t) {
  return new Zo({ type: `nonoptional`, innerType: e, ...y(t) });
}
const $o = p(`ZodCatch`, (e, t) => {
  (ir.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => oa(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap));
});
function es(e, t) {
  return new $o({ type: `catch`, innerType: e, catchValue: typeof t == `function` ? t : () => t });
}
const ts = p(`ZodPipe`, (e, t) => {
  (ar.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => sa(e, t, n, r)),
    (e.in = t.in),
    (e.out = t.out));
});
function ns(e, t) {
  return new ts({ type: `pipe`, in: e, out: t });
}
const rs = p(`ZodReadonly`, (e, t) => {
  (sr.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ca(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function is(e) {
  return new rs({ type: `readonly`, innerType: e });
}
const as = p(`ZodLazy`, (e, t) => {
  (lr.init(e, t),
    O.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => da(e, t, n, r)),
    (e.unwrap = () => e._zod.def.getter()));
});
function os(e) {
  return new as({ type: `lazy`, getter: e });
}
const ss = p(`ZodCustom`, (e, t) => {
  (ur.init(e, t), O.init(e, t), (e._zod.processJSONSchema = (t, n, r) => Gi(e, t, n, r)));
});
function cs(e, t = {}) {
  return vi(ss, e, t);
}
function ls(e, t) {
  return yi(e, t);
}
var A;
(function (e) {
  e.assertEqual = (e) => {};
  function t(e) {}
  e.assertIs = t;
  function n(e) {
    throw Error();
  }
  ((e.assertNever = n),
    (e.arrayToEnum = (e) => {
      let t = {};
      for (let n of e) t[n] = n;
      return t;
    }),
    (e.getValidEnumValues = (t) => {
      let n = e.objectKeys(t).filter((e) => typeof t[t[e]] != `number`),
        r = {};
      for (let e of n) r[e] = t[e];
      return e.objectValues(r);
    }),
    (e.objectValues = (t) =>
      e.objectKeys(t).map(function (e) {
        return t[e];
      })),
    (e.objectKeys =
      typeof Object.keys == `function`
        ? (e) => Object.keys(e)
        : (e) => {
            let t = [];
            for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
            return t;
          }),
    (e.find = (e, t) => {
      for (let n of e) if (t(n)) return n;
    }),
    (e.isInteger =
      typeof Number.isInteger == `function`
        ? (e) => Number.isInteger(e)
        : (e) => typeof e == `number` && Number.isFinite(e) && Math.floor(e) === e));
  function r(e, t = ` | `) {
    return e.map((e) => (typeof e == `string` ? `'${e}'` : e)).join(t);
  }
  ((e.joinValues = r),
    (e.jsonStringifyReplacer = (e, t) => (typeof t == `bigint` ? t.toString() : t)));
})((A ||= {}));
var us;
(function (e) {
  e.mergeShapes = (e, t) => ({ ...e, ...t });
})((us ||= {}));
const j = A.arrayToEnum([
    `string`,
    `nan`,
    `number`,
    `integer`,
    `float`,
    `boolean`,
    `date`,
    `bigint`,
    `symbol`,
    `function`,
    `undefined`,
    `null`,
    `array`,
    `object`,
    `unknown`,
    `promise`,
    `void`,
    `never`,
    `map`,
    `set`,
  ]),
  ds = (e) => {
    switch (typeof e) {
      case `undefined`:
        return j.undefined;
      case `string`:
        return j.string;
      case `number`:
        return Number.isNaN(e) ? j.nan : j.number;
      case `boolean`:
        return j.boolean;
      case `function`:
        return j.function;
      case `bigint`:
        return j.bigint;
      case `symbol`:
        return j.symbol;
      case `object`:
        return Array.isArray(e)
          ? j.array
          : e === null
            ? j.null
            : e.then && typeof e.then == `function` && e.catch && typeof e.catch == `function`
              ? j.promise
              : typeof Map < `u` && e instanceof Map
                ? j.map
                : typeof Set < `u` && e instanceof Set
                  ? j.set
                  : typeof Date < `u` && e instanceof Date
                    ? j.date
                    : j.object;
      default:
        return j.unknown;
    }
  },
  M = A.arrayToEnum([
    `invalid_type`,
    `invalid_literal`,
    `custom`,
    `invalid_union`,
    `invalid_union_discriminator`,
    `invalid_enum_value`,
    `unrecognized_keys`,
    `invalid_arguments`,
    `invalid_return_type`,
    `invalid_date`,
    `invalid_string`,
    `too_small`,
    `too_big`,
    `invalid_intersection_types`,
    `not_multiple_of`,
    `not_finite`,
  ]);
var N = class e extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    (super(),
      (this.issues = []),
      (this.addIssue = (e) => {
        this.issues = [...this.issues, e];
      }),
      (this.addIssues = (e = []) => {
        this.issues = [...this.issues, ...e];
      }));
    let t = new.target.prototype;
    (Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : (this.__proto__ = t),
      (this.name = `ZodError`),
      (this.issues = e));
  }
  format(e) {
    let t =
        e ||
        function (e) {
          return e.message;
        },
      n = { _errors: [] },
      r = (e) => {
        for (let i of e.issues)
          if (i.code === `invalid_union`) i.unionErrors.map(r);
          else if (i.code === `invalid_return_type`) r(i.returnTypeError);
          else if (i.code === `invalid_arguments`) r(i.argumentsError);
          else if (i.path.length === 0) n._errors.push(t(i));
          else {
            let e = n,
              r = 0;
            for (; r < i.path.length;) {
              let n = i.path[r];
              (r === i.path.length - 1
                ? ((e[n] = e[n] || { _errors: [] }), e[n]._errors.push(t(i)))
                : (e[n] = e[n] || { _errors: [] }),
                (e = e[n]),
                r++);
            }
          }
      };
    return (r(this), n);
  }
  static assert(t) {
    if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, A.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (e) => e.message) {
    let t = Object.create(null),
      n = [];
    for (let r of this.issues)
      if (r.path.length > 0) {
        let n = r.path[0];
        ((t[n] = t[n] || []), t[n].push(e(r)));
      } else n.push(e(r));
    return { formErrors: n, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
};
N.create = (e) => new N(e);
const fs = (e, t) => {
  let n;
  switch (e.code) {
    case M.invalid_type:
      n =
        e.received === j.undefined ? `Required` : `Expected ${e.expected}, received ${e.received}`;
      break;
    case M.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, A.jsonStringifyReplacer)}`;
      break;
    case M.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${A.joinValues(e.keys, `, `)}`;
      break;
    case M.invalid_union:
      n = `Invalid input`;
      break;
    case M.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${A.joinValues(e.options)}`;
      break;
    case M.invalid_enum_value:
      n = `Invalid enum value. Expected ${A.joinValues(e.options)}, received '${e.received}'`;
      break;
    case M.invalid_arguments:
      n = `Invalid function arguments`;
      break;
    case M.invalid_return_type:
      n = `Invalid function return type`;
      break;
    case M.invalid_date:
      n = `Invalid date`;
      break;
    case M.invalid_string:
      typeof e.validation == `object`
        ? `includes` in e.validation
          ? ((n = `Invalid input: must include "${e.validation.includes}"`),
            typeof e.validation.position == `number` &&
              (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
          : `startsWith` in e.validation
            ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
            : `endsWith` in e.validation
              ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
              : A.assertNever(e.validation)
        : (n = e.validation === `regex` ? `Invalid` : `Invalid ${e.validation}`);
      break;
    case M.too_small:
      n =
        e.type === `array`
          ? `Array must contain ${e.exact ? `exactly` : e.inclusive ? `at least` : `more than`} ${e.minimum} element(s)`
          : e.type === `string`
            ? `String must contain ${e.exact ? `exactly` : e.inclusive ? `at least` : `over`} ${e.minimum} character(s)`
            : e.type === `number` || e.type === `bigint`
              ? `Number must be ${e.exact ? `exactly equal to ` : e.inclusive ? `greater than or equal to ` : `greater than `}${e.minimum}`
              : e.type === `date`
                ? `Date must be ${e.exact ? `exactly equal to ` : e.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(e.minimum))}`
                : `Invalid input`;
      break;
    case M.too_big:
      n =
        e.type === `array`
          ? `Array must contain ${e.exact ? `exactly` : e.inclusive ? `at most` : `less than`} ${e.maximum} element(s)`
          : e.type === `string`
            ? `String must contain ${e.exact ? `exactly` : e.inclusive ? `at most` : `under`} ${e.maximum} character(s)`
            : e.type === `number`
              ? `Number must be ${e.exact ? `exactly` : e.inclusive ? `less than or equal to` : `less than`} ${e.maximum}`
              : e.type === `bigint`
                ? `BigInt must be ${e.exact ? `exactly` : e.inclusive ? `less than or equal to` : `less than`} ${e.maximum}`
                : e.type === `date`
                  ? `Date must be ${e.exact ? `exactly` : e.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(e.maximum))}`
                  : `Invalid input`;
      break;
    case M.custom:
      n = `Invalid input`;
      break;
    case M.invalid_intersection_types:
      n = `Intersection results could not be merged`;
      break;
    case M.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case M.not_finite:
      n = `Number must be finite`;
      break;
    default:
      ((n = t.defaultError), A.assertNever(e));
  }
  return { message: n };
};
let ps = fs;
function ms() {
  return ps;
}
const hs = (e) => {
  let { data: t, path: n, errorMaps: r, issueData: i } = e,
    a = [...n, ...(i.path || [])],
    o = { ...i, path: a };
  if (i.message !== void 0) return { ...i, path: a, message: i.message };
  let s = ``,
    c = r
      .filter((e) => !!e)
      .slice()
      .reverse();
  for (let e of c) s = e(o, { data: t, defaultError: s }).message;
  return { ...i, path: a, message: s };
};
function P(e, t) {
  let n = ms(),
    r = hs({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, n, n === fs ? void 0 : fs].filter(
        (e) => !!e,
      ),
    });
  e.common.issues.push(r);
}
var F = class e {
  constructor() {
    this.value = `valid`;
  }
  dirty() {
    this.value === `valid` && (this.value = `dirty`);
  }
  abort() {
    this.value !== `aborted` && (this.value = `aborted`);
  }
  static mergeArray(e, t) {
    let n = [];
    for (let r of t) {
      if (r.status === `aborted`) return I;
      (r.status === `dirty` && e.dirty(), n.push(r.value));
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(t, n) {
    let r = [];
    for (let e of n) {
      let t = await e.key,
        n = await e.value;
      r.push({ key: t, value: n });
    }
    return e.mergeObjectSync(t, r);
  }
  static mergeObjectSync(e, t) {
    let n = {};
    for (let r of t) {
      let { key: t, value: i } = r;
      if (t.status === `aborted` || i.status === `aborted`) return I;
      (t.status === `dirty` && e.dirty(),
        i.status === `dirty` && e.dirty(),
        t.value !== `__proto__` && (i.value !== void 0 || r.alwaysSet) && (n[t.value] = i.value));
    }
    return { status: e.value, value: n };
  }
};
const I = Object.freeze({ status: `aborted` }),
  gs = (e) => ({ status: `dirty`, value: e }),
  L = (e) => ({ status: `valid`, value: e }),
  _s = (e) => e.status === `aborted`,
  vs = (e) => e.status === `dirty`,
  ys = (e) => e.status === `valid`,
  bs = (e) => typeof Promise < `u` && e instanceof Promise;
var R;
(function (e) {
  ((e.errToObj = (e) => (typeof e == `string` ? { message: e } : e || {})),
    (e.toString = (e) => (typeof e == `string` ? e : e?.message)));
})((R ||= {}));
var z = class {
  constructor(e, t, n, r) {
    ((this._cachedPath = []),
      (this.parent = e),
      (this.data = t),
      (this._path = n),
      (this._key = r));
  }
  get path() {
    return (
      this._cachedPath.length ||
        (Array.isArray(this._key)
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
};
const xs = (e, t) => {
  if (ys(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length) throw Error(`Validation failed but no issues detected.`);
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      let t = new N(e.common.issues);
      return ((this._error = t), this._error);
    },
  };
};
function B(e) {
  if (!e) return {};
  let { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
  if (t && (n || r))
    throw Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return t
    ? { errorMap: t, description: i }
    : {
        errorMap: (t, i) => {
          let { message: a } = e;
          return t.code === `invalid_enum_value`
            ? { message: a ?? i.defaultError }
            : i.data === void 0
              ? { message: a ?? r ?? i.defaultError }
              : t.code === `invalid_type`
                ? { message: a ?? n ?? i.defaultError }
                : { message: i.defaultError };
        },
        description: i,
      };
}
var V = class {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return ds(e.data);
  }
  _getOrReturnCtx(e, t) {
    return (
      t || {
        common: e.parent.common,
        data: e.data,
        parsedType: ds(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new F(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: ds(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    let t = this._parse(e);
    if (bs(t)) throw Error(`Synchronous parse encountered promise.`);
    return t;
  }
  _parseAsync(e) {
    let t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    let n = this.safeParse(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  safeParse(e, t) {
    let n = {
      common: { issues: [], async: t?.async ?? !1, contextualErrorMap: t?.errorMap },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: ds(e),
    };
    return xs(n, this._parseSync({ data: e, path: n.path, parent: n }));
  }
  "~validate"(e) {
    let t = {
      common: { issues: [], async: !!this[`~standard`].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: ds(e),
    };
    if (!this[`~standard`].async)
      try {
        let n = this._parseSync({ data: e, path: [], parent: t });
        return ys(n) ? { value: n.value } : { issues: t.common.issues };
      } catch (e) {
        (e?.message?.toLowerCase()?.includes(`encountered`) && (this[`~standard`].async = !0),
          (t.common = { issues: [], async: !0 }));
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then((e) =>
      ys(e) ? { value: e.value } : { issues: t.common.issues },
    );
  }
  async parseAsync(e, t) {
    let n = await this.safeParseAsync(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  async safeParseAsync(e, t) {
    let n = {
        common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
        path: t?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: ds(e),
      },
      r = this._parse({ data: e, path: n.path, parent: n });
    return xs(n, await (bs(r) ? r : Promise.resolve(r)));
  }
  refine(e, t) {
    let n = (e) =>
      typeof t == `string` || t === void 0 ? { message: t } : typeof t == `function` ? t(e) : t;
    return this._refinement((t, r) => {
      let i = e(t),
        a = () => r.addIssue({ code: M.custom, ...n(t) });
      return typeof Promise < `u` && i instanceof Promise
        ? i.then((e) => (e ? !0 : (a(), !1)))
        : i
          ? !0
          : (a(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((n, r) =>
      e(n) ? !0 : (r.addIssue(typeof t == `function` ? t(n, r) : t), !1),
    );
  }
  _refinement(e) {
    return new G({
      schema: this,
      typeName: q.ZodEffects,
      effect: { type: `refinement`, refinement: e },
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    ((this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this[`~standard`] = { version: 1, vendor: `zod`, validate: (e) => this[`~validate`](e) }));
  }
  optional() {
    return K.create(this, this._def);
  }
  nullable() {
    return bc.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return rc.create(this);
  }
  promise() {
    return yc.create(this, this._def);
  }
  or(e) {
    return ac.create([this, e], this._def);
  }
  and(e) {
    return cc.create(this, e, this._def);
  }
  transform(e) {
    return new G({
      ...B(this._def),
      schema: this,
      typeName: q.ZodEffects,
      effect: { type: `transform`, transform: e },
    });
  }
  default(e) {
    let t = typeof e == `function` ? e : () => e;
    return new xc({ ...B(this._def), innerType: this, defaultValue: t, typeName: q.ZodDefault });
  }
  brand() {
    return new wc({ typeName: q.ZodBranded, type: this, ...B(this._def) });
  }
  catch(e) {
    let t = typeof e == `function` ? e : () => e;
    return new Sc({ ...B(this._def), innerType: this, catchValue: t, typeName: q.ZodCatch });
  }
  describe(e) {
    let t = this.constructor;
    return new t({ ...this._def, description: e });
  }
  pipe(e) {
    return Tc.create(this, e);
  }
  readonly() {
    return Ec.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
const Ss = /^c[^\s-]{8,}$/i,
  Cs = /^[0-9a-z]+$/,
  ws = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  Ts = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  Es = /^[a-z0-9_-]{21}$/i,
  Ds = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  Os =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  ks = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
let As;
const js =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Ms =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  Ns =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  Ps =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  Fs = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Is = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  Ls = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`,
  Rs = RegExp(`^${Ls}$`);
function zs(e) {
  let t = `[0-5]\\d`;
  e.precision ? (t = `${t}\\.\\d{${e.precision}}`) : (e.precision ?? (t = `${t}(\\.\\d+)?`));
  let n = e.precision ? `+` : `?`;
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function Bs(e) {
  return RegExp(`^${zs(e)}$`);
}
function Vs(e) {
  let t = `${Ls}T${zs(e)}`,
    n = [];
  return (
    n.push(e.local ? `Z?` : `Z`),
    e.offset && n.push(`([+-]\\d{2}:?\\d{2})`),
    (t = `${t}(${n.join(`|`)})`),
    RegExp(`^${t}$`)
  );
}
function Hs(e, t) {
  return !!(((t === `v4` || !t) && js.test(e)) || ((t === `v6` || !t) && Ns.test(e)));
}
function Us(e, t) {
  if (!Ds.test(e)) return !1;
  try {
    let [n] = e.split(`.`);
    if (!n) return !1;
    let r = n
        .replace(/-/g, `+`)
        .replace(/_/g, `/`)
        .padEnd(n.length + ((4 - (n.length % 4)) % 4), `=`),
      i = JSON.parse(atob(r));
    return !(
      typeof i != `object` ||
      !i ||
      (`typ` in i && i?.typ !== `JWT`) ||
      !i.alg ||
      (t && i.alg !== t)
    );
  } catch {
    return !1;
  }
}
function Ws(e, t) {
  return !!(((t === `v4` || !t) && Ms.test(e)) || ((t === `v6` || !t) && Ps.test(e)));
}
var Gs = class e extends V {
  _parse(e) {
    if ((this._def.coerce && (e.data = String(e.data)), this._getType(e) !== j.string)) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.string, received: t.parsedType }), I);
    }
    let t = new F(),
      n;
    for (let r of this._def.checks)
      if (r.kind === `min`)
        e.data.length < r.value &&
          ((n = this._getOrReturnCtx(e, n)),
          P(n, {
            code: M.too_small,
            minimum: r.value,
            type: `string`,
            inclusive: !0,
            exact: !1,
            message: r.message,
          }),
          t.dirty());
      else if (r.kind === `max`)
        e.data.length > r.value &&
          ((n = this._getOrReturnCtx(e, n)),
          P(n, {
            code: M.too_big,
            maximum: r.value,
            type: `string`,
            inclusive: !0,
            exact: !1,
            message: r.message,
          }),
          t.dirty());
      else if (r.kind === `length`) {
        let i = e.data.length > r.value,
          a = e.data.length < r.value;
        (i || a) &&
          ((n = this._getOrReturnCtx(e, n)),
          i
            ? P(n, {
                code: M.too_big,
                maximum: r.value,
                type: `string`,
                inclusive: !0,
                exact: !0,
                message: r.message,
              })
            : a &&
              P(n, {
                code: M.too_small,
                minimum: r.value,
                type: `string`,
                inclusive: !0,
                exact: !0,
                message: r.message,
              }),
          t.dirty());
      } else if (r.kind === `email`)
        ks.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          P(n, { validation: `email`, code: M.invalid_string, message: r.message }),
          t.dirty());
      else if (r.kind === `emoji`)
        ((As ||= RegExp(`^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`, `u`)),
          As.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            P(n, { validation: `emoji`, code: M.invalid_string, message: r.message }),
            t.dirty()));
      else if (r.kind === `uuid`)
        Ts.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          P(n, { validation: `uuid`, code: M.invalid_string, message: r.message }),
          t.dirty());
      else if (r.kind === `nanoid`)
        Es.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          P(n, { validation: `nanoid`, code: M.invalid_string, message: r.message }),
          t.dirty());
      else if (r.kind === `cuid`)
        Ss.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          P(n, { validation: `cuid`, code: M.invalid_string, message: r.message }),
          t.dirty());
      else if (r.kind === `cuid2`)
        Cs.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          P(n, { validation: `cuid2`, code: M.invalid_string, message: r.message }),
          t.dirty());
      else if (r.kind === `ulid`)
        ws.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          P(n, { validation: `ulid`, code: M.invalid_string, message: r.message }),
          t.dirty());
      else if (r.kind === `url`)
        try {
          new URL(e.data);
        } catch {
          ((n = this._getOrReturnCtx(e, n)),
            P(n, { validation: `url`, code: M.invalid_string, message: r.message }),
            t.dirty());
        }
      else
        r.kind === `regex`
          ? ((r.regex.lastIndex = 0),
            r.regex.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              P(n, { validation: `regex`, code: M.invalid_string, message: r.message }),
              t.dirty()))
          : r.kind === `trim`
            ? (e.data = e.data.trim())
            : r.kind === `includes`
              ? e.data.includes(r.value, r.position) ||
                ((n = this._getOrReturnCtx(e, n)),
                P(n, {
                  code: M.invalid_string,
                  validation: { includes: r.value, position: r.position },
                  message: r.message,
                }),
                t.dirty())
              : r.kind === `toLowerCase`
                ? (e.data = e.data.toLowerCase())
                : r.kind === `toUpperCase`
                  ? (e.data = e.data.toUpperCase())
                  : r.kind === `startsWith`
                    ? e.data.startsWith(r.value) ||
                      ((n = this._getOrReturnCtx(e, n)),
                      P(n, {
                        code: M.invalid_string,
                        validation: { startsWith: r.value },
                        message: r.message,
                      }),
                      t.dirty())
                    : r.kind === `endsWith`
                      ? e.data.endsWith(r.value) ||
                        ((n = this._getOrReturnCtx(e, n)),
                        P(n, {
                          code: M.invalid_string,
                          validation: { endsWith: r.value },
                          message: r.message,
                        }),
                        t.dirty())
                      : r.kind === `datetime`
                        ? Vs(r).test(e.data) ||
                          ((n = this._getOrReturnCtx(e, n)),
                          P(n, {
                            code: M.invalid_string,
                            validation: `datetime`,
                            message: r.message,
                          }),
                          t.dirty())
                        : r.kind === `date`
                          ? Rs.test(e.data) ||
                            ((n = this._getOrReturnCtx(e, n)),
                            P(n, {
                              code: M.invalid_string,
                              validation: `date`,
                              message: r.message,
                            }),
                            t.dirty())
                          : r.kind === `time`
                            ? Bs(r).test(e.data) ||
                              ((n = this._getOrReturnCtx(e, n)),
                              P(n, {
                                code: M.invalid_string,
                                validation: `time`,
                                message: r.message,
                              }),
                              t.dirty())
                            : r.kind === `duration`
                              ? Os.test(e.data) ||
                                ((n = this._getOrReturnCtx(e, n)),
                                P(n, {
                                  validation: `duration`,
                                  code: M.invalid_string,
                                  message: r.message,
                                }),
                                t.dirty())
                              : r.kind === `ip`
                                ? Hs(e.data, r.version) ||
                                  ((n = this._getOrReturnCtx(e, n)),
                                  P(n, {
                                    validation: `ip`,
                                    code: M.invalid_string,
                                    message: r.message,
                                  }),
                                  t.dirty())
                                : r.kind === `jwt`
                                  ? Us(e.data, r.alg) ||
                                    ((n = this._getOrReturnCtx(e, n)),
                                    P(n, {
                                      validation: `jwt`,
                                      code: M.invalid_string,
                                      message: r.message,
                                    }),
                                    t.dirty())
                                  : r.kind === `cidr`
                                    ? Ws(e.data, r.version) ||
                                      ((n = this._getOrReturnCtx(e, n)),
                                      P(n, {
                                        validation: `cidr`,
                                        code: M.invalid_string,
                                        message: r.message,
                                      }),
                                      t.dirty())
                                    : r.kind === `base64`
                                      ? Fs.test(e.data) ||
                                        ((n = this._getOrReturnCtx(e, n)),
                                        P(n, {
                                          validation: `base64`,
                                          code: M.invalid_string,
                                          message: r.message,
                                        }),
                                        t.dirty())
                                      : r.kind === `base64url`
                                        ? Is.test(e.data) ||
                                          ((n = this._getOrReturnCtx(e, n)),
                                          P(n, {
                                            validation: `base64url`,
                                            code: M.invalid_string,
                                            message: r.message,
                                          }),
                                          t.dirty())
                                        : A.assertNever(r);
    return { status: t.value, value: e.data };
  }
  _regex(e, t, n) {
    return this.refinement((t) => e.test(t), {
      validation: t,
      code: M.invalid_string,
      ...R.errToObj(n),
    });
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] });
  }
  email(e) {
    return this._addCheck({ kind: `email`, ...R.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: `url`, ...R.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: `emoji`, ...R.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: `uuid`, ...R.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: `nanoid`, ...R.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: `cuid`, ...R.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: `cuid2`, ...R.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: `ulid`, ...R.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: `base64`, ...R.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({ kind: `base64url`, ...R.errToObj(e) });
  }
  jwt(e) {
    return this._addCheck({ kind: `jwt`, ...R.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: `ip`, ...R.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: `cidr`, ...R.errToObj(e) });
  }
  datetime(e) {
    return typeof e == `string`
      ? this._addCheck({ kind: `datetime`, precision: null, offset: !1, local: !1, message: e })
      : this._addCheck({
          kind: `datetime`,
          precision: e?.precision === void 0 ? null : e?.precision,
          offset: e?.offset ?? !1,
          local: e?.local ?? !1,
          ...R.errToObj(e?.message),
        });
  }
  date(e) {
    return this._addCheck({ kind: `date`, message: e });
  }
  time(e) {
    return typeof e == `string`
      ? this._addCheck({ kind: `time`, precision: null, message: e })
      : this._addCheck({
          kind: `time`,
          precision: e?.precision === void 0 ? null : e?.precision,
          ...R.errToObj(e?.message),
        });
  }
  duration(e) {
    return this._addCheck({ kind: `duration`, ...R.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({ kind: `regex`, regex: e, ...R.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: `includes`,
      value: e,
      position: t?.position,
      ...R.errToObj(t?.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: `startsWith`, value: e, ...R.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: `endsWith`, value: e, ...R.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: `min`, value: e, ...R.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: `max`, value: e, ...R.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: `length`, value: e, ...R.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, R.errToObj(e));
  }
  trim() {
    return new e({ ...this._def, checks: [...this._def.checks, { kind: `trim` }] });
  }
  toLowerCase() {
    return new e({ ...this._def, checks: [...this._def.checks, { kind: `toLowerCase` }] });
  }
  toUpperCase() {
    return new e({ ...this._def, checks: [...this._def.checks, { kind: `toUpperCase` }] });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === `datetime`);
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === `date`);
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === `time`);
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === `duration`);
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === `email`);
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === `url`);
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === `emoji`);
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === `uuid`);
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === `nanoid`);
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === `cuid`);
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === `cuid2`);
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === `ulid`);
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === `ip`);
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === `cidr`);
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === `base64`);
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === `base64url`);
  }
  get minLength() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `min` && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `max` && (e === null || t.value < e) && (e = t.value);
    return e;
  }
};
Gs.create = (e) => new Gs({ checks: [], typeName: q.ZodString, coerce: e?.coerce ?? !1, ...B(e) });
function Ks(e, t) {
  let n = (e.toString().split(`.`)[1] || ``).length,
    r = (t.toString().split(`.`)[1] || ``).length,
    i = n > r ? n : r;
  return (
    (Number.parseInt(e.toFixed(i).replace(`.`, ``)) %
      Number.parseInt(t.toFixed(i).replace(`.`, ``))) /
    10 ** i
  );
}
var qs = class e extends V {
  constructor() {
    (super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf));
  }
  _parse(e) {
    if ((this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== j.number)) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.number, received: t.parsedType }), I);
    }
    let t,
      n = new F();
    for (let r of this._def.checks)
      r.kind === `int`
        ? A.isInteger(e.data) ||
          ((t = this._getOrReturnCtx(e, t)),
          P(t, {
            code: M.invalid_type,
            expected: `integer`,
            received: `float`,
            message: r.message,
          }),
          n.dirty())
        : r.kind === `min`
          ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            P(t, {
              code: M.too_small,
              minimum: r.value,
              type: `number`,
              inclusive: r.inclusive,
              exact: !1,
              message: r.message,
            }),
            n.dirty())
          : r.kind === `max`
            ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
              ((t = this._getOrReturnCtx(e, t)),
              P(t, {
                code: M.too_big,
                maximum: r.value,
                type: `number`,
                inclusive: r.inclusive,
                exact: !1,
                message: r.message,
              }),
              n.dirty())
            : r.kind === `multipleOf`
              ? Ks(e.data, r.value) !== 0 &&
                ((t = this._getOrReturnCtx(e, t)),
                P(t, { code: M.not_multiple_of, multipleOf: r.value, message: r.message }),
                n.dirty())
              : r.kind === `finite`
                ? Number.isFinite(e.data) ||
                  ((t = this._getOrReturnCtx(e, t)),
                  P(t, { code: M.not_finite, message: r.message }),
                  n.dirty())
                : A.assertNever(r);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit(`min`, e, !0, R.toString(t));
  }
  gt(e, t) {
    return this.setLimit(`min`, e, !1, R.toString(t));
  }
  lte(e, t) {
    return this.setLimit(`max`, e, !0, R.toString(t));
  }
  lt(e, t) {
    return this.setLimit(`max`, e, !1, R.toString(t));
  }
  setLimit(t, n, r, i) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: t, value: n, inclusive: r, message: R.toString(i) }],
    });
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] });
  }
  int(e) {
    return this._addCheck({ kind: `int`, message: R.toString(e) });
  }
  positive(e) {
    return this._addCheck({ kind: `min`, value: 0, inclusive: !1, message: R.toString(e) });
  }
  negative(e) {
    return this._addCheck({ kind: `max`, value: 0, inclusive: !1, message: R.toString(e) });
  }
  nonpositive(e) {
    return this._addCheck({ kind: `max`, value: 0, inclusive: !0, message: R.toString(e) });
  }
  nonnegative(e) {
    return this._addCheck({ kind: `min`, value: 0, inclusive: !0, message: R.toString(e) });
  }
  multipleOf(e, t) {
    return this._addCheck({ kind: `multipleOf`, value: e, message: R.toString(t) });
  }
  finite(e) {
    return this._addCheck({ kind: `finite`, message: R.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: `min`,
      inclusive: !0,
      value: -(2 ** 53 - 1),
      message: R.toString(e),
    })._addCheck({ kind: `max`, inclusive: !0, value: 2 ** 53 - 1, message: R.toString(e) });
  }
  get minValue() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `min` && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `max` && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) => e.kind === `int` || (e.kind === `multipleOf` && A.isInteger(e.value)),
    );
  }
  get isFinite() {
    let e = null,
      t = null;
    for (let n of this._def.checks)
      if (n.kind === `finite` || n.kind === `int` || n.kind === `multipleOf`) return !0;
      else
        n.kind === `min`
          ? (t === null || n.value > t) && (t = n.value)
          : n.kind === `max` && (e === null || n.value < e) && (e = n.value);
    return Number.isFinite(t) && Number.isFinite(e);
  }
};
qs.create = (e) => new qs({ checks: [], typeName: q.ZodNumber, coerce: e?.coerce || !1, ...B(e) });
var Js = class e extends V {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte));
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== j.bigint) return this._getInvalidInput(e);
    let t,
      n = new F();
    for (let r of this._def.checks)
      r.kind === `min`
        ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          P(t, {
            code: M.too_small,
            type: `bigint`,
            minimum: r.value,
            inclusive: r.inclusive,
            message: r.message,
          }),
          n.dirty())
        : r.kind === `max`
          ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            P(t, {
              code: M.too_big,
              type: `bigint`,
              maximum: r.value,
              inclusive: r.inclusive,
              message: r.message,
            }),
            n.dirty())
          : r.kind === `multipleOf`
            ? e.data % r.value !== BigInt(0) &&
              ((t = this._getOrReturnCtx(e, t)),
              P(t, { code: M.not_multiple_of, multipleOf: r.value, message: r.message }),
              n.dirty())
            : A.assertNever(r);
    return { status: n.value, value: e.data };
  }
  _getInvalidInput(e) {
    let t = this._getOrReturnCtx(e);
    return (P(t, { code: M.invalid_type, expected: j.bigint, received: t.parsedType }), I);
  }
  gte(e, t) {
    return this.setLimit(`min`, e, !0, R.toString(t));
  }
  gt(e, t) {
    return this.setLimit(`min`, e, !1, R.toString(t));
  }
  lte(e, t) {
    return this.setLimit(`max`, e, !0, R.toString(t));
  }
  lt(e, t) {
    return this.setLimit(`max`, e, !1, R.toString(t));
  }
  setLimit(t, n, r, i) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: t, value: n, inclusive: r, message: R.toString(i) }],
    });
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] });
  }
  positive(e) {
    return this._addCheck({ kind: `min`, value: BigInt(0), inclusive: !1, message: R.toString(e) });
  }
  negative(e) {
    return this._addCheck({ kind: `max`, value: BigInt(0), inclusive: !1, message: R.toString(e) });
  }
  nonpositive(e) {
    return this._addCheck({ kind: `max`, value: BigInt(0), inclusive: !0, message: R.toString(e) });
  }
  nonnegative(e) {
    return this._addCheck({ kind: `min`, value: BigInt(0), inclusive: !0, message: R.toString(e) });
  }
  multipleOf(e, t) {
    return this._addCheck({ kind: `multipleOf`, value: e, message: R.toString(t) });
  }
  get minValue() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `min` && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `max` && (e === null || t.value < e) && (e = t.value);
    return e;
  }
};
Js.create = (e) => new Js({ checks: [], typeName: q.ZodBigInt, coerce: e?.coerce ?? !1, ...B(e) });
var Ys = class extends V {
  _parse(e) {
    if ((this._def.coerce && (e.data = !!e.data), this._getType(e) !== j.boolean)) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.boolean, received: t.parsedType }), I);
    }
    return L(e.data);
  }
};
Ys.create = (e) => new Ys({ typeName: q.ZodBoolean, coerce: e?.coerce || !1, ...B(e) });
var Xs = class e extends V {
  _parse(e) {
    if ((this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== j.date)) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.date, received: t.parsedType }), I);
    }
    if (Number.isNaN(e.data.getTime()))
      return (P(this._getOrReturnCtx(e), { code: M.invalid_date }), I);
    let t = new F(),
      n;
    for (let r of this._def.checks)
      r.kind === `min`
        ? e.data.getTime() < r.value &&
          ((n = this._getOrReturnCtx(e, n)),
          P(n, {
            code: M.too_small,
            message: r.message,
            inclusive: !0,
            exact: !1,
            minimum: r.value,
            type: `date`,
          }),
          t.dirty())
        : r.kind === `max`
          ? e.data.getTime() > r.value &&
            ((n = this._getOrReturnCtx(e, n)),
            P(n, {
              code: M.too_big,
              message: r.message,
              inclusive: !0,
              exact: !1,
              maximum: r.value,
              type: `date`,
            }),
            t.dirty())
          : A.assertNever(r);
    return { status: t.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] });
  }
  min(e, t) {
    return this._addCheck({ kind: `min`, value: e.getTime(), message: R.toString(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: `max`, value: e.getTime(), message: R.toString(t) });
  }
  get minDate() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `min` && (e === null || t.value > e) && (e = t.value);
    return e == null ? null : new Date(e);
  }
  get maxDate() {
    let e = null;
    for (let t of this._def.checks)
      t.kind === `max` && (e === null || t.value < e) && (e = t.value);
    return e == null ? null : new Date(e);
  }
};
Xs.create = (e) => new Xs({ checks: [], coerce: e?.coerce || !1, typeName: q.ZodDate, ...B(e) });
var Zs = class extends V {
  _parse(e) {
    if (this._getType(e) !== j.symbol) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.symbol, received: t.parsedType }), I);
    }
    return L(e.data);
  }
};
Zs.create = (e) => new Zs({ typeName: q.ZodSymbol, ...B(e) });
var Qs = class extends V {
  _parse(e) {
    if (this._getType(e) !== j.undefined) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.undefined, received: t.parsedType }), I);
    }
    return L(e.data);
  }
};
Qs.create = (e) => new Qs({ typeName: q.ZodUndefined, ...B(e) });
var $s = class extends V {
  _parse(e) {
    if (this._getType(e) !== j.null) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.null, received: t.parsedType }), I);
    }
    return L(e.data);
  }
};
$s.create = (e) => new $s({ typeName: q.ZodNull, ...B(e) });
var ec = class extends V {
  constructor() {
    (super(...arguments), (this._any = !0));
  }
  _parse(e) {
    return L(e.data);
  }
};
ec.create = (e) => new ec({ typeName: q.ZodAny, ...B(e) });
var tc = class extends V {
  constructor() {
    (super(...arguments), (this._unknown = !0));
  }
  _parse(e) {
    return L(e.data);
  }
};
tc.create = (e) => new tc({ typeName: q.ZodUnknown, ...B(e) });
var H = class extends V {
  _parse(e) {
    let t = this._getOrReturnCtx(e);
    return (P(t, { code: M.invalid_type, expected: j.never, received: t.parsedType }), I);
  }
};
H.create = (e) => new H({ typeName: q.ZodNever, ...B(e) });
var nc = class extends V {
  _parse(e) {
    if (this._getType(e) !== j.undefined) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.void, received: t.parsedType }), I);
    }
    return L(e.data);
  }
};
nc.create = (e) => new nc({ typeName: q.ZodVoid, ...B(e) });
var rc = class e extends V {
  _parse(e) {
    let { ctx: t, status: n } = this._processInputParams(e),
      r = this._def;
    if (t.parsedType !== j.array)
      return (P(t, { code: M.invalid_type, expected: j.array, received: t.parsedType }), I);
    if (r.exactLength !== null) {
      let e = t.data.length > r.exactLength.value,
        i = t.data.length < r.exactLength.value;
      (e || i) &&
        (P(t, {
          code: e ? M.too_big : M.too_small,
          minimum: i ? r.exactLength.value : void 0,
          maximum: e ? r.exactLength.value : void 0,
          type: `array`,
          inclusive: !0,
          exact: !0,
          message: r.exactLength.message,
        }),
        n.dirty());
    }
    if (
      (r.minLength !== null &&
        t.data.length < r.minLength.value &&
        (P(t, {
          code: M.too_small,
          minimum: r.minLength.value,
          type: `array`,
          inclusive: !0,
          exact: !1,
          message: r.minLength.message,
        }),
        n.dirty()),
      r.maxLength !== null &&
        t.data.length > r.maxLength.value &&
        (P(t, {
          code: M.too_big,
          maximum: r.maxLength.value,
          type: `array`,
          inclusive: !0,
          exact: !1,
          message: r.maxLength.message,
        }),
        n.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((e, n) => r.type._parseAsync(new z(t, e, t.path, n))),
      ).then((e) => F.mergeArray(n, e));
    let i = [...t.data].map((e, n) => r.type._parseSync(new z(t, e, t.path, n)));
    return F.mergeArray(n, i);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new e({ ...this._def, minLength: { value: t, message: R.toString(n) } });
  }
  max(t, n) {
    return new e({ ...this._def, maxLength: { value: t, message: R.toString(n) } });
  }
  length(t, n) {
    return new e({ ...this._def, exactLength: { value: t, message: R.toString(n) } });
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
rc.create = (e, t) =>
  new rc({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: q.ZodArray,
    ...B(t),
  });
function ic(e) {
  if (e instanceof U) {
    let t = {};
    for (let n in e.shape) {
      let r = e.shape[n];
      t[n] = K.create(ic(r));
    }
    return new U({ ...e._def, shape: () => t });
  } else if (e instanceof rc) return new rc({ ...e._def, type: ic(e.element) });
  else if (e instanceof K) return K.create(ic(e.unwrap()));
  else if (e instanceof bc) return bc.create(ic(e.unwrap()));
  else if (e instanceof lc) return lc.create(e.items.map((e) => ic(e)));
  else return e;
}
var U = class e extends V {
  constructor() {
    (super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    let e = this._def.shape(),
      t = A.objectKeys(e);
    return ((this._cached = { shape: e, keys: t }), this._cached);
  }
  _parse(e) {
    if (this._getType(e) !== j.object) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.object, received: t.parsedType }), I);
    }
    let { status: t, ctx: n } = this._processInputParams(e),
      { shape: r, keys: i } = this._getCached(),
      a = [];
    if (!(this._def.catchall instanceof H && this._def.unknownKeys === `strip`))
      for (let e in n.data) i.includes(e) || a.push(e);
    let o = [];
    for (let e of i) {
      let t = r[e],
        i = n.data[e];
      o.push({
        key: { status: `valid`, value: e },
        value: t._parse(new z(n, i, n.path, e)),
        alwaysSet: e in n.data,
      });
    }
    if (this._def.catchall instanceof H) {
      let e = this._def.unknownKeys;
      if (e === `passthrough`)
        for (let e of a)
          o.push({
            key: { status: `valid`, value: e },
            value: { status: `valid`, value: n.data[e] },
          });
      else if (e === `strict`)
        a.length > 0 && (P(n, { code: M.unrecognized_keys, keys: a }), t.dirty());
      else if (e !== `strip`) throw Error(`Internal ZodObject error: invalid unknownKeys value.`);
    } else {
      let e = this._def.catchall;
      for (let t of a) {
        let r = n.data[t];
        o.push({
          key: { status: `valid`, value: t },
          value: e._parse(new z(n, r, n.path, t)),
          alwaysSet: t in n.data,
        });
      }
    }
    return n.common.async
      ? Promise.resolve()
          .then(async () => {
            let e = [];
            for (let t of o) {
              let n = await t.key,
                r = await t.value;
              e.push({ key: n, value: r, alwaysSet: t.alwaysSet });
            }
            return e;
          })
          .then((e) => F.mergeObjectSync(t, e))
      : F.mergeObjectSync(t, o);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return (
      R.errToObj,
      new e({
        ...this._def,
        unknownKeys: `strict`,
        ...(t === void 0
          ? {}
          : {
              errorMap: (e, n) => {
                let r = this._def.errorMap?.(e, n).message ?? n.defaultError;
                return e.code === `unrecognized_keys`
                  ? { message: R.errToObj(t).message ?? r }
                  : { message: r };
              },
            }),
      })
    );
  }
  strip() {
    return new e({ ...this._def, unknownKeys: `strip` });
  }
  passthrough() {
    return new e({ ...this._def, unknownKeys: `passthrough` });
  }
  extend(t) {
    return new e({ ...this._def, shape: () => ({ ...this._def.shape(), ...t }) });
  }
  merge(t) {
    return new e({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: q.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(t) {
    return new e({ ...this._def, catchall: t });
  }
  pick(t) {
    let n = {};
    for (let e of A.objectKeys(t)) t[e] && this.shape[e] && (n[e] = this.shape[e]);
    return new e({ ...this._def, shape: () => n });
  }
  omit(t) {
    let n = {};
    for (let e of A.objectKeys(this.shape)) t[e] || (n[e] = this.shape[e]);
    return new e({ ...this._def, shape: () => n });
  }
  deepPartial() {
    return ic(this);
  }
  partial(t) {
    let n = {};
    for (let e of A.objectKeys(this.shape)) {
      let r = this.shape[e];
      t && !t[e] ? (n[e] = r) : (n[e] = r.optional());
    }
    return new e({ ...this._def, shape: () => n });
  }
  required(t) {
    let n = {};
    for (let e of A.objectKeys(this.shape))
      if (t && !t[e]) n[e] = this.shape[e];
      else {
        let t = this.shape[e];
        for (; t instanceof K;) t = t._def.innerType;
        n[e] = t;
      }
    return new e({ ...this._def, shape: () => n });
  }
  keyof() {
    return gc(A.objectKeys(this.shape));
  }
};
((U.create = (e, t) =>
  new U({
    shape: () => e,
    unknownKeys: `strip`,
    catchall: H.create(),
    typeName: q.ZodObject,
    ...B(t),
  })),
  (U.strictCreate = (e, t) =>
    new U({
      shape: () => e,
      unknownKeys: `strict`,
      catchall: H.create(),
      typeName: q.ZodObject,
      ...B(t),
    })),
  (U.lazycreate = (e, t) =>
    new U({
      shape: e,
      unknownKeys: `strip`,
      catchall: H.create(),
      typeName: q.ZodObject,
      ...B(t),
    })));
var ac = class extends V {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      n = this._def.options;
    function r(e) {
      for (let t of e) if (t.result.status === `valid`) return t.result;
      for (let n of e)
        if (n.result.status === `dirty`)
          return (t.common.issues.push(...n.ctx.common.issues), n.result);
      let n = e.map((e) => new N(e.ctx.common.issues));
      return (P(t, { code: M.invalid_union, unionErrors: n }), I);
    }
    if (t.common.async)
      return Promise.all(
        n.map(async (e) => {
          let n = { ...t, common: { ...t.common, issues: [] }, parent: null };
          return { result: await e._parseAsync({ data: t.data, path: t.path, parent: n }), ctx: n };
        }),
      ).then(r);
    {
      let e,
        r = [];
      for (let i of n) {
        let n = { ...t, common: { ...t.common, issues: [] }, parent: null },
          a = i._parseSync({ data: t.data, path: t.path, parent: n });
        if (a.status === `valid`) return a;
        (a.status === `dirty` && !e && (e = { result: a, ctx: n }),
          n.common.issues.length && r.push(n.common.issues));
      }
      if (e) return (t.common.issues.push(...e.ctx.common.issues), e.result);
      let i = r.map((e) => new N(e));
      return (P(t, { code: M.invalid_union, unionErrors: i }), I);
    }
  }
  get options() {
    return this._def.options;
  }
};
ac.create = (e, t) => new ac({ options: e, typeName: q.ZodUnion, ...B(t) });
const W = (e) =>
  e instanceof mc
    ? W(e.schema)
    : e instanceof G
      ? W(e.innerType())
      : e instanceof hc
        ? [e.value]
        : e instanceof _c
          ? e.options
          : e instanceof vc
            ? A.objectValues(e.enum)
            : e instanceof xc
              ? W(e._def.innerType)
              : e instanceof Qs
                ? [void 0]
                : e instanceof $s
                  ? [null]
                  : e instanceof K
                    ? [void 0, ...W(e.unwrap())]
                    : e instanceof bc
                      ? [null, ...W(e.unwrap())]
                      : e instanceof wc || e instanceof Ec
                        ? W(e.unwrap())
                        : e instanceof Sc
                          ? W(e._def.innerType)
                          : [];
var oc = class e extends V {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== j.object)
      return (P(t, { code: M.invalid_type, expected: j.object, received: t.parsedType }), I);
    let n = this.discriminator,
      r = t.data[n],
      i = this.optionsMap.get(r);
    return i
      ? t.common.async
        ? i._parseAsync({ data: t.data, path: t.path, parent: t })
        : i._parseSync({ data: t.data, path: t.path, parent: t })
      : (P(t, {
          code: M.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [n],
        }),
        I);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(t, n, r) {
    let i = new Map();
    for (let e of n) {
      let n = W(e.shape[t]);
      if (!n.length)
        throw Error(
          `A discriminator value for key \`${t}\` could not be extracted from all schema options`,
        );
      for (let r of n) {
        if (i.has(r))
          throw Error(`Discriminator property ${String(t)} has duplicate value ${String(r)}`);
        i.set(r, e);
      }
    }
    return new e({
      typeName: q.ZodDiscriminatedUnion,
      discriminator: t,
      options: n,
      optionsMap: i,
      ...B(r),
    });
  }
};
function sc(e, t) {
  let n = ds(e),
    r = ds(t);
  if (e === t) return { valid: !0, data: e };
  if (n === j.object && r === j.object) {
    let n = A.objectKeys(t),
      r = A.objectKeys(e).filter((e) => n.indexOf(e) !== -1),
      i = { ...e, ...t };
    for (let n of r) {
      let r = sc(e[n], t[n]);
      if (!r.valid) return { valid: !1 };
      i[n] = r.data;
    }
    return { valid: !0, data: i };
  } else if (n === j.array && r === j.array) {
    if (e.length !== t.length) return { valid: !1 };
    let n = [];
    for (let r = 0; r < e.length; r++) {
      let i = e[r],
        a = t[r],
        o = sc(i, a);
      if (!o.valid) return { valid: !1 };
      n.push(o.data);
    }
    return { valid: !0, data: n };
  } else if (n === j.date && r === j.date && +e == +t) return { valid: !0, data: e };
  else return { valid: !1 };
}
var cc = class extends V {
  _parse(e) {
    let { status: t, ctx: n } = this._processInputParams(e),
      r = (e, r) => {
        if (_s(e) || _s(r)) return I;
        let i = sc(e.value, r.value);
        return i.valid
          ? ((vs(e) || vs(r)) && t.dirty(), { status: t.value, value: i.data })
          : (P(n, { code: M.invalid_intersection_types }), I);
      };
    return n.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseAsync({ data: n.data, path: n.path, parent: n }),
        ]).then(([e, t]) => r(e, t))
      : r(
          this._def.left._parseSync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseSync({ data: n.data, path: n.path, parent: n }),
        );
  }
};
cc.create = (e, t, n) => new cc({ left: e, right: t, typeName: q.ZodIntersection, ...B(n) });
var lc = class e extends V {
  _parse(e) {
    let { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== j.array)
      return (P(n, { code: M.invalid_type, expected: j.array, received: n.parsedType }), I);
    if (n.data.length < this._def.items.length)
      return (
        P(n, {
          code: M.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: `array`,
        }),
        I
      );
    !this._def.rest &&
      n.data.length > this._def.items.length &&
      (P(n, {
        code: M.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: `array`,
      }),
      t.dirty());
    let r = [...n.data]
      .map((e, t) => {
        let r = this._def.items[t] || this._def.rest;
        return r ? r._parse(new z(n, e, n.path, t)) : null;
      })
      .filter((e) => !!e);
    return n.common.async ? Promise.all(r).then((e) => F.mergeArray(t, e)) : F.mergeArray(t, r);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new e({ ...this._def, rest: t });
  }
};
lc.create = (e, t) => {
  if (!Array.isArray(e)) throw Error(`You must pass an array of schemas to z.tuple([ ... ])`);
  return new lc({ items: e, typeName: q.ZodTuple, rest: null, ...B(t) });
};
var uc = class e extends V {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== j.object)
        return (P(n, { code: M.invalid_type, expected: j.object, received: n.parsedType }), I);
      let r = [],
        i = this._def.keyType,
        a = this._def.valueType;
      for (let e in n.data)
        r.push({
          key: i._parse(new z(n, e, n.path, e)),
          value: a._parse(new z(n, n.data[e], n.path, e)),
          alwaysSet: e in n.data,
        });
      return n.common.async ? F.mergeObjectAsync(t, r) : F.mergeObjectSync(t, r);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, n, r) {
      return n instanceof V
        ? new e({ keyType: t, valueType: n, typeName: q.ZodRecord, ...B(r) })
        : new e({ keyType: Gs.create(), valueType: t, typeName: q.ZodRecord, ...B(n) });
    }
  },
  dc = class extends V {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== j.map)
        return (P(n, { code: M.invalid_type, expected: j.map, received: n.parsedType }), I);
      let r = this._def.keyType,
        i = this._def.valueType,
        a = [...n.data.entries()].map(([e, t], a) => ({
          key: r._parse(new z(n, e, n.path, [a, `key`])),
          value: i._parse(new z(n, t, n.path, [a, `value`])),
        }));
      if (n.common.async) {
        let e = new Map();
        return Promise.resolve().then(async () => {
          for (let n of a) {
            let r = await n.key,
              i = await n.value;
            if (r.status === `aborted` || i.status === `aborted`) return I;
            ((r.status === `dirty` || i.status === `dirty`) && t.dirty(), e.set(r.value, i.value));
          }
          return { status: t.value, value: e };
        });
      } else {
        let e = new Map();
        for (let n of a) {
          let r = n.key,
            i = n.value;
          if (r.status === `aborted` || i.status === `aborted`) return I;
          ((r.status === `dirty` || i.status === `dirty`) && t.dirty(), e.set(r.value, i.value));
        }
        return { status: t.value, value: e };
      }
    }
  };
dc.create = (e, t, n) => new dc({ valueType: t, keyType: e, typeName: q.ZodMap, ...B(n) });
var fc = class e extends V {
  _parse(e) {
    let { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== j.set)
      return (P(n, { code: M.invalid_type, expected: j.set, received: n.parsedType }), I);
    let r = this._def;
    (r.minSize !== null &&
      n.data.size < r.minSize.value &&
      (P(n, {
        code: M.too_small,
        minimum: r.minSize.value,
        type: `set`,
        inclusive: !0,
        exact: !1,
        message: r.minSize.message,
      }),
      t.dirty()),
      r.maxSize !== null &&
        n.data.size > r.maxSize.value &&
        (P(n, {
          code: M.too_big,
          maximum: r.maxSize.value,
          type: `set`,
          inclusive: !0,
          exact: !1,
          message: r.maxSize.message,
        }),
        t.dirty()));
    let i = this._def.valueType;
    function a(e) {
      let n = new Set();
      for (let r of e) {
        if (r.status === `aborted`) return I;
        (r.status === `dirty` && t.dirty(), n.add(r.value));
      }
      return { status: t.value, value: n };
    }
    let o = [...n.data.values()].map((e, t) => i._parse(new z(n, e, n.path, t)));
    return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
  }
  min(t, n) {
    return new e({ ...this._def, minSize: { value: t, message: R.toString(n) } });
  }
  max(t, n) {
    return new e({ ...this._def, maxSize: { value: t, message: R.toString(n) } });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
fc.create = (e, t) =>
  new fc({ valueType: e, minSize: null, maxSize: null, typeName: q.ZodSet, ...B(t) });
var pc = class e extends V {
    constructor() {
      (super(...arguments), (this.validate = this.implement));
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== j.function)
        return (P(t, { code: M.invalid_type, expected: j.function, received: t.parsedType }), I);
      function n(e, n) {
        return hs({
          data: e,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, ms(), fs].filter((e) => !!e),
          issueData: { code: M.invalid_arguments, argumentsError: n },
        });
      }
      function r(e, n) {
        return hs({
          data: e,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, ms(), fs].filter((e) => !!e),
          issueData: { code: M.invalid_return_type, returnTypeError: n },
        });
      }
      let i = { errorMap: t.common.contextualErrorMap },
        a = t.data;
      if (this._def.returns instanceof yc) {
        let e = this;
        return L(async function (...t) {
          let o = new N([]),
            s = await e._def.args.parseAsync(t, i).catch((e) => {
              throw (o.addIssue(n(t, e)), o);
            }),
            c = await Reflect.apply(a, this, s);
          return await e._def.returns._def.type.parseAsync(c, i).catch((e) => {
            throw (o.addIssue(r(c, e)), o);
          });
        });
      } else {
        let e = this;
        return L(function (...t) {
          let o = e._def.args.safeParse(t, i);
          if (!o.success) throw new N([n(t, o.error)]);
          let s = Reflect.apply(a, this, o.data),
            c = e._def.returns.safeParse(s, i);
          if (!c.success) throw new N([r(s, c.error)]);
          return c.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t) {
      return new e({ ...this._def, args: lc.create(t).rest(tc.create()) });
    }
    returns(t) {
      return new e({ ...this._def, returns: t });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(t, n, r) {
      return new e({
        args: t || lc.create([]).rest(tc.create()),
        returns: n || tc.create(),
        typeName: q.ZodFunction,
        ...B(r),
      });
    }
  },
  mc = class extends V {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
    }
  };
mc.create = (e, t) => new mc({ getter: e, typeName: q.ZodLazy, ...B(t) });
var hc = class extends V {
  _parse(e) {
    if (e.data !== this._def.value) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { received: t.data, code: M.invalid_literal, expected: this._def.value }), I);
    }
    return { status: `valid`, value: e.data };
  }
  get value() {
    return this._def.value;
  }
};
hc.create = (e, t) => new hc({ value: e, typeName: q.ZodLiteral, ...B(t) });
function gc(e, t) {
  return new _c({ values: e, typeName: q.ZodEnum, ...B(t) });
}
var _c = class e extends V {
  _parse(e) {
    if (typeof e.data != `string`) {
      let t = this._getOrReturnCtx(e),
        n = this._def.values;
      return (P(t, { expected: A.joinValues(n), received: t.parsedType, code: M.invalid_type }), I);
    }
    if (((this._cache ||= new Set(this._def.values)), !this._cache.has(e.data))) {
      let t = this._getOrReturnCtx(e),
        n = this._def.values;
      return (P(t, { received: t.data, code: M.invalid_enum_value, options: n }), I);
    }
    return L(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  extract(t, n = this._def) {
    return e.create(t, { ...this._def, ...n });
  }
  exclude(t, n = this._def) {
    return e.create(
      this.options.filter((e) => !t.includes(e)),
      { ...this._def, ...n },
    );
  }
};
_c.create = gc;
var vc = class extends V {
  _parse(e) {
    let t = A.getValidEnumValues(this._def.values),
      n = this._getOrReturnCtx(e);
    if (n.parsedType !== j.string && n.parsedType !== j.number) {
      let e = A.objectValues(t);
      return (P(n, { expected: A.joinValues(e), received: n.parsedType, code: M.invalid_type }), I);
    }
    if (
      ((this._cache ||= new Set(A.getValidEnumValues(this._def.values))), !this._cache.has(e.data))
    ) {
      let e = A.objectValues(t);
      return (P(n, { received: n.data, code: M.invalid_enum_value, options: e }), I);
    }
    return L(e.data);
  }
  get enum() {
    return this._def.values;
  }
};
vc.create = (e, t) => new vc({ values: e, typeName: q.ZodNativeEnum, ...B(t) });
var yc = class extends V {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    let { ctx: t } = this._processInputParams(e);
    return t.parsedType !== j.promise && t.common.async === !1
      ? (P(t, { code: M.invalid_type, expected: j.promise, received: t.parsedType }), I)
      : L(
          (t.parsedType === j.promise ? t.data : Promise.resolve(t.data)).then((e) =>
            this._def.type.parseAsync(e, { path: t.path, errorMap: t.common.contextualErrorMap }),
          ),
        );
  }
};
yc.create = (e, t) => new yc({ type: e, typeName: q.ZodPromise, ...B(t) });
var G = class extends V {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === q.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    let { status: t, ctx: n } = this._processInputParams(e),
      r = this._def.effect || null,
      i = {
        addIssue: (e) => {
          (P(n, e), e.fatal ? t.abort() : t.dirty());
        },
        get path() {
          return n.path;
        },
      };
    if (((i.addIssue = i.addIssue.bind(i)), r.type === `preprocess`)) {
      let e = r.transform(n.data, i);
      if (n.common.async)
        return Promise.resolve(e).then(async (e) => {
          if (t.value === `aborted`) return I;
          let r = await this._def.schema._parseAsync({ data: e, path: n.path, parent: n });
          return r.status === `aborted`
            ? I
            : r.status === `dirty` || t.value === `dirty`
              ? gs(r.value)
              : r;
        });
      {
        if (t.value === `aborted`) return I;
        let r = this._def.schema._parseSync({ data: e, path: n.path, parent: n });
        return r.status === `aborted`
          ? I
          : r.status === `dirty` || t.value === `dirty`
            ? gs(r.value)
            : r;
      }
    }
    if (r.type === `refinement`) {
      let e = (e) => {
        let t = r.refinement(e, i);
        if (n.common.async) return Promise.resolve(t);
        if (t instanceof Promise)
          throw Error(
            `Async refinement encountered during synchronous parse operation. Use .parseAsync instead.`,
          );
        return e;
      };
      if (n.common.async === !1) {
        let r = this._def.schema._parseSync({ data: n.data, path: n.path, parent: n });
        return r.status === `aborted`
          ? I
          : (r.status === `dirty` && t.dirty(), e(r.value), { status: t.value, value: r.value });
      } else
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then((n) =>
            n.status === `aborted`
              ? I
              : (n.status === `dirty` && t.dirty(),
                e(n.value).then(() => ({ status: t.value, value: n.value }))),
          );
    }
    if (r.type === `transform`)
      if (n.common.async === !1) {
        let e = this._def.schema._parseSync({ data: n.data, path: n.path, parent: n });
        if (!ys(e)) return I;
        let a = r.transform(e.value, i);
        if (a instanceof Promise)
          throw Error(
            `Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`,
          );
        return { status: t.value, value: a };
      } else
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then((e) =>
            ys(e)
              ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
                  status: t.value,
                  value: e,
                }))
              : I,
          );
    A.assertNever(r);
  }
};
((G.create = (e, t, n) => new G({ schema: e, typeName: q.ZodEffects, effect: t, ...B(n) })),
  (G.createWithPreprocess = (e, t, n) =>
    new G({
      schema: t,
      effect: { type: `preprocess`, transform: e },
      typeName: q.ZodEffects,
      ...B(n),
    })));
var K = class extends V {
  _parse(e) {
    return this._getType(e) === j.undefined ? L(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
K.create = (e, t) => new K({ innerType: e, typeName: q.ZodOptional, ...B(t) });
var bc = class extends V {
  _parse(e) {
    return this._getType(e) === j.null ? L(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
bc.create = (e, t) => new bc({ innerType: e, typeName: q.ZodNullable, ...B(t) });
var xc = class extends V {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      n = t.data;
    return (
      t.parsedType === j.undefined && (n = this._def.defaultValue()),
      this._def.innerType._parse({ data: n, path: t.path, parent: t })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
};
xc.create = (e, t) =>
  new xc({
    innerType: e,
    typeName: q.ZodDefault,
    defaultValue: typeof t.default == `function` ? t.default : () => t.default,
    ...B(t),
  });
var Sc = class extends V {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      n = { ...t, common: { ...t.common, issues: [] } },
      r = this._def.innerType._parse({ data: n.data, path: n.path, parent: { ...n } });
    return bs(r)
      ? r.then((e) => ({
          status: `valid`,
          value:
            e.status === `valid`
              ? e.value
              : this._def.catchValue({
                  get error() {
                    return new N(n.common.issues);
                  },
                  input: n.data,
                }),
        }))
      : {
          status: `valid`,
          value:
            r.status === `valid`
              ? r.value
              : this._def.catchValue({
                  get error() {
                    return new N(n.common.issues);
                  },
                  input: n.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
Sc.create = (e, t) =>
  new Sc({
    innerType: e,
    typeName: q.ZodCatch,
    catchValue: typeof t.catch == `function` ? t.catch : () => t.catch,
    ...B(t),
  });
var Cc = class extends V {
  _parse(e) {
    if (this._getType(e) !== j.nan) {
      let t = this._getOrReturnCtx(e);
      return (P(t, { code: M.invalid_type, expected: j.nan, received: t.parsedType }), I);
    }
    return { status: `valid`, value: e.data };
  }
};
Cc.create = (e) => new Cc({ typeName: q.ZodNaN, ...B(e) });
var wc = class extends V {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        n = t.data;
      return this._def.type._parse({ data: n, path: t.path, parent: t });
    }
    unwrap() {
      return this._def.type;
    }
  },
  Tc = class e extends V {
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.common.async)
        return (async () => {
          let e = await this._def.in._parseAsync({ data: n.data, path: n.path, parent: n });
          return e.status === `aborted`
            ? I
            : e.status === `dirty`
              ? (t.dirty(), gs(e.value))
              : this._def.out._parseAsync({ data: e.value, path: n.path, parent: n });
        })();
      {
        let e = this._def.in._parseSync({ data: n.data, path: n.path, parent: n });
        return e.status === `aborted`
          ? I
          : e.status === `dirty`
            ? (t.dirty(), { status: `dirty`, value: e.value })
            : this._def.out._parseSync({ data: e.value, path: n.path, parent: n });
      }
    }
    static create(t, n) {
      return new e({ in: t, out: n, typeName: q.ZodPipeline });
    }
  },
  Ec = class extends V {
    _parse(e) {
      let t = this._def.innerType._parse(e),
        n = (e) => (ys(e) && (e.value = Object.freeze(e.value)), e);
      return bs(t) ? t.then((e) => n(e)) : n(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
((Ec.create = (e, t) => new Ec({ innerType: e, typeName: q.ZodReadonly, ...B(t) })), U.lazycreate);
var q;
((function (e) {
  ((e.ZodString = `ZodString`),
    (e.ZodNumber = `ZodNumber`),
    (e.ZodNaN = `ZodNaN`),
    (e.ZodBigInt = `ZodBigInt`),
    (e.ZodBoolean = `ZodBoolean`),
    (e.ZodDate = `ZodDate`),
    (e.ZodSymbol = `ZodSymbol`),
    (e.ZodUndefined = `ZodUndefined`),
    (e.ZodNull = `ZodNull`),
    (e.ZodAny = `ZodAny`),
    (e.ZodUnknown = `ZodUnknown`),
    (e.ZodNever = `ZodNever`),
    (e.ZodVoid = `ZodVoid`),
    (e.ZodArray = `ZodArray`),
    (e.ZodObject = `ZodObject`),
    (e.ZodUnion = `ZodUnion`),
    (e.ZodDiscriminatedUnion = `ZodDiscriminatedUnion`),
    (e.ZodIntersection = `ZodIntersection`),
    (e.ZodTuple = `ZodTuple`),
    (e.ZodRecord = `ZodRecord`),
    (e.ZodMap = `ZodMap`),
    (e.ZodSet = `ZodSet`),
    (e.ZodFunction = `ZodFunction`),
    (e.ZodLazy = `ZodLazy`),
    (e.ZodLiteral = `ZodLiteral`),
    (e.ZodEnum = `ZodEnum`),
    (e.ZodEffects = `ZodEffects`),
    (e.ZodNativeEnum = `ZodNativeEnum`),
    (e.ZodOptional = `ZodOptional`),
    (e.ZodNullable = `ZodNullable`),
    (e.ZodDefault = `ZodDefault`),
    (e.ZodCatch = `ZodCatch`),
    (e.ZodPromise = `ZodPromise`),
    (e.ZodBranded = `ZodBranded`),
    (e.ZodPipeline = `ZodPipeline`),
    (e.ZodReadonly = `ZodReadonly`));
})((q ||= {})),
  Gs.create,
  qs.create,
  Cc.create,
  Js.create,
  Ys.create,
  Xs.create,
  Zs.create,
  Qs.create,
  $s.create,
  ec.create,
  tc.create,
  H.create,
  nc.create,
  rc.create,
  U.create,
  U.strictCreate,
  ac.create,
  oc.create,
  cc.create,
  lc.create,
  uc.create,
  dc.create,
  fc.create,
  pc.create,
  mc.create,
  hc.create,
  _c.create,
  vc.create,
  yc.create,
  G.create,
  K.create,
  bc.create,
  G.createWithPreprocess,
  Tc.create);
var Dc = class extends Error {
  constructor(e, t) {
    (super(e),
      (this.name = `ParseError`),
      (this.type = t.type),
      (this.field = t.field),
      (this.value = t.value),
      (this.line = t.line));
  }
};
function Oc(e) {}
function kc(e) {
  if (typeof e == `function`)
    throw TypeError(
      "`config` must be an object, got a function instead. Did you mean `createParser({onEvent: fn})`?",
    );
  let { onEvent: t = Oc, onError: n = Oc, onRetry: r = Oc, onComment: i, maxBufferSize: a } = e,
    o = [],
    s = 0,
    c = !0,
    l,
    u = ``,
    d = 0,
    f,
    p = !1;
  function m(e) {
    if (p)
      throw Error(
        "Cannot feed parser: it was terminated after exceeding the configured max buffer size. Call `reset()` to resume parsing.",
      );
    if (
      (c &&
        ((c = !1),
        e.charCodeAt(0) === 239 &&
          e.charCodeAt(1) === 187 &&
          e.charCodeAt(2) === 191 &&
          (e = e.slice(3))),
      o.length === 0)
    ) {
      let t = ee(e);
      (t !== `` && (o.push(t), (s = t.length)), h());
      return;
    }
    if (
      e.indexOf(`
`) === -1 &&
      e.indexOf(`\r`) === -1
    ) {
      (o.push(e), (s += e.length), h());
      return;
    }
    o.push(e);
    let t = o.join(``);
    ((o.length = 0), (s = 0));
    let n = ee(t);
    (n !== `` && (o.push(n), (s = n.length)), h());
  }
  function h() {
    a !== void 0 &&
      (s + u.length <= a ||
        ((p = !0),
        (o.length = 0),
        (s = 0),
        (l = void 0),
        (u = ``),
        (d = 0),
        (f = void 0),
        n(
          new Dc(`Buffered data exceeded max buffer size of ${a} characters`, {
            type: `max-buffer-size-exceeded`,
          }),
        )));
  }
  function ee(e) {
    let n = 0;
    if (e.indexOf(`\r`) === -1) {
      let r = e.indexOf(
        `
`,
        n,
      );
      for (; r !== -1;) {
        if (n === r) {
          (d > 0 && t({ id: l, event: f, data: u }),
            (l = void 0),
            (u = ``),
            (d = 0),
            (f = void 0),
            (n = r + 1),
            (r = e.indexOf(
              `
`,
              n,
            )));
          continue;
        }
        let i = e.charCodeAt(n);
        if (Ac(e, n, i)) {
          let i = e.charCodeAt(n + 5) === 32 ? n + 6 : n + 5,
            a = e.slice(i, r);
          if (d === 0 && e.charCodeAt(r + 1) === 10) {
            (t({ id: l, event: f, data: a }),
              (l = void 0),
              (u = ``),
              (f = void 0),
              (n = r + 2),
              (r = e.indexOf(
                `
`,
                n,
              )));
            continue;
          }
          ((u =
            d === 0
              ? a
              : `${u}
${a}`),
            d++);
        } else
          jc(e, n, i)
            ? (f = e.slice(e.charCodeAt(n + 6) === 32 ? n + 7 : n + 6, r) || void 0)
            : g(e, n, r);
        ((n = r + 1),
          (r = e.indexOf(
            `
`,
            n,
          )));
      }
      return e.slice(n);
    }
    for (; n < e.length;) {
      let t = e.indexOf(`\r`, n),
        r = e.indexOf(
          `
`,
          n,
        ),
        i = -1;
      if (
        (t !== -1 && r !== -1
          ? (i = t < r ? t : r)
          : t === -1
            ? r !== -1 && (i = r)
            : (i = t === e.length - 1 ? -1 : t),
        i === -1)
      )
        break;
      (g(e, n, i), (n = i + 1), e.charCodeAt(n - 1) === 13 && e.charCodeAt(n) === 10 && n++);
    }
    return e.slice(n);
  }
  function g(e, t, n) {
    if (t === n) {
      ne();
      return;
    }
    let r = e.charCodeAt(t);
    if (Ac(e, t, r)) {
      let r = e.charCodeAt(t + 5) === 32 ? t + 6 : t + 5,
        i = e.slice(r, n);
      ((u =
        d === 0
          ? i
          : `${u}
${i}`),
        d++);
      return;
    }
    if (jc(e, t, r)) {
      f = e.slice(e.charCodeAt(t + 6) === 32 ? t + 7 : t + 6, n) || void 0;
      return;
    }
    if (r === 105 && e.charCodeAt(t + 1) === 100 && e.charCodeAt(t + 2) === 58) {
      let r = e.slice(e.charCodeAt(t + 3) === 32 ? t + 4 : t + 3, n);
      l = r.includes(`\0`) ? void 0 : r;
      return;
    }
    if (r === 58) {
      i && i(e.slice(t, n).slice(e.charCodeAt(t + 1) === 32 ? 2 : 1));
      return;
    }
    let a = e.slice(t, n),
      o = a.indexOf(`:`);
    if (o === -1) {
      te(a, ``, a);
      return;
    }
    let s = a.slice(0, o),
      c = a.charCodeAt(o + 1) === 32 ? 2 : 1;
    te(s, a.slice(o + c), a);
  }
  function te(e, t, i) {
    switch (e) {
      case `event`:
        f = t || void 0;
        break;
      case `data`:
        ((u =
          d === 0
            ? t
            : `${u}
${t}`),
          d++);
        break;
      case `id`:
        l = t.includes(`\0`) ? void 0 : t;
        break;
      case `retry`:
        /^\d+$/.test(t)
          ? r(parseInt(t, 10))
          : n(
              new Dc(`Invalid \`retry\` value: "${t}"`, {
                type: `invalid-retry`,
                value: t,
                line: i,
              }),
            );
        break;
      default:
        n(
          new Dc(`Unknown field "${e.length > 20 ? `${e.slice(0, 20)}\u2026` : e}"`, {
            type: `unknown-field`,
            field: e,
            value: t,
            line: i,
          }),
        );
        break;
    }
  }
  function ne() {
    (d > 0 && t({ id: l, event: f, data: u }), (l = void 0), (u = ``), (d = 0), (f = void 0));
  }
  function re(e = {}) {
    if (e.consume && o.length > 0) {
      let e = o.join(``);
      g(e, 0, e.length);
    }
    ((c = !0), (l = void 0), (u = ``), (d = 0), (f = void 0), (o.length = 0), (s = 0), (p = !1));
  }
  return { feed: m, reset: re };
}
function Ac(e, t, n) {
  return (
    n === 100 &&
    e.charCodeAt(t + 1) === 97 &&
    e.charCodeAt(t + 2) === 116 &&
    e.charCodeAt(t + 3) === 97 &&
    e.charCodeAt(t + 4) === 58
  );
}
function jc(e, t, n) {
  return (
    n === 101 &&
    e.charCodeAt(t + 1) === 118 &&
    e.charCodeAt(t + 2) === 101 &&
    e.charCodeAt(t + 3) === 110 &&
    e.charCodeAt(t + 4) === 116 &&
    e.charCodeAt(t + 5) === 58
  );
}
var Mc = class extends TransformStream {
  constructor({ onError: e, onRetry: t, onComment: n, maxBufferSize: r } = {}) {
    let i;
    super({
      start(a) {
        i = kc({
          onEvent: (e) => {
            a.enqueue(e);
          },
          onError(t) {
            (typeof e == `function` && e(t),
              (e === `terminate` || t.type === `max-buffer-size-exceeded`) && a.error(t));
          },
          onRetry: t,
          onComment: n,
          maxBufferSize: r,
        });
      },
      transform(e) {
        i.feed(e);
      },
    });
  }
};
const Nc = Symbol.for(`workflow-serialize`),
  Pc = Symbol.for(`workflow-deserialize`);
function Fc(...e) {
  return e.reduce((e, t) => ({ ...e, ...(t ?? {}) }), {});
}
function Ic(e) {
  return Object.fromEntries(Object.entries(e).filter(([e, t]) => t != null));
}
async function Lc(e, t) {
  if (e == null) return Promise.resolve();
  let n = t?.abortSignal;
  return new Promise((t, r) => {
    if (n?.aborted) {
      r(Rc());
      return;
    }
    let i = setTimeout(() => {
        (a(), t());
      }, e),
      a = () => {
        (clearTimeout(i), n?.removeEventListener(`abort`, o));
      },
      o = () => {
        (a(), r(Rc()));
      };
    n?.addEventListener(`abort`, o);
  });
}
function Rc() {
  return new DOMException(`Delay was aborted`, `AbortError`);
}
function zc(e) {
  let t = e ?? globalThis.WebSocket;
  if (t == null) throw Error(`No WebSocket implementation available.`);
  return t;
}
function Bc(e) {
  let t = new URL(e);
  return (
    t.protocol === `http:`
      ? (t.protocol = `ws:`)
      : t.protocol === `https:` && (t.protocol = `wss:`),
    t
  );
}
var Vc = new TextDecoder();
async function Hc(e) {
  return typeof e == `string`
    ? e
    : e instanceof ArrayBuffer || ArrayBuffer.isView(e)
      ? Vc.decode(e)
      : typeof Blob < `u` && e instanceof Blob
        ? e.text()
        : String(e);
}
var Uc = 1;
async function Wc(
  e,
  { highWaterMark: t = 1024 * 1024, pollIntervalMs: n = 20, abortSignal: r } = {},
) {
  for (; e.readyState === Uc && (e.bufferedAmount ?? 0) > t;) {
    if (r?.aborted === !0) return;
    await Lc(n);
  }
}
function Gc({
  url: e,
  protocols: t,
  headers: n,
  webSocket: r,
  abortSignal: i,
  onOpen: a,
  onMessageText: o,
  onProcessingError: s,
  onSocketError: c,
  onClose: l,
  onAbort: u,
}) {
  let d,
    f,
    p = (e) => {
      f != null && (i?.removeEventListener(`abort`, f), (f = void 0));
      try {
        d?.close(e);
      } catch {}
    };
  if (i?.aborted) return (u?.(i.reason ?? Error(`Aborted`)), { socket: void 0, close: p });
  try {
    d = new (zc(r))(e, t, { headers: Ic(n ?? {}) });
  } catch (e) {
    return (s(e), { socket: void 0, close: p });
  }
  i != null &&
    u != null &&
    ((f = () => u(i.reason ?? Error(`Aborted`))), i.addEventListener(`abort`, f, { once: !0 }));
  let m = d;
  d.onopen = () => {
    try {
      a?.(m);
    } catch (e) {
      s(e);
    }
  };
  let h = Promise.resolve();
  return (
    (d.onmessage = (e) => {
      h = h
        .then(() => Hc(e.data))
        .then((e) => o(e))
        .catch(s);
    }),
    (d.onerror = () => {
      h = h.then(() => c?.()).catch(s);
    }),
    (d.onclose = () => {
      h = h.then(() => l?.()).catch(s);
    }),
    { socket: d, close: p }
  );
}
var { btoa: Kc, atob: qc } = globalThis;
function Jc(e) {
  let t = qc(e.replace(/-/g, `+`).replace(/_/g, `/`));
  return Uint8Array.from(t, (e) => e.codePointAt(0));
}
function Yc(e) {
  let t = ``;
  for (let n = 0; n < e.length; n++) t += String.fromCodePoint(e[n]);
  return Kc(t);
}
function Xc(e) {
  return e instanceof Uint8Array ? Yc(e) : e;
}
function Zc(e) {
  return e.type === `text`
    ? new TextEncoder().encode(e.text)
    : e.data instanceof Uint8Array
      ? e.data
      : e.data instanceof ArrayBuffer
        ? new Uint8Array(e.data)
        : Jc(e.data);
}
function Qc(e, t = {}) {
  let { useArrayBrackets: n = !0 } = t,
    r = new FormData();
  for (let [t, i] of Object.entries(e))
    if (i != null) {
      if (Array.isArray(i)) {
        if (i.length === 1) {
          r.append(t, i[0]);
          continue;
        }
        let e = n ? `${t}[]` : t;
        for (let t of i) r.append(e, t);
        continue;
      }
      r.append(t, i);
    }
  return r;
}
function $c({ tools: e = [], providerToolNames: t }) {
  let n = {},
    r = {};
  for (let i of e)
    if (i.type === `provider` && i.id in t) {
      let e = t[i.id];
      ((n[i.name] = e), (r[e] = i.name));
    }
  return { toProviderToolName: (e) => n[e] ?? e, toCustomToolName: (e) => r[e] ?? e };
}
var el = [
    { mediaType: `image/gif`, bytesPrefix: [71, 73, 70] },
    { mediaType: `image/png`, bytesPrefix: [137, 80, 78, 71] },
    { mediaType: `image/jpeg`, bytesPrefix: [255, 216] },
    {
      mediaType: `image/webp`,
      bytesPrefix: [82, 73, 70, 70, null, null, null, null, 87, 69, 66, 80],
    },
    { mediaType: `image/bmp`, bytesPrefix: [66, 77] },
    { mediaType: `image/tiff`, bytesPrefix: [73, 73, 42, 0] },
    { mediaType: `image/tiff`, bytesPrefix: [77, 77, 0, 42] },
    { mediaType: `image/avif`, bytesPrefix: [0, 0, 0, 32, 102, 116, 121, 112, 97, 118, 105, 102] },
    { mediaType: `image/heic`, bytesPrefix: [0, 0, 0, 32, 102, 116, 121, 112, 104, 101, 105, 99] },
  ],
  tl = [{ mediaType: `application/pdf`, bytesPrefix: [37, 80, 68, 70] }],
  nl = [
    { mediaType: `audio/mpeg`, bytesPrefix: [255, 251] },
    { mediaType: `audio/mpeg`, bytesPrefix: [255, 250] },
    { mediaType: `audio/mpeg`, bytesPrefix: [255, 243] },
    { mediaType: `audio/mpeg`, bytesPrefix: [255, 242] },
    { mediaType: `audio/mpeg`, bytesPrefix: [255, 227] },
    { mediaType: `audio/mpeg`, bytesPrefix: [255, 226] },
    {
      mediaType: `audio/wav`,
      bytesPrefix: [82, 73, 70, 70, null, null, null, null, 87, 65, 86, 69],
    },
    { mediaType: `audio/ogg`, bytesPrefix: [79, 103, 103, 83] },
    { mediaType: `audio/flac`, bytesPrefix: [102, 76, 97, 67] },
    { mediaType: `audio/aac`, bytesPrefix: [64, 21, 0, 0] },
    { mediaType: `audio/webm`, bytesPrefix: [26, 69, 223, 163] },
  ],
  rl = [...nl, { mediaType: `audio/mp4`, bytesPrefix: [0, 0, 0, null, 102, 116, 121, 112] }],
  il = [
    { mediaType: `video/mp4`, bytesPrefix: [0, 0, 0, null, 102, 116, 121, 112] },
    { mediaType: `video/webm`, bytesPrefix: [26, 69, 223, 163] },
    { mediaType: `video/quicktime`, bytesPrefix: [0, 0, 0, 20, 102, 116, 121, 112, 113, 116] },
    { mediaType: `video/x-msvideo`, bytesPrefix: [82, 73, 70, 70] },
  ],
  al = 18,
  ol = 131084;
function sl(e, t) {
  if (typeof e != `string`) return e.length > t ? e.subarray(0, t) : e;
  let n = Math.ceil(t / 3) * 4,
    r = Jc(e.substring(0, Math.min(e.length, n)));
  return r.length > t ? r.subarray(0, t) : r;
}
function cl(e) {
  return e.length > 10 && e[0] === 73 && e[1] === 68 && e[2] === 51;
}
var ll = (e) => {
  let t = ((e[6] & 127) << 21) | ((e[7] & 127) << 14) | ((e[8] & 127) << 7) | (e[9] & 127);
  return e.subarray(t + 10);
};
function ul({ data: e, signatures: t }) {
  let n = sl(e, al);
  cl(n) && (n = ll(sl(e, ol)));
  for (let e of t)
    if (n.length >= e.bytesPrefix.length && e.bytesPrefix.every((e, t) => e === null || n[t] === e))
      return e.mediaType;
}
var dl = { image: el, audio: rl, video: il, application: tl };
function fl({ data: e, topLevelType: t }) {
  if (t === void 0) return ul({ data: e, signatures: [...el, ...tl, ...nl, ...il] });
  let n = dl[t];
  if (n !== void 0) return ul({ data: e, signatures: n });
}
function pl(e) {
  let t = e.indexOf(`/`);
  return t === -1 ? e : e.substring(0, t);
}
function ml(e) {
  let t = e.indexOf(`/`);
  if (t === -1) return !1;
  let n = e.substring(t + 1);
  return n.length > 0 && n !== `*`;
}
async function hl(e) {
  try {
    await e.body?.cancel();
  } catch {}
}
var gl = `AI_DownloadError`,
  _l = `vercel.ai.error.${gl}`,
  vl = Symbol.for(_l),
  yl,
  bl,
  J = class extends ((bl = e), (yl = vl), bl) {
    constructor({
      url: e,
      statusCode: t,
      statusText: n,
      cause: r,
      message: i = r == null
        ? `Failed to download ${e}: ${t} ${n}`
        : `Failed to download ${e}: ${r}`,
    }) {
      (super({ name: gl, message: i, cause: r }),
        (this[yl] = !0),
        (this.url = e),
        (this.statusCode = t),
        (this.statusText = n));
    }
    static isInstance(t) {
      return e.hasMarker(t, _l);
    }
  };
function xl(e = globalThis) {
  return e.window != null;
}
function Sl(e, t) {
  try {
    return new URL(e).origin === new URL(t).origin;
  } catch {
    return !1;
  }
}
var Cl = [
  `connection`,
  `keep-alive`,
  `te`,
  `trailer`,
  `transfer-encoding`,
  `upgrade`,
  `host`,
  `forwarded`,
  `proxy-authorization`,
  `via`,
  `x-forwarded-for`,
  `x-forwarded-host`,
  `x-forwarded-proto`,
  `x-real-ip`,
  `metadata`,
  `metadata-flavor`,
  `x-aws-ec2-metadata-token`,
  `x-metadata-token`,
  `cookie`,
  `set-cookie`,
];
function wl(e) {
  let t = new Headers(e);
  for (let e of Cl) t.delete(e);
  return t;
}
function Tl(e) {
  let t;
  try {
    t = new URL(e);
  } catch {
    throw new J({ url: e, message: `Invalid URL: ${e}` });
  }
  if (t.protocol === `data:`) return;
  if (t.protocol !== `http:` && t.protocol !== `https:`)
    throw new J({ url: e, message: `URL scheme must be http, https, or data, got ${t.protocol}` });
  let n = t.hostname.toLowerCase().replace(/\.+$/, ``);
  if (!n) throw new J({ url: e, message: `URL must have a hostname` });
  if (n === `localhost` || n.endsWith(`.local`) || n.endsWith(`.localhost`))
    throw new J({ url: e, message: `URL with hostname ${n} is not allowed` });
  if (n.startsWith(`[`) && n.endsWith(`]`)) {
    if (kl(n.slice(1, -1)))
      throw new J({ url: e, message: `URL with IPv6 address ${n} is not allowed` });
    return;
  }
  if (El(n)) {
    if (Dl(n)) throw new J({ url: e, message: `URL with IP address ${n} is not allowed` });
    return;
  }
}
function El(e) {
  let t = e.split(`.`);
  return t.length === 4
    ? t.every((e) => {
        let t = Number(e);
        return Number.isInteger(t) && t >= 0 && t <= 255 && String(t) === e;
      })
    : !1;
}
function Dl(e) {
  let [t, n, r] = e.split(`.`).map(Number);
  return (
    t === 0 ||
    t === 10 ||
    (t === 100 && n >= 64 && n <= 127) ||
    t === 127 ||
    (t === 169 && n === 254) ||
    (t === 172 && n >= 16 && n <= 31) ||
    (t === 192 && n === 0 && r === 0) ||
    (t === 192 && n === 0 && r === 2) ||
    (t === 192 && n === 168) ||
    (t === 198 && (n === 18 || n === 19)) ||
    (t === 198 && n === 51 && r === 100) ||
    (t === 203 && n === 0 && r === 113) ||
    t >= 224
  );
}
function Ol(e) {
  let t = e.toLowerCase(),
    n = t.indexOf(`%`);
  n !== -1 && (t = t.slice(0, n));
  let r = t.split(`::`);
  if (r.length > 2) return null;
  let i = (e) => {
      if (e === ``) return [];
      let t = [],
        n = e.split(`:`);
      for (let e = 0; e < n.length; e++) {
        let r = n[e];
        if (r.includes(`.`)) {
          if (e !== n.length - 1 || !El(r)) return null;
          let [i, a, o, s] = r.split(`.`).map(Number);
          t.push((i << 8) | a, (o << 8) | s);
          continue;
        }
        if (!/^[0-9a-f]{1,4}$/.test(r)) return null;
        t.push(parseInt(r, 16));
      }
      return t;
    },
    a = i(r[0]);
  if (a === null) return null;
  if (r.length === 2) {
    let e = i(r[1]);
    if (e === null) return null;
    let t = 8 - a.length - e.length;
    return t < 0 ? null : [...a, ...Array(t).fill(0), ...e];
  }
  return a.length === 8 ? a : null;
}
function kl(e) {
  let t = Ol(e);
  if (t === null) return !0;
  let n = (e) => t.slice(0, e).every((e) => e === 0);
  return (n(7) && (t[7] === 0 || t[7] === 1)) ||
    (t[0] & 65024) == 64512 ||
    (t[0] & 65472) == 65152 ||
    (t[0] & 65472) == 65216 ||
    (t[0] & 65280) == 65280 ||
    (t[0] === 8193 && t[1] === 3512) ||
    (t[0] === 16383 && !(t[1] & 61440))
    ? !0
    : n(6) ||
        (n(5) && t[5] === 65535) ||
        (n(4) && t[4] === 65535 && t[5] === 0) ||
        (t[0] === 100 && t[1] === 65435 && t[2] === 0 && t[3] === 0 && t[4] === 0 && t[5] === 0) ||
        (t[0] === 100 && t[1] === 65435 && t[2] === 1)
      ? Dl(`${(t[6] >> 8) & 255}.${t[6] & 255}.${(t[7] >> 8) & 255}.${t[7] & 255}`)
      : !1;
}
var Al = 10,
  jl = new Set([301, 302, 303, 307, 308]);
async function Ml({
  url: e,
  headers: t,
  abortSignal: n,
  maxRedirects: r = Al,
  fetch: i = globalThis.fetch,
  trustedOrigin: a,
}) {
  let o = t === void 0 ? void 0 : wl(t),
    s = (e) => {
      let t = { signal: n, redirect: e };
      return (o !== void 0 && (t.headers = new Headers(o)), t);
    },
    c = e;
  for (let t = 0; t <= r; t++) {
    (a === void 0 || !Sl(c, a)) && Tl(c);
    let t = await i(c, s(`manual`));
    if (t.type === `opaqueredirect`) {
      if (!xl())
        throw new J({
          url: e,
          message: `Redirect from ${c} could not be validated and was blocked`,
        });
      return await i(c, s(`follow`));
    }
    let n = t.headers.get(`location`);
    if (jl.has(t.status) && n) {
      await hl(t);
      let e = new URL(n, c).toString();
      if (o !== void 0 && !Sl(e, c)) {
        let e = o.get(`user-agent`);
        o = new Headers(e == null ? void 0 : { "user-agent": e });
      }
      c = e;
      continue;
    }
    return t;
  }
  throw new J({ url: e, message: `Too many redirects (max ${r})` });
}
var Nl = 2 * 1024 * 1024 * 1024;
async function Pl({ response: e, url: t, maxBytes: n = Nl }) {
  let r = e.headers.get(`content-length`);
  if (r != null) {
    let i = parseInt(r, 10);
    if (!isNaN(i) && i > n)
      throw (
        await hl(e),
        new J({
          url: t,
          message: `Download of ${t} exceeded maximum size of ${n} bytes (Content-Length: ${i}).`,
        })
      );
  }
  let i = e.body;
  if (i == null) return new Uint8Array();
  let a = i.getReader(),
    o = [],
    s = 0;
  try {
    for (;;) {
      let { done: e, value: r } = await a.read();
      if (e) break;
      if (((s += r.length), s > n))
        throw new J({ url: t, message: `Download of ${t} exceeded maximum size of ${n} bytes.` });
      o.push(r);
    }
  } finally {
    try {
      await a.cancel();
    } finally {
      a.releaseLock();
    }
  }
  let c = new Uint8Array(s),
    l = 0;
  for (let e of o) (c.set(e, l), (l += e.length));
  return c;
}
async function Fl(e, t) {
  try {
    let n = await Ml({ url: e, abortSignal: t?.abortSignal });
    if (!n.ok)
      throw (await hl(n), new J({ url: e, statusCode: n.status, statusText: n.statusText }));
    let r = await Pl({ response: n, url: e, maxBytes: t?.maxBytes ?? Nl }),
      i = n.headers.get(`content-type`) ?? void 0;
    return new Blob([r], i ? { type: i } : void 0);
  } catch (t) {
    throw J.isInstance(t) ? t : new J({ url: e, cause: t });
  }
}
function Il(e) {
  return Object.fromEntries([...e.headers]);
}
var Ll = (({
  prefix: e,
  size: t = 16,
  alphabet: n = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`,
  separator: i = `-`,
} = {}) => {
  let a = () => {
    let e = n.length,
      r = Array(t);
    for (let i = 0; i < t; i++) r[i] = n[(Math.random() * e) | 0];
    return r.join(``);
  };
  if (e == null) return a;
  if (n.includes(i))
    throw new r({
      argument: `separator`,
      message: `The separator "${i}" must not be part of the alphabet "${n}".`,
    });
  return () => `${e}${i}${a()}`;
})();
function Rl(e) {
  return (
    (e instanceof Error || e instanceof DOMException) &&
    (e.name === `AbortError` || e.name === `ResponseAborted` || e.name === `TimeoutError`)
  );
}
var zl = [`fetch failed`, `failed to fetch`],
  Bl = [
    `ConnectionRefused`,
    `ConnectionClosed`,
    `FailedToOpenSocket`,
    `ECONNRESET`,
    `ECONNREFUSED`,
    `ETIMEDOUT`,
    `EPIPE`,
  ];
function Vl(e) {
  if (!(e instanceof Error)) return !1;
  let t = e.code;
  return !!(typeof t == `string` && Bl.includes(t));
}
function Hl({ error: e, url: n, requestBodyValues: r }) {
  if (Rl(e)) return e;
  if (e instanceof TypeError && zl.includes(e.message.toLowerCase())) {
    let i = e.cause;
    if (i != null)
      return new t({
        message: `Cannot connect to API: ${i.message}`,
        cause: i,
        url: n,
        requestBodyValues: r,
        isRetryable: !0,
      });
  }
  return Vl(e)
    ? new t({
        message: `Cannot connect to API: ${e.message}`,
        cause: e,
        url: n,
        requestBodyValues: r,
        isRetryable: !0,
      })
    : e;
}
function Ul(e = globalThis) {
  return e.window
    ? `runtime/browser`
    : e.navigator?.userAgent
      ? `runtime/${e.navigator.userAgent.toLowerCase()}`
      : e.process?.versions?.node
        ? `runtime/node.js/${e.process.version.substring(0)}`
        : e.EdgeRuntime
          ? `runtime/vercel-edge`
          : `runtime/unknown`;
}
function Wl(e) {
  if (e == null) return {};
  let t = {};
  if (e instanceof Headers)
    e.forEach((e, n) => {
      t[n.toLowerCase()] = e;
    });
  else {
    Array.isArray(e) || (e = Object.entries(e));
    for (let [n, r] of e) r != null && (t[n.toLowerCase()] = r);
  }
  return t;
}
function Gl(e, ...t) {
  let n = new Headers(Wl(e)),
    r = n.get(`user-agent`) || ``;
  return (
    n.set(`user-agent`, [r, ...t].filter(Boolean).join(` `)), Object.fromEntries(n.entries())
  );
}
var Kl = `5.0.12`,
  ql = () => globalThis.fetch,
  Jl = async ({
    url: e,
    headers: n = {},
    successfulResponseHandler: r,
    failedResponseHandler: i,
    abortSignal: a,
    fetch: o = ql(),
    validateUrl: s,
    credentialedOrigin: c,
    trustedOrigin: l,
  }) => {
    try {
      let u = Gl(c !== void 0 && !Sl(e, c) ? {} : n, `ai-sdk/provider-utils/${Kl}`, Ul()),
        d = s
          ? await Ml({ url: e, headers: u, abortSignal: a, fetch: o, trustedOrigin: l })
          : await o(e, { method: `GET`, headers: u, signal: a }),
        f = Il(d);
      if (!d.ok) {
        let n;
        try {
          n = await i({ response: d, url: e, requestBodyValues: {} });
        } catch (n) {
          throw Rl(n) || t.isInstance(n)
            ? n
            : new t({
                message: `Failed to process error response`,
                cause: n,
                statusCode: d.status,
                url: e,
                responseHeaders: f,
                requestBodyValues: {},
              });
        }
        throw n.value;
      }
      try {
        return await r({ response: d, url: e, requestBodyValues: {} });
      } catch (n) {
        throw n instanceof Error && (Rl(n) || t.isInstance(n))
          ? n
          : new t({
              message: `Failed to process successful response`,
              cause: n,
              statusCode: d.status,
              url: e,
              responseHeaders: f,
              requestBodyValues: {},
            });
      }
    } catch (t) {
      throw Hl({ error: t, url: e, requestBodyValues: {} });
    }
  };
function Yl(e) {
  return e != null;
}
function Xl({
  apiKey: e,
  environmentVariableName: t,
  apiKeyParameterName: n = `apiKey`,
  description: r,
}) {
  if (typeof e == `string`) return e;
  if (e != null) throw new o({ message: `${r} API key must be a string.` });
  if (typeof process > `u`)
    throw new o({
      message: `${r} API key is missing. Pass it using the '${n}' parameter. Environment variables are not supported in this environment.`,
    });
  if (((e = process.env[t]), e == null))
    throw new o({
      message: `${r} API key is missing. Pass it using the '${n}' parameter or the ${t} environment variable.`,
    });
  if (typeof e != `string`)
    throw new o({
      message: `${r} API key must be a string. The value of the ${t} environment variable is not a string.`,
    });
  return e;
}
function Zl({ settingValue: e, environmentVariableName: t }) {
  if (
    typeof e == `string` ||
    (!(e != null || typeof process > `u`) &&
      ((e = process.env[t]), !(e == null || typeof e != `string`)))
  )
    return e;
}
function Ql(e) {
  return e !== void 0 && e !== `provider-default`;
}
function $l({ reasoning: e, effortMap: t, warnings: n }) {
  let r = t[e];
  if (r == null) {
    n.push({
      type: `unsupported`,
      feature: `reasoning`,
      details: `reasoning "${e}" is not supported by this model.`,
    });
    return;
  }
  return (
    r !== e &&
      n.push({
        type: `compatibility`,
        feature: `reasoning`,
        details: `reasoning "${e}" is not directly supported by this model. mapped to effort "${r}".`,
      }),
    r
  );
}
var eu = { minimal: 0.02, low: 0.1, medium: 0.3, high: 0.6, xhigh: 0.9 };
function tu({
  reasoning: e,
  maxOutputTokens: t,
  maxReasoningBudget: n,
  minReasoningBudget: r = 1024,
  budgetPercentages: i = eu,
  warnings: a,
}) {
  let o = i[e];
  if (o == null) {
    a.push({
      type: `unsupported`,
      feature: `reasoning`,
      details: `reasoning "${e}" is not supported by this model.`,
    });
    return;
  }
  return Math.min(n, Math.max(r, Math.round(t * o)));
}
function nu(e) {
  let [t, n = ``] = e.toLowerCase().split(`/`);
  return { mpeg: `mp3`, "x-wav": `wav`, opus: `ogg`, mp4: `m4a`, "x-m4a": `m4a` }[n] ?? n;
}
var ru =
    /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,
  iu =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function au(e) {
  let t = JSON.parse(e);
  return typeof t != `object` || !t || (ru.test(e) === !1 && iu.test(e) === !1) ? t : ou(t);
}
function ou(e) {
  let t = [e];
  for (; t.length;) {
    let e = t;
    t = [];
    for (let n of e) {
      if (
        Object.prototype.hasOwnProperty.call(n, `__proto__`) ||
        (Object.prototype.hasOwnProperty.call(n, `constructor`) &&
          n.constructor !== null &&
          typeof n.constructor == `object` &&
          Object.prototype.hasOwnProperty.call(n.constructor, `prototype`))
      )
        throw SyntaxError(`Object contains forbidden prototype property`);
      for (let e in n) {
        let r = n[e];
        r && typeof r == `object` && t.push(r);
      }
    }
  }
  return e;
}
function su(e) {
  let { stackTraceLimit: t } = Error;
  try {
    Error.stackTraceLimit = 0;
  } catch {
    return au(e);
  }
  try {
    return au(e);
  } finally {
    Error.stackTraceLimit = t;
  }
}
function cu(e) {
  if (e.type === `object` || (Array.isArray(e.type) && e.type.includes(`object`))) {
    e.additionalProperties = !1;
    let { properties: t } = e;
    if (t != null) for (let e of Object.keys(t)) t[e] = lu(t[e]);
  }
  (e.items != null && (e.items = Array.isArray(e.items) ? e.items.map(lu) : lu(e.items)),
    e.anyOf != null && (e.anyOf = e.anyOf.map(lu)),
    e.allOf != null && (e.allOf = e.allOf.map(lu)),
    e.oneOf != null && (e.oneOf = e.oneOf.map(lu)));
  let { definitions: t } = e;
  if (t != null) for (let e of Object.keys(t)) t[e] = lu(t[e]);
  return e;
}
function lu(e) {
  return typeof e == `boolean` ? e : cu(e);
}
var uu = Symbol(`Let zodToJsonSchema decide on which parser to use`),
  du = {
    name: void 0,
    $refStrategy: `root`,
    basePath: [`#`],
    effectStrategy: `input`,
    pipeStrategy: `all`,
    dateStrategy: `format:date-time`,
    mapStrategy: `entries`,
    removeAdditionalStrategy: `passthrough`,
    allowedAdditionalProperties: !0,
    rejectedAdditionalProperties: !1,
    definitionPath: `definitions`,
    strictUnions: !1,
    definitions: {},
    errorMessages: !1,
    patternStrategy: `escape`,
    applyRegexFlags: !1,
    emailStrategy: `format:email`,
    base64Strategy: `contentEncoding:base64`,
    nameStrategy: `ref`,
  },
  fu = (e) => (typeof e == `string` ? { ...du, name: e } : { ...du, ...e });
function Y() {
  return {};
}
function pu(e, t) {
  let n = { type: `array` };
  return (
    e.type?._def &&
      e.type?._def?.typeName !== q.ZodAny &&
      (n.items = $(e.type._def, { ...t, currentPath: [...t.currentPath, `items`] })),
    e.minLength && (n.minItems = e.minLength.value),
    e.maxLength && (n.maxItems = e.maxLength.value),
    e.exactLength && ((n.minItems = e.exactLength.value), (n.maxItems = e.exactLength.value)),
    n
  );
}
function mu(e) {
  let t = { type: `integer`, format: `int64` };
  if (!e.checks) return t;
  for (let n of e.checks)
    switch (n.kind) {
      case `min`:
        n.inclusive ? (t.minimum = n.value) : (t.exclusiveMinimum = n.value);
        break;
      case `max`:
        n.inclusive ? (t.maximum = n.value) : (t.exclusiveMaximum = n.value);
        break;
      case `multipleOf`:
        t.multipleOf = n.value;
        break;
    }
  return t;
}
function hu() {
  return { type: `boolean` };
}
function gu(e, t) {
  return $(e.type._def, t);
}
var _u = (e, t) => $(e.innerType._def, t);
function vu(e, t, n) {
  let r = n ?? t.dateStrategy;
  if (Array.isArray(r)) return { anyOf: r.map((n) => vu(e, t, n)) };
  switch (r) {
    case `string`:
    case `format:date-time`:
      return { type: `string`, format: `date-time` };
    case `format:date`:
      return { type: `string`, format: `date` };
    case `integer`:
      return yu(e);
  }
}
var yu = (e) => {
  let t = { type: `integer`, format: `unix-time` };
  for (let n of e.checks)
    switch (n.kind) {
      case `min`:
        t.minimum = n.value;
        break;
      case `max`:
        t.maximum = n.value;
        break;
    }
  return t;
};
function bu(e, t) {
  return { ...$(e.innerType._def, t), default: e.defaultValue() };
}
function xu(e, t) {
  return t.effectStrategy === `input` ? $(e.schema._def, t) : Y();
}
function Su(e) {
  return { type: `string`, enum: Array.from(e.values) };
}
var Cu = (e) => (`type` in e && e.type === `string` ? !1 : `allOf` in e);
function wu(e, t) {
  let n = [
      $(e.left._def, { ...t, currentPath: [...t.currentPath, `allOf`, `0`] }),
      $(e.right._def, { ...t, currentPath: [...t.currentPath, `allOf`, `1`] }),
    ].filter((e) => !!e),
    r = [];
  return (
    n.forEach((e) => {
      if (Cu(e)) r.push(...e.allOf);
      else {
        let t = e;
        if (`additionalProperties` in e && e.additionalProperties === !1) {
          let { additionalProperties: n, ...r } = e;
          t = r;
        }
        r.push(t);
      }
    }),
    r.length ? { allOf: r } : void 0
  );
}
function Tu(e) {
  let t = typeof e.value;
  return t !== `bigint` && t !== `number` && t !== `boolean` && t !== `string`
    ? { type: Array.isArray(e.value) ? `array` : `object` }
    : { type: t === `bigint` ? `integer` : t, const: e.value };
}
var Eu = void 0,
  X = {
    cuid: /^[cC][^\s-]{8,}$/,
    cuid2: /^[0-9a-z]+$/,
    ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
    email:
      /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
    emoji: () => (
      Eu === void 0 && (Eu = RegExp(`^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`, `u`)),
      Eu
    ),
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ipv4Cidr:
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    ipv6Cidr:
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    nanoid: /^[a-zA-Z0-9_-]{21}$/,
    jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  };
function Du(e, t) {
  let n = { type: `string` };
  if (e.checks)
    for (let r of e.checks)
      switch (r.kind) {
        case `min`:
          n.minLength = typeof n.minLength == `number` ? Math.max(n.minLength, r.value) : r.value;
          break;
        case `max`:
          n.maxLength = typeof n.maxLength == `number` ? Math.min(n.maxLength, r.value) : r.value;
          break;
        case `email`:
          switch (t.emailStrategy) {
            case `format:email`:
              Z(n, `email`, r.message, t);
              break;
            case `format:idn-email`:
              Z(n, `idn-email`, r.message, t);
              break;
            case `pattern:zod`:
              Q(n, X.email, r.message, t);
              break;
          }
          break;
        case `url`:
          Z(n, `uri`, r.message, t);
          break;
        case `uuid`:
          Z(n, `uuid`, r.message, t);
          break;
        case `regex`:
          Q(n, r.regex, r.message, t);
          break;
        case `cuid`:
          Q(n, X.cuid, r.message, t);
          break;
        case `cuid2`:
          Q(n, X.cuid2, r.message, t);
          break;
        case `startsWith`:
          Q(n, RegExp(`^${Ou(r.value, t)}`), r.message, t);
          break;
        case `endsWith`:
          Q(n, RegExp(`${Ou(r.value, t)}$`), r.message, t);
          break;
        case `datetime`:
          Z(n, `date-time`, r.message, t);
          break;
        case `date`:
          Z(n, `date`, r.message, t);
          break;
        case `time`:
          Z(n, `time`, r.message, t);
          break;
        case `duration`:
          Z(n, `duration`, r.message, t);
          break;
        case `length`:
          ((n.minLength =
            typeof n.minLength == `number` ? Math.max(n.minLength, r.value) : r.value),
            (n.maxLength =
              typeof n.maxLength == `number` ? Math.min(n.maxLength, r.value) : r.value));
          break;
        case `includes`:
          Q(n, RegExp(Ou(r.value, t)), r.message, t);
          break;
        case `ip`:
          (r.version !== `v6` && Z(n, `ipv4`, r.message, t),
            r.version !== `v4` && Z(n, `ipv6`, r.message, t));
          break;
        case `base64url`:
          Q(n, X.base64url, r.message, t);
          break;
        case `jwt`:
          Q(n, X.jwt, r.message, t);
          break;
        case `cidr`:
          (r.version !== `v6` && Q(n, X.ipv4Cidr, r.message, t),
            r.version !== `v4` && Q(n, X.ipv6Cidr, r.message, t));
          break;
        case `emoji`:
          Q(n, X.emoji(), r.message, t);
          break;
        case `ulid`:
          Q(n, X.ulid, r.message, t);
          break;
        case `base64`:
          switch (t.base64Strategy) {
            case `format:binary`:
              Z(n, `binary`, r.message, t);
              break;
            case `contentEncoding:base64`:
              n.contentEncoding = `base64`;
              break;
            case `pattern:zod`:
              Q(n, X.base64, r.message, t);
              break;
          }
          break;
        case `nanoid`:
          Q(n, X.nanoid, r.message, t);
        case `toLowerCase`:
        case `toUpperCase`:
        case `trim`:
          break;
        default:
      }
  return n;
}
function Ou(e, t) {
  return t.patternStrategy === `escape` ? Au(e) : e;
}
var ku = new Set(`ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789`);
function Au(e) {
  let t = ``;
  for (let n = 0; n < e.length; n++) (ku.has(e[n]) || (t += `\\`), (t += e[n]));
  return t;
}
function Z(e, t, n, r) {
  e.format || e.anyOf?.some((e) => e.format)
    ? ((e.anyOf ||= []),
      e.format && (e.anyOf.push({ format: e.format }), delete e.format),
      e.anyOf.push({ format: t, ...(n && r.errorMessages && { errorMessage: { format: n } }) }))
    : (e.format = t);
}
function Q(e, t, n, r) {
  e.pattern || e.allOf?.some((e) => e.pattern)
    ? ((e.allOf ||= []),
      e.pattern && (e.allOf.push({ pattern: e.pattern }), delete e.pattern),
      e.allOf.push({
        pattern: ju(t, r),
        ...(n && r.errorMessages && { errorMessage: { pattern: n } }),
      }))
    : (e.pattern = ju(t, r));
}
function ju(e, t) {
  if (!t.applyRegexFlags || !e.flags) return e.source;
  let n = { i: e.flags.includes(`i`), m: e.flags.includes(`m`), s: e.flags.includes(`s`) },
    r = n.i ? e.source.toLowerCase() : e.source,
    i = ``,
    a = !1,
    o = !1,
    s = !1;
  for (let e = 0; e < r.length; e++) {
    if (a) {
      ((i += r[e]), (a = !1));
      continue;
    }
    if (n.i) {
      if (o) {
        if (r[e].match(/[a-z]/)) {
          s
            ? ((i += r[e]), (i += `${r[e - 2]}-${r[e]}`.toUpperCase()), (s = !1))
            : r[e + 1] === `-` && r[e + 2]?.match(/[a-z]/)
              ? ((i += r[e]), (s = !0))
              : (i += `${r[e]}${r[e].toUpperCase()}`);
          continue;
        }
      } else if (r[e].match(/[a-z]/)) {
        i += `[${r[e]}${r[e].toUpperCase()}]`;
        continue;
      }
    }
    if (n.m) {
      if (r[e] === `^`) {
        i += `(^|(?<=[\r
]))`;
        continue;
      } else if (r[e] === `$`) {
        i += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (n.s && r[e] === `.`) {
      i += o
        ? `${r[e]}\r
`
        : `[${r[e]}\r
]`;
      continue;
    }
    ((i += r[e]),
      r[e] === `\\` ? (a = !0) : o && r[e] === `]` ? (o = !1) : !o && r[e] === `[` && (o = !0));
  }
  try {
    new RegExp(i);
  } catch {
    return (
      console.warn(
        `Could not convert regex pattern at ${t.currentPath.join(`/`)} to a flag-independent form! Falling back to the flag-ignorant source`,
      ),
      e.source
    );
  }
  return i;
}
function Mu(e, t) {
  let n = {
    type: `object`,
    additionalProperties:
      $(e.valueType._def, { ...t, currentPath: [...t.currentPath, `additionalProperties`] }) ??
      t.allowedAdditionalProperties,
  };
  if (e.keyType?._def.typeName === q.ZodString && e.keyType._def.checks?.length) {
    let { type: r, ...i } = Du(e.keyType._def, t);
    return { ...n, propertyNames: i };
  } else if (e.keyType?._def.typeName === q.ZodEnum)
    return { ...n, propertyNames: { enum: e.keyType._def.values } };
  else if (
    e.keyType?._def.typeName === q.ZodBranded &&
    e.keyType._def.type._def.typeName === q.ZodString &&
    e.keyType._def.type._def.checks?.length
  ) {
    let { type: r, ...i } = gu(e.keyType._def, t);
    return { ...n, propertyNames: i };
  }
  return n;
}
function Nu(e, t) {
  return t.mapStrategy === `record`
    ? Mu(e, t)
    : {
        type: `array`,
        maxItems: 125,
        items: {
          type: `array`,
          items: [
            $(e.keyType._def, { ...t, currentPath: [...t.currentPath, `items`, `items`, `0`] }) ||
              Y(),
            $(e.valueType._def, { ...t, currentPath: [...t.currentPath, `items`, `items`, `1`] }) ||
              Y(),
          ],
          minItems: 2,
          maxItems: 2,
        },
      };
}
function Pu(e) {
  let t = e.values,
    n = Object.keys(e.values)
      .filter((e) => typeof t[t[e]] != `number`)
      .map((e) => t[e]),
    r = Array.from(new Set(n.map((e) => typeof e)));
  return {
    type: r.length === 1 ? (r[0] === `string` ? `string` : `number`) : [`string`, `number`],
    enum: n,
  };
}
function Fu() {
  return { not: Y() };
}
function Iu() {
  return { type: `null` };
}
var Lu = {
  ZodString: `string`,
  ZodNumber: `number`,
  ZodBigInt: `integer`,
  ZodBoolean: `boolean`,
  ZodNull: `null`,
};
function Ru(e, t) {
  let n = e.options instanceof Map ? Array.from(e.options.values()) : e.options;
  if (n.every((e) => e._def.typeName in Lu && (!e._def.checks || !e._def.checks.length))) {
    let e = n.reduce((e, t) => {
      let n = Lu[t._def.typeName];
      return n && !e.includes(n) ? [...e, n] : e;
    }, []);
    return { type: e.length > 1 ? e : e[0] };
  } else if (n.every((e) => e._def.typeName === `ZodLiteral` && !e.description)) {
    let e = n.reduce((e, t) => {
      let n = typeof t._def.value;
      switch (n) {
        case `string`:
        case `number`:
        case `boolean`:
          return [...e, n];
        case `bigint`:
          return [...e, `integer`];
        case `object`:
          if (t._def.value === null) return [...e, `null`];
        default:
          return e;
      }
    }, []);
    if (e.length === n.length) {
      let t = e.filter((e, t, n) => n.indexOf(e) === t);
      return {
        type: t.length > 1 ? t : t[0],
        enum: n.reduce((e, t) => (e.includes(t._def.value) ? e : [...e, t._def.value]), []),
      };
    }
  } else if (n.every((e) => e._def.typeName === `ZodEnum`))
    return {
      type: `string`,
      enum: n.reduce((e, t) => [...e, ...t._def.values.filter((t) => !e.includes(t))], []),
    };
  return zu(e, t);
}
var zu = (e, t) => {
  let n = (e.options instanceof Map ? Array.from(e.options.values()) : e.options)
    .map((e, n) => $(e._def, { ...t, currentPath: [...t.currentPath, `anyOf`, `${n}`] }))
    .filter((e) => !!e && (!t.strictUnions || (typeof e == `object` && Object.keys(e).length > 0)));
  return n.length ? { anyOf: n } : void 0;
};
function Bu(e, t) {
  if (
    [`ZodString`, `ZodNumber`, `ZodBigInt`, `ZodBoolean`, `ZodNull`].includes(
      e.innerType._def.typeName,
    ) &&
    (!e.innerType._def.checks || !e.innerType._def.checks.length)
  )
    return { type: [Lu[e.innerType._def.typeName], `null`] };
  let n = $(e.innerType._def, { ...t, currentPath: [...t.currentPath, `anyOf`, `0`] });
  return n && { anyOf: [n, { type: `null` }] };
}
function Vu(e) {
  let t = { type: `number` };
  if (!e.checks) return t;
  for (let n of e.checks)
    switch (n.kind) {
      case `int`:
        t.type = `integer`;
        break;
      case `min`:
        n.inclusive ? (t.minimum = n.value) : (t.exclusiveMinimum = n.value);
        break;
      case `max`:
        n.inclusive ? (t.maximum = n.value) : (t.exclusiveMaximum = n.value);
        break;
      case `multipleOf`:
        t.multipleOf = n.value;
        break;
    }
  return t;
}
function Hu(e, t) {
  let n = { type: `object`, properties: {} },
    r = [],
    i = e.shape();
  for (let e in i) {
    let a = i[e];
    if (a === void 0 || a._def === void 0) continue;
    let o = Wu(a),
      s = $(a._def, {
        ...t,
        currentPath: [...t.currentPath, `properties`, e],
        propertyPath: [...t.currentPath, `properties`, e],
      });
    s !== void 0 && ((n.properties[e] = s), o || r.push(e));
  }
  r.length && (n.required = r);
  let a = Uu(e, t);
  return (a !== void 0 && (n.additionalProperties = a), n);
}
function Uu(e, t) {
  if (e.catchall._def.typeName !== `ZodNever`)
    return $(e.catchall._def, { ...t, currentPath: [...t.currentPath, `additionalProperties`] });
  switch (e.unknownKeys) {
    case `passthrough`:
      return t.allowedAdditionalProperties;
    case `strict`:
      return t.rejectedAdditionalProperties;
    case `strip`:
      return t.removeAdditionalStrategy === `strict`
        ? t.allowedAdditionalProperties
        : t.rejectedAdditionalProperties;
  }
}
function Wu(e) {
  try {
    return e.isOptional();
  } catch {
    return !0;
  }
}
var Gu = (e, t) => {
    if (t.currentPath.toString() === t.propertyPath?.toString()) return $(e.innerType._def, t);
    let n = $(e.innerType._def, { ...t, currentPath: [...t.currentPath, `anyOf`, `1`] });
    return n ? { anyOf: [{ not: Y() }, n] } : Y();
  },
  Ku = (e, t) => {
    if (t.pipeStrategy === `input`) return $(e.in._def, t);
    if (t.pipeStrategy === `output`) return $(e.out._def, t);
    let n = $(e.in._def, { ...t, currentPath: [...t.currentPath, `allOf`, `0`] });
    return {
      allOf: [
        n,
        $(e.out._def, { ...t, currentPath: [...t.currentPath, `allOf`, n ? `1` : `0`] }),
      ].filter((e) => e !== void 0),
    };
  };
function qu(e, t) {
  return $(e.type._def, t);
}
function Ju(e, t) {
  let n = {
    type: `array`,
    uniqueItems: !0,
    items: $(e.valueType._def, { ...t, currentPath: [...t.currentPath, `items`] }),
  };
  return (
    e.minSize && (n.minItems = e.minSize.value), e.maxSize && (n.maxItems = e.maxSize.value), n
  );
}
function Yu(e, t) {
  return e.rest
    ? {
        type: `array`,
        minItems: e.items.length,
        items: e.items
          .map((e, n) => $(e._def, { ...t, currentPath: [...t.currentPath, `items`, `${n}`] }))
          .reduce((e, t) => (t === void 0 ? e : [...e, t]), []),
        additionalItems: $(e.rest._def, {
          ...t,
          currentPath: [...t.currentPath, `additionalItems`],
        }),
      }
    : {
        type: `array`,
        minItems: e.items.length,
        maxItems: e.items.length,
        items: e.items
          .map((e, n) => $(e._def, { ...t, currentPath: [...t.currentPath, `items`, `${n}`] }))
          .reduce((e, t) => (t === void 0 ? e : [...e, t]), []),
      };
}
function Xu() {
  return { not: Y() };
}
function Zu() {
  return Y();
}
var Qu = (e, t) => $(e.innerType._def, t),
  $u = (e, t, n) => {
    switch (t) {
      case q.ZodString:
        return Du(e, n);
      case q.ZodNumber:
        return Vu(e);
      case q.ZodObject:
        return Hu(e, n);
      case q.ZodBigInt:
        return mu(e);
      case q.ZodBoolean:
        return hu();
      case q.ZodDate:
        return vu(e, n);
      case q.ZodUndefined:
        return Xu();
      case q.ZodNull:
        return Iu();
      case q.ZodArray:
        return pu(e, n);
      case q.ZodUnion:
      case q.ZodDiscriminatedUnion:
        return Ru(e, n);
      case q.ZodIntersection:
        return wu(e, n);
      case q.ZodTuple:
        return Yu(e, n);
      case q.ZodRecord:
        return Mu(e, n);
      case q.ZodLiteral:
        return Tu(e);
      case q.ZodEnum:
        return Su(e);
      case q.ZodNativeEnum:
        return Pu(e);
      case q.ZodNullable:
        return Bu(e, n);
      case q.ZodOptional:
        return Gu(e, n);
      case q.ZodMap:
        return Nu(e, n);
      case q.ZodSet:
        return Ju(e, n);
      case q.ZodLazy:
        return () => e.getter()._def;
      case q.ZodPromise:
        return qu(e, n);
      case q.ZodNaN:
      case q.ZodNever:
        return Fu();
      case q.ZodEffects:
        return xu(e, n);
      case q.ZodAny:
        return Y();
      case q.ZodUnknown:
        return Zu();
      case q.ZodDefault:
        return bu(e, n);
      case q.ZodBranded:
        return gu(e, n);
      case q.ZodReadonly:
        return Qu(e, n);
      case q.ZodCatch:
        return _u(e, n);
      case q.ZodPipeline:
        return Ku(e, n);
      case q.ZodFunction:
      case q.ZodVoid:
      case q.ZodSymbol:
        return;
      default:
        return ((e) => void 0)(t);
    }
  },
  ed = (e, t) => {
    let n = 0;
    for (; n < e.length && n < t.length && e[n] === t[n]; n++);
    return [(e.length - n).toString(), ...t.slice(n)].join(`/`);
  };
function $(e, t, n = !1) {
  let r = t.seen.get(e);
  if (t.override) {
    let i = t.override?.call(t, e, t, r, n);
    if (i !== uu) return i;
  }
  if (r && !n) {
    let e = td(r, t);
    if (e !== void 0) return e;
  }
  let i = { def: e, path: t.currentPath, jsonSchema: void 0 };
  t.seen.set(e, i);
  let a = $u(e, e.typeName, t),
    o = typeof a == `function` ? $(a(), t) : a;
  if ((o && nd(e, t, o), t.postProcess)) {
    let n = t.postProcess(o, e, t);
    return ((i.jsonSchema = o), n);
  }
  return ((i.jsonSchema = o), o);
}
var td = (e, t) => {
    switch (t.$refStrategy) {
      case `root`:
        return { $ref: e.path.join(`/`) };
      case `relative`:
        return { $ref: ed(t.currentPath, e.path) };
      case `none`:
      case `seen`:
        return e.path.length < t.currentPath.length &&
          e.path.every((e, n) => t.currentPath[n] === e)
          ? (console.warn(
              `Recursive reference detected at ${t.currentPath.join(`/`)}! Defaulting to any`,
            ),
            Y())
          : t.$refStrategy === `seen`
            ? Y()
            : void 0;
    }
  },
  nd = (e, t, n) => (e.description && (n.description = e.description), n),
  rd = (e) => {
    let t = fu(e),
      n = t.name === void 0 ? t.basePath : [...t.basePath, t.definitionPath, t.name];
    return {
      ...t,
      currentPath: n,
      propertyPath: void 0,
      seen: new Map(
        Object.entries(t.definitions).map(([e, n]) => [
          n._def,
          { def: n._def, path: [...t.basePath, t.definitionPath, e], jsonSchema: void 0 },
        ]),
      ),
    };
  },
  id = (e, t) => {
    let n = rd(t),
      r =
        typeof t == `object` && t.definitions
          ? Object.entries(t.definitions).reduce(
              (e, [t, r]) => ({
                ...e,
                [t]:
                  $(r._def, { ...n, currentPath: [...n.basePath, n.definitionPath, t] }, !0) ?? Y(),
              }),
              {},
            )
          : void 0,
      i = typeof t == `string` ? t : t?.nameStrategy === `title` ? void 0 : t?.name,
      a =
        $(
          e._def,
          i === void 0 ? n : { ...n, currentPath: [...n.basePath, n.definitionPath, i] },
          !1,
        ) ?? Y(),
      o = typeof t == `object` && t.name !== void 0 && t.nameStrategy === `title` ? t.name : void 0;
    o !== void 0 && (a.title = o);
    let s =
      i === void 0
        ? r
          ? { ...a, [n.definitionPath]: r }
          : a
        : {
            $ref: [...(n.$refStrategy === `relative` ? [] : n.basePath), n.definitionPath, i].join(
              `/`,
            ),
            [n.definitionPath]: { ...r, [i]: a },
          };
    return ((s.$schema = `http://json-schema.org/draft-07/schema#`), s);
  },
  ad = Symbol.for(`vercel.ai.schema`);
function od(e) {
  let t;
  return () => ((t ??= e()), t);
}
function sd(e, { validate: t } = {}) {
  return {
    [ad]: !0,
    _type: void 0,
    get jsonSchema() {
      return (typeof e == `function` && (e = e()), e);
    },
    validate: t,
  };
}
function cd(e) {
  return (
    typeof e == `object` && !!e && ad in e && e[ad] === !0 && `jsonSchema` in e && `validate` in e
  );
}
function ld(e) {
  return e == null
    ? sd({ type: `object`, properties: {}, additionalProperties: !1 })
    : cd(e)
      ? e
      : `~standard` in e
        ? e[`~standard`].vendor === `zod`
          ? hd(e)
          : ud(e)
        : e();
}
function ud(e) {
  return sd(
    () => {
      if (!dd(e))
        throw Error(
          `Standard schema vendor '${e[`~standard`].vendor}' does not support JSON Schema conversion.`,
        );
      return cu(e[`~standard`].jsonSchema.input({ target: `draft-07` }));
    },
    {
      validate: async (t) => {
        let n = await e[`~standard`].validate(t);
        return `value` in n
          ? { success: !0, value: n.value }
          : { success: !1, error: new c({ value: t, cause: n.issues }) };
      },
    },
  );
}
function dd(e) {
  return e[`~standard`].jsonSchema != null;
}
function fd(e, t) {
  let n = t?.useReferences ?? !1;
  return sd(() => id(e, { $refStrategy: n ? `root` : `none` }), {
    validate: async (t) => {
      let n = await e.safeParseAsync(t);
      return n.success ? { success: !0, value: n.data } : { success: !1, error: n.error };
    },
  });
}
function pd(e, t) {
  let n = t?.useReferences ?? !1;
  return sd(() => cu(pa(e, { target: `draft-7`, io: `input`, reused: n ? `ref` : `inline` })), {
    validate: async (t) => {
      let n = await Ta(e, t);
      return n.success ? { success: !0, value: n.data } : { success: !1, error: n.error };
    },
  });
}
function md(e) {
  return `_zod` in e;
}
function hd(e, t) {
  return md(e) ? pd(e, t) : fd(e, t);
}
async function gd({ value: e, schema: t, context: n }) {
  let r = await _d({ value: e, schema: t, context: n });
  if (!r.success) throw c.wrap({ value: e, cause: r.error, context: n });
  return r.value;
}
async function _d({ value: e, schema: t, context: n }) {
  let r = ld(t);
  try {
    if (r.validate == null) return { success: !0, value: e, rawValue: e };
    let t = await r.validate(e);
    return t.success
      ? { success: !0, value: t.value, rawValue: e }
      : { success: !1, error: c.wrap({ value: e, cause: t.error, context: n }), rawValue: e };
  } catch (t) {
    return { success: !1, error: c.wrap({ value: e, cause: t, context: n }), rawValue: e };
  }
}
async function vd({ text: e, schema: t }) {
  try {
    let n = su(e);
    return t == null ? n : await gd({ value: n, schema: t });
  } catch (t) {
    throw a.isInstance(t) || c.isInstance(t) ? t : new a({ text: e, cause: t });
  }
}
async function yd({ text: e, schema: t }) {
  try {
    let n = su(e);
    return t == null ? { success: !0, value: n, rawValue: n } : await _d({ value: n, schema: t });
  } catch (t) {
    return {
      success: !1,
      error: a.isInstance(t) ? t : new a({ text: e, cause: t }),
      rawValue: void 0,
    };
  }
}
function bd({ stream: e, schema: t }) {
  return e
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new Mc())
    .pipeThrough(
      new TransformStream({
        async transform({ data: e }, n) {
          e !== `[DONE]` && n.enqueue(await yd({ text: e, schema: t }));
        },
      }),
    );
}
async function xd({ provider: e, providerOptions: t, schema: n }) {
  if (t?.[e] == null) return;
  let i = await _d({ value: t[e], schema: n });
  if (!i.success)
    throw new r({
      argument: `providerOptions`,
      message: `invalid ${e} provider options`,
      cause: i.error,
    });
  return i.value;
}
var Sd = () => globalThis.fetch,
  Cd = async ({
    url: e,
    headers: t,
    body: n,
    failedResponseHandler: r,
    successfulResponseHandler: i,
    abortSignal: a,
    fetch: o,
  }) =>
    await Td({
      url: e,
      headers: { "Content-Type": `application/json`, ...t },
      body: { content: JSON.stringify(n), values: n },
      failedResponseHandler: r,
      successfulResponseHandler: i,
      abortSignal: a,
      fetch: o,
    }),
  wd = async ({
    url: e,
    headers: t,
    formData: n,
    failedResponseHandler: r,
    successfulResponseHandler: i,
    abortSignal: a,
    fetch: o,
  }) =>
    await Td({
      url: e,
      headers: t,
      body: { content: n, values: Object.fromEntries(n.entries()) },
      failedResponseHandler: r,
      successfulResponseHandler: i,
      abortSignal: a,
      fetch: o,
    }),
  Td = async ({
    url: e,
    headers: n = {},
    body: r,
    successfulResponseHandler: i,
    failedResponseHandler: a,
    abortSignal: o,
    fetch: s = Sd(),
  }) => {
    try {
      let c = await s(e, {
          method: `POST`,
          headers: Gl(n, `ai-sdk/provider-utils/${Kl}`, Ul()),
          body: r.content,
          signal: o,
        }),
        l = Il(c);
      if (!c.ok) {
        let n;
        try {
          n = await a({ response: c, url: e, requestBodyValues: r.values });
        } catch (n) {
          throw Rl(n) || t.isInstance(n)
            ? n
            : new t({
                message: `Failed to process error response`,
                cause: n,
                statusCode: c.status,
                url: e,
                responseHeaders: l,
                requestBodyValues: r.values,
              });
        }
        throw n.value;
      }
      try {
        return await i({ response: c, url: e, requestBodyValues: r.values });
      } catch (n) {
        throw n instanceof Error && (Rl(n) || t.isInstance(n))
          ? n
          : new t({
              message: `Failed to process successful response`,
              cause: n,
              statusCode: c.status,
              url: e,
              responseHeaders: l,
              requestBodyValues: r.values,
            });
      }
    } catch (t) {
      throw Hl({ error: t, url: e, requestBodyValues: r.values });
    }
  };
function Ed(e) {
  return e;
}
function Dd(e) {
  return { ...e, type: `dynamic` };
}
function Od({ id: e, inputSchema: t }) {
  return ({
    execute: n,
    outputSchema: r,
    needsApproval: i,
    toModelOutput: a,
    onInputStart: o,
    onInputDelta: s,
    onInputAvailable: c,
    ...l
  }) =>
    Ed({
      type: `provider`,
      isProviderExecuted: !1,
      id: e,
      args: l,
      inputSchema: t,
      outputSchema: r,
      execute: n,
      needsApproval: i,
      toModelOutput: a,
      onInputStart: o,
      onInputDelta: s,
      onInputAvailable: c,
    });
}
function kd({ id: e, inputSchema: t, outputSchema: n }) {
  return ({
    execute: r,
    needsApproval: i,
    toModelOutput: a,
    onInputStart: o,
    onInputDelta: s,
    onInputAvailable: c,
    ...l
  }) =>
    Ed({
      type: `provider`,
      isProviderExecuted: !1,
      id: e,
      args: l,
      inputSchema: t,
      outputSchema: n,
      execute: r,
      needsApproval: i,
      toModelOutput: a,
      onInputStart: o,
      onInputDelta: s,
      onInputAvailable: c,
    });
}
function Ad({ id: e, inputSchema: t, outputSchema: n, supportsDeferredResults: r }) {
  return ({ onInputStart: i, onInputDelta: a, onInputAvailable: o, ...s }) =>
    Ed({
      type: `provider`,
      isProviderExecuted: !0,
      id: e,
      args: s,
      inputSchema: t,
      outputSchema: n,
      onInputStart: i,
      onInputDelta: a,
      onInputAvailable: o,
      supportsDeferredResults: r,
    });
}
async function jd(e) {
  return (typeof e == `function` && (e = e()), Promise.resolve(e));
}
function Md({ part: e }) {
  if (ml(e.mediaType)) return e.mediaType;
  if (e.data.type === `data`) {
    let t = fl({ data: e.data.data, topLevelType: pl(e.mediaType) });
    if (t) return t;
    throw new l({
      functionality: `file of media type "${e.mediaType}" must specify subtype since it could not be auto-detected`,
    });
  }
  throw new l({
    functionality: `file of media type "${e.mediaType}" must specify subtype since it is not passed as inline bytes`,
  });
}
function Nd({ reference: e, provider: t }) {
  let n = e[t];
  if (n != null) return n;
  throw new s({ provider: t, reference: e });
}
var Pd =
  ({
    maxRetries: e = 2,
    initialDelayInMs: t = 2e3,
    backoffFactor: n = 2,
    abortSignal: r,
    shouldRetry: i,
    getDelayInMs: a = ({ exponentialBackoffDelay: e }) => e,
    createRetryError: o = ({ message: e }) => Error(e),
  }) =>
  async (s) =>
    Fd(s, {
      maxRetries: e,
      delayInMs: t,
      backoffFactor: n,
      abortSignal: r,
      shouldRetry: i,
      getDelayInMs: a,
      createRetryError: o,
    });
async function Fd(
  e,
  {
    maxRetries: t,
    delayInMs: n,
    backoffFactor: r,
    abortSignal: i,
    shouldRetry: a,
    getDelayInMs: o,
    createRetryError: s,
  },
  c = [],
) {
  try {
    return await e();
  } catch (l) {
    if (Rl(l) || t === 0) throw l;
    let d = u(l),
      f = [...c, l],
      p = f.length;
    if (p > t)
      throw s({
        message: `Failed after ${p} attempts. Last error: ${d}`,
        reason: `maxRetriesExceeded`,
        errors: f,
      });
    if ((await a(l)) && p <= t)
      return (
        await Lc(o({ error: l, exponentialBackoffDelay: n }), { abortSignal: i }),
        Fd(
          e,
          {
            maxRetries: t,
            delayInMs: r * n,
            backoffFactor: r,
            abortSignal: i,
            shouldRetry: a,
            getDelayInMs: o,
            createRetryError: s,
          },
          f,
        )
      );
    throw p === 1
      ? l
      : s({
          message: `Failed after ${p} attempts with non-retryable error: '${d}'`,
          reason: `errorNotRetryable`,
          errors: f,
        });
  }
}
var Id = new TextDecoder();
async function Ld({ response: e, url: t }) {
  return Id.decode(await Pl({ response: e, url: t }));
}
var Rd =
    ({ errorSchema: e, errorToMessage: n, isRetryable: r }) =>
    async ({ response: i, url: a, requestBodyValues: o }) => {
      let s = await Ld({ response: i, url: a }),
        c = Il(i);
      if (s.trim() === ``)
        return {
          responseHeaders: c,
          value: new t({
            message: i.statusText,
            url: a,
            requestBodyValues: o,
            statusCode: i.status,
            responseHeaders: c,
            responseBody: s,
            isRetryable: r?.(i),
          }),
        };
      try {
        let l = await vd({ text: s, schema: e });
        return {
          responseHeaders: c,
          value: new t({
            message: n(l),
            url: a,
            requestBodyValues: o,
            statusCode: i.status,
            responseHeaders: c,
            responseBody: s,
            data: l,
            isRetryable: r?.(i, l),
          }),
        };
      } catch {
        return {
          responseHeaders: c,
          value: new t({
            message: i.statusText,
            url: a,
            requestBodyValues: o,
            statusCode: i.status,
            responseHeaders: c,
            responseBody: s,
            isRetryable: r?.(i),
          }),
        };
      }
    },
  zd =
    (e) =>
    async ({ response: t }) => {
      let r = Il(t);
      if (t.body == null) throw new n({});
      return { responseHeaders: r, value: bd({ stream: t.body, schema: e }) };
    },
  Bd =
    (e) =>
    async ({ response: n, url: r, requestBodyValues: i }) => {
      let a = await Ld({ response: n, url: r }),
        o = await yd({ text: a, schema: e }),
        s = Il(n);
      if (!o.success)
        throw new t({
          message: `Invalid JSON response`,
          cause: o.error,
          statusCode: n.status,
          responseHeaders: s,
          responseBody: a,
          url: r,
          requestBodyValues: i,
        });
      return { responseHeaders: s, value: o.value, rawValue: o.rawValue };
    },
  Vd =
    () =>
    async ({ response: e, url: n, requestBodyValues: r }) => {
      let i = Il(e);
      if (!e.body)
        throw new t({
          message: `Response body is empty`,
          url: n,
          requestBodyValues: r,
          statusCode: e.status,
          responseHeaders: i,
          responseBody: void 0,
        });
      try {
        let t = await e.arrayBuffer();
        return { responseHeaders: i, value: new Uint8Array(t) };
      } catch (a) {
        throw new t({
          message: `Failed to read response as array buffer`,
          url: n,
          requestBodyValues: r,
          statusCode: e.status,
          responseHeaders: i,
          responseBody: void 0,
          cause: a,
        });
      }
    };
function Hd(e) {
  if (e == null) return !0;
  let t = typeof e;
  return t === `string` || t === `number` || t === `boolean`
    ? !0
    : t === `function` || t === `symbol` || t === `bigint`
      ? !1
      : Array.isArray(e)
        ? e.every(Hd)
        : Object.getPrototypeOf(e) === Object.prototype
          ? Object.values(e).every(Hd)
          : !1;
}
function Ud(e) {
  let t = {};
  for (let [n, r] of Object.entries(e.config))
    if (n === `headers`) {
      let e = Wd(r);
      Hd(e) && (t[n] = e);
    } else Hd(r) && (t[n] = r);
  return { modelId: e.modelId, config: t };
}
function Wd(e) {
  let t = e;
  if ((typeof e == `function` && (t = e()), t instanceof Promise))
    throw Error(`Promise returned from resolveSync`);
  return t;
}
var Gd = class {
  constructor(e, t = {}) {
    ((this.toolCalls = []),
      (this.controller = e),
      (this._generateId = t.generateId ?? Ll),
      (this.typeValidation = t.typeValidation ?? `none`),
      (this.extractMetadata = t.extractMetadata),
      (this.buildToolCallProviderMetadata = t.buildToolCallProviderMetadata));
  }
  processDelta(e) {
    let t = e.index ?? this.toolCalls.length;
    this.toolCalls[t] == null ? this.processNewToolCall(t, e) : this.processExistingToolCall(t, e);
  }
  flush() {
    for (let e of this.toolCalls) e.hasFinished || this.finishToolCall(e);
  }
  processNewToolCall(e, t) {
    if (this.typeValidation === `required`) {
      if (t.type !== `function`) throw new i({ data: t, message: `Expected 'function' type.` });
    } else if (this.typeValidation === `if-present` && t.type != null && t.type !== `function`)
      throw new i({ data: t, message: `Expected 'function' type.` });
    if (t.id == null) throw new i({ data: t, message: `Expected 'id' to be a string.` });
    if (t.function?.name == null)
      throw new i({ data: t, message: `Expected 'function.name' to be a string.` });
    this.controller.enqueue({ type: `tool-input-start`, id: t.id, toolName: t.function.name });
    let n = this.extractMetadata?.call(this, t);
    this.toolCalls[e] = {
      id: t.id,
      type: `function`,
      function: { name: t.function.name, arguments: t.function.arguments ?? `` },
      hasFinished: !1,
      metadata: n,
    };
    let r = this.toolCalls[e];
    r.function.arguments.length > 0 &&
      this.controller.enqueue({ type: `tool-input-delta`, id: r.id, delta: r.function.arguments });
  }
  processExistingToolCall(e, t) {
    let n = this.toolCalls[e];
    n.hasFinished ||
      (t.function?.arguments != null &&
        ((n.function.arguments += t.function.arguments),
        this.controller.enqueue({
          type: `tool-input-delta`,
          id: n.id,
          delta: t.function.arguments,
        })));
  }
  finishToolCall(e) {
    this.controller.enqueue({ type: `tool-input-end`, id: e.id });
    let t = this.buildToolCallProviderMetadata?.call(this, e.metadata);
    (this.controller.enqueue({
      type: `tool-call`,
      toolCallId: e.id ?? this._generateId(),
      toolName: e.function.name,
      input: e.function.arguments,
      ...(t ? { providerMetadata: t } : {}),
    }),
      (e.hasFinished = !0));
  }
};
function Kd(e) {
  if (e?.trim() === ``)
    throw new r({ argument: `baseURL`, message: `baseURL must be a non-empty string.` });
  return e;
}
function qd(e) {
  return e?.replace(/\/$/, ``);
}
export {
  Wc as $,
  sd as A,
  Cd as B,
  Ul as C,
  Eo as Ct,
  ml as D,
  Ql as E,
  f as Et,
  $l as F,
  yd as G,
  Md as H,
  nu as I,
  Ud as J,
  _d as K,
  vd as L,
  Xl as M,
  Zl as N,
  Yl as O,
  tu as P,
  gd as Q,
  xd as R,
  Jl as S,
  Mo as St,
  Rl as T,
  Wr as Tt,
  Nd as U,
  jd as V,
  Pd as W,
  Ed as X,
  Bc as Y,
  Kd as Z,
  $c as _,
  oo as _t,
  Jc as a,
  Mc as at,
  Dd as b,
  Po as bt,
  Qc as c,
  po as ct,
  zd as d,
  to as dt,
  Gl as et,
  Rd as f,
  uo as ft,
  Ad as g,
  wo as gt,
  kd as h,
  Ro as ht,
  Gc as i,
  Nc as it,
  od as j,
  Sl as k,
  Yc as l,
  ho as lt,
  Od as m,
  os as mt,
  ld as n,
  hd as nt,
  Zc as o,
  ao as ot,
  Bd as p,
  Oo as pt,
  su as q,
  Fc as r,
  Pc as rt,
  Xc as s,
  Io as st,
  Gd as t,
  qd as tt,
  Vd as u,
  xo as ut,
  Lc as v,
  Co as vt,
  pl as w,
  _o as wt,
  Ll as x,
  Ra as xt,
  Fl as y,
  Ho as yt,
  wd as z,
};
