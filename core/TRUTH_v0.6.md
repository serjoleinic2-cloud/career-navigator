# Career Navigator — System Truth v0.6

## Product Definition

Offline deterministic career readiness system. Mobile app (React + TypeScript + Vite + Capacitor Android). No AI in runtime. No external API dependency. All logic deterministic.

## Architecture

Skill State Machine — single source of truth.

States: locked → awareness → understanding → application → readiness → execution → confidence

## Active Core Files

- src/core/skill_state.ts — SkillState, SkillNode, STATE_FLOW
- src/core/skill_nodes.ts — RESUME_SKILL_NODES, LINKEDIN_SKILL_NODES
- src/core/skill_engine.ts — transition(), canTransition(), getCurrentAdvice(), getNextAdvice()
- src/core/advice_engine.ts — getAdvice(), getStateDescription()
- src/core/journey_adapter.ts — VisualNode, buildJourneyViewModel()
- src/core/visual_node_renderer.ts — RenderNode, mapVisualNodesToRender()
- src/core/focus_snap_controller.ts — snapToActiveNode()
- src/core/journey_orchestrator.ts — buildJourneyUI()
- src/core/orchestrator.ts — OrchestratorState, getActiveNode(), moveToNextState(), setActiveNode()
- src/core/visual_flow.ts — FlowPosition
- src/core/flow_mapper.ts — buildFlowMap()
- src/core/depth_mapper.ts — getNodeDepth()
- src/core/focus_gravity.ts — getFocusWeight()
- src/core/bootstrap/init.ts — initCareerNavigator()

## Runtime Mode

OFFLINE_DETERMINISTIC

## Deterministic Rules

- No AI in runtime
- No dynamic generation
- No external API calls
- Skill state advances via tap_primary action only
- UI is stateless renderer
- Only Orchestrator mutates state

## Current UI Layer

- JourneyScreen — root screen
- JourneyHeader — sticky header
- JourneyVisualLayer — scrollable node list with depth/scale/opacity
- JourneyPath — vertical path line
- JourneyBottomNav — tab navigation

## FRZ Version

v0.6

## Deleted Concepts

- Career Engine 3x5
- getCareerOptions / getCareerSteps
- dayIndex
- checklist tasks
- world debug mode
- level system / XP / quests

## Next Tasks

- Add end-of-journey screen
- Animate state transitions
- Skill note-taking
- Dynamic career path selection
