import { o as e, t } from "./chunk-BTyA9uPd.js";
import { c as n, d as r, f as i, l as a, p as o, s, u as c } from "./dist-CrxV2rsR.js";
import {
  D as l,
  E as u,
  O as d,
  a as f,
  c as p,
  i as m,
  l as h,
  m as g,
  p as _,
  u as v,
} from "./dist-B3qkUnLJ.js";
import {
  K as y,
  X as ee,
  _ as te,
  f as ne,
  n as re,
  o as ie,
  x as b,
  y as ae,
} from "./dist-BX517Nmz.js";
import { getStepFunction as oe } from "../../@workflow/core/private.js";
import { types as se } from "node:util";
import { AsyncLocalStorage as ce } from "node:async_hooks";
function le(e, t) {
  let n = Error.captureStackTrace;
  n?.(e, t);
}
const ue = (() => {
    let e = globalThis.process;
    return e?.env
      ? e.env.FORCE_COLOR && e.env.FORCE_COLOR !== `0`
        ? !0
        : e.env.NO_COLOR
          ? !1
          : !!e.stdout?.isTTY
      : !1;
  })(),
  x = (e, t) => (n) => (ue ? `\x1b[${e}m${n}\x1b[${t}m` : n),
  S = {
    bold: x(1, 22),
    dim: x(2, 22),
    italic: x(3, 23),
    red: x(31, 39),
    blue: x(34, 39),
    cyan: x(36, 39),
    yellow: x(33, 39),
    magenta: x(35, 39),
  },
  de = { info: S.blue, help: S.cyan, warn: S.yellow, error: S.red };
