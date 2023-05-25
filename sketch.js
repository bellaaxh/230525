// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]]; //袋鼠

let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，大象

var fill_colors = "fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4".split("-").map(a=>"#"+a)
var line_colors = "c3a995-ab947e-6f5e53-8a7968-593d3b".split("-").map(a=>"#"+a)



//++++++++++設定畫point點的物件變數
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

//+++++++++設定飛彈物件變數
var bullet  //"目前要處理"的物件，暫時放在bullet變數內
var bullets =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

//++++++++++設定怪物物件變數
var monster  //"目前要處理"的物件，暫時放在monster變數內
var monsters =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

var score = 0

function preload(){ //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i=0;i<10;i=i+1){ //i=0、1、2、3、4、5、6、7、8、.....
    ball = new Obj({}) //產生一個新的Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<20;i=i+1){ //i=0、1、2、3、4、5、6、7、8、.....
    monster = new Monster({}) //產生一個新的Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內
  }
}

function draw() {
  background("#F1E4DD");
  //  for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw() //呼叫物件畫圖
  //   ball.update() //呼叫物件移動
  //  }

  // 大象的顯示
   for(let ball of balls){
    ball.draw() //呼叫物件畫圖
    ball.update() //呼叫物件移動
    for(let bullet of bullets){  //檢查每一個物件
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
          balls .splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取1個
          bullets .splice(bullets.indexOf(bullet),1) 
          score = score+1 //加分
          elephant_sound.play()
        
        }
      }
   }
  // 飛彈的顯示 
   for(let bullet of bullets){
    bullet.draw() 
    bullet.update() 
   }

   //怪物的顯示
   for(let monster of monsters){
    monster.draw() 
    monster.update()
   }


   textSize(35)
   text(score,50,50) // 在座標(50,50)上，顯示score分數內容
   push() //重新規劃原點(0,0)在中心點
   let dx = mouseX-width/2
   let dy = mouseY-height/2
   let angle = atan2(dy,dx)
    translate(width/2,height/2)
    fill("#3a5a40")
    noStroke()
    rotate(angle)
    triangle(-25,25,-25,-25,50,0) //設定三個點，畫一個三角形

   pop() //恢復原本設定，原點在(0,0)左上角
}
//+++++++++++++產生一個物件+++++++++++++++++++++++++++++++++++++
function mousePressed(){
//   ball = new Obj({
//     p:{x:mouseX,y:mouseY}
//   }) //在滑鼠按下的地方，產生一個新的Obj class元件
//   balls.push(ball) //把ball的物件放入到balls陣列內(丟到倉庫)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //在物件上按下滑鼠，物件消失不見，分數加1分
  // for(let ball of balls){  //檢查每一個物件
  //   if(ball.isBallInRanger()){
  //     balls .splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取1個
  //     score = score+1 //加分
  //   }
  // }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




  //+++++++++++++++按下產生一個飛彈++++++++++++++++++++++++++++
  bullet = new Bullet({
    r:15
  }) //在滑鼠按下的地方，摻生一個新的Bullet class元件(產生一個飛彈)
  bullets.push(bullet) //把bullet的物件放入到bullets陣列內(丟到倉庫)
  bullet_sound.play()
}

