<script src="../jquery.js"></script> 
<script>
//获取各所需元素
  var contain = document.getElementById("contain");
  var box = document.getElementById("box");
  var board = document.getElementsByClassName("board")[0];
  var ball = document.getElementsByClassName("ball")[0];
  var btn = document.getElementsByTagName("button")[0];
  var score = document.getElementsByClassName("score")[0];
  //分别代表board左距离、右距离；ball左距离、右距离
  var board_left,board_top,ball_left,ball_top ;
  var interval,flag=1,sum=0; 
  
  //设置小球的速度
  var speedX = -1,speedY = -1;
   
  //监听鼠标进入box
   box.onmousemove = function() {
     //事件对象(兼容)
    var e = event || window.event; 
    //更改board的left和top
    board_left = event.pageX - box.offsetLeft -50;
    board_top = event.pageY - box.offsetTop;  
    //检测board是否超出边框并更改board和ball位置
    
    if(board_left>=0 && board_left<=400) {
      board.style.left = board_left + "px";
      //flag的作用是防止点击按钮后再次进入Box后球的位置再变化
      if(flag) {
        ball_left = board_left + 45;
        ball.style.left = ball_left + "px";
      }  
    }  
    if(board_top>=0 && board_top<=390){
      board.style.top =  board_top + "px";
      if(flag) {
        ball_top = board_top - 15;
        ball.style.top = ball_top +"px";
      }
   } 
   
  }
  
  //监听按钮点击事件
  btn.onclick = function() {
    //清除定时器,防止定时器重叠
    clearInterval(interval);
    //flag=0后ball不再随board位置变化
    flag=0;
    //设置定时器
    interval =  setInterval(function(){   
      ball_left += speedX;
      ball_top += speedY;
 
      if(ball_left>=0 && ball_left<=485){
        ball.style.left = ball_left + "px";
      }
      if(ball_top>=0 && ball_top<=385){
        ball.style.top = ball_top + "px";
      }
 
      //球的方向改变
      //撞d到左边右边边框
      if(ball_left<0|| ball_left>485 ){
        speedX = -speedX;  
      }else if(ball_top<0){//撞到上边边框边框
        speedY = -speedY; 
      }  
     
      //检测ball碰到board
      if((ball_top+15) >= board_top && ball_left>=board_left && ball_left <= (board_left+50)){
        speedX = -speedX; 
        speedY = -speedY;
        //分数改变
        sum+=5;
        score.innerHTML = sum;
 
      }
      //游戏结束
      if(ball_top>385 ){
        alert("游戏结束，刷新后重新开始");
        clearInterval(interval);
      }
    },5)    
  }
</script>