import type { UnifiedRuntimeState } from './unified_runtime_state';
import type { RuntimeEvent } from './runtime_engine';

export function reduce(
  state: UnifiedRuntimeState,
  event: RuntimeEvent
): UnifiedRuntimeState {
  switch (event.type) {
    case 'TASK_COMPLETED': {
      return {
        ...state,
        skillState: {
          ...state.skillState,
          [event.nodeId]: event.skillState as any,
        },
        completedNodes: state.completedNodes.includes(event.nodeId)
          ? state.completedNodes
          : [...state.completedNodes, event.nodeId],
      };
    }

    case 'TASK_FAILED': {
      return {
        ...state,
        gapState: {
          ...state.gapState,
          [event.nodeId]: (state.gapState[event.nodeId] ?? 0) + 1,
        },
      };
    }

    case 'CHAPTER_ADVANCED': {
      return {
        ...state,
        chapterState: {
          ...state.chapterState,
          [event.chapterId]: {
            ...state.chapterState[event.chapterId],
            active: true,
          },
        },
      };
    }

    case 'SKILL_UPDATED': {
      return {
        ...state,
        skillState: {
          ...state.skillState,
          [event.nodeId]: event.newState as any,
        },
      };
    }

    case 'READINESS_UPDATED': {
      return {
        ...state,
        readinessScore: event.score,
        confidenceScore: event.confidence,
      };
    }

    case 'PROFESSION_UNLOCKED': {
      return {
        ...state,
        professionId: event.professionId,
        activeProfessionId: event.professionId,
      };
    }

    case 'PROFESSION_CHANGED': {
      return {
        ...state,
        activeProfessionId: event.professionId,
      };
    }

    case 'NODE_SELECTED': {
      return {
        ...state,
        currentNodeId: event.nodeId,
      };
    }

    case 'MEMORY_ADDED': {
      return {
        ...state,
        memoryIndex: [...state.memoryIndex, event.memoryId],
      };
    }

    default:
      return state;
  }
}
