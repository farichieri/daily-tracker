export interface DayData {
  date: string;
  objetives: string[];
  tasks: Task[];
}

export interface Task {
  comments: string;
  done: boolean;
  hour: string;
  task: string;
  labels: Array<string>;
  id: string;
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
