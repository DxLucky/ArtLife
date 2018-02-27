var provinceName;
var cityName;
var box=document.getElementById("box");
var addressid;//收获地址id
window.onload= function () {
    getlist();
};
//弹出添加地址的表格
var setInt;
function mystr(){
    var mystress=document.getElementById("mystress");
    box.style.width="1349px";
    var myheight=window.document.documentElement.clientHeight;
    box.style.height=myheight;
    //box.style.width=mywidth;
    box.style.display="block";
    mystress.style.marginLeft="375px";
    mystress.style.marginTop=(.5*myheight-300)+"px"
}
//点击保存地址表格
function baocun(){
    var xhr;
    var shouhuoren=document.getElementById("shouhuoren").value;
    var detail=document.getElementById("detail").value;
    var shoujihao=document.getElementById("shoujihao").value;
    var mydetail=provinceName+cityName+detail;
    var stress=document.getElementById("stress");
    var addsdress=document.getElementById("addsdress");
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
            addsdress.innerHTML+="<li class='mystress' onclick='selectAdd(this,"+dataText[0].addressid+")'>"+
            "<p class='name'>"+shouhuoren+"</p>"+
            "<p class='tel'>"+shoujihao+"</p>"+
            "<p class='stress'>"+mydetail+"</p>"+
            "<div class='myput' onclick='delMe(this,"+dataText[0].addressid+")'>"+
            "</div>"+
            "</li>";
            qingchu();
            jiancha();
        }
    };
    xhr.open("post","/save.do",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("shouhuoren="+shouhuoren+"&mydetail="+
    mydetail+"&shoujihao="+shoujihao+"");
}
//删除已有地址
function delMe(t,id){
    var myparent1= t.parentNode;
    var myparent2=myparent1.parentNode;
    myparent2.removeChild(myparent1);
    var method="get";
    var action="/delAddress.do?id="+id+"";
    var content=null;
    ajax(method,action,content,function(data){
    })
}
//获取订单列表
function getlist(){
    var xhr;
    var shops=document.getElementById("shops");
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
                shops.innerHTML+="<div class='mybuy'>"+
                "<a href='/showDetail.do?id="+data[i].g_id+"'><div class='myL'>"+"<img src='"+data[i].goodsSrc+"'>"+"</div></a>"+
                "<div class='myM'>"+
                "<a href='/showDetail.do?id="+data[i].g_id+"'><div class='paint'>"+data[i].g_name+"</div></a>"+
                "<a href='/artistInfo.do?id="+data[i].artistid+"'><div class='name'>"+data[i].artistName+"</div></a>"+
                "<div class='size'>"+data[i].g_width+"*"+data[i].g_height+"cm</div>"+
                "<div class='miaoshu'>"+data[i].reason+"</div>"+
                "</div>"+
                "<div class='myR'>"+"￥"+data[i].price+"</div>"+
                "</div>";
                totalPrice+=data[i].price;
            }
            document.getElementById("totalPrice").innerText="￥"+totalPrice+"";
        }
    };
    xhr.open("get","/getlist.do?");
    xhr.send(null);
}
//取消新建地址
function quxiao(){
    box.style.display="none"
}
//清空上次填写的地址内容
function qingchu(){
    var myform=document.getElementById("myform");
    myform.reset();
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
        ]

    var newcity=""
    var myshi=newshi[province.value];
    for(var i=0;i<newshi.length;i++){
        newcity+="<option>"+myshi[i]+"</option>"
        if(province[i].selected==true){
            provinceName = province[i].innerText;
            console.log(provinceName)
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
function jiancha(){
    alertText.innerText="";
    var detail=document.getElementById("detail").value;
    var shoujihao=document.getElementById("shoujihao").value;
    var shouhuoren=document.getElementById("shouhuoren").value;
    var alertText=document.getElementById("tianjia").getElementsByTagName("span")[0];
    if(shouhuoren==""||shouhuoren==null){
        console.log("请填写收货人");
        alertText.innerText="请填写收货人";
    }
    if(provinceName==""||provinceName==null){
        console.log("请选择所在地区");
        alertText.innerText="请选择所在地区";
    }
    if(detail==""||detail==null){
        console.log("请填写详细地址");
        alertText.innerText="请填写详细地址";
    }
    if(shoujihao==""||shoujihao==null){
        console.log("请填写手机号码");
        alertText.innerText="请填写手机号码";
    }
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(shoujihao))){
        console.log("请输入正确的手机号");
        alertText.innerText="请输入正确的手机号";
        return false;
    }
    var TelNumber = document.getElementById("TelNumber").value;
    if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(TelNumber)){
        console.log("请输入正确的电话号码");
        alertText.innerText="请输入正确的电话号码";
        return false;
    }
    var youz=document.getElementById("youz").value;
    if(!/^[1-9][0-9]{5}$/.test(youz)){
        console.log("请输入正确的邮政编码");
        alertText.innerText="请输入正确的邮政编码";
        return false;
    }
}
//地址被选中
function selectAdd(obj,id){
    for(var i=0;i<document.getElementsByClassName("mystress").length;i++){
        document.getElementsByClassName("mystress")[i].style.border="";
    }
    obj.style.border="2px solid #e56a69";
    addressid=id;
}
//结算
function pay(){
    if(addressid!=""&&addressid!=undefined){
        var method="get";
        var action="/goPay.do?addressid="+addressid+"";
        var content=null;
        ajax(method,action,content,function(data){
            window.location.href="/successpay.do";
        })
    }else{
        document.getElementById("mypay").getElementsByTagName("span")[0].innerText="请选择收获地址";
    }
}







