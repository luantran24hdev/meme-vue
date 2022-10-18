<template>
    <main>
        <div class="ass1-login">
            <div class="ass1-login__content">
                <p>Đổi mật khẩu</p>
                <div class="ass1-login__form">
                    <form action="" v-on:submit="handleChangePassword">
                        <input 
                        v-model="oldPassword"
                        type="password" class="form-control" placeholder="Mật khẩu cũ" required="">
                        <input
                         v-model="newPassword"
                         type="password" class="form-control" placeholder="Mật khẩu mới" required="">
                        <input
                         v-model="reNewPassword"
                         type="password" class="form-control" placeholder="Xác nhận mật khẩu mới" required="">
                        <div class="ass1-login__send justify-content-center">
                            <button type="submit" class="ass1-btn">Gửi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    name:"change-password",
    data() {
        return {
            userid:this.$route.params.id,
            oldPassword:'',
            newPassword:'',
            reNewPassword:''
        }
    },
    computed: {
        ...mapState({
            currentUser:state=>state.user.currentUser
        })
    },
    watch: {
        $route(to,from){
            this.userid = to.params.id,
            this.checkProfileUserLogged()
        }
    },
    created() {
        this.checkProfileUserLogged()
    },

    methods: {
        ...mapActions(['changePassword']),
        checkProfileUserLogged(){
           if(this.currentUser && this.userid){
               if(this.currentUser.USERID != this.userid){
                   this.$router.push('/')
               }
           }
        },
        handleChangePassword(){
            let {oldPassword,newPassword,reNewPassword} = this
            if(oldPassword && newPassword && reNewPassword){
                if(oldPassword == newPassword ){
                    // alert('Mật khẩu cũ và mật khẩu mới không được trùng nhau')
                    this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Mật khẩu cũ và mật khẩu mới không được trùng nhau!'
                            });
                }else if(newPassword != reNewPassword){
                    // alert('Mật khẩu nhập lại không khớp')
                    this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Mật khẩu nhập lại không khớp!'
                            });
                }else{
                    // ok
                     let data = {
                        oldPassword,
                        newPassword,
                        reNewPassword,
                    }
                    console.log('data chang password',data)

                    if(data){
                        this.changePassword(data).then(res=>{
                        console.log('res',res);
                        if(res.ok){
                            // alert(res.message)
                            this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'success',
                                title: 'Thông báo',
                                text: res.message
                            });
                        }else{

                           alert(res.error)
                        }
                    })
                    }
                    

                }
            }else{
                //alert('Vui lòng nhập đẩy đủ thông tin')
                this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Vui lòng nhập đẩy đủ thông tin'
                            });
                
            }


           
        }
    },
}
</script>

<style>

</style>