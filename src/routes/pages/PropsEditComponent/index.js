import React from 'react';
import { Button, Row, Col, Collapse, Empty } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import { GetPath } from '../../../utils'
import { v4 } from 'uuid';

const Panel = Collapse.Panel;
class PropsEditComponent extends React.Component {

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
            // const _path = selectEidtComp.parentPath;
            // let _index;
            // if (_path == '') {
            //     _index = visourDomArray.length;
            // } else {
            //     _index = _.get(visourDomArray,_path).length;
            // }
            // console.log(_path, 'mmm121245')
            // const _index = _.get(visourDomArray, _path);
            // console.log(_index, 'index')
            // console.log(_path, '----path----') 
            // key: v4(),
            // children: [],
            // _.update(visourDomArray, _path, (item) => {
            //     return {}
            // })
            // this.props.dispatch({
            //     type: 'example/SaveItem',
            //     payload: {
            //         visourDomArray,
            //         selectEidtComp: {},
            //         parentPath: selectEidtComp.parentPath, 
            //     }
            // })    
        }
    }

    render() {
        const { selectEidtComp } = this.props.example;
        const isShow = selectEidtComp != {};
        return (
            <div>
                <Collapse defaultActiveKey={['0']} style={{ textAlign: "left" }}>
                    <Panel header={"基本操作"} key={0}>
                        <Row>
                            <Col span={8} style={{textAlign: "center"}}>
                                {isShow ? <Button style={{width: '88px'}} type="primary" onClick={() => this.handleClickOption('delete')}>删除</Button>:null}
                            </Col>
                            <Col span={8} style={{textAlign: "center"}}>
                                {isShow ? <Button style={{width: '88px'}} type="primary" onClick={() => this.handleClickOption('copy')}>复制</Button>:null}
                            </Col>
                            <Col span={8} style={{textAlign: "center"}}>
                                <Button style={{width: '88px'}} type="primary">重置</Button>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default connect(({ example }) => ({ example }))(PropsEditComponent);