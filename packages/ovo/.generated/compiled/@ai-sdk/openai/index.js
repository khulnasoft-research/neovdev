import {
  APICallError as e,
  InvalidPromptError as t,
  TooManyEmbeddingValuesForCallError as n,
  UnsupportedFunctionalityError as r,
} from "../provider/index.js";
import {
  $ as i,
  B as a,
  Ct as o,
  E as s,
  G as c,
  H as l,
  I as u,
  J as d,
  L as f,
  M as p,
  N as m,
  O as h,
  Q as g,
  R as _,
  Tt as v,
  U as y,
  Y as b,
  Z as x,
  _ as S,
  _t as C,
  a as w,
  bt as T,
  c as E,
  ct as D,
  d as O,
  et as ee,
  f as k,
  ft as A,
  g as j,
  h as M,
  ht as N,
  i as te,
  it as P,
  j as F,
  lt as I,
  m as ne,
  mt as re,
  nt as L,
  o as ie,
  ot as ae,
  p as R,
  pt as z,
  r as B,
  rt as V,
  s as H,
  st as U,
  t as oe,
  tt as se,
  u as ce,
  ut as W,
  vt as G,
  w as K,
  wt as q,
  x as J,
  xt as Y,
  y as le,
  z as ue,
} from "../../_chunks/workflow/dist-C_VDTghO.js";
function de(e) {
  return v(ae, e);
}
var fe = G({
    error: G({
      message: Y(),
      type: Y().nullish(),
      param: I().nullish(),
      code: o([Y(), C()]).nullish(),
    }),
  }),
  X = k({ errorSchema: fe, errorToMessage: (e) => e.error.message });
function pe(e) {
  let t =
      e.startsWith(`o3`) ||
      e.startsWith(`o4-mini`) ||
      (e.startsWith(`gpt-5`) && !e.startsWith(`gpt-5-chat`)),
    n =
      e.startsWith(`gpt-4`) ||
      (e.startsWith(`gpt-5`) &&
        !e.startsWith(`gpt-5-nano`) &&
        !e.startsWith(`gpt-5-chat`) &&
        !e.startsWith(`gpt-5.4-nano`)) ||
      e.startsWith(`o3`) ||
      e.startsWith(`o4-mini`),
    r =
      e.startsWith(`o1`) ||
      e.startsWith(`o3`) ||
      e.startsWith(`o4-mini`) ||
      (e.startsWith(`gpt-5`) && !e.startsWith(`gpt-5-chat`)),
    i =
      e.startsWith(`gpt-5.1`) ||
      e.startsWith(`gpt-5.2`) ||
      e.startsWith(`gpt-5.3`) ||
      e.startsWith(`gpt-5.4`) ||
      e.startsWith(`gpt-5.5`) ||
      e.startsWith(`gpt-5.6`);
  return {
    supportsFlexProcessing: t,
    supportsPriorityProcessing: n,
    isReasoningModel: r,
    systemMessageMode: r ? `developer` : `system`,
    supportsNonReasoningParameters: i,
  };
}
async function me({
  stream: e,
  getError: t,
  isOutputChunk: n,
  url: r,
  requestBodyValues: i,
  responseHeaders: a,
}) {
  let [o, s] = e.tee(),
    c = o.getReader();
  try {
    for (;;) {
      let e = await c.read();
      if (e.done) return s;
      let o = e.value;
      if (!o.success) return s;
      let l = t(o.value);
      if (l != null)
        throw (
          s.cancel().catch(() => {}),
          he({ frame: l, url: r, requestBodyValues: i, responseHeaders: a })
        );
      if (n(o.value)) return s;
    }
  } finally {
    (c.cancel().catch(() => {}), c.releaseLock());
  }
}
function he({ frame: t, url: n, requestBodyValues: r, responseHeaders: i }) {
  let a = ge(t);
  return new e({
    message: a?.message ?? `OpenAI stream failed before any output was generated`,
    url: n,
    requestBodyValues: r,
    statusCode: a == null ? 500 : _e(a),
    responseHeaders: i,
    responseBody: JSON.stringify(t),
    data: t,
  });
}
function ge(e) {
  let t = ve(e);
  if (t == null) return;
  if (t.type === `response.failed`) {
    let n = ve(ve(t.response)?.error);
    return typeof n?.message == `string`
      ? { message: n.message, code: ye(n.code), type: `response.failed`, frame: e }
      : void 0;
  }
  let n = ve(t.error) ?? t;
  return typeof n.message == `string` &&
    (ve(t.error) != null || typeof n.type == `string` || `code` in n || `param` in n)
    ? {
        message: n.message,
        code: ye(n.code),
        type: typeof n.type == `string` ? n.type : void 0,
        frame: e,
      }
    : void 0;
}
function _e(e) {
  if (typeof e.code == `number` && be(e.code)) return e.code;
  if (typeof e.code == `string` && /^\d{3}$/.test(e.code)) {
    let t = Number(e.code);
    if (be(t)) return t;
  }
  let t = [e.code, e.type]
    .filter((e) => typeof e == `string` || typeof e == `number`)
    .join(` `)
    .toLowerCase();
  return [`insufficient_quota`, `rate_limit`].some((e) => t.includes(e))
    ? 429
    : t.includes(`authentication`)
      ? 401
      : t.includes(`permission`)
        ? 403
        : t.includes(`not_found`)
          ? 404
          : [`invalid`, `bad_request`, `context_length`].some((e) => t.includes(e))
            ? 400
            : t.includes(`overload`)
              ? 503
              : t.includes(`timeout`)
                ? 504
                : 500;
}
function ve(e) {
  return typeof e == `object` && e ? e : void 0;
}
function ye(e) {
  return typeof e == `string` || typeof e == `number` ? e : void 0;
}
function be(e) {
  return Number.isInteger(e) && e >= 400 && e <= 599;
}
function xe(e) {
  if (e == null)
    return {
      inputTokens: { total: void 0, noCache: void 0, cacheRead: void 0, cacheWrite: void 0 },
      outputTokens: { total: void 0, text: void 0, reasoning: void 0 },
      raw: void 0,
    };
  let t = e.prompt_tokens ?? 0,
    n = e.completion_tokens ?? 0,
    r = e.prompt_tokens_details?.cached_tokens ?? 0,
    i = e.prompt_tokens_details?.cache_write_tokens ?? void 0,
    a = e.completion_tokens_details?.reasoning_tokens ?? 0;
  return {
    inputTokens: { total: t, noCache: t - r - (i ?? 0), cacheRead: r, cacheWrite: i },
    outputTokens: { total: n, text: n - a, reasoning: a },
    raw: e,
  };
}
function Se(e) {
  return JSON.stringify(e === void 0 ? {} : e);
}
function Z(e) {
  return e?.openai?.promptCacheBreakpoint;
}
function Ce({ prompt: e, systemMessageMode: t = `system` }) {
  let n = [],
    i = [];
  for (let { role: a, content: o, providerOptions: s } of e)
    switch (a) {
      case `system`:
        switch (t) {
          case `system`: {
            let e = Z(s);
            n.push({
              role: `system`,
              content: e == null ? o : [{ type: `text`, text: o, prompt_cache_breakpoint: e }],
            });
            break;
          }
          case `developer`: {
            let e = Z(s);
            n.push({
              role: `developer`,
              content: e == null ? o : [{ type: `text`, text: o, prompt_cache_breakpoint: e }],
            });
            break;
          }
          case `remove`:
            i.push({ type: `other`, message: `system messages are removed for this model` });
            break;
          default:
            throw Error(`Unsupported system message mode: ${t}`);
        }
        break;
      case `user`:
        if (o.length === 1 && o[0].type === `text` && Z(o[0].providerOptions) == null) {
          n.push({ role: `user`, content: o[0].text });
          break;
        }
        n.push({
          role: `user`,
          content: o.map((e, t) => {
            switch (e.type) {
              case `text`: {
                let t = Z(e.providerOptions);
                return {
                  type: `text`,
                  text: e.text,
                  ...(t != null && { prompt_cache_breakpoint: t }),
                };
              }
              case `file`: {
                let n = Z(e.providerOptions);
                switch (e.data.type) {
                  case `reference`:
                    return {
                      type: `file`,
                      file: { file_id: y({ reference: e.data.reference, provider: `openai` }) },
                      ...(n != null && { prompt_cache_breakpoint: n }),
                    };
                  case `text`:
                    throw new r({ functionality: `text file parts` });
                  case `url`:
                  case `data`: {
                    let i = K(e.mediaType);
                    if (i === `image`)
                      return {
                        type: `image_url`,
                        image_url: {
                          url:
                            e.data.type === `url`
                              ? e.data.url.toString()
                              : `data:${l({ part: e })};base64,${H(e.data.data)}`,
                          detail: e.providerOptions?.openai?.imageDetail,
                        },
                        ...(n != null && { prompt_cache_breakpoint: n }),
                      };
                    if (i === `audio`) {
                      if (e.data.type === `url`)
                        throw new r({ functionality: `audio file parts with URLs` });
                      let t = l({ part: e });
                      switch (t) {
                        case `audio/wav`:
                          return {
                            type: `input_audio`,
                            input_audio: { data: H(e.data.data), format: `wav` },
                            ...(n != null && { prompt_cache_breakpoint: n }),
                          };
                        case `audio/mp3`:
                        case `audio/mpeg`:
                          return {
                            type: `input_audio`,
                            input_audio: { data: H(e.data.data), format: `mp3` },
                            ...(n != null && { prompt_cache_breakpoint: n }),
                          };
                        default:
                          throw new r({
                            functionality: `audio content parts with media type ${t}`,
                          });
                      }
                    }
                    {
                      let i = l({ part: e });
                      if (i !== `application/pdf`)
                        throw new r({ functionality: `file part media type ${i}` });
                      if (e.data.type === `url`)
                        throw new r({ functionality: `PDF file parts with URLs` });
                      return {
                        type: `file`,
                        file: {
                          filename: e.filename ?? `part-${t}.pdf`,
                          file_data: `data:application/pdf;base64,${H(e.data.data)}`,
                        },
                        ...(n != null && { prompt_cache_breakpoint: n }),
                      };
                    }
                  }
                }
              }
            }
          }),
        });
        break;
      case `assistant`: {
        let e = ``,
          t = [],
          r = !1,
          i = [];
        for (let n of o)
          switch (n.type) {
            case `text`: {
              let i = Z(n.providerOptions);
              ((e += n.text),
                t.push({
                  type: `text`,
                  text: n.text,
                  ...(i != null && { prompt_cache_breakpoint: i }),
                }),
                (r ||= i != null));
              break;
            }
            case `tool-call`:
              i.push({
                id: n.toolCallId,
                type: `function`,
                function: { name: n.toolName, arguments: Se(n.input) },
              });
              break;
          }
        n.push({
          role: `assistant`,
          content: r ? t : i.length > 0 ? e || null : e,
          tool_calls: i.length > 0 ? i : void 0,
        });
        break;
      }
      case `tool`:
        for (let e of o) {
          if (e.type === `tool-approval-response`) continue;
          let t = e.output,
            r =
              (t.type === `content`
                ? t.value.map((e) => Z(e.providerOptions)).find((e) => e != null)
                : Z(t.providerOptions)) ?? Z(e.providerOptions),
            i;
          switch (t.type) {
            case `text`:
            case `error-text`:
              i = t.value;
              break;
            case `execution-denied`:
              i = t.reason ?? `Tool call execution denied.`;
              break;
            case `content`:
            case `json`:
            case `error-json`:
              i = JSON.stringify(t.value);
              break;
          }
          n.push({
            role: `tool`,
            tool_call_id: e.toolCallId,
            content: r == null ? i : [{ type: `text`, text: i, prompt_cache_breakpoint: r }],
          });
        }
        break;
      default:
        throw Error(`Unsupported role: ${a}`);
    }
  return { messages: n, warnings: i };
}
function we({ id: e, model: t, created: n }) {
  return { id: e ?? void 0, modelId: t ?? void 0, timestamp: n ? new Date(n * 1e3) : void 0 };
}
function Te(e) {
  switch (e) {
    case `stop`:
      return `stop`;
    case `length`:
      return `length`;
    case `content_filter`:
      return `content-filter`;
    case `function_call`:
    case `tool_calls`:
      return `tool-calls`;
    default:
      return `other`;
  }
}
var Ee = F(() =>
    L(
      G({
        id: Y().nullish(),
        created: C().nullish(),
        model: Y().nullish(),
        choices: W(
          G({
            message: G({
              role: N(`assistant`).nullish(),
              content: Y().nullish(),
              tool_calls: W(
                G({
                  id: Y().nullish(),
                  type: N(`function`),
                  function: G({ name: Y(), arguments: Y() }),
                }),
              ).nullish(),
              annotations: W(
                G({
                  type: N(`url_citation`),
                  url_citation: G({ start_index: C(), end_index: C(), url: Y(), title: Y() }),
                }),
              ).nullish(),
            }),
            index: C(),
            logprobs: G({
              content: W(
                G({ token: Y(), logprob: C(), top_logprobs: W(G({ token: Y(), logprob: C() })) }),
              ).nullish(),
            }).nullish(),
            finish_reason: Y().nullish(),
          }),
        ),
        usage: G({
          prompt_tokens: C().nullish(),
          completion_tokens: C().nullish(),
          total_tokens: C().nullish(),
          prompt_tokens_details: G({
            cached_tokens: C().nullish(),
            cache_write_tokens: C().nullish(),
          }).nullish(),
          completion_tokens_details: G({
            reasoning_tokens: C().nullish(),
            accepted_prediction_tokens: C().nullish(),
            rejected_prediction_tokens: C().nullish(),
          }).nullish(),
        }).nullish(),
      }),
    ),
  ),
  De = F(() =>
    L(
      o([
        G({
          id: Y().nullish(),
          created: C().nullish(),
          model: Y().nullish(),
          choices: W(
            G({
              delta: G({
                role: U([`assistant`]).nullish(),
                content: Y().nullish(),
                tool_calls: W(
                  G({
                    index: C(),
                    id: Y().nullish(),
                    type: N(`function`).nullish(),
                    function: G({ name: Y().nullish(), arguments: Y().nullish() }),
                  }),
                ).nullish(),
                annotations: W(
                  G({
                    type: N(`url_citation`),
                    url_citation: G({ start_index: C(), end_index: C(), url: Y(), title: Y() }),
                  }),
                ).nullish(),
              }).nullish(),
              logprobs: G({
                content: W(
                  G({ token: Y(), logprob: C(), top_logprobs: W(G({ token: Y(), logprob: C() })) }),
                ).nullish(),
              }).nullish(),
              finish_reason: Y().nullish(),
              index: C(),
            }),
          ),
          usage: G({
            prompt_tokens: C().nullish(),
            completion_tokens: C().nullish(),
            total_tokens: C().nullish(),
            prompt_tokens_details: G({
              cached_tokens: C().nullish(),
              cache_write_tokens: C().nullish(),
            }).nullish(),
            completion_tokens_details: G({
              reasoning_tokens: C().nullish(),
              accepted_prediction_tokens: C().nullish(),
              rejected_prediction_tokens: C().nullish(),
            }).nullish(),
          }).nullish(),
        }),
        fe,
      ]),
    ),
  ),
  Oe = F(() =>
    L(
      G({
        logitBias: T(de(), C()).optional(),
        logprobs: o([A(), C()]).optional(),
        parallelToolCalls: A().optional(),
        user: Y().optional(),
        reasoningEffort: U([`none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`]).optional(),
        maxCompletionTokens: C().optional(),
        store: A().optional(),
        metadata: T(Y().max(64), Y().max(512)).optional(),
        prediction: T(Y(), I()).optional(),
        serviceTier: U([`auto`, `flex`, `priority`, `default`]).optional(),
        strictJsonSchema: A().optional(),
        textVerbosity: U([`low`, `medium`, `high`]).optional(),
        promptCacheKey: Y().optional(),
        promptCacheOptions: G({
          mode: U([`implicit`, `explicit`]).optional(),
          ttl: N(`30m`).optional(),
        }).optional(),
        promptCacheRetention: U([`in_memory`, `24h`]).optional(),
        safetyIdentifier: Y().optional(),
        systemMessageMode: U([`system`, `developer`, `remove`]).optional(),
        forceReasoning: A().optional(),
      }),
    ),
  );
