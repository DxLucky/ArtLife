/*=========== 页面加载时执行 =========*/
window.onload=function(){
    MyOrder.style.display="block";
    addressInitial.style.height="70px";
    pc_ModifyPassword.style.height="30px";
    pc_ShopOngoing.style.borderBottom = "1px solid #000000";
    pc_ShopOngoing.style.color="#000";
    pcContentleftTriangle[0].style.display="block";
};

//    正则
var userphone=/0?(13|14|15|18)[0-9]{9}/;
var useraddrsee =document.getElementById("useraddrsee");


/*=============我的订单===============*/
var myorder = document.getElementById("myorder");//左边===我的订单
var MyOrder = document.getElementsByClassName("MyOrder")[0];//我的订单 ---> 内容
var pcContentleftTriangle = document.getElementsByClassName("pcContentleftTriangle");//三角形
myorder.onclick=displayorder;// 给  “我的订单” 添加点击事件
function displayorder(){
    MyOrder.style.display="block";
    addressInitial.style.display="";
    personalInformation.style.display="none";
    pc_SecurityCenter.style.display="none";
    pcContentleftTriangle[0].style.display="block";
    pcContentleftTriangle[1].style.display="";
    pcContentleftTriangle[2].style.display="";
    pcContentleftTriangle[3].style.display="";
    myorder.style.color="#000";
    Address.style.color="";
    information.style.color="";
    security.style.color="";
    addressInitial.style.height="70px";

    useraddrsee.style.display="none";

    pc_ShopOngoing.style.borderBottom = "1px solid #000000";
    pc_CompletedShop.style.borderBottom="";
    pc_AllShop.style.borderBottom = "";
}

//    给进行中商品添加点击事件

/*=============收货地址===============*/
var Address = document.getElementById("myAddress");
var addressInitial = document.getElementsByClassName("addressInitial")[0];
//var pc_uesradrs = document.getElementsByClassName("pc_uesradrs")[0];
Address.onclick=myAddress;
function myAddress(){
    pcContentleftTriangle[0].style.display="";
    pcContentleftTriangle[1].style.display="block";
    pcContentleftTriangle[2].style.display="";
    pcContentleftTriangle[3].style.display="";
    myorder.style.color="";
    Address.style.color="#000";
    information.style.color="";
    security.style.color="";
    /*=========  点击 收货地址  =========*/
    addressInitial.style.display="block";
    MyOrder.style.display="none";
    personalInformation.style.display="none";
    pc_SecurityCenter.style.display="none";

    useraddrsee.style.display="block";
    uesradrs();

    pc_ShopOngoing.style.borderBottom = "1px solid #000000";
    pc_CompletedShop.style.borderBottom="";
    pc_AllShop.style.borderBottom = "";
    pc_ShopOngoing.style.color="#000"
}

//     显示用户已有地址
function uesradrs(){
    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        var useraddrsee=document.getElementById("useraddrsee");
        useraddrsee.innerHTML="";
        if(xhr.readyState==4&&xhr.status==200) {
            var data = JSON.parse(xhr.responseText);
            if(data.length>0){
                //pc_uesradrs.style.display="block";
                for(var i=0;i<data.length;i++){
                    useraddrsee.innerHTML+='<div class="pc_uesradrs">'+
                        '<div class="pc_uesradrscont">'+
                        '<span>'+
                        data[i].addName+"</span>"+
                        "<br>"+
                        "<br>"+
                        '<span>'+
                        data[i].addTel+"</span>"+
                        '<br>'+
                        "<br>"+
                        '<span>'+
                        data[i].addressName+"</span>"+
                        "<br>"+
                        "<br>"+
                        '</div>'+
                        '<input type="button" class="pc_delectadd1" value="修改" style="outline: none">'+
                        '<input type="button" class="pc_delectadd2" onclick="pc_DeletAdd(this)" value="删除" style="outline: none">'+
                        '</div>'
                }
            }
            }
        };
    xhr.open("get","/uesradrs.do?");
    xhr.send(null);
}

