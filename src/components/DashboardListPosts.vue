<template>
 <main>
		<div class="container">
			<!--sections-->
			<div class="row">
				<div class="col-lg-8">
					<!--section-->
					<div class="ass1-section ass1-section__edit-post">
						<div class="ass1-section__content">
							<form action="#">
								<div class="form-group" v-if="setPostDetail && setPostDetail.post.url_image">
									<input 
                                     v-bind:value="setPostDetail.post.url_image"
						            v-on:input="url_image = $event.target.value"
                                    type="text" class="form-control ttg-border-none" placeholder="https://">
								</div>
								<div class="form-group" v-if="setPostDetail && setPostDetail.post.post_content">
                                    
                                     <textarea
                                     
                                       v-bind:value="setPostDetail.post.post_content"
                                       @input="post_content = $event.target.value" 
                                        
						                class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."></textarea>
									
								</div>
							</form>
							<div class="ass1-section__image" v-if="setPostDetail && setPostDetail.post.url_image">
								<a
                                
                                 href="#"> <img v-bind:src="getAvatarProfile" alt=""></a>
							</div>
							<a href="https://memeful.com/" target="_blank" class="ass1-btn ass1-btn-meme">Chế ảnh từ
								meme</a>
                                
							<!-- <a href="#" class="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</a> -->
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<aside class="ass1-aside ass1-aside__edit-post">
						<div>
							<button v-on:click="handleEditAdmin" class="ass1-btn" >Hoàn thành chỉnh sửa</button>
						</div>
                        <div class="ass1-aside__edit-post-head">
							<span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
							<label class="ass1-checkbox"  
                                v-for="item in category"
                                v-bind:key="item.id">
                                <!-- v-bind:value="item.id" -->
								<input 
                                v-if="setPostDetail && setPostDetail.post"
                                 
                                 v-bind:value="item.id"

                                v-model="categories"
                               
                               
                                type="checkbox" name="state-post" checked="checked">
								<span></span>
								<p>{{item.text}}</p>
							</label>
							
						</div>
						
						<div class="ass1-aside__get-code">
							<p>Share Link</p>
						</div>
						<div class="ass1-aside__social">
							<a href="" class="ass1-btn-social__facebook ass1-btn-social"><i class="fa fa-facebook"
									aria-hidden="true"></i></a>
							<a href="" class="ass1-btn-social__twitter ass1-btn-social"><i class="fa fa-twitter"
									aria-hidden="true"></i></a>
							<a href="" class="ass1-btn-social__google ass1-btn-social"><i class="fa fa-google-plus"
									aria-hidden="true"></i></a>
						</div>

					</aside>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
data() {
		return {
			userid:parseInt(this.$route.params.id),
			categories:[],
            url_image:'',
            post_content:'',  
            obj_image:{
              	ObjectFile:null, // lưu vào sever
				baseUrl64:'' //preview hiển thị lên cho người dùng xem ok k
            }  
			

			
		}
    },
  created() {
      let data = this.userid
      this.getPostDetail(data)
  },
   
    computed: {
        
        ...mapState({
          currentUser:state=>state.user.currentUser,
          category:state=>state.post.category
          
      }),
      ...mapGetters([
          'setPostDetail'
      ]),
      
      
       
       getAvatarProfile(){
		  if(this.url_image){
			  return this.url_image
		  }else if(this.url_image.baseUrl64){
			  return this.url_image.baseUrl64
			  
		  }else{
			  return this.setPostDetail.post.url_image
		  }
	  }
    },
    watch: {
    $route(to, from) {
		this.userid = to.params.id
    }
  },
  methods: {
    //   updateText(event){
    //          console.log($event.target.value);
             
    //     },
      handleEditAdmin(){
        //   
           if( this.categories.length &&  this.post_content){
                if(this.obj_image.ObjectFile || this.url_image){
                    let data = {
                        category: this.categories,
                        url_image:this.url_image,
                        post_content:this.post_content,
                        postid : this.userid
                       
                        
                    }
                    if(this.obj_image.ObjectFile){
                        data.obj_image = this.obj_image.ObjectFile
                    }
                    console.log('data all',data);
                    this.EditPost(data).then(res=>{
                        console.log('res kaka',res)
                       
                        if(res.ok){
                             this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'success',
                                title: 'Thông báo',
                                text: 'Bạn đã chỉnh sửa thành công!'
                            });
                               this.categories = [],
                                this.url_image = '',
                                this.post_content = '',  
                                this.obj_image = {
                                    ObjectFile : null, // lưu vào sever
                                    baseUrl64 :'' //preview hiển thị lên cho người dùng xem ok k
                                }  
                        }else{
                            //alert(res.ok)
                            this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'success',
                                title: 'Thông báo',
                                text: res.ok
                            });
                            
                        }
                    });
                }else{
                    
                   this.EditPost(data)
                       this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Không được bỏ trống'
                            });
                }
            }else{
                 this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Vui lòng nhập đầy đủ thông tin!'
                            });
            }
      },
      ...mapActions([
          'getPostDetail',
          'EditPost'
      ]),
      
  },
}
</script>

<style>

</style>