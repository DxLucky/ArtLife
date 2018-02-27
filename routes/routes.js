const util = require("./util.js");
//首页留言
exports.answerAsk=function(req,resp){
    var phoneNumber=req.body.phoneNumber;
    var message=req.body.message;
    var sql = "INSERT INTO t_message (messageTel,message,state) VALUES (?,?,?);";
    var param = [phoneNumber,message,0];
    util.connect(sql,param,function(err,data){
        if (data!==undefined){
            resp.send(data);
        }
    })
};
exports.goLogin=function(req,resp){
    if(req.headers['referer'].match("goodslist")||req.headers['referer'].match("search")||req.headers['referer'].match("artist")||req.headers['referer'].match("aboutus")||req.headers['referer'].match("special")||req.headers['referer'].match("showDetail")||req.headers['referer'].match("artistInfo")){
        req.session.preUrl=req.headers['referer'];
    }else{
        req.session.preUrl="http://www.artvivre.cn/index.do";
    }
    resp.render("login",{})
};
//登录注册
exports.checkTel=function(req,resp){
    //console.log(req.headers['referer'])
    var sql = "select * from t_user where tel=?";
    var param = [req.query.tel];
    util.connect(sql,param,function(err,data){
        if(data.length>0){
            resp.send("用户已存在")
        }else{
            resp.send("新用户");
        }
    })
};
exports.login=function(req,resp){
    var myTel = req.body.tel.trim();
    var myPwd = req.body.pwd.trim();
    var myPassword=req.body.password.trim();
    var param;
    var sql;
    if(myPwd!=""){
        param = [myTel,myPwd];
        sql="SELECT * FROM t_user WHERE tel=? AND PASSWORD=?;";
    }
    if(myPassword!=""){
        param = [myTel,myPassword];
        sql="insert into t_user(tel,PASSWORD,h_id) values (?,?,1)";
    }
    util.connect(sql,param,function(err,data){
        if(data.length>0){
            req.session.username = data[0].tel;
            util.connect("SELECT h_imgsrc FROM t_head WHERE h_id=(SELECT h_id FROM t_user WHERE tel=?)",[myTel],function(err,data){
                req.session.header=data[0].h_imgsrc;
                resp.redirect(req.session.preUrl);
            })
        }
        else if(data!=undefined&&data!=""&&data!=null){
            req.session.username = myTel;
            util.connect("SELECT h_imgsrc FROM t_head WHERE h_id=(SELECT h_id FROM t_user WHERE tel=?)",[myTel],function(err,data){
                req.session.header=data[0].h_imgsrc;
                resp.redirect(req.session.preUrl);
            })
        }
        else{
            console.log(err);
        }
    });
};
exports.checkC=function(req,resp){
    var  myTel = req.query.tel.trim();
    var  myPwd = req.query.pwd.trim();
    var  sql="SELECT * FROM t_user WHERE tel=? AND PASSWORD=?;";
    console.log(sql);
    var param = [myTel,myPwd];
    util.connect(sql,param,function(err,data){
        if(data.length>0){
            resp.send(111);
        }else{
            resp.send("用户名与密码不匹配");
        }
    })
};
exports.reset=function(req,resp){
    var myTel = req.body.tel.trim();
    var myPwd = req.body.pwdRe.trim();
    var param = [myPwd,myTel];
    var sql="update t_user set PASSWORD=? where tel=?";
    util.connect(sql,param,function(err,data){
        if(data!=undefined&&data!=""&&data!=null){
            req.session.username = myTel;
            util.connect("SELECT h_imgsrc FROM t_head WHERE h_id=(SELECT h_id FROM t_user WHERE tel=?)",[myTel],function(err,data){
                req.session.header=data[0].h_imgsrc;
                resp.redirect(req.session.preUrl);
                //window.history.back()
                //resp.render("index",{username:req.session.username,hSrc:req.session.header});
            })
        }
    });
};
//从数据库获取图片
exports.showImg=function(req,resp){
    var prepage=req.query.prepage;
    var pageCount=16;
    var param=[];
    var sql="select g_id,artistid,goodsSrc,g_name,material,g_width,g_height,price,startTime,(select artistName from t_artist t1 where t1.artistid=t2.artistid) as artistName from t_goods t2 where g_state=1 ";
    if(req.query.priceMin!="undefined"&&req.query.priceMin!="null"){
        if(req.query.priceMax!="max"){
            sql+="and price between ? and ? ";
            param.push(req.query.priceMin);
            param.push(req.query.priceMax);
        }else{
            sql+="and price > ? ";
            param.push(req.query.priceMin);
        }
    }
    if(req.query.sizeMin!="undefined"&&req.query.sizeMin!="null"){
        if(req.query.sizeMax!="max"){
            sql+="and g_width between ? and ? ";
            param.push(req.query.sizeMin);
            param.push(req.query.sizeMax);
        }else{
            sql+="and g_width > ? ";
            param.push(req.query.sizeMin);
        }
    }
    if(req.query.colorid!="undefined"&&req.query.colorid!="null"){
        sql+="and colorid = ? ";
        param.push(req.query.colorid);
    }
    if(req.query.spaceid!="undefined"&&req.query.spaceid!="null"){
        sql+="and spaceid = ? ";
        param.push(req.query.spaceid);
    }
    if(req.query.spaceStyleid!="undefined"&&req.query.spaceStyleid!="null"){
        sql+="and spaceStyleid = ? ";
        param.push(req.query.spaceStyleid);
    }
    if(req.query.artClassid!="undefined"&&req.query.artClassid!="null"){
        sql+="and artClassid = ? ";
        param.push(req.query.artClassid);
    }
    if(req.query.artStyleid!="undefined"&&req.query.artStyleid!="null"){
        sql+="and artStyleid = ? ";
        param.push(req.query.artStyleid);
    }
    if(req.query.artThemeid!="undefined"&&req.query.artThemeid!="null"){
        sql+="and artThemeid = ? ";
        param.push(req.query.artThemeid);
    }
    if(req.query.listSearchValue!="undefined"&&req.query.listSearchValue!="null"){
        sql+="and g_name like '%"+req.query.listSearchValue+"%' ";
    }
    if(req.query.startTimeSort!="undefined"&&req.query.startTimeSort!="null"&&(req.query.priceSort=="undefined"||req.query.priceSort=="null")){
        sql+="order by t2.startTime "+req.query.startTimeSort+" ";
    }
    if(req.query.priceSort!="undefined"&&req.query.priceSort!="null"&&(req.query.startTimeSort=="undefined"||req.query.startTimeSort=="null")){
        sql+="order by t2.price "+req.query.priceSort+" ";
    }
    if(req.query.startTimeSort!="undefined"&&req.query.startTimeSort!="null"&&(req.query.priceSort!="undefined"&&req.query.priceSort!="null")){
        sql+="order by t2.startTime "+req.query.startTimeSort+",t2.price "+req.query.priceSort+" ";
    }
    sql+="limit ?,?";
    param.push((prepage-1)*pageCount);
    param.push(pageCount);
    util.connect(sql,param,function(err,data){
        resp.send(data);
    })
};
//得到总页数
exports.pagetotal=function(req,resp){
    var pageCount=16;
    var param=[];
    var sql="select count(*) mypagetotal from t_goods t2 where g_state=1 ";
    if(req.query.priceMin!="undefined"&&req.query.priceMin!="null"){
        if(req.query.priceMax!="max"){
            sql+="and price between ? and ? ";
            param.push(req.query.priceMin);
            param.push(req.query.priceMax);
        }else{
            sql+="and price > ? ";
            param.push(req.query.priceMin);
        }
    }
    if(req.query.sizeMin!="undefined"&&req.query.sizeMin!="null"){
        if(req.query.sizeMax!="max"){
            sql+="and g_width between ? and ? ";
            param.push(req.query.sizeMin);
            param.push(req.query.sizeMax);
        }else{
            sql+="and g_width > ? ";
            param.push(req.query.sizeMin);
        }
    }
    if(req.query.colorid!="undefined"&&req.query.colorid!="null"){
        sql+="and colorid = ? ";
        param.push(req.query.colorid);
    }
    if(req.query.spaceid!="undefined"&&req.query.spaceid!="null"){
        sql+="and spaceid = ? ";
        param.push(req.query.spaceid);
    }
    if(req.query.spaceStyleid!="undefined"&&req.query.spaceStyleid!="null"){
        sql+="and spaceStyleid = ? ";
        param.push(req.query.spaceStyleid);
    }
    if(req.query.artClassid!="undefined"&&req.query.artClassid!="null"){
        sql+="and artClassid = ? ";
        param.push(req.query.artClassid);
    }
    if(req.query.artStyleid!="undefined"&&req.query.artStyleid!="null"){
        sql+="and artStyleid = ? ";
        param.push(req.query.artStyleid);
    }
    if(req.query.artThemeid!="undefined"&&req.query.artThemeid!="null"){
        sql+="and artThemeid = ? ";
        param.push(req.query.artThemeid);
    }
    if(req.query.listSearchValue!="undefined"&&req.query.listSearchValue!="null"){
        sql+="and g_name like '%"+req.query.listSearchValue+"%' ";
    }
    util.connect(sql,param,function(err,data){
        if(data[0].mypagetotal%pageCount==0){
            resp.send(String(data[0].mypagetotal/pageCount));
        }else{
            resp.send(String(parseInt(data[0].mypagetotal/pageCount)+1));
        }
    })
};
//导航搜索
exports.search=function(req,resp){
    var keyWord=req.query.keyWord;
    console.log(keyWord);
    resp.render("search",{keyWordValue:keyWord,username:req.session.username,hSrc:req.session.header});
};
exports.PaintsearchQuery= function (req,resp) {
    var pageNum=req.query.pageNum;
    var pageCount=3;
    var pageParm =[];
    var sql="select g_id,goodsSrc,g_name,g_width,g_height,price,(select artistName from t_artist e2 where  e1.artistid = e2.artistid) myname,(select reason from t_details e3 where e1.g_id=e3.g_id) myreason from t_goods e1 where e1.g_name like ? limit ?,?";
    var searchText="%"+req.query.searchText+"%";
    pageParm.push(searchText);
    pageParm.push((pageNum-1)*pageCount);
    pageParm.push(pageCount);
    util.connect(sql,pageParm, function (err,data) {
        resp.send(data);
    })
};
exports.getPaintPageTotal=function(req,resp){
    var pageCount=3;
    var sql = "select count(*) as mycount from t_goods where g_name like ?";
    var searchText="%"+req.query.searchText+"%";
    util.connect(sql,[searchText], function (err,data) {
        if(data[0].mycount!=0){
            if(data[0].mycount%pageCount==0){
                resp.send(200,data[0].mycount/pageCount);
            }else{
                resp.send(String(parseInt(data[0].mycount/pageCount)+1));   //status
            }
        }
        else if(data[0].mycount==0){
            resp.send(200,data[0].mycount);
        }
    })
};
exports.getPaintResult=function(req,resp){
    var sql = "select count(*) as myresult from t_goods where g_name like ?";
    var searchText="%"+req.query.searchText+"%";
    util.connect(sql,[searchText], function (err,data) {
        resp.send(200,data[0].myresult);
    })
};
exports.artistSearch=function(req,resp){
    var artistPageNum=req.query.artistPageNum;
    var pageCount=3;
    var pageParm =[];
    var sql="SELECT artistName,artistid,artistSrc FROM t_artist WHERE artistName LIKE ? limit ?,?";
    var searchText="%"+req.query.searchText+"%";
    pageParm.push(searchText);
    pageParm.push((artistPageNum-1)*pageCount);
    pageParm.push(pageCount);
    util.connect(sql,pageParm, function (err,data) {
        resp.send(data);
    })
};
exports.artistSearchPaint=function(req,resp){
    var sql="select g_id,goodsSrc FROM t_goods WHERE artistid = ? LIMIT 0,3";
    var artistid=req.query.artistid;
    var result=[artistid];
    util.connect(sql,[artistid], function (err,data) {
        result.push(data);
        resp.send(result);
    })
};
exports.getAritistResult=function(req,resp){
    var sql = "select count(*) as myresult from t_artist where artistName like ?";
    var searchText="%"+req.query.searchText+"%";
    util.connect(sql,[searchText], function (err,data) {
        resp.send(200,data[0].myresult);
    })
};
exports.getAritistPageTotal=function(req,resp){
    var pageCount=3;
    var sql = "select count(*) as mycount from t_artist where artistName like ?";
    var searchText="%"+req.query.searchText+"%";
    util.connect(sql,[searchText], function (err,data) {
        if(data[0].mycount!=0){
            if(data[0].mycount%pageCount==0){
                resp.send(200,data[0].mycount/pageCount);
            }else{
                resp.send(String(parseInt(data[0].mycount/pageCount)+1));   //status
            }
        }
        else if(data[0].mycount==0){
            resp.send(200,data[0].mycount);
        }
    })
};
//商品详情
var id;
exports.showDetail=function(req,resp){
    var returnValue = new Array();
    id = req.query.id;
    util.connect("select * from t_goods where g_id=?",[id],function(err,data){
        returnValue[0]=data[0];
        util.connect("select * from t_artist where artistid=(select artistid from t_goods where g_id=?)",[id],function(err,data){
            returnValue[1]=data[0];
            util.connect("select * from t_artTheme where artThemeid=(select artThemeid from t_goods where g_id=?)",[id],function(err,data){
                returnValue[2]=data[0];
                util.connect("select * from t_artStyle where artStyleid=(select artStyleid from t_goods where g_id=?)",[id],function(err,data){
                    returnValue[3]=data[0];
                    util.connect("select * from t_artClass where artClassid=(select artClassid from t_goods where g_id=?)",[id],function(err,data){
                        returnValue[4]=data[0];
                        util.connect("select * from t_space  where spaceid=(select spaceid from t_goods where g_id=?)",[id],function(err,data){
                            returnValue[5]=data[0];
                            util.connect("select * from t_details where g_id =?",[id],function(err,data){
                                returnValue[6]=data[0];
                                util.connect("select * from t_detailsPicture where detailsid=(select detailsid from t_details where g_id=?)",[id],function(err,data){
                                    returnValue[7]=data[0];
                                    returnValue[8]=data[1];
                                    resp.render("proDetail",{returnValue:returnValue,id:id,username:req.session.username,hSrc:req.session.header});
                                })
                            })
                        })
                    })
                })
            })
        })
    })
};
exports.addToCart=function(req,resp){
    var username = req.session.username;
    if(req.session.username==null||req.session.username==undefined){
        resp.send("login");
    }else{
        util.connect("select u_id from t_user where tel=?",[username],function(err,data){
            var u_id = data[0].u_id;
            util.connect("select * from t_shoppingCart where u_id=? and g_id=?",[u_id,id], function (err,data) {
                var result=data;
                if(result=="") {
                    util.connect("insert into t_shoppingCart values(?,?,NULL,0)", [u_id, id], function (err, data) {
                        resp.send("0");
                    })
                }
            });
        });
    }
};
exports.nowBuy=function(req,resp){
    var username = req.session.username;
    if(username==null||username==undefined){
        resp.send("login");
    }else{
        util.connect("select u_id from t_user where tel=?",[username],function(err,data){
            var u_id = data[0].u_id;
            util.connect("UPDATE t_shoppingcart SET state=0 WHERE u_id=?",[u_id],function(){
                util.connect("select * from t_shoppingCart where u_id=? and g_id=?",[u_id,id], function (err,data) {
                    var result=data;
                    if(result==""){
                        util.connect("insert into t_shoppingCart values(?,?,NULL,1)",[u_id,id],function(){
                            resp.send(data)
                        })
                    }else{
                        util.connect("UPDATE t_shoppingcart SET state=1 WHERE u_id=? and g_id=?",[u_id,id],function(){
                            resp.send(data)
                        })
                    }
                });
            });
        });
    }
};
//艺术家详情
exports.artistInfo=function(req,resp){
    var id = req.query.id;
    var proaward=new Array();
    util.connect("select * from t_artist where artistid=?",[id],function(err,data){
        proaward[0] = data[0];
        util.connect("select * from t_award where artistid=?",[id],function(err,data){
            proaward[1] =data[0];
            proaward[2] =data[1];
            proaward[3] =data[2];
            util.connect("select * from t_command where artistid=?",[id],function(err,data){
                proaward[4] =data[0];
                proaward[5] =data[1];
                proaward[6] =data[2];
                util.connect("select * from t_goods where artistid=?",[id],function(err,data){
                    proaward[7] =data[0];
                    proaward[8] =data[1];
                    proaward[9] =data[2];
                    proaward[10] =data[3];
                    resp.render("artistInfo",{proaward:proaward,id:id,username:req.session.username,hSrc:req.session.header});
                })
            })
        })
    })
};
//点击购物车图标进入购物车
exports.showCartdetail=function(req,resp){
    var username=req.session.username;
    var sql="UPDATE t_shoppingcart SET state=0 WHERE u_id=(SELECT u_id FROM t_user WHERE tel=?)";
    util.connect(sql,[username],function(){
        var sql = "SELECT g_name,t_artist.artistName,material,g_width,g_height,price,goodsSrc FROM t_shoppingcart JOIN (t_goods JOIN t_artist ON t_goods.artistid=t_artist.artistid) ON t_shoppingcart.g_id=t_goods.g_id WHERE t_shoppingcart.u_id=(SELECT u_id FROM t_user WHERE tel=?);";
        var param = [username];
        util.connect(sql,param,function(err,data){
            if (data!==undefined){
                resp.render("ShoppingCart",{shopCartdetail:data,username:req.session.username,hSrc:req.session.header});
            }
        })
    })
};
//清空购物车
exports.clearCartdetail=function(req,resp){
    var username=req.session.username;
    var sql = "delete FROM t_shoppingcart WHERE u_id=(SELECT u_id FROM t_user WHERE tel=?);";
    var param = [username];
    util.connect(sql,param,function(err,data){
        if (data!==undefined){
            console.log("查询成功");
            //resp.render("ShoppingCart",{shopCartdetail:data,username:req.session.username,hSrc:req.session.header});
            resp.send();
        }
    })
};
//删除当前商品
exports.deleteCurrent=function(req,resp){
    var username=req.session.username;
    var currentImgid=req.query.currentImgid;
    var sql = "delete FROM t_shoppingcart WHERE u_id=(SELECT u_id FROM t_user WHERE tel=?) AND g_id=?;";
    var param = [username,currentImgid];
    util.connect(sql,param,function(err,data){
        console.log(err);
        console.log(data);
        if (data!==undefined){
            console.log("查询成功");
            resp.send();
        }
    })
};
//去结算提交订单
exports.updateCartState=function(req,resp){
    var username=req.session.username;
    var imgIdArray=JSON.parse(req.query.imgIdArray);
    var sql = "UPDATE t_shoppingcart SET state=1 WHERE u_id=(SELECT u_id FROM t_user WHERE tel=?) AND g_id=?;";
    for (var m=0;m<imgIdArray.length;m++){
        var param = [username,imgIdArray[m]];
        util.connect(sql,param,function(err,data){
            if (data!==undefined){
                console.log("商品状态改变成功");
                resp.send();
            }
        })
    }
};
//支付
exports.payCenter=function(req,resp){
    var username=req.session.username;
    var sql="SELECT t1.addName addName,t1.addressName addressName,t1.addTel addTel,t1.addressid addressid FROM (t_address t1 LEFT JOIN t_user t2 ON t1.u_id=t2.u_id) WHERE t2.tel = ? and state=1";
    util.connect(sql,[username],function(err,data){
        var address=data;
        resp.render("payCenter",{address:address,username:req.session.username,hSrc:req.session.header});
    });
};
exports.savestress= function (req,resp) {
    var shouhuoren=req.body.shouhuoren;
    var detail=req.body.mydetail;
    var shoujihao=req.body.shoujihao;
    var username=req.session.username;
    var u_id;
    var pageParm=[];
    var sql="select u_id from t_user where tel= ?";
    util.connect(sql,[username], function (err,data) {
        u_id=data[0].u_id;
        var sql="insert into t_address(addName,addressName,addTel,u_id,state) values(?,?,?,?,1)";
        pageParm.push(shouhuoren);
        pageParm.push(detail);
        pageParm.push(shoujihao);
        pageParm.push(u_id);
        util.connect(sql,pageParm, function (err,data) {
            var sql="select addressid from t_address where addName=? and addressName=? and addTel=? and u_id=? and state=1";
            util.connect(sql,pageParm,function(err,data){
                resp.send(data);
            })
        })
    });
};
exports.mylist= function (req,resp) {
    var username=req.session.username;
    var sql="SELECT t2.material material,t2.g_id g_id,t2.g_name g_name,t2.goodsSrc goodsSrc,t2.price price,t2.g_width g_width,t2.g_height g_height,t1.reason reason,t3.artistName artistName,t3.artistid artistid FROM (t_shoppingCart t4 LEFT JOIN ( t_details t1 LEFT JOIN (t_goods t2 LEFT JOIN t_artist t3 ON t2.artistid=t3.artistid)  ON t1.g_id=t2.g_id)  ON t4.g_id=t1.g_id) WHERE t4.u_id=(SELECT u_id FROM t_user WHERE tel= ? ) AND state=1;";
    util.connect(sql,[username], function (err,data){
        resp.send(data);
    })
};
exports.delAddress=function(req,resp){
    var id=req.query.id;
    var sql="update t_address set state=0 where addressid=?";
    util.connect(sql,[id],function(err,data){
        resp.send(data);
    })
};
exports.goPay=function(req,resp){
    var addressid=req.query.addressid;
    var username=req.session.username;
    var userid;
    var orderid;
    var num;
    var sql="select u_id from t_user where tel=?";
    util.connect(sql,[username],function(err,data){
        userid=data[0].u_id;
        var sql="insert into t_order values (null,?,?,2,null)";
        util.connect(sql,[userid,addressid],function(err,data){
            var sql="select o_id from t_order where u_id=? order by payTime desc limit 0,1;";
            util.connect(sql,[userid],function(err,data){
                orderid=data[0].o_id;
                var sql="select g_id from t_shoppingcart where u_id=? and state=1;";
                util.connect(sql,[userid],function(err,data){
                    num=data.length;
                    var sqlInsert="insert into t_orderdetail values ";
                    var sqlgoods="update t_goods set g_state=0 where ";
                    var sqlshoppingCart="delete from t_shoppingcart where u_id=? and (";
                    for(var i=0;i<data.length;i++){
                        if(i==num-1){
                            sqlInsert+="("+orderid+","+data[i].g_id+",null)";
                            sqlgoods+="g_id="+data[i].g_id+" ";
                            sqlshoppingCart+="g_id="+data[i].g_id+") ";
                        }else{
                            sqlInsert+="("+orderid+","+data[i].g_id+",null),";
                            sqlgoods+="g_id="+data[i].g_id+" or ";
                            sqlshoppingCart+="g_id="+data[i].g_id+" or ";
                        }
                    }
                    util.connect(sqlInsert,[],function(err,data){
                        util.connect(sqlgoods,[],function(err,data){
                            util.connect(sqlshoppingCart,[userid],function(err,data){
                                resp.send();
                            })
                        })
                    })
                })
            })
        })
    })
};
//======================个人中心======================
exports.displayPhImg=function(req,resp){
    var sql = "SELECT * FROM t_head ";
    util.connect(sql,[],function(err,data){
        //console.log(data);
        resp.send(data);
    })
};

