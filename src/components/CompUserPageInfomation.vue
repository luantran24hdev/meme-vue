<template>
  <div class="ass1-head-user">
        <div class="ass1-head-user__content" v-if="userInfo">
            <div class="ass1-head-user__image"><a href="#"><img v-bind:src="getAvatar" alt=""></a></div>
            <div class="ass1-head-user__info">
                <div class="ass1-head-user__info-head">
                    <div class="ass1-head-user__name">
                        <span>{{userInfo.fullname}}</span> 
                        <i><img src="/public/fonts/emotion/svg/Verified.svg" alt=""></i>
                    </div>
                    <div class="w-100"></div>
                    <a v-if="userInfo.USERID != currentUser.USERID" href="#" class="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>
                    <template v-else>
                        <router-link v-bind:to="{name:'change-password',params:{id:currentUser.USERID}}" class="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</router-link>
                        <router-link v-bind:to="{name:'profile-page',params:{id:currentUser.USERID}}" class="ass1-head-user__btn-follow ass1-btn">Profile</router-link>
                    </template>
                    <router-link to="/dashboard/posts" class="ass1-head-user__btn-follow ass1-btn">Quản lý danh sách bài viết</router-link>
                    <!-- <router-link v-bind:to="{name:'profile-page',params:{id:currentUser.USERID}}" class="ass1-head-user__btn-follow ass1-btn">Quản lý user</router-link> -->
                    <!-- <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> -->
                </div>
                <div class="ass1-head-user__info-statistic">
                    <div class="ass1-btn-icon"><i class="icon-Post"></i><span>Bài viết: {{listPost.length}}</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Followers"></i><span>Theo dõi: 0</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Following"></i><span>Đang theo dõi: 0</span></div>
                    <!-- <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> -->
                </div>
                <p>{{userInfo.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'comp-user-page-infomation',
    props: {
        userInfo:{type:Object,default:null},
        listPost:{type:Array,default:[]},
        currentUser:{type:Object,default:null}
    },
    computed: {
        getAvatar(){
           if(this.userInfo){
               return this.userInfo.profilepicture
           }else{
               return '/public/images/cat-1634369_1920.jpg'
           }
        }
    },
}
</script>

<style>

</style>