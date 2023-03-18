export interface DayData {
  day_date: string;
  day_goals: string[];
  day_tasks: DayTasksGroup;
}

export interface DayTasksGroup {
  [id: string]: Task;
}
export interface DayGoalsGroup {
  [id: string]: Task;
}

export interface UserDoc {
  display_name: string;
  email: string;
  is_premium: boolean;
  photo: string;
  plan_name: string;
  user_id: string;
}

// The idea is:
// If a Task has a date_set, it will be rendered in the tracker.
// And if a day_task has labels, it will be rendered in the labels
// And if a day_task has a project_id, it will be rendered in the list of tasks.

export interface Task {
  activity: Array<string>;
  added_at: string;
  added_by_uid: string;
  assigned_to: Array<string>;
  attachments: Array<string>;
  comments: Array<string>;
  completed_at: string;
  content: string;
  date_set: string;
  description: string;
  done: boolean;
  is_archived: boolean;
  labels: Array<string>;
  minutes_spent: number;
  priority: number;
  project_id: string;
  reminder_date: string;
  section_id: string;
  subtasks: Array<SubTask>;
  task_id: string;
  task_order: number;
  updated_at: string;
}

export interface SubTask {
  added_at: string;
  added_by_uid: string;
  assigned_to: Array<string>;
  comments: Array<string>;
  completed_at: string;
  content: string;
  date_set: string;
  description: string;
  done: boolean;
  is_archived: boolean;
  minutes_spent: number;
  parent_id: string;
  priority: number;
  reminder_date: string;
  project_id: string;
  section_id: string;
  task_order: number;
  updated_at: string;
}

export interface UserSettings {
  display_name: string;
  email: string;
  photo: string;
  is_premium: boolean;
  plan_name: string;
}

export interface Tracker {
  user_id: string;
  tracker_name: string;
  is_private: boolean;
  is_archived: boolean;
  is_favorite: boolean;
  tracker_id: string;
  members: Array<string>;
}

export interface Project {
  is_archived: boolean;
  is_default: boolean;
  is_favorite: boolean;
  is_private: boolean;
  project_id: string;
  project_name: string;
  members: Array<string>;
  labels: Array<Label>;
}
export interface List {
  is_archived: boolean;
  is_default: boolean;
  is_favorite: boolean;
  is_private: boolean;
  list_id: string;
  list_name: string;
  members: Array<string>;
  labels: string[];
}
export interface ListGroup {
  [id: string]: List;
}

export interface TaskGroup {
  [id: string]: Task;
}

export interface Label {
  is_favorite: boolean;
  label_color: string;
  label_id: string;
  label_name: string;
  label_order: number;
}

export interface LabelGroup {
  [id: string]: Label;
}
