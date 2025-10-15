import { host } from "@/api/connect/url";
import { useQuery } from "@/rquery/client";
import { healthSchema } from "./schemas";

export const HealthCard = () => {
  const query = useQuery({
    schema: healthSchema,
    url: "health",
  });

  if (query.isLoading) {
    return <div>Calling Host...</div>;
  }

  return (
    <div className="card">
      <h3>Host Connection Test</h3>

      <p>
        Host URL: <code>{host}</code>
      </p>

      <div>
        <strong>Response:</strong>
        <pre>{query.data.database}</pre>
        <pre>{query.data.status}</pre>
        <pre>{query.data.service}</pre>
      </div>
    </div>
  );
};
