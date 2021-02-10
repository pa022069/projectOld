// 換頁

function pageLeave(_index, _target) {
    $(".step" + _index).animate({
        opacity: 0,
        top: 90
    }, 300, () => {
        $(".step" + _index).css({
            "visibility": "hidden"
        });
        pageEnter(_target);
    });
}

// pageLeave(3, 2)

// 滑鼠位置

function getMousePos(event) {
    var e = event || window.event;
    // return {'x':e.clientX,'y':e.clientY}
    $(".plus").css({
        "top": e.clientY + "px",
        "left": e.clientX + "px"
    });
    TweenMax.fromTo($(".plus"), 1.5, {
        y: 0,
        opacity: 1
    }, {
        y: -10,
        opacity: 0
    })
}

// 驗證

var dd = new Date();
var re = /^[0]{1}[9]{1}[0-9]{8}$/;
var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

// 更新網址

history.pushState("", "", "/game.html");