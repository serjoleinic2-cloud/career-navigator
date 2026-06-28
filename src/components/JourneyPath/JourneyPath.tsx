import { useEffect, useRef } from 'react';
import { CHAPTER_THEMES } from './theme';
import './JourneyPath.css';

interface JourneyNode {
  id: string;
  title: string;
  state: string;
  domain: string;
}

interface JourneyPathProps {
  nodes: JourneyNode[];
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
  totalNodes: number;
  readinessScore: number;
}

export function JourneyPath({ nodes, activeNodeId, onNodeSelect, totalNodes, readinessScore }: JourneyPathProps) {
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollRef = useRef<HTMLDivElement>(null);

  const reversedNodes = [...nodes].reverse();

  const chapters = reversedNodes.reduce((acc, node) => {
    const raw = node.domain || 'Unknown';
    const key = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(node);
    return acc;
  }, {} as Record<string, JourneyNode[]>);

  const chapterNames = Object.keys(chapters);

  const activeOrigIndex = nodes.findIndex(n => n.id === activeNodeId);
  const activeReversedIndex = reversedNodes.findIndex(n => n.id === activeNodeId);

  useEffect(() => {
    if (activeNodeId && nodeRefs.current.has(activeNodeId)) {
      nodeRefs.current.get(activeNodeId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeNodeId]);

  const getNodeStatus = (node: JourneyNode): 'locked' | 'completed' | 'current' | 'available' => {
    if (node.id === activeNodeId) return 'current';
    if (node.state === 'confidence') return 'completed';
    if (node.state === 'locked') return 'locked';
    return 'available';
  };

  const getZigZagOffset = (index: number): string => {
    const offsets = ['0%', '15%', '-15%', '10%', '-10%'];
    return offsets[index % offsets.length];
  };

  return (
    <div className="journey-scroll" ref={scrollRef}>
      {chapterNames.map((chapterName, chapterIndex) => {
        const theme = CHAPTER_THEMES[chapterName as keyof typeof CHAPTER_THEMES] || CHAPTER_THEMES.Resume;
        const chapterNodes = chapters[chapterName];
        const isLastChapter = chapterIndex === chapterNames.length - 1;

        const chapterActiveIndex = chapterNodes.findIndex(n => n.id === activeNodeId);

        return (
          <div key={chapterName} className="chapter-zone">
            <div
              className="chapter-background"
              style={{ background: theme.gradient }}
            />
            <div
              className="chapter-particles"
              style={{ background: theme.particles }}
            />

            <div className="chapter-header">
              <h3 className="chapter-title" style={{ color: theme.primary }}>
                {chapterName}
              </h3>
              <div className="chapter-line" style={{ background: theme.primary }} />
            </div>

            <div className="chapter-path">
              <div
                className="path-line"
                style={{
                  background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                  boxShadow: `0 0 20px ${theme.primary}40`,
                }}
              />

              {chapterActiveIndex >= 0 && (
                <div
                  className="ghost-trail"
                  style={{
                    height: `${((chapterActiveIndex + 1) / chapterNodes.length) * 100}%`,
                  }}
                />
              )}

              {chapterNodes.map((node, nodeIndex) => {
                const status = getNodeStatus(node);
                const offset = getZigZagOffset(nodeIndex);
                const isActive = node.id === activeNodeId;

                return (
                  <div
                    key={node.id}
                    ref={el => {
                      if (el) nodeRefs.current.set(node.id, el);
                    }}
                    className={`journey-node journey-node-${status}`}
                    style={{ marginLeft: offset }}
                    onClick={() => onNodeSelect(node.id)}
                  >
                    <div
                      className="node-circle"
                      style={{
                        borderColor: isActive ? theme.primary : undefined,
                        backgroundColor: status === 'completed' ? theme.primary : undefined,
                      }}
                    >
                      {status === 'locked' && '🔒'}
                      {status === 'completed' && '✓'}
                      {status === 'current' && '●'}
                      {status === 'available' && '○'}
                    </div>

                    {isActive && (
                      <div className="node-character">
                        <span className="character-body">🧑</span>
                        <span className="character-arrow">⬆</span>
                      </div>
                    )}

                    {isActive && (
                      <div className="active-pill">
                        Day {activeOrigIndex + 1}/{totalNodes} • {readinessScore}% Ready
                      </div>
                    )}

                    <div className="node-label">
                      <span className="node-skill">{node.title}</span>
                      <span className="node-domain">{node.domain}</span>
                    </div>

                    {isActive && (
                      <>
                        <div
                          className="node-glow"
                          style={{ background: theme.primary }}
                        />
                        <div className="you-are-here">
                          <span className="pulsing-dot" style={{ backgroundColor: theme.primary }} />
                          You are here
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {!isLastChapter && (
              <div className="chapter-portal">
                <div className="portal-ring" style={{ borderColor: theme.primary }} />
                <div className="portal-label">Next Chapter</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