//        添加地址
var c=0;
var pc_save = document.getElementById("pc-save");
pc_save.onclick=addsave;
function addsave(){
    //   获取下拉框中的省/直辖市 的值
    var s_province = document.getElementById("s_province");
    var index=s_province.selectedIndex;
    var province = s_province.options[index].value;
    //alert(province);
    //   获取下拉框中的 区 的值
    var s_city = document.getElementById("s_city");
    var citIndex = s_city.selectedIndex;
    var city = s_city.options[citIndex].value;
    //alert(city);
    //   获取详细地址
    var detailedAd = document.getElementById("detailedAd").value;
    //alert(detailedAd);
    //    收货人地址
    var adUseradres = province+city+detailedAd;
    //alert(adUseradres);
    //  获取收货人姓名
    var Consignee = document.getElementById("Consignee").value;
    var ConsigneePhot = document.getElementById("ConsigneePhot").value;


if(Consignee=="" || ConsigneePhot=="" || detailedAd=="" || city=="区" || province=="省/直辖市"){
    //alert("添加失败！请填写完整的地址");
}else {
    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200) {
            //alert(xhr.responseText);
            mypc_cancel();
            uesradrs();
        }
    };
    //alert(myuesrName);
    xhr.open("get","/adduserads.do?Consignee="+Consignee+"&adUseradres="+adUseradres+"&ConsigneePhot="+ConsigneePhot+"",true);
    xhr.send(null);
}

    //uesradrs();
}


//  手机验证   正则
var phoneTs = document.getElementById("phoneTs");
var userphoneVation = document.getElementById("ConsigneePhot");
userphoneVation.onblur=function(){
    var ConsigneePhot = document.getElementById("ConsigneePhot").value;
    if(!ConsigneePhot.match(userphone)){
        phoneTs.innerHTML="你输入的手机号码有误！"
        phoneTs.style.display="block";
    }else {
        phoneTs.style.display="none";
    }
};

/*=============基本信息===============*/
var information = document.getElementById("information");
var personalInformation = document.getElementsByClassName("personalInformation")[0];
information.onclick=myinformation;
function myinformation(){
    pcContentleftTriangle[0].style.display="";
    pcContentleftTriangle[1].style.display="";
    pcContentleftTriangle[2].style.display="block";
    pcContentleftTriangle[3].style.display="";
    myorder.style.color="";
    Address.style.color="";
    information.style.color="#000";
    security.style.color="";
    /*======显示   隐藏=======*/
    personalInformation.style.display="block";
    pc_SecurityCenter.style.display="none";
    addressInitial.style.display="none";
    MyOrder.style.display="none";
    addressInitial.style.height="70px";

    useraddrsee.style.display="none";

    pc_ShopOngoing.style.borderBottom = "1px solid #000000";
    pc_CompletedShop.style.borderBottom="";
    pc_AllShop.style.borderBottom = "";
    /*======头像 显示=======*/
    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200) {
           // console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
            //console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")
            var data = JSON.parse(xhr.responseText);
            var Pc_HeadPhotoimg =document.getElementsByClassName("Pc_HeadPhoto")[0].getElementsByTagName("ul")[0];
            Pc_HeadPhotoimg.innerHTML="";
            console.log(data.length);
            for(var i=0;i<data.length;i++){
                Pc_HeadPhotoimg.innerHTML+= "<li onclick='userHeadPhoto(this)'>"+
                    "<img src='"+data[i].h_imgsrc+"'>"+
                    "</li>"
            }
        }
    };
    xhr.open("get","/displayIfimg.do?");
    xhr.send(null);

    //       修改个人资料
    var pc_PreservationIf = document.getElementById("pc_PreservationIf");
    pc_PreservationIf.onclick=myIform;
    var f=0;
    var userSex;//  保存用户修改的性别
    var radios=document.getElementsByName("sex");
    function myIform(){
        for(var i=0;i<radios.length;i++){
            if(radios[i].checked==true)
            {
                userSex=radios[i].value;
            }
        }
        var myheadimg1=document.getElementsByClassName("Pc_HeadPhoto_dp")[0].getElementsByTagName("img")[0].src.split("images/")[1].split(".")[0]
        //alert(myheadimg1);
        var myheadimg2=document.getElementsByClassName("Pc_HeadPhoto_dp")[0].getElementsByTagName("img")[0].src.split("images/")[1].split(".")[1]
        //var myherdSrc ="../images/"+myheadimg+".jpg"
        //alert(myheadimg2);
        var mySrc = "../images/"+myheadimg1+"."+myheadimg2;
        //alert(mySrc);
        var xhr;
        if(window.XMLHttpRequest){
            xhr= new XMLHttpRequest();
        }else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&xhr.status==200) {
                //alert(xhr.responseText);
                document.getElementsByClassName("Pc_Prompt")[0].style.display="block";
            }
        };
        var myuesrName = document.getElementsByClassName("personalInformation")[0].getElementsByTagName("input")[1].value;
        //alert(myuesrName);
        xhr.open("get","/updatamyif.do?myUserName="+myuesrName+"&sex="+userSex+"&mySrc="+mySrc+"",true);
        xhr.send(null);
    }

    //==============初始化头像
    myHradPhoto();
    function myHradPhoto(){
        var xhr;
        if(window.XMLHttpRequest){
            xhr= new XMLHttpRequest();
        }else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            var Pc_HeadPhoto_dp=document.getElementsByClassName("Pc_HeadPhoto_dp")[0];
            if(xhr.readyState==4&&xhr.status==200) {
                console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
                console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")
                var data = JSON.parse(xhr.responseText);
                Pc_HeadPhoto_dp.innerHTML= "<img src='"+data[0].h_imgsrc+"'>";
            }
        };
        //var username="18482119977";
        xhr.open("get","/myHradPhoto.do?",true);
        xhr.send(null);
    }
}

