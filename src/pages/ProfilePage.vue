<template>
  <main>
        <div class="ass1-login">
            <div class="ass1-login__content">
                <p>Profile AppMeme</p>

                <div class="ass1-login__form" v-if="currentUser">
                    <div class="avatar">
                        <img v-bind:src="getAvatarProfile" alt="">
                    </div>
                    <form action="#" v-if="currentUser" v-on:submit.prevent="handleUpdate">
                        <input
						v-bind:value="currentUser.fullname"
						v-on:input="fullname = $event.target.value"

						 type="text" class="form-control" placeholder="Tên ..." required="">
						 <input 
							v-model="avatar1"
							type="text" class="form-control ttg-border-none" placeholder="https://">
                     
                        <select
						v-bind:value="currentUser.gender"
						v-on:change="gender = $event.target.value"
						  class="form-control">
                            <option value="">Giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                        </select>
                        <input
						 v-on:change="handleFile" 
						 type="file" name="avatar"  placeholder="Ảnh đại diện" class="form-control">
                        <textarea
						v-bind:value="currentUser.description"
						v-on:input="description = $event.target.value"
						 class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."></textarea>
                        <div class="ass1-login__send justify-content-center">
                            <button type="submit" class="ass1-btn">Cập nhật</button>
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
	data() {
		return {
			userid:this.$route.params.id,
			
			fullname:'',
			description:'',
			gender:'',
			avatar:{
				ObjectFile:null, // lưu vào sever
				baseUrl64:'' //preview hiển thị lên cho người dùng xem ok k
			},
			avatar1:'',
			

			
		}
	},
	name:"profile-page",
	

 watch: {
    $route(to, from) {
		this.userid = to.params.id,
		this.checkUserIdProfile()
    }
  },
  computed: {
	  ...mapState({
		  currentUser:state=>state.user.currentUser
	  }),
	  getAvatarProfile(){
		  if(this.avatar1){
			  return this.avatar1
		  }else if(this.avatar.baseUrl64){
			  return this.avatar.baseUrl64
			  
		  }else{
			  return this.currentUser.profilepicture
		  }
	  }
	  
	  
  },
  created() {
	  this.checkUserIdProfile()
  },

  // tạo hàm kiểm tra xem có đúng đây là user profile của chính user login hay không 
	methods: {
		...mapActions([
			'update'
		]),
		 checkUserIdProfile(){
		  if(this.currentUser && this.userid){
			  if(this.currentUser.USERID != this.userid){
				 this.$router.push('/')

			  }
		  }
	  },
	  handleUpdate(){
		  if(!this.fullname) return this.fullname = this.currentUser.fullname;
		  if(!this.description) return this.description = this.currentUser.description;
		  if(!this.gender) return this.gender = this.currentUser.gender;
		  
		 if(this.fullname && this.gender && this.description){
			  let data = {
			  fullname: this.fullname,
			  description: this.description,
			  gender: this.gender,
			 
		  }
	

		  if(this.avatar1){
			   data.avatar = this.avatar1
		  }else if(this.avatar){
			   data.ObjectFile = this.avatar.ObjectFile
		  }
		 console.log('data',data);
		   
		  this.update(data).then(res=>{
			 if(res.ok){
				 //alert('Bạn đã edit thành công')
				  this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'success',
                                title: 'Thông báo',
                                text: 'Bạn đã chỉnh sửa thông tin thành công'
                            });
			 }else{
				//  alert(res.error)
				 this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'warn',
                                title: 'Thông báo',
                                text: res.error
                            });
			 }
		  })
		 }
		
	  },
	  handleFile(e){
		if(e.target.files && e.target.files.length){
				const fileAvatar = e.target.files[0];

				const reader = new FileReader();

				reader.addEventListener("load", () =>{
					// convert image file to base64 string
					let previewSrc = reader.result;

					this.avatar.baseUrl64 = previewSrc
					this.avatar.ObjectFile = fileAvatar


				}, false);

				if (fileAvatar) {
					reader.readAsDataURL(fileAvatar);
				}
			}
		}
  
	},
}
</script>

<style>
</style>