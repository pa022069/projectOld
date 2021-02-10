//  <input type="file" id="uploadImage" name="uploadImage" accept="image/*" onchange="readInput(this);">

function readInput(input) {
    if (input.files && input.files[0]) {
        var reader, img, orient;
        if (input.files[0].size > 3000000) {
            alert("上傳檔案過大，請選擇其他張圖")
            return false;
        }
        // console.log(input.files[0].size);
        // 讀取文件
        reader = new FileReader();
        reader.onload = function (e) {
            SOURCE_IMG = e.target.result;
            createPic(e.target.result, $("#month").val(), $("#date").val());
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].crossOrigin = '';
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function createPic(_input, _month, _day) {
    var sources = {
        image1: _input,
        image2: 'images/bottle_mask.png',
    };

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    c.width = 190;
    c.height = 608;

    ctx.fillStyle = "rgb(255,255,255, 1)";
    ctx.fillRect(0, 0, 190, 538);

    loadImages(sources, function (images) {
        EXIF.getData(images.image1, function () {
            orient = EXIF.getTag(this, 'Orientation');

            imgWidth = this.width * (400 / this.height);
            imgHeight = 400;
            editPic(images.image1, images.image2, _month, _day);
        });

        $(".upload__content--box").css({
            "opacity": 0
        });
        $(".upload__next, .upload__change").fadeIn();
        $("#canvas").show();
        $(".upload__content--alert").fadeIn(function () {
            setTimeout(function () {
                $(".upload__content--alert").fadeOut();
            }, 600)
        });
    });
}

function editPic(_img, _mask, _month, _day) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 190;
    canvas.height = 608;

    var offsetX = canvas.width / 2;
    var offsetY = canvas.height / 2;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var isDragging = false;

    var drawWidth;
    var drawHeight;

    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    var canMouseX = parseInt(offsetX - pos1);
    var canMouseY = parseInt(offsetY - pos2);

    drawImg()

    function handleMouseDown(e) {
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the drag flag
        isDragging = true;
    }

    function handleMouseUp(e) {
        offsetX = parseInt(offsetX - pos1);
        offsetY = parseInt(offsetY - pos2);
        // clear the drag flag
        isDragging = false;
    }


    function handleMouseMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
        // if the drag flag is set, clear the canvas and draw the image
        if (isDragging) {

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;

            canMouseX = parseInt(offsetX - pos1);
            canMouseY = parseInt(offsetY - pos2);

            drawImg()
        }
    }

    function drawImg() {
        drawWidth = imgWidth;
        drawHeight = imgHeight;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = "rgb(255,255,255, 1)";
        ctx.fillRect(0, 0, 190, 538);

        ctx.save();

        ctx.translate((canMouseX - drawWidth / 2) + (drawWidth / 2), drawHeight / 2)
        if (orient == 6) {
            ctx.rotate((Math.PI / 180) * 0);
        } else if (orient == 1) {
            ctx.rotate((Math.PI / 180) * 0);
        } else if (orient == 3) {
            ctx.rotate((Math.PI / 180) * 0);
        } else {
            ctx.rotate((Math.PI / 180) * 0);
        }

        ctx.translate(-((canMouseX - drawWidth / 2) + (drawWidth / 2)), -(drawHeight / 2));
        ctx.drawImage(_img, canMouseX - drawWidth / 2, (drawHeight / 2) - 63, drawWidth, drawHeight);
        ctx.restore();

        // Grayscale START
        // var imageData = ctx.getImageData(0, 0, 193, 608);
        // var data = imageData.data;

        // for (var i = 0; i < data.length; i += 4) {
        //     var brightness = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        //     // red
        //     data[i] = brightness;
        //     // green
        //     data[i + 1] = brightness;
        //     // blue
        //     data[i + 2] = brightness;
        // }
        // ctx.putImageData(imageData, 0, 0);
        // Grayscale END

        var grd = ctx.createLinearGradient(0, 0, 0, 538);
        grd.addColorStop(0.23, "rgba(" + monthColor[_month][0] + "," + monthColor[_month][1] + "," + monthColor[_month][2] + ", 1)");
        grd.addColorStop(1, "rgba(" + dayColor[_day][0] + "," + dayColor[_day][1] + "," + dayColor[_day][2] + ", 0.5)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 190, 538);

        ctx.drawImage(_mask, 0, 0, 190, 608);
    }

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });

    canvas.addEventListener("touchstart", handleDown, false);
    canvas.addEventListener("touchmove", handleMove, false);
    canvas.addEventListener("touchend", handleUp, false);

    function handleDown(e) {
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;

        // set the drag flag
        isDragging = true;
    }

    function handleMove(e) {
        e.preventDefault();
        if (isDragging) {

            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;

            canMouseX = parseInt(offsetX - pos1);
            canMouseY = parseInt(offsetY - pos2);

            drawImg()
        }
    }

    function handleUp(e) {
        offsetX = parseInt(offsetX - pos1);
        offsetY = parseInt(offsetY - pos2);
        // clear the drag flag
        isDragging = false;
    }
}
