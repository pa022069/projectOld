fb_api = function () {
    var isLogin = false;

    window.fbAsyncInit = function () {
        FB.init({
            appId: '524584828172075', //15碼數字字串不含大括號
            cookie: true,
            xfbml: true,
            version: 'v6.0'
        });

        // FB.Event.subscribe('auth.authResponseChange', function (response) {
        //     if (response.status === 'connected') {
        //         console.log("SUCCESS")
        //         //SUCCESS
        //     } else if (response.status === 'not_authorized') {
        //         console.log("FAILED")
        //         //FAILED
        //     } else {
        //         console.log("UNKNOWN ERROR")
        //         //UNKNOWN ERROR
        //     }
        // });
        FB.getLoginStatus(function (response) { // Called after the JS SDK has been initialized.
            statusChangeCallback(response); // Returns the login status.
        });

        FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response) {
        // console.log(response);
        if (!response.authResponse) {
            isLogin = false;
            console.log("false");
            $(".result__share a").click(function () {
                Login();
            })
        } else {
            isLogin = true;
            console.log("true");
            $(".result__share a").click(function () {
                getUserInfo()
            })
        }
    }

    function Login() {
        FB.login(function (response) {
            if (response.authResponse) {
                $(".popup").addClass("popup--active");
                // getUserInfo();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    function getUserInfo() {
        FB.api('/me', function (response) {
            // console.log(response.name);
            // console.log(response.id);
            ALL_NAME = response.name;
            shareLink()
        });
    }

    function shareLink() {
        window.location.href = 'https://www.facebook.com/dialog/share?app_id=524584828172075&href=' + encodeURIComponent(ALL_LINK + 'app/api/Share.php?' + 'Title=' + ALL_NAME + "是AI指數" + parseInt(score_all) +"%的" + nameArray[ALL_INDEX] + '&Description=' + ALL_DESCRIPTION + '&Pic=' + ALL_INDEX) + "&redirect_uri=" + ALL_LINK;
    }

    function Logout() {
        FB.logout(function (response) {
            console.log(response);
            alert(response);
        });
    }

    {
        $(".popup__link").click(function () {
            getUserInfo();
            // window.location.href = 'https://www.facebook.com/dialog/share?app_id=524584828172075&href=' + encodeURIComponent(ALL_LINK + 'app/api/Share.php?' + 'Title=' + ALL_NAME + "是AI指數" + "85%" + "的" + nameArray[ALL_INDEX] + '&Description=' + ALL_DESCRIPTION + '&Pic=' + ALL_INDEX) + "&redirect_uri=" + ALL_LINK;
        });
        // $(".result__score").click(function() {
        //     Logout();
        // });
        // Logout();
    }
}

var include_fb = new fb_api();