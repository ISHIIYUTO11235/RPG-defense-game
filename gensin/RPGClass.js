let ca = document.getElementById("canvas");
let g = ca.getContext("2d");
let monsters = [];//敵を格納する配列
let enNum = 2;//敵の数
var eventX = 0;
var eventY = 0;
let frame = 20;
let monsterMoveFre = 40;//モンスターが動く頻度　高い程　方向が変わりずらい
let waveMonsters =[];
let gameOverCount = 0;
let gameOverLimit = 40;//各waveの　ゲームオーバーまでの時間
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
let message = "";
let messageCount =frame*50*2;


playerImg.src = "photo/player.png";

let direction;

mapImg.src = "photo/glass.png";

let mainBGM = new Audio("music/mainBGM.mp3");
mainBGM.volume = 0.2;
let monDethSou = new Audio("music/monDeth.mp3");
let attackSou = new Audio("music/attack.mp3");
let buySou = new Audio("music/buy.mp3");
let cantBuySou = new Audio("music/cantBuy.mp3");
let eqSou = new Audio("music/eq.mp3");
let timeLimitSou = new Audio("music/timeLimit.mp3");
let monsterSamonSou = new Audio("music/monsterSamon.mp3");
let timeChangeSou = new Audio("music/timeSou.mp3");
timeChangeSou.volume = 0.6;

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


ca.addEventListener("click", e => {
  // マウスの座標をCanvas内の座標とあわせるため
  const rect = canvas.getBoundingClientRect();
  const point = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };

  eventX = point.x;
  eventY = point.y;

  // クリック判定処理
});


/*ca.addEventListener("click", function(event) {
  eventX = event.x;
  eventY =event.y;
//クリック時のイベントを記述
console.log(eventX+""+eventY);
},false);*/


class Monster{
  constructor(name,hp,maxHp,img,x,y,point,direction,speed,skill){
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.img = new Image();
    this.img.src = img;
    this.x = x;
    this.y = y;
    this.point = point;
    this.direction = random(0,5);
    this.speed=speed;
    this.skill=skill;

    this.mes="";



  }


}

class CopyMonster{
  constructor(name,hp,maxHp,img,x,y,point,direction,speed,skill){
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.img = img;
    this.x = random(0,300);
    this.y = random(0,380);
    this.point = point+random(0,5);
    this.direction = random(0,5);
    this.speed=speed;
    this.skill = skill;

    this.mes="";



  }


}

class Skill{
  tp(x,monsterLoad,range){
    if(1==random(0,x)){
      if(monsterLoad.distance<range){
        player.x = random(0,320);
        player.y = random(0,400);
          messageLog(monsterLoad.name+"；スキル発動");

          return true;
      }

    }
  }

  copy(x,monster,monsterLoad){//引数！　出現確立　引数２　召喚したいモンスター　引数3　なんのモンスターからだすか
    if(1==random(0,x)){

  monsters[monsters.length] = new Monster(monster.name,monster.hp,monster.maxHp,monster.img,monsterLoad.x,monsterLoad.y,monster.point,monster.direction,monster.speed,function(monsterLoad){monster.skill(monsterLoad)});
  console.log("召喚");
  g.fillStyle="red";
    messageLog(monsterLoad.name+"；スキル発動")
    monsterSamonSou.currentTime = 0;
    monsterSamonSou.play();
    return true;
          }
  }

  heal(x,monsterLoad,healRate){

    if(1==random(0,x)){
      if(monsterLoad.hp<=monsterLoad.maxHp){
      monsterLoad.hp += healRate;
      messageLog(monsterLoad.name+"が回復");
      return true;
    }
    }



  }

  samon(x,monster,monsterLoad){
    if(1==random(0,x)){

  monsters[monsters.length] = new Monster(monster.name,monster.hp,monster.maxHp,monster.img,monsterLoad.x+random(-30,30),monsterLoad.y+random(-30,30),monster.point,monster.direction,monster.speed,function(monsterLoad){monster.skill(monsterLoad)});
  console.log("召喚");
  g.fillStyle="red";
    messageLog(monsterLoad.name+"；スキル発動")
    monsterSamonSou.currentTime = 0;
    monsterSamonSou.play();
    return true;
          }
  }

