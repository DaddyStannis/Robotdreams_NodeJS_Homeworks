import { createServer } from "node:http";
import url from "node:url";
import path from "node:path";
import { router, loadRoutes } from "./lib/router.js";
import { jsonBody } from "./middlewares/json-body.mw.js";
import { compose } from "./utils/compose.util.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROUTES_DIR = path.resolve(__dirname, "routes");
const PORT = 4400;

loadRoutes(ROUTES_DIR);

const server = createServer(compose([jsonBody, router]));

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
