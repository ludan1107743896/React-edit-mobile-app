import Button from './Button';
import Flex from './Flex';
import FlexItem from './FlexItem';
import WhiteSpace from './WhiteSpace';
import WingBlank from './WingBlank';
import Drawer from './Drawer';

const pluginsArray =  {
    Button,
    Flex,
    FlexItem,
    WhiteSpace,
    WingBlank,
    Drawer
}

const pluginsArrayTree = [
    {
        group_title: "表单组件",
        coms: [
            Button,
        ]
    },
    {
        group_title: '空白区域',
        coms: [
            WhiteSpace,
            WingBlank
        ]
    },
    {
        group_title: "布局组件",
        coms: [
            Flex,
            FlexItem,
            Drawer
        ]
    }
]

export {
    pluginsArray,
    pluginsArrayTree,
}