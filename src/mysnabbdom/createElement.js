// 功能：真正创建节点，将vnode创建为DOM,是孤儿节点,不进行插入
export default function createElement(vnode) {
  // 创建新的DOM
  var domNode = document.createElement(vnode.sel)
  // 判断是否是文本节点
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    // 添加文字内容
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i]
      let chDOM=createElement(ch)
      domNode.appendChild(chDOM)
    }
  }
  // 补上elm属性
  vnode.elm = domNode
  // 返回elm，elm属性是个纯DOM对象
  return vnode.elm
}
