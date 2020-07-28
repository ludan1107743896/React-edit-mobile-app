import React from 'react';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import { v4 } from 'uuid';
import _ from 'lodash';
import * as mobileComps from 'antd-mobile';

class EditerComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(mobileComps, '---------mobileComps------')
    }

    getPath = (path, index) => {
        if (path) {
            if (path.includes('children')) {
                return `${path}.children[${index}]`;
            } else {
                return `[${index}]`;
            }
        }
    }

    handleOnDrop = (event) => {
        event.preventDefault();
        const { selectItem, visourDomArray, parentPath } = this.props.example;
        const path = this.getPath(parentPath, visourDomArray.length);
        _.update(visourDomArray, path, () => {
            return selectItem;
        });
        this.forceUpdate();
    }

    handleOnDragOver = (event) => {
        event.preventDefault();
    }

    GetListView = () => {
        const { visourDomArray } = this.props.example;
        if(visourDomArray.length <= 0) return null;
        const getVisour = (list) => {
            return list.map((k,i) => {
                if(k.children.length > 0){
                    return getVisour(k.children)
                }
                return React.createElement(mobileComps[k.type], {
                    ...k.props,
                    key: k.key,
                }, k.props.content?k.props.content:null)
            })
        }
        return getVisour(visourDomArray);
    }

    render() {
        return (
            <div 
                className={styles.editor} 
                onDrop={(e) => this.handleOnDrop(e)} 
                onDragOver={(e) => this.handleOnDragOver(e)} 
            >
                {this.GetListView()}
            </div>
        )
    }
}

export default connect(({ example }) => ({ example }))(EditerComponent);