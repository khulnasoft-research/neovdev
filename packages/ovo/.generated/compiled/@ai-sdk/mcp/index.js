import { AISDKError as e, isJSONObject as t } from "../provider/index.js";
import {
  A as n,
  C as r,
  Ct as i,
  Et as a,
  G as o,
  K as s,
  L as c,
  W as l,
  X as u,
  _t as d,
  a as f,
  at as p,
  b as m,
  bt as h,
  dt as g,
  et as _,
  ft as v,
  gt as y,
  ht as b,
  l as ee,
  lt as te,
  n as ne,
  ut as x,
  vt as S,
  wt as C,
  xt as w,
  yt as T,
} from "../../_chunks/workflow/dist-C_VDTghO.js";
const re = {
  invalid_type: `invalid_type`,
  too_big: `too_big`,
  too_small: `too_small`,
  invalid_format: `invalid_format`,
  not_multiple_of: `not_multiple_of`,
  unrecognized_keys: `unrecognized_keys`,
  invalid_union: `invalid_union`,
  invalid_key: `invalid_key`,
  invalid_element: `invalid_element`,
  invalid_value: `invalid_value`,
  custom: `custom`,
};
var ie;
ie ||= {};
let E;
E =
  globalThis.crypto?.webcrypto ??
  globalThis.crypto ??
  import(`node:crypto`).then((e) => e.webcrypto);
