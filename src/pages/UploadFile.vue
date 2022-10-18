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
								<div class="form-group">
									<input 
                                     v-model="url_image"
                                    type="text" class="form-control ttg-border-none" placeholder="https://">
								</div>
								<div class="form-group">
									<textarea 
                                    v-model="post_content"
                                    type="text" class="form-control ttg-border-none"
										placeholder="Mô tả ..."></textarea>
								</div>
							</form>
							<div class="ass1-section__image">
                                
								<a 
                                v-on:click="handleUploadComputer"
                                href="#"><img v-bind:src="configImage" alt="default"></a>
							</div>
							<a href="https://memeful.com/" target="_blank" class="ass1-btn ass1-btn-meme">Chế ảnh từ
								meme</a>
							<button 
                            v-on:click="handleUploadComputer"
                             class="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</button>
                            <input 
                             v-on:change="pewviewFile"
                            style="display:none"
                            ref="uploadImage"
                            type="file" id="avatar">
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<aside class="ass1-aside ass1-aside__edit-post">
						<div>
							<a 
                            v-on:click="handleUploadImages"
                            href="#" class="ass1-btn">Đăng bài</a>
						</div>
						<div class="ass1-aside__edit-post-head">
							<span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
							<label class="ass1-checkbox"  
                                v-for="item in category"
                                v-bind:key="item.id">
								<input 
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
export default {
    name:'upload-page',
    data() {
        return {
          
            categories:[],
            url_image:'',
            post_content:'',  
            obj_image:{
              	ObjectFile:null, // lưu vào sever
				baseUrl64:'' //preview hiển thị lên cho người dùng xem ok k
            }  
        }
    },
    methods: {
        ...mapActions([
            'CreateNewPost'
        ]),
        handleUploadComputer(){
            return this.$refs.uploadImage.click()
        },

        // hàm render ra file peview upload từ file computer  ----> dùng file reader  --> chuyển thành url tạm
        pewviewFile(e){
          if(e.target.files && e.target.files.length){
              //console.log(e);
                const fileUpload = e.target.files[0]; // file chọn đầu tiên khi click vào nút files
                const reader = new FileReader(); // tạo FileReader

                reader.addEventListener("load", ()=> {
                    // tạo biến fileUpload = kết quả urlbase64
                   let fileMemory = reader.result;  // kết quả url lưu ở file tạm
                   this.obj_image.baseUrl64 = fileMemory;  // gán kết quả = base64 = url nhớ tạm
                   this.obj_image.ObjectFile = fileUpload;  // Lưu cả cái file đó vào sever
                }, false);

                if (fileUpload) {
                    reader.readAsDataURL(fileUpload);
                }
          }
        },
        handleUploadImages(){
            if(this.categories.length &&  this.post_content){
                if(this.obj_image.ObjectFile || this.url_image){
                    let data = {
                        category: this.categories,
                        url_image:this.url_image,
                        post_content:this.post_content,
                       
                        
                    }
                    if(this.obj_image.ObjectFile){
                        data.obj_image = this.obj_image.ObjectFile
                    }
                    
                    this.CreateNewPost(data).then(res=>{
                       
                        if(res.ok){
                             this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'success',
                                title: 'Thông báo',
                                text: 'Bạn đã đăng bài thành công!'
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
                       this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Không được để trống!'
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
        }
    },
  
    computed: {
        ...mapState({
            category:state=>state.post.category
        }),
         ////dist/images/no_image_available.jpg
        configImage(){
            if(this.url_image){
                return this.url_image
            }else if(this.obj_image.baseUrl64){
            return this.obj_image.baseUrl64
            }else{
              return '/public/images/no_image_available.jpg'
            }
        }
    },
}
</script>

<style>

</style>