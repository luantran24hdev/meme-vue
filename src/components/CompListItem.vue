<template>
    <div class="ass1-section__item" v-if="itemPosts">
        <div class="ass1-section">
            <comp-item-body-head 
            v-bind:itemPosts="itemPosts"
            />
            <comp-item-body-content
             v-bind:itemPosts="itemPosts" 
            />
            <comp-item-body-footer
             v-bind:itemPosts="itemPosts"
             />
           
          
        </div>
     </div>
</template>

<script>

import CompItemBodyHead from './CompItemBodyHead'
import CompItemBodyContent from './CompItemBodyContent'
import CompItemBodyFooter from './CompItemBodyFooter'
export default {
    name:"comp-list-item",
    props:{
        itemPosts:{type:Object, default:null}
    },
    components:{
        CompItemBodyHead,
        CompItemBodyContent,
        CompItemBodyFooter

    },
}
</script>

<style>

</style>