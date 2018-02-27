window.onscroll=function(){
    if(window.scrollY>=200){
        document.getElementsByClassName("contentWrap")[0].getElementsByClassName("title")[0].style.webkitAnimation="leftTitleMove 0.4s linear both";
        document.getElementsByClassName("contentWrap")[0].getElementsByClassName("content")[0].style.webkitAnimation="contentMove 0.4s linear 0.4s both";
        document.getElementsByClassName("contentWrap")[1].getElementsByClassName("title")[0].style.webkitAnimation="rightTitleMove 0.4s linear 0.8s both";
        document.getElementsByClassName("contentWrap")[1].getElementsByClassName("content")[0].style.webkitAnimation="contentMove 0.4s linear 1.2s both";
        document.getElementsByClassName("contentWrap")[2].getElementsByClassName("title")[0].style.webkitAnimation="leftTitleMove 0.4s linear 1.6s both";
        document.getElementsByClassName("contentWrap")[2].getElementsByClassName("content")[0].style.webkitAnimation="contentMove 0.4s linear 2s both";
        document.getElementsByClassName("contentWrap")[3].getElementsByClassName("title")[0].style.webkitAnimation="rightTitleMove 0.4s linear 2.4s both";
        document.getElementsByClassName("contentWrap")[3].getElementsByClassName("content")[0].style.webkitAnimation="contentMove 0.4s linear 2.8s both";
    }
};