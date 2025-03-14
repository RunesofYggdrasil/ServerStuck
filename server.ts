import next from "next";
import { createServer } from "http";
import { parse } from "url";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // if (req.url.startsWith("/api")) {
    //   // Your API handling logic here
    // } else {
    //   // Handle Next.js routes
    //   return app.getRequestHandler()(req, res);
    // }
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);
});