/*=============安全设置===============*/
var security = document.getElementById("security");
security.onclick=mysecurity;
function mysecurity(){
    pcContentleftTriangle[0].style.display="";
    pcContentleftTriangle[1].style.display="";
    pcContentleftTriangle[2].style.display="";
    pcContentleftTriangle[3].style.display="block";
    myorder.style.color="";
    Address.style.color="";
    information.style.color="";
    security.style.color="#000";

    pc_SecurityCenter.style.display="block";
    personalInformation.style.display="none";
    addressInitial.style.display="none";
    MyOrder.style.display="none";

    addressInitial.style.height="70px";

    useraddrsee.style.display="none";

    pc_ShopOngoing.style.borderBottom = "1px solid #000000";
    pc_CompletedShop.style.borderBottom="";
    pc_AllShop.style.borderBottom = "";
}

/*=========修改密码  确定按钮========*/
var pc_butonPwd = document.getElementsByClassName("pc_butonPwd");
var pc_UpPwd = document.getElementsByClassName("pc_UpPwd");
pc_UpPwd[0].onblur = pc_VerificationPwd;
/*===========验证  登录密码========*/

var  a=0;
var  b=0;
function pc_VerificationPwd(){
    var currentPwd = pc_UpPwd[0].value;
    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200) {
            console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
            console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")；
            var pc_VerificationPwd = document.getElementById("pc_VerificationPwd");
            pc_VerificationPwd.innerHTML=xhr.responseText;

            if(xhr.responseText=="你输入的密码正确！"){
                a=1;
                //alert(xhr.responseText);
            }else {
                a=0;
                //alert("错误")
            }
        }
    };
    xhr.open("get","/pc_VerificationPwd.do?pc_UpPwd="+currentPwd+"",true);
    xhr.send(null);
}

//        第一次输入密码提示
pc_UpPwd[1].onfocus=pc_VerificationPwd1;
function pc_VerificationPwd1(){
    var pc_VerificationPwd1 = document.getElementById("pc_VerificationPwd1");
    pc_VerificationPwd1.innerHTML="请输入新密码";
}

//        验证两次输入密码是否一致
pc_UpPwd[2].onblur = pc_VerificationPwd2;
function pc_VerificationPwd2(){
    //pc_VerificationPwd2.innerHTML="";
    var pc_onePwd =  pc_UpPwd[1].value;
    var pc_twoPwd =  pc_UpPwd[2].value;
    var pc_VerificationPwd2 = document.getElementById("pc_VerificationPwd2");
    if(pc_onePwd == pc_twoPwd ){
        pc_VerificationPwd2.innerHTML="你输入的两次密码一致";
        pc_butonPwd[0].onclick=my_uppwd;
        b=1;
    } else {
        pc_VerificationPwd2.innerHTML="你输入的两次密码不一致";
        b=0;
    }
    if(a==1&&b==1){
        pc_butonPwd[0].onclick=my_uppwd;
    }else {
        pc_butonPwd[0].onclick=null;
    }
}

