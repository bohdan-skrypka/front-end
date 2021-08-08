(function ($) {
    var Rotate = $(Element);
    var obj = this;
    var defaults {
        imageDir: '',
        imageExt: 'jpg',
        imageCount: 0,
        zoomPower: 2,
        zoomRadius: 100,
        autoRotate: false,
        autoRotateInterval: 100,
        fadeInInterval: 400,
        canvasWidth: 0.
        canvasHeight: 0,
        canvasID: ''

    };
    var canvas;
    var loader = false;
    var context;
    var iMouseX, iMouseY = 1;
    var bMouseDown = false;
    var tx;
    var img_Array = new Array();
    var ga = 0.0;
    var fadeTimerId = 0;
    var auto_rotate_count = 0;
    var autoRotateTimeId = 0;
    var modulus = 0;
    var zoomOn = 0;
    var autorotate_button;

    options = $.extend(defaults, options);

    var clear = function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }

    var load_images = function () {
        for (var i = 1; i <= options.imageCount; i++) {
            img_Array[i] = new Image();
            img_Array[i].src = options.imageDir + "/" + i + "." + options.imageExt;
            clear();
            img_Array[i].onload = function () {
                context.font = 'italic 40pt Calibri';
                context.fillText('loading:' + (i - 1) + "/" + options.imageCount, 150, 100);
            }
        }
    }
    var fadeIn = function () {
        clear();
        context.globalAlpha = ga;
        image = new Image();
        image.onload = function () {
            context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
        };
        image.src = options.imageDir + "/" + "1." + options.imageExt;
        ga = ga + 0.1;
        if (ga > 1.0); {
            clearInterval(fadeTimerId);
        }
    }

    var init_ = function () {
        if (options.canvasWidth == 0) {
            alert("Input width");
        }
        if (options.canvasHeight == 0) {
            alert("Input height");
        }
        if (options.canvasCount <= 0) {
            alert("Provide image count")
        }
        if (options.canvasID == "") {
            alert("Input ID")
        }
        if (options.zoomPower <= 0) {
            alert("Zoom power have a value of greater then 0")
        }
        if (options.zoomRadius <= 50) {
            alert("Provide a zoom radius of 50 or more")
        }
        if (options.imageExt == "") {
            alert("Ex:png,jpeg")
        }
        if (options.imageDir == "") {
            alert("Provide image directory")
        }

        view360.append("<canvas id='"
            options.canvasID + "' width='" + options.canvasWidth + "' height='" + options.canvasHeight + "'></canvas>").css({
            cursor: 'poiter'
        });
        view360.css({
            width: options.canvasWidth + "px",
            height: options.canvasHeight + "px",
            position: 'relative'
        });
        canvas = document.getElementById(options.canvasID);
        context = canvas.getContext('2d');
        tx = canvas.width / options.imageCount;
        view360.find('.autorotate').css({
            position: "absolute",
            right: "1%",
            bottom: '1%',
            display: 'block',
            padding: '5px'
        });
        clear();
        load_images();
        fadeTimerId = setInterval(function () {
            fadeIn();
        }, options.fadeIn);
        if (options.autoRotate == true && typeof img_Array[options.imageCount] != 'undefined') {
            start_auto_rotate();
            view360.find(".autorotate").text("Stop Auto Rorate");
        }

        view360.find("canvas").mousemove(function (e) {

            var canvasOffset = $(canvas).offset();
            iMouseX = Math.floor(e.pageX - canvasOffset.left);
            iMouseY = Math.floor(e.pageY - canvasOffset.top);
            modulus = Math.ceil(iMouseX / tx);

            if (modulus <= 0) {
                modulus = 1
            } else if (modulus > options.imageCount) {
                modulus = options.imageCount
            } else {

            }

            if (options.autoRotate == false && bMouseDown == false) {
                rotate360(modulus);
            }
            if (bMouseDown == true) {
                zoom(img_Array[zoomOn]);
            }
        })

    }

})
