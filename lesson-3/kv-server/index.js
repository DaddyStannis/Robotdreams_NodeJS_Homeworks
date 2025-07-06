import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({logger: true});

const REDIS_URL = process.env.REDIS_URL;
const PORT = process.env.PORT || 3000;

fastify.get("/get/:key", async function handler(request) {
    const query = new URLSearchParams({
        key: request.params.key,
    }).toString();
    const response = await fetch(REDIS_URL + "/get?" + query);
    return response.json();
});

fastify.post("/set", async function handler(request) {
    const response = await fetch(REDIS_URL + "/set", {
        method: "POST",
        body: JSON.stringify(request.body),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.json();
});

try {
    await fastify.listen({host: '0.0.0.0', port: PORT});
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
