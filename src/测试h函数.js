import h from './mysnabbdom/h'

var vnode1=h('div',{},[
    h('div',{},[
        h('div',{},'text1'),
        h('div',{},'text2')
    ]),
    h('div',{},'text3')
])

console.log(vnode1);
// 自定义h函数测试