//           确定修改按钮
pc_butonPwd[0].onclick=my_uppwd;
function my_uppwd(){
    if(a==1&&b==1){
        pc_butonPwd[0].onclick=my_uppwd;
    }else {
        pc_butonPwd[0].onclick=null;
    }
    var pc_UpPwd = document.getElementsByClassName("pc_UpPwd");
    var myNewPwd = pc_UpPwd[1].value;
    //alert(myNewPwd);
    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200) {
            console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
            console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")
            //alert(xhr.responseText);
            mypc_butonPwdcancel();
        }
    };
    xhr.open("get","/pc_upPwd.do?pc_newPwd="+myNewPwd+"",true);
    xhr.send(null);
}


/*=============收货地址===========*/
var addressWords = document.getElementsByClassName("addressWords")[0];
var pc_cancel = document.getElementById("pc-cancel");
pc_cancel.onclick=mypc_cancel;
addressWords.onclick=myaddressWords;
function myaddressWords(){
    if(parseInt(addressInitial.style.height)==70){
        addressInitial.style.height="600px";
        addressInitial.style.transition="all .5s linear"
    }else {
        addressInitial.style.height="70px";
    }

    pc_ShopOngoing.style.borderBottom = "1px solid #000000";
    pc_CompletedShop.style.borderBottom="";
    pc_AllShop.style.borderBottom = "";
}
function mypc_cancel(){
    addressInitial.style.height="70px";
}


/*======== 收货地址  二级联动 =======*/
function Dsy(){
    this.Items = {};
}
Dsy.prototype.add = function(id,iArray){
    this.Items[id] = iArray;
};
Dsy.prototype.Exists = function(id){
    if(typeof(this.Items[id]) == "undefined") {
        return false;
    }else {
    return true;
    }
};

function change(v){
    var str="0";
    for(i=0;i<v;i++){
        str+=("_"+(document.getElementById(s[i]).selectedIndex-1));
    }
    var ss=document.getElementById(s[v]);
    with(ss){
        length = 0;
        options[0]=new Option(opt0[v],opt0[v]);
        if(v && document.getElementById(s[v-1]).selectedIndex>0 || !v){
            if(dsy.Exists(str)){
                ar = dsy.Items[str];
                for(i=0;i<ar.length;i++){
                    options[length]=new Option(ar[i],ar[i]);
                }//end for
                if(v){ options[0].selected = true; }
            }
        }//end if v
        if(++v<s.length){change(v);}
    }//End with
}

var dsy = new Dsy();

