var pageNum=1;
var pageTotal;
var artistPageNum=1;
var artistPageTotal;
function show(obj){
    if(obj=="1"){
        document.getElementById("paintResult").style.display="inline-block";
        document.getElementById("paint").style.display="block";
        document.getElementById("myinput").style.display="block";
        document.getElementById("thing").style.borderBottom="2px solid red";
        document.getElementById("thing").style.fontWeight="bold";
        document.getElementById("artistResult").style.display="none";
        document.getElementById("artistR").style.display="none";
        document.getElementById("artistPage").style.display="none";
        document.getElementById("artist").style.borderBottom="";
        document.getElementById("artist").style.fontWeight="normal";
        document.getElementById("artistR").style.display="none";
        document.getElementById("list").getElementsByTagName("hr")[0].style.marginBottom="";
    }else{
        document.getElementById("thing").style.fontWeight="normal";
        document.getElementById("thing").style.borderBottom="none";
        document.getElementById("paintResult").style.display="none";
        document.getElementById("paint").style.display="none";
        document.getElementById("myinput").style.display="none";
        document.getElementById("artist").style.borderBottom="2px solid red";
        document.getElementById("artistResult").style.display="inline-block";
        document.getElementById("artistR").style.display="block";
        document.getElementById("artistPage").style.display="block";
        document.getElementById("artist").style.fontWeight="bold";
        document.getElementById("artistR").style.display="block";
        document.getElementById("list").getElementsByTagName("hr")[0].style.marginBottom="30px";
    }
}
function searchProduct(){
    qingkong();
    getPaintResult();
    changePage();
    getPaintPageTotal();
    aritistSearch();
    getAritistResult();
    getAritistPageTotal();
}
window.onload=searchProduct;
function qingchu(){
    document.getElementById("mysearch").value="";
}
function qingkong(){
    pageNum=1;
    pageTotal="";
    artistPageNum=1;
    artistPageTotal="";
}
function changePage(keyWord){
    var paint=document.getElementById("paint");
    var searchText=document.getElementById("mysearch").value;
    var method="get";
    var action="/searchPaint.do?searchText="+searchText+"&pageNum="+pageNum+"";
    var content=null;
    ajax(method,action,content,function(data){
        var dataText=JSON.parse(data);
        paint.innerHTML="";
        if(dataText.length>0){
            for(var i=0;i<dataText.length;i++){
                paint.innerHTML+="<div class='mypaint' onclick='proDetail(this)'>" +
                    "<div class='left'>"+ "<img src='"+dataText[i].goodsSrc+"'>"+"</div>"+
                    "<div class='middle'>"+
                    "<p>"+dataText[i].g_name+"</p>"+
                    "<p>"+dataText[i].myname+"</p>"+
                    "<p>"+dataText[i].g_width+"*"+dataText[i].g_height+"</p>"+
                    "<p>￥"+dataText[i].price+"</p>"+
                    "</div>"+
                    "<div class='right'>"+
                    "<p>作品描述</p>"+
                    "<div>"+dataText[i].myreason+"</div>"+
                    "<p>"+"<a href='/showDetail.do?id="+dataText[i].g_id+"'>查看详情>"+"</a>"+"</p>"+
                    "</div>"+
                    "</div>"
            }
        }
    })
}

