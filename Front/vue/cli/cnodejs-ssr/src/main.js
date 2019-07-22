import Vue from 'vue'
import ElementUI from 'element-ui';
import { Loading, MessageBox, Notification, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

// ElementUI 配置
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
// ElementUI 快捷设置
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// 开发配置
Vue.config.productionTip = false

export async function createApp ({
          beforeApp = () => {},
          afterApp = () => {}
        } = {}) {
          const router = createRouter()
          const store = createStore()
          

          await beforeApp({
            router,
            store,
            
          })

          const app = new Vue({
  router,
  store,
  render: h => h(App)
})

          const result = {
            app,
            router,
            store,
            
          }

          await afterApp(result)

          return result
        }
