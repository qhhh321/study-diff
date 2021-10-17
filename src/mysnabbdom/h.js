import vnode from "./vnode";
// sel, data, children, text, elm
// 实现一个弱版本的h函数（只能传入3个函数）
// 第一种情况h('div',{},'文字')
// 第二种情况h('div',{},[])
// 第三种情况h('div',{},h())
export default function h(sel, data, c) {
  // 必须传入三个参数
  if (arguments.length != 3) {
    throw new Error("对不起，h函数只能输入三个参数");
  }
  if (typeof c == "string" || typeof c == "number") {
    // 如果是第一种情况
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    //如果是第二种情况
    let children = [];
    // 遍历c收集children
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] == "object" && c[i].hasOwnProperty("sel"))) {
        throw new Error("传入的数组参数中有项不是h函数");
      }
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c == "object" && c.hasOwnProperty("sel")) {
    //如果是第三种情况
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error("传入的第三个参数类型不正确");
  }
}
