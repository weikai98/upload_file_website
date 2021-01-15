import Vue from 'vue'
import App from './App.vue'
import ref from '../utils/vue-ref'
import { Button, Upload, Input } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Upload)
Vue.use(Input)
Vue.use(Button)
Vue.use(ref)
new Vue({
  render: h => h(App)
}).$mount('#app')