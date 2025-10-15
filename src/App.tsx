import React from "react";
import { host } from "./api/connect/url";
import "./App.css";

function App() {
  const [hostResponse, setHostResponse] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const callHost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/health`);
      const data = await response.text();
      setHostResponse(data);
    } catch (error) {
      throw new Error(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card">
        <h3>Host Connection Test</h3>

        <p>
          Host URL: <code>{host}</code>
        </p>

        <button onClick={callHost} disabled={isLoading}>
          {isLoading ? "Calling Host..." : "Call Host"}
        </button>

        {hostResponse && (
          <div>
            <strong>Response:</strong>
            <pre>{hostResponse}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
