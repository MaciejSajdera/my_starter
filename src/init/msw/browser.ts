import { setupWorker } from "msw/browser";

import { mswHandlers } from "./handlers";

/**
 * NOTE:
 * You shouldn't have to modify this file to use msw.
 * Add handlers in `mswHandlers` to activate msw.
 */

export const worker = setupWorker(...mswHandlers);
