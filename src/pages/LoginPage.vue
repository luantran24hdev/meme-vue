<template>
  <main>
        <div class="ass1-login">
            <div class="ass1-login__logo">
            	<router-link to="/" class="ass1-logo"> App Meme</router-link>
               
            </div>
            <div class="ass1-login__content">
                <p>Đăng nhập</p>
                <div class="ass1-login__form">
                    <form action="#" v-on:submit.prevent="handleLogin" >
                        <input v-model="email" type="text" class="form-control" placeholder="Email" required="">
                        <div class="ass1-input-copy">
                            <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu" required="">
                            <a href="#">Copy</a>
                        </div>
                        <div class="ass1-login__send">
                            <router-link to="/register">Đăng ký một tài khoản</router-link>
                            <button type="submit" class="ass1-btn">Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:"login-page",
    data() {
        return {
            email:'',
            password:''
        }
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        handleLogin(e){
            let data = {
                email:this.email,
                password:this.password
            }
           if(data){
               this.login(data).then(res=>{
                  if(!res.ok){
                      if(typeof res.error === 'string'){
                        //   alert(res.error)
                           this.$router.push('/')
                       this.$notify({
                        group: 'noti',
                        duration: 10000,
                        type: 'error',
                        title: 'Thông báo',
                        text: res.error
                    });
                      }else{
                        //   alert(res.error).join(' ')
                           this.$notify({
                        group: 'noti',
                        duration: 10000,
                        type: 'error',
                        title: 'Thông báo',
                        text: res.error.join(' ')
                    });
                      }
                  }else{
                      this.$router.push('/')
                       this.$notify({
                        group: 'noti',
                        duration: 10000,
                        type: 'success',
                        title: 'Thông báo',
                        text: 'Bạn đã đăng nhập thành công!'
                    });
                  }
               });
           }
        }
    },
    // created() {
    //     d
    //      this.login();
    // },
}
</script>

<style>
</style>