async function ae(e) {
  return (await E).getRandomValues(new Uint8Array(e));
}
async function oe(e) {
  let t = ``;
  for (; t.length < e;) {
    let n = await ae(e - t.length);
    for (let e of n)
      e < 198 &&
        (t += `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~`[e % 66]);
  }
  return t;
}
async function se(e) {
  return await oe(e);
}
async function ce(e) {
  let t = await (await E).subtle.digest(`SHA-256`, new TextEncoder().encode(e));
  return btoa(String.fromCharCode(...new Uint8Array(t)))
    .replace(/\//g, `_`)
    .replace(/\+/g, `-`)
    .replace(/=/g, ``);
}
async function le(e) {
  if (((e ||= 43), e < 43 || e > 128)) throw `Expected a length between 43 and 128. Received ${e}.`;
  let t = await se(e);
  return { code_verifier: t, code_challenge: await ce(t) };
}
var D = `2025-11-25`,
  ue = [D, `2025-06-18`, `2025-03-26`, `2024-11-05`],
  de = T(h(w(), C())),
  fe = y({ name: w(), version: w(), title: T(w()) }),
  O = y({ _meta: T(S({}).loose()) }),
  k = O,
  pe = S({ method: w(), params: T(O) }),
  me = S({ applyDefaults: T(v()) }).loose(),
  he = y({
    experimental: T(S({}).loose()),
    logging: T(S({}).loose()),
    completions: T(S({}).loose()),
    prompts: T(y({ listChanged: T(v()) })),
    resources: T(y({ subscribe: T(v()), listChanged: T(v()) })),
    tools: T(y({ listChanged: T(v()) })),
    elicitation: T(me),
  });
S({ elicitation: T(me) }).loose();
var ge = k.extend({ protocolVersion: w(), capabilities: he, serverInfo: fe, instructions: T(w()) }),
  A = k.extend({ nextCursor: T(w()) }),
  _e = S({
    name: w(),
    title: T(w()),
    description: T(w()),
    inputSchema: S({ type: b(`object`), properties: T(S({}).loose()) }).loose(),
    outputSchema: T(S({}).loose()),
    annotations: T(S({ title: T(w()) }).loose()),
    _meta: de,
  }).loose(),
  ve = A.extend({ tools: x(_e) }),
  ye = S({ type: b(`text`), text: w() }).loose(),
  be = S({ type: b(`image`), data: g(), mimeType: w() }).loose(),
  xe = S({
    uri: w(),
    name: w(),
    title: T(w()),
    description: T(w()),
    mimeType: T(w()),
    size: T(d()),
  }).loose(),
  Se = A.extend({ resources: x(xe) }),
  Ce = S({ uri: w(), name: T(w()), title: T(w()), mimeType: T(w()) }).loose(),
  we = Ce.extend({ text: w() }),
  Te = Ce.extend({ blob: g() }),
  Ee = S({ type: b(`resource`), resource: i([we, Te]) }).loose(),
  De = S({
    type: b(`resource_link`),
    uri: w(),
    name: w(),
    description: T(w()),
    mimeType: T(w()),
  }).loose(),
  Oe = k
    .extend({
      content: x(i([ye, be, Ee, De])),
      structuredContent: T(C()),
      isError: v().default(!1).optional(),
    })
    .or(k.extend({ toolResult: C() })),
  ke = S({
    uriTemplate: w(),
    name: w(),
    title: T(w()),
    description: T(w()),
    mimeType: T(w()),
  }).loose(),
  Ae = k.extend({ resourceTemplates: x(ke) }),
  je = k.extend({ contents: x(i([we, Te])) }),
  Me = S({ type: b(`ref/prompt`), name: w() }).loose(),
  Ne = S({ type: b(`ref/resource`), uri: w() }).loose(),
  Pe = S({ name: w(), value: w() }).loose();
O.extend({ ref: i([Me, Ne]), argument: Pe, context: T(S({ arguments: h(w(), w()) }).loose()) });
var Fe = k.extend({
    completion: S({ values: x(w()).max(100), total: T(d().int()), hasMore: T(v()) }).loose(),
  }),
  Ie = S({ name: w(), description: T(w()), required: T(v()) }).loose(),
  Le = S({ name: w(), title: T(w()), description: T(w()), arguments: T(x(Ie)) }).loose(),
  Re = A.extend({ prompts: x(Le) }),
  ze = S({ role: i([b(`user`), b(`assistant`)]), content: i([ye, be, Ee, De]) }).loose(),
  Be = k.extend({ description: T(w()), messages: x(ze) }),
  Ve = O.extend({ message: w(), requestedSchema: C() }),
  j = pe.extend({ method: b(`elicitation/create`), params: Ve }),
  He = k.extend({ action: i([b(`accept`), b(`decline`), b(`cancel`)]), content: T(h(w(), C())) }),
  M = `2.0`,
  Ue = S({ jsonrpc: b(M), id: i([w(), d().int()]) })
    .merge(pe)
    .strict(),
  We = S({ jsonrpc: b(M), id: i([w(), d().int()]), result: k }).strict(),
  Ge = S({
    jsonrpc: b(M),
    id: i([w(), d().int()]),
    error: S({ code: d().int(), message: w(), data: T(C()) }),
  }).strict(),
  Ke = i([
    Ue,
    S({ jsonrpc: b(M) })
      .merge(S({ method: w(), params: T(O) }))
      .strict(),
    We,
    Ge,
  ]);
function N(e) {
  return Ke.parse(e);
}
async function P(e) {
  return N(await c({ text: e }));
}
var qe = `vercel.ai.error.AI_MCPClientError`,
  Je = Symbol.for(qe),
  Ye,
  Xe,
  F = class extends ((Xe = e), (Ye = Je), Xe) {
    constructor({
      name: e = `MCPClientError`,
      message: t,
      cause: n,
      data: r,
      code: i,
      statusCode: a,
      url: o,
      responseBody: s,
    }) {
      (super({ name: e, message: t, cause: n }),
        (this[Ye] = !0),
        (this.data = r),
        (this.code = i),
        (this.statusCode = a),
        (this.url = o),
        (this.responseBody = s));
    }
    static isInstance(t) {
      return e.hasMarker(t, qe);
    }
  },
  Ze = typeof __PACKAGE_VERSION__ < `u` ? __PACKAGE_VERSION__ : `0.0.0-test`,
  I = w()
    .url()
    .superRefine((e, t) => {
      if (!URL.canParse(e))
        return (t.addIssue({ code: re.custom, message: `URL must be parseable`, fatal: !0 }), a);
    })
    .refine(
      (e) => {
        let t = new URL(e);
        return t.protocol !== `javascript:` && t.protocol !== `data:` && t.protocol !== `vbscript:`;
      },
      { message: `URL cannot use javascript:, data:, or vbscript: scheme` },
    ),
  Qe = S({
    access_token: w(),
    id_token: w().optional(),
    token_type: w(),
    expires_in: d().optional(),
    scope: w().optional(),
    refresh_token: w().optional(),
    authorization_server: I.optional(),
    token_endpoint: I.optional(),
  }).strip(),
  $e = y({
    resource: w().url(),
    authorization_servers: x(I).optional(),
    jwks_uri: w().url().optional(),
    scopes_supported: x(w()).optional(),
    bearer_methods_supported: x(w()).optional(),
    resource_signing_alg_values_supported: x(w()).optional(),
    resource_name: w().optional(),
    resource_documentation: w().optional(),
    resource_policy_uri: w().url().optional(),
    resource_tos_uri: w().url().optional(),
    tls_client_certificate_bound_access_tokens: v().optional(),
    authorization_details_types_supported: x(w()).optional(),
    dpop_signing_alg_values_supported: x(w()).optional(),
    dpop_bound_access_tokens_required: v().optional(),
  }),
  et = y({
    issuer: w(),
    authorization_endpoint: I,
    token_endpoint: I,
    registration_endpoint: I.optional(),
    scopes_supported: x(w()).optional(),
    response_types_supported: x(w()),
    grant_types_supported: x(w()).optional(),
    code_challenge_methods_supported: x(w()).optional(),
    token_endpoint_auth_methods_supported: x(w()).optional(),
    token_endpoint_auth_signing_alg_values_supported: x(w()).optional(),
  }),
  tt = y({
    issuer: w(),
    authorization_endpoint: I,
    token_endpoint: I,
    userinfo_endpoint: I.optional(),
    jwks_uri: I,
    registration_endpoint: I.optional(),
    scopes_supported: x(w()).optional(),
    response_types_supported: x(w()),
    grant_types_supported: x(w()).optional(),
    subject_types_supported: x(w()),
    id_token_signing_alg_values_supported: x(w()),
    claims_supported: x(w()).optional(),
    token_endpoint_auth_methods_supported: x(w()).optional(),
  }).merge(et.pick({ code_challenge_methods_supported: !0 })),
  nt = S({
    client_id: w(),
    client_secret: w().optional(),
    client_id_issued_at: d().optional(),
    client_secret_expires_at: d().optional(),
    authorization_server: I.optional(),
    token_endpoint: I.optional(),
  }).strip(),
  rt = S({
    redirect_uris: x(I),
    token_endpoint_auth_method: w().optional(),
    grant_types: x(w()).optional(),
    response_types: x(w()).optional(),
    client_name: w().optional(),
    client_uri: I.optional(),
    logo_uri: I.optional(),
    scope: w().optional(),
    contacts: x(w()).optional(),
    tos_uri: I.optional(),
    policy_uri: w().optional(),
    jwks_uri: I.optional(),
    jwks: te().optional(),
    software_id: w().optional(),
    software_version: w().optional(),
    software_statement: w().optional(),
  }).strip(),
  it = S({ error: w(), error_description: w().optional(), error_uri: w().optional() }),
  at = rt.merge(nt),
  ot = `vercel.ai.error.AI_MCPClientOAuthError`,
  st = Symbol.for(ot),
  ct,
  lt,
  L = class extends ((lt = e), (ct = st), lt) {
    constructor({ name: e = `MCPClientOAuthError`, message: t, cause: n }) {
      (super({ name: e, message: t, cause: n }), (this[ct] = !0));
    }
    static isInstance(t) {
      return e.hasMarker(t, ot);
    }
  },
  R = class extends L {};
R.errorCode = `server_error`;
var z = class extends L {};
z.errorCode = `invalid_client`;
var B = class extends L {};
B.errorCode = `invalid_grant`;
var V = class extends L {};
V.errorCode = `unauthorized_client`;
var ut = { [R.errorCode]: R, [z.errorCode]: z, [B.errorCode]: B, [V.errorCode]: V };
function dt(e) {
  let t = typeof e == `string` ? new URL(e) : new URL(e.href);
  return ((t.hash = ``), t);
}
function H(e) {
  let t = e.href;
  return e.pathname === `/` && t.endsWith(`/`) ? t.slice(0, -1) : t;
}
function ft({ requestedResource: e, configuredResource: t }) {
  let n = typeof e == `string` ? new URL(e) : new URL(e.href),
    r = typeof t == `string` ? new URL(t) : new URL(t.href);
  if (n.origin !== r.origin || n.pathname.length < r.pathname.length) return !1;
  let i = n.pathname.endsWith(`/`) ? n.pathname : n.pathname + `/`,
    a = r.pathname.endsWith(`/`) ? r.pathname : r.pathname + `/`;
  return i.startsWith(a);
}
var U = class extends Error {
  constructor(e = `Unauthorized`) {
    (super(e), (this.name = `UnauthorizedError`));
  }
};
function W(e) {
  return new URL(e).href;
}
function pt(e, t) {
  return {
    authorizationServerUrl: W(e),
    tokenEndpoint: W(t?.token_endpoint ? new URL(t.token_endpoint) : new URL(`/token`, e)),
  };
}
function mt(e, t) {
  return { ...e, authorization_server: t.authorizationServerUrl, token_endpoint: t.tokenEndpoint };
}
function ht(e, t) {
  return { ...e, authorization_server: t.authorizationServerUrl, token_endpoint: t.tokenEndpoint };
}
function G(e) {
  if (!(!e?.authorization_server || !e.token_endpoint))
    return {
      authorizationServerUrl: W(e.authorization_server),
      tokenEndpoint: W(e.token_endpoint),
    };
}
async function gt({ provider: e, clientInformation: t, tokens: n }) {
  let r = G(n);
  if (r) return r;
  let i = await e.authorizationServerInformation?.call(e);
  return i
    ? { authorizationServerUrl: W(i.authorizationServerUrl), tokenEndpoint: W(i.tokenEndpoint) }
    : G(t);
}
async function _t({ provider: e, clientInformation: t, authorizationServerInformation: n }) {
  return e.saveAuthorizationServerInformation
    ? (await e.saveAuthorizationServerInformation(n), !0)
    : e.saveClientInformation
      ? (await e.saveClientInformation(ht(t, n)), !0)
      : !1;
}
function vt(e, t) {
  if (!t) return;
  let n = new URL(e).origin;
  if (t.origin !== n)
    throw new L({
      message: `OAuth protected resource metadata URL ${t.href} must have the same origin as the MCP server URL ${n}`,
    });
}
function yt({ storedAuthorizationServerInformation: e, currentAuthorizationServerInformation: t }) {
  if (e.authorizationServerUrl !== t.authorizationServerUrl || e.tokenEndpoint !== t.tokenEndpoint)
    throw new L({
      message: `OAuth authorization server metadata does not match the metadata that issued the stored credentials`,
    });
}
function K(e) {
  let t = e.headers.get(`www-authenticate`) ?? e.headers.get(`WWW-Authenticate`);
  if (!t) return;
  let [n, r] = t.split(` `);
  if (n.toLowerCase() !== `bearer` || !r) return;
  let i = t.match(/resource_metadata="([^"]*)"/);
  if (i)
    try {
      return new URL(i[1]);
    } catch {
      return;
    }
}
function bt(e, t = ``, n = {}) {
  return (
    t.endsWith(`/`) && (t = t.slice(0, -1)),
    n.prependPathname ? `${t}/.well-known/${e}` : `/.well-known/${e}${t}`
  );
}
async function q(e, t, n = fetch) {
  try {
    return await n(e, { headers: t });
  } catch (r) {
    if (r instanceof TypeError) return t ? q(e, void 0, n) : void 0;
    throw r;
  }
}
async function xt(e, t, n = fetch) {
  return await q(e, { "MCP-Protocol-Version": t }, n);
}
function St(e, t) {
  return !e || (e.status >= 400 && e.status < 500 && t !== `/`);
}
async function Ct(e, t, n, r) {
  let i = new URL(e),
    a = r?.protocolVersion ?? D,
    o;
  if (r?.metadataUrl) o = new URL(r.metadataUrl);
  else {
    let e = bt(t, i.pathname);
    ((o = new URL(e, r?.metadataServerUrl ?? i)), (o.search = i.search));
  }
  let s = await xt(o, a, n);
  return (
    !r?.metadataUrl && St(s, i.pathname) && (s = await xt(new URL(`/.well-known/${t}`, i), a, n)), s
  );
}
async function wt(e, t, n = fetch) {
  let r = await Ct(e, `oauth-protected-resource`, n, {
    protocolVersion: t?.protocolVersion,
    metadataUrl: t?.resourceMetadataUrl,
  });
  if (!r || r.status === 404)
    throw Error(`Resource server does not implement OAuth 2.0 Protected Resource Metadata.`);
  if (!r.ok)
    throw Error(`HTTP ${r.status} trying to load well-known OAuth protected resource metadata.`);
  return $e.parse(await r.json());
}
function Tt(e) {
  let t = typeof e == `string` ? new URL(e) : e,
    n = t.pathname !== `/`,
    r = t.origin,
    i = [];
  if (!n)
    return (
      i.push({
        url: new URL(`/.well-known/oauth-authorization-server`, t.origin),
        type: `oauth`,
        expectedIssuer: r,
      }),
      i.push({
        url: new URL(`/.well-known/openid-configuration`, t.origin),
        type: `oidc`,
        expectedIssuer: r,
      }),
      i
    );
  let a = t.pathname;
  a.endsWith(`/`) && (a = a.slice(0, -1));
  let o = `${t.origin}${a}`;
  return (
    i.push({
      url: new URL(`/.well-known/oauth-authorization-server${a}`, t.origin),
      type: `oauth`,
      expectedIssuer: o,
    }),
    i.push({
      url: new URL(`/.well-known/oauth-authorization-server`, t.origin),
      type: `oauth`,
      expectedIssuer: r,
    }),
    i.push({
      url: new URL(`/.well-known/openid-configuration${a}`, t.origin),
      type: `oidc`,
      expectedIssuer: o,
    }),
    i.push({
      url: new URL(`${a}/.well-known/openid-configuration`, t.origin),
      type: `oidc`,
      expectedIssuer: o,
    }),
    i
  );
}
function Et(e, t) {
  if (e.issuer !== t)
    throw new L({
      message: `OAuth authorization server metadata issuer ${e.issuer} does not match expected issuer ${t}`,
    });
}
async function Dt(e, { fetchFn: t = fetch, protocolVersion: n = D } = {}) {
  let r = { "MCP-Protocol-Version": n },
    i = Tt(e);
  for (let { url: e, type: n, expectedIssuer: a } of i) {
    let i = await q(e, r, t);
    if (i) {
      if (!i.ok) {
        if (i.status >= 400 && i.status < 500) continue;
        throw Error(
          `HTTP ${i.status} trying to load ${n === `oauth` ? `OAuth` : `OpenID provider`} metadata from ${e}`,
        );
      }
      if (n === `oauth`) {
        let e = et.parse(await i.json());
        return (Et(e, a), e);
      } else {
        let t = tt.parse(await i.json());
        if ((Et(t, a), !t.code_challenge_methods_supported?.includes(`S256`)))
          throw Error(
            `Incompatible OIDC provider at ${e}: does not support S256 code challenge method required by MCP specification`,
          );
        return t;
      }
    }
  }
}
async function Ot(
  e,
  { metadata: t, clientInformation: n, redirectUrl: r, scope: i, state: a, resource: o },
) {
  let s = `code`,
    c = `S256`,
    l;
  if (t) {
    if (((l = new URL(t.authorization_endpoint)), !t.response_types_supported.includes(s)))
      throw Error(`Incompatible auth server: does not support response type ${s}`);
    if (!t.code_challenge_methods_supported || !t.code_challenge_methods_supported.includes(c))
      throw Error(`Incompatible auth server: does not support code challenge method ${c}`);
  } else l = new URL(`/authorize`, e);
  let u = await le(),
    d = u.code_verifier,
    f = u.code_challenge;
  return (
    l.searchParams.set(`response_type`, s),
    l.searchParams.set(`client_id`, n.client_id),
    l.searchParams.set(`code_challenge`, f),
    l.searchParams.set(`code_challenge_method`, c),
    l.searchParams.set(`redirect_uri`, String(r)),
    a && l.searchParams.set(`state`, a),
    i && l.searchParams.set(`scope`, i),
    i?.includes(`offline_access`) && l.searchParams.append(`prompt`, `consent`),
    o && l.searchParams.set(`resource`, H(o)),
    { authorizationUrl: l, codeVerifier: d }
  );
}
function kt(e, t) {
  let n = e.client_secret !== void 0;
  return t.length === 0
    ? n
      ? `client_secret_post`
      : `none`
    : n && t.includes(`client_secret_basic`)
      ? `client_secret_basic`
      : n && t.includes(`client_secret_post`)
        ? `client_secret_post`
        : t.includes(`none`)
          ? `none`
          : n
            ? `client_secret_post`
            : `none`;
}
function At(e, t, n, r) {
  let { client_id: i, client_secret: a } = t;
  switch (e) {
    case `client_secret_basic`:
      jt(i, a, n);
      return;
    case `client_secret_post`:
      Mt(i, a, r);
      return;
    case `none`:
      Nt(i, r);
      return;
    default:
      throw Error(`Unsupported client authentication method: ${e}`);
  }
}
function jt(e, t, n) {
  if (!t) throw Error(`client_secret_basic authentication requires a client_secret`);
  let r = btoa(`${e}:${t}`);
  n.set(`Authorization`, `Basic ${r}`);
}
function Mt(e, t, n) {
  (n.set(`client_id`, e), t && n.set(`client_secret`, t));
}
function Nt(e, t) {
  t.set(`client_id`, e);
}
async function J(e) {
  let t = e instanceof Response ? e.status : void 0,
    n = e instanceof Response ? await e.text() : e;
  try {
    let { error: e, error_description: t, error_uri: r } = it.parse(await c({ text: n }));
    return new (ut[e] || R)({ message: t || ``, cause: r });
  } catch (e) {
    return new R({
      message: `${t ? `HTTP ${t}: ` : ``}Invalid OAuth error response: ${e}. Raw body: ${n}`,
    });
  }
}
async function Pt(
  e,
  {
    metadata: t,
    clientInformation: n,
    authorizationCode: r,
    codeVerifier: i,
    redirectUri: a,
    resource: o,
    addClientAuthentication: s,
    fetchFn: c,
  },
) {
  let l = `authorization_code`,
    u = t?.token_endpoint ? new URL(t.token_endpoint) : new URL(`/token`, e);
  if (t?.grant_types_supported && !t.grant_types_supported.includes(l))
    throw Error(`Incompatible auth server: does not support grant type ${l}`);
  let d = new Headers({
      "Content-Type": `application/x-www-form-urlencoded`,
      Accept: `application/json`,
    }),
    f = new URLSearchParams({ grant_type: l, code: r, code_verifier: i, redirect_uri: String(a) });
  (s ? await s(d, f, e, t) : At(kt(n, t?.token_endpoint_auth_methods_supported ?? []), n, d, f),
    o && f.set(`resource`, H(o)));
  let p = await (c ?? fetch)(u, { method: `POST`, headers: d, body: f });
  if (!p.ok) throw await J(p);
  return Qe.parse(await p.json());
}
async function Ft(
  e,
  {
    metadata: t,
    clientInformation: n,
    refreshToken: r,
    resource: i,
    addClientAuthentication: a,
    fetchFn: o,
  },
) {
  let s = `refresh_token`,
    c;
  if (t) {
    if (
      ((c = new URL(t.token_endpoint)),
      t.grant_types_supported && !t.grant_types_supported.includes(s))
    )
      throw Error(`Incompatible auth server: does not support grant type ${s}`);
  } else c = new URL(`/token`, e);
  let l = new Headers({
      "Content-Type": `application/x-www-form-urlencoded`,
      Accept: `application/json`,
    }),
    u = new URLSearchParams({ grant_type: s, refresh_token: r });
  (a ? await a(l, u, e, t) : At(kt(n, t?.token_endpoint_auth_methods_supported ?? []), n, l, u),
    i && u.set(`resource`, H(i)));
  let d = await (o ?? fetch)(c, { method: `POST`, headers: l, body: u });
  if (!d.ok) throw await J(d);
  return Qe.parse({ refresh_token: r, ...(await d.json()) });
}
async function It(e, { metadata: t, clientMetadata: n, fetchFn: r }) {
  let i;
  if (t) {
    if (!t.registration_endpoint)
      throw Error(`Incompatible auth server: does not support dynamic client registration`);
    i = new URL(t.registration_endpoint);
  } else i = new URL(`/register`, e);
  let a = await (r ?? fetch)(i, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(n),
  });
  if (!a.ok) throw await J(a);
  return at.parse(await a.json());
}
async function Y(e, t) {
  try {
    return await X(e, t);
  } catch (n) {
    if (n instanceof z || n instanceof V)
      return (await e.invalidateCredentials?.call(e, `all`), await X(e, t));
    if (n instanceof B) return (await e.invalidateCredentials?.call(e, `tokens`), await X(e, t));
    throw n;
  }
}
async function Lt(e, t, n) {
  let r = dt(e);
  if (t.validateResourceURL) return await t.validateResourceURL(r, n?.resource);
  if (n) {
    if (!ft({ requestedResource: r, configuredResource: n.resource }))
      throw Error(`Protected resource ${n.resource} does not match expected ${r} (or origin)`);
    return new URL(n.resource);
  }
}
async function X(
  e,
  {
    serverUrl: t,
    authorizationCode: n,
    callbackState: r,
    scope: i,
    resourceMetadataUrl: a,
    fetchFn: o,
  },
) {
  let s, c;
  vt(t, a);
  try {
    ((s = await wt(t, { resourceMetadataUrl: a }, o)),
      s.authorization_servers &&
        s.authorization_servers.length > 0 &&
        (c = s.authorization_servers[0]));
  } catch {}
  c ||= t;
  let l = await Lt(t, e, s);
  await e.validateAuthorizationServerURL?.call(e, t, c);
  let u = await Dt(c, { fetchFn: o }),
    d = pt(c, u),
    f = await Promise.resolve(e.clientInformation());
  if (!f) {
    if (n !== void 0)
      throw Error(
        `Existing OAuth client information is required when exchanging an authorization code`,
      );
    if (!e.saveClientInformation)
      throw Error(`OAuth client information must be saveable for dynamic registration`);
    ((f = ht(await It(c, { metadata: u, clientMetadata: e.clientMetadata, fetchFn: o }), d)),
      await e.saveClientInformation(f));
  }
  if (n !== void 0) {
    if (e.storedState) {
      let t = await e.storedState();
      if (t !== void 0 && t !== r)
        throw Error(`OAuth state parameter mismatch - possible CSRF attack`);
    }
    let t = await gt({ provider: e, clientInformation: f });
    if (!t)
      throw new L({
        message: `Stored OAuth authorization server metadata is required when exchanging an authorization code`,
      });
    yt({ storedAuthorizationServerInformation: t, currentAuthorizationServerInformation: d });
    let i = await e.codeVerifier(),
      a = await Pt(c, {
        metadata: u,
        clientInformation: f,
        authorizationCode: n,
        codeVerifier: i,
        redirectUri: e.redirectUrl,
        resource: l,
        addClientAuthentication: e.addClientAuthentication,
        fetchFn: o,
      });
    return (await e.saveTokens(mt(a, d)), `AUTHORIZED`);
  }
  let p = await e.tokens();
  if (p?.refresh_token) {
    let t = await gt({ provider: e, clientInformation: f, tokens: p });
    t
      ? yt({ storedAuthorizationServerInformation: t, currentAuthorizationServerInformation: d })
      : await e.invalidateCredentials?.call(e, `tokens`);
    try {
      if (t) {
        let t = await Ft(c, {
          metadata: u,
          clientInformation: f,
          refreshToken: p.refresh_token,
          resource: l,
          addClientAuthentication: e.addClientAuthentication,
          fetchFn: o,
        });
        return (await e.saveTokens(mt(t, d)), `AUTHORIZED`);
      }
    } catch (e) {
      if (!(!(e instanceof L) || e instanceof R)) throw e;
    }
  }
  let m = e.state ? await e.state() : void 0;
  m && e.saveState && (await e.saveState(m));
  let { authorizationUrl: h, codeVerifier: g } = await Ot(c, {
    metadata: u,
    clientInformation: f,
    state: m,
    redirectUrl: e.redirectUrl,
    scope: i || e.clientMetadata.scope,
    resource: l,
  });
  if (!(await _t({ provider: e, clientInformation: f, authorizationServerInformation: d })))
    throw new L({
      message: `OAuth authorization server metadata must be saveable before starting authorization`,
    });
  return (await e.saveCodeVerifier(g), await e.redirectToAuthorization(h), `REDIRECT`);
}
function Rt(e) {
  return e === void 0 || e === `message`;
}
var zt = class {
  constructor({ url: e, headers: t, authProvider: n, redirect: r = `error`, fetch: i }) {
    ((this.connected = !1),
      (this.url = new URL(e)),
      (this.headers = t),
      (this.authProvider = n),
      (this.redirectMode = r),
      (this.fetchFn = i ?? globalThis.fetch));
  }
  setProtocolVersion(e) {
    this.protocolVersion = e;
  }
  async commonHeaders(e) {
    let t = { ...this.headers, ...e, "mcp-protocol-version": this.protocolVersion ?? D };
    if (this.authProvider) {
      let e = await this.authProvider.tokens();
      e?.access_token && (t.Authorization = `Bearer ${e.access_token}`);
    }
    return _(t, `ai-sdk/${Ze}`, r());
  }
  async start() {
    return new Promise((e, t) => {
      if (this.connected) return e();
      this.abortController = new AbortController();
      let n = async (r = !1) => {
        var i, a, o, s;
        try {
          let s = await this.commonHeaders({ Accept: `text/event-stream` }),
            c = await this.fetchFn(this.url.href, {
              headers: s,
              signal: this.abortController?.signal,
              redirect: this.redirectMode,
            });
          if (c.status === 401 && this.authProvider && !r) {
            this.resourceMetadataUrl = K(c);
            try {
              if (
                (await Y(this.authProvider, {
                  serverUrl: this.url,
                  resourceMetadataUrl: this.resourceMetadataUrl,
                  fetchFn: this.fetchFn,
                })) !== `AUTHORIZED`
              ) {
                let e = new U();
                return ((i = this.onerror) == null || i.call(this, e), t(e));
              }
            } catch (e) {
              return ((a = this.onerror) == null || a.call(this, e), t(e));
            }
            return n(!0);
          }
          if (!c.ok || !c.body) {
            let e = `MCP SSE Transport Error: ${c.status} ${c.statusText}`;
            c.status === 405 &&
              (e +=
                ". This server does not support SSE transport. Try using `http` transport instead");
            let n = new F({ message: e });
            return ((o = this.onerror) == null || o.call(this, n), t(n));
          }
          let l = c.body.pipeThrough(new TextDecoderStream()).pipeThrough(new p()).getReader(),
            u = async () => {
              var n, r, i, a, o;
              try {
                for (;;) {
                  let { done: t, value: o } = await l.read();
                  if (t) {
                    if (this.connected)
                      throw (
                        (this.connected = !1),
                        new F({
                          message: `MCP SSE Transport Error: Connection closed unexpectedly`,
                        })
                      );
                    return;
                  }
                  let { event: s, data: c } = o;
                  if (s === `endpoint`) {
                    if (this.endpoint) continue;
                    let t = new URL(c, this.url);
                    if (t.origin !== this.url.origin)
                      throw (
                        (this.connected = !1),
                        (this.endpoint = void 0),
                        (n = this.sseConnection) == null || n.close(),
                        (r = this.abortController) == null || r.abort(),
                        new F({
                          message: `MCP SSE Transport Error: Endpoint origin does not match connection origin: ${t.origin}`,
                        })
                      );
                    ((this.endpoint = t), (this.connected = !0), e());
                  } else if (Rt(s))
                    try {
                      let e = await P(c);
                      (i = this.onmessage) == null || i.call(this, e);
                    } catch (e) {
                      let t = new F({
                        message: `MCP SSE Transport Error: Failed to parse message`,
                        cause: e,
                      });
                      (a = this.onerror) == null || a.call(this, t);
                    }
                }
              } catch (e) {
                if (e instanceof Error && e.name === `AbortError`) return;
                ((o = this.onerror) == null || o.call(this, e), t(e));
              }
            };
          ((this.sseConnection = { close: () => l.cancel() }), u());
        } catch (e) {
          if (e instanceof Error && e.name === `AbortError`) return;
          ((s = this.onerror) == null || s.call(this, e), t(e));
        }
      };
      n();
    });
  }
  async close() {
    var e, t, n;
    ((this.connected = !1),
      (this.endpoint = void 0),
      (e = this.sseConnection) == null || e.close(),
      (t = this.abortController) == null || t.abort(),
      (n = this.onclose) == null || n.call(this));
  }
  async send(e) {
    if (!this.endpoint || !this.connected)
      throw new F({ message: `MCP SSE Transport Error: Not connected` });
    let t = this.endpoint,
      n = async (r = !1) => {
        var i, a, o, s;
        try {
          let s = {
              method: `POST`,
              headers: await this.commonHeaders({ "Content-Type": `application/json` }),
              body: JSON.stringify(e),
              signal: this.abortController?.signal,
              redirect: this.redirectMode,
            },
            c = await this.fetchFn(t.href, s);
          if (c.status === 401 && this.authProvider && !r) {
            this.resourceMetadataUrl = K(c);
            try {
              if (
                (await Y(this.authProvider, {
                  serverUrl: this.url,
                  resourceMetadataUrl: this.resourceMetadataUrl,
                  fetchFn: this.fetchFn,
                })) !== `AUTHORIZED`
              ) {
                let e = new U();
                (i = this.onerror) == null || i.call(this, e);
                return;
              }
            } catch (e) {
              (a = this.onerror) == null || a.call(this, e);
              return;
            }
            return n(!0);
          }
          if (!c.ok) {
            let e = await c.text().catch(() => null),
              t = new F({
                message: `MCP SSE Transport Error: POSTing to endpoint (HTTP ${c.status}): ${e}`,
              });
            (o = this.onerror) == null || o.call(this, t);
            return;
          }
        } catch (e) {
          (s = this.onerror) == null || s.call(this, e);
          return;
        }
      };
    await n();
  }
};
function Bt(e) {
  return e === void 0 || e === `message`;
}
var Vt = class {
  constructor({
    url: e,
    headers: t,
    authProvider: n,
    redirect: r = `error`,
    initialSessionId: i,
    initialProtocolVersion: a,
    onSessionIdChange: o,
    onSessionExpired: s,
    terminateSessionOnClose: c = !0,
    fetch: l,
  }) {
    ((this.inboundReconnectAttempts = 0),
      (this.reconnectionOptions = {
        initialReconnectionDelay: 1e3,
        maxReconnectionDelay: 3e4,
        reconnectionDelayGrowFactor: 1.5,
        maxRetries: 2,
      }),
      (this.url = new URL(e)),
      (this.headers = t),
      (this.authProvider = n),
      (this.redirectMode = r),
      (this.sessionId = i),
      (this.protocolVersion = a),
      (this.onSessionIdChange = o),
      (this.onSessionExpired = s),
      (this.terminateSessionOnClose = c),
      (this.fetchFn = l ?? globalThis.fetch));
  }
  setProtocolVersion(e) {
    this.protocolVersion = e;
  }
  async commonHeaders({ base: e, includeSessionId: t = !0 }) {
    let n = { ...this.headers, ...e, "mcp-protocol-version": this.protocolVersion ?? D };
    if ((t && this.sessionId && (n[`mcp-session-id`] = this.sessionId), this.authProvider)) {
      let e = await this.authProvider.tokens();
      e?.access_token && (n.Authorization = `Bearer ${e.access_token}`);
    }
    return _(n, `ai-sdk/${Ze}`, r());
  }
  setSessionId(e) {
    var t;
    this.sessionId !== e &&
      ((this.sessionId = e), (t = this.onSessionIdChange) == null || t.call(this, e));
  }
  applySessionIdFromResponse(e) {
    let t = e.headers.get(`mcp-session-id`);
    t && this.setSessionId(t);
  }
  expireSessionId(e) {
    var t;
    (this.sessionId === e && this.setSessionId(void 0),
      (t = this.onSessionExpired) == null || t.call(this, e));
  }
  authorizeOnce(e) {
    return this.authProvider
      ? ((this.authPromise ||= Y(this.authProvider, {
          serverUrl: this.url,
          resourceMetadataUrl: e,
          fetchFn: this.fetchFn,
        }).finally(() => {
          this.authPromise = void 0;
        })),
        this.authPromise)
      : Promise.resolve(`REDIRECT`);
  }
  async start() {
    if (this.abortController)
      throw new F({
        message: `MCP HTTP Transport Error: Transport already started. Note: client.connect() calls start() automatically.`,
      });
    ((this.abortController = new AbortController()), this.startInboundSse());
  }
  async close() {
    var e, t, n;
    (e = this.inboundSseConnection) == null || e.close();
    try {
      if (
        this.sessionId &&
        this.terminateSessionOnClose &&
        this.abortController &&
        !this.abortController.signal.aborted
      ) {
        let e = await this.commonHeaders({ base: {} });
        await this.fetchFn(this.url.href, {
          method: `DELETE`,
          headers: e,
          signal: this.abortController.signal,
          redirect: this.redirectMode,
        }).catch(() => void 0);
      }
    } catch {}
    ((t = this.abortController) == null || t.abort(), (n = this.onclose) == null || n.call(this));
  }
  async send(e) {
    let t = async (n = !1) => {
      var r, i, a, o, s, c;
      try {
        let c = `method` in e && e.method === `initialize`,
          l = c ? void 0 : this.sessionId,
          u = {
            method: `POST`,
            headers: await this.commonHeaders({
              base: {
                "Content-Type": `application/json`,
                Accept: `application/json, text/event-stream`,
              },
              includeSessionId: !c,
            }),
            body: JSON.stringify(e),
            signal: this.abortController?.signal,
            redirect: this.redirectMode,
          },
          d = await this.fetchFn(this.url.href, u);
        if ((this.applySessionIdFromResponse(d), d.status === 401 && this.authProvider && !n)) {
          this.resourceMetadataUrl = K(d);
          try {
            if ((await this.authorizeOnce(this.resourceMetadataUrl)) !== `AUTHORIZED`)
              throw new U();
          } catch (e) {
            throw ((r = this.onerror) == null || r.call(this, e), e);
          }
          return t(!0);
        }
        if (d.status === 202) {
          this.inboundSseConnection || this.startInboundSse();
          return;
        }
        if (!d.ok) {
          let e = await d.text().catch(() => null),
            t = `MCP HTTP Transport Error: POSTing to endpoint (HTTP ${d.status}): ${e}`;
          d.status === 404 &&
            (l
              ? (this.expireSessionId(l),
                (t +=
                  ". The MCP session expired. Create a new client without `initialSessionId` to start a fresh session"))
              : (t +=
                  ". This server does not support HTTP transport. Try using `sse` transport instead"));
          let n = new F({
            message: t,
            statusCode: d.status,
            url: this.url.href,
            responseBody: e ?? void 0,
          });
          throw ((i = this.onerror) == null || i.call(this, n), n);
        }
        if (!(`id` in e)) return;
        let f = d.headers.get(`content-type`) || ``;
        if (f.includes(`application/json`)) {
          let e = await d.json(),
            t = Array.isArray(e) ? e.map((e) => N(e)) : [N(e)];
          for (let e of t) (a = this.onmessage) == null || a.call(this, e);
          return;
        }
        if (f.includes(`text/event-stream`)) {
          if (!d.body) {
            let e = new F({
              message: `MCP HTTP Transport Error: text/event-stream response without body`,
              statusCode: d.status,
              url: this.url.href,
            });
            throw ((o = this.onerror) == null || o.call(this, e), e);
          }
          let e = d.body.pipeThrough(new TextDecoderStream()).pipeThrough(new p()).getReader();
          (async () => {
            var t, n, r;
            try {
              for (;;) {
                let { done: r, value: i } = await e.read();
                if (r) return;
                let { event: a, data: o } = i;
                if (Bt(a))
                  try {
                    let e = await P(o);
                    (t = this.onmessage) == null || t.call(this, e);
                  } catch (e) {
                    let t = new F({
                      message: `MCP HTTP Transport Error: Failed to parse message`,
                      cause: e,
                    });
                    (n = this.onerror) == null || n.call(this, t);
                  }
              }
            } catch (e) {
              if (e instanceof Error && e.name === `AbortError`) return;
              (r = this.onerror) == null || r.call(this, e);
            }
          })().catch((e) => {
            var t;
            (e instanceof Error && e.name === `AbortError`) ||
              (t = this.onerror) == null ||
              t.call(this, e);
          });
          return;
        }
        let m = new F({
          message: `MCP HTTP Transport Error: Unexpected content type: ${f}`,
          statusCode: d.status,
          url: this.url.href,
        });
        throw ((s = this.onerror) == null || s.call(this, m), m);
      } catch (e) {
        throw ((c = this.onerror) == null || c.call(this, e), e);
      }
    };
    await t();
  }
  getNextReconnectionDelay(e) {
    let {
      initialReconnectionDelay: t,
      reconnectionDelayGrowFactor: n,
      maxReconnectionDelay: r,
    } = this.reconnectionOptions;
    return Math.min(t * n ** +e, r);
  }
  scheduleInboundSseReconnection() {
    var e;
    let { maxRetries: t } = this.reconnectionOptions;
    if (t > 0 && this.inboundReconnectAttempts >= t) {
      (e = this.onerror) == null ||
        e.call(
          this,
          new F({
            message: `MCP HTTP Transport Error: Maximum reconnection attempts (${t}) exceeded.`,
          }),
        );
      return;
    }
    let n = this.getNextReconnectionDelay(this.inboundReconnectAttempts);
    ((this.inboundReconnectAttempts += 1),
      setTimeout(() => {
        this.abortController?.signal.aborted || this.startInboundSse(!1, this.lastInboundEventId);
      }, n));
  }
  startInboundSse(e = !1, t) {
    this.openInboundSse(e, t).catch((e) => {
      var t;
      (e instanceof Error && e.name === `AbortError`) ||
        (t = this.onerror) == null ||
        t.call(this, e);
    });
  }
  async openInboundSse(e = !1, t) {
    var n, r, i, a;
    try {
      let a = this.sessionId,
        o = await this.commonHeaders({ base: { Accept: `text/event-stream` } });
      t && (o[`last-event-id`] = t);
      let s = await this.fetchFn(this.url.href, {
        method: `GET`,
        headers: o,
        signal: this.abortController?.signal,
        redirect: this.redirectMode,
      });
      if ((this.applySessionIdFromResponse(s), s.status === 401 && this.authProvider && !e)) {
        this.resourceMetadataUrl = K(s);
        try {
          if ((await this.authorizeOnce(this.resourceMetadataUrl)) !== `AUTHORIZED`) {
            let e = new U();
            (n = this.onerror) == null || n.call(this, e);
            return;
          }
        } catch (e) {
          (r = this.onerror) == null || r.call(this, e);
          return;
        }
        return this.openInboundSse(!0, t);
      }
      if (s.status === 405) return;
      if (!s.ok || !s.body) {
        s.status === 404 && a && this.expireSessionId(a);
        let e = new F({
          message: `MCP HTTP Transport Error: GET SSE failed: ${s.status} ${s.statusText}`,
          statusCode: s.status,
          url: this.url.href,
        });
        (i = this.onerror) == null || i.call(this, e);
        return;
      }
      let c = s.body.pipeThrough(new TextDecoderStream()).pipeThrough(new p()).getReader(),
        l = async () => {
          var e, t, n;
          try {
            for (;;) {
              let { done: n, value: r } = await c.read();
              if (n) return;
              let { event: i, data: a, id: o } = r;
              if ((o && (this.lastInboundEventId = o), Bt(i)))
                try {
                  let t = await P(a);
                  (e = this.onmessage) == null || e.call(this, t);
                } catch (e) {
                  let n = new F({
                    message: `MCP HTTP Transport Error: Failed to parse message`,
                    cause: e,
                  });
                  (t = this.onerror) == null || t.call(this, n);
                }
            }
          } catch (e) {
            if (e instanceof Error && e.name === `AbortError`) return;
            ((n = this.onerror) == null || n.call(this, e),
              this.abortController?.signal.aborted || this.scheduleInboundSseReconnection());
          }
        };
      ((this.inboundSseConnection = {
        close: () => {
          c.cancel().catch((e) => {
            var t;
            (e instanceof Error && e.name === `AbortError`) ||
              (t = this.onerror) == null ||
              t.call(this, e);
          });
        },
      }),
        (this.inboundReconnectAttempts = 0),
        l().catch((e) => {
          var t;
          (e instanceof Error && e.name === `AbortError`) ||
            ((t = this.onerror) == null || t.call(this, e),
            this.abortController?.signal.aborted || this.scheduleInboundSseReconnection());
        }));
    } catch (e) {
      if (e instanceof Error && e.name === `AbortError`) return;
      ((a = this.onerror) == null || a.call(this, e),
        this.abortController?.signal.aborted || this.scheduleInboundSseReconnection());
    }
  }
};
function Ht(e) {
  switch (e.type) {
    case `sse`:
      return new zt(e);
    case `http`:
      return new Vt(e);
    default:
      throw new F({
        message: `Unsupported or invalid transport configuration. If you are using a custom transport, make sure it implements the MCPTransport interface.`,
      });
  }
}
function Ut(e) {
  return (
    `start` in e &&
    typeof e.start == `function` &&
    `send` in e &&
    typeof e.send == `function` &&
    `close` in e &&
    typeof e.close == `function`
  );
}
var Wt = `io.modelcontextprotocol/ui`,
  Z = `text/html;profile=mcp-app`,
  Gt = `ui/resourceUri`,
  Kt = { extensions: { [Wt]: { mimeTypes: [Z] } } };
