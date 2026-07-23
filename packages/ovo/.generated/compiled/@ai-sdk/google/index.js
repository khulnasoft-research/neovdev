import {
  AISDKError as e,
  TooManyEmbeddingValuesForCallError as t,
  UnsupportedFunctionalityError as n,
} from "../provider/index.js";
import {
  B as r,
  C as i,
  Ct as a,
  D as o,
  E as s,
  F as c,
  G as l,
  H as u,
  J as d,
  M as f,
  P as p,
  R as m,
  S as h,
  T as g,
  U as _,
  V as v,
  _t as y,
  a as b,
  bt as x,
  d as S,
  et as C,
  f as w,
  ft as T,
  g as E,
  gt as D,
  ht as O,
  it as k,
  j as A,
  k as ee,
  l as te,
  nt as j,
  o as ne,
  p as M,
  q as re,
  r as N,
  rt as P,
  s as F,
  st as I,
  tt as ie,
  ut as L,
  v as R,
  vt as z,
  w as B,
  wt as V,
  x as H,
  xt as U,
} from "../../_chunks/workflow/dist-C_VDTghO.js";
var ae = `4.0.21`,
  W = w({
    errorSchema: A(() => j(z({ error: z({ code: y().nullable(), message: U(), status: U() }) }))),
    errorToMessage: (e) => e.error.message,
  }),
  oe = a([
    z({ text: U() }),
    z({ inlineData: z({ mimeType: U(), data: U() }) }),
    z({ fileData: z({ fileUri: U(), mimeType: U() }) }),
  ]),
  se = A(() =>
    j(
      z({
        outputDimensionality: y().optional(),
        taskType: I([
          `SEMANTIC_SIMILARITY`,
          `CLASSIFICATION`,
          `CLUSTERING`,
          `RETRIEVAL_DOCUMENT`,
          `RETRIEVAL_QUERY`,
          `QUESTION_ANSWERING`,
          `FACT_VERIFICATION`,
          `CODE_RETRIEVAL_QUERY`,
        ]).optional(),
        content: L(L(oe).min(1).nullable()).optional(),
      }),
    ),
  ),
  ce = class e {
    constructor(e, t) {
      ((this.specificationVersion = `v4`),
        (this.maxEmbeddingsPerCall = 100),
        (this.supportsParallelCalls = !0),
        (this.modelId = e),
        (this.config = t));
    }
    static [k](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [P](t) {
      return new e(t.modelId, t.config);
    }
    get provider() {
      return this.config.provider;
    }
    async doEmbed({ values: e, headers: n, abortSignal: i, providerOptions: a }) {
      let o = await m({ provider: `google`, providerOptions: a, schema: se });
      if (e.length > this.maxEmbeddingsPerCall)
        throw new t({
          provider: this.provider,
          modelId: this.modelId,
          maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
          values: e,
        });
      let s = N(this.config.headers ? await v(this.config.headers) : void 0, n),
        c = o?.content;
      if (c != null && c.length !== e.length)
        throw Error(
          `The number of multimodal content entries (${c.length}) must match the number of values (${e.length}).`,
        );
      if (e.length === 1) {
        let t = c?.[0],
          n = e[0] ? [{ text: e[0] }] : [],
          a = t == null ? [{ text: e[0] }] : [...n, ...t],
          {
            responseHeaders: l,
            value: u,
            rawValue: d,
          } = await r({
            url: `${this.config.baseURL}/models/${this.modelId}:embedContent`,
            headers: s,
            body: {
              model: `models/${this.modelId}`,
              content: { parts: a },
              outputDimensionality: o?.outputDimensionality,
              taskType: o?.taskType,
            },
            failedResponseHandler: W,
            successfulResponseHandler: M(ue),
            abortSignal: i,
            fetch: this.config.fetch,
          });
        return {
          warnings: [],
          embeddings: [u.embedding.values],
          usage: void 0,
          response: { headers: l, body: d },
        };
      }
      let {
        responseHeaders: l,
        value: u,
        rawValue: d,
      } = await r({
        url: `${this.config.baseURL}/models/${this.modelId}:batchEmbedContents`,
        headers: s,
        body: {
          requests: e.map((e, t) => {
            let n = c?.[t],
              r = e ? [{ text: e }] : [];
            return {
              model: `models/${this.modelId}`,
              content: { role: `user`, parts: n == null ? [{ text: e }] : [...r, ...n] },
              outputDimensionality: o?.outputDimensionality,
              taskType: o?.taskType,
            };
          }),
        },
        failedResponseHandler: W,
        successfulResponseHandler: M(le),
        abortSignal: i,
        fetch: this.config.fetch,
      });
      return {
        warnings: [],
        embeddings: u.embeddings.map((e) => e.values),
        usage: void 0,
        response: { headers: l, body: d },
      };
    }
  },
  le = A(() => j(z({ embeddings: L(z({ values: L(y()) })) }))),
  ue = A(() => j(z({ embedding: z({ values: L(y()) }) })));
function de(e) {
  if (e == null)
    return {
      inputTokens: { total: void 0, noCache: void 0, cacheRead: void 0, cacheWrite: void 0 },
      outputTokens: { total: void 0, text: void 0, reasoning: void 0 },
      raw: void 0,
    };
  let t = e.promptTokenCount ?? 0,
    n = e.candidatesTokenCount ?? 0,
    r = e.cachedContentTokenCount ?? 0,
    i = e.thoughtsTokenCount ?? 0;
  return {
    inputTokens: { total: t, noCache: t - r, cacheRead: r, cacheWrite: void 0 },
    outputTokens: { total: n + i, text: n, reasoning: i },
    raw: e,
  };
}
function G(e, t = !0) {
  if (e == null) return;
  if (fe(e))
    return t
      ? void 0
      : typeof e == `object` && e.description
        ? { type: `object`, description: e.description }
        : { type: `object` };
  if (typeof e == `boolean`) return { type: `boolean`, properties: {} };
  let {
      type: n,
      description: r,
      required: i,
      properties: a,
      items: o,
      allOf: s,
      anyOf: c,
      oneOf: l,
      format: u,
      const: d,
      minLength: f,
      enum: p,
    } = e,
    m = {};
  if (
    (r && (m.description = r),
    i && (m.required = i),
    u && (m.format = u),
    d !== void 0 && (m.enum = [d]),
    n)
  )
    if (Array.isArray(n)) {
      let e = n.includes(`null`),
        t = n.filter((e) => e !== `null`);
      t.length === 0
        ? (m.type = `null`)
        : ((m.anyOf = t.map((e) => ({ type: e }))), e && (m.nullable = !0));
    } else m.type = n;
  if (
    (p !== void 0 && (m.enum = p),
    a != null &&
      (m.properties = Object.entries(a).reduce((e, [t, n]) => ((e[t] = G(n, !1)), e), {})),
    o && (m.items = Array.isArray(o) ? o.map((e) => G(e, !1)) : G(o, !1)),
    s && (m.allOf = s.map((e) => G(e, !1))),
    c)
  )
    if (c.some((e) => typeof e == `object` && e?.type === `null`)) {
      let e = c.filter((e) => !(typeof e == `object` && e?.type === `null`));
      if (e.length === 1) {
        let t = G(e[0], !1);
        typeof t == `object` && ((m.nullable = !0), Object.assign(m, t));
      } else ((m.anyOf = e.map((e) => G(e, !1))), (m.nullable = !0));
    } else m.anyOf = c.map((e) => G(e, !1));
  return (l && (m.oneOf = l.map((e) => G(e, !1))), f !== void 0 && (m.minLength = f), m);
}
function fe(e) {
  return (
    typeof e == `object` &&
    !!e &&
    e.type === `object` &&
    (e.properties == null || Object.keys(e.properties).length === 0) &&
    !e.additionalProperties
  );
}
var pe = `skip_thought_signature_validator`,
  me = /^data:([^;,]+);base64,(.+)$/s;
function he(e) {
  let t = me.exec(e);
  if (t != null) return { mediaType: t[1], data: t[2] };
}
function ge(e) {
  let t = he(e);
  if (t != null) return { inlineData: { mimeType: t.mediaType, data: t.data } };
}
function _e(e, t, n, r) {
  let i = [],
    a = [];
  for (let e of n)
    switch (e.type) {
      case `text`:
        a.push(e.text);
        break;
      case `file`:
        if (e.data.type === `data`)
          i.push({ inlineData: { mimeType: u({ part: e }), data: F(e.data.data) } });
        else if (e.data.type === `url`) {
          let t = ge(e.data.url.toString());
          t == null ? a.push(JSON.stringify(e)) : i.push(t);
        } else a.push(JSON.stringify(e));
        break;
      default:
        a.push(JSON.stringify(e));
        break;
    }
  e.push({
    functionResponse: {
      ...(r == null ? {} : { id: r }),
      name: t,
      response: {
        name: t,
        content:
          a.length > 0
            ? a.join(`
`)
            : `Tool executed successfully.`,
      },
      ...(i.length > 0 ? { parts: i } : {}),
    },
  });
}
function ve(e, t, n, r) {
  for (let i of n)
    switch (i.type) {
      case `text`:
        e.push({
          functionResponse: {
            ...(r == null ? {} : { id: r }),
            name: t,
            response: { name: t, content: i.text },
          },
        });
        break;
      case `file`:
        if (i.data.type === `data`) {
          let t = B(i.mediaType);
          e.push(
            { inlineData: { mimeType: u({ part: i }), data: F(i.data.data) } },
            {
              text: `Tool executed successfully and returned this ${t === `image` ? `image` : `file`} as a response`,
            },
          );
        } else e.push({ text: JSON.stringify(i) });
        break;
      default:
        e.push({ text: JSON.stringify(i) });
        break;
    }
}
function ye(e, t) {
  let r = [],
    i = [],
    a = !0,
    s = t?.isGemmaModel ?? !1,
    c = t?.isGemini3Model ?? !1,
    l = t?.onWarning,
    d = t?.providerOptionsNames ?? [`google`],
    f = !d.includes(`google`),
    p = t?.supportsFunctionResponseParts ?? !0,
    m = !1,
    h = [],
    g = (e) => (h.push(e), (m = !0), pe),
    v = (e) => {
      for (let t of d) {
        let n = e.providerOptions?.[t];
        if (n != null) return n;
      }
      return f
        ? e.providerOptions?.google
        : (e.providerOptions?.googleVertex ?? e.providerOptions?.vertex);
    };
  for (let { role: t, content: s } of e)
    switch (t) {
      case `system`:
        if (!a)
          throw new n({
            functionality: `system messages are only supported at the beginning of the conversation`,
          });
        r.push({ text: s });
        break;
      case `user`: {
        a = !1;
        let e = [];
        for (let t of s)
          switch (t.type) {
            case `text`:
              e.push({ text: t.text });
              break;
            case `file`:
              switch (t.data.type) {
                case `url`:
                  e.push({
                    fileData: { mimeType: u({ part: t }), fileUri: t.data.url.toString() },
                  });
                  break;
                case `reference`:
                  if (f) throw new n({ functionality: `file parts with provider references` });
                  e.push({
                    fileData: {
                      mimeType: u({ part: t }),
                      fileUri: _({ reference: t.data.reference, provider: `google` }),
                    },
                  });
                  break;
                case `text`:
                  e.push({
                    inlineData: {
                      mimeType: o(t.mediaType) ? t.mediaType : `text/plain`,
                      data: F(new TextEncoder().encode(t.data.text)),
                    },
                  });
                  break;
                case `data`:
                  e.push({ inlineData: { mimeType: u({ part: t }), data: F(t.data.data) } });
                  break;
              }
              break;
          }
        i.push({ role: `user`, parts: e });
        break;
      }
      case `assistant`:
        ((a = !1),
          i.push({
            role: `model`,
            parts: s
              .map((e) => {
                let t = v(e),
                  r = t?.thoughtSignature == null ? void 0 : String(t.thoughtSignature);
                switch (e.type) {
                  case `text`:
                    return e.text.length === 0 ? void 0 : { text: e.text, thoughtSignature: r };
                  case `reasoning`:
                    return e.text.length === 0
                      ? void 0
                      : { text: e.text, thought: !0, thoughtSignature: r };
                  case `reasoning-file`:
                    switch (e.data.type) {
                      case `url`:
                        throw new n({
                          functionality: `File data URLs in assistant messages are not supported`,
                        });
                      case `data`:
                        return {
                          inlineData: { mimeType: e.mediaType, data: F(e.data.data) },
                          thought: !0,
                          thoughtSignature: r,
                        };
                    }
                    break;
                  case `file`:
                    switch (e.data.type) {
                      case `url`:
                        throw new n({
                          functionality: `File data URLs in assistant messages are not supported`,
                        });
                      case `reference`:
                        if (f)
                          throw new n({ functionality: `file parts with provider references` });
                        return {
                          fileData: {
                            mimeType: e.mediaType,
                            fileUri: _({ reference: e.data.reference, provider: `google` }),
                          },
                          ...(t?.thought === !0 ? { thought: !0 } : {}),
                          thoughtSignature: r,
                        };
                      case `text`:
                        return {
                          inlineData: {
                            mimeType: o(e.mediaType) ? e.mediaType : `text/plain`,
                            data: F(new TextEncoder().encode(e.data.text)),
                          },
                          ...(t?.thought === !0 ? { thought: !0 } : {}),
                          thoughtSignature: r,
                        };
                      case `data`:
                        return {
                          inlineData: { mimeType: e.mediaType, data: F(e.data.data) },
                          ...(t?.thought === !0 ? { thought: !0 } : {}),
                          thoughtSignature: r,
                        };
                    }
                    break;
                  case `tool-call`: {
                    let n = t?.serverToolCallId == null ? void 0 : String(t.serverToolCallId),
                      i = t?.serverToolType == null ? void 0 : String(t.serverToolType),
                      a = r ?? (c ? g(e.toolName) : void 0);
                    return n && i
                      ? {
                          toolCall: {
                            toolType: i,
                            args: typeof e.input == `string` ? re(e.input) : e.input,
                            id: n,
                          },
                          thoughtSignature: a,
                        }
                      : {
                          functionCall: {
                            ...(e.toolCallId == null ? {} : { id: e.toolCallId }),
                            name: e.toolName,
                            args: e.input,
                          },
                          thoughtSignature: a,
                        };
                  }
                  case `tool-result`: {
                    let n = t?.serverToolCallId == null ? void 0 : String(t.serverToolCallId),
                      i = t?.serverToolType == null ? void 0 : String(t.serverToolType);
                    return n && i
                      ? {
                          toolResponse: {
                            toolType: i,
                            response: e.output.type === `json` ? e.output.value : {},
                            id: n,
                          },
                          thoughtSignature: r,
                        }
                      : void 0;
                  }
                }
              })
              .filter((e) => e !== void 0),
          }));
        break;
      case `tool`: {
        a = !1;
        let e = [];
        for (let t of s) {
          if (t.type === `tool-approval-response`) continue;
          let n = v(t),
            r = n?.serverToolCallId == null ? void 0 : String(n.serverToolCallId),
            a = n?.serverToolType == null ? void 0 : String(n.serverToolType);
          if (r && a) {
            let e = n?.thoughtSignature == null ? void 0 : String(n.thoughtSignature);
            if (i.length > 0) {
              let n = i[i.length - 1];
              if (n.role === `model`) {
                n.parts.push({
                  toolResponse: {
                    toolType: a,
                    response: t.output.type === `json` ? t.output.value : {},
                    id: r,
                  },
                  thoughtSignature: e,
                });
                continue;
              }
            }
          }
          let o = t.output;
          o.type === `content`
            ? p
              ? _e(e, t.toolName, o.value, t.toolCallId)
              : ve(e, t.toolName, o.value, t.toolCallId)
            : e.push({
                functionResponse: {
                  ...(t.toolCallId == null ? {} : { id: t.toolCallId }),
                  name: t.toolName,
                  response: {
                    name: t.toolName,
                    content:
                      o.type === `execution-denied`
                        ? (o.reason ?? `Tool call execution denied.`)
                        : o.value,
                  },
                },
              });
        }
        i.push({ role: `user`, parts: e });
        break;
      }
    }
  if (s && r.length > 0 && i.length > 0 && i[0].role === `user`) {
    let e = r.map((e) => e.text).join(`

`);
    i[0].parts.unshift({
      text:
        e +
        `

`,
    });
  }
  if (m && l != null) {
    let e = Array.from(new Set(h));
    l({
      type: `other`,
      message: `Replayed ${h.length} \`functionCall\` part(s) for a Gemini 3 model without a \`thoughtSignature\` (tools: ${e.map((e) => `\`${e}\``).join(`, `)}). Injected the documented \`skip_thought_signature_validator\` sentinel to keep the request from failing with HTTP 400. The likely cause is application code that drops \`providerOptions.google.thoughtSignature\` when persisting or serializing assistant tool-call messages. See https://ai.google.dev/gemini-api/docs/thought-signatures.`,
    });
  }
  return { systemInstruction: r.length > 0 && !s ? { parts: r } : void 0, contents: i };
}
function K(e) {
  return e.includes(`/`) ? e : `models/${e}`;
}
var be = A(() =>
  j(
    z({
      responseModalities: L(I([`TEXT`, `IMAGE`])).optional(),
      thinkingConfig: z({
        thinkingBudget: y().optional(),
        includeThoughts: T().optional(),
        thinkingLevel: I([`minimal`, `low`, `medium`, `high`]).optional(),
      }).optional(),
      cachedContent: U().optional(),
      structuredOutputs: T().optional(),
      safetySettings: L(
        z({
          category: I([
            `HARM_CATEGORY_UNSPECIFIED`,
            `HARM_CATEGORY_HATE_SPEECH`,
            `HARM_CATEGORY_DANGEROUS_CONTENT`,
            `HARM_CATEGORY_HARASSMENT`,
            `HARM_CATEGORY_SEXUALLY_EXPLICIT`,
            `HARM_CATEGORY_CIVIC_INTEGRITY`,
          ]),
          threshold: I([
            `HARM_BLOCK_THRESHOLD_UNSPECIFIED`,
            `BLOCK_LOW_AND_ABOVE`,
            `BLOCK_MEDIUM_AND_ABOVE`,
            `BLOCK_ONLY_HIGH`,
            `BLOCK_NONE`,
            `OFF`,
          ]),
        }),
      ).optional(),
      threshold: I([
        `HARM_BLOCK_THRESHOLD_UNSPECIFIED`,
        `BLOCK_LOW_AND_ABOVE`,
        `BLOCK_MEDIUM_AND_ABOVE`,
        `BLOCK_ONLY_HIGH`,
        `BLOCK_NONE`,
        `OFF`,
      ]).optional(),
      audioTimestamp: T().optional(),
      labels: x(U(), U()).optional(),
      mediaResolution: I([
        `MEDIA_RESOLUTION_UNSPECIFIED`,
        `MEDIA_RESOLUTION_LOW`,
        `MEDIA_RESOLUTION_MEDIUM`,
        `MEDIA_RESOLUTION_HIGH`,
      ]).optional(),
      imageConfig: z({
        aspectRatio: I([
          `1:1`,
          `2:3`,
          `3:2`,
          `3:4`,
          `4:3`,
          `4:5`,
          `5:4`,
          `9:16`,
          `16:9`,
          `21:9`,
          `1:8`,
          `8:1`,
          `1:4`,
          `4:1`,
        ]).optional(),
        imageSize: I([`1K`, `2K`, `4K`, `512`]).optional(),
        personGeneration: I([
          `PERSON_GENERATION_UNSPECIFIED`,
          `ALLOW_ALL`,
          `ALLOW_ADULT`,
          `ALLOW_NONE`,
        ]).optional(),
        prominentPeople: I([
          `PROMINENT_PEOPLE_UNSPECIFIED`,
          `ALLOW_PROMINENT_PEOPLE`,
          `BLOCK_PROMINENT_PEOPLE`,
        ]).optional(),
        imageOutputOptions: z({
          mimeType: I([`image/jpeg`, `image/png`]).optional(),
          compressionQuality: y().optional(),
        }).optional(),
      }).optional(),
      retrievalConfig: z({ latLng: z({ latitude: y(), longitude: y() }).optional() }).optional(),
      streamFunctionCallArguments: T().optional(),
      serviceTier: I([`standard`, `flex`, `priority`]).optional(),
      sharedRequestType: I([`priority`, `flex`, `standard`]).optional(),
      requestType: I([`shared`]).optional(),
    }),
  ),
);
function xe({ tools: e, toolChoice: t, modelId: r, isVertexProvider: i = !1 }) {
  e = e?.length ? e : void 0;
  let a = [],
    o = [`gemini-flash-latest`, `gemini-flash-lite-latest`, `gemini-pro-latest`].some(
      (e) => e === r,
    ),
    s = r.includes(`gemini-2`) || r.includes(`gemini-3`) || r.includes(`nano-banana`) || o,
    c = r.includes(`gemini-3`),
    l = r.includes(`gemini-2.5`) || r.includes(`gemini-3`);
  if (e == null) return { tools: void 0, toolConfig: void 0, toolWarnings: a };
  let u = e.some((e) => e.type === `function`),
    d = e.some((e) => e.type === `provider`);
  if (
    (u &&
      d &&
      !c &&
      a.push({
        type: `unsupported`,
        feature: `combination of function and provider-defined tools`,
      }),
    d)
  ) {
    let n = [];
    if (
      (e
        .filter((e) => e.type === `provider`)
        .forEach((e) => {
          switch (e.id) {
            case `google.google_search`:
              s
                ? n.push({ googleSearch: { ...e.args } })
                : a.push({
                    type: `unsupported`,
                    feature: `provider-defined tool ${e.id}`,
                    details: `Google Search requires Gemini 2.0 or newer.`,
                  });
              break;
            case `google.enterprise_web_search`:
              s
                ? n.push({ enterpriseWebSearch: {} })
                : a.push({
                    type: `unsupported`,
                    feature: `provider-defined tool ${e.id}`,
                    details: `Enterprise Web Search requires Gemini 2.0 or newer.`,
                  });
              break;
            case `google.url_context`:
              s
                ? n.push({ urlContext: {} })
                : a.push({
                    type: `unsupported`,
                    feature: `provider-defined tool ${e.id}`,
                    details: `The URL context tool is not supported with other Gemini models than Gemini 2.`,
                  });
              break;
            case `google.code_execution`:
              s
                ? n.push({ codeExecution: {} })
                : a.push({
                    type: `unsupported`,
                    feature: `provider-defined tool ${e.id}`,
                    details: `The code execution tool is not supported with other Gemini models than Gemini 2.`,
                  });
              break;
            case `google.file_search`:
              l
                ? n.push({ fileSearch: { ...e.args } })
                : a.push({
                    type: `unsupported`,
                    feature: `provider-defined tool ${e.id}`,
                    details: `The file search tool is only supported with Gemini 2.5 models and Gemini 3 models.`,
                  });
              break;
            case `google.vertex_rag_store`:
              s
                ? n.push({
                    retrieval: {
                      vertex_rag_store: {
                        rag_resources: { rag_corpus: e.args.ragCorpus },
                        similarity_top_k: e.args.topK,
                      },
                    },
                  })
                : a.push({
                    type: `unsupported`,
                    feature: `provider-defined tool ${e.id}`,
                    details: `The RAG store tool is not supported with other Gemini models than Gemini 2.`,
                  });
              break;
            case `google.google_maps`:
              s
                ? n.push({ googleMaps: {} })
                : a.push({
                    type: `unsupported`,
                    feature: `provider-defined tool ${e.id}`,
                    details: `The Google Maps grounding tool is not supported with Gemini models other than Gemini 2 or newer.`,
                  });
              break;
            default:
              a.push({ type: `unsupported`, feature: `provider-defined tool ${e.id}` });
              break;
          }
        }),
      u && c && n.length > 0)
    ) {
      let r = [];
      for (let t of e)
        t.type === `function` &&
          r.push({ name: t.name, description: t.description ?? ``, parameters: G(t.inputSchema) });
      let o = {
        functionCallingConfig: { mode: `VALIDATED` },
        ...(!i && { includeServerSideToolInvocations: !0 }),
      };
      if (t != null)
        switch (t.type) {
          case `auto`:
            break;
          case `none`:
            o.functionCallingConfig = { mode: `NONE` };
            break;
          case `required`:
            o.functionCallingConfig = { mode: `ANY` };
            break;
          case `tool`:
            o.functionCallingConfig = { mode: `ANY`, allowedFunctionNames: [t.toolName] };
            break;
        }
      return { tools: [...n, { functionDeclarations: r }], toolConfig: o, toolWarnings: a };
    }
    return { tools: n.length > 0 ? n : void 0, toolConfig: void 0, toolWarnings: a };
  }
  let f = [],
    p = !1;
  for (let t of e)
    switch (t.type) {
      case `function`:
        (f.push({ name: t.name, description: t.description ?? ``, parameters: G(t.inputSchema) }),
          t.strict === !0 && (p = !0));
        break;
      default:
        a.push({ type: `unsupported`, feature: `function tool ${t.name}` });
        break;
    }
  if (t == null)
    return {
      tools: [{ functionDeclarations: f }],
      toolConfig: p ? { functionCallingConfig: { mode: `VALIDATED` } } : void 0,
      toolWarnings: a,
    };
  let m = t.type;
  switch (m) {
    case `auto`:
      return {
        tools: [{ functionDeclarations: f }],
        toolConfig: { functionCallingConfig: { mode: p ? `VALIDATED` : `AUTO` } },
        toolWarnings: a,
      };
    case `none`:
      return {
        tools: [{ functionDeclarations: f }],
        toolConfig: { functionCallingConfig: { mode: `NONE` } },
        toolWarnings: a,
      };
    case `required`:
      return {
        tools: [{ functionDeclarations: f }],
        toolConfig: { functionCallingConfig: { mode: p ? `VALIDATED` : `ANY` } },
        toolWarnings: a,
      };
    case `tool`:
      return {
        tools: [{ functionDeclarations: f }],
        toolConfig: {
          functionCallingConfig: {
            mode: p ? `VALIDATED` : `ANY`,
            allowedFunctionNames: [t.toolName],
          },
        },
        toolWarnings: a,
      };
    default:
      throw new n({ functionality: `tool choice type: ${m}` });
  }
}
var Se = class {
  constructor() {
    ((this.accumulatedArgs = {}),
      (this.jsonText = ``),
      (this.pathStack = []),
      (this.stringOpen = !1));
  }
  processPartialArgs(e) {
    let t = ``;
    for (let n of e) {
      let e = n.jsonPath.replace(/^\$\./, ``);
      if (!e) continue;
      let r = Ce(e),
        i = De(this.accumulatedArgs, r);
      if (n.stringValue != null && i !== void 0) {
        let e = JSON.stringify(n.stringValue).slice(1, -1);
        (Oe(this.accumulatedArgs, r, i + n.stringValue), (t += e));
        continue;
      }
      let a = ke(n);
      a != null &&
        (Oe(this.accumulatedArgs, r, a.value), (t += this.emitNavigationTo(r, n, a.json)));
    }
    return ((this.jsonText += t), { currentJSON: this.accumulatedArgs, textDelta: t });
  }
  finalize() {
    let e = JSON.stringify(this.accumulatedArgs);
    return { finalJSON: e, closingDelta: e.slice(this.jsonText.length) };
  }
  ensureRoot() {
    return this.pathStack.length === 0
      ? (this.pathStack.push({ segment: ``, isArray: !1, childCount: 0 }), `{`)
      : ``;
  }
  emitNavigationTo(e, t, n) {
    let r = ``;
    ((this.stringOpen &&= ((r += `"`), !1)), (r += this.ensureRoot()));
    let i = e.slice(0, -1),
      a = e[e.length - 1],
      o = this.findCommonStackDepth(i);
    return (
      (r += this.closeDownTo(o)), (r += this.openDownTo(i, a)), (r += this.emitLeaf(a, t, n)), r
    );
  }
  findCommonStackDepth(e) {
    let t = Math.min(this.pathStack.length - 1, e.length),
      n = 0;
    for (let r = 0; r < t && this.pathStack[r + 1].segment === e[r]; r++) n++;
    return n + 1;
  }
  closeDownTo(e) {
    let t = ``;
    for (; this.pathStack.length > e;) {
      let e = this.pathStack.pop();
      t += e.isArray ? `]` : `}`;
    }
    return t;
  }
  openDownTo(e, t) {
    let n = ``,
      r = this.pathStack.length - 1;
    for (let i = r; i < e.length; i++) {
      let r = e[i],
        a = this.pathStack[this.pathStack.length - 1];
      (a.childCount > 0 && (n += `,`),
        a.childCount++,
        typeof r == `string` && (n += `${JSON.stringify(r)}:`));
      let o = typeof (i + 1 < e.length ? e[i + 1] : t) == `number`;
      ((n += o ? `[` : `{`), this.pathStack.push({ segment: r, isArray: o, childCount: 0 }));
    }
    return n;
  }
  emitLeaf(e, t, n) {
    let r = ``,
      i = this.pathStack[this.pathStack.length - 1];
    return (
      i.childCount > 0 && (r += `,`),
      i.childCount++,
      typeof e == `string` && (r += `${JSON.stringify(e)}:`),
      t.stringValue != null && t.willContinue
        ? ((r += n.slice(0, -1)), (this.stringOpen = !0))
        : (r += n),
      r
    );
  }
};
function Ce(e) {
  let t = [];
  for (let n of e.split(`.`)) {
    let e = n.indexOf(`[`);
    if (e === -1) t.push(n);
    else {
      e > 0 && t.push(n.slice(0, e));
      for (let e of n.matchAll(/\[(\d+)\]/g)) t.push(parseInt(e[1], 10));
    }
  }
  return t;
}
var we = Object.prototype.hasOwnProperty;
function Te(e, t) {
  return we.call(e, t);
}
function Ee(e, t, n) {
  Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 });
}
function De(e, t) {
  let n = e;
  for (let e of t) {
    if (typeof n != `object` || !n) return;
    let t = n;
    if (!Te(t, e)) return;
    n = t[e];
  }
  return n;
}
function Oe(e, t, n) {
  let r = e;
  for (let e = 0; e < t.length - 1; e++) {
    let n = t[e],
      i = t[e + 1];
    ((!Te(r, n) || r[n] == null) && Ee(r, n, typeof i == `number` ? [] : {}), (r = r[n]));
  }
  Ee(r, t[t.length - 1], n);
}
function ke(e) {
  let t = e.stringValue ?? e.numberValue ?? e.boolValue;
  if (t != null) return { value: t, json: JSON.stringify(t) };
  if (`nullValue` in e) return { value: null, json: `null` };
}
function Ae({ finishReason: e, hasToolCalls: t }) {
  switch (e) {
    case `STOP`:
      return t ? `tool-calls` : `stop`;
    case `MAX_TOKENS`:
      return `length`;
    case `IMAGE_SAFETY`:
    case `RECITATION`:
    case `SAFETY`:
    case `BLOCKLIST`:
    case `PROHIBITED_CONTENT`:
    case `SPII`:
      return `content-filter`;
    case `MALFORMED_FUNCTION_CALL`:
      return `error`;
    default:
      return `other`;
  }
}
var je = [
    `HARM_CATEGORY_HATE_SPEECH`,
    `HARM_CATEGORY_DANGEROUS_CONTENT`,
    `HARM_CATEGORY_HARASSMENT`,
    `HARM_CATEGORY_SEXUALLY_EXPLICIT`,
  ],
  Me = class e {
    constructor(e, t) {
      ((this.specificationVersion = `v4`),
        (this.modelId = e),
        (this.config = t),
        (this.generateId = t.generateId ?? H));
    }
    static [k](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [P](t) {
      return new e(t.modelId, t.config);
    }
    get provider() {
      return this.config.provider;
    }
    get supportedUrls() {
      var e;
      return (e = this.config).supportedUrls?.call(e) ?? {};
    }
    async getArgs(
      {
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        topK: i,
        frequencyPenalty: a,
        presencePenalty: o,
        stopSequences: s,
        responseFormat: c,
        seed: l,
        tools: u,
        toolChoice: d,
        reasoning: f,
        providerOptions: p,
      },
      { isStreaming: h = !1 } = {},
    ) {
      let g = [],
        _ = this.config.provider.includes(`vertex`) ? [`googleVertex`, `vertex`] : [`google`],
        v;
      for (let e of _)
        if (((v = await m({ provider: e, providerOptions: p, schema: be })), v != null)) break;
      v == null &&
        !_.includes(`google`) &&
        (v = await m({ provider: `google`, providerOptions: p, schema: be }));
      let y = this.config.provider.startsWith(`google.vertex.`);
      (u?.some((e) => e.type === `provider` && e.id === `google.vertex_rag_store`) &&
        !y &&
        g.push({
          type: `other`,
          message: `The 'vertex_rag_store' tool is only supported with the Google Vertex provider and might not be supported or could behave unexpectedly with the current Google provider (${this.config.provider}).`,
        }),
        v?.streamFunctionCallArguments &&
          !y &&
          g.push({
            type: `other`,
            message: `'streamFunctionCallArguments' is only supported on the Vertex AI API and will be ignored with the current Google provider (${this.config.provider}). See https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling#streaming-fc`,
          }),
        v?.serviceTier &&
          y &&
          g.push({
            type: `other`,
            message: `'serviceTier' is a Gemini API option and is not supported on Vertex AI. Use 'sharedRequestType' (and optionally 'requestType') instead. See https://docs.cloud.google.com/vertex-ai/generative-ai/docs/priority-paygo`,
          }),
        (v?.sharedRequestType || v?.requestType) &&
          !y &&
          g.push({
            type: `other`,
            message: `'sharedRequestType' and 'requestType' are Vertex AI options and are ignored with the current Google provider (${this.config.provider}).`,
          }));
      let b =
          y && (v?.sharedRequestType || v?.requestType)
            ? {
                ...(v.sharedRequestType && {
                  "X-Vertex-AI-LLM-Shared-Request-Type": v.sharedRequestType,
                }),
                ...(v.requestType && { "X-Vertex-AI-LLM-Request-Type": v.requestType }),
              }
            : void 0,
        x = y ? void 0 : v?.serviceTier,
        S = v?.imageConfig;
      if (S != null && !y) {
        let { personGeneration: e, prominentPeople: t, imageOutputOptions: n, ...r } = S,
          i = Object.entries({ personGeneration: e, prominentPeople: t, imageOutputOptions: n })
            .filter(([, e]) => e != null)
            .map(([e]) => `'imageConfig.${e}'`);
        i.length > 0 &&
          (g.push({
            type: `other`,
            message: `${i.join(`, `)} ${i.length === 1 ? `is a Vertex AI option and is` : `are Vertex AI options and are`} ignored with the current Google provider (${this.config.provider}).`,
          }),
          (S = r));
      }
      let C = this.modelId.toLowerCase().startsWith(`gemma-`),
        w = /^gemini-3[.-]/.test(this.modelId),
        { contents: T, systemInstruction: E } = ye(e, {
          isGemmaModel: C,
          isGemini3Model: w,
          onWarning: (e) => g.push(e),
          providerOptionsNames: _,
          supportsFunctionResponseParts: w,
        }),
        {
          tools: D,
          toolConfig: O,
          toolWarnings: k,
        } = xe({ tools: u, toolChoice: d, modelId: this.modelId, isVertexProvider: y }),
        A = Ie({ reasoning: f, modelId: this.modelId, warnings: g }),
        ee = v?.thinkingConfig || A ? { ...A, ...v?.thinkingConfig } : void 0,
        te = h && y ? (v?.streamFunctionCallArguments ?? !1) : void 0,
        j = v?.threshold,
        ne =
          v?.safetySettings ??
          (j == null ? void 0 : je.map((e) => ({ category: e, threshold: j }))),
        M =
          O || te || v?.retrievalConfig
            ? {
                ...O,
                ...(te && {
                  functionCallingConfig: {
                    ...O?.functionCallingConfig,
                    streamFunctionCallArguments: !0,
                  },
                }),
                ...(v?.retrievalConfig && { retrievalConfig: v.retrievalConfig }),
              }
            : void 0;
      return {
        args: {
          generationConfig: {
            maxOutputTokens: t,
            temperature: n,
            topK: i,
            topP: r,
            frequencyPenalty: a,
            presencePenalty: o,
            stopSequences: s,
            seed: l,
            responseMimeType: c?.type === `json` ? `application/json` : void 0,
            responseSchema:
              c?.type === `json` && c.schema != null && (v?.structuredOutputs ?? !0)
                ? G(c.schema)
                : void 0,
            ...(v?.audioTimestamp && { audioTimestamp: v.audioTimestamp }),
            responseModalities: v?.responseModalities,
            thinkingConfig: ee,
            ...(v?.mediaResolution && { mediaResolution: v.mediaResolution }),
            ...(S && { imageConfig: S }),
          },
          contents: T,
          systemInstruction: C ? void 0 : E,
          safetySettings: ne,
          tools: D,
          toolConfig: M,
          cachedContent: v?.cachedContent,
          labels: v?.labels,
          serviceTier: x,
        },
        warnings: [...g, ...k],
        providerOptionsNames: _,
        extraHeaders: b,
      };
    }
    async doGenerate(e) {
      let {
          args: t,
          warnings: n,
          providerOptionsNames: i,
          extraHeaders: a,
        } = await this.getArgs(e),
        o = (e) => Object.fromEntries(i.map((t) => [t, e])),
        s = N(this.config.headers ? await v(this.config.headers) : void 0, e.headers, a),
        {
          responseHeaders: c,
          value: l,
          rawValue: u,
        } = await r({
          url: `${this.config.baseURL}/${K(this.modelId)}:generateContent`,
          headers: s,
          body: t,
          failedResponseHandler: W,
          successfulResponseHandler: M(Ke),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        d = l.candidates[0],
        f = [],
        p = d.content?.parts ?? [],
        m = l.usageMetadata,
        h,
        g;
      for (let e of p)
        if (`executableCode` in e && e.executableCode?.code) {
          let t = this.config.generateId();
          ((h = t),
            f.push({
              type: `tool-call`,
              toolCallId: t,
              toolName: `code_execution`,
              input: JSON.stringify(e.executableCode),
              providerExecuted: !0,
            }));
        } else if (`codeExecutionResult` in e && e.codeExecutionResult)
          f.push({
            type: `tool-result`,
            toolCallId: h,
            toolName: `code_execution`,
            result: {
              outcome: e.codeExecutionResult.outcome,
              output: e.codeExecutionResult.output ?? ``,
            },
          });
        else if (`text` in e && e.text != null) {
          let t = e.thoughtSignature ? o({ thoughtSignature: e.thoughtSignature }) : void 0;
          if (e.text.length === 0) {
            if (t != null && f.length > 0) {
              let e = f[f.length - 1];
              e.providerMetadata = t;
            }
          } else
            f.push({
              type: e.thought === !0 ? `reasoning` : `text`,
              text: e.text,
              providerMetadata: t,
            });
        } else if (`functionCall` in e && e.functionCall.name != null)
          f.push({
            type: `tool-call`,
            toolCallId: e.functionCall.id ?? this.config.generateId(),
            toolName: e.functionCall.name,
            input: JSON.stringify(e.functionCall.args ?? {}),
            providerMetadata: e.thoughtSignature
              ? o({ thoughtSignature: e.thoughtSignature })
              : void 0,
          });
        else if (`inlineData` in e) {
          let t = e.thought === !0,
            n = !!e.thoughtSignature;
          f.push({
            type: t ? `reasoning-file` : `file`,
            data: { type: `data`, data: e.inlineData.data },
            mediaType: e.inlineData.mimeType,
            providerMetadata: n ? o({ thoughtSignature: e.thoughtSignature }) : void 0,
          });
        } else if (`toolCall` in e && e.toolCall) {
          let t = e.toolCall.id ?? this.config.generateId();
          ((g = t),
            f.push({
              type: `tool-call`,
              toolCallId: t,
              toolName: `server:${e.toolCall.toolType}`,
              input: JSON.stringify(e.toolCall.args ?? {}),
              providerExecuted: !0,
              dynamic: !0,
              providerMetadata: e.thoughtSignature
                ? o({
                    thoughtSignature: e.thoughtSignature,
                    serverToolCallId: t,
                    serverToolType: e.toolCall.toolType,
                  })
                : o({ serverToolCallId: t, serverToolType: e.toolCall.toolType }),
            }));
        } else if (`toolResponse` in e && e.toolResponse) {
          let t = g ?? e.toolResponse.id ?? this.config.generateId();
          (f.push({
            type: `tool-result`,
            toolCallId: t,
            toolName: `server:${e.toolResponse.toolType}`,
            result: e.toolResponse.response ?? {},
            providerMetadata: e.thoughtSignature
              ? o({
                  thoughtSignature: e.thoughtSignature,
                  serverToolCallId: t,
                  serverToolType: e.toolResponse.toolType,
                })
              : o({ serverToolCallId: t, serverToolType: e.toolResponse.toolType }),
          }),
            (g = void 0));
        }
      let _ =
        ze({ groundingMetadata: d.groundingMetadata, generateId: this.config.generateId }) ?? [];
      for (let e of _) f.push(e);
      return {
        content: f,
        finishReason: {
          unified: Ae({
            finishReason: d.finishReason,
            hasToolCalls: f.some((e) => e.type === `tool-call` && !e.providerExecuted),
          }),
          raw: d.finishReason ?? void 0,
        },
        usage: de(m),
        warnings: n,
        providerMetadata: o({
          promptFeedback: l.promptFeedback ?? null,
          groundingMetadata: d.groundingMetadata ?? null,
          urlContextMetadata: d.urlContextMetadata ?? null,
          safetyRatings: d.safetyRatings ?? null,
          usageMetadata: m ?? null,
          finishMessage: d.finishMessage ?? null,
          serviceTier: m?.serviceTier ?? null,
        }),
        request: { body: t },
        response: { id: l.responseId ?? void 0, headers: c, body: u },
      };
    }
    async doStream(e) {
      let {
          args: t,
          warnings: n,
          providerOptionsNames: i,
          extraHeaders: a,
        } = await this.getArgs(e, { isStreaming: !0 }),
        o = (e) => Object.fromEntries(i.map((t) => [t, e])),
        s = N(this.config.headers ? await v(this.config.headers) : void 0, e.headers, a),
        { responseHeaders: c, value: l } = await r({
          url: `${this.config.baseURL}/${K(this.modelId)}:streamGenerateContent?alt=sse`,
          headers: s,
          body: t,
          failedResponseHandler: W,
          successfulResponseHandler: S(qe),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        u = { unified: `other`, raw: void 0 },
        d,
        f,
        p = null,
        m = null,
        h = this.config.generateId,
        g = !1,
        _ = !1,
        y = null,
        b = null,
        x = 0,
        C = new Set(),
        w,
        T,
        E = [],
        D = (e) => {
          let t = E.pop();
          if (t == null) return;
          let { finalJSON: n, closingDelta: r } = t.accumulator.finalize();
          (r.length > 0 &&
            e.enqueue({
              type: `tool-input-delta`,
              id: t.toolCallId,
              delta: r,
              providerMetadata: t.providerMetadata,
            }),
            e.enqueue({
              type: `tool-input-end`,
              id: t.toolCallId,
              providerMetadata: t.providerMetadata,
            }),
            e.enqueue({
              type: `tool-call`,
              toolCallId: t.toolCallId,
              toolName: t.toolName,
              input: n,
              providerMetadata: t.providerMetadata,
            }),
            (g = !0));
        };
      return {
        stream: l.pipeThrough(
          new TransformStream({
            start(e) {
              e.enqueue({ type: `stream-start`, warnings: n });
            },
            transform(t, n) {
              if (
                (e.includeRawChunks && n.enqueue({ type: `raw`, rawValue: t.rawValue }), !t.success)
              ) {
                n.enqueue({ type: `error`, error: t.error });
                return;
              }
              let r = t.value;
              !_ &&
                r.responseId != null &&
                ((_ = !0), n.enqueue({ type: `response-metadata`, id: r.responseId }));
              let i = r.usageMetadata;
              i != null && (d = i);
              let a = r.candidates?.[0];
              if (a == null) return;
              let s = a.content;
              (a.groundingMetadata != null && (p = a.groundingMetadata),
                a.urlContextMetadata != null && (m = a.urlContextMetadata));
              let c = ze({ groundingMetadata: a.groundingMetadata, generateId: h });
              if (c != null)
                for (let e of c)
                  e.sourceType === `url` && !C.has(e.url) && (C.add(e.url), n.enqueue(e));
              if (s != null) {
                let e = s.parts ?? [];
                for (let t of e)
                  if (`executableCode` in t && t.executableCode?.code) {
                    let e = h();
                    ((w = e),
                      n.enqueue({
                        type: `tool-call`,
                        toolCallId: e,
                        toolName: `code_execution`,
                        input: JSON.stringify(t.executableCode),
                        providerExecuted: !0,
                      }));
                  } else if (`codeExecutionResult` in t && t.codeExecutionResult) {
                    let e = w;
                    e &&
                      n.enqueue({
                        type: `tool-result`,
                        toolCallId: e,
                        toolName: `code_execution`,
                        result: {
                          outcome: t.codeExecutionResult.outcome,
                          output: t.codeExecutionResult.output ?? ``,
                        },
                      });
                  } else if (`text` in t && t.text != null) {
                    let e = t.thoughtSignature
                      ? o({ thoughtSignature: t.thoughtSignature })
                      : void 0;
                    t.text.length === 0
                      ? e != null &&
                        y !== null &&
                        n.enqueue({ type: `text-delta`, id: y, delta: ``, providerMetadata: e })
                      : t.thought === !0
                        ? (y !== null && (n.enqueue({ type: `text-end`, id: y }), (y = null)),
                          b === null &&
                            ((b = String(x++)),
                            n.enqueue({ type: `reasoning-start`, id: b, providerMetadata: e })),
                          n.enqueue({
                            type: `reasoning-delta`,
                            id: b,
                            delta: t.text,
                            providerMetadata: e,
                          }))
                        : (b !== null && (n.enqueue({ type: `reasoning-end`, id: b }), (b = null)),
                          y === null &&
                            ((y = String(x++)),
                            n.enqueue({ type: `text-start`, id: y, providerMetadata: e })),
                          n.enqueue({
                            type: `text-delta`,
                            id: y,
                            delta: t.text,
                            providerMetadata: e,
                          }));
                  } else if (`inlineData` in t) {
                    (y !== null && (n.enqueue({ type: `text-end`, id: y }), (y = null)),
                      b !== null && (n.enqueue({ type: `reasoning-end`, id: b }), (b = null)));
                    let e = t.thought === !0,
                      r = t.thoughtSignature ? o({ thoughtSignature: t.thoughtSignature }) : void 0;
                    n.enqueue({
                      type: e ? `reasoning-file` : `file`,
                      mediaType: t.inlineData.mimeType,
                      data: { type: `data`, data: t.inlineData.data },
                      providerMetadata: r,
                    });
                  } else if (`toolCall` in t && t.toolCall) {
                    let e = t.toolCall.id ?? h();
                    T = e;
                    let r = o({
                      ...(t.thoughtSignature ? { thoughtSignature: t.thoughtSignature } : {}),
                      serverToolCallId: e,
                      serverToolType: t.toolCall.toolType,
                    });
                    n.enqueue({
                      type: `tool-call`,
                      toolCallId: e,
                      toolName: `server:${t.toolCall.toolType}`,
                      input: JSON.stringify(t.toolCall.args ?? {}),
                      providerExecuted: !0,
                      dynamic: !0,
                      providerMetadata: r,
                    });
                  } else if (`toolResponse` in t && t.toolResponse) {
                    let e = T ?? t.toolResponse.id ?? h(),
                      r = o({
                        ...(t.thoughtSignature ? { thoughtSignature: t.thoughtSignature } : {}),
                        serverToolCallId: e,
                        serverToolType: t.toolResponse.toolType,
                      });
                    (n.enqueue({
                      type: `tool-result`,
                      toolCallId: e,
                      toolName: `server:${t.toolResponse.toolType}`,
                      result: t.toolResponse.response ?? {},
                      providerMetadata: r,
                    }),
                      (T = void 0));
                  }
                for (let t of e) {
                  if (!(`functionCall` in t)) continue;
                  let e = t.thoughtSignature ? o({ thoughtSignature: t.thoughtSignature }) : void 0,
                    r =
                      t.functionCall.partialArgs != null ||
                      (t.functionCall.name != null && t.functionCall.willContinue === !0),
                    i =
                      t.functionCall.name == null &&
                      t.functionCall.args == null &&
                      t.functionCall.partialArgs == null &&
                      t.functionCall.willContinue == null,
                    a =
                      t.functionCall.name != null &&
                      t.functionCall.args != null &&
                      t.functionCall.partialArgs == null,
                    s =
                      t.functionCall.name != null &&
                      t.functionCall.args == null &&
                      t.functionCall.partialArgs == null &&
                      t.functionCall.willContinue !== !0;
                  if (r) {
                    if (t.functionCall.name != null) {
                      let r = t.functionCall.id ?? h(),
                        i = new Se();
                      if (
                        (E.push({
                          toolCallId: r,
                          toolName: t.functionCall.name,
                          accumulator: i,
                          providerMetadata: e,
                        }),
                        n.enqueue({
                          type: `tool-input-start`,
                          id: r,
                          toolName: t.functionCall.name,
                          providerMetadata: e,
                        }),
                        t.functionCall.partialArgs != null)
                      ) {
                        let a = t.functionCall.partialArgs,
                          { textDelta: o } = i.processPartialArgs(a);
                        (o.length > 0 &&
                          n.enqueue({
                            type: `tool-input-delta`,
                            id: r,
                            delta: o,
                            providerMetadata: e,
                          }),
                          t.functionCall.willContinue !== !0 &&
                            a.every((e) => e.willContinue !== !0) &&
                            D(n));
                      }
                    } else if (t.functionCall.partialArgs != null && E.length > 0) {
                      let r = E[E.length - 1],
                        i = t.functionCall.partialArgs,
                        { textDelta: a } = r.accumulator.processPartialArgs(i);
                      (a.length > 0 &&
                        n.enqueue({
                          type: `tool-input-delta`,
                          id: r.toolCallId,
                          delta: a,
                          providerMetadata: e,
                        }),
                        t.functionCall.willContinue !== !0 &&
                          i.every((e) => e.willContinue !== !0) &&
                          D(n));
                    }
                  } else if (i && E.length > 0) D(n);
                  else if (a) {
                    let r = t.functionCall.id ?? h(),
                      i = t.functionCall.name,
                      a =
                        typeof t.functionCall.args == `string`
                          ? t.functionCall.args
                          : JSON.stringify(t.functionCall.args ?? {});
                    (n.enqueue({
                      type: `tool-input-start`,
                      id: r,
                      toolName: i,
                      providerMetadata: e,
                    }),
                      n.enqueue({ type: `tool-input-delta`, id: r, delta: a, providerMetadata: e }),
                      n.enqueue({ type: `tool-input-end`, id: r, providerMetadata: e }),
                      n.enqueue({
                        type: `tool-call`,
                        toolCallId: r,
                        toolName: i,
                        input: a,
                        providerMetadata: e,
                      }),
                      (g = !0));
                  } else if (s) {
                    let r = t.functionCall.id ?? h(),
                      i = t.functionCall.name;
                    (n.enqueue({
                      type: `tool-input-start`,
                      id: r,
                      toolName: i,
                      providerMetadata: e,
                    }),
                      n.enqueue({ type: `tool-input-end`, id: r, providerMetadata: e }),
                      n.enqueue({
                        type: `tool-call`,
                        toolCallId: r,
                        toolName: i,
                        input: `{}`,
                        providerMetadata: e,
                      }),
                      (g = !0));
                  }
                }
              }
              a.finishReason != null &&
                ((u = {
                  unified: Ae({ finishReason: a.finishReason, hasToolCalls: g }),
                  raw: a.finishReason,
                }),
                (f = o({
                  promptFeedback: r.promptFeedback ?? null,
                  groundingMetadata: p,
                  urlContextMetadata: m,
                  safetyRatings: a.safetyRatings ?? null,
                  usageMetadata: i ?? null,
                  finishMessage: a.finishMessage ?? null,
                  serviceTier: d?.serviceTier ?? null,
                })));
            },
            flush(e) {
              (y !== null && e.enqueue({ type: `text-end`, id: y }),
                b !== null && e.enqueue({ type: `reasoning-end`, id: b }),
                e.enqueue({ type: `finish`, finishReason: u, usage: de(d), providerMetadata: f }));
            },
          }),
        ),
        response: { headers: c },
        request: { body: t },
      };
    }
  };
function Ne(e) {
  return /gemini-3[\.\-]/i.test(e) || /gemini-3$/i.test(e);
}
function Pe() {
  return 65536;
}
function Fe(e) {
  let t = e.toLowerCase();
  return t.includes(`2.5-pro`) || t.includes(`gemini-3-pro-image`) ? 32768 : 24576;
}
function Ie({ reasoning: e, modelId: t, warnings: n }) {
  if (s(e))
    return Ne(t) && !t.includes(`gemini-3-pro-image`)
      ? Le({ reasoning: e, warnings: n })
      : Re({ reasoning: e, modelId: t, warnings: n });
}
function Le({ reasoning: e, warnings: t }) {
  if (e === `none`) return { thinkingLevel: `minimal` };
  let n = c({
    reasoning: e,
    effortMap: { minimal: `minimal`, low: `low`, medium: `medium`, high: `high`, xhigh: `high` },
    warnings: t,
  });
  if (n != null) return { thinkingLevel: n };
}
function Re({ reasoning: e, modelId: t, warnings: n }) {
  if (e === `none`) return { thinkingBudget: 0 };
  let r = p({
    reasoning: e,
    maxOutputTokens: Pe(),
    maxReasoningBudget: Fe(t),
    minReasoningBudget: 0,
    warnings: n,
  });
  if (r != null) return { thinkingBudget: r };
}
function ze({ groundingMetadata: e, generateId: t }) {
  if (!e?.groundingChunks) return;
  let n = [];
  for (let r of e.groundingChunks)
    if (r.web != null)
      n.push({
        type: `source`,
        sourceType: `url`,
        id: t(),
        url: r.web.uri,
        title: r.web.title ?? void 0,
      });
    else if (r.image != null)
      n.push({
        type: `source`,
        sourceType: `url`,
        id: t(),
        url: r.image.sourceUri,
        title: r.image.title ?? void 0,
      });
    else if (r.retrievedContext != null) {
      let e = r.retrievedContext.uri,
        i = r.retrievedContext.fileSearchStore;
      if (e && (e.startsWith(`http://`) || e.startsWith(`https://`)))
        n.push({
          type: `source`,
          sourceType: `url`,
          id: t(),
          url: e,
          title: r.retrievedContext.title ?? void 0,
        });
      else if (e) {
        let i = r.retrievedContext.title ?? `Unknown Document`,
          a = `application/octet-stream`,
          o;
        (e.endsWith(`.pdf`)
          ? ((a = `application/pdf`), (o = e.split(`/`).pop()))
          : e.endsWith(`.txt`)
            ? ((a = `text/plain`), (o = e.split(`/`).pop()))
            : e.endsWith(`.docx`)
              ? ((a = `application/vnd.openxmlformats-officedocument.wordprocessingml.document`),
                (o = e.split(`/`).pop()))
              : e.endsWith(`.doc`)
                ? ((a = `application/msword`), (o = e.split(`/`).pop()))
                : (e.match(/\.(md|markdown)$/) && (a = `text/markdown`), (o = e.split(`/`).pop())),
          n.push({
            type: `source`,
            sourceType: `document`,
            id: t(),
            mediaType: a,
            title: i,
            filename: o,
          }));
      } else if (i) {
        let e = r.retrievedContext.title ?? `Unknown Document`;
        n.push({
          type: `source`,
          sourceType: `document`,
          id: t(),
          mediaType: `application/octet-stream`,
          title: e,
          filename: i.split(`/`).pop(),
        });
      }
    } else
      r.maps != null &&
        r.maps.uri &&
        n.push({
          type: `source`,
          sourceType: `url`,
          id: t(),
          url: r.maps.uri,
          title: r.maps.title ?? void 0,
        });
  return n.length > 0 ? n : void 0;
}
var Be = () =>
    z({
      webSearchQueries: L(U()).nullish(),
      imageSearchQueries: L(U()).nullish(),
      retrievalQueries: L(U()).nullish(),
      searchEntryPoint: z({ renderedContent: U() }).nullish(),
      groundingChunks: L(
        z({
          web: z({ uri: U(), title: U().nullish() }).nullish(),
          image: z({
            sourceUri: U(),
            imageUri: U(),
            title: U().nullish(),
            domain: U().nullish(),
          }).nullish(),
          retrievedContext: z({
            uri: U().nullish(),
            title: U().nullish(),
            text: U().nullish(),
            fileSearchStore: U().nullish(),
          }).nullish(),
          maps: z({
            uri: U().nullish(),
            title: U().nullish(),
            text: U().nullish(),
            placeId: U().nullish(),
          }).nullish(),
        }),
      ).nullish(),
      groundingSupports: L(
        z({
          segment: z({
            startIndex: y().nullish(),
            endIndex: y().nullish(),
            text: U().nullish(),
          }).nullish(),
          segment_text: U().nullish(),
          groundingChunkIndices: L(y()).nullish(),
          supportChunkIndices: L(y()).nullish(),
          confidenceScores: L(y()).nullish(),
          confidenceScore: L(y()).nullish(),
        }),
      ).nullish(),
      retrievalMetadata: a([z({ webDynamicRetrievalScore: y() }), z({})]).nullish(),
    }),
  Ve = z({
    jsonPath: U(),
    stringValue: U().nullish(),
    numberValue: y().nullish(),
    boolValue: T().nullish(),
    nullValue: V().nullish(),
    willContinue: T().nullish(),
  }),
  He = () =>
    z({
      parts: L(
        a([
          z({
            functionCall: z({
              id: U().nullish(),
              name: U().nullish(),
              args: V().nullish(),
              partialArgs: L(Ve).nullish(),
              willContinue: T().nullish(),
            }),
            thoughtSignature: U().nullish(),
          }),
          z({
            inlineData: z({ mimeType: U(), data: U() }),
            thought: T().nullish(),
            thoughtSignature: U().nullish(),
          }),
          z({
            toolCall: z({ toolType: U(), args: V().nullish(), id: U() }),
            thoughtSignature: U().nullish(),
          }),
          z({
            toolResponse: z({ toolType: U(), response: V().nullish(), id: U() }),
            thoughtSignature: U().nullish(),
          }),
          z({
            executableCode: z({ language: U(), code: U() }).nullish(),
            codeExecutionResult: z({ outcome: U(), output: U().nullish() }).nullish(),
            text: U().nullish(),
            thought: T().nullish(),
            thoughtSignature: U().nullish(),
          }),
        ]),
      ).nullish(),
    }),
  q = () =>
    z({
      category: U().nullish(),
      probability: U().nullish(),
      probabilityScore: y().nullish(),
      severity: U().nullish(),
      severityScore: y().nullish(),
      blocked: T().nullish(),
    }),
  Ue = L(z({ modality: U(), tokenCount: y() })).nullish(),
  We = z({
    cachedContentTokenCount: y().nullish(),
    thoughtsTokenCount: y().nullish(),
    promptTokenCount: y().nullish(),
    candidatesTokenCount: y().nullish(),
    totalTokenCount: y().nullish(),
    trafficType: U().nullish(),
    serviceTier: U().nullish(),
    promptTokensDetails: Ue,
    candidatesTokensDetails: Ue,
  }),
  Ge = () => z({ urlMetadata: L(z({ retrievedUrl: U(), urlRetrievalStatus: U() })).nullish() }),
  Ke = A(() =>
    j(
      z({
        responseId: U().nullish(),
        candidates: L(
          z({
            content: He().nullish().or(z({}).strict()),
            finishReason: U().nullish(),
            finishMessage: U().nullish(),
            safetyRatings: L(q()).nullish(),
            groundingMetadata: Be().nullish(),
            urlContextMetadata: Ge().nullish(),
          }),
        ),
        usageMetadata: We.nullish(),
        promptFeedback: z({
          blockReason: U().nullish(),
          safetyRatings: L(q()).nullish(),
        }).nullish(),
      }),
    ),
  ),
  qe = A(() =>
    j(
      z({
        responseId: U().nullish(),
        candidates: L(
          z({
            content: He().nullish(),
            finishReason: U().nullish(),
            finishMessage: U().nullish(),
            safetyRatings: L(q()).nullish(),
            groundingMetadata: Be().nullish(),
            urlContextMetadata: Ge().nullish(),
          }),
        ).nullish(),
        usageMetadata: We.nullish(),
        promptFeedback: z({
          blockReason: U().nullish(),
          safetyRatings: L(q()).nullish(),
        }).nullish(),
      }),
    ),
  ),
  Je = E({
    id: `google.code_execution`,
    inputSchema: z({
      language: U().describe(`The programming language of the code.`),
      code: U().describe(`The code to be executed.`),
    }),
    outputSchema: z({
      outcome: U().describe(`The outcome of the execution (e.g., "OUTCOME_OK").`),
      output: U().describe(`The output from the code execution.`),
    }),
  }),
  Ye = E({
    id: `google.enterprise_web_search`,
    inputSchema: A(() => j(z({}))),
    outputSchema: A(() => j(z({}))),
  });
D({
  fileSearchStoreNames: L(U()).describe(
    "The names of the file_search_stores to retrieve from. Example: `fileSearchStores/my-file-search-store-123`",
  ),
  topK: y()
    .int()
    .positive()
    .describe(`The number of file search retrieval chunks to retrieve.`)
    .optional(),
  metadataFilter: U()
    .describe(
      `Metadata filter to apply to the file search retrieval documents. See https://google.aip.dev/160 for the syntax of the filter expression.`,
    )
    .optional(),
});
var Xe = E({
    id: `google.file_search`,
    inputSchema: A(() => j(z({}))),
    outputSchema: A(() => j(z({}))),
  }),
  Ze = E({
    id: `google.google_maps`,
    inputSchema: A(() => j(z({}))),
    outputSchema: A(() => j(z({}))),
  }),
  Qe = D({
    searchTypes: z({ webSearch: z({}).optional(), imageSearch: z({}).optional() }).optional(),
    timeRangeFilter: z({ startTime: U(), endTime: U() }).optional(),
  }),
  $e = {
    googleSearch: E({
      id: `google.google_search`,
      inputSchema: A(() => j(z({}))),
      outputSchema: A(() => j(z({}))),
    }),
    enterpriseWebSearch: Ye,
    googleMaps: Ze,
    urlContext: E({
      id: `google.url_context`,
      inputSchema: A(() => j(z({}))),
      outputSchema: A(() => j(z({}))),
    }),
    fileSearch: Xe,
    codeExecution: Je,
    vertexRagStore: E({
      id: `google.vertex_rag_store`,
      inputSchema: A(() => j(z({}))),
      outputSchema: A(() => j(z({}))),
    }),
  },
  et = A(() =>
    j(
      z({
        personGeneration: I([`dont_allow`, `allow_adult`, `allow_all`]).nullish(),
        aspectRatio: I([`1:1`, `3:4`, `4:3`, `9:16`, `16:9`]).nullish(),
        googleSearch: Qe.optional(),
      }),
    ),
  ),
  tt = class e {
    constructor(e, t, n) {
      ((this.modelId = e),
        (this.settings = t),
        (this.config = n),
        (this.specificationVersion = `v4`));
    }
    static [k](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [P](t) {
      return new e(t.modelId, {}, t.config);
    }
    get maxImagesPerCall() {
      return this.settings.maxImagesPerCall == null
        ? nt(this.modelId)
          ? 10
          : 4
        : this.settings.maxImagesPerCall;
    }
    get provider() {
      return this.config.provider;
    }
    async doGenerate(e) {
      return nt(this.modelId) ? this.doGenerateGemini(e) : this.doGenerateImagen(e);
    }
    async doGenerateImagen(e) {
      var t;
      let {
          prompt: n,
          n: i = 1,
          size: a,
          aspectRatio: o = `1:1`,
          seed: s,
          providerOptions: c,
          headers: l,
          abortSignal: u,
          files: d,
          mask: f,
        } = e,
        p = [];
      if (d != null && d.length > 0)
        throw Error(
          `Google Gemini API does not support image editing with Imagen models. Use Google Vertex AI (@ai-sdk/google-vertex) for image editing capabilities.`,
        );
      if (f != null)
        throw Error(
          `Google Gemini API does not support image editing with masks. Use Google Vertex AI (@ai-sdk/google-vertex) for image editing capabilities.`,
        );
      (a != null &&
        p.push({
          type: `unsupported`,
          feature: `size`,
          details: "This model does not support the `size` option. Use `aspectRatio` instead.",
        }),
        s != null &&
          p.push({
            type: `unsupported`,
            feature: `seed`,
            details: "This model does not support the `seed` option through this provider.",
          }));
      let h = await m({ provider: `google`, providerOptions: c, schema: et }),
        g = (t = this.config._internal)?.currentDate?.call(t) ?? new Date(),
        _ = { sampleCount: i };
      if ((o != null && (_.aspectRatio = o), h)) {
        let { googleSearch: e, ...t } = h;
        (e != null &&
          p.push({
            type: `unsupported`,
            feature: `googleSearch`,
            details: `Google Search grounding is only supported on Gemini image models.`,
          }),
          Object.assign(_, t));
      }
      let y = { instances: [{ prompt: n }], parameters: _ },
        { responseHeaders: b, value: x } = await r({
          url: `${this.config.baseURL}/models/${this.modelId}:predict`,
          headers: N(this.config.headers ? await v(this.config.headers) : void 0, l),
          body: y,
          failedResponseHandler: W,
          successfulResponseHandler: M(rt),
          abortSignal: u,
          fetch: this.config.fetch,
        });
      return {
        images: x.predictions.map((e) => e.bytesBase64Encoded),
        warnings: p,
        providerMetadata: { google: { images: x.predictions.map(() => ({})) } },
        response: { timestamp: g, modelId: this.modelId, headers: b },
      };
    }
    async doGenerateGemini(e) {
      var t;
      let {
          prompt: n,
          n: r,
          size: i,
          aspectRatio: a,
          seed: o,
          providerOptions: s,
          headers: c,
          abortSignal: l,
          files: u,
          mask: d,
        } = e,
        f = [];
      if (d != null) throw Error(`Gemini image models do not support mask-based image editing.`);
      if (r != null && r > 1)
        throw Error(
          `Gemini image models do not support generating a set number of images per call. Use n=1 or omit the n parameter.`,
        );
      i != null &&
        f.push({
          type: `unsupported`,
          feature: `size`,
          details: "This model does not support the `size` option. Use `aspectRatio` instead.",
        });
      let p = [];
      if ((n != null && p.push({ type: `text`, text: n }), u != null && u.length > 0))
        for (let e of u)
          e.type === `url`
            ? p.push({
                type: `file`,
                data: { type: `url`, url: new URL(e.url) },
                mediaType: `image/*`,
              })
            : p.push({
                type: `file`,
                data: {
                  type: `data`,
                  data: typeof e.data == `string` ? e.data : new Uint8Array(e.data),
                },
                mediaType: e.mediaType,
              });
      let h = [{ role: `user`, content: p }],
        g = await m({ provider: `google`, providerOptions: s, schema: et }),
        { googleSearch: _, ...v } = s?.google ?? {},
        y = await new Me(this.modelId, {
          provider: this.config.provider,
          baseURL: this.config.baseURL,
          headers: this.config.headers ?? {},
          fetch: this.config.fetch,
          generateId: this.config.generateId ?? H,
        }).doGenerate({
          prompt: h,
          seed: o,
          providerOptions: {
            google: {
              responseModalities: [`IMAGE`],
              imageConfig: a ? { aspectRatio: a } : void 0,
              ...v,
            },
          },
          tools:
            g?.googleSearch == null
              ? void 0
              : [
                  {
                    type: `provider`,
                    id: `google.google_search`,
                    name: `google_search`,
                    args: g.googleSearch,
                  },
                ],
          headers: c,
          abortSignal: l,
        }),
        b = (t = this.config._internal)?.currentDate?.call(t) ?? new Date(),
        x = [];
      for (let e of y.content)
        e.type === `file` &&
          e.mediaType.startsWith(`image/`) &&
          e.data.type === `data` &&
          x.push(F(e.data.data));
      return {
        images: x,
        warnings: f,
        providerMetadata: {
          google: { ...(y.providerMetadata?.google ?? {}), images: x.map(() => ({})) },
        },
        response: { timestamp: b, modelId: this.modelId, headers: y.response?.headers },
        usage: y.usage
          ? {
              inputTokens: y.usage.inputTokens.total,
              outputTokens: y.usage.outputTokens.total,
              totalTokens: (y.usage.inputTokens.total ?? 0) + (y.usage.outputTokens.total ?? 0),
            }
          : void 0,
      };
    }
  };
function nt(e) {
  return e.startsWith(`gemini-`);
}
var rt = A(() => j(z({ predictions: L(z({ bytesBase64Encoded: U() })).default([]) }))),
  it = class {
    constructor(e) {
      ((this.config = e), (this.specificationVersion = `v4`));
    }
    get provider() {
      return this.config.provider;
    }
    async uploadFile(t) {
      let n = await m({ provider: `google`, providerOptions: t.providerOptions, schema: ot }),
        r = this.config.headers(),
        i = this.config.fetch ?? globalThis.fetch,
        a = [];
      t.filename != null && a.push({ type: `unsupported`, feature: `filename` });
      let o = ne(t.data),
        s = t.mediaType,
        c = n?.displayName,
        l = await i(`${this.config.baseURL.replace(/\/v1beta$/, ``)}/upload/v1beta/files`, {
          method: `POST`,
          headers: {
            ...r,
            "X-Goog-Upload-Protocol": `resumable`,
            "X-Goog-Upload-Command": `start`,
            "X-Goog-Upload-Header-Content-Length": String(o.length),
            "X-Goog-Upload-Header-Content-Type": s,
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ file: { ...(c == null ? {} : { display_name: c }) } }),
        });
      if (!l.ok) {
        let t = await l.text();
        throw new e({
          name: `GOOGLE_FILES_UPLOAD_ERROR`,
          message: `Failed to initiate resumable upload: ${l.status} ${t}`,
        });
      }
      let u = l.headers.get(`x-goog-upload-url`);
      if (!u)
        throw new e({
          name: `GOOGLE_FILES_UPLOAD_ERROR`,
          message: `No upload URL returned from initiation request`,
        });
      let d = await i(u, {
        method: `POST`,
        headers: {
          "Content-Length": String(o.length),
          "X-Goog-Upload-Offset": `0`,
          "X-Goog-Upload-Command": `upload, finalize`,
        },
        body: o,
      });
      if (!d.ok) {
        let t = await d.text();
        throw new e({
          name: `GOOGLE_FILES_UPLOAD_ERROR`,
          message: `Failed to upload file data: ${d.status} ${t}`,
        });
      }
      let f = (await d.json()).file,
        p = n?.pollIntervalMs ?? 2e3,
        g = n?.pollTimeoutMs ?? 3e5,
        _ = Date.now();
      for (; f.state === `PROCESSING`;) {
        if (Date.now() - _ > g)
          throw new e({
            name: `GOOGLE_FILES_UPLOAD_TIMEOUT`,
            message: `File processing timed out after ${g}ms`,
          });
        await R(p);
        let { value: t } = await h({
          url: `${this.config.baseURL}/${f.name}`,
          validateUrl: !1,
          headers: N(r),
          successfulResponseHandler: M(at),
          failedResponseHandler: W,
          fetch: this.config.fetch,
        });
        f = t;
      }
      if (f.state === `FAILED`)
        throw new e({
          name: `GOOGLE_FILES_UPLOAD_FAILED`,
          message: `File processing failed for ${f.name}`,
        });
      return {
        warnings: a,
        providerReference: { google: f.uri },
        mediaType: f.mimeType ?? t.mediaType,
        providerMetadata: {
          google: {
            name: f.name,
            displayName: f.displayName,
            mimeType: f.mimeType,
            sizeBytes: f.sizeBytes,
            state: f.state,
            uri: f.uri,
            ...(f.createTime == null ? {} : { createTime: f.createTime }),
            ...(f.updateTime == null ? {} : { updateTime: f.updateTime }),
            ...(f.expirationTime == null ? {} : { expirationTime: f.expirationTime }),
            ...(f.sha256Hash == null ? {} : { sha256Hash: f.sha256Hash }),
          },
        },
      };
    }
  },
  at = A(() =>
    j(
      z({
        name: U(),
        displayName: U().nullish(),
        mimeType: U(),
        sizeBytes: U().nullish(),
        createTime: U().nullish(),
        updateTime: U().nullish(),
        expirationTime: U().nullish(),
        sha256Hash: U().nullish(),
        uri: U(),
        state: U(),
      }),
    ),
  ),
  ot = A(() =>
    j(
      D({
        displayName: U().nullish(),
        pollIntervalMs: y().positive().nullish(),
        pollTimeoutMs: y().positive().nullish(),
      }),
    ),
  ),
  st = A(() =>
    j(
      D({
        pollIntervalMs: y().positive().nullish(),
        pollTimeoutMs: y().positive().nullish(),
        personGeneration: I([`dont_allow`, `allow_adult`, `allow_all`]).nullish(),
        negativePrompt: U().nullish(),
        referenceImages: L(
          z({ bytesBase64Encoded: U().nullish(), gcsUri: U().nullish() }),
        ).nullish(),
      }),
    ),
  );
function ct(e) {
  return e.frameImages?.find((e) => e.frameType === `first_frame`)?.image;
}
function lt(e) {
  return ct(e) ?? e.image;
}
function ut(e) {
  return e.frameImages?.find((e) => e.frameType === `last_frame`)?.image;
}
function dt(e) {
  if (!(e.frameImages != null && e.frameImages.length > 0))
    return e.inputReferences != null && e.inputReferences.length > 0 ? e.inputReferences : void 0;
}
function J(e, t) {
  if (e.type === `url`) {
    if (e.url.startsWith(`gs://`)) return { gcsUri: e.url, mimeType: `image/png` };
    t.push({
      type: `unsupported`,
      feature: `URL-based image input`,
      details: `Google Generative AI video models require base64-encoded images or GCS URIs. URL will be ignored.`,
    });
    return;
  }
  return {
    bytesBase64Encoded: typeof e.data == `string` ? e.data : te(e.data),
    mimeType: e.mediaType || `image/png`,
  };
}
function ft(e) {
  return e.bytesBase64Encoded
    ? {
        image: { bytesBase64Encoded: e.bytesBase64Encoded, mimeType: `image/png` },
        referenceType: `asset`,
      }
    : e.gcsUri
      ? { image: { gcsUri: e.gcsUri, mimeType: `image/png` }, referenceType: `asset` }
      : e;
}
function pt(e, t) {
  let n = J(e, t);
  return n == null ? void 0 : { image: n, referenceType: `asset` };
}
var mt = class {
    constructor(e, t) {
      ((this.modelId = e), (this.config = t), (this.specificationVersion = `v4`));
    }
    get provider() {
      return this.config.provider;
    }
    get maxVideosPerCall() {
      return 4;
    }
    async doGenerate(t) {
      var n;
      let i = (n = this.config._internal)?.currentDate?.call(n) ?? new Date(),
        a = [],
        o = await m({ provider: `google`, providerOptions: t.providerOptions, schema: st }),
        s = [{}],
        c = s[0];
      t.prompt != null && (c.prompt = t.prompt);
      let l = lt(t);
      if (l != null) {
        let e = J(l, a);
        e != null && (c.image = e);
      }
      let u = ut(t);
      if (u != null) {
        let e = J(u, a);
        e != null && (c.lastFrame = e);
      }
      let d = dt(t);
      d == null
        ? o?.referenceImages != null && (c.referenceImages = o.referenceImages.map((e) => ft(e)))
        : (c.referenceImages = d.flatMap((e) => {
            let t = pt(e, a);
            return t == null ? [] : [t];
          }));
      let f = { sampleCount: t.n };
      if (
        (t.aspectRatio && (f.aspectRatio = t.aspectRatio),
        t.resolution &&
          (f.resolution =
            { "1280x720": `720p`, "1920x1080": `1080p`, "3840x2160": `4k` }[t.resolution] ||
            t.resolution),
        t.duration && (f.durationSeconds = t.duration),
        t.seed && (f.seed = t.seed),
        o != null)
      ) {
        let e = o;
        (e.personGeneration !== void 0 &&
          e.personGeneration !== null &&
          (f.personGeneration = e.personGeneration),
          e.negativePrompt !== void 0 &&
            e.negativePrompt !== null &&
            (f.negativePrompt = e.negativePrompt));
        for (let [t, n] of Object.entries(e))
          [
            `pollIntervalMs`,
            `pollTimeoutMs`,
            `personGeneration`,
            `negativePrompt`,
            `referenceImages`,
          ].includes(t) || (f[t] = n);
      }
      let { value: p } = await r({
          url: `${this.config.baseURL}/models/${this.modelId}:predictLongRunning`,
          headers: N(await v(this.config.headers), t.headers),
          body: { instances: s, parameters: f },
          successfulResponseHandler: M(ht),
          failedResponseHandler: W,
          abortSignal: t.abortSignal,
          fetch: this.config.fetch,
        }),
        g = p.name;
      if (!g)
        throw new e({
          name: `GOOGLE_VIDEO_GENERATION_ERROR`,
          message: `No operation name returned from API`,
        });
      let _ = o?.pollIntervalMs ?? 1e4,
        y = o?.pollTimeoutMs ?? 6e5,
        b = Date.now(),
        x = p,
        S;
      for (; !x.done;) {
        if (Date.now() - b > y)
          throw new e({
            name: `GOOGLE_VIDEO_GENERATION_TIMEOUT`,
            message: `Video generation timed out after ${y}ms`,
          });
        if ((await R(_), t.abortSignal?.aborted))
          throw new e({
            name: `GOOGLE_VIDEO_GENERATION_ABORTED`,
            message: `Video generation request was aborted`,
          });
        let { value: n, responseHeaders: r } = await h({
          url: `${this.config.baseURL}/${g}`,
          validateUrl: !1,
          headers: N(await v(this.config.headers), t.headers),
          successfulResponseHandler: M(ht),
          failedResponseHandler: W,
          abortSignal: t.abortSignal,
          fetch: this.config.fetch,
        });
        ((x = n), (S = r));
      }
      if (x.error)
        throw new e({
          name: `GOOGLE_VIDEO_GENERATION_FAILED`,
          message: `Video generation failed: ${x.error.message}`,
        });
      let C = x.response;
      if (
        !C?.generateVideoResponse?.generatedSamples ||
        C.generateVideoResponse.generatedSamples.length === 0
      )
        throw new e({
          name: `GOOGLE_VIDEO_GENERATION_ERROR`,
          message: `No videos in response. Response: ${JSON.stringify(x)}`,
        });
      let w = [],
        T = [],
        E = (await v(this.config.headers))?.[`x-goog-api-key`];
      for (let e of C.generateVideoResponse.generatedSamples)
        if (e.video?.uri) {
          let t =
            E && ee(e.video.uri, this.config.baseURL)
              ? `${e.video.uri}${e.video.uri.includes(`?`) ? `&` : `?`}key=${E}`
              : e.video.uri;
          (w.push({ type: `url`, url: t, mediaType: `video/mp4` }), T.push({ uri: e.video.uri }));
        }
      if (w.length === 0)
        throw new e({
          name: `GOOGLE_VIDEO_GENERATION_ERROR`,
          message: `No valid videos in response`,
        });
      return {
        videos: w,
        warnings: a,
        response: { timestamp: i, modelId: this.modelId, headers: S },
        providerMetadata: { google: { videos: T } },
      };
    }
  },
  ht = z({
    name: U().nullish(),
    done: T().nullish(),
    error: z({ code: y().nullish(), message: U(), status: U().nullish() }).nullish(),
    response: z({
      generateVideoResponse: z({
        generatedSamples: L(z({ video: z({ uri: U().nullish() }).nullish() })).nullish(),
      }).nullish(),
    }).nullish(),
  }),
  gt = A(() =>
    j(
      z({
        candidates: L(
          z({
            content: z({
              parts: L(
                z({ inlineData: z({ mimeType: U().nullish(), data: U().nullish() }).nullish() }),
              ).nullish(),
            }).nullish(),
          }),
        ).nullish(),
      }),
    ),
  ),
  _t = z({ prebuiltVoiceConfig: z({ voiceName: U() }) }),
  vt = A(() =>
    j(
      z({
        multiSpeakerVoiceConfig: z({
          speakerVoiceConfigs: L(z({ speaker: U(), voiceConfig: _t })),
        }).optional(),
      }),
    ),
  ),
  yt = `Kore`,
  bt = 24e3,
  xt = class e {
    constructor(e, t) {
      ((this.modelId = e), (this.config = t), (this.specificationVersion = `v4`));
    }
    static [k](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [P](t) {
      return new e(t.modelId, t.config);
    }
    get provider() {
      return this.config.provider;
    }
    async getArgs({
      text: e,
      voice: t = yt,
      outputFormat: n,
      instructions: r,
      speed: i,
      language: a,
      providerOptions: o,
    }) {
      let s = [],
        c = this.config.provider.includes(`vertex`) ? [`googleVertex`, `vertex`] : [`google`],
        l;
      for (let e of c)
        if (((l = await m({ provider: e, providerOptions: o, schema: vt })), l != null)) break;
      l == null &&
        !c.includes(`google`) &&
        (l = await m({ provider: `google`, providerOptions: o, schema: vt }));
      let u = l?.multiSpeakerVoiceConfig,
        d = u
          ? { multiSpeakerVoiceConfig: u }
          : { voiceConfig: { prebuiltVoiceConfig: { voiceName: t } } },
        f = e;
      (r != null &&
        (u
          ? s.push({
              type: `unsupported`,
              feature: `instructions`,
              details:
                "Google Gemini TTS ignores `instructions` when `multiSpeakerVoiceConfig` is set, because prepending them would break multi-speaker transcript parsing.",
            })
          : (f = `${r}: ${e}`)),
        i != null &&
          s.push({
            type: `unsupported`,
            feature: `speed`,
            details: "Google Gemini TTS models do not support the `speed` option. It was ignored.",
          }),
        a != null &&
          s.push({
            type: `unsupported`,
            feature: `language`,
            details:
              "Google Gemini TTS models do not support the `language` option. Language is detected automatically from the input text.",
          }));
      let p = `wav`;
      return (
        n === `pcm`
          ? (p = `pcm`)
          : n != null &&
            n !== `wav` &&
            s.push({
              type: `unsupported`,
              feature: `outputFormat`,
              details: `Unsupported output format: ${n}. Using wav instead.`,
            }),
        {
          requestBody: {
            contents: [{ role: `user`, parts: [{ text: f }] }],
            generationConfig: { responseModalities: [`AUDIO`], speechConfig: d },
          },
          warnings: s,
          outputFormat: p,
        }
      );
    }
    async doGenerate(e) {
      var t;
      let n = (t = this.config._internal)?.currentDate?.call(t) ?? new Date(),
        { requestBody: i, warnings: a, outputFormat: o } = await this.getArgs(e),
        {
          value: s,
          responseHeaders: c,
          rawValue: l,
        } = await r({
          url: `${this.config.baseURL}/models/${this.modelId}:generateContent`,
          headers: N(this.config.headers ? await v(this.config.headers) : void 0, e.headers),
          body: i,
          failedResponseHandler: W,
          successfulResponseHandler: M(gt),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        u,
        d;
      for (let e of s.candidates ?? []) {
        for (let t of e.content?.parts ?? [])
          if (t.inlineData?.data) {
            ((u = t.inlineData.data), (d = t.inlineData.mimeType ?? void 0));
            break;
          }
        if (u != null) break;
      }
      let f = St(d) ?? bt,
        p = u == null ? new Uint8Array() : b(u),
        m = o === `pcm` || p.length === 0 ? p : Ct(p, f);
      return (
        o === `pcm` &&
          p.length > 0 &&
          a.push({
            type: `unsupported`,
            feature: `outputFormat`,
            details: `Returning raw PCM audio (signed 16-bit little-endian, mono, ${f} Hz). These bytes have no container header and are not directly playable; see providerMetadata.google for the sample rate and mime type.`,
          }),
        {
          audio: m,
          warnings: a,
          request: { body: JSON.stringify(i) },
          response: { timestamp: n, modelId: this.modelId, headers: c, body: l },
          providerMetadata: { google: { sampleRate: f, mimeType: d ?? null } },
        }
      );
    }
  };
function St(e) {
  if (e == null) return;
  let t = /rate=(\d+)/.exec(e);
  return t ? Number.parseInt(t[1], 10) : void 0;
}
function Ct(e, t) {
  let n = t * 2,
    r = e.length,
    i = new ArrayBuffer(44 + r),
    a = new DataView(i);
  (Y(a, 0, `RIFF`),
    a.setUint32(4, 36 + r, !0),
    Y(a, 8, `WAVE`),
    Y(a, 12, `fmt `),
    a.setUint32(16, 16, !0),
    a.setUint16(20, 1, !0),
    a.setUint16(22, 1, !0),
    a.setUint32(24, t, !0),
    a.setUint32(28, n, !0),
    a.setUint16(32, 2, !0),
    a.setUint16(34, 16, !0),
    Y(a, 36, `data`),
    a.setUint32(40, r, !0));
  let o = new Uint8Array(i);
  return (o.set(e, 44), o);
}
function Y(e, t, n) {
  for (let r = 0; r < n.length; r++) e.setUint8(t + r, n.charCodeAt(r));
}
function wt(e) {
  if (e == null)
    return {
      inputTokens: { total: void 0, noCache: void 0, cacheRead: void 0, cacheWrite: void 0 },
      outputTokens: { total: void 0, text: void 0, reasoning: void 0 },
      raw: void 0,
    };
  let t = e.total_input_tokens ?? 0,
    n = e.total_output_tokens ?? 0,
    r = e.total_thought_tokens ?? 0,
    i = e.total_cached_tokens ?? 0;
  return {
    inputTokens: {
      total: e.total_input_tokens ?? void 0,
      noCache: e.total_input_tokens == null ? void 0 : t - i,
      cacheRead: e.total_cached_tokens ?? void 0,
      cacheWrite: void 0,
    },
    outputTokens: {
      total: e.total_output_tokens == null && e.total_thought_tokens == null ? void 0 : n + r,
      text: e.total_output_tokens ?? void 0,
      reasoning: e.total_thought_tokens ?? void 0,
    },
    raw: e,
  };
}
function Tt(e) {
  let t = e?.output_tokens_by_modality;
  if (t == null) return;
  let n = {};
  for (let e of t) e?.modality != null && e.tokens != null && (n[e.modality] = e.tokens);
  return Object.keys(n).length > 0 ? n : void 0;
}
var Et = {
  pdf: `application/pdf`,
  txt: `text/plain`,
  md: `text/markdown`,
  markdown: `text/markdown`,
  doc: `application/msword`,
  docx: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
};
function Dt(e) {
  let t = e.toLowerCase();
  for (let [e, n] of Object.entries(Et)) if (t.endsWith(`.${e}`)) return n;
  return `application/octet-stream`;
}
function Ot(e) {
  let t = e.split(`/`),
    n = t[t.length - 1];
  return n && n.length > 0 ? n : void 0;
}
function kt({ annotation: e, generateId: t }) {
  switch (e.type) {
    case `url_citation`: {
      let n = e;
      return n.url == null || n.url.length === 0
        ? void 0
        : {
            type: `source`,
            sourceType: `url`,
            id: t(),
            url: n.url,
            ...(n.title == null ? {} : { title: n.title }),
          };
    }
    case `file_citation`: {
      let n = e,
        r = n.url ?? n.document_uri ?? n.file_name;
      if (r == null || r.length === 0) return;
      if (r.startsWith(`http://`) || r.startsWith(`https://`))
        return {
          type: `source`,
          sourceType: `url`,
          id: t(),
          url: r,
          ...(n.file_name == null ? {} : { title: n.file_name }),
        };
      let i = n.file_name ?? Ot(r),
        a = Dt(r);
      return {
        type: `source`,
        sourceType: `document`,
        id: t(),
        mediaType: a,
        title: n.file_name ?? i ?? r,
        ...(i == null ? {} : { filename: i }),
      };
    }
    case `place_citation`: {
      let n = e;
      return n.url == null || n.url.length === 0
        ? void 0
        : {
            type: `source`,
            sourceType: `url`,
            id: t(),
            url: n.url,
            ...(n.name == null ? {} : { title: n.name }),
          };
    }
    default:
      return;
  }
}
function At({ block: e, generateId: t }) {
  let n = [];
  switch (e.type) {
    case `url_context_result`: {
      let r = e.result ?? [];
      for (let e of r)
        e?.url == null ||
          e.url.length === 0 ||
          (e.status != null && e.status !== `success`) ||
          n.push({ type: `source`, sourceType: `url`, id: t(), url: e.url });
      break;
    }
    case `google_search_result`: {
      let r = e.result ?? [];
      for (let e of r) {
        let r = e?.url;
        r == null ||
          r.length === 0 ||
          n.push({
            type: `source`,
            sourceType: `url`,
            id: t(),
            url: r,
            ...(e.title == null ? {} : { title: e.title }),
          });
      }
      break;
    }
    case `google_maps_result`: {
      let r = e.result ?? [];
      for (let e of r)
        for (let r of e.places ?? [])
          r.url == null ||
            r.url.length === 0 ||
            n.push({
              type: `source`,
              sourceType: `url`,
              id: t(),
              url: r.url,
              ...(r.name == null ? {} : { title: r.name }),
            });
      break;
    }
    case `file_search_result`: {
      let r = e.result ?? [];
      for (let e of r) {
        if (typeof e != `object` || !e) continue;
        let r = e,
          i = r.url ?? r.document_uri ?? r.file_name;
        if (i == null || i.length === 0) continue;
        if (i.startsWith(`http://`) || i.startsWith(`https://`)) {
          n.push({
            type: `source`,
            sourceType: `url`,
            id: t(),
            url: i,
            ...(r.title == null ? {} : { title: r.title }),
          });
          continue;
        }
        let a = r.file_name ?? Ot(i),
          o = Dt(i);
        n.push({
          type: `source`,
          sourceType: `document`,
          id: t(),
          mediaType: o,
          title: r.title ?? r.file_name ?? a ?? i,
          ...(a == null ? {} : { filename: a }),
        });
      }
      break;
    }
    default:
      break;
  }
  return n;
}
function jt({ annotations: e, generateId: t }) {
  if (e == null) return [];
  let n = new Set(),
    r = [];
  for (let i of e) {
    let e = kt({ annotation: i, generateId: t });
    if (e == null) continue;
    let a = e.sourceType === `url` ? `url:${e.url}` : `doc:${e.filename ?? e.title}`;
    n.has(a) || (n.add(a), r.push(e));
  }
  return r;
}
function X({ status: e, hasFunctionCall: t }) {
  switch (e) {
    case `completed`:
      return t ? `tool-calls` : `stop`;
    case `requires_action`:
      return `tool-calls`;
    case `failed`:
      return `error`;
    case `incomplete`:
      return `length`;
    case `cancelled`:
      return `other`;
    default:
      return `other`;
  }
}
var Mt = new Set([
    `google_search_call`,
    `code_execution_call`,
    `url_context_call`,
    `file_search_call`,
    `google_maps_call`,
    `mcp_server_tool_call`,
  ]),
  Nt = new Set([
    `google_search_result`,
    `code_execution_result`,
    `url_context_result`,
    `file_search_result`,
    `google_maps_result`,
    `mcp_server_tool_result`,
  ]);
function Pt(e) {
  return e.replace(/_call$/, ``);
}
function Ft(e) {
  return e.replace(/_result$/, ``);
}
function It({ warnings: e, generateId: t, includeRawChunks: n, serviceTier: r }) {
  let i,
    a,
    o = r,
    s,
    c = !1,
    l = new Map(),
    u = new Set();
  function d(e) {
    return e.sourceType === `url` ? `url:${e.url}` : `doc:${e.filename ?? e.title}`;
  }
  return new TransformStream({
    start(t) {
      t.enqueue({ type: `stream-start`, warnings: e });
    },
    transform(e, r) {
      if ((n && r.enqueue({ type: `raw`, rawValue: e.rawValue }), !e.success)) {
        ((s = `failed`), r.enqueue({ type: `error`, error: e.error }));
        return;
      }
      let f = e.value,
        p = f.event_type;
      switch (p) {
        case `interaction.created`: {
          let e = f.interaction;
          i = e?.id != null && e.id.length > 0 ? e.id : void 0;
          let t = e?.created,
            n;
          if (typeof t == `string`) {
            let e = new Date(t);
            Number.isNaN(e.getTime()) || (n = e);
          }
          r.enqueue({
            type: `response-metadata`,
            ...(i == null ? {} : { id: i }),
            modelId: e?.model,
            ...(n ? { timestamp: n } : {}),
          });
          break;
        }
        case `step.start`: {
          let e = f,
            n = e.step,
            a = e.index,
            o = `${i ?? `interaction`}:${a}`,
            s = n?.type;
          if (s === `model_output`) {
            let e = n?.content?.[0];
            if (e?.type === `text`) {
              (l.set(a, { kind: `text`, id: o, emittedSourceKeys: new Set() }),
                r.enqueue({ type: `text-start`, id: o }));
              let n = jt({ annotations: e.annotations, generateId: t });
              for (let e of n) {
                let t = d(e);
                u.has(t) || (u.add(t), r.enqueue(e));
              }
            } else
              e?.type === `image`
                ? l.set(a, {
                    kind: `image`,
                    id: o,
                    ...(e.data == null ? {} : { data: e.data }),
                    ...(e.mime_type == null ? {} : { mimeType: e.mime_type }),
                    ...(e.uri == null ? {} : { uri: e.uri }),
                  })
                : l.set(a, { kind: `pending_model_output`, id: o });
          } else if (s === `thought`) {
            let e = n?.signature;
            if (
              (l.set(a, { kind: `reasoning`, id: o, ...(e == null ? {} : { signature: e }) }),
              r.enqueue({ type: `reasoning-start`, id: o }),
              Array.isArray(n?.summary))
            )
              for (let e of n.summary)
                e?.type === `text` &&
                  typeof e.text == `string` &&
                  r.enqueue({ type: `reasoning-delta`, id: o, delta: e.text });
          } else if (s === `function_call`) {
            let e = n?.id ?? o,
              t = n?.name ?? `unknown`;
            c = !0;
            let i = {
              kind: `function_call`,
              id: o,
              toolCallId: e,
              toolName: t,
              argumentsAccum: ``,
              ...(n?.signature == null ? {} : { signature: n.signature }),
            };
            (l.set(a, i), r.enqueue({ type: `tool-input-start`, id: e, toolName: t }));
          } else if (s != null && Mt.has(s)) {
            let e = s === `mcp_server_tool_call` ? (n?.name ?? `mcp_server_tool`) : Pt(s),
              t = {
                kind: `builtin_tool_call`,
                id: o,
                blockType: s,
                toolCallId: n?.id ?? o,
                toolName: e,
                arguments: n?.arguments ?? {},
                callEmitted: !1,
              };
            l.set(a, t);
          } else if (s != null && Nt.has(s)) {
            let e = s === `mcp_server_tool_result` ? (n?.name ?? `mcp_server_tool`) : Ft(s),
              t = {
                kind: `builtin_tool_result`,
                id: o,
                blockType: s,
                callId: n?.call_id ?? o,
                toolName: e,
                result: n?.result ?? null,
                ...(n?.is_error == null ? {} : { isError: n.is_error }),
                resultEmitted: !1,
              };
            l.set(a, t);
          } else l.set(a, { kind: `unknown`, id: o });
          break;
        }
        case `step.delta`: {
          let e = f,
            n = l.get(e.index);
          if (n == null) break;
          let a = e.delta?.type;
          if (
            n.kind === `pending_model_output` &&
            (a === `text` || a === `text_annotation` || a === `text_annotation_delta`)
          ) {
            let t = { kind: `text`, id: n.id, emittedSourceKeys: new Set() };
            (l.set(e.index, t), (n = t), r.enqueue({ type: `text-start`, id: t.id }));
          }
          if (
            a === `image` &&
            (n.kind === `pending_model_output` || n.kind === `text` || n.kind === `image`)
          ) {
            let t = e.delta,
              a = {};
            i != null && (a.interactionId = i);
            let o = Object.keys(a).length > 0 ? { google: a } : void 0;
            (t?.data != null && t.data.length > 0
              ? r.enqueue({
                  type: `file`,
                  mediaType: t.mime_type ?? `image/png`,
                  data: { type: `data`, data: t.data },
                  ...(o ? { providerMetadata: o } : {}),
                })
              : t?.uri != null &&
                t.uri.length > 0 &&
                r.enqueue({
                  type: `file`,
                  mediaType: t.mime_type ?? `image/png`,
                  data: { type: `url`, url: new URL(t.uri) },
                  ...(o ? { providerMetadata: o } : {}),
                }),
              n.kind === `image` && ((n.data = void 0), (n.uri = void 0)));
            break;
          }
          if (a === `video` && (n.kind === `pending_model_output` || n.kind === `text`)) {
            let t = e.delta,
              n = {};
            i != null && (n.interactionId = i);
            let a = Object.keys(n).length > 0 ? { google: n } : void 0;
            t?.data != null && t.data.length > 0
              ? r.enqueue({
                  type: `file`,
                  mediaType: t.mime_type ?? `video/mp4`,
                  data: { type: `data`, data: t.data },
                  ...(a ? { providerMetadata: a } : {}),
                })
              : t?.uri != null &&
                t.uri.length > 0 &&
                r.enqueue({
                  type: `file`,
                  mediaType: t.mime_type ?? `video/mp4`,
                  data: { type: `url`, url: new URL(t.uri) },
                  ...(a ? { providerMetadata: a } : {}),
                });
            break;
          }
          let o = e.delta;
          if (n.kind === `text` && o?.type === `text`) {
            let e = o.text ?? ``;
            e.length > 0 && r.enqueue({ type: `text-delta`, id: n.id, delta: e });
          } else if (
            n.kind === `text` &&
            (o?.type === `text_annotation` || o?.type === `text_annotation_delta`)
          ) {
            let e = jt({ annotations: o.annotations, generateId: t });
            for (let t of e) {
              let e = d(t);
              u.has(e) || (u.add(e), n.emittedSourceKeys.add(e), r.enqueue(t));
            }
          } else if (n.kind === `image` && o?.type === `image`)
            (o.data != null && (n.data = o.data),
              o.mime_type != null && (n.mimeType = o.mime_type),
              o.uri != null && (n.uri = o.uri));
          else if (n.kind === `reasoning`) {
            if (o?.type === `thought_summary`) {
              let e = o.content;
              e?.type === `text` &&
                typeof e.text == `string` &&
                r.enqueue({ type: `reasoning-delta`, id: n.id, delta: e.text });
            } else if (o?.type === `thought_signature`) {
              let e = o.signature;
              e != null && (n.signature = e);
            }
          } else if (n.kind === `function_call` && o?.type === `arguments_delta`) {
            let e = typeof o.arguments == `string` ? o.arguments : ``;
            (e.length > 0 &&
              ((n.argumentsAccum += e),
              r.enqueue({ type: `tool-input-delta`, id: n.toolCallId, delta: e })),
              o.id != null && (n.toolCallId = o.id),
              o.signature != null && (n.signature = o.signature),
              (c = !0));
          } else
            n.kind === `builtin_tool_call` && o?.type === n.blockType
              ? (o.id != null && (n.toolCallId = o.id),
                o.arguments != null &&
                  typeof o.arguments == `object` &&
                  (n.arguments = o.arguments),
                o.name != null && n.blockType === `mcp_server_tool_call` && (n.toolName = o.name))
              : n.kind === `builtin_tool_result` &&
                o?.type === n.blockType &&
                (o.call_id != null && (n.callId = o.call_id),
                o.result !== void 0 && (n.result = o.result),
                o.is_error != null && (n.isError = o.is_error),
                o.name != null &&
                  n.blockType === `mcp_server_tool_result` &&
                  (n.toolName = o.name));
          break;
        }
        case `step.stop`: {
          let e = f,
            n = l.get(e.index);
          if (n == null) break;
          if (n.kind === `text`) {
            let e = i == null ? void 0 : { google: { interactionId: i } };
            r.enqueue({ type: `text-end`, id: n.id, ...(e ? { providerMetadata: e } : {}) });
          } else if (n.kind === `reasoning`) {
            let e = {};
            (n.signature != null && (e.signature = n.signature),
              i != null && (e.interactionId = i));
            let t = Object.keys(e).length > 0 ? { google: e } : void 0;
            r.enqueue({ type: `reasoning-end`, id: n.id, ...(t ? { providerMetadata: t } : {}) });
          } else if (n.kind === `image`) {
            let e = {};
            i != null && (e.interactionId = i);
            let t = Object.keys(e).length > 0 ? { google: e } : void 0;
            n.data != null && n.data.length > 0
              ? r.enqueue({
                  type: `file`,
                  mediaType: n.mimeType ?? `image/png`,
                  data: { type: `data`, data: n.data },
                  ...(t ? { providerMetadata: t } : {}),
                })
              : n.uri != null &&
                n.uri.length > 0 &&
                r.enqueue({
                  type: `file`,
                  mediaType: n.mimeType ?? `image/png`,
                  data: { type: `url`, url: new URL(n.uri) },
                  ...(t ? { providerMetadata: t } : {}),
                });
          } else if (n.kind === `function_call`) {
            let e = n.argumentsAccum.length > 0 ? n.argumentsAccum : `{}`;
            r.enqueue({ type: `tool-input-end`, id: n.toolCallId });
            let t = {};
            (n.signature != null && (t.signature = n.signature),
              i != null && (t.interactionId = i));
            let a = Object.keys(t).length > 0 ? { google: t } : void 0;
            r.enqueue({
              type: `tool-call`,
              toolCallId: n.toolCallId,
              toolName: n.toolName,
              input: e,
              ...(a ? { providerMetadata: a } : {}),
            });
          } else if (n.kind === `builtin_tool_call` && !n.callEmitted)
            (r.enqueue({
              type: `tool-call`,
              toolCallId: n.toolCallId,
              toolName: n.toolName,
              input: JSON.stringify(n.arguments ?? {}),
              providerExecuted: !0,
            }),
              (n.callEmitted = !0));
          else if (n.kind === `builtin_tool_result` && !n.resultEmitted) {
            (r.enqueue({
              type: `tool-result`,
              toolCallId: n.callId,
              toolName: n.toolName,
              result: n.result ?? null,
            }),
              (n.resultEmitted = !0));
            let e = At({
              block: { type: n.blockType, call_id: n.callId, result: n.result },
              generateId: t,
            });
            for (let t of e) {
              let e = d(t);
              u.has(e) || (u.add(e), r.enqueue(t));
            }
          }
          l.delete(e.index);
          break;
        }
        case `interaction.status_update`:
        case `interaction.in_progress`:
        case `interaction.requires_action`: {
          let e = f;
          s =
            e.status == null
              ? p === `interaction.requires_action`
                ? `requires_action`
                : `in_progress`
              : e.status;
          break;
        }
        case `interaction.completed`: {
          let e = f.interaction;
          (e?.id != null && e.id.length > 0 && (i = e.id),
            e?.status != null && (s = e.status),
            e?.usage != null && (a = e.usage),
            e?.service_tier != null && (o = e.service_tier));
          break;
        }
        case `error`: {
          let e = f;
          s = `failed`;
          let t = e.error ?? { message: `Unknown interaction error` };
          r.enqueue({ type: `error`, error: t });
          break;
        }
        default:
          break;
      }
    },
    flush(e) {
      let t = { unified: X({ status: s, hasFunctionCall: c }), raw: s },
        n = Tt(a),
        r = {
          google: {
            ...(i == null ? {} : { interactionId: i }),
            ...(o == null ? {} : { serviceTier: o }),
            ...(n == null ? {} : { outputTokensByModality: n }),
          },
        };
      e.enqueue({ type: `finish`, finishReason: t, usage: wt(a), providerMetadata: r });
    },
  });
}
function Lt({ prompt: e, previousInteractionId: t, store: n, mediaResolution: r }) {
  let i = [],
    a = t != null && n === !1,
    o = t != null && n !== !1;
  a &&
    i.push({
      type: `other`,
      message: `google.interactions: providerOptions.google.previousInteractionId was set together with store: false. These are incoherent (the prior interaction cannot be referenced when nothing was stored on the server); the full history will be sent and previous_interaction_id will still be emitted.`,
    });
  let s = o ? zt({ prompt: e, previousInteractionId: t }) : e,
    c = [],
    l = [];
  for (let e of s)
    switch (e.role) {
      case `system`:
        c.push(e.content);
        break;
      case `user`: {
        let t = [];
        for (let n of e.content)
          if (n.type === `text`) t.push({ type: `text`, text: n.text });
          else if (n.type === `file`) {
            let e = Rt({ part: n, warnings: i, mediaResolution: r });
            e != null && t.push(e);
          }
        let n = Ut(t);
        n.length > 0 && l.push({ type: `user_input`, content: n });
        break;
      }
      case `assistant`: {
        let t = [],
          n = () => {
            t.length > 0 && (l.push({ type: `model_output`, content: t }), (t = []));
          };
        for (let a of e.content)
          if (a.type === `text`) t.push({ type: `text`, text: a.text });
          else if (a.type === `reasoning`) {
            n();
            let e = a.providerOptions?.google?.signature;
            l.push({
              type: `thought`,
              ...(e == null ? {} : { signature: e }),
              summary: a.text.length > 0 ? [{ type: `text`, text: a.text }] : void 0,
            });
          } else if (a.type === `file`) {
            let e = Rt({ part: a, warnings: i, mediaResolution: r });
            e != null && t.push(e);
          } else if (a.type === `tool-call`) {
            n();
            let e = a.providerOptions?.google?.signature,
              t = typeof a.input == `string` ? Bt(a.input) : (a.input ?? {});
            l.push({
              type: `function_call`,
              id: a.toolCallId,
              name: a.toolName,
              arguments: t,
              ...(e == null ? {} : { signature: e }),
            });
          } else
            i.push({
              type: `other`,
              message: `google.interactions: unsupported assistant content part type "${a.type}"; part dropped.`,
            });
        n();
        break;
      }
      case `tool`: {
        let t = [];
        for (let n of e.content) {
          if (n.type !== `tool-result`) {
            i.push({
              type: `other`,
              message: `google.interactions: unsupported tool message part type "${n.type}"; part dropped.`,
            });
            continue;
          }
          let e = Vt({
            toolCallId: n.toolCallId,
            toolName: n.toolName,
            output: n.output,
            signature: n.providerOptions?.google?.signature,
            warnings: i,
          });
          t.push(e);
        }
        t.length > 0 && l.push({ type: `user_input`, content: t });
        break;
      }
    }
  return {
    input: l,
    systemInstruction:
      c.length > 0
        ? c.join(`

`)
        : void 0,
    warnings: i,
  };
}
function Rt({ part: e, warnings: t, mediaResolution: n }) {
  if (e.data.type === `text`) return { type: `text`, text: e.data.text };
  let r = B(e.mediaType),
    i;
  switch (r) {
    case `image`:
      i = `image`;
      break;
    case `audio`:
      i = `audio`;
      break;
    case `video`:
      i = `video`;
      break;
    case `application`:
    case `text`:
      i = `document`;
      break;
    default:
      i = void 0;
  }
  if (i == null) {
    t.push({
      type: `other`,
      message: `google.interactions: unsupported file media type "${e.mediaType}"; part dropped.`,
    });
    return;
  }
  let a = n != null && (i === `image` || i === `video`) ? { resolution: n } : {};
  switch (e.data.type) {
    case `data`: {
      let t = u({ part: e });
      return { type: i, data: F(e.data.data), mime_type: t, ...a };
    }
    case `url`:
      return {
        type: i,
        uri: e.data.url.toString(),
        ...(o(e.mediaType) ? { mime_type: e.mediaType } : {}),
        ...a,
      };
    case `reference`: {
      let t = _({ reference: e.data.reference, provider: `google` });
      return { type: i, uri: t, ...(o(e.mediaType) ? { mime_type: e.mediaType } : {}), ...a };
    }
  }
}
function zt({ prompt: e, previousInteractionId: t }) {
  let n = [],
    r = new Set();
  for (let i of e) {
    if (i.role === `assistant`) {
      if (i.content.some((e) => e.providerOptions?.google?.interactionId === t)) {
        for (let e of i.content) e.type === `tool-call` && r.add(e.toolCallId);
        continue;
      }
      n.push(i);
      continue;
    }
    if (i.role === `tool`) {
      let e = i.content.filter((e) => (e.type === `tool-result` ? !r.has(e.toolCallId) : !0));
      if (e.length === 0) continue;
      n.push({ ...i, content: e });
      continue;
    }
    n.push(i);
  }
  return n;
}
function Bt(e) {
  try {
    let t = re(e);
    return typeof t == `object` && t && !Array.isArray(t) ? t : { value: t };
  } catch {
    return { value: e };
  }
}
function Vt({ toolCallId: e, toolName: t, output: n, signature: r, warnings: i }) {
  let a = { type: `function_result`, call_id: e, name: t, ...(r == null ? {} : { signature: r }) };
  switch (n.type) {
    case `text`:
      return { ...a, result: n.value };
    case `json`:
      return { ...a, result: JSON.stringify(n.value) };
    case `error-text`:
      return { ...a, is_error: !0, result: n.value };
    case `error-json`:
      return { ...a, is_error: !0, result: JSON.stringify(n.value) };
    case `execution-denied`:
      return { ...a, is_error: !0, result: n.reason ?? `Tool execution denied by user.` };
    case `content`: {
      let e = [];
      for (let t of n.value)
        if (t.type === `text`) e.push({ type: `text`, text: t.text });
        else if (t.type === `file`) {
          if (B(t.mediaType) !== `image`) {
            i.push({
              type: `other`,
              message: `google.interactions: tool-result file with mediaType "${t.mediaType}" is not supported (Interactions \`function_result.result\` accepts only text and image content); part dropped.`,
            });
            continue;
          }
          let n = Ht({ part: t, warnings: i });
          n != null && e.push(n);
        } else
          i.push({
            type: `other`,
            message: `google.interactions: tool-result content part type "${t.type}" is not supported; part dropped.`,
          });
      return { ...a, result: e };
    }
  }
}
function Ht({ part: e, warnings: t }) {
  switch (e.data.type) {
    case `data`: {
      let t = o(e.mediaType)
        ? e.mediaType
        : u({ part: { type: `file`, mediaType: e.mediaType, data: e.data } });
      return { type: `image`, data: F(e.data.data), mime_type: t };
    }
    case `url`:
      return {
        type: `image`,
        uri: e.data.url.toString(),
        ...(o(e.mediaType) ? { mime_type: e.mediaType } : {}),
      };
    case `reference`:
      return {
        type: `image`,
        uri: _({ reference: e.data.reference, provider: `google` }),
        ...(o(e.mediaType) ? { mime_type: e.mediaType } : {}),
      };
    case `text`:
      t.push({
        type: `other`,
        message:
          'google.interactions: tool-result image part with `data.type === "text"` is not representable as an image; part dropped.',
      });
      return;
  }
}
function Ut(e) {
  if (e.length < 2) return e;
  let t = [];
  for (let n of e) {
    let e = t[t.length - 1];
    if (
      n.type === `text` &&
      e != null &&
      e.type === `text` &&
      e.annotations == null &&
      n.annotations == null
    ) {
      let r = {
        type: `text`,
        text: `${e.text}

${n.text}`,
      };
      t[t.length - 1] = r;
      continue;
    }
    t.push(n);
  }
  return t;
}
var Z = () => z({ modality: U().nullish(), tokens: y().nullish() }).loose(),
  Wt = () =>
    z({
      total_input_tokens: y().nullish(),
      total_output_tokens: y().nullish(),
      total_thought_tokens: y().nullish(),
      total_cached_tokens: y().nullish(),
      total_tool_use_tokens: y().nullish(),
      total_tokens: y().nullish(),
      input_tokens_by_modality: L(Z()).nullish(),
      output_tokens_by_modality: L(Z()).nullish(),
      cached_tokens_by_modality: L(Z()).nullish(),
      tool_use_tokens_by_modality: L(Z()).nullish(),
      grounding_tool_count: L(z({ type: U().nullish(), count: y().nullish() }).loose()).nullish(),
    }).loose(),
  Gt = () =>
    I([`in_progress`, `requires_action`, `completed`, `failed`, `cancelled`, `incomplete`]),
  Kt = () =>
    a([
      z({
        type: O(`url_citation`),
        url: U().nullish(),
        title: U().nullish(),
        start_index: y().nullish(),
        end_index: y().nullish(),
      }).loose(),
      z({
        type: O(`file_citation`),
        file_name: U().nullish(),
        document_uri: U().nullish(),
        url: U().nullish(),
        page_number: y().nullish(),
        media_id: U().nullish(),
        start_index: y().nullish(),
        end_index: y().nullish(),
        custom_metadata: x(U(), V()).nullish(),
      }).loose(),
      z({
        type: O(`place_citation`),
        name: U().nullish(),
        url: U().nullish(),
        place_id: U().nullish(),
        start_index: y().nullish(),
        end_index: y().nullish(),
      }).loose(),
      z({ type: U() }).loose(),
    ]),
  qt = () =>
    z({ type: U(), text: U().nullish(), data: U().nullish(), mime_type: U().nullish() }).loose(),
  Jt = () =>
    a([
      z({ type: O(`text`), text: U(), annotations: L(Kt()).nullish() }).loose(),
      z({
        type: O(`image`),
        data: U().nullish(),
        mime_type: U().nullish(),
        resolution: I([`low`, `medium`, `high`, `ultra_high`]).nullish(),
        uri: U().nullish(),
      }).loose(),
      z({
        type: O(`video`),
        data: U().nullish(),
        mime_type: U().nullish(),
        uri: U().nullish(),
      }).loose(),
      z({ type: U() }).loose(),
    ]),
  Yt = [
    `google_search_call`,
    `code_execution_call`,
    `url_context_call`,
    `file_search_call`,
    `google_maps_call`,
    `mcp_server_tool_call`,
  ],
  Xt = [
    `google_search_result`,
    `code_execution_result`,
    `url_context_result`,
    `file_search_result`,
    `google_maps_result`,
    `mcp_server_tool_result`,
  ],
  Zt = () =>
    a([
      z({ type: O(`user_input`), content: L(Jt()).nullish() }).loose(),
      z({ type: O(`model_output`), content: L(Jt()).nullish() }).loose(),
      z({
        type: O(`function_call`),
        id: U(),
        name: U(),
        arguments: x(U(), V()).nullish(),
        signature: U().nullish(),
      }).loose(),
      z({ type: O(`thought`), signature: U().nullish(), summary: L(qt()).nullish() }).loose(),
      z({
        type: I(Yt),
        id: U(),
        arguments: x(U(), V()).nullish(),
        name: U().nullish(),
        server_name: U().nullish(),
        search_type: U().nullish(),
        signature: U().nullish(),
      }).loose(),
      z({
        type: I(Xt),
        call_id: U(),
        result: V().nullish(),
        is_error: T().nullish(),
        name: U().nullish(),
        server_name: U().nullish(),
        signature: U().nullish(),
      }).loose(),
      z({ type: U() }).loose(),
    ]),
  Qt = A(() =>
    j(
      z({
        id: U().nullish(),
        created: U().nullish(),
        updated: U().nullish(),
        status: Gt(),
        model: U().nullish(),
        agent: U().nullish(),
        steps: L(Zt()).nullish(),
        usage: Wt().nullish(),
        service_tier: U().nullish(),
        previous_interaction_id: U().nullish(),
        response_modalities: L(U()).nullish(),
      }).loose(),
    ),
  ),
  $t = A(() =>
    j(
      (() => {
        let e = Gt(),
          t = Kt(),
          n = qt(),
          r = z({
            event_type: O(`interaction.created`),
            event_id: U().nullish(),
            interaction: z({
              id: U().nullish(),
              created: U().nullish(),
              model: U().nullish(),
              agent: U().nullish(),
              status: e.nullish(),
            }).loose(),
          }).loose(),
          i = z({
            event_type: O(`step.start`),
            event_id: U().nullish(),
            index: y(),
            step: Zt(),
          }).loose(),
          o = z({ type: O(`text`), text: U() }).loose(),
          s = z({ type: O(`thought_summary`), content: n.nullish() }).loose(),
          c = z({ type: O(`thought_signature`), signature: U().nullish() }).loose(),
          l = z({
            type: O(`arguments_delta`),
            arguments: U().nullish(),
            id: U().nullish(),
            signature: U().nullish(),
          }).loose(),
          u = z({
            type: I([`text_annotation_delta`, `text_annotation`]),
            annotations: L(t).nullish(),
          }).loose(),
          d = a([
            o,
            z({
              type: O(`image`),
              data: U().nullish(),
              mime_type: U().nullish(),
              resolution: I([`low`, `medium`, `high`, `ultra_high`]).nullish(),
              uri: U().nullish(),
            }).loose(),
            z({
              type: O(`video`),
              data: U().nullish(),
              mime_type: U().nullish(),
              uri: U().nullish(),
            }).loose(),
            s,
            c,
            l,
            u,
            z({
              type: I(Yt),
              id: U().nullish(),
              arguments: x(U(), V()).nullish(),
              name: U().nullish(),
              server_name: U().nullish(),
              search_type: U().nullish(),
              signature: U().nullish(),
            }).loose(),
            z({
              type: I(Xt),
              call_id: U().nullish(),
              result: V().nullish(),
              is_error: T().nullish(),
              name: U().nullish(),
              server_name: U().nullish(),
              signature: U().nullish(),
            }).loose(),
            z({ type: U() }).loose(),
          ]);
        return a([
          r,
          i,
          z({ event_type: O(`step.delta`), event_id: U().nullish(), index: y(), delta: d }).loose(),
          z({ event_type: O(`step.stop`), event_id: U().nullish(), index: y() }).loose(),
          z({
            event_type: O(`interaction.status_update`),
            event_id: U().nullish(),
            interaction_id: U().nullish(),
            status: e.nullish(),
          }).loose(),
          z({
            event_type: O(`interaction.in_progress`),
            event_id: U().nullish(),
            interaction_id: U().nullish(),
            status: e.nullish(),
          }).loose(),
          z({
            event_type: O(`interaction.requires_action`),
            event_id: U().nullish(),
            interaction_id: U().nullish(),
            status: e.nullish(),
          }).loose(),
          z({
            event_type: O(`interaction.completed`),
            event_id: U().nullish(),
            interaction: z({
              id: U().nullish(),
              status: e.nullish(),
              usage: Wt().nullish(),
              service_tier: U().nullish(),
            }).loose(),
          }).loose(),
          z({
            event_type: O(`error`),
            event_id: U().nullish(),
            error: z({ code: U().nullish(), message: U().nullish() }).loose().nullish(),
          }).loose(),
          z({ event_type: U() }).loose(),
        ]);
      })(),
    ),
  ),
  en = A(() =>
    j(
      z({
        previousInteractionId: U().nullish(),
        store: T().nullish(),
        agent: U().nullish(),
        agentConfig: a([
          z({ type: O(`dynamic`) }).loose(),
          z({
            type: O(`deep-research`),
            thinkingSummaries: I([`auto`, `none`]).nullish(),
            visualization: I([`off`, `auto`]).nullish(),
            collaborativePlanning: T().nullish(),
          }),
        ]).nullish(),
        thinkingLevel: I([`minimal`, `low`, `medium`, `high`]).nullish(),
        thinkingSummaries: I([`auto`, `none`]).nullish(),
        responseFormat: L(
          a([
            z({ type: O(`text`), mimeType: U().nullish(), schema: V().nullish() }).loose(),
            z({
              type: O(`image`),
              mimeType: U().nullish(),
              aspectRatio: I([
                `1:1`,
                `2:3`,
                `3:2`,
                `3:4`,
                `4:3`,
                `4:5`,
                `5:4`,
                `9:16`,
                `16:9`,
                `21:9`,
                `1:8`,
                `8:1`,
                `1:4`,
                `4:1`,
              ]).nullish(),
              imageSize: I([`1K`, `2K`, `4K`, `512`]).nullish(),
            }).loose(),
            z({ type: O(`audio`), mimeType: U().nullish() }).loose(),
          ]),
        ).nullish(),
        imageConfig: z({
          aspectRatio: I([
            `1:1`,
            `2:3`,
            `3:2`,
            `3:4`,
            `4:3`,
            `4:5`,
            `5:4`,
            `9:16`,
            `16:9`,
            `21:9`,
            `1:8`,
            `8:1`,
            `1:4`,
            `4:1`,
          ]).nullish(),
          imageSize: I([`1K`, `2K`, `4K`, `512`]).nullish(),
        }).nullish(),
        mediaResolution: I([`low`, `medium`, `high`, `ultra_high`]).nullish(),
        responseModalities: L(I([`text`, `image`, `audio`, `video`, `document`])).nullish(),
        serviceTier: I([`flex`, `standard`, `priority`]).nullish(),
        systemInstruction: U().nullish(),
        signature: U().nullish(),
        interactionId: U().nullish(),
        pollingTimeoutMs: y().int().positive().nullish(),
        background: T().nullish(),
        environment: a([
          U(),
          z({
            type: O(`remote`),
            sources: L(
              a([
                z({ type: O(`gcs`), source: U(), target: U().nullish() }),
                z({ type: O(`repository`), source: U(), target: U().nullish() }),
                z({ type: O(`inline`), content: U(), target: U() }),
              ]),
            ).nullish(),
            network: a([
              O(`disabled`),
              z({ allowlist: L(z({ domain: U(), transform: L(x(U(), U())).nullish() })) }),
            ]).nullish(),
          }),
        ]).nullish(),
      }),
    ),
  );
function Q({ signature: e, interactionId: t }) {
  let n = {};
  return (
    e != null && (n.signature = e),
    t != null && (n.interactionId = t),
    Object.keys(n).length > 0 ? { providerMetadata: { google: n } } : {}
  );
}
var tn = new Set([
    `google_search_call`,
    `code_execution_call`,
    `url_context_call`,
    `file_search_call`,
    `google_maps_call`,
    `mcp_server_tool_call`,
  ]),
  nn = new Set([
    `google_search_result`,
    `code_execution_result`,
    `url_context_result`,
    `file_search_result`,
    `google_maps_result`,
    `mcp_server_tool_result`,
  ]);
function rn(e) {
  return e.replace(/_call$/, ``);
}
function an(e) {
  return e.replace(/_result$/, ``);
}
function on({ steps: e, generateId: t, interactionId: n }) {
  let r = [],
    i = !1;
  if (e == null) return { content: r, hasFunctionCall: i };
  for (let a of e) {
    if (typeof a != `object` || !a) continue;
    let e = a.type;
    if (typeof e == `string`)
      switch (e) {
        case `user_input`:
          break;
        case `model_output`: {
          let e = a.content ?? [];
          for (let i of e) {
            if (typeof i != `object` || !i) continue;
            let e = i.type;
            if (e === `text`) {
              let e = i.text ?? ``,
                a = i.annotations;
              r.push({ type: `text`, text: e, ...Q({ interactionId: n }) });
              let o = jt({ annotations: a, generateId: t });
              for (let e of o) r.push(e);
            } else if (e === `image`) {
              let e = i;
              e.data != null && e.data.length > 0
                ? r.push({
                    type: `file`,
                    mediaType: e.mime_type ?? `image/png`,
                    data: { type: `data`, data: e.data },
                    ...Q({ interactionId: n }),
                  })
                : e.uri != null &&
                  e.uri.length > 0 &&
                  r.push({
                    type: `file`,
                    mediaType: e.mime_type ?? `image/png`,
                    data: { type: `url`, url: new URL(e.uri) },
                    ...Q({ interactionId: n }),
                  });
            } else if (e === `video`) {
              let e = i;
              e.data != null && e.data.length > 0
                ? r.push({
                    type: `file`,
                    mediaType: e.mime_type ?? `video/mp4`,
                    data: { type: `data`, data: e.data },
                    ...Q({ interactionId: n }),
                  })
                : e.uri != null &&
                  e.uri.length > 0 &&
                  r.push({
                    type: `file`,
                    mediaType: e.mime_type ?? `video/mp4`,
                    data: { type: `url`, url: new URL(e.uri) },
                    ...Q({ interactionId: n }),
                  });
            }
          }
          break;
        }
        case `thought`: {
          let e = a,
            t = (Array.isArray(e.summary) ? e.summary : [])
              .filter((e) => e?.type === `text` && typeof e.text == `string`)
              .map((e) => e.text).join(`
`);
          r.push({
            type: `reasoning`,
            text: t,
            ...Q({ signature: e.signature, interactionId: n }),
          });
          break;
        }
        case `function_call`: {
          i = !0;
          let e = a;
          r.push({
            type: `tool-call`,
            toolCallId: e.id,
            toolName: e.name,
            input: JSON.stringify(e.arguments ?? {}),
            ...Q({ signature: e.signature, interactionId: n }),
          });
          break;
        }
        default:
          if (tn.has(e)) {
            let n = a,
              i = e === `mcp_server_tool_call` ? (n.name ?? `mcp_server_tool`) : rn(e),
              o = JSON.stringify(n.arguments ?? {});
            r.push({
              type: `tool-call`,
              toolCallId: n.id ?? t(),
              toolName: i,
              input: o,
              providerExecuted: !0,
            });
          } else if (nn.has(e)) {
            let n = a,
              i = e === `mcp_server_tool_result` ? (n.name ?? `mcp_server_tool`) : an(e);
            r.push({
              type: `tool-result`,
              toolCallId: n.call_id ?? t(),
              toolName: i,
              result: n.result ?? null,
            });
            let o = At({ block: a, generateId: t });
            for (let e of o) r.push(e);
          }
          break;
      }
  }
  return { content: r, hasFunctionCall: i };
}
var sn = () => globalThis.fetch;
async function cn({ baseURL: e, interactionId: t, headers: n, fetch: r = sn() }) {
  if (t == null || t.length === 0) return;
  let a = `${e}/interactions/${encodeURIComponent(t)}/cancel`;
  try {
    let e = await r(a, {
      method: `POST`,
      headers: C(N({ "Content-Type": `application/json` }, n), i()),
      body: `{}`,
    });
    try {
      await e.text();
    } catch {}
  } catch {}
}
var ln = new Set([`completed`, `failed`, `cancelled`, `incomplete`]);
function un(e) {
  return e != null && ln.has(e);
}
var dn = 1e3,
  fn = 1e4,
  pn = 1800 * 1e3;
async function mn({
  baseURL: e,
  interactionId: t,
  headers: n,
  fetch: r,
  abortSignal: i,
  initialDelayMs: a = dn,
  maxDelayMs: o = fn,
  timeoutMs: s = pn,
}) {
  if (t == null || t.length === 0)
    throw Error(
      `google.interactions: cannot poll a background interaction without an id. The POST response did not include an interaction id.`,
    );
  let c = Date.now(),
    l = a,
    u = `${e}/interactions/${encodeURIComponent(t)}`,
    d = () => cn({ baseURL: e, interactionId: t, headers: n, fetch: r });
  try {
    for (;;) {
      if (i?.aborted) throw (await d(), new DOMException(`Polling was aborted`, `AbortError`));
      if (Date.now() - c > s)
        throw Error(`google.interactions: timed out polling interaction ${t} after ${s}ms.`);
      await R(l, { abortSignal: i });
      let {
        value: e,
        rawValue: a,
        responseHeaders: f,
      } = await h({
        url: u,
        validateUrl: !1,
        headers: n,
        failedResponseHandler: W,
        successfulResponseHandler: M(Qt),
        abortSignal: i,
        fetch: r,
      });
      if (un(e.status)) return { response: e, rawResponse: a, responseHeaders: f };
      l = Math.min(l * 2, o);
    }
  } catch (e) {
    throw (g(e) && (await d()), e);
  }
}
function hn({ tools: e, toolChoice: t }) {
  let n = [],
    r = e?.length ? e : void 0;
  if (r == null) return { tools: void 0, toolChoice: void 0, toolWarnings: n };
  let i = [];
  for (let e of r) {
    if (e.type === `function`) {
      i.push({
        type: `function`,
        name: e.name,
        description: e.description ?? ``,
        parameters: e.inputSchema,
      });
      continue;
    }
    if (e.type === `provider`) {
      let t = e.args ?? {};
      switch (e.id) {
        case `google.google_search`: {
          let e = t.searchTypes,
            n;
          if (typeof e == `object` && e) {
            let t = [];
            (e.webSearch != null && t.push(`web_search`),
              e.imageSearch != null && t.push(`image_search`),
              t.length > 0 && (n = t));
          }
          i.push({ type: `google_search`, ...(n == null ? {} : { search_types: n }) });
          break;
        }
        case `google.code_execution`:
          i.push({ type: `code_execution` });
          break;
        case `google.url_context`:
          i.push({ type: `url_context` });
          break;
        case `google.file_search`:
          i.push({
            type: `file_search`,
            ...(t.fileSearchStoreNames == null
              ? {}
              : { file_search_store_names: t.fileSearchStoreNames }),
            ...(t.topK == null ? {} : { top_k: t.topK }),
            ...(t.metadataFilter == null ? {} : { metadata_filter: t.metadataFilter }),
          });
          break;
        case `google.google_maps`:
          i.push({
            type: `google_maps`,
            ...(t.latitude == null ? {} : { latitude: t.latitude }),
            ...(t.longitude == null ? {} : { longitude: t.longitude }),
            ...(t.enableWidget == null ? {} : { enable_widget: t.enableWidget }),
          });
          break;
        case `google.computer_use`:
          i.push({
            type: `computer_use`,
            environment: t.environment ?? `browser`,
            ...(t.excludedPredefinedFunctions == null
              ? {}
              : { excludedPredefinedFunctions: t.excludedPredefinedFunctions }),
          });
          break;
        case `google.mcp_server`:
          i.push({
            type: `mcp_server`,
            ...(t.name == null ? {} : { name: t.name }),
            ...(t.url == null ? {} : { url: t.url }),
            ...(t.headers == null ? {} : { headers: t.headers }),
            ...(t.allowedTools == null ? {} : { allowed_tools: t.allowedTools }),
          });
          break;
        case `google.retrieval`: {
          let e = t.vertexAiSearchConfig ?? void 0;
          i.push({
            type: `retrieval`,
            ...(t.retrievalTypes == null
              ? { retrieval_types: [`vertex_ai_search`] }
              : { retrieval_types: t.retrievalTypes }),
            ...(e == null ? {} : { vertex_ai_search_config: e }),
          });
          break;
        }
        default:
          n.push({
            type: `unsupported`,
            feature: `provider-defined tool ${e.id}`,
            details: `provider-defined tool ${e.id} is not supported by google.interactions; tool dropped.`,
          });
          break;
      }
      continue;
    }
    n.push({
      type: `unsupported`,
      feature: `tool of type ${e.type}`,
      details: `Only function tools and google.* provider-defined tools are supported by google.interactions; tool dropped.`,
    });
  }
  let a = i.some((e) => e.type === `function`),
    o;
  if (t != null && a)
    switch (t.type) {
      case `auto`:
        o = `auto`;
        break;
      case `required`:
        o = `any`;
        break;
      case `none`:
        o = `none`;
        break;
      case `tool`:
        o = { allowed_tools: { mode: `validated`, tools: [t.toolName] } };
        break;
    }
  return { tools: i.length > 0 ? i : void 0, toolChoice: o, toolWarnings: n };
}
var gn = 3,
  _n = 500;
function vn({
  baseURL: e,
  interactionId: t,
  headers: n,
  fetch: r,
  abortSignal: i,
  maxRetries: a = gn,
  retryDelayMs: o = _n,
}) {
  if (t.length === 0)
    throw Error(`google.interactions: cannot stream a background interaction without an id.`);
  let s = { ...n, accept: `text/event-stream` },
    c,
    l = !1,
    u = 0,
    d = !1,
    f,
    p = new AbortController(),
    m = () => p.abort();
  i != null && (i.aborted ? p.abort() : i.addEventListener(`abort`, m, { once: !0 }));
  let _ = p.signal;
  function v() {
    let n = `${e}/interactions/${encodeURIComponent(t)}`,
      r = new URLSearchParams({ stream: `true` });
    return (c != null && r.set(`last_event_id`, c), `${n}?${r.toString()}`);
  }
  async function y() {
    let { value: e } = await h({
      url: v(),
      validateUrl: !1,
      headers: s,
      failedResponseHandler: W,
      successfulResponseHandler: S($t),
      abortSignal: _,
      fetch: r,
    });
    return e.getReader();
  }
  return new ReadableStream({
    async start(s) {
      try {
        for (; !l && !_.aborted;) {
          if (f == null)
            try {
              ((f = await y()), (d = !1));
            } catch (e) {
              if (g(e) || _.aborted) {
                s.error(e);
                return;
              }
              if ((u++, u >= a)) {
                s.error(e);
                return;
              }
              await R(o * u, { abortSignal: _ });
              continue;
            }
          try {
            let { done: e, value: t } = await f.read();
            if (e) {
              if (((f = void 0), l)) break;
              if (d) u = 0;
              else {
                if ((u++, u >= a)) {
                  s.error(
                    Error(`google.interactions: SSE stream closed without producing any events.`),
                  );
                  return;
                }
                await R(o * u, { abortSignal: _ });
              }
              continue;
            }
            if (((d = !0), t.success)) {
              let e = t.value;
              (typeof e.event_id == `string` && e.event_id.length > 0 && (c = e.event_id),
                (e.event_type === `interaction.completed` || e.event_type === `error`) && (l = !0));
            }
            s.enqueue(t);
          } catch (e) {
            if (g(e) || _.aborted) {
              s.error(e);
              return;
            }
            if (((f = void 0), u++, u >= a)) {
              s.error(e);
              return;
            }
            await R(o * u, { abortSignal: _ });
          }
        }
        s.close();
      } catch (e) {
        s.error(e);
      } finally {
        (i?.removeEventListener(`abort`, m),
          f?.cancel().catch(() => {}),
          (f = void 0),
          _.aborted && !l && (await cn({ baseURL: e, interactionId: t, headers: n, fetch: r })));
      }
    },
    cancel() {
      (p.abort(), f?.cancel().catch(() => {}), (f = void 0));
    },
  });
}
function yn({
  response: e,
  warnings: t,
  generateId: n,
  includeRawChunks: r,
  headerServiceTier: i,
}) {
  return new ReadableStream({
    start(a) {
      a.enqueue({ type: `stream-start`, warnings: t });
      let o = typeof e.id == `string` && e.id.length > 0 ? e.id : void 0,
        s,
        c = e.created;
      if (typeof c == `string`) {
        let e = new Date(c);
        Number.isNaN(e.getTime()) || (s = e);
      }
      (a.enqueue({
        type: `response-metadata`,
        ...(o == null ? {} : { id: o }),
        modelId: e.model ?? void 0,
        ...(s ? { timestamp: s } : {}),
      }),
        r && a.enqueue({ type: `raw`, rawValue: e }));
      let { content: l, hasFunctionCall: u } = on({
          steps: e.steps ?? null,
          generateId: n,
          interactionId: o,
        }),
        d = 0,
        f = () => `${o ?? `agent`}:${d++}`;
      for (let e of l)
        switch (e.type) {
          case `text`: {
            let t = f(),
              n = e.providerMetadata;
            (a.enqueue({ type: `text-start`, id: t }),
              e.text.length > 0 && a.enqueue({ type: `text-delta`, id: t, delta: e.text }),
              a.enqueue({ type: `text-end`, id: t, ...(n ? { providerMetadata: n } : {}) }));
            break;
          }
          case `reasoning`: {
            let t = f(),
              n = e.providerMetadata;
            (a.enqueue({ type: `reasoning-start`, id: t }),
              e.text.length > 0 && a.enqueue({ type: `reasoning-delta`, id: t, delta: e.text }),
              a.enqueue({ type: `reasoning-end`, id: t, ...(n ? { providerMetadata: n } : {}) }));
            break;
          }
          case `tool-call`: {
            let t = e.providerMetadata;
            (a.enqueue({
              type: `tool-input-start`,
              id: e.toolCallId,
              toolName: e.toolName,
              ...(e.providerExecuted ? { providerExecuted: e.providerExecuted } : {}),
            }),
              a.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: e.input }),
              a.enqueue({ type: `tool-input-end`, id: e.toolCallId }),
              a.enqueue({
                type: `tool-call`,
                toolCallId: e.toolCallId,
                toolName: e.toolName,
                input: e.input,
                ...(e.providerExecuted ? { providerExecuted: e.providerExecuted } : {}),
                ...(t ? { providerMetadata: t } : {}),
              }));
            break;
          }
          case `tool-result`:
            a.enqueue({
              type: `tool-result`,
              toolCallId: e.toolCallId,
              toolName: e.toolName,
              result: e.result,
            });
            break;
          case `source`:
          case `file`:
            a.enqueue(e);
            break;
          default:
            break;
        }
      let p = e.service_tier ?? i,
        m = { unified: X({ status: e.status, hasFunctionCall: u }), raw: e.status },
        h = {
          google: {
            ...(o == null ? {} : { interactionId: o }),
            ...(p == null ? {} : { serviceTier: p }),
          },
        };
      (a.enqueue({ type: `finish`, finishReason: m, usage: wt(e.usage), providerMetadata: h }),
        a.close());
    },
  });
}
var bn = class e {
  constructor(e, t) {
    ((this.specificationVersion = `v4`),
      typeof e == `string`
        ? ((this.modelId = e), (this.agent = void 0))
        : `managedAgent` in e
          ? ((this.modelId = e.managedAgent), (this.agent = e.managedAgent))
          : ((this.modelId = e.agent), (this.agent = e.agent)),
      (this.config = t));
  }
  static [k](e) {
    return { ...d({ modelId: e.modelId, config: e.config }), agent: e.agent };
  }
  static [P](t) {
    return new e(t.agent == null ? t.modelId : { agent: t.agent }, t.config);
  }
  get provider() {
    return this.config.provider;
  }
  get supportedUrls() {
    return this.config.supportedUrls
      ? this.config.supportedUrls()
      : {
          "image/*": [/^https?:\/\/.+/],
          "application/pdf": [/^https?:\/\/.+/],
          "audio/*": [/^https?:\/\/.+/],
          "video/*": [
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.+/,
            /^https?:\/\/youtu\.be\/.+/,
            /^gs:\/\/.+/,
          ],
        };
  }
  async getArgs(e) {
    let t = [],
      n = await m({ provider: `google`, providerOptions: e.providerOptions, schema: en }),
      r = this.agent != null,
      i = e.tools != null && e.tools.length > 0,
      a,
      o;
    if (i) {
      let n = hn({ tools: e.tools, toolChoice: e.toolChoice });
      ((a = n.tools), (o = n.toolChoice), t.push(...n.toolWarnings));
    }
    let s = [];
    if (e.responseFormat?.type === `json`)
      if (r)
        t.push({
          type: `other`,
          message: `google.interactions: structured output (responseFormat) is not supported when an agent is set; responseFormat will be ignored.`,
        });
      else {
        let t = {
          type: `text`,
          mime_type: `application/json`,
          ...(e.responseFormat.schema == null ? {} : { schema: e.responseFormat.schema }),
        };
        s.push(t);
      }
    if (n?.responseFormat != null)
      for (let e of n.responseFormat)
        e.type === `text`
          ? s.push($({ type: `text`, mime_type: e.mimeType ?? void 0, schema: e.schema ?? void 0 }))
          : e.type === `image`
            ? s.push(
                $({
                  type: `image`,
                  mime_type: e.mimeType ?? void 0,
                  aspect_ratio: e.aspectRatio ?? void 0,
                  image_size: e.imageSize ?? void 0,
                }),
              )
            : e.type === `audio` && s.push($({ type: `audio`, mime_type: e.mimeType ?? void 0 }));
    let {
      input: c,
      systemInstruction: l,
      warnings: u,
    } = Lt({
      prompt: e.prompt,
      previousInteractionId: n?.previousInteractionId ?? void 0,
      store: n?.store ?? void 0,
      mediaResolution: n?.mediaResolution ?? void 0,
    });
    t.push(...u);
    let d = l,
      f = n?.systemInstruction ?? void 0;
    d != null && f != null
      ? t.push({
          type: `other`,
          message: `google.interactions: both AI SDK system message and providerOptions.google.systemInstruction were set; using the AI SDK system message.`,
        })
      : d == null && f != null && (d = f);
    let p;
    if (r) {
      let r = [];
      (e.temperature != null && r.push(`temperature`),
        e.topP != null && r.push(`topP`),
        e.seed != null && r.push(`seed`),
        e.stopSequences != null && e.stopSequences.length > 0 && r.push(`stopSequences`),
        e.maxOutputTokens != null && r.push(`maxOutputTokens`),
        n?.thinkingLevel != null && r.push(`thinkingLevel`),
        n?.thinkingSummaries != null && r.push(`thinkingSummaries`),
        n?.imageConfig != null && r.push(`imageConfig`),
        r.length > 0 &&
          t.push({
            type: `other`,
            message: `google.interactions: ${r.join(`, `)} ${r.length === 1 ? `is` : `are`} not supported when an agent is set; use providerOptions.google.agentConfig instead. Dropped from the request body.`,
          }),
        (p = void 0));
    } else if (
      ((p = $({
        temperature: e.temperature ?? void 0,
        top_p: e.topP ?? void 0,
        seed: e.seed ?? void 0,
        stop_sequences:
          e.stopSequences != null && e.stopSequences.length > 0 ? e.stopSequences : void 0,
        max_output_tokens: e.maxOutputTokens ?? void 0,
        thinking_level: n?.thinkingLevel ?? void 0,
        thinking_summaries: n?.thinkingSummaries ?? void 0,
        tool_choice: o,
      })),
      n?.imageConfig != null)
    ) {
      let e = s.some((e) => e.type === `image`);
      (t.push({
        type: `other`,
        message: e
          ? `google.interactions: providerOptions.google.imageConfig is deprecated and was ignored because providerOptions.google.responseFormat already supplies an image entry. Use responseFormat exclusively.`
          : `google.interactions: providerOptions.google.imageConfig is deprecated. Use providerOptions.google.responseFormat with a { type: "image", ... } entry instead.`,
      }),
        e ||
          s.push({
            type: `image`,
            mime_type: `image/png`,
            ...(n.imageConfig.aspectRatio == null
              ? {}
              : { aspect_ratio: n.imageConfig.aspectRatio }),
            ...(n.imageConfig.imageSize == null ? {} : { image_size: n.imageConfig.imageSize }),
          }));
    }
    let h;
    if (r && n?.agentConfig != null) {
      let e = n.agentConfig;
      e.type === `deep-research`
        ? (h = $({
            type: `deep-research`,
            thinking_summaries: e.thinkingSummaries ?? void 0,
            visualization: e.visualization ?? void 0,
            collaborative_planning: e.collaborativePlanning ?? void 0,
          }))
        : e.type === `dynamic` && (h = { type: `dynamic` });
    }
    let g;
    if (n?.environment != null)
      if (!r)
        t.push({
          type: `other`,
          message: `google.interactions: environment is only supported when an agent is set; environment will be omitted from the request body.`,
        });
      else if (typeof n.environment == `string`) g = n.environment;
      else {
        let e = n.environment,
          t = e.sources?.map((e) =>
            e.type === `inline`
              ? { type: `inline`, content: e.content, target: e.target }
              : $({ type: e.type, source: e.source, target: e.target ?? void 0 }),
          ),
          r;
        (e.network === `disabled`
          ? (r = `disabled`)
          : e.network != null &&
            (r = {
              allowlist: e.network.allowlist.map((e) =>
                $({ domain: e.domain, transform: e.transform ?? void 0 }),
              ),
            }),
          (g = $({ type: `remote`, sources: t != null && t.length > 0 ? t : void 0, network: r })));
      }
    return {
      args: $({
        ...(r ? { agent: this.agent } : { model: this.modelId }),
        input: c,
        system_instruction: d,
        tools: a,
        response_format: s.length > 0 ? s : void 0,
        response_modalities: n?.responseModalities == null ? void 0 : n.responseModalities,
        previous_interaction_id: n?.previousInteractionId ?? void 0,
        service_tier: n?.serviceTier ?? void 0,
        store: n?.store ?? void 0,
        generation_config: p != null && Object.keys(p).length > 0 ? p : void 0,
        agent_config: h,
        environment: g,
        background: n?.background ?? void 0,
      }),
      warnings: t,
      isAgent: r,
      isBackground: n?.background === !0,
      pollingTimeoutMs: n?.pollingTimeoutMs ?? void 0,
    };
  }
  async doGenerate(e) {
    let { args: t, warnings: n, isAgent: i, pollingTimeoutMs: a } = await this.getArgs(e),
      o = `${this.config.baseURL}/interactions`,
      s = N(this.config.headers ? await v(this.config.headers) : void 0, e.headers),
      {
        responseHeaders: c,
        value: l,
        rawValue: u,
      } = await r({
        url: o,
        headers: s,
        body: t,
        failedResponseHandler: W,
        successfulResponseHandler: M(Qt),
        abortSignal: e.abortSignal,
        fetch: this.config.fetch,
      });
    if (i && !un(l.status)) {
      let t = await mn({
        baseURL: this.config.baseURL,
        interactionId: l.id,
        headers: s,
        fetch: this.config.fetch,
        abortSignal: e.abortSignal,
        timeoutMs: a,
      });
      ((l = t.response), (u = t.rawResponse), (c = t.responseHeaders ?? c));
    }
    let d = typeof l.id == `string` && l.id.length > 0 ? l.id : void 0,
      { content: f, hasFunctionCall: p } = on({
        steps: l.steps ?? null,
        generateId: this.config.generateId ?? H,
        interactionId: d,
      }),
      m = { unified: X({ status: l.status, hasFunctionCall: p }), raw: l.status },
      h = l.service_tier ?? c?.[`x-gemini-service-tier`] ?? void 0,
      g = Tt(l.usage),
      _ = {
        google: {
          ...(d == null ? {} : { interactionId: d }),
          ...(h == null ? {} : { serviceTier: h }),
          ...(g == null ? {} : { outputTokensByModality: g }),
        },
      },
      y;
    if (typeof l.created == `string`) {
      let e = new Date(l.created);
      Number.isNaN(e.getTime()) || (y = e);
    }
    return {
      content: f,
      finishReason: m,
      usage: wt(l.usage),
      warnings: n,
      providerMetadata: _,
      request: { body: t },
      response: {
        headers: c,
        body: u,
        ...(d == null ? {} : { id: d }),
        ...(y ? { timestamp: y } : {}),
        modelId: l.model ?? void 0,
      },
    };
  }
  async doStream(e) {
    let { args: t, warnings: n, isBackground: i, pollingTimeoutMs: a } = await this.getArgs(e),
      o = `${this.config.baseURL}/interactions`,
      s = N(this.config.headers ? await v(this.config.headers) : void 0, e.headers);
    if (i)
      return this.doStreamBackground({
        args: t,
        warnings: n,
        url: o,
        mergedHeaders: s,
        options: e,
        pollingTimeoutMs: a,
      });
    let c = { ...t, stream: !0 },
      { responseHeaders: l, value: u } = await r({
        url: o,
        headers: s,
        body: c,
        failedResponseHandler: W,
        successfulResponseHandler: S($t),
        abortSignal: e.abortSignal,
        fetch: this.config.fetch,
      }),
      d = l?.[`x-gemini-service-tier`],
      f = It({
        warnings: n,
        generateId: this.config.generateId ?? H,
        includeRawChunks: e.includeRawChunks,
        serviceTier: d,
      });
    return { stream: u.pipeThrough(f), request: { body: c }, response: { headers: l } };
  }
  async doStreamBackground({
    args: e,
    warnings: t,
    url: n,
    mergedHeaders: i,
    options: a,
    pollingTimeoutMs: o,
  }) {
    let { responseHeaders: s, value: c } = await r({
        url: n,
        headers: i,
        body: e,
        failedResponseHandler: W,
        successfulResponseHandler: M(Qt),
        abortSignal: a.abortSignal,
        fetch: this.config.fetch,
      }),
      l = c.id;
    if (l == null || l.length === 0)
      throw Error(
        `google.interactions: background POST response did not include an interaction id; cannot stream the result.`,
      );
    let u = s?.[`x-gemini-service-tier`];
    if (un(c.status))
      return {
        stream: yn({
          response: c,
          warnings: t,
          generateId: this.config.generateId ?? H,
          includeRawChunks: a.includeRawChunks,
          headerServiceTier: u,
        }),
        request: { body: e },
        response: { headers: s },
      };
    let d = vn({
        baseURL: this.config.baseURL,
        interactionId: l,
        headers: i,
        fetch: this.config.fetch,
        abortSignal: a.abortSignal,
      }),
      f = It({
        warnings: t,
        generateId: this.config.generateId ?? H,
        includeRawChunks: a.includeRawChunks,
        serviceTier: u,
      });
    return { stream: d.pipeThrough(f), request: { body: e }, response: { headers: s } };
  }
};
function $(e) {
  let t = {};
  for (let [n, r] of Object.entries(e)) r !== void 0 && (t[n] = r);
  return t;
}
function xn(e) {
  return typeof e == `object` && !!e && !Array.isArray(e);
}
var Sn = class {
  constructor() {
    ((this.turnCounter = 0),
      (this.hasAudio = !1),
      (this.hasText = !1),
      (this.hasTranscript = !1),
      (this.turnClosed = !1),
      (this.inputAudioRate = 16e3));
  }
  get responseId() {
    return `google-resp-${this.turnCounter}`;
  }
  get itemId() {
    return `google-item-${this.turnCounter}`;
  }
  beginTurnIfClosed() {
    this.turnClosed &&=
      (this.turnCounter++,
      (this.hasAudio = !1),
      (this.hasText = !1),
      (this.hasTranscript = !1),
      !1);
  }
  parseServerEvent(e) {
    let t = e;
    return t.setupComplete == null
      ? t.toolCall == null
        ? t.toolCallCancellation == null
          ? t.serverContent == null
            ? t.inputTranscription?.text == null
              ? { type: `custom`, rawType: String(Object.keys(t)[0]), raw: e }
              : {
                  type: `input-transcription-completed`,
                  itemId: `google-input-${this.turnCounter}`,
                  transcript: t.inputTranscription.text,
                  raw: e,
                }
            : this.parseServerContent(t.serverContent, e)
          : { type: `custom`, rawType: `toolCallCancellation`, raw: e }
        : (this.beginTurnIfClosed(),
          (t.toolCall.functionCalls ?? []).flatMap((t) => {
            let n = JSON.stringify(t.args ?? {});
            return [
              {
                type: `function-call-arguments-delta`,
                responseId: this.responseId,
                itemId: this.itemId,
                callId: t.id,
                delta: n,
                raw: e,
              },
              {
                type: `function-call-arguments-done`,
                responseId: this.responseId,
                itemId: this.itemId,
                callId: t.id,
                name: t.name,
                arguments: n,
                raw: e,
              },
            ];
          }))
      : { type: `session-created`, raw: e };
  }
  parseServerContent(e, t) {
    let n = [];
    if ((e.interrupted && n.push({ type: `speech-started`, raw: t }), e.modelTurn?.parts)) {
      this.beginTurnIfClosed();
      for (let r of e.modelTurn.parts)
        (r.inlineData?.data &&
          ((this.hasAudio = !0),
          n.push({
            type: `audio-delta`,
            responseId: this.responseId,
            itemId: this.itemId,
            delta: r.inlineData.data,
            raw: t,
          })),
          r.text &&
            ((this.hasText = !0),
            n.push({
              type: `text-delta`,
              responseId: this.responseId,
              itemId: this.itemId,
              delta: r.text,
              raw: t,
            })));
    }
    return (
      e.outputTranscription?.text &&
        ((this.hasTranscript = !0),
        n.push({
          type: `audio-transcript-delta`,
          responseId: this.responseId,
          itemId: this.itemId,
          delta: e.outputTranscription.text,
          raw: t,
        })),
      e.inputTranscription?.text &&
        n.push({
          type: `input-transcription-completed`,
          itemId: `google-input-${this.turnCounter}`,
          transcript: e.inputTranscription.text,
          raw: t,
        }),
      e.turnComplete &&
        (this.hasAudio &&
          n.push({ type: `audio-done`, responseId: this.responseId, itemId: this.itemId, raw: t }),
        this.hasText &&
          n.push({ type: `text-done`, responseId: this.responseId, itemId: this.itemId, raw: t }),
        this.hasTranscript &&
          n.push({
            type: `audio-transcript-done`,
            responseId: this.responseId,
            itemId: this.itemId,
            raw: t,
          }),
        n.push({ type: `response-done`, responseId: this.responseId, status: `completed`, raw: t }),
        (this.turnClosed = !0)),
      n.length === 0
        ? { type: `custom`, rawType: `serverContent`, raw: t }
        : n.length === 1
          ? n[0]
          : n
    );
  }
  serializeClientEvent(e, t) {
    switch (e.type) {
      case `session-update`:
        return (
          e.config.inputAudioFormat?.rate != null &&
            (this.inputAudioRate = e.config.inputAudioFormat.rate),
          { setup: wn(e.config, t) }
        );
      case `input-audio-append`:
        return {
          realtimeInput: {
            audio: { data: e.audio, mimeType: `audio/pcm;rate=${this.inputAudioRate}` },
          },
        };
      case `input-audio-commit`:
        return { realtimeInput: { audioStreamEnd: !0 } };
      case `input-audio-clear`:
      case `response-create`:
      case `response-cancel`:
      case `conversation-item-truncate`:
        return null;
      case `conversation-item-create`: {
        let t = e.item;
        switch (t.type) {
          case `text-message`:
            return { realtimeInput: { text: t.text } };
          case `function-call-output`:
            return Cn(t);
          case `audio-message`:
            return null;
        }
        break;
      }
    }
    return null;
  }
};
async function Cn(e) {
  let t = await l({ text: e.output }),
    n = t.success ? t.value : {};
  return { toolResponse: { functionResponses: [{ id: e.callId, name: e.name, response: n }] } };
}
function wn(e, t) {
  let n = { model: K(t) },
    r = {};
  if (
    (e?.outputModalities == null
      ? (r.responseModalities = [`AUDIO`])
      : (r.responseModalities = e.outputModalities.map((e) => e.toUpperCase())),
    e?.voice != null &&
      (r.speechConfig = { voiceConfig: { prebuiltVoiceConfig: { voiceName: e.voice } } }),
    (n.generationConfig = r),
    e?.instructions != null && (n.systemInstruction = { parts: [{ text: e.instructions }] }),
    e?.tools != null &&
      e.tools.length > 0 &&
      (n.tools = [
        {
          functionDeclarations: e.tools.map((e) => ({
            name: e.name,
            description: e.description,
            parameters: G(e.parameters),
          })),
        },
      ]),
    e?.inputAudioTranscription != null && (n.inputAudioTranscription = {}),
    e?.outputAudioTranscription != null && (n.outputAudioTranscription = {}),
    e?.providerOptions == null)
  )
    return n;
  let { google: i, ...a } = e.providerOptions;
  Object.assign(n, a);
  let o = xn(i) ? i : void 0;
  return (
    o?.translationConfig != null &&
      (n.generationConfig = {
        ...(xn(n.generationConfig) ? n.generationConfig : r),
        translationConfig: o.translationConfig,
      }),
    n
  );
}
var Tn = `google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained`;
function En(e) {
  let t = new URL(e),
    n = t.pathname.split(`/`),
    r = n.at(-1);
  return ((r === `v1beta` || r === `v1alpha`) && (n.pop(), (t.pathname = n.join(`/`) || `/`)), t);
}
function Dn(e) {
  let t = En(e);
  return ((t.pathname = `${t.pathname.replace(/\/$/, ``)}/v1alpha/auth_tokens`), t.toString());
}
function On(e) {
  let t = En(e);
  return (
    (t.protocol = t.protocol === `https:` ? `wss:` : `ws:`),
    (t.pathname = `${t.pathname.replace(/\/$/, ``)}/ws/${Tn}`),
    t.toString()
  );
}
var kn = class {
    constructor(e, t) {
      ((this.specificationVersion = `v4`),
        (this.mapper = new Sn()),
        (this.modelId = e),
        (this.provider = t.provider),
        (this.config = t));
    }
    async doCreateClientSecret(e) {
      let t = this.config.fetch ?? fetch,
        n = this.config.headers()[`x-goog-api-key`];
      if (!n) throw Error(`Google Generative AI API key is required for realtime token creation.`);
      let r = Date.now(),
        i = (e.expiresAfterSeconds ?? 60) * 1e3,
        a = new Date(r + i).toISOString(),
        o = new Date(r + i + 1800 * 1e3).toISOString(),
        s = wn(e.sessionConfig, this.modelId),
        c = await t(`${Dn(this.config.baseURL)}?key=${encodeURIComponent(n)}`, {
          method: `POST`,
          headers: { "Content-Type": `application/json` },
          body: JSON.stringify({
            uses: 0,
            expireTime: o,
            newSessionExpireTime: a,
            bidiGenerateContentSetup: s,
          }),
        });
      if (!c.ok) {
        let e = await c.text();
        throw Error(`Google realtime auth token request failed: ${c.status} ${e}`);
      }
      let l = await c.json();
      return {
        token: l.name,
        url: On(this.config.baseURL),
        expiresAt: l.expireTime ? Math.floor(new Date(l.expireTime).getTime() / 1e3) : void 0,
      };
    }
    getWebSocketConfig(e) {
      return { url: `${e.url}?access_token=${encodeURIComponent(e.token)}` };
    }
    parseServerEvent(e) {
      return this.mapper.parseServerEvent(e);
    }
    serializeClientEvent(e) {
      return this.mapper.serializeClientEvent(e, this.modelId);
    }
    buildSessionConfig(e) {
      return wn(e, this.modelId);
    }
  },
  An = [
    `text/html`,
    `text/css`,
    `text/plain`,
    `text/xml`,
    `text/csv`,
    `text/rtf`,
    `text/javascript`,
    `application/json`,
    `application/pdf`,
    `image/bmp`,
    `image/jpeg`,
    `image/png`,
    `image/webp`,
    `video/mp4`,
    `video/mpeg`,
    `video/quicktime`,
    `video/avi`,
    `video/x-flv`,
    `video/mpg`,
    `video/webm`,
    `video/wmv`,
    `video/3gpp`,
  ],
  jn = /^https:\/\/.*$/;
function Mn(e) {
  return /(^|\/)gemini-/.test(e) && !/(^|\/)gemini-2\.0/.test(e);
}
function Nn(e = {}) {
  let t = ie(e.baseURL) ?? `https://generativelanguage.googleapis.com/v1beta`,
    n = e.name ?? `google.generative-ai`,
    r = () =>
      C(
        {
          "x-goog-api-key": f({
            apiKey: e.apiKey,
            environmentVariableName: `GOOGLE_GENERATIVE_AI_API_KEY`,
            description: `Google Generative AI`,
          }),
          ...e.headers,
        },
        `ai-sdk/google/${ae}`,
      ),
    i = (i) =>
      new Me(i, {
        provider: n,
        baseURL: t,
        headers: r,
        generateId: e.generateId ?? H,
        supportedUrls: () => ({
          "*": [
            RegExp(`^${t}/files/.*$`),
            RegExp(`^https://(?:www\\.)?youtube\\.com/watch\\?v=[\\w-]+(?:&[\\w=&.-]*)?$`),
            RegExp(`^https://youtu\\.be/[\\w-]+(?:\\?[\\w=&.-]*)?$`),
          ],
          ...(Mn(i) ? Object.fromEntries(An.map((e) => [e, [jn]])) : {}),
        }),
        fetch: e.fetch,
      }),
    a = (i) => new ce(i, { provider: n, baseURL: t, headers: r, fetch: e.fetch }),
    o = (i, a = {}) => new tt(i, a, { provider: n, baseURL: t, headers: r, fetch: e.fetch }),
    s = () => new it({ provider: n, baseURL: t, headers: r, fetch: e.fetch }),
    c = (i) =>
      new mt(i, {
        provider: n,
        baseURL: t,
        headers: r,
        fetch: e.fetch,
        generateId: e.generateId ?? H,
      }),
    l = (i) => new kn(i, { provider: `${n}.realtime`, baseURL: t, headers: r, fetch: e.fetch }),
    u = (i) => new xt(i, { provider: `${n}.speech`, baseURL: t, headers: r, fetch: e.fetch }),
    d = Object.assign((e) => l(e), {
      getToken: async (e) => {
        let t = await l(e.model).doCreateClientSecret({
          sessionConfig: e.sessionConfig,
          expiresAfterSeconds: e.expiresAfterSeconds,
        });
        return { token: t.token, url: t.url, expiresAt: t.expiresAt };
      },
    }),
    p = (i) =>
      new bn(i, {
        provider: `${n}.interactions`,
        baseURL: t,
        headers: r,
        generateId: e.generateId ?? H,
        fetch: e.fetch,
      }),
    m = function (e) {
      if (new.target)
        throw Error(
          `The Google Generative AI model function cannot be called with the new keyword.`,
        );
      return i(e);
    };
  return (
    (m.specificationVersion = `v4`),
    (m.languageModel = i),
    (m.chat = i),
    (m.generativeAI = i),
    (m.embedding = a),
    (m.embeddingModel = a),
    (m.textEmbedding = a),
    (m.textEmbeddingModel = a),
    (m.image = o),
    (m.imageModel = o),
    (m.video = c),
    (m.videoModel = c),
    (m.experimental_realtime = d),
    (m.files = s),
    (m.speech = u),
    (m.speechModel = u),
    (m.interactions = p),
    (m.tools = $e),
    m
  );
}
var Pn = Nn();
export {
  kn as Experimental_GoogleRealtimeModel,
  ae as VERSION,
  Nn as createGoogle,
  Nn as createGoogleGenerativeAI,
  Pn as google,
};
