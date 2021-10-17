//函数功能：用来返回一个对象
export default function vnode(sel, data, children, text, elm) {
  const key = data.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
  }
}
