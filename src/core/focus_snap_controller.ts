export function snapToActiveNode(nodeId: string): void {
  const el = document.getElementById(nodeId);
  if (!el) return;

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  });
}

export function snapToActiveNodeImmediate(nodeId: string): void {
  const el = document.getElementById(nodeId);
  if (!el) return;

  el.scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'nearest',
  });
}
