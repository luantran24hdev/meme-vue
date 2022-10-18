<template>
  <div class="ass1-section__head">
        <router-link v-bind:to="{name:'user-page', params:{id: itemPosts.USERID}}" class="ass1-section__avatar ass1-avatar"><img
                v-bind:src="getAvatarHeader" alt=""></router-link>
        <div>
            <router-link 
            v-if="query"
            v-bind:to="{name:'user-page', params:{id: itemPosts.USERID}}" class="ass1-section__name" v-html="conFigFullname"></router-link>
            <router-link 
            v-else
            v-bind:to="{name:'user-page', params:{id: itemPosts.USERID}}" class="ass1-section__name">{{itemPosts.fullname}}</router-link>
            <span class="ass1-section__passed">{{getTimeRelative}}</span>  
        </div>
    </div>
</template>

<script>
import {replaceAll} from '../helpder'
import moment from 'moment';
moment.locale('vi'); 

export default {
    
    name:"comp-item-body-head",
    data() {
        return {
            query:this.$route.query.query,
        }
    },  
    watch: {
        '$route'(to,from){
            this.query = to.query.query
        }
    },
    props:{
        itemPosts:{type:Object, default:{}}
    },
    computed: {
        getAvatarHeader(){
            if(this.itemPosts.profilepicture){
                return this.itemPosts.profilepicture;
            }else{
                 return '/public/images/avatar-04.png'
            }
        },
        getTimeRelative(){
            
            return moment(this.itemPosts.time_added).startOf('day').fromNow()
        },
        conFigFullname(){
            if(this.query){
                return replaceAll(this.itemPosts.fullname,this.query, `<mark>${this.query}</mark>`)
            }else{
                return this.itemPosts.fullname
            }
        }
      
    },
}
</script>

<style>
    .ass1-section__head{
        text-transform:capitalize;
    }
</style>
