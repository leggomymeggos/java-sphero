var sphero = require("sphero"),
    orb = sphero("/dev/tty.Sphero-WRB-AMP-SPP", {emitPacketErrors: true});

var direction = 0;
var speed = 0;
color = "violet";

orb.connect(function () {

    console.log("It worked!");
    console.log("Connected! Hooray!");

    orb.color("green");
    setInterval(function () {

        console.log("rolling. Like my rollers.");
        speed = (speed === 50 ? 100 : 50);
        color = (color === "darksalmon" ? "violet" : "darksalmon");

        direction += 150;

        if (direction > 300) {
            direction = 0;
        }

        if(color === "violet"){
            orb.boost(1);
        }

        orb.roll(speed, direction, function () {
            orb.color(color);
        });
    }, 1000);

    orb.detectCollisions();

    orb.on("error", function (err, data) {
        console.log(err);
        console.log("Data", data);
        orb.color("red");
    });


    orb.on("collision", function (data) {
        console.log("collision detected");
        //console.log("  data:", data);
        orb.color("blue");
    });
});