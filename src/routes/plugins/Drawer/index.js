import React from 'react';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';

const sidebar = (<List>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
      if (index === 0) {
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          multipleLine
        >Category</List.Item>);
      }
      return (<List.Item key={index}
        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
      >Category{index}</List.Item>);
    })}
  </List>
);  

export default {
    type: "Drawer",
    title: "抽屉",
    container: true,
    props: {
        enableDragHandle: false,
        sidebar,
        style: {
            border: '1px dashed blue',
            height: "20px",
            background: '#ddd'
        }
    } 
}