function getPaintPageTotal(keyWord){
    var myinput=document.getElementById("myinput");
    var searchText=document.getElementById("mysearch").value;
    var method="get";
    var action="/getPaintPageTotal.do?searchText="+searchText+"";
    var content=null;
    ajax(method,action,content,function(data){
        myinput.innerHTML="";
        pageTotal=parseInt(data);
        if(pageTotal==0){
            myinput.innerHTML="<p class='noresult'>对不起，没有您要搜索的商品！</p>";
        }
        if(pageTotal==1){
            myinput.innerHTML="<input class='nowpage' type='button' value='1'>";
        }
        if(pageTotal>=2){
            if(pageNum==1){
                for(var j=2;j<=pageTotal;j++){
                    myinput.innerHTML+="<input type='button' onclick='page(this)' class='page' value='"+j+"'>"
                }
                myinput.innerHTML="<input class='nowpage' type='button' value='1'>"+myinput.innerHTML+
                    "<input type='button' class='mypage' value='下一页' onclick='nextPage()'>"
            }
            else if(pageNum>1&&pageNum!=pageTotal&&pageTotal!=2){
                for(var j=1;j<=pageTotal;j++){
                    if(j==pageNum){
                        myinput.innerHTML+="<input type='button' class='nowpage' value='"+j+"'>"
                    }else{
                        myinput.innerHTML+="<input type='button' class='page' onclick='page(this)' value='"+j+"'>"
                    }
                }
                myinput.innerHTML="<input type='button' class='mypage' value='上一页' onclick='prevPage()'>"+myinput.innerHTML+
                    "<input type='button' class='mypage' value='下一页' onclick='nextPage()'>";
            }
            else if(pageNum=pageTotal||pageTotal==2&&pageNum==2){
                for(var j=1;j<pageTotal;j++){
                    myinput.innerHTML+="<input type='button' class='page' onclick='page(this)' value='"+j+"'>"
                }
                myinput.innerHTML="<input type='button' class='mypage' value='上一页' onclick='prevPage()'>"+myinput.innerHTML+
                    "<input class='nowpage' type='button' value='"+pageTotal+"'>";
            }
        }
    })
}
function prevPage(){
    pageNum--;
    changePage();
    getPaintPageTotal();
}
function nextPage(){
    pageNum++;
    changePage();
    getPaintPageTotal();
}
function page(t){
    pageNum=t.value;
    changePage();
    getPaintPageTotal();
}
function getPaintResult(){
    var paintResult=document.getElementById("paintResult");
    var searchText=document.getElementById("mysearch").value;
    var method="get";
    var action="/getPaintResult.do?searchText="+searchText+"";
    var content=null;
    ajax(method,action,content,function(data){
        paintResult.innerHTML="";
        paintResult.innerHTML=parseInt(data);
    })
}
//搜索艺术家
//var a;
var dataText1;
//function aritistSearch(){
//    var artistR=document.getElementById("artistR");
//    var searchText=document.getElementById("mysearch").value;
//    var method="get";
//    var action="/aritistSearch.do?searchText="+searchText+"&artistPageNum="+artistPageNum+"";
//    var content=null;
//    artistR.innerHTML="";
//    dataText1="";
//    ajax(method,action,content,function(data){
//        dataText1=JSON.parse(data);
//        if(dataText1.length>0){
//        for(var a=0;a<dataText1.length;a++){
//            var artistid=dataText1[a].artistid;
//            var action="/aritistSearchPaint.do?artistid="+artistid+"&num="+a+"";
//                ajax(method,action,content,function(data){
//                    var dataText2=JSON.parse(data);
//                    var i=dataText2[0];
//                    artistR.innerHTML+="<div class='headerImg'>"+
//                        "<a href='/artistInfo.do?id="+dataText1[i].artistid+"'><img src="+dataText1[i].artistSrc+"></a>"+
//                        "<p>"+dataText1[i].artistName+"</p>"+
//                        "</div>";
//                    for(var j=0;j<dataText2[1].length;j++){
//                        artistR.innerHTML+="<a href='/showDetail.do?id="+dataText2[1][j].g_id+"'><img src="+dataText2[1][j].goodsSrc+"></a>"
//                    }
//                    artistR.innerHTML+="<a href='/artistInfo.do?id="+dataText1[i].artistid+"'><p>更多></p></a>" +
//                        "<div class='line'></div>";
//                })
//            }
//        }
//    })
//}
function aritistSearch(){
    var artistR=document.getElementById("artistR");
    var searchText=document.getElementById("mysearch").value;
    var method="get";
    var action="/aritistSearch.do?searchText="+searchText+"&artistPageNum="+artistPageNum+"";
    var content=null;
    ajax(method,action,content,function(data){
        artistR.innerHTML="";
        dataText1=JSON.parse(data);
        for(var a=0;a<dataText1.length;a++){
            var artistid=dataText1[a].artistid;
            var action="/aritistSearchPaint.do?artistid="+artistid+"";
            ajax(method,action,content,function(data){
                var dataText2=JSON.parse(data);
                var i=dataText2[0]-1;
                artistR.innerHTML+="<div class='headerImg'>"+
                    "<a href='/artistInfo.do?id="+dataText1[0].artistid+"'><img src="+dataText1[0].artistSrc+"></a>"+
                    "<p>"+dataText1[0].artistName+"</p>"+
                    "</div>";
                for(var j=0;j<dataText2[1].length;j++){
                    artistR.innerHTML+="<a href='/showDetail.do?id="+dataText2[1][j].g_id+"'><img src="+dataText2[1][j].goodsSrc+"></a>"
                }
                artistR.innerHTML+="<a href='/artistInfo.do?id="+dataText1[0].artistid+"'><p>更多></p></a>" +
                    "<div class='line'></div>";
            })
        }
    })
}
function getAritistResult(){
    var artistResult=document.getElementById("artistResult");
    var searchText=document.getElementById("mysearch").value;
    var method="get";
    var action="/getAritistResult.do?searchText="+searchText+"";
    var content=null;
    ajax(method,action,content,function(data){
        artistResult.innerHTML="";
        artistResult.innerHTML=parseInt(data);
    })
}
//得到总页数
function getAritistPageTotal(){
    var page=document.getElementById("artistPage");
    page.innerHTML="";
    var method="get";
    var searchText=document.getElementById("mysearch").value;
    var action="/getAritistPageTotal.do?searchText="+searchText+"";
    var content=null;
    ajax(method,action,content,function(data){
        artistPageTotal=parseInt(data);
        if(artistPageTotal==0){
            page.innerHTML="<p class='noresult'>对不起，没有您要搜索的艺术家！</p>";
        }
        if(artistPageTotal!=0){
            if(artistPageNum>1){
                page.innerHTML+="<div class='turn' onclick='changeAritistPage(this)'>上一页</div>";
            }
            for(var i=1;i<=artistPageTotal;i++){
                page.innerHTML+="<div class='page' onclick='changeAritistPage(this)'>"+i+"</div>";
            }
            if(artistPageTotal>1&&artistPageNum!=artistPageTotal){
                page.innerHTML+="<div class='turn' onclick='changeAritistPage(this)'>下一页</div>";
            }
        }
        page.getElementsByClassName("page")[artistPageNum-1].style.backgroundColor="#000000";
        page.getElementsByClassName("page")[artistPageNum-1].style.color="white";
    })
}
//翻页
function changeAritistPage(obj){
    if(obj.innerHTML=="下一页"){
        if(artistPageNum<artistPageTotal){
            artistPageNum++;
        }
    }else if(obj.innerHTML=="上一页"){
        if(artistPageNum!=1){
            artistPageNum--;
        }
    }else{
        artistPageNum=obj.innerText;
    }
    aritistSearch();
    getAritistPageTotal();
}