exports.myHradPhoto=function(req,resp){
    var username=req.session.username;
    var sql = "SELECT h_imgsrc FROM t_head WHERE h_id=(SELECT h_id FROM t_user WHERE tel=?)";
    util.connect(sql,[username],function(err,data){
        //console.log(data);
        resp.send(data);
        //resp.render("PersonalCenter",{userheadPhto:data[0].h_imgsrc});
    })
};


//         添加收货地址
exports.adduserads = function(req,resp){
    var username = req.session.username;
    var Consignee = req.query.Consignee;
    var adUseradres = req.query.adUseradres;
    var ConsigneePhot = req.query.ConsigneePhot;
    //console.log(username);
    //console.log(Consignee);
    //console.log(adUseradres);
    //console.log(ConsigneePhot);
    var sql = "INSERT INTO t_address VALUES (NULL,?,(SELECT u_id FROM t_user WHERE tel = ?),?,?,1)";
    util.connect(sql,[adUseradres,username,ConsigneePhot,Consignee],function(err,data){
        //console.log("111111");
        resp.send("恭喜，添加成功！！");
    })
};

//          修改资料
exports.updatamyif=function(req,resp){
    var username=req.session.username;
    var mysex=req.query.sex;
    var myuesrName=req.query.myUserName;
    //console.log(username);
    //console.log(mysex);
    //console.log(myuesrName);
    req.session.header=req.query.mySrc;
    var sql ="UPDATE t_user SET usrename = ? ,sex = ? ,h_id = (SELECT h_id FROM t_head WHERE h_imgsrc = ?) WHERE tel =?";
    util.connect(sql,[myuesrName,mysex,req.query.mySrc,username],function(err,data){
        resp.send("恭喜，修改成功");
    })
};

