var provinceName;
var cityName;
var addressid;//收获地址id
box=document.getElementById("box");
TelMatch=/0?(13|14|15|17|18)[0-9]{9}/;
tipText=document.getElementById("tipText");//获取新增地址信息提示
shouhuoren=document.getElementById("shouhuoren");//获取新增地址收货人
detail=document.getElementById("detail");//获取新增地址详细地址
shoujihao=document.getElementById("shoujihao");//获取新增地址手机号
consignee=document.getElementById("consignee").getElementsByTagName("ul")[0];//获取收货地址列表
addAdress=document.getElementById("addAdress");
window.onload= function () {
    getlist();
};
//弹出添加地址的表格
var setInt;
function mystr(){
    box.style.display="block";
}
//取消新建地址
function quxiao(){
    box.style.display="none"
}
//省市联动
function getcity(){
    var province=document.getElementById("province");
    var city=document.getElementById("city");
    var newshi=
        [
            ["合肥","淮南","淮北","安庆","黄山"],
            ["雅安","成都","乐山","自贡","德阳"],
            ["昆明","玉溪","大理","丽江","宣威"],
            ["石家庄","衡水","保定","张家口","沧州"],
            ["太原","大同","运城","长治","阳泉"]
        ];
    var newcity="";
    var myshi=newshi[province.value];
    for(var i=0;i<newshi.length;i++){
        newcity+="<option>"+myshi[i]+"</option>";
        if(province[i].selected==true){
            provinceName = province[i].innerText;
        }
    }
    city.innerHTML=newcity;
}
//获取用户选择的市
function getcityname(){
    var city=document.getElementById("city");
    for(var j=0;j<city.length;j++){
        if(city[j].selected==true){
            cityName = city[j].innerText;
        }
    }
}
//正则验证
//收货人不能为空
shouhuoren.onblur=function(){
    if(shouhuoren.value==""||shouhuoren.value==null){
        tipText.innerText="请填写收货人";
    } else {
        tipText.innerText=""
    }
};
//地址详情能为空
detail.onblur=function(){
    if(detail.value==""||detail.value==null){
        tipText.innerText="请正确填写地址";
    } else {
        tipText.innerText=""
    }
};
//手机号码验证
shoujihao.onblur=function(){
    if(shoujihao.value==""||shoujihao.value==null){
        tipText.innerText="手机号不能为空";
    } else {
        if(shoujihao.value.match(TelMatch)){
            tipText.innerText=""
        }else {
            tipText.innerText="请输入正确的手机号码"
        }
    }
};
//点击保存地址表格
function baocun(){
    if(shouhuoren.value==""||shouhuoren.value==null||detail.value==""||detail.value==null||shoujihao.value==""||shoujihao.value==null||!shoujihao.value.match(TelMatch)){
        tipText.innerText="请正确填写信息";
    }else {
        var xhr;
        var detailValue=detail.value;
        var mydetail=provinceName+cityName+detailValue;
        console.log(mydetail);
        if(window.XMLHttpRequest){
            xhr= new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4&&xhr.status==200){
                var dataText=JSON.parse(xhr.responseText);
                box.style.display="none";
                var newAdress=document.createElement("li");
                newAdress.innerHTML="<p>"+shouhuoren.value+"</p>"+"<p>"+shoujihao.value+"</p>"+
                    "<p>"+mydetail+"</p>"+
                    "<i class='fa fa-trash' onclick='delMe(this,"+dataText[0].addressid+")'>"+ "</i>";
                newAdress.onclick=function(){
                    selectAdd(this,dataText[0].addressid);
                };
                consignee.insertBefore(newAdress,addAdress);
                qingchu();
                //alert("添加地址成功")
            }
        };
        xhr.open("post","/save.do",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send("shouhuoren="+shouhuoren.value+"&mydetail="+
            mydetail+"&shoujihao="+shoujihao.value+"");
    }
}
//清空上次填写的地址内容
function qingchu(){
    var myform=document.getElementById("myform");
    myform.reset();
}

//地址被选中
function selectAdd(obj,id){
    for(var i=0;i<consignee.getElementsByTagName("li").length;i++){
        consignee.getElementsByTagName("li")[i].style.border="";
    }
    obj.style.border="2px solid #e56a69";
    addressid=id;
}
//删除已有地址
function delMe(t,id){
    var e=window.event||arguments[0];
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble=true;
    }
    var myparent1= t.parentNode;
    var myparent2=myparent1.parentNode;
    myparent2.removeChild(myparent1);
    if(addressid==id){
        addressid=undefined;
    }
    var method="get";
    var action="/delAddress.do?id="+id+"";
    var content=null;
    ajax(method,action,content,function(data){})
}
//获取订单列表
function getlist(){
    var xhr;
    var shops=document.getElementById("buyThing").getElementsByTagName("ul")[0];
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange= function () {
        if(xhr.readyState==4&&xhr.status==200){
            shops.innerHTML="";
            var data=JSON.parse(xhr.responseText);
            var totalPrice=0;
            for(var i=0;i<data.length;i++){
                shops.innerHTML+="<li>"+"<div>"+"<img src='"+data[i].goodsSrc+"'>"+"</div>"+"<p>"+data[i].artistName+
                    "</p>"+"<p>"+data[i].g_name+"</p>"+"<p>"+data[i].material+"："+data[i].g_width+"x"+data[i].g_height+"</p>"+
                    "<p>"+"¥"+data[i].price+"</p>"+"</li>";
                totalPrice+=data[i].price;
            }
            document.getElementById("totalPrice").innerText=""+totalPrice+"";
        }
    };
    xhr.open("get","/getlist.do?");
    xhr.send(null);
}
//结算订单
function pay(){
    if(addressid!=""&&addressid!=undefined){
        var method="get";
        var action="/goPay.do?addressid="+addressid+"";
        var content=null;
        ajax(method,action,content,function(data){
            window.location.href="/successpay.do";
        })
    }else{
        document.getElementById("payMethod").getElementsByTagName("div")[1].getElementsByTagName("span")[0].innerHTML="请选择收获地址";
    }
}