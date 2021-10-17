import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    //   传入的第一个节点是DOM节点，需要转换成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断oldVnode和newVnode的标签和key否是相同
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    console.log('是同一个节点')
    patchVnode(oldVnode, newVnode)
  } else {
    console.log('不是同一个节点，回暴力插入新的，删除旧的')
    //创建新的节点
    let newVnodeElm = createElement(newVnode)
    //插入到老节点之前
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    //删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}
