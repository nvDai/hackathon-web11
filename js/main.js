/*
*TODO:
*   - Tạo timer
*   - Thêm button Reset, thêm input nhập to do work
*   - Thêm time, work vào local, reload trang lưu trạng thái local cũ
    - Time chạy trên title
    - Set nhạc, volumn
    - shortcut
    - background thay đổi theo time
    - Design page khi start time: box công việc

TODO:
    - front-end:
        + Fix cứng time
        + Hiệu ứng button
        + Thêm việc: hiệu úng thêm từ từ, input có thêm done vs delete
        + khi click start thì mất 3 button: pomodoro, short, long
        + Back-ground thay đổi theo thời gian
        + 

*/



Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

localStorage.setObj('POMODORO_TIME', 25);
localStorage.setObj('SHORT_BREAK_TIME', 5);
localStorage.setObj('LONG_BREAK_TIME', 10);

let POMODORO_TIME = localStorage.getObj('POMODORO_TIME');
let SHORT_BREAK_TIME = localStorage.getObj('SHORT_BREAK_TIME');
let LONG_BREAK_TIME = localStorage.getObj('LONG_BREAK_TIME');

console.log(POMODORO_TIME);
console.log(SHORT_BREAK_TIME);
console.log(LONG_BREAK_TIME);

let t;
let min = POMODORO_TIME;
let sec = 0;
let triggo = "pomodoro";
let start = false;
let autostart = false;

$(document).ready(() => {
    console.log(localStorage);
    renderTimer(min, sec);
    onClickStart();
    onClickReset();
    shortBreak();
    longBreak();
    pomodoro();
    onAddWork();
    // $("#checkBoxAutoStartSequence").each(() => {
    //     if($(this).is(':checked'))
    //         alert($(this).val());
    // })

    // console.log($("#checkBoxAutoStartSequence"))
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
            // renderTimer(min, sec);
            renderTimer(min, sec);
        }, 1000);
    })
}

const renderTimer = (minute, second) => {
    // console.log(minute / 10);
    if (minute - 10 < 0) {
        minute = "0" + minute;
    }
    // console.log(second / 10);
    if (second - 10 < 0) {
        second = "0" + second;
    }

    let time = `${minute} : ${second}`;
    $("#minute").html(minute);
    $("#second").html(second);
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
        renderTimer(min, sec);

    })
}

const pomodoro = () => {
    $("#pomodoro").on("click", () => {
        // $("#pomodoro").addClass("active");
        // $("#longbreak").removeClass("active");
        // $("#shortbreak").removeClass("active");
        triggo = "pomodoro";
        min = POMODORO_TIME;
        sec = 0;
        renderTimer(min, sec);
    })
}

const shortBreak = () => {
    $("#shortbreak").on("click", () => {
        // $("#shortbreak").addClass("active");
        // $("#pomodoro").removeClass("active");
        // $("#longbreak").removeClass("active");
        triggo = "shortbreak";
        min = SHORT_BREAK_TIME;
        sec = 0;
        renderTimer(min, sec);
    })
}

const longBreak = () => {
    $("#longbreak").on("click", () => {
        // $("#longbreak").addClass("active");
        // $("#pomodoro").removeClass("active");
        // $("#shortbreak").removeClass("active");
        triggo = "longbreak";
        min = LONG_BREAK_TIME;
        sec = 0;
        renderTimer(min, sec);
    })
}

const onAddWork = () => {

    $("#addwork").keyup(function (e) {
        let input = $("#addwork").val();
        console.log(input);
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) e.preventDefault();
        if (code == 13 && input !== "") {
            $("#work-list").append(
                `<div>
                    </div><input type="text" class="form-control" id="input" value=${input}>
                </div>`
            )
        } // missing closing if brace
    });

    // $("#addwork").on("input", () => {
    //     let input = $("#input").val();

    //     if (input !== "") {
    //         $("#work-list").append(
    //             `<div>
    //                 </div><input type="text" class="input-work" id="input" value=${input}>
    //                 <button class="btn" id="add-btn">Done</button>
    //             </div>`
    //         )
    //     } else {
    //         $("#work-adding").append(
    //             `<p>Vui lòng nhập công việc cần thực hiện của bạn.</p>`
    //         )
    //     }
    // })
}


/*========================== SETTINGS POP-UP==========================*/

// Phải time lưu vào local storage sau đó reload lại page
const onSaveSettings = () => {
    // if ($("#checkBoxAutoStartSequence").prop('checked', true)) {
    //     console.log("Checked");
    //     autostart = true;
    // } else {
    //     autostart = false;
    //     console.log("Not checked")
    // }
    // console.log($("#checkBoxAutoStartSequence"));

    let timePomodoro = $("#time_pomodoro").val();
    let timeShortBreak = $("#time_shortbreak").val();
    let timeLongBreak = $("#time_longbreak").val();

    // POMODORO_TIME = timePomodoro ? timePomodoro : POMODORO_TIME;
    // SHORT_BREAK_TIME = timeShortBreak ? timeShortBreak : SHORT_BREAK_TIME;
    // LONG_BREAK_TIME = timeLongBreak ? timeLongBreak : LONG_BREAK_TIME;
    // console.log(POMODORO_TIME);
    // console.log(SHORT_BREAK_TIME);
    // console.log(LONG_BREAK_TIME);

    if (timePomodoro !== '') {
        localStorage.setObj('POMODORO_TIME', timePomodoro);
    }

    if (timeShortBreak !== '') {
        localStorage.setObj('SHORT_BREAK_TIME', timeShortBreak);
    }

    if (timeLongBreak !== '') {
        localStorage.setObj('LONG_BREAK_TIME', timeLongBreak);
    }

    console.log(localStorage);
    // renderTimer(min, sec);
    // location.reload();
}

