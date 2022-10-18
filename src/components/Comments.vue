<template>
  <div class="ass1-comments__section">
    <a href="#" class="ass1-comments__avatar ass1-avatar"><img v-bind:src="configAvatar" alt=""></a>
    <div class="ass1-comments__content">
        <a href="#" class="ass1-comments__name">{{comments.fullname}}</a>
        <span class="ass1-comments__passed">{{getTimeRelative}}</span>
        <p>{{comments.comment}}</p>
        <div class="ass1-comments__info">
            <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i><span>901</span></a>
            <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i><span>36</span></a>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
moment.locale('vi'); 
export default {
     name:'comments',
    props:{
        comments:{type:Object, default:null}
    },
    computed:{
          getTimeRelative(){
            
            return moment(this.comments.time_added).startOf('day').fromNow()
        },
        configAvatar(){
            if(this.comments.profilepicture){
                return this.comments.profilepicture
            }else{
                return '/public/images/avatar-02.png'
            }
        }
    }
   

}
</script>

<style>

</style>