

/*

let frameCount = 0;
let scoreCount = 0;
let monster;
let playerPevX = 0;
let playerPevY = 0;
let attackBtnSwitch = 0;
let monsterMoveCount = 0;
let waveCount = 0;
var timer;//wmTimer
var timer2//shopTimer
let mapImg = new Image();
let playerImg = new Image();


playerImg.src = "photo/player.png";

let direction;

mapImg.src = "photo/glass.png";
*/

//jquery
$('#frontBtn').hover(
  function(){
    direction=1;
    playerImg.src = "photo/playerBack.png";
  }
  ,function(){

  }
);
$('#rightBtn').hover(
  function(){
    direction=2;
    playerImg.src = "photo/playerRight.png";
  }
  ,function(){

  }
);
$('#backBtn').hover(
  function(){
    direction=3;
    playerImg.src = "photo/player.png";
  }
  ,function(){

  }
);
$('#leftBtn').hover(
  function(){
    playerImg.src = "photo/playerLeft.png";
    direction=4;
  }
  ,function(){

  }
);
$('#attackBtn').click(function(){
  monsters.forEach((monster) => {
    if(monster.distance <= player.atRange){
      monster.hp -= player.pawer;
      g.fillStyle="red";
      g.font = "20px bold";
      g.fillText(player.pawer,monster.x+random(-30,30),monster.y+random(-30,30));

    }

  });
  attackSou.currentTime = 0;
  attackSou.play();
  mainBGM.play();
  monsterSamonSou.currentTime = 0;
  monsterSamonSou.play();
});


window.onkeydown = function(ev){
  let c = ev.keyCode;

  if(c==38||c==87){
    playerImg.src = "photo/playerBack.png";
    direction=1;
  }
  if(c==39||c==68){
    playerImg.src = "photo/playerRight.png";
    direction=2;
  }
  if(c==40||c==83){
    playerImg.src = "photo/player.png";
    direction=3;
  }
  if(c==37||c==65){
    playerImg.src = "photo/playerLeft.png";
    direction=4;
  }
  if(c==32){
    monsters.forEach((monster) => {
      if(monster.distance <= player.atRange){
        monster.hp -= player.pawer;
        g.fillStyle="red";
        g.font = "20px bold";
        g.fillText(player.pawer,monster.x+random(-30,30),monster.y+random(-30,30));

      }

    });
    attackSou.currentTime = 0;
    attackSou.play();
    mainBGM.play();
    monsterSamonSou.currentTime = 0;
    monsterSamonSou.play();

  }
}


window.onload = function(){

  timer = setInterval(function(){wmTimer()},1000/frame);//20F

}





function wmTimer(){

  frameCount++;
  monsterMoveCount++;




  console.log(frameCount);

//背景の描画
for(let y = 0;y<16;y++){
  for(let x = 0;x<16;x++){
    g.drawImage(mapImg,x*32,y*32);
  }
}

playerMove();
playerCollision();


g.drawImage(playerImg,player.x,player.y);//プレイヤーの描画
g.fillStyle = "black";
g.font = "30px monospace";
g.fillText("wave:"+waveCount,5,28);
g.font ="20px monospace";
g.fillText("敵の数"+monsters.length,240,23);
g.fillText("time"+scoreCount,5,53);
g.fillText("ゲームオーバーまで"+gameOverCount,5,75);
g.fillText("所持$"+player.point,5,95);
g.fillText("装備:"+player.weapon.name+":"+player.foot.name,5,115);
g.fillText(message,5,135);


//g.drawImage(monsterImg,200,100);


g.font = "10px monospace";
waveSys();

for(let i= 0;i<monsters.length;i++){//モンスター　foreach;
monster = monsters[i];

//monsterForEach(monster)

monsterMove(monster);
  g.drawImage(monster.img,monster.x,monster.y);//モンスター描画
  g.fillStyle = "black";
  g.fillText(monster.name,monster.x,monster.y);
  g.fillText(monster.mes,monster.x,monster.y+50);
  g.fillStyle ="blue";
  g.fillRect(monster.x,monster.y+35,monster.hp/monster.maxHp*25,5);

  //monster.hp/monster.maxHp*25

    monster.skill(monster);

  monsterDeth(i);


  collision(monster);


}//monsterForEach

if(frameCount%frame==0){//ゲームオーバーの判定と秒を数えてる
  scoreCount++;
  gameOverCount--;
  if(gameOverCount<0||monsters.length>=30){
    g.fillStyle = "black";
    g.font = "30px monospace";

    g.fillText("GAME OVER",100,170);
    g.fillText("到達wave:"+waveCount,100,200);
    g.fillText("タイム:"+scoreCount,120,230);
  clearInterval(timer);


}else if(gameOverCount<=8){
  g.fillStyle = "red";
  g.font ="120px monospace";
  g.fillText(gameOverCount,100,200);
  timeLimitSou.play();
}
}

  playerPevX = player.x;//当たり判定で使う１フレーム前のプレイヤーの座標
  playerPevY = player.y;




}//wmTimer