  boost(x,monsterLoad,speed){
    if(1==random(0,x)){
      monsterLoad.speed += speed;
      g.fillStyle="black";
      messageLog(monsterLoad.name+"のスピード増加")
      return true;
    }
  }

  freez(x,monsterLoad,time,speed,range){
    if(1==random(0,x)){
      if(monsterLoad.distance<range){
      let playerSpeed = player.speed;
      player.speed = speed;
      setTimeout(function(){player.speed+=playerSpeed-speed},time*1000);
      messageLog(monsterLoad.name+"により速度低下");
      return true;

      }
    }
  }

  steal(x,monsterLoad,range){
    if(1==random(0,x)){
      if(monsterLoad.distance<range){
        player.point--;
        messageLog("所持金を盗まれた");
        buySou.currentTime = 0;
        buySou.play();
        return true;

      }
    }
  }

  changeTime(x,monsterLoad,rate){
    if(1==random(0,x)){
      if(frame>rate){
      frame += rate;
      clearInterval(timer);
      timer = setInterval(function(){wmTimer()},1000/frame);
      messageLog("時空が歪んだ");
      timeChangeSou.play();
      return true;

    }
    }
  }


}

const skill = new Skill();

class Player{
  constructor(img,x,y,weapon,foot,speed,pawer,point,atRange){
    this.img=img;
    this.x  =x;
    this.y  =y;
    this.weapon=weapon;
    this.foot=foot;
    this.speed=speed;
    this.pawer=pawer;
    this.point = point;
   this.atRange=atRange;
  }

   playerEqWeapon(eq){
     player.weapon.buy = 1;//前に装備していた装備の状態を解除

     player.weapon=eq;

     player.weapon.buy = 2;
     player.pawer = player.weapon.pawer;
     player.atRange = player.weapon.atRange;

   }

   playerEqFoot(eq){
     player.foot.buy = 1;
     player.foot = eq;
     player.foot.buy = 2;
     player.speed = player.foot.speed;

   }

}

class Equipment{
  constructor(name,speed,pawer,atRange,point,buy){
    this.name = name;
    this.speed = speed+random(1,3);
    this.pawer = pawer+random(1,4);
    this.atRange = atRange;
    this.point = point+random(1,10);
    this.buy = buy;//非購入　0
                  //購入、非装備1
                  //装備 2

  }
}



/*
for(let i = 0;i<enNum;i++){
  monsters[i] = new Monster("スライム",10,10,"photo/goblin.png",50,50,2,0);
}//for文で敵をまとめて格納
/*
let waveMonsters =[];
waveMonsters[0] =[slime,slime];
waveMonsters[1]=[];
*/

let hand = new Equipment("素手",0,1,20,0,2);
let suasi = new Equipment("素足",2,0,0,1,2);

let bokutou = new Equipment("木刀",0,2,27,5,0);
let　ken = new Equipment("剣",0,3,25,10,0);
let bow = new Equipment("弓",0,1,70,30,0);
let　spear = new Equipment("槍",0,4,35,15,0);
let　ken2 = new Equipment("剣2",0,6,25,40,0);
let　ken3 = new Equipment("剣3",0,8,30,60,0);
let gun = new Equipment("拳銃",0,2,90,70,0);
let muramasa = new Equipment("村正",0,10,35,75,0);
let kizuti = new Equipment("きずち",0,20,25,75,0);
let testGun1 = new Equipment("長刀",0,18,30,170,0);
let testGun2 = new Equipment("聖剣",0,8,100,200,0);
let testGun3 = new Equipment("政権",0,12,120,300,0);