function qt(e) {
  let n = e?.ui;
  return t(n) ? n : void 0;
}
var Q = x(C())
    .transform((e) => e.filter((e) => typeof e == `string`))
    .optional()
    .catch(void 0),
  Jt = y({ connectDomains: Q, resourceDomains: Q, frameDomains: Q }),
  Yt = y({
    prefersBorder: v()
      .optional()
      .catch(void 0),
    csp: Jt.optional().catch(void 0),
    permissions: h(w(), C())
      .optional()
      .catch(void 0),
  });
function Xt(e) {
  let n = (t(e) ? e : void 0)?.ui;
  if (!t(n)) return;
  let r = Yt.safeParse(n);
  return r.success ? r.data : void 0;
}
function Zt(e) {
  return Array.isArray(e) ? e.filter((e) => e === `model` || e === `app`) : void 0;
}
function Qt(e) {
  let t = qt(e._meta),
    n = t?.resourceUri ?? e._meta?.[Gt],
    r = Zt(t?.visibility);
  if (n !== void 0) {
    if (typeof n != `string` || !n.startsWith(`ui://`))
      throw Error(`Invalid MCP App resource URI: ${JSON.stringify(n)}`);
  } else if (t == null) return;
  return {
    ...t,
    ...(n == null ? {} : { resourceUri: n }),
    ...(r == null ? {} : { visibility: r }),
  };
}
function $t(e) {
  let t = [],
    n = [];
  for (let r of e.tools) {
    let e = Qt(r)?.visibility;
    ((e == null || e.includes(`model`)) && t.push(r), e?.includes(`app`) === !0 && n.push(r));
  }
  return { modelVisible: { ...e, tools: t }, appVisible: { ...e, tools: n } };
}
function en({ uri: e, resource: t }) {
  let n = t.contents.find((t) => t.uri === e);
  if (n == null) throw Error(`MCP App resource not found in read result: ${e}`);
  if (n.mimeType !== `text/html;profile=mcp-app`)
    throw Error(`Unsupported MCP App resource MIME type: ${n.mimeType}`);
  let r =
    `text` in n && typeof n.text == `string`
      ? n.text
      : `blob` in n && typeof n.blob == `string`
        ? new TextDecoder().decode(f(n.blob))
        : void 0;
  if (r == null) throw Error(`Unsupported MCP App resource content format: ${e}`);
  return { uri: e, mimeType: Z, html: r, meta: Xt(n._meta) };
}
async function tn({ client: e, uri: t, options: n }) {
  if (!t.startsWith(`ui://`)) throw Error(`Unsupported MCP App resource URI: ${t}`);
  return en({ uri: t, resource: await e.readResource({ uri: t, options: n }) });
}
var nn = `1.0.0`,
  rn = 0,
  an = [
    `ConnectionRefused`,
    `ConnectionClosed`,
    `FailedToOpenSocket`,
    `ECONNRESET`,
    `ECONNREFUSED`,
    `ETIMEDOUT`,
    `EPIPE`,
  ];
