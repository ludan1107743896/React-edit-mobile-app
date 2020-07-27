import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Row, Col } from 'antd'
import SideLeftCompnent from './SideLeftCompnent/index';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <Row>
        <Col span={8} className={styles.box_col}>
          <h2>组件展示区</h2>
          <SideLeftCompnent />
        </Col>
        <Col span={8} className={styles.box_col}>
          <h2>组件编辑区</h2>
        </Col>
        <Col span={8} className={styles.box_col}>
          <h2>组件属性编辑区</h2>
        </Col>
      </Row>

    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);