import { Settings } from "luxon";

/**
 For some reason, Mui is sending the whole value array [start, end] to date adapter (i.e., `fromJSDate` for DateRangePickers), resulting in thrown error. Dawid and Paul debugged extensively and it seems like Mui bug. For now, we will set sub-optimal settings where we tell Luxon not to throw error, and we tell Typescript not to handle null.
 */

Settings.throwOnInvalid = false;

declare module "luxon" {
  interface TSSettings {
    throwOnInvalid: true;
  }
}
