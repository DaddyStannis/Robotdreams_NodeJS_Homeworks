export class HabitMapper {
    mapHabitsToSpreadsheet(habits) {
        const sorted = [...habits].sort((a, b) => a.id - b.id);
        let rows = ["ID\tNAME\tFREQ"];
        for (const {id, name, freq} of sorted) {
            rows.push(`${id}\t${name}\t${freq}`);
        }
        return rows.join("\n");
    }

    mapHabitsToStatsSpreadsheet(habits) {
        const sorted = [...habits].sort((a, b) => a.id - b.id);
        let rows = ["ID\tPERCENT"];
        for (const {id, percent} of sorted) {
            rows.push(`${id}\t${percent}`);
        }
        return rows.join("\n");
    }
}