function fe(e) {
  let t = Array.isArray(e)
    ? e.join(`
`)
    : e;
  return de.info(`${S.bold(`hint:`)} ${t}`);
}
function pe(e) {
  return de.info(`${S.bold(`docs:`)} ${e}`);
}
function me(e) {
  return S.italic(`${S.dim("`")}${e}${S.dim("`")}`);
}
function C(e) {
  return S.dim(e);
}
function he(e) {
  return S.bold(e);
}
function ge(e) {
  return S.red(e);
}
function _e(e) {
  return S.magenta(e);
}
function ve(e, t) {
  let n = [e];
  return (
    t.forEach((e, r) => {
      let i = e.split(`
`),
        a = r === t.length - 1,
        o = a ? `╰▶ ` : `├▶ `,
        s = a ? `   ` : `│  `,
        c = i.map((e, t) => `${t === 0 ? o : s}${e}`);
      n.push(...c);
    }),
    n.join(`
`)
  );
}
const ye = Symbol.for(`nodejs.util.inspect.custom`);
function be(e) {
  return `code` in e ? `\`${e.code}\`` : `dim` in e ? e.dim : e.text;
}
function xe(e) {
  return `code` in e ? me(e.code) : `dim` in e ? C(e.dim) : e.text;
}
function Se(e) {
  return e.type === `docs` ? `docs: ${e.url}` : e.segments.map(be).join(``);
}
function Ce(e) {
  return e.type === `docs` ? pe(e.url) : e.segments.map(xe).join(``);
}
function we(e) {
  let t = [e.title.map(be).join(``)];
  return (
    e.details.forEach((n, r) => {
      let i = r === e.details.length - 1,
        a = i ? `╰▶ ` : `├▶ `,
        o = i ? `   ` : `│  `;
      Se(n)
        .split(`
`)
        .forEach((e, n) => t.push(`${n === 0 ? a : o}${e}`));
    }),
    t.join(`
`)
  );
}
function Te(e) {
  return ve(e.title.map(xe).join(``), e.details.map(Ce));
}
var Ee = class extends Error {
    fatal = !0;
    #e;
    constructor(e) {
      (super(we(e)), (this.#e = e));
    }
    [ye]() {
      let e = Te(this.#e),
        t = this.message.split(`
`).length,
        n = (this.stack ?? ``)
          .split(`
`)
          .slice(t).join(`
`);
      return n ? `${this.name}: ${e}\n${n}` : `${this.name}: ${e}`;
    }
    toString() {
      return `${this.name}: ${Te(this.#e)}`;
    }
  },
  De = class extends Ee {
    name = `NotInWorkflowContextError`;
    constructor(e, t) {
      super({
        title: [{ code: e }, { text: ` can only be called inside a workflow function` }],
        details: [{ type: `docs`, url: t }],
      });
    }
  },
  Oe = class extends Ee {
    name = `NotInStepContextError`;
    constructor(e, t) {
      super({
        title: [{ code: e }, { text: ` can only be called inside a step function` }],
        details: [{ type: `docs`, url: t }],
      });
    }
  },
  ke = class extends Ee {
    name = `NotInWorkflowOrStepContextError`;
    constructor(e, t) {
      super({
        title: [{ code: e }, { text: ` can only be called inside a workflow or step function` }],
        details: [{ type: `docs`, url: t }],
      });
    }
  };
const Ae = Symbol.for(`WORKFLOW_CONTEXT`);
function je() {
  let e = globalThis[Ae];
  if (!e) {
    let e = new ke(
      `getWorkflowMetadata()`,
      `https://workflow-sdk.dev/docs/api-reference/workflow/get-workflow-metadata`,
    );
    throw (le(e, je), e);
  }
  return e;
}
var Me = class extends Ee {
  name = `UnavailableInWorkflowContextError`;
  constructor(e, t) {
    let n = globalThis[Ae]?.workflowName,
      r = (() => {
        if (!n) return null;
        let e = n.match(/^(workflow\/|step\/)(.*)$/);
        return e ? [{ dim: e[1] }, { text: e[2] }] : [{ text: n }];
      })(),
      i = r
        ? {
            type: `plain`,
            segments: [
              { text: `this call was made from the ` },
              ...r,
              { text: ` workflow context.` },
            ],
          }
        : { type: `plain`, segments: [{ text: `this call was made from a workflow context.` }] };
    super({
      title: [{ code: e }, { text: ` cannot be called from a workflow context.` }],
      details: [
        {
          type: `plain`,
          segments: [{ text: `calling this in a workflow context can cause determinism issues.` }],
        },
        i,
        { type: `docs`, url: t },
      ],
    });
  }
};
function Ne(e, t, n) {
  let r = new De(e, t);
  throw (le(r, n), r);
}
function Pe(e, t, n) {
  let r = new Oe(e, t);
  throw (le(r, n), r);
}
function Fe(e, t, n) {
  let r = new ke(e, t);
  throw (le(r, n), r);
}
function Ie(e, t, n) {
  let r = new Me(e, t);
  throw (le(r, n), r);
}
var Le = t((e, t) => {
    t.exports = {
      MAX_LENGTH: 256,
      MAX_SAFE_COMPONENT_LENGTH: 16,
      MAX_SAFE_BUILD_LENGTH: 250,
      MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
      RELEASE_TYPES: [`major`, `premajor`, `minor`, `preminor`, `patch`, `prepatch`, `prerelease`],
      SEMVER_SPEC_VERSION: `2.0.0`,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2,
    };
  }),
  Re = t((e, t) => {
    t.exports =
      typeof process == `object` &&
      process.env &&
      process.env.NODE_DEBUG &&
      /\bsemver\b/i.test(process.env.NODE_DEBUG)
        ? (...e) => console.error(`SEMVER`, ...e)
        : () => {};
  }),
  ze = t((e, t) => {
    let { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = Le(),
      a = Re();
    e = t.exports = {};
    let o = (e.re = []),
      s = (e.safeRe = []),
      c = (e.src = []),
      l = (e.safeSrc = []),
      u = (e.t = {}),
      d = 0,
      f = `[a-zA-Z0-9-]`,
      p = [
        [`\\s`, 1],
        [`\\d`, i],
        [f, r],
      ],
      m = (e) => {
        for (let [t, n] of p)
          e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
        return e;
      },
      h = (e, t, n) => {
        let r = m(t),
          i = d++;
        (a(e, i, t),
          (u[e] = i),
          (c[i] = t),
          (l[i] = r),
          (o[i] = new RegExp(t, n ? `g` : void 0)),
          (s[i] = new RegExp(r, n ? `g` : void 0)));
      };
    (h(`NUMERICIDENTIFIER`, `0|[1-9]\\d*`),
      h(`NUMERICIDENTIFIERLOOSE`, `\\d+`),
      h(`NONNUMERICIDENTIFIER`, `\\d*[a-zA-Z-]${f}*`),
      h(
        `MAINVERSION`,
        `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`,
      ),
      h(
        `MAINVERSIONLOOSE`,
        `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`,
      ),
      h(`PRERELEASEIDENTIFIER`, `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`),
      h(
        `PRERELEASEIDENTIFIERLOOSE`,
        `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`,
      ),
      h(`PRERELEASE`, `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`),
      h(
        `PRERELEASELOOSE`,
        `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`,
      ),
      h(`BUILDIDENTIFIER`, `${f}+`),
      h(`BUILD`, `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`),
      h(`FULLPLAIN`, `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`),
      h(`FULL`, `^${c[u.FULLPLAIN]}$`),
      h(`LOOSEPLAIN`, `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`),
      h(`LOOSE`, `^${c[u.LOOSEPLAIN]}$`),
      h(`GTLT`, `((?:<|>)?=?)`),
      h(`XRANGEIDENTIFIERLOOSE`, `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
      h(`XRANGEIDENTIFIER`, `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`),
      h(
        `XRANGEPLAIN`,
        `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`,
      ),
      h(
        `XRANGEPLAINLOOSE`,
        `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`,
      ),
      h(`XRANGE`, `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`),
      h(`XRANGELOOSE`, `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`),
      h(`COERCEPLAIN`, `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),
      h(`COERCE`, `${c[u.COERCEPLAIN]}(?:$|[^\\d])`),
      h(`COERCEFULL`, c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`),
      h(`COERCERTL`, c[u.COERCE], !0),
      h(`COERCERTLFULL`, c[u.COERCEFULL], !0),
      h(`LONETILDE`, `(?:~>?)`),
      h(`TILDETRIM`, `(\\s*)${c[u.LONETILDE]}\\s+`, !0),
      (e.tildeTrimReplace = `$1~`),
      h(`TILDE`, `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`),
      h(`TILDELOOSE`, `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`),
      h(`LONECARET`, `(?:\\^)`),
      h(`CARETTRIM`, `(\\s*)${c[u.LONECARET]}\\s+`, !0),
      (e.caretTrimReplace = `$1^`),
      h(`CARET`, `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`),
      h(`CARETLOOSE`, `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`),
      h(`COMPARATORLOOSE`, `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`),
      h(`COMPARATOR`, `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`),
      h(`COMPARATORTRIM`, `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0),
      (e.comparatorTrimReplace = `$1$2$3`),
      h(`HYPHENRANGE`, `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`),
      h(
        `HYPHENRANGELOOSE`,
        `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`,
      ),
      h(`STAR`, `(<|>)?=?\\s*\\*`),
      h(`GTE0`, `^\\s*>=\\s*0\\.0\\.0\\s*$`),
      h(`GTE0PRE`, `^\\s*>=\\s*0\\.0\\.0-0\\s*$`));
  }),
  Be = t((e, t) => {
    let n = Object.freeze({ loose: !0 }),
      r = Object.freeze({});
    t.exports = (e) => (e ? (typeof e == `object` ? e : n) : r);
  }),
  Ve = t((e, t) => {
    let n = /^[0-9]+$/,
      r = (e, t) => {
        if (typeof e == `number` && typeof t == `number`) return e === t ? 0 : e < t ? -1 : 1;
        let r = n.test(e),
          i = n.test(t);
        return (
          r && i && ((e = +e), (t = +t)), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1
        );
      };
    t.exports = { compareIdentifiers: r, rcompareIdentifiers: (e, t) => r(t, e) };
  }),
  w = t((e, t) => {
    let n = Re(),
      { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = Le(),
      { safeRe: a, t: o } = ze(),
      s = Be(),
      { compareIdentifiers: c } = Ve();
    t.exports = class e {
      constructor(t, c) {
        if (((c = s(c)), t instanceof e)) {
          if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
          t = t.version;
        } else if (typeof t != `string`)
          throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
        if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
        (n(`SemVer`, t, c),
          (this.options = c),
          (this.loose = !!c.loose),
          (this.includePrerelease = !!c.includePrerelease));
        let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
        if (!l) throw TypeError(`Invalid Version: ${t}`);
        if (
          ((this.raw = t),
          (this.major = +l[1]),
          (this.minor = +l[2]),
          (this.patch = +l[3]),
          this.major > i || this.major < 0)
        )
          throw TypeError(`Invalid major version`);
        if (this.minor > i || this.minor < 0) throw TypeError(`Invalid minor version`);
        if (this.patch > i || this.patch < 0) throw TypeError(`Invalid patch version`);
        (l[4]
          ? (this.prerelease = l[4].split(`.`).map((e) => {
              if (/^[0-9]+$/.test(e)) {
                let t = +e;
                if (t >= 0 && t < i) return t;
              }
              return e;
            }))
          : (this.prerelease = []),
          (this.build = l[5] ? l[5].split(`.`) : []),
          this.format());
      }
      format() {
        return (
          (this.version = `${this.major}.${this.minor}.${this.patch}`),
          this.prerelease.length && (this.version += `-${this.prerelease.join(`.`)}`),
          this.version
        );
      }
      toString() {
        return this.version;
      }
      compare(t) {
        if ((n(`SemVer.compare`, this.version, this.options, t), !(t instanceof e))) {
          if (typeof t == `string` && t === this.version) return 0;
          t = new e(t, this.options);
        }
        return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
      }
      compareMain(t) {
        return (
          t instanceof e || (t = new e(t, this.options)),
          this.major < t.major
            ? -1
            : this.major > t.major
              ? 1
              : this.minor < t.minor
                ? -1
                : this.minor > t.minor
                  ? 1
                  : this.patch < t.patch
                    ? -1
                    : +(this.patch > t.patch)
        );
      }
      comparePre(t) {
        if (
          (t instanceof e || (t = new e(t, this.options)),
          this.prerelease.length && !t.prerelease.length)
        )
          return -1;
        if (!this.prerelease.length && t.prerelease.length) return 1;
        if (!this.prerelease.length && !t.prerelease.length) return 0;
        let r = 0;
        do {
          let e = this.prerelease[r],
            i = t.prerelease[r];
          if ((n(`prerelease compare`, r, e, i), e === void 0 && i === void 0)) return 0;
          if (i === void 0) return 1;
          if (e === void 0) return -1;
          if (e === i) continue;
          return c(e, i);
        } while (++r);
      }
      compareBuild(t) {
        t instanceof e || (t = new e(t, this.options));
        let r = 0;
        do {
          let e = this.build[r],
            i = t.build[r];
          if ((n(`build compare`, r, e, i), e === void 0 && i === void 0)) return 0;
          if (i === void 0) return 1;
          if (e === void 0) return -1;
          if (e === i) continue;
          return c(e, i);
        } while (++r);
      }
      inc(e, t, n) {
        if (e.startsWith(`pre`)) {
          if (!t && n === !1) throw Error(`invalid increment argument: identifier is empty`);
          if (t) {
            let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
            if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
          }
        }
        switch (e) {
          case `premajor`:
            ((this.prerelease.length = 0),
              (this.patch = 0),
              (this.minor = 0),
              this.major++,
              this.inc(`pre`, t, n));
            break;
          case `preminor`:
            ((this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc(`pre`, t, n));
            break;
          case `prepatch`:
            ((this.prerelease.length = 0), this.inc(`patch`, t, n), this.inc(`pre`, t, n));
            break;
          case `prerelease`:
            (this.prerelease.length === 0 && this.inc(`patch`, t, n), this.inc(`pre`, t, n));
            break;
          case `release`:
            if (this.prerelease.length === 0)
              throw Error(`version ${this.raw} is not a prerelease`);
            this.prerelease.length = 0;
            break;
          case `major`:
            ((this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++,
              (this.minor = 0),
              (this.patch = 0),
              (this.prerelease = []));
            break;
          case `minor`:
            ((this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
              (this.patch = 0),
              (this.prerelease = []));
            break;
          case `patch`:
            (this.prerelease.length === 0 && this.patch++, (this.prerelease = []));
            break;
          case `pre`: {
            let e = +!!Number(n);
            if (this.prerelease.length === 0) this.prerelease = [e];
            else {
              let r = this.prerelease.length;
              for (; --r >= 0;)
                typeof this.prerelease[r] == `number` && (this.prerelease[r]++, (r = -2));
              if (r === -1) {
                if (t === this.prerelease.join(`.`) && n === !1)
                  throw Error(`invalid increment argument: identifier already exists`);
                this.prerelease.push(e);
              }
            }
            if (t) {
              let r = [t, e];
              (n === !1 && (r = [t]),
                c(this.prerelease[0], t) === 0
                  ? isNaN(this.prerelease[1]) && (this.prerelease = r)
                  : (this.prerelease = r));
            }
            break;
          }
          default:
            throw Error(`invalid increment argument: ${e}`);
        }
        return (
          (this.raw = this.format()),
          this.build.length && (this.raw += `+${this.build.join(`.`)}`),
          this
        );
      }
    };
  }),
  He = t((e, t) => {
    let n = w();
    t.exports = (e, t, r = !1) => {
      if (e instanceof n) return e;
      try {
        return new n(e, t);
      } catch (e) {
        if (!r) return null;
        throw e;
      }
    };
  }),
  Ue = t((e, t) => {
    let n = He();
    t.exports = (e, t) => {
      let r = n(e, t);
      return r ? r.version : null;
    };
  }),
  We = t((e, t) => {
    let n = He();
    t.exports = (e, t) => {
      let r = n(e.trim().replace(/^[=v]+/, ``), t);
      return r ? r.version : null;
    };
  }),
  Ge = t((e, t) => {
    let n = w();
    t.exports = (e, t, r, i, a) => {
      typeof r == `string` && ((a = i), (i = r), (r = void 0));
      try {
        return new n(e instanceof n ? e.version : e, r).inc(t, i, a).version;
      } catch {
        return null;
      }
    };
  }),
  Ke = t((e, t) => {
    let n = He();
    t.exports = (e, t) => {
      let r = n(e, null, !0),
        i = n(t, null, !0),
        a = r.compare(i);
      if (a === 0) return null;
      let o = a > 0,
        s = o ? r : i,
        c = o ? i : r,
        l = !!s.prerelease.length;
      if (c.prerelease.length && !l) {
        if (!c.patch && !c.minor) return `major`;
        if (c.compareMain(s) === 0) return c.minor && !c.patch ? `minor` : `patch`;
      }
      let u = l ? `pre` : ``;
      return r.major === i.major
        ? r.minor === i.minor
          ? r.patch === i.patch
            ? `prerelease`
            : u + `patch`
          : u + `minor`
        : u + `major`;
    };
  }),
  qe = t((e, t) => {
    let n = w();
    t.exports = (e, t) => new n(e, t).major;
  }),
  Je = t((e, t) => {
    let n = w();
    t.exports = (e, t) => new n(e, t).minor;
  }),
  Ye = t((e, t) => {
    let n = w();
    t.exports = (e, t) => new n(e, t).patch;
  }),
  Xe = t((e, t) => {
    let n = He();
    t.exports = (e, t) => {
      let r = n(e, t);
      return r && r.prerelease.length ? r.prerelease : null;
    };
  }),
  T = t((e, t) => {
    let n = w();
    t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
  }),
  Ze = t((e, t) => {
    let n = T();
    t.exports = (e, t, r) => n(t, e, r);
  }),
  Qe = t((e, t) => {
    let n = T();
    t.exports = (e, t) => n(e, t, !0);
  }),
  $e = t((e, t) => {
    let n = w();
    t.exports = (e, t, r) => {
      let i = new n(e, r),
        a = new n(t, r);
      return i.compare(a) || i.compareBuild(a);
    };
  }),
  et = t((e, t) => {
    let n = $e();
    t.exports = (e, t) => e.sort((e, r) => n(e, r, t));
  }),
  tt = t((e, t) => {
    let n = $e();
    t.exports = (e, t) => e.sort((e, r) => n(r, e, t));
  }),
  nt = t((e, t) => {
    let n = T();
    t.exports = (e, t, r) => n(e, t, r) > 0;
  }),
  rt = t((e, t) => {
    let n = T();
    t.exports = (e, t, r) => n(e, t, r) < 0;
  }),
  it = t((e, t) => {
    let n = T();
    t.exports = (e, t, r) => n(e, t, r) === 0;
  }),
  at = t((e, t) => {
    let n = T();
    t.exports = (e, t, r) => n(e, t, r) !== 0;
  }),
  ot = t((e, t) => {
    let n = T();
    t.exports = (e, t, r) => n(e, t, r) >= 0;
  }),
  st = t((e, t) => {
    let n = T();
    t.exports = (e, t, r) => n(e, t, r) <= 0;
  }),
  ct = t((e, t) => {
    let n = it(),
      r = at(),
      i = nt(),
      a = ot(),
      o = rt(),
      s = st();
    t.exports = (e, t, c, l) => {
      switch (t) {
        case `===`:
          return (
            typeof e == `object` && (e = e.version),
            typeof c == `object` && (c = c.version),
            e === c
          );
        case `!==`:
          return (
            typeof e == `object` && (e = e.version),
            typeof c == `object` && (c = c.version),
            e !== c
          );
        case ``:
        case `=`:
        case `==`:
          return n(e, c, l);
        case `!=`:
          return r(e, c, l);
        case `>`:
          return i(e, c, l);
        case `>=`:
          return a(e, c, l);
        case `<`:
          return o(e, c, l);
        case `<=`:
          return s(e, c, l);
        default:
          throw TypeError(`Invalid operator: ${t}`);
      }
    };
  }),
  lt = t((e, t) => {
    let n = w(),
      r = He(),
      { safeRe: i, t: a } = ze();
    t.exports = (e, t) => {
      if (e instanceof n) return e;
      if ((typeof e == `number` && (e = String(e)), typeof e != `string`)) return null;
      t ||= {};
      let o = null;
      if (!t.rtl) o = e.match(t.includePrerelease ? i[a.COERCEFULL] : i[a.COERCE]);
      else {
        let n = t.includePrerelease ? i[a.COERCERTLFULL] : i[a.COERCERTL],
          r;
        for (; (r = n.exec(e)) && (!o || o.index + o[0].length !== e.length);)
          ((!o || r.index + r[0].length !== o.index + o[0].length) && (o = r),
            (n.lastIndex = r.index + r[1].length + r[2].length));
        n.lastIndex = -1;
      }
      if (o === null) return null;
      let s = o[2];
      return r(
        `${s}.${o[3] || `0`}.${o[4] || `0`}${t.includePrerelease && o[5] ? `-${o[5]}` : ``}${t.includePrerelease && o[6] ? `+${o[6]}` : ``}`,
        t,
      );
    };
  }),
  ut = t((e, t) => {
    t.exports = class {
      constructor() {
        ((this.max = 1e3), (this.map = new Map()));
      }
      get(e) {
        let t = this.map.get(e);
        if (t !== void 0) return (this.map.delete(e), this.map.set(e, t), t);
      }
      delete(e) {
        return this.map.delete(e);
      }
      set(e, t) {
        if (!this.delete(e) && t !== void 0) {
          if (this.map.size >= this.max) {
            let e = this.map.keys().next().value;
            this.delete(e);
          }
          this.map.set(e, t);
        }
        return this;
      }
    };
  }),
  E = t((e, t) => {
    let n = /\s+/g;
    t.exports = class e {
      constructor(t, r) {
        if (((r = i(r)), t instanceof e))
          return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease
            ? t
            : new e(t.raw, r);
        if (t instanceof a)
          return ((this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this);
        if (
          ((this.options = r),
          (this.loose = !!r.loose),
          (this.includePrerelease = !!r.includePrerelease),
          (this.raw = t.trim().replace(n, ` `)),
          (this.set = this.raw
            .split(`||`)
            .map((e) => this.parseRange(e.trim()))
            .filter((e) => e.length)),
          !this.set.length)
        )
          throw TypeError(`Invalid SemVer Range: ${this.raw}`);
        if (this.set.length > 1) {
          let e = this.set[0];
          if (((this.set = this.set.filter((e) => !h(e[0]))), this.set.length === 0))
            this.set = [e];
          else if (this.set.length > 1) {
            for (let e of this.set)
              if (e.length === 1 && g(e[0])) {
                this.set = [e];
                break;
              }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = ``;
          for (let e = 0; e < this.set.length; e++) {
            e > 0 && (this.formatted += `||`);
            let t = this.set[e];
            for (let e = 0; e < t.length; e++)
              (e > 0 && (this.formatted += ` `), (this.formatted += t[e].toString().trim()));
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(e) {
        let t = ((this.options.includePrerelease && p) | (this.options.loose && m)) + `:` + e,
          n = r.get(t);
        if (n) return n;
        let i = this.options.loose,
          s = i ? c[l.HYPHENRANGELOOSE] : c[l.HYPHENRANGE];
        ((e = e.replace(s, se(this.options.includePrerelease))),
          o(`hyphen replace`, e),
          (e = e.replace(c[l.COMPARATORTRIM], u)),
          o(`comparator trim`, e),
          (e = e.replace(c[l.TILDETRIM], d)),
          o(`tilde trim`, e),
          (e = e.replace(c[l.CARETTRIM], f)),
          o(`caret trim`, e));
        let g = e
          .split(` `)
          .map((e) => v(e, this.options))
          .join(` `)
          .split(/\s+/)
          .map((e) => oe(e, this.options));
        (i &&
          (g = g.filter(
            (e) => (o(`loose invalid filter`, e, this.options), !!e.match(c[l.COMPARATORLOOSE])),
          )),
          o(`range list`, g));
        let _ = new Map(),
          y = g.map((e) => new a(e, this.options));
        for (let e of y) {
          if (h(e)) return [e];
          _.set(e.value, e);
        }
        _.size > 1 && _.has(``) && _.delete(``);
        let ee = [..._.values()];
        return (r.set(t, ee), ee);
      }
      intersects(t, n) {
        if (!(t instanceof e)) throw TypeError(`a Range is required`);
        return this.set.some(
          (e) =>
            _(e, n) &&
            t.set.some((t) => _(t, n) && e.every((e) => t.every((t) => e.intersects(t, n)))),
        );
      }
      test(e) {
        if (!e) return !1;
        if (typeof e == `string`)
          try {
            e = new s(e, this.options);
          } catch {
            return !1;
          }
        for (let t = 0; t < this.set.length; t++) if (ce(this.set[t], e, this.options)) return !0;
        return !1;
      }
    };
    let r = new (ut())(),
      i = Be(),
      a = dt(),
      o = Re(),
      s = w(),
      {
        safeRe: c,
        t: l,
        comparatorTrimReplace: u,
        tildeTrimReplace: d,
        caretTrimReplace: f,
      } = ze(),
      { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: m } = Le(),
      h = (e) => e.value === `<0.0.0-0`,
      g = (e) => e.value === ``,
      _ = (e, t) => {
        let n = !0,
          r = e.slice(),
          i = r.pop();
        for (; n && r.length;) ((n = r.every((e) => i.intersects(e, t))), (i = r.pop()));
        return n;
      },
      v = (e, t) => (
        (e = e.replace(c[l.BUILD], ``)),
        o(`comp`, e, t),
        (e = ne(e, t)),
        o(`caret`, e),
        (e = ee(e, t)),
        o(`tildes`, e),
        (e = ie(e, t)),
        o(`xrange`, e),
        (e = ae(e, t)),
        o(`stars`, e),
        e
      ),
      y = (e) => !e || e.toLowerCase() === `x` || e === `*`,
      ee = (e, t) =>
        e
          .trim()
          .split(/\s+/)
          .map((e) => te(e, t))
          .join(` `),
      te = (e, t) => {
        let n = t.loose ? c[l.TILDELOOSE] : c[l.TILDE];
        return e.replace(n, (t, n, r, i, a) => {
          o(`tilde`, e, t, n, r, i, a);
          let s;
          return (
            y(n)
              ? (s = ``)
              : y(r)
                ? (s = `>=${n}.0.0 <${+n + 1}.0.0-0`)
                : y(i)
                  ? (s = `>=${n}.${r}.0 <${n}.${+r + 1}.0-0`)
                  : a
                    ? (o(`replaceTilde pr`, a), (s = `>=${n}.${r}.${i}-${a} <${n}.${+r + 1}.0-0`))
                    : (s = `>=${n}.${r}.${i} <${n}.${+r + 1}.0-0`),
            o(`tilde return`, s),
            s
          );
        });
      },
      ne = (e, t) =>
        e
          .trim()
          .split(/\s+/)
          .map((e) => re(e, t))
          .join(` `),
      re = (e, t) => {
        o(`caret`, e, t);
        let n = t.loose ? c[l.CARETLOOSE] : c[l.CARET],
          r = t.includePrerelease ? `-0` : ``;
        return e.replace(n, (t, n, i, a, s) => {
          o(`caret`, e, t, n, i, a, s);
          let c;
          return (
            y(n)
              ? (c = ``)
              : y(i)
                ? (c = `>=${n}.0.0${r} <${+n + 1}.0.0-0`)
                : y(a)
                  ? (c =
                      n === `0`
                        ? `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0`
                        : `>=${n}.${i}.0${r} <${+n + 1}.0.0-0`)
                  : s
                    ? (o(`replaceCaret pr`, s),
                      (c =
                        n === `0`
                          ? i === `0`
                            ? `>=${n}.${i}.${a}-${s} <${n}.${i}.${+a + 1}-0`
                            : `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0`
                          : `>=${n}.${i}.${a}-${s} <${+n + 1}.0.0-0`))
                    : (o(`no pr`),
                      (c =
                        n === `0`
                          ? i === `0`
                            ? `>=${n}.${i}.${a}${r} <${n}.${i}.${+a + 1}-0`
                            : `>=${n}.${i}.${a}${r} <${n}.${+i + 1}.0-0`
                          : `>=${n}.${i}.${a} <${+n + 1}.0.0-0`)),
            o(`caret return`, c),
            c
          );
        });
      },
      ie = (e, t) => (
        o(`replaceXRanges`, e, t),
        e
          .split(/\s+/)
          .map((e) => b(e, t))
          .join(` `)
      ),
      b = (e, t) => {
        e = e.trim();
        let n = t.loose ? c[l.XRANGELOOSE] : c[l.XRANGE];
        return e.replace(n, (n, r, i, a, s, c) => {
          o(`xRange`, e, n, r, i, a, s, c);
          let l = y(i),
            u = l || y(a),
            d = u || y(s),
            f = d;
          return (
            r === `=` && f && (r = ``),
            (c = t.includePrerelease ? `-0` : ``),
            l
              ? (n = r === `>` || r === `<` ? `<0.0.0-0` : `*`)
              : r && f
                ? (u && (a = 0),
                  (s = 0),
                  r === `>`
                    ? ((r = `>=`), u ? ((i = +i + 1), (a = 0), (s = 0)) : ((a = +a + 1), (s = 0)))
                    : r === `<=` && ((r = `<`), u ? (i = +i + 1) : (a = +a + 1)),
                  r === `<` && (c = `-0`),
                  (n = `${r + i}.${a}.${s}${c}`))
                : u
                  ? (n = `>=${i}.0.0${c} <${+i + 1}.0.0-0`)
                  : d && (n = `>=${i}.${a}.0${c} <${i}.${+a + 1}.0-0`),
            o(`xRange return`, n),
            n
          );
        });
      },
      ae = (e, t) => (o(`replaceStars`, e, t), e.trim().replace(c[l.STAR], ``)),
      oe = (e, t) => (
        o(`replaceGTE0`, e, t),
        e.trim().replace(c[t.includePrerelease ? l.GTE0PRE : l.GTE0], ``)
      ),
      se = (e) => (t, n, r, i, a, o, s, c, l, u, d, f) => (
        (n = y(r)
          ? ``
          : y(i)
            ? `>=${r}.0.0${e ? `-0` : ``}`
            : y(a)
              ? `>=${r}.${i}.0${e ? `-0` : ``}`
              : o
                ? `>=${n}`
                : `>=${n}${e ? `-0` : ``}`),
        (c = y(l)
          ? ``
          : y(u)
            ? `<${+l + 1}.0.0-0`
            : y(d)
              ? `<${l}.${+u + 1}.0-0`
              : f
                ? `<=${l}.${u}.${d}-${f}`
                : e
                  ? `<${l}.${u}.${+d + 1}-0`
                  : `<=${c}`),
        `${n} ${c}`.trim()
      ),
      ce = (e, t, n) => {
        for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
        if (t.prerelease.length && !n.includePrerelease) {
          for (let n = 0; n < e.length; n++)
            if ((o(e[n].semver), e[n].semver !== a.ANY && e[n].semver.prerelease.length > 0)) {
              let r = e[n].semver;
              if (r.major === t.major && r.minor === t.minor && r.patch === t.patch) return !0;
            }
          return !1;
        }
        return !0;
      };
  }),
  dt = t((e, t) => {
    let n = Symbol(`SemVer ANY`);
    t.exports = class e {
      static get ANY() {
        return n;
      }
      constructor(t, i) {
        if (((i = r(i)), t instanceof e)) {
          if (t.loose === !!i.loose) return t;
          t = t.value;
        }
        ((t = t.trim().split(/\s+/).join(` `)),
          s(`comparator`, t, i),
          (this.options = i),
          (this.loose = !!i.loose),
          this.parse(t),
          this.semver === n
            ? (this.value = ``)
            : (this.value = this.operator + this.semver.version),
          s(`comp`, this));
      }
      parse(e) {
        let t = this.options.loose ? i[a.COMPARATORLOOSE] : i[a.COMPARATOR],
          r = e.match(t);
        if (!r) throw TypeError(`Invalid comparator: ${e}`);
        ((this.operator = r[1] === void 0 ? `` : r[1]),
          this.operator === `=` && (this.operator = ``),
          r[2] ? (this.semver = new c(r[2], this.options.loose)) : (this.semver = n));
      }
      toString() {
        return this.value;
      }
      test(e) {
        if ((s(`Comparator.test`, e, this.options.loose), this.semver === n || e === n)) return !0;
        if (typeof e == `string`)
          try {
            e = new c(e, this.options);
          } catch {
            return !1;
          }
        return o(e, this.operator, this.semver, this.options);
      }
      intersects(t, n) {
        if (!(t instanceof e)) throw TypeError(`a Comparator is required`);
        return this.operator === ``
          ? this.value === ``
            ? !0
            : new l(t.value, n).test(this.value)
          : t.operator === ``
            ? t.value === ``
              ? !0
              : new l(this.value, n).test(t.semver)
            : ((n = r(n)),
              (n.includePrerelease && (this.value === `<0.0.0-0` || t.value === `<0.0.0-0`)) ||
              (!n.includePrerelease &&
                (this.value.startsWith(`<0.0.0`) || t.value.startsWith(`<0.0.0`)))
                ? !1
                : !!(
                    (this.operator.startsWith(`>`) && t.operator.startsWith(`>`)) ||
                    (this.operator.startsWith(`<`) && t.operator.startsWith(`<`)) ||
                    (this.semver.version === t.semver.version &&
                      this.operator.includes(`=`) &&
                      t.operator.includes(`=`)) ||
                    (o(this.semver, `<`, t.semver, n) &&
                      this.operator.startsWith(`>`) &&
                      t.operator.startsWith(`<`)) ||
                    (o(this.semver, `>`, t.semver, n) &&
                      this.operator.startsWith(`<`) &&
                      t.operator.startsWith(`>`))
                  ));
      }
    };
    let r = Be(),
      { safeRe: i, t: a } = ze(),
      o = ct(),
      s = Re(),
      c = w(),
      l = E();
  }),
  ft = t((e, t) => {
    let n = E();
    t.exports = (e, t, r) => {
      try {
        t = new n(t, r);
      } catch {
        return !1;
      }
      return t.test(e);
    };
  }),
  pt = t((e, t) => {
    let n = E();
    t.exports = (e, t) =>
      new n(e, t).set.map((e) =>
        e
          .map((e) => e.value)
          .join(` `)
          .trim()
          .split(` `),
      );
  }),
  mt = t((e, t) => {
    let n = w(),
      r = E();
    t.exports = (e, t, i) => {
      let a = null,
        o = null,
        s = null;
      try {
        s = new r(t, i);
      } catch {
        return null;
      }
      return (
        e.forEach((e) => {
          s.test(e) && (!a || o.compare(e) === -1) && ((a = e), (o = new n(a, i)));
        }),
        a
      );
    };
  }),
  ht = t((e, t) => {
    let n = w(),
      r = E();
    t.exports = (e, t, i) => {
      let a = null,
        o = null,
        s = null;
      try {
        s = new r(t, i);
      } catch {
        return null;
      }
      return (
        e.forEach((e) => {
          s.test(e) && (!a || o.compare(e) === 1) && ((a = e), (o = new n(a, i)));
        }),
        a
      );
    };
  }),
  gt = t((e, t) => {
    let n = w(),
      r = E(),
      i = nt();
    t.exports = (e, t) => {
      e = new r(e, t);
      let a = new n(`0.0.0`);
      if (e.test(a) || ((a = new n(`0.0.0-0`)), e.test(a))) return a;
      a = null;
      for (let t = 0; t < e.set.length; ++t) {
        let r = e.set[t],
          o = null;
        (r.forEach((e) => {
          let t = new n(e.semver.version);
          switch (e.operator) {
            case `>`:
              (t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), (t.raw = t.format()));
            case ``:
            case `>=`:
              (!o || i(t, o)) && (o = t);
              break;
            case `<`:
            case `<=`:
              break;
            default:
              throw Error(`Unexpected operation: ${e.operator}`);
          }
        }),
          o && (!a || i(a, o)) && (a = o));
      }
      return a && e.test(a) ? a : null;
    };
  }),
  _t = t((e, t) => {
    let n = E();
    t.exports = (e, t) => {
      try {
        return new n(e, t).range || `*`;
      } catch {
        return null;
      }
    };
  }),
  vt = t((e, t) => {
    let n = w(),
      r = dt(),
      { ANY: i } = r,
      a = E(),
      o = ft(),
      s = nt(),
      c = rt(),
      l = st(),
      u = ot();
    t.exports = (e, t, d, f) => {
      ((e = new n(e, f)), (t = new a(t, f)));
      let p, m, h, g, _;
      switch (d) {
        case `>`:
          ((p = s), (m = l), (h = c), (g = `>`), (_ = `>=`));
          break;
        case `<`:
          ((p = c), (m = u), (h = s), (g = `<`), (_ = `<=`));
          break;
        default:
          throw TypeError(`Must provide a hilo val of "<" or ">"`);
      }
      if (o(e, t, f)) return !1;
      for (let n = 0; n < t.set.length; ++n) {
        let a = t.set[n],
          o = null,
          s = null;
        if (
          (a.forEach((e) => {
            (e.semver === i && (e = new r(`>=0.0.0`)),
              (o ||= e),
              (s ||= e),
              p(e.semver, o.semver, f) ? (o = e) : h(e.semver, s.semver, f) && (s = e));
          }),
          o.operator === g ||
            o.operator === _ ||
            ((!s.operator || s.operator === g) && m(e, s.semver)) ||
            (s.operator === _ && h(e, s.semver)))
        )
          return !1;
      }
      return !0;
    };
  }),
  yt = t((e, t) => {
    let n = vt();
    t.exports = (e, t, r) => n(e, t, `>`, r);
  }),
  bt = t((e, t) => {
    let n = vt();
    t.exports = (e, t, r) => n(e, t, `<`, r);
  }),
  xt = t((e, t) => {
    let n = E();
    t.exports = (e, t, r) => ((e = new n(e, r)), (t = new n(t, r)), e.intersects(t, r));
  }),
  St = t((e, t) => {
    let n = ft(),
      r = T();
    t.exports = (e, t, i) => {
      let a = [],
        o = null,
        s = null,
        c = e.sort((e, t) => r(e, t, i));
      for (let e of c)
        n(e, t, i) ? ((s = e), (o ||= e)) : (s && a.push([o, s]), (s = null), (o = null));
      o && a.push([o, null]);
      let l = [];
      for (let [e, t] of a)
        e === t
          ? l.push(e)
          : !t && e === c[0]
            ? l.push(`*`)
            : t
              ? e === c[0]
                ? l.push(`<=${t}`)
                : l.push(`${e} - ${t}`)
              : l.push(`>=${e}`);
      let u = l.join(` || `),
        d = typeof t.raw == `string` ? t.raw : String(t);
      return u.length < d.length ? u : t;
    };
  }),
  Ct = t((e, t) => {
    let n = E(),
      r = dt(),
      { ANY: i } = r,
      a = ft(),
      o = T(),
      s = (e, t, r = {}) => {
        if (e === t) return !0;
        ((e = new n(e, r)), (t = new n(t, r)));
        let i = !1;
        OUTER: for (let n of e.set) {
          for (let e of t.set) {
            let t = u(n, e, r);
            if (((i ||= t !== null), t)) continue OUTER;
          }
          if (i) return !1;
        }
        return !0;
      },
      c = [new r(`>=0.0.0-0`)],
      l = [new r(`>=0.0.0`)],
      u = (e, t, n) => {
        if (e === t) return !0;
        if (e.length === 1 && e[0].semver === i) {
          if (t.length === 1 && t[0].semver === i) return !0;
          e = n.includePrerelease ? c : l;
        }
        if (t.length === 1 && t[0].semver === i) {
          if (n.includePrerelease) return !0;
          t = l;
        }
        let r = new Set(),
          s,
          u;
        for (let t of e)
          t.operator === `>` || t.operator === `>=`
            ? (s = d(s, t, n))
            : t.operator === `<` || t.operator === `<=`
              ? (u = f(u, t, n))
              : r.add(t.semver);
        if (r.size > 1) return null;
        let p;
        if (
          s &&
          u &&
          ((p = o(s.semver, u.semver, n)),
          p > 0 || (p === 0 && (s.operator !== `>=` || u.operator !== `<=`)))
        )
          return null;
        for (let e of r) {
          if ((s && !a(e, String(s), n)) || (u && !a(e, String(u), n))) return null;
          for (let r of t) if (!a(e, String(r), n)) return !1;
          return !0;
        }
        let m,
          h,
          g,
          _,
          v = u && !n.includePrerelease && u.semver.prerelease.length ? u.semver : !1,
          y = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
        v && v.prerelease.length === 1 && u.operator === `<` && v.prerelease[0] === 0 && (v = !1);
        for (let e of t) {
          if (
            ((_ = _ || e.operator === `>` || e.operator === `>=`),
            (g = g || e.operator === `<` || e.operator === `<=`),
            s)
          ) {
            if (
              (y &&
                e.semver.prerelease &&
                e.semver.prerelease.length &&
                e.semver.major === y.major &&
                e.semver.minor === y.minor &&
                e.semver.patch === y.patch &&
                (y = !1),
              e.operator === `>` || e.operator === `>=`)
            ) {
              if (((m = d(s, e, n)), m === e && m !== s)) return !1;
            } else if (s.operator === `>=` && !a(s.semver, String(e), n)) return !1;
          }
          if (u) {
            if (
              (v &&
                e.semver.prerelease &&
                e.semver.prerelease.length &&
                e.semver.major === v.major &&
                e.semver.minor === v.minor &&
                e.semver.patch === v.patch &&
                (v = !1),
              e.operator === `<` || e.operator === `<=`)
            ) {
              if (((h = f(u, e, n)), h === e && h !== u)) return !1;
            } else if (u.operator === `<=` && !a(u.semver, String(e), n)) return !1;
          }
          if (!e.operator && (u || s) && p !== 0) return !1;
        }
        return !((s && g && !u && p !== 0) || (u && _ && !s && p !== 0) || y || v);
      },
      d = (e, t, n) => {
        if (!e) return t;
        let r = o(e.semver, t.semver, n);
        return r > 0 ? e : r < 0 || (t.operator === `>` && e.operator === `>=`) ? t : e;
      },
      f = (e, t, n) => {
        if (!e) return t;
        let r = o(e.semver, t.semver, n);
        return r < 0 ? e : r > 0 || (t.operator === `<` && e.operator === `<=`) ? t : e;
      };
    t.exports = s;
  }),
  wt = t((e, t) => {
    let n = ze(),
      r = Le(),
      i = w(),
      a = Ve();
    t.exports = {
      parse: He(),
      valid: Ue(),
      clean: We(),
      inc: Ge(),
      diff: Ke(),
      major: qe(),
      minor: Je(),
      patch: Ye(),
      prerelease: Xe(),
      compare: T(),
      rcompare: Ze(),
      compareLoose: Qe(),
      compareBuild: $e(),
      sort: et(),
      rsort: tt(),
      gt: nt(),
      lt: rt(),
      eq: it(),
      neq: at(),
      gte: ot(),
      lte: st(),
      cmp: ct(),
      coerce: lt(),
      Comparator: dt(),
      Range: E(),
      satisfies: ft(),
      toComparators: pt(),
      maxSatisfying: mt(),
      minSatisfying: ht(),
      minVersion: gt(),
      validRange: _t(),
      outside: vt(),
      gtr: yt(),
      ltr: bt(),
      intersects: xt(),
      simplifyRange: St(),
      subset: Ct(),
      SemVer: i,
      re: n.re,
      src: n.src,
      tokens: n.t,
      SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: r.RELEASE_TYPES,
      compareIdentifiers: a.compareIdentifiers,
      rcompareIdentifiers: a.rcompareIdentifiers,
    };
  });
function Tt(e) {
  return new Uint8Array(e).toBase64();
}
function Et(e) {
  return Uint8Array.fromBase64(e).buffer;
}
function Dt(e) {
  return Buffer.from(e).toString(`base64`);
}
function Ot(e) {
  return Uint8Array.from(Buffer.from(e, `base64`)).buffer;
}
function kt(e) {
  let t = new Uint8Array(e),
    n = ``,
    r = 32768;
  for (let e = 0; e < t.length; e += r) {
    let i = t.subarray(e, e + r);
    n += String.fromCharCode.apply(null, i);
  }
  return btoa(n);
}
function At(e) {
  let t = atob(e),
    n = t.length,
    r = new Uint8Array(n);
  for (let e = 0; e < n; e++) r[e] = t.charCodeAt(e);
  return r.buffer;
}
const jt = typeof Uint8Array.fromBase64 == `function`,
  Mt = typeof process == `object` && process.versions?.node !== void 0,
  Nt = jt ? Tt : Mt ? Dt : kt,
  Pt = jt ? Et : Mt ? Ot : At,
  Ft = 2 ** 32 - 1,
  It = Ft - 1;
var D = class extends Error {
  constructor(e, t, n, r) {
    (super(e),
      (this.name = `DevalueError`),
      (this.path = t.join(``)),
      (this.value = n),
      (this.root = r));
  }
};
function Lt(e) {
  return e === null || (typeof e != `object` && typeof e != `function`);
}
const Rt = Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
function zt(e) {
  let t = Object.getPrototypeOf(e);
  return (
    t === Object.prototype ||
    t === null ||
    Object.getPrototypeOf(t) === null ||
    Object.getOwnPropertyNames(t).sort().join(`\0`) === Rt
  );
}
function Bt(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function Vt(e) {
  switch (e) {
    case `"`:
      return `\\"`;
    case `<`:
      return `\\u003C`;
    case `\\`:
      return `\\\\`;
    case `
`:
      return `\\n`;
    case `\r`:
      return `\\r`;
    case `	`:
      return `\\t`;
    case `\b`:
      return `\\b`;
    case `\f`:
      return `\\f`;
    case `\u2028`:
      return `\\u2028`;
    case `\u2029`:
      return `\\u2029`;
    default:
      return e < ` ` ? `\\u${e.charCodeAt(0).toString(16).padStart(4, `0`)}` : ``;
  }
}
function O(e) {
  let t = ``,
    n = 0,
    r = e.length;
  for (let i = 0; i < r; i += 1) {
    let r = e[i],
      a = Vt(r);
    a && ((t += e.slice(n, i) + a), (n = i + 1));
  }
  return `"${n === 0 ? e : t + e.slice(n)}"`;
}
function Ht(e) {
  return Object.getOwnPropertySymbols(e).filter(
    (t) => Object.getOwnPropertyDescriptor(e, t).enumerable,
  );
}
const Ut = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function Wt(e) {
  return Ut.test(e) ? `.` + e : `[` + JSON.stringify(e) + `]`;
}
function Gt(e) {
  return !(!Number.isInteger(e) || e < 0 || e > It);
}
function Kt(e) {
  return !(!Number.isInteger(e) || e < 0 || e > Ft);
}
function qt(e) {
  if (e.length === 0 || (e.length > 1 && e.charCodeAt(0) === 48)) return !1;
  for (let t = 0; t < e.length; t++) {
    let n = e.charCodeAt(t);
    if (n < 48 || n > 57) return !1;
  }
  return Gt(+e);
}
function Jt(e) {
  let t = Object.keys(e);
  for (var n = t.length - 1; n >= 0 && !qt(t[n]); n--);
  return ((t.length = n + 1), t);
}
function Yt(e, t) {
  return Xt(JSON.parse(e), t);
}
function Xt(e, t) {
  if (typeof e == `number`) return a(e, !0);
  if (!Array.isArray(e) || e.length === 0) throw Error(`Invalid input`);
  let n = e,
    r = Array(n.length),
    i = null;
  function a(e, o = !1) {
    if (e === -1) return;
    if (e === -3) return NaN;
    if (e === -4) return 1 / 0;
    if (e === -5) return -1 / 0;
    if (e === -6) return -0;
    if (o || typeof e != `number`) throw Error(`Invalid input`);
    if (e in r) return r[e];
    let s = n[e];
    if (!s || typeof s != `object`) r[e] = s;
    else if (Array.isArray(s))
      if (typeof s[0] == `string`) {
        let o = s[0],
          c = t && Object.hasOwn(t, o) ? t[o] : void 0;
        if (c) {
          let t = s[1];
          if ((typeof t != `number` && (t = n.push(s[1]) - 1), (i ??= new Set()), i.has(t)))
            throw Error(`Invalid circular reference`);
          return (i.add(t), (r[e] = c(a(t))), i.delete(t), r[e]);
        }
        switch (o) {
          case `Date`:
            r[e] = new Date(s[1]);
            break;
          case `Set`:
            let t = new Set();
            r[e] = t;
            for (let e = 1; e < s.length; e += 1) t.add(a(s[e]));
            break;
          case `Map`:
            let i = new Map();
            r[e] = i;
            for (let e = 1; e < s.length; e += 2) i.set(a(s[e]), a(s[e + 1]));
            break;
          case `RegExp`:
            r[e] = new RegExp(s[1], s[2]);
            break;
          case `Object`: {
            let t = s[1];
            if (typeof n[t] == `object` && n[t][0] !== `BigInt`) throw Error(`Invalid input`);
            r[e] = Object(a(t));
            break;
          }
          case `BigInt`:
            r[e] = BigInt(s[1]);
            break;
          case `null`:
            let c = Object.create(null);
            r[e] = c;
            for (let e = 1; e < s.length; e += 2) {
              if (s[e] === `__proto__`)
                throw Error("Cannot parse an object with a `__proto__` property");
              c[s[e]] = a(s[e + 1]);
            }
            break;
          case `Int8Array`:
          case `Uint8Array`:
          case `Uint8ClampedArray`:
          case `Int16Array`:
          case `Uint16Array`:
          case `Float16Array`:
          case `Int32Array`:
          case `Uint32Array`:
          case `Float32Array`:
          case `Float64Array`:
          case `BigInt64Array`:
          case `BigUint64Array`:
          case `DataView`: {
            if (n[s[1]][0] !== `ArrayBuffer`) throw Error(`Invalid data`);
            let t = globalThis[o],
              i = a(s[1]);
            r[e] = s[2] === void 0 ? new t(i) : new t(i, s[2], s[3]);
            break;
          }
          case `ArrayBuffer`: {
            let t = s[1];
            if (typeof t != `string`) throw Error(`Invalid ArrayBuffer encoding`);
            r[e] = Pt(t);
            break;
          }
          case `Temporal.Duration`:
          case `Temporal.Instant`:
          case `Temporal.PlainDate`:
          case `Temporal.PlainTime`:
          case `Temporal.PlainDateTime`:
          case `Temporal.PlainMonthDay`:
          case `Temporal.PlainYearMonth`:
          case `Temporal.ZonedDateTime`: {
            let t = o.slice(9);
            r[e] = Temporal[t].from(s[1]);
            break;
          }
          case `URL`:
            r[e] = new URL(s[1]);
            break;
          case `URLSearchParams`:
            r[e] = new URLSearchParams(s[1]);
            break;
          default:
            throw Error(`Unknown type ${o}`);
        }
      } else if (s[0] === -7) {
        let t = s[1];
        if (!Kt(t)) throw Error(`Invalid input`);
        let n = [];
        ((r[e] = n), (n[It] = void 0), delete n[It]);
        for (let e = 2; e < s.length; e += 2) {
          let r = s[e];
          if (!Gt(r) || r >= t) throw Error(`Invalid input`);
          n[r] = a(s[e + 1]);
        }
        n.length = t;
      } else {
        let t = Array(s.length);
        r[e] = t;
        for (let e = 0; e < s.length; e += 1) {
          let n = s[e];
          n !== -2 && (t[e] = a(n));
        }
      }
    else {
      let t = {};
      r[e] = t;
      for (let e of Object.keys(s)) {
        if (e === `__proto__`) throw Error("Cannot parse an object with a `__proto__` property");
        let n = s[e];
        t[e] = a(n);
      }
    }
    return r[e];
  }
  return a(0);
}
function k(e, t) {
  let n = Zt(!1, e, t);
  return typeof n == `string` ? n : `[${n.join(`,`)}]`;
}
function Zt(e, t, n) {
  let r = [],
    i = new Map(),
    a = [];
  if (n) for (let e of Object.getOwnPropertyNames(n)) a.push({ key: e, fn: n[e] });
  let o = [],
    s = 0;
  function c(n, l) {
    if (n === void 0) return -1;
    if (Number.isNaN(n)) return -3;
    if (n === 1 / 0) return -4;
    if (n === -1 / 0) return -5;
    if (n === 0 && 1 / n < 0) return -6;
    if (i.has(n)) return i.get(n);
    ((l ??= s++), i.set(n, l));
    for (let { key: e, fn: t } of a) {
      let i = t(n);
      if (i) return ((r[l] = `["${e}",${c(i)}]`), l);
    }
    if (typeof n == `function`) throw new D(`Cannot stringify a function`, o, n, t);
    if (typeof n == `symbol`) throw new D(`Cannot stringify a Symbol primitive`, o, n, t);
    let u = ``;
    if (Lt(n)) u = Qt(n);
    else if (typeof n.then == `function`) {
      if (!e)
        throw new D(`Cannot stringify a Promise or thenable — use stringifyAsync instead`, o, n, t);
      u = Promise.resolve(n).then((e) => {
        let t = c(e, l);
        t < 0 && (r[l] = t);
      });
    } else {
      let e = Bt(n);
      switch (e) {
        case `Number`:
        case `String`:
        case `Boolean`:
        case `BigInt`:
          u = `["Object",${c(n.valueOf())}]`;
          break;
        case `Date`:
          u = `["Date","${isNaN(n.getDate()) ? `` : n.toISOString()}"]`;
          break;
        case `URL`:
          u = `["URL",${O(n.toString())}]`;
          break;
        case `URLSearchParams`:
          u = `["URLSearchParams",${O(n.toString())}]`;
          break;
        case `RegExp`:
          let { source: r, flags: i } = n;
          u = i ? `["RegExp",${O(r)},"${i}"]` : `["RegExp",${O(r)}]`;
          break;
        case `Array`: {
          let e = !1;
          u = `[`;
          for (let t = 0; t < n.length; t += 1)
            if ((t > 0 && (u += `,`), Object.hasOwn(n, t)))
              (o.push(`[${t}]`), (u += c(n[t])), o.pop());
            else if (e) u += -2;
            else {
              let t = Jt(n),
                r = t.length,
                i = String(n.length).length;
              if ((n.length - r) * 3 > 4 + i + r * (i + 1)) {
                u = `[-7,` + n.length;
                for (let e = 0; e < t.length; e++) {
                  let r = t[e];
                  (o.push(`[${r}]`), (u += `,` + r + `,` + c(n[r])), o.pop());
                }
                break;
              } else ((e = !0), (u += -2));
            }
          u += `]`;
          break;
        }
        case `Set`:
          u = `["Set"`;
          for (let e of n) u += `,${c(e)}`;
          u += `]`;
          break;
        case `Map`:
          u = `["Map"`;
          for (let [e, t] of n)
            (o.push(`.get(${Lt(e) ? Qt(e) : `...`})`), (u += `,${c(e)},${c(t)}`), o.pop());
          u += `]`;
          break;
        case `Int8Array`:
        case `Uint8Array`:
        case `Uint8ClampedArray`:
        case `Int16Array`:
        case `Uint16Array`:
        case `Float16Array`:
        case `Int32Array`:
        case `Uint32Array`:
        case `Float32Array`:
        case `Float64Array`:
        case `BigInt64Array`:
        case `BigUint64Array`:
        case `DataView`: {
          let t = n;
          ((u = `["` + e + `",` + c(t.buffer)),
            t.byteLength !== t.buffer.byteLength && (u += `,${t.byteOffset},${t.length}`),
            (u += `]`));
          break;
        }
        case `ArrayBuffer`:
          u = `["ArrayBuffer","${Nt(n)}"]`;
          break;
        case `Temporal.Duration`:
        case `Temporal.Instant`:
        case `Temporal.PlainDate`:
        case `Temporal.PlainTime`:
        case `Temporal.PlainDateTime`:
        case `Temporal.PlainMonthDay`:
        case `Temporal.PlainYearMonth`:
        case `Temporal.ZonedDateTime`:
          u = `["${e}",${O(n.toString())}]`;
          break;
        default:
          if (!zt(n)) throw new D(`Cannot stringify arbitrary non-POJOs`, o, n, t);
          if (Ht(n).length > 0) throw new D(`Cannot stringify POJOs with symbolic keys`, o, n, t);
          if (Object.getPrototypeOf(n) === null) {
            u = `["null"`;
            for (let e of Object.keys(n)) {
              if (e === `__proto__`)
                throw new D(`Cannot stringify objects with __proto__ keys`, o, n, t);
              (o.push(Wt(e)), (u += `,${O(e)},${c(n[e])}`), o.pop());
            }
            u += `]`;
          } else {
            u = `{`;
            let e = !1;
            for (let r of Object.keys(n)) {
              if (r === `__proto__`)
                throw new D(`Cannot stringify objects with __proto__ keys`, o, n, t);
              (e && (u += `,`), (e = !0), o.push(Wt(r)), (u += `${O(r)}:${c(n[r])}`), o.pop());
            }
            u += `}`;
          }
      }
    }
    return ((r[l] = u), l);
  }
  let l = c(t);
  return l < 0 ? `${l}` : r;
}
function Qt(e) {
  let t = typeof e;
  return t === `string`
    ? O(e)
    : e === void 0
      ? `-1`
      : e === 0 && 1 / e < 0
        ? `-6`
        : t === `bigint`
          ? `["BigInt","${e}"]`
          : String(e);
}
var $t = e(wt(), 1);
async function en(e, t = [`encrypt`, `decrypt`]) {
  if (e.byteLength !== 32)
    throw new u(`Encryption key must be exactly 32 bytes, got ${e.byteLength}`);
  return globalThis.crypto.subtle.importKey(`raw`, e, `AES-GCM`, !1, t);
}
async function tn(e, t) {
  let n = globalThis.crypto.getRandomValues(new Uint8Array(12)),
    r;
  try {
    r = await globalThis.crypto.subtle.encrypt({ name: `AES-GCM`, iv: n, tagLength: 128 }, e, t);
  } catch (e) {
    throw new _(`AES-256-GCM encryption failed: ${e instanceof Error ? e.message : String(e)}`, {
      cause: e,
      context: { operation: `encrypt`, byteLength: t.byteLength },
    });
  }
  let i = new Uint8Array(12 + r.byteLength);
  return (i.set(n, 0), i.set(new Uint8Array(r), 12), i);
}
async function nn(e, t) {
  if (t.byteLength < 28)
    throw new _(`Encrypted data too short: expected at least 28 bytes, got ${t.byteLength}`, {
      context: { operation: `decrypt`, byteLength: t.byteLength },
    });
  let n = t.subarray(0, 12),
    r = t.subarray(12),
    i;
  try {
    i = await globalThis.crypto.subtle.decrypt({ name: `AES-GCM`, iv: n, tagLength: 128 }, e, r);
  } catch (e) {
    throw new _(`AES-256-GCM decryption failed: ${e instanceof Error ? e.message : String(e)}`, {
      cause: e,
      context: { operation: `decrypt`, byteLength: t.byteLength },
    });
  }
  return new Uint8Array(i);
}
const rn = Symbol.for(`WORKFLOW_USE_STEP`),
  an = Symbol.for(`WORKFLOW_SET_ATTRIBUTES`),
  on = Symbol.for(`WORKFLOW_CREATE_HOOK`),
  sn = Symbol.for(`WORKFLOW_SLEEP`),
  cn = Symbol.for(`WORKFLOW_GET_STREAM_ID`),
  ln = Symbol.for(`WORKFLOW_STABLE_ULID`),
  A = Symbol.for(`WORKFLOW_STREAM_NAME`),
  un = Symbol.for(`WORKFLOW_STREAM_TYPE`),
  dn = Symbol.for(`WORKFLOW_STREAM_FRAMING`),
  j = Symbol.for(`WORKFLOW_STREAM_SERVER_RUN_ID`),
  M = Symbol.for(`WORKFLOW_STREAM_SERVER_DEPLOYMENT_ID`),
  fn = Symbol.for(`WORKFLOW_STREAM_WRITE_BATCH`),
  pn = Symbol.for(`BODY_INIT`),
  mn = Symbol.for(`WEBHOOK_RESPONSE_WRITABLE`),
  hn = Symbol.for(`workflow-class-registry`),
  N = Symbol.for(`WORKFLOW_ABORT_STREAM_NAME`),
  P = Symbol.for(`WORKFLOW_ABORT_HOOK_TOKEN`),
  gn = Symbol.for(`WORKFLOW_ABORT_LISTENER_ATTACHED`),
  _n = Symbol.for(`WORKFLOW_ABORT_READER_CANCEL`),
  vn = () => b(`WORKFLOW_STREAM_MAX_INFLIGHT_CHUNKS`, 1e3, { integer: !0, min: 1 }),
  yn = () => b(`WORKFLOW_STREAM_MAX_CHUNKS_PER_BATCH`, 1e3, { integer: !0, min: 1 }),
  bn = () => b(`WORKFLOW_STREAM_MAX_BYTES_PER_BATCH`, 1048576, { integer: !0, min: 1 }),
  xn = () => b(`WORKFLOW_LOCK_POLL_INTERVAL_MS`, 10, { integer: !0, min: 1 });
function F() {
  let e = { ...n(), pendingOps: 0, doneResolved: !1, streamEnded: !1 };
  return (e.promise.catch(() => {}), e);
}
function Sn(e) {
  if (e.locked) return !1;
  let t;
  try {
    t = e.getWriter();
  } catch {
    return !1;
  }
  try {
    t.releaseLock();
  } catch {
    return !1;
  }
  return !0;
}
function Cn(e) {
  if (e.locked) return !1;
  let t;
  try {
    t = e.getReader();
  } catch {
    return !1;
  }
  try {
    t.releaseLock();
  } catch {
    return !1;
  }
  return !0;
}
function wn(e, t) {
  if (t.writablePollingInterval !== void 0) return;
  let n = setInterval(() => {
    if (t.doneResolved || t.streamEnded) {
      (clearInterval(n), (t.writablePollingInterval = void 0));
      return;
    }
    Sn(e) &&
      t.pendingOps === 0 &&
      ((t.doneResolved = !0), t.resolve(), clearInterval(n), (t.writablePollingInterval = void 0));
  }, xn());
  t.writablePollingInterval = n;
}
function Tn(e, t) {
  if (t.readablePollingInterval !== void 0) return;
  let n = setInterval(() => {
    if (t.doneResolved || t.streamEnded) {
      (clearInterval(n), (t.readablePollingInterval = void 0));
      return;
    }
    Cn(e) &&
      t.pendingOps === 0 &&
      ((t.doneResolved = !0), t.resolve(), clearInterval(n), (t.readablePollingInterval = void 0));
  }, xn());
  t.readablePollingInterval = n;
}
function I(e, t, n) {
  let r = t[fn];
  return typeof r == `function` ? Mn(e, t, n, r) : En(e, t, n);
}
async function En(e, t, n) {
  let r = e.getReader(),
    i = t.getWriter(),
    a;
  try {
    for (;;) {
      if (n.streamEnded) return;
      let e = await Promise.race([
        r.read(),
        i.closed.then(() => {
          throw new u(`Writable stream closed prematurely`);
        }),
      ]);
      if (n.streamEnded) return;
      if (e.done) {
        ((n.streamEnded = !0),
          await i.close(),
          n.doneResolved || ((n.doneResolved = !0), n.resolve()));
        return;
      }
      n.pendingOps++;
      try {
        await i.write(e.value);
      } finally {
        n.pendingOps--;
      }
    }
  } catch (e) {
    throw (
      (n.streamEnded = !0), (a = e), n.doneResolved || ((n.doneResolved = !0), n.reject(e)), e
    );
  } finally {
    (r.cancel(a).catch(() => {}), r.releaseLock(), i.releaseLock());
  }
}
function Dn(e, t) {
  let n = e[t];
  n && ((e[t] = null), n());
}
function On(e) {
  let t = 0,
    n = 0;
  for (let r of e.queue) {
    if (t >= e.maxChunksPerBatch || (t > 0 && n + r.byteLength > e.maxBytesPerBatch)) break;
    (t++, (n += r.byteLength));
  }
  return t;
}
async function kn(e) {
  for (;;) {
    if (e.queue.length === 0) {
      if (e.sourceDone) return;
      await new Promise((t) => {
        e.wakeConsumer = t;
      });
      continue;
    }
    let t = On(e),
      n = e.queue.slice(0, t);
    ((e.queue = e.queue.slice(t)),
      await e.batchWrite(n),
      (e.state.pendingOps -= n.length),
      Dn(e, `wakeProducer`));
  }
}
function An(e, t, n) {
  return Promise.race([
    e.read(),
    t.closed.then(() => {
      throw new u(`Writable stream closed prematurely`);
    }),
    n.then(
      () => {
        throw new u(`Stream consumer ended prematurely`);
      },
      (e) => {
        throw e;
      },
    ),
  ]);
}
async function jn(e, t, n) {
  e.state.pendingOps < n ||
    (await Promise.race([
      new Promise((t) => {
        e.wakeProducer = t;
      }),
      t.then(
        () => void 0,
        () => void 0,
      ),
    ]));
}
async function Mn(e, t, n, r) {
  let i = e.getReader(),
    a = t.getWriter(),
    o = vn(),
    s,
    c = {
      state: n,
      batchWrite: r,
      queue: [],
      sourceDone: !1,
      wakeConsumer: null,
      wakeProducer: null,
      maxChunksPerBatch: yn(),
      maxBytesPerBatch: bn(),
    },
    l = kn(c);
  try {
    for (; !n.streamEnded;) {
      let e = await An(i, a, l);
      if (n.streamEnded) return;
      if (e.done) {
        ((c.sourceDone = !0),
          Dn(c, `wakeConsumer`),
          await l,
          (n.streamEnded = !0),
          await a.close(),
          n.doneResolved || ((n.doneResolved = !0), n.resolve()));
        return;
      }
      (c.queue.push(e.value), n.pendingOps++, Dn(c, `wakeConsumer`), await jn(c, l, o));
    }
  } catch (e) {
    throw (
      (n.streamEnded = !0),
      (s = e),
      (c.sourceDone = !0),
      Dn(c, `wakeConsumer`),
      await l.catch(() => {}),
      n.doneResolved || ((n.doneResolved = !0), n.reject(e)),
      e
    );
  } finally {
    (i.cancel(s).catch(() => {}), i.releaseLock(), a.releaseLock());
  }
}
function Nn(e) {
  if (e.specVersion !== 5)
    throw new u(
      `This Workflow runtime requires a World with matching spec version 5, but the configured World declares spec version ${e.specVersion ?? `none`}. Install a World package version compatible with the current Workflow runtime.`,
    );
}
const Pn = Symbol.for(`@workflow/world//cache`),
  Fn = Symbol.for(`@workflow/world//cachePromise`),
  In = Symbol.for(`@workflow/world//getWorldFn`);
async function L() {
  let e = globalThis;
  if (e[Pn]) return (Nn(e[Pn]), e[Pn]);
  if (e[Fn]) return ((e[Pn] = await e[Fn]), Nn(e[Pn]), e[Pn]);
  let t = e[In];
  if (t) {
    let e = await t();
    return (Nn(e), e);
  }
  throw Error(
    "Workflow world runtime was not initialized. Import from the host workflow entrypoints (`workflow`, `workflow/api`, or `workflow/runtime`) so @workflow/core/runtime/world-init can register getWorld before getWorldLazy() is used.",
  );
}
const Ln = Symbol.for(`workflow-serialize`),
  Rn = Symbol.for(`workflow-deserialize`);
function zn(e = globalThis) {
  let t = e,
    n = t[hn];
  return (n || ((n = new Map()), (t[hn] = n)), n);
}
const Bn = `class//workflow//Run`;
function Vn(e, t, n = globalThis) {
  zn(n).set(e, t);
}
function Hn(e, t) {
  return zn(t).get(e);
}
function Un() {
  return {
    Class: (e) => {
      if (typeof e != `function`) return !1;
      let t = e.classId;
      return typeof t == `string` ? { classId: t } : !1;
    },
    Instance: (e) => {
      if (typeof e != `object` || !e) return !1;
      let t = e.constructor;
      if (!t || typeof t != `function`) return !1;
      let n = t[Ln];
      if (typeof n != `function`) return !1;
      let r = t.classId;
      if (typeof r != `string`)
        throw Error(`Class "${t.name}" with ${String(Ln)} must have a static "classId" property.`);
      return { classId: r, data: n.call(t, e) };
    },
  };
}
function Wn(e = globalThis) {
  return {
    Class: (t) => {
      let n = t.classId,
        r = Hn(n, e);
      if (!r)
        throw Error(
          `Class "${n}" not found. Make sure the class is registered with registerSerializationClass.`,
        );
      return r;
    },
    Instance: (t) => {
      let n = t.classId,
        r = t.data,
        i = Hn(n, e);
      if (!i)
        throw Error(
          `Class "${n}" not found. Make sure the class is registered with registerSerializationClass.`,
        );
      let a = i[Rn];
      if (typeof a != `function`)
        throw Error(`Class "${n}" does not have a static ${String(Rn)} method.`);
      return a.call(i, r);
    },
  };
}
function Gn(e, t, n) {
  if (n === 0) return `.`;
  let r = new Uint8Array(e, t, n);
  return Buffer.from(r).toString(`base64`);
}
function R(e) {
  return Gn(e.buffer, e.byteOffset, e.byteLength);
}
function z(e, t) {
  let n = e === `.` ? `` : e,
    r = Buffer.from(n, `base64`),
    i = new t.ArrayBuffer(r.length);
  return (new t.Uint8Array(i).set(r), i);
}
function Kn(e) {
  return JSON.parse(e);
}
function qn(e) {
  if (!se.isNativeError(e)) return !1;
  let t = { message: e.message, stack: e.stack };
  return (`cause` in e && (t.cause = e.cause), t);
}
function Jn(e, t) {
  return !se.isNativeError(t) || t.name !== e ? !1 : qn(t);
}
function B(e) {
  return (t) => Jn(e, t) || !1;
}
function Yn(e, t) {
  return (n) => {
    let r = n,
      i = `cause` in r ? { cause: r.cause } : void 0,
      a = e[t],
      o = new a(r.message, i);
    return (r.stack !== void 0 && (o.stack = r.stack), o);
  };
}
function Xn(e = globalThis) {
  return {
    ArrayBuffer: (t) => t instanceof e.ArrayBuffer && Gn(t, 0, t.byteLength),
    BigInt: (e) => typeof e == `bigint` && e.toString(),
    BigInt64Array: (t) => t instanceof e.BigInt64Array && R(t),
    BigUint64Array: (t) => t instanceof e.BigUint64Array && R(t),
    Date: (t) => (t instanceof e.Date ? (Number.isNaN(t.getDate()) ? `.` : t.toISOString()) : !1),
    DOMException: (e) => {
      if (typeof e != `object` || !e || e.constructor?.name !== `DOMException`) return !1;
      let t = e,
        n = { message: t.message, name: t.name, stack: t.stack };
      return (`cause` in t && (n.cause = t.cause), n);
    },
    EvalError: B(`EvalError`),
    FatalError: B(`FatalError`),
    HookConflictError: (e) => {
      let t = Jn(`HookConflictError`, e);
      if (!t) return !1;
      let n = e,
        r = { ...t, token: n.token };
      return (n.conflictingRunId !== void 0 && (r.conflictingRunId = n.conflictingRunId), r);
    },
    RangeError: B(`RangeError`),
    ReferenceError: B(`ReferenceError`),
    RetryableError: (e) => {
      let t = Jn(`RetryableError`, e);
      if (!t) return !1;
      let n = e.retryAfter,
        r;
      if (n && typeof n == `object` && typeof n.getTime == `function`) {
        let e = n.getTime();
        r = Number.isNaN(e) ? Date.now() + 1e3 : e;
      } else if (typeof n == `string` || typeof n == `number`) {
        let e = new Date(n).getTime();
        r = Number.isNaN(e) ? Date.now() + 1e3 : e;
      } else r = Date.now() + 1e3;
      return { ...t, retryAfter: r };
    },
    RuntimeDecryptionError: (e) => {
      let t = Jn(`RuntimeDecryptionError`, e);
      if (!t) return !1;
      let n = { ...t },
        r = e.context;
      return (r !== void 0 && (n.context = r), n);
    },
    SyntaxError: B(`SyntaxError`),
    TypeError: B(`TypeError`),
    URIError: B(`URIError`),
    AggregateError: (e) => {
      let t = Jn(`AggregateError`, e);
      return t ? { ...t, errors: e.errors } : !1;
    },
    Error: (e) => {
      if (!se.isNativeError(e)) return !1;
      let t = { name: e.name, message: e.message, stack: e.stack };
      return (`cause` in e && (t.cause = e.cause), t);
    },
    Float32Array: (t) => t instanceof e.Float32Array && R(t),
    Float64Array: (t) => t instanceof e.Float64Array && R(t),
    Headers: (t) => t instanceof e.Headers && Array.from(t),
    Int8Array: (t) => t instanceof e.Int8Array && R(t),
    Int16Array: (t) => t instanceof e.Int16Array && R(t),
    Int32Array: (t) => t instanceof e.Int32Array && R(t),
    Map: (t) => t instanceof e.Map && Array.from(t),
    RegExp: (t) => t instanceof e.RegExp && { source: t.source, flags: t.flags },
    Set: (t) => t instanceof e.Set && Array.from(t),
    URL: (t) => t instanceof e.URL && t.href,
    WorkflowFunction: (e) => {
      if (typeof e != `function`) return !1;
      let t = e.workflowId;
      return typeof t == `string` ? { workflowId: t } : !1;
    },
    URLSearchParams: (t) =>
      t instanceof e.URLSearchParams ? (t.size === 0 ? `.` : String(t)) : !1,
    Uint8Array: (t) => t instanceof e.Uint8Array && R(t),
    Uint8ClampedArray: (t) => t instanceof e.Uint8ClampedArray && R(t),
    Uint16Array: (t) => t instanceof e.Uint16Array && R(t),
    Uint32Array: (t) => t instanceof e.Uint32Array && R(t),
  };
}
function Zn(e = globalThis) {
  return {
    ArrayBuffer: (t) => z(t, e),
    BigInt: (t) => e.BigInt(t),
    BigInt64Array: (t) => new e.BigInt64Array(z(t, e)),
    BigUint64Array: (t) => new e.BigUint64Array(z(t, e)),
    Date: (t) => new e.Date(t),
    DOMException: (t) => {
      let n = new e.DOMException(t.message, t.name);
      return (t.stack !== void 0 && (n.stack = t.stack), `cause` in t && (n.cause = t.cause), n);
    },
    EvalError: Yn(e, `EvalError`),
    FatalError: (t) => {
      let n = new (e[Symbol.for(`@workflow/errors//FatalError`)] ?? m)(t.message);
      return (t.stack !== void 0 && (n.stack = t.stack), `cause` in t && (n.cause = t.cause), n);
    },
    HookConflictError: (t) => {
      let n = new (e[Symbol.for(`@workflow/errors//HookConflictError`)] ?? f)(
        t.token,
        t.conflictingRunId,
      );
      return (t.stack !== void 0 && (n.stack = t.stack), `cause` in t && (n.cause = t.cause), n);
    },
    RangeError: Yn(e, `RangeError`),
    ReferenceError: Yn(e, `ReferenceError`),
    RetryableError: (t) => {
      let n = new (e[Symbol.for(`@workflow/errors//RetryableError`)] ?? v)(t.message, {
        retryAfter: new e.Date(t.retryAfter),
      });
      return (t.stack !== void 0 && (n.stack = t.stack), `cause` in t && (n.cause = t.cause), n);
    },
    RuntimeDecryptionError: (t) => {
      let n = e[Symbol.for(`@workflow/errors//RuntimeDecryptionError`)] ?? _,
        r = {};
      (`cause` in t && (r.cause = t.cause), t.context !== void 0 && (r.context = t.context));
      let i = new n(t.message, r);
      return (t.stack !== void 0 && (i.stack = t.stack), i);
    },
    SyntaxError: Yn(e, `SyntaxError`),
    TypeError: Yn(e, `TypeError`),
    URIError: Yn(e, `URIError`),
    AggregateError: (t) => {
      let n = `cause` in t ? { cause: t.cause } : void 0,
        r = new e.AggregateError(t.errors, t.message, n);
      return (t.stack !== void 0 && (r.stack = t.stack), r);
    },
    Error: (t) => {
      let n = `cause` in t ? { cause: t.cause } : void 0,
        r = new e.Error(t.message, n);
      return ((r.name = t.name), t.stack !== void 0 && (r.stack = t.stack), r);
    },
    Float32Array: (t) => new e.Float32Array(z(t, e)),
    Float64Array: (t) => new e.Float64Array(z(t, e)),
    Headers: (t) => new e.Headers(t),
    Int8Array: (t) => new e.Int8Array(z(t, e)),
    Int16Array: (t) => new e.Int16Array(z(t, e)),
    Int32Array: (t) => new e.Int32Array(z(t, e)),
    Map: (t) => new e.Map(t),
    RegExp: (t) => new e.RegExp(t.source, t.flags),
    Set: (t) => new e.Set(t),
    URL: (t) => new e.URL(t),
    WorkflowFunction: (e) =>
      Object.assign(
        () => {
          throw Error(`Workflow functions cannot be called directly. Use start() to invoke them.`);
        },
        { workflowId: e.workflowId },
      ),
    URLSearchParams: (t) => new e.URLSearchParams(t === `.` ? `` : t),
    Uint8Array: (t) => new e.Uint8Array(z(t, e)),
    Uint8ClampedArray: (t) => new e.Uint8ClampedArray(z(t, e)),
    Uint16Array: (t) => new e.Uint16Array(z(t, e)),
    Uint32Array: (t) => new e.Uint32Array(z(t, e)),
  };
}
function Qn() {
  return {
    StepFunction: (e) => {
      if (typeof e != `function`) return !1;
      let t = e.stepId;
      if (typeof t != `string`) return !1;
      let n = e.__closureVarsFn,
        r = n && typeof n == `function` ? n() : void 0,
        i = `__boundThis` in e,
        a = i ? e.__boundThis : void 0,
        o = e.__boundArgs,
        s = { stepId: t };
      return (
        r !== void 0 && (s.closureVars = r),
        i && (s.boundThis = a),
        Array.isArray(o) && o.length > 0 && (s.boundArgs = o),
        s
      );
    },
  };
}
function $n(e = globalThis) {
  let t = e[Symbol.for(`WORKFLOW_USE_STEP`)];
  return {
    StepFunction: (e) => {
      let n = e.stepId,
        r = e.closureVars;
      if (!t)
        throw Error(
          `WORKFLOW_USE_STEP not found on global object. Step functions cannot be deserialized outside workflow context.`,
        );
      let i = r ? t(n, () => r) : t(n);
      if (`boundThis` in e) {
        let t = Array.isArray(e.boundArgs) ? e.boundArgs : [];
        return i.bind(e.boundThis, ...t);
      }
      return i;
    },
  };
}
function er(e) {
  return e.length === 4 && /^[a-z0-9]{4}$/.test(e);
}
const V = { DEVALUE_V1: `devl`, ENCRYPTED: `encr`, GZIP: `gzip`, ZSTD: `zstd` },
  tr = new TextEncoder(),
  nr = new TextDecoder();
function rr(e, t = globalThis, n) {
  let r;
  switch (e) {
    case `workflow`:
      r = { ...Un(), ...Qn(), ...Xn(t) };
      break;
    case `step`:
      r = { ...Un(), ...Xn(t) };
      break;
    case `client`:
      r = { ...Un(), ...Xn(t) };
      break;
  }
  return n ? { ...r, ...n } : r;
}
function ir(e, t = globalThis, n) {
  let r;
  switch (e) {
    case `workflow`:
      r = { ...Wn(t), ...$n(t), ...Zn(t) };
      break;
    case `step`:
      r = { ...Wn(t), ...Zn(t) };
      break;
    case `client`:
      r = {
        ...Wn(t),
        ...Zn(t),
        StepFunction: () => {
          throw Error(`Step functions cannot be deserialized in client context.`);
        },
      };
      break;
  }
  return n ? { ...r, ...n } : r;
}
const H = {
    formatPrefix: V.DEVALUE_V1,
    serialize(e, t, n) {
      let r = k(e, rr(t, n?.global, n?.extraReducers));
      return tr.encode(r);
    },
    deserialize(e, t, n) {
      let r = ir(t, n?.global, n?.extraRevivers);
      return Yt(nr.decode(e), r);
    },
    deserializeLegacy(e, t, n) {
      return Xt(e, ir(t, n?.global, n?.extraRevivers));
    },
  },
  ar = new TextEncoder(),
  or = new TextDecoder();
function U(e, t) {
  if (!(t instanceof Uint8Array)) return t;
  let n = ar.encode(e),
    r = new Uint8Array(4 + t.length);
  return (r.set(n, 0), r.set(t, 4), r);
}
function sr(e) {
  if (!(e instanceof Uint8Array) || e.length < 4) return null;
  let t = e.subarray(0, 4),
    n = or.decode(t);
  return er(n) ? n : null;
}
function W(e) {
  if (!(e instanceof Uint8Array))
    return { format: V.DEVALUE_V1, payload: new TextEncoder().encode(JSON.stringify(e)) };
  if (e.length < 4)
    throw Error(
      `Data too short to contain format prefix: expected at least 4 bytes, got ${e.length}`,
    );
  let t = e.subarray(0, 4),
    n = or.decode(t);
  if (!er(n)) throw Error(`Invalid format prefix: "${n}". Must be 4 characters of [a-z0-9].`);
  return { format: n, payload: e.subarray(4) };
}
function cr() {
  try {
    return typeof process < `u` && process.env?.WORKFLOW_DISABLE_COMPRESSION === `1`;
  } catch {
    return !1;
  }
}
function lr() {
  try {
    let e = process.env?.WORKFLOW_COMPRESSION_CODEC;
    return e === `gzip` || e === `zstd` ? e : void 0;
  } catch {
    return;
  }
}
function ur() {
  try {
    return globalThis.process?.getBuiltinModule?.(`node:zlib`);
  } catch {
    return;
  }
}
function dr() {
  let e = ur();
  return typeof e?.zstdCompressSync == `function` && typeof e?.zstdDecompressSync == `function`;
}
function fr() {
  return typeof CompressionStream == `function` && typeof DecompressionStream == `function`;
}
async function pr(e, t) {
  let n = t.writable.getWriter(),
    r = n.write(e).then(() => n.close());
  r.catch(() => {});
  let i = [],
    a = 0,
    o = t.readable.getReader();
  for (;;) {
    let { done: e, value: t } = await o.read();
    if (e) break;
    (i.push(t), (a += t.length));
  }
  await r;
  let s = new Uint8Array(a),
    c = 0;
  for (let e of i) (s.set(e, c), (c += e.length));
  return s;
}
async function mr(e) {
  return pr(e, new CompressionStream(`gzip`));
}
async function hr(e) {
  return pr(e, new DecompressionStream(`gzip`));
}
function gr(e) {
  let t = ur(),
    n = t?.constants?.ZSTD_c_compressionLevel,
    r = n === void 0 ? void 0 : { params: { [n]: 3 } };
  return new Uint8Array(t.zstdCompressSync(e, r));
}
function _r(e) {
  let t = ur();
  if (!t?.zstdDecompressSync)
    throw Error(
      `Compressed (zstd) workflow data encountered but node:zlib zstd support is not available in this runtime (requires Node.js 22.15+). In the browser, register a zstd decoder via registerZstdDecoder (serialization-format.ts).`,
    );
  return new Uint8Array(t.zstdDecompressSync(e));
}
function G(e, t, n, r) {
  e &&
    ((e.recorded = !0),
    (e.compressed = t !== `none`),
    (e.codec = t),
    (e.uncompressedBytes = n),
    (e.storedBytes = r));
}
function vr() {
  return lr() === `gzip` ? (fr() ? `gzip` : `none`) : dr() ? `zstd` : fr() ? `gzip` : `none`;
}
async function yr(e, t, n) {
  if (!(e instanceof Uint8Array)) return e;
  if (!t || e.length < 1024 || cr()) return (G(n, `none`, e.length, e.length), e);
  let r = vr();
  if (r === `none`) return (G(n, `none`, e.length, e.length), e);
  let i = r === `zstd` ? gr(e) : await mr(e),
    a = r === `zstd` ? V.ZSTD : V.GZIP,
    o = 4 + i.length;
  return o >= e.length * 0.95
    ? (G(n, `none`, e.length, e.length), e)
    : (G(n, r, e.length, o), U(a, i));
}
async function br(e, t) {
  if (!(e instanceof Uint8Array)) return e;
  let n = sr(e);
  if (n === V.ZSTD) {
    let { payload: n } = W(e),
      r = _r(n);
    return (G(t, `zstd`, r.length, e.length), r);
  }
  if (n === V.GZIP) {
    if (!fr())
      throw Error(
        `Compressed (gzip) workflow data encountered but DecompressionStream is not available in this runtime. Node.js 18+, browsers, and edge runtimes all support it.`,
      );
    let { payload: n } = W(e),
      r = await hr(n);
    return (G(t, `gzip`, r.length, e.length), r);
  }
  return (G(t, `none`, e.length, e.length), e);
}
async function xr(e) {
  return typeof e == `function` ? e() : e;
}
async function Sr(e, t) {
  if (!t || !(e instanceof Uint8Array)) return e;
  let n = await tn(t, e);
  return U(V.ENCRYPTED, n);
}
async function Cr(e, t) {
  if (!(e instanceof Uint8Array)) return e;
  let n = sr(e);
  if (n === V.ENCRYPTED && !t)
    throw new _(
      `Encrypted data encountered but no encryption key is available. Encryption is not configured or no key was provided for this run.`,
      { context: { operation: `decrypt`, byteLength: e.byteLength, formatPrefix: `encr` } },
    );
  if (n !== V.ENCRYPTED) return e;
  let { payload: r } = W(e);
  try {
    return await nn(t, r);
  } catch (e) {
    throw (_.is(e) && e.context && (e.context.formatPrefix = n), e);
  }
}
function wr(e, t, n) {
  let [r, ...i] = t.split(`
`),
    a = i.join(`
`),
    o = Tr(r ?? ``, n),
    s = Er(a),
    c = [`${e} ${r ?? ``}`];
  return (
    o && c.push(o),
    s && c.push(s),
    c.join(`
`)
  );
}
function Tr(e, t) {
  if (!t || Object.keys(t).length === 0) return null;
  let n = new Set();
  (n.add(`errorStack`),
    typeof t.errorMessage == `string` && e.includes(t.errorMessage) && n.add(`errorMessage`));
  let i = new Set([
      `workflowRunId`,
      `workflowName`,
      `stepId`,
      `stepName`,
      `errorAttribution`,
      `errorCode`,
      `errorName`,
      `errorMessage`,
      `errorStack`,
      `hint`,
      `attempt`,
      `retryCount`,
    ]),
    a = [],
    o = K(t, `errorName`),
    s = K(t, `errorAttribution`);
  if (o || s) {
    let e = s ? (s === `sdk` ? _e(`sdk error`) : ge(`user error`)) : ``,
      t = o ? he(o) : ``,
      n = e && t ? C(` · `) : ``;
    a.push(`  ${e}${n}${t}`);
  }
  let l = K(t, `workflowRunId`),
    u = K(t, `workflowName`);
  l ? a.push(kr(`run`, l, u, r)) : u && a.push(kr(`run`, null, u, r));
  let d = K(t, `stepId`),
    f = K(t, `stepName`);
  if (((d || f) && a.push(kr(`step`, d, f, c)), t.attempt !== void 0 || t.retryCount !== void 0)) {
    let e = t.attempt,
      n = t.retryCount;
    e !== void 0 && n !== void 0
      ? a.push(`  ${Or(`retry`)} ${e} ${C(`attempts ·`)} ${n} ${C(`max retries`)}`)
      : e !== void 0 && a.push(`  ${Or(`retry`)} ${e} ${C(`attempts`)}`);
  }
  let p = K(t, `errorCode`);
  p && p !== o && a.push(`  ${Or(`code`)} ${C(p)}`);
  let m = K(t, `hint`);
  m && a.push(`  ${fe(m)}`);
  let h = Object.entries(t)
    .filter(([e, t]) => !i.has(e) && !n.has(e) && t != null)
    .sort(([e], [t]) => e.localeCompare(t));
  for (let [e, t] of h) a.push(`  ${Or(e)} ${Ar(t)}`);
  return a.length
    ? a.join(`
`)
    : null;
}
function Er(e) {
  if (!e) return null;
  let t = e.split(`
`),
    n = [],
    r = 0,
    i = 0,
    a = 0,
    o = () => {
      r > 0 &&
        (n.push(C(`        … ${r} more ${r === 1 ? `frame` : `frames`} in framework internals`)),
        (r = 0));
    };
  for (let e of t) {
    let t = e.trimStart().startsWith(`at `);
    if (t && Dr(e)) {
      r++;
      continue;
    }
    if (t && i >= 6) {
      a++;
      continue;
    }
    (o(), n.push(e), t && i++);
  }
  return (
    o(),
    a > 0 &&
      n.push(
        C(
          `        … ${a} more ${a === 1 ? `frame` : `frames`} (run \`pnpm wf inspect run <id>\` for the full stack)`,
        ),
      ),
    n.join(`
`)
  );
}
function Dr(e) {
  let t = e.trimStart();
  return t.startsWith(`at `)
    ? !!(
        t.includes(`node:internal/`) ||
        t.includes(`node_modules/.pnpm/`) ||
        t.includes(`node_modules__pnpm_`) ||
        t.includes(`_next_dist_`) ||
        t.includes(`node_modules/next/`) ||
        t.includes(`node_modules/@opentelemetry/`) ||
        t.includes(`node_modules/vitest/`) ||
        t.includes(`node_modules/@vitest/`)
      )
    : !1;
}
function K(e, t) {
  let n = e[t];
  return typeof n == `string` && n.length > 0 ? n : null;
}
function Or(e) {
  return C(e.padEnd(6));
}
function kr(e, t, n, r) {
  let a = t || C(`—`),
    s = n && (e === `run` ? o(n) : i(n)) ? `${C(`·`)} ${r(n)}` : ``;
  return `  ${Or(e)} ${a}${s ? ` ` + s : ``}`;
}
function Ar(e) {
  if (typeof e == `string`)
    return e.includes(`
`)
      ? e
          .split(`
`)
          .map((e, t) => (t === 0 ? e : `         ${e}`)).join(`
`)
      : e;
  if (typeof e == `number` || typeof e == `boolean`) return String(e);
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}
var jr = class e extends Error {
  steps;
  globalThis;
  stepCount;
  hookCount;
  waitCount;
  attributeCount;
  hookDisposedCount;
  abortCount;
  constructor(e, t) {
    let n = [...e.values()],
      r = 0,
      i = 0,
      o = 0,
      s = 0,
      c = 0,
      l = 0;
    for (let e of n)
      e.type === `step`
        ? r++
        : e.type === `hook`
          ? e.disposed
            ? c++
            : e.abortRequested
              ? l++
              : i++
          : e.type === `wait`
            ? o++
            : e.type === `attribute` && s++;
    let u = [];
    (r > 0 && u.push(`${r} ${a(`step`, `steps`, r)}`),
      i > 0 && u.push(`${i} ${a(`hook`, `hooks`, i)}`),
      o > 0 && u.push(`${o} ${a(`wait`, `waits`, o)}`),
      s > 0 && u.push(`${s} ${a(`attribute write`, `attribute writes`, s)}`),
      c > 0 && u.push(`${c} hook ${a(`disposal`, `disposals`, c)}`));
    let d = a(`has`, `have`, r + i + o + s + c),
      f = +(r > 0) + +(i > 0) + +(o > 0) + +(s > 0) + +(c > 0),
      p;
    p =
      f > 1
        ? `processed`
        : r > 0
          ? `run`
          : i > 0 || o > 0
            ? `created`
            : s > 0
              ? `written`
              : c > 0
                ? `processed`
                : `received`;
    let m =
      u.length > 0 ? `${u.join(` and `)} ${d} not been ${p} yet` : `0 steps have not been run yet`;
    (super(m),
      (this.name = `WorkflowSuspension`),
      (this.steps = n),
      (this.globalThis = t),
      (this.stepCount = r),
      (this.hookCount = i),
      (this.waitCount = o),
      (this.attributeCount = s),
      (this.hookDisposedCount = c),
      (this.abortCount = l));
  }
  static is(t) {
    return t instanceof e;
  }
};
function Mr() {
  throw new u(
    `This API is not available inside a workflow function. Workflow functions run in a deterministic VM; move the call to a step function for full Node.js access.`,
  );
}
function q(...e) {
  return (t) => Object.fromEntries(e.map((e) => [e, t]));
}
const Nr = q(`workflow.name`),
  Pr = q(`workflow.operation`),
  Fr = q(`workflow.run.id`),
  Ir = q(`workflow.run.status`),
  Lr = q(`workflow.started_at`),
  Rr = q(`workflow.events.count`),
  zr = q(`workflow.arguments.count`),
  Br = q(`workflow.result.type`),
  Vr = q(`workflow.trace.propagated`),
  Hr = q(`workflow.trace.mode`),
  Ur = q(`workflow.turbo`),
  Wr = q(`workflow.error.name`),
  Gr = q(`workflow.error.message`),
  Kr = q(`workflow.error.code`),
  qr = q(`workflow.steps.created`),
  Jr = q(`workflow.hooks.created`),
  Yr = q(`workflow.waits.created`),
  Xr = q(`workflow.inline_ownership.owned_recovery_steps`),
  Zr = q(`workflow.inline_ownership.backstop_wakes_armed`),
  Qr = q(`workflow.route.type`),
  $r = q(`workflow.route.handler_cached`),
  ei = q(`workflow.route.invocation_count`),
  ti = q(`workflow.route.entrypoint_age_ms`),
  ni = q(`workflow.route.module_body_init_ms`),
  ri = q(`step.name`),
  ii = q(`step.id`),
  ai = q(`step.attempt`),
  oi = q(`step.status`),
  si = q(`step.max_retries`),
  ci = q(`step.ttfs_ms`),
  li = q(`step.stso_ms`),
  ui = q(`step.rsfs_ms`),
  di = q(`step.final_scheduling_replay_ms`),
  fi = q(`step.latency_optimizations`),
  pi = q(`step.skipped`),
  mi = q(`step.skip_reason`),
  hi = q(`step.arguments.count`),
  gi = q(`step.result.type`),
  _i = q(`step.error.name`),
  vi = q(`step.error.message`),
  yi = q(`step.fatal_error`),
  bi = q(`step.retry.exhausted`),
  xi = q(`step.retry.timeout_seconds`),
  Si = q(`step.retry.will_retry`),
  Ci = q(`messaging.system`),
  wi = q(`messaging.destination.name`),
  Ti = q(`messaging.message.id`),
  Ei = q(`messaging.operation.type`),
  Di = q(`workflow.queue.overhead_ms`),
  Oi = q(`deployment.id`),
  ki = q(`workflow.hook.token`),
  Ai = q(`workflow.hook.id`),
  ji = q(`workflow.hook.found`),
  Mi = q(`workflow.suspension.state`),
  Ni = q(`workflow.suspension.hook_count`),
  Pi = q(`workflow.suspension.step_count`),
  Fi = q(`workflow.suspension.wait_count`),
  Ii = q(`http.request.method`),
  Li = q(`http.route`),
  Ri = q(`http.response.status_code`),
  zi = q(`error.type`),
  Bi = q(`workflow.events.pages_loaded`),
  Vi = q(`workflow.queue.deserialize_time_ms`),
  Hi = q(`workflow.queue.execution_time_ms`),
  Ui = q(`workflow.queue.serialize_time_ms`),
  Wi = q(`workflow.serialization.operation`),
  Gi = q(`workflow.serialization.compressed`),
  Ki = q(`workflow.serialization.codec`),
  qi = q(`workflow.serialization.uncompressed_bytes`),
  Ji = q(`workflow.serialization.stored_bytes`),
  Yi = q(`workflow.serialization.compression_ratio`),
  Xi = q(`peer.service`),
  Zi = q(`rpc.system`),
  Qi = q(`rpc.service`),
  $i = q(`rpc.method`),
  ea = q(`error.retryable`),
  ta = q(`error.category`),
  na = new Set();
function ra() {
  let e = process.env.WORKFLOW_TRACE_MODE;
  return e === `continuous`
    ? `continuous`
    : (e &&
        e !== `linked` &&
        !na.has(e) &&
        (na.add(e),
        Y.warn(
          `Unrecognized WORKFLOW_TRACE_MODE value "${e}"; expected "linked" or "continuous". Falling back to "linked".`,
        )),
      `linked`);
}
function ia(e) {
  return e !== void 0 && Object.keys(e).length > 0;
}
function aa(e, t) {
  return e === `linked` && ia(t) ? Promise.resolve(t) : sa();
}
async function oa(e, t) {
  if (e !== `linked`) return ba();
  let n = await xa(ia(t) ? t : void 0);
  return n ? [n] : void 0;
}
async function sa() {
  let e = await J.value;
  if (!e) return {};
  let t = {};
  return (e.propagation.inject(e.context.active(), t), t);
}
async function ca(e) {
  let t = await J.value;
  if (t) return t.propagation.extract(t.context.active(), e);
}
async function la(e, t) {
  if (!e) return t();
  let n = await J.value;
  if (!n) return t();
  let r = await ca(e);
  return r ? n.context.with(r, async () => await t()) : t();
}
const J = s(async () => {
    try {
      return await import(`./src-D1EltLDA.js`).then((t) => e(t.t(), 1));
    } catch {
      return (Y.info(`OpenTelemetry not available, tracing will be disabled`), null);
    }
  }),
  ua = s(async () => {
    let e = await J.value;
    if (!e) return null;
    let t = e.trace.getTracer(`workflow`);
    return (fa(e, t), t);
  });
let da = !1;
function fa(e, t) {
  let n =
    typeof process < `u` &&
    typeof process.env.DEBUG == `string` &&
    (process.env.DEBUG.includes(`workflow:`) || process.env.DEBUG === `*`);
  if (!(da || !n)) {
    da = !0;
    try {
      let n = globalThis[Symbol.for(`opentelemetry.js.api.1`)],
        r = e.trace.getTracerProvider(),
        i = r.getDelegate?.() ?? r,
        a = t.startSpan(`workflow.otel.probe.core`);
      (console.warn(
        `[workflow:otel-diag] core`,
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
      console.warn(`[workflow:otel-diag] core failed:`, e instanceof Error ? e.message : e);
    }
  }
}
async function pa(e, ...t) {
  let [n, r] = await Promise.all([ua.value, J.value]),
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
          throw (e.setStatus({ code: r.SpanStatusCode.ERROR, message: t.message }), ha(t, r, e), t);
        } finally {
          e.end();
        }
      });
}
async function ma(e, t, n) {
  let r = await ua.value;
  r && r.startSpan(e, { ...n, startTime: t }).end();
}
function ha(e, t, n) {
  !e ||
    !jr.is(e) ||
    (n.setStatus({ code: t.SpanStatusCode.OK }),
    n.setAttributes({
      ...Mi(`suspended`),
      ...Pi(e.stepCount),
      ...Ni(e.hookCount),
      ...Fi(e.waitCount),
    }));
}
async function ga(e) {
  let [t, n] = await Promise.all([ca(e), J.value]);
  if (!(!t || !n)) return n.trace.getSpanContext(t);
}
async function _a() {
  return await ya((e) => e.trace.getActiveSpan());
}
async function va(e) {
  return ya((t) => t.SpanKind[e]);
}
async function ya(e) {
  let t = await J.value;
  if (t) return await e(t);
}
function ba() {
  return ya((e) => {
    let t = e.trace.getActiveSpan()?.spanContext();
    if (t) return [{ context: t }];
  });
}
async function xa(e) {
  if (!e) return;
  let [t, n] = await Promise.all([ga(e), J.value]);
  if (!(!t || !n) && n.trace.isSpanContextValid(t)) return { context: t };
}
async function Sa(e, t) {
  let n = await J.value;
  if (!n) return t();
  let r = n.propagation.createBaggage({
      "workflow.run_id": { value: e.workflowRunId },
      "workflow.name": { value: e.workflowName },
    }),
    i = n.propagation.setBaggage(n.context.active(), r);
  return n.context.with(i, () => t());
}
function Ca(e, t) {
  if (!t) return !1;
  let n = !1;
  for (let r of t.split(`,`)) {
    let t = r.trim();
    if (!t) continue;
    let i = t.startsWith(`-`),
      a = i ? t.slice(1) : t;
    RegExp(`^${a.replace(/[|\\{}()[\]^$+?.]/g, `\\$&`).replace(/\*/g, `.*`)}$`).test(e) && (n = !i);
  }
  return n;
}
function wa(e, t = {}) {
  let n = (r) => {
    let i = (n) => t.debugNamespace ?? `workflow:${e}:${n}`,
      a = (t) => {
        let n = i(t);
        return (i, a) => {
          let o = Object.keys(r).length > 0,
            s = a && Object.keys(a).length > 0,
            c = o || s ? { ...r, ...(a ?? {}) } : void 0;
          ((t === `error` || t === `warn`) &&
            (t === `error` ? console.error : console.warn)(wr(`[workflow-sdk]`, i, c)),
            Ca(n, process.env.DEBUG) &&
              (console.debug(`[${n}] ${i}`, c ?? ``),
              _a()
                .then((n) => {
                  n?.addEvent(`${t}.${e}`, { message: i, ...c });
                })
                .catch(() => {})));
        };
      };
    return {
      debug: a(`debug`),
      info: a(`info`),
      warn: a(`warn`),
      error: a(`error`),
      child: (e) => n({ ...r, ...e }),
      forRun: (e, t, i) =>
        n({ ...r, workflowRunId: e, ...(t === void 0 ? {} : { workflowName: t }), ...(i ?? {}) }),
    };
  };
  return n({});
}
const Ta = wa(`step`),
  Y = wa(`runtime`),
  Ea = wa(`webhook`),
  Da = wa(`events`);
(wa(`adapter`), wa(`build`, { debugNamespace: `workflow:build` }));
function Oa(e) {
  if (_.is(e)) throw e;
}
function X(e, t) {
  let n = e.includes(`return value`) ? `returning` : `passing`,
    r = `Failed to serialize ${e}`;
  t instanceof D && t.path && (r += ` at path "${t.path}"`);
  let i = `Ensure you're ${n} workflow serializable types. Check the serialization docs to see what's serializable: https://workflow-sdk.dev/docs/foundations/serialization`;
  return (
    t instanceof D &&
      t.value !== void 0 &&
      Y.error(`Serialization failed`, { context: e, problematicValue: t.value }),
    { message: r, hint: i }
  );
}
async function ka(e, t, n) {
  try {
    let r = H.serialize(e, `client`, n);
    return Sr(await yr(U(V.DEVALUE_V1, r), n?.compression === !0, n?.compressionStats), t);
  } catch (e) {
    Oa(e);
    let { message: t, hint: n } = X(`client value`, e);
    throw new g(t, { hint: n, cause: e });
  }
}
async function Aa(e, t, n) {
  let r = await br(await Cr(e, t), n?.compressionStats);
  if (!(r instanceof Uint8Array)) {
    if (H.deserializeLegacy) return H.deserializeLegacy(r, `client`, n);
    throw Error(`Cannot deserialize non-binary data without legacy support`);
  }
  let { format: i, payload: a } = W(r);
  if (i === V.DEVALUE_V1) return H.deserialize(a, `client`, n);
  throw Error(`Unsupported serialization format: ${i}`);
}
async function ja(e, t, n) {
  try {
    let r = H.serialize(e, `step`, n);
    return Sr(await yr(U(V.DEVALUE_V1, r), n?.compression === !0, n?.compressionStats), t);
  } catch (e) {
    Oa(e);
    let { message: t, hint: n } = X(`step value`, e);
    throw new g(t, { hint: n, cause: e });
  }
}
async function Ma(e, t, n) {
  let r = await br(await Cr(e, t), n?.compressionStats);
  if (!(r instanceof Uint8Array)) {
    if (H.deserializeLegacy) return H.deserializeLegacy(r, `step`, n);
    throw Error(`Cannot deserialize non-binary data without legacy support`);
  }
  let { format: i, payload: a } = W(r);
  if (i === V.DEVALUE_V1) return H.deserialize(a, `step`, n);
  throw Error(`Unsupported serialization format: ${i}`);
}
function Na(e, t) {
  if (!(e instanceof Uint8Array)) {
    if (H.deserializeLegacy) return H.deserializeLegacy(e, `workflow`, t);
    throw Error(`Cannot deserialize non-binary data without legacy support`);
  }
  let { format: n, payload: r } = W(e);
  if (n === V.DEVALUE_V1) return H.deserialize(r, `workflow`, t);
  throw Error(`Unsupported serialization format: ${n}`);
}
const Pa = Symbol.for(`WORKFLOW_STEP_CONTEXT_STORAGE`),
  Fa = globalThis[Pa] ?? (globalThis[Pa] = new ce());
function Ia(e, t, n) {
  if (e === 0 && t === 0 && n === 0) return null;
  let r = [];
  (e > 0 && r.push(`${e} ${a(`step`, `steps`, e)}`),
    t > 0 && r.push(`${t} ${a(`hook`, `hooks`, t)}`),
    n > 0 && r.push(`${n} ${a(`timer`, `timers`, n)}`));
  let i = [];
  (e > 0 && i.push(`steps are completed`),
    t > 0 && i.push(`hooks are received`),
    n > 0 && i.push(`timers have elapsed`));
  let o = i.join(` and `);
  return `${r.join(` and `)} to be enqueued\n  Workflow will suspend and resume when ${o}`;
}
function La(e, t) {
  let n = `${e.replace(`wrun_`, `strm_`)}_user`;
  return t ? `${n}_${Buffer.from(t, `utf-8`).toString(`base64url`)}` : n;
}
function Ra(e) {
  return `strm_${e}_system_abort`;
}
function za(e) {
  if (!e.startsWith(`abrt_`))
    throw Error(`Invalid abort hook token format: expected "abrt_" prefix, got "${e}"`);
  return Ra(e.slice(5));
}
const Ba = () => b(`WORKFLOW_DEFERRED_CHECK_DELAY_MS`, 100, { integer: !0, min: 10 });
var Z;
(function (e) {
  ((e[(e.Consumed = 0)] = `Consumed`),
    (e[(e.NotConsumed = 1)] = `NotConsumed`),
    (e[(e.Finished = 2)] = `Finished`));
})((Z ||= {}));
var Va = class {
    eventIndex;
    events = [];
    callbacks = [];
    onConsumedEvent;
    onUnconsumedEvent;
    getPromiseQueue;
    pendingUnconsumedCheck = null;
    pendingUnconsumedTimeout = null;
    unconsumedCheckVersion = 0;
    constructor(e, t) {
      ((this.events = e),
        (this.eventIndex = 0),
        (this.onConsumedEvent = t.onConsumedEvent),
        (this.onUnconsumedEvent = t.onUnconsumedEvent),
        (this.getPromiseQueue = t.getPromiseQueue));
    }
    subscribe(e) {
      (this.callbacks.push(e),
        this.pendingUnconsumedCheck !== null &&
          (this.unconsumedCheckVersion++,
          (this.pendingUnconsumedCheck = null),
          this.pendingUnconsumedTimeout !== null &&
            (clearTimeout(this.pendingUnconsumedTimeout), (this.pendingUnconsumedTimeout = null))),
        process.nextTick(this.consume));
    }
    notifyConsumedEvent(e) {
      if (this.onConsumedEvent)
        try {
          this.onConsumedEvent(e);
        } catch (e) {
          Da.error(`onConsumedEvent callback threw an error`, { error: e });
        }
    }
    consume = () => {
      for (;;) {
        let e = this.events[this.eventIndex] ?? null;
        if (!this.consumeOne(e)) {
          this.handleUnconsumed(e);
          return;
        }
      }
    };
    consumeOne(e) {
      for (let t = 0; t < this.callbacks.length; t++) {
        let n = this.callbacks[t],
          r = Z.NotConsumed;
        try {
          r = n(e);
        } catch (e) {
          Da.error(`EventConsumer callback threw an error`, { error: e });
        }
        if (!(r !== Z.Consumed && r !== Z.Finished))
          return (
            e !== null && this.notifyConsumedEvent(e),
            this.eventIndex++,
            r === Z.Finished && this.callbacks.splice(t, 1),
            e !== null
          );
      }
      return !1;
    }
    handleUnconsumed(e) {
      if (e !== null) {
        let t = ++this.unconsumedCheckVersion;
        this.pendingUnconsumedCheck = this.getPromiseQueue()
          .then(() => new Promise((e) => setTimeout(e, 0)))
          .then(() => this.getPromiseQueue())
          .then(() => {
            this.pendingUnconsumedTimeout = setTimeout(() => {
              ((this.pendingUnconsumedTimeout = null),
                this.unconsumedCheckVersion === t &&
                  ((this.pendingUnconsumedCheck = null), this.onUnconsumedEvent(e)));
            }, Ba());
          });
      }
    }
  },
  Ha = class {
    aborted = !1;
    reason = void 0;
    [N];
    [P];
    #e = [];
    #t = null;
    get onabort() {
      return this.#t;
    }
    set onabort(e) {
      ((this.#t = e), e && this.aborted && e.call(this));
    }
    constructor(e, t) {
      ((this[N] = e), (this[P] = t));
    }
    _setAborted(e) {
      if (!this.aborted) {
        ((this.aborted = !0), (this.reason = e), this.#t && this.#t.call(this));
        for (let e of this.#e) e();
        this.#e = [];
      }
    }
    addEventListener(e, t) {
      if (e === `abort`) {
        if (this.aborted) {
          t();
          return;
        }
        this.#e.push(t);
      }
    }
    removeEventListener(e, t) {
      e === `abort` && (this.#e = this.#e.filter((e) => e !== t));
    }
    throwIfAborted() {
      if (this.aborted)
        throw this.reason ?? new DOMException(`The operation was aborted.`, `AbortError`);
    }
  };
function Ua(e) {
  return class {
    signal;
    [N];
    [P];
    constructor() {
      let t = e.generateUlid(),
        n = Ra(t),
        r = `abrt_${t}`;
      ((this[N] = n), (this[P] = r), (this.signal = new Ha(n, r)));
      let i = `hook_${e.generateUlid()}`;
      (e.invocationsQueue.set(i, {
        type: `hook`,
        correlationId: i,
        token: r,
        isWebhook: !1,
        isSystem: !0,
      }),
        e.eventsConsumer.subscribe((t) => {
          if (!t || t.correlationId !== i) return Z.NotConsumed;
          let n =
            `eventData` in t && t.eventData && `token` in t.eventData ? t.eventData.token : void 0;
          if (typeof n == `string` && n !== this[P])
            return (
              (e.promiseQueue = e.promiseQueue.then(() => {
                e.onWorkflowError(
                  new h(
                    `Replay divergence: abort hook event ${t.eventType} for ${i} belongs to token "${n}", but the current abort hook expects "${this[P]}"`,
                    { eventId: t.eventId },
                  ),
                );
              })),
              Z.Finished
            );
          if (t.eventType === `hook_created`) {
            let t = e.invocationsQueue.get(i);
            return (t && t.type === `hook` && (t.hasCreatedEvent = !0), Z.Consumed);
          }
          if (t.eventType === `hook_received`) {
            let n = t.eventData?.payload;
            return (
              e.pendingDeliveries++,
              (e.promiseQueue = e.promiseQueue.then(async () => {
                let r;
                try {
                  if (n !== void 0)
                    try {
                      let i = await e.replayPayloadCache.prepareEventPayload(
                          t.eventId,
                          `payload`,
                          n,
                        ),
                        a = await Ho(n, e.runId, e.encryptionKey, e.globalThis, {}, i);
                      a && typeof a == `object` && `reason` in a && (r = a.reason);
                    } catch {}
                  this.signal._setAborted(r);
                } finally {
                  e.pendingDeliveries--;
                }
              })),
              e.invocationsQueue.delete(i),
              Z.Consumed
            );
          }
          return t.eventType === `hook_disposed`
            ? (e.invocationsQueue.delete(i), Z.Finished)
            : Z.NotConsumed;
        }));
    }
    abort(t) {
      if (!this.signal.aborted) {
        this.signal._setAborted(t);
        for (let [, n] of e.invocationsQueue)
          if (n.type === `hook` && n.token === this[P]) {
            ((n.abortRequested = !0), (n.abortReason = t));
            break;
          }
      }
    }
  };
}
function Wa() {
  return {
    abort(e) {
      let t = new Ha(``, ``);
      return (t._setAborted(e ?? new DOMException(`The operation was aborted.`, `AbortError`)), t);
    },
    any(e) {
      let t = new Ha(``, ``),
        n = Array.from(e);
      for (let e of n) if (e.aborted) return (t._setAborted(e.reason), t);
      let r = [],
        i = () => {
          for (let { signal: e, listener: t } of r)
            e.removeEventListener && e.removeEventListener(`abort`, t);
          r.length = 0;
        };
      for (let e of n) {
        if (!e.addEventListener) continue;
        let n = () => {
          t.aborted || (t._setAborted(e.reason), i());
        };
        (r.push({ signal: e, listener: n }), e.addEventListener(`abort`, n));
      }
      return t;
    },
    timeout() {
      throw Error(
        `AbortSignal.timeout() is not supported in workflow functions. Use sleep() with an AbortController instead. See: /docs/errors/abort-signal-timeout-in-workflow`,
      );
    },
  };
}
const Ga = ie();
function Ka(e) {
  try {
    return (e.getReader({ mode: `byob` }).releaseLock(), `bytes`);
  } catch {}
}
function qa(e) {
  return (
    Oa(e),
    (e instanceof g && e.cause !== void 0) || (e instanceof u && e.cause !== void 0) ? e.cause : e
  );
}
async function Q(e, t) {
  if (e.recorded)
    try {
      let n = await _a();
      if (!n) return;
      let r = e.uncompressedBytes ?? 0,
        i = e.storedBytes ?? 0;
      n.setAttributes({
        ...Wi(t),
        ...Gi(e.compressed ?? !1),
        ...Ki(e.codec ?? `none`),
        ...qi(r),
        ...Ji(i),
        ...(e.compressed && r > 0 ? Yi(1 - i / r) : {}),
      });
    } catch {}
}
function Ja(e, t) {
  let n = new TextEncoder(),
    r = { resolved: !1, key: void 0 };
  return new TransformStream({
    async transform(i, a) {
      try {
        r.resolved ||= ((r.key = await xr(t)), !0);
        let o = k(i, e),
          s = n.encode(o),
          c = U(V.DEVALUE_V1, s);
        if (r.key) {
          let e = await tn(r.key, c);
          c = U(V.ENCRYPTED, e);
        }
        let l = new Uint8Array(4 + c.length);
        (new DataView(l.buffer).setUint32(0, c.length, !1), l.set(c, 4), a.enqueue(l));
      } catch (e) {
        if (_.is(e)) {
          a.error(e);
          return;
        }
        let { message: t, hint: n } = X(`stream chunk`, e);
        a.error(new g(t, { hint: n, cause: e }));
      }
    },
  });
}
function Ya(e, t) {
  let n = new TextDecoder(),
    r = new Uint8Array(),
    i = { resolved: !1, key: void 0 };
  function a(e) {
    let t = new Uint8Array(r.length + e.length);
    (t.set(r, 0), t.set(e, r.length), (r = t));
  }
  async function o(a) {
    for (i.resolved ||= ((i.key = await xr(t)), !0); r.length >= 4;) {
      let t = new DataView(r.buffer, r.byteOffset, r.byteLength).getUint32(0, !1);
      if (r.length < 4 + t) break;
      let o = r.slice(4, 4 + t);
      r = r.slice(4 + t);
      let { format: s, payload: c } = W(o);
      if (s === V.ENCRYPTED) {
        if (!i.key) {
          a.error(
            new _(
              `Encrypted stream data encountered but no encryption key is available. Encryption is not configured or no key was provided for this run.`,
              { context: { operation: `decrypt`, byteLength: c.byteLength, formatPrefix: `encr` } },
            ),
          );
          return;
        }
        let e;
        try {
          e = await nn(i.key, c);
        } catch (e) {
          throw (_.is(e) && e.context && (e.context.formatPrefix = s), e);
        }
        ({ format: s, payload: c } = W(e));
      }
      if (s === V.DEVALUE_V1) {
        let t = n.decode(c);
        a.enqueue(Yt(t, e));
      }
    }
  }
  return new TransformStream({
    async transform(t, i) {
      if (r.length === 0 && t.length >= 4) {
        let e = new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(0, !1);
        if (e > 0 && e < 1e8) {
          (a(t), await o(i));
          return;
        }
      } else if (r.length > 0) {
        (a(t), await o(i));
        return;
      }
      let s = n.decode(t).split(`
`);
      for (let t of s) t.length > 0 && i.enqueue(Yt(t, e));
    },
    async flush(e) {
      r.length > 0 && (await o(e));
    },
  });
}
const Xa = 1e8;
function Za() {
  return new TransformStream({
    transform(e, t) {
      if (e.length === 0) return;
      if (e.length > Xa) {
        t.error(
          new u(
            `Byte-stream chunk of ${e.length} bytes exceeds the maximum framed chunk size (${Xa}). Split the data into smaller chunks before writing.`,
            { slug: `serialization-failed` },
          ),
        );
        return;
      }
      let n = new Uint8Array(4 + e.length);
      (new DataView(n.buffer).setUint32(0, e.length, !1), n.set(e, 4), t.enqueue(n));
    },
  });
}
function Qa() {
  let e = new Uint8Array();
  function t(t) {
    let n = new Uint8Array(e.length + t.length);
    (n.set(e, 0), n.set(t, e.length), (e = n));
  }
  return new TransformStream({
    transform(n, r) {
      for (n.length > 0 && t(n); e.length >= 4;) {
        let t = new DataView(e.buffer, e.byteOffset, e.byteLength).getUint32(0, !1);
        if (t > Xa) {
          r.error(
            new u(
              `Byte-stream frame length ${t} exceeds maximum (${Xa}). This usually means a non-framed byte stream is being read as framed.`,
              { slug: `serialization-failed` },
            ),
          );
          return;
        }
        let n = 4 + t;
        if (e.length < n) break;
        (r.enqueue(e.slice(4, n)), (e = e.slice(n)));
      }
    },
    flush(t) {
      e.length > 0 &&
        t.error(
          new u(
            `Byte-stream ended with ${e.length} bytes of incomplete frame data. The stream was truncated mid-frame.`,
            { slug: `serialization-failed` },
          ),
        );
    },
  });
}
function $a(e, t, n, r, i) {
  (async () => {
    await ma(`workflow.stream.read`, e, {
      kind: await va(`CLIENT`),
      attributes: {
        "workflow.run.id": t,
        "workflow.stream.name": n,
        "workflow.stream.operation": `read`,
        "workflow.stream.read.ttfc_ms": Date.now() - e,
        ...(typeof i == `number` ? { "workflow.stream.read.connect_ms": i } : {}),
        ...(typeof r == `number` ? { "workflow.stream.start_index": r } : {}),
      },
    });
  })();
}
function eo(e, t, n, r, i, a) {
  (async () => {
    await ma(`workflow.stream.read.complete`, e, {
      kind: await va(`CLIENT`),
      attributes: {
        "workflow.run.id": t,
        "workflow.stream.name": n,
        "workflow.stream.operation": `read_complete`,
        "workflow.stream.read.total_ms": Date.now() - e,
        "workflow.stream.read.chunks": r,
        "workflow.stream.read.bytes": i,
        ...(typeof a == `number` ? { "workflow.stream.read.reconnects": a } : {}),
      },
    });
  })();
}
var to = class extends ReadableStream {
  #e;
  constructor(e, t, n) {
    if (typeof t != `string` || t.length === 0) throw new u(`"name" is required, got "${t}"`);
    let r,
      i = !1,
      a,
      o = 0,
      s = 0;
    super({
      type: `bytes`,
      pull: async (c) => {
        let l = this.#e;
        if (!l) {
          r === void 0 && (r = Date.now());
          let i = await L(),
            o = Date.now(),
            s = await i.streams.get(e, t, n);
          ((a = Date.now() - o), (l = this.#e = s.getReader()));
        }
        if (!l) {
          c.error(Error(`Failed to get reader`));
          return;
        }
        let u = await l.read();
        u.done
          ? ((this.#e = void 0), r !== void 0 && eo(r, e, t, o, s), c.close())
          : (!i && u.value.byteLength > 0 && r !== void 0 && ((i = !0), $a(r, e, t, n, a)),
            (o += 1),
            (s += u.value.byteLength),
            c.enqueue(u.value));
      },
      cancel: async (e) => {
        this.#e &&= (await this.#e.cancel(e).catch(() => {}), void 0);
      },
    });
  }
};
const no = () => b(`WORKFLOW_FRAMED_STREAM_MAX_RECONNECTS`, 50, { integer: !0, min: 1 }),
  ro = () => b(`WORKFLOW_FRAMED_STREAM_MAX_TOTAL_RECONNECTS`, 1e3, { integer: !0, min: 1 });
function io(e, t, n) {
  let r = n === void 0 || n >= 0,
    i = n ?? 0,
    a = 0,
    o = 0,
    s = 0,
    c,
    l = new Uint8Array(),
    u,
    d,
    f = !1,
    p = 0,
    m = 0;
  async function h() {
    let o = await L(),
      s = r ? i + a : n,
      l = Date.now(),
      u = await o.streams.get(e, t, s);
    (d === void 0 && (d = Date.now() - l), (c = u.getReader()));
  }
  async function g() {
    ((c &&= (await c.cancel().catch(() => {}), void 0)), (i += a), (a = 0), (l = new Uint8Array()));
    let e = no(),
      n = ro();
    for (;;) {
      if ((o++, s++, o > e))
        throw Error(`Stream "${t}" exceeded maximum reconnection attempts (${e})`);
      if (s > n) throw Error(`Stream "${t}" exceeded maximum total reconnection attempts (${n})`);
      try {
        await h();
        return;
      } catch {}
    }
  }
  return new ReadableStream({
    pull: async (i) => {
      for (u === void 0 && (u = Date.now()); ;) {
        if (!c)
          try {
            await h();
          } catch (e) {
            i.error(e);
            return;
          }
        let _;
        try {
          _ = await c.read();
        } catch (e) {
          if (!r) {
            i.error(e);
            return;
          }
          try {
            await g();
          } catch (e) {
            i.error(e);
            return;
          }
          continue;
        }
        if (_.done || !_.value) {
          ((c = void 0), u !== void 0 && eo(u, e, t, p, m, s), i.close());
          return;
        }
        let v = _.value;
        if (v.length > 0) {
          let e = new Uint8Array(l.length + v.length);
          (e.set(l, 0), e.set(v, l.length), (l = e));
        }
        let y = !1;
        for (; l.length >= 4;) {
          let r = 4 + new DataView(l.buffer, l.byteOffset, l.byteLength).getUint32(0, !1);
          if (l.length < r) break;
          (i.enqueue(l.slice(0, r)),
            (l = l.slice(r)),
            a++,
            p++,
            (m += r),
            !f && u !== void 0 && ((f = !0), $a(u, e, t, n, d)),
            (y = !0));
        }
        if (y) {
          o = 0;
          return;
        }
      }
    },
    cancel: async () => {
      c &&=
        (await c.cancel().catch((e) => {
          console.warn(`Error closing ReadableStream reader:`, e);
        }),
        void 0);
    },
  });
}
const ao = () => b(`WORKFLOW_STREAM_FLUSH_INTERVAL_MS`, 10, { integer: !0 });
function oo(e, t, n, r, i, a, o) {
  (async () => {
    await ma(`workflow.stream.flush`, e, {
      kind: await va(`CLIENT`),
      attributes: {
        "workflow.run.id": n,
        "workflow.stream.name": r,
        "workflow.stream.operation": `flush`,
        "workflow.stream.flush.buffer_dwell_ms": t - e,
        "workflow.stream.flush.chunks": i,
        "workflow.stream.flush.bytes": a,
        "workflow.stream.write.chunk_rtt": o,
      },
    });
  })();
}
function so(e, t, n) {
  (async () => {
    await ma(`workflow.stream.close`, e, {
      kind: await va(`CLIENT`),
      attributes: {
        "workflow.run.id": t,
        "workflow.stream.name": n,
        "workflow.stream.operation": `close`,
        "workflow.stream.close.rpc_ms": Date.now() - e,
      },
    });
  })();
}
var $ = class extends WritableStream {
  constructor(e, t, n) {
    if (typeof e != `string`) throw new u(`"runId" must be a string, got "${typeof e}"`);
    if (typeof t != `string` || t.length === 0) throw new u(`"name" is required, got "${t}"`);
    let r = L(),
      i = n,
      a = async () => {
        if (i) {
          try {
            await i;
          } catch {}
          i = void 0;
        }
      },
      o = [],
      s = null,
      c = null,
      l,
      d,
      f = async () => {
        if (((s &&= (clearTimeout(s), null)), o.length === 0)) return;
        await a();
        let n = o.slice(),
          i = d;
        d = void 0;
        let c = Date.now(),
          u = await r;
        l === void 0 && (l = u.streamFlushIntervalMs ?? ao());
        let f = Date.now();
        try {
          if (typeof u.streams.writeMulti == `function` && n.length > 1)
            await u.streams.writeMulti(e, t, n);
          else for (let r of n) await u.streams.write(e, t, r);
        } catch (e) {
          throw (i !== void 0 && (d = d === void 0 ? i : Math.min(d, i)), e);
        }
        (i !== void 0 &&
          oo(
            i,
            c,
            e,
            t,
            n.length,
            n.reduce((e, t) => e + t.byteLength, 0),
            Date.now() - f,
          ),
          (o = []));
      },
      p = [],
      m = () => {
        s ||= setTimeout(() => {
          s = null;
          let e = p;
          ((p = []),
            (c = f().then(
              () => {
                for (let t of e) t.resolve();
              },
              (t) => {
                for (let n of e) n.reject(t);
              },
            )));
        }, l ?? ao());
      };
    (super({
      async write(e) {
        (d === void 0 && (d = Date.now()),
          (c &&= (await c, null)),
          o.push(e),
          m(),
          await new Promise((e, t) => {
            p.push({ resolve: e, reject: t });
          }));
      },
      async close() {
        ((c &&= (await c, null)), await f(), await a());
        let n = await r,
          i = Date.now();
        (await n.streams.close(e, t), so(i, e, t));
      },
      abort(e) {
        ((s &&= (clearTimeout(s), null)), (o = []));
        let t = p;
        p = [];
        let n = e ?? Error(`Stream aborted`);
        for (let e of t) e.reject(n);
      },
    }),
      Object.defineProperty(this, fn, {
        value: async (e) => {
          if (e.length !== 0) {
            d === void 0 && (d = Date.now());
            for (let t of e) o.push(t);
            await f();
          }
        },
        enumerable: !1,
        writable: !1,
      }));
  }
};
function co(e = globalThis) {
  return {
    ...Un(),
    ...Qn(),
    ...Xn(e),
    Request: (t) => {
      if (!(t instanceof e.Request)) return !1;
      let n = { method: t.method, url: t.url, headers: t.headers, body: t.body, duplex: t.duplex },
        r = t[mn];
      return (
        r && (n.responseWritable = r),
        t.signal && (t.signal.aborted || t.signal[N]) && (n.signal = t.signal),
        n
      );
    },
    Response: (t) =>
      t instanceof e.Response
        ? {
            type: t.type,
            url: t.url,
            status: t.status,
            statusText: t.statusText,
            headers: t.headers,
            body: t.body,
            redirected: t.redirected,
          }
        : !1,
  };
}
function lo(e, t, n, r, i, a) {
  let o = t[N],
    s = t[P];
  if (!o) {
    let e = (n[ln] || Ga)();
    ((o = Ra(e)),
      (s = `abrt_${e}`),
      (t[N] = o),
      (t[P] = s),
      t.signal && ((t.signal[N] = o), (t.signal[P] = s)));
  }
  return (
    fo(e, o, i, a, r),
    { streamName: o, hookToken: s, aborted: e.aborted, reason: e.aborted ? e.reason : void 0 }
  );
}
function uo(e, t) {
  let n = t[N] ?? t.signal?.[N],
    r = t[P] ?? t.signal?.[P];
  if (!n) throw Error(`AbortController/AbortSignal stream name is not set`);
  return { streamName: n, hookToken: r, aborted: e.aborted, reason: e.aborted ? e.reason : void 0 };
}
function fo(e, t, n, r, i) {
  e.aborted ||
    e[gn] ||
    ((e[gn] = !0),
    e.addEventListener(
      `abort`,
      () => {
        i.push(
          (async () => {
            try {
              let i = await xr(r),
                a = await Fo({ aborted: !0, reason: e.reason }, n, i),
                o = new $(n, t).getWriter();
              (await o.write(a), await o.close());
            } catch {}
          })(),
        );
      },
      { once: !0 },
    ));
}
function po(e = globalThis, t, n, r, i = !1, a) {
  return {
    ...co(e),
    ReadableStream: (o) => {
      if (!(o instanceof e.ReadableStream)) return !1;
      if (o.locked)
        throw new g(`ReadableStream is locked and cannot be passed across a workflow boundary.`, {
          hint: `Pass the stream before calling .getReader() / .pipeThrough() / .pipeTo(), or tee it with .tee() and pass one of the branches.`,
        });
      let s = `strm_${(e[ln] || Ga)()}`,
        c = Ka(o),
        l = new $(n, s, a);
      c === `bytes`
        ? i
          ? t.push(o.pipeThrough(Za()).pipeTo(l))
          : t.push(o.pipeTo(l))
        : t.push(o.pipeThrough(Ja(po(e, t, n, r, i, a), r)).pipeTo(l));
      let u = { name: s };
      return (c && (u.type = c), c === `bytes` && i && (u.framing = `framed-v1`), u);
    },
    WritableStream: (r) => {
      if (!(r instanceof e.WritableStream)) return !1;
      let i = r[A],
        a = r[j];
      if (typeof i == `string` && typeof a == `string`) {
        let e = { name: i, runId: a },
          t = r[M];
        return (typeof t == `string` && (e.deploymentId = t), e);
      }
      let o = `strm_${(e[ln] || Ga)()}`,
        s = new to(n, o);
      return (t.push(s.pipeTo(r)), { name: o });
    },
    AbortController: (i) =>
      !e.AbortController ||
      typeof e.AbortController != `function` ||
      !(i instanceof e.AbortController)
        ? !1
        : lo(i.signal, i, e, t, n, r),
    AbortSignal: (i) =>
      !e.AbortSignal || typeof e.AbortSignal != `function` || !(i instanceof e.AbortSignal)
        ? !1
        : lo(i, i, e, t, n, r),
  };
}
function mo(e = globalThis) {
  return {
    ...co(e),
    ReadableStream: (t) => {
      if (!(t instanceof e.ReadableStream)) return !1;
      let n = t[pn];
      if (n !== void 0) return { bodyInit: n };
      let r = t[A];
      if (!r) throw new u("ReadableStream `name` is not set");
      let i = { name: r },
        a = t[un];
      a && (i.type = a);
      let o = t[dn];
      return (o && (i.framing = o), i);
    },
    WritableStream: (t) => {
      if (!(t instanceof e.WritableStream)) return !1;
      let n = t[A];
      if (!n) throw new u("WritableStream `name` is not set");
      let r = { name: n },
        i = t[j];
      typeof i == `string` && (r.runId = i);
      let a = t[M];
      return (typeof a == `string` && (r.deploymentId = a), r);
    },
    AbortController: (t) => {
      if (!t || !t.signal) return !1;
      let n = t,
        r = n[N] ?? n.signal?.[N],
        i =
          e.AbortController &&
          typeof e.AbortController == `function` &&
          t instanceof e.AbortController;
      return !r && !i ? !1 : uo(t.signal, n);
    },
    AbortSignal: (t) => {
      let n = t?.[N],
        r = e.AbortSignal && typeof e.AbortSignal == `function` && t instanceof e.AbortSignal;
      return !n && !r ? !1 : uo(t, t);
    },
  };
}
function ho(e = globalThis, t, n, r, i = !1, a) {
  return {
    ...co(e),
    ReadableStream: (o) => {
      if (!(o instanceof e.ReadableStream)) return !1;
      if (o.locked)
        throw new g(`ReadableStream is locked and cannot be passed across a workflow boundary.`, {
          hint: `Pass the stream before calling .getReader() / .pipeThrough() / .pipeTo(), or tee it with .tee() and pass one of the branches.`,
        });
      let s = o[A],
        c = o[un],
        l = o[dn];
      if (!s) {
        ((s = `strm_${(e[ln] || Ga)()}`), (c = Ka(o)), (l = c === `bytes` && i ? `framed-v1` : l));
        let u = new $(n, s, a);
        c === `bytes`
          ? l === `framed-v1`
            ? t.push(o.pipeThrough(Za()).pipeTo(u))
            : t.push(o.pipeTo(u))
          : t.push(o.pipeThrough(Ja(ho(e, t, n, r, i, a), r)).pipeTo(u));
      }
      let u = { name: s };
      return (c && (u.type = c), l && (u.framing = l), u);
    },
    WritableStream: (i) => {
      if (!(i instanceof e.WritableStream)) return !1;
      let a = i[A],
        o = i[j];
      a ||
        ((a = `strm_${(e[ln] || Ga)()}`),
        t.push(new to(n, a).pipeThrough(Ya(Eo(e, t, n, r), r)).pipeTo(i)));
      let s = { name: a };
      typeof o == `string` && (s.runId = o);
      let c = i[M];
      return (typeof c == `string` && (s.deploymentId = c), s);
    },
    AbortController: (i) =>
      !e.AbortController ||
      typeof e.AbortController != `function` ||
      !(i instanceof e.AbortController)
        ? !1
        : lo(i.signal, i, e, t, n, r),
    AbortSignal: (i) =>
      !e.AbortSignal || typeof e.AbortSignal != `function` || !(i instanceof e.AbortSignal)
        ? !1
        : lo(i, i, e, t, n, r),
  };
}
function go(...e) {
  let t = new WeakSet();
  function n(e) {
    let t = e[_n];
    t && !t.signal.aborted && t.abort();
  }
  function r(e) {
    if (!(typeof e != `object` || !e) && !t.has(e)) {
      if ((t.add(e), e instanceof AbortController)) {
        (n(e), n(e.signal));
        return;
      }
      if (e instanceof AbortSignal) {
        n(e);
        return;
      }
      if (Array.isArray(e)) {
        for (let t of e) r(t);
        return;
      }
      if (e instanceof Map) {
        for (let t of e.values()) r(t);
        return;
      }
      if (e instanceof Set) {
        for (let t of e) r(t);
        return;
      }
      if (typeof Request < `u` && e instanceof Request) {
        r(e.signal);
        return;
      }
      for (let t of Object.values(e)) r(t);
    }
  }
  for (let t of e) r(t);
}
function _o(e, t, n, r) {
  let i = new AbortController();
  return (
    r.push(
      (async () => {
        try {
          let r = new to(t, n).getReader(),
            a = await Promise.race([
              r.read(),
              new Promise((e) => {
                if (i.signal.aborted) {
                  e({ value: void 0, done: !0 });
                  return;
                }
                i.signal.addEventListener(`abort`, () => e({ value: void 0, done: !0 }), {
                  once: !0,
                });
              }),
            ]);
          if (a.value && !a.done) {
            try {
              r.releaseLock();
            } catch {}
            try {
              let n = Fa.getStore(),
                r = await Io(a.value, t, n?.encryptionKey);
              e.abort(r?.reason);
            } catch {
              e.abort();
            }
          } else r.cancel().catch(() => {});
        } catch {}
      })(),
    ),
    i
  );
}
function vo(e, t, n) {
  let r = e,
    i = e.signal;
  ((r[N] = t.streamName),
    (r[P] = t.hookToken),
    (i[N] = t.streamName),
    (i[P] = t.hookToken),
    n && ((r[_n] = n), (i[_n] = n)));
}
function yo(e, t) {
  let n = e,
    r = t;
  (n[N] !== void 0 && (r[N] = n[N]),
    n[P] !== void 0 && (r[P] = n[P]),
    n[_n] !== void 0 && (r[_n] = n[_n]));
}
function bo(e, t, n) {
  let r = new AbortController();
  e.aborted
    ? (vo(r, e), r.abort(e.reason))
    : e.streamName
      ? vo(r, e, _o(r, n, e.streamName, t))
      : vo(r, e);
  let i = r.abort.bind(r);
  return (
    (r.abort = (t) => {
      if (r.signal.aborted) return;
      i(t);
      let n = Fa.getStore();
      if (
        n &&
        (n.ops.push(
          (async () => {
            try {
              let r = await Fo(
                  { aborted: !0, reason: t },
                  n.workflowMetadata.workflowRunId,
                  n.encryptionKey,
                ),
                i = new $(n.workflowMetadata.workflowRunId, e.streamName).getWriter();
              (await i.write(r), await i.close());
            } catch {}
          })(),
        ),
        e.hookToken)
      ) {
        let r = (async () => {
          try {
            let { resumeHook: n } = await import(`./resume-hook-czpG5xnP.js`).then((e) => e.i);
            await n(e.hookToken, { aborted: !0, reason: t });
          } catch {}
        })();
        n.preCompletionOps.push(r);
      }
    }),
    r
  );
}
function xo(e, t, n) {
  let r = new AbortController();
  return (
    e.aborted
      ? (vo(r, e), r.abort(e.reason))
      : e.streamName
        ? vo(r, e, _o(r, n, e.streamName, t))
        : vo(r, e),
    r.signal
  );
}
function So(e = globalThis) {
  return { ...Wn(e), ...Zn(e) };
}
async function Co(e, t) {
  let n = await L();
  if (!n.getEncryptionKeyForRun) return;
  let r = t
    ? await n.getEncryptionKeyForRun(e, { deploymentId: t })
    : await n.getEncryptionKeyForRun(await n.runs.get(e));
  return r ? await en(r, [`encrypt`]) : void 0;
}
function wo(e = globalThis, t, n, r) {
  return {
    ...So(e),
    StepFunction: () => {
      throw new g(
        `Step functions cannot be deserialized in client context. Step functions should not be returned from workflows.`,
        {
          hint: `A step function reference reached the client. Return a serializable value (e.g. the step result) instead of the step itself.`,
        },
      );
    },
    WorkflowFunction: (e) =>
      Object.assign(
        () => {
          throw new g(`Workflow functions cannot be called directly. Use start() to invoke them.`, {
            hint: "Wrap the workflow with `start(workflowFn, { ... })` from `workflow` to begin a run instead of invoking it like a normal function.",
          });
        },
        { workflowId: e.workflowId },
      ),
    Request: (t) => {
      let n = {
        method: t.method,
        headers: new e.Headers(t.headers),
        body: t.body,
        duplex: t.duplex,
      };
      t.signal && (n.signal = t.signal);
      let r = new e.Request(t.url, n);
      return (t.signal && yo(t.signal, r.signal), r);
    },
    Response: (t) =>
      new e.Response(t.body, {
        status: t.status,
        statusText: t.statusText,
        headers: new e.Headers(t.headers),
      }),
    ReadableStream: (i) => {
      if (`bodyInit` in i) {
        let t = i.bodyInit;
        return new e.Response(t).body;
      }
      if (i.type === `bytes`) {
        let r = new to(n, i.name, i.startIndex),
          a = F();
        t.push(a.promise);
        let { readable: o, writable: s } =
          i.framing === `framed-v1` ? Qa() : new e.TransformStream();
        return (I(r, s, a).catch(() => {}), Tn(o, a), o);
      } else {
        let a = io(n, i.name, i.startIndex),
          o = Ya(wo(e, t, n, r), r),
          s = F();
        return (
          t.push(s.promise), I(a, o.writable, s).catch(() => {}), Tn(o.readable, s), o.readable
        );
      }
    },
    WritableStream: (i) => {
      let a = typeof i.runId == `string` ? i.runId : n,
        o = a === n ? r : Co(a, i.deploymentId),
        s = Ja(po(e, t, a, o), o),
        c = new $(a, i.name),
        l = F();
      return (
        t.push(l.promise),
        I(s.readable, c, l).catch(() => {}),
        wn(s.writable, l),
        Object.defineProperty(s.writable, A, { value: i.name, writable: !1 }),
        Object.defineProperty(s.writable, j, { value: a, writable: !1 }),
        typeof i.deploymentId == `string` &&
          Object.defineProperty(s.writable, M, { value: i.deploymentId, writable: !1 }),
        s.writable
      );
    },
    AbortController: (e) => bo(e, t, n),
    AbortSignal: (e) => xo(e, t, n),
  };
}
function To(e = globalThis) {
  return {
    ...So(e),
    ...$n(e),
    Request: (t) => {
      Object.setPrototypeOf(t, e.Request.prototype);
      let n = t.responseWritable;
      return (
        n &&
          ((t[mn] = n),
          delete t.responseWritable,
          (t.respondWith = () => {
            throw new g("`respondWith()` must be called from within a step function.", {
              hint: 'Move the `respondWith(...)` call inside a `"use step"` function — it cannot be invoked from a workflow context.',
            });
          })),
        t
      );
    },
    WorkflowFunction: (e) =>
      Object.assign(
        () => {
          throw new g(`Workflow functions cannot be called directly. Use start() to invoke them.`, {
            hint: "Wrap the workflow with `start(workflowFn, { ... })` from `workflow` to begin a run instead of invoking it like a normal function.",
          });
        },
        { workflowId: e.workflowId },
      ),
    Response: (t) => (Object.setPrototypeOf(t, e.Response.prototype), t),
    ReadableStream: (t) =>
      `bodyInit` in t
        ? Object.create(e.ReadableStream.prototype, { [pn]: { value: t.bodyInit, writable: !1 } })
        : Object.create(e.ReadableStream.prototype, {
            [A]: { value: t.name, writable: !1 },
            [un]: { value: t.type, writable: !1 },
            [dn]: { value: t.framing, writable: !1 },
          }),
    WritableStream: (t) => {
      let n = { [A]: { value: t.name, writable: !1 } };
      return (
        typeof t.runId == `string` && (n[j] = { value: t.runId, writable: !1 }),
        typeof t.deploymentId == `string` && (n[M] = { value: t.deploymentId, writable: !1 }),
        Object.create(e.WritableStream.prototype, n)
      );
    },
    AbortController: (e) => {
      let t = new Ha(e.streamName, e.hookToken);
      return (
        e.aborted && t._setAborted(e.reason),
        { [N]: e.streamName, [P]: e.hookToken, signal: t, abort: () => {} }
      );
    },
    AbortSignal: (e) => {
      let t = new Ha(e.streamName, e.hookToken);
      return (e.aborted && t._setAborted(e.reason), t);
    },
  };
}
function Eo(e = globalThis, t, n, r, i) {
  return {
    ...So(e),
    StepFunction: (e) => {
      let t = e.stepId,
        n = e.closureVars,
        r = `boundThis` in e,
        i = r ? e.boundThis : void 0,
        a = Array.isArray(e.boundArgs) ? e.boundArgs : [],
        o = oe(t);
      if (!o)
        throw new g(`Step function "${t}" not found. Make sure the step function is registered.`, {
          hint: `Make sure the step file is included in your build (i.e. it is listed in the workflow manifest), and that the SWC plugin is configured for the file.`,
        });
      if (!n && !r && a.length === 0) return o;
      let s = function (...e) {
        let t = r ? i : this,
          s = a.length > 0 ? [...a, ...e] : e;
        if (n) {
          let e = Fa.getStore();
          if (!e)
            throw new u(`Cannot call step function with closure variables outside step context`);
          let r = { ...e, closureVars: n };
          return Fa.run(r, () => o.apply(t, s));
        }
        return o.apply(t, s);
      };
      return (
        Object.defineProperty(s, "name", { value: o.name }),
        Object.defineProperty(s, "stepId", {
          value: t,
          writable: !1,
          enumerable: !1,
          configurable: !1,
        }),
        o.maxRetries !== void 0 && (s.maxRetries = o.maxRetries),
        s
      );
    },
    WorkflowFunction: (e) =>
      Object.assign(
        () => {
          throw new g(`Workflow functions cannot be called directly. Use start() to invoke them.`, {
            hint: "Wrap the workflow with `start(workflowFn, { ... })` from `workflow` to begin a run instead of invoking it like a normal function.",
          });
        },
        { workflowId: e.workflowId },
      ),
    Request: (t) => {
      let n = t.responseWritable,
        r = { method: t.method, headers: new e.Headers(t.headers), body: t.body, duplex: t.duplex };
      t.signal && (r.signal = t.signal);
      let i = new e.Request(t.url, r);
      return (
        t.signal && yo(t.signal, i.signal),
        n &&
          (i.respondWith = async (e) => {
            let t = n.getWriter();
            (await t.write(e), await t.close());
          }),
        i
      );
    },
    Response: (t) =>
      new e.Response(t.body, {
        status: t.status,
        statusText: t.statusText,
        headers: new e.Headers(t.headers),
      }),
    ReadableStream: (a) => {
      if (`bodyInit` in a) {
        let t = a.bodyInit;
        return new e.Response(t).body;
      }
      let o = new to(n, a.name);
      if (a.type === `bytes`) {
        let n = F();
        t.push(n.promise);
        let { readable: r, writable: i } =
          a.framing === `framed-v1` ? Qa() : new e.TransformStream();
        return (I(o, i, n).catch(() => {}), Tn(r, n), r);
      } else {
        let a = Ya(Eo(e, t, n, r, i), r),
          s = F();
        return (
          t.push(s.promise), I(o, a.writable, s).catch(() => {}), Tn(a.readable, s), a.readable
        );
      }
    },
    WritableStream: (a) => {
      let o = typeof a.runId == `string` ? a.runId : n,
        s = typeof a.deploymentId == `string` ? a.deploymentId : o === n ? i : void 0,
        c = o === n ? r : Co(o, s),
        l = Ja(ho(e, t, o, c), c),
        u = new $(o, a.name),
        d = F();
      return (
        t.push(d.promise),
        I(l.readable, u, d).catch(() => {}),
        wn(l.writable, d),
        Object.defineProperty(l.writable, A, { value: a.name, writable: !1 }),
        Object.defineProperty(l.writable, j, { value: o, writable: !1 }),
        s && Object.defineProperty(l.writable, M, { value: s, writable: !1 }),
        l.writable
      );
    },
    AbortController: (e) => bo(e, t, n),
    AbortSignal: (e) => xo(e, t, n),
  };
}
async function Do(e, t) {
  return await Sr(e, t);
}
const Oo = async (e, t) => {
  let n = {},
    r = await br(await Cr(e, t), n);
  return (await Q(n, `deserialize`), { data: r });
};
function ko(e, t = globalThis, n = {}) {
  return Na(e.data, { global: t, extraRevivers: { ...Go(To(t)), ...n } });
}
function Ao(e, t = globalThis, n = {}) {
  let { data: r } = e;
  if (!(r instanceof Uint8Array)) return Xt(r, { ...To(t), ...n });
  let { format: i, payload: a } = W(r);
  if (i === V.DEVALUE_V1) return Yt(new TextDecoder().decode(a), { ...To(t), ...n });
  throw Error(`Unsupported serialization format: ${i}`);
}
async function jo(e, t, n, r = [], i = globalThis, a = !1, o = !1, s = !1) {
  if (a) return Kn(k(e, po(i, r, t, n, o)));
  try {
    let a = {},
      c = await ka(e, n, {
        global: i,
        extraReducers: Wo(po(i, r, t, n, o)),
        compression: s,
        compressionStats: a,
      });
    return (await Q(a, `serialize`), c);
  } catch (e) {
    let t = qa(e),
      { message: n, hint: r } = X(`workflow arguments`, t);
    throw new g(n, { hint: r, cause: t });
  }
}
async function Mo(e, t, n, r = globalThis, i = {}, a) {
  return ko(a ?? (await Oo(e, n)), r, i);
}
async function No(e, t, n, r = globalThis, i = !1, a = !1) {
  if (i) return Kn(k(e, mo(r)));
  try {
    let t = {},
      i = await ja(e, n, {
        global: r,
        extraReducers: Wo(mo(r)),
        compression: a,
        compressionStats: t,
      });
    return (await Q(t, `serialize`), i);
  } catch (e) {
    let t = qa(e),
      { message: n, hint: r } = X(`workflow return value`, t);
    throw new g(n, { hint: r, cause: t });
  }
}
async function Po(e, t, n, r = [], i = globalThis, a = {}) {
  let o = {},
    s = await Aa(e, n, {
      global: i,
      extraRevivers: { ...Go(wo(i, r, t, n)), ...a },
      compressionStats: o,
    });
  return (await Q(o, `deserialize`), s);
}
async function Fo(e, t, n, r = globalThis, i = !1, a = !1) {
  if (i) return Kn(k(e, mo(r)));
  try {
    let t = {},
      i = await ja(e, n, {
        global: r,
        extraReducers: Wo(mo(r)),
        compression: a,
        compressionStats: t,
      });
    return (await Q(t, `serialize`), i);
  } catch (e) {
    let t = qa(e),
      { message: n, hint: r } = X(`step arguments`, t);
    throw new g(n, { hint: r, cause: t });
  }
}
async function Io(e, t, n, r = [], i = globalThis, a = {}, o) {
  let s = {},
    c = await Ma(e, n, {
      global: i,
      extraRevivers: { ...Go(Eo(i, r, t, n, o)), ...a },
      compressionStats: s,
    });
  return (await Q(s, `deserialize`), c);
}
async function Lo(e, t, n, r = [], i = globalThis, a = !1, o = !1, s = !1, c) {
  if (a) return Kn(k(e, ho(i, r, t, n, o, c)));
  try {
    let a = {},
      l = await ja(e, n, {
        global: i,
        extraReducers: Wo(ho(i, r, t, n, o, c)),
        compression: s,
        compressionStats: a,
      });
    return (await Q(a, `serialize`), l);
  } catch (e) {
    let t = qa(e),
      { message: n, hint: r } = X(`step return value`, t);
    throw new g(n, { hint: r, cause: t });
  }
}
async function Ro(e, t, n, r = [], i = globalThis, a = !1) {
  try {
    let o = k(e, ho(i, r, t, n)),
      s = new TextEncoder().encode(o),
      c = U(V.DEVALUE_V1, s),
      l = {},
      u = await Do(await yr(c, a, l), n);
    return (await Q(l, `serialize`), u);
  } catch (e) {
    let t = qa(e),
      { message: n, hint: r } = X(`step error`, t);
    throw new g(n, { hint: r, cause: t });
  }
}
async function zo(e, t, n, r = globalThis, i = {}, a) {
  return Ao(a ?? (await Oo(e, n)), r, i);
}
async function Bo(e, t, n, r = globalThis, i = !1) {
  try {
    let t = k(e, mo(r)),
      a = new TextEncoder().encode(t),
      o = U(V.DEVALUE_V1, a),
      s = {},
      c = await Do(await yr(o, i, s), n);
    return (await Q(s, `serialize`), c);
  } catch (e) {
    let t = qa(e),
      { message: n, hint: r } = X(`run error`, t);
    throw new g(n, { hint: r, cause: t });
  }
}
async function Vo(e, t, n, r = [], i = globalThis, a = {}) {
  let o = {},
    s = await br(await Cr(e, n), o);
  if ((await Q(o, `deserialize`), !(s instanceof Uint8Array)))
    return Xt(s, { ...wo(i, r, t, n), ...a });
  let { format: c, payload: l } = W(s);
  if (c === V.DEVALUE_V1) return Yt(new TextDecoder().decode(l), { ...wo(i, r, t, n), ...a });
  throw Error(`Unsupported serialization format: ${c}`);
}
async function Ho(e, t, n, r = globalThis, i = {}, a) {
  return ko(a ?? (await Oo(e, n)), r, i);
}
const Uo = [
  `ReadableStream`,
  `WritableStream`,
  `Request`,
  `Response`,
  `StepFunction`,
  `AbortController`,
  `AbortSignal`,
];
function Wo(e) {
  let t = {};
  for (let n of Uo) n in e && (t[n] = e[n]);
  return t;
}
function Go(e) {
  let t = {};
  for (let n of Uo) n in e && (t[n] = e[n]);
  return t;
}
const Ko = [
    { format: V.ENCRYPTED, minVersion: `4.2.0-beta.64` },
    { format: V.GZIP, minVersion: `5.0.0-beta.18` },
    { format: V.ZSTD, minVersion: `5.0.0-beta.18` },
  ],
  qo = [{ capability: `framedByteStreams`, minVersion: `5.0.0-beta.15` }],
  Jo = new Set([V.DEVALUE_V1]);
function Yo(e) {
  if (!e || !$t.default.valid(e)) return { supportedFormats: Jo, framedByteStreams: !1 };
  let t = new Set(Jo);
  for (let { format: n, minVersion: r } of Ko) $t.default.gte(e, r) && t.add(n);
  let n = { supportedFormats: t, framedByteStreams: !1 };
  for (let { capability: t, minVersion: r } of qo) $t.default.gte(e, r) && (n[t] = !0);
  return n;
}
const Xo = `5.0.0-beta.36`,
  Zo = /^[a-zA-Z0-9_\-./@]+$/;
function Qo(e, t) {
  if (!Zo.test(e))
    throw Error(
      `Invalid workflow name "${e}": must only contain alphanumeric characters, underscores, hyphens, dots, forward slashes, or at signs`,
    );
  return `${te(`workflow`, ae(t))}${e}`;
}
const $o = ie();
function es(e) {
  return `__health_check__${e}`;
}
function ts(e) {
  let t = ne.safeParse(e);
  if (t.success) return t.data;
}
function ns(e) {
  return `wrun_hc_${e}`;
}
async function rs(e, t, n) {
  let r = await L(),
    i = es(e.correlationId),
    a = JSON.stringify({
      healthy: !0,
      endpoint: t,
      correlationId: e.correlationId,
      specVersion: n ?? 5,
      workflowCoreVersion: Xo,
      timestamp: Date.now(),
    }),
    o = ns(e.correlationId);
  (await r.streams.write(o, i, a), await r.streams.close(o, i));
}
function is(e, t) {
  let n;
  return Promise.race([
    e,
    new Promise((e, r) => {
      n = setTimeout(() => r(Error(`Operation timed out after ${t}ms`)), t);
    }),
  ]).finally(() => clearTimeout(n));
}
async function as(e, t) {
  let n = [],
    r = !1,
    i = !1;
  for (; !r && !i;) {
    let a = e.read(),
      o = new Promise((e) =>
        setTimeout(() => {
          ((i = !0), e({ done: !0, value: void 0 }));
        }, t),
      ),
      s = await Promise.race([a, o]);
    ((r = s.done), s.value && n.push(s.value));
  }
  return { chunks: n, timedOut: i };
}
function os(e) {
  if (e.length === 0) return null;
  let t = e.reduce((e, t) => e + t.length, 0),
    n = new Uint8Array(t),
    r = 0;
  for (let t of e) (n.set(t, r), (r += t.length));
  let i = new TextDecoder().decode(n),
    a;
  try {
    a = JSON.parse(i);
  } catch {
    return i.length > 0 ? { healthy: !0 } : null;
  }
  if (typeof a != `object` || !a || !(`healthy` in a) || typeof a.healthy != `boolean`) return null;
  let o = a,
    s = { healthy: o.healthy };
  return (
    typeof o.specVersion == `number` && (s.specVersion = o.specVersion),
    typeof o.workflowCoreVersion == `string` && (s.workflowCoreVersion = o.workflowCoreVersion),
    s
  );
}
async function ss(e, t, n) {
  let r = n?.timeout ?? 3e4,
    i = e.createRunId?.() ?? $o(),
    a = es(i),
    o = `${te(t, ae(n?.namespace))}health_check`,
    s = Date.now();
  try {
    for (
      await e.queue(
        o,
        { __healthCheck: !0, correlationId: i },
        { specVersion: 1, deploymentId: n?.deploymentId },
      );
      Date.now() - s < r;
    )
      try {
        let t = r - (Date.now() - s),
          n = (await is(e.streams.get(ns(i), a), t)).getReader(),
          { chunks: o, timedOut: c } = await as(n, 500);
        if (c) {
          try {
            n.cancel();
          } catch {}
          await new Promise((e) => setTimeout(e, 100));
          continue;
        }
        let l = os(o);
        if (l) return { ...l, latencyMs: Date.now() - s };
        await new Promise((e) => setTimeout(e, 100));
      } catch {
        await new Promise((e) => setTimeout(e, 100));
      }
    return { healthy: !1, error: `Health check timed out after ${r}ms` };
  } catch (e) {
    return { healthy: !1, error: e instanceof Error ? e.message : String(e) };
  }
}
function cs(e, t) {
  return new l(`Event pagination ${t} for workflow run "${e}".`, { code: d.WORLD_CONTRACT_ERROR });
}
function ls(e, t, n) {
  if (t) {
    if (n.has(t)) throw cs(e, `did not advance`);
    n.add(t);
  }
}
function us(e, t, n) {
  for (let r of n) t.has(r.eventId) || (t.add(r.eventId), e.push(r));
}
function ds(e, t, n, r) {
  if (t) {
    if (n === null) throw cs(e, `returned more pages without a cursor`);
    if (r.has(n)) throw cs(e, `repeated a cursor`);
  }
}
function fs(e, t, n) {
  return t !== null && !n && l.is(e) && e.status === 400;
}
async function ps(e, t) {
  let n = t !== void 0;
  return pa(n ? `workflow.loadNewEvents` : `workflow.loadEvents`, async (r) => {
    r?.setAttributes({ ...Fr(e) });
    let i = [],
      a = new Set(),
      o = new Set(),
      s = t ?? null,
      c = !0,
      l = 0,
      u = !1,
      d = await L(),
      f = Date.now();
    for (; c;) {
      let t = Date.now(),
        r = s;
      ls(e, r, o);
      let f;
      try {
        f = await d.events.list({
          runId: e,
          pagination: { sortOrder: `asc`, cursor: r ?? void 0 },
        });
      } catch (t) {
        if (fs(t, r, u)) {
          (Y.warn(`Event cursor was rejected; retrying with a full event reload.`, {
            workflowRunId: e,
          }),
            (i.length = 0),
            a.clear(),
            o.clear(),
            (s = null),
            (u = !0));
          continue;
        }
        throw t;
      }
      (us(i, a, f.data),
        (c = f.hasMore),
        ds(e, c, f.cursor, o),
        (s = f.cursor ?? s),
        l++,
        Y.debug(`Loaded event page`, {
          workflowRunId: e,
          incremental: n,
          page: l,
          pageEvents: f.data.length,
          totalEvents: i.length,
          hasMore: c,
          pageMs: Date.now() - t,
        }));
    }
    return (
      Y.debug(`Event load complete`, {
        workflowRunId: e,
        incremental: n,
        totalEvents: i.length,
        pagesLoaded: l,
        totalMs: Date.now() - f,
      }),
      r?.setAttributes({ ...Rr(i.length), ...Bi(l) }),
      { events: i, cursor: s }
    );
  });
}
function ms() {
  return process.env.WORKFLOW_PRECONDITION_GUARD !== `0`;
}
function hs(e) {
  let t = e[e.length - 1];
  if (!t) return;
  let n = t.eventId,
    r = n.lastIndexOf(`_`),
    i = re(r === -1 ? n : n.slice(r + 1))?.getTime();
  if (i === void 0) {
    Y.debug(`Precondition guard: latest event id is not a decodable ULID; sending no snapshot`, {
      eventId: n,
    });
    return;
  }
  return i;
}
function gs(e) {
  return ms() ? hs(e) : void 0;
}
async function _s(e, t, n) {
  for (let r = 0; ; r++)
    try {
      return await n(gs(t.events));
    } catch (n) {
      if (!p.is(n) || r >= 2) throw n;
      Y.info(`Event creation rejected as stale; reloading event log and retrying`, {
        workflowRunId: e,
        attempt: r + 1,
        maxRetries: 2,
      });
      let i = await ps(e, t.cursor ?? void 0);
      (us(t.events, new Set(t.events.map((e) => e.eventId)), i.events),
        (t.cursor = i.cursor ?? t.cursor));
    }
}
const vs = {
  "Access-Control-Allow-Origin": `*`,
  "Access-Control-Allow-Methods": `POST, OPTIONS, GET, HEAD`,
  "Access-Control-Allow-Headers": `Content-Type`,
};
function ys(e, t) {
  return async (n) => {
    let r = new URL(n.url);
    return r.searchParams.has(`__health`)
      ? n.method === `OPTIONS`
        ? new Response(null, { status: 204, headers: vs })
        : new Response(
            JSON.stringify({
              healthy: !0,
              endpoint: r.pathname,
              specVersion: t ?? 5,
              workflowCoreVersion: Xo,
            }),
            { status: 200, headers: { "Content-Type": `application/json`, ...vs } },
          )
      : await e(n);
  };
}
async function bs(e, ...t) {
  let n = t[0];
  await pa(
    `queue.publish`,
    {
      attributes: {
        ...Ci(`vercel-queue`),
        ...wi(n),
        ...Ei(`publish`),
        ...Xi(`vercel-queue`),
        ...Zi(`vercel-queue`),
        ...Qi(`vqs`),
        ...$i(`publish`),
      },
      kind: await va(`PRODUCER`),
    },
    async (n) => {
      let { messageId: r } = await e.queue(...t);
      r && n?.setAttributes(Ti(r));
    },
  );
}
function xs(e) {
  if (e.requestedAt)
    try {
      return Di(Date.now() - e.requestedAt.getTime());
    } catch {
      return;
    }
}
function Ss(e, t) {
  let n;
  return () => (
    (n ||= (async () => {
      let n = await e.getEncryptionKeyForRun?.(t);
      return n ? await en(n) : void 0;
    })()),
    n
  );
}
function Cs(t) {
  import(`./functions-Dv8dc_-I.js`)
    .then((t) => e(t.default, 1))
    .then(({ waitUntil: e }) => {
      e(t);
    });
}
function ws(e, t) {
  Cs(
    e.catch((e) => {
      if (!(e?.name === `AbortError` || e?.name === `ResponseAborted`))
        try {
          t(e);
        } catch {}
    }),
  );
}
async function Ts(e) {
  let t = e();
  return (Cs(t.catch(() => {})), t);
}
function Es(e, t = {}) {
  if (typeof e != `object` || !e || Array.isArray(e))
    throw new m(
      `setAttributes requires a plain object, got ${e === null ? `null` : Array.isArray(e) ? `array` : typeof e}`,
    );
  let n = Object.entries(e).map(([e, t]) => ({ key: e, value: t === void 0 ? null : t }));
  if (n.length === 0) return n;
  let r = t.allowReservedAttributes === !0;
  try {
    ee(n, { allowReservedAttributes: r });
  } catch (e) {
    throw e instanceof y ? new m(e.message) : e;
  }
  return n;
}
export {
  sa as $,
  ei as $t,
  Io as A,
  cn as An,
  gi as At,
  Ia as B,
  Ae as Bn,
  zr as Bt,
  Lo as C,
  pn as Cn,
  _i as Ct,
  wo as D,
  j as Dn,
  fi as Dt,
  po as E,
  M as En,
  ii as Et,
  Oo as F,
  Me as Fn,
  mi as Ft,
  Ta as G,
  Rr as Gt,
  La as H,
  Oe as Hn,
  Kr as Ht,
  Wa as I,
  Pe as In,
  pi as It,
  aa as J,
  Pr as Jt,
  Ea as K,
  Jr as Kt,
  Ua as L,
  Ne as Ln,
  oi as Lt,
  Ho as M,
  sn as Mn,
  xi as Mt,
  Mo as N,
  rn as Nn,
  Si as Nt,
  Ja as O,
  mn as On,
  si as Ot,
  Po as P,
  en as Pn,
  ui as Pt,
  xa as Q,
  $r as Qt,
  Z as R,
  Fe as Rn,
  li as Rt,
  Ro as S,
  wn as Sn,
  vi as St,
  No as T,
  A as Tn,
  di as Tt,
  Fa as U,
  De as Un,
  Gr as Ut,
  za as V,
  je as Vn,
  Zr as Vt,
  Y as W,
  ke as Wn,
  Wr as Wt,
  ra as X,
  Br as Xt,
  va as Y,
  Xr as Yt,
  ia as Z,
  ti as Zt,
  Yo as _,
  Ln as _n,
  Vi as _t,
  Qo as a,
  qr as an,
  ea as at,
  Bo as b,
  F as bn,
  hi as bt,
  ms as c,
  Ur as cn,
  Ai as ct,
  ts as d,
  jr as dn,
  Ri as dt,
  ni as en,
  pa as et,
  bs as f,
  V as fn,
  Li as ft,
  Xo as g,
  Rn as gn,
  Ci as gt,
  _s as h,
  Hn as hn,
  Ei as ht,
  xs as i,
  Lr as in,
  ta as it,
  zo as j,
  an as jn,
  bi as jt,
  Vo as k,
  on as kn,
  ri as kt,
  ps as l,
  Yr as ln,
  ki as lt,
  ys as m,
  Vn as mn,
  Ti as mt,
  ws as n,
  Fr as nn,
  Sa as nt,
  rs as o,
  Hr as on,
  zi as ot,
  gs as p,
  Bn as pn,
  wi as pt,
  oa as q,
  Nr as qt,
  Ts as r,
  Ir as rn,
  Oi as rt,
  ss as s,
  Vr as sn,
  ji as st,
  Es as t,
  Qr as tn,
  la as tt,
  Ss as u,
  Mr as un,
  Ii as ut,
  $ as v,
  L as vn,
  Hi as vt,
  jo as w,
  ln as wn,
  yi as wt,
  Fo as x,
  I as xn,
  ai as xt,
  go as y,
  Nn as yn,
  Ui as yt,
  Va as z,
  Ie as zn,
  ci as zt,
};
