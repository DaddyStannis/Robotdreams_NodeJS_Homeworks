import {ConflictError, NotFoundError, ValidationError} from "./errors.js";

export class HabitService {
    constructor(model) {
        this._model = model;
    }

    async listHabits() {
        return await this._model.findMany();
    }

    async markHabitAsDone(id) {
        const habit = await this._model.findOne({id});
        if (!habit) {
            throw new NotFoundError(`Habit with id ${id} not found`);
        }
        if (habit.wasDoneToday) {
            throw new ConflictError(`Habit with id ${id} already done`);
        }
        habit.markAsDone();
        await this._model.update(habit);
    }

    async addHabit(habit) {
        const [falsy, errors] = habit.validate();
        if (falsy) {
            throw new ValidationError(errors);
        }
        await this._model.create(habit);
    }

    async updateHabit(id, partial) {
        const habit = await this._model.findOne({id});
        if (!habit) {
            throw new NotFoundError(`Habit with id ${id} not found`);
        }
        habit.update(partial);
        const [falsy, errors] = habit.validate();
        if (falsy) {
            throw new ValidationError(errors);
        }
        await this._model.update(habit);
    }

    async deleteHabit(id) {
        const habit = await this._model.findOne({id});
        if (!habit) {
            throw new NotFoundError(`Habit with id ${id} not found`);
        }
        await this._model.deleteOne({id});
    }

    async getDoneStats(period = 7) {
        const habits = await this._model.findMany();
        const now = new Date();
        const start = new Date(now);
        start.setDate(now.getDate() - period);

        return habits.map(habit => {
            const hits = habit.hits
                .map(hit => new Date(hit.doneAt))
                .filter(date => date >= start);
            let actual = 0;
            let possible = 0;

            if (habit.freq === 'daily') {
                actual = new Set(hits.map(d => d.toDateString())).size;
                possible = period;
            }
            if (habit.freq === 'weekly') {
                actual = hits.length > 0 ? 1 : 0;
                possible = Math.ceil(period / 7);
            }
            if (habit.freq === 'monthly') {
                actual = hits.length > 0 ? 1 : 0;
                possible = 1;
            }
            const percent = possible === 0 ? 0 : Math.round((actual / possible) * 100);

            return {
                id: habit.id,
                name: habit.name,
                freq: habit.freq,
                percent
            };
        });
    }

}
