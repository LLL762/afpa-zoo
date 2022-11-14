import { Express } from "express";
import http from "http";

const init = (app: Express) => {
  const server = http.createServer(app);
  const port = process.env.SERVER_PORT ?? 3000;
  server.listen(port, () => console.log(`Server starts on port ${port}`));
};

export default { init };
