//Global variables
var hero =[ 
{
    health : 100,
    choice : 1,
    attack : 5000,
    heal : 5000,
    defend : 5000,
    imageUrl : "assets/images/GreenGem.png",
},
{
    health : 100,
    choice : 1,
    attack : 5000,
    heal : 5000,
    defend : 5000,
    imageUrl : "assets/images/GreenGem.png",
},
{
    health : 100,
    choice : 1,
    attack : 5000,
    heal : 5000,
    defend : 5000,
    imageUrl : "assets/images/GreenGem.png",
}
]
bossHealth = 100000;
bossAttack = 25;
var time = 10;
var selectCount = 0;
var weatherStatus = "Standard";
//////////////////////////////////
function getWeather(){
    
    var cityName = ["visalia", "laguna beach","nuuk","boston","seattle"]
    var cPick = Math.floor(Math.random() * 6);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName[cPick] + "&appid=4098bcaff4e91d165d5b7086ff5b2036";
    axios({
        url: queryURL,
        method: "GET",
    }).then(function (result) {
        //grab temp Kelvin as factor that affecting players' status
        var tempK = (result.data.main.temp);
        //convert K to F
        var tempF = Math.floor((tempK - 273.15) * 9/5 + 32);
        var humid = (result.data.main.humidity);
        var windy = (result.data.wind.speed)

        if (tempF>90){
            $("#weather").attr("src","./assets/images/sun-use.png");
            weatherStatus="heatwave";
            console.log(weatherStatus);
        }
        else if (tempF<40){
            $("#weather").attr("src","./assets/images/snow-use.png");
            weatherStatus="snow";
            console.log(weatherStatus);
        }
        else if (humid>70){
            $("#weather").attr("src","./assets/images/thunder.png");
            weatherStatus="rainy";
            console.log(weatherStatus);
        }
        else if (windy>7){
            $("#weather").attr("src","./assets/images/wind-use.png");
            weatherStatus="windy";
            console.log(weatherStatus);
        }
        else{
            $("#weather").attr("src","./assets/images/Sun-summer-nature-weather-512.png");
            weatherStatus="standard";
            console.log(weatherStatus);
        }
    }).catch(function (err) {
        console.error(err)
    })
}
    
function characterSelect(){
$(document).on("click", ".imgPick", function () {
    var playerId = $(this).attr("id");
    if (characters[playerId].pick === 0){
        characters[playerId].pick = 1;
        $("#pickBack"+[playerId]).css("background", "lightgreen");
        
    }
    else{
        characters[playerId].pick = 0;
        $("#pickBack"+[playerId]).css("background", "white");
    }
})
}

function selectedCharater(){
    for(var i5=0;i5<characters.length;i5++){
        if(characters[i5].pick === 1){
            if(selectCount<3){
            localStorage.setItem("attack"+selectCount,characters[i5].attack);
            localStorage.setItem("defense"+selectCount,characters[i5].defense);
            localStorage.setItem("support"+selectCount,characters[i5].support);
            localStorage.setItem("image"+selectCount,characters[i5].imageUrl);
            selectCount++;
            }
            else{
                i5=100;
                selectCount=10;
            }
        }
    }
}
function assignProperties(){
    for (var i6=0;i6<3;i6++){
        hero[i6].attack = localStorage.getItem("attack"+i6);
        hero[i6].defend = localStorage.getItem("defense"+i6);
        hero[i6].heal = localStorage.getItem("support"+i6);
        hero[i6].imageUrl = localStorage.getItem("image"+i6);
        $("#hero"+i6+"Pic").attr("src",hero[i6].imageUrl);
    }
}
function battleStart(){
    $("#startButton").on("click", function () {
        selectedCharater();
        if (selectCount === 3){
            window.location.assign("battleScreen.html");
            selectCount = 0;
        }
        else{
            alert("need to have 3 players");
            console.log(selectCount);
            selectCount = 0;
        }
    });
}


