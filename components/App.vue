<template>
  <div id="app">
    <mu-paper :z-depth="1" class="demo-loadmore-wrap">
    <mu-appbar color="primary" title="主页">
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>

      <mu-button flat slot="right" style="border-radius: 50%;" @click="openLoginDialog">
        登录
      </mu-button>
    </mu-appbar>
    <mu-dialog title="用户登录" width="600" max-width="80%" dialog-class="custom-dialog-position" :esc-press-close="false" :overlay-close="false" :open.sync="isOpenLoginDialog" id="loginDialog" >
      <mu-button icon style="position: absolute;top: 0;right: 0;" @click="closeLoginDialog">
        <mu-icon value="close"></mu-icon>
      </mu-button>
    <mu-container>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="用户名" help-text="帮助文字" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </mu-dialog>
    <mu-container ref="container" class="demo-loadmore-content">
    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <mu-list>
        <template v-for="i in num">
          <mu-list-item>
            <mu-list-item-title>{{text}} Item {{i}}</mu-list-item-title>
          </mu-list-item>
          <mu-divider />
        </template>
      </mu-list>
    </mu-load-more>
  </mu-container>
  </mu-paper>
    <div class="body">
			<transition
			enter-active-class="fadeIn"
			leave-active-class="fadeOut">
				<router-view></router-view>
			</transition>
    </div>
    <custom-bottomnav></custom-bottomnav>
  </div>
</template>

<script type="text/babel">
import CustomBottomNav from '../components/BottomNav.vue'
export default {
  name: 'app',
  data () {
    return {
        num: 10,
      refreshing: false,
      loading: false,
      text: 'List',
      isOpenLoginDialog:false,
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        username: '',
        password: '',
        isAgree: false
      }
    }
  },
  methods: {
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === 'List' ? 'Menu' : 'List';
        this.num = 10;
      }, 2000)
    },
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000)
    },
    openLoginDialog () {
      this.isOpenLoginDialog = true;
    },
    closeLoginDialog () {
      this.isOpenLoginDialog = false;
      this.clear();
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if(result){
          this.isOpenLoginDialog = false;
        }
        console.log('form valid: ', result)
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      };
    }
  },
  components:{
		"custom-bottomnav":CustomBottomNav,
	}
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.demo-loadmore-wrap {
  width: 100%;
  height: calc(100% - 116px);
  display: flex;
  flex-direction: column;
}
.demo-loadmore-wrap .mu-appbar {
    width: 100%;
  }
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.mu-demo-form {
  width: 100%;
  max-width: 460px;
}

</style>
<style type="text/css">
.custom-dialog-position{
  position: relative !important;
}
</style>