dsy.add("0",["北京市","天津市","上海市","重庆市","河北省","山西省","内蒙古","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西","海南省","四川省","贵州省","云南省","西藏","陕西省","甘肃省","青海省","宁夏","新疆","香港","澳门","台湾省"]);
dsy.add("0_0",["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","密云县","延庆县","延庆镇"]);
dsy.add("0_1",["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","蓟县","宁河县","芦台镇","静海县","静海镇"]);
dsy.add("0_2",["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","闵行区","宝山区","嘉定区","浦东新区","金山区","松江区","青浦区","南汇区","奉贤区","崇明县","城桥镇"]);
dsy.add("0_3",["渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","万州区","涪陵区","黔江区","长寿区","合川市","永川区市","江津市","南川市","綦江县","潼南县","铜梁县","大足县","荣昌县","璧山县","垫江县","武隆县","丰都县","城口县","梁平县","开县","巫溪县","巫山县","奉节县","云阳县","忠县","石柱土家族自治县","彭水苗族土家族自治县","酉阳土家族苗族自治县","秀山土家族苗族自治县"]);
dsy.add("0_4",["石家庄市","张家口市","承德市","秦皇岛市","唐山市","廊坊市","保定市","衡水市","沧州市","邢台市","邯郸市"]);
dsy.add("0_5",["太原市","朔州市","大同市","阳泉市","长治市","晋城市","忻州市","晋中市","临汾市","吕梁市","运城市"]);
dsy.add("0_6",["呼和浩特市","包头市","乌海市","赤峰市","通辽市","呼伦贝尔市","鄂尔多斯市","乌兰察布市","巴彦淖尔市","兴安盟","锡林郭勒盟","阿拉善盟"]);
dsy.add("0_7",["沈阳市","朝阳市","阜新市","铁岭市","抚顺市","本溪市","辽阳市","鞍山市","丹东市","大连市","营口市","盘锦市","锦州市","葫芦岛市"]);
dsy.add("0_8",["长春市","白城市","松原市","吉林市","四平市","辽源市","通化市","白山市","延边州"]);
dsy.add("0_9",["哈尔滨市","齐齐哈尔市","七台河市","黑河市","大庆市","鹤岗市","伊春市","佳木斯市","双鸭山市","鸡西市","牡丹江市","绥化市","大兴安岭地区"]);
dsy.add("0_10",["南京市","徐州市","连云港市","宿迁市","淮安市","盐城市","扬州市","泰州市","南通市","镇江市","常州市","无锡市","苏州市"]);
dsy.add("0_11",["杭州市","湖州市","嘉兴市","舟山市","宁波市","绍兴市","衢州市","金华市","台州市","温州市","丽水市"]);
dsy.add("0_12",["合肥市","宿州市","淮北市","亳州市","阜阳市","蚌埠市","淮南市","滁州市","马鞍山市","芜湖市","铜陵市","安庆市","黄山市","六安市","巢湖市","池州市","宣城市"]);
dsy.add("0_13",["福州市","南平市","莆田市","三明市","泉州市","厦门市","漳州市","龙岩市","宁德市"]);
dsy.add("0_14",["南昌市","九江市","景德镇市","鹰潭市","新余市","萍乡市","赣州市","上饶市","抚州市","宜春市","吉安市"]);
dsy.add("0_15",["济南市","青岛市","聊城市","德州市","东营市","淄博市","潍坊市","烟台市","威海市","日照市","临沂市","枣庄市","济宁市","泰安市","莱芜市","滨州市","菏泽市"]);
dsy.add("0_16",["郑州市","开封市","三门峡市","洛阳市","焦作市","新乡市","鹤壁市","安阳市","濮阳市","商丘市","许昌市","漯河市","平顶山市","南阳市","信阳市","周口市","驻马店市","济源市"]);
dsy.add("0_17",["武汉市","十堰市","襄樊市","荆门市","孝感市","黄冈市","鄂州市","黄石市","咸宁市","荆州市","宜昌市","随州市","省直辖县级行政单位","恩施州"]);
dsy.add("0_18",["长沙市","张家界市","常德市","益阳市","岳阳市","株洲市","湘潭市","衡阳市","郴州市","永州市","邵阳市","怀化市","娄底市","湘西州"]);
dsy.add("0_19",["广州市","深圳市","清远市","韶关市","河源市","梅州市","潮州市","汕头市","揭阳市","汕尾市","惠州市","东莞市","珠海市","中山市","江门市","佛山市","肇庆市","云浮市","阳江市","茂名市","湛江市"]);
dsy.add("0_20",["南宁市","桂林市","柳州市","梧州市","贵港市","玉林市","钦州市","北海市","防城港市","崇左市","百色市","河池市","来宾市","贺州市"]);
dsy.add("0_21",["海口市","三亚市","省直辖行政单位"]);
dsy.add("0_22",["成都市","广元市","绵阳市","德阳市","南充市","广安市","遂宁市","内江市","乐山市","自贡市","泸州市","宜宾市","攀枝花市","巴中市","达州市","资阳市","眉山市","雅安市","阿坝州","甘孜州","凉山州"]);
dsy.add("0_23",["贵阳市","六盘水市","遵义市","安顺市","毕节地区","铜仁地区","黔东南州","黔南州","黔西南州"]);
dsy.add("0_24",["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","思茅市","临沧市","德宏州","怒江州","迪庆州","大理州","楚雄州","红河州","文山州","西双版纳州"]);
dsy.add("0_25",["拉萨市","那曲地区","昌都地区","林芝地区","山南地区","日喀则地区","阿里地区"]);
dsy.add("0_26",["西安市","延安市","铜川市","渭南市","咸阳市","宝鸡市","汉中市","榆林市","安康市","商洛市"]);
dsy.add("0_27",["兰州市","嘉峪关市","白银市","天水市","武威市","酒泉市","张掖市","庆阳市","平凉市","定西市","陇南市","临夏州","甘南州"]);
dsy.add("0_28",["西宁市","海东地区","海北州","海南州","黄南州","果洛州","玉树州","海西州"]);
dsy.add("0_29",["银川市","石嘴山市","吴忠市","固原市","中卫市"]);
dsy.add("0_30",["乌鲁木齐市","克拉玛依市","自治区直辖县级行政单位","喀什地区","阿克苏地区","和田地区","吐鲁番地区","哈密地区","克孜勒苏柯州","博尔塔拉州","昌吉州","巴音郭楞州","伊犁州","塔城地区","阿勒泰地区"]);
dsy.add("0_31",["香港特别行政区"]);
dsy.add("0_32",["澳门特别行政区"]);
dsy.add("0_33",["台北","高雄","台中","花莲","基隆","嘉义","金门","连江","苗栗","南投","澎湖","屏东","台东","台南","桃园","新竹","宜兰","云林","彰化"]);
dsy.add("0",["北京市","天津市","上海市","重庆市","河北省","山西省","内蒙古","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西","海南省","四川省","贵州省","云南省","西藏","陕西省","甘肃省","青海省","宁夏","新疆","香港","澳门","台湾省"]);

