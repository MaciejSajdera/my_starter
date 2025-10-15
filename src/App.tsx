import React from "react";
import Suspenser from "@/components/loading/suspenser";
import { HealthCard } from "@/features/health/card";
import "./App.css";
import "./init";

const Providers = React.lazy(() => import("@/providers"));

function App() {
  return (
    <React.StrictMode>
      <Suspenser>
        <Providers>
          <HealthCard />
        </Providers>
      </Suspenser>
    </React.StrictMode>
  );
}

export default App;
