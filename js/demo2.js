//spe
(function(){
	var oDiv=document.getElementById("spe");
	var oUl=oDiv.getElementsByTagName("ul")[0];
	var aLi=oUl.getElementsByTagName("li");
	var aA=oDiv.getElementsByTagName("a");
	var onOff=true;
	var arr=[];
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].style.top=-(aLi[i].offsetHeight-oDiv.offsetHeight)/2+"px";
	}

	aLi[0].style.left=-(aLi[0].offsetWidth-oDiv.offsetWidth)/10+"px";
	aLi[1].style.left=-(aLi[1].offsetWidth-oDiv.offsetWidth)/5+"px";
	aLi[2].style.left=-(aLi[2].offsetWidth-oDiv.offsetWidth)/2+"px";
	var dis=(aLi[1].offsetWidth-((parseFloat(aLi[2].style.left)-parseFloat(aLi[1].style.left))));
	aLi[3].style.left=(aLi[2].offsetWidth/2-dis)*2+aLi[1].offsetWidth+parseFloat(aLi[1].style.left)+"px";
	
	aLi[4].style.left=parseFloat(aLi[3].style.left)+aLi[3].offsetWidth-(aLi[4].offsetWidth-(parseFloat(aLi[1].style.left)-parseFloat(aLi[0].style.left)))+"px";

	for(var i=0;i<aLi.length;i++){
		
		arr.push([getStyle(aLi[i],"left"),getStyle(aLi[i],"top"),getStyle(aLi[i],"opacity"),getStyle(aLi[i],"zIndex"),getStyle(aLi[i],"width"),getStyle(aLi[i],"height")])

		}
	var oTimer=null;
	move();
	oDiv.onmouseover=function(){
		clearInterval(oTimer);
		}
	oDiv.onmouseout=function(){
		move();
		}

	aA[1].onclick=function(){
		if(onOff){
			arr.push(arr[0]);
			arr.shift(arr[0]);
			re();
		}
		onOff=false;
		};
	aA[0].onclick=function(){
		if(onOff){
			arr.unshift(arr[arr.length-1]);
			arr.pop();
			re();
			}
		onOff=false;
		};
	function re()
	{
		if(onOff)
		{
			for(var i=0;i<arr.length;i++){
				aLi[i].style.zIndex=arr[i][3];	
				startMove(aLi[i],
					{
						"left":parseInt(arr[i][0]),
						"top":parseInt(arr[i][1]),
						"opacity":arr[i][2]*100,
						"width":parseInt(arr[i][4]),
						"height":parseInt(arr[i][5])
					},function()
					{
						onOff=true;	
					})
				}
		}
	}	
	function move(){
		oTimer=setInterval(function(){	
		arr.push(arr[0]);
		arr.shift(arr[0]);
		re();
		},2000);
	}
	
	
	
})();

//div1
(function(){
		var oDiv1=document.getElementById("div1");
		var oUl1=oDiv1.getElementsByTagName("ul")[0];
		var oOl1=oDiv1.getElementsByTagName("ol")[0];
		var aUlLi1=oUl1.getElementsByTagName("li");
		var aOlLi1=oOl1.getElementsByTagName("li");
		
		for(var i=0;i<aOlLi1.length;i++){
			aOlLi1[i].index=i;
			aOlLi1[i].onmouseover=function(){
				for(var j=0;j<aOlLi1.length;j++){
					aOlLi1[j].className="";
					aUlLi1[j].className="";
					}
				this.className="active";
				aUlLi1[this.index].className="active";
				}
			}
		})();
//end div1 一般的

//div2
(function(){
var oDiv2=document.getElementById("div2");
var oUl2=oDiv2.getElementsByTagName("ul")[0];
var oOl2=oDiv2.getElementsByTagName("ol")[0];
var aUlLi2=oUl2.getElementsByTagName("li");
var aOlLi2=oOl2.getElementsByTagName("li");

for(var i=0;i<aOlLi2.length;i++){
	aOlLi2[i].index=i;
	aOlLi2[i].onmouseover=function(){
		for(var j=0;j<aOlLi2.length;j++){
			aOlLi2[j].className="";
			aUlLi2[j].className="";
			aUlLi2[j].style.filter="alpha(opacity=0)";
			aUlLi2[j].style.opacity=0;
			}
		this.className="active";
		aUlLi2[this.index].className="active";
		startMove(aUlLi2[this.index],{opacity:100})
		}
	}})();
