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
       
    }

    getPath = (path, index, isContainer) => {
        if(!path && index !== undefined && !isContainer){
            path = `[${index}]`
        } else if (path && isContainer) {
            path = `${path}.children`;
        } else if (path && index !== undefined) {
            path = `${path}.children.[${index}]`
        }
        return path;
    }

    handleOnDrop = (event) => {
        event.preventDefault();
        const { selectItem, visourDomArray, parentPath } = this.props.example;
        const index = parentPath == ''? visourDomArray.length: _.get(visourDomArray, parentPath).children.length;
        const path = this.getPath(parentPath, index);
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
        console.log(visourDomArray, '-------visourDomArray----')
        if(visourDomArray.length <= 0) return null;
        const getVisour = (list) => {
            return list.map((k,i) => {
                if(k.children.length > 0){
                    return getVisour(k.children)
                } else {
                    return React.createElement(mobileComps[k.type], {
                        ...k.props,
                        key: k.key,
                        onClick: () => this.handleClick(k),
                        onMouseOver: () => this.handleMouseOver(k),
                    }, k.props.content?k.props.content:null)
                }
            })
        }
        return getVisour(visourDomArray);
    }

    handleClick = (k) => {
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