function on(e) {
  if (typeof e == `object` && e && `statusCode` in e && typeof e.statusCode == `number`)
    return e.statusCode;
}
function sn(e) {
  if (typeof e == `object` && e && `code` in e && typeof e.code == `string`) return e.code;
}
function cn(e) {
  let t = on(e);
  if (t != null) return t === 408 || t === 409 || t === 429 || t >= 500;
  if (F.isInstance(e) && e.code != null) return !1;
  let n = sn(e);
  return n != null && an.includes(n);
}
function ln(e) {
  if (e == null) return rn;
  if (!Number.isInteger(e)) throw new F({ message: `maxRetries must be an integer` });
  if (e < 0) throw new F({ message: `maxRetries must be >= 0` });
  return e;
}
function un({ output: e }) {
  let t = e;
  return !(`content` in t) || !Array.isArray(t.content)
    ? { type: `json`, value: t }
    : {
        type: `content`,
        value: t.content.map((e) =>
          e.type === `text` && `text` in e
            ? { type: `text`, text: e.text }
            : e.type === `image` && `data` in e && `mimeType` in e
              ? { type: `file`, mediaType: e.mimeType, data: { type: `data`, data: e.data } }
              : { type: `text`, text: JSON.stringify(e) },
        ),
      };
}
async function dn(e) {
  let t = new fn(e);
  return (await t.init(), t);
}
var fn = class {
    constructor({
      transport: e,
      name: t,
      clientName: n = t ?? `ai-sdk-mcp-client`,
      version: r = nn,
      onUncaughtError: i,
      maxRetries: a,
      capabilities: o,
      initialInitializeResult: s,
    }) {
      ((this.requestMessageId = 0),
        (this.responseHandlers = new Map()),
        (this.serverCapabilities = {}),
        (this._serverInfo = { name: ``, version: `` }),
        (this._initializeResult = {
          protocolVersion: D,
          capabilities: {},
          serverInfo: this._serverInfo,
        }),
        (this.isClosed = !0),
        (this.onUncaughtError = i),
        (this.maxRetries = ln(a)),
        (this.clientCapabilities = o ?? {}),
        (this.initialInitializeResult = s),
        Ut(e) ? (this.transport = e) : (this.transport = Ht(e)),
        (this.transport.onclose = () => this.onClose()),
        (this.transport.onerror = (e) => this.onError(e)),
        (this.transport.onmessage = (e) => {
          if (`method` in e) {
            `id` in e
              ? this.onRequestMessage(e)
              : this.onError(new F({ message: `Unsupported message type` }));
            return;
          }
          this.onResponse(e);
        }),
        (this.clientInfo = { name: n, version: r }));
    }
    get serverInfo() {
      return this._serverInfo;
    }
    get initializeResult() {
      return this._initializeResult;
    }
    get instructions() {
      return this._serverInstructions;
    }
    async init() {
      try {
        if ((await this.transport.start(), (this.isClosed = !1), this.initialInitializeResult)) {
          let e = ge.parse(this.initialInitializeResult);
          return (this.applyInitializeResult(e), this);
        }
        let e = await this.request({
          request: {
            method: `initialize`,
            params: {
              protocolVersion: D,
              capabilities: this.clientCapabilities,
              clientInfo: this.clientInfo,
            },
          },
          resultSchema: ge,
        });
        if (e === void 0) throw new F({ message: `Server sent invalid initialize result` });
        return (
          this.applyInitializeResult(e),
          await this.notification({ method: `notifications/initialized` }),
          this
        );
      } catch (e) {
        throw (await this.close(), e);
      }
    }
    applyInitializeResult(e) {
      if (!ue.includes(e.protocolVersion))
        throw new F({
          message: `Server's protocol version is not supported: ${e.protocolVersion}`,
        });
      ((this.serverCapabilities = e.capabilities),
        (this._serverInfo = e.serverInfo),
        (this._initializeResult = e),
        this.transport.setProtocolVersion
          ? this.transport.setProtocolVersion(e.protocolVersion)
          : (this.transport.protocolVersion = e.protocolVersion),
        (this._serverInstructions = e.instructions));
    }
    async close() {
      this.isClosed || (await this.transport?.close(), this.onClose());
    }
    assertCapability(e) {
      switch (e) {
        case `initialize`:
          break;
        case `completion/complete`:
          if (!this.serverCapabilities.completions)
            throw new F({ message: `Server does not support completions` });
          break;
        case `tools/list`:
        case `tools/call`:
          if (!this.serverCapabilities.tools)
            throw new F({ message: `Server does not support tools` });
          break;
        case `resources/list`:
        case `resources/read`:
        case `resources/templates/list`:
          if (!this.serverCapabilities.resources)
            throw new F({ message: `Server does not support resources` });
          break;
        case `prompts/list`:
        case `prompts/get`:
          if (!this.serverCapabilities.prompts)
            throw new F({ message: `Server does not support prompts` });
          break;
        default:
          throw new F({ message: `Unsupported method: ${e}` });
      }
    }
    async request({ request: e, resultSchema: t, options: n }) {
      return new Promise((r, i) => {
        if (this.isClosed)
          return i(new F({ message: `Attempted to send a request from a closed client` }));
        this.assertCapability(e.method);
        let a = n?.signal;
        a?.throwIfAborted();
        let o = this.requestMessageId++,
          s = { ...e, jsonrpc: `2.0`, id: o },
          c = () => {
            i(new F({ message: `Request was aborted`, cause: a?.reason }));
          },
          l = () => {
            (this.responseHandlers.delete(o), a?.removeEventListener(`abort`, d));
          },
          u = (e) => {
            (l(), i(e));
          },
          d = () => {
            (l(), c());
          };
        (this.responseHandlers.set(o, (e) => {
          if (a?.aborted) return (l(), c());
          if (e instanceof Error) return u(e);
          try {
            let n = t.parse(e.result);
            (l(), r(n));
          } catch (e) {
            u(new F({ message: `Failed to parse server response`, cause: e }));
          }
        }),
          a?.addEventListener(`abort`, d, { once: !0 }),
          this.transport.send(s).catch((e) => {
            u(e);
          }));
      });
    }
    async listTools({ params: e, options: t } = {}) {
      return this.request({
        request: { method: `tools/list`, params: e },
        resultSchema: ve,
        options: t,
      });
    }
    async callToolWithRetry({ options: e, execute: t }) {
      return this.maxRetries === 0
        ? t()
        : l({
            maxRetries: this.maxRetries,
            abortSignal: e?.signal,
            shouldRetry: cn,
            createRetryError: ({ message: e, errors: t }) =>
              new F({ message: e, cause: t[t.length - 1] }),
          })(t);
    }
    async callTool({ name: e, arguments: t = {}, options: n }) {
      try {
        return this.callToolWithRetry({
          options: n,
          execute: () =>
            this.request({
              request: { method: `tools/call`, params: { name: e, arguments: t } },
              resultSchema: Oe,
              options: n,
            }),
        });
      } catch (e) {
        throw e;
      }
    }
    async listResourcesInternal({ params: e, options: t } = {}) {
      try {
        return this.request({
          request: { method: `resources/list`, params: e },
          resultSchema: Se,
          options: t,
        });
      } catch (e) {
        throw e;
      }
    }
    async readResourceInternal({ uri: e, options: t }) {
      try {
        return this.request({
          request: { method: `resources/read`, params: { uri: e } },
          resultSchema: je,
          options: t,
        });
      } catch (e) {
        throw e;
      }
    }
    async listResourceTemplatesInternal({ options: e } = {}) {
      try {
        return this.request({
          request: { method: `resources/templates/list` },
          resultSchema: Ae,
          options: e,
        });
      } catch (e) {
        throw e;
      }
    }
    async listPromptsInternal({ params: e, options: t } = {}) {
      try {
        return this.request({
          request: { method: `prompts/list`, params: e },
          resultSchema: Re,
          options: t,
        });
      } catch (e) {
        throw e;
      }
    }
    async getPromptInternal({ name: e, args: t, options: n }) {
      try {
        return this.request({
          request: { method: `prompts/get`, params: { name: e, arguments: t } },
          resultSchema: Be,
          options: n,
        });
      } catch (e) {
        throw e;
      }
    }
    async completeInternal({ options: e, ...t }) {
      return this.request({
        request: { method: `completion/complete`, params: t },
        resultSchema: Fe,
        options: e,
      });
    }
    async notification(e) {
      let t = { ...e, jsonrpc: `2.0` };
      await this.transport.send(t);
    }
    async tools({ schemas: e = `automatic` } = {}) {
      let t = await this.listTools();
      return this.toolsFromDefinitions(t, { schemas: e });
    }
    toolsFromDefinitions(e, { schemas: t = `automatic` } = {}) {
      let r = {};
      for (let {
        name: i,
        title: a,
        description: o,
        inputSchema: s,
        annotations: c,
        _meta: l,
      } of e.tools) {
        let e = a ?? c?.title;
        if (t !== `automatic` && !Object.prototype.hasOwnProperty.call(t, i)) continue;
        let d = this,
          f = t === `automatic` ? void 0 : t[i]?.outputSchema,
          p = Qt({ _meta: l }),
          h = {
            clientName: this.clientInfo.name,
            toolName: i,
            ...(e == null ? {} : { title: e }),
            ...(p?.resourceUri == null ? {} : { app: { ...p, mimeType: Z } }),
          },
          g = async (e, t) => {
            var n;
            (n = t?.abortSignal) == null || n.throwIfAborted();
            let r = await d.callTool({
              name: i,
              arguments: e,
              options: { signal: t?.abortSignal },
            });
            return r.isError || f == null ? r : d.extractStructuredContent(r, f, i);
          };
        r[i] = {
          ...(t === `automatic`
            ? m({
                description: o,
                title: e,
                metadata: h,
                inputSchema: n({ ...s, properties: s.properties ?? {}, additionalProperties: !1 }),
                execute: g,
                toModelOutput: un,
              })
            : u({
                description: o,
                title: e,
                metadata: h,
                inputSchema: t[i].inputSchema,
                ...(f == null ? {} : { outputSchema: f }),
                execute: g,
                toModelOutput: un,
              })),
          _meta: l,
        };
      }
      return r;
    }
    async extractStructuredContent(e, t, n) {
      if (`structuredContent` in e && e.structuredContent != null) {
        let r = await s({ value: e.structuredContent, schema: ne(t) });
        if (!r.success)
          throw new F({
            message: `Tool "${n}" returned structuredContent that does not match the expected outputSchema`,
            cause: r.error,
          });
        return r.value;
      }
      if (`content` in e && Array.isArray(e.content)) {
        let r = e.content.find((e) => e.type === `text`);
        if (r && `text` in r) {
          let e = await o({ text: r.text, schema: t });
          if (!e.success)
            throw new F({
              message: `Tool "${n}" returned content that does not match the expected outputSchema`,
              cause: e.error,
            });
          return e.value;
        }
      }
      throw new F({
        message: `Tool "${n}" did not return structuredContent or parseable text content`,
      });
    }
    listResources({ params: e, options: t } = {}) {
      return this.listResourcesInternal({ params: e, options: t });
    }
    readResource({ uri: e, options: t }) {
      return this.readResourceInternal({ uri: e, options: t });
    }
    listResourceTemplates({ options: e } = {}) {
      return this.listResourceTemplatesInternal({ options: e });
    }
    experimental_listPrompts({ params: e, options: t } = {}) {
      return this.listPromptsInternal({ params: e, options: t });
    }
    experimental_getPrompt({ name: e, arguments: t, options: n }) {
      return this.getPromptInternal({ name: e, args: t, options: n });
    }
    complete(e) {
      return this.completeInternal(e);
    }
    onElicitationRequest(e, t) {
      if (e !== j)
        throw new F({
          message: `Unsupported request schema. Only ElicitationRequestSchema is supported.`,
        });
      this.elicitationRequestHandler = t;
    }
    async onRequestMessage(e) {
      try {
        if (e.method === `ping`) {
          await this.transport.send({ jsonrpc: `2.0`, id: e.id, result: {} });
          return;
        }
        if (e.method !== `elicitation/create`) {
          await this.transport.send({
            jsonrpc: `2.0`,
            id: e.id,
            error: { code: -32601, message: `Unsupported request method: ${e.method}` },
          });
          return;
        }
        if (!this.elicitationRequestHandler) {
          await this.transport.send({
            jsonrpc: `2.0`,
            id: e.id,
            error: { code: -32601, message: `No elicitation handler registered on client` },
          });
          return;
        }
        let t = j.safeParse({ method: e.method, params: e.params });
        if (!t.success) {
          await this.transport.send({
            jsonrpc: `2.0`,
            id: e.id,
            error: {
              code: -32602,
              message: `Invalid elicitation request: ${t.error.message}`,
              data: t.error.issues,
            },
          });
          return;
        }
        try {
          let n = await this.elicitationRequestHandler(t.data),
            r = He.parse(n);
          await this.transport.send({ jsonrpc: `2.0`, id: e.id, result: r });
        } catch (t) {
          (await this.transport.send({
            jsonrpc: `2.0`,
            id: e.id,
            error: {
              code: -32603,
              message: t instanceof Error ? t.message : `Failed to handle elicitation request`,
            },
          }),
            this.onError(t));
        }
      } catch (e) {
        this.onError(e);
      }
    }
    onClose() {
      if (this.isClosed) return;
      this.isClosed = !0;
      let e = new F({ message: `Connection closed` });
      for (let t of this.responseHandlers.values()) t(e);
      this.responseHandlers.clear();
    }
    onError(e) {
      this.onUncaughtError && this.onUncaughtError(e);
    }
    onResponse(e) {
      let t = Number(e.id),
        n = this.responseHandlers.get(t);
      if (n === void 0)
        throw new F({
          message: `Protocol error: Received a response for an unknown message ID: ${JSON.stringify(e)}`,
        });
      (this.responseHandlers.delete(t),
        n(
          `result` in e
            ? e
            : new F({
                message: e.error.message,
                code: e.error.code,
                data: e.error.data,
                cause: e.error,
              }),
        ));
    }
  },
  pn = new TextEncoder();