//end div2 淡入

//div3
(function(){
var oDiv3=document.getElementById("div3");
var oUl3=oDiv3.getElementsByTagName("ul")[0];
var oOl3=oDiv3.getElementsByTagName("ol")[0];
var aUlLi3=oUl3.getElementsByTagName("li");
var aOlLi3=oOl3.getElementsByTagName("li");
for(var i=0;i<aOlLi3.length;i++){
	aOlLi3[i].index=i;
	aOlLi3[i].onmouseover=function(){
		for(var j=0;j<aOlLi3.length;j++){
			aOlLi3[j].className="";
			startMove(aUlLi3[j],{opacity:0},function(){
				this.className=""; //这里如果oUlLi3[j]的话。IE会报错IE下无法设置未定义或 null 引用的属性"className"；好像是循环反复调用的问题。
				});
			}
		this.className="active";
		aUlLi3[this.index].className="active";
		startMove(aUlLi3[this.index],{opacity:100})
		}
	}})();
//end div3 淡入淡出

//div4
(function(){
var oDiv4=document.getElementById("div4");
var oUl4=oDiv4.getElementsByTagName("ul")[0];
var oOl4=oDiv4.getElementsByTagName("ol")[0];
var aUlLi4=oUl4.getElementsByTagName("li");
var aOlLi4=oOl4.getElementsByTagName("li");
var oHeight=aUlLi4[0].offsetHeight;

for(var i=0;i<aOlLi4.length;i++){
	aOlLi4[i].index=i;
	aOlLi4[i].onmouseover=function(){
		for(var j=0;j<aOlLi4.length;j++){
			aOlLi4[j].className="";
			startMove(oUl4,{top:-(this.index*oHeight)})
			}
		this.className="active";
		}
	}})();
//end div4 滚动

//div5
(function(){
	var oDiv5=document.getElementById("div5");
	var oUl5=oDiv5.getElementsByTagName("ul")[0];
	var oOl5=oDiv5.getElementsByTagName("ol")[0];
	var aUlLi5=oUl5.getElementsByTagName("li");
	var aOlLi5=oOl5.getElementsByTagName("li");
	var oHeight=aUlLi5[0].offsetHeight;
	var num=0;
	var oTimer=null;
	for(var i=0;i<aOlLi5.length;i++){
		aOlLi5[i].index=i;		
		aOlLi5[i].onmouseover=function(){			
			for(var j=0;j<aOlLi5.length;j++){				
				aOlLi5[j].className="";				
				startMove(oUl5,{top:-(this.index*oHeight)})				
				}				
			this.className="active";			
			num=this.index;			
			}
		}
	oTimer=setInterval(doMove,2000);
	oDiv5.onmouseover=function(){
		clearInterval(oTimer);
		}
	oDiv5.onmouseout=function(){
		oTimer=setInterval(doMove,2000);
	}	
	function doMove(){		
			if(num==aUlLi5.length-1){
				num=0;
				}else{
					num++;	
					}				
			startMove(oUl5,{top:-(num*oHeight)});			
			for(var i=0;i<aOlLi5.length;i++){				
				aOlLi5[i].className="";				
				}			
			aOlLi5[num].className="active";			
		}
	})();	
//end div5 加定时器轮播

