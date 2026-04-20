# Artifact 2 — Application Design: Decisions

## 1. Selected System Capability

**C2 — Multi-Criteria Route Comparison**

The system presents candidate routes side by side across standardized dimensions — estimated duration, supply consumption, physical demand on the least-capable member (hobbits), exposure to known enemy presence, and confidence level of the underlying information — allowing the decision-maker to see trade-offs explicitly rather than holding them in working memory.

### Why this capability?

Route comparison is the central decision the Fellowship faces at this point in the journey. The other capabilities (Knowledge Registry, Gap Identification, Contingency Linkage, Supply Check) are either inputs to or extensions of this comparison. Without a structured comparison, all remaining capabilities exist in isolation — knowledge is collected but never confronted against alternatives, gaps are flagged but not in the context of competing options, and contingencies have no baseline decision to fall back from.

C2 is where information becomes a decision. It sits at the intersection of all other capabilities and represents the moment the system delivers its core value.

### Why is it meaningful at this stage?

The Fellowship has left Rivendell and must choose between Caradhras, Moria, and the Gap of Rohan. Each member holds partial knowledge — Gandalf about Moria's ancient dangers, Gimli about dwarven halls, Aragorn about wilderness and enemy movements — but this knowledge has never been placed side by side in a comparable format. The group is days away from the point of no return. A structured comparison matters now because after Caradhras, the pivot to an alternative must happen fast, and without a pre-evaluated comparison, the group defaults to reactive, fear-driven decision-making.

---

## 2. Flow

The interaction flow is documented as a Mermaid flowchart in:

**→ [src/decisions.mermaid.md](src/decisions.mermaid.md)**

### Flow summary

The flow covers the full user journey through the comparison capability on a mobile device:

1. **Entry** — The user (Gandalf or Aragorn) opens the Route Comparison screen.
2. **Precondition check** — The app verifies that at least two routes exist in the Knowledge Registry. If not, an empty state prompts the user to add route knowledge first. This prevents empty or meaningless comparisons.
3. **Screen rendering** — The app loads all registered routes as swipeable tabs at the top of the screen, with comparison cards grouped by criterion below. Each card shows a severity indicator, a brief data summary, and source attribution. A ranking summary and gap warnings appear beneath the cards.
4. **User interaction loop** — From the main screen the user can:
   - **Swipe route tabs** to shift focus between route candidates in the comparison cards.
   - **Tap a weight chip** (Safety, Duration, Supply, Hobbits) to toggle its priority, triggering a recalculation of the ranking order.
   - **Tap a filter chip** to apply or remove a hard constraint (e.g., "Max 5 days"), which greys out violating routes.
   - **Tap "Detail"** in the bottom bar to open a full route detail view with all attributes, sources, and timestamps, returning via back navigation.
   - **Tap the gap warning banner** (or "Get intel" in the bottom bar) to open a slide-up sheet listing specific information gaps with source, age, and confidence metadata. From this sheet the user can assign a recon task to trigger knowledge gathering, or dismiss.
5. **Route selection** — Tapping "Select route" in the bottom bar opens a confirmation sheet showing the route name and summary. On confirmation, the app logs the selection with timestamp and decision-maker identity.
6. **Contingency prompt** — After selection, the app prompts: "Set a fallback route?" The user can pick a fallback and define a trigger condition (linking to capability C4), or skip.

### Key design decisions in the flow

- The gap detection is **automatic, not user-triggered**. The warning banner appears whenever gaps exist — the user should never need to ask "is my data complete?"
- All interactions happen through **tap and swipe gestures** appropriate for one-handed mobile use. No text input is required during comparison — the screen is for evaluating and deciding, not data entry.
- Route selection requires a **confirmation sheet** before committing. On mobile, accidental taps are common, and the consequences of logging a route decision are significant enough to warrant a deliberate second action.
- The gap detail opens as a **slide-up sheet** rather than navigating to a new screen, keeping the user's mental context on the comparison while surfacing additional detail.

---

## 3. Wireframe

The interface wireframe is documented as a low-fidelity mobile layout in:

**→ [src/decisions.png](src/decisions.png)**

### Wireframe structure

The wireframe represents one scrollable screen — the Route Comparison view on a mobile device — organized in six vertical zones:

1. **Navigation bar** — Screen title ("Route Comparison") with a back button. Standard mobile pattern, no surprises.

