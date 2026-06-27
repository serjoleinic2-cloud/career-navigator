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
}

export function JourneyPath({ nodes, activeNodeId, onNodeSelect }: JourneyPathProps) {
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollRef = useRef<HTMLDivElement>(null);

  const chapters = nodes.reduce((acc, node) => {
    const key = node.domain || 'Unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(node);
    return acc;
  }, {} as Record<string, JourneyNode[]>);

  const chapterNames = Object.keys(chapters);

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

              {chapterNodes.map((node, nodeIndex) => {
                const status = getNodeStatus(node);
                const offset = getZigZagOffset(nodeIndex);

                return (
                  <div
                    key={node.id}
                    ref={el => {
                      if (el) nodeRefs.current.set(node.id, el);
                    }}
                    className={`journey-node journey-node-${status}`}
                    style={{ marginLeft: offset }}
                    onClick={() => status !== 'locked' && onNodeSelect(node.id)}
                  >
                    <div 
                      className="node-circle"
                      style={{
                        borderColor: status === 'current' ? theme.primary : undefined,
                        backgroundColor: status === 'completed' ? theme.primary : undefined,
                      }}
                    >
                      {status === 'locked' && '🔒'}
                      {status === 'completed' && '✓'}
                      {status === 'current' && '●'}
                      {status === 'available' && '○'}
                    </div>
                    
                    <div className="node-label">
                      <span className="node-skill">{node.title}</span>
                      <span className="node-domain">{node.domain}</span>
                    </div>

                    {status === 'current' && (
                      <div 
                        className="node-glow" 
                        style={{ background: theme.primary }}
                      />
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