//   验证修改密码  是否正确
exports.VerificationPwd=function(req,resp){
    var username=req.session.username;
    var currentPwd=req.query.pc_UpPwd;
    console.log(currentPwd);
    console.log(username);
    var sql = "SELECT * FROM t_user WHERE tel = ? and password = ?";
    util.connect(sql,[username,currentPwd],function(err,data){
        if(data.length>0){
            resp.send("你输入的密码正确！");
        }
        else{
            resp.send("你输入的密码错误！");
        }
    })
};

//        修改密码
exports.pc_upPwd=function(req,resp){
    var username=req.session.username;
    var mynewpwd=req.query.pc_newPwd;
    console.log(mynewpwd);
    console.log(username);
    var sql = "UPDATE t_user SET PASSWORD = ? WHERE tel = ?";
    util.connect(sql,[mynewpwd,username],function(err,data){
        //console.log("11111");
        //console.log(data);
        resp.send("修改成功，新密码："+mynewpwd);
    })
};

//   显示 正在进行中的商品
exports.userdisplayshop=function(req,resp){
    //console.log(req.query.username);
    var sql = "SELECT * FROM t_user JOIN (t_order JOIN (t_orderdetail JOIN (t_goods JOIN t_artist ON t_goods.artistid=t_artist.artistid)ON t_orderdetail.g_id=t_goods.g_id)ON t_order.o_id=t_orderdetail.o_id) ON t_user.u_id=t_order.u_id WHERE tel = ?;";
    util.connect(sql,[req.session.username],function(err,data){
        //console.log("111");
        //console.log(data);
        var ConductShop=data;
        var sql = "SELECT * FROM t_user JOIN (t_order JOIN (t_orderdetail JOIN (t_goods JOIN t_artist ON t_goods.artistid=t_artist.artistid)ON t_orderdetail.g_id=t_goods.g_id)ON t_order.o_id=t_orderdetail.o_id) ON t_user.u_id=t_order.u_id WHERE tel = ? AND (o_state=1 OR o_state=2);";
        util.connect(sql,[req.session.username],function(err,data){
            var allshoping=data;
            //console.log("111");
            //console.log(data);
            var sql = "SELECT * FROM t_user JOIN (t_order JOIN (t_orderdetail JOIN (t_goods JOIN t_artist ON t_goods.artistid=t_artist.artistid)ON t_orderdetail.g_id=t_goods.g_id)ON t_order.o_id=t_orderdetail.o_id) ON t_user.u_id=t_order.u_id WHERE tel = ? AND o_state=3;";
            util.connect(sql,[req.session.username],function(err,data){
                var completeshop=data;
                //console.log("111");
                //console.log(data);
                resp.render("PersonalCenter",{ConductShop:ConductShop,allshoping:allshoping,completeshop:completeshop,username:req.session.username,hSrc:req.session.header});
            })
        });
    })
};

