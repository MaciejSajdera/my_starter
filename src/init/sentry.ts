// import {
//   browserTracingIntegration,
//   captureConsoleIntegration,
//   feedbackIntegration,
//   init,
//   replayIntegration,
//   setTags,
// } from "@sentry/react";

// import { isNodeEnvDev } from "utils/env";

// init({
//   enabled: !isNodeEnvDev(),
//   environment: import.meta.env.VITE_ENV,
//   dsn: import.meta.env.VITE_SENTRY_DSN,
//   integrations: [
//     browserTracingIntegration(),
//     captureConsoleIntegration({
//       levels: ["warning", "error"],
//     }),
//     feedbackIntegration({
//       colorScheme: "light",
//       autoInject: false, // disables the default button
//     }),
//     // replay only on prod, for now
//     ...(import.meta.env.VITE_ENV === "prod"
//       ? [
//           // https://docs.sentry.io/platforms/javascript/guides/react/session-replay/
//           replayIntegration({
//             maskAllText: false,
//             maskAllInputs: false,
//           }),
//         ]
//       : []),
//   ],
//   tracesSampleRate: 0.05,
//   // suggested replay defaults
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });

// setTags({
//   version: import.meta.env.VITE_APP_VERSION,
// });