var characters = [
    {
        name: "Russell Westbrook",
        pId: 544,
        attack: 1,
        defense: 1,
        support: 1,
        status: [],
        pick: 0,
        imageUrl: "./assets/images/images/Westbrook.jpg",   
    },
    {
        name: "James Harden",
        pId: 216,
        attack: 1,
        defense: 1,
        support: 1,
        pick: 0,
        imageUrl: "./assets/images/images/harden.jpg", 
    },
        {
        name: "Damian Lillard",
        pId: 319,
        attack: 1,
        defense: 1,
        support: 1,
        pick: 0,
        imageUrl: "./assets/images/images/lillard.jpg", 
    },
    {
        name: "Giannis Antetokounmpo",
        pId: 20,
        attack: 1,
        defense: 1,
        support: 1,
        pick: 0,
        imageUrl: "./assets/images/images/Antetokounmpo.jpg", 
    },
    {
        name: "Andre Drummond",
        pId: 147,
        attack: 1,
        defense: 1,
        support: 1,
        pick: 0,
        imageUrl: "./assets/images/images/Drummond.jpg", 
    },
    {
        name: "Kawhi Leonard",
        pId: 314,
        attack: 1,
        defense: 1,
        support: 1,
        imageUrl: "./assets/images/images/Leonard.jpg", 
    },
    {
        name: "LeBron James",
        pId: 265,
        attack: 1,
        defense: 1,
        support: 1,
        pick: 0,
        imageUrl: "./assets/images/images/james.jpg", 
    },
    {
        name: "Anthony Davis",
        pId: 126,
        attack: 1,
        defense: 1,
        support: 1,
        pick: 0,
        imageUrl: "./assets/images/images/davis.jpg", 
    },
    {
        name: "Stephen Curry",
        pId: 124,
        attack: 1,
        defense: 1,
        support: 1,
        pick: 0,
        imageUrl: "./assets/images/images/curry2.png", 
    },
]

 for (var i2=0;i2<characters.length;i2++){
     getPlayerAtk(characters[i2].pId,i2);
    
 }
 for (var i3=0;i3<characters.length;i3++){
    getPlayerDfc(characters[i3].pId,i3);
    
}
for (var i4=0;i4<characters.length;i4++){
    getPlayerSpt(characters[i4].pId,i4);
    
}

//average attack 8679
//average defense 2306
//average support 2038



function getPlayerAtk(playerId,playerNum){
        
    var queryURL = "https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/" + playerId;
    var attack = 0;
    axios({
        url: queryURL,
        method: "GET",
        headers: {
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "89eea62dadmsh504c2e9803e56e9p1856cbjsnb7c7d69b1c85"
        }
    }).then(function (result) {
        //grab total points data as player attack 
        for (let i = 0; i < result.data.api.statistics.length; i++) {
            if (result.data.api.statistics[i].points !== "") {
                attack = attack + parseInt(result.data.api.statistics[i].points);
            }
        }
        characters[playerNum].attack = attack;
        console.log(attack);
    }).catch(function (err) {
        console.error(err)
    })
}


function getPlayerDfc(playerId,playerNum){
        
    var queryURL = "https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/" + playerId;
    var defend = 0;
    axios({
        url: queryURL,
        method: "GET",
        headers: {
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "89eea62dadmsh504c2e9803e56e9p1856cbjsnb7c7d69b1c85"
        }
    }).then(function (result) {
        //grab total points data as player attack 
        for (let i = 0; i < result.data.api.statistics.length; i++) {
            if (result.data.api.statistics[i].defReb !== "") {
                defend = defend + parseInt(result.data.api.statistics[i].defReb);
            }
        }
        characters[playerNum].defense = defend;
        console.log(defend);
    }).catch(function (err) {
        console.error(err)
    })
}
function getPlayerSpt(playerId,playerNum){
        
    var queryURL = "https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/" + playerId;
    var support = 0;
    axios({
        url: queryURL,
        method: "GET",
        headers: {
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "89eea62dadmsh504c2e9803e56e9p1856cbjsnb7c7d69b1c85"
        }
    }).then(function (result) {
        //grab total points data as player attack 
        for (let i = 0; i < result.data.api.statistics.length; i++) {
            if (result.data.api.statistics[i].assists !== "") {
                support = support + parseInt(result.data.api.statistics[i].assists);
            }
        }
        characters[playerNum].support = support;
        console.log(support);
    }).catch(function (err) {
        console.error(err)
    })
}