var s=["s_province","s_city"];//三个select的name
var opt0 = ["省/直辖市","区"];//初始值
function _init_area(){ //初始化函数
    for(i=0;i<s.length-1;i++){
        document.getElementById(s[i]).onchange=new Function("change("+(i+1)+")");
    }
    change(0);
}
/*========= 年 月 日  ==========*/
function DateSelector(selYear, selMonth, selDay)
{
    this.selYear = selYear;
    this.selMonth = selMonth;
    this.selDay = selDay;
    this.selYear.Group = this;
    this.selMonth.Group = this;
    // 给年份、月份下拉菜单添加处理onchange事件的函数
    if(window.document.all != null) // IE
    {
        this.selYear.attachEvent("onchange", DateSelector.Onchange);
        this.selMonth.attachEvent("onchange", DateSelector.Onchange);
    }
    else // Firefox
    {
        this.selYear.addEventListener("change", DateSelector.Onchange, false);
        this.selMonth.addEventListener("change", DateSelector.Onchange, false);
    }

    if(arguments.length == 4) // 如果传入参数个数为4，最后一个参数必须为Date对象
        this.InitSelector(arguments[3].getFullYear(), arguments[3].getMonth() + 1, arguments[3].getDate());
    else if(arguments.length == 6) // 如果传入参数个数为6，最后三个参数必须为初始的年月日数值
        this.InitSelector(arguments[3], arguments[4], arguments[5]);
    else // 默认使用当前日期
    {
        var dt = new Date();
        this.InitSelector(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
    }
}// 增加一个最大年份的属性
DateSelector.prototype.MinYear = 1900;

// 增加一个最大年份的属性
DateSelector.prototype.MaxYear = (new Date()).getFullYear();

// 初始化年份
DateSelector.prototype.InitYearSelect = function()
{
    // 循环添加OPION元素到年份select对象中
    for(var i = this.MaxYear; i >= this.MinYear; i--)
    {
        // 新建一个OPTION对象
        var op = window.document.createElement("OPTION");

        // 设置OPTION对象的值
        op.value = i;

        // 设置OPTION对象的内容
        op.innerHTML = i;

        // 添加到年份select对象
        this.selYear.appendChild(op);
    }
};

// 初始化月份
DateSelector.prototype.InitMonthSelect = function()
{
    // 循环添加OPION元素到月份select对象中
    for(var i = 1; i < 13; i++)
    {
        // 新建一个OPTION对象
        var op = window.document.createElement("OPTION");

        // 设置OPTION对象的值op.value = i;

        // 设置OPTION对象的内容
        op.innerHTML = i;

        // 添加到月份select对象
        this.selMonth.appendChild(op);
    }
}// 根据年份与月份获取当月的天数
DateSelector.DaysInMonth = function(year, month)
{
    var date = new Date(year, month, 0);
    return date.getDate();
}

// 初始化天数
DateSelector.prototype.InitDaySelect = function()
{
    // 使用parseInt函数获取当前的年份和月份
    var year = parseInt(this.selYear.value);
    var month = parseInt(this.selMonth.value);

    // 获取当月的天数
    var daysInMonth = DateSelector.DaysInMonth(year, month);

    // 清空原有的选项
    this.selDay.options.length = 0;
    // 循环添加OPION元素到天数select对象中
    for(var i = 1; i <= daysInMonth ; i++)
    {
        // 新建一个OPTION对象
        var op = window.document.createElement("OPTION");

        // 设置OPTION对象的值
        op.value = i;

        // 设置OPTION对象的内容
        op.innerHTML = i;

        // 添加到天数select对象
        this.selDay.appendChild(op);
    }
};
DateSelector.Onchange = function(e)
{
    var selector = window.document.all != null ? e.srcElement : e.target;
    selector.Group.InitDaySelect();
};
// 根据参数初始化下拉菜单选项
DateSelector.prototype.InitSelector = function(year, month, day)
{
    this.selYear.options.length = 0;
    this.selMonth.options.length = 0;

    // 初始化年、月
    this.InitYearSelect();
    this.InitMonthSelect();

    // 设置年、月初始值
    this.selYear.selectedIndex = this.MaxYear - year;
    this.selMonth.selectedIndex = month - 1;

    // 初始化天数
    this.InitDaySelect();

    // 设置天数初始值
    this.selDay.selectedIndex = day - 1;
};
var selYear = window.document.getElementById("selYear");
var selMonth = window.document.getElementById("selMonth");
var selDay = window.document.getElementById("selDay");
new DateSelector(selYear, selMonth ,selDay, 0, 0, 0);
/*=========安全中心  修改密码 =======*/
var pc_SecurityCenter = document.getElementsByClassName("pc_SecurityCenter")[0];
var pc_ModifyPassword = document.getElementsByClassName("pc_ModifyPassword")[0];
var pc_SC = document.getElementsByClassName("pc_ModifyPassword")[0].getElementsByTagName("i")[0];
var pc_pwd = document.getElementById("pc_pwd");
var pc_DeletBtn = document.getElementById("pc_DeletBtn");
var pc_logonpwdRight = document.getElementsByClassName("pc_logonpwdRight")[0];
var pc_butonPwdcancel = document.getElementsByClassName("pc_butonPwd")[1];
pc_pwd.onclick=mypc_pwd;
pc_butonPwdcancel.onclick=mypc_butonPwdcancel;//取消按钮
function mypc_pwd(){
    pc_ModifyPassword.style.height="230px";
    pc_ModifyPassword.style.transition="all .5s linear";
    pc_DeletBtn.style.display="none";
    pc_pwd.style.display="none";
    pc_SC.style.display="none";
    pc_logonpwdRight.style.marginTop="-29px";
}
function mypc_butonPwdcancel(){

    setTimeout(mycancel,500);//点返回的高度为30px 的时候，显示  之前边长变长是隐藏的元素
    function mycancel(){
        pc_DeletBtn.style.display="inline-block";
        pc_pwd.style.display="inline-block";
        pc_SC.style.display="inline-block";
        pc_logonpwdRight.style.marginTop="0px";
    }
    pc_ModifyPassword.style.height="30px";
}
/*========== 我的订单 --进行中 ==========*/
var pc_Prompt = document.getElementById("pc_Prompt");
var pc_ShopOngoing = document.getElementById("pc_ShopOngoing");
pc_ShopOngoing.onclick=mypc_ShopOngoing;
function mypc_ShopOngoing(){
    MyOrder.style.display="block";
    //MyOrder1.style.display="block";
    pc_AllShop.style.borderBottom = "";
    pc_ShopOngoing.style.borderBottom = "1px solid #000000";
    pc_CompletedShop.style.borderBottom="";
    pc_CompletedShop.style.color="#666";
    pc_ShopOngoing.style.color = "#000";
    pc_AllShop.style.color="#666";
    //userdisplayshop();

    allshoping.style.display="none";
    completeshop.style.display="none";
    ConductShop.style.display="block";

}

/*========== 我的订单 -- 全部商品 ==========*/
var pc_AllShop = document.getElementById("pc_AllShop");
var MyOrder1 = document.getElementsByClassName("pc_CompletedShop")[0];
pc_AllShop.onclick = mypc_AllShop;

var allshoping = document.getElementById("allshoping");
var completeshop = document.getElementById("completeshop");
var ConductShop = document.getElementById("ConductShop");

function mypc_AllShop(){
    pc_ShopOngoing.style.borderBottom = "";
    pc_ShopOngoing.style.color = "#666";
    //MyOrder1.style.display="none"
    pc_AllShop.style.borderBottom = "1px solid #000000";
    pc_AllShop.style.color="#000";
    pc_CompletedShop.style.borderBottom="";
    pc_CompletedShop.style.color="#666";

    allshoping.style.display="block";
    completeshop.style.display="none";
    ConductShop.style.display="none";

    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200) {
            console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
            console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")
        }
    };
    xhr.open("get","/pc_shopping.do?",true);
    xhr.send(null);
    //pc_shopping();
}

