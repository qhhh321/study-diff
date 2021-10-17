import updateChildren from './updateChildren'
import createElement from './createElement'
// 对比同一个虚拟节点
export default function patchVnode(oldVnode, newVnode) {
  // 判断newVnode和oldVnode是否是同一个节点
  if (newVnode === oldVnode) {
    return
  }
  // 判断newVnode是否有text
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // 判断newVnode和newVnode的text是否相同
    if (newVnode.text != oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // 说明newVnode有children
    // 判断oldVnode有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      //oldVnode和newVnode都有children，这是最复杂的情况
      //console.log('newVnode和newVnode都有children，最复杂的情况')
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 删除oldVnode的text
      oldVnode.elm.innerText = ''
      // 将newVnode的children添加到oldVnode上
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i])
        oldVnode.elm.appendChild(dom)
      }
    }
  }
}
