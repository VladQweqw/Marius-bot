import cron from "node-cron"
import { water_plants, daily_gay } from "./cron_functions.js"
import { get_rng } from "./data.js"

const cron_options = {
    scheduled: true,
    timezone: "Europe/Bucharest"
}

let cron_schedules = [
    {
        name: "Daily Gay Meter",
        time: `${get_rng(59)} 23 * * *`,
        format_time: "23:00",
        callback: daily_gay,
        options: cron_options,
        id: "daily_gay",
    },
    {
        name: "Water Reminder",
        time: "0 10 * * *",
        format_time: "10:00",
        callback: water_plants,
        options: cron_options,
        id: "water_plants"
    },
]

// initialize schedule messages
function init(client) {
    cron_schedules.forEach(({ id, name, time, callback, options}, index) => {
        cron.schedule(time, () => callback(client), options);
        console.log(`${index + 1}. ${name} scheduled!`);
    })
}


export const cron_setup = {
    init: init,
    options: cron_options,
    cron_schedules: cron_schedules
}