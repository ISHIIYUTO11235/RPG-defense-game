let activeWeapon;
let page = 0;

function shopTimer(){
  g.fillStyle =  "rgba(0,0,0)";

  g.fillRect(10,20,300,380);
  g.font = "20px monospace"
  g.fillStyle = "white";
  g.fillText("次のwaveに備えてください",30,40);



 for(let i = 0;i<3;i++){
 let weapon = weapons[i+page*3];
 g.fillStyle = "white";
   g.fillText(weapon.name+":攻"+weapon.pawer+":範囲"+weapon.atRange,25,i*35+80);
   g.fillText("$"+weapon.point,210,i*35+80);


   weaponBuyBtn(weapon,260,i*35+60,50,25);






}//weapons forEnd

for(let i = 0;i<3;i++){
let foot = foots[i+page*3];
g.fillStyle = "white";
  g.fillText(foot.name+":速"+foot.speed,25,i*35+200);
  g.fillText("$"+foot.point,210,i*35+200);


  footBuyBtn(foot,260,i*35+180,50,25);

}//foots forEnd
 g.fillStyle = "white";
 g.fillText("所持＄"+player.point,30,390);
 g.fillText("装備:"+player.foot.name+":"+player.weapon.name,130,390);

battleBtn(25,330,60,30);
pageSys();
eventX=0;
eventY=0;//勝手にボタンを押さないようにマウスの位置を0,0にしてる
}

function pageSys(){
  leftPageBtn(75,290,30,30);
  rightPageBtn(215,290,30,30);
    //rightPageBtn(215,290,30,30);
}

function leftPageBtn(x,y,width,height){
  g.fillStyle ="white";
  g.fillRect(x,y,width,height);
  g.fillStyle="black";
  g.fillText("<",x+5,y+23);
  if(eventY>=y&&eventY<=y+height){
    if(eventX>=x&&eventX<=x+width){

      if(page>0){
        page--;
        console.log(page);
      }

    }
  }
}

function rightPageBtn(x,y,width,height){
  g.fillStyle ="white";
  g.fillRect(x,y,width,height);
  g.fillStyle="black";
  g.fillText(">",x+12,y+23);
  if(eventY>=y&&eventY<=y+height){
    if(eventX>=x&&eventX<=x+width){

      if(page<weapons.length/3-1){
        page++;
        console.log(page);
      }

    }
  }
}
/*
function rightPage(){
  page++;
  console.log(page);
}

function leftPage(){
  page--;
}
*/


function battleBtn(x,y,width,height){

  g.fillStyle = "red";
g.fillRect(x,y,width,height);
g.fillStyle ="white";
g.fillText("戦闘",x+10,y+22);
if(eventY>=y&&eventY<=y+height){
  if(eventX>=x&&eventX<=x+width){
    console.log("battleStert");
    clearInterval(timer2);
    timer = setInterval(function(){wmTimer()},1000/frame);

    console.log("敵数"+enNum)
    waveCount++;//


    for(let i = 0;i<waveMonsters[waveCount].length;i++){


  //name,hp,maxHp,img,x,y,point,direction
  monsters[i] = new Monster(waveMonsters[waveCount][i].name,waveMonsters[waveCount][i].hp,waveMonsters[waveCount][i].maxHp,waveMonsters[waveCount][i].img,random(0,300),random(0,380),waveMonsters[waveCount][i].point,0,waveMonsters[waveCount][i].speed,function(monsterLoad){waveMonsters[waveCount][i].skill(monsterLoad)});//配列の複製 ディープコピー
gameOverCount = gameOverLimit;
}
/*
    for(let i = 0;i<enNum*waveCount;i++){
                            //(name,hp,maxHp,img,x,y,point,direction)
      monsters[i] = new Monster("スライム",10,10,"photo/goblin.png",50,50,2,0);
    }//fo
    */

  }
}


}

function weaponBuyBtn(eq,x,y,width,height){//(武器,ボタンの始まり位置ｘ,ボタンの終わり位置ｙ,ボタンの幅、ボタンの高さ)
  g.fillRect(x,y,width,height);
  if(eventX>=x&&eventX<x+width){
    if(eventY>=y&&eventY<y+height){
      g.fillStyle ="black";



      if(eq.buy == 0){//購入時の処理
        if(player.point >=eq.point){
          player.point -= eq.point;//所持お金を値段分マイナス
          buySou.currentTime = 0;
          buySou.play();
          console.log("購入しました"+eq.name);

          eq.buy = 1;　　//購入済みだが非装備状態に移行

        }else{
          cantBuySou.currentTime = 0;
          cantBuySou.play();
        }

      }else if(eq.buy == 1){//購入済みの場合に装備する処理
        eqSou.currentTime = 0;
        eqSou.play();
       player.playerEqWeapon(eq);
        console.log("攻撃力"+player.pawer);
        console.log("速さ"+player.speed);

        eq.buy=2;
      }else if(eq.buy ==2){





      }
    }
  }

  g.fillStyle="black";

  if(eq.buy==0){
    g.fillText("buy",x+10,y+20);
  }else if(eq.buy==1){
    g.fillText("eq",x+10,y+20);

  }else if(eq.buy==2){
    g.fillStyle = "grey";
    g.fillRect(x,y,width,height);
    g.fillStyle = "black";
    g.fillText("eq",x+10,y+20);


  }
}

function footBuyBtn(eq,x,y,width,height){//(武器,ボタンの始まり位置ｘ,ボタンの終わり位置ｙ,ボタンの幅、ボタンの高さ)
  g.fillRect(x,y,width,height);
  if(eventX>=x&&eventX<x+width){
    if(eventY>=y&&eventY<y+height){
      g.fillStyle ="black";



      if(eq.buy == 0){//購入時の処理
        if(player.point >=eq.point){
          player.point -= eq.point;//所持お金を値段分マイナス
          buySou.currentTime = 0;
          buySou.play();
          console.log("購入しました"+eq.name);

          eq.buy = 1;　　//購入済みだが非装備状態に移行

        }else{
          cantBuySou.currentTime = 0;
          cantBuySou.play();
        }

      }else if(eq.buy == 1){//購入済みの場合に装備する処理
       player.playerEqFoot(eq);
       eqSou.currentTime = 0;
       eqSou.play();
        console.log("攻撃力"+player.pawer);
        console.log("速さ"+player.speed);

        eq.buy=2;
      }else if(eq.buy ==2){





      }
    }
  }

  g.fillStyle="black";

  if(eq.buy==0){
    g.fillText("buy",x+10,y+20);
  }else if(eq.buy==1){
    g.fillText("eq",x+10,y+20);

  }else if(eq.buy==2){
    g.fillStyle = "grey";
    g.fillRect(x,y,width,height);
    g.fillStyle = "black";
    g.fillText("eq",x+10,y+20);


  }
}
