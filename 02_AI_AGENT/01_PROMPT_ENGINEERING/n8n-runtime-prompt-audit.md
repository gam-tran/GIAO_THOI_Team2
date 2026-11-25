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
