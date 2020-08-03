import Button from './Button';
import Flex from './Flex';
import FlexItem from './FlexItem';

const pluginsArray =  {
    Button,
    Flex,
    FlexItem
}

const pluginsArrayTree = [
    {
        group_title: "表单组件",
        coms: [
            Button,
        ]
    },
    {
        group_title: "布局组件",
        coms: [
            Flex,
            FlexItem
        ]
    }
]

export {
    pluginsArray,
    pluginsArrayTree,
}