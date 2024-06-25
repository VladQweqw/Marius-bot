import cron from "node-cron"

import { water_plants, daily_gay } from './data.js';

const cron_options = {
    scheduled: true,
    timezone: "Europe/Bucharest"
}

const cron_schedules = [
    {
        name: "Daily gay meter",
        time: "59 23 * * *",
        callback: daily_gay,
        options: cron_options
    },
    {
        name: "Water reminder",
        time: "0 10 * * *",
        callback: water_plants,
        options: cron_options
    },
]

// initialize schedule messages

function init() {
    cron_schedules.forEach(({ name, time, callback, options}) => {
        cron.schedule(time, callback, options);
        console.log(name + " scheduled");
    })
}


export const cron_setup = {
    init: init,
    options: cron_options,
    cron_schedules: cron_schedules
}