/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  // local & deployment
  readonly VITE_API_HOST: string;
  readonly VITE_APP_VERSION: string;

  // deployment
  // readonly VITE_SENTRY_DSN: string | undefined;
  readonly VITE_ENV: "local" | "dev" | "qa" | "prod";

  // prod
  readonly VITE_GOOGLE_ANALYTICS_ID: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
