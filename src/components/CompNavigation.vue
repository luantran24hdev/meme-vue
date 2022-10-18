<template>
  <nav>
        <ul class="ass1-header__menu">
            <li>
                <a href="#">Danh mục</a>
                <div class="ass1-header__nav" style="display: none;">
                    <div class="container">
                        <ul>
                            <li 
                            v-for="item in category"
                            v-bind:key="item.id"
                            ><router-link v-bind:to="getUrlCategory(item)">{{item.text}}</router-link></li>
                         
                        </ul>
                       
                    </div>
                    <div class="ass1-header__menu-transition"></div>
                </div>
            </li>
            
        </ul>
    </nav>
</template>

<script>
import {removeVietnameseFromString} from '../helpder/index'
import {mapState} from 'vuex'
export default {
    name:"comp-navigation",
    computed: {
        // ...mapGetters([
        //     'getCategory',
           
        // ]),
        ...mapState({
           category:state=>state.post.category
        }),
    
    },
   methods: {
        getUrlCategory(item){
           return {
                name:"home-page",
                query: {
                    category:removeVietnameseFromString(item.text),
                    tagIndex:item.id
                }
           }
        }
   },
  


}
</script>

<style scoped>
    .ass1-header__nav > .container ul{
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .ass1-header__nav > .container ul li {
        width: 25%;
    }
</style>