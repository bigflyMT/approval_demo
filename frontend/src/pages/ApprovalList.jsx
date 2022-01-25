import axios from 'axios';
import React from 'react';
import { openLink, alert } from './utils'

const approvalState = {
    'start': '进行中',
    'agree': '完成',
    'refuse': '拒绝',
    'terminate': '撤销',
    'delete': '删除',
    'cancel': '取消',
}

class ApprovalList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            instanceList: [],
        } 
    }
    componentDidMount() {
        this.getInstanceList()
    }

    previewApproval (processInstanceId) {
        const url = `https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=false&showmenu=true&dd_progress=false&back=native&corpid=${this.props.corpId}&swfrom=${'XFN'}#/approval?procInstId=${processInstanceId}`
        openLink(url);
    }

    render () {
        return (
            <div className='approval-body'>
                <div className='approval-contain-wrap'>
                    {
                        this.state.instanceList.map(v => {
                            return (
                                <div className='approval-list-item' key={v.processInstanceId}>
                                <div className='approval-list-item-line approval-list-item-margin'>
                                    <span className='approval-list-item-name'>{v.processTitle}</span>
                                    <span className='approval-list-item-date'>{v.createTime}</span>
                                </div>
                                <div className='approval-list-item-line'>
                                    <span className='approval-list-item-state'>当前审批状态：{approvalState[v.processStatus]}</span>
                                    <span
                                        className='approval-list-item-link'
                                        onClick={this.previewApproval.bind(this, v.processInstanceId)}
                                    >
                                        查看详情》
                                    </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='approval-list-tip'>
                        *仅显示当次运行demo时发起的审批实例
                    </div>
                </div>
                <div className='approval-footer'
                    onClick={() => {
                        this.getInstanceList()
                    }}
                >
                    刷新列表
                </div>
            </div>
        );
    }

    // 获取审批列表
    getInstanceList = () => {
        axios.get(this.props.domain + "/biz/list/instance")
        .then(res => {
            console.log(JSON.stringify(res));
            if (res.data.success) {
                this.setState({instanceList: res.data.data})
            } else {
                alert(`${res.data.errorMsg}`)
            }
        }).catch(error => {
            console.log("corpId err, " + JSON.stringify(error))
        })
    }
}

export default ApprovalList;