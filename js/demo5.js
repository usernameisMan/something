var aImg = document.getElementsByTagName("img");
var aLi = document.getElementsByTagName("li");
var oUl = document.getElementById("oUl");
var oDiv = document.getElementById("div1");
var oWidth=document.documentElement.clientWidth||document.body.clientWidth;
for( var i = 0; i < aLi.length;i++ ){
	aLi[i].style.width = (oWidth/7/oWidth)*100 + "%";
};
var l = oUl.offsetWidth/7 * 5; 
var timer = null;
var clientX = 0;

function moveFn(ev){
	var middle,distance,t;
	
	clientX = ev.clientX;
	//s();
	cancelAnimationFrame(timer);
	timer = requestAnimationFrame(function (){
		for( var i = 0; i < aImg.length; i++ ){
			middle = aLi[i].offsetLeft+aLi[i].offsetWidth/2; 
			distance = Math.abs( middle - clientX ); 

			if( distance > l ) distance = l;  
			
			var scale = Math.abs(distance/l); 
			t = 0;
			t = Math.abs(scale)*60; 
			aImg[i].style.cssText = '-webkit-transform: translate3d(0, '+t+'%, 0); transform: translate3d(0,'+t+'%, 0);';
		};	
	});
};
function outFn(){
	cancelAnimationFrame(timer);
	for( var i = 0; i < aImg.length; i++ ){
		aImg[i].removeAttribute( "style" )	
	};
}
oUl.onmousemove = moveFn;
oUl.onmouseout = outFn;
var onOff = true;
oUl.onclick = function (ev){
	var e = ev || event;
	if( onOff ){
		var target = e.target;
		if( target.nodeName === "LI" && (  target = e.target.children[0] ), target.nodeName === "IMG"  ){
			document.body.id = "abc";
			var o = target.parentNode.offsetLeft + target.parentNode.offsetWidth / 2;
			o = oWidth / 2 - o, 
			
			oUl.style.cssText = "-webkit-transform : translate3d(" + 3 * o + "px, 0, 0) scale(3);transform : translate3d(" + 3 * o + "px, 0, 0) scale(3)";
			//oDiv.style.height = (3*o)+"px";
			for( var i = 0; i < aImg.length; i++ ){
					aImg[i].style.cssText = '-webkit-transition: -webkit-transform .4s cubic-bezier(0.445, 0.05, 0.55, 0.95); transition:transform .4s cubic-bezier(0.445, 0.05, 0.55, 0.95)';
					if( i < target.index ){
						aImg[i].parentNode.className = "prev";
					}else if( i > target.index ){
						aImg[i].parentNode.className = "next";
					}
			}
			target.parentNode.className = "lager";
			oUl.onmousemove = oUl.onmouseout = null;
		};
		onOff = false;
	}else{
		oUl.removeAttribute("style");
		document.body.id = "";

		for( var i = 0; i < aImg.length; i++ ){
			aImg[i].parentNode.className = "";
		}
		setTimeout(function (){
			oUl.onmousemove = moveFn;
			oUl.onmouseout = outFn;
			onOff = true;	
		},300)
	};

}