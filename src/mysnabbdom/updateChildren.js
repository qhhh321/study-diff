/**
 * 功能：oldVnode和newVnode都有children情况，进行节点更新。
 */
import createElement from './createElement'
import patchVnode from './patchVnode'
function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key
}
export default function updateChildren(parentElm, oldCh, newCh) {
  //console.log(oldCh, newCh)
  //旧前
  let oldStartIdx = 0
  //新前
  let newStartIdx = 0
  //旧后
  let oldEndIdx = oldCh.length - 1
  //新后
  let newEndIdx = newCh.length - 1
  //旧前节点
  let oldStartVnode = oldCh[0]
  //旧后节点
  let oldEndVnode = oldCh[oldEndIdx]
  //新前节点
  let newStartVnode = newCh[0]
  //新后节点
  let newEndVnode = newCh[newEndIdx]
  let keyMap
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('🌟')
    //首先判断要略过已经加undefined标记的东西
    if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log('新前和旧前')
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log('新后与旧后')
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log('3、新后和旧前(此种情况发生涉及移动节点，将新后指向的节点移动到旧后之后)')
      patchVnode(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      console.log('4、新前和旧后(此种情况发生涉及移动节点，将新前指向的节点移动到旧前之前)')
      patchVnode(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      //四种情况都没命中
      //寻找key的map
      if (!keyMap) {
        keyMap = {}
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key
          if (key != undefined) {
            keyMap[key] = i
          }
        }
      }
      //寻找当前这项（newStartIdx）这项在keyMap中的映射的位置序号
      const idxInOld = keyMap[newStartVnode.key]
      if (idxInOld == undefined) {
        //判断，如果是idxIndexOld是undefined表示它是全新的项
        //被加入的项（就是newStartVnode这项）现不是真正的DOM节点
        console.log(newStartVnode);
        parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
      } else {
        //如果不是undefined，不是全新的项，就需要移动位置
        const elmToMove = oldCh[idxInOld]
        patchVnode(elmToMove, newStartVnode)
        //把这项设置为undefined，表示我已经处理完了
        oldCh[idxInOld] = undefined
        //移动，调用insertBefore也可以实现移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      //指针下移，只移动新的头
      newStartVnode = newCh[++newStartIdx]
    }
  }
  //继续看循环结束了还没有剩余节点，执行删除或插入
  if (newStartIdx <= newEndIdx) {
    //遍历newCh，添加到老的没有处理的之前
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      //insertBefore自动识别null，如果是null就自动排到队尾去
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    //删除
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  } else {
  }
}
