
var selectedText;//被选中的元素编号
var isrectsubmit=0;
var strings=[];//答案
var stringsindex=[];//答案位置
var aaaaaaa=false;//是否提交
window.onload=function(){
	var	selectTexts=document.getElementsByClassName("selectText");//选择所有框
	var Dergimg=document.getElementById("bardiv");//拖动框
	var textbox=document.getElementById("textbox");//文字框
	var numberVID=document.getElementsByClassName("numberVID");//下面数字
	var tabletd=document.getElementsByClassName("tdstyle");//所有的tabel
	var divlist=document.getElementsByTagName("p")[0];
	var makedata=document.getElementById("makedata");//生成题目
	var rectsubmit=document.getElementById("rectsubmit");
	var zhenqubutton=document.getElementById("zhenqubutton");
/*
拖动模块
*/
	Dergimg.onmousedown=function(event){
		var e=event||window.event;
		document.onmousemove=function(event){
			var e=event||window.event;
			var y=e.clientY-90;
			textbox.style.height=y+"px";
		}
		document.onmouseup=function(event){
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}

/*
点击题目生成
*/
	makedata.onclick=makedatafun;

/*
 完成做题
*/
	rectsubmit.onclick=endscore;
/*
	查看卷轴
*/
	zhenqubutton.onclick=onzhenqubutton;

}
function onzhenqubutton (argument) {
	var zhezhao=document.getElementById("zhezhao");
	var zhezhaocontent=document.getElementById("zhezhaocontent");
	var tablediv=document.getElementById("tablediv");
	zhezhao.style.display="none";
	zhezhaocontent.style.display="none";
	tablediv.style.display="none";

	var selectText=document.getElementsByClassName("selectText");//选择所有框

	for (var i=0;i<selectText.length; i++) {
		selectText[i].style.color="red";
		selectText[i].innerHTML=selectText[i].innerHTML+"<span class='strings'>"+strings[i]+"</span>";
		
	}

	for (var i=0;i<stringsindex.length; i++) {
		selectText[stringsindex[i]].style.color="#66CCFF";
	}

}


/*获取答案*/
function endscore (argument) {
	if(isrectsubmit==0){
	  alert("答题后才能提交");
	  return;
	}
	aaaaaaa=true;
	var zhezhao=document.getElementById("zhezhao");
	var zhenqu=document.getElementById("zhenqu");
	var zhezhaocontent=document.getElementById("zhezhaocontent");
	var answer=document.getElementsByClassName("selectText"),
	answerss=[];//用户答案
	for (var i=0;i<answer.length; i++) {
		answerss[i]=answer[i].firstChild.textContent;
	}
	for (var i=0;i<strings.length;i++) {
		if(answerss[i]==strings[i]){
			stringsindex[i]=i;
		}
	}
	var allsize =strings.length;
	var strsize =stringsindex.length;
	var c = parseInt(strsize) * 100 /parseInt(allsize);
	
	zhezhao.style.display="block";
	zhezhaocontent.style.display="block";

	zhenqu.innerHTML=Math.round(c)+"%";
	tabletd.style.display="none";

/*	
	1.取出答案
	2.和正确答案对比得出正确率保存正确的位置
	3.显示遮罩层显示正确率
	4.显示所有的正确答案然后不是正确的位置显示为红色的
	5.取消点击事件
*/


}





function makedatafun(){/*解析开始做题*/
	var tabletd=document.getElementsByClassName("tdstyle");
	var inputdata=document.getElementById("inputdata");//代码输入框
	var inputdatastrings=inputdata.value;

	if(inputdatastrings.length<5){
		alert("请输入5个字以上的数据");
		return;
	}

	var makedata=document.getElementById("makedata");
	makedata.style.display="none";
	inputdata.style.display="none";
	var divlist=document.getElementsByTagName("p")[0];
	var numberVID=document.getElementById("number");//下面数字
	var tabletd=document.getElementById("tablediv");
	var tabletds=document.getElementsByClassName("tdstyle");//所有的tabel
	divlist.style.display="block";
	numberVID.style.display="block";
	tabletd.style.display="block";
	divlist.innerHTML=inputdatastrings;
	selectText=document.getElementsByClassName("selectText");//选择所有框
	var selectTextsnumber=selectText.length;//空位个数

	strings=[];//文字数组
	for(var i=0;i<selectTextsnumber;i++){
		strings[i]=selectText[i].firstChild.textContent;
		selectText[i].firstChild.textContent=null;
	}

	for(var i=0;i<selectTextsnumber;i++){//添加数字
			var a=numberVID.innerHTML;
			var nuber=i+1;
			numberVID.innerHTML=a+"<span class='numberVID'>"+nuber+"</span>";
	}

	for(var i=0;i<selectTextsnumber;i){//导入table
		var tabledivtable=document.getElementById("tabledivtable");
		var yu=selectTextsnumber-i;
		if(yu%3==0){
			var a=tabledivtable.innerHTML;
			tabledivtable.innerHTML=a+"<tr><td class='tdstyle'>and</td><td class='tdstyle'>and</td><td class='tdstyle'>and</td></tr>";
			i=i+3;
		}
		if(yu%3==2){
			var a=tabledivtable.innerHTML;
			tabledivtable.innerHTML=a+"<tr><td class='tdstyle'>and</td><td class='tdstyle'>and</td></tr>";
			i=i+2;
		}
		if(yu%3==1){
			var a=tabledivtable.innerHTML;
			tabledivtable.innerHTML=a+"<tr><td class='tdstyle'>and</td></tr>";
			i=i+1;
		}
	}

		for(var i=0;i<strings.length;i++){

		 var cha=strings[i];
		 tabletds[i].innerHTML=cha;
		}

/*
给所有的位置套上事件
*/
	makeEvent();

}



function makeEvent(){
		//保证填入单词和数字和填空位置一样后才能运行
	var numberVID=document.getElementsByClassName("numberVID");//下面数字
	var tabletd=document.getElementsByClassName("tdstyle");//所有的tabel
	var	selectTexts=document.getElementsByClassName("selectText");//选择所有框	

		for (var i=0; i <selectTexts.length; i++) {
		selectTexts[i].index=i;
		selectTexts[i].onclick=function(){
			if(aaaaaaa==true){ return}
			if (!this.style.background){
				for (var u=0;u <selectTexts.length;u++){
					selectTexts[u].style.background="";
					selectTexts[u].style.color="";
					numberVID[u].style.background="";
				}
				isrectsubmit=1;
				selectedText=this.index;
				this.style.background="#66CCFF";
				this.style.color="#fff";
				numberVID[this.index].style.background="#66CCFF";
			}else{
				this.style.background="";
				numberVID[this.index].style.background="";
				this.style.color="#66CCFF";
			}
		}

		numberVID[i].index=i;
		numberVID[i].onclick=function () {
			if(aaaaaaa==true){ return}
			if(!this.style.background){
				for(var u=0;u<numberVID.length;u++){
					selectTexts[u].style.background="";
					selectTexts[u].style.color="";
					numberVID[u].style.background="";
				}

				selectedText=this.index;
				this.style.background="#66CCFF";
				selectTexts[this.index].style.color="#fff";
				selectTexts[this.index].style.background="#66CCFF";
			}else {
				this.style.background="";
				selectTexts[this.index].style.background="";
				selectTexts[this.index].style.color="#66CCFF";
			}
		}

		tabletd[i].onmousemove=function() {
			if(selectedText!=null){
			 selectTexts[selectedText].innerHTML=this.innerHTML;
			}
		}
		tabletd[i].onclick=function(){
			selectTexts[selectedText].innerHTML=this.innerHTML;
			selectTexts[selectedText].style.background="";
			selectTexts[selectedText].style.color="";
			this.style.textDecoration = 'line-through';

			numberVID[selectedText].style.background="";
			selectedText=null;
		}

	}


}	