function $(e) {
  if (typeof e != `object` || !e) return JSON.stringify(e ?? null);
  if (Array.isArray(e)) return `[${e.map($).join(`,`)}]`;
  let t = e;
  return `{${Object.keys(t)
    .sort()
    .map((e) => `${JSON.stringify(e)}:${$(t[e])}`)
    .join(`,`)}}`;
}
function mn(e) {
  return ee(e).replace(/\+/g, `-`).replace(/\//g, `_`).replace(/=+$/g, ``);
}
async function hn(e) {
  let t = await crypto.subtle.digest(
    `SHA-256`,
    pn.encode(
      $({ html: e.html, csp: e.meta?.csp ?? null, permissions: e.meta?.permissions ?? null }),
    ),
  );
  return mn(new Uint8Array(t));
}
function gn(e, t) {
  return e !== t;
}
export {
  He as ElicitResultSchema,
  j as ElicitationRequestSchema,
  Z as MCP_APP_MIME_TYPE,
  U as UnauthorizedError,
  Y as auth,
  dn as createMCPClient,
  dn as experimental_createMCPClient,
  gn as detectMCPAppResourceDrift,
  hn as fingerprintMCPAppResource,
  Kt as mcpAppClientCapabilities,
  tn as readMCPAppResource,
  $t as splitMCPAppTools,
  N as validateJSONRPCMessage,
};
