import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import router from '../router/routes';
createApp(App).use(router).use(Antd).mount('#app')