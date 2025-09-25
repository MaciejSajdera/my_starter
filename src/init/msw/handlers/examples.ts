import { apiBaseUrlConnect } from "api/connect/url";
import { bypass, HttpResponse, http, type RequestHandler } from "msw";

/**
 * By default, these are not in use and therefore are not included in bundle.
 * See `msw` loader fn for more info.
 * Copy or spread them into `mswHandlers` to use.
 * This is exported only to avoid "unused variable" warning. It should remain unused when merging.
 * Make changes to this file only to include examples that are useful.
 */
export const mswHandlersExamples: RequestHandler[] = [
  // mock 404 endpoint
  http.get(`${apiBaseUrlConnect}/v1/errors/404/`, () => {
    return new HttpResponse(null, { status: 404 });
  }),

  // mock 500 endpoint
  http.get(`${apiBaseUrlConnect}/v1/errors/500/`, () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // mock 500 for specific resource
  http.get(`${apiBaseUrlConnect}/v2/marketplace/orders/abc-123/`, () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // simulate new feature endpoint
  http.get(`${apiBaseUrlConnect}/v2/new/feature/uuid/`, () => {
    return HttpResponse.json(
      {
        uuid: "uuid",
      },
      { status: 200 }
    );
  }),

  // response patching, response merging original data with new data
  http.get(
    `${apiBaseUrlConnect}/v2/planner/plan-leads/*/revisions/*/state/`,
    async ({ request }) => {
      const originalData = await fetch(bypass(request)).then((response) =>
        response.json()
      );

      return HttpResponse.json(
        { ...originalData, is_adding: false },
        { status: 200 }
      );
    }
  ),

  // simulate adblocker
  http.options(`${apiBaseUrlConnect}/page-with-ads`, () => {
    // force network error
    return HttpResponse.error();
  }),

  // mock 401 with non-field and orphan errors
  http.post(`${apiBaseUrlConnect}/login`, () => {
    return HttpResponse.json(
      {
        detail: "Detail error.",
        non_field_errors: ["Non-field error.", "Also non-field error."],
        orphan: ["Orphan error."],
      },
      {
        status: 401,
        statusText: "Unauthorized",
      }
    );
  }),
];
