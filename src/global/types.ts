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
}

export interface UserSettings {
  displayName: string;
  email: string;
  photo: string;
}

export interface Project {
  id: string;
  projectName: string;
  isDefault: boolean;
  isFavorite: boolean;
}
