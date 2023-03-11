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
