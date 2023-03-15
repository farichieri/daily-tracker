export interface DayData {
  date: string;
  objetives: string[];
  tasks: Task[];
}

export interface Task {
  added_at: string;
  added_by_uid: string;
  comments: Array<string>;
  completed_at: string;
  content: string;
  description: string;
  done: boolean;
  labels: Array<string>;
  priority: number;
  project_id: string;
  section_id: string;
  task_id: string;
  time_set: string;
  updated_at: string;
  task_order: number;
  minutes_spent: number;
}

export interface UserSettings {
  display_name: string;
  email: string;
  photo: string;
  is_premium: boolean;
  plan_name: string;
}

export interface Project {
  id: string;
  projectName: string;
  isDefault: boolean;
  isFavorite: boolean;
  isArchivated: boolean;
}
export interface Todo {
  id: string;
  todoName: string;
  isDefault: boolean;
  isFavorite: boolean;
  isArchivated: boolean;
}
