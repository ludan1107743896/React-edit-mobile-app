## 思路图（拖拽到编辑页面）
```jsx
state = {
    visourDomArray: [], // 整个dom 树
    parentPath: '', // 当前选择中哪项的父节点
    selectItem: {}, // 拖拽的某项
    selectEidtComp: {} // 编辑框选择中的哪项
}

// render: 渲染时候（添加过程）
1、parentPath === ''
visourDomArray.push(selectItem) // 直接 push

2、parentPath !== '' // [0]
const item = _.get(visourDomArray, parentPath) /// 获取这项
item.children.push(selectItem); //其获取项添加该项

3、parentPath // 父节点修改
// 当选中编辑项目组件时
// 此时的组件的 selectEidtComp.parentPath 替换全局的 parentPath

// 删除时候
selectEidtComp // 选中的某项
_.get(visourDomArray, selectEidtComp.path, (item) => {
    item = new empty();
})

```