import { GoalGroup, ListGroup, Task, TaskGroup } from "@/global/types";
import { dbFormatDate } from "@/utils/formatDate";
import { parseISO } from "date-fns";

export const filterObjectIncludes = (
  obj: any,
  filter: string,
  filterValue: string
) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val][filter].includes(filterValue)
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const filterObject = (obj: any, filter: string, filterValue: string) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val][filter].includes(filterValue)
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const filterTasksByDateSet = (obj: any, date: string) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !(
        obj[val]["date_set"]["date_iso"] &&
        dbFormatDate(parseISO(obj[val]["date_set"]["date_iso"])) === date
      )
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const filterSubtasks = (obj: any, taskID: string) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !(obj[val]["parent_id"] === taskID)
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const filterTasksDone = (obj: TaskGroup | GoalGroup) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val]["done"] === true
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const filterTasksPending = (obj: TaskGroup | GoalGroup) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val]["done"] === false
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const filterListsNotArchived = (obj: ListGroup) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      obj[val]["is_archived"] === true
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const getParentTaskSeconds = (subTasks: TaskGroup, task: Task) => {
  const calculateTaskSeconds = (key: string) => {
    let seconds = 0;
    Object.values(subTasks).map((s) => {
      seconds += Number(s[key]);
    });
    return seconds;
  };
  const subtasksSpent = calculateTaskSeconds("seconds_spent");
  const subtasksPlanned = calculateTaskSeconds("seconds_planned");
  const secondsSpent = subtasksSpent || 0;
  const secondsPlanned = subtasksPlanned || 0;

  return {
    seconds_spent: secondsSpent,
    seconds_planned: secondsPlanned,
  };
};
