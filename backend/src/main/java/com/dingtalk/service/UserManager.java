package com.dingtalk.service;

import com.aliyun.dingboot.common.token.ITokenManager;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiV2UserGetRequest;
import com.dingtalk.api.request.OapiV2UserGetuserinfoRequest;
import com.dingtalk.api.response.OapiV2UserGetResponse;
import com.dingtalk.api.response.OapiV2UserGetuserinfoResponse;
import com.dingtalk.config.AppConfig;
import com.dingtalk.constant.UrlConstant;
import com.taobao.api.ApiException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 用户管理
 */
@Service
public class UserManager {

    @Resource
    private ITokenManager tokenManager;

    @Resource
    private AppConfig appConfig;

    /**
     * 根据免登授权码登录
     *
     * @param authCode 免登授权码
     */
    public String getUserId(String authCode) throws ApiException {
        // 1. 获取access_token
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        // 2. 获取用户信息
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.GET_USER_INFO);
        OapiV2UserGetuserinfoRequest req = new OapiV2UserGetuserinfoRequest();
        req.setCode(authCode);
        OapiV2UserGetuserinfoResponse rsp = client.execute(req, accessToken);

        // 3. 返回用户id
        return rsp.getResult().getUserid();
    }

    /**
     * 根据用户id获取用户名称
     *
     * @param userId 用户id
     */
    public String getUserName(String userId) throws ApiException {
        // 1. 获取access_token
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        // 2. 获取用户详情
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.USER_GET);
        OapiV2UserGetRequest req = new OapiV2UserGetRequest();
        req.setUserid(userId);
        req.setLanguage("zh_CN");
        OapiV2UserGetResponse rsp = client.execute(req, accessToken);
        // 3. 返回用户名称
        return rsp.getResult().getName();
    }
}
