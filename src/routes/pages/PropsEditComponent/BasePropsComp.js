import React from 'react';
import { Form, Collapse, Input, Row, Col, Select, Popover, InputNumber } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { ChromePicker } from 'react-color';
import { connect } from 'dva';
import _ from 'lodash';

const { Panel } = Collapse;
const { Option } = Select;
class BasePropsComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsizeColor: ''
        }
    }

    getCommonComp = () => {
        return (
            <Select
                placeholder="单位"
                style={{ width: '100%' }}
                defaultValue="px"
            >
                <Option value="px">px</Option>
                <Option value="rem">rem</Option>
                <Option value="em">em</Option>
                <Option value="%">%</Option>
            </Select>
        )
    }

    getEditStyleBody = (_obj, _item) => {
        const { selectEidtComp } = this.props.example;
        if(typeof _obj === 'string'){
            if(_obj === 'className'){
                selectEidtComp.props.className = _item;

            }
        } else {
            selectEidtComp.props.style={...selectEidtComp.props.style, ..._obj}
        }
        this.props.dispatch({
            type: 'example/SaveItem', 
            payload: {
                selectEidtComp
            } 
        })
    }

    render() {
        return (
            <>
                <Form style={{ height: '527px', overflow: 'auto' }}>
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1', "2", "3", "4", "5", "6"]}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse"
                    >
                        <Panel header="自定义类名" key="1" >
                            <Input placeholder="自定义样式" onChange={(e) => this.getEditStyleBody('className', e.target.value)}/>
                        </Panel>
                        <Panel header="文本与字体" key="2" >
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={24}>
                                    <Select
                                        placeholder="请选择字体"
                                        style={{ width: '100%' }}
                                        onSelect={(e) => this.getEditStyleBody({ fontFamily: e})}
                                    >
                                        <Option value="cursive">宋体</Option>
                                        <Option value="monospace">黑体</Option>
                                        <Option value="inherit">微软雅黑</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={12}>
                                    <Select
                                        placeholder="请选择字体粗细"
                                        style={{ width: '100%' }}
                                        onSelect={(e) => this.getEditStyleBody({ fontWeight: e})}
                                    >
                                        <Option value="normal">normal</Option>
                                        <Option value="bold">bold</Option>
                                        <Option value="bolder">bolder</Option>
                                        <Option value="inherit">inherit</Option>
                                        <Option value="initial">initial</Option>
                                        <Option value="lighter">lighter</Option>
                                        <Option value="unset">unset</Option>
                                    </Select>
                                </Col>
                                <Col span={12}>
                                    <Select
                                        placeholder="请选择字体行内块级"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="none">none</Option>
                                        <Option value="underline">underline</Option>
                                        <Option value="overline">overline</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <Select
                                        placeholder="字体大小"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="12">12</Option>
                                        <Option value="14">14</Option>
                                        <Option value="16">16</Option>
                                    </Select>
                                </Col>
                                <Col span={6}>
                                    <Popover
                                        placement="top"
                                        title={null}
                                        content={() => (
                                            <ChromePicker
                                                onChangeComplete={(e) => this.setState({ fontsizeColor: e.hex })}
                                            />
                                        )}
                                        trigger="click"
                                    >
                                        <Input value={!!this.state.fontsizeColor ? this.state.fontsizeColor : "字体颜色"} />
                                    </Popover>
                                </Col>
                                <Col span={6}>
                                    <InputNumber placeholder="文本缩进" style={{ width: '100%' }} />
                                </Col>
                                <Col span={6}>
                                    {this.getCommonComp()}
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={8}>
                                    <InputNumber placeholder="文本高度" style={{ width: '100%' }} />
                                </Col>
                                <Col span={4}>
                                    {this.getCommonComp()}
                                </Col>
                                <Col span={8}>
                                    <InputNumber placeholder="文本间隔" style={{ width: '100%' }} />
                                </Col>
                                <Col span={4}>
                                    {this.getCommonComp()}
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={12}>
                                    <Select
                                        placeholder="溢出选项"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="visible">visible</Option>
                                        <Option value="hidden">hidden</Option>
                                        <Option value="scroll">scroll</Option>
                                        <Option value="auto">auto</Option>
                                    </Select>
                                </Col>
                                <Col span={12}>
                                    <Select
                                        placeholder="字体拉伸"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="normal">normal</Option>
                                        <Option value="expanded">expanded</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={12}>
                                    <Select
                                        placeholder="文本转化"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="none">none</Option>
                                        <Option value="capitalize">capitalize</Option>
                                        <Option value="uppercase">uppercase</Option>
                                    </Select>
                                </Col>
                                <Col span={12}>
                                    <Select
                                        placeholder="空白处处理"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="normal">normal</Option>
                                        <Option value="pre">pre</Option>
                                        <Option value="nowrap">nowrap</Option>
                                        <Option value="pre-wrap">pre-wrap</Option>
                                        <Option value="pre-line">pre-line</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={12}>
                                    <Select
                                        placeholder="空白处处理"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="normal">normal</Option>
                                        <Option value="break-word">break-word</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="边距" key="3" >
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="上内边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="下内边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="左内边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="右内边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="上外边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="下外边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="左外边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="右外边距" />
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                        </Panel>
                        <Panel header="外观" key="4">
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={4} style={{ lineHeight: "32px" }}>背景色</Col>
                                <Col span={14}><Input placeholder="请输入背景色" style={{ width: '100%' }} /></Col>
                                <Col span={6}>
                                    <Popover
                                        placement="top"
                                        title={null}
                                        content={() => (
                                            <ChromePicker
                                                onChangeComplete={(e) => this.setState({ backColor: e.hex })}
                                            />
                                        )}
                                        trigger="click"
                                    >
                                        <Input value={!!this.state.backColor ? this.state.backColor : ""} placeholder="请选择" />
                                    </Popover>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="浮动" key="5" >
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={4} style={{ lineHeight: "32px" }}>浮动属性</Col>
                                <Col span={20}>
                                    <Select
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="left">left</Option>
                                        <Option value="right">right</Option>
                                        <Option value="top">top</Option>
                                        <Option value="bottom">bottom</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={4} style={{ lineHeight: "32px" }}>清除属性</Col>
                                <Col span={20}>
                                    <Select
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="left">left</Option>
                                        <Option value="right">right</Option>
                                        <Option value="top">top</Option>
                                        <Option value="bottom">bottom</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={4} style={{ lineHeight: "32px" }}>整体宽度</Col>
                                <Col span={14}>
                                    <InputNumber placeholder="请输入" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>
                                    {this.getCommonComp()}
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="最大宽度" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="最小宽度" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={4} style={{ lineHeight: "32px" }}>整体高度</Col>
                                <Col span={14}>
                                    <InputNumber placeholder="请输入" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>
                                    {this.getCommonComp()}
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="最大高度" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="最小高度" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                        </Panel>
                        <Panel header="定位" key="6" >
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={4} style={{ lineHeight: "32px" }}>定位属性</Col>
                                <Col span={20}>
                                    <Select
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="relative">relative</Option>
                                        <Option value="absolute">absolute</Option>
                                        <Option value="fixed">fixed</Option>
                                        <Option value="sticky">sticky</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="上" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="下" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={6}>
                                    <InputNumber placeholder="左" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                                <Col span={6}>
                                    <InputNumber placeholder="右" style={{width:'100%'}}/>
                                </Col>
                                <Col span={6}>{this.getCommonComp()}</Col>
                            </Row>
                            <Row>
                                <Col span={18}>
                                    <Select
                                        placeholder="请选择display"
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="block">block</Option>
                                        <Option value="none">none</Option>
                                        <Option value="inline">inline</Option>
                                        <Option value="flex">flex</Option>
                                        <Option value="inline-block">inline-block</Option>
                                    </Select>
                                </Col>
                                <Col span={6}>
                                    <InputNumber placeholder="zIndex属性" />
                                </Col>
                            </Row>
                            <Row style={{ margin: '5px 0' }}>
                                <Col span={4} style={{ lineHeight: "32px" }}>Flex</Col>
                                <Col span={20}>
                                   <InputNumber style={{width:'100%'}}/>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Form>
            </>
        )
    }
}

export default connect(({ example }) =>({ example }))(BasePropsComp);