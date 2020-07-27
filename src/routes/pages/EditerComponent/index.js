import React from 'react';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import { v4 } from 'uuid';
import _ from 'lodash';

class EditerComponent extends React.Component{
    constructor(props) {
        super(props)
    }

    handleOnDrop = (event) => {
        event.preventDefault();
        const { selectItem, visourDomArray, parentPath } = this.props.example;
        // let arrList = [];
        // if (selectItem.container) {
        //     [{
        //         path: '',
        //         type: 'div',
        //         props: {},
        //         children: [

        //         ]
        //     }]
        // } else {
            
        // }
        // console.log(selectItem, '-------item----');
        
    }

    handleOnDragOver = (event) => {
        event.preventDefault();
    }
    render() {
        return (
            <div 
                className={styles.editor} 
                onDrop={(e) => this.handleOnDrop(e)} 
                onDragOver={(e) => this.handleOnDragOver(e)} 
            >
                111
            </div>
        )
    }
}

export default connect(({ example }) => ({ example }))(EditerComponent);