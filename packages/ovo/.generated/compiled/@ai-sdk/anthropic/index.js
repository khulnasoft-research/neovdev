import {
  APICallError as e,
  InvalidArgumentError as t,
  NoSuchModelError as n,
  UnsupportedFunctionalityError as r,
} from "../provider/index.js";
import {
  B as i,
  Ct as a,
  E as o,
  F as s,
  H as c,
  J as l,
  M as u,
  N as d,
  O as f,
  P as p,
  Q as m,
  R as h,
  S as g,
  St as _,
  U as v,
  V as y,
  Z as b,
  _ as x,
  _t as S,
  a as C,
  bt as w,
  d as T,
  et as E,
  f as D,
  ft as O,
  g as k,
  gt as A,
  ht as j,
  it as ee,
  j as M,
  m as N,
  nt as P,
  o as F,
  p as I,
  pt as L,
  q as R,
  r as z,
  rt as B,
  s as V,
  st as H,
  tt as U,
  ut as W,
  vt as G,
  w as K,
  wt as q,
  x as J,
  xt as Y,
  z as X,
} from "../../_chunks/workflow/dist-C_VDTghO.js";
var Z = D({
    errorSchema: M(() => P(G({ type: j(`error`), error: G({ type: Y(), message: Y() }) }))),
    errorToMessage: (e) => e.error.message,
  }),
  te = M(() =>
    P(
      G({
        id: Y(),
        type: j(`file`),
        filename: Y(),
        mime_type: Y(),
        size_bytes: S(),
        created_at: Y(),
        downloadable: O().nullish(),
      }),
    ),
  ),
  ne = class {
    constructor(e) {
      ((this.config = e), (this.specificationVersion = `v4`));
    }
    get provider() {
      return this.config.provider;
    }
    async uploadFile({ data: e, mediaType: t, filename: n }) {
      let r = F(e),
        i = new Blob([r], { type: t }),
        a = new FormData();
      n == null ? a.append(`file`, i) : a.append(`file`, i, n);
      let { value: o } = await X({
        url: `${this.config.baseURL}/files`,
        headers: z(this.config.headers(), { "anthropic-beta": `files-api-2025-04-14` }),
        formData: a,
        failedResponseHandler: Z,
        successfulResponseHandler: I(te),
        fetch: this.config.fetch,
      });
      return {
        warnings: [],
        providerReference: { anthropic: o.id },
        mediaType: o.mime_type ?? t,
        filename: o.filename ?? n,
        providerMetadata: {
          anthropic: {
            filename: o.filename,
            mimeType: o.mime_type,
            sizeBytes: o.size_bytes,
            createdAt: o.created_at,
            ...(o.downloadable == null ? {} : { downloadable: o.downloadable }),
          },
        },
      };
    }
  },
  Q = G({
    type: Y(),
    category: Y().nullish(),
    explanation: Y().nullish(),
    recommended_model: Y().nullish(),
  }),
  re = M(() =>
    P(
      G({
        type: j(`message`),
        id: Y().nullish(),
        model: Y().nullish(),
        content: W(
          L(`type`, [
            G({
              type: j(`text`),
              text: Y(),
              citations: W(
                L(`type`, [
                  G({
                    type: j(`web_search_result_location`),
                    cited_text: Y(),
                    url: Y(),
                    title: Y(),
                    encrypted_index: Y(),
                  }),
                  G({
                    type: j(`page_location`),
                    cited_text: Y(),
                    document_index: S(),
                    document_title: Y().nullable(),
                    start_page_number: S(),
                    end_page_number: S(),
                  }),
                  G({
                    type: j(`char_location`),
                    cited_text: Y(),
                    document_index: S(),
                    document_title: Y().nullable(),
                    start_char_index: S(),
                    end_char_index: S(),
                  }),
                ]),
              ).optional(),
            }),
            G({ type: j(`thinking`), thinking: Y(), signature: Y() }),
            G({ type: j(`redacted_thinking`), data: Y() }),
            G({ type: j(`compaction`), content: Y() }),
            G({
              type: j(`tool_use`),
              id: Y(),
              name: Y(),
              input: q(),
              caller: a([
                G({ type: j(`code_execution_20250825`), tool_id: Y() }),
                G({ type: j(`code_execution_20260120`), tool_id: Y() }),
                G({ type: j(`direct`) }),
              ]).optional(),
            }),
            G({
              type: j(`server_tool_use`),
              id: Y(),
              name: Y(),
              input: w(Y(), q()).nullish(),
              caller: a([
                G({ type: j(`code_execution_20260120`), tool_id: Y() }),
                G({ type: j(`direct`) }),
              ]).optional(),
            }),
            G({ type: j(`mcp_tool_use`), id: Y(), name: Y(), input: q(), server_name: Y() }),
            G({
              type: j(`mcp_tool_result`),
              tool_use_id: Y(),
              is_error: O(),
              content: W(a([Y(), G({ type: j(`text`), text: Y() })])),
            }),
            G({
              type: j(`web_fetch_tool_result`),
              tool_use_id: Y(),
              content: a([
                G({
                  type: j(`web_fetch_result`),
                  url: Y(),
                  retrieved_at: Y(),
                  content: G({
                    type: j(`document`),
                    title: Y().nullable(),
                    citations: G({ enabled: O() }).optional(),
                    source: a([
                      G({ type: j(`base64`), media_type: j(`application/pdf`), data: Y() }),
                      G({ type: j(`text`), media_type: j(`text/plain`), data: Y() }),
                    ]),
                  }),
                }),
                G({ type: j(`web_fetch_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`web_search_tool_result`),
              tool_use_id: Y(),
              content: a([
                W(
                  G({
                    type: j(`web_search_result`),
                    url: Y(),
                    title: Y(),
                    encrypted_content: Y(),
                    page_age: Y().nullish(),
                  }),
                ),
                G({ type: j(`web_search_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`code_execution_tool_result`),
              tool_use_id: Y(),
              content: a([
                G({
                  type: j(`code_execution_result`),
                  stdout: Y(),
                  stderr: Y(),
                  return_code: S(),
                  content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
                    .optional()
                    .default([]),
                }),
                G({
                  type: j(`encrypted_code_execution_result`),
                  encrypted_stdout: Y(),
                  stderr: Y(),
                  return_code: S(),
                  content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
                    .optional()
                    .default([]),
                }),
                G({ type: j(`code_execution_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`bash_code_execution_tool_result`),
              tool_use_id: Y(),
              content: L(`type`, [
                G({
                  type: j(`bash_code_execution_result`),
                  content: W(G({ type: j(`bash_code_execution_output`), file_id: Y() })),
                  stdout: Y(),
                  stderr: Y(),
                  return_code: S(),
                }),
                G({ type: j(`bash_code_execution_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`text_editor_code_execution_tool_result`),
              tool_use_id: Y(),
              content: L(`type`, [
                G({ type: j(`text_editor_code_execution_tool_result_error`), error_code: Y() }),
                G({
                  type: j(`text_editor_code_execution_view_result`),
                  content: Y(),
                  file_type: Y(),
                  num_lines: S().nullable(),
                  start_line: S().nullable(),
                  total_lines: S().nullable(),
                }),
                G({ type: j(`text_editor_code_execution_create_result`), is_file_update: O() }),
                G({
                  type: j(`text_editor_code_execution_str_replace_result`),
                  lines: W(Y()).nullable(),
                  new_lines: S().nullable(),
                  new_start: S().nullable(),
                  old_lines: S().nullable(),
                  old_start: S().nullable(),
                }),
              ]),
            }),
            G({
              type: j(`tool_search_tool_result`),
              tool_use_id: Y(),
              content: a([
                G({
                  type: j(`tool_search_tool_search_result`),
                  tool_references: W(G({ type: j(`tool_reference`), tool_name: Y() })),
                }),
                G({ type: j(`tool_search_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`advisor_tool_result`),
              tool_use_id: Y(),
              content: L(`type`, [
                G({ type: j(`advisor_result`), text: Y() }),
                G({ type: j(`advisor_redacted_result`), encrypted_content: Y() }),
                G({ type: j(`advisor_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({ type: j(`fallback`) }),
          ]),
        ),
        stop_reason: Y().nullish(),
        stop_sequence: Y().nullish(),
        stop_details: Q.nullish(),
        usage: A({
          input_tokens: S(),
          output_tokens: S(),
          cache_creation_input_tokens: S().nullish(),
          cache_read_input_tokens: S().nullish(),
          iterations: W(
            G({
              type: a([j(`compaction`), j(`message`), j(`advisor_message`), j(`fallback_message`)]),
              model: Y().nullish(),
              input_tokens: S(),
              output_tokens: S(),
              cache_creation_input_tokens: S().nullish(),
              cache_read_input_tokens: S().nullish(),
            }),
          ).nullish(),
        }),
        container: G({
          expires_at: Y(),
          id: Y(),
          skills: W(
            G({ type: a([j(`anthropic`), j(`custom`)]), skill_id: Y(), version: Y() }),
          ).nullish(),
        }).nullish(),
        context_management: G({
          applied_edits: W(
            a([
              G({
                type: j(`clear_tool_uses_20250919`),
                cleared_tool_uses: S(),
                cleared_input_tokens: S(),
              }),
              G({
                type: j(`clear_thinking_20251015`),
                cleared_thinking_turns: S(),
                cleared_input_tokens: S(),
              }),
              G({ type: j(`compact_20260112`) }),
            ]),
          ),
        }).nullish(),
      }),
    ),
  ),
  ie = M(() =>
    P(
      L(`type`, [
        G({
          type: j(`message_start`),
          message: G({
            id: Y().nullish(),
            model: Y().nullish(),
            role: Y().nullish(),
            usage: A({
              input_tokens: S(),
              cache_creation_input_tokens: S().nullish(),
              cache_read_input_tokens: S().nullish(),
            }),
            content: W(
              L(`type`, [
                G({
                  type: j(`tool_use`),
                  id: Y(),
                  name: Y(),
                  input: q(),
                  caller: a([
                    G({ type: j(`code_execution_20250825`), tool_id: Y() }),
                    G({ type: j(`code_execution_20260120`), tool_id: Y() }),
                    G({ type: j(`direct`) }),
                  ]).optional(),
                }),
              ]),
            ).nullish(),
            stop_reason: Y().nullish(),
            container: G({ expires_at: Y(), id: Y() }).nullish(),
          }),
        }),
        G({
          type: j(`content_block_start`),
          index: S(),
          content_block: L(`type`, [
            G({ type: j(`text`), text: Y() }),
            G({ type: j(`thinking`), thinking: Y() }),
            G({
              type: j(`tool_use`),
              id: Y(),
              name: Y(),
              input: w(Y(), q()).optional(),
              caller: a([
                G({ type: j(`code_execution_20250825`), tool_id: Y() }),
                G({ type: j(`code_execution_20260120`), tool_id: Y() }),
                G({ type: j(`direct`) }),
              ]).optional(),
            }),
            G({ type: j(`redacted_thinking`), data: Y() }),
            G({ type: j(`compaction`), content: Y().nullish() }),
            G({
              type: j(`server_tool_use`),
              id: Y(),
              name: Y(),
              input: w(Y(), q()).nullish(),
              caller: a([
                G({ type: j(`code_execution_20260120`), tool_id: Y() }),
                G({ type: j(`direct`) }),
              ]).optional(),
            }),
            G({ type: j(`mcp_tool_use`), id: Y(), name: Y(), input: q(), server_name: Y() }),
            G({
              type: j(`mcp_tool_result`),
              tool_use_id: Y(),
              is_error: O(),
              content: W(a([Y(), G({ type: j(`text`), text: Y() })])),
            }),
            G({
              type: j(`web_fetch_tool_result`),
              tool_use_id: Y(),
              content: a([
                G({
                  type: j(`web_fetch_result`),
                  url: Y(),
                  retrieved_at: Y(),
                  content: G({
                    type: j(`document`),
                    title: Y().nullable(),
                    citations: G({ enabled: O() }).optional(),
                    source: a([
                      G({ type: j(`base64`), media_type: j(`application/pdf`), data: Y() }),
                      G({ type: j(`text`), media_type: j(`text/plain`), data: Y() }),
                    ]),
                  }),
                }),
                G({ type: j(`web_fetch_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`web_search_tool_result`),
              tool_use_id: Y(),
              content: a([
                W(
                  G({
                    type: j(`web_search_result`),
                    url: Y(),
                    title: Y(),
                    encrypted_content: Y(),
                    page_age: Y().nullish(),
                  }),
                ),
                G({ type: j(`web_search_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`code_execution_tool_result`),
              tool_use_id: Y(),
              content: a([
                G({
                  type: j(`code_execution_result`),
                  stdout: Y(),
                  stderr: Y(),
                  return_code: S(),
                  content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
                    .optional()
                    .default([]),
                }),
                G({
                  type: j(`encrypted_code_execution_result`),
                  encrypted_stdout: Y(),
                  stderr: Y(),
                  return_code: S(),
                  content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
                    .optional()
                    .default([]),
                }),
                G({ type: j(`code_execution_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`bash_code_execution_tool_result`),
              tool_use_id: Y(),
              content: L(`type`, [
                G({
                  type: j(`bash_code_execution_result`),
                  content: W(G({ type: j(`bash_code_execution_output`), file_id: Y() })),
                  stdout: Y(),
                  stderr: Y(),
                  return_code: S(),
                }),
                G({ type: j(`bash_code_execution_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`text_editor_code_execution_tool_result`),
              tool_use_id: Y(),
              content: L(`type`, [
                G({ type: j(`text_editor_code_execution_tool_result_error`), error_code: Y() }),
                G({
                  type: j(`text_editor_code_execution_view_result`),
                  content: Y(),
                  file_type: Y(),
                  num_lines: S().nullable(),
                  start_line: S().nullable(),
                  total_lines: S().nullable(),
                }),
                G({ type: j(`text_editor_code_execution_create_result`), is_file_update: O() }),
                G({
                  type: j(`text_editor_code_execution_str_replace_result`),
                  lines: W(Y()).nullable(),
                  new_lines: S().nullable(),
                  new_start: S().nullable(),
                  old_lines: S().nullable(),
                  old_start: S().nullable(),
                }),
              ]),
            }),
            G({
              type: j(`tool_search_tool_result`),
              tool_use_id: Y(),
              content: a([
                G({
                  type: j(`tool_search_tool_search_result`),
                  tool_references: W(G({ type: j(`tool_reference`), tool_name: Y() })),
                }),
                G({ type: j(`tool_search_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({
              type: j(`advisor_tool_result`),
              tool_use_id: Y(),
              content: L(`type`, [
                G({ type: j(`advisor_result`), text: Y() }),
                G({ type: j(`advisor_redacted_result`), encrypted_content: Y() }),
                G({ type: j(`advisor_tool_result_error`), error_code: Y() }),
              ]),
            }),
            G({ type: j(`fallback`) }),
          ]),
        }),
        G({
          type: j(`content_block_delta`),
          index: S(),
          delta: L(`type`, [
            G({ type: j(`input_json_delta`), partial_json: Y() }),
            G({ type: j(`text_delta`), text: Y() }),
            G({ type: j(`thinking_delta`), thinking: Y() }),
            G({ type: j(`signature_delta`), signature: Y() }),
            G({ type: j(`compaction_delta`), content: Y().nullish() }),
            G({
              type: j(`citations_delta`),
              citation: L(`type`, [
                G({
                  type: j(`web_search_result_location`),
                  cited_text: Y(),
                  url: Y(),
                  title: Y(),
                  encrypted_index: Y(),
                }),
                G({
                  type: j(`page_location`),
                  cited_text: Y(),
                  document_index: S(),
                  document_title: Y().nullable(),
                  start_page_number: S(),
                  end_page_number: S(),
                }),
                G({
                  type: j(`char_location`),
                  cited_text: Y(),
                  document_index: S(),
                  document_title: Y().nullable(),
                  start_char_index: S(),
                  end_char_index: S(),
                }),
              ]),
            }),
          ]),
        }),
        G({ type: j(`content_block_stop`), index: S() }),
        G({ type: j(`error`), error: G({ type: Y(), message: Y() }) }),
        G({
          type: j(`message_delta`),
          delta: G({
            stop_reason: Y().nullish(),
            stop_sequence: Y().nullish(),
            stop_details: Q.nullish(),
            container: G({
              expires_at: Y(),
              id: Y(),
              skills: W(
                G({ type: a([j(`anthropic`), j(`custom`)]), skill_id: Y(), version: Y() }),
              ).nullish(),
            }).nullish(),
          }),
          usage: A({
            input_tokens: S().nullish(),
            output_tokens: S(),
            cache_creation_input_tokens: S().nullish(),
            cache_read_input_tokens: S().nullish(),
            iterations: W(
              G({
                type: a([
                  j(`compaction`),
                  j(`message`),
                  j(`advisor_message`),
                  j(`fallback_message`),
                ]),
                model: Y().nullish(),
                input_tokens: S(),
                output_tokens: S(),
                cache_creation_input_tokens: S().nullish(),
                cache_read_input_tokens: S().nullish(),
              }),
            ).nullish(),
          }),
          context_management: G({
            applied_edits: W(
              a([
                G({
                  type: j(`clear_tool_uses_20250919`),
                  cleared_tool_uses: S(),
                  cleared_input_tokens: S(),
                }),
                G({
                  type: j(`clear_thinking_20251015`),
                  cleared_thinking_turns: S(),
                  cleared_input_tokens: S(),
                }),
                G({ type: j(`compact_20260112`) }),
              ]),
            ),
          }).nullish(),
        }),
        G({ type: j(`message_stop`) }),
        G({ type: j(`ping`) }),
      ]),
    ),
  ),
  ae = M(() => P(G({ signature: Y().optional(), redactedData: Y().optional() }))),
  oe = G({
    containerUpload: O().optional(),
    citations: G({ enabled: O() }).optional(),
    title: Y().optional(),
    context: Y().optional(),
  }),
  se = G({
    sendReasoning: O().optional(),
    structuredOutputMode: H([`outputFormat`, `jsonTool`, `auto`]).optional(),
    thinking: L(`type`, [
      G({ type: j(`adaptive`), display: H([`omitted`, `summarized`]).optional() }),
      G({ type: j(`enabled`), budgetTokens: S().optional() }),
      G({ type: j(`disabled`) }),
    ]).optional(),
    disableParallelToolUse: O().optional(),
    cacheControl: G({ type: j(`ephemeral`), ttl: a([j(`5m`), j(`1h`)]).optional() }).optional(),
    metadata: G({ userId: Y().optional() }).optional(),
    mcpServers: W(
      G({
        type: j(`url`),
        name: Y(),
        url: Y(),
        authorizationToken: Y().nullish(),
        toolConfiguration: G({ enabled: O().nullish(), allowedTools: W(Y()).nullish() }).nullish(),
      }),
    ).optional(),
    container: G({
      id: Y().optional(),
      skills: W(
        L(`type`, [
          G({ type: j(`anthropic`), skillId: Y(), version: Y().optional() }),
          G({ type: j(`custom`), providerReference: w(Y(), Y()), version: Y().optional() }),
        ]),
      ).optional(),
    }).optional(),
    toolStreaming: O().optional(),
    effort: H([`low`, `medium`, `high`, `xhigh`, `max`]).optional(),
    taskBudget: G({
      type: j(`tokens`),
      total: S().int().min(2e4),
      remaining: S().int().min(0).optional(),
    }).optional(),
    speed: H([`fast`, `standard`]).optional(),
    inferenceGeo: H([`us`, `global`]).optional(),
    fallbacks: W(
      G({
        model: Y(),
        max_tokens: S().int().optional(),
        thinking: w(Y(), q()).optional(),
        output_config: w(Y(), q()).optional(),
        speed: H([`fast`, `standard`]).optional(),
      }),
    ).optional(),
    anthropicBeta: W(Y()).optional(),
    contextManagement: G({
      edits: W(
        L(`type`, [
          G({
            type: j(`clear_tool_uses_20250919`),
            trigger: L(`type`, [
              G({ type: j(`input_tokens`), value: S() }),
              G({ type: j(`tool_uses`), value: S() }),
            ]).optional(),
            keep: G({ type: j(`tool_uses`), value: S() }).optional(),
            clearAtLeast: G({ type: j(`input_tokens`), value: S() }).optional(),
            clearToolInputs: O().optional(),
            excludeTools: W(Y()).optional(),
          }),
          G({
            type: j(`clear_thinking_20251015`),
            keep: a([j(`all`), G({ type: j(`thinking_turns`), value: S() })]).optional(),
          }),
          G({
            type: j(`compact_20260112`),
            trigger: G({ type: j(`input_tokens`), value: S() }).optional(),
            pauseAfterCompaction: O().optional(),
            instructions: Y().optional(),
          }),
        ]),
      ),
    }).optional(),
  }),
  ce = 4;
function le(e) {
  let t = e?.anthropic;
  return t?.cacheControl ?? t?.cache_control;
}
var ue = class {
    constructor() {
      ((this.breakpointCount = 0), (this.warnings = []));
    }
    getCacheControl(e, t) {
      let n = le(e);
      if (n) {
        if (!t.canCache) {
          this.warnings.push({
            type: `unsupported`,
            feature: `cache_control on non-cacheable context`,
            details: `cache_control cannot be set on ${t.type}. It will be ignored.`,
          });
          return;
        }
        if ((this.breakpointCount++, this.breakpointCount > ce)) {
          this.warnings.push({
            type: `unsupported`,
            feature: `cacheControl breakpoint limit`,
            details: `Maximum ${ce} cache breakpoints exceeded (found ${this.breakpointCount}). This breakpoint will be ignored.`,
          });
          return;
        }
        return n;
      }
    }
    getWarnings() {
      return this.warnings;
    }
  },
  de = M(() =>
    P(
      G({
        model: Y(),
        maxUses: S().optional(),
        caching: G({ type: j(`ephemeral`), ttl: a([j(`5m`), j(`1h`)]) }).optional(),
      }),
    ),
  ),
  fe = M(() =>
    P(
      L(`type`, [
        G({ type: j(`advisor_result`), text: Y() }),
        G({ type: j(`advisor_redacted_result`), encryptedContent: Y() }),
        G({ type: j(`advisor_tool_result_error`), errorCode: Y() }),
      ]),
    ),
  ),
  pe = k({
    id: `anthropic.advisor_20260301`,
    inputSchema: M(() => P(G({}).strict())),
    outputSchema: fe,
    supportsDeferredResults: !0,
  }),
  me = (e) => pe(e),
  he = M(() => P(G({ maxCharacters: S().optional() }))),
  ge = N({
    id: `anthropic.text_editor_20250728`,
    inputSchema: M(() =>
      P(
        G({
          command: H([`view`, `create`, `str_replace`, `insert`]),
          path: Y(),
          file_text: Y().optional(),
          insert_line: S().int().optional(),
          new_str: Y().optional(),
          insert_text: Y().optional(),
          old_str: Y().optional(),
          view_range: W(S().int()).optional(),
        }),
      ),
    ),
  }),
  _e = (e = {}) => ge(e),
  ve = M(() =>
    P(
      G({
        maxUses: S().optional(),
        allowedDomains: W(Y()).optional(),
        blockedDomains: W(Y()).optional(),
        userLocation: G({
          type: j(`approximate`),
          city: Y().optional(),
          region: Y().optional(),
          country: Y().optional(),
          timezone: Y().optional(),
        }).optional(),
      }),
    ),
  ),
  ye = M(() =>
    P(
      W(
        G({
          url: Y(),
          title: Y().nullable(),
          pageAge: Y().nullable(),
          encryptedContent: Y(),
          type: j(`web_search_result`),
        }),
      ),
    ),
  ),
  be = k({
    id: `anthropic.web_search_20260209`,
    inputSchema: M(() => P(G({ query: Y() }))),
    outputSchema: ye,
    supportsDeferredResults: !0,
  }),
  xe = (e = {}) => be(e),
  Se = M(() =>
    P(
      G({
        maxUses: S().optional(),
        allowedDomains: W(Y()).optional(),
        blockedDomains: W(Y()).optional(),
        userLocation: G({
          type: j(`approximate`),
          city: Y().optional(),
          region: Y().optional(),
          country: Y().optional(),
          timezone: Y().optional(),
        }).optional(),
      }),
    ),
  ),
  Ce = M(() =>
    P(
      W(
        G({
          url: Y(),
          title: Y().nullable(),
          pageAge: Y().nullable(),
          encryptedContent: Y(),
          type: j(`web_search_result`),
        }),
      ),
    ),
  ),
  we = k({
    id: `anthropic.web_search_20250305`,
    inputSchema: M(() => P(G({ query: Y() }))),
    outputSchema: Ce,
    supportsDeferredResults: !0,
  }),
  Te = (e = {}) => we(e),
  Ee = M(() =>
    P(
      G({
        maxUses: S().optional(),
        allowedDomains: W(Y()).optional(),
        blockedDomains: W(Y()).optional(),
        citations: G({ enabled: O() }).optional(),
        maxContentTokens: S().optional(),
      }),
    ),
  ),
  De = M(() =>
    P(
      G({
        type: j(`web_fetch_result`),
        url: Y(),
        content: G({
          type: j(`document`),
          title: Y().nullable(),
          citations: G({ enabled: O() }).optional(),
          source: a([
            G({ type: j(`base64`), mediaType: j(`application/pdf`), data: Y() }),
            G({ type: j(`text`), mediaType: j(`text/plain`), data: Y() }),
          ]),
        }),
        retrievedAt: Y().nullable(),
      }),
    ),
  ),
  Oe = k({
    id: `anthropic.web_fetch_20260209`,
    inputSchema: M(() => P(G({ url: Y() }))),
    outputSchema: De,
    supportsDeferredResults: !0,
  }),
  ke = (e = {}) => Oe(e),
  Ae = M(() =>
    P(
      G({
        maxUses: S().optional(),
        allowedDomains: W(Y()).optional(),
        blockedDomains: W(Y()).optional(),
        citations: G({ enabled: O() }).optional(),
        maxContentTokens: S().optional(),
      }),
    ),
  ),
  je = M(() =>
    P(
      G({
        type: j(`web_fetch_result`),
        url: Y(),
        content: G({
          type: j(`document`),
          title: Y().nullable(),
          citations: G({ enabled: O() }).optional(),
          source: a([
            G({ type: j(`base64`), mediaType: j(`application/pdf`), data: Y() }),
            G({ type: j(`text`), mediaType: j(`text/plain`), data: Y() }),
          ]),
        }),
        retrievedAt: Y().nullable(),
      }),
    ),
  ),
  Me = k({
    id: `anthropic.web_fetch_20250910`,
    inputSchema: M(() => P(G({ url: Y() }))),
    outputSchema: je,
    supportsDeferredResults: !0,
  }),
  Ne = (e = {}) => Me(e);
async function Pe({
  tools: e,
  toolChoice: t,
  disableParallelToolUse: n,
  cacheControlValidator: i,
  supportsStructuredOutput: a,
  supportsStrictTools: o,
  defaultEagerInputStreaming: s = !1,
}) {
  e = e?.length ? e : void 0;
  let c = [],
    l = new Set(),
    u = i || new ue();
  if (e == null) return { tools: void 0, toolChoice: void 0, toolWarnings: c, betas: l };
  let d = [];
  for (let t of e)
    switch (t.type) {
      case `function`: {
        let e = u.getCacheControl(t.providerOptions, { type: `tool definition`, canCache: !0 }),
          n = t.providerOptions?.anthropic,
          r = n?.eagerInputStreaming ?? s,
          i = n?.deferLoading,
          f = n?.allowedCallers;
        (!o &&
          t.strict != null &&
          c.push({
            type: `unsupported`,
            feature: `strict`,
            details: `Tool '${t.name}' has strict: ${t.strict}, but strict mode is not supported by this provider. The strict property will be ignored.`,
          }),
          d.push({
            name: t.name,
            description: t.description,
            input_schema: t.inputSchema,
            cache_control: e,
            ...(r ? { eager_input_streaming: !0 } : {}),
            ...(o === !0 && t.strict != null ? { strict: t.strict } : {}),
            ...(i == null ? {} : { defer_loading: i }),
            ...(f == null ? {} : { allowed_callers: f }),
            ...(t.inputExamples == null
              ? {}
              : { input_examples: t.inputExamples.map((e) => e.input) }),
          }),
          a === !0 && l.add(`structured-outputs-2025-11-13`),
          (t.inputExamples != null || f != null) && l.add(`advanced-tool-use-2025-11-20`));
        break;
      }
      case `provider`:
        switch (t.id) {
          case `anthropic.code_execution_20250522`:
            (l.add(`code-execution-2025-05-22`),
              d.push({
                type: `code_execution_20250522`,
                name: `code_execution`,
                cache_control: void 0,
              }));
            break;
          case `anthropic.code_execution_20250825`:
            (l.add(`code-execution-2025-08-25`),
              d.push({ type: `code_execution_20250825`, name: `code_execution` }));
            break;
          case `anthropic.code_execution_20260120`:
            d.push({ type: `code_execution_20260120`, name: `code_execution` });
            break;
          case `anthropic.computer_20250124`:
            (l.add(`computer-use-2025-01-24`),
              d.push({
                name: `computer`,
                type: `computer_20250124`,
                display_width_px: t.args.displayWidthPx,
                display_height_px: t.args.displayHeightPx,
                display_number: t.args.displayNumber,
                cache_control: void 0,
              }));
            break;
          case `anthropic.computer_20251124`:
            (l.add(`computer-use-2025-11-24`),
              d.push({
                name: `computer`,
                type: `computer_20251124`,
                display_width_px: t.args.displayWidthPx,
                display_height_px: t.args.displayHeightPx,
                display_number: t.args.displayNumber,
                enable_zoom: t.args.enableZoom,
                cache_control: void 0,
              }));
            break;
          case `anthropic.computer_20241022`:
            (l.add(`computer-use-2024-10-22`),
              d.push({
                name: `computer`,
                type: `computer_20241022`,
                display_width_px: t.args.displayWidthPx,
                display_height_px: t.args.displayHeightPx,
                display_number: t.args.displayNumber,
                cache_control: void 0,
              }));
            break;
          case `anthropic.text_editor_20250124`:
            (l.add(`computer-use-2025-01-24`),
              d.push({
                name: `str_replace_editor`,
                type: `text_editor_20250124`,
                cache_control: void 0,
              }));
            break;
          case `anthropic.text_editor_20241022`:
            (l.add(`computer-use-2024-10-22`),
              d.push({
                name: `str_replace_editor`,
                type: `text_editor_20241022`,
                cache_control: void 0,
              }));
            break;
          case `anthropic.text_editor_20250429`:
            (l.add(`computer-use-2025-01-24`),
              d.push({
                name: `str_replace_based_edit_tool`,
                type: `text_editor_20250429`,
                cache_control: void 0,
              }));
            break;
          case `anthropic.text_editor_20250728`: {
            let e = await m({ value: t.args, schema: he });
            d.push({
              name: `str_replace_based_edit_tool`,
              type: `text_editor_20250728`,
              max_characters: e.maxCharacters,
              cache_control: void 0,
            });
            break;
          }
          case `anthropic.bash_20250124`:
            (l.add(`computer-use-2025-01-24`),
              d.push({ name: `bash`, type: `bash_20250124`, cache_control: void 0 }));
            break;
          case `anthropic.bash_20241022`:
            (l.add(`computer-use-2024-10-22`),
              d.push({ name: `bash`, type: `bash_20241022`, cache_control: void 0 }));
            break;
          case `anthropic.memory_20250818`:
            (l.add(`context-management-2025-06-27`),
              d.push({ name: `memory`, type: `memory_20250818` }));
            break;
          case `anthropic.web_fetch_20250910`: {
            l.add(`web-fetch-2025-09-10`);
            let e = await m({ value: t.args, schema: Ae });
            d.push({
              type: `web_fetch_20250910`,
              name: `web_fetch`,
              max_uses: e.maxUses,
              allowed_domains: e.allowedDomains,
              blocked_domains: e.blockedDomains,
              citations: e.citations,
              max_content_tokens: e.maxContentTokens,
              cache_control: void 0,
            });
            break;
          }
          case `anthropic.web_fetch_20260209`: {
            l.add(`code-execution-web-tools-2026-02-09`);
            let e = await m({ value: t.args, schema: Ee });
            d.push({
              type: `web_fetch_20260209`,
              name: `web_fetch`,
              max_uses: e.maxUses,
              allowed_domains: e.allowedDomains,
              blocked_domains: e.blockedDomains,
              citations: e.citations,
              max_content_tokens: e.maxContentTokens,
              cache_control: void 0,
            });
            break;
          }
          case `anthropic.web_search_20250305`: {
            let e = await m({ value: t.args, schema: Se });
            d.push({
              type: `web_search_20250305`,
              name: `web_search`,
              max_uses: e.maxUses,
              allowed_domains: e.allowedDomains,
              blocked_domains: e.blockedDomains,
              user_location: e.userLocation,
              cache_control: void 0,
            });
            break;
          }
          case `anthropic.web_search_20260209`: {
            l.add(`code-execution-web-tools-2026-02-09`);
            let e = await m({ value: t.args, schema: ve });
            d.push({
              type: `web_search_20260209`,
              name: `web_search`,
              max_uses: e.maxUses,
              allowed_domains: e.allowedDomains,
              blocked_domains: e.blockedDomains,
              user_location: e.userLocation,
              cache_control: void 0,
            });
            break;
          }
          case `anthropic.tool_search_regex_20251119`:
            d.push({ type: `tool_search_tool_regex_20251119`, name: `tool_search_tool_regex` });
            break;
          case `anthropic.tool_search_bm25_20251119`:
            d.push({ type: `tool_search_tool_bm25_20251119`, name: `tool_search_tool_bm25` });
            break;
          case `anthropic.advisor_20260301`: {
            l.add(`advisor-tool-2026-03-01`);
            let e = await m({ value: t.args, schema: de });
            d.push({
              type: `advisor_20260301`,
              name: `advisor`,
              model: e.model,
              ...(e.maxUses !== void 0 && { max_uses: e.maxUses }),
              ...(e.caching !== void 0 && { caching: e.caching }),
            });
            break;
          }
          default:
            c.push({ type: `unsupported`, feature: `provider-defined tool ${t.id}` });
            break;
        }
        break;
      default:
        c.push({ type: `unsupported`, feature: `tool ${t}` });
        break;
    }
  if (t == null)
    return {
      tools: d,
      toolChoice: n ? { type: `auto`, disable_parallel_tool_use: n } : void 0,
      toolWarnings: c,
      betas: l,
    };
  let f = t.type;
  switch (f) {
    case `auto`:
      return {
        tools: d,
        toolChoice: { type: `auto`, disable_parallel_tool_use: n },
        toolWarnings: c,
        betas: l,
      };
    case `required`:
      return {
        tools: d,
        toolChoice: { type: `any`, disable_parallel_tool_use: n },
        toolWarnings: c,
        betas: l,
      };
    case `none`:
      return { tools: void 0, toolChoice: void 0, toolWarnings: c, betas: l };
    case `tool`:
      return {
        tools: d,
        toolChoice: { type: `tool`, name: t.toolName, disable_parallel_tool_use: n },
        toolWarnings: c,
        betas: l,
      };
    default:
      throw new r({ functionality: `tool choice type: ${f}` });
  }
}
function Fe({ usage: e, rawUsage: t }) {
  let n = e.cache_creation_input_tokens ?? 0,
    r = e.cache_read_input_tokens ?? 0,
    i,
    a,
    o = e.iterations?.some((e) => e.type === `fallback_message`);
  if (e.iterations && e.iterations.length > 0 && !o) {
    let t = e.iterations.filter((e) => e.type === `compaction` || e.type === `message`);
    if (t.length > 0) {
      let e = t.reduce(
        (e, t) => ({ input: e.input + t.input_tokens, output: e.output + t.output_tokens }),
        { input: 0, output: 0 },
      );
      ((i = e.input), (a = e.output));
    } else ((i = e.input_tokens), (a = e.output_tokens));
  } else ((i = e.input_tokens), (a = e.output_tokens));
  return {
    inputTokens: { total: i + n + r, noCache: i, cacheRead: r, cacheWrite: n },
    outputTokens: { total: a, text: void 0, reasoning: void 0 },
    raw: t ?? e,
  };
}
var Ie = M(() =>
    P(
      G({
        type: j(`code_execution_result`),
        stdout: Y(),
        stderr: Y(),
        return_code: S(),
        content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
          .optional()
          .default([]),
      }),
    ),
  ),
  Le = k({
    id: `anthropic.code_execution_20250522`,
    inputSchema: M(() => P(G({ code: Y() }))),
    outputSchema: Ie,
  }),
  Re = (e = {}) => Le(e),
  ze = M(() =>
    P(
      L(`type`, [
        G({
          type: j(`code_execution_result`),
          stdout: Y(),
          stderr: Y(),
          return_code: S(),
          content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
            .optional()
            .default([]),
        }),
        G({
          type: j(`bash_code_execution_result`),
          content: W(G({ type: j(`bash_code_execution_output`), file_id: Y() })),
          stdout: Y(),
          stderr: Y(),
          return_code: S(),
        }),
        G({ type: j(`bash_code_execution_tool_result_error`), error_code: Y() }),
        G({ type: j(`text_editor_code_execution_tool_result_error`), error_code: Y() }),
        G({
          type: j(`text_editor_code_execution_view_result`),
          content: Y(),
          file_type: Y(),
          num_lines: S().nullable(),
          start_line: S().nullable(),
          total_lines: S().nullable(),
        }),
        G({ type: j(`text_editor_code_execution_create_result`), is_file_update: O() }),
        G({
          type: j(`text_editor_code_execution_str_replace_result`),
          lines: W(Y()).nullable(),
          new_lines: S().nullable(),
          new_start: S().nullable(),
          old_lines: S().nullable(),
          old_start: S().nullable(),
        }),
      ]),
    ),
  ),
  Be = k({
    id: `anthropic.code_execution_20250825`,
    inputSchema: M(() =>
      P(
        L(`type`, [
          G({ type: j(`programmatic-tool-call`), code: Y() }),
          G({ type: j(`bash_code_execution`), command: Y() }),
          L(`command`, [
            G({ type: j(`text_editor_code_execution`), command: j(`view`), path: Y() }),
            G({
              type: j(`text_editor_code_execution`),
              command: j(`create`),
              path: Y(),
              file_text: Y().nullish(),
            }),
            G({
              type: j(`text_editor_code_execution`),
              command: j(`str_replace`),
              path: Y(),
              old_str: Y(),
              new_str: Y(),
            }),
          ]),
        ]),
      ),
    ),
    outputSchema: ze,
    supportsDeferredResults: !0,
  }),
  Ve = (e = {}) => Be(e),
  He = M(() =>
    P(
      L(`type`, [
        G({
          type: j(`code_execution_result`),
          stdout: Y(),
          stderr: Y(),
          return_code: S(),
          content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
            .optional()
            .default([]),
        }),
        G({
          type: j(`encrypted_code_execution_result`),
          encrypted_stdout: Y(),
          stderr: Y(),
          return_code: S(),
          content: W(G({ type: j(`code_execution_output`), file_id: Y() }))
            .optional()
            .default([]),
        }),
        G({
          type: j(`bash_code_execution_result`),
          content: W(G({ type: j(`bash_code_execution_output`), file_id: Y() })),
          stdout: Y(),
          stderr: Y(),
          return_code: S(),
        }),
        G({ type: j(`bash_code_execution_tool_result_error`), error_code: Y() }),
        G({ type: j(`text_editor_code_execution_tool_result_error`), error_code: Y() }),
        G({
          type: j(`text_editor_code_execution_view_result`),
          content: Y(),
          file_type: Y(),
          num_lines: S().nullable(),
          start_line: S().nullable(),
          total_lines: S().nullable(),
        }),
        G({ type: j(`text_editor_code_execution_create_result`), is_file_update: O() }),
        G({
          type: j(`text_editor_code_execution_str_replace_result`),
          lines: W(Y()).nullable(),
          new_lines: S().nullable(),
          new_start: S().nullable(),
          old_lines: S().nullable(),
          old_start: S().nullable(),
        }),
      ]),
    ),
  ),
  Ue = k({
    id: `anthropic.code_execution_20260120`,
    inputSchema: M(() =>
      P(
        L(`type`, [
          G({ type: j(`programmatic-tool-call`), code: Y() }),
          G({ type: j(`bash_code_execution`), command: Y() }),
          L(`command`, [
            G({ type: j(`text_editor_code_execution`), command: j(`view`), path: Y() }),
            G({
              type: j(`text_editor_code_execution`),
              command: j(`create`),
              path: Y(),
              file_text: Y().nullish(),
            }),
            G({
              type: j(`text_editor_code_execution`),
              command: j(`str_replace`),
              path: Y(),
              old_str: Y(),
              new_str: Y(),
            }),
          ]),
        ]),
      ),
    ),
    outputSchema: He,
    supportsDeferredResults: !0,
  }),
  We = (e = {}) => Ue(e),
  Ge = M(() => P(W(G({ type: j(`tool_reference`), toolName: Y() })))),
  Ke = k({
    id: `anthropic.tool_search_regex_20251119`,
    inputSchema: M(() => P(G({ pattern: Y(), limit: S().optional() }))),
    outputSchema: Ge,
    supportsDeferredResults: !0,
  }),
  qe = (e = {}) => Ke(e);
function Je(e) {
  return typeof e == `string` ? new TextDecoder().decode(C(e)) : new TextDecoder().decode(e);
}
function Ye(e) {
  try {
    if (typeof e == `string`) return R(e);
    if (typeof e == `object` && e) return e;
  } catch {
    let t = e?.errorCode;
    return { errorCode: typeof t == `string` ? t : `unavailable` };
  }
  return {};
}
async function Xe({
  prompt: e,
  sendReasoning: t,
  warnings: n,
  cacheControlValidator: i,
  toolNameMapping: a,
}) {
  let o = new Set(),
    s = Ze(e),
    l = i || new ue(),
    u,
    d = [];
  async function p(e) {
    return (
      (await h({ provider: `anthropic`, providerOptions: e, schema: oe }))?.citations?.enabled ?? !1
    );
  }
  async function g(e) {
    return (
      (await h({ provider: `anthropic`, providerOptions: e, schema: oe }))?.containerUpload ?? !1
    );
  }
  async function _(e) {
    let t = await h({ provider: `anthropic`, providerOptions: e, schema: oe });
    return { title: t?.title, context: t?.context };
  }
  for (let e = 0; e < s.length; e++) {
    let i = s[e],
      y = e === s.length - 1,
      b = i.type;
    switch (b) {
      case `system`: {
        let e = i.messages.map(({ content: e, providerOptions: t }) => ({
          type: `text`,
          text: e,
          cache_control: l.getCacheControl(t, { type: `system message`, canCache: !0 }),
        }));
        u == null
          ? (u = e)
          : (d.push({ role: `system`, content: e }), o.add(`mid-conversation-system-2026-04-07`));
        break;
      }
      case `user`: {
        let e = [];
        for (let t of i.messages) {
          let { role: i, content: a } = t;
          switch (i) {
            case `user`:
              for (let n = 0; n < a.length; n++) {
                let i = a[n],
                  s = n === a.length - 1,
                  u =
                    l.getCacheControl(i.providerOptions, {
                      type: `user message part`,
                      canCache: !0,
                    }) ??
                    (s
                      ? l.getCacheControl(t.providerOptions, { type: `user message`, canCache: !0 })
                      : void 0);
                switch (i.type) {
                  case `text`:
                    e.push({ type: `text`, text: i.text, cache_control: u });
                    break;
                  case `file`:
                    switch (i.data.type) {
                      case `reference`: {
                        let t = v({ reference: i.data.reference, provider: `anthropic` });
                        (o.add(`files-api-2025-04-14`),
                          (await g(i.providerOptions))
                            ? e.push({ type: `container_upload`, file_id: t })
                            : K(i.mediaType) === `image`
                              ? e.push({
                                  type: `image`,
                                  source: { type: `file`, file_id: t },
                                  cache_control: u,
                                })
                              : e.push({
                                  type: `document`,
                                  source: { type: `file`, file_id: t },
                                  cache_control: u,
                                }));
                        break;
                      }
                      case `text`: {
                        let t = await p(i.providerOptions),
                          n = await _(i.providerOptions);
                        e.push({
                          type: `document`,
                          source: { type: `text`, media_type: `text/plain`, data: i.data.text },
                          title: n.title ?? i.filename,
                          ...(n.context && { context: n.context }),
                          ...(t && { citations: { enabled: !0 } }),
                          cache_control: u,
                        });
                        break;
                      }
                      case `url`:
                      case `data`: {
                        let t = K(i.mediaType);
                        if (t === `image`)
                          e.push({
                            type: `image`,
                            source:
                              i.data.type === `url`
                                ? { type: `url`, url: i.data.url.toString() }
                                : {
                                    type: `base64`,
                                    media_type: c({ part: i }),
                                    data: V(i.data.data),
                                  },
                            cache_control: u,
                          });
                        else if (
                          t === `application` &&
                          (i.data.type === `url`
                            ? i.mediaType === `application/pdf`
                            : c({ part: i }) === `application/pdf`)
                        ) {
                          o.add(`pdfs-2024-09-25`);
                          let t = await p(i.providerOptions),
                            n = await _(i.providerOptions);
                          e.push({
                            type: `document`,
                            source:
                              i.data.type === `url`
                                ? { type: `url`, url: i.data.url.toString() }
                                : {
                                    type: `base64`,
                                    media_type: `application/pdf`,
                                    data: V(i.data.data),
                                  },
                            title: n.title ?? i.filename,
                            ...(n.context && { context: n.context }),
                            ...(t && { citations: { enabled: !0 } }),
                            cache_control: u,
                          });
                        } else if (i.mediaType === `text/plain`) {
                          let t = await p(i.providerOptions),
                            n = await _(i.providerOptions);
                          e.push({
                            type: `document`,
                            source:
                              i.data.type === `url`
                                ? { type: `url`, url: i.data.url.toString() }
                                : { type: `text`, media_type: `text/plain`, data: Je(i.data.data) },
                            title: n.title ?? i.filename,
                            ...(n.context && { context: n.context }),
                            ...(t && { citations: { enabled: !0 } }),
                            cache_control: u,
                          });
                        } else throw new r({ functionality: `media type: ${i.mediaType}` });
                        break;
                      }
                    }
                    break;
                }
              }
              break;
            case `tool`:
              for (let r = 0; r < a.length; r++) {
                let i = a[r];
                if (i.type === `tool-approval-response`) continue;
                let s = i.output,
                  u =
                    `providerOptions` in s
                      ? s.providerOptions
                      : s.type === `content`
                        ? s.value.find((e) => e.providerOptions != null)?.providerOptions
                        : void 0,
                  d = r === a.length - 1,
                  p =
                    l.getCacheControl(i.providerOptions, {
                      type: `tool result part`,
                      canCache: !0,
                    }) ??
                    l.getCacheControl(u, { type: `tool result output`, canCache: !0 }) ??
                    (d
                      ? l.getCacheControl(t.providerOptions, {
                          type: `tool result message`,
                          canCache: !0,
                        })
                      : void 0),
                  m;
                switch (s.type) {
                  case `content`:
                    m = s.value
                      .map((e) => {
                        switch (e.type) {
                          case `text`:
                            return { type: `text`, text: e.text };
                          case `file`: {
                            let t = K(e.mediaType);
                            if (e.data.type === `url`)
                              return t === `image`
                                ? {
                                    type: `image`,
                                    source: { type: `url`, url: e.data.url.toString() },
                                  }
                                : {
                                    type: `document`,
                                    source: { type: `url`, url: e.data.url.toString() },
                                  };
                            if (e.data.type === `data`) {
                              if (t === `image`)
                                return {
                                  type: `image`,
                                  source: {
                                    type: `base64`,
                                    media_type: c({ part: e }),
                                    data: V(e.data.data),
                                  },
                                };
                              if (c({ part: e }) === `application/pdf`)
                                return (
                                  o.add(`pdfs-2024-09-25`),
                                  {
                                    type: `document`,
                                    source: {
                                      type: `base64`,
                                      media_type: `application/pdf`,
                                      data: V(e.data.data),
                                    },
                                  }
                                );
                              n.push({
                                type: `other`,
                                message: `unsupported tool content part type: ${e.type} with media type: ${e.mediaType}`,
                              });
                              return;
                            }
                            n.push({
                              type: `other`,
                              message: `unsupported tool content part type: ${e.type} with data type: ${e.data.type}`,
                            });
                            return;
                          }
                          case `custom`: {
                            let t = e.providerOptions?.anthropic;
                            if (t?.type === `tool-reference`)
                              return { type: `tool_reference`, tool_name: t.toolName };
                            n.push({
                              type: `other`,
                              message: `unsupported custom tool content part`,
                            });
                            return;
                          }
                          default:
                            n.push({
                              type: `other`,
                              message: `unsupported tool content part type: ${e.type}`,
                            });
                            return;
                        }
                      })
                      .filter(f);
                    break;
                  case `text`:
                  case `error-text`:
                    m = s.value;
                    break;
                  case `execution-denied`:
                    m = s.reason ?? `Tool call execution denied.`;
                    break;
                  default:
                    m = JSON.stringify(s.value);
                    break;
                }
                e.push({
                  type: `tool_result`,
                  tool_use_id: i.toolCallId,
                  content: m,
                  is_error: s.type === `error-text` || s.type === `error-json` ? !0 : void 0,
                  cache_control: p,
                });
              }
              break;
            default:
              throw Error(`Unsupported role: ${i}`);
          }
        }
        d.push({ role: `user`, content: e });
        break;
      }
      case `assistant`: {
        let e = [],
          r = new Set();
        for (let o = 0; o < i.messages.length; o++) {
          let s = i.messages[o],
            c = o === i.messages.length - 1,
            { content: u } = s;
          for (let i = 0; i < u.length; i++) {
            let o = u[i],
              d = i === u.length - 1,
              f =
                l.getCacheControl(o.providerOptions, {
                  type: `assistant message part`,
                  canCache: !0,
                }) ??
                (d
                  ? l.getCacheControl(s.providerOptions, {
                      type: `assistant message`,
                      canCache: !0,
                    })
                  : void 0);
            switch (o.type) {
              case `text`: {
                let t = o.providerOptions?.anthropic;
                t?.type === `compaction`
                  ? e.push({ type: `compaction`, content: o.text, cache_control: f })
                  : e.push({
                      type: `text`,
                      text: y && c && d ? o.text.trim() : o.text,
                      ...(t?.citations != null && { citations: t.citations }),
                      cache_control: f,
                    });
                break;
              }
              case `reasoning`:
                if (t) {
                  let t = await h({
                    provider: `anthropic`,
                    providerOptions: o.providerOptions,
                    schema: ae,
                  });
                  t == null
                    ? n.push({ type: `other`, message: `unsupported reasoning metadata` })
                    : t.signature == null
                      ? t.redactedData == null
                        ? n.push({ type: `other`, message: `unsupported reasoning metadata` })
                        : (l.getCacheControl(o.providerOptions, {
                            type: `redacted thinking block`,
                            canCache: !1,
                          }),
                          e.push({ type: `redacted_thinking`, data: t.redactedData }))
                      : (l.getCacheControl(o.providerOptions, {
                          type: `thinking block`,
                          canCache: !1,
                        }),
                        e.push({ type: `thinking`, thinking: o.text, signature: t.signature }));
                } else
                  n.push({
                    type: `other`,
                    message: `sending reasoning content is disabled for this model`,
                  });
                break;
              case `tool-call`: {
                if (o.providerExecuted) {
                  let t = a.toProviderToolName(o.toolName);
                  if (o.providerOptions?.anthropic?.type === `mcp-tool-use`) {
                    r.add(o.toolCallId);
                    let t = o.providerOptions?.anthropic?.serverName;
                    if (t == null || typeof t != `string`) {
                      n.push({
                        type: `other`,
                        message: `mcp tool use server name is required and must be a string`,
                      });
                      break;
                    }
                    e.push({
                      type: `mcp_tool_use`,
                      id: o.toolCallId,
                      name: o.toolName,
                      input: o.input,
                      server_name: t,
                      cache_control: f,
                    });
                  } else if (
                    t === `code_execution` &&
                    o.input != null &&
                    typeof o.input == `object` &&
                    `type` in o.input &&
                    typeof o.input.type == `string` &&
                    (o.input.type === `bash_code_execution` ||
                      o.input.type === `text_editor_code_execution`)
                  )
                    e.push({
                      type: `server_tool_use`,
                      id: o.toolCallId,
                      name: o.input.type,
                      input: o.input,
                      cache_control: f,
                    });
                  else if (
                    t === `code_execution` &&
                    o.input != null &&
                    typeof o.input == `object` &&
                    `type` in o.input &&
                    o.input.type === `programmatic-tool-call`
                  ) {
                    let { type: t, ...n } = o.input;
                    e.push({
                      type: `server_tool_use`,
                      id: o.toolCallId,
                      name: `code_execution`,
                      input: n,
                      cache_control: f,
                    });
                  } else
                    t === `code_execution` ||
                    t === `web_fetch` ||
                    t === `web_search` ||
                    t === `tool_search_tool_regex` ||
                    t === `tool_search_tool_bm25`
                      ? e.push({
                          type: `server_tool_use`,
                          id: o.toolCallId,
                          name: t,
                          input: o.input,
                          cache_control: f,
                        })
                      : t === `advisor`
                        ? e.push({
                            type: `server_tool_use`,
                            id: o.toolCallId,
                            name: `advisor`,
                            input: {},
                            cache_control: f,
                          })
                        : n.push({
                            type: `other`,
                            message: `provider executed tool call for tool ${o.toolName} is not supported`,
                          });
                  break;
                }
                let t = o.providerOptions?.anthropic,
                  i = t?.caller
                    ? (t.caller.type === `code_execution_20250825` ||
                        t.caller.type === `code_execution_20260120`) &&
                      t.caller.toolId
                      ? { type: t.caller.type, tool_id: t.caller.toolId }
                      : t.caller.type === `direct`
                        ? { type: `direct` }
                        : void 0
                    : void 0;
                e.push({
                  type: `tool_use`,
                  id: o.toolCallId,
                  name: o.toolName,
                  input: $e(o.input),
                  ...(i && { caller: i }),
                  cache_control: f,
                });
                break;
              }
              case `tool-result`: {
                let t = a.toProviderToolName(o.toolName);
                if (r.has(o.toolCallId)) {
                  let t = o.output;
                  if (t.type !== `json` && t.type !== `error-json`) {
                    n.push({
                      type: `other`,
                      message: `provider executed tool result output type ${t.type} for tool ${o.toolName} is not supported`,
                    });
                    break;
                  }
                  e.push({
                    type: `mcp_tool_result`,
                    tool_use_id: o.toolCallId,
                    is_error: t.type === `error-json`,
                    content: t.value,
                    cache_control: f,
                  });
                } else if (t === `code_execution`) {
                  let t = o.output;
                  if (t.type === `error-text` || t.type === `error-json`) {
                    let n = {};
                    try {
                      typeof t.value == `string`
                        ? (n = R(t.value))
                        : typeof t.value == `object` && t.value !== null && (n = t.value);
                    } catch {}
                    n.type === `code_execution_tool_result_error`
                      ? e.push({
                          type: `code_execution_tool_result`,
                          tool_use_id: o.toolCallId,
                          content: {
                            type: `code_execution_tool_result_error`,
                            error_code: n.errorCode ?? `unknown`,
                          },
                          cache_control: f,
                        })
                      : e.push({
                          type: `bash_code_execution_tool_result`,
                          tool_use_id: o.toolCallId,
                          cache_control: f,
                          content: {
                            type: `bash_code_execution_tool_result_error`,
                            error_code: n.errorCode ?? `unknown`,
                          },
                        });
                    break;
                  }
                  if (t.type !== `json`) {
                    n.push({
                      type: `other`,
                      message: `provider executed tool result output type ${t.type} for tool ${o.toolName} is not supported`,
                    });
                    break;
                  }
                  if (
                    t.value == null ||
                    typeof t.value != `object` ||
                    !(`type` in t.value) ||
                    typeof t.value.type != `string`
                  ) {
                    n.push({
                      type: `other`,
                      message: `provider executed tool result output value is not a valid code execution result for tool ${o.toolName}`,
                    });
                    break;
                  }
                  if (t.value.type === `code_execution_result`) {
                    let n = await m({ value: t.value, schema: Ie });
                    e.push({
                      type: `code_execution_tool_result`,
                      tool_use_id: o.toolCallId,
                      content: {
                        type: n.type,
                        stdout: n.stdout,
                        stderr: n.stderr,
                        return_code: n.return_code,
                        content: n.content ?? [],
                      },
                      cache_control: f,
                    });
                  } else if (t.value.type === `encrypted_code_execution_result`) {
                    let n = await m({ value: t.value, schema: He });
                    n.type === `encrypted_code_execution_result` &&
                      e.push({
                        type: `code_execution_tool_result`,
                        tool_use_id: o.toolCallId,
                        content: {
                          type: n.type,
                          encrypted_stdout: n.encrypted_stdout,
                          stderr: n.stderr,
                          return_code: n.return_code,
                          content: n.content ?? [],
                        },
                        cache_control: f,
                      });
                  } else {
                    let n = await m({ value: t.value, schema: ze });
                    n.type === `code_execution_result`
                      ? e.push({
                          type: `code_execution_tool_result`,
                          tool_use_id: o.toolCallId,
                          content: {
                            type: n.type,
                            stdout: n.stdout,
                            stderr: n.stderr,
                            return_code: n.return_code,
                            content: n.content ?? [],
                          },
                          cache_control: f,
                        })
                      : n.type === `bash_code_execution_result` ||
                          n.type === `bash_code_execution_tool_result_error`
                        ? e.push({
                            type: `bash_code_execution_tool_result`,
                            tool_use_id: o.toolCallId,
                            cache_control: f,
                            content: n,
                          })
                        : e.push({
                            type: `text_editor_code_execution_tool_result`,
                            tool_use_id: o.toolCallId,
                            cache_control: f,
                            content: n,
                          });
                  }
                  break;
                }
                if (t === `web_fetch`) {
                  let t = o.output;
                  if (t.type === `error-json`) {
                    e.push({
                      type: `web_fetch_tool_result`,
                      tool_use_id: o.toolCallId,
                      content: {
                        type: `web_fetch_tool_result_error`,
                        error_code: Ye(t.value).errorCode ?? `unavailable`,
                      },
                      cache_control: f,
                    });
                    break;
                  }
                  if (t.type !== `json`) {
                    n.push({
                      type: `other`,
                      message: `provider executed tool result output type ${t.type} for tool ${o.toolName} is not supported`,
                    });
                    break;
                  }
                  let r = await m({ value: t.value, schema: je });
                  e.push({
                    type: `web_fetch_tool_result`,
                    tool_use_id: o.toolCallId,
                    content: {
                      type: `web_fetch_result`,
                      url: r.url,
                      retrieved_at: r.retrievedAt,
                      content: {
                        type: `document`,
                        title: r.content.title,
                        citations: r.content.citations,
                        source: {
                          type: r.content.source.type,
                          media_type: r.content.source.mediaType,
                          data: r.content.source.data,
                        },
                      },
                    },
                    cache_control: f,
                  });
                  break;
                }
                if (t === `web_search`) {
                  let t = o.output;
                  if (t.type === `error-json`) {
                    e.push({
                      type: `web_search_tool_result`,
                      tool_use_id: o.toolCallId,
                      content: {
                        type: `web_search_tool_result_error`,
                        error_code: Ye(t.value).errorCode ?? `unavailable`,
                      },
                      cache_control: f,
                    });
                    break;
                  }
                  if (t.type !== `json`) {
                    n.push({
                      type: `other`,
                      message: `provider executed tool result output type ${t.type} for tool ${o.toolName} is not supported`,
                    });
                    break;
                  }
                  let r = await m({ value: t.value, schema: Ce });
                  e.push({
                    type: `web_search_tool_result`,
                    tool_use_id: o.toolCallId,
                    content: r.map((e) => ({
                      url: e.url,
                      title: e.title,
                      page_age: e.pageAge,
                      encrypted_content: e.encryptedContent,
                      type: e.type,
                    })),
                    cache_control: f,
                  });
                  break;
                }
                if (t === `tool_search_tool_regex` || t === `tool_search_tool_bm25`) {
                  let t = o.output;
                  if (t.type !== `json`) {
                    n.push({
                      type: `other`,
                      message: `provider executed tool result output type ${t.type} for tool ${o.toolName} is not supported`,
                    });
                    break;
                  }
                  let r = (await m({ value: t.value, schema: Ge })).map((e) => ({
                    type: `tool_reference`,
                    tool_name: e.toolName,
                  }));
                  e.push({
                    type: `tool_search_tool_result`,
                    tool_use_id: o.toolCallId,
                    content: { type: `tool_search_tool_search_result`, tool_references: r },
                    cache_control: f,
                  });
                  break;
                }
                if (t === `advisor`) {
                  let t = o.output;
                  if (t.type !== `json` && t.type !== `error-json`) {
                    n.push({
                      type: `other`,
                      message: `provider executed tool result output type ${t.type} for tool ${o.toolName} is not supported`,
                    });
                    break;
                  }
                  let r = await m({ value: t.value, schema: fe });
                  r.type === `advisor_result`
                    ? e.push({
                        type: `advisor_tool_result`,
                        tool_use_id: o.toolCallId,
                        content: { type: `advisor_result`, text: r.text },
                        cache_control: f,
                      })
                    : r.type === `advisor_redacted_result`
                      ? e.push({
                          type: `advisor_tool_result`,
                          tool_use_id: o.toolCallId,
                          content: {
                            type: `advisor_redacted_result`,
                            encrypted_content: r.encryptedContent,
                          },
                          cache_control: f,
                        })
                      : e.push({
                          type: `advisor_tool_result`,
                          tool_use_id: o.toolCallId,
                          content: { type: `advisor_tool_result_error`, error_code: r.errorCode },
                          cache_control: f,
                        });
                  break;
                }
                n.push({
                  type: `other`,
                  message: `provider executed tool result for tool ${o.toolName} is not supported`,
                });
                break;
              }
            }
          }
        }
        d.push({ role: `assistant`, content: Qe(e) });
        break;
      }
      default:
        throw Error(`content type: ${b}`);
    }
  }
  return { prompt: { system: u, messages: d }, betas: o };
}
function Ze(e) {
  let t = [],
    n;
  for (let r of e) {
    let { role: e } = r;
    switch (e) {
      case `system`:
        (n?.type !== `system` && ((n = { type: `system`, messages: [] }), t.push(n)),
          n.messages.push(r));
        break;
      case `assistant`:
        (n?.type !== `assistant` && ((n = { type: `assistant`, messages: [] }), t.push(n)),
          n.messages.push(r));
        break;
      case `user`:
        (n?.type !== `user` && ((n = { type: `user`, messages: [] }), t.push(n)),
          n.messages.push(r));
        break;
      case `tool`:
        (n?.type !== `user` && ((n = { type: `user`, messages: [] }), t.push(n)),
          n.messages.push(r));
        break;
      default:
        throw Error(`Unsupported role: ${e}`);
    }
  }
  return t;
}
function Qe(e) {
  let t = [],
    n = [];
  function r() {
    (t.push(...n.filter((e) => e.type !== `tool_use`), ...n.filter((e) => e.type === `tool_use`)),
      (n = []));
  }
  for (let i of e)
    i.type === `thinking` || i.type === `redacted_thinking` ? (r(), t.push(i)) : n.push(i);
  return (r(), t);
}
function $e(e) {
  return typeof e == `object` && e && !Array.isArray(e) ? e : { rawInvalidInput: e };
}
function et({ finishReason: e, isJsonResponseFromTool: t }) {
  switch (e) {
    case `pause_turn`:
    case `end_turn`:
    case `stop_sequence`:
      return `stop`;
    case `refusal`:
      return `content-filter`;
    case `tool_use`:
      return t ? `stop` : `tool-calls`;
    case `max_tokens`:
    case `model_context_window_exceeded`:
      return `length`;
    case `compaction`:
      return `other`;
    default:
      return `other`;
  }
}
var tt = new Set([
    `date-time`,
    `time`,
    `date`,
    `duration`,
    `email`,
    `hostname`,
    `uri`,
    `ipv4`,
    `ipv6`,
    `uuid`,
  ]),
  nt = [
    `minimum`,
    `maximum`,
    `exclusiveMinimum`,
    `exclusiveMaximum`,
    `multipleOf`,
    `minLength`,
    `maxLength`,
    `pattern`,
    `minItems`,
    `maxItems`,
    `uniqueItems`,
    `minProperties`,
    `maxProperties`,
    `not`,
  ];
function rt(e) {
  return it(e);
}
function $(e) {
  return typeof e == `boolean` || !ct(e) ? e : it(e);
}
function it(e) {
  let t = {},
    n = e;
  if (e.$ref != null) return { $ref: e.$ref };
  if (
    (e.$schema != null && (t.$schema = e.$schema),
    e.$id != null && (t.$id = e.$id),
    e.title != null && (t.title = e.title),
    e.description != null && (t.description = e.description),
    e.default !== void 0 && (t.default = e.default),
    e.const !== void 0 && (t.const = e.const),
    e.enum != null && (t.enum = e.enum),
    e.type != null && (t.type = e.type),
    e.anyOf == null ? e.oneOf != null && (t.anyOf = e.oneOf.map($)) : (t.anyOf = e.anyOf.map($)),
    e.allOf != null && (t.allOf = e.allOf.map($)),
    e.definitions != null &&
      (t.definitions = Object.fromEntries(
        Object.entries(e.definitions).map(([e, t]) => [e, $(t)]),
      )),
    n.$defs != null)
  ) {
    let e = t;
    e.$defs = Object.fromEntries(Object.entries(n.$defs).map(([e, t]) => [e, $(t)]));
  }
  ((e.type === `object` || e.properties != null) &&
    (e.properties != null &&
      (t.properties = Object.fromEntries(Object.entries(e.properties).map(([e, t]) => [e, $(t)]))),
    (t.additionalProperties = !1),
    e.required != null && (t.required = e.required)),
    e.items != null && (t.items = Array.isArray(e.items) ? e.items.map($) : $(e.items)),
    typeof e.format == `string` && tt.has(e.format) && (t.format = e.format));
  let r = at(e);
  return (
    r != null &&
      (t.description =
        t.description == null
          ? r
          : `${t.description}
${r}`),
    t
  );
}
function at(e) {
  let t = nt.flatMap((t) => {
    let n = e[t];
    return n == null || n === !1 ? [] : `${ot(t)}: ${st(n)}`;
  });
  return (
    typeof e.format == `string` && !tt.has(e.format) && t.push(`format: ${e.format}`),
    t.length === 0 ? void 0 : `${t.join(`; `)}.`
  );
}
function ot(e) {
  return e.replace(/[A-Z]/g, (e) => ` ${e.toLowerCase()}`);
}
function st(e) {
  return typeof e == `string` ? e : JSON.stringify(e);
}
function ct(e) {
  return typeof e == `object` && !!e && !Array.isArray(e);
}
function lt(e, t, n) {
  if (e.type === `web_search_result_location`)
    return {
      type: `source`,
      sourceType: `url`,
      id: n(),
      url: e.url,
      title: e.title,
      providerMetadata: {
        anthropic: { citedText: e.cited_text, encryptedIndex: e.encrypted_index },
      },
    };
  if (e.type !== `page_location` && e.type !== `char_location`) return;
  let r = t[e.document_index];
  if (r)
    return {
      type: `source`,
      sourceType: `document`,
      id: n(),
      mediaType: r.mediaType,
      title: e.document_title ?? r.title,
      filename: r.filename,
      providerMetadata: {
        anthropic:
          e.type === `page_location`
            ? {
                citedText: e.cited_text,
                startPageNumber: e.start_page_number,
                endPageNumber: e.end_page_number,
              }
            : {
                citedText: e.cited_text,
                startCharIndex: e.start_char_index,
                endCharIndex: e.end_char_index,
              },
      },
    };
}
var ut = class t {
  constructor(e, t) {
    ((this.specificationVersion = `v4`),
      (this.modelId = e),
      (this.config = t),
      (this.generateId = t.generateId ?? J));
  }
  static [ee](e) {
    return l({ modelId: e.modelId, config: e.config });
  }
  static [B](e) {
    return new t(e.modelId, e.config);
  }
  supportsUrl(e) {
    return e.protocol === `https:`;
  }
  get provider() {
    return this.config.provider;
  }
  get providerOptionsName() {
    let e = this.config.provider,
      t = e.indexOf(`.`);
    return t === -1 ? e : e.substring(0, t);
  }
  get supportedUrls() {
    var e;
    return (e = this.config).supportedUrls?.call(e) ?? {};
  }
  async getArgs({
    userSuppliedBetas: e,
    prompt: t,
    maxOutputTokens: n,
    temperature: r,
    topP: i,
    topK: a,
    frequencyPenalty: s,
    presencePenalty: c,
    stopSequences: l,
    responseFormat: u,
    seed: d,
    tools: f,
    toolChoice: p,
    reasoning: m,
    providerOptions: g,
    stream: _,
  }) {
    let y = [];
    (s != null && y.push({ type: `unsupported`, feature: `frequencyPenalty` }),
      c != null && y.push({ type: `unsupported`, feature: `presencePenalty` }),
      d != null && y.push({ type: `unsupported`, feature: `seed` }),
      r != null && r > 1
        ? (y.push({
            type: `unsupported`,
            feature: `temperature`,
            details: `${r} exceeds anthropic maximum of 1.0. clamped to 1.0`,
          }),
          (r = 1))
        : r != null &&
          r < 0 &&
          (y.push({
            type: `unsupported`,
            feature: `temperature`,
            details: `${r} is below anthropic minimum of 0. clamped to 0`,
          }),
          (r = 0)),
      u?.type === `json` &&
        (u.schema ??
          y.push({
            type: `unsupported`,
            feature: `responseFormat`,
            details: `JSON response format requires a schema. The response format is ignored.`,
          })));
    let b = this.providerOptionsName,
      S = await h({ provider: `anthropic`, providerOptions: g, schema: se }),
      C = b === `anthropic` ? null : await h({ provider: b, providerOptions: g, schema: se }),
      w = C != null,
      T = Object.assign({}, S ?? {}, C ?? {}),
      {
        maxOutputTokens: E,
        supportsStructuredOutput: D,
        supportsAdaptiveThinking: O,
        rejectsSamplingParameters: k,
        supportsXhighEffort: A,
        isKnownModel: j,
      } = dt(this.modelId);
    (!j &&
      n == null &&
      y.push({
        type: `compatibility`,
        feature: `maxOutputTokens`,
        details: `The model "${this.modelId}" is unknown. The max output tokens have been limited to ${E}. Set maxOutputTokens explicitly to override this limit.`,
      }),
      k &&
        (r != null &&
          (y.push({
            type: `unsupported`,
            feature: `temperature`,
            details: `temperature is not supported by ${this.modelId} and will be ignored`,
          }),
          (r = void 0)),
        a != null &&
          (y.push({
            type: `unsupported`,
            feature: `topK`,
            details: `topK is not supported by ${this.modelId} and will be ignored`,
          }),
          (a = void 0)),
        i != null &&
          (y.push({
            type: `unsupported`,
            feature: `topP`,
            details: `topP is not supported by ${this.modelId} and will be ignored`,
          }),
          (i = void 0))));
    let ee = j || this.modelId.startsWith(`claude-`),
      M = (this.config.supportsNativeStructuredOutput ?? !0) && D,
      N = (this.config.supportsStrictTools ?? !0) && D,
      P = T?.structuredOutputMode ?? `auto`,
      F = P === `outputFormat` || (P === `auto` && M),
      I =
        u?.type === `json` && u.schema != null && !F
          ? {
              type: `function`,
              name: `json`,
              description: `Respond with a JSON object.`,
              inputSchema: u.schema,
            }
          : void 0;
    I != null &&
      T?.disableParallelToolUse === !1 &&
      y.push({
        type: `unsupported`,
        feature: `providerOptions.anthropic.disableParallelToolUse`,
        details:
          "`disableParallelToolUse: false` is ignored when using the JSON response tool. Parallel tool use is disabled to ensure a single coherent JSON tool call.",
      });
    let L = T?.contextManagement,
      R = new ue(),
      z = x({
        tools: f,
        providerToolNames: {
          "anthropic.code_execution_20250522": `code_execution`,
          "anthropic.code_execution_20250825": `code_execution`,
          "anthropic.code_execution_20260120": `code_execution`,
          "anthropic.computer_20241022": `computer`,
          "anthropic.computer_20250124": `computer`,
          "anthropic.text_editor_20241022": `str_replace_editor`,
          "anthropic.text_editor_20250124": `str_replace_editor`,
          "anthropic.text_editor_20250429": `str_replace_based_edit_tool`,
          "anthropic.text_editor_20250728": `str_replace_based_edit_tool`,
          "anthropic.bash_20241022": `bash`,
          "anthropic.bash_20250124": `bash`,
          "anthropic.memory_20250818": `memory`,
          "anthropic.web_search_20250305": `web_search`,
          "anthropic.web_search_20260209": `web_search`,
          "anthropic.web_fetch_20250910": `web_fetch`,
          "anthropic.web_fetch_20260209": `web_fetch`,
          "anthropic.tool_search_regex_20251119": `tool_search_tool_regex`,
          "anthropic.tool_search_bm25_20251119": `tool_search_tool_bm25`,
          "anthropic.advisor_20260301": `advisor`,
        },
      }),
      { prompt: B, betas: V } = await Xe({
        prompt: t,
        sendReasoning: T?.sendReasoning ?? !0,
        warnings: y,
        cacheControlValidator: R,
        toolNameMapping: z,
      });
    if (o(m) && T?.effort == null) {
      let e = pt({
        reasoning: m,
        supportsAdaptiveThinking: O,
        supportsXhighEffort: A,
        maxOutputTokensForModel: E,
        warnings: y,
      });
      e != null &&
        ((T.thinking ??= e.thinking),
        e.effort != null && T.thinking?.type !== `disabled` && (T.effort = e.effort));
    }
    let H = T?.thinking?.type,
      U = H === `enabled` || H === `adaptive`,
      W = U || H === `disabled`,
      G = H === `enabled` ? T?.thinking?.budgetTokens : void 0,
      K = H === `adaptive` ? T?.thinking?.display : void 0,
      q = n ?? E,
      J = {
        model: this.modelId,
        max_tokens: q,
        temperature: r,
        top_k: a,
        top_p: i,
        stop_sequences: l,
        ...(W && {
          thinking: {
            type: H,
            ...(G != null && { budget_tokens: G }),
            ...(K != null && { display: K }),
          },
        }),
        ...((T?.effort || T?.taskBudget || (F && u?.type === `json` && u.schema != null)) && {
          output_config: {
            ...(T?.effort && { effort: T.effort }),
            ...(T?.taskBudget && {
              task_budget: {
                type: T.taskBudget.type,
                total: T.taskBudget.total,
                ...(T.taskBudget.remaining != null && { remaining: T.taskBudget.remaining }),
              },
            }),
            ...(F &&
              u?.type === `json` &&
              u.schema != null && { format: { type: `json_schema`, schema: rt(u.schema) } }),
          },
        }),
        ...(T?.speed && { speed: T.speed }),
        ...(T?.inferenceGeo && { inference_geo: T.inferenceGeo }),
        ...(T?.fallbacks && T.fallbacks.length > 0 && { fallbacks: T.fallbacks }),
        ...(T?.cacheControl && { cache_control: T.cacheControl }),
        ...(T?.metadata?.userId != null && { metadata: { user_id: T.metadata.userId } }),
        ...(T?.mcpServers &&
          T.mcpServers.length > 0 && {
            mcp_servers: T.mcpServers.map((e) => ({
              type: e.type,
              name: e.name,
              url: e.url,
              authorization_token: e.authorizationToken,
              tool_configuration: e.toolConfiguration
                ? {
                    allowed_tools: e.toolConfiguration.allowedTools,
                    enabled: e.toolConfiguration.enabled,
                  }
                : void 0,
            })),
          }),
        ...(T?.container && {
          container:
            T.container.skills && T.container.skills.length > 0
              ? {
                  id: T.container.id,
                  skills: T.container.skills.map((e) => ({
                    type: e.type,
                    skill_id:
                      e.type === `custom`
                        ? v({ reference: e.providerReference, provider: `anthropic` })
                        : e.skillId,
                    version: e.version,
                  })),
                }
              : T.container.id,
        }),
        system: B.system,
        messages: B.messages,
        ...(L && {
          context_management: {
            edits: L.edits
              .map((e) => {
                let t = e.type;
                switch (t) {
                  case `clear_tool_uses_20250919`:
                    return {
                      type: e.type,
                      ...(e.trigger !== void 0 && { trigger: e.trigger }),
                      ...(e.keep !== void 0 && { keep: e.keep }),
                      ...(e.clearAtLeast !== void 0 && { clear_at_least: e.clearAtLeast }),
                      ...(e.clearToolInputs !== void 0 && { clear_tool_inputs: e.clearToolInputs }),
                      ...(e.excludeTools !== void 0 && { exclude_tools: e.excludeTools }),
                    };
                  case `clear_thinking_20251015`:
                    return { type: e.type, ...(e.keep !== void 0 && { keep: e.keep }) };
                  case `compact_20260112`:
                    return {
                      type: e.type,
                      ...(e.trigger !== void 0 && { trigger: e.trigger }),
                      ...(e.pauseAfterCompaction !== void 0 && {
                        pause_after_compaction: e.pauseAfterCompaction,
                      }),
                      ...(e.instructions !== void 0 && { instructions: e.instructions }),
                    };
                  default:
                    y.push({ type: `other`, message: `Unknown context management strategy: ${t}` });
                    return;
                }
              })
              .filter((e) => e !== void 0),
          },
        }),
      };
    (U
      ? (H === `enabled` &&
          G == null &&
          (y.push({
            type: `compatibility`,
            feature: `extended thinking`,
            details: `thinking budget is required when thinking is enabled. using default budget of 1024 tokens.`,
          }),
          (J.thinking = { type: `enabled`, budget_tokens: 1024 }),
          (G = 1024)),
        J.temperature != null &&
          ((J.temperature = void 0),
          y.push({
            type: `unsupported`,
            feature: `temperature`,
            details: `temperature is not supported when thinking is enabled`,
          })),
        a != null &&
          ((J.top_k = void 0),
          y.push({
            type: `unsupported`,
            feature: `topK`,
            details: `topK is not supported when thinking is enabled`,
          })),
        i != null &&
          ((J.top_p = void 0),
          y.push({
            type: `unsupported`,
            feature: `topP`,
            details: `topP is not supported when thinking is enabled`,
          })),
        (J.max_tokens = q + (G ?? 0)))
      : ee &&
        i != null &&
        r != null &&
        (y.push({
          type: `unsupported`,
          feature: `topP`,
          details: `topP is not supported when temperature is set. topP is ignored.`,
        }),
        (J.top_p = void 0)),
      j &&
        J.max_tokens > E &&
        (n != null &&
          y.push({
            type: `unsupported`,
            feature: `maxOutputTokens`,
            details: `${J.max_tokens} (maxOutputTokens + thinkingBudget) is greater than ${this.modelId} ${E} max output tokens. The max output tokens have been limited to ${E}.`,
          }),
        (J.max_tokens = E)),
      T?.mcpServers && T.mcpServers.length > 0 && V.add(`mcp-client-2025-04-04`),
      L &&
        (V.add(`context-management-2025-06-27`),
        L.edits.some((e) => e.type === `compact_20260112`) && V.add(`compact-2026-01-12`)),
      T?.container &&
        T.container.skills &&
        T.container.skills.length > 0 &&
        (V.add(`code-execution-2025-08-25`),
        V.add(`skills-2025-10-02`),
        V.add(`files-api-2025-04-14`),
        f?.some(
          (e) =>
            e.type === `provider` &&
            (e.id === `anthropic.code_execution_20250825` ||
              e.id === `anthropic.code_execution_20260120`),
        ) ||
          y.push({ type: `other`, message: `code execution tool is required when using skills` })),
      T?.taskBudget && V.add(`task-budgets-2026-03-13`),
      T?.speed === `fast` && V.add(`fast-mode-2026-02-01`),
      T?.fallbacks && T.fallbacks.length > 0 && V.add(`server-side-fallback-2026-06-01`));
    let Y = _ && (T?.toolStreaming ?? !0),
      {
        tools: X,
        toolChoice: Z,
        toolWarnings: te,
        betas: ne,
      } = await Pe(
        I == null
          ? {
              tools: f ?? [],
              toolChoice: p,
              disableParallelToolUse: T?.disableParallelToolUse,
              cacheControlValidator: R,
              supportsStructuredOutput: M,
              supportsStrictTools: N,
              defaultEagerInputStreaming: Y,
            }
          : {
              tools: [...(f ?? []), I],
              toolChoice: { type: `required` },
              disableParallelToolUse: !0,
              cacheControlValidator: R,
              supportsStructuredOutput: !1,
              supportsStrictTools: N,
              defaultEagerInputStreaming: Y,
            },
      ),
      Q = R.getWarnings();
    return {
      args: { ...J, tools: X, tool_choice: Z, stream: _ === !0 ? !0 : void 0 },
      warnings: [...y, ...te, ...Q],
      betas: new Set([...V, ...ne, ...e, ...(T?.anthropicBeta ?? [])]),
      usesJsonResponseTool: I != null,
      toolNameMapping: z,
      providerOptionsName: b,
      usedCustomProviderKey: w,
    };
  }
  async getHeaders({ betas: e, headers: t }) {
    return z(
      this.config.headers ? await y(this.config.headers) : void 0,
      t,
      e.size > 0 ? { "anthropic-beta": Array.from(e).join(`,`) } : {},
    );
  }
  async getBetasFromHeaders(e) {
    let t = (this.config.headers ? await y(this.config.headers) : void 0)?.[`anthropic-beta`] ?? ``,
      n = e?.[`anthropic-beta`] ?? ``;
    return new Set(
      [...t.toLowerCase().split(`,`), ...n.toLowerCase().split(`,`)]
        .map((e) => e.trim())
        .filter((e) => e !== ``),
    );
  }
  buildRequestUrl(e) {
    var t;
    return (
      (t = this.config).buildRequestUrl?.call(t, this.config.baseURL, e) ??
      `${this.config.baseURL}/messages`
    );
  }
  transformRequestBody(e, t) {
    var n;
    return (n = this.config).transformRequestBody?.call(n, e, t) ?? e;
  }
  extractCitationDocuments(e) {
    return e
      .filter((e) => e.role === `user`)
      .flatMap((e) => e.content)
      .filter((e) =>
        e.type !== `file` || (e.mediaType !== `application/pdf` && e.mediaType !== `text/plain`)
          ? !1
          : (e.providerOptions?.anthropic?.citations?.enabled ?? !1),
      )
      .map((e) => {
        let t = e;
        return {
          title: t.filename ?? `Untitled Document`,
          filename: t.filename,
          mediaType: t.mediaType,
        };
      });
  }
  async doGenerate(e) {
    let {
        args: t,
        warnings: n,
        betas: r,
        usesJsonResponseTool: a,
        toolNameMapping: o,
        providerOptionsName: s,
        usedCustomProviderKey: c,
      } = await this.getArgs({
        ...e,
        stream: !1,
        userSuppliedBetas: await this.getBetasFromHeaders(e.headers),
      }),
      l = [...this.extractCitationDocuments(e.prompt)],
      u = ft(t.tools),
      {
        responseHeaders: d,
        value: f,
        rawValue: p,
      } = await i({
        url: this.buildRequestUrl(!1),
        headers: await this.getHeaders({ betas: r, headers: e.headers }),
        body: this.transformRequestBody(t, r),
        failedResponseHandler: Z,
        successfulResponseHandler: I(re),
        abortSignal: e.abortSignal,
        fetch: this.config.fetch,
      }),
      m = [],
      h = {},
      g = {},
      _ = !1;
    for (let e of f.content)
      switch (e.type) {
        case `text`:
          if (!a) {
            let t = e.citations?.filter((e) => e.type === `web_search_result_location`);
            if (
              (m.push({
                type: `text`,
                text: e.text,
                ...(t != null &&
                  t.length > 0 && { providerMetadata: { anthropic: { citations: t } } }),
              }),
              e.citations)
            )
              for (let t of e.citations) {
                let e = lt(t, l, this.generateId);
                e && m.push(e);
              }
          }
          break;
        case `thinking`:
          m.push({
            type: `reasoning`,
            text: e.thinking,
            providerMetadata: { anthropic: { signature: e.signature } },
          });
          break;
        case `redacted_thinking`:
          m.push({
            type: `reasoning`,
            text: ``,
            providerMetadata: { anthropic: { redactedData: e.data } },
          });
          break;
        case `compaction`:
          m.push({
            type: `text`,
            text: e.content,
            providerMetadata: { anthropic: { type: `compaction` } },
          });
          break;
        case `tool_use`:
          if (a && e.name === `json`)
            ((_ = !0), m.push({ type: `text`, text: JSON.stringify(e.input) }));
          else {
            let t = e.caller,
              n = t ? { type: t.type, toolId: `tool_id` in t ? t.tool_id : void 0 } : void 0;
            m.push({
              type: `tool-call`,
              toolCallId: e.id,
              toolName: e.name,
              input: JSON.stringify(e.input),
              ...(n && { providerMetadata: { anthropic: { caller: n } } }),
            });
          }
          break;
        case `server_tool_use`:
          if (e.name === `text_editor_code_execution` || e.name === `bash_code_execution`)
            m.push({
              type: `tool-call`,
              toolCallId: e.id,
              toolName: o.toCustomToolName(`code_execution`),
              input: JSON.stringify({ type: e.name, ...e.input }),
              providerExecuted: !0,
              ...(u ? { dynamic: !0 } : {}),
            });
          else if (
            e.name === `web_search` ||
            e.name === `code_execution` ||
            e.name === `web_fetch`
          ) {
            let t =
              e.name === `code_execution` &&
              e.input != null &&
              typeof e.input == `object` &&
              `code` in e.input &&
              !(`type` in e.input)
                ? { type: `programmatic-tool-call`, ...e.input }
                : e.input;
            m.push({
              type: `tool-call`,
              toolCallId: e.id,
              toolName: o.toCustomToolName(e.name),
              input: JSON.stringify(t),
              providerExecuted: !0,
              ...(u && e.name === `code_execution` ? { dynamic: !0 } : {}),
            });
          } else
            e.name === `tool_search_tool_regex` || e.name === `tool_search_tool_bm25`
              ? ((g[e.id] = e.name),
                m.push({
                  type: `tool-call`,
                  toolCallId: e.id,
                  toolName: o.toCustomToolName(e.name),
                  input: JSON.stringify(e.input),
                  providerExecuted: !0,
                }))
              : e.name === `advisor` &&
                m.push({
                  type: `tool-call`,
                  toolCallId: e.id,
                  toolName: o.toCustomToolName(`advisor`),
                  input: JSON.stringify(e.input),
                  providerExecuted: !0,
                });
          break;
        case `mcp_tool_use`:
          ((h[e.id] = {
            type: `tool-call`,
            toolCallId: e.id,
            toolName: e.name,
            input: JSON.stringify(e.input),
            providerExecuted: !0,
            dynamic: !0,
            providerMetadata: { anthropic: { type: `mcp-tool-use`, serverName: e.server_name } },
          }),
            m.push(h[e.id]));
          break;
        case `mcp_tool_result`:
          m.push({
            type: `tool-result`,
            toolCallId: e.tool_use_id,
            toolName: h[e.tool_use_id].toolName,
            isError: e.is_error,
            result: e.content,
            dynamic: !0,
            providerMetadata: h[e.tool_use_id].providerMetadata,
          });
          break;
        case `web_fetch_tool_result`:
          e.content.type === `web_fetch_result`
            ? (l.push({
                title: e.content.content.title ?? e.content.url,
                mediaType: e.content.content.source.media_type,
              }),
              m.push({
                type: `tool-result`,
                toolCallId: e.tool_use_id,
                toolName: o.toCustomToolName(`web_fetch`),
                result: {
                  type: `web_fetch_result`,
                  url: e.content.url,
                  retrievedAt: e.content.retrieved_at,
                  content: {
                    type: e.content.content.type,
                    title: e.content.content.title,
                    citations: e.content.content.citations,
                    source: {
                      type: e.content.content.source.type,
                      mediaType: e.content.content.source.media_type,
                      data: e.content.content.source.data,
                    },
                  },
                },
              }))
            : e.content.type === `web_fetch_tool_result_error` &&
              m.push({
                type: `tool-result`,
                toolCallId: e.tool_use_id,
                toolName: o.toCustomToolName(`web_fetch`),
                isError: !0,
                result: { type: `web_fetch_tool_result_error`, errorCode: e.content.error_code },
              });
          break;
        case `web_search_tool_result`:
          if (Array.isArray(e.content)) {
            m.push({
              type: `tool-result`,
              toolCallId: e.tool_use_id,
              toolName: o.toCustomToolName(`web_search`),
              result: e.content.map((e) => ({
                url: e.url,
                title: e.title,
                pageAge: e.page_age ?? null,
                encryptedContent: e.encrypted_content,
                type: e.type,
              })),
            });
            for (let t of e.content)
              m.push({
                type: `source`,
                sourceType: `url`,
                id: this.generateId(),
                url: t.url,
                title: t.title,
                providerMetadata: { anthropic: { pageAge: t.page_age ?? null } },
              });
          } else
            m.push({
              type: `tool-result`,
              toolCallId: e.tool_use_id,
              toolName: o.toCustomToolName(`web_search`),
              isError: !0,
              result: { type: `web_search_tool_result_error`, errorCode: e.content.error_code },
            });
          break;
        case `code_execution_tool_result`:
          e.content.type === `code_execution_result`
            ? m.push({
                type: `tool-result`,
                toolCallId: e.tool_use_id,
                toolName: o.toCustomToolName(`code_execution`),
                result: {
                  type: e.content.type,
                  stdout: e.content.stdout,
                  stderr: e.content.stderr,
                  return_code: e.content.return_code,
                  content: e.content.content ?? [],
                },
              })
            : e.content.type === `encrypted_code_execution_result`
              ? m.push({
                  type: `tool-result`,
                  toolCallId: e.tool_use_id,
                  toolName: o.toCustomToolName(`code_execution`),
                  result: {
                    type: e.content.type,
                    encrypted_stdout: e.content.encrypted_stdout,
                    stderr: e.content.stderr,
                    return_code: e.content.return_code,
                    content: e.content.content ?? [],
                  },
                })
              : e.content.type === `code_execution_tool_result_error` &&
                m.push({
                  type: `tool-result`,
                  toolCallId: e.tool_use_id,
                  toolName: o.toCustomToolName(`code_execution`),
                  isError: !0,
                  result: {
                    type: `code_execution_tool_result_error`,
                    errorCode: e.content.error_code,
                  },
                });
          break;
        case `bash_code_execution_tool_result`:
        case `text_editor_code_execution_tool_result`:
          m.push({
            type: `tool-result`,
            toolCallId: e.tool_use_id,
            toolName: o.toCustomToolName(`code_execution`),
            result: e.content,
          });
          break;
        case `tool_search_tool_result`: {
          let t = g[e.tool_use_id];
          if (t == null) {
            let e = o.toCustomToolName(`tool_search_tool_bm25`);
            (o.toCustomToolName(`tool_search_tool_regex`),
              (t =
                e === `tool_search_tool_bm25`
                  ? `tool_search_tool_regex`
                  : `tool_search_tool_bm25`));
          }
          e.content.type === `tool_search_tool_search_result`
            ? m.push({
                type: `tool-result`,
                toolCallId: e.tool_use_id,
                toolName: o.toCustomToolName(t),
                result: e.content.tool_references.map((e) => ({
                  type: e.type,
                  toolName: e.tool_name,
                })),
              })
            : m.push({
                type: `tool-result`,
                toolCallId: e.tool_use_id,
                toolName: o.toCustomToolName(t),
                isError: !0,
                result: { type: `tool_search_tool_result_error`, errorCode: e.content.error_code },
              });
          break;
        }
        case `advisor_tool_result`: {
          let t = o.toCustomToolName(`advisor`);
          e.content.type === `advisor_result`
            ? m.push({
                type: `tool-result`,
                toolCallId: e.tool_use_id,
                toolName: t,
                result: { type: `advisor_result`, text: e.content.text },
              })
            : e.content.type === `advisor_redacted_result`
              ? m.push({
                  type: `tool-result`,
                  toolCallId: e.tool_use_id,
                  toolName: t,
                  result: {
                    type: `advisor_redacted_result`,
                    encryptedContent: e.content.encrypted_content,
                  },
                })
              : m.push({
                  type: `tool-result`,
                  toolCallId: e.tool_use_id,
                  toolName: t,
                  isError: !0,
                  result: { type: `advisor_tool_result_error`, errorCode: e.content.error_code },
                });
          break;
        }
        case `fallback`:
          break;
      }
    return {
      content: m,
      finishReason: {
        unified: et({ finishReason: f.stop_reason, isJsonResponseFromTool: _ }),
        raw: f.stop_reason ?? void 0,
      },
      usage: Fe({ usage: f.usage }),
      request: { body: t },
      response: { id: f.id ?? void 0, modelId: f.model ?? void 0, headers: d, body: p },
      warnings: n,
      providerMetadata: (() => {
        let e = ht(f.stop_details),
          t = {
            usage: f.usage,
            stopSequence: f.stop_sequence ?? null,
            ...(e == null ? {} : { stopDetails: e }),
            iterations: f.usage.iterations
              ? f.usage.iterations.map((e) => ({
                  type: e.type,
                  ...(e.model == null ? {} : { model: e.model }),
                  inputTokens: e.input_tokens,
                  outputTokens: e.output_tokens,
                  ...(e.cache_creation_input_tokens
                    ? { cacheCreationInputTokens: e.cache_creation_input_tokens }
                    : {}),
                  ...(e.cache_read_input_tokens
                    ? { cacheReadInputTokens: e.cache_read_input_tokens }
                    : {}),
                }))
              : null,
            container: f.container
              ? {
                  expiresAt: f.container.expires_at,
                  id: f.container.id,
                  skills:
                    f.container.skills?.map((e) => ({
                      type: e.type,
                      skillId: e.skill_id,
                      version: e.version,
                    })) ?? null,
                }
              : null,
            contextManagement: mt(f.context_management) ?? null,
          },
          n = { anthropic: t };
        return (c && s !== `anthropic` && (n[s] = t), n);
      })(),
    };
  }
  async doStream(t) {
    "use step";
    let {
        args: n,
        warnings: r,
        betas: a,
        usesJsonResponseTool: o,
        toolNameMapping: s,
        providerOptionsName: c,
        usedCustomProviderKey: l,
      } = await this.getArgs({
        ...t,
        stream: !0,
        userSuppliedBetas: await this.getBetasFromHeaders(t.headers),
      }),
      u = [...this.extractCitationDocuments(t.prompt)],
      d = ft(n.tools),
      f = this.buildRequestUrl(!0),
      { responseHeaders: p, value: m } = await i({
        url: f,
        headers: await this.getHeaders({ betas: a, headers: t.headers }),
        body: this.transformRequestBody(n, a),
        failedResponseHandler: Z,
        successfulResponseHandler: T(ie),
        abortSignal: t.abortSignal,
        fetch: this.config.fetch,
      }),
      h = { unified: `other`, raw: void 0 },
      g = {
        input_tokens: 0,
        output_tokens: 0,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
        iterations: null,
      },
      _ = {},
      v = {},
      y = {},
      b = null,
      x,
      S = null,
      C,
      w = null,
      E = !1,
      D,
      O = this.generateId,
      [k, A] = m
        .pipeThrough(
          new TransformStream({
            start(e) {
              e.enqueue({ type: `stream-start`, warnings: r });
            },
            transform(e, n) {
              if (
                (t.includeRawChunks && n.enqueue({ type: `raw`, rawValue: e.rawValue }), !e.success)
              ) {
                n.enqueue({ type: `error`, error: e.error });
                return;
              }
              let r = e.value;
              switch (r.type) {
                case `ping`:
                  return;
                case `content_block_start`: {
                  let e = r.content_block,
                    t = e.type;
                  if (t === `fallback`) return;
                  switch (((D = t), t)) {
                    case `text`:
                      if (o) return;
                      ((_[r.index] = { type: `text`, citations: [] }),
                        n.enqueue({ type: `text-start`, id: String(r.index) }));
                      return;
                    case `thinking`:
                      ((_[r.index] = { type: `reasoning` }),
                        n.enqueue({ type: `reasoning-start`, id: String(r.index) }));
                      return;
                    case `redacted_thinking`:
                      ((_[r.index] = { type: `reasoning` }),
                        n.enqueue({
                          type: `reasoning-start`,
                          id: String(r.index),
                          providerMetadata: { anthropic: { redactedData: e.data } },
                        }));
                      return;
                    case `compaction`:
                      ((_[r.index] = { type: `text`, citations: [] }),
                        n.enqueue({
                          type: `text-start`,
                          id: String(r.index),
                          providerMetadata: { anthropic: { type: `compaction` } },
                        }));
                      return;
                    case `tool_use`:
                      if (o && e.name === `json`)
                        ((E = !0),
                          (_[r.index] = { type: `text`, citations: [] }),
                          n.enqueue({ type: `text-start`, id: String(r.index) }));
                      else {
                        let t = e.caller,
                          i = t
                            ? { type: t.type, toolId: `tool_id` in t ? t.tool_id : void 0 }
                            : void 0,
                          a =
                            e.input && Object.keys(e.input).length > 0
                              ? JSON.stringify(e.input)
                              : ``;
                        ((_[r.index] = {
                          type: `tool-call`,
                          toolCallId: e.id,
                          toolName: e.name,
                          input: a,
                          firstDelta: a.length === 0,
                          ...(i && { caller: i }),
                        }),
                          n.enqueue({ type: `tool-input-start`, id: e.id, toolName: e.name }));
                      }
                      return;
                    case `server_tool_use`:
                      if (
                        [
                          `web_fetch`,
                          `web_search`,
                          `code_execution`,
                          `text_editor_code_execution`,
                          `bash_code_execution`,
                        ].includes(e.name)
                      ) {
                        let t =
                            e.name === `text_editor_code_execution` ||
                            e.name === `bash_code_execution`
                              ? `code_execution`
                              : e.name,
                          i =
                            e.name === `text_editor_code_execution` ||
                            e.name === `bash_code_execution`
                              ? e.name
                              : e.name === `code_execution`
                                ? `programmatic-tool-call`
                                : void 0,
                          a = s.toCustomToolName(t),
                          o =
                            e.input != null &&
                            typeof e.input == `object` &&
                            Object.keys(e.input).length > 0
                              ? JSON.stringify(e.input)
                              : ``;
                        ((_[r.index] = {
                          type: `tool-call`,
                          toolCallId: e.id,
                          toolName: a,
                          input: o,
                          providerExecuted: !0,
                          ...(d && t === `code_execution` ? { dynamic: !0 } : {}),
                          firstDelta: o.length === 0,
                          providerToolName: t,
                          providerToolInputType: i,
                        }),
                          n.enqueue({
                            type: `tool-input-start`,
                            id: e.id,
                            toolName: a,
                            providerExecuted: !0,
                            ...(d && t === `code_execution` ? { dynamic: !0 } : {}),
                          }));
                      } else if (
                        e.name === `tool_search_tool_regex` ||
                        e.name === `tool_search_tool_bm25`
                      ) {
                        y[e.id] = e.name;
                        let t = s.toCustomToolName(e.name);
                        ((_[r.index] = {
                          type: `tool-call`,
                          toolCallId: e.id,
                          toolName: t,
                          input: ``,
                          providerExecuted: !0,
                          firstDelta: !0,
                          providerToolName: e.name,
                        }),
                          n.enqueue({
                            type: `tool-input-start`,
                            id: e.id,
                            toolName: t,
                            providerExecuted: !0,
                          }));
                      } else if (e.name === `advisor`) {
                        let t = s.toCustomToolName(`advisor`);
                        ((_[r.index] = {
                          type: `tool-call`,
                          toolCallId: e.id,
                          toolName: t,
                          input: `{}`,
                          providerExecuted: !0,
                          firstDelta: !0,
                          providerToolName: e.name,
                        }),
                          n.enqueue({
                            type: `tool-input-start`,
                            id: e.id,
                            toolName: t,
                            providerExecuted: !0,
                          }));
                      }
                      return;
                    case `web_fetch_tool_result`:
                      e.content.type === `web_fetch_result`
                        ? (u.push({
                            title: e.content.content.title ?? e.content.url,
                            mediaType: e.content.content.source.media_type,
                          }),
                          n.enqueue({
                            type: `tool-result`,
                            toolCallId: e.tool_use_id,
                            toolName: s.toCustomToolName(`web_fetch`),
                            result: {
                              type: `web_fetch_result`,
                              url: e.content.url,
                              retrievedAt: e.content.retrieved_at,
                              content: {
                                type: e.content.content.type,
                                title: e.content.content.title,
                                citations: e.content.content.citations,
                                source: {
                                  type: e.content.content.source.type,
                                  mediaType: e.content.content.source.media_type,
                                  data: e.content.content.source.data,
                                },
                              },
                            },
                          }))
                        : e.content.type === `web_fetch_tool_result_error` &&
                          n.enqueue({
                            type: `tool-result`,
                            toolCallId: e.tool_use_id,
                            toolName: s.toCustomToolName(`web_fetch`),
                            isError: !0,
                            result: {
                              type: `web_fetch_tool_result_error`,
                              errorCode: e.content.error_code,
                            },
                          });
                      return;
                    case `web_search_tool_result`:
                      if (Array.isArray(e.content)) {
                        n.enqueue({
                          type: `tool-result`,
                          toolCallId: e.tool_use_id,
                          toolName: s.toCustomToolName(`web_search`),
                          result: e.content.map((e) => ({
                            url: e.url,
                            title: e.title,
                            pageAge: e.page_age ?? null,
                            encryptedContent: e.encrypted_content,
                            type: e.type,
                          })),
                        });
                        for (let t of e.content)
                          n.enqueue({
                            type: `source`,
                            sourceType: `url`,
                            id: O(),
                            url: t.url,
                            title: t.title,
                            providerMetadata: { anthropic: { pageAge: t.page_age ?? null } },
                          });
                      } else
                        n.enqueue({
                          type: `tool-result`,
                          toolCallId: e.tool_use_id,
                          toolName: s.toCustomToolName(`web_search`),
                          isError: !0,
                          result: {
                            type: `web_search_tool_result_error`,
                            errorCode: e.content.error_code,
                          },
                        });
                      return;
                    case `code_execution_tool_result`:
                      e.content.type === `code_execution_result`
                        ? n.enqueue({
                            type: `tool-result`,
                            toolCallId: e.tool_use_id,
                            toolName: s.toCustomToolName(`code_execution`),
                            result: {
                              type: e.content.type,
                              stdout: e.content.stdout,
                              stderr: e.content.stderr,
                              return_code: e.content.return_code,
                              content: e.content.content ?? [],
                            },
                          })
                        : e.content.type === `encrypted_code_execution_result`
                          ? n.enqueue({
                              type: `tool-result`,
                              toolCallId: e.tool_use_id,
                              toolName: s.toCustomToolName(`code_execution`),
                              result: {
                                type: e.content.type,
                                encrypted_stdout: e.content.encrypted_stdout,
                                stderr: e.content.stderr,
                                return_code: e.content.return_code,
                                content: e.content.content ?? [],
                              },
                            })
                          : e.content.type === `code_execution_tool_result_error` &&
                            n.enqueue({
                              type: `tool-result`,
                              toolCallId: e.tool_use_id,
                              toolName: s.toCustomToolName(`code_execution`),
                              isError: !0,
                              result: {
                                type: `code_execution_tool_result_error`,
                                errorCode: e.content.error_code,
                              },
                            });
                      return;
                    case `bash_code_execution_tool_result`:
                    case `text_editor_code_execution_tool_result`:
                      n.enqueue({
                        type: `tool-result`,
                        toolCallId: e.tool_use_id,
                        toolName: s.toCustomToolName(`code_execution`),
                        result: e.content,
                      });
                      return;
                    case `tool_search_tool_result`: {
                      let t = y[e.tool_use_id];
                      if (t == null) {
                        let e = s.toCustomToolName(`tool_search_tool_bm25`);
                        (s.toCustomToolName(`tool_search_tool_regex`),
                          (t =
                            e === `tool_search_tool_bm25`
                              ? `tool_search_tool_regex`
                              : `tool_search_tool_bm25`));
                      }
                      e.content.type === `tool_search_tool_search_result`
                        ? n.enqueue({
                            type: `tool-result`,
                            toolCallId: e.tool_use_id,
                            toolName: s.toCustomToolName(t),
                            result: e.content.tool_references.map((e) => ({
                              type: e.type,
                              toolName: e.tool_name,
                            })),
                          })
                        : n.enqueue({
                            type: `tool-result`,
                            toolCallId: e.tool_use_id,
                            toolName: s.toCustomToolName(t),
                            isError: !0,
                            result: {
                              type: `tool_search_tool_result_error`,
                              errorCode: e.content.error_code,
                            },
                          });
                      return;
                    }
                    case `advisor_tool_result`: {
                      let t = s.toCustomToolName(`advisor`);
                      e.content.type === `advisor_result`
                        ? n.enqueue({
                            type: `tool-result`,
                            toolCallId: e.tool_use_id,
                            toolName: t,
                            result: { type: `advisor_result`, text: e.content.text },
                          })
                        : e.content.type === `advisor_redacted_result`
                          ? n.enqueue({
                              type: `tool-result`,
                              toolCallId: e.tool_use_id,
                              toolName: t,
                              result: {
                                type: `advisor_redacted_result`,
                                encryptedContent: e.content.encrypted_content,
                              },
                            })
                          : n.enqueue({
                              type: `tool-result`,
                              toolCallId: e.tool_use_id,
                              toolName: t,
                              isError: !0,
                              result: {
                                type: `advisor_tool_result_error`,
                                errorCode: e.content.error_code,
                              },
                            });
                      return;
                    }
                    case `mcp_tool_use`:
                      ((v[e.id] = {
                        type: `tool-call`,
                        toolCallId: e.id,
                        toolName: e.name,
                        input: JSON.stringify(e.input),
                        providerExecuted: !0,
                        dynamic: !0,
                        providerMetadata: {
                          anthropic: { type: `mcp-tool-use`, serverName: e.server_name },
                        },
                      }),
                        n.enqueue(v[e.id]));
                      return;
                    case `mcp_tool_result`:
                      n.enqueue({
                        type: `tool-result`,
                        toolCallId: e.tool_use_id,
                        toolName: v[e.tool_use_id].toolName,
                        isError: e.is_error,
                        result: e.content,
                        dynamic: !0,
                        providerMetadata: v[e.tool_use_id].providerMetadata,
                      });
                      return;
                    default:
                      throw Error(`Unsupported content block type: ${t}`);
                  }
                }
                case `content_block_stop`:
                  if (_[r.index] != null) {
                    let e = _[r.index];
                    switch (e.type) {
                      case `text`:
                        n.enqueue({
                          type: `text-end`,
                          id: String(r.index),
                          ...(e.citations.length > 0 && {
                            providerMetadata: { anthropic: { citations: e.citations } },
                          }),
                        });
                        break;
                      case `reasoning`:
                        n.enqueue({ type: `reasoning-end`, id: String(r.index) });
                        break;
                      case `tool-call`:
                        if (!(o && e.toolName === `json`)) {
                          n.enqueue({ type: `tool-input-end`, id: e.toolCallId });
                          let t = e.input === `` ? `{}` : e.input;
                          if (e.providerToolName === `code_execution`)
                            try {
                              let e = R(t);
                              typeof e == `object` &&
                                e &&
                                `code` in e &&
                                !(`type` in e) &&
                                (t = JSON.stringify({ type: `programmatic-tool-call`, ...e }));
                            } catch {}
                          n.enqueue({
                            type: `tool-call`,
                            toolCallId: e.toolCallId,
                            toolName: e.toolName,
                            input: t,
                            providerExecuted: e.providerExecuted,
                            ...(d && e.providerToolName === `code_execution`
                              ? { dynamic: !0 }
                              : {}),
                            ...(e.caller && {
                              providerMetadata: { anthropic: { caller: e.caller } },
                            }),
                          });
                        }
                        break;
                    }
                    delete _[r.index];
                  }
                  D = void 0;
                  return;
                case `content_block_delta`: {
                  let e = r.delta.type;
                  switch (e) {
                    case `text_delta`:
                      if (o) return;
                      n.enqueue({ type: `text-delta`, id: String(r.index), delta: r.delta.text });
                      return;
                    case `thinking_delta`:
                      n.enqueue({
                        type: `reasoning-delta`,
                        id: String(r.index),
                        delta: r.delta.thinking,
                      });
                      return;
                    case `signature_delta`:
                      D === `thinking` &&
                        n.enqueue({
                          type: `reasoning-delta`,
                          id: String(r.index),
                          delta: ``,
                          providerMetadata: { anthropic: { signature: r.delta.signature } },
                        });
                      return;
                    case `compaction_delta`:
                      r.delta.content != null &&
                        n.enqueue({
                          type: `text-delta`,
                          id: String(r.index),
                          delta: r.delta.content,
                        });
                      return;
                    case `input_json_delta`: {
                      let e = _[r.index],
                        t = r.delta.partial_json;
                      if (t.length === 0) return;
                      if (E) {
                        if (e?.type !== `text`) return;
                        n.enqueue({ type: `text-delta`, id: String(r.index), delta: t });
                      } else {
                        if (e?.type !== `tool-call`) return;
                        (e.firstDelta &&
                          e.providerToolInputType != null &&
                          (t = `{"type": "${e.providerToolInputType}",${t.substring(1)}`),
                          n.enqueue({ type: `tool-input-delta`, id: e.toolCallId, delta: t }),
                          (e.input += t),
                          (e.firstDelta = !1));
                      }
                      return;
                    }
                    case `citations_delta`: {
                      let e = r.delta.citation,
                        t = _[r.index];
                      t?.type === `text` &&
                        e.type === `web_search_result_location` &&
                        t.citations.push(e);
                      let i = lt(e, u, O);
                      i && n.enqueue(i);
                      return;
                    }
                    default:
                      throw Error(`Unsupported delta type: ${e}`);
                  }
                }
                case `message_start`:
                  if (
                    ((g.input_tokens = r.message.usage.input_tokens),
                    (g.cache_read_input_tokens = r.message.usage.cache_read_input_tokens ?? 0),
                    (g.cache_creation_input_tokens =
                      r.message.usage.cache_creation_input_tokens ?? 0),
                    (x = { ...r.message.usage }),
                    r.message.container != null &&
                      (w = {
                        expiresAt: r.message.container.expires_at,
                        id: r.message.container.id,
                        skills: null,
                      }),
                    r.message.stop_reason != null &&
                      (h = {
                        unified: et({
                          finishReason: r.message.stop_reason,
                          isJsonResponseFromTool: E,
                        }),
                        raw: r.message.stop_reason,
                      }),
                    n.enqueue({
                      type: `response-metadata`,
                      id: r.message.id ?? void 0,
                      modelId: r.message.model ?? void 0,
                    }),
                    r.message.content != null)
                  )
                    for (let e = 0; e < r.message.content.length; e++) {
                      let t = r.message.content[e];
                      if (t.type === `tool_use`) {
                        let e = t.caller,
                          r = e
                            ? { type: e.type, toolId: `tool_id` in e ? e.tool_id : void 0 }
                            : void 0;
                        n.enqueue({ type: `tool-input-start`, id: t.id, toolName: t.name });
                        let i = JSON.stringify(t.input ?? {});
                        (n.enqueue({ type: `tool-input-delta`, id: t.id, delta: i }),
                          n.enqueue({ type: `tool-input-end`, id: t.id }),
                          n.enqueue({
                            type: `tool-call`,
                            toolCallId: t.id,
                            toolName: t.name,
                            input: i,
                            ...(r && { providerMetadata: { anthropic: { caller: r } } }),
                          }));
                      }
                    }
                  return;
                case `message_delta`:
                  (r.usage.input_tokens != null &&
                    g.input_tokens !== r.usage.input_tokens &&
                    (g.input_tokens = r.usage.input_tokens),
                    (g.output_tokens = r.usage.output_tokens),
                    r.usage.cache_read_input_tokens != null &&
                      (g.cache_read_input_tokens = r.usage.cache_read_input_tokens),
                    r.usage.cache_creation_input_tokens != null &&
                      (g.cache_creation_input_tokens = r.usage.cache_creation_input_tokens),
                    r.usage.iterations != null && (g.iterations = r.usage.iterations),
                    (h = {
                      unified: et({ finishReason: r.delta.stop_reason, isJsonResponseFromTool: E }),
                      raw: r.delta.stop_reason ?? void 0,
                    }),
                    (S = r.delta.stop_sequence ?? null),
                    (C = ht(r.delta.stop_details)),
                    (w =
                      r.delta.container == null
                        ? null
                        : {
                            expiresAt: r.delta.container.expires_at,
                            id: r.delta.container.id,
                            skills:
                              r.delta.container.skills?.map((e) => ({
                                type: e.type,
                                skillId: e.skill_id,
                                version: e.version,
                              })) ?? null,
                          }),
                    r.context_management && (b = mt(r.context_management)),
                    (x = { ...x, ...r.usage }));
                  return;
                case `message_stop`: {
                  let e = {
                      usage: x ?? null,
                      stopSequence: S,
                      ...(C == null ? {} : { stopDetails: C }),
                      iterations: g.iterations
                        ? g.iterations.map((e) => ({
                            type: e.type,
                            ...(e.model == null ? {} : { model: e.model }),
                            inputTokens: e.input_tokens,
                            outputTokens: e.output_tokens,
                            ...(e.cache_creation_input_tokens
                              ? { cacheCreationInputTokens: e.cache_creation_input_tokens }
                              : {}),
                            ...(e.cache_read_input_tokens
                              ? { cacheReadInputTokens: e.cache_read_input_tokens }
                              : {}),
                          }))
                        : null,
                      container: w,
                      contextManagement: b,
                    },
                    t = { anthropic: e };
                  (l && c !== `anthropic` && (t[c] = e),
                    n.enqueue({
                      type: `finish`,
                      finishReason: h,
                      usage: Fe({ usage: g, rawUsage: x }),
                      providerMetadata: t,
                    }));
                  return;
                }
                case `error`:
                  n.enqueue({ type: `error`, error: r.error });
                  return;
                default:
                  throw Error(`Unsupported chunk type: ${r}`);
              }
            },
          }),
        )
        .tee(),
      j = k.getReader();
    try {
      await j.read();
      let t = await j.read();
      if ((t.value?.type === `raw` && (t = await j.read()), t.value?.type === `error`)) {
        let r = t.value.error;
        throw new e({
          message: r.message,
          url: f,
          requestBodyValues: n,
          statusCode: r.type === `overloaded_error` ? 529 : 500,
          responseHeaders: p,
          responseBody: JSON.stringify(r),
          isRetryable: r.type === `overloaded_error`,
        });
      }
    } finally {
      (j.cancel().catch(() => {}), j.releaseLock());
    }
    return { stream: A, request: { body: n }, response: { headers: p } };
  }
};
function dt(e) {
  return e.includes(`claude-opus-4-8`) ||
    e.includes(`claude-opus-4-7`) ||
    e.includes(`claude-fable-5`) ||
    e.includes(`claude-sonnet-5`)
    ? {
        maxOutputTokens: 128e3,
        supportsStructuredOutput: !0,
        supportsAdaptiveThinking: !0,
        rejectsSamplingParameters: !0,
        supportsXhighEffort: !0,
        isKnownModel: !0,
      }
    : e.includes(`claude-sonnet-4-6`) || e.includes(`claude-opus-4-6`)
      ? {
          maxOutputTokens: 128e3,
          supportsStructuredOutput: !0,
          supportsAdaptiveThinking: !0,
          rejectsSamplingParameters: !1,
          supportsXhighEffort: !1,
          isKnownModel: !0,
        }
      : e.includes(`claude-sonnet-4-5`) ||
          e.includes(`claude-opus-4-5`) ||
          e.includes(`claude-haiku-4-5`)
        ? {
            maxOutputTokens: 64e3,
            supportsStructuredOutput: !0,
            supportsAdaptiveThinking: !1,
            rejectsSamplingParameters: !1,
            supportsXhighEffort: !1,
            isKnownModel: !0,
          }
        : e.includes(`claude-opus-4-1`)
          ? {
              maxOutputTokens: 32e3,
              supportsStructuredOutput: !0,
              supportsAdaptiveThinking: !1,
              rejectsSamplingParameters: !1,
              supportsXhighEffort: !1,
              isKnownModel: !0,
            }
          : e.includes(`claude-sonnet-4-`)
            ? {
                maxOutputTokens: 64e3,
                supportsStructuredOutput: !1,
                supportsAdaptiveThinking: !1,
                rejectsSamplingParameters: !1,
                supportsXhighEffort: !1,
                isKnownModel: !0,
              }
            : e.includes(`claude-opus-4-`)
              ? {
                  maxOutputTokens: 32e3,
                  supportsStructuredOutput: !1,
                  supportsAdaptiveThinking: !1,
                  rejectsSamplingParameters: !1,
                  supportsXhighEffort: !1,
                  isKnownModel: !0,
                }
              : e.includes(`claude-3-haiku`)
                ? {
                    maxOutputTokens: 4096,
                    supportsStructuredOutput: !1,
                    supportsAdaptiveThinking: !1,
                    rejectsSamplingParameters: !1,
                    supportsXhighEffort: !1,
                    isKnownModel: !0,
                  }
                : {
                    maxOutputTokens: 4096,
                    supportsStructuredOutput: !1,
                    supportsAdaptiveThinking: !1,
                    rejectsSamplingParameters: !1,
                    supportsXhighEffort: !1,
                    isKnownModel: !1,
                  };
}
function ft(e) {
  if (!e) return !1;
  let t = !1,
    n = !1;
  for (let r of e) {
    if (`type` in r && (r.type === `web_fetch_20260209` || r.type === `web_search_20260209`)) {
      t = !0;
      continue;
    }
    if (r.name === `code_execution`) {
      n = !0;
      break;
    }
  }
  return t && !n;
}
function pt({
  reasoning: e,
  supportsAdaptiveThinking: t,
  supportsXhighEffort: n,
  maxOutputTokensForModel: r,
  warnings: i,
}) {
  if (!o(e)) return;
  if (e === `none`) return { thinking: { type: `disabled` } };
  if (t)
    return {
      thinking: { type: `adaptive` },
      effort: s({
        reasoning: e,
        effortMap: {
          minimal: `low`,
          low: `low`,
          medium: `medium`,
          high: `high`,
          xhigh: n ? `xhigh` : `max`,
        },
        warnings: i,
      }),
    };
  let a = p({ reasoning: e, maxOutputTokens: r, maxReasoningBudget: r, warnings: i });
  if (a != null) return { thinking: { type: `enabled`, budgetTokens: a } };
}
function mt(e) {
  return e
    ? {
        appliedEdits: e.applied_edits
          .map((e) => {
            switch (e.type) {
              case `clear_tool_uses_20250919`:
                return {
                  type: e.type,
                  clearedToolUses: e.cleared_tool_uses,
                  clearedInputTokens: e.cleared_input_tokens,
                };
              case `clear_thinking_20251015`:
                return {
                  type: e.type,
                  clearedThinkingTurns: e.cleared_thinking_turns,
                  clearedInputTokens: e.cleared_input_tokens,
                };
              case `compact_20260112`:
                return { type: e.type };
            }
          })
          .filter((e) => e !== void 0),
      }
    : null;
}
function ht(e) {
  if (e != null)
    return {
      type: e.type,
      ...(e.category == null ? {} : { category: e.category }),
      ...(e.explanation == null ? {} : { explanation: e.explanation }),
      ...(e.recommended_model == null ? {} : { recommendedModel: e.recommended_model }),
    };
}
var gt = N({
  id: `anthropic.bash_20241022`,
  inputSchema: M(() => P(G({ command: Y(), restart: O().optional() }))),
});
function _t(e = {}) {
  let { execute: t, ...n } = e;
  return gt(
    t === void 0
      ? {
          ...n,
          execute: async ({ command: e }, { abortSignal: t, experimental_sandbox: n }) => {
            if (!n) throw Error(`Sandbox session is not available`);
            return await n.run({ command: e, abortSignal: t });
          },
        }
      : { ...n, ...(t === null ? {} : { execute: t }) },
  );
}
var vt = N({
  id: `anthropic.bash_20250124`,
  inputSchema: M(() => P(G({ command: Y(), restart: O().optional() }))),
});
function yt(e = {}) {
  let { execute: t, ...n } = e;
  return vt(
    t === void 0
      ? {
          ...n,
          execute: async ({ command: e }, { abortSignal: t, experimental_sandbox: n }) => {
            if (!n) throw Error(`Sandbox session is not available`);
            return await n.run({ command: e, abortSignal: t });
          },
        }
      : { ...n, ...(t === null ? {} : { execute: t }) },
  );
}
var bt = N({
    id: `anthropic.computer_20241022`,
    inputSchema: M(() =>
      P(
        G({
          action: H([
            `key`,
            `type`,
            `mouse_move`,
            `left_click`,
            `left_click_drag`,
            `right_click`,
            `middle_click`,
            `double_click`,
            `screenshot`,
            `cursor_position`,
          ]),
          coordinate: W(S().int()).optional(),
          text: Y().optional(),
        }),
      ),
    ),
  }),
  xt = N({
    id: `anthropic.computer_20250124`,
    inputSchema: M(() =>
      P(
        G({
          action: H([
            `key`,
            `hold_key`,
            `type`,
            `cursor_position`,
            `mouse_move`,
            `left_mouse_down`,
            `left_mouse_up`,
            `left_click`,
            `left_click_drag`,
            `right_click`,
            `middle_click`,
            `double_click`,
            `triple_click`,
            `scroll`,
            `wait`,
            `screenshot`,
          ]),
          coordinate: _([S().int(), S().int()]).optional(),
          duration: S().optional(),
          scroll_amount: S().optional(),
          scroll_direction: H([`up`, `down`, `left`, `right`]).optional(),
          start_coordinate: _([S().int(), S().int()]).optional(),
          text: Y().optional(),
        }),
      ),
    ),
  }),
  St = N({
    id: `anthropic.computer_20251124`,
    inputSchema: M(() =>
      P(
        G({
          action: H([
            `key`,
            `hold_key`,
            `type`,
            `cursor_position`,
            `mouse_move`,
            `left_mouse_down`,
            `left_mouse_up`,
            `left_click`,
            `left_click_drag`,
            `right_click`,
            `middle_click`,
            `double_click`,
            `triple_click`,
            `scroll`,
            `wait`,
            `screenshot`,
            `zoom`,
          ]),
          coordinate: _([S().int(), S().int()]).optional(),
          duration: S().optional(),
          region: _([S().int(), S().int(), S().int(), S().int()]).optional(),
          scroll_amount: S().optional(),
          scroll_direction: H([`up`, `down`, `left`, `right`]).optional(),
          start_coordinate: _([S().int(), S().int()]).optional(),
          text: Y().optional(),
        }),
      ),
    ),
  }),
  Ct = N({
    id: `anthropic.memory_20250818`,
    inputSchema: M(() =>
      P(
        L(`command`, [
          G({ command: j(`view`), path: Y(), view_range: _([S(), S()]).optional() }),
          G({ command: j(`create`), path: Y(), file_text: Y() }),
          G({ command: j(`str_replace`), path: Y(), old_str: Y(), new_str: Y() }),
          G({ command: j(`insert`), path: Y(), insert_line: S(), insert_text: Y() }),
          G({ command: j(`delete`), path: Y() }),
          G({ command: j(`rename`), old_path: Y(), new_path: Y() }),
        ]),
      ),
    ),
  }),
  wt = N({
    id: `anthropic.text_editor_20241022`,
    inputSchema: M(() =>
      P(
        G({
          command: H([`view`, `create`, `str_replace`, `insert`, `undo_edit`]),
          path: Y(),
          file_text: Y().optional(),
          insert_line: S().int().optional(),
          new_str: Y().optional(),
          insert_text: Y().optional(),
          old_str: Y().optional(),
          view_range: W(S().int()).optional(),
        }),
      ),
    ),
  }),
  Tt = N({
    id: `anthropic.text_editor_20250124`,
    inputSchema: M(() =>
      P(
        G({
          command: H([`view`, `create`, `str_replace`, `insert`, `undo_edit`]),
          path: Y(),
          file_text: Y().optional(),
          insert_line: S().int().optional(),
          new_str: Y().optional(),
          insert_text: Y().optional(),
          old_str: Y().optional(),
          view_range: W(S().int()).optional(),
        }),
      ),
    ),
  }),
  Et = N({
    id: `anthropic.text_editor_20250429`,
    inputSchema: M(() =>
      P(
        G({
          command: H([`view`, `create`, `str_replace`, `insert`]),
          path: Y(),
          file_text: Y().optional(),
          insert_line: S().int().optional(),
          new_str: Y().optional(),
          insert_text: Y().optional(),
          old_str: Y().optional(),
          view_range: W(S().int()).optional(),
        }),
      ),
    ),
  }),
  Dt = M(() => P(W(G({ type: j(`tool_reference`), toolName: Y() })))),
  Ot = k({
    id: `anthropic.tool_search_bm25_20251119`,
    inputSchema: M(() => P(G({ query: Y(), limit: S().optional() }))),
    outputSchema: Dt,
    supportsDeferredResults: !0,
  }),
  kt = {
    advisor_20260301: me,
    bash_20241022: _t,
    bash_20250124: yt,
    codeExecution_20250522: Re,
    codeExecution_20250825: Ve,
    codeExecution_20260120: We,
    computer_20241022: bt,
    computer_20250124: xt,
    computer_20251124: St,
    memory_20250818: Ct,
    textEditor_20241022: wt,
    textEditor_20250124: Tt,
    textEditor_20250429: Et,
    textEditor_20250728: _e,
    webFetch_20250910: Ne,
    webFetch_20260209: ke,
    webSearch_20250305: Te,
    webSearch_20260209: xe,
    toolSearchRegex_20251119: qe,
    toolSearchBm25_20251119: (e = {}) => Ot(e),
  },
  At = M(() =>
    P(
      G({
        id: Y(),
        display_title: Y().nullish(),
        name: Y().nullish(),
        description: Y().nullish(),
        latest_version: Y().nullish(),
        source: Y(),
        created_at: Y(),
        updated_at: Y(),
      }),
    ),
  );
M(() => P(G({ data: W(G({ version: Y() })) })));
var jt = M(() =>
    P(G({ type: Y(), skill_id: Y(), name: Y().nullish(), description: Y().nullish() })),
  ),
  Mt = class {
    constructor(e) {
      ((this.config = e), (this.specificationVersion = `v4`));
    }
    get provider() {
      return this.config.provider;
    }
    async getHeaders() {
      return z(await y(this.config.headers), { "anthropic-beta": `skills-2025-10-02` });
    }
    async fetchVersionMetadata({ skillId: e, version: t, headers: n }) {
      let { value: r } = await g({
        url: `${this.config.baseURL}/skills/${e}/versions/${t}`,
        validateUrl: !1,
        headers: n,
        failedResponseHandler: Z,
        successfulResponseHandler: I(jt),
        fetch: this.config.fetch,
      });
      return {
        ...(r.name == null ? {} : { name: r.name }),
        ...(r.description == null ? {} : { description: r.description }),
      };
    }
    async uploadSkill(e) {
      let t = [],
        n = new FormData();
      e.displayTitle != null && n.append(`display_title`, e.displayTitle);
      for (let t of e.files) {
        let e = F(t.data);
        n.append(`files[]`, new Blob([e]), t.path);
      }
      let r = await this.getHeaders(),
        { value: i } = await X({
          url: `${this.config.baseURL}/skills`,
          headers: r,
          formData: n,
          failedResponseHandler: Z,
          successfulResponseHandler: I(At),
          fetch: this.config.fetch,
        }),
        a =
          i.latest_version == null
            ? {}
            : await this.fetchVersionMetadata({
                skillId: i.id,
                version: i.latest_version,
                headers: r,
              }),
        o = a.name ?? i.name,
        s = a.description ?? i.description;
      return {
        providerReference: { anthropic: i.id },
        ...(i.display_title == null ? {} : { displayTitle: i.display_title }),
        ...(o == null ? {} : { name: o }),
        ...(s == null ? {} : { description: s }),
        ...(i.latest_version == null ? {} : { latestVersion: i.latest_version }),
        providerMetadata: {
          anthropic: {
            ...(i.source == null ? {} : { source: i.source }),
            ...(i.created_at == null ? {} : { createdAt: i.created_at }),
            ...(i.updated_at == null ? {} : { updatedAt: i.updated_at }),
          },
        },
        warnings: t,
      };
    }
  },
  Nt = `4.0.18`,
  Pt = `https://api.anthropic.com`,
  Ft = `${Pt}/v1`;
function It(e) {
  let t = U(b(e));
  return t === Pt ? Ft : t;
}
function Lt(e = {}) {
  let r = It(d({ settingValue: e.baseURL, environmentVariableName: `ANTHROPIC_BASE_URL` })) ?? Ft,
    i = e.name ?? `anthropic.messages`;
  if (e.apiKey && e.authToken)
    throw new t({
      argument: `apiKey/authToken`,
      message: `Both apiKey and authToken were provided. Please use only one authentication method.`,
    });
  let a = () =>
      E(
        {
          "anthropic-version": `2023-06-01`,
          ...(e.authToken
            ? { Authorization: `Bearer ${e.authToken}` }
            : {
                "x-api-key": u({
                  apiKey: e.apiKey,
                  environmentVariableName: `ANTHROPIC_API_KEY`,
                  description: `Anthropic`,
                }),
              }),
          ...e.headers,
        },
        `ai-sdk/anthropic/${Nt}`,
      ),
    o = (t) =>
      new ut(t, {
        provider: i,
        baseURL: r,
        headers: a,
        fetch: e.fetch,
        generateId: e.generateId ?? J,
        supportedUrls: () => ({
          "image/*": [/^https?:\/\/.*$/],
          "application/pdf": [/^https?:\/\/.*$/],
        }),
      }),
    s = () =>
      new Mt({
        provider: `${i.replace(`.messages`, ``)}.skills`,
        baseURL: r,
        headers: a,
        fetch: e.fetch,
      }),
    c = function (e) {
      if (new.target)
        throw Error(`The Anthropic model function cannot be called with the new keyword.`);
      return o(e);
    };
  return (
    (c.specificationVersion = `v4`),
    (c.languageModel = o),
    (c.chat = o),
    (c.messages = o),
    (c.embeddingModel = (e) => {
      throw new n({ modelId: e, modelType: `embeddingModel` });
    }),
    (c.textEmbeddingModel = c.embeddingModel),
    (c.imageModel = (e) => {
      throw new n({ modelId: e, modelType: `imageModel` });
    }),
    (c.files = () => new ne({ provider: i, baseURL: r, headers: a, fetch: e.fetch })),
    (c.skills = s),
    (c.tools = kt),
    c
  );
}
var Rt = Lt();
function zt({ steps: e }) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t].providerMetadata?.anthropic?.container?.id;
    if (n) return { providerOptions: { anthropic: { container: { id: n } } } };
  }
}
export {
  Nt as VERSION,
  Rt as anthropic,
  Lt as createAnthropic,
  zt as forwardAnthropicContainerIdFromLastStep,
};