let boots = new Equipment("ブーツ",1.3,0,0,5,0);
let plaBoots = new Equipment("厚底ブーツ",1.8,0,0,10,0);
let metalBoots = new Equipment("早靴",2.4,0,0,15,0);
let boots2 = new Equipment("ブーツ2",2.8,0,0,25,0);
let plaBoots2 = new Equipment("厚底ブーツ2",3,0,0,30,0);
let metalBoots2 = new Equipment("金属靴2",3.5,0,0,40,0);
let machineBoots1 = new Equipment("マシンブーツ",4,0,0,50,0);
let machineBoots2 = new Equipment("下駄",4.5,0,0,60,0);
let machineBootsEX = new Equipment("ジェット",4.8,0,0,70,0);
let textBoots1 = new Equipment("靴下",5,0,0,100,0);
let textBoots2 = new Equipment("スニーカー",5.5,0,0,120,0);
let textBoots3 = new Equipment("マッハ靴",6,0,0,200,0);
//let オブジェクト名 = new Equipment("名前",speed,pawer,atRange,point,0);
//(name,speed,pawer,atRange,point,buy)

//
//,boots2,plaBoots2,metalBoots2

//let eqs = [bokutou,ken,spear,bow,ken2,ken3];
let weapons =[bokutou,ken,spear,bow,ken2,ken3,gun,muramasa,kizuti,testGun1,testGun2,testGun3];//攻撃系の武器格納box
let foots = [boots,plaBoots,metalBoots,boots2,plaBoots2,metalBoots2,machineBoots1,machineBoots2,machineBootsEX,textBoots1,textBoots2,textBoots3];//速さをあげるための武器　靴　格納box
//(img,x,y,weapon,foot,speed,pawer,point,atRange)

//(name,hp,maxHp,img,x,y,point,direction,speed)
let slime = new CopyMonster("スライム",5,5,"photo/slime.png",0,0,3,0,1,function(monsterLoad){});
let copySlime = new CopyMonster("セルスライム",7,7,"photo/slime.png",0,0,0,0,1,function(monsterLoad){if(skill.copy(150,copySlime,monsterLoad))mes("細胞分裂",monsterLoad)});
let goblin = new CopyMonster("ゴブリン",10,10,"photo/goblin.png",0,0,4,0,1.3,function(){});
let mushroom1 = new CopyMonster("お化けキノコ1",40,40,"photo/mushroom.png",0,0,4,0,0.5,function(monsterLoad){if(skill.heal(30,monsterLoad,5))mes("回復できちゃうんだよな",monsterLoad)});
let mushroom2 = new CopyMonster("お化けキノコ2",70,70,"photo/mushroom2.png",0,0,4,0,0.5,function(monsterLoad){if(skill.heal(25,monsterLoad,5))mes("回復できちゃうんだよな",monsterLoad);if(skill.freez(100,monsterLoad,3,1,100))mes("どくどく胞子",monsterLoad)});
let fairy = new  CopyMonster("蚊妖精",20,20,"photo/fairy.png",0,0,3,0,4,function(){});
let fairy2 = new  CopyMonster("フェアリー",20,20,"photo/fearii.png",0,0,3,0,4,function(){});
let fireSlime = new CopyMonster("ファイアスライム",35,35,"photo/fireSlime.png",0,0,7,0,2,function(monsterLoad){if(skill.boost(170,monsterLoad,1))mes("ファイヤー!",monsterLoad)});
let sandaSlime = new CopyMonster("雷スライム",60,60,"photo/sandaSlime.png",0,0,10,0,4,function(monsterLoad){if(skill.boost(350,monsterLoad,2))mes("サンダー！",monsterLoad)});
let snake = new CopyMonster("トカゲ",30,30,"photo/snake.png",0,0,11,0,6,function(){});
let snakeEx = new CopyMonster("狂トカゲ",180,80,"photo/snakeEx.png",0,0,40,0,5,function(monsterLoad){if(skill.boost(150,monsterLoad,3))mes("しゅるるる",monsterLoad);});
let medusa = new CopyMonster("メデゥーサ",150,200,"photo/medusa.png",0,0,20,0,5,function(monsterLoad){if(skill.freez(100,monsterLoad,3,0,100))mes("石化せよ...",monsterLoad)});
let waMedusa = new CopyMonster("メデューサ",200,200,"photo/waMedusa.png",0,0,25,0,6,function(monsterLoad){if(skill.freez(100,monsterLoad,3,0,100))mes("石化せよ...",monsterLoad)});
let warpSlime = new CopyMonster("ワープスライム",90,90,"photo/warpSlime.png",0,0,20,0,3,function(monsterLoad){if(skill.tp(60,monsterLoad,100))mes("ワープデス",monsterLoad)});
let thief = new CopyMonster("盗人",80,80,"photo/thief.png",0,0,30,0,8,function(monsterLoad){if(skill.steal(2,monsterLoad,50))mes("いただくぜ",monsterLoad)});
let timeMonster =  new CopyMonster("チック",150,150,"photo/timeMonster.png",0,0,40,0,1,function(monsterLoad){if(skill.changeTime(200,monsterLoad,10))mes("チクタクチクタク",monsterLoad)});
let timeMonster2 =  new CopyMonster("タック",150,150,"photo/timeMonster2.png",0,0,40,0,1,function(monsterLoad){if(skill.changeTime(200,monsterLoad,-10))mes("タクチクタクチク",monsterLoad)});
let necromancer = new CopyMonster("ネクロン",450,400,"photo/necromancer.png",0,0,40,0,1.5,function(monsterLoad){if(skill.samon(100,skeleton,monsterLoad))mes("ヨミガエレ...",monsterLoad);if(skill.heal(40,monsterLoad,15))mes("神ノ慈悲ヲ",monsterLoad)});
let necromancerLoad = new CopyMonster("ネクロンロード",800,320,"photo/NecromancerLoad.png",0,0,40,0,1,function(monsterLoad){if(skill.samon(200,necromancer,monsterLoad))mes("メザメヨ..",monsterLoad);if(skill.heal(40,monsterLoad,50))mes("神ノ慈悲ヲ",monsterLoad)});
let skeleton = new CopyMonster("遺骨",70,140,"photo/skeleton.png",0,0,0,0,1,function(monsterLoad){if(skill.heal(50,monsterLoad,30))mes("コロ..シテ..",monsterLoad)});

