const session = require("express-session");
const cookie = require("cookie-parser");
const express=require("express");
const app=express();
const ejs = require("ejs");
const routes=require("./routes/routes.js");
app.configure(function(){
    app.use(cookie());
    app.use(session({
        name:"ArtLife",
        secret:"1234567",
        cookie:{maxAge:3600000},
        resave:true,
        rolling:true
    }));
    app.set ("views",__dirname+"/views");
    app.engine("html",ejs.__express);
    app.set("view engine","html");
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname+"/public"));
    app.use(express.favicon(__dirname+"/public/images/logoWeb.png"));
    app.use(express.errorHandler());
});
app.set("port",8888);
app.listen(app.get("port"));
//首页留言
app.post("/askHelp.do",routes.answerAsk);
//登录注册
app.get("/testtel.do",routes.checkTel);
app.post("/login.do",routes.login);
app.get("/testC.do",routes.checkC);
app.post("/change.do",routes.reset);
//分类搜索
app.get("/showImg.do",routes.showImg);
app.get("/pagetotal.do",routes.pagetotal);
//导航搜索
app.get("/searchPaint.do",routes.PaintsearchQuery);
app.get("/getPaintPageTotal.do",routes.getPaintPageTotal);
app.get("/getPaintResult.do",routes.getPaintResult);
app.get("/aritistSearch.do",routes.artistSearch);
app.get("/aritistSearchPaint.do",routes.artistSearchPaint);
app.get("/getAritistPageTotal.do",routes.getAritistPageTotal);
app.get("/getAritistResult.do",routes.getAritistResult);
//商品查看详情
app.get("/showDetail.do",routes.showDetail);
app.get("/addToCart.do",routes.addToCart);
app.get("/nowBuy.do",routes.nowBuy);
//艺术家详情
app.get("/html/artistInfo.do",routes.artistInfo);
app.get("/artistInfo.do",routes.artistInfo);
//点击购物车图标进入购物车
//-----去购物车-----
app.get("/goShopCart.do",routes.showCartdetail);
//-----清空购物车-----
app.get("/clearShopCart.do",routes.clearCartdetail);
//-----删除单项商品----
app.get("/deleteCurrentGoods.do",routes.deleteCurrent);
//------去结算提交订单----
app.get("/changeCartState.do",routes.updateCartState);
//支付
app.post("/save.do",routes.savestress);
app.get("/getlist.do",routes.mylist);
app.get("/delAddress.do",routes.delAddress);
app.get("/goPay.do",routes.goPay);
//个人中心
app.get("/displayIfimg.do",routes.displayPhImg);
app.get("/myHradPhoto.do",routes.myHradPhoto);
//      修改密   提示验证密码是否正确
app.get("/pc_VerificationPwd.do",routes.VerificationPwd);

//      确定修改密码
app.get("/pc_upPwd.do",routes.pc_upPwd);

//      修改资料
app.get("/updatamyif.do",routes.updatamyif);

//       添加地址
app.get("/adduserads.do",routes.adduserads);

//显示 全部商品=======进入个人中心
app.get("/userdisplayshop.do",routes.userdisplayshop);

// 显示  进行中商品
app.get("/pc_shopping.do",routes.pc_shopping);

//     删除商品信息
app.get("/userSHOP.do",routes.userSHOP);

//    用户已有地址
app.get("/uesradrs.do",routes.uesradrs);

//    删除   地址
app.get("/DleteUserAdd.do",routes.DleteUserAdd);

//    更换 用户 头像
app.get("/UserHeadimg.do",routes.UserHeadimg);

//ejs加载
app.get("/exit.do",routes.exit);
app.get("/search.do",routes.search);
app.get("/html/search.do",routes.search);
app.get("/index.do",routes.index);
app.get("/goodslist.do",routes.goodslist);
app.get("/artist.do",routes.artist);
app.get("/aboutus.do",routes.aboutus);
app.get("/special.do",routes.special);
app.get("/payCenter.do",routes.payCenter);
app.get("/successpay.do",routes.successpay);
app.get("/exhibitIndex.do",routes.exhibitIndex);
app.get("/exhibitGoodslist.do",routes.exhibitGoodslist);
app.get("/exhibitArtist.do",routes.exhibitArtist);
app.get("/goLogin.do",routes.goLogin);