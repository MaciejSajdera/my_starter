import React from "react";
import { HealthCard } from "@/components/health/card";
import Suspenser from "@/components/loading/suspenser";
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
