export interface Note {
  id: string;
  professionId: string;
  chapterId: string;
  nodeId: string;
  taskId?: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}
