function demo3Start(){
	var oUl=document.getElementById("ul1");
	var aLi=oUl.getElementsByTagName("li");
	var num=8;
	var temp=[];
	var arr=[];
	init();

	function show(){
		
		change();
		
		setInterval(change,2000);
		
		function change(){
			
			var oArr=arr[Math.round(Math.random()*arr.length)];
			for(var i=0;i<aLi.length;i++){
				aLi[i].style.backgroundImage="";
				aLi[i].className="";
				}
			for(var i=0;i<oArr.length;i++){
				
				oArr[i].style.backgroundImage="url(img/demo3/"+Math.round(Math.random()*12)+".jpg)";			
				oArr[i].className="active";	
				oArr[i].style.animationDelay=-Math.random()*2+"s";
				oArr[i].style.webkitAnimationDelay=-Math.random()*2+"s";
				}

			}
		}
	
	
	function init(){
		createLi();	
		setQueen(0);
		show();	
		console.log(arr);
		}
	function createLi(){
		var len=num*num;
		for(var i=0;i<len;i++){
			var oLi=document.createElement("li");	
			oLi.style.width=100+"px";
			oLi.style.height=100+"px";
			oLi.index=-1;		
			oUl.appendChild(oLi);
			}			
		oUl.style.width = num * 101 + 'px';	
		for(var i=0;i<num;i++){		
			for(var j=0;j<num;j++){		
					aLi[i*num+j].x=j;
					aLi[i*num+j].y=i;
			}
		}
	}
	function setQueen(iQueen){	
		if(iQueen==num){
			arr.push(temp.concat());//避免对象的复制
			return;
			}
		for(var i=0;i<num;i++){
			if(aLi[iQueen*num+i].index==-1){
				
				aLi[iQueen*num+i].index=iQueen;	
				
				temp.push(aLi[iQueen*num+i]);
						
				var x=aLi[iQueen*num+i].x;
				var y=aLi[iQueen*num+i].y;
				for(var j=0;j<aLi.length;j++){				
					if(aLi[j].index==-1&&(aLi[j].x==x||aLi[j].y==y||aLi[j].x-aLi[j].y==x-y||aLi[j].x+aLi[j].y==x+y)){					
						aLi[j].index=iQueen;			
						
					}	
				}		
				setQueen(iQueen+1);//注意
				
				temp.pop();//注意
				for(var j=0;j<aLi.length;j++){
					if(aLi[j].index==iQueen){	
						aLi[j].index=-1;
					}
				}			
			}	
			
		}
				
	}	
}