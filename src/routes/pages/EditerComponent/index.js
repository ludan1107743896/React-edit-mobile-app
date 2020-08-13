import React from 'react';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import _ from 'lodash';
import * as mobileComps from 'antd-mobile';
import { GetPath } from '../../../utils';

class EditerComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }

    handleOnDrop = (event) => {
        event.preventDefault();
        const { selectItem, visourDomArray, parentPath } = this.props.example;
        const index = parentPath == ''? visourDomArray.length: _.get(visourDomArray, parentPath).children.length;
        const path = GetPath(parentPath, index);
        if (!path.includes('children')) {
            visourDomArray.push({
                ...selectItem, 
                path, 
                parentPath
            });
        } else {
            _.update(visourDomArray, path, () => {   
                return {
                    ...selectItem, 
                    path,
                    parentPath,
                }
            });
        }
        this.forceUpdate();
    }

    handleOnDragOver = (event) => {
        event.preventDefault();
    }

    GetListView = () => {
        const { visourDomArray } = this.props.example;
        if(visourDomArray.length <= 0) return null;
        const getRenderTree = (k, type) => {
            const content = k.props.content?k.props.content:null;
            return React.createElement(mobileComps[k.type], {
                ...k.props, 
                key: k.key,
                onClick: (e) => this.handleClick(e,k),
                onMouseOver: () => this.handleMouseOver(k),
            }, type ? content : getVisour(k.children))
        }
        const getVisour = (list) => {
            return list.map((k,i) => {
                if(k.children.length > 0){
                    return getRenderTree(k) 
                } else {
                    return getRenderTree(k,'content')
                }
            })
        }
        return getVisour(visourDomArray);
    }

    handleClick = (e, k) => {
        e.stopPropagation()
        const { parentPath } = this.props.example;
        let path = '';
        if (k.container) {
            path = k.path;
        } else {
            path = parentPath;
        }
        this.props.dispatch({
            type: 'example/SaveItem',   
            payload: {
                parentPath: path,
                selectEidtComp: k,
            }
        })
    }

    handleMouseOver = (k) => {
        // const { visourDomArray, parentPath } = this.props.example;
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