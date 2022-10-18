import { parseJwt } from "../../helpder";
export default {
    isLogin(state){
        let userObj = parseJwt(state.ACESS_TOKEN);
        if(userObj){
           return true
        }else {
            return false;
        }
    },

    getListPostByUserid(state){
        return state.posts.posts; //posts = cả data = (message, posts, status)
    },


    getDashboard(state){
        return state.listTask.posts;
    }
}