import { spawn, type ChildProcess } from "node:child_process";

const apiPort = process.env.API_PORT ?? process.env.PORT ?? "3001";

function run(command: string, args: string[], env: NodeJS.ProcessEnv = process.env): ChildProcess {
  return spawn(command, args, {
    stdio: "inherit",
    shell: true,
    env,
  });
}

const server = run("tsx", ["watch", "--env-file=.env", "server/index.ts"], {
  ...process.env,
  PORT: apiPort,
});
const clientEnv: NodeJS.ProcessEnv = { ...process.env, API_PORT: apiPort };
delete clientEnv.PORT;
const client = run("vite", [], clientEnv);

function shutdown() {
  server.kill();
  client.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