//HERO 1 CHOICE
function h1Choice(){
    $("#hero1Attack").on("click", function () {
        hero[0].choice = 1;
        $("#hero1Attack").css("color", "black");
        $("#hero1Block").css("color", "white");
        $("#hero1Support").css("color", "white");
    });
    $("#hero1Block").on("click", function () {
        hero[0].choice = 2;
        $("#hero1Attack").css("color", "white");
        $("#hero1Block").css("color", "black");
        $("#hero1Support").css("color", "white"); 
    });
    $("#hero1Support").on("click", function () {
        hero[0].choice = 3;
        $("#hero1Attack").css("color", "white");
        $("#hero1Block").css("color", "white");
        $("#hero1Support").css("color", "black");
    });
}

//HERO 1 ACTION
function h1Action(choice){
if (choice===1){
    hAttack(hero[0].attack);
}
else if (choice===3){
    hHeal(hero[0].heal);
}
}

//HERO 2 CHOICE
function h2Choice(){
    $("#hero2Attack").on("click", function () {
        hero[1].choice = 1;
        $("#hero2Attack").css("color", "black");
        $("#hero2Block").css("color", "white");
        $("#hero2Support").css("color", "white");
    });
    $("#hero2Block").on("click", function () {
        hero[1].choice = 2;
        $("#hero2Attack").css("color", "white");
        $("#hero2Block").css("color", "black");
        $("#hero2Support").css("color", "white"); 
    });
    $("#hero2Support").on("click", function () {
        hero[1].choice = 3;
        $("#hero2Attack").css("color", "white");
        $("#hero2Block").css("color", "white");
        $("#hero2Support").css("color", "black");
    });
}

//HERO 2 ACTION
function h2Action(choice){
if (choice===1){
    hAttack(hero[1].attack);
}
else if (choice===3){
    hHeal(hero[1].heal);
}
}

//HERO 3 CHOICE
function h3Choice(){
    $("#hero3Attack").on("click", function () {
        hero[2].choice = 1;
        $("#hero3Attack").css("color", "black");
        $("#hero3Block").css("color", "white");
        $("#hero3Support").css("color", "white");
    });
    $("#hero3Block").on("click", function () {
        hero[2].choice = 2;
        $("#hero3Attack").css("color", "white");
        $("#hero3Block").css("color", "black");
        $("#hero3Support").css("color", "white"); 
    });
    $("#hero3Support").on("click", function () {
        hero[2].choice = 3;
        $("#hero3Attack").css("color", "white");
        $("#hero3Block").css("color", "white");
        $("#hero3Support").css("color", "black");
    });
}

//HERO 3 ACTION
function h3Action(choice){
if (choice===1){
    hAttack(hero[2].attack);
}
else if (choice===3){
    hHeal(hero[2].heal);
}
}


//HERO ATTACK
function hAttack(hATK){
    if (weatherStatus="heatwave"){
        bossHealth = bossHealth - (Math.round(((hATK*hATK)/100000)+20));
        $("#bossHealth").text(bossHealth);        
    }
    else if(weatherStatus="windy"){
        bossHealth = bossHealth - (Math.round(((hATK*hATK)/100000)));
        $("#bossHealth").text(bossHealth);        
    }
    else{
        bossHealth = bossHealth - (Math.round(((hATK*hATK)/100000)+10));
        $("#bossHealth").text(bossHealth);
    }
};

