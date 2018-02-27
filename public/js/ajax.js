function ajax(method,action,content,myfun){
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            myfun&&myfun(xhr.responseText);
        }
    };
    xhr.open(method,action,true);
    if(method=="post"){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    }
    xhr.send(content);
}