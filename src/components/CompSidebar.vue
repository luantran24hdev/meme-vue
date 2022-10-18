<template>
   <div class="col-lg-4">
        <aside class="ass1-aside">
            <div class="ass1-content-head__t" v-if="isLogin">
                <div>Bài viết gần đây của bạn.</div>
            </div>
            <div v-else>Vui lòng đăng nhập để xem được nội dung này !
                <router-link to="/login">Đăng nhập</router-link>
            </div>
             <template v-if="getListPostByUserid && getListPostByUserid.length && isLogin">
                <comp-list-item 
                    v-for="item in getListPostByUserid"
                    v-bind:key="item.PID"
                    v-bind:itemPosts="item"
                />
             </template>

        </aside>
    </div>
</template>

<script>
import CompListItem from '../components/CompListItem'
import {mapGetters} from 'vuex'
export default {
    name:"comp-sidebar",
    computed: {
        ...mapGetters([
            'getListPostByUserid',
            'isLogin'
        ]),
        created() {
            this.getListPostByUserid();
        },
       
    },
    components:{
        CompListItem
    }
}
</script>

<style>
</style>