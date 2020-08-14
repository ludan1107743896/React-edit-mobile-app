import React from 'react';
import { Collapse, Tag, Button} from 'antd';
import { v4 } from 'uuid';
import { pluginsArray, pluginsArrayTree } from '../../plugins/index';
import { connect } from 'dva';

const Panel = Collapse.Panel;
class SideLeftCompnent extends React.Component{
    constructor(props) {
        super(props);
    }

    handleDragstart = (event) => {
        this.props.dispatch({
            type: 'example/select_item',
            payload: {
                selectItem: {
                    ...pluginsArray[event],
                    key: v4(),
                    children: [],
                }
            }
        })
    }

    render() {
        return (
            <div>
                <Collapse defaultActiveKey={['1', "2"]} style={{ textAlign: "left" }}>
                    {
                        pluginsArrayTree.map((k, i) => {
                            return <Panel header={k.group_title} key={i + 1}>
                                {
                                    k.coms.map((com, vx) => {
                                        return (
                                            <Tag
                                                style={{ border: '0' }}
                                                key={i + '' + vx}
                                            >
                                                <Button 
                                                    onDragStart={() => this.handleDragstart(com.type)}
                                                    type="primary" 
                                                    draggable="true"
                                                >{com.type} {com.title}</Button>
                                            </Tag>
                                        )
                                    })
                                }
                            </Panel>
                        })
                    }
                </Collapse>
            </div>
        )
    }
}

export default connect(({ example }) =>({ example }))(SideLeftCompnent);