/*========== 我的订单 -- 已完成 ==========*/
var pc_CompletedShop = document.getElementById("pc_CompletedShop");
pc_CompletedShop.onclick=mypc_CompletedShop;
function mypc_CompletedShop(){
    pc_CompletedShop.style.borderBottom="1px solid #000000";
    pc_ShopOngoing.style.borderBottom = "";
    pc_AllShop.style.borderBottom = "";
    //MyOrder1.style.display="";
    //MyOrder.style.display="none";
    pc_CompletedShop.style.color="#000";
    pc_ShopOngoing.style.color = "#666";
    pc_AllShop.style.color="#666";

    allshoping.style.display="none";
    completeshop.style.display="block";
    ConductShop.style.display="none";
}


//   删除商品
function pc_DeletBtnShop(obj){

    (obj.parentNode.parentNode).removeChild(obj.parentNode);   //   删除商品节点
    var pc_shopId = (obj.parentNode).getElementsByTagName("img")[0].src.split("images/")[1].split(".")[0];
    //alert(pc_shopId);

        var xhr;
        if(window.XMLHttpRequest){
            xhr= new XMLHttpRequest();
        }else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&xhr.status==200) {
                console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
                console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")
                //(obj.parentNode.parentNode).removeChild(obj.parentNode);
            }
        };
        xhr.open("get","/userSHOP.do?pc_shopId="+pc_shopId+"",true);
        xhr.send(null);
}


