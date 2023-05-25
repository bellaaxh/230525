var monster_colors = "273653-415a77-70798c-778da9-e0e1dd".split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物類別
    constructor(args){  //預設值，基本資料(物件的顏色。移動的速度。大小，初始顯示位置......)
        this.r = args.r || random(30,100) //怪物的主體，就傳參數args.r來設定怪物大小，沒有船參數，就以100為主
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
    }
    draw(){ //畫出元件
        push() //重新設定原點位置
            translate(this.p.x,this.p.y) //把原點座標(0,0)移到物件中心位置
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            if(this.mode == "happy"){
                fill(255)
                ellipse(0,0,this.r/2)
                fill(0)
                ellipse(0,0,this.r/3)
            }else{
                fill(255)
                arc(0,0,this.r/2,this.r/2,0,PI)
                fill(0)
                arc(0,0,this.r/3,this.r/3,0,PI)
            }
            //加入怪物的腳
            stroke(this.color)
            strokeWeight(3)
            noFill()
            // line(this.r/2,0,this.r,0)

            for(var j=0;j<8;j++){ //腳*8
                rotate(PI/4)
            
            beginShape() //畫怪物的腳
                for(var i = 0;i<(this.r/2);i++){
                    vertex(this.r/2+i,sin(i/5+frameCount/10)*10) 
                }
            endShape()
            }
        pop() //恢復到整個視窗的左上角
    }


    update(){  //計算出移動元件後的位置
        this.p.add(this.v)

        if(this.p.x<=0 ||this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x //把x軸速度、方向改變
        }
          if(this.p.y<=0 ||this.p.y>=height){ //y軸碰到左邊(<=0)，或是碰到右邊(>=height)
            this.v.y = -this.v.y //把y軸速度、方向改變
        }
    }
}