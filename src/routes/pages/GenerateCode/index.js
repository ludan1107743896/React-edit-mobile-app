// 代码生成区，待完善。。。。
import React, { useState, useEffect, useRef } from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import hljs from 'highlight.js';
import 'highlight.js/styles/androidstudio.css';

const GenerateCode = (props) => {
    const { visourDomArray } = props;
    const [list, setList] = useState(visourDomArray);
    const codeRef = useRef();

    useEffect(() => {
        hljs.highlightBlock(codeRef.current);
    })


    const renderElementToJSX = (visourDomList) => {
        return {jsx: '<div>111</div>'}
    }

    const generatePageCode = (list) => {
        const { jsx } = renderElementToJSX(_.cloneDeep(list), '          ');

        let pageCodes = `
            import React, { Component } from 'react';
            import { } from 'antd-mobile';
            
            export default class Index extends Component {
                constructor() {
                    super();
                }

                render() {
                    return (
                        ${jsx}
                    )
                }
            }
        `
        return pageCodes;
    }
    return (
        <>
            <pre style={{textAlign: 'left'}}>
                <code ref={codeRef} className="language-js">
                    {generatePageCode(list)}
                </code>
            </pre>
        </>
    )
}

export default GenerateCode;