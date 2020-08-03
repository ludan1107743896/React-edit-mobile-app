import React from 'react';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import _ from 'lodash';
import * as mobileComps from 'antd-mobile';

class EditerComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(mobileComps, '---------mobileComps------')
        // var a = [{name: 'zhangsan', child: [{name: 'lisi', child: [{ name: 'wangwu', child:[] }]}]}]
        // var c = _.get(a, '[0]');
        // console.log(c, '----c----')
    }

    getPath = (path, index, flag) => {
        if (path) {
            if (path.includes('children') || flag) {
                return `${path}.children[${index}]`;
            } else {
                return `[${index}]`;
            }
        }
    }

    handleOnDrop = (event) => {
        event.preventDefault();
        const { selectItem, visourDomArray, parentPath } = this.props.example;
        const index = parentPath == '[0]'? visourDomArray.length: _.get(visourDomArray, parentPath).children.length;
        const path = this.getPath(parentPath, index);
        _.update(visourDomArray, path, () => {
            return {...selectItem, path};
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
                    onClick: () => this.handleClick(k),
                }, k.props.content?k.props.content:null)
            })
        }
        return getVisour(visourDomArray);
    }

    handleClick = (k) => {
        const { parentPath } = this.props.example;
        let path = '';
        if (k.container) {
            console.log(this.getPath(k.path, k.children.length, true), '-----path----')
            path = this.getPath(k.path, k.children.length, true)
        } else {
            path = parentPath;
        }
        console.log(path, '-----1111---')
        this.props.dispatch({
            type: 'example/SaveItem',
            payload: {
                parentPath: path,
            }
        })
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