/*
*TODO:
*   - Tạo timer
*   - Thêm button Reset, thêm input nhập to do work
*   - 
*/

const POMODORO_TIME = 25;
const SHORT_BREAK_TIME = 5;
const LONG_BREAK_TIME = 10;

let t;
let min = POMODORO_TIME;
let sec = 0;
let triggo = "pomodoro";
let start = false;


$(document).ready(() => {
    $("#timmer").html(`${min}:${sec}`);
    onClickStart();
    onClickReset();
    shortBreak();
    longBreak();
    pomodoro();
})

const timer = () => {
    if (start == true) {
        if (min != 0) {
            if (sec == 0) {
                sec = 59;
                min--;
            } else {
                sec--
            }
            console.log(`${min}:${sec}`);
        } else {
            if (sec != 0) {
                sec--
            } else {
                return;
            }
            console.log(`${min}:${sec}`);
        }
    }
    // console.log(`${min}:${sec}`);
}

const onClickStart = () => {
    $("#startBtn").on('click', () => {
        start = true;
        clearInterval(t);
        t = setInterval(() => {
            timer();
            $("#timmer").html(`${min}:${sec}`);
        }, 1000);
    })
}

const onClickReset = () => {
    $("#resetBtn").on('click', () => {
        start = false;
        sec = 0;
        if (triggo == "pomodoro") {
            min = POMODORO_TIME;
        } else if (triggo == "shortbreak") {
            min = SHORT_BREAK_TIME;
        } else {
            min = LONG_BREAK_TIME;
        }
        $("#timmer").html(`${min}:${sec}`);

    })
}

const pomodoro = () => {
    $("#pomodoro").on("click", () => {
        $("#pomodoro").addClass("active");
        $("#longbreak").removeClass("active");
        $("#shortbreak").removeClass("active");
        triggo = "pomodoro";
        min = POMODORO_TIME;
        sec = 0;
        $("#timmer").html(`${min}:${sec}`);
    })
}

const shortBreak = () => {
    $("#shortbreak").on("click", () => {
        $("#shortbreak").addClass("active");
        $("#pomodoro").removeClass("active");
        $("#longbreak").removeClass("active");
        triggo = "shortbreak";
        min = SHORT_BREAK_TIME;
        sec = 0;
        $("#timmer").html(`${min}:${sec}`);
    })
}

const longBreak = () => {
    $("#longbreak").on("click", () => {
        $("#longbreak").addClass("active");
        $("#pomodoro").removeClass("active");
        $("#shortbreak").removeClass("active");
        triggo = "longbreak";
        min = LONG_BREAK_TIME;
        sec = 0;
        $("#timmer").html(`${min}:${sec}`);
    })
}

