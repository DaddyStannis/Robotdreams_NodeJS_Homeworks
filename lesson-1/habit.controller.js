import {Habit} from "./habit.entity.js";

export class HabitController {
    constructor(service, mapper) {
        this._service = service;
        this._mapper = mapper;
    }

    async getHabitSpreadsheet() {
        const habits = await this._service.listHabits();
        return this._mapper.mapHabitsToSpreadsheet(habits);
    }

    async addHabit(dto) {
        const habit = new Habit(dto);
        await this._service.addHabit(habit);
        return "Successfully added habit";
    }

    async markHabitAsDone({id}) {
        await this._service.markHabitAsDone(id);
        return "Successfully marked as done";
    }

    async updateHabit({id, ...rest}) {
        await this._service.updateHabit(id, rest);
        return "Successfully updated habit";
    }

    async deleteHabit({id}) {
        await this._service.deleteHabit(id);
        return "Successfully deleted habit";
    }

    async getStats() {
        const habitsWithStats = await this._service.getDoneStats();
        return this._mapper.mapHabitsToStatsSpreadsheet(habitsWithStats);

    }
}
