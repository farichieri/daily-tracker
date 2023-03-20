import { SubTask, Task } from './types';

export const NewTaskInitial: Task = {
  activity: [],
  added_at: '',
  added_by_uid: '',
  assigned_to: [],
  attachments: [],
  comments: [],
  completed_at: '',
  content: '',
  date_set: {
    date_iso: '',
    is_recurring: false,
    time_from: 'string',
    time_to: 'string',
    with_time: false,
  },
  description: '',
  done: false,
  is_archived: false,
  labels: [],
  minutes_spent: 0,
  priority: 0,
  project_id: '',
  reminder_date: '',
  section_id: '',
  subtasks: [],
  task_id: '',
  task_order: 0,
  time_from: '',
  time_to: '',
  updated_at: '',
};

export const NewSubtaskIinitial: SubTask = {
  added_at: '',
  added_by_uid: '',
  assigned_to: [],
  comments: [],
  completed_at: '',
  content: '',
  date_set: {
    date_iso: '',
    is_recurring: false,
    time_from: 'string',
    time_to: 'string',
    with_time: false,
  },
  description: '',
  done: false,
  is_archived: false,
  minutes_spent: 0,
  parent_id: '',
  priority: 0,
  project_id: '',
  reminder_date: '',
  section_id: '',
  task_order: 0,
  updated_at: '',
};
