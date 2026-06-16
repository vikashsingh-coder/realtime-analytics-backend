import cluster from "node:cluster";
import os from "node:os";

const totalCpu = os.cpus().length;
console.log("totalCpu", totalCpu);

if (cluster.isPrimary) {
  console.log(`primary process ${process.pid} running`);

  console.log(`forking ${totalCpu} workers`);
  for (let i = 0; i < totalCpu; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} died`);

    console.log("starting new worker...");

    cluster.fork();
  });
} else {
  import("./app");
}