//   显示 已有地址
exports.uesradrs=function(req,resp){
    //console.log(req.query.username);
    var sql = "SELECT * FROM t_user JOIN t_address ON t_user.u_id=t_address.u_id WHERE t_user.tel = ? and t_address.state=1";
    util.connect(sql,[req.session.username],function(err,data){
        //console.log(data);
        resp.send(data)
    })
};



//   显示  进行中的商品
exports.pc_shopping=function(req,resp){
    //console.log(req.query.username);
    var sql = "SELECT * FROM t_user JOIN (t_order JOIN (t_orderdetail JOIN (t_goods JOIN t_artist ON t_goods.artistid=t_artist.artistid)ON t_orderdetail.g_id=t_goods.g_id)ON t_order.o_id=t_orderdetail.o_id) ON t_user.u_id=t_order.u_id WHERE tel = 18482119977 AND (o_state=1 OR o_state=2);"
    util.connect(sql,[req.session.username],function(err,data){
        //console.log(data);
    })
};


//    删除商品
exports.userSHOP=function(req,resp){
    //console.log(req.query.username);
    //console.log(req.query.pc_shopId);
    var sql="SELECT o_id FROM t_orderdetail  WHERE g_id="+req.query.pc_shopId+"";
    var o_id;
    util.connect(sql,[],function(err,data){
        //console.log(data);
        o_id=data[0].o_id;
        //console.log(o_id);
        var sql="DELETE FROM t_orderdetail WHERE o_id =?";
        util.connect(sql,[o_id],function(err,data){
            console.log(data);
            var sql="DELETE FROM t_order WHERE o_id =?";
            util.connect(sql,[o_id],function(err,data){
                //console.log(data);
                //
                resp.send(data)
            })
        })
    })
};
//删除地址
exports.DleteUserAdd=function(req,resp){
    //console.log(req.query.username);
    //console.log(req.query.wz1);
    //console.log(req.query.wz2);
    //console.log(req.query.wz3);
    var sql = "update t_address set state=0 WHERE u_id = (SELECT u_id FROM t_user WHERE tel = ?) AND addTel = ? AND addressName = ? AND addName =?";
    util.connect(sql,[req.session.username,req.query.wz2,req.query.wz3,req.query.wz1],function(err,data){
        console.log(data);
    })
};