//let モンスター = new CopyMonster("モンスター名前",hp,maxHp,"img",0,0,point,0,speed,function(monsterLoad){if()mes()});
waveMonsters[0] = [slime,slime,medusa];

waveMonsters[1] = [slime,slime];

waveMonsters[2] = [slime,copySlime,goblin];

waveMonsters[3] = [slime,slime,goblin,mushroom1];

waveMonsters[4] = [fairy2,mushroom2,fireSlime];

waveMonsters[5] = [fairy,mushroom1,mushroom2];

waveMonsters[6] = [sandaSlime,fireSlime];

waveMonsters[7] = [fairy,fairy,fairy,fairy,fairy];

waveMonsters[8] =[slime,sandaSlime,fireSlime,mushroom1];

waveMonsters[9] =[snake,snake,sandaSlime];

waveMonsters[10] =[snakeEx];

waveMonsters[11]=[thief,thief]

waveMonsters[12] =[timeMonster,timeMonster2];

waveMonsters[13] =[necromancer,skeleton,skeleton];

waveMonsters[14] =[medusa,medusa];

waveMonsters[15] =[medusa,waMedusa,copySlime,];

waveMonsters[16] =[warpSlime,warpSlime,sandaSlime,timeMonster2,copySlime,timeMonster];

waveMonsters[17] =[thief,thief,thief];

waveMonsters[18] =[medusa,necromancer,thief,warpSlime,timeMonster];

waveMonsters[19] =[waMedusa,skeleton,thief];

waveMonsters[20] =[necromancerLoad,skeleton,warpSlime,necromancer,copySlime,timeMonster,waMedusa];
//waveMonsters[] =[];
let player = new Player("photo/player.png",160,200,hand,suasi,2,1,5,20);
//(img,x,y,weapon,foot,speed,pawer,point,atRange)

function messageLog(mes){
  message = mes;
  setTimeout(function(){message=""},messageCount);
}

function mes(mes,monsterLoad){
  monsterLoad.mes =mes;
  setTimeout(function(){monsterLoad.mes=""},2*1000);
}
