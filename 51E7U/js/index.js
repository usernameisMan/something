// JavaScript Document

function bind(obj,ev,fn){
	/*if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent('on'+ev,function(){
			fn.call(obj);		//改变非标准指针
		});
	}*/
	return obj.addEventListener?obj.addEventListener(ev,fn,false):obj.attachEvent('on'+ev,function(){fn.call(obj);});
}

function view(){		
	return {
		w:document.documentElement.clientWidth,
		h:document.documentElement.clientHeight
	};
}

function addClass(obj,iclass){
	if(!obj.className){
		obj.className=iclass;
		return;
	}
	var aClass=obj.className.split(' ');
	var len=aClass.length;
	for(var i=len;i--; ){
		if(aClass[i]===iclass) return;
	}
	obj.className+=' '+iclass;
}

function removeClass(obj,iclass){
	if(!obj.className) return;
	var aClass=obj.className.split(' ');
	var len=aClass.length;
	for(var i=len;i--; ){
		if(aClass[i]===iclass){
			aClass.splice(i,1);
			obj.className=aClass.join(' ');
			break;
		}
	}
}

function fnLoad(){
	
	var oWel=document.getElementById('welcome');
	var arr=[""];
	var iTime=new Date().getTime();
	var bLoad=true;
	var bTime=false;
	var oTimer=0;
	bind(oWel,'webkitTransitionEnd',end);
	bind(oWel,'transitionend',end);
	oTimer=setInterval(function(){
		if(new Date().getTime()-iTime>=4000){
			bTime=true;
		}
		if(bLoad&&bTime){
			clearInterval(oTimer);
			oWel.style.opacity=0;
		}
	},1000);
	function end(){
		removeClass(oWel,'pageShow');
		fnTab();	
	}
}

/*bind(document,'touchmove',function(ev){
	ev.preventDefault();	//加了滚动条父级，拖拽也就不会出问题了
});*/
function fnTab(){
	var oNb=document.getElementsByClassName('newsBtn')[0];
	var oTab=document.getElementById('tabPic');
	var oList=document.getElementById('picList');
	var aA=oTab.getElementsByTagName('nav')[0].children;
	var len=aA.length;
	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	autoPlay();
	if(!window.Bscore){	//防止重复调用
		score();
		window.Bscore=true;
	}
	function autoPlay(){
		oTimer=setInterval(function(){
			iNow++;
			iNow%=len;
			tab();
		},2000);
	}
	bind(oTab,'touchstart',fnStart);
	bind(oTab,'touchmove',fnMove);
	bind(oTab,'touchend',fnEnd);
	function fnStart(ev){
		oList.style.transition='none';
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
	function fnMove(ev){
		ev=ev.changedTouches[0];
		var disX=ev.pageX-iStartTouchX;
		iX=iStartX+disX;
		oList.style.WebkitTransform=oList.style.transform='translateX('+iX+'px)';
	}
	function fnEnd(){
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>len-1)
		{
			iNow=len-1;
		}
		tab();
		autoPlay();
	}
	function tab(){
		iX=-iNow*iW;
		oList.style.transition='0.5s';
		oList.style.WebkitTransform=oList.style.transform='translateX('+iX+'px)';
		for(var i=len;i--; )
		{
			removeClass(aA[i],'active');
		}
		addClass(aA[iNow],'active');
	}
	bind(oNb,'touchend',fnIndexOut);
}

function score(){
	var oSco=document.getElementById('score');
	var aLi=oSco.getElementsByTagName('li');
	var len=aLi.length;
	for(var i=0;i<len;i++){
		fn(aLi[i]);
	}
	if(!window.BfnIndex){
		fnIndex();
		window.BfnIndex=true;
	}
	function fn(oLi){
		var aA=oLi.getElementsByTagName('a');
		var oInp=oLi.getElementsByTagName('input')[0];
		var len=aA.length;
		for(var i=0;i<len;i++){
			aA[i].index=i;
			bind(aA[i],'touchstart',function(){
				//alert(this.index);
				for(var i=0;i<len;i++){
					i<=this.index?addClass(aA[i],'active'):removeClass(aA[i],'active');	
				}
				oInp.value=this.index+1;
			});
		}
	}
}

