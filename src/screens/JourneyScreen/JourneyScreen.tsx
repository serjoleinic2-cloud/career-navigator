import { useState, useEffect, useCallback } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, advanceNode } from '@/core/runtime/runtime_controller';
import { snapToActiveNode } from '@/core/focus_snap_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { SystemEvent } from '@/core/events/system_event_bus';
import { JourneyVisualLayer } from '@/components/JourneyVisualLayer/JourneyVisualLayer';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import type { FeedbackCard, NextRecommendation } from '@/core/learning/learning_engine';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackCard | null>(null);
  const [recommendation, setRecommendation] = useState<NextRecommendation | null>(null);
  const refresh = useCallback(() => setTick(t => t + 1), []);
  const ui = getUIState();
  const nav = getNavigation();

  useEffect(() => {
    const unsubNode = subscribe('NODE_CHANGED', refresh);
    const unsubState = subscribe('STATE_UPDATED', refresh);
    const unsubChapter = subscribe('CHAPTER_CHANGED', refresh);
    const unsubScore = subscribe('SCORE_UPDATED', refresh);
    const unsubUI = subscribe('UI_REFRESH', refresh);
    const unsubLearn = subscribe('LEARNING_FEEDBACK', (event: SystemEvent) => {
      const { feedback: fb, recommendation: rec } = event.payload as {
        feedback: FeedbackCard;
        recommendation: NextRecommendation;
      };
      setFeedback(fb);
      setRecommendation(rec);
    });
    return () => {
      unsubNode();
      unsubState();
      unsubChapter();
      unsubScore();
      unsubUI();
      unsubLearn();
    };
  }, [refresh]);

  useEffect(() => {
    snapToActiveNode(ui.activeNodeId);
  }, [ui.activeNodeId]);

  const handleNodeSelect = (nodeId: string) => {
    setActiveNode(nodeId);
  };

  const handleAdvance = () => {
    advanceNode('tap_primary');
  };

  const handleCloseFeedback = () => {
    setFeedback(null);
    if (recommendation?.targetNodeId && recommendation.action === 'next_node') {
      setActiveNode(recommendation.targetNodeId);
    }
    setRecommendation(null);
  };

  return (
    <div className="journey-screen">
      <JourneyHeader
        chapterTitle={ui.currentChapterTitle}
        readiness={ui.readinessBadge}
        confidence={ui.confidenceBadge}
      />
      <div className="journey-path-container">
        <JourneyPath nodes={ui.nodes} onNodeSelect={handleNodeSelect} />
        <JourneyVisualLayer nodes={ui.nodes} />
      </div>
      <JourneyBottomNav
        activeNodeId={ui.activeNodeId}
        onNodeSelect={handleNodeSelect}
        onAdvance={handleAdvance}
        hasNext={nav.hasNext}
        hasPrevious={nav.hasPrevious}
      />
      {feedback && (
        <div className="feedback-overlay" onClick={handleCloseFeedback}>
          <div className="feedback-card" onClick={e => e.stopPropagation()}>
            <div className={`feedback-card__header feedback-card__header--${feedback.type}`}>
              {feedback.title}
            </div>
            <div className="feedback-card__body">
              <p>{feedback.body}</p>
              <div className="feedback-card__stats">
                <span className={feedback.confidenceChange >= 0 ? 'positive' : 'negative'}>
                  Confidence: {feedback.confidenceChange >= 0 ? '+' : ''}{feedback.confidenceChange}%
                </span>
                <span className={feedback.readinessChange >= 0 ? 'positive' : 'negative'}>
                  Readiness: {feedback.readinessChange >= 0 ? '+' : ''}{feedback.readinessChange}
                </span>
              </div>
              <p className="feedback-card__next">{feedback.nextSuggestion}</p>
              {recommendation && (
                <p className="feedback-card__recommendation">
                  Next: {recommendation.label}
                </p>
              )}
            </div>
            <button className="feedback-card__close" onClick={handleCloseFeedback}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
