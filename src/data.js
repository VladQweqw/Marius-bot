const SERVER_ID = '689569910141091876';
const MY_ID = '375320688669491200';
const STARTED_TIME = new Date().getTime();
const CLASA_CIVILA = '994337722552549466';

const important_members = [
    MY_ID,
    '759830191311945769',
    '493858296785272875',
    "232085801737912320",
    "689768718984806406"
]

export const gay_images = [
    "https://i.pinimg.com/736x/25/17/a1/2517a1621222cbcae5929033803ab285.jpg", // 0 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 1,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 2,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 3,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 4,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 5,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFD43stXr5qQjjUh29GMx04TcLjd-P9B11w&s", // 6
]

export function get_rng(range, floor = true) {
    if(floor)
        return Math.floor(Math.random() * range);

    return Math.random() * range;
}

export function calculateMsToString() {
    const ms = Math.floor(new Date().getTime() - STARTED_TIME);
    console.log(ms);
    let str = ''

    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 1000 / 60) % 60;
    const hours = Math.floor(ms / 1000 / 3600) % 24;
    const days = Math.floor(ms / 1000 / 3600 / 24);

    const time_arr = [days, hours, minutes, seconds]
    const time_format = [["day", "days"], ["hour", "hours"], ["minute", "minutes"], ["second", "seconds"]]


    time_arr.forEach((time, index) => {
        if(time > 0) {
            if(time == 1) {
                str += time + " " + time_format[index][0]
            }else {
                str += time + " " + time_format[index][1];
            }

            str += " ";
        }
    })
    

    return {
        string: str,
        time: time_arr,
    }
}

export const details = {
    SERVER_ID, MY_ID, STARTED_TIME, CLASA_CIVILA, important_members
}