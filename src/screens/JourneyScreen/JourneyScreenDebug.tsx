import { useState, useEffect, useCallback } from 'react';
import { getUIState } from '@/core/ui_bridge/ui_bridge';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getCareerState, getActiveNodeId } from '@/core/skill_engine';
import { subscribe } from '@/core/events/system_event_bus';
import { MissionScreen } from '@/screens/MissionScreen/MissionScreen';
import { BackgroundLayer } from './components/BackgroundLayer';
import { JourneyHeader } from './components/JourneyHeader';
import { JourneyBottomNav } from './components/JourneyBottomNav';
import './JourneyScreen.css';

export function JourneyScreenDebug() {
  const [, setTick] = useState(0);
  const [showMission, setShowMission] = useState(false);

  const refresh = useCallback(() => {
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    const unsubs = ([ 'STATE_UPDATED', 'UI_REFRESH' ] as const).map(e =>
      subscribe(e, refresh)
    );
    return () => unsubs.forEach(u => u());
  }, [refresh]);

  const ui = getUIState();
  const runtime = getRuntimeState();
  const activeNodeId = getActiveNodeId();
  const career = getCareerState();

  const nodeIds = Object.keys(career?.nodeStates ?? {});
  const completedCount = Object.values(career?.nodeStates ?? {}).filter(
    n => n.state === 'confidence' || n.state === 'execution'
  ).length;

  if (showMission && runtime) {
    return (
      <MissionScreen
        runtimeState={runtime}
        chapterTitle={ui.currentChapterTitle}
        onComplete={() => { setShowMission(false); refresh(); }}
      />
    );
  }

  return (
    <div className="journey-screen">
      <BackgroundLayer />
      <JourneyHeader
        chapterTitle={ui.currentChapterTitle || 'Debug'}
        nodeIndex={completedCount}
        totalNodes={nodeIds.length}
        readinessScore={career?.readinessScore ?? 0}
      />

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        <div className="text-white/60 text-sm font-mono mb-4">
          Debug Mode — {nodeIds.length} nodes, {completedCount} completed
        </div>
        {nodeIds.map(id => {
          const node = career?.nodeStates[id];
          const isActive = id === activeNodeId;
          return (
            <div
              key={id}
              className={`px-4 py-3 rounded-xl border text-sm ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                  : node?.state === 'confidence' || node?.state === 'execution'
                    ? 'bg-green-500/5 border-green-500/20 text-green-400'
                    : node?.state === 'locked'
                      ? 'bg-white/5 border-white/10 text-white/30'
                      : 'bg-white/5 border-white/10 text-white/60'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{node?.skill || id}</span>
                <span className="text-xs opacity-70">{node?.state}</span>
              </div>
              <div className="text-xs opacity-50 mt-1">{node?.domain}</div>
            </div>
          );
        })}
        {activeNodeId && (
          <button
            className="w-full mt-4 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-medium"
            onClick={() => setShowMission(true)}
          >
            Open Mission (Debug)
          </button>
        )}
      </div>

      <JourneyBottomNav activeTab="journey" onTabChange={() => {}} />
    </div>
  );
}
