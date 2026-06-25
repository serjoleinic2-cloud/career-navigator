import type { SkillNode } from '../skill_state';
import { applyStateTransition } from './state_transition_engine';
import { generateFeedback } from './feedback_engine';
import { calculateRewards } from './reward_system';
import { emit } from './event_bus';
import { calculateReadiness } from '../readiness_engine';
import { analyzeGaps } from '../gap_engine';
import { getActiveChapters } from '../profession_loader';
import { getChapterProgress, getCurrentChapter } from '../chapter_engine';
import type { InteractionAction, InteractionResult, RewardResult } from './interaction_types';

function buildNodeMap(nodes: SkillNode[]): Record<string, SkillNode> {
  const map: Record<string, SkillNode> = {};
  for (const n of nodes) {
    map[n.id] = n;
  }
  return map;
}

export function runProgressionCycle(
  action: InteractionAction,
  nodeStates: Record<string, SkillNode>,
  activeNodeId: string
): InteractionResult {
  const activeNode = nodeStates[activeNodeId];
  if (!activeNode) {
    throw new Error(`Active node ${activeNodeId} not found in node states`);
  }

  const previousState = activeNode.state;

  const updatedNode = applyStateTransition(activeNode, action);

  const updatedNodes = Object.values(nodeStates).map(n =>
    n.id === updatedNode.id ? updatedNode : n
  );

  const readiness = calculateReadiness(updatedNodes);
  const gaps = analyzeGaps(updatedNodes);

  const chapters = getActiveChapters();
  const nodeMap = buildNodeMap(updatedNodes);

  const chapterProgress = chapters.map(ch => {
    const progress = getChapterProgress(ch, nodeMap);
    return { chapterId: ch.id, percent: progress.percent };
  });

  const previousReadiness = calculateReadiness(Object.values(nodeStates)).readinessScore;
  const delta = readiness.readinessScore - previousReadiness;

  const feedbackEvent = generateFeedback(
    action,
    previousState,
    updatedNode.state,
    delta
  );

  const rewards: RewardResult = calculateRewards(action, previousState, updatedNode.state);

  if (action === 'complete_task' || action === 'submit_answer') {
    emit('onTaskCompleted', { nodeId: activeNodeId });
  }
  if (updatedNode.state !== previousState) {
    emit('onSkillUpgraded', { nodeId: updatedNode.id, newState: updatedNode.state });
  }
  if (rewards.chapterCompleted) {
    const currentChapter = getCurrentChapter(chapters, nodeMap);
    emit('onChapterCompleted', { chapterId: currentChapter?.id ?? '' });
  }
  emit('onReadinessChanged', { readinessScore: readiness.readinessScore });

  return {
    updatedSkillNodes: updatedNodes,
    updatedReadiness: readiness,
    updatedGaps: gaps,
    updatedChapterProgress: chapterProgress,
    feedbackEvent,
    rewards,
  };
}
