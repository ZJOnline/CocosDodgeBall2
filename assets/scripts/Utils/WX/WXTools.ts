import { handler } from "../Utils";

export default class WXTools {



    /**
     * 向子域发送消息
     * @param type 事件类型
     * @param _param 事件参数
     */
    static PostMsgToSub(type: MessageType, _param?: Object) {
        if (CC_WECHATGAME) {
            wx.postMessage({
                messageType: type,
                param: _param
            });
        }
    }

    /**
     * 微信登陆，获取code发送给服务器
     */
    static WXLogin() {
        if (CC_WECHATGAME) {
            wx.login({
                success: function (res) {
                    console.log("login success : ", res.code);
                },
                fail: function (res) {
                    console.log("fail");
                }
            });
        }
    }

    /**
     * 获取用户信息
     * @param _withCredentials  是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，
     *                          此时返回的数据会包含 encryptedData, iv 等敏感信息；
     *                          当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。
     */
    static WXGetUserInfo(_withCredentials: boolean) {
        if (CC_WECHATGAME) {

            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            withCredentials: _withCredentials,
                            success: function (res) {
                                console.log("getUserInfo success : ", res);
                            },
                            fail: function () {
                                console.log("getUserInfo fail");
                            }
                        });
                    }
                    else {
                        wx.authorize({
                            scope: "scope.userInfo",
                        });
                        // wx.openSetting({

                        // });
                    }
                }
            })

            // wx.getUserInfo({
            //     withCredentials: _withCredentials,
            //     success: function (res) {
            //         console.log("getUserInfo success : ", res);
            //         console.log('getUserInfo success: ', res.rawData);
            //     },
            //     fail: function () {
            //         console.log("getUserInfo fail");
            //     }
            // });
        }
    }

    /**
     * 创建微信游戏圈按钮，将常驻在游戏最上层
     */
    static CreateGameClueBtn() {
        if (CC_WECHATGAME) {
            let button = wx.createGameClubButton({
                icon: 'green',
                style: {
                    left: 10,
                    top: 76,
                    width: 40,
                    height: 40
                }
            });
        }
    }

    static callWXCloudFunction(fname: string, cb: handler, _data?: any) {
        if (CC_WECHATGAME) {

            wx.cloud.callFunction({
                name: fname,
                data: _data,
                complete: res => {
                    cb.exec(res);
                    console.log('callFunction test result: ', res);
                }
            });
        }
    }

    /**
     * 存数据到本地缓存
     * @param _key 
     * @param cb 
     */
    static getDataFromLocalStorage(_key: string, cb: handler) {
        if (CC_WECHATGAME) {
            wx.getStorage({
                key: _key,
                success: res => {
                    cb.exec(res);
                },
                fail: {

                }
            })
        }
    }

    /**
     * 从本地缓存取数据
     * @param _key 
     * @param _data 
     * @param cb 
     */
    static setDataToLocalStorage(_key: string, _data: any, cb: handler) {
        if (CC_WECHATGAME) {
            wx.setStorage({
                key: _key,
                data: _data,
                success: {

                }
            })
        }
    }

    static accessFile(cb: handler) {
        if (CC_WECHATGAME) {
            let fm = wx.getFileSystemManager();
            fm.access({
                path: wx.env.USER_DATA_PATH + "/UserInfo.json",
                success: res => {
                    cb.exec(res);
                },
                fail: res => {
                    fm.mkdir({
                        dirPath: wx.env.USER_DATA_PATH + "/UserInfo.json",
                        recursive: true,
                        success: res => {
                            cb.exec(res);
                        },
                        fail: res => {
                            console.log(res.errMsg);
                        }
                    })
                }
            })
        }
    }

    static readFile(cb: handler) {
        if (CC_WECHATGAME) {
            let fm = wx.getFileSystemManager();
            fm.readFile({
                filePath: wx.env.USER_DATA_PATH + "/UserInfo.json",
                encoding: "utf8",
                success: res => {
                    cb.exec(res.data);
                    console.log(res.data);
                },
                fail: res => {
                    console.log(res.errMsg);
                }
            })
        }
    }

    static writeFile(_data: string, cb: handler) {
        if (CC_WECHATGAME) {
            let fm = wx.getFileSystemManager();
            fm.writeFile({
                filePath: wx.env.USER_DATA_PATH + "/UserInfo.json",
                data: _data,
                success: res => {
                    if (cb) {
                        cb.exec(res);
                    }
                    console.log("write success");
                },
                fail: res => {
                    console.log(res.errMsg);
                }
            })
        }
    }

}

enum MessageType {
    UploadScore = 1,
    ShowRank = 2,
    HideRank = 3,
}

export { MessageType };