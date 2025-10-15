import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "@/rquery/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <ErrorBoundary fallback={<p>⚠️ Something went wrong</p>}>
        {children}
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Providers;
