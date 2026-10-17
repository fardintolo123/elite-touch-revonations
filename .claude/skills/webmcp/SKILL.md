---
name: webmcp
description: Evaluate, design, implement, test, debug, or maintain WebMCP tools in a web application. Use when a task exposes site capabilities to browser agents through the WebMCP APIs.
---

# WebMCP development

Use this skill when a site needs structured tools that let an agent help a user complete a real task. WebMCP is a progressive enhancement; preserve the normal user workflow when the API or agent is unavailable.

## Start with a use case

1. Read the current official documentation linked below. WebMCP is an evolving proposal; verify API names, browser support, rollout, and examples at task time.
2. Identify the user goal, page state, required information, permissions, and what the agent must not do. Simulate the end-to-end conversation and check whether a tool materially improves it over accessible HTML and ordinary browser interaction.
3. If the use case is weak, redundant, or unsupported by an available agent, recommend no integration. Do not claim SEO, conversion, or business gains without measured evidence.
4. Choose the smallest set of distinct tools. Prefer one clear operation per tool, names that say what happens, concise descriptions, and inputs that accept user language where practical.

## Choose an API

- Prefer the **Declarative API** for an existing standard HTML form when its semantics and behavior meet the user need.
- Prefer the **Imperative API** for application actions, dynamic state, non-form workflows, or when explicit execution and structured outputs are needed.
- Keep ordinary controls and server behavior usable without WebMCP. Avoid introducing a dependency or making all users pay for agent-only code unless the project has justified it.
- In React/Next.js, tie dynamic tool registration to a client component's lifecycle and unregister on cleanup with the documented `AbortSignal` pattern. For stable tools, register once at the narrowest appropriate lifetime. Do not copy inline-head registration patterns blindly; choose based on the framework render lifecycle and the consuming agent's discovery timing.
- Add TypeScript declarations for experimental browser APIs locally or use an official/current type package only after checking its maintenance and compatibility. Guard the API at runtime; typings do not provide browser support.

## Define and execute tools safely

- Give each tool a clear name, a specific description, a JSON Schema input, and a predictable, compact output. Keep tool and parameter names under 30 characters, descriptions under 500 characters, parameter descriptions under 150 characters, and each output near or below 1,500 characters when practical. These are current Chrome security recommendations; re-check them.
- Use schema constraints to guide calls, then validate again in application code and on the server. Reject unknown fields, malformed values, invalid state, and out-of-range data with actionable errors. Never trust client-side validation or an annotation as authorization.
- Return structured data the agent needs for the next step; cap result counts and support filtering or pagination for collections.
- Make read/write behavior explicit. Use `readOnlyHint` for reads, `untrustedContentHint` when returning user-generated or external data, and `consequentialHint` for significant actions. Hints inform clients; they do not enforce access controls.
- Preserve authentication, authorization, ownership checks, CSRF protections, rate limits, consent, and server-side business rules. A browser tool runs in a page that browser agents or extensions can inspect and invoke. Do not expose secrets or private records. Limit cross-origin exposure to explicitly trusted secure origins; do not use CORS as an access-control mechanism.
- For meaningful writes, require clear user intent and confirmation at the appropriate point. Keep a visible, understandable result in the interface. Do not let a tool silently purchase, send, delete, publish, or submit on behalf of a user when the product requires confirmation.
- Pass execution cancellation signals to long-running work when supported. Make cancellation safe and avoid leaving partial state.
- Handle registration and execution failures visibly to developers and recoverably for users. Do not silently swallow failed registration or return raw internal exceptions.

## Framework and compatibility

- Read the project's own framework instructions and use its existing data, auth, validation, and UI patterns.
- Treat WebMCP as optional. Feature-detect the documented API and provide an ordinary browser path; do not assume every browser or agent supports the same API or invokes it.
- Do not mirror APIs across `document` and `navigator`, add polyfills, or use undocumented fallback methods unless a named target client requires them and each path has a real compatibility test.
- Check the current Permissions Policy behavior. Cross-origin frames require the documented `tools` permission delegation and explicit origin exposure where applicable.

## Test and maintain

1. Add deterministic tests for schema validation, permissions, server authorization, state transitions, output shape, error recovery, and cancellation as relevant.
2. In a supported browser, inspect discovery with `document.modelContext.getTools()`, validate schemas, invoke tools for realistic user journeys, and confirm UI state updates. Use the current Chrome flag, origin trial, DevTools, or official inspector documented for the task; distinguish local-only tests from public availability.
3. Test a browser without WebMCP and confirm ordinary navigation and forms still work.
4. Test invalid inputs, unauthenticated and unauthorized calls, repeated calls, empty results, stale page state, and rejected registration. For write tools, test that confirmation and server-side checks cannot be bypassed by calling the handler directly.
5. Audit outputs for private data, injected/untrusted content, excessive size, and accidental side effects. Keep telemetry minimal and avoid logging sensitive arguments.
6. Revisit the official docs and implementation-status pages when the browser or framework version changes. Update the tests when the API lifecycle, schema behavior, or rollout changes.

## Current official references

- [WebMCP overview](https://developer.chrome.com/docs/ai/webmcp)
- [Imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api)
- [Declarative API](https://developer.chrome.com/docs/ai/webmcp/declarative-api)
- [Tool security](https://developer.chrome.com/docs/ai/webmcp/secure-tools)
- [Best practices](https://developer.chrome.com/docs/ai/webmcp/best-practices)
- [Designing agentic workflows](https://developer.chrome.com/docs/ai/webmcp/build-tools)
- [Chrome Status](https://chromestatus.com/feature/5117755740913664)

At creation on 17 October 2026, Chrome's overview described WebMCP as a proposed standard, invited developers to an origin trial from Chrome 149, and documented a local testing flag. Verify current status before relying on these details.