//HERO HEAL
function hHeal(hHEAL){
    if (weatherStatus="rainy"){
        hero[0].health = hero[0].health + (Math.round((hHEAL*hHEAL)/1000000)+40);
        hero[1].health = hero[1].health + (Math.round((hHEAL*hHEAL)/1000000)+40);
        hero[2].health = hero[2].health + (Math.round((hHEAL*hHEAL)/1000000)+40);
        $("#hero1Health").text(hero[0].health);
        $("#hero2Health").text(hero[1].health);
        $("#hero3Health").text(hero[2].health);
    }
    else{
    hero[0].health = hero[0].health + (Math.round((hHEAL*hHEAL)/1000000)+20);
    hero[1].health = hero[1].health + (Math.round((hHEAL*hHEAL)/1000000)+20);
    hero[2].health = hero[2].health + (Math.round((hHEAL*hHEAL)/1000000)+20);
    $("#hero1Health").text(hero[0].health);
    $("#hero2Health").text(hero[1].health);
    $("#hero3Health").text(hero[2].health);
    }
}


//TURN TIMER
function turnTimer(){
    var myTimer = setInterval(count,1000);  
}
function count(){
    if (time > 0){
        time--;
        $("#timerCt").text(time);
    }
    else{
        time=10;
        h1Action(hero[0].choice);
        h2Action(hero[1].choice);
        h3Action(hero[2].choice);
        youWin();
        bChoice();
        gameOver();
        getWeather();
    }
}


//BOSS FUNCTIONS

//BOSS CHOICE
function bChoice(){
    var pick=Math.floor(Math.random() * 2); 
    //BLOCKING
    if (hero[0].choice===2){
        bSingle(bossAttack)
    }
    else if (hero[1].choice===2){
        bSingle(bossAttack)
    }
    else if (hero[2].choice===2){
        bSingle(bossAttack)
    }
    //NO ONES BLOCKING
    else{
        if (pick===0){
            bSingle(bossAttack)
        }
        else if(pick===1){
            bArea(bossAttack)
        }
    }
}
//BOSS SINGLE ATTACK
function bSingle(bATK){
    if (weatherStatus="snow"){
        bATK = bATK-300;
            if (bATK<0){
                bATK=1;   
            }
    }
    var target = Math.floor(Math.random() * 3);
    //BLOCKING
    if (hero[0].choice===2){
        hero[0].health = hero[0].health-(Math.round(bATK/2));
        $("#hero1Health").text(hero[0].health);
    }
    else if (hero[1].choice===2){
        hero[1].health = hero[1].health-(Math.round(bATK/2));
        $("#hero2Health").text(hero[1].health);
    }
    else if (hero[2].choice===2){
        hero[2].health = hero[2].health-(Math.round(bATK/2));
        $("#hero3Health").text(hero[2].health);
    }
    //NO ONES BLOCKING
    else{
        if(target===0){
            hero[0].health = hero[0].health - bATK;
            $("#hero1Health").text(hero[0].health);
        }
        else if(target===1){
            hero[1].health = hero[1].health - bATK;
            $("#hero2Health").text(hero[1].health);
        }
        else if(target===2){
            hero[2].health = hero[2].health - bATK;
            $("#hero3Health").text(hero[2].health);
        }
    }
}
//BOSS AOE
function bArea(bATK){
    hero[0].health = hero[0].health-(Math.round(bATK/2));
    hero[1].health = hero[1].health-(Math.round(bATK/2));
    hero[2].health = hero[2].health-(Math.round(bATK/2));
    $("#hero1Health").text(hero[0].health);
    $("#hero2Health").text(hero[1].health);
    $("#hero3Health").text(hero[2].health);
}
function gameStart(){
    $("#start-button").on("click", function () {
        window.location.assign("charSelect.html");
    });
}

function gameOver(){
    if (hero[0].health<=0 && hero[1].health<=0 && hero[2].health<=0){
        window.location.assign("game-end-lost.html");
    }
}

function youWin(){
    if (bossHealth<=0){
        window.location.assign("end-game-win.html");
    }
}

    
//Start Game
gameStart();
//Character select
characterSelect();
battleStart();
//Battle Screen
assignProperties();
getWeather();
turnTimer();
h1Choice();
h2Choice();
h3Choice();




