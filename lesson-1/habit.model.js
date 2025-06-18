import {Habit} from "./habit.entity.js";
import {BaseModel} from "./base.model.js";

export class HabitModel extends BaseModel {
    async findMany() {
        const array = await this.readFile();
        return array.map((data) => new Habit(data));
    }

    async findOne(where) {
        const array = await this.readFile();
        const found = array.find((h) => h.id === where.id);
        return found ? new Habit(found) : null;
    }

    async create(habit) {
        const habits = await this.readFile();
        habit.id = (habits.sort((a, b) => b.id - a.id)[0]?.id ?? 0) + 1;
        habits.push(habit);
        await this.writeFile(habits);
    }

    async update(habit) {
        const array = await this.readFile();
        const idx = array.findIndex((h) => h.id === habit.id);
        if (idx === -1) {
            throw new Error(`No habit found with id ${habit.id}`);
        }
        array[idx] = habit;
        await this.writeFile(array);
    }

    async deleteOne(where) {
        const array = await this.readFile();
        const newArray = array.filter((h) => h.id !== where.id);
        await this.writeFile(newArray);
    }
}
