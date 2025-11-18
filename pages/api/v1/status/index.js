import controller from "infra/controller";
import database from "infra/database";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersionResult = await database.query("SHOW SERVER_VERSION;");
  const postgresVersionValue = postgresVersionResult?.rows[0]?.server_version;

  const postgresMaxConnectionResult = await database.query(
    "SHOW max_connections;",
  );
  const postgresMaxConnectionValue =
    postgresMaxConnectionResult?.rows[0]?.max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const postgresOpenedConnectionsResult = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });

  const postgresOpenedConnectionsValue =
    postgresOpenedConnectionsResult?.rows[0]?.count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersionValue,
        max_connections: parseInt(postgresMaxConnectionValue),
        opened_connections: postgresOpenedConnectionsValue,
      },
    },
  });
}
