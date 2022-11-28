import { Express } from "express";
import http from "http";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

const init = (app: Express) => {
  if (!server) {
    server = http.createServer(app);
    const port = process.env.SERVER_PORT ?? 3000;

    if (process.env.NODE_ENV !== "test") {
      server.listen(port, () => console.log(`Server started on port ${port}`));
    }
  }
};

const close = () => {
  server.close();
};
export default { init, close };
