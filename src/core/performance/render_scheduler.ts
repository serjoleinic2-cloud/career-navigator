export type RenderPriority = 'critical' | 'high' | 'normal' | 'low';

type ScheduledTask = {
  id: string;
  fn: () => void;
  priority: RenderPriority;
  timestamp: number;
};

const FRAME_BUDGET = 16;
const queue: ScheduledTask[] = [];
let scheduled = false;

export function scheduleRender(priority: RenderPriority, fn: () => void): string {
  const id = `${Date.now()}_${Math.random()}`;
  queue.push({ id, fn, priority, timestamp: Date.now() });
  queue.sort((a, b) => priorityWeight(a.priority) - priorityWeight(b.priority));

  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(processQueue);
  }

  return id;
}

function priorityWeight(p: RenderPriority): number {
  switch (p) {
    case 'critical': return 0;
    case 'high': return 1;
    case 'normal': return 2;
    case 'low': return 3;
  }
}

function processQueue(): void {
  const start = performance.now();

  while (queue.length > 0 && performance.now() - start < FRAME_BUDGET) {
    const task = queue.shift();
    if (task) {
      try {
        task.fn();
      } catch {
        // Silently skip failed renders
      }
    }
  }

  scheduled = false;
  if (queue.length > 0) {
    scheduled = true;
    requestAnimationFrame(processQueue);
  }
}

export function clearRenderQueue(): void {
  queue.length = 0;
}
