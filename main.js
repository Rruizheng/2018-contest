(function(){
	//自适应大小，使用rem为单位
	(function (doc, win) {
	    var docEl = doc.documentElement,
	        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	        recalc = function () {
	
	            var clientWidth = docEl.clientWidth;
	            if (!clientWidth) return;
	            if (clientWidth <= 500) {
	                docEl.style.fontSize = '30px';
	            } else {
	                docEl.style.fontSize = '50px';
	            }
	        };
	
	    if (!doc.addEventListener) return;
	    win.addEventListener(resizeEvt, recalc, false);
	
	    doc.addEventListener('DOMContentLoaded', recalc, false);
	    /*DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源*/
	})(document, window);
		
	var cellStyle = {
		cell2:{
			color:'#776e65',
			fontSize: '1.2rem',
			backColor:"#eee4da",
		},
		cell4:{
			color:'#776e65',
			fontSize: '1.2rem',
			backColor:"#ede0c8"
		},
		cell8:{
			color:'#FFF',
			fontSize: '1.2rem',
			backColor:"#f2b179"
		},
		cell16:{
			color:'#FFF',
			fontSize: '1.2rem',
			backColor:"#f59563"
		},
		cell32:{
			color:'#FFF',
			fontSize: '1.2rem',
			backColor:"#f67c5f"
		},
		cell64:{
			color:'#FFF',
			fontSize: '1.2rem',
			backColor:"#f65e3b"
		},
		cell128:{
			color:'#FFF',
			fontSize: '1rem',
			backColor:"#edcf72"
		},
		cell256:{
			color:'#FFF',
			fontSize: '1rem',
			backColor:"#edcc61"
		},	
		cell512:{
			color:'#FFF',
			fontSize: '1rem',
			backColor:"#f9cd41"
		},	
		cell1024:{
			color:'#FFF',
			fontSize: '1rem',
			backColor:"#fcc731"
		},
		cell2048:{
			color:'#FFF',
			fontSize: '1rem',
			backColor: "yellow"
		},
	}
	var cells = document.getElementsByClassName("grid-cell");
	var startBtn = document.getElementById("startGame");
	var box = new Array();  //储存游戏数据
	
	
	function main(){
		init();
		EventHandler();
	}
		
	function init(){
		//初始化数据
		for(var i=0;i<4;i++){
			box[i] = new Array();
			for(var j=0;j<4;j++){
				box[i][j] = 0;	
			}
		}
		
		//初始排列
		for(var i=0;i<cells.length;i++){
			var y = Math.floor(i/4); 
			var x = i%4;
			cells[i].x = x;
			cells[i].y = y;
			cells[i].style.top = y*2.2 + 0.1 + 'rem';
			cells[i].style.left = x*2.2 + 0.1 + 'rem';
		}
	}
	
	function EventHandler(){
		//交互活动，开始游戏
		startBtn.onclick = start;
		//判断键盘操作
		var irule;//up,down,left,right
		document.onkeyup = function(event){
			var event = event || window.event;
			var code = event.keyCode;
			rules(code);
		}
		//todo判断触屏操作
		
		

		//滑动屏幕，更新界面

		
		//判断游戏是否结束
		if(nospace()){
			alert("游戏结束！");
		}
		
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(box[i][j] == 2048){
					alert("游戏结束！");
					break;
				}
			}
		}
	}
	
	
	
	//游戏规则
	var rules = function(code){
		//判断是哪一种情况
		switch(code){
			case 37:
				moveleft();
				break;
			case 38:
				moveup();
				break;
			case 39:
				moveright();
				break;
			case 40:
				movedown();
				break;
		}
		
		//上移
		function moveup(){	
			var reI = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			//一行一行。左右移动。选出有数字的格子，顺序保存
			for(var j=0;j<4;j++){
				var k=0;
				for(var i=0;i<4;i++){
					if(box[i][j] != 0) {
						reI[k][j]=box[i][j];
						k = k+1;
					}
				}
			}
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = 0;	
				}
			}	
			//向上。相同数据相加
			for(var j=0;j<4;j++){
				for(var i=0;i<4;i++){
					if((i<3)&&(reI[i][j] == reI[i+1][j])){
						reI[i][j] = 2*reI[i][j];
						reI[i+1][j] = 0;
						if((i<2)&&reI[i+2][j]){
							reI[i+1][j] = reI[i+2][j];
							reI[i+2][j] = 0;
						}
						if((i<1)&&reI[i+3][j]){
							reI[i+2][j] = reI[i+3][j];
							reI[i+3][j] = 0;
						}
					
					}
				}
			}
			//放回格子中
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = reI[i][j];	
					reI[i][j] = 0;
				}
			}
			updateBox();
		}
		
		//左移
		function moveleft(){	
			var reI = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			//一行一行。左右移动。选出有数字的格子，顺序保存
			for(var i=0;i<4;i++){
				var k=0;
				for(var j=0;j<4;j++){
					if(box[i][j] != 0) {
						reI[i][k]=box[i][j];
						k = k+1;
					}
				}
			}
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = 0;	
				}
			}	
			//向←。相同数据相加
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					if(reI[i][j] == reI[i][j+1]){
						reI[i][j] = 2*reI[i][j];
						reI[i][j+1] = 0;
						if(reI[i][j+2]){
							reI[i][j+1] = reI[i][j+2];
							reI[i][j+2] = 0;
						}
						if(reI[i][j+3]){
							reI[i][j+2] = reI[i][j+3];
							reI[i][j+3] = 0;
						}
					
					}
				}
			}
			//放回格子中
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = reI[i][j];	
					reI[i][j] = 0;
				}
			}
			updateBox();
			cellNum(randomcell(),2);
		}
		
		//右移
		function moveright(){	
			var reI = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			//一行一行。左右移动。选出有数字的格子，顺序保存
			for(var i=0;i<4;i++){
				var k=3;
				for(var j=3;j>=0;j--){
					if(box[i][j] != 0) {
						reI[i][k]=box[i][j];
						k = k-1;
					}
				}
			}
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = 0;	
				}
			}	
			//相同数据相加
			for(var i=0;i<4;i++){
				for(var j=3;j>=0;j--){
					if((j>0)&&(reI[i][j] == reI[i][j-1])){
						reI[i][j] = 2*reI[i][j];
						reI[i][j-1] = 0;
						if((j>1)&&reI[i][j-2]){
							reI[i][j-1] = reI[i][j-2];
							reI[i][j-2] = 0;
						}
						if((j>2)&&reI[i][j-3]){
							reI[i][j-2] = reI[i][j-3];
							reI[i][j-3] = 0;
						}
					
					}
				}
			}
			//放回格子中
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = reI[i][j];	
					reI[i][j] = 0;
				}
			}
			updateBox();
		}
		
		//下移
		function movedown(){	
			var reI = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			//一行一行。左右移动。选出有数字的格子，顺序保存
			for(var j=0;j<4;j++){
				var k=3;
				for(var i=3;i>=0;i--){
					if(box[i][j] != 0) {
						reI[k][j]=box[i][j];
						k = k-1;
					}
				}
			}
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = 0;	
				}
			}	
			//相同数据相加
			for(var j=0;j<4;j++){
				for(var i=3;i>=0;i--){
					if((i>0)&&(reI[i][j] == reI[i-1][j])){
						reI[i][j] = 2*reI[i][j];
						reI[i-1][j] = 0;
						if((i>1)&&reI[i-2][j]){
							reI[i-1][j] = reI[i-2][j];
							reI[i-2][j] = 0;
						}
						if((i>2)&&reI[i-3][j]){
							reI[i-2][j] = reI[i-3][j];
							reI[i-3][j] = 0;
						}
					
					}
				}
			}
			//放回格子中
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					box[i][j] = reI[i][j];	
					reI[i][j] = 0;
				}
			}
			updateBox();
		}
		
		/*cellNum(randomcell());*/
		
		//动画
		var move = function(){
			
		}
		//合并
		var add = function(){
			
		}
	}
	
	function start(){
		//开始游戏，清空屏幕所有值，随机两个位置，产生两个2
		//todo中途停止，弹出警告
		for(var i=0;i<cells.length;i++){
			cells[i].innerHTML = "";
			cells[i].style.backgroundColor = "rgb(205,193,180)";
		}
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				box[i][j] = 0;	
			}
		}
		cellNum(randomcell(),2);
		cellNum(randomcell(),2);	
	}
	
	
	function randomcell(){
		//判断是否还有空位	
		if(nospace()){
			
			return false;
		}
		//选择随机位置，空位,生成数字2
		var bx = Math.floor(Math.random()*4);
		var by = Math.floor(Math.random()*4);
		var times = 0;
		while(times < 50){
			if(box[bx][by] == 0){
				break;
			}
			bx = Math.floor(Math.random()*4);
			by = Math.floor(Math.random()*4);	
			times ++;
		}
		if(times > 50){
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					if(box[i][j]==0){
						bx = i;
						by = j;
					}
				}
			}
		}		
		var newCell = document.getElementById("grid-cell-"+bx+"-"+ by);
		newCell.x = bx;
		newCell.y = by;
		box[bx][by] = 2;
		return newCell;	
	}
	
	//判断是否还有空位
	function nospace(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(box[i][j]==0){
					return false;
				}
			}
		}
		return true;
	}
	
	//根据box的值，对格子进行渲染
	function cellNum(cell,num){
		
		if(num == 0){
			cell.innerHTML = "";
			cell.style.backgroundColor = "rgb(205,193,180)";
		}else{
			cell.style.color = cellStyle["cell"+num].color;
			cell.style.backgroundColor = cellStyle["cell"+num].backColor;
			cell.style.fontSize = cellStyle["cell"+num].fontSize;
			cell.innerHTML = num;
		}
	}
	//updatebox;
	function updateBox(){
		var k=0;
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				cellNum(cells[k],box[i][j]);
				k=k+1;
			}
		}
	}
	
	main();
})();


