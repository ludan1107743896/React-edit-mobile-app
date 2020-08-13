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

```jsx
    const a = this.getPath('', 0, true);
    const a1 = this.getPath('', 0, false);
    const b = this.getPath('[0]', 1, true); // 获取二层值
    const b1 = this.getPath('[0]', 1, false); // 获取二层值
    const c = this.getPath('', 2); // 获取第一层path
    const c1 = this.getPath('', 2, true);
    console.log(a,'-------------', a1, 'a')
    console.log(b,'-------------', b1, 'b')
    console.log(c,'-------------', c1, 'c')

    // 获取当前路径

    const getPath = (path, index, isContainer) => {
        if(!path && index !== undefined && !isContainer){
            path = `[${index}]`
        } else if (path && isContainer) {
            path = `${path}.children`;
        } else if (path && index !== undefined) {
            path = `${path}.children.[${index}]`
        }
        return path;
    }

```