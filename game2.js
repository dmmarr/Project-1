//temp obj to for loop see if player inside and get <img>
player = [
    {
        name: "james",
        id: 265,
        img: "<img src='./james.jpg'>",
    },
    {
        name: "curry",
        id: 124,
        img: "<img src='./curry.jpg'>",
    },
    {
        name: "harden",
        id: 216,
        img: "<img src='./harden.jpg'>",
    },
]

//define array to store selected hero pic img tag <img>
var playerArr = [];
//define a counter to decide 3 heros
var counter = 0;
//on click function to select 3 heros
$(document).on("click", ".imgPick", function () {
    var playerId = $(this).attr("id");
    //if counter smaller than 3 keep choosing hero
    if (counter < 3) {
        //use for loop to decide selected <img>
        for (let j = 0; j < player.length; j++) {
            //get correstpond <img> based on hero id
            if (playerId == player[j].id) {
                counter++;
                //push selected <img> to playArr
                playerArr.push(player[j].img);
            }
        }
    } else if (counter === 3) {
        //execute next step if choose three hero
        console.log("JUMP")
    }
    console.log(playerArr)

    //show selected hero to html just for testing purpose
    $("#nextPlayer").html(playerArr[0] + playerArr[1] + playerArr[2]);

})


//define attack for each round
var attack = 20;
var spTemp = 100 - attack;

//assign style attribute to HP div bar
var hpdecrease = "color: black; background-image: url(./hpbg.jpg);background-repeat: no-repeat; background-size: " + spTemp + "% 100%;"
//when HP decrease below or equals to 0
var hp0 = "color: black; background-image: url(./hpbg.jpg);background-repeat: no-repeat; background-size: 0% 100%;"

$("#attack").on("click", function () {
    if (spTemp > 0) {
        $("#bossHP").attr("style", hpdecrease);
        console.log(spTemp)
    } else {
        $("#bossHP").attr("style", hp0);
    }
})