//div6
(function(){
	var oDiv6=document.getElementById("div6");
	var oUl6=oDiv6.getElementsByTagName("ul")[0];
	var oOl6=oDiv6.getElementsByTagName("ol")[0];
	var aUlLi6=oUl6.getElementsByTagName("li");
	var aOlLi6=oOl6.getElementsByTagName("li");
	var oHeight=aUlLi6[0].offsetHeight;
	var num=0;
	var num1=0;
	var oTimer=null;	
	for(var i=0;i<aOlLi6.length;i++){
		aOlLi6[i].index=i;		
		aOlLi6[i].onmouseover=function(){			
			for(var j=0;j<aOlLi6.length;j++){				
				aOlLi6[j].className="";
				startMove(oUl6,{top:-(this.index*oHeight)})
				}				
			this.className="active";			
			num=this.index;
			num1=this.index;
			}
		}		
	oTimer=setInterval(doMove,2000);			
	oDiv6.onmouseover=function(){
		clearInterval(oTimer);
		}
	oDiv6.onmouseout=function(){
		oTimer=setInterval(doMove,2000);
		}	
	function doMove(){
		if(num==0){
			aUlLi6[0].style.position="static";
			oUl6.style.top=0;
			num1=0;	
			}		
		if(num==aUlLi6.length-1){
			num=0;
			aUlLi6[0].style.position="relative";
			aUlLi6[0].style.top=aUlLi6.length*oHeight+"px";
			}else{
				num++;	
				}
		num1++;
		for(var i=0;i<aOlLi6.length;i++){				
			aOlLi6[i].className="";				
			}
		aOlLi6[num].className="active";						
		startMove(oUl6,{top:-(num1*oHeight)});			
	}			
	
	})();
//end div6 无缝滚动切换

//div7
(function(){
	var oDiv7=document.getElementById("div7");
	var oUl7=oDiv7.getElementsByTagName("ul")[0];
	var oOl7=oDiv7.getElementsByTagName("ol")[0];
	var aUlLi7=oUl7.getElementsByTagName("li");
	var aOlLi7=oOl7.getElementsByTagName("li");
	var num=0;
	var num1=0;
	var oTimer=null;
	var oWidth=aUlLi7[0].offsetWidth;		
	for(var i=1;i<aUlLi7.length;i++){
		aUlLi7[i].style.left=oWidth+"px";
		}		
	aUlLi7[0].style.left=0+"px";		
	for(var i=0;i<aOlLi7.length;i++){			
		aOlLi7[i].index=i;
		aOlLi7[i].onmouseover=function(){			
			for(var j=0;j<aUlLi7.length;j++){					
				aOlLi7[j].className="";			
				}
			this.className="active";
			if(num<this.index){
				aUlLi7[this.index].style.left=oWidth+"px";
				startMove(aUlLi7[num],{left:-oWidth});
				}else if(num>this.index){
					aUlLi7[this.index].style.left=-oWidth+"px";
					startMove(aUlLi7[num],{left:oWidth});
					}
			startMove(aUlLi7[this.index],{left:0});
			num=this.index;
			num1=this.index;
			}
		}
	oDiv7.onmouseover=function(){
		clearInterval(oTimer);
		}
	oDiv7.onmouseout=function(){
		oTimer=setInterval(doMove,2000);	
		}		
	oTimer=setInterval(doMove,2000);	
	function doMove(){
		if(num1==aUlLi7.length-1){
			num1=0;
			}else{
				num1++;
				}
		for(var i=0;i<aOlLi7.length;i++){
			aOlLi7[i].className="";
			}		
		aOlLi7[num1].className="active";
		if(num<num1){
				aUlLi7[num1].style.left=oWidth+"px";
				startMove(aUlLi7[num],{left:-oWidth});
				}else if(num>num1){
					aUlLi7[num1].style.left=-oWidth+"px";
					startMove(aUlLi7[num],{left:oWidth});
					}
			startMove(aUlLi7[num1],{left:0});
			num=num1;

		}
	
	})();
//end div7 无缝横向切换

//div8
(function(){
	var oDiv8=document.getElementById("div8");
	var oUl8=oDiv8.getElementsByTagName("ul")[0];
	var aUlLi8=oUl8.getElementsByTagName("li");
	var oWidth=aUlLi8[0].offsetWidth;		
	for(var i=1;i<aUlLi8.length;i++){			
		aUlLi8[i].style.left=-150+oWidth+i*30+"px"		
		}
	for(var i=0;i<aUlLi8.length;i++){			
		aUlLi8[i].index=i;
		aUlLi8[i].onmouseover=function(){
			for(var j=0;j<aUlLi8.length;j++){
				if(j<=this.index){
				startMove(aUlLi8[j],{left:j*30});
				}else{		
					startMove(aUlLi8[j],{left:-150+oWidth+j*30});			
					}
				}
			}
			
		
		}
	
	
	})();
//end div8

