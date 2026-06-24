CAREER NAVIGATOR — PROJECT SNAPSHOT v0.6
🎯 PROJECT TYPE

Offline deterministic career readiness system with state-machine-driven skill progression.

🧱 CORE ARCHITECTURE
SKILL STATE MACHINE
Skill State Machine = deterministic skill progression through 6 states:
awareness → understanding → application → readiness → execution → confidence

Source files:
skill_state.ts (types: SkillState, SkillNode, STATE_FLOW)
skill_engine.ts (transition, canTransition, getCurrentAdvice, getNextAdvice)
advice_engine.ts (getAdvice, getStateDescription)
skill_nodes.ts (RESUME_SKILL_NODES, LINKEDIN_SKILL_NODES — 3 sample nodes)

FLOWS
JourneyScreen → linear skill progression
User journey:
positioning-clarity → achievement-framing → headline-authority
Each skill node progresses through 6 states via "Confirm State Advance" button.
Reaching 'confidence' auto-advances to next skill node.

WORLD SYSTEM (UI LAYER)

Style: iOS native-feel, light background (#f5f5f7), white cards

Core concept:
vertical timeline (scroll-snap)
each node = skill state card with advice + signals

Components:
JourneyHeader (sticky, blur)
JourneyTimeline (scrollable, snap)
JourneyNodeView (state: active + state badge + state description + signal tag)
JourneyFocusPanel (state badge, advice card, signals list, advance button / "Skill Mastered")
JourneyBottomNav (4-tab navigation)

STRUCTURE
HEADER → TIMELINE → FOCUS PANEL → BOTTOM NAV
active node (blue border) → inactive nodes (default)

DATA MAPPING

skill_nodes.ts:

SkillNode[] → displayed in timeline order
node.id → determines focus via activeNodeId
node.state → drives advice display and advance button visibility
node.signals → shown as checklist in FocusPanel
confidence reached → auto-advance to next node

⚙️ SYSTEM STATE (FRZ)
version: v0.6
mode: OFFLINE
AI runtime: FALSE
engine type: deterministic
status: STABLE BUILD
🔒 RULES
no AI in runtime
no dynamic generation
all logic deterministic
skill state advances via tap_primary action
🔭 STATUS
WORKING:
state progression display (awareness → confidence)
advice per state with advice card
signals list per node
"Confirm State Advance" button to progress state
"Skill Mastered ✓" when confidence reached
auto-advance to next skill node on confidence

REMOVED:
node_engine.ts, career_nodes.ts (old CareerNode model)
career_engine_v2, career_journey_model, focus_controller, journey_state_controller (old journey model)
skill pills / task checkboxes (replaced by state machine)

NEXT TASKS
Add end-of-journey screen for last node
Animate state transitions
Skill note-taking per skill
Dynamic career path selection
