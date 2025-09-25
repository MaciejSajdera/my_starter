import { mswHandlers } from "./handlers";

/**
 * Conditional msw loader. Only in DEV mode and only if there are handlers to mock.
 *
 * This is because by default `msw` will intercept all requests and log them to Fetch/XHR tab in chrome.
 * This deteriorates the development experience as it makes it harder to debug network requests.
 *
 * NOTE: If you want to filter Fetch/XHR requests, one options it to simply filter by "fanserver.net".
 *
 * IMPORTANT: Structure imports such that bundling and tree shaking are taken into account.
 * - `mswHandlers` should remain empty when merging, so it does not add to bundle size.
 *
 * (Production build will include this simple function -- which will never trigger lazy import --
 * and empty `mswHandlers` array.)
 *
 * (In the future, we will probably incorporate handlers for integration tests by some means.)
 */
async function mswInit() {
  // if not dev/local, return
  if (!import.meta.env.DEV) return;

  // if no handlers, return
  if (!mswHandlers.length) return;

  // lazy import
  const { worker } = await import("./browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: "bypass", // disable console warnings
  });
}

export default mswInit;
