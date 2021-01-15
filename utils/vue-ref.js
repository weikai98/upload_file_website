export default {
  install (Vue) {
    const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    const directiveName = options.name || 'ref'
    Vue.directive(directiveName, {
      bind (el, binding, vnode) {
        // el 指令绑定的元素， 
        // binding 一个对象包含{ name(指令名), value(指令的绑定值), oldValue, arg 传给指令的参数 }
        // vnode Vue 编译生成的虚拟节点
        Vue.nextTick(() => {
          binding.value(vnode.componentInstance || el, vnode.key)
        })
        // binding.value(vnode.componentInstance || el, vnode.key)
      },
      update (el, binding, vnode, oldVnode) {
        // 老节点不存在
        if (oldVnode.data && oldVnode.data.directives) {
          const oldBinding = oldVnode.data.directives.find(function (directive) {
            const name = directive.name
            return name === directiveName
          })

          if (oldBinding && oldBinding.value !== binding.value) {
            oldBinding && oldBinding.value(null, oldVnode.key)
            binding.value(vnode.componentInstance || el, vnode.key)
            return
          }
        }
        // 如果 oldVnode节点 不等于新的 Vnode节点
        if (
          vnode.componentInstance !== oldVnode.componentInstance ||
          vnode.elm !== oldVnode.elm
        ) {
          binding.value(vnode.componentInstance || el, vnode.key)
        }
      },
      unbind (el, binding, vnode) {
        binding.value(null, vnode.key)
      }
    })
  }
}