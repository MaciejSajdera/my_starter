/// <reference types="vite/client" />

const { VITE_ENV, VITE_GOOGLE_ANALYTICS_ID } = import.meta.env;

if (VITE_GOOGLE_ANALYTICS_ID) {
  // initialize
  gtag("config", VITE_GOOGLE_ANALYTICS_ID);

  // if local, warn
  if (VITE_ENV === "local") {
    console.warn(
      `⚠️ Google Analytics (${VITE_GOOGLE_ANALYTICS_ID}) enabled! (Remove env var when not explicitly needed for testing.)`
    );
  }
}
