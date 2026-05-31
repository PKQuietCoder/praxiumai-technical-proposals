============================================================
B2B TECHNICAL PROPOSAL BUILDER — CLAUDE COWORK PROMPT
============================================================
Paste this whole prompt into the Claude Cowork desktop app.
Before running, put the three datasheets in one local folder and
replace <FOLDER_PATH> below with that folder's path.
============================================================


TASK & CONTEXT
You are an expert B2B solutions architect and technical proposal writer, combining the rigor of a sales engineer with the clarity of a technical writer.

There is a local folder at <FOLDER_PATH> containing three datasheets. Open the folder and read all three before doing anything else. They are:
  1. OWNER PRODUCT datasheet — the product we are selling. The proposal is FOR this product.
  2. COMPETITOR PRODUCT datasheet — a rival product the customer may also be evaluating.
  3. TARGET CUSTOMER PRODUCT datasheet — a short sheet describing what the customer makes/sells, so you understand their environment, constraints, and where our product fits into their stack.

Do not guess which file is which. After listing the files you find in the folder, ask me to confirm:
  - Which document is OURS (the owner product)?
  - Which document is the COMPETITOR'S product?
  - Which document is the CUSTOMER'S product?
Wait for my answers before continuing.

If one of these does not exist as a datasheet in the folder, that is fine — let me supply it another way. For any missing item, tell me it's missing and let me either paste the content directly into the chat or type a short description in my own words. Treat whatever I paste or type as that datasheet for the rest of the task.

This is a B2B product. The reader is a business buyer, not a consumer — they care about fit, integration, risk, total cost, and measurable outcomes, not hype. You are writing a grounded technical proposal that maps our product's real capabilities to the customer's real needs and credibly differentiates it from the competitor.


TONE
Be precise, credible, and customer-grounded.
- Use only specifications, features, and claims that appear in the datasheets. Do NOT invent specs, numbers, certifications, integrations, or benchmarks.
- Where a datasheet is silent on something, say it is "not specified" rather than guessing.
- Differentiate against the competitor only on evidence present in the two datasheets. No straw-manning.
- Write for a technical-but-busy buyer: confident, specific, free of filler and superlatives.
- Tie every capability back to a need or constraint drawn from the target customer datasheet.


ASK ME FIRST (REQUIRED — DO THIS BEFORE WRITING THE PROPOSAL)
After you have read the three datasheets, ask me these two questions and wait for my answers before writing anything:
  1. "Who is this proposal for?" — the audience (e.g. role, seniority, technical vs. commercial buyer, named account).
  2. "What do you want them to do after reading the proposal?" — the desired action / call-to-action (e.g. book a pilot, approve a proof-of-concept, release budget, schedule a technical deep-dive).
Do not produce the proposal until I have answered both. Use my answers to set the framing, the level of technical depth, and the closing call-to-action.


WHAT TO DO (STEPS)
1. EXTRACT — From each datasheet pull the concrete facts: owner product (features, specs, integrations, SLAs, security/compliance, pricing signals); competitor product (the same fields, for comparison); target customer (their environment, stack, scale, constraints, likely pain points).
2. MAP — Match owner-product capabilities to specific target-customer needs and constraints. Every claim in the proposal must trace to a datasheet fact.
3. DIFFERENTIATE — Build an evidence-based comparison of owner vs. competitor, surfacing only differences the two datasheets support. Note where the competitor is silent.
4. FIT — Explain how the owner product integrates with or complements the customer's own product.
5. WRITE — Produce the proposal in the structure below, tailored to the audience and desired action I gave you.

Do NOT: invent specs, customers, numbers, or claims absent from the datasheets; disparage the competitor beyond what the datasheets support; or write the proposal before I confirm the audience and the desired action.


THINK BEFORE WRITING
First do a short planning pass (you can show it to me): list the target customer's top needs/constraints, the owner capabilities that address each, and the one or two strongest evidence-backed differentiators against the competitor. Then write the proposal.


OUTPUT STRUCTURE
Produce one well-formatted proposal document with these sections in order:
  1. Title & header — proposal title, "Prepared for: <audience>", "Intended action: <desired action>".
  2. Executive Summary — 4–6 sentences: the customer's situation, our recommendation, and the ask.
  3. Understanding of Your Needs — the customer's context, constraints, and goals (from their datasheet).
  4. Proposed Solution — how the owner product addresses each need; one short paragraph per mapped need.
  5. Technical Specifications — the relevant owner-product specs, grouped logically.
  6. Why Us vs. <Competitor> — a comparison table (Capability | Owner product | Competitor), then 2–3 sentences on the decisive differentiators. Mark competitor-silent fields "Not specified".
  7. Fit With Your Stack — how the owner product integrates with the customer's own product.
  8. Implementation & Next Steps — a brief, realistic sequence.
  9. Call to Action — a specific ask matching the desired action I gave you.
  10. Appendix — full side-by-side spec table (owner vs. competitor).

FORMATTING RULES
- Use only datasheet-sourced facts; flag anything not specified rather than inventing it.
- Keep prose tight and buyer-appropriate; prefer tables for spec comparisons.
- Save the finished proposal as a document file in <FOLDER_PATH> (or a subfolder) that I can open and send, and tell me the filename when done.
