import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Row, Col, Tabs } from 'antd'
import SideLeftCompnent from './SideLeftCompnent/index';
import EditerComponent from './EditerComponent/index';
import PropsEditComponent from './PropsEditComponent/index';

const { TabPane } = Tabs;
const PropsNull = () => {
  return (
    <h4>请选择编辑内容，选择编辑组件。</h4>
  );
}


class IndexPage extends React.Component {

  callback = () => {

  }

  render() {
    const { selectEidtComp } = this.props.example;
    return (
      <div className={styles.normal}>
        <Row>
          <Col span={8} className={styles.box_col} style={{ padding: "0 30px" }}>
            <h2>组件展示区</h2>
            <SideLeftCompnent />
          </Col>
          <Col span={8} className={styles.box_col}>
            <h2>组件编辑区</h2>
            <EditerComponent />
          </Col>
          <Col span={8} className={styles.box_col}>
            <Tabs animated={true} centered defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="组件属性编辑区" key="1">
                {JSON.stringify(selectEidtComp) !== "{}" ? <PropsEditComponent /> : <PropsNull />}
              </TabPane>
              <TabPane tab="组件代码展示操作" key="2">
                121212
              </TabPane>
            </Tabs>            
          </Col>
        </Row>
      </div>
    );
  }

}

export default connect(({ example }) => ({ example }))(IndexPage);