//  删除  地址
//var pc_delectadd2 = document.getElementsByClassName("pc_delectadd2")
function pc_DeletAdd(obj){
    (obj.parentNode.parentNode).removeChild(obj.parentNode);
   var wz1 = (obj.parentNode).getElementsByTagName("span")[0].innerHTML;
    var wz2 = (obj.parentNode).getElementsByTagName("span")[1].innerHTML;
    var wz3 = (obj.parentNode).getElementsByTagName("span")[2].innerHTML;

    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200) {
            console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
            console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")
            //(obj.parentNode.parentNode).removeChild(obj.parentNode);
        }
    };
    xhr.open("get","/DleteUserAdd.do?wz1="+wz1+"&wz2="+wz2+"&wz3="+wz3+"",true);
    xhr.send(null);
}

function userHeadPhoto(obj){
    var UserHeadimg = obj.getElementsByTagName("img")[0].src.split("images/")[1].split(".")[0];
    //alert(UserHeadimg);
    var HeadimgId = UserHeadimg.split("_")[1];
    //alert(HeadimgId);
    var xhr;
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function(){
        var Pc_HeadPhoto_dp=document.getElementsByClassName("Pc_HeadPhoto_dp")[0];
        if(xhr.readyState==4&&xhr.status==200) {
            console.log(xhr.readyState);// 0未初始化，1=读取中，2=已读取，3=交互中，4=完成
            console.log(xhr.responseText);   //响应内容。。。后台:resp.send("内容")
            var data = JSON.parse(xhr.responseText);
            Pc_HeadPhoto_dp.innerHTML= "<img src='"+data[0].h_imgsrc+"'>";
        }
    };
    xhr.open("get","/UserHeadimg.do?HeadimgId="+HeadimgId+"",true);
    xhr.send(null);
}