2. **Route tabs** — Horizontal swipeable pills showing each route candidate with a brief metadata line (source count, data age). Active routes have colored borders (green for best-performing, amber for gap-flagged). Filtered-out routes appear dashed and greyed. This replaces the desktop table columns and works within the narrow mobile viewport.

3. **Weight chips and filter bar** — Tappable pill-shaped controls for adjusting priority weights and applying hard constraints. The active weight (e.g., Safety) is visually highlighted. The filter chip shows the active constraint with a dismiss button. These are compact enough to sit in two rows without consuming excessive screen space.

4. **Comparison cards** — The core of the screen. Cards are grouped by criterion (Safety, Duration, Supplies, Hobbit-ready, Confidence), with two cards per row — one per active route. Each card shows the route name, a color-coded severity label, and a one-line explanation. This two-column card layout replaces the desktop table grid and adapts naturally to the vertical scroll pattern of mobile use.

5. **Ranking summary and gap banner** — Below the cards, a ranking summary lists the routes in order with a brief rationale each. A colored banner below flags any information gaps, showing the count and a summary, with a "View →" tap target to open the gap detail sheet.

6. **Bottom action bar** — A persistent bar pinned to the bottom of the screen with three actions: "Select route" (primary, filled), "Detail" (secondary), and "Get intel" (secondary). This follows standard mobile convention for primary actions — always reachable by thumb, never buried in the scroll.

---

## 4. Design Rationale

### How this design supports the intent and value from Assignment 1

The intent defined in Assignment 1 states that the primary user should be able to "consolidate fragmented group knowledge into a structured comparison of available routes, evaluate trade-offs across safety, duration, physical difficulty, and supply requirements, and adjust the plan as new information emerges."

This mobile design supports that intent directly:

- **Consolidation** is achieved through the card-based comparison layout, which forces all knowledge into a common format. The route tabs with source attribution and data age make the consolidation transparent — the user always knows where information comes from and how fresh it is.
- **Trade-off evaluation** is achieved through the per-criterion severity labels and the weight chips. The user can see at a glance where each route excels or fails, and can tap a weight chip to test how reprioritizing changes the ranking — all without leaving the screen.
- **Adaptability** is achieved through the filter chips and the contingency prompt at the end of the selection flow. When circumstances change (e.g., Caradhras becomes impassable), the comparison is already built, constraints can be toggled instantly, and the fallback is pre-evaluated.

The value statement warned that "without structured decision support, the Fellowship defaults to authority-based or crisis-driven choices." This mobile design counters that by making the decision process portable and fast — accessible in the field, at the moment the decision is needed, not just back at camp.

### What was deliberately left out

- **Route editing within this screen.** The comparison screen is read-only with respect to route data. Adding or modifying route knowledge happens in the Knowledge Registry (C1). Mixing data entry and decision-making creates conflicting user modes and increases cognitive load — especially problematic on a small screen.
- **Automated route recommendation.** The app ranks but does not recommend. A "the app suggests Caradhras" message would undermine the decision-maker's agency and create false authority — particularly dangerous when the ranking depends on incomplete inputs.
- **Map visualization.** A geographic map would require significant screen space and rendering complexity on mobile. The card-based comparison delivers the core decision support without it. A map could be a future enhancement accessible from the detail view.
- **Desktop-style data table.** A traditional table with rows and columns does not work on a 375px-wide screen. The two-column card layout preserves comparability while fitting the mobile viewport. The trade-off is that only two routes are shown side by side — the filtered-out third route is accessible by swiping the route tabs, but is de-emphasized by default.

### Assumptions and constraints that influenced the design

- **One-handed use in the field.** The Fellowship may consult this tool while walking, in rain, or in low light. All primary actions are reachable by thumb in the bottom bar. No action requires precise tapping of small targets.
- **Vertical scroll is natural; horizontal navigation is secondary.** Mobile users scroll vertically by default. The route tabs use horizontal swipe as a secondary pattern, but the primary information flow (criteria, ranking, actions) is all vertical.
- **Confirmation before commitment.** Mobile touch screens invite accidental taps. The confirmation sheet before route selection adds one step but prevents logging an unintended decision — a reasonable cost given the stakes.
- **Color is supplementary, not primary.** Severity is communicated through text labels (CRITICAL, OK, LOW) alongside color coding. This ensures readability in sunlight, darkness, or for color-impaired users.
- **No persistent connectivity required.** The app works with locally stored data. All route knowledge, weights, and selections are persisted on-device. This aligns with the Assignment 1 constraint that the system cannot depend on network infrastructure.

