import fs from "node:fs";
import path from "node:path";
import { pathToRegex } from "../utils/regex.util.js";

const ENDPOINTS = [];

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

class Param {
  constructor(idx, name) {
    this.idx = idx;
    this.name = name;
  }
}

class Endpoint {
  constructor(method, handler, pattern, params = []) {
    this.pattern = pattern;
    this.method = method;
    this.handler = handler;
    this.params = params;
  }
}

export async function router(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const possibleEndpoints = ENDPOINTS.filter((e) =>
      e.pattern.test(url.pathname)
    );

    if (!possibleEndpoints.length) {
      res.statusCode = 404;
      return res.end("Not Found");
    }

    for (const endpoint of possibleEndpoints) {
      if (req.method === endpoint.method) {
        const segments = url.pathname.split("/").slice(1);
        req.params = endpoint.params.reduce(
          (acc, param) => ({ ...acc, [param.name]: segments[param.idx] }),
          {}
        );
        return endpoint.handler(req, res);
      }
    }
    res.statusCode = 405;
    res.end("Method Not Allowed");
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

export function loadRoutes(dir, filePath = "") {
  for (const file of fs.readdirSync(path.join(dir, filePath))) {
    const fullPath = path.join(filePath, file);
    const stats = fs.statSync(path.join(dir, fullPath));

    if (stats.isDirectory()) {
      loadRoutes(dir, fullPath);
    } else if (file === "route.js") {
      const params = [];
      const segments = fullPath.split("/");
      for (const idx in segments) {
        const segment = segments[idx];
        if (segment.startsWith("[") && segment.endsWith("]")) {
          params.push(new Param(idx, segment.slice(1, -1)));
        }
      }

      import(path.join(dir, fullPath)).then((route) => {
        for (const handler of Object.values(route)) {
          if (ALLOWED_METHODS.includes(handler.name)) {
            const pattern = pathToRegex(fullPath.replace("route.js", ""));
            ENDPOINTS.push(
              new Endpoint(handler.name, handler, pattern, params)
            );
          }
        }
      });
    }
  }
}
