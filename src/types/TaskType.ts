export type TaskType = {
  id: number;
  title: string;
  description: string;
  tags: string;
  list: string;
  userId: string;
  state: string;
  todoDate: string | null;
  doneDate: string | null;
  deleted: number;
  estimateHour: string;
  remainingHour: string;
  completedHour: string;
  editTime?: string | Date;
  guid?: number;
};
