import * as dd from "dingtalk-jsapi";

export const alert = (message) => {
    dd.device.notification.alert({
        message: message,
        title: "提示", //可传空
        buttonName: "确定",
        onSuccess : function() {
            //onSuccess将在点击button之后回调
            /*回调*/
        },
        onFail : function(err) {
            // 
        }
    });
}
export const openLink = (url) => {
    dd.biz.util.openLink({
        url: url,
        onSuccess: function() {},
        onFail: function() {}
    });
}