function ke({ tools: e, toolChoice: t }) {
  e = e?.length ? e : void 0;
  let n = [];
  if (e == null) return { tools: void 0, toolChoice: void 0, toolWarnings: n };
  let i = [];
  for (let t of e)
    switch (t.type) {
      case `function`:
        i.push({
          type: `function`,
          function: {
            name: t.name,
            description: t.description,
            parameters: t.inputSchema,
            ...(t.strict == null ? {} : { strict: t.strict }),
          },
        });
        break;
      default:
        n.push({ type: `unsupported`, feature: `tool type: ${t.type}` });
        break;
    }
  if (t == null) return { tools: i, toolChoice: void 0, toolWarnings: n };
  let a = t.type;
  switch (a) {
    case `auto`:
    case `none`:
    case `required`:
      return { tools: i, toolChoice: a, toolWarnings: n };
    case `tool`:
      return {
        tools: i,
        toolChoice: { type: `function`, function: { name: t.toolName } },
        toolWarnings: n,
      };
    default:
      throw new r({ functionality: `tool choice type: ${a}` });
  }
}
var Ae = class e {
  constructor(e, t) {
    ((this.specificationVersion = `v4`),
      (this.supportedUrls = { "image/*": [/^https?:\/\/.*$/] }),
      (this.modelId = e),
      (this.config = t));
  }
  static [P](e) {
    return d({ modelId: e.modelId, config: e.config });
  }
  static [V](t) {
    return new e(t.modelId, t.config);
  }
  get provider() {
    return this.config.provider;
  }
  async getArgs({
    prompt: e,
    maxOutputTokens: t,
    temperature: n,
    topP: r,
    topK: i,
    frequencyPenalty: a,
    presencePenalty: o,
    stopSequences: c,
    responseFormat: l,
    seed: u,
    tools: d,
    toolChoice: f,
    reasoning: p,
    providerOptions: m,
  }) {
    let h = [],
      g = (await _({ provider: `openai`, providerOptions: m, schema: Oe })) ?? {},
      v = pe(this.modelId),
      y = g.reasoningEffort ?? (s(p) ? p : void 0),
      b = g.forceReasoning ?? v.isReasoningModel;
    i != null && h.push({ type: `unsupported`, feature: `topK` });
    let { messages: x, warnings: S } = Ce({
      prompt: e,
      systemMessageMode: g.systemMessageMode ?? (b ? `developer` : v.systemMessageMode),
    });
    h.push(...S);
    let C = g.strictJsonSchema ?? !0,
      w = {
        model: this.modelId,
        logit_bias: g.logitBias,
        logprobs: g.logprobs === !0 || typeof g.logprobs == `number` ? !0 : void 0,
        top_logprobs:
          typeof g.logprobs == `number`
            ? g.logprobs
            : typeof g.logprobs == `boolean` && g.logprobs
              ? 0
              : void 0,
        user: g.user,
        parallel_tool_calls: g.parallelToolCalls,
        max_tokens: t,
        temperature: n,
        top_p: r,
        frequency_penalty: a,
        presence_penalty: o,
        response_format:
          l?.type === `json`
            ? l.schema == null
              ? { type: `json_object` }
              : {
                  type: `json_schema`,
                  json_schema: {
                    schema: l.schema,
                    strict: C,
                    name: l.name ?? `response`,
                    description: l.description,
                  },
                }
            : void 0,
        stop: c,
        seed: u,
        verbosity: g.textVerbosity,
        max_completion_tokens: g.maxCompletionTokens,
        store: g.store,
        metadata: g.metadata,
        prediction: g.prediction,
        reasoning_effort: y,
        service_tier: g.serviceTier,
        prompt_cache_key: g.promptCacheKey,
        prompt_cache_options: g.promptCacheOptions,
        prompt_cache_retention: g.promptCacheRetention,
        safety_identifier: g.safetyIdentifier,
        messages: x,
      };
    (b
      ? ((y !== `none` || !v.supportsNonReasoningParameters) &&
          (w.temperature != null &&
            ((w.temperature = void 0),
            h.push({
              type: `unsupported`,
              feature: `temperature`,
              details: `temperature is not supported for reasoning models`,
            })),
          w.top_p != null &&
            ((w.top_p = void 0),
            h.push({
              type: `unsupported`,
              feature: `topP`,
              details: `topP is not supported for reasoning models`,
            })),
          w.logprobs != null &&
            ((w.logprobs = void 0),
            h.push({ type: `other`, message: `logprobs is not supported for reasoning models` }))),
        w.frequency_penalty != null &&
          ((w.frequency_penalty = void 0),
          h.push({
            type: `unsupported`,
            feature: `frequencyPenalty`,
            details: `frequencyPenalty is not supported for reasoning models`,
          })),
        w.presence_penalty != null &&
          ((w.presence_penalty = void 0),
          h.push({
            type: `unsupported`,
            feature: `presencePenalty`,
            details: `presencePenalty is not supported for reasoning models`,
          })),
        w.logit_bias != null &&
          ((w.logit_bias = void 0),
          h.push({ type: `other`, message: `logitBias is not supported for reasoning models` })),
        w.top_logprobs != null &&
          ((w.top_logprobs = void 0),
          h.push({ type: `other`, message: `topLogprobs is not supported for reasoning models` })),
        w.max_tokens != null &&
          ((w.max_completion_tokens ??= w.max_tokens), (w.max_tokens = void 0)))
      : (this.modelId.startsWith(`gpt-4o-search-preview`) ||
          this.modelId.startsWith(`gpt-4o-mini-search-preview`)) &&
        w.temperature != null &&
        ((w.temperature = void 0),
        h.push({
          type: `unsupported`,
          feature: `temperature`,
          details: `temperature is not supported for the search preview models and has been removed.`,
        })),
      g.serviceTier === `flex` &&
        !v.supportsFlexProcessing &&
        (h.push({
          type: `unsupported`,
          feature: `serviceTier`,
          details: `flex processing is only available for o3, o4-mini, and gpt-5 models`,
        }),
        (w.service_tier = void 0)),
      g.serviceTier === `priority` &&
        !v.supportsPriorityProcessing &&
        (h.push({
          type: `unsupported`,
          feature: `serviceTier`,
          details: `priority processing is only available for supported models (gpt-4, gpt-5, gpt-5-mini, o3, o4-mini) and requires Enterprise access. gpt-5-nano is not supported`,
        }),
        (w.service_tier = void 0)));
    let { tools: T, toolChoice: E, toolWarnings: D } = ke({ tools: d, toolChoice: f });
    return { args: { ...w, tools: T, tool_choice: E }, warnings: [...h, ...D] };
  }
  async doGenerate(e) {
    var t;
    let { args: n, warnings: r } = await this.getArgs(e),
      {
        responseHeaders: i,
        value: o,
        rawValue: s,
      } = await a({
        url: this.config.url({ path: `/chat/completions`, modelId: this.modelId }),
        headers: B((t = this.config).headers?.call(t), e.headers),
        body: n,
        failedResponseHandler: X,
        successfulResponseHandler: R(Ee),
        abortSignal: e.abortSignal,
        fetch: this.config.fetch,
      }),
      c = o.choices[0],
      l = [],
      u = c.message.content;
    u != null && u.length > 0 && l.push({ type: `text`, text: u });
    for (let e of c.message.tool_calls ?? [])
      l.push({
        type: `tool-call`,
        toolCallId: e.id ?? J(),
        toolName: e.function.name,
        input: e.function.arguments,
      });
    for (let e of c.message.annotations ?? [])
      l.push({
        type: `source`,
        sourceType: `url`,
        id: J(),
        url: e.url_citation.url,
        title: e.url_citation.title,
      });
    let d = o.usage?.completion_tokens_details,
      f = { openai: {} };
    return (
      d?.accepted_prediction_tokens != null &&
        (f.openai.acceptedPredictionTokens = d?.accepted_prediction_tokens),
      d?.rejected_prediction_tokens != null &&
        (f.openai.rejectedPredictionTokens = d?.rejected_prediction_tokens),
      c.logprobs?.content != null && (f.openai.logprobs = c.logprobs.content),
      {
        content: l,
        finishReason: { unified: Te(c.finish_reason), raw: c.finish_reason ?? void 0 },
        usage: xe(o.usage),
        request: { body: n },
        response: { ...we(o), headers: i, body: s },
        warnings: r,
        providerMetadata: f,
      }
    );
  }
  async doStream(e) {
    var t;
    let { args: n, warnings: r } = await this.getArgs(e),
      i = { ...n, stream: !0, stream_options: { include_usage: !0 } },
      o = this.config.url({ path: `/chat/completions`, modelId: this.modelId }),
      { responseHeaders: s, value: c } = await a({
        url: o,
        headers: B((t = this.config).headers?.call(t), e.headers),
        body: i,
        failedResponseHandler: X,
        successfulResponseHandler: O(De),
        abortSignal: e.abortSignal,
        fetch: this.config.fetch,
      }),
      l = await me({
        stream: c,
        getError: (e) => (`error` in e ? e.error : void 0),
        isOutputChunk: je,
        url: o,
        requestBodyValues: i,
        responseHeaders: s,
      }),
      u,
      d = { unified: `other`, raw: void 0 },
      f,
      p = !1,
      m = !1,
      h = { openai: {} };
    return {
      stream: l.pipeThrough(
        new TransformStream({
          start(e) {
            ((u = new oe(e, { generateId: J, typeValidation: `if-present` })),
              e.enqueue({ type: `stream-start`, warnings: r }));
          },
          transform(t, n) {
            if (
              (e.includeRawChunks && n.enqueue({ type: `raw`, rawValue: t.rawValue }), !t.success)
            ) {
              ((d = { unified: `error`, raw: void 0 }),
                n.enqueue({ type: `error`, error: t.error }));
              return;
            }
            let r = t.value;
            if (`error` in r) {
              ((d = { unified: `error`, raw: void 0 }),
                n.enqueue({ type: `error`, error: r.error }));
              return;
            }
            if (!p) {
              let e = we(r);
              Object.values(e).some(Boolean) &&
                ((p = !0), n.enqueue({ type: `response-metadata`, ...we(r) }));
            }
            r.usage != null &&
              ((f = r.usage),
              r.usage.completion_tokens_details?.accepted_prediction_tokens != null &&
                (h.openai.acceptedPredictionTokens =
                  r.usage.completion_tokens_details?.accepted_prediction_tokens),
              r.usage.completion_tokens_details?.rejected_prediction_tokens != null &&
                (h.openai.rejectedPredictionTokens =
                  r.usage.completion_tokens_details?.rejected_prediction_tokens));
            let i = r.choices[0];
            if (
              (i?.finish_reason != null &&
                (d = { unified: Te(i.finish_reason), raw: i.finish_reason }),
              i?.logprobs?.content != null && (h.openai.logprobs = i.logprobs.content),
              i?.delta == null)
            )
              return;
            let a = i.delta;
            if (
              (a.content != null &&
                ((m ||= (n.enqueue({ type: `text-start`, id: `0` }), !0)),
                n.enqueue({ type: `text-delta`, id: `0`, delta: a.content })),
              a.tool_calls != null)
            )
              for (let e of a.tool_calls) u.processDelta(e);
            if (a.annotations != null)
              for (let e of a.annotations)
                n.enqueue({
                  type: `source`,
                  sourceType: `url`,
                  id: J(),
                  url: e.url_citation.url,
                  title: e.url_citation.title,
                });
          },
          flush(e) {
            (m && e.enqueue({ type: `text-end`, id: `0` }),
              u.flush(),
              e.enqueue({
                type: `finish`,
                finishReason: d,
                usage: xe(f),
                ...(h == null ? {} : { providerMetadata: h }),
              }));
          },
        }),
      ),
      request: { body: i },
      response: { headers: s },
    };
  }
};
function je(e) {
  return `error` in e
    ? !1
    : e.choices.some((e) => {
        let t = e.delta;
        return (
          (t?.content != null && t.content.length > 0) ||
          (t?.tool_calls != null && t.tool_calls.length > 0) ||
          (t?.annotations != null && t.annotations.length > 0)
        );
      });
}
function Me(e) {
  if (e == null)
    return {
      inputTokens: { total: void 0, noCache: void 0, cacheRead: void 0, cacheWrite: void 0 },
      outputTokens: { total: void 0, text: void 0, reasoning: void 0 },
      raw: void 0,
    };
  let t = e.prompt_tokens ?? 0,
    n = e.completion_tokens ?? 0;
  return {
    inputTokens: {
      total: e.prompt_tokens ?? void 0,
      noCache: t,
      cacheRead: void 0,
      cacheWrite: void 0,
    },
    outputTokens: { total: e.completion_tokens ?? void 0, text: n, reasoning: void 0 },
    raw: e,
  };
}
function Ne({ prompt: e, user: n = `user`, assistant: i = `assistant` }) {
  let a = ``;
  e[0].role === `system` &&
    ((a += `${e[0].content}

`),
    (e = e.slice(1)));
  for (let { role: o, content: s } of e)
    switch (o) {
      case `system`:
        throw new t({ message: "Unexpected system message in prompt: ${content}", prompt: e });
      case `user`: {
        let e = s
          .map((e) => {
            switch (e.type) {
              case `text`:
                return e.text;
            }
          })
          .filter(Boolean)
          .join(``);
        a += `${n}:
${e}

`;
        break;
      }
      case `assistant`: {
        let e = s
          .map((e) => {
            switch (e.type) {
              case `text`:
                return e.text;
              case `tool-call`:
                throw new r({ functionality: `tool-call messages` });
            }
          })
          .join(``);
        a += `${i}:
${e}

`;
        break;
      }
      case `tool`:
        throw new r({ functionality: `tool messages` });
      default:
        throw Error(`Unsupported role: ${o}`);
    }
  return (
    (a += `${i}:
`),
    {
      prompt: a,
      stopSequences: [
        `
${n}:`,
      ],
    }
  );
}
function Pe({ id: e, model: t, created: n }) {
  return {
    id: e ?? void 0,
    modelId: t ?? void 0,
    timestamp: n == null ? void 0 : new Date(n * 1e3),
  };
}
function Fe(e) {
  switch (e) {
    case `stop`:
      return `stop`;
    case `length`:
      return `length`;
    case `content_filter`:
      return `content-filter`;
    case `function_call`:
    case `tool_calls`:
      return `tool-calls`;
    default:
      return `other`;
  }
}
var Ie = F(() =>
    L(
      G({
        id: Y().nullish(),
        created: C().nullish(),
        model: Y().nullish(),
        choices: W(
          G({
            text: Y(),
            finish_reason: Y(),
            logprobs: G({
              tokens: W(Y()),
              token_logprobs: W(C()),
              top_logprobs: W(T(Y(), C())).nullish(),
            }).nullish(),
          }),
        ),
        usage: G({ prompt_tokens: C(), completion_tokens: C(), total_tokens: C() }).nullish(),
      }),
    ),
  ),
  Le = F(() =>
    L(
      o([
        G({
          id: Y().nullish(),
          created: C().nullish(),
          model: Y().nullish(),
          choices: W(
            G({
              text: Y(),
              finish_reason: Y().nullish(),
              index: C(),
              logprobs: G({
                tokens: W(Y()),
                token_logprobs: W(C()),
                top_logprobs: W(T(Y(), C())).nullish(),
              }).nullish(),
            }),
          ),
          usage: G({ prompt_tokens: C(), completion_tokens: C(), total_tokens: C() }).nullish(),
        }),
        fe,
      ]),
    ),
  ),
  Re = F(() =>
    L(
      G({
        echo: A().optional(),
        logitBias: T(Y(), C()).optional(),
        suffix: Y().optional(),
        user: Y().optional(),
        logprobs: o([A(), C()]).optional(),
      }),
    ),
  ),
  ze = class e {
    constructor(e, t) {
      ((this.specificationVersion = `v4`),
        (this.supportedUrls = {}),
        (this.modelId = e),
        (this.config = t));
    }
    get providerOptionsName() {
      return this.config.provider.split(`.`)[0].trim();
    }
    static [P](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [V](t) {
      return new e(t.modelId, t.config);
    }
    get provider() {
      return this.config.provider;
    }
    async getArgs({
      prompt: e,
      maxOutputTokens: t,
      temperature: n,
      topP: r,
      topK: i,
      frequencyPenalty: a,
      presencePenalty: o,
      stopSequences: s,
      responseFormat: c,
      tools: l,
      toolChoice: u,
      seed: d,
      providerOptions: f,
    }) {
      let p = [],
        m = {
          ...(await _({ provider: `openai`, providerOptions: f, schema: Re })),
          ...(await _({ provider: this.providerOptionsName, providerOptions: f, schema: Re })),
        };
      (i != null && p.push({ type: `unsupported`, feature: `topK` }),
        l?.length && p.push({ type: `unsupported`, feature: `tools` }),
        u != null && p.push({ type: `unsupported`, feature: `toolChoice` }),
        c != null &&
          c.type !== `text` &&
          p.push({
            type: `unsupported`,
            feature: `responseFormat`,
            details: `JSON response format is not supported.`,
          }));
      let { prompt: h, stopSequences: g } = Ne({ prompt: e }),
        v = [...(g ?? []), ...(s ?? [])];
      return {
        args: {
          model: this.modelId,
          echo: m.echo,
          logit_bias: m.logitBias,
          logprobs: m?.logprobs === !0 ? 0 : m?.logprobs === !1 ? void 0 : m?.logprobs,
          suffix: m.suffix,
          user: m.user,
          max_tokens: t,
          temperature: n,
          top_p: r,
          frequency_penalty: a,
          presence_penalty: o,
          seed: d,
          prompt: h,
          stop: v.length > 0 ? v : void 0,
        },
        warnings: p,
      };
    }
    async doGenerate(e) {
      var t;
      let { args: n, warnings: r } = await this.getArgs(e),
        {
          responseHeaders: i,
          value: o,
          rawValue: s,
        } = await a({
          url: this.config.url({ path: `/completions`, modelId: this.modelId }),
          headers: B((t = this.config).headers?.call(t), e.headers),
          body: n,
          failedResponseHandler: X,
          successfulResponseHandler: R(Ie),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        c = o.choices[0],
        l = { openai: {} };
      return (
        c.logprobs != null && (l.openai.logprobs = c.logprobs),
        {
          content: [{ type: `text`, text: c.text }],
          usage: Me(o.usage),
          finishReason: { unified: Fe(c.finish_reason), raw: c.finish_reason ?? void 0 },
          request: { body: n },
          response: { ...Pe(o), headers: i, body: s },
          providerMetadata: l,
          warnings: r,
        }
      );
    }
    async doStream(e) {
      var t;
      let { args: n, warnings: r } = await this.getArgs(e),
        i = { ...n, stream: !0, stream_options: { include_usage: !0 } },
        o = this.config.url({ path: `/completions`, modelId: this.modelId }),
        { responseHeaders: s, value: c } = await a({
          url: o,
          headers: B((t = this.config).headers?.call(t), e.headers),
          body: i,
          failedResponseHandler: X,
          successfulResponseHandler: O(Le),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        l = await me({
          stream: c,
          getError: (e) => (`error` in e ? e.error : void 0),
          isOutputChunk: Be,
          url: o,
          requestBodyValues: i,
          responseHeaders: s,
        }),
        u = { unified: `other`, raw: void 0 },
        d = { openai: {} },
        f,
        p = !0;
      return {
        stream: l.pipeThrough(
          new TransformStream({
            start(e) {
              e.enqueue({ type: `stream-start`, warnings: r });
            },
            transform(t, n) {
              if (
                (e.includeRawChunks && n.enqueue({ type: `raw`, rawValue: t.rawValue }), !t.success)
              ) {
                ((u = { unified: `error`, raw: void 0 }),
                  n.enqueue({ type: `error`, error: t.error }));
                return;
              }
              let r = t.value;
              if (`error` in r) {
                ((u = { unified: `error`, raw: void 0 }),
                  n.enqueue({ type: `error`, error: r.error }));
                return;
              }
              (p &&
                ((p = !1),
                n.enqueue({ type: `response-metadata`, ...Pe(r) }),
                n.enqueue({ type: `text-start`, id: `0` })),
                r.usage != null && (f = r.usage));
              let i = r.choices[0];
              (i?.finish_reason != null &&
                (u = { unified: Fe(i.finish_reason), raw: i.finish_reason }),
                i?.logprobs != null && (d.openai.logprobs = i.logprobs),
                i?.text != null &&
                  i.text.length > 0 &&
                  n.enqueue({ type: `text-delta`, id: `0`, delta: i.text }));
            },
            flush(e) {
              (p || e.enqueue({ type: `text-end`, id: `0` }),
                e.enqueue({ type: `finish`, finishReason: u, providerMetadata: d, usage: Me(f) }));
            },
          }),
        ),
        request: { body: i },
        response: { headers: s },
      };
    }
  };
function Be(e) {
  return !(`error` in e) && e.choices.some((e) => e.text.length > 0);
}
var Ve = F(() => L(G({ dimensions: C().optional(), user: Y().optional() }))),
  He = F(() =>
    L(G({ data: W(G({ embedding: W(C()) })), usage: G({ prompt_tokens: C() }).nullish() })),
  ),
  Ue = class e {
    constructor(e, t) {
      ((this.specificationVersion = `v4`),
        (this.maxEmbeddingsPerCall = 2048),
        (this.supportsParallelCalls = !0),
        (this.modelId = e),
        (this.config = t));
    }
    static [P](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [V](t) {
      return new e(t.modelId, t.config);
    }
    get provider() {
      return this.config.provider;
    }
    async doEmbed({ values: e, headers: t, abortSignal: r, providerOptions: i }) {
      var o;
      if (e.length > this.maxEmbeddingsPerCall)
        throw new n({
          provider: this.provider,
          modelId: this.modelId,
          maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
          values: e,
        });
      let s = (await _({ provider: `openai`, providerOptions: i, schema: Ve })) ?? {},
        {
          responseHeaders: c,
          value: l,
          rawValue: u,
        } = await a({
          url: this.config.url({ path: `/embeddings`, modelId: this.modelId }),
          headers: B((o = this.config).headers?.call(o), t),
          body: {
            model: this.modelId,
            input: e,
            encoding_format: `float`,
            dimensions: s.dimensions,
            user: s.user,
          },
          failedResponseHandler: X,
          successfulResponseHandler: R(He),
          abortSignal: r,
          fetch: this.config.fetch,
        });
      return {
        warnings: [],
        embeddings: l.data.map((e) => e.embedding),
        usage: l.usage ? { tokens: l.usage.prompt_tokens } : void 0,
        response: { headers: c, body: u },
      };
    }
  },
  We = F(() =>
    L(
      G({
        id: Y(),
        object: Y().nullish(),
        bytes: C().nullish(),
        created_at: C().nullish(),
        filename: Y().nullish(),
        purpose: Y().nullish(),
        status: Y().nullish(),
        expires_at: C().nullish(),
      }),
    ),
  ),
  Ge = F(() => L(G({ purpose: Y().optional(), expiresAfter: C().optional() }))),
  Ke = class {
    constructor(e) {
      ((this.config = e), (this.specificationVersion = `v4`));
    }
    get provider() {
      return this.config.provider;
    }
    async uploadFile({ data: e, mediaType: t, filename: n, providerOptions: r }) {
      let i = await _({ provider: `openai`, providerOptions: r, schema: Ge }),
        a = ie(e),
        o = new Blob([a], { type: t }),
        s = new FormData();
      (n == null ? s.append(`file`, o) : s.append(`file`, o, n),
        s.append(`purpose`, i?.purpose ?? `assistants`),
        i?.expiresAfter != null && s.append(`expires_after`, String(i.expiresAfter)));
      let { value: c } = await ue({
        url: `${this.config.baseURL}/files`,
        headers: B(this.config.headers()),
        formData: s,
        failedResponseHandler: X,
        successfulResponseHandler: R(We),
        fetch: this.config.fetch,
      });
      return {
        warnings: [],
        providerReference: { openai: c.id },
        ...((c.filename ?? n) ? { filename: c.filename ?? n } : {}),
        ...(t == null ? {} : { mediaType: t }),
        providerMetadata: {
          openai: {
            ...(c.filename == null ? {} : { filename: c.filename }),
            ...(c.purpose == null ? {} : { purpose: c.purpose }),
            ...(c.bytes == null ? {} : { bytes: c.bytes }),
            ...(c.created_at == null ? {} : { createdAt: c.created_at }),
            ...(c.status == null ? {} : { status: c.status }),
            ...(c.expires_at == null ? {} : { expiresAt: c.expires_at }),
          },
        },
      };
    }
  },
  qe = F(() =>
    L(
      G({
        created: C().nullish(),
        data: W(G({ b64_json: Y(), revised_prompt: Y().nullish() })),
        background: Y().nullish(),
        output_format: Y().nullish(),
        size: Y().nullish(),
        quality: Y().nullish(),
        usage: G({
          input_tokens: C().nullish(),
          output_tokens: C().nullish(),
          total_tokens: C().nullish(),
          input_tokens_details: G({
            image_tokens: C().nullish(),
            text_tokens: C().nullish(),
          }).nullish(),
        }).nullish(),
      }),
    ),
  ),
  Je = {
    "dall-e-3": 1,
    "dall-e-2": 10,
    "gpt-image-1": 10,
    "gpt-image-1-mini": 10,
    "gpt-image-1.5": 10,
    "gpt-image-2": 10,
    "chatgpt-image-latest": 10,
  },
  Ye = [`chatgpt-image-`, `gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-1`, `gpt-image-2`];
function Xe(e) {
  return Ye.some((t) => e.startsWith(t));
}
var Ze = G({
  quality: U([`standard`, `hd`, `low`, `medium`, `high`, `auto`]).optional(),
  background: U([`transparent`, `opaque`, `auto`]).optional(),
  outputFormat: U([`png`, `jpeg`, `webp`]).optional(),
  outputCompression: C().int().min(0).max(100).optional(),
  user: Y().optional(),
});
F(() => L(Ze));
var Qe = F(() =>
    L(
      Ze.extend({
        style: U([`vivid`, `natural`]).optional(),
        moderation: U([`auto`, `low`]).optional(),
      }),
    ),
  ),
  $e = F(() => L(Ze.extend({ inputFidelity: U([`high`, `low`]).optional() }))),
  et = class e {
    constructor(e, t) {
      ((this.modelId = e), (this.config = t), (this.specificationVersion = `v4`));
    }
    static [P](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [V](t) {
      return new e(t.modelId, t.config);
    }
    get maxImagesPerCall() {
      return Je[this.modelId] ?? 1;
    }
    get provider() {
      return this.config.provider;
    }
    async doGenerate({
      prompt: e,
      files: t,
      mask: n,
      n: r,
      size: i,
      aspectRatio: o,
      seed: s,
      providerOptions: c,
      headers: l,
      abortSignal: u,
    }) {
      var d, f, p;
      let m = [];
      (o != null &&
        m.push({
          type: `unsupported`,
          feature: `aspectRatio`,
          details: "This model does not support aspect ratio. Use `size` instead.",
        }),
        s != null && m.push({ type: `unsupported`, feature: `seed` }));
      let h = (d = this.config._internal)?.currentDate?.call(d) ?? new Date();
      if (t != null) {
        let a = (await _({ provider: `openai`, providerOptions: c, schema: $e })) ?? {},
          { value: o, responseHeaders: s } = await ue({
            url: this.config.url({ path: `/images/edits`, modelId: this.modelId }),
            headers: B((f = this.config).headers?.call(f), l),
            formData: E({
              model: this.modelId,
              prompt: e,
              image: await Promise.all(
                t.map((e) =>
                  e.type === `file`
                    ? new Blob(
                        [
                          e.data instanceof Uint8Array
                            ? new Blob([e.data], { type: e.mediaType })
                            : new Blob([w(e.data)], { type: e.mediaType }),
                        ],
                        { type: e.mediaType },
                      )
                    : le(e.url),
                ),
              ),
              mask: n == null ? void 0 : await nt(n),
              n: r,
              size: i,
              quality: a.quality,
              background: a.background,
              output_format: a.outputFormat,
              output_compression: a.outputCompression,
              input_fidelity: a.inputFidelity,
              user: a.user,
            }),
            failedResponseHandler: X,
            successfulResponseHandler: R(qe),
            abortSignal: u,
            fetch: this.config.fetch,
          });
        return {
          images: o.data.map((e) => e.b64_json),
          warnings: m,
          usage:
            o.usage == null
              ? void 0
              : {
                  inputTokens: o.usage.input_tokens ?? void 0,
                  outputTokens: o.usage.output_tokens ?? void 0,
                  totalTokens: o.usage.total_tokens ?? void 0,
                },
          response: { timestamp: h, modelId: this.modelId, headers: s },
          providerMetadata: {
            openai: {
              images: o.data.map((e, t) => ({
                ...(e.revised_prompt ? { revisedPrompt: e.revised_prompt } : {}),
                created: o.created ?? void 0,
                size: o.size ?? void 0,
                quality: o.quality ?? void 0,
                background: o.background ?? void 0,
                outputFormat: o.output_format ?? void 0,
                ...tt(o.usage?.input_tokens_details, t, o.data.length),
              })),
            },
          },
        };
      }
      let g = (await _({ provider: `openai`, providerOptions: c, schema: Qe })) ?? {},
        { value: v, responseHeaders: y } = await a({
          url: this.config.url({ path: `/images/generations`, modelId: this.modelId }),
          headers: B((p = this.config).headers?.call(p), l),
          body: {
            model: this.modelId,
            prompt: e,
            n: r,
            size: i,
            quality: g.quality,
            style: g.style,
            background: g.background,
            moderation: g.moderation,
            output_format: g.outputFormat,
            output_compression: g.outputCompression,
            user: g.user,
            ...(Xe(this.modelId) ? {} : { response_format: `b64_json` }),
          },
          failedResponseHandler: X,
          successfulResponseHandler: R(qe),
          abortSignal: u,
          fetch: this.config.fetch,
        });
      return {
        images: v.data.map((e) => e.b64_json),
        warnings: m,
        usage:
          v.usage == null
            ? void 0
            : {
                inputTokens: v.usage.input_tokens ?? void 0,
                outputTokens: v.usage.output_tokens ?? void 0,
                totalTokens: v.usage.total_tokens ?? void 0,
              },
        response: { timestamp: h, modelId: this.modelId, headers: y },
        providerMetadata: {
          openai: {
            images: v.data.map((e, t) => ({
              ...(e.revised_prompt ? { revisedPrompt: e.revised_prompt } : {}),
              created: v.created ?? void 0,
              size: v.size ?? void 0,
              quality: v.quality ?? void 0,
              background: v.background ?? void 0,
              outputFormat: v.output_format ?? void 0,
              ...tt(v.usage?.input_tokens_details, t, v.data.length),
            })),
          },
        },
      };
    }
  };
function tt(e, t, n) {
  if (e == null) return {};
  let r = {};
  if (e.image_tokens != null) {
    let i = Math.floor(e.image_tokens / n),
      a = e.image_tokens - i * (n - 1);
    r.imageTokens = t === n - 1 ? a : i;
  }
  if (e.text_tokens != null) {
    let i = Math.floor(e.text_tokens / n),
      a = e.text_tokens - i * (n - 1);
    r.textTokens = t === n - 1 ? a : i;
  }
  return r;
}
async function nt(e) {
  if (!e) return;
  if (e.type === `url`) return le(e.url);
  let t = e.data instanceof Uint8Array ? e.data : w(e.data);
  return new Blob([t], { type: e.mediaType });
}
var rt = F(() =>
    L(
      G({
        callId: Y(),
        operation: z(`type`, [
          G({ type: N(`create_file`), path: Y(), diff: Y() }),
          G({ type: N(`delete_file`), path: Y() }),
          G({ type: N(`update_file`), path: Y(), diff: Y() }),
        ]),
      }),
    ),
  ),
  it = F(() => L(G({ status: U([`completed`, `failed`]), output: Y().optional() })));
F(() => L(G({})));
var at = M({ id: `openai.apply_patch`, inputSchema: rt, outputSchema: it }),
  ot = F(() => L(G({ code: Y().nullish(), containerId: Y() }))),
  st = F(() =>
    L(
      G({
        outputs: W(
          z(`type`, [G({ type: N(`logs`), logs: Y() }), G({ type: N(`image`), url: Y() })]),
        ).nullish(),
      }),
    ),
  ),
  ct = F(() => L(G({ container: o([Y(), G({ fileIds: W(Y()).optional() })]).optional() }))),
  lt = j({ id: `openai.code_interpreter`, inputSchema: ot, outputSchema: st }),
  ut = (e = {}) => lt(e),
  dt = G({ id: Y(), code: Y().optional(), message: Y().optional() }),
  ft = z(`type`, [
    G({
      type: N(`click`),
      button: U([`left`, `right`, `wheel`, `back`, `forward`]),
      x: C(),
      y: C(),
      keys: W(Y()).optional(),
    }),
    G({ type: N(`double_click`), x: C(), y: C(), keys: W(Y()).optional() }),
    G({ type: N(`drag`), path: W(G({ x: C(), y: C() })), keys: W(Y()).optional() }),
    G({ type: N(`keypress`), keys: W(Y()) }),
    G({ type: N(`move`), x: C(), y: C(), keys: W(Y()).optional() }),
    G({ type: N(`screenshot`) }),
    G({ type: N(`scroll`), x: C(), y: C(), scrollX: C(), scrollY: C(), keys: W(Y()).optional() }),
    G({ type: N(`type`), text: Y() }),
    G({ type: N(`wait`) }),
  ]),
  pt = F(() =>
    L(
      G({
        actions: W(ft),
        pendingSafetyChecks: W(dt),
        status: U([`in_progress`, `completed`, `incomplete`]),
      }),
    ),
  ),
  mt = F(() =>
    L(
      G({
        output: o([
          G({
            type: N(`computer_screenshot`),
            imageUrl: Y(),
            fileId: Y().optional(),
            detail: U([`auto`, `low`, `high`, `original`]).optional(),
          }),
          G({
            type: N(`computer_screenshot`),
            fileId: Y(),
            imageUrl: Y().optional(),
            detail: U([`auto`, `low`, `high`, `original`]).optional(),
          }),
        ]),
        acknowledgedSafetyChecks: W(dt).optional(),
      }),
    ),
  ),
  ht = M({ id: `openai.computer`, inputSchema: pt, outputSchema: mt }),
  gt = (e = {}) => ht(e),
  _t = F(() =>
    L(
      G({
        description: Y().optional(),
        format: o([
          G({ type: N(`grammar`), syntax: U([`regex`, `lark`]), definition: Y() }),
          G({ type: N(`text`) }),
        ]).optional(),
      }),
    ),
  ),
  vt = ne({ id: `openai.custom`, inputSchema: F(() => L(Y())) }),
  yt = (e) => vt(e),
  bt = G({
    key: Y(),
    type: U([`eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`]),
    value: o([Y(), C(), A(), W(Y())]),
  }),
  xt = G({ type: U([`and`, `or`]), filters: W(o([bt, re(() => xt)])) }),
  St = F(() =>
    L(
      G({
        vectorStoreIds: W(Y()),
        maxNumResults: C().optional(),
        ranking: G({ ranker: Y().optional(), scoreThreshold: C().optional() }).optional(),
        filters: o([bt, xt]).optional(),
      }),
    ),
  ),
  Ct = F(() =>
    L(
      G({
        queries: W(Y()),
        results: W(
          G({ attributes: T(Y(), q()), fileId: Y(), filename: Y(), score: C(), text: Y() }),
        ).nullable(),
      }),
    ),
  ),
  wt = j({ id: `openai.file_search`, inputSchema: G({}), outputSchema: Ct }),
  Tt = F(() =>
    L(
      G({
        background: U([`auto`, `opaque`, `transparent`]).optional(),
        inputFidelity: U([`low`, `high`]).optional(),
        inputImageMask: G({ fileId: Y().optional(), imageUrl: Y().optional() }).optional(),
        model: Y().optional(),
        moderation: U([`auto`]).optional(),
        outputCompression: C().int().min(0).max(100).optional(),
        outputFormat: U([`png`, `jpeg`, `webp`]).optional(),
        partialImages: C().int().min(0).max(3).optional(),
        quality: U([`auto`, `low`, `medium`, `high`]).optional(),
        size: U([`1024x1024`, `1024x1536`, `1536x1024`, `auto`]).optional(),
      }).strict(),
    ),
  ),
  Et = j({
    id: `openai.image_generation`,
    inputSchema: F(() => L(G({}))),
    outputSchema: F(() => L(G({ result: Y() }))),
  }),
  Dt = (e = {}) => Et(e),
  Ot = F(() =>
    L(
      G({
        action: G({
          type: N(`exec`),
          command: W(Y()),
          timeoutMs: C().optional(),
          user: Y().optional(),
          workingDirectory: Y().optional(),
          env: T(Y(), Y()).optional(),
        }),
      }),
    ),
  ),
  kt = F(() => L(G({ output: Y() }))),
  At = M({ id: `openai.local_shell`, inputSchema: Ot, outputSchema: kt }),
  jt = F(() =>
    L(
      G({
        action: G({ commands: W(Y()), timeoutMs: C().optional(), maxOutputLength: C().optional() }),
      }),
    ),
  ),
  Mt = F(() =>
    L(
      G({
        output: W(
          G({
            stdout: Y(),
            stderr: Y(),
            outcome: z(`type`, [G({ type: N(`timeout`) }), G({ type: N(`exit`), exitCode: C() })]),
          }),
        ),
      }),
    ),
  ),
  Nt = W(
    z(`type`, [
      G({ type: N(`skillReference`), providerReference: T(Y(), Y()), version: Y().optional() }),
      G({
        type: N(`inline`),
        name: Y(),
        description: Y(),
        source: G({ type: N(`base64`), mediaType: N(`application/zip`), data: Y() }),
      }),
    ]),
  ).optional(),
  Pt = F(() =>
    L(
      G({
        environment: o([
          G({
            type: N(`containerAuto`),
            fileIds: W(Y()).optional(),
            memoryLimit: U([`1g`, `4g`, `16g`, `64g`]).optional(),
            networkPolicy: z(`type`, [
              G({ type: N(`disabled`) }),
              G({
                type: N(`allowlist`),
                allowedDomains: W(Y()),
                domainSecrets: W(G({ domain: Y(), name: Y(), value: Y() })).optional(),
              }),
            ]).optional(),
            skills: Nt,
          }),
          G({ type: N(`containerReference`), containerId: Y() }),
          G({
            type: N(`local`).optional(),
            skills: W(G({ name: Y(), description: Y(), path: Y() })).optional(),
          }),
        ]).optional(),
      }),
    ),
  ),
  Ft = M({ id: `openai.shell`, inputSchema: jt, outputSchema: Mt }),
  It = F(() =>
    L(
      G({
        execution: U([`server`, `client`]).optional(),
        description: Y().optional(),
        parameters: T(Y(), q()).optional(),
      }),
    ),
  ),
  Lt = F(() => L(G({ arguments: q().optional(), call_id: Y().nullish() }))),
  Rt = F(() => L(G({ tools: W(T(Y(), q())) }))),
  zt = M({ id: `openai.tool_search`, inputSchema: Lt, outputSchema: Rt }),
  Bt = (e = {}) => zt(e),
  Vt = F(() =>
    L(
      G({
        externalWebAccess: A().optional(),
        filters: G({ allowedDomains: W(Y()).optional() }).optional(),
        searchContextSize: U([`low`, `medium`, `high`]).optional(),
        userLocation: G({
          type: N(`approximate`),
          country: Y().optional(),
          city: Y().optional(),
          region: Y().optional(),
          timezone: Y().optional(),
        }).optional(),
      }),
    ),
  ),
  Ht = j({
    id: `openai.web_search`,
    inputSchema: F(() => L(G({}))),
    outputSchema: F(() =>
      L(
        G({
          action: z(`type`, [
            G({ type: N(`search`), query: Y().optional(), queries: W(Y()).optional() }),
            G({ type: N(`openPage`), url: Y().nullish() }),
            G({ type: N(`findInPage`), url: Y().nullish(), pattern: Y().nullish() }),
          ]).optional(),
          sources: W(
            z(`type`, [G({ type: N(`url`), url: Y() }), G({ type: N(`api`), name: Y() })]),
          ).optional(),
        }),
      ),
    ),
  }),
  Ut = (e = {}) => Ht(e),
  Wt = F(() =>
    L(
      G({
        searchContextSize: U([`low`, `medium`, `high`]).optional(),
        userLocation: G({
          type: N(`approximate`),
          country: Y().optional(),
          city: Y().optional(),
          region: Y().optional(),
          timezone: Y().optional(),
        }).optional(),
      }),
    ),
  ),
  Gt = j({
    id: `openai.web_search_preview`,
    inputSchema: F(() => L(G({}))),
    outputSchema: F(() =>
      L(
        G({
          action: z(`type`, [
            G({ type: N(`search`), query: Y().optional() }),
            G({ type: N(`openPage`), url: Y().nullish() }),
            G({ type: N(`findInPage`), url: Y().nullish(), pattern: Y().nullish() }),
          ]).optional(),
        }),
      ),
    ),
  }),
  Kt = re(() => o([Y(), C(), A(), D(), W(Kt), T(Y(), Kt)])),
  qt = F(() =>
    L(
      G({
        serverLabel: Y(),
        allowedTools: o([
          W(Y()),
          G({ readOnly: A().optional(), toolNames: W(Y()).optional() }),
        ]).optional(),
        authorization: Y().optional(),
        connectorId: Y().optional(),
        headers: T(Y(), Y()).optional(),
        requireApproval: o([
          U([`always`, `never`]),
          G({ never: G({ toolNames: W(Y()).optional() }).optional() }),
        ]).optional(),
        serverDescription: Y().optional(),
        serverUrl: Y().optional(),
      }).refine(
        (e) => e.serverUrl != null || e.connectorId != null,
        `One of serverUrl or connectorId must be provided.`,
      ),
    ),
  ),
  Jt = j({
    id: `openai.mcp`,
    inputSchema: F(() => L(G({}))),
    outputSchema: F(() =>
      L(
        G({
          type: N(`call`),
          serverLabel: Y(),
          name: Y(),
          arguments: Y(),
          output: Y().nullish(),
          error: o([Y(), Kt]).optional(),
        }),
      ),
    ),
  }),
  Yt = {
    applyPatch: at,
    customTool: yt,
    codeInterpreter: ut,
    computer: gt,
    fileSearch: wt,
    imageGeneration: Dt,
    localShell: At,
    shell: Ft,
    webSearchPreview: Gt,
    webSearch: Ut,
    mcp: (e) => Jt(e),
    toolSearch: Bt,
  };
function Xt(e) {
  let t = e,
    n = t.type;
  switch (n) {
    case `session.created`:
      return { type: `session-created`, sessionId: t.session?.id, raw: e };
    case `session.updated`:
      return { type: `session-updated`, raw: e };
    case `input_audio_buffer.speech_started`:
      return { type: `speech-started`, itemId: t.item_id, raw: e };
    case `input_audio_buffer.speech_stopped`:
      return { type: `speech-stopped`, itemId: t.item_id, raw: e };
    case `input_audio_buffer.committed`:
      return {
        type: `audio-committed`,
        itemId: t.item_id,
        previousItemId: t.previous_item_id,
        raw: e,
      };
    case `conversation.item.added`:
      return {
        type: `conversation-item-added`,
        itemId: t.item?.id ?? t.item_id,
        item: t.item,
        raw: e,
      };
    case `conversation.item.input_audio_transcription.completed`:
      return {
        type: `input-transcription-completed`,
        itemId: t.item_id,
        transcript: t.transcript ?? ``,
        raw: e,
      };
    case `response.created`:
      return { type: `response-created`, responseId: t.response?.id ?? t.response_id, raw: e };
    case `response.done`:
      return {
        type: `response-done`,
        responseId: t.response?.id ?? t.response_id,
        status: t.response?.status ?? `completed`,
        raw: e,
      };
    case `response.output_item.added`:
      return {
        type: `output-item-added`,
        responseId: t.response_id,
        itemId: t.item?.id ?? t.item_id,
        raw: e,
      };
    case `response.output_item.done`:
      return {
        type: `output-item-done`,
        responseId: t.response_id,
        itemId: t.item?.id ?? t.item_id,
        raw: e,
      };
    case `response.content_part.added`:
      return { type: `content-part-added`, responseId: t.response_id, itemId: t.item_id, raw: e };
    case `response.content_part.done`:
      return { type: `content-part-done`, responseId: t.response_id, itemId: t.item_id, raw: e };
    case `response.output_audio.delta`:
      return {
        type: `audio-delta`,
        responseId: t.response_id,
        itemId: t.item_id,
        delta: t.delta,
        raw: e,
      };
    case `response.output_audio.done`:
      return { type: `audio-done`, responseId: t.response_id, itemId: t.item_id, raw: e };
    case `response.output_audio_transcript.delta`:
      return {
        type: `audio-transcript-delta`,
        responseId: t.response_id,
        itemId: t.item_id,
        delta: t.delta,
        raw: e,
      };
    case `response.output_audio_transcript.done`:
      return {
        type: `audio-transcript-done`,
        responseId: t.response_id,
        itemId: t.item_id,
        transcript: t.transcript,
        raw: e,
      };
    case `response.output_text.delta`:
      return {
        type: `text-delta`,
        responseId: t.response_id,
        itemId: t.item_id,
        delta: t.delta,
        raw: e,
      };
    case `response.output_text.done`:
      return {
        type: `text-done`,
        responseId: t.response_id,
        itemId: t.item_id,
        text: t.text,
        raw: e,
      };
    case `response.function_call_arguments.delta`:
      return {
        type: `function-call-arguments-delta`,
        responseId: t.response_id,
        itemId: t.item_id,
        callId: t.call_id,
        delta: t.delta,
        raw: e,
      };
    case `response.function_call_arguments.done`:
      return {
        type: `function-call-arguments-done`,
        responseId: t.response_id,
        itemId: t.item_id,
        callId: t.call_id,
        name: t.name,
        arguments: t.arguments,
        raw: e,
      };
    case `error`:
      return {
        type: `error`,
        message: t.error?.message ?? t.message ?? `Unknown error`,
        code: t.error?.code ?? t.code,
        raw: e,
      };
    default:
      return { type: `custom`, rawType: n, raw: e };
  }
}
function Zt(e, t) {
  switch (e.type) {
    case `session-update`:
      return { type: `session.update`, session: Qt(e.config, t) };
    case `input-audio-append`:
      return { type: `input_audio_buffer.append`, audio: e.audio };
    case `input-audio-commit`:
      return { type: `input_audio_buffer.commit` };
    case `input-audio-clear`:
      return { type: `input_audio_buffer.clear` };
    case `conversation-item-create`: {
      let t = e.item;
      switch (t.type) {
        case `text-message`:
          return {
            type: `conversation.item.create`,
            item: {
              type: `message`,
              role: t.role,
              content: [{ type: `input_text`, text: t.text }],
            },
          };
        case `audio-message`:
          return {
            type: `conversation.item.create`,
            item: {
              type: `message`,
              role: t.role,
              content: [{ type: `input_audio`, audio: t.audio }],
            },
          };
        case `function-call-output`:
          return {
            type: `conversation.item.create`,
            item: { type: `function_call_output`, call_id: t.callId, output: t.output },
          };
      }
      break;
    }
    case `conversation-item-truncate`:
      return {
        type: `conversation.item.truncate`,
        item_id: e.itemId,
        content_index: e.contentIndex,
        audio_end_ms: e.audioEndMs,
      };
    case `response-create`:
      return {
        type: `response.create`,
        ...(e.options == null
          ? {}
          : {
              response: {
                ...(e.options.modalities == null
                  ? {}
                  : { output_modalities: e.options.modalities }),
                ...(e.options.instructions == null ? {} : { instructions: e.options.instructions }),
                ...(e.options.metadata == null ? {} : { metadata: e.options.metadata }),
              },
            }),
      };
    case `response-cancel`:
      return { type: `response.cancel` };
  }
}
function Qt(e, t) {
  let n = { type: `realtime`, model: t };
  (e.instructions != null && (n.instructions = e.instructions),
    e.outputModalities != null && (n.output_modalities = e.outputModalities));
  let r = {};
  if (e.inputAudioFormat != null || e.inputAudioTranscription != null || e.turnDetection != null) {
    let t = {};
    if (
      (e.inputAudioFormat != null &&
        (t.format = {
          type: e.inputAudioFormat.type,
          ...(e.inputAudioFormat.rate == null ? {} : { rate: e.inputAudioFormat.rate }),
        }),
      e.turnDetection != null)
    )
      if (e.turnDetection.type === `disabled`) t.turn_detection = null;
      else {
        let n = { type: e.turnDetection.type === `server-vad` ? `server_vad` : `semantic_vad` };
        (e.turnDetection.threshold != null && (n.threshold = e.turnDetection.threshold),
          e.turnDetection.silenceDurationMs != null &&
            (n.silence_duration_ms = e.turnDetection.silenceDurationMs),
          e.turnDetection.prefixPaddingMs != null &&
            (n.prefix_padding_ms = e.turnDetection.prefixPaddingMs),
          (t.turn_detection = n));
      }
    (e.inputAudioTranscription != null &&
      (t.transcription = {
        model: e.inputAudioTranscription.model ?? `gpt-realtime-whisper`,
        ...(e.inputAudioTranscription.language == null
          ? {}
          : { language: e.inputAudioTranscription.language }),
        ...(e.inputAudioTranscription.prompt == null
          ? {}
          : { prompt: e.inputAudioTranscription.prompt }),
      }),
      (r.input = t));
  }
  if (e.outputAudioFormat != null || e.voice != null) {
    let t = {};
    (e.outputAudioFormat != null &&
      (t.format = {
        type: e.outputAudioFormat.type,
        ...(e.outputAudioFormat.rate == null ? {} : { rate: e.outputAudioFormat.rate }),
      }),
      e.voice != null && (t.voice = e.voice),
      (r.output = t));
  }
  return (
    Object.keys(r).length > 0 && (n.audio = r),
    e.tools != null &&
      e.tools.length > 0 &&
      ((n.tools = e.tools.map((e) => ({
        type: e.type,
        name: e.name,
        description: e.description,
        parameters: e.parameters,
      }))),
      (n.tool_choice = `auto`)),
    e.providerOptions != null && Object.assign(n, e.providerOptions),
    n
  );
}
var $t = class {
  constructor(e, t) {
    ((this.specificationVersion = `v4`),
      (this.modelId = e),
      (this.provider = t.provider),
      (this.config = t));
  }
  async doCreateClientSecret(e) {
    let t = this.config.fetch ?? fetch,
      n = `${this.config.baseURL}/realtime/client_secrets`,
      r =
        e.sessionConfig == null
          ? { type: `realtime`, model: this.modelId }
          : Qt(e.sessionConfig, this.modelId),
      i = await t(n, {
        method: `POST`,
        headers: { ...this.config.headers(), "Content-Type": `application/json` },
        body: JSON.stringify({
          session: r,
          ...(e.expiresAfterSeconds == null
            ? {}
            : { expires_after: { anchor: `created_at`, seconds: e.expiresAfterSeconds } }),
        }),
      });
    if (!i.ok) {
      let e = await i.text();
      throw Error(`OpenAI realtime client secret request failed: ${i.status} ${e}`);
    }
    let a = await i.json();
    return {
      token: a.value,
      url: `wss://${new URL(this.config.baseURL).host}/v1/realtime?model=${encodeURIComponent(this.modelId)}`,
      expiresAt: a.expires_at,
    };
  }
  getWebSocketConfig(e) {
    return { url: e.url, protocols: [`realtime`, `openai-insecure-api-key.${e.token}`] };
  }
  parseServerEvent(e) {
    return Xt(e);
  }
  serializeClientEvent(e) {
    return Zt(e, this.modelId);
  }
  buildSessionConfig(e) {
    return Qt(e, this.modelId);
  }
};
function en(e) {
  if (e == null)
    return {
      inputTokens: { total: void 0, noCache: void 0, cacheRead: void 0, cacheWrite: void 0 },
      outputTokens: { total: void 0, text: void 0, reasoning: void 0 },
      raw: void 0,
    };
  let t = e.input_tokens,
    n = e.output_tokens,
    r = e.input_tokens_details?.cached_tokens ?? 0,
    i = e.input_tokens_details?.cache_write_tokens ?? void 0,
    a = e.output_tokens_details?.reasoning_tokens ?? 0;
  return {
    inputTokens: { total: t, noCache: t - r - (i ?? 0), cacheRead: r, cacheWrite: i },
    outputTokens: { total: n, text: n - a, reasoning: a },
    raw: e,
  };
}
function tn(e) {
  return JSON.stringify(e === void 0 ? {} : e);
}
function Q(e, t) {
  return e?.[t]?.promptCacheBreakpoint;
}
function nn(e, t) {
  return t ? t.some((t) => e.startsWith(t)) : !1;
}
async function rn({
  prompt: e,
  toolNameMapping: t,
  systemMessageMode: n,
  providerOptionsName: i,
  fileIdPrefixes: a,
  passThroughUnsupportedFiles: o = !1,
  store: s,
  hasConversation: c = !1,
  hasPreviousResponseId: u = !1,
  hasLocalShellTool: d = !1,
  hasShellTool: p = !1,
  hasApplyPatchTool: m = !1,
  hasComputerTool: v = !1,
  customProviderToolNames: b,
}) {
  let x = [],
    S = [],
    C = new Set();
  for (let { role: w, content: T, providerOptions: E } of e)
    switch (w) {
      case `system`:
        switch (n) {
          case `system`: {
            let e = Q(E, i);
            x.push({
              role: `system`,
              content:
                e == null ? T : [{ type: `input_text`, text: T, prompt_cache_breakpoint: e }],
            });
            break;
          }
          case `developer`: {
            let e = Q(E, i);
            x.push({
              role: `developer`,
              content:
                e == null ? T : [{ type: `input_text`, text: T, prompt_cache_breakpoint: e }],
            });
            break;
          }
          case `remove`:
            S.push({ type: `other`, message: `system messages are removed for this model` });
            break;
          default:
            throw Error(`Unsupported system message mode: ${n}`);
        }
        break;
      case `user`:
        x.push({
          role: `user`,
          content: T.map((e, t) => {
            switch (e.type) {
              case `text`: {
                let t = Q(e.providerOptions, i);
                return {
                  type: `input_text`,
                  text: e.text,
                  ...(t != null && { prompt_cache_breakpoint: t }),
                };
              }
              case `file`: {
                let n = Q(e.providerOptions, i);
                switch (e.data.type) {
                  case `reference`: {
                    let t = y({ reference: e.data.reference, provider: i });
                    return K(e.mediaType) === `image`
                      ? {
                          type: `input_image`,
                          file_id: t,
                          detail: e.providerOptions?.[i]?.imageDetail,
                          ...(n != null && { prompt_cache_breakpoint: n }),
                        }
                      : {
                          type: `input_file`,
                          file_id: t,
                          ...(n != null && { prompt_cache_breakpoint: n }),
                        };
                  }
                  case `text`:
                    throw new r({ functionality: `text file parts` });
                  case `url`:
                  case `data`:
                    if (K(e.mediaType) === `image`)
                      return {
                        type: `input_image`,
                        ...(e.data.type === `url`
                          ? { image_url: e.data.url.toString() }
                          : typeof e.data.data == `string` && nn(e.data.data, a)
                            ? { file_id: e.data.data }
                            : { image_url: `data:${l({ part: e })};base64,${H(e.data.data)}` }),
                        detail: e.providerOptions?.[i]?.imageDetail,
                        ...(n != null && { prompt_cache_breakpoint: n }),
                      };
                    {
                      if (e.data.type === `url`)
                        return {
                          type: `input_file`,
                          file_url: e.data.url.toString(),
                          ...(n != null && { prompt_cache_breakpoint: n }),
                        };
                      let i = l({ part: e });
                      if (i !== `application/pdf` && !o)
                        throw new r({ functionality: `file part media type ${i}` });
                      return {
                        type: `input_file`,
                        ...(typeof e.data.data == `string` && nn(e.data.data, a)
                          ? { file_id: e.data.data }
                          : {
                              filename:
                                e.filename ??
                                (i === `application/pdf` ? `part-${t}.pdf` : `part-${t}`),
                              file_data: `data:${i};base64,${H(e.data.data)}`,
                            }),
                        ...(n != null && { prompt_cache_breakpoint: n }),
                      };
                    }
                }
              }
            }
          }),
        });
        break;
      case `assistant`: {
        let e = {};
        for (let n of T)
          switch (n.type) {
            case `text`: {
              let e = n.providerOptions?.[i],
                t = e?.itemId,
                r = e?.phase;
              if (c && t != null) break;
              if (s && t != null) {
                x.push({ type: `item_reference`, id: t });
                break;
              }
              x.push({
                role: `assistant`,
                content: [{ type: `output_text`, text: n.text }],
                id: t,
                ...(r != null && { phase: r }),
              });
              break;
            }
            case `tool-call`: {
              let e = n.providerOptions?.[i]?.itemId ?? n.providerMetadata?.[i]?.itemId,
                r = n.providerOptions?.[i]?.namespace ?? n.providerMetadata?.[i]?.namespace;
              if (c && e != null) break;
              let a = t.toProviderToolName(n.toolName);
              if (a === `tool_search`) {
                if (s && e != null) {
                  x.push({ type: `item_reference`, id: e });
                  break;
                }
                let t =
                    typeof n.input == `string`
                      ? await f({ text: n.input, schema: Lt })
                      : await g({ value: n.input, schema: Lt }),
                  r = t.call_id == null ? `server` : `client`;
                x.push({
                  type: `tool_search_call`,
                  id: e ?? n.toolCallId,
                  execution: r,
                  call_id: t.call_id ?? null,
                  status: `completed`,
                  arguments: t.arguments,
                });
                break;
              }
              if (n.providerExecuted) {
                s && e != null && x.push({ type: `item_reference`, id: e });
                break;
              }
              if (u && s && e != null) break;
              let o =
                (d && a === `local_shell`) ||
                (p && a === `shell`) ||
                (m && a === `apply_patch`) ||
                (v && a === `computer`) ||
                (b?.has(a) ?? !1);
              if (s && e != null && o) {
                x.push({ type: `item_reference`, id: e });
                break;
              }
              if (d && a === `local_shell`) {
                let t = await g({ value: n.input, schema: Ot });
                x.push({
                  type: `local_shell_call`,
                  call_id: n.toolCallId,
                  id: e,
                  action: {
                    type: `exec`,
                    command: t.action.command,
                    timeout_ms: t.action.timeoutMs,
                    user: t.action.user,
                    working_directory: t.action.workingDirectory,
                    env: t.action.env,
                  },
                });
                break;
              }
              if (p && a === `shell`) {
                let t = await g({ value: n.input, schema: jt });
                x.push({
                  type: `shell_call`,
                  call_id: n.toolCallId,
                  id: e,
                  status: `completed`,
                  action: {
                    commands: t.action.commands,
                    timeout_ms: t.action.timeoutMs,
                    max_output_length: t.action.maxOutputLength,
                  },
                });
                break;
              }
              if (m && a === `apply_patch`) {
                let t = await g({ value: n.input, schema: rt });
                x.push({
                  type: `apply_patch_call`,
                  call_id: t.callId,
                  id: e,
                  status: `completed`,
                  operation: t.operation,
                });
                break;
              }
              if (v && a === `computer`) {
                let t = await g({ value: n.input, schema: pt });
                x.push({
                  type: `computer_call`,
                  call_id: n.toolCallId,
                  id: e,
                  status: t.status,
                  actions: t.actions.map((e) => {
                    switch (e.type) {
                      case `click`:
                      case `double_click`:
                      case `move`:
                        return { ...e, keys: e.keys };
                      case `drag`:
                        return { ...e, keys: e.keys };
                      case `scroll`:
                        return {
                          type: `scroll`,
                          x: e.x,
                          y: e.y,
                          scroll_x: e.scrollX,
                          scroll_y: e.scrollY,
                          keys: e.keys,
                        };
                      default:
                        return e;
                    }
                  }),
                  pending_safety_checks: t.pendingSafetyChecks.map((e) => ({
                    id: e.id,
                    code: e.code,
                    message: e.message,
                  })),
                });
                break;
              }
              if (b?.has(a)) {
                x.push({
                  type: `custom_tool_call`,
                  call_id: n.toolCallId,
                  name: a,
                  input: typeof n.input == `string` ? n.input : JSON.stringify(n.input),
                  id: e,
                });
                break;
              }
              x.push({
                type: `function_call`,
                call_id: n.toolCallId,
                name: a,
                arguments: tn(n.input),
                ...(r != null && { namespace: r }),
              });
              break;
            }
            case `tool-result`: {
              if (
                n.output.type === `execution-denied` ||
                (n.output.type === `json` &&
                  typeof n.output.value == `object` &&
                  n.output.value != null &&
                  `type` in n.output.value &&
                  n.output.value.type === `execution-denied`) ||
                c
              )
                break;
              let e = t.toProviderToolName(n.toolName);
              if (e === `tool_search`) {
                let e = n.providerOptions?.[i]?.itemId ?? n.toolCallId;
                if (s) x.push({ type: `item_reference`, id: e });
                else if (n.output.type === `json`) {
                  let t = await g({ value: n.output.value, schema: Rt });
                  x.push({
                    type: `tool_search_output`,
                    id: e,
                    execution: `server`,
                    call_id: null,
                    status: `completed`,
                    tools: t.tools,
                  });
                }
                break;
              }
              if (p && e === `shell`) {
                if (n.output.type === `json`) {
                  let e = await g({ value: n.output.value, schema: Mt });
                  x.push({
                    type: `shell_call_output`,
                    call_id: n.toolCallId,
                    output: e.output.map((e) => ({
                      stdout: e.stdout,
                      stderr: e.stderr,
                      outcome:
                        e.outcome.type === `timeout`
                          ? { type: `timeout` }
                          : { type: `exit`, exit_code: e.outcome.exitCode },
                    })),
                  });
                }
                break;
              }
              if (s) {
                let e = n.providerOptions?.[i]?.itemId ?? n.toolCallId;
                x.push({ type: `item_reference`, id: e });
              } else
                S.push({
                  type: `other`,
                  message: `Results for OpenAI tool ${n.toolName} are not sent to the API when store is false`,
                });
              break;
            }
            case `reasoning`: {
              let t = await _({ provider: i, providerOptions: n.providerOptions, schema: an }),
                r = t?.itemId;
              if ((c || u) && r != null) break;
              if (r != null) {
                let i = e[r];
                if (s)
                  i === void 0 &&
                    (x.push({ type: `item_reference`, id: r }),
                    (e[r] = { type: `reasoning`, id: r, summary: [] }));
                else {
                  let a = [];
                  (n.text.length > 0
                    ? a.push({ type: `summary_text`, text: n.text })
                    : i !== void 0 &&
                      S.push({
                        type: `other`,
                        message: `Cannot append empty reasoning part to existing reasoning sequence. Skipping reasoning part: ${JSON.stringify(n)}.`,
                      }),
                    i === void 0
                      ? ((e[r] = {
                          type: `reasoning`,
                          id: r,
                          encrypted_content: t?.reasoningEncryptedContent,
                          summary: a,
                        }),
                        x.push(e[r]))
                      : (i.summary.push(...a),
                        t?.reasoningEncryptedContent != null &&
                          (i.encrypted_content = t.reasoningEncryptedContent)));
                }
              } else {
                let e = t?.reasoningEncryptedContent;
                if (e != null) {
                  let t = [];
                  (n.text.length > 0 && t.push({ type: `summary_text`, text: n.text }),
                    x.push({ type: `reasoning`, encrypted_content: e, summary: t }));
                } else
                  S.push({
                    type: `other`,
                    message: `Non-OpenAI reasoning parts are not supported. Skipping reasoning part: ${JSON.stringify(n)}.`,
                  });
              }
              break;
            }
            case `custom`:
              if (n.kind === `openai.compaction`) {
                let e = n.providerOptions?.[i],
                  t = e?.itemId;
                if (c && t != null) break;
                if (s && t != null) {
                  x.push({ type: `item_reference`, id: t });
                  break;
                }
                let r = e?.encryptedContent;
                t != null && x.push({ type: `compaction`, id: t, encrypted_content: r });
              }
              break;
          }
        break;
      }
      case `tool`:
        for (let e of T) {
          if (e.type === `tool-approval-response`) {
            let t = e;
            if (C.has(t.approvalId)) continue;
            (C.add(t.approvalId),
              s && x.push({ type: `item_reference`, id: t.approvalId }),
              x.push({
                type: `mcp_approval_response`,
                approval_request_id: t.approvalId,
                approve: t.approved,
              }));
            continue;
          }
          let n = e.output;
          if (n.type === `execution-denied` && n.providerOptions?.openai?.approvalId) continue;
          let r = t.toProviderToolName(e.toolName);
          if (r === `tool_search` && n.type === `json`) {
            let t = await g({ value: n.value, schema: Rt });
            x.push({
              type: `tool_search_output`,
              execution: `client`,
              call_id: e.toolCallId,
              status: `completed`,
              tools: t.tools,
            });
            continue;
          }
          if (d && r === `local_shell` && n.type === `json`) {
            let t = await g({ value: n.value, schema: kt });
            x.push({ type: `local_shell_call_output`, call_id: e.toolCallId, output: t.output });
            continue;
          }
          if (p && r === `shell` && n.type === `json`) {
            let t = await g({ value: n.value, schema: Mt });
            x.push({
              type: `shell_call_output`,
              call_id: e.toolCallId,
              output: t.output.map((e) => ({
                stdout: e.stdout,
                stderr: e.stderr,
                outcome:
                  e.outcome.type === `timeout`
                    ? { type: `timeout` }
                    : { type: `exit`, exit_code: e.outcome.exitCode },
              })),
            });
            continue;
          }
          if (m && e.toolName === `apply_patch` && n.type === `json`) {
            let t = await g({ value: n.value, schema: it });
            x.push({
              type: `apply_patch_call_output`,
              call_id: e.toolCallId,
              status: t.status,
              output: t.output,
            });
            continue;
          }
          if (v && r === `computer` && n.type === `json`) {
            let t = await g({ value: n.value, schema: mt });
            x.push({
              type: `computer_call_output`,
              call_id: e.toolCallId,
              output: {
                type: `computer_screenshot`,
                image_url: t.output.imageUrl,
                file_id: t.output.fileId,
                detail: t.output.detail,
              },
              acknowledged_safety_checks: t.acknowledgedSafetyChecks?.map((e) => ({
                id: e.id,
                code: e.code,
                message: e.message,
              })),
            });
            continue;
          }
          if (b?.has(r)) {
            let t;
            switch (n.type) {
              case `text`:
              case `error-text`:
                t = n.value;
                break;
              case `execution-denied`:
                t = n.reason ?? `Tool call execution denied.`;
                break;
              case `json`:
              case `error-json`:
                t = JSON.stringify(n.value);
                break;
              case `content`:
                t = n.value
                  .map((e) => {
                    let t = Q(e.providerOptions, i);
                    switch (e.type) {
                      case `text`:
                        return {
                          type: `input_text`,
                          text: e.text,
                          ...(t != null && { prompt_cache_breakpoint: t }),
                        };
                      case `file`: {
                        let n = K(e.mediaType),
                          r = e.providerOptions?.[i]?.imageDetail;
                        if (e.data.type === `data`) {
                          let i = l({ part: e });
                          return n === `image`
                            ? {
                                type: `input_image`,
                                image_url: `data:${i};base64,${H(e.data.data)}`,
                                detail: r,
                                ...(t != null && { prompt_cache_breakpoint: t }),
                              }
                            : {
                                type: `input_file`,
                                filename: e.filename ?? `data`,
                                file_data: `data:${i};base64,${H(e.data.data)}`,
                                ...(t != null && { prompt_cache_breakpoint: t }),
                              };
                        }
                        if (e.data.type === `url`)
                          return n === `image`
                            ? {
                                type: `input_image`,
                                image_url: e.data.url.toString(),
                                detail: r,
                                ...(t != null && { prompt_cache_breakpoint: t }),
                              }
                            : {
                                type: `input_file`,
                                file_url: e.data.url.toString(),
                                ...(t != null && { prompt_cache_breakpoint: t }),
                              };
                        S.push({
                          type: `other`,
                          message: `unsupported custom tool content part type: ${e.type} with data type: ${e.data.type}`,
                        });
                        return;
                      }
                      default:
                        S.push({
                          type: `other`,
                          message: `unsupported custom tool content part type: ${e.type}`,
                        });
                        return;
                    }
                  })
                  .filter(h);
                break;
              default:
                t = ``;
            }
            x.push({ type: `custom_tool_call_output`, call_id: e.toolCallId, output: t });
            continue;
          }
          let a;
          switch (n.type) {
            case `text`:
            case `error-text`:
              a = n.value;
              break;
            case `execution-denied`:
              a = n.reason ?? `Tool call execution denied.`;
              break;
            case `json`:
            case `error-json`:
              a = JSON.stringify(n.value);
              break;
            case `content`:
              a = n.value
                .map((e) => {
                  let t = Q(e.providerOptions, i);
                  switch (e.type) {
                    case `text`:
                      return {
                        type: `input_text`,
                        text: e.text,
                        ...(t != null && { prompt_cache_breakpoint: t }),
                      };
                    case `file`: {
                      let n = K(e.mediaType),
                        r = e.providerOptions?.[i]?.imageDetail;
                      if (e.data.type === `data`) {
                        let i = l({ part: e });
                        return n === `image`
                          ? {
                              type: `input_image`,
                              image_url: `data:${i};base64,${H(e.data.data)}`,
                              detail: r,
                              ...(t != null && { prompt_cache_breakpoint: t }),
                            }
                          : {
                              type: `input_file`,
                              filename: e.filename ?? `data`,
                              file_data: `data:${i};base64,${H(e.data.data)}`,
                              ...(t != null && { prompt_cache_breakpoint: t }),
                            };
                      }
                      if (e.data.type === `url`)
                        return n === `image`
                          ? {
                              type: `input_image`,
                              image_url: e.data.url.toString(),
                              detail: r,
                              ...(t != null && { prompt_cache_breakpoint: t }),
                            }
                          : {
                              type: `input_file`,
                              file_url: e.data.url.toString(),
                              ...(t != null && { prompt_cache_breakpoint: t }),
                            };
                      S.push({
                        type: `other`,
                        message: `unsupported tool content part type: ${e.type} with data type: ${e.data.type}`,
                      });
                      return;
                    }
                    default:
                      S.push({
                        type: `other`,
                        message: `unsupported tool content part type: ${e.type}`,
                      });
                      return;
                  }
                })
                .filter(h);
              break;
          }
          x.push({ type: `function_call_output`, call_id: e.toolCallId, output: a });
        }
        break;
      default:
        throw Error(`Unsupported role: ${w}`);
    }
  return (
    !s &&
      x.some((e) => `type` in e && e.type === `reasoning` && e.encrypted_content == null) &&
      (S.push({
        type: `other`,
        message: `Reasoning parts without encrypted content are not supported when store is false. Skipping reasoning parts.`,
      }),
      (x = x.filter(
        (e) => !(`type` in e) || e.type !== `reasoning` || e.encrypted_content != null,
      ))),
    { input: x, warnings: S }
  );
}
var an = G({ itemId: Y().nullish(), reasoningEncryptedContent: Y().nullish() });
function on({ finishReason: e, hasFunctionCall: t }) {
  switch (e) {
    case void 0:
    case null:
      return t ? `tool-calls` : `stop`;
    case `max_output_tokens`:
      return `length`;
    case `content_filter`:
      return `content-filter`;
    default:
      return t ? `tool-calls` : `other`;
  }
}
var sn = re(() => o([Y(), C(), A(), D(), W(sn), T(Y(), sn.optional())])),
  cn = G({ id: Y(), code: Y().nullish(), message: Y().nullish() }),
  ln = z(`type`, [
    G({
      type: N(`click`),
      button: U([`left`, `right`, `wheel`, `back`, `forward`]),
      x: C(),
      y: C(),
      keys: W(Y()).nullish(),
    }),
    G({ type: N(`double_click`), x: C(), y: C(), keys: W(Y()).nullish() }),
    G({ type: N(`drag`), path: W(G({ x: C(), y: C() })), keys: W(Y()).nullish() }),
    G({ type: N(`keypress`), keys: W(Y()) }),
    G({ type: N(`move`), x: C(), y: C(), keys: W(Y()).nullish() }),
    G({ type: N(`screenshot`) }),
    G({ type: N(`scroll`), x: C(), y: C(), scroll_x: C(), scroll_y: C(), keys: W(Y()).nullish() }),
    G({ type: N(`type`), text: Y() }),
    G({ type: N(`wait`) }),
  ]),
  un = G({
    type: N(`computer_call`),
    id: Y(),
    call_id: Y().nullish(),
    status: U([`in_progress`, `completed`, `incomplete`]),
    action: ln.nullish(),
    actions: W(ln).nullish(),
    pending_safety_checks: W(cn).nullish(),
  }),
  dn = G({
    type: N(`error`),
    sequence_number: C(),
    error: G({ type: Y(), code: Y(), message: Y(), param: Y().nullish() }),
  }),
  fn = G({
    type: N(`error`),
    sequence_number: C(),
    code: Y().nullish(),
    message: Y(),
    param: Y().nullish(),
  }),
  pn = F(() =>
    L(
      o([
        G({
          type: N(`response.output_text.delta`),
          item_id: Y(),
          delta: Y(),
          logprobs: W(
            G({ token: Y(), logprob: C(), top_logprobs: W(G({ token: Y(), logprob: C() })) }),
          ).nullish(),
        }),
        G({
          type: U([`response.completed`, `response.incomplete`]),
          response: G({
            incomplete_details: G({ reason: Y() }).nullish(),
            usage: G({
              input_tokens: C(),
              input_tokens_details: G({
                cached_tokens: C().nullish(),
                cache_write_tokens: C().nullish(),
                orchestration_input_tokens: C().nullish(),
                orchestration_input_cached_tokens: C().nullish(),
              }).nullish(),
              output_tokens: C(),
              output_tokens_details: G({
                reasoning_tokens: C().nullish(),
                orchestration_output_tokens: C().nullish(),
              }).nullish(),
            }),
            reasoning: G({ context: Y().nullish() }).nullish(),
            service_tier: Y().nullish(),
          }),
        }),
        G({
          type: N(`response.failed`),
          sequence_number: C(),
          response: G({
            error: G({ code: Y().nullish(), message: Y() }).nullish(),
            incomplete_details: G({ reason: Y() }).nullish(),
            usage: G({
              input_tokens: C(),
              input_tokens_details: G({
                cached_tokens: C().nullish(),
                cache_write_tokens: C().nullish(),
                orchestration_input_tokens: C().nullish(),
                orchestration_input_cached_tokens: C().nullish(),
              }).nullish(),
              output_tokens: C(),
              output_tokens_details: G({
                reasoning_tokens: C().nullish(),
                orchestration_output_tokens: C().nullish(),
              }).nullish(),
            }).nullish(),
            reasoning: G({ context: Y().nullish() }).nullish(),
            service_tier: Y().nullish(),
          }),
        }),
        G({
          type: N(`response.created`),
          response: G({ id: Y(), created_at: C(), model: Y(), service_tier: Y().nullish() }),
        }),
        G({
          type: N(`response.output_item.added`),
          output_index: C(),
          item: z(`type`, [
            G({ type: N(`message`), id: Y(), phase: U([`commentary`, `final_answer`]).nullish() }),
            G({ type: N(`reasoning`), id: Y(), encrypted_content: Y().nullish() }),
            G({
              type: N(`function_call`),
              id: Y(),
              call_id: Y(),
              name: Y(),
              arguments: Y(),
              namespace: Y().nullish(),
            }),
            G({ type: N(`web_search_call`), id: Y(), status: Y() }),
            un,
            G({ type: N(`file_search_call`), id: Y() }),
            G({ type: N(`image_generation_call`), id: Y() }),
            G({
              type: N(`code_interpreter_call`),
              id: Y(),
              container_id: Y(),
              code: Y().nullable(),
              outputs: W(
                z(`type`, [G({ type: N(`logs`), logs: Y() }), G({ type: N(`image`), url: Y() })]),
              ).nullable(),
              status: Y(),
            }),
            G({ type: N(`mcp_call`), id: Y(), status: Y(), approval_request_id: Y().nullish() }),
            G({ type: N(`mcp_list_tools`), id: Y() }),
            G({ type: N(`mcp_approval_request`), id: Y() }),
            G({
              type: N(`apply_patch_call`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`]),
              operation: z(`type`, [
                G({ type: N(`create_file`), path: Y(), diff: Y() }),
                G({ type: N(`delete_file`), path: Y() }),
                G({ type: N(`update_file`), path: Y(), diff: Y() }),
              ]),
            }),
            G({ type: N(`custom_tool_call`), id: Y(), call_id: Y(), name: Y(), input: Y() }),
            G({
              type: N(`shell_call`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              action: G({ commands: W(Y()) }),
            }),
            G({ type: N(`compaction`), id: Y(), encrypted_content: Y().nullish() }),
            G({
              type: N(`shell_call_output`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              output: W(
                G({
                  stdout: Y(),
                  stderr: Y(),
                  outcome: z(`type`, [
                    G({ type: N(`timeout`) }),
                    G({ type: N(`exit`), exit_code: C() }),
                  ]),
                }),
              ),
            }),
            G({
              type: N(`tool_search_call`),
              id: Y(),
              execution: U([`server`, `client`]),
              call_id: Y().nullable(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              arguments: q(),
            }),
            G({
              type: N(`tool_search_output`),
              id: Y(),
              execution: U([`server`, `client`]),
              call_id: Y().nullable(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              tools: W(T(Y(), sn.optional())),
            }),
          ]),
        }),
        G({
          type: N(`response.output_item.done`),
          output_index: C(),
          item: z(`type`, [
            G({ type: N(`message`), id: Y(), phase: U([`commentary`, `final_answer`]).nullish() }),
            G({ type: N(`reasoning`), id: Y(), encrypted_content: Y().nullish() }),
            G({
              type: N(`function_call`),
              id: Y(),
              call_id: Y(),
              name: Y(),
              arguments: Y(),
              status: N(`completed`),
              namespace: Y().nullish(),
            }),
            G({
              type: N(`custom_tool_call`),
              id: Y(),
              call_id: Y(),
              name: Y(),
              input: Y(),
              status: N(`completed`),
            }),
            G({
              type: N(`code_interpreter_call`),
              id: Y(),
              code: Y().nullable(),
              container_id: Y(),
              outputs: W(
                z(`type`, [G({ type: N(`logs`), logs: Y() }), G({ type: N(`image`), url: Y() })]),
              ).nullable(),
            }),
            G({ type: N(`image_generation_call`), id: Y(), result: Y() }),
            G({
              type: N(`web_search_call`),
              id: Y(),
              status: Y(),
              action: z(`type`, [
                G({
                  type: N(`search`),
                  query: Y().nullish(),
                  queries: W(Y()).nullish(),
                  sources: W(
                    z(`type`, [G({ type: N(`url`), url: Y() }), G({ type: N(`api`), name: Y() })]),
                  ).nullish(),
                }),
                G({ type: N(`open_page`), url: Y().nullish() }),
                G({ type: N(`find_in_page`), url: Y().nullish(), pattern: Y().nullish() }),
              ]).nullish(),
            }),
            G({
              type: N(`file_search_call`),
              id: Y(),
              queries: W(Y()),
              results: W(
                G({
                  attributes: T(Y(), o([Y(), C(), A()])),
                  file_id: Y(),
                  filename: Y(),
                  score: C(),
                  text: Y(),
                }),
              ).nullish(),
            }),
            G({
              type: N(`local_shell_call`),
              id: Y(),
              call_id: Y(),
              action: G({
                type: N(`exec`),
                command: W(Y()),
                timeout_ms: C().optional(),
                user: Y().optional(),
                working_directory: Y().optional(),
                env: T(Y(), Y()).optional(),
              }),
            }),
            un,
            G({
              type: N(`mcp_call`),
              id: Y(),
              status: Y(),
              arguments: Y(),
              name: Y(),
              server_label: Y(),
              output: Y().nullish(),
              error: o([
                Y(),
                G({
                  type: Y().optional(),
                  code: o([C(), Y()]).optional(),
                  message: Y().optional(),
                }).loose(),
              ]).nullish(),
              approval_request_id: Y().nullish(),
            }),
            G({
              type: N(`mcp_list_tools`),
              id: Y(),
              server_label: Y(),
              tools: W(
                G({
                  name: Y(),
                  description: Y().optional(),
                  input_schema: I(),
                  annotations: T(Y(), q()).optional(),
                }),
              ),
              error: o([
                Y(),
                G({
                  type: Y().optional(),
                  code: o([C(), Y()]).optional(),
                  message: Y().optional(),
                }).loose(),
              ]).optional(),
            }),
            G({
              type: N(`mcp_approval_request`),
              id: Y(),
              server_label: Y(),
              name: Y(),
              arguments: Y(),
              approval_request_id: Y().optional(),
            }),
            G({
              type: N(`apply_patch_call`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`]),
              operation: z(`type`, [
                G({ type: N(`create_file`), path: Y(), diff: Y() }),
                G({ type: N(`delete_file`), path: Y() }),
                G({ type: N(`update_file`), path: Y(), diff: Y() }),
              ]),
            }),
            G({
              type: N(`shell_call`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              action: G({ commands: W(Y()) }),
            }),
            G({ type: N(`compaction`), id: Y(), encrypted_content: Y() }),
            G({
              type: N(`shell_call_output`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              output: W(
                G({
                  stdout: Y(),
                  stderr: Y(),
                  outcome: z(`type`, [
                    G({ type: N(`timeout`) }),
                    G({ type: N(`exit`), exit_code: C() }),
                  ]),
                }),
              ),
            }),
            G({
              type: N(`tool_search_call`),
              id: Y(),
              execution: U([`server`, `client`]),
              call_id: Y().nullable(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              arguments: q(),
            }),
            G({
              type: N(`tool_search_output`),
              id: Y(),
              execution: U([`server`, `client`]),
              call_id: Y().nullable(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              tools: W(T(Y(), sn.optional())),
            }),
          ]),
        }),
        G({
          type: N(`response.function_call_arguments.delta`),
          item_id: Y(),
          output_index: C(),
          delta: Y(),
        }),
        G({
          type: N(`response.custom_tool_call_input.delta`),
          item_id: Y(),
          output_index: C(),
          delta: Y(),
        }),
        G({
          type: N(`response.image_generation_call.partial_image`),
          item_id: Y(),
          output_index: C(),
          partial_image_b64: Y(),
        }),
        G({
          type: N(`response.code_interpreter_call_code.delta`),
          item_id: Y(),
          output_index: C(),
          delta: Y(),
        }),
        G({
          type: N(`response.code_interpreter_call_code.done`),
          item_id: Y(),
          output_index: C(),
          code: Y(),
        }),
        G({
          type: N(`response.output_text.annotation.added`),
          annotation: z(`type`, [
            G({ type: N(`url_citation`), start_index: C(), end_index: C(), url: Y(), title: Y() }),
            G({ type: N(`file_citation`), file_id: Y(), filename: Y(), index: C() }),
            G({
              type: N(`container_file_citation`),
              container_id: Y(),
              file_id: Y(),
              filename: Y(),
              start_index: C(),
              end_index: C(),
            }),
            G({ type: N(`file_path`), file_id: Y(), index: C() }),
          ]),
        }),
        G({ type: N(`response.reasoning_summary_part.added`), item_id: Y(), summary_index: C() }),
        G({
          type: N(`response.reasoning_summary_text.delta`),
          item_id: Y(),
          summary_index: C(),
          delta: Y(),
        }),
        G({ type: N(`response.reasoning_summary_part.done`), item_id: Y(), summary_index: C() }),
        G({
          type: N(`response.apply_patch_call_operation_diff.delta`),
          item_id: Y(),
          output_index: C(),
          delta: Y(),
          obfuscation: Y().nullish(),
        }),
        G({
          type: N(`response.apply_patch_call_operation_diff.done`),
          item_id: Y(),
          output_index: C(),
          diff: Y(),
        }),
        dn,
        fn,
        G({ type: Y() })
          .loose()
          .transform((e) => ({ type: `unknown_chunk`, message: e.type })),
      ]),
    ),
  ),
  mn = F(() =>
    L(
      G({
        id: Y().optional(),
        created_at: C().optional(),
        error: G({ message: Y(), type: Y(), param: Y().nullish(), code: Y() }).nullish(),
        model: Y().optional(),
        output: W(
          z(`type`, [
            G({
              type: N(`message`),
              role: N(`assistant`),
              id: Y(),
              phase: U([`commentary`, `final_answer`]).nullish(),
              content: W(
                G({
                  type: N(`output_text`),
                  text: Y(),
                  logprobs: W(
                    G({
                      token: Y(),
                      logprob: C(),
                      top_logprobs: W(G({ token: Y(), logprob: C() })),
                    }),
                  ).nullish(),
                  annotations: W(
                    z(`type`, [
                      G({
                        type: N(`url_citation`),
                        start_index: C(),
                        end_index: C(),
                        url: Y(),
                        title: Y(),
                      }),
                      G({ type: N(`file_citation`), file_id: Y(), filename: Y(), index: C() }),
                      G({
                        type: N(`container_file_citation`),
                        container_id: Y(),
                        file_id: Y(),
                        filename: Y(),
                        start_index: C(),
                        end_index: C(),
                      }),
                      G({ type: N(`file_path`), file_id: Y(), index: C() }),
                    ]),
                  ),
                }),
              ),
            }),
            G({
              type: N(`web_search_call`),
              id: Y(),
              status: Y(),
              action: z(`type`, [
                G({
                  type: N(`search`),
                  query: Y().nullish(),
                  queries: W(Y()).nullish(),
                  sources: W(
                    z(`type`, [G({ type: N(`url`), url: Y() }), G({ type: N(`api`), name: Y() })]),
                  ).nullish(),
                }),
                G({ type: N(`open_page`), url: Y().nullish() }),
                G({ type: N(`find_in_page`), url: Y().nullish(), pattern: Y().nullish() }),
              ]).nullish(),
            }),
            G({
              type: N(`file_search_call`),
              id: Y(),
              queries: W(Y()),
              results: W(
                G({
                  attributes: T(Y(), o([Y(), C(), A()])),
                  file_id: Y(),
                  filename: Y(),
                  score: C(),
                  text: Y(),
                }),
              ).nullish(),
            }),
            G({
              type: N(`code_interpreter_call`),
              id: Y(),
              code: Y().nullable(),
              container_id: Y(),
              outputs: W(
                z(`type`, [G({ type: N(`logs`), logs: Y() }), G({ type: N(`image`), url: Y() })]),
              ).nullable(),
            }),
            G({ type: N(`image_generation_call`), id: Y(), result: Y() }),
            G({
              type: N(`local_shell_call`),
              id: Y(),
              call_id: Y(),
              action: G({
                type: N(`exec`),
                command: W(Y()),
                timeout_ms: C().optional(),
                user: Y().optional(),
                working_directory: Y().optional(),
                env: T(Y(), Y()).optional(),
              }),
            }),
            G({
              type: N(`function_call`),
              call_id: Y(),
              name: Y(),
              arguments: Y(),
              id: Y(),
              namespace: Y().nullish(),
            }),
            G({ type: N(`custom_tool_call`), call_id: Y(), name: Y(), input: Y(), id: Y() }),
            un,
            G({
              type: N(`reasoning`),
              id: Y(),
              encrypted_content: Y().nullish(),
              summary: W(G({ type: N(`summary_text`), text: Y() })),
            }),
            G({
              type: N(`mcp_call`),
              id: Y(),
              status: Y(),
              arguments: Y(),
              name: Y(),
              server_label: Y(),
              output: Y().nullish(),
              error: o([
                Y(),
                G({
                  type: Y().optional(),
                  code: o([C(), Y()]).optional(),
                  message: Y().optional(),
                }).loose(),
              ]).nullish(),
              approval_request_id: Y().nullish(),
            }),
            G({
              type: N(`mcp_list_tools`),
              id: Y(),
              server_label: Y(),
              tools: W(
                G({
                  name: Y(),
                  description: Y().optional(),
                  input_schema: I(),
                  annotations: T(Y(), q()).optional(),
                }),
              ),
              error: o([
                Y(),
                G({
                  type: Y().optional(),
                  code: o([C(), Y()]).optional(),
                  message: Y().optional(),
                }).loose(),
              ]).optional(),
            }),
            G({
              type: N(`mcp_approval_request`),
              id: Y(),
              server_label: Y(),
              name: Y(),
              arguments: Y(),
              approval_request_id: Y().optional(),
            }),
            G({
              type: N(`apply_patch_call`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`]),
              operation: z(`type`, [
                G({ type: N(`create_file`), path: Y(), diff: Y() }),
                G({ type: N(`delete_file`), path: Y() }),
                G({ type: N(`update_file`), path: Y(), diff: Y() }),
              ]),
            }),
            G({
              type: N(`shell_call`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              action: G({ commands: W(Y()) }),
            }),
            G({ type: N(`compaction`), id: Y(), encrypted_content: Y() }),
            G({
              type: N(`shell_call_output`),
              id: Y(),
              call_id: Y(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              output: W(
                G({
                  stdout: Y(),
                  stderr: Y(),
                  outcome: z(`type`, [
                    G({ type: N(`timeout`) }),
                    G({ type: N(`exit`), exit_code: C() }),
                  ]),
                }),
              ),
            }),
            G({
              type: N(`tool_search_call`),
              id: Y(),
              execution: U([`server`, `client`]),
              call_id: Y().nullable(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              arguments: q(),
            }),
            G({
              type: N(`tool_search_output`),
              id: Y(),
              execution: U([`server`, `client`]),
              call_id: Y().nullable(),
              status: U([`in_progress`, `completed`, `incomplete`]),
              tools: W(T(Y(), sn.optional())),
            }),
          ]),
        ).optional(),
        service_tier: Y().nullish(),
        reasoning: G({ context: Y().nullish() }).nullish(),
        incomplete_details: G({ reason: Y() }).nullish(),
        usage: G({
          input_tokens: C(),
          input_tokens_details: G({
            cached_tokens: C().nullish(),
            cache_write_tokens: C().nullish(),
            orchestration_input_tokens: C().nullish(),
            orchestration_input_cached_tokens: C().nullish(),
          }).nullish(),
          output_tokens: C(),
          output_tokens_details: G({
            reasoning_tokens: C().nullish(),
            orchestration_output_tokens: C().nullish(),
          }).nullish(),
        }).optional(),
      }),
    ),
  ),
  hn = 20,
  gn = F(() =>
    L(
      G({
        conversation: Y().nullish(),
        include: W(
          U([
            `reasoning.encrypted_content`,
            `file_search_call.results`,
            `web_search_call.results`,
            `message.output_text.logprobs`,
          ]),
        ).nullish(),
        instructions: Y().nullish(),
        logprobs: o([A(), C().min(1).max(hn)]).optional(),
        maxToolCalls: C().nullish(),
        metadata: I().nullish(),
        parallelToolCalls: A().nullish(),
        previousResponseId: Y().nullish(),
        promptCacheKey: Y().nullish(),
        promptCacheOptions: G({
          mode: U([`implicit`, `explicit`]).optional(),
          ttl: N(`30m`).optional(),
        }).optional(),
        promptCacheRetention: U([`in_memory`, `24h`]).nullish(),
        reasoningEffort: Y().nullish(),
        reasoningMode: U([`standard`, `pro`]).optional(),
        reasoningContext: U([`auto`, `current_turn`, `all_turns`]).optional(),
        reasoningSummary: Y().nullish(),
        safetyIdentifier: Y().nullish(),
        serviceTier: U([`auto`, `flex`, `priority`, `default`]).nullish(),
        store: A().nullish(),
        passThroughUnsupportedFiles: A().optional(),
        strictJsonSchema: A().nullish(),
        textVerbosity: U([`low`, `medium`, `high`]).nullish(),
        truncation: U([`auto`, `disabled`]).nullish(),
        user: Y().nullish(),
        systemMessageMode: U([`system`, `developer`, `remove`]).optional(),
        forceReasoning: A().optional(),
        contextManagement: W(G({ type: N(`compaction`), compactThreshold: C() })).nullish(),
        allowedTools: G({
          toolNames: W(Y()).min(1),
          mode: U([`auto`, `required`]).optional(),
        }).optional(),
      }),
    ),
  );
async function _n({
  tools: e,
  toolChoice: t,
  allowedTools: n,
  toolNameMapping: i,
  customProviderToolNames: a,
}) {
  e = e?.length ? e : void 0;
  let o = [];
  if (e == null) return { tools: void 0, toolChoice: void 0, toolWarnings: o };
  let s = [],
    c = new Map(),
    l = a ?? new Set();
  for (let t of e)
    switch (t.type) {
      case `function`: {
        let e = t.providerOptions?.openai,
          n = vn({ tool: t, options: e }),
          i = e?.namespace;
        if (i == null) s.push(n);
        else {
          let e = c.get(i.name);
          if (e == null)
            ((e = { type: `namespace`, name: i.name, description: i.description, tools: [] }),
              c.set(i.name, e),
              s.push(e));
          else if (e.description !== i.description)
            throw new r({
              functionality: `conflicting descriptions for OpenAI tool namespace "${i.name}"`,
            });
          e.tools.push(n);
        }
        break;
      }
      case `provider`:
        switch (t.id) {
          case `openai.file_search`: {
            let e = await g({ value: t.args, schema: St });
            s.push({
              type: `file_search`,
              vector_store_ids: e.vectorStoreIds,
              max_num_results: e.maxNumResults,
              ranking_options: e.ranking
                ? { ranker: e.ranking.ranker, score_threshold: e.ranking.scoreThreshold }
                : void 0,
              filters: e.filters,
            });
            break;
          }
          case `openai.local_shell`:
            s.push({ type: `local_shell` });
            break;
          case `openai.shell`: {
            let e = await g({ value: t.args, schema: Pt });
            s.push({ type: `shell`, ...(e.environment && { environment: yn(e.environment) }) });
            break;
          }
          case `openai.apply_patch`:
            s.push({ type: `apply_patch` });
            break;
          case `openai.computer`:
            s.push({ type: `computer` });
            break;
          case `openai.web_search_preview`: {
            let e = await g({ value: t.args, schema: Wt });
            s.push({
              type: `web_search_preview`,
              search_context_size: e.searchContextSize,
              user_location: e.userLocation,
            });
            break;
          }
          case `openai.web_search`: {
            let e = await g({ value: t.args, schema: Vt });
            s.push({
              type: `web_search`,
              filters: e.filters == null ? void 0 : { allowed_domains: e.filters.allowedDomains },
              external_web_access: e.externalWebAccess,
              search_context_size: e.searchContextSize,
              user_location: e.userLocation,
            });
            break;
          }
          case `openai.code_interpreter`: {
            let e = await g({ value: t.args, schema: ct });
            s.push({
              type: `code_interpreter`,
              container:
                e.container == null
                  ? { type: `auto`, file_ids: void 0 }
                  : typeof e.container == `string`
                    ? e.container
                    : { type: `auto`, file_ids: e.container.fileIds },
            });
            break;
          }
          case `openai.image_generation`: {
            let e = await g({ value: t.args, schema: Tt });
            s.push({
              type: `image_generation`,
              background: e.background,
              input_fidelity: e.inputFidelity,
              input_image_mask: e.inputImageMask
                ? { file_id: e.inputImageMask.fileId, image_url: e.inputImageMask.imageUrl }
                : void 0,
              model: e.model,
              moderation: e.moderation,
              partial_images: e.partialImages,
              quality: e.quality,
              output_compression: e.outputCompression,
              output_format: e.outputFormat,
              size: e.size,
            });
            break;
          }
          case `openai.mcp`: {
            let e = await g({ value: t.args, schema: qt }),
              n = (e) => ({ tool_names: e.toolNames }),
              r = e.requireApproval,
              i =
                r == null
                  ? void 0
                  : typeof r == `string`
                    ? r
                    : r.never == null
                      ? void 0
                      : { never: n(r.never) };
            s.push({
              type: `mcp`,
              server_label: e.serverLabel,
              allowed_tools: Array.isArray(e.allowedTools)
                ? e.allowedTools
                : e.allowedTools
                  ? { read_only: e.allowedTools.readOnly, tool_names: e.allowedTools.toolNames }
                  : void 0,
              authorization: e.authorization,
              connector_id: e.connectorId,
              headers: e.headers,
              require_approval: i ?? `never`,
              server_description: e.serverDescription,
              server_url: e.serverUrl,
            });
            break;
          }
          case `openai.custom`: {
            let e = await g({ value: t.args, schema: _t });
            (s.push({ type: `custom`, name: t.name, description: e.description, format: e.format }),
              l.add(t.name));
            break;
          }
          case `openai.tool_search`: {
            let e = await g({ value: t.args, schema: It });
            s.push({
              type: `tool_search`,
              ...(e.execution == null ? {} : { execution: e.execution }),
              ...(e.description == null ? {} : { description: e.description }),
              ...(e.parameters == null ? {} : { parameters: e.parameters }),
            });
            break;
          }
        }
        break;
      default:
        o.push({ type: `unsupported`, feature: `function tool ${t}` });
        break;
    }
  if (n != null)
    return {
      tools: s,
      toolChoice: {
        type: `allowed_tools`,
        mode: n.mode ?? `auto`,
        tools: n.toolNames.map((e) => ({ type: `function`, name: i?.toProviderToolName(e) ?? e })),
      },
      toolWarnings: o,
    };
  if (t == null) return { tools: s, toolChoice: void 0, toolWarnings: o };
  let u = t.type;
  switch (u) {
    case `auto`:
    case `none`:
    case `required`:
      return { tools: s, toolChoice: u, toolWarnings: o };
    case `tool`: {
      let e = i?.toProviderToolName(t.toolName) ?? t.toolName;
      return {
        tools: s,
        toolChoice:
          e === `code_interpreter` ||
          e === `file_search` ||
          e === `image_generation` ||
          e === `web_search_preview` ||
          e === `web_search` ||
          e === `mcp` ||
          e === `apply_patch` ||
          e === `computer`
            ? { type: e }
            : l.has(e)
              ? { type: `custom`, name: e }
              : { type: `function`, name: e },
        toolWarnings: o,
      };
    }
    default:
      throw new r({ functionality: `tool choice type: ${u}` });
  }
}
function vn({ tool: e, options: t }) {
  let n = t?.deferLoading;
  return {
    type: `function`,
    name: e.name,
    description: e.description,
    parameters: e.inputSchema,
    ...(e.strict == null ? {} : { strict: e.strict }),
    ...(n == null ? {} : { defer_loading: n }),
  };
}
function yn(e) {
  if (e.type === `containerReference`)
    return { type: `container_reference`, container_id: e.containerId };
  if (e.type === `containerAuto`) {
    let t = e;
    return {
      type: `container_auto`,
      file_ids: t.fileIds,
      memory_limit: t.memoryLimit,
      network_policy:
        t.networkPolicy == null
          ? void 0
          : t.networkPolicy.type === `disabled`
            ? { type: `disabled` }
            : {
                type: `allowlist`,
                allowed_domains: t.networkPolicy.allowedDomains,
                domain_secrets: t.networkPolicy.domainSecrets,
              },
      skills: bn(t.skills),
    };
  }
  return { type: `local`, skills: e.skills };
}
function bn(e) {
  return e?.map((e) =>
    e.type === `skillReference`
      ? {
          type: `skill_reference`,
          skill_id: y({ reference: e.providerReference ?? {}, provider: `openai` }),
          version: e.version ?? `latest`,
        }
      : {
          type: `inline`,
          name: e.name,
          description: e.description,
          source: { type: `base64`, media_type: e.source.mediaType, data: e.source.data },
        },
  );
}
function xn(e) {
  let t = {};
  for (let n of e)
    if (n.role === `assistant`)
      for (let e of n.content) {
        if (e.type !== `tool-call`) continue;
        let n = e.providerOptions?.openai?.approvalRequestId;
        n != null && (t[n] = e.toolCallId);
      }
  return t;
}
function Sn(e) {
  switch (e.type) {
    case `click`:
      return {
        type: `click`,
        button: e.button,
        x: e.x,
        y: e.y,
        ...(e.keys != null && { keys: e.keys }),
      };
    case `double_click`:
      return { type: `double_click`, x: e.x, y: e.y, ...(e.keys != null && { keys: e.keys }) };
    case `drag`:
      return { type: `drag`, path: e.path, ...(e.keys != null && { keys: e.keys }) };
    case `keypress`:
      return e;
    case `move`:
      return { type: `move`, x: e.x, y: e.y, ...(e.keys != null && { keys: e.keys }) };
    case `screenshot`:
      return e;
    case `scroll`:
      return {
        type: `scroll`,
        x: e.x,
        y: e.y,
        scrollX: e.scroll_x,
        scrollY: e.scroll_y,
        ...(e.keys != null && { keys: e.keys }),
      };
    case `type`:
      return e;
    case `wait`:
      return e;
  }
}
function Cn({ action: e, actions: t, pending_safety_checks: n, status: r }) {
  return {
    actions: (t ?? (e == null ? [] : [e])).map(Sn),
    pendingSafetyChecks:
      n?.map((e) => ({
        id: e.id,
        ...(e.code != null && { code: e.code }),
        ...(e.message != null && { message: e.message }),
      })) ?? [],
    status: r,
  };
}
var wn = class t {
  constructor(e, t) {
    ((this.specificationVersion = `v4`),
      (this.supportedUrls = {
        "image/*": [/^https?:\/\/.*$/],
        "application/pdf": [/^https?:\/\/.*$/],
      }),
      (this.modelId = e),
      (this.config = t));
  }
  static [P](e) {
    return d({ modelId: e.modelId, config: e.config });
  }
  static [V](e) {
    return new t(e.modelId, e.config);
  }
  get provider() {
    return this.config.provider;
  }
  async getArgs({
    maxOutputTokens: e,
    temperature: t,
    stopSequences: n,
    topP: r,
    topK: i,
    presencePenalty: a,
    frequencyPenalty: o,
    seed: c,
    prompt: l,
    reasoning: u,
    providerOptions: d,
    tools: f,
    toolChoice: p,
    responseFormat: m,
  }) {
    let h = [],
      g = pe(this.modelId);
    (i != null && h.push({ type: `unsupported`, feature: `topK` }),
      c != null && h.push({ type: `unsupported`, feature: `seed` }),
      a != null && h.push({ type: `unsupported`, feature: `presencePenalty` }),
      o != null && h.push({ type: `unsupported`, feature: `frequencyPenalty` }),
      n != null && h.push({ type: `unsupported`, feature: `stopSequences` }));
    let v = this.config.provider.includes(`azure`) ? `azure` : `openai`,
      y = await _({ provider: v, providerOptions: d, schema: gn });
    y == null &&
      v !== `openai` &&
      (y = await _({ provider: `openai`, providerOptions: d, schema: gn }));
    let b = y?.reasoningEffort ?? (s(u) ? u : void 0),
      x =
        y?.reasoningSummary === void 0
          ? b != null && b !== `none`
            ? `detailed`
            : void 0
          : y.reasoningSummary,
      C = y?.forceReasoning ?? g.isReasoningModel;
    y?.conversation &&
      y?.previousResponseId &&
      h.push({
        type: `unsupported`,
        feature: `conversation`,
        details: `conversation and previousResponseId cannot be used together`,
      });
    let w = S({
        tools: f,
        providerToolNames: {
          "openai.code_interpreter": `code_interpreter`,
          "openai.computer": `computer`,
          "openai.file_search": `file_search`,
          "openai.image_generation": `image_generation`,
          "openai.local_shell": `local_shell`,
          "openai.shell": `shell`,
          "openai.web_search": `web_search`,
          "openai.web_search_preview": `web_search_preview`,
          "openai.mcp": `mcp`,
          "openai.apply_patch": `apply_patch`,
          "openai.tool_search": `tool_search`,
        },
      }),
      T = new Set(),
      {
        tools: E,
        toolChoice: D,
        toolWarnings: O,
      } = await _n({
        tools: f,
        toolChoice: p,
        allowedTools: y?.allowedTools ?? void 0,
        toolNameMapping: w,
        customProviderToolNames: T,
      }),
      { input: ee, warnings: k } = await rn({
        prompt: l,
        toolNameMapping: w,
        systemMessageMode: y?.systemMessageMode ?? (C ? `developer` : g.systemMessageMode),
        providerOptionsName: v,
        fileIdPrefixes: this.config.fileIdPrefixes,
        passThroughUnsupportedFiles: y?.passThroughUnsupportedFiles ?? !1,
        store: y?.store ?? !0,
        hasConversation: y?.conversation != null,
        hasPreviousResponseId: y?.previousResponseId != null,
        hasLocalShellTool: N(`openai.local_shell`),
        hasShellTool: N(`openai.shell`),
        hasApplyPatchTool: N(`openai.apply_patch`),
        hasComputerTool: N(`openai.computer`),
        customProviderToolNames: T.size > 0 ? T : void 0,
      });
    h.push(...k);
    let A = y?.strictJsonSchema ?? !0,
      j = y?.include;
    function M(e) {
      j == null ? (j = [e]) : j.includes(e) || (j = [...j, e]);
    }
    function N(e) {
      return f?.find((t) => t.type === `provider` && t.id === e) != null;
    }
    let te = typeof y?.logprobs == `number` ? y?.logprobs : y?.logprobs === !0 ? hn : void 0;
    te && M(`message.output_text.logprobs`);
    let P = f?.find(
      (e) =>
        e.type === `provider` &&
        (e.id === `openai.web_search` || e.id === `openai.web_search_preview`),
    )?.name;
    (P && M(`web_search_call.action.sources`),
      N(`openai.code_interpreter`) && M(`code_interpreter_call.outputs`));
    let F = y?.store;
    F === !1 && C && M(`reasoning.encrypted_content`);
    let I = {
      model: this.modelId,
      input: ee,
      temperature: t,
      top_p: r,
      max_output_tokens: e,
      ...((m?.type === `json` || y?.textVerbosity) && {
        text: {
          ...(m?.type === `json` && {
            format:
              m.schema == null
                ? { type: `json_object` }
                : {
                    type: `json_schema`,
                    strict: A,
                    name: m.name ?? `response`,
                    description: m.description,
                    schema: m.schema,
                  },
          }),
          ...(y?.textVerbosity && { verbosity: y.textVerbosity }),
        },
      }),
      conversation: y?.conversation,
      max_tool_calls: y?.maxToolCalls,
      metadata: y?.metadata,
      parallel_tool_calls: y?.parallelToolCalls,
      previous_response_id: y?.previousResponseId,
      store: F,
      user: y?.user,
      instructions: y?.instructions,
      service_tier: y?.serviceTier,
      include: j,
      prompt_cache_key: y?.promptCacheKey,
      prompt_cache_options: y?.promptCacheOptions,
      prompt_cache_retention: y?.promptCacheRetention,
      safety_identifier: y?.safetyIdentifier,
      top_logprobs: te,
      truncation: y?.truncation,
      ...(y?.contextManagement && {
        context_management: y.contextManagement.map((e) => ({
          type: e.type,
          compact_threshold: e.compactThreshold,
        })),
      }),
      ...(C &&
        (b != null || x != null || y?.reasoningMode != null || y?.reasoningContext != null) && {
          reasoning: {
            ...(b != null && { effort: b }),
            ...(x != null && { summary: x }),
            ...(y?.reasoningMode != null && { mode: y.reasoningMode }),
            ...(y?.reasoningContext != null && { context: y.reasoningContext }),
          },
        }),
    };
    (C
      ? (b === `none` && g.supportsNonReasoningParameters) ||
        (I.temperature != null &&
          ((I.temperature = void 0),
          h.push({
            type: `unsupported`,
            feature: `temperature`,
            details: `temperature is not supported for reasoning models`,
          })),
        I.top_p != null &&
          ((I.top_p = void 0),
          h.push({
            type: `unsupported`,
            feature: `topP`,
            details: `topP is not supported for reasoning models`,
          })))
      : (y?.reasoningEffort != null &&
          h.push({
            type: `unsupported`,
            feature: `reasoningEffort`,
            details: `reasoningEffort is not supported for non-reasoning models`,
          }),
        y?.reasoningSummary != null &&
          h.push({
            type: `unsupported`,
            feature: `reasoningSummary`,
            details: `reasoningSummary is not supported for non-reasoning models`,
          }),
        y?.reasoningMode != null &&
          h.push({
            type: `unsupported`,
            feature: `reasoningMode`,
            details: `reasoningMode is not supported for non-reasoning models`,
          }),
        y?.reasoningContext != null &&
          h.push({
            type: `unsupported`,
            feature: `reasoningContext`,
            details: `reasoningContext is not supported for non-reasoning models`,
          })),
      y?.serviceTier === `flex` &&
        !g.supportsFlexProcessing &&
        (h.push({
          type: `unsupported`,
          feature: `serviceTier`,
          details: `flex processing is only available for o3, o4-mini, and gpt-5 models`,
        }),
        delete I.service_tier),
      y?.serviceTier === `priority` &&
        !g.supportsPriorityProcessing &&
        (h.push({
          type: `unsupported`,
          feature: `serviceTier`,
          details: `priority processing is only available for supported models (gpt-4, gpt-5, gpt-5-mini, o3, o4-mini) and requires Enterprise access. gpt-5-nano is not supported`,
        }),
        delete I.service_tier));
    let ne = f?.find((e) => e.type === `provider` && e.id === `openai.shell`)?.args?.environment
        ?.type,
      re = ne === `containerAuto` || ne === `containerReference`;
    return {
      webSearchToolName: P,
      args: { ...I, tools: E, tool_choice: D },
      warnings: [...h, ...O],
      store: F,
      toolNameMapping: w,
      providerOptionsName: v,
      isShellProviderExecuted: re,
    };
  }
  async doGenerate(t) {
    var n, r, i, o, s, c;
    let {
        args: l,
        warnings: u,
        webSearchToolName: d,
        toolNameMapping: f,
        providerOptionsName: p,
        isShellProviderExecuted: m,
      } = await this.getArgs(t),
      h = this.config.url({ path: `/responses`, modelId: this.modelId }),
      g = xn(t.prompt),
      {
        responseHeaders: _,
        value: v,
        rawValue: y,
      } = await a({
        url: h,
        headers: B((n = this.config).headers?.call(n), t.headers),
        body: l,
        failedResponseHandler: X,
        successfulResponseHandler: R(mn),
        abortSignal: t.abortSignal,
        fetch: this.config.fetch,
      });
    if (v.error)
      throw new e({
        message: v.error.message,
        url: h,
        requestBodyValues: l,
        statusCode: 400,
        responseHeaders: _,
        responseBody: y,
        isRetryable: !1,
      });
    if (v.output == null) {
      let t = v.incomplete_details?.reason;
      throw new e({
        message: t ? `Responses API returned no output (${t})` : `Responses API returned no output`,
        url: h,
        requestBodyValues: l,
        statusCode: 500,
        responseHeaders: _,
        responseBody: y,
        isRetryable: !1,
      });
    }
    let b = [],
      x = [],
      S = !1,
      C = [];
    for (let e of v.output)
      switch (e.type) {
        case `reasoning`:
          e.summary.length === 0 && e.summary.push({ type: `summary_text`, text: `` });
          for (let t of e.summary)
            b.push({
              type: `reasoning`,
              text: t.text,
              providerMetadata: {
                [p]: { itemId: e.id, reasoningEncryptedContent: e.encrypted_content ?? null },
              },
            });
          break;
        case `image_generation_call`:
          (b.push({
            type: `tool-call`,
            toolCallId: e.id,
            toolName: f.toCustomToolName(`image_generation`),
            input: `{}`,
            providerExecuted: !0,
          }),
            b.push({
              type: `tool-result`,
              toolCallId: e.id,
              toolName: f.toCustomToolName(`image_generation`),
              result: { result: e.result },
            }));
          break;
        case `tool_search_call`: {
          let t = e.call_id ?? e.id,
            n = e.execution === `server`;
          (n && C.push(t),
            b.push({
              type: `tool-call`,
              toolCallId: t,
              toolName: f.toCustomToolName(`tool_search`),
              input: JSON.stringify({ arguments: e.arguments, call_id: e.call_id }),
              ...(n ? { providerExecuted: !0 } : {}),
              providerMetadata: { [p]: { itemId: e.id } },
            }));
          break;
        }
        case `tool_search_output`: {
          let t = e.call_id ?? C.shift() ?? e.id;
          b.push({
            type: `tool-result`,
            toolCallId: t,
            toolName: f.toCustomToolName(`tool_search`),
            result: { tools: e.tools },
            providerMetadata: { [p]: { itemId: e.id } },
          });
          break;
        }
        case `local_shell_call`:
          b.push({
            type: `tool-call`,
            toolCallId: e.call_id,
            toolName: f.toCustomToolName(`local_shell`),
            input: JSON.stringify({ action: e.action }),
            providerMetadata: { [p]: { itemId: e.id } },
          });
          break;
        case `shell_call`:
          b.push({
            type: `tool-call`,
            toolCallId: e.call_id,
            toolName: f.toCustomToolName(`shell`),
            input: JSON.stringify({ action: { commands: e.action.commands } }),
            ...(m && { providerExecuted: !0 }),
            providerMetadata: { [p]: { itemId: e.id } },
          });
          break;
        case `shell_call_output`:
          b.push({
            type: `tool-result`,
            toolCallId: e.call_id,
            toolName: f.toCustomToolName(`shell`),
            result: {
              output: e.output.map((e) => ({
                stdout: e.stdout,
                stderr: e.stderr,
                outcome:
                  e.outcome.type === `exit`
                    ? { type: `exit`, exitCode: e.outcome.exit_code }
                    : { type: `timeout` },
              })),
            },
          });
          break;
        case `message`:
          for (let n of e.content) {
            t.providerOptions?.[p]?.logprobs && n.logprobs && x.push(n.logprobs);
            let a = {
              itemId: e.id,
              ...(e.phase != null && { phase: e.phase }),
              ...(n.annotations.length > 0 && { annotations: n.annotations }),
            };
            b.push({ type: `text`, text: n.text, providerMetadata: { [p]: a } });
            for (let e of n.annotations)
              e.type === `url_citation`
                ? b.push({
                    type: `source`,
                    sourceType: `url`,
                    id: (r = this.config).generateId?.call(r) ?? J(),
                    url: e.url,
                    title: e.title,
                  })
                : e.type === `file_citation`
                  ? b.push({
                      type: `source`,
                      sourceType: `document`,
                      id: (i = this.config).generateId?.call(i) ?? J(),
                      mediaType: `text/plain`,
                      title: e.filename,
                      filename: e.filename,
                      providerMetadata: {
                        [p]: { type: e.type, fileId: e.file_id, index: e.index },
                      },
                    })
                  : e.type === `container_file_citation`
                    ? b.push({
                        type: `source`,
                        sourceType: `document`,
                        id: (o = this.config).generateId?.call(o) ?? J(),
                        mediaType: `text/plain`,
                        title: e.filename,
                        filename: e.filename,
                        providerMetadata: {
                          [p]: { type: e.type, fileId: e.file_id, containerId: e.container_id },
                        },
                      })
                    : e.type === `file_path` &&
                      b.push({
                        type: `source`,
                        sourceType: `document`,
                        id: (s = this.config).generateId?.call(s) ?? J(),
                        mediaType: `application/octet-stream`,
                        title: e.file_id,
                        filename: e.file_id,
                        providerMetadata: {
                          [p]: { type: e.type, fileId: e.file_id, index: e.index },
                        },
                      });
          }
          break;
        case `function_call`:
          ((S = !0),
            b.push({
              type: `tool-call`,
              toolCallId: e.call_id,
              toolName: e.name,
              input: e.arguments,
              providerMetadata: {
                [p]: { itemId: e.id, ...(e.namespace != null && { namespace: e.namespace }) },
              },
            }));
          break;
        case `custom_tool_call`: {
          S = !0;
          let t = f.toCustomToolName(e.name);
          b.push({
            type: `tool-call`,
            toolCallId: e.call_id,
            toolName: t,
            input: JSON.stringify(e.input),
            providerMetadata: { [p]: { itemId: e.id } },
          });
          break;
        }
        case `web_search_call`:
          (b.push({
            type: `tool-call`,
            toolCallId: e.id,
            toolName: f.toCustomToolName(d ?? `web_search`),
            input: JSON.stringify({}),
            providerExecuted: !0,
          }),
            b.push({
              type: `tool-result`,
              toolCallId: e.id,
              toolName: f.toCustomToolName(d ?? `web_search`),
              result: Wn(e.action),
            }));
          break;
        case `mcp_call`: {
          let t = e.approval_request_id == null ? e.id : (g[e.approval_request_id] ?? e.id),
            n = `mcp.${e.name}`;
          (b.push({
            type: `tool-call`,
            toolCallId: t,
            toolName: n,
            input: e.arguments,
            providerExecuted: !0,
            dynamic: !0,
          }),
            b.push({
              type: `tool-result`,
              toolCallId: t,
              toolName: n,
              result: {
                type: `call`,
                serverLabel: e.server_label,
                name: e.name,
                arguments: e.arguments,
                ...(e.output == null ? {} : { output: e.output }),
                ...(e.error == null ? {} : { error: e.error }),
              },
              providerMetadata: { [p]: { itemId: e.id } },
            }));
          break;
        }
        case `mcp_list_tools`:
          break;
        case `mcp_approval_request`: {
          let t = e.approval_request_id ?? e.id,
            n = (c = this.config).generateId?.call(c) ?? J(),
            r = `mcp.${e.name}`;
          (b.push({
            type: `tool-call`,
            toolCallId: n,
            toolName: r,
            input: e.arguments,
            providerExecuted: !0,
            dynamic: !0,
          }),
            b.push({ type: `tool-approval-request`, approvalId: t, toolCallId: n }));
          break;
        }
        case `computer_call`: {
          if (e.call_id == null) {
            (b.push({
              type: `tool-call`,
              toolCallId: e.id,
              toolName: f.toCustomToolName(`computer_use`),
              input: ``,
              providerExecuted: !0,
            }),
              b.push({
                type: `tool-result`,
                toolCallId: e.id,
                toolName: f.toCustomToolName(`computer_use`),
                result: { type: `computer_use_tool_result`, status: e.status },
              }));
            break;
          }
          S = !0;
          let t = f.toCustomToolName(`computer`);
          b.push({
            type: `tool-call`,
            toolCallId: e.call_id,
            toolName: t,
            input: JSON.stringify(Cn(e)),
            providerMetadata: { [p]: { itemId: e.id } },
          });
          break;
        }
        case `file_search_call`:
          (b.push({
            type: `tool-call`,
            toolCallId: e.id,
            toolName: f.toCustomToolName(`file_search`),
            input: `{}`,
            providerExecuted: !0,
          }),
            b.push({
              type: `tool-result`,
              toolCallId: e.id,
              toolName: f.toCustomToolName(`file_search`),
              result: {
                queries: e.queries,
                results:
                  e.results?.map((e) => ({
                    attributes: e.attributes,
                    fileId: e.file_id,
                    filename: e.filename,
                    score: e.score,
                    text: e.text,
                  })) ?? null,
              },
            }));
          break;
        case `code_interpreter_call`:
          (b.push({
            type: `tool-call`,
            toolCallId: e.id,
            toolName: f.toCustomToolName(`code_interpreter`),
            input: JSON.stringify({ code: e.code, containerId: e.container_id }),
            providerExecuted: !0,
          }),
            b.push({
              type: `tool-result`,
              toolCallId: e.id,
              toolName: f.toCustomToolName(`code_interpreter`),
              result: { outputs: e.outputs },
            }));
          break;
        case `apply_patch_call`:
          b.push({
            type: `tool-call`,
            toolCallId: e.call_id,
            toolName: f.toCustomToolName(`apply_patch`),
            input: JSON.stringify({ callId: e.call_id, operation: e.operation }),
            providerMetadata: { [p]: { itemId: e.id } },
          });
          break;
        case `compaction`:
          b.push({
            type: `custom`,
            kind: `openai.compaction`,
            providerMetadata: {
              [p]: { type: `compaction`, itemId: e.id, encryptedContent: e.encrypted_content },
            },
          });
          break;
      }
    let w = {
        [p]: {
          responseId: v.id,
          ...(x.length > 0 ? { logprobs: x } : {}),
          ...(typeof v.service_tier == `string` ? { serviceTier: v.service_tier } : {}),
          ...(v.reasoning?.context == null ? {} : { reasoningContext: v.reasoning.context }),
        },
      },
      T = v.usage;
    return {
      content: b,
      finishReason: {
        unified: on({ finishReason: v.incomplete_details?.reason, hasFunctionCall: S }),
        raw: v.incomplete_details?.reason ?? void 0,
      },
      usage: en(T),
      request: { body: l },
      response: {
        id: v.id,
        timestamp: new Date(v.created_at * 1e3),
        modelId: v.model,
        headers: _,
        body: y,
      },
      providerMetadata: w,
      warnings: u,
    };
  }
  async doStream(e) {
    var t;
    let {
        args: n,
        warnings: r,
        webSearchToolName: i,
        toolNameMapping: o,
        store: s,
        providerOptionsName: c,
        isShellProviderExecuted: l,
      } = await this.getArgs(e),
      u = this.config.url({ path: `/responses`, modelId: this.modelId }),
      { responseHeaders: d, value: f } = await a({
        url: u,
        headers: B((t = this.config).headers?.call(t), e.headers),
        body: { ...n, stream: !0 },
        failedResponseHandler: X,
        successfulResponseHandler: O(pn),
        abortSignal: e.abortSignal,
        fetch: this.config.fetch,
      }),
      p = await me({
        stream: f,
        getError: (e) => (Hn(e) || (jn(e) && e.response.error != null) ? e : void 0),
        isOutputChunk: Un,
        url: u,
        requestBodyValues: n,
        responseHeaders: d,
      }),
      m = this,
      h = xn(e.prompt),
      g = new Map(),
      _ = { unified: `other`, raw: void 0 },
      v,
      y = [],
      b = null,
      x = {},
      S = [],
      C,
      w = !1,
      T = {},
      E,
      D,
      ee = [],
      k = !1;
    return {
      stream: p.pipeThrough(
        new TransformStream({
          start(e) {
            e.enqueue({ type: `stream-start`, warnings: r });
          },
          transform(t, r) {
            var a, f, p, O, A;
            if (
              (e.includeRawChunks && r.enqueue({ type: `raw`, rawValue: t.rawValue }), !t.success)
            ) {
              let e = En(t.rawValue)
                ? Dn({
                    value: t.rawValue,
                    cause: t.error,
                    url: u,
                    requestBodyValues: n,
                    responseHeaders: d,
                  })
                : t.error;
              ((_ = { unified: `error`, raw: void 0 }), r.enqueue({ type: `error`, error: e }));
              return;
            }
            let j = t.value;
            if (Bn(j)) {
              if (j.item.type === `function_call`)
                ((x[j.output_index] = { toolName: j.item.name, toolCallId: j.item.call_id }),
                  r.enqueue({
                    type: `tool-input-start`,
                    id: j.item.call_id,
                    toolName: j.item.name,
                  }));
              else if (j.item.type === `custom_tool_call`) {
                let e = o.toCustomToolName(j.item.name);
                ((x[j.output_index] = { toolName: e, toolCallId: j.item.call_id }),
                  r.enqueue({ type: `tool-input-start`, id: j.item.call_id, toolName: e }));
              } else if (j.item.type === `web_search_call`)
                ((x[j.output_index] = {
                  toolName: o.toCustomToolName(i ?? `web_search`),
                  toolCallId: j.item.id,
                }),
                  r.enqueue({
                    type: `tool-input-start`,
                    id: j.item.id,
                    toolName: o.toCustomToolName(i ?? `web_search`),
                    providerExecuted: !0,
                  }),
                  r.enqueue({ type: `tool-input-end`, id: j.item.id }),
                  r.enqueue({
                    type: `tool-call`,
                    toolCallId: j.item.id,
                    toolName: o.toCustomToolName(i ?? `web_search`),
                    input: JSON.stringify({}),
                    providerExecuted: !0,
                  }));
              else if (j.item.type === `computer_call`) {
                let e = j.item.call_id ?? j.item.id;
                ((x[j.output_index] = { toolName: o.toCustomToolName(`computer`), toolCallId: e }),
                  r.enqueue({
                    type: `tool-input-start`,
                    id: e,
                    toolName: o.toCustomToolName(`computer`),
                  }));
              } else if (j.item.type === `code_interpreter_call`)
                ((x[j.output_index] = {
                  toolName: o.toCustomToolName(`code_interpreter`),
                  toolCallId: j.item.id,
                  codeInterpreter: { containerId: j.item.container_id },
                }),
                  r.enqueue({
                    type: `tool-input-start`,
                    id: j.item.id,
                    toolName: o.toCustomToolName(`code_interpreter`),
                    providerExecuted: !0,
                  }),
                  r.enqueue({
                    type: `tool-input-delta`,
                    id: j.item.id,
                    delta: `{"containerId":"${j.item.container_id}","code":"`,
                  }));
              else if (j.item.type === `file_search_call`)
                r.enqueue({
                  type: `tool-call`,
                  toolCallId: j.item.id,
                  toolName: o.toCustomToolName(`file_search`),
                  input: `{}`,
                  providerExecuted: !0,
                });
              else if (j.item.type === `image_generation_call`)
                r.enqueue({
                  type: `tool-call`,
                  toolCallId: j.item.id,
                  toolName: o.toCustomToolName(`image_generation`),
                  input: `{}`,
                  providerExecuted: !0,
                });
              else if (j.item.type === `tool_search_call`) {
                let e = j.item.id,
                  t = o.toCustomToolName(`tool_search`),
                  n = j.item.execution === `server`;
                ((x[j.output_index] = {
                  toolName: t,
                  toolCallId: e,
                  toolSearchExecution: j.item.execution ?? `server`,
                }),
                  n &&
                    r.enqueue({
                      type: `tool-input-start`,
                      id: e,
                      toolName: t,
                      providerExecuted: !0,
                    }));
              } else if (
                j.item.type !== `tool_search_output` &&
                !(
                  j.item.type === `mcp_call` ||
                  j.item.type === `mcp_list_tools` ||
                  j.item.type === `mcp_approval_request`
                )
              )
                if (j.item.type === `apply_patch_call`) {
                  let { call_id: e, operation: t } = j.item;
                  if (
                    ((x[j.output_index] = {
                      toolName: o.toCustomToolName(`apply_patch`),
                      toolCallId: e,
                      applyPatch: {
                        hasDiff: t.type === `delete_file`,
                        endEmitted: t.type === `delete_file`,
                      },
                    }),
                    r.enqueue({
                      type: `tool-input-start`,
                      id: e,
                      toolName: o.toCustomToolName(`apply_patch`),
                    }),
                    t.type === `delete_file`)
                  ) {
                    let n = JSON.stringify({ callId: e, operation: t });
                    (r.enqueue({ type: `tool-input-delta`, id: e, delta: n }),
                      r.enqueue({ type: `tool-input-end`, id: e }));
                  } else
                    r.enqueue({
                      type: `tool-input-delta`,
                      id: e,
                      delta: `{"callId":"${$(e)}","operation":{"type":"${$(t.type)}","path":"${$(t.path)}","diff":"`,
                    });
                } else
                  j.item.type === `shell_call`
                    ? (x[j.output_index] = {
                        toolName: o.toCustomToolName(`shell`),
                        toolCallId: j.item.call_id,
                      })
                    : j.item.type === `shell_call_output` ||
                      (j.item.type === `message`
                        ? (S.splice(0, S.length),
                          (C = j.item.phase ?? void 0),
                          r.enqueue({
                            type: `text-start`,
                            id: j.item.id,
                            providerMetadata: {
                              [c]: {
                                itemId: j.item.id,
                                ...(j.item.phase != null && { phase: j.item.phase }),
                              },
                            },
                          }))
                        : Bn(j) &&
                          j.item.type === `reasoning` &&
                          ((T[j.item.id] = {
                            encryptedContent: j.item.encrypted_content,
                            summaryParts: { 0: `active` },
                          }),
                          r.enqueue({
                            type: `reasoning-start`,
                            id: `${j.item.id}:0`,
                            providerMetadata: {
                              [c]: {
                                itemId: j.item.id,
                                reasoningEncryptedContent: j.item.encrypted_content ?? null,
                              },
                            },
                          })));
            } else if (kn(j))
              if (j.item.type === `message`) {
                let e = j.item.phase ?? C;
                ((C = void 0),
                  r.enqueue({
                    type: `text-end`,
                    id: j.item.id,
                    providerMetadata: {
                      [c]: {
                        itemId: j.item.id,
                        ...(e != null && { phase: e }),
                        ...(S.length > 0 && { annotations: S }),
                      },
                    },
                  }));
              } else if (j.item.type === `function_call`)
                ((x[j.output_index] = void 0),
                  (w = !0),
                  r.enqueue({
                    type: `tool-input-end`,
                    id: j.item.call_id,
                    ...(j.item.namespace != null && {
                      providerMetadata: { [c]: { namespace: j.item.namespace } },
                    }),
                  }),
                  r.enqueue({
                    type: `tool-call`,
                    toolCallId: j.item.call_id,
                    toolName: j.item.name,
                    input: j.item.arguments,
                    providerMetadata: {
                      [c]: {
                        itemId: j.item.id,
                        ...(j.item.namespace != null && { namespace: j.item.namespace }),
                      },
                    },
                  }));
              else if (j.item.type === `custom_tool_call`) {
                ((x[j.output_index] = void 0), (w = !0));
                let e = o.toCustomToolName(j.item.name);
                (r.enqueue({ type: `tool-input-end`, id: j.item.call_id }),
                  r.enqueue({
                    type: `tool-call`,
                    toolCallId: j.item.call_id,
                    toolName: e,
                    input: JSON.stringify(j.item.input),
                    providerMetadata: { [c]: { itemId: j.item.id } },
                  }));
              } else if (j.item.type === `web_search_call`)
                ((x[j.output_index] = void 0),
                  r.enqueue({
                    type: `tool-result`,
                    toolCallId: j.item.id,
                    toolName: o.toCustomToolName(i ?? `web_search`),
                    result: Wn(j.item.action),
                  }));
              else if (j.item.type === `computer_call`) {
                if (((x[j.output_index] = void 0), j.item.call_id == null)) {
                  (r.enqueue({ type: `tool-input-end`, id: j.item.id }),
                    r.enqueue({
                      type: `tool-call`,
                      toolCallId: j.item.id,
                      toolName: o.toCustomToolName(`computer_use`),
                      input: ``,
                      providerExecuted: !0,
                    }),
                    r.enqueue({
                      type: `tool-result`,
                      toolCallId: j.item.id,
                      toolName: o.toCustomToolName(`computer_use`),
                      result: { type: `computer_use_tool_result`, status: j.item.status },
                    }));
                  return;
                }
                w = !0;
                let e = o.toCustomToolName(`computer`),
                  t = JSON.stringify(Cn(j.item));
                (r.enqueue({ type: `tool-input-delta`, id: j.item.call_id, delta: t }),
                  r.enqueue({ type: `tool-input-end`, id: j.item.call_id }),
                  r.enqueue({
                    type: `tool-call`,
                    toolCallId: j.item.call_id,
                    toolName: e,
                    input: t,
                    providerMetadata: { [c]: { itemId: j.item.id } },
                  }));
              } else if (j.item.type === `file_search_call`)
                ((x[j.output_index] = void 0),
                  r.enqueue({
                    type: `tool-result`,
                    toolCallId: j.item.id,
                    toolName: o.toCustomToolName(`file_search`),
                    result: {
                      queries: j.item.queries,
                      results:
                        j.item.results?.map((e) => ({
                          attributes: e.attributes,
                          fileId: e.file_id,
                          filename: e.filename,
                          score: e.score,
                          text: e.text,
                        })) ?? null,
                    },
                  }));
              else if (j.item.type === `code_interpreter_call`)
                ((x[j.output_index] = void 0),
                  r.enqueue({
                    type: `tool-result`,
                    toolCallId: j.item.id,
                    toolName: o.toCustomToolName(`code_interpreter`),
                    result: { outputs: j.item.outputs },
                  }));
              else if (j.item.type === `image_generation_call`)
                r.enqueue({
                  type: `tool-result`,
                  toolCallId: j.item.id,
                  toolName: o.toCustomToolName(`image_generation`),
                  result: { result: j.item.result },
                });
              else if (j.item.type === `tool_search_call`) {
                let e = x[j.output_index],
                  t = j.item.execution === `server`;
                if (e != null) {
                  let n = t ? e.toolCallId : (j.item.call_id ?? j.item.id);
                  (t
                    ? ee.push(n)
                    : r.enqueue({ type: `tool-input-start`, id: n, toolName: e.toolName }),
                    r.enqueue({ type: `tool-input-end`, id: n }),
                    r.enqueue({
                      type: `tool-call`,
                      toolCallId: n,
                      toolName: e.toolName,
                      input: JSON.stringify({ arguments: j.item.arguments, call_id: t ? null : n }),
                      ...(t ? { providerExecuted: !0 } : {}),
                      providerMetadata: { [c]: { itemId: j.item.id } },
                    }));
                }
                x[j.output_index] = void 0;
              } else if (j.item.type === `tool_search_output`) {
                let e = j.item.call_id ?? ee.shift() ?? j.item.id;
                r.enqueue({
                  type: `tool-result`,
                  toolCallId: e,
                  toolName: o.toCustomToolName(`tool_search`),
                  result: { tools: j.item.tools },
                  providerMetadata: { [c]: { itemId: j.item.id } },
                });
              } else if (j.item.type === `mcp_call`) {
                x[j.output_index] = void 0;
                let e = j.item.approval_request_id ?? void 0,
                  t = e == null ? j.item.id : (g.get(e) ?? h[e] ?? j.item.id),
                  n = `mcp.${j.item.name}`;
                (r.enqueue({
                  type: `tool-call`,
                  toolCallId: t,
                  toolName: n,
                  input: j.item.arguments,
                  providerExecuted: !0,
                  dynamic: !0,
                }),
                  r.enqueue({
                    type: `tool-result`,
                    toolCallId: t,
                    toolName: n,
                    result: {
                      type: `call`,
                      serverLabel: j.item.server_label,
                      name: j.item.name,
                      arguments: j.item.arguments,
                      ...(j.item.output == null ? {} : { output: j.item.output }),
                      ...(j.item.error == null ? {} : { error: j.item.error }),
                    },
                    providerMetadata: { [c]: { itemId: j.item.id } },
                  }));
              } else if (j.item.type === `mcp_list_tools`) x[j.output_index] = void 0;
              else if (j.item.type === `apply_patch_call`) {
                let e = x[j.output_index];
                (e?.applyPatch &&
                  !e.applyPatch.endEmitted &&
                  j.item.operation.type !== `delete_file` &&
                  (e.applyPatch.hasDiff ||
                    r.enqueue({
                      type: `tool-input-delta`,
                      id: e.toolCallId,
                      delta: $(j.item.operation.diff),
                    }),
                  r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: `"}}` }),
                  r.enqueue({ type: `tool-input-end`, id: e.toolCallId }),
                  (e.applyPatch.endEmitted = !0)),
                  e &&
                    j.item.status === `completed` &&
                    r.enqueue({
                      type: `tool-call`,
                      toolCallId: e.toolCallId,
                      toolName: o.toCustomToolName(`apply_patch`),
                      input: JSON.stringify({
                        callId: j.item.call_id,
                        operation: j.item.operation,
                      }),
                      providerMetadata: { [c]: { itemId: j.item.id } },
                    }),
                  (x[j.output_index] = void 0));
              } else if (j.item.type === `mcp_approval_request`) {
                x[j.output_index] = void 0;
                let e = (a = m.config).generateId?.call(a) ?? J(),
                  t = j.item.approval_request_id ?? j.item.id;
                g.set(t, e);
                let n = `mcp.${j.item.name}`;
                (r.enqueue({
                  type: `tool-call`,
                  toolCallId: e,
                  toolName: n,
                  input: j.item.arguments,
                  providerExecuted: !0,
                  dynamic: !0,
                }),
                  r.enqueue({ type: `tool-approval-request`, approvalId: t, toolCallId: e }));
              } else if (j.item.type === `local_shell_call`)
                ((x[j.output_index] = void 0),
                  r.enqueue({
                    type: `tool-call`,
                    toolCallId: j.item.call_id,
                    toolName: o.toCustomToolName(`local_shell`),
                    input: JSON.stringify({
                      action: {
                        type: `exec`,
                        command: j.item.action.command,
                        timeoutMs: j.item.action.timeout_ms,
                        user: j.item.action.user,
                        workingDirectory: j.item.action.working_directory,
                        env: j.item.action.env,
                      },
                    }),
                    providerMetadata: { [c]: { itemId: j.item.id } },
                  }));
              else if (j.item.type === `shell_call`)
                ((x[j.output_index] = void 0),
                  r.enqueue({
                    type: `tool-call`,
                    toolCallId: j.item.call_id,
                    toolName: o.toCustomToolName(`shell`),
                    input: JSON.stringify({ action: { commands: j.item.action.commands } }),
                    ...(l && { providerExecuted: !0 }),
                    providerMetadata: { [c]: { itemId: j.item.id } },
                  }));
              else if (j.item.type === `shell_call_output`)
                r.enqueue({
                  type: `tool-result`,
                  toolCallId: j.item.call_id,
                  toolName: o.toCustomToolName(`shell`),
                  result: {
                    output: j.item.output.map((e) => ({
                      stdout: e.stdout,
                      stderr: e.stderr,
                      outcome:
                        e.outcome.type === `exit`
                          ? { type: `exit`, exitCode: e.outcome.exit_code }
                          : { type: `timeout` },
                    })),
                  },
                });
              else if (j.item.type === `reasoning`) {
                let e = T[j.item.id],
                  t = Object.entries(e.summaryParts)
                    .filter(([e, t]) => t === `active` || t === `can-conclude`)
                    .map(([e]) => e);
                for (let e of t)
                  r.enqueue({
                    type: `reasoning-end`,
                    id: `${j.item.id}:${e}`,
                    providerMetadata: {
                      [c]: {
                        itemId: j.item.id,
                        reasoningEncryptedContent: j.item.encrypted_content ?? null,
                      },
                    },
                  });
                delete T[j.item.id];
              } else
                j.item.type === `compaction` &&
                  r.enqueue({
                    type: `custom`,
                    kind: `openai.compaction`,
                    providerMetadata: {
                      [c]: {
                        type: `compaction`,
                        itemId: j.item.id,
                        encryptedContent: j.item.encrypted_content,
                      },
                    },
                  });
            else if (Nn(j)) {
              let e = x[j.output_index];
              e != null &&
                r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: j.delta });
            } else if (Pn(j)) {
              let e = x[j.output_index];
              e != null &&
                r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: j.delta });
            } else if (Rn(j)) {
              let e = x[j.output_index];
              e?.applyPatch &&
                (r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: $(j.delta) }),
                (e.applyPatch.hasDiff = !0));
            } else if (zn(j)) {
              let e = x[j.output_index];
              e?.applyPatch &&
                !e.applyPatch.endEmitted &&
                (e.applyPatch.hasDiff ||
                  (r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: $(j.diff) }),
                  (e.applyPatch.hasDiff = !0)),
                r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: `"}}` }),
                r.enqueue({ type: `tool-input-end`, id: e.toolCallId }),
                (e.applyPatch.endEmitted = !0));
            } else if (Fn(j))
              r.enqueue({
                type: `tool-result`,
                toolCallId: j.item_id,
                toolName: o.toCustomToolName(`image_generation`),
                result: { result: j.partial_image_b64 },
                preliminary: !0,
              });
            else if (In(j)) {
              let e = x[j.output_index];
              e != null &&
                r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: $(j.delta) });
            } else if (Ln(j)) {
              let e = x[j.output_index];
              e != null &&
                (r.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: `"}` }),
                r.enqueue({ type: `tool-input-end`, id: e.toolCallId }),
                r.enqueue({
                  type: `tool-call`,
                  toolCallId: e.toolCallId,
                  toolName: o.toCustomToolName(`code_interpreter`),
                  input: JSON.stringify({
                    code: j.code,
                    containerId: e.codeInterpreter.containerId,
                  }),
                  providerExecuted: !0,
                }));
            } else if (Mn(j))
              ((b = j.response.id),
                r.enqueue({
                  type: `response-metadata`,
                  id: j.response.id,
                  timestamp: new Date(j.response.created_at * 1e3),
                  modelId: j.response.model,
                }));
            else if (Tn(j))
              (r.enqueue({ type: `text-delta`, id: j.item_id, delta: j.delta }),
                e.providerOptions?.[c]?.logprobs && j.logprobs && y.push(j.logprobs));
            else if (j.type === `response.reasoning_summary_part.added`) {
              if (j.summary_index > 0) {
                let e = T[j.item_id];
                e.summaryParts[j.summary_index] = `active`;
                for (let t of Object.keys(e.summaryParts))
                  e.summaryParts[t] === `can-conclude` &&
                    (r.enqueue({
                      type: `reasoning-end`,
                      id: `${j.item_id}:${t}`,
                      providerMetadata: { [c]: { itemId: j.item_id } },
                    }),
                    (e.summaryParts[t] = `concluded`));
                r.enqueue({
                  type: `reasoning-start`,
                  id: `${j.item_id}:${j.summary_index}`,
                  providerMetadata: {
                    [c]: {
                      itemId: j.item_id,
                      reasoningEncryptedContent: T[j.item_id]?.encryptedContent ?? null,
                    },
                  },
                });
              }
            } else if (j.type === `response.reasoning_summary_text.delta`)
              r.enqueue({
                type: `reasoning-delta`,
                id: `${j.item_id}:${j.summary_index}`,
                delta: j.delta,
                providerMetadata: { [c]: { itemId: j.item_id } },
              });
            else if (j.type === `response.reasoning_summary_part.done`)
              s
                ? (r.enqueue({
                    type: `reasoning-end`,
                    id: `${j.item_id}:${j.summary_index}`,
                    providerMetadata: { [c]: { itemId: j.item_id } },
                  }),
                  (T[j.item_id].summaryParts[j.summary_index] = `concluded`))
                : (T[j.item_id].summaryParts[j.summary_index] = `can-conclude`);
            else if (An(j))
              ((_ = {
                unified: on({
                  finishReason: j.response.incomplete_details?.reason,
                  hasFunctionCall: w,
                }),
                raw: j.response.incomplete_details?.reason ?? void 0,
              }),
                (v = j.response.usage),
                typeof j.response.service_tier == `string` && (E = j.response.service_tier),
                j.response.reasoning?.context != null && (D = j.response.reasoning.context));
            else if (jn(j)) {
              let e = j.response.incomplete_details?.reason;
              ((_ = {
                unified: e ? on({ finishReason: e, hasFunctionCall: w }) : `error`,
                raw: e ?? `error`,
              }),
                (v = j.response.usage ?? void 0),
                j.response.reasoning?.context != null && (D = j.response.reasoning.context),
                !k &&
                  j.response.error != null &&
                  ((k = !0),
                  r.enqueue({
                    type: `error`,
                    error: {
                      type: `response.failed`,
                      sequence_number: j.sequence_number,
                      response: {
                        error: j.response.error,
                        incomplete_details: j.response.incomplete_details,
                        service_tier: j.response.service_tier,
                      },
                    },
                  })));
            } else
              Vn(j)
                ? (S.push(j.annotation),
                  j.annotation.type === `url_citation`
                    ? r.enqueue({
                        type: `source`,
                        sourceType: `url`,
                        id: (f = m.config).generateId?.call(f) ?? J(),
                        url: j.annotation.url,
                        title: j.annotation.title,
                      })
                    : j.annotation.type === `file_citation`
                      ? r.enqueue({
                          type: `source`,
                          sourceType: `document`,
                          id: (p = m.config).generateId?.call(p) ?? J(),
                          mediaType: `text/plain`,
                          title: j.annotation.filename,
                          filename: j.annotation.filename,
                          providerMetadata: {
                            [c]: {
                              type: j.annotation.type,
                              fileId: j.annotation.file_id,
                              index: j.annotation.index,
                            },
                          },
                        })
                      : j.annotation.type === `container_file_citation`
                        ? r.enqueue({
                            type: `source`,
                            sourceType: `document`,
                            id: (O = m.config).generateId?.call(O) ?? J(),
                            mediaType: `text/plain`,
                            title: j.annotation.filename,
                            filename: j.annotation.filename,
                            providerMetadata: {
                              [c]: {
                                type: j.annotation.type,
                                fileId: j.annotation.file_id,
                                containerId: j.annotation.container_id,
                              },
                            },
                          })
                        : j.annotation.type === `file_path` &&
                          r.enqueue({
                            type: `source`,
                            sourceType: `document`,
                            id: (A = m.config).generateId?.call(A) ?? J(),
                            mediaType: `application/octet-stream`,
                            title: j.annotation.file_id,
                            filename: j.annotation.file_id,
                            providerMetadata: {
                              [c]: {
                                type: j.annotation.type,
                                fileId: j.annotation.file_id,
                                index: j.annotation.index,
                              },
                            },
                          }))
                : Hn(j) &&
                  ((k = !0),
                  (_ = { unified: `error`, raw: `error` }),
                  r.enqueue({ type: `error`, error: j }));
          },
          flush(e) {
            let t = {
              [c]: {
                responseId: b,
                ...(y.length > 0 ? { logprobs: y } : {}),
                ...(E === void 0 ? {} : { serviceTier: E }),
                ...(D === void 0 ? {} : { reasoningContext: D }),
              },
            };
            e.enqueue({ type: `finish`, finishReason: _, usage: en(v), providerMetadata: t });
          },
        }),
      ),
      request: { body: n },
      response: { headers: d },
    };
  }
};
function Tn(e) {
  return e.type === `response.output_text.delta`;
}
function En(e) {
  let t = On(e);
  return t != null && Array.isArray(t.choices) && typeof t.type != `string`;
}
function Dn({ value: t, cause: n, url: r, requestBodyValues: i, responseHeaders: a }) {
  return new e({
    message: `Received a Chat Completions stream while using the OpenAI Responses API. The default OpenAI provider model uses the Responses API. If your custom baseURL targets a Chat Completions-compatible endpoint, use openai.chat('model-id') or createOpenAI(...).chat('model-id') instead. You can also use @ai-sdk/openai-compatible for OpenAI-compatible providers.`,
    url: r,
    requestBodyValues: i,
    responseHeaders: a,
    responseBody: JSON.stringify(t),
    cause: n,
    data: t,
    isRetryable: !1,
  });
}
function On(e) {
  return typeof e == `object` && e ? e : void 0;
}
function kn(e) {
  return e.type === `response.output_item.done`;
}
function An(e) {
  return e.type === `response.completed` || e.type === `response.incomplete`;
}
function jn(e) {
  return e.type === `response.failed`;
}
function Mn(e) {
  return e.type === `response.created`;
}
function Nn(e) {
  return e.type === `response.function_call_arguments.delta`;
}
function Pn(e) {
  return e.type === `response.custom_tool_call_input.delta`;
}
function Fn(e) {
  return e.type === `response.image_generation_call.partial_image`;
}
function In(e) {
  return e.type === `response.code_interpreter_call_code.delta`;
}
function Ln(e) {
  return e.type === `response.code_interpreter_call_code.done`;
}
function Rn(e) {
  return e.type === `response.apply_patch_call_operation_diff.delta`;
}
function zn(e) {
  return e.type === `response.apply_patch_call_operation_diff.done`;
}
function Bn(e) {
  return e.type === `response.output_item.added`;
}
function Vn(e) {
  return e.type === `response.output_text.annotation.added`;
}
function Hn(e) {
  return e.type === `error`;
}
function Un(e) {
  return !(
    e.type === `response.created` ||
    e.type === `response.failed` ||
    e.type === `error` ||
    e.type === `unknown_chunk`
  );
}
function Wn(e) {
  if (e == null) return {};
  switch (e.type) {
    case `search`:
      return {
        action: {
          type: `search`,
          query: e.query ?? void 0,
          ...(e.queries != null && { queries: e.queries }),
        },
        ...(e.sources != null && { sources: e.sources }),
      };
    case `open_page`:
      return { action: { type: `openPage`, url: e.url } };
    case `find_in_page`:
      return { action: { type: `findInPage`, url: e.url, pattern: e.pattern } };
  }
}
function $(e) {
  return JSON.stringify(e).slice(1, -1);
}
var Gn = F(() =>
    L(G({ instructions: Y().nullish(), speed: C().min(0.25).max(4).default(1).nullish() })),
  ),
  Kn = class e {
    constructor(e, t) {
      ((this.modelId = e), (this.config = t), (this.specificationVersion = `v4`));
    }
    static [P](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [V](t) {
      return new e(t.modelId, t.config);
    }
    get provider() {
      return this.config.provider;
    }
    async getArgs({
      text: e,
      voice: t = `alloy`,
      outputFormat: n = `mp3`,
      speed: r,
      instructions: i,
      language: a,
      providerOptions: o,
    }) {
      let s = [],
        c = await _({ provider: `openai`, providerOptions: o, schema: Gn }),
        l = {
          model: this.modelId,
          input: e,
          voice: t,
          response_format: `mp3`,
          speed: r,
          instructions: i,
        };
      if (
        (n &&
          ([`mp3`, `opus`, `aac`, `flac`, `wav`, `pcm`].includes(n)
            ? (l.response_format = n)
            : s.push({
                type: `unsupported`,
                feature: `outputFormat`,
                details: `Unsupported output format: ${n}. Using mp3 instead.`,
              })),
        c)
      ) {
        let e = {};
        for (let t in e) {
          let n = e[t];
          n !== void 0 && (l[t] = n);
        }
      }
      return (
        a &&
          s.push({
            type: `unsupported`,
            feature: `language`,
            details: `OpenAI speech models do not support language selection. Language parameter "${a}" was ignored.`,
          }),
        { requestBody: l, warnings: s }
      );
    }
    async doGenerate(e) {
      var t, n;
      let r = (t = this.config._internal)?.currentDate?.call(t) ?? new Date(),
        { requestBody: i, warnings: o } = await this.getArgs(e),
        {
          value: s,
          responseHeaders: c,
          rawValue: l,
        } = await a({
          url: this.config.url({ path: `/audio/speech`, modelId: this.modelId }),
          headers: B((n = this.config).headers?.call(n), e.headers),
          body: i,
          failedResponseHandler: X,
          successfulResponseHandler: ce(),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        });
      return {
        audio: s,
        warnings: o,
        request: { body: JSON.stringify(i) },
        response: { timestamp: r, modelId: this.modelId, headers: c, body: l },
      };
    }
  },
  qn = F(() =>
    L(
      G({
        text: Y(),
        language: Y().nullish(),
        duration: C().nullish(),
        words: W(G({ word: Y(), start: C(), end: C() })).nullish(),
        segments: W(
          G({
            id: C(),
            seek: C(),
            start: C(),
            end: C(),
            text: Y(),
            tokens: W(C()),
            temperature: C(),
            avg_logprob: C(),
            compression_ratio: C(),
            no_speech_prob: C(),
          }),
        ).nullish(),
      }),
    ),
  ),
  Jn = F(() =>
    L(
      G({
        include: W(Y()).optional(),
        language: Y().optional(),
        prompt: Y().optional(),
        temperature: C().min(0).max(1).default(0).optional(),
        timestampGranularities: W(U([`word`, `segment`]))
          .default([`segment`])
          .optional(),
        streaming: G({
          delay: U([`minimal`, `low`, `medium`, `high`, `xhigh`]).optional(),
          include: W(Y()).optional(),
        }).optional(),
      }),
    ),
  );
function Yn(e) {
  return e === `gpt-realtime-whisper` || e.startsWith(`gpt-realtime-whisper-`);
}
var Xn = {
    afrikaans: `af`,
    arabic: `ar`,
    armenian: `hy`,
    azerbaijani: `az`,
    belarusian: `be`,
    bosnian: `bs`,
    bulgarian: `bg`,
    catalan: `ca`,
    chinese: `zh`,
    croatian: `hr`,
    czech: `cs`,
    danish: `da`,
    dutch: `nl`,
    english: `en`,
    estonian: `et`,
    finnish: `fi`,
    french: `fr`,
    galician: `gl`,
    german: `de`,
    greek: `el`,
    hebrew: `he`,
    hindi: `hi`,
    hungarian: `hu`,
    icelandic: `is`,
    indonesian: `id`,
    italian: `it`,
    japanese: `ja`,
    kannada: `kn`,
    kazakh: `kk`,
    korean: `ko`,
    latvian: `lv`,
    lithuanian: `lt`,
    macedonian: `mk`,
    malay: `ms`,
    marathi: `mr`,
    maori: `mi`,
    nepali: `ne`,
    norwegian: `no`,
    persian: `fa`,
    polish: `pl`,
    portuguese: `pt`,
    romanian: `ro`,
    russian: `ru`,
    serbian: `sr`,
    slovak: `sk`,
    slovenian: `sl`,
    spanish: `es`,
    swahili: `sw`,
    swedish: `sv`,
    tagalog: `tl`,
    tamil: `ta`,
    thai: `th`,
    turkish: `tr`,
    ukrainian: `uk`,
    urdu: `ur`,
    vietnamese: `vi`,
    welsh: `cy`,
  },
  Zn = class e {
    constructor(e, t) {
      ((this.modelId = e), (this.config = t), (this.specificationVersion = `v4`));
    }
    static [P](e) {
      return d({ modelId: e.modelId, config: e.config });
    }
    static [V](t) {
      return new e(t.modelId, t.config);
    }
    get provider() {
      return this.config.provider;
    }
    async getArgs({ audio: e, mediaType: t, providerOptions: n }) {
      let r = [],
        i = await _({ provider: `openai`, providerOptions: n, schema: Jn }),
        a = new FormData(),
        o = e instanceof Uint8Array ? new Blob([e]) : new Blob([w(e)]);
      a.append(`model`, this.modelId);
      let s = u(t);
      if (
        (a.append(`file`, new File([o], `audio`, { type: t }), `audio.${s}`),
        this.modelId === `whisper-1` && a.append(`response_format`, `verbose_json`),
        i)
      ) {
        let e = [`gpt-4o-transcribe`, `gpt-4o-mini-transcribe`].includes(this.modelId),
          t = {
            include: i.include,
            language: i.language,
            prompt: i.prompt,
            ...(this.modelId !== `whisper-1` && { response_format: e ? `json` : `verbose_json` }),
            temperature: i.temperature,
            timestamp_granularities: i.timestampGranularities,
          };
        for (let [e, n] of Object.entries(t))
          if (n != null)
            if (Array.isArray(n)) for (let t of n) a.append(`${e}[]`, String(t));
            else a.append(e, String(n));
      }
      return { formData: a, warnings: r };
    }
    async doGenerate(e) {
      var t, n;
      if (Yn(this.modelId))
        throw new r({ functionality: `non-streaming transcription with ${this.modelId}` });
      let i = (t = this.config._internal)?.currentDate?.call(t) ?? new Date(),
        { formData: a, warnings: o } = await this.getArgs(e),
        {
          value: s,
          responseHeaders: c,
          rawValue: l,
        } = await ue({
          url: this.config.url({ path: `/audio/transcriptions`, modelId: this.modelId }),
          headers: B((n = this.config).headers?.call(n), e.headers),
          formData: a,
          failedResponseHandler: X,
          successfulResponseHandler: R(qn),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        u = s.language != null && s.language in Xn ? Xn[s.language] : void 0;
      return {
        text: s.text,
        segments:
          s.segments?.map((e) => ({ text: e.text, startSecond: e.start, endSecond: e.end })) ??
          s.words?.map((e) => ({ text: e.word, startSecond: e.start, endSecond: e.end })) ??
          [],
        language: u,
        durationInSeconds: s.duration ?? void 0,
        warnings: o,
        response: { timestamp: i, modelId: this.modelId, headers: c, body: l },
      };
    }
    async doStream(e) {
      var t, n;
      if (!Yn(this.modelId))
        throw new r({ functionality: `streaming transcription with ${this.modelId}` });
      let i = (t = this.config._internal)?.currentDate?.call(t) ?? new Date(),
        a = await _({ provider: `openai`, providerOptions: e.providerOptions, schema: Jn }),
        o = [],
        s = e.providerOptions?.openai ?? {};
      for (let e of [`include`, `prompt`, `temperature`, `timestampGranularities`])
        s[e] != null &&
          o.push({
            type: `unsupported`,
            feature: `providerOptions.openai.${e}`,
            details: `OpenAI streaming transcription does not support ${e}.`,
          });
      let c = B((n = this.config).headers?.call(n), e.headers),
        l = $n({ modelId: this.modelId, inputAudioFormat: e.inputAudioFormat, providerOptions: a });
      return {
        request: { body: l },
        response: { timestamp: i, modelId: this.modelId },
        stream: Qn({
          webSocket: this.config.webSocket,
          url: b(
            this.config.url({ path: `/realtime?intent=transcription`, modelId: this.modelId }),
          ),
          headers: c,
          sessionUpdate: l,
          language: a?.language,
          warnings: o,
          audio: e.audio,
          abortSignal: e.abortSignal,
          includeRawChunks: e.includeRawChunks,
        }),
      };
    }
  };
function Qn({
  webSocket: e,
  url: t,
  headers: n,
  sessionUpdate: r,
  language: a,
  warnings: o,
  audio: s,
  abortSignal: l,
  includeRawChunks: u,
}) {
  let d = !1,
    f = () => {};
  return new ReadableStream({
    start: (p) => {
      let m = er(n),
        h,
        g;
      f = (e) => {
        (h == null ? s.cancel().catch(() => {}) : h.cancel().catch(() => {}), g?.close(e));
      };
      let _ = (e) => {
          d || ((d = !0), f(), p.error(e));
        },
        v = (e, t) => {
          d ||
            ((d = !0),
            t != null && p.enqueue({ type: `transcript-final`, id: t, text: e }),
            p.enqueue({ type: `finish`, text: e, segments: [], language: a }),
            p.close(),
            f(1e3));
        },
        y = async (e) => {
          h = s.getReader();
          try {
            for (;;) {
              let { done: t, value: n } = await h.read();
              if (t || d) break;
              (e.send(JSON.stringify({ type: `input_audio_buffer.append`, audio: H(n) })),
                await i(e));
            }
          } finally {
            (h.releaseLock(), (h = void 0));
          }
          d || e.send(JSON.stringify({ type: `input_audio_buffer.commit` }));
        };
      g = te({
        url: t,
        protocols: m.protocols,
        headers: m.headers,
        webSocket: e,
        abortSignal: l,
        onAbort: _,
        onProcessingError: _,
        onOpen: (e) => {
          (p.enqueue({ type: `stream-start`, warnings: o }),
            e.send(JSON.stringify(r)),
            y(e).catch(_));
        },
        onMessageText: async (e) => {
          let t = await c({ text: e });
          if (!t.success) return;
          let n = t.value;
          switch ((u && p.enqueue({ type: `raw`, rawValue: n }), n.type)) {
            case `conversation.item.input_audio_transcription.delta`:
              p.enqueue({ type: `transcript-delta`, id: n.item_id, delta: n.delta ?? `` });
              break;
            case `conversation.item.input_audio_transcription.completed`:
              v(n.transcript ?? ``, n.item_id);
              break;
            case `error`:
              _(Error(n.error?.message ?? `OpenAI realtime error`));
              break;
          }
        },
        onSocketError: () => {
          _(Error(`OpenAI realtime transcription error`));
        },
        onClose: () => {
          d || ((d = !0), f(), p.close());
        },
      });
    },
    cancel: () => {
      d || ((d = !0), f());
    },
  });
}
function $n({ modelId: e, inputAudioFormat: t, providerOptions: n }) {
  return {
    type: `session.update`,
    session: {
      type: `transcription`,
      audio: {
        input: {
          format: { type: t.type, ...(t.rate == null ? {} : { rate: t.rate }) },
          transcription: {
            model: e,
            ...(n?.language == null ? {} : { language: n.language }),
            ...(n?.streaming?.delay == null ? {} : { delay: n.streaming.delay }),
          },
          turn_detection: null,
        },
      },
      ...(n?.streaming?.include == null ? {} : { include: n.streaming.include }),
    },
  };
}
function er(e) {
  let t;
  for (let [n, r] of Object.entries(e)) n.toLowerCase() === `authorization` && r != null && (t = r);
  let n = t?.match(/^bearer\s+(.+)$/i)?.[1];
  return n == null
    ? { protocols: [`realtime`], headers: e }
    : {
        protocols: [`realtime`, `openai-insecure-api-key.${n}`],
        headers: Object.fromEntries(
          Object.entries(e).filter(([e]) => e.toLowerCase() !== `authorization`),
        ),
      };
}
var tr = F(() =>
  L(
    G({
      id: Y(),
      name: Y().nullish(),
      description: Y().nullish(),
      default_version: Y().nullish(),
      latest_version: Y().nullish(),
      created_at: C(),
      updated_at: C().nullish(),
    }),
  ),
);
F(() => L(G({ id: Y(), version: Y().nullish(), name: Y().nullish(), description: Y().nullish() })));
var nr = class {
    constructor(e) {
      ((this.config = e), (this.specificationVersion = `v4`));
    }
    get provider() {
      return this.config.provider;
    }
    async uploadSkill(e) {
      let t = [];
      e.displayTitle != null && t.push({ type: `unsupported`, feature: `displayTitle` });
      let n = new FormData();
      for (let t of e.files) {
        let e = ie(t.data);
        n.append(`files[]`, new Blob([e]), t.path);
      }
      let { value: r } = await ue({
        url: this.config.url({ path: `/skills` }),
        headers: B(this.config.headers()),
        formData: n,
        failedResponseHandler: X,
        successfulResponseHandler: R(tr),
        fetch: this.config.fetch,
      });
      return {
        providerReference: { openai: r.id },
        ...(r.name == null ? {} : { name: r.name }),
        ...(r.description == null ? {} : { description: r.description }),
        ...(r.latest_version == null ? {} : { latestVersion: r.latest_version }),
        providerMetadata: {
          openai: {
            ...(r.default_version == null ? {} : { defaultVersion: r.default_version }),
            ...(r.created_at == null ? {} : { createdAt: r.created_at }),
            ...(r.updated_at == null ? {} : { updatedAt: r.updated_at }),
          },
        },
        warnings: t,
      };
    }
  },
  rr = `4.0.17`;
function ir(e = {}) {
  let t =
      se(x(m({ settingValue: e.baseURL, environmentVariableName: `OPENAI_BASE_URL` }))) ??
      `https://api.openai.com/v1`,
    n = e.name ?? `openai`,
    r = () =>
      ee(
        {
          Authorization: `Bearer ${p({ apiKey: e.apiKey, environmentVariableName: `OPENAI_API_KEY`, description: `OpenAI` })}`,
          "OpenAI-Organization": e.organization,
          "OpenAI-Project": e.project,
          ...e.headers,
        },
        `ai-sdk/openai/${rr}`,
      ),
    i = (i) =>
      new Ae(i, {
        provider: `${n}.chat`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
      }),
    a = (i) =>
      new ze(i, {
        provider: `${n}.completion`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
      }),
    o = (i) =>
      new Ue(i, {
        provider: `${n}.embedding`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
      }),
    s = (i) =>
      new et(i, {
        provider: `${n}.image`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
      }),
    c = (i) =>
      new Zn(i, {
        provider: `${n}.transcription`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
        webSocket: e.webSocket,
      }),
    l = (i) =>
      new Kn(i, {
        provider: `${n}.speech`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
      }),
    u = () => new Ke({ provider: `${n}.files`, baseURL: t, headers: r, fetch: e.fetch }),
    d = () =>
      new nr({
        provider: `${n}.skills`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
      }),
    f = (e) => {
      if (new.target)
        throw Error(`The OpenAI model function cannot be called with the new keyword.`);
      return h(e);
    },
    h = (i) =>
      new wn(i, {
        provider: `${n}.responses`,
        url: ({ path: e }) => `${t}${e}`,
        headers: r,
        fetch: e.fetch,
        fileIdPrefixes: [`file-`],
      }),
    g = (i) => new $t(i, { provider: `${n}.realtime`, baseURL: t, headers: r, fetch: e.fetch }),
    _ = Object.assign((e) => g(e), {
      getToken: async (e) => {
        let t = await g(e.model).doCreateClientSecret({
          sessionConfig: e.sessionConfig,
          expiresAfterSeconds: e.expiresAfterSeconds,
        });
        return { token: t.token, url: t.url, expiresAt: t.expiresAt };
      },
    }),
    v = function (e) {
      return f(e);
    };
  return (
    (v.specificationVersion = `v4`),
    (v.languageModel = f),
    (v.chat = i),
    (v.completion = a),
    (v.responses = h),
    (v.embedding = o),
    (v.embeddingModel = o),
    (v.textEmbedding = o),
    (v.textEmbeddingModel = o),
    (v.image = s),
    (v.imageModel = s),
    (v.transcription = c),
    (v.transcriptionModel = c),
    (v.speech = l),
    (v.speechModel = l),
    (v.files = u),
    (v.skills = d),
    (v.experimental_realtime = _),
    (v.tools = Yt),
    v
  );
}
var ar = ir();
export { $t as Experimental_OpenAIRealtimeModel, rr as VERSION, ir as createOpenAI, ar as openai };
