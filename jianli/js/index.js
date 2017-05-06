var curIndex=1;
$(function(){
    $('#dowebok').fullpage({
        navigation:true,
        navigationTooltips:['首页','关于我','专业技能','作品','联系我'],
        fixedElements:"#header",
        afterLoad:function(link,index){
          switch (index) {
              case 1:
              break;
              case 2:
              move('#triangle').set("left","200px").end(function(){move('#triangle').x(-200).end();});
              move('#headaa').set("opacity",1).y(300).rotate(360).end();
              move('#contxt').set("opacity",1).y(-300).end();
              break;
              case 3:
              move('#pagegroup').set("left","200px").end(function(){move('#pagegroup').x(-200).end(function(){ move('#ininin').set("opacity",1).y(-190).x(-20).end();});});
              break;
              case 4:
              move('#oneone').set("opacity",1).y(-300).end(function(){move('#twotwo').set("opacity",1).y(-300).end(function(){move('#three').set("opacity",1).y(-300).end()})});
              break;
              case 5:
              break;
            default:
              break;
          }
        },
        onLeave:function(link,index,aaa){
          switch (index) {
              case 1:
              break;
              case 2:
              break;
              case 3:
              break;
              case 4:
              break;
              case 5:
              break;
            default:
              break;
          }
        },
        afterRender:function(){
          move('h2').scale(0.7) .duration('2s').end();
          move('#headimg').y(300) .duration('2s').end();
          move('#opa').set("opacity",1).duration('4s').end();
          move('.section1 hr').rotate(720).duration('2s').end();
        }



    });

});


    function next(){
      if(curIndex==6){return;}
      var curPage=document.getElementById("pag"+curIndex);

        curPage.style.webkitTransform="rotatey(-270deg)";
        curIndex++;
      var nextPage=document.getElementById("pag"+curIndex);
        nextPage.style.webkitTransform="rotatey(0deg)";
        }
	function prev(){

        if(curIndex==1){return;}    
      var curPage=document.getElementById("pag"+curIndex);
        curPage.style.webkitTransform="rotatey(90deg)";
        curIndex--;

      var nextPage=document.getElementById("pag"+curIndex);
        nextPage.style.webkitTransform="rotatey(0deg)";
    }


