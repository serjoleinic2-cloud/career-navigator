import { useEffect, useRef, useCallback } from 'react';
import type { SkillNode } from '@/core/skill_state';
import { PathNode, type NodeVisualState } from './PathNode';
import './JourneyPath.css';

interface JourneyNode extends SkillNode {
  visualState: NodeVisualState;
}

interface JourneyPathProps {
  nodes: SkillNode[];
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

function getVisualState(node: SkillNode, activeNodeId: string | null): NodeVisualState {
  if (node.id === activeNodeId) return 'current';
  if (node.state === 'confidence' || node.state === 'execution') return 'completed';
  if (node.state === 'locked') return 'locked';
  return 'unlocked';
}

const SNAKE_OFFSETS = ['0%', '12%', '-12%', '8%', '-8%', '15%', '-15%', '5%'];

export function JourneyPath({ nodes, activeNodeId, onNodeSelect }: JourneyPathProps) {
  const pathRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  const journeyNodes: JourneyNode[] = nodes.map(n => ({
    ...n,
    visualState: getVisualState(n, activeNodeId),
  }));

  const scrollToActive = useCallback(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(scrollToActive, 100);
    return () => clearTimeout(timer);
  }, [activeNodeId, scrollToActive]);

  if (journeyNodes.length === 0) {
    return <div className="journey-path-empty">No nodes available</div>;
  }

  return (
    <div className="journey-path" ref={pathRef}>
      <div className="journey-path-track">
        <div className="path-line-vertical" />
      </div>

      {journeyNodes.map((node, index) => (
        <div
          key={node.id}
          ref={node.id === activeNodeId ? activeRef : undefined}
          className="path-node-wrapper"
          style={{
            marginLeft: SNAKE_OFFSETS[index % SNAKE_OFFSETS.length],
          }}
        >
          <PathNode
            node={node}
            visualState={node.visualState}
            onSelect={onNodeSelect}
          />
        </div>
      ))}
    </div>
  );
}
