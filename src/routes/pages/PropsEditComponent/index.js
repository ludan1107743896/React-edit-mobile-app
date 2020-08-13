import React from 'react';
import { Button, Row, Col, Collapse } from 'antd';
import { connect } from 'dva';

const Panel = Collapse.Panel;
class PropsEditComponent extends React.Component {

    handleClickOption = (type) => {
        const { visourDomArray, selectEidtComp, parentPath } = this.props.example;
        if(type == 'delete'){
            console.log(visourDomArray, 'tree');
            console.log(selectEidtComp, 'selectTree');
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
                                {isShow ? <Button style={{width: '88px'}} type="primary">复制</Button>:null}
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