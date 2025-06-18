import {HabitModel} from "./habit.model.js";
import {HabitService} from "./habit.service.js";
import {HabitController} from "./habit.controller.js";
import {App} from "./app.js";
import {IOGateway} from "./io.gateway.js";
import {HabitMapper} from "./habit.mapper.js";

const DB_FILE = "db.json";

const model = new HabitModel(DB_FILE);
const service = new HabitService(model);
const mapper = new HabitMapper();
const controller = new HabitController(service, mapper);
const io = new IOGateway();

const app = new App(io);

app.addRoute('add', controller.addHabit.bind(controller), {freq: "string", name: "string"});
app.addRoute('list', controller.getHabitSpreadsheet.bind(controller));
app.addRoute('done', controller.markHabitAsDone.bind(controller), {id: "number"});
app.addRoute('update', controller.updateHabit.bind(controller), {id: "number", freq: "string", name: "string"});
app.addRoute('delete', controller.deleteHabit.bind(controller), {id: "number"});
app.addRoute('stats', controller.getStats.bind(controller));

await app.run();