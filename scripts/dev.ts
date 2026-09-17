import { spawn, type ChildProcess } from "node:child_process";

function run(command: string, args: string[]): ChildProcess {
  return spawn(command, args, { stdio: "inherit", shell: true });
}

const server = run("tsx", ["watch", "--env-file=.env", "server/index.ts"]);
const client = run("vite", []);

function shutdown() {
  server.kill();
  client.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
