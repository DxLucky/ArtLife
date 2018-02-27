var form=document.getElementsByTagName("form")[0];
var telV=document.getElementById("tel");
var loginpassw=document.getElementById("loginpassw");
var regpassw=document.getElementById("regpassw");
var textMe=document.getElementById('textMe');
var submit=document.getElementById("submit");
var submitT=document.getElementById("submitT");
var register=document.getElementById("register");
var others=document.getElementById("others");
var forgetMe=document.getElementById("forgetMe");
var pmsg = document.getElementById("msg");
var loginBox=document.getElementById("loginBox");
var changeMeBox=document.getElementById("changeMeBox");
var loserMe=document.getElementsByClassName("loserMe");
var shadow=document.getElementById('shadow');
var a=/0?(13|14|15|17|18)[0-9]{9}/;
var b=/^[\w]{6,12}$/;
var timeout1;
window.onload=function(){
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    shadow.style.height=winHeight+"px";
    document.getElementById("page").style.height=winHeight+"px";
    document.getElementById("page").style.background="url('../images/background-login.jpg')";
    document.getElementById("page").style.backgroundSize="cover";
};
function checkTel(object){
    timeout1=setInterval(yanzheng,10);
}
function yanzheng(){
    var tel = telV.value;
    if(tel.match(a)){
        clearInterval(timeout1);
            var method="get";
            var action="/testtel.do?tel="+tel+"";
            var content=null;
            ajax(method,action,content,function(data){
                if(data=="用户已存在"){
                    submit.removeAttribute("disabled");
                    loginpassw.style.display="block";
                    forgetMe.style.display="block";
                    submit.value="登录";
                    register.style.display="none";
                    loginpassw.required="required";
                    regpassw.required=false;
                    regpassw.value="";
                    textMe.required=false;
                    textMe.value="";
                    loserMe[0].innerHTML="";
                    countdown=-1;
                    countDown();
                }
                if(data=="新用户"){
                    submit.setAttribute("disabled","true");
                    register.style.display="block";
                    forgetMe.style.display="none";
                    pmsg.style.display="none";
                    submit.value="注册";
                    loginpassw.style.display="none";
                    loginpassw.value="";
                    regpassw.required="required";
                    textMe.required="required";
                    loginpassw.required=false;
                }
            })
    }
}
function checkMe(object){
    if(object.value.match(b)){
        console.log("正确")
    }
    else{
        object.value=""
    }
}
var APP_ID = 'BpVVCNk4Ijdq6pfMdHYKPQ8c-gzGzoHsz';
// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
var APP_KEY = 'R0JfUh1NGv64Rgwew7QRlKET';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var countdown=60;
var timeout2;
function send(){
     var telV=document.getElementById('tel').value;
     var passwordV=document.getElementById('regpassw').value;
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: telV,
        name: 'ArtLife',
        op: '注册验证',
        ttl: 6
    }).then(function(){
        //发送成功
        console.log(111);
    }, function(err){
        //发送失败
        console.log(222);
    });
    timeout2=setInterval(countDown,1000);
}
function countDown(){
    var sendMe=document.getElementById('sendMe');
    if (countdown<0) {
        sendMe.removeAttribute("disabled");
        sendMe.value="免费获取验证码";
        sendMe.style.background="#e56a69";
        countdown = 60;
        clearInterval(timeout2);
    } else {
        sendMe.setAttribute("disabled", true);
        sendMe.style.background="#dcdcdc";
        sendMe.value="重新发送(" + countdown + ")";
        countdown--;
    }
}
function varify(object){
        var val=object.value;
        var telV=document.getElementById('tel').value;
        AV.Cloud.verifySmsCode(val,telV).then(function(){
            //验证成功
            submit.removeAttribute("disabled");
            loserMe[0].innerHTML="";
        },function(err){
            //验证失败
            object.value="";
            submit.setAttribute("disabled","true");
            loserMe[0].innerHTML="短信验证失败请重试";
        });
}
function queryC(object){
    var tel = telV.value;
    var pwd=loginpassw.value;
    var regpasswV=regpassw.value;
    var textMeV=textMe.value;
    if((pwd!=""&&tel!="")||(tel==111&&regpasswV==111&&textMeV==111)){
        var method="get";
        var action="/testC.do?tel="+tel+"&pwd="+pwd+"";
        var content=null;
        ajax(method,action,content,function(data){
            if(data=="用户名与密码不匹配"){
                pmsg.style.display="block";
                pmsg.innerHTML=data;
            }
        })
    }
}
function changeME(){
    loginBox.style.display="none";
    changeMeBox.style.display="block";
    telV.value="";
    pmsg.style.display="none";
    loginpassw.value="";
}
function returnLogin(){
    loginBox.style.display="block";
    changeMeBox.style.display="none";
    document.getElementById("telphone").value="";
    document.getElementById("textMeT").value="";
    document.getElementById("pwdRe").value="";
    document.getElementById("alertMe").innerHTML="";
    loserMe[1].innerHTML="";
    countdownT=-1;
    countDownT();
}
function checkTelp(object){
    var alertMe=document.getElementById("alertMe");
    var tel=document.getElementById("telphone").value;
    if(object.value.match(a)){
        alertMe.style.display="none";
        var method="get";
        var action="/testtel.do?tel="+tel+"";
        var content=null;
        ajax(method,action,content,function(data){
            if(data=="新用户"){
                alertMe.style.display="block";
                alertMe.innerHTML="您还未注册，请返回登录/注册页面";
            }
        })
    }
    else{
        /*object.value=""*/
        alertMe.innerHTML="请输入正确的手机号格式";
        alertMe.style.display="block";
    }
}
var countdownT=60;
var timeout3;
function sendChange(){
    var telphone=document.getElementById('telphone').value;
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: telphone,
        name: 'ArtLife',
        op: '注册验证',
        ttl: 6
    }).then(function(){
        //发送成功
        console.log(111);
    }, function(err){
        //发送失败
        console.log(222);
    });
    timeout3=setInterval(countDownT,1000);
}
function countDownT(){
    var sendma=document.getElementById('sendma');
    if (countdownT<0) {
        sendma.removeAttribute("disabled");
        sendma.value="免费获取验证码";
        sendma.style.background="#e56a69";
        countdownT = 60;
        clearInterval(timeout3);
    } else {
        sendma.setAttribute("disabled", true);
        sendma.style.background="#dcdcdc";
        sendma.value="重新发送(" + countdownT + ")";
        countdownT--;
    }
}
function varifyT(object) {
        var val=object.value;
        var telphone=document.getElementById('telphone').value;
        AV.Cloud.verifySmsCode(val,telphone).then(function(){
            //验证成功
            submitT.removeAttribute("disabled");
            loserMe[1].innerHTML="";
        },function(err){
            //验证失败
            object.value="";
            submitT.setAttribute("disabled","true");
            loserMe[1].innerHTML="短信验证失败请重试";
        });
}