function fnInfo(oInfo,sInfo){
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform=oInfo.style.transform='scale(1)';
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform=oInfo.style.transform='scale(0)';
		oInfo.style.opacity=0;
	},800);
}

function fnIndex(){
	var oIndex=document.getElementById('index');
	var oBtn=oIndex.getElementsByClassName('btn')[0];
	var oInfo=oIndex.getElementsByClassName('info')[0];
	var bS=false;
	bind(oBtn,'touchend',fnEnd);
	function fnEnd(){
		bS=fnScoreCheked();
		/*if(bS){
			if(bTag()){
				alert('执行跳转');
			}else{
				fnInfo(oInfo,'请给景区添加标签');
			}
		}else{
			fnInfo(oInfo,'请给景区评分');
		}*/
		bS?bTag()?fnIndexOut():fnInfo(oInfo,'请给景区添加标签'):fnInfo(oInfo,'请给景区评分');
	}
	function fnScoreCheked(){
		var oSco=document.getElementById('score');
		var aInp=oSco.getElementsByTagName('input');
		var len=aInp.length;
		for(var i=0;i<len;i++){
			if(aInp[i].value==0){
				return false;
			}
		}
		return true;
	}
	function bTag(){
		var oTag=document.getElementById('tags');
		var aInp=oTag.getElementsByTagName('input');
		var len=aInp.length;
		for(var i=0;i<len;i++){
			if(aInp[i].checked){
				return true;
			}
		}
		return false;
	}
}

function fnIndexOut(){
	var oMask=document.getElementById('mask');
	var oIndex=document.getElementById('index');
	var oNews=document.getElementById('news');
	addClass(oMask,'pageShow');
	addClass(oNews,'pageShow');
	if(!window.BfnNews){
		fnNews();
		window.BfnNews=true;
	}
	setTimeout(function(){		//inline渲染成block的时候会有个过程
		oMask.style.opacity=1;	//此时transition不起效
		oIndex.style.filter=oIndex.style.WebkitFilter='blur(5px)';//模糊
	},14);						//给个定时器缓冲这个过程
	setTimeout(function(){
		oNews.style.WebkitTransition=oNews.style.transition="0.5s";
		oMask.style.opacity=0;
		oIndex.style.filter=oIndex.style.WebkitFilter='blur(0)';
		oNews.style.opacity=1;
		removeClass(oMask,"pageShow");
	},2000);
}

function fnNews(){
	var oNews=document.getElementById('news');
	var aInp=oNews.getElementsByTagName('input');
	var oInfo=oNews.getElementsByClassName('info')[0];
	aInp[0].onchange=function(){
		if(this.files[0].type.split('/')[0]=='video'){
			fnNewsOut();
			this.value="";
		}else{
			fnInfo(oInfo,'请上传视频');
		}
	}
	aInp[1].onchange=function(){
		if(this.files[0].type.split('/')[0]=='image'){
			fnNewsOut();
			this.value="";
		}else{
			fnInfo(oInfo,'请上传照片');
		}
	}
}

function fnNewsOut(){
	var oNews=document.getElementById('news');
	var oForm=document.getElementById('form');
	
	addClass(oForm,'pageShow');
	oNews.style.cssText='';
	removeClass(oNews,'pageShow');
	if(!window.BformIn){
		formIn();
		window.BformIn=true;
	}
}

function formIn(){
	var oForm=document.getElementById('form');
	var oOver=document.getElementById('over');
	var oBtn=oForm.getElementsByClassName('btn')[0];
	var aFormTag=document.getElementById('formTags').getElementsByTagName('label');
	var len=aFormTag.length;
	var bOff=false;
	for(var i=0;i<len;i++)
	{
		bind(aFormTag[i],'touchend',function(){
			bOff=true;
			addClass(oBtn,'submit');
		});
	}
	bind(oBtn,'touchend',function(){
		if(bOff)
		{
			for(var i=0;i<len;i++)
			{
				aFormTag[i].getElementsByTagName('input')[0].checked=false;
			}
			bOff=false;
			addClass(oOver,'pageShow');
			removeClass(oForm,'pageShow');
			removeClass(oBtn,'submit');
			over();
		}
	});
}

function over()
{
	var oOver=document.getElementById('over');
	var oBtn=oOver.getElementsByClassName('btn')[0];
	bind(oBtn,'touchend',function()
	{
		removeClass(oOver,'pageShow');
	});
}