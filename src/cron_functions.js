import { details, get_rng } from "./data.js";

export function water_plants(client) {
    client.channels.cache.get('994337722552549466').send(`<@689768718984806406> uda plantele`);
};

export function daily_gay(client) {
    let str = '=== OROLOGIUL A BATUT ===\n'
    let max_gay = 0;
    let max_gay_id = '';

    details.important_members.forEach((member) => {
        let rng = get_rng(100);
        
        if(rng > max_gay) {
            max_gay = rng;
            max_gay_id = member;
        }
        str += `<@${member}> esti ${rng}% gay astazi\n`
    })
    str += `---------------->\nCel mai gay nigger de astazi este <@${max_gay_id}> cu ${max_gay}%`;

    client.channels.cache.get('994337722552549466').send(str);
}