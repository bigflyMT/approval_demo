package com.dingtalk.model;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 审批实例状态
 */
@Data
public class ProcessInstance {

    /**
     * 审批标题
     */
    private String processTitle;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 审批状态
     * start:进行中
     * agree:完成
     * refuse:拒绝
     * terminate:撤销
     * delete:删除
     * cancel:取消
     */
    private String processStatus;

    /**
     * 审批实例id
     */
    private String processInstanceId;

    public void init(JSONObject eventJson) {
        this.processTitle = eventJson.getString("title");

        this.createTime = new SimpleDateFormat("yyyy/MM/dd").format(new Date(eventJson.getLong("createTime")));

        this.processStatus = eventJson.getString("result") == null
                ? eventJson.getString("type") : eventJson.getString("result");
        this.processInstanceId = eventJson.getString("processInstanceId");
    }
}
