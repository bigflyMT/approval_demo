package com.dingtalk.model;

import lombok.Data;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 审批模板
 */
@Data
public class Model {

    /**
     * 金额控件
     */
    private List<String> moneyFieldList;


    /**
     * 单选框控件
     */
    private String selectFieldName;

    private Boolean selectFieldOpen;


    /**
     * 日期控件
     */
    private String dateFieldName;

    private Boolean dateFieldOpen;

    /**
     * 单行输入框控件
     */
    private String textFieldName;

    private Boolean textFieldOpen;

    public void initDefault() {
        this.moneyFieldList = this.moneyFieldList == null ? new ArrayList<>(0) : this.moneyFieldList;
    }

}
