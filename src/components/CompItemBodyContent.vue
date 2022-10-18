<template>
  <div class="ass1-section__content">
    <p v-if="query" v-html="conFigContent"></p>
    <p v-else>{{itemPosts.post_content}}</p>
    <div class="ass1-section__image">
        <router-link 
        v-bind:to="{name:'post-detail', params:{id: itemPosts.PID}}"><img v-bind:src="getImagePost"
                alt=""></router-link>
    </div>
</div>
</template>

<script>
import {replaceAll} from '../helpder'
export default {
    name:"comp-item-body-content",
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
        itemPosts:{type:Object, default:null}
    },
    computed: {
        getImagePost(){
            if(this.itemPosts.url_image){
                return this.itemPosts.url_image;
            }else{
                return '/public/images/microphone-1209816_1920.jpg';
            }
        },
         conFigContent(){
            if(this.query){
                return replaceAll(this.itemPosts.post_content,this.query, `<mark>${this.query}</mark>`)
            }else{
                return this.itemPosts.post_content
            }
        }

    },
   
}
</script>

<style>

</style>