// 更换用户头像
exports.UserHeadimg=function(req,resp){
    //console.log(req.query.username);
    //console.log(req.query.HeadimgId);
    var sql = "SELECT h_imgsrc FROM t_head WHERE  h_id =?";
    util.connect(sql,[req.query.HeadimgId],function(err,data){
        //console.log(data);
        resp.send(data)
    })
};
//退出登录
exports.exit=function(req,resp){
    req.session.username=null;
    req.session.header=null;
    req.session.preUrl=req.headers['referer'];
    if(req.session.preUrl.match("payCenter")||req.session.preUrl.match("goShopCart")||req.session.preUrl.match("userdisplayshop")||req.session.preUrl.match("successpay")){
        resp.redirect("http://www.artvivre.cn/index.do");
    }else{
        resp.redirect(req.session.preUrl)
    }
};
exports.index=function(req,resp){
    resp.render("index",{username:req.session.username,hSrc:req.session.header});
};
exports.goodslist=function(req,resp){
    resp.render("goodslist",{username:req.session.username,hSrc:req.session.header});
};
exports.artist=function(req,resp){
    resp.render("artist",{username:req.session.username,hSrc:req.session.header})
};
exports.aboutus=function(req,resp){
    resp.render("aboutus",{username:req.session.username,hSrc:req.session.header});
};
exports.special=function(req,resp){
    resp.render("special",{username:req.session.username,hSrc:req.session.header});
};
exports.successpay=function(req,resp){
    resp.render("successpay",{username:req.session.username,hSrc:req.session.header});
};
exports.exhibitIndex=function(req,resp){
    resp.render("index",{username:req.session.username,hSrc:req.session.header})
};
exports.exhibitGoodslist=function(req,resp){
    resp.render("goodslist",{username:req.session.username,hSrc:req.session.header})
};
exports.exhibitArtist=function(req,resp){
    resp.render("artist",{username:req.session.username,hSrc:req.session.header});
};