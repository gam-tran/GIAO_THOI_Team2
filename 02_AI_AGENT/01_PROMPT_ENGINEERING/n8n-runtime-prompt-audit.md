# n8n Runtime Prompt Audit — Three AI Workflows

## Scope and evidence

This review covers the three JSON exports supplied for:
- GIAO THỜI - AI Assistant API
- GIAO THỜI - Campaign Planner API
- GIAO THOI - Content Studio API

It is a static review of exported node parameters, code and connections. It does not verify current n8n deployment, execution history, webhook authentication, credential permissions or production behavior.

## Comparison

| Dimension | AI Assistant | Campaign Planner | Content Studio |
|---|---|---|---|
| Role | GIAO THỜI Marketing Assistant | Marketing strategy and campaign planner | Marketing Content Specialist |
| Main purpose | General Marketing/brand/content/business support | Build a complete campaign plan | Generate requested marketing content |
| Product source | GitHub `products.ts` | GitHub `products.ts` | GitHub `products.ts` |
| Brand source | Product Marketing Context Markdown | Same | Same |
| Conversation history | Last 12 valid user/assistant messages | No conversation history handling shown | No conversation history handling shown |
| Model explicitly named | No | No | `gemini-3.1-flash-lite` |
| Prompt construction | Code node | Code node | Code node |
| LLM input | `$json.prompt` | `$json.prompt` | `$json.prompt` |
| Export active flag | true | true | true |

## Shared architecture

All three workflows fetch product data and brand context from the source repository branch `feature/ga4-ai-agent`, then inject those contents into a prompt built in a Code node. Each uses an n8n LangChain LLM chain with `promptType: define` and the generated prompt as text.

The exports show no separate Skills-loading node, explicit conversation memory node, or agent tool-calling node in these three workflows. This statement applies only to these three exported workflows, not necessarily to other workflows or the separate Agent Builder.

## Main findings

### 1. The three prompts are separate execution-layer prompts

Do not collapse them into one prompt:
- AI Assistant is a conversational general-purpose Marketing assistant.
- Campaign Planner is a structured planning prompt with campaign brief fields and seven required plan sections.
- Content Studio is a content-generation prompt with platform, format, objective and tone fields.

The central Agent Builder Instructions should define shared identity, boundaries and routing. The workflow-specific prompts should retain task-specific input fields, output structure and constraints.

### 2. Model configuration is inconsistent or incomplete in exports

- Content Studio explicitly names `models/gemini-3.1-flash-lite`.
- AI Assistant and Campaign Planner model nodes show empty `options` and no explicit `modelName`.
- Do not claim all three use the same explicit model based only on these JSON files. Inspect the deployed n8n node configuration/credentials or execute a test to confirm.

### 3. Input validation differs

- AI Assistant validates that messages is a non-empty array and retains only valid user/assistant messages, capped at 12.
- Content Studio applies defaults for product, platform, content type, objective and tone.
- Campaign Planner directly interpolates fields and calls `request.channels.join(', ')`; missing or non-array `channels` can throw. Required fields are not validated in the shown prompt builder.

### 4. Product and brand data are dynamically fetched

The prompts do not contain a frozen product catalog or fixed Brand Knowledge. They fetch source files at runtime from GitHub raw URLs. Therefore the exact prompt context depends on the version/content available at execution time. The exported JSON does not snapshot the fetched source contents.

### 5. Important brand guardrails already present

Across the workflows:
- GIAO THỜI is described as a distributor, not a manufacturer.
- Product facts must not be invented.
- Missing information should be stated or treated as an assumption.
- Campaign KPIs should not be presented as actual results without evidence.
- Content Studio prohibits unsupported claims about product attributes, price, reviews and customer policies.

### 6. Operational constraints need to be aligned

The current Content Studio prompt does not include the Facebook media constraint that a single post cannot contain both images and video. If this remains a product requirement, add it to the central shared rules and the Content Studio-specific prompt, and enforce it in UI/workflow validation. Do not silently split a mixed-media request into two posts.

## Recommended prompt architecture

### Layer A — Central Agent Instructions

Own:
- Agent identity and business context.
- Shared brand facts and non-negotiable guardrails.
- Truthfulness, evidence and uncertainty rules.
- Permission boundaries and human approval.
- Task classification and routing to the correct workflow/skill.
- Shared writing and communication style.

### Layer B — Workflow-specific prompts

Own:
- Workflow role and task objective.
- Input variable mapping and defaults.
- Required output sections/schema.
- Task-specific rules (e.g. channel restriction, budget arithmetic, product lookup).
- Error and missing-input handling.

### Layer C — Skills and reference documents

Own reusable, detailed domain methods:
- Content strategy, social content, copywriting, marketing ideas, campaign planning, analytics tracking.
- Product Marketing Context and verified product information.

A reference file being present in Git does not by itself prove that a runtime workflow or Agent Builder has loaded it.

## Recommended test matrix