function waveSys(){




  if(monsters.length == 0){
    clearInterval(timer);

if(waveCount==20){
  let lastScore = "";
  g.fillStyle = "black";
  g.font = "30px monospace";
  g.fillText("クリア！！",100,200);
  g.fillText("タイム:"+scoreCount,120,230);
if(scoreCount<=240){
  lastScore="S";
}else if(scoreCount<=280){
  lastScore="A";
}else if(scoreCount<=320){
  lastScore="B";
}else if(scoreCount<=400){
  lastScore="C";
}else if(scoreCount<=450){
  lastScore="D";
}
  g.fillText("評価;"+lastScore,100,260);
  g.font = "15px monospace"
  g.fillText("スクショして:#厳神",20,290);
  g.fillText("　でツイートしよう",20,310);

}else{
  timer2 = setInterval(function(){shopTimer()},1000/frame);
}


  }




}

function monsterDeth(i){
  if(monsters[i].hp <= 0){
    console.log(monsters[i]+"が死んだ");
    player.point += monsters[i].point;
    monDethSou.currentTime = 0;
    monDethSou.play();


    monsters.splice(i,1);


  }
}

function monsterMove(monster){
  if(monsterMoveCount > monsterMoveFre){
    monsterMoveCount = 0;
  }

  if(monsterMoveCount == random(1,monsterMoveFre)){
    monster.direction = random(0,5);
  }

  switch (monster.direction) {
    case 0:

      break;
    case 1:
     monster.y-= monster.speed;
     break;

    case 2:
     monster.x+= monster.speed;
     break;

    case 3:
     monster.y+= monster.speed;
     break;

    case 4:
    monster.x-= monster.speed;
    break;


  }




}



function playerMove(){

  if(direction==1){
    player.y -= player.speed;

  }else if(direction==2){
    player.x += player.speed;
  }else if(direction==3){
    player.y += player.speed;
  }else if(direction==4){
    player.x -= player.speed;
  }
}
function playerCollision(){
  if(player.y < 0){
    player.y = 370;
  }else if(player.y>370){
    player.y = 0;
  }
  if(player.x < 0){
    player.x = 300;
  }else if(player.x>300){
    player.x=0;
  }
}

function collision(monster){
let x = 0;
let y = 0;


  if(monster.y < 0){
    monster.y = 370;
  }else if(monster.y>370){
    monster.y = 0;
  }
  if(monster.x < 0){
    monster.x = 300;
  }else if(monster.x>300){
    monster.x=0;
  }

  x = player.x-monster.x;
  y = player.y-monster.y;
  monster.distance= x*x+y*y;
  monster.distance =  Math.sqrt(monster.distance);


  if(monster.distance<=15){
    player.x = playerPevX;
    player.y = playerPevY;

    console.log("しょうとつしました");
  }

}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
