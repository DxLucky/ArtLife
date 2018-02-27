sh_EmptyShop = document.getElementsByClassName("sh_EmptyShop")[0];
sc_Shop = document.getElementsByClassName("sc_Shop");
sc_addWz = document.getElementById("sc_addWz");
sc_Prompt3 = document.getElementById("sc_Prompt3");
sc_shopNumber = document.getElementsByClassName("sh_fixed")[0].getElementsByTagName("i");
sh_EmptyShop.onclick=mysh_EmptyShop;
chooseBotton=document.getElementsByClassName("chooseBotton");
eachPrice=document.getElementsByClassName("sc_ShopPrice");
shopContenter=document.getElementsByClassName("sc_contenter")[0].getElementsByTagName("span")[2];
sc_count = document.getElementsByClassName("sc_contenter")[0].getElementsByTagName("span");
goPay=document.getElementsByClassName("sc_Settlement")[0];
var goodsSum;
var totalPrice=0;
var chooseCount;
var startSumPrice;
function mysh_EmptyShop(){
    var method="get";
    var action="/clearShopCart.do?";
    var content=null;
    ajax(method,action,content,function(data){
        chooseBotton[0].checked=false;
        for(var i=0;i<sc_Shop.length;i++){
            sc_Shop[i].style.display="none";
            sc_addWz.innerHTML="亲，你的目前还没有商品，快去选购吧~~";
            sc_addWz.style.display="block";
            sc_Prompt3.innerHTML="";
            sc_count[2].innerHTML="0";
        }
    })
}
function checkItem(str) {
    var evt=getEvent();
    var e=evt.srcElement || evt.target;
    function getEvent()
    {
        if(document.all)
        {
            return window.event;//如果是ie
        }
        func=getEvent.caller;
        while(func!=null)
        {
            var arg0=func.arguments[0];
            if(arg0)
            {
                if((arg0.constructor==Event || arg0.constructor ==MouseEvent)
                    ||(typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
                {
                    return arg0;
                }
            }
            func=func.caller;
        }
        return null;
    }
    var all = eval("document.all."+ str);
    if (e.checked) {
        var a = document.getElementsByName(e.name);
        all.checked = true;
        for (var i=0; i<a.length; i++){
            var b=1;
            if(a[i].checked){
                b+=1;
            }
            else {all.checked = false;
                b=b-1;}
            sc_shopNumber[0].innerHTML=b;
        }
    }
    else{all.checked = false;}
}

function checkChoose(obj){
    if(!obj.checked){
        var getPrice=parseInt((obj.parentNode.parentNode).getElementsByClassName("sc_ShopPrice")[0].innerHTML.slice(1));
        totalPrice-=getPrice;      //totalPrice=totalPrice-getPrice;
        chooseCount--;
    }
    else {
        var getPrice=parseInt((obj.parentNode.parentNode).getElementsByClassName("sc_ShopPrice")[0].innerHTML.slice(1));
        totalPrice+=getPrice;
        chooseCount++;
    }
    document.getElementById("sc_Prompt3").getElementsByTagName("i")[1].innerHTML="¥"+totalPrice;
    document.getElementById("sc_Prompt3").getElementsByTagName("i")[0].innerHTML=chooseCount;
}

function checkChooseAll(obj){
    if(!obj.checked){
        for (var k=0;k<chooseBotton.length;k++){
            chooseBotton[k].checked=false;
            if (k<eachPrice.length){
                totalPrice=totalPrice-(parseInt(eachPrice[k].innerHTML.slice(1)));
                chooseCount--
            }
        }
    }
    else {
        totalPrice=0;
        chooseCount=0;
        for (var k=0;k<chooseBotton.length;k++){
            chooseBotton[k].checked=true;
            if (k<eachPrice.length){
                totalPrice=totalPrice+(parseInt(eachPrice[k].innerHTML.slice(1)));
                chooseCount++
            }
        }
    }
    document.getElementById("sc_Prompt3").getElementsByTagName("i")[1].innerHTML="¥"+totalPrice;
    document.getElementById("sc_Prompt3").getElementsByTagName("i")[0].innerHTML=chooseCount;
}

window.onload=function(){
    for (var k=0;k<chooseBotton.length;k++){
        chooseBotton[k].checked=true;
        if (k<eachPrice.length){
            totalPrice=totalPrice+parseInt(eachPrice[k].innerHTML.slice(1))
        }
    }
    goodsSum=eachPrice.length;
    startSumPrice=totalPrice;
    chooseCount=chooseBotton.length-1;
    document.getElementById("sc_Prompt3").getElementsByTagName("i")[1].innerHTML="¥"+totalPrice;
    document.getElementById("sc_Prompt3").getElementsByTagName("i")[0].innerHTML=chooseCount;
    sumCount();
};
function sumCount(){
    if(shopContenter.innerHTML==0){
        sc_addWz.innerHTML="亲，你的目前还没有商品，快去选购吧~~";
        sc_addWz.style.display="block";
    }
}
function deleteCurrent(obj){
    var currentImgid=(obj.parentNode).getElementsByTagName("img")[0].src.split("images/")[1].split(".")[0];
    var method="get";
    var action="/deleteCurrentGoods.do?currentImgid="+currentImgid+"";
    var content=null;
    ajax(method,action,content,function(data){
        (obj.parentNode.parentNode).removeChild(obj.parentNode);
        goodsSum--;
        shopContenter.innerHTML=goodsSum;
        sumCount();
        if((obj.parentNode).getElementsByTagName("input")[0].checked) {
            chooseCount--;
            var getPrice = parseInt((obj.parentNode).getElementsByClassName("sc_ShopPrice")[0].innerHTML.slice(1));
            totalPrice -= getPrice;
            if(chooseCount==0){
                chooseBotton[0].checked=false
            }
            document.getElementById("sc_Prompt3").getElementsByTagName("i")[0].innerHTML = chooseCount;
            document.getElementById("sc_Prompt3").getElementsByTagName("i")[1].innerHTML = "¥" + totalPrice;
        }
        for (var h=0;h<eachPrice.length;h++){
            if(!sc_Shop[h].getElementsByTagName("input")[0].checked){
                chooseBotton[0].checked=false;
                break;
            }
            else {
                chooseBotton[0].checked=true;
            }
        }
    })
}

var imgIdArray=new Array();
goPay.onclick=function(){
    for (var h=0;h<eachPrice.length;h++){
        if(sc_Shop[h].getElementsByTagName("input")[0].checked){
            var currentImg=sc_Shop[h].getElementsByTagName("img")[0].src.split("images/")[1].split(".")[0];
            imgIdArray.push(currentImg)
        }
    }
    var method="get";
    var action="/changeCartState.do?imgIdArray="+JSON.stringify(imgIdArray)+"";
    var content=null;
    ajax(method,action,content,function(data){
        window.location.href="/payCenter.do";
    });
};
