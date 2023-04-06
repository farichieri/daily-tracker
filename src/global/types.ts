export interface DayData {
  day_date: string;
  day_goals: string[];
  day_tasks: TasksGroup;
}

export interface TasksGroup {
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

export interface Task {
  [key: string]: any;
  activity: Array<string>;
  added_at: string;
  added_by_uid: string;
  assigned_to: Array<string>;
  attachments: Array<string>;
  comments: Array<string>;
  completed_at: string;
  content: string;
  date_set: DateSet;
  description: string;
  done: boolean;
  is_archived: boolean;
  is_recurring: Boolean;
  labels: Array<string>;
  priority: number;
  project_id: string;
  recurring: Recurring;
  reminder_date: string;
  seconds_planned: number;
  seconds_spent: number;
  section_id: string;
  task_id: string;
  task_order: number;
  updated_at: string;
  working_on: boolean;
}

export interface Recurring {
  recurring_days: number[];
  recurring_end: string;
  recurring_id: string;
  recurring_number: number;
  recurring_option: string;
  recurring_start: string;
}

interface DateSet {
  date_iso: string;
  time_from: string;
  time_to: string;
  with_time: boolean;
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

export interface Goal {
  [key: string]: any;
  activity: Array<string>;
  added_at: string;
  added_by_uid: string;
  assigned_to: Array<string>;
  attachments: Array<string>;
  comments: Array<string>;
  completed_at: string;
  content: string;
  date_set: DateSet;
  description: string;
  done: boolean;
  is_archived: boolean;
  labels: Array<string>;
  days_spent: number;
  priority: number;
  project_id: string;
  reminder_date: string;
  section_id: string;
  goal_id: string;
  goal_order: number;
  updated_at: string;
  working_on: boolean;
}

export interface GoalGroup {
  [id: string]: Goal;
}

export interface TasksArray extends Array<Task> {}
export interface GoalsArray extends Array<Goal> {}
export interface ProjectsGroup extends Array<Project> {}

export interface Day {
  date: string;
  numberOfMonth: string;
  weekDay: string;
}

export interface Week extends Array<Day> {
  [index: number]: Day;
}
