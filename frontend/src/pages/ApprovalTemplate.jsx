import axios from 'axios';
import React from 'react';
import { alert } from './utils'

// 收款账户列表
const accountList = ['支付宝商家', '二维火', '饿了么外卖', '美团外卖']

// 收款账户 勾选 与 勾除
const getCheckedList = (e, value, list) => {
    if (e.target.checked) { // 勾选
        list.push(value)
    } else { // 勾除
        list = list.filter(v => v !== value)
    }
    return list
}

class ApprovalTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            approvalName: '收入日报',
            moneyFieldList: [],
            selectFieldName: '门店',
            dateFieldName: '收款日期',
            textFieldName: '备注',
            textFieldOpen: true,
            selectFieldOpen: true,
            dateFieldOpen: true,
        } 
    }

    render () {

        const {
            approvalName,
            moneyFieldList,
            selectFieldName,
            dateFieldName,
            textFieldName,
            textFieldOpen,
            selectFieldOpen,
            dateFieldOpen,
        } = this.state

        return (
            <div className='approval-body'>
                <div className='approval-contain-wrap'>
                    <div className='approval-line'>
                        <span className='approval-line-label'>审批名称：</span>
                        <span className='approval-line-input'>
                            {approvalName}
                        </span>
                    </div>
                    <div className='approval-tip'> 
                        表单设置
                    </div>
                    <div className='approval-miti-line'>
                        <span className='approval-miti-label'>
                            收款账户
                        </span>
                        <div className='approval-miti-checkbox-wrap'>
                            {
                                accountList.map(v => {
                                    return (
                                        <div key={v} className='approval-miti-checkbox'>
                                            <input
                                                type="checkbox"
                                                name={v}
                                                checked={moneyFieldList.indexOf(v) > -1 ? "checked" : ''}
                                                onChange={(e) => {
                                                    const oriArr = moneyFieldList.concat() 
                                                    const list = getCheckedList(e, v, oriArr)
                                                    this.setState({moneyFieldList: list})
                                                }}
                                            />
                                            <span>{v}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='approval-line'>
                        <input
                            disabled={!selectFieldOpen}
                            className='approval-line-switch-input'
                            placeholder='请输入用户名'
                            value={selectFieldName}
                            onChange={(e) => {
                                this.setState({selectFieldName: e.target.value})
                            }}
                        />
                        <span className='approval-line-switch-label'>单选框</span>
                        <input
                            type="checkbox"
                            checked={selectFieldOpen}
                            onChange={(e) => {
                                this.setState({selectFieldOpen: e.target.checked})
                            }}
                        />
                    </div>
                    <div className='approval-line'>
                        <input
                            disabled={!dateFieldOpen}
                            className='approval-line-switch-input'
                            placeholder='请输入用户名'
                            value={dateFieldName}
                            onChange={(e) => {
                                this.setState({dateFieldName: e.target.value})
                            }}
                        />
                        <span className='approval-line-switch-label'>日期</span>
                        <input
                            type="checkbox"
                            checked={dateFieldOpen}
                            onChange={(e) => {
                                this.setState({dateFieldOpen: e.target.checked})
                            }}
                        />
                    </div>
                    <div className='approval-line'>
                        <input
                            disabled={!textFieldOpen}
                            className='approval-line-switch-input'
                            placeholder='请输入用户名'
                            value={textFieldName}
                            onChange={(e) => {
                                this.setState({textFieldName: e.target.value})
                            }}
                        />
                        <span className='approval-line-switch-label'>单行输入框</span>
                        <input
                            type="checkbox"
                            checked={textFieldOpen}
                            onChange={(e) => {
                                this.setState({textFieldOpen: e.target.checked})
                            }}
                        />
                    </div>
                </div>
                <div
                    className='approval-footer'
                    onClick={() => {

                        // 收款账户校验
                        if (!moneyFieldList.length) {
                            return alert('收款账户至少勾选一个')
                        }
                        // 单选框组件校验
                        if (selectFieldOpen && !selectFieldName ) {
                            return alert('单选框组件的名称必填')
                        } else if (selectFieldName.length > 16) {
                            return alert('单选框组件的名称必填')
                        }
                        // 日期组件校验
                        if (dateFieldOpen && !dateFieldName) {
                            return alert('日期组件的名称必填')
                        } else if (dateFieldName.length > 16) {
                            return alert('日期组件的名称不能超过16个字符')
                        }
                        // 单行输入框组件校验
                        if (textFieldOpen && !textFieldName) {
                            return alert('单行输入框组件的名称必填')
                        } else if (textFieldName.length > 16) {
                            return alert('单行输入框组件的名称不能超过16个字符')
                        }

                        const data = {
                            moneyFieldList,
                            selectFieldOpen,
                            selectFieldName,
                            dateFieldOpen,
                            dateFieldName,
                            textFieldOpen,
                            textFieldName
                        }

                        this.saveAproval(data)
                    }}
                >
                    新增模版
                </div>
            </div>
        )
    }

    // 新增模版
    saveAproval = (data) => {
        axios.post(this.props.domain + "/biz/create/model", data)
        .then(res => {
            console.log(JSON.stringify(res));
            if (res.data.success) {
                alert(`模版【${res.data.data}】创建成功！请前往 「工作台」-「OA审批」发起审批`)
                this.setState({approvalName: res.data.data})
            } else {
                alert(`${res.data.errorMsg}`)
            }
        }).catch(error => {
            console.log("corpId err, " + JSON.stringify(error))
        })
    } 
}

export default ApprovalTemplate;