// process.env

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Use `import.meta.env`'s `DEV` or `PROD` prop instead.
       *
       * `process.env.NODE_ENV` is included in build for backward compatibility.
       * See `vite.config.ts` for more info.
       */
      NODE_ENV: undefined;
    }
  }
}
