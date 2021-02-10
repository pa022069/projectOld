// 40 ~ 60
var default_rotate = 50;
var ua = window.navigator.userAgent;

function getPhone() {
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    if (isAndroid) {
        return 0; // Android
    } else if (isiOS) {
        return 1; // iOS
    } else {
        return 3;
    }
}

function device() {

    window.addEventListener('deviceorientation', () => {
        var alpha = event.alpha,
            beta = event.beta,
            gamma = event.gamma;

        console.log(gamma);

        TweenMax.set("#section__0 video", {
            x: gamma
        });

        // a.innerHTML = Math.round(alpha);
        // b.innerHTML = Math.round(beta);
        // g.innerHTML = Math.round(gamma);
        // default_rotate = Math.round(beta);
        // if (isOrientation) {
        //     if (default_rotate < 40 && default_rotate > 5) {
        //         speed += 1.5;
        //         if (default_rotate < 35) {
        //             speed += 3;
        //         }
        //         if (speed > 8000) {
        //             speed = 8000
        //         }
        //         working(speed);
        //     } else if (default_rotate > 50 && default_rotate < 100) {
        //         speed -= 1.5;
        //         if (default_rotate > 55) {
        //             speed -= 3;
        //         }
        //         if (speed < 0) {
        //             speed = 0
        //         }
        //         working(speed);
        //     }
        // }
    });
}

function onClick() {
    // feature detect
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    device();
                }
            })
            .catch(console.error);
    } else {
        device();
    }
}

$(".alertPop a").click(function () {
    if (getPhone() == 0) {
        device();
    } else if (getPhone() == 1) {
        onClick();
    }
});