| Test ID | Workflow | Test | Expected behavior |
|---|---|---|---|
| PA-01 | AI Assistant | Ask for unsupported product price | State price is not available; do not invent |
| PA-02 | AI Assistant | Send more than 12 conversation messages | Use only the last 12 valid messages |
| PA-03 | AI Assistant | Include invalid roles/empty content | Ignore invalid entries; fail clearly if none remain |
| CP-01 | Campaign Planner | Omit channels | Return `INVALID_CAMPAIGN_INPUT` with a clear validation error; do not crash unexpectedly |
| CP-06 | Campaign Planner | `channels` is a string/null/contains non-string items | Return a clear validation error before prompt construction |
| CP-02 | Campaign Planner | Provide budget and several channels | Allocation sums exactly to provided budget |
| CP-03 | Campaign Planner | Provide selected channels | Do not add channels not selected |
| CP-04 | Campaign Planner | No historical performance data | Label KPI values as proposed targets, not actual results |
| CS-01 | Content Studio | Request product absent from product source | Explain no matching product was found; do not fabricate |
| CS-02 | Content Studio | Omit optional request fields | Apply documented defaults |
| CS-03 | Content Studio | Ask for unsupported delivery/warranty policy | Ask for confirmation or state source does not provide it |
| CS-04 | Content Studio | Request both image and video in one Facebook post | Reject mixed format, explain constraint, do not split into two posts |
| CS-05 | Content Studio | Empty/unavailable product source | Do not write factual product claims from missing source data |

## Completion status

- [x] Three supplied workflow exports inspected.
- [x] Runtime prompt templates transcribed into separate documents.
- [x] Input variables, defaults and source mappings documented.
- [x] Static cross-workflow comparison and issue list created.
- [x] Document Facebook mixed-media rule in Content Studio runtime prompt.
- [x] Document Campaign Planner input-validation patch and expected error contract.
- [ ] Implement the validation and media guardrails in the deployed frontend/n8n workflows.
- [ ] Compare with currently deployed n8n workflow configuration.
- [ ] Confirm exact model selection for AI Assistant and Campaign Planner.
- [ ] Execute test matrix against deployed workflows.
- [ ] Compare Agent Builder Skills/Tools and central Instructions with the runtime architecture.

**Overall:** prompt extraction and static documentation are complete for these three supplied workflows. Two gaps now have explicit remediation specifications in Git, but the actual frontend/n8n implementation and end-to-end runtime tests remain outstanding.


## Agent Builder review — screenshot and pasted Instructions (25/11/2026)

### Observed configuration

| Item | Observed | Confidence / limitation |
|---|---|---|
| Agent model | `gemini-3.1-flash-lite` | Visible in supplied screenshot |
| Skills | Empty; UI shows `Add skill` | Visible in supplied screenshot; no Skills are currently attached in this view |
| Trigger | `n8n Chat` | Visible in supplied screenshot |
| Tools | `16 HTTP Request` and `Google analytics` | Visible in supplied screenshot; individual HTTP endpoints and GA4 schema were not exposed |
| Web search | Off | Visible in supplied screenshot |

### Findings in the pasted 1,927-line Instructions

1. Multiple overlapping top-level identities/modules exist: Marketing Analytics Agent, Marketing Insights, Marketing Orchestration System, Content Studio, Campaign Planner, Advanced Marketing Insights, Dashboard, Analytics, Brand Library and AI Assistant.
2. GA4 field scope conflicts. The opening section lists 3 Metrics (`activeUsers`, `sessions`, `screenPageViews`) and 2 Dimensions (`date`, `sessionDefaultChannelGroup`), while later Analytics/Dashboard sections expand to 9 Metrics and 4 Dimensions. Actual Tool schema was not supplied, so the central prompt conservatively keeps the initial 3/2 list as the documented baseline and says the live Tool schema is authoritative.
3. Tool-calling rules conflict: one section says a combined marketing report should use GA4, Product Data and Brand Knowledge, while later sections say to call only necessary tools. Central Instructions now consistently require selective calls.
4. Product Data and Brand Knowledge are described as tools in the pasted Instructions, but the Builder screenshot only exposes 16 HTTP Request and Google analytics. The HTTP endpoints were not inspected; do not claim those requests are Product Data or Brand Knowledge.
5. The pasted Instructions contain detailed UI/module specifications for Dashboard, Analytics and Brand Library. These belong in module/workflow specifications, not the shared central Instructions.
6. The Skills panel is empty, although the pasted prompt names several Skills and References. The prompt now says to use Skills only when actually attached/available and never claim to have read an unavailable Skill.
7. The Builder screenshot confirms model selection, but does not prove runtime behavior or successful tool execution.

### Central Instructions v2.0 changes

- Consolidated the agent into one role and one task-routing process.
- Removed duplicated module-level role definitions from the central prompt.
- Unified tool-selection guidance: call only tools actually available and relevant.
- Added an explicit guard against assuming HTTP Request endpoints are Product/Brand tools.
- Made GA4 schema conservative pending live schema verification; no longer treats the conflicting expanded field list as confirmed.
- Preserved FACT / CALCULATION / INSIGHT / HYPOTHESIS distinctions and anti-fabrication rules.
- Added the Facebook single-post media constraint: multiple images in one album OR one video; never mixed image+video in one post and never auto-split into two posts.
- Kept approval boundaries for publishing, messaging, ads, spending and external changes.

### Remaining implementation and verification

- [ ] Paste/review Central Instructions v2.0 in Agent Builder; no Builder changes were made by this Git commit.
- [ ] Attach the intended Skills and verify their names/versions in Builder.
- [ ] Inspect the 16 HTTP Request configurations and map each endpoint to its actual purpose.
- [ ] Inspect the Google Analytics Tool schema and confirm supported Metrics, Dimensions, date behavior and Property ID.
- [ ] Run test prompts for GA4 aggregation, unsupported metrics, missing product facts, unavailable Skills, Facebook mixed media and action-approval boundaries.
- [ ] Run the three n8n workflow test matrices against deployed workflows.
