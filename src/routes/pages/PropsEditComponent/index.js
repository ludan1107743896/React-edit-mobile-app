import React from 'react';
import { Button, Row, Col, Collapse, Empty } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import { GetPath } from '../../../utils'
import { v4 } from 'uuid';
import BasePropsComp from './BasePropsComp';

const Panel = Collapse.Panel;
class PropsEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            FullScreenVisible: false
        }
    }
    handleClickOption = (type) => {
        const { visourDomArray, selectEidtComp, parentPath } = this.props.example;
        if(type == 'delete' && selectEidtComp!= {}){
            _.update(visourDomArray, selectEidtComp.path, () => {
                return null;
            })
            this.props.dispatch({
                type: 'example/SaveItem',
                payload: {
                    visourDomArray,
                    selectEidtComp: {},
                    parentPath: selectEidtComp.parentPath, 
                }
            })            
        } else if (type == 'copy' && selectEidtComp!= {}) {
            const { selectEidtComp } = this.props.example;
            const nowPath = selectEidtComp.parentPath;
            let _path = ''; // 新 copy 值的 path 
            if (nowPath == '') {
                _path = GetPath('', visourDomArray.length + 1)
            } else {
                _path = GetPath(nowPath, _.get(visourDomArray, nowPath).children.length + 1)
            }
            _.update(visourDomArray, _path, () => {
                return {
                    ...selectEidtComp,
                    key: v4(),
                    path: _path,
                }
            })
            this.props.dispatch({
                type: 'example/SaveItem',
                payload: {
                    visourDomArray,
                    selectEidtComp, 
                }
            })
        } else if (type == 'set') {
            this.props.dispatch({
                type: 'example/SaveItem',
                payload: {
                    visourDomArray: [],
                    selectEidtComp: {},
                    parentPath: '',
                    selectEidtComp: {}
                }
            })
        }
    }

    handleFullScreen = () => {
        let element = document.documentElement;
        if (this.state.FullScreenVisible) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        this.setState({FullScreenVisible: !this.state.FullScreenVisible})
    } 

    render() {
        const { selectEidtComp } = this.props.example;
        const isShow = selectEidtComp != {};
        return (
            <div>
                <Collapse defaultActiveKey={['0', "1"]} style={{ textAlign: "left" }}>
                    <Panel header={"基本操作"} key={0}>
                        <Row>
                            <Col span={6} style={{textAlign: "center"}}>
                                {isShow ? <Button style={{width: '88px'}} type="primary" onClick={() => this.handleClickOption('delete')}>删除</Button>:null}
                            </Col>
                            <Col span={6} style={{textAlign: "center"}}>
                                {isShow ? <Button style={{width: '88px'}} type="primary" onClick={() => this.handleClickOption('copy')}>复制</Button>:null}
                            </Col>
                            <Col span={6} style={{textAlign: "center"}}>
                                <Button style={{width: '88px'}} type="primary" onClick={() => this.handleClickOption('set')}>重置</Button>
                            </Col>
                            <Col span={6} style={{textAlign: "center"}}>
                                <Button style={{width: '88px'}} type="primary" onClick={() => this.handleFullScreen()}>
                                    {!this.state.FullScreenVisible ? '全屏': "取消全屏"}
                                </Button>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header={"基本样式配置"} key={1}>
                        <BasePropsComp />
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default connect(({ example }) => ({ example }))(PropsEditComponent);