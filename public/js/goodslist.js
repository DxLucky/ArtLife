var priceBox=document.getElementById("priceBox");
var price=document.getElementById("price");
var sizeBox=document.getElementById("sizeBox");
var size=document.getElementById("size");
var colorBox=document.getElementById("colorBox");
var color=document.getElementById("color");
var searchRange=document.getElementById("searchRange");
var priceRange=document.getElementById("priceRange");
var sizeRange=document.getElementById("sizeRange");
var colorRange=document.getElementById("colorRange");
var listSearchRange=document.getElementById("listSearchRange");
var priceMin;
var priceMax;
var sizeMin;
var sizeMax;
var colorid;
var spaceid;
var spaceStyleid;
var artClassid;
var artStyleid;
var artThemeid;
var listSearchValue;
var startTimeSort;
var priceSort;
var pagetotalNum;
var prepage=1;
//展示图片
function show(obj){
    for(var i=0;i<document.getElementsByClassName(obj.name).length;i++){
        document.getElementsByClassName(obj.name)[i].style.display="none";
    }
    document.getElementById(obj.name+obj.value).style.display="block";
}
//取价格范围
function priceSelect(obj,num){
    for(var i=0;i<priceBox.getElementsByTagName("span").length;i++){
        priceBox.getElementsByTagName("span")[i].style.backgroundColor="";
    }
    for(var j=0;j<price.getElementsByTagName("i").length;j++){
        price.getElementsByTagName("i")[j].style.color="";
    }
    obj.style.background="#000000";
    if(!price.getElementsByTagName("i")[num].innerHTML.match("￥")){
        priceMin=0;
    }else{
        priceMin=price.getElementsByTagName("i")[num].innerHTML.replace("￥","");
    }
    priceMax=price.getElementsByTagName("i")[num+1].innerHTML.replace("￥","");
    price.getElementsByTagName("i")[num].style.color="#000000";
    price.getElementsByTagName("i")[num+1].style.color="#000000";
    priceRange.getElementsByTagName("i")[0].innerText="￥"+priceMin+"～"+priceMax;
    searchRange.style.display="block";
    priceRange.style.display="block";
    prepage=1;
    showImg();
}
//取尺寸范围
function sizeSelect(obj,num){
    for(var i=0;i<sizeBox.getElementsByTagName("span").length;i++){
        sizeBox.getElementsByTagName("span")[i].style.backgroundColor="";
    }
    for(var j=0;j<size.getElementsByTagName("i").length;j++){
        size.getElementsByTagName("i")[j].style.color="";
    }
    obj.style.background="#000000";
    sizeMin=parseInt(size.getElementsByTagName("i")[num].innerHTML);
    sizeMax=parseInt(size.getElementsByTagName("i")[num+1].innerHTML);
    size.getElementsByTagName("i")[num].style.color="#000000";
    size.getElementsByTagName("i")[num+1].style.color="#000000";
    searchRange.style.display="block";
    sizeRange.getElementsByTagName("i")[0].innerText=sizeMin+"～"+sizeMax+"cm";
    if(isNaN(sizeMax)){
        sizeMax="max";
        sizeRange.getElementsByTagName("i")[0].innerText=sizeMin+"～"+sizeMax;
    }
    sizeRange.style.display="block";
    prepage=1;
    showImg();
}
//取色系
function colorSelect(obj,num){
    for(var i=0;i<colorBox.getElementsByTagName("span").length;i++){
        colorBox.getElementsByTagName("span")[i].style.height="";
        colorBox.getElementsByTagName("span")[i].style.width="";
        colorBox.getElementsByTagName("span")[i].style.border="";
    }
    obj.style.height="14px";
    obj.style.width="71px";
    obj.style.border="2px solid black";
    colorid=num;
    searchRange.style.display="block";
    if(colorid=="1"){
        colorRange.getElementsByTagName("i")[0].innerText="红色系";
        colorRange.style.backgroundColor="#e73233";
    }else if(colorid=="2"){
        colorRange.getElementsByTagName("i")[0].innerText="黄色系";
        colorRange.style.backgroundColor="#ffea03";
    }else if(colorid=="3"){
        colorRange.getElementsByTagName("i")[0].innerText="绿色系";
        colorRange.style.backgroundColor="#32cc66";
    }else if(colorid=="4"){
        colorRange.getElementsByTagName("i")[0].innerText="蓝色系";
        colorRange.style.backgroundColor="#0099ff";
    }else if(colorid=="5"){
        colorRange.getElementsByTagName("i")[0].innerText="黑白灰";
        colorRange.style.backgroundColor="#888888";
    }
    colorRange.style.display="block";
    prepage=1;
    showImg();
}
//取搜索列表值
function select(obj){
    for(var n=0;n<document.getElementById(obj.name).getElementsByTagName("button").length;n++){
        document.getElementById(obj.name).getElementsByTagName("button")[n].style.color="";
        document.getElementById(obj.name).getElementsByTagName("button")[n].style.fontWeight="";
    }
    obj.style.color="#000000";
    obj.style.fontWeight="bold";
    searchRange.style.display="block";
    document.getElementById(obj.name+"Range").getElementsByTagName("i")[0].innerText=obj.innerText;
    document.getElementById(obj.name+"Range").style.display="block";
    if(obj.name=="space"){
        spaceid=obj.value;
    }else if(obj.name=="spaceStyle"){
        spaceStyleid=obj.value;
    }else if(obj.name=="artClass"){
        artClassid=obj.value;
    }else if(obj.name=="artStyle"){
        artStyleid=obj.value;
    }else if(obj.name=="artTheme"){
        artThemeid=obj.value;
    }
    prepage=1;
    showImg();
}
//取搜索输入框的值
function inputSelect(){
    if(document.getElementById("listSearch").value!=""){
        listSearchValue=document.getElementById("listSearch").value.trim();
        searchRange.style.display="block";
        listSearchRange.getElementsByTagName("i")[0].innerText=listSearchValue;
        listSearchRange.style.display="block";
        document.getElementById("listSearch").value=null;
        prepage=1;
        showImg();
    }
}
//删除分类搜索目标
function deleteTarget(obj){
    if(obj.name=="price"||obj.name=="size"){
        for(var i=0;i<document.getElementById(obj.name+"Box").getElementsByTagName("span").length;i++){
            document.getElementById(obj.name+"Box").getElementsByTagName("span")[i].style.backgroundColor="";
        }
        for(var j=0;j<document.getElementById(obj.name).getElementsByTagName("i").length;j++){
            document.getElementById(obj.name).getElementsByTagName("i")[j].style.color="";
        }
    }else if(obj.name=="color"){
        for(var k=0;k<document.getElementById(obj.name+"Box").getElementsByTagName("span").length;k++){
            document.getElementById(obj.name+"Box").getElementsByTagName("span")[k].style.height="";
            document.getElementById(obj.name+"Box").getElementsByTagName("span")[k].style.width="";
            document.getElementById(obj.name+"Box").getElementsByTagName("span")[k].style.border="";
        }
    }else{
        for(var n=0;n<document.getElementById(obj.name).getElementsByTagName("button").length;n++){
            document.getElementById(obj.name).getElementsByTagName("button")[n].style.color="";
            document.getElementById(obj.name).getElementsByTagName("button")[n].style.fontWeight="";
        }
    }
    obj.parentNode.style.display="none";
    if(obj.name=="price"){
        priceMin=null;
        priceMax=null;
    }else if(obj.name=="size"){
        sizeMin=null;
        sizeMax=null;
    }else if(obj.name=="color"){
        colorid=null;
    }else if(obj.name=="space"){
        spaceid=null;
    }else if(obj.name=="spaceStyle"){
        spaceStyleid=null;
    }else if(obj.name=="artClass"){
        artClassid=null;
    }else if(obj.name=="artStyle"){
        artStyleid=null;
    }else if(obj.name=="artTheme"){
        artThemeid=null;
    }else if(obj.name=="listSearch"){
        listSearchValue=null;
    }
    if(!priceMin&&!priceMax&&!sizeMin&&!sizeMax&&!colorid&&!spaceid&&!spaceStyleid&&!artClassid&&!artStyleid&&!artThemeid&&!listSearchValue){
        searchRange.style.display="none";
    }
    prepage=1;
    showImg();
}
//获取排列方式
function sort(obj){
    if(obj.name=="startTime"){
        if(obj.selectedIndex=="1"){
            startTimeSort="desc";
        }else if(obj.selectedIndex=="2"){
            startTimeSort="asc";
        }else{
            startTimeSort=null;
        }
    }else if(obj.name=="price"){
        if(obj.selectedIndex=="1"){
            priceSort="asc";
        }else if(obj.selectedIndex=="2"){
            priceSort="desc";
        }else{
            priceSort=null;
        }
    }
    prepage=1;
    showImg();
}
//从数据库取出图片
function showImg(){
    var method="get";
    var action="/showImg.do?priceMin="+priceMin+"&priceMax="+priceMax+"&sizeMin="+sizeMin+"&sizeMax="+sizeMax+"&colorid="+colorid+"&spaceid="+spaceid+"&spaceStyleid="+spaceStyleid+"&artClassid="+artClassid+"&artStyleid="+artStyleid+"&artThemeid="+artThemeid+"&listSearchValue="+listSearchValue+"&startTimeSort="+startTimeSort+"&priceSort="+priceSort+"&prepage="+prepage+"";
    var content=null;
    document.getElementById("goodsList1").innerHTML="";
    document.getElementById("goodsList2").innerHTML="";
    document.getElementById("goodsList3").innerHTML="";
    document.getElementById("goodsList4").innerHTML="";
    ajax(method,action,content,function(data){
        var dataText = JSON.parse(data);
        var listNum=1;
        if(dataText.length>0){
            for(var i=0;i<dataText.length;i++){
                if(listNum=="5"){
                    listNum=1;
                }
                document.getElementById("goodsList"+listNum+"").innerHTML+="<div onclick='proDetail(this)'>"+
                    "<img src='"+dataText[i].goodsSrc+"'>"+
                    "<p>"+dataText[i].artistName+"</p>"+
                    "<p>"+dataText[i].g_name+" ,"+dataText[i].startTime+"</p>"+
                    "<p><span>"+dataText[i].material+"</span><span>"+dataText[i].g_width+"x"+dataText[i].g_height+"cm</span></p>"+
                    "<p>￥"+dataText[i].price+"</p>"+
                    "</div>";
                listNum++;
            }
            document.getElementById("noResult").style.display="";
            document.getElementById("pageWrap").style.display="";
        }else{
            document.getElementById("noResult").style.display="block";
            document.getElementById("pageWrap").style.display="none";
        }
    });
    pagetotal();
}
window.onload=showImg;
//得到总页数
function pagetotal(){
    var page=document.getElementById("pageWrap");
    page.innerHTML="";
    var method="get";
    var action="/pagetotal.do?priceMin="+priceMin+"&priceMax="+priceMax+"&sizeMin="+sizeMin+"&sizeMax="+sizeMax+"&colorid="+colorid+"&spaceid="+spaceid+"&spaceStyleid="+spaceStyleid+"&artClassid="+artClassid+"&artStyleid="+artStyleid+"&artThemeid="+artThemeid+"&listSearchValue="+listSearchValue+"&startTimeSort="+startTimeSort+"&priceSort="+priceSort+"";
    var content=null;
    ajax(method,action,content,function(data){
        pagetotalNum=parseInt(data);
        if(pagetotalNum!=0){
            if(prepage>1){
                page.innerHTML+="<div class='turn' onclick='changePage(this)'>上一页</div>";
            }
            for(var i=1;i<=pagetotalNum;i++){
                page.innerHTML+="<div class='page' onclick='changePage(this)'>"+i+"</div>";
            }
            if(pagetotalNum>1&&prepage!=pagetotalNum){
                page.innerHTML+="<div class='turn' onclick='changePage(this)'>下一页</div>";
            }
        }
        page.getElementsByClassName("page")[prepage-1].style.backgroundColor="#000000";
        page.getElementsByClassName("page")[prepage-1].style.color="white";
    })
}
//翻页
function changePage(obj){
    if(obj.innerHTML=="下一页"){
        if(prepage<pagetotalNum){
            prepage++;
        }
    }else if(obj.innerHTML=="上一页"){
        if(prepage!=1){
            prepage--;
        }
    }else{
        prepage=obj.innerText;
    }
    showImg();
}