//div9
(function(){
	var oDiv9=document.getElementById("div9");
	var oUl9=oDiv9.getElementsByTagName("ul")[0];
	var aUlLi9=oUl9.getElementsByTagName("li");
	var aWidth=aUlLi9[0].offsetWidth;
	var oWidth=Math.floor(aUlLi9[0].offsetWidth/aUlLi9.length);
	
	
			
	for(var i=1;i<aUlLi9.length;i++){			
		aUlLi9[i].style.left=oWidth*i+"px"		
		}
	for(var i=0;i<aUlLi9.length;i++){			
		aUlLi9[i].index=i;
		aUlLi9[i].onmouseover=function(){
			for(var j=0;j<aUlLi9.length;j++){
				if(j<=this.index){
				startMove(aUlLi9[j],{left:30*j});
				}else{		
					startMove(aUlLi9[j],{left:(aWidth-150)+30*j});			
					}
				}
			}	
		aUlLi9[i].onmouseout=function(){
			for(var i=0;i<aUlLi9.length;i++){
				startMove(aUlLi9[i],{left:oWidth*i});
				}
			
			}			
		}
	
	
	})();
//end div9

//wrap1
(function(){
	var oUl=document.getElementById("picL1");
	var aLi=oUl.getElementsByTagName("li");
	var oC=document.getElementById("style1");
	var oBtn=document.getElementById("btns1");
	var aBtns=oBtn.getElementsByTagName("li");
	var numAll=16;
	var str="";
	var oCss="";
	var iZ=0;
	for(var i=0;i<numAll;i++){
		i>numAll/2?iZ--:iZ++;
		str+='<li><a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a><span></span><span></span></li>';
		oCss+='#picL1 li:nth-of-type('+(i+1)+') a{background-position:-'+50*i+'px 0;}';
		oCss+='#picL1 li:nth-of-type('+(i+1)+'){z-index:'+iZ+'}';
		}
	
	oUl.innerHTML=str;
	oC.innerHTML+=oCss;
	
	for(var i=0;i<aBtns.length;i++)
	{
		(function(num)
		{
			aBtns[num].onclick=function()
			{
				for(var j=0;j<aLi.length;j++)
				{	
					aLi[j].style.transition="0.5s "+j*30+"ms";
					aLi[j].style.WebkitTransform="rotateX(-"+num*90+"deg)";
					aLi[j].style.MozTransform="rotateX(-"+num*90+"deg)";				
				}
				for(var k=0;k<aBtns.length;k++){
					aBtns[k].className="";					
					}
				this.className="active";
			}
		})(i);
	}
	
	
	
	})();

//progress
(function()
{	
	var oDiv=document.getElementById("progressBox");
	var oDiv1=document.getElementById("progressBar");
	var oDiv2=document.getElementById("progressText");
	var aImg=document.getElementsByTagName("img");
	var num=0;
	for(var i=0;i<aImg.length;i++)
	{
		(function(i)
		{
			var allImg=new Image();
			allImg.onload=function()
			{
				num++;
				progressFn(parseInt(num/aImg.length*100));
				if(num==aImg.length)
				{
					oDiv2.style.display="block";
					oDiv1.style.display="nome";
				}
				
			}
			allImg.src=aImg[i].src;	
			
		})(i);	
	}

	function progressFn(cent){
		var allWidth=parseInt(getStyle(oDiv,"width"));
		
		oDiv1.innerHTML=cent+"%";
		oDiv2.innerHTML=cent+"%";
		oDiv1.style.clip='rect(0px,'+(cent/100)*allWidth + 'px,40px,0px)'

		}
	
})();






function startMove(obj,json,endFn){

	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		
		var bBtn = true;
		
		for(var attr in json){
			
			var iCur = 0;
		
			if(attr == 'opacity'){
				if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
				iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
				
				}
				else{
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
				}	
			}
			else{
				iCur = parseInt(getStyle(obj,attr)) || 0;
			}
			
			var iSpeed = (json[attr] - iCur)/8;
		iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur!=json[attr]){
				bBtn = false;
			}
			
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
				obj.style.opacity = (iCur + iSpeed)/100;
				
			}
			else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			
			
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			
			if(endFn){
				endFn.call(obj);
			}
		}
		
	},30);

}


function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}