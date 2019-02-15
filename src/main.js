import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
//import store from '../store/index.js';//导入状态库
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './assets/material-icons.css'

Vue.use(MuseUI);
Vue.use(Vuex);
Vue.use(require('vue-resource'));//引用ajax库
Vue.use(VueRouter);

import App from '../components/App.vue'
import CustomLogin from '../components/Login.vue'

// new Vue({
//   el: '#app',
//   render (h) {
//     return h('mu-button', {}, 'Hello World');
//   }
// });

const routes = [{
	path: '/',
	name:"home",
	component: App,
	children:[
		{
			path:"/login",
			name:"login",
			component:CustomLogin
		}
	]
},
{
	path:"*",
	name:"all",
	redirect:"/home",
}
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});


// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router,
  //store,
}).$mount('#app')

