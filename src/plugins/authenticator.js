
import store from '../store'
const ifNotAuthenticated = (to,from,next)=>{
    //router chỉ cho phép vào khi chưa đăng nhập
    console.log("to", to);
    console.log("from", from);
    console.log("next", store);

    if(store.getters.isLogin === false){
        next(); // cho phép vào 
    }else{
        alert("Vui lòng đăng xuất để thực hiện chức năng này");
       
        next({
            name:"home-page",
            query:{
                redirect:to.name
            }
        })
        
    }
}

// chặn đăng nhập ở trang user-page
const ifAuthenticated = (to,from,next)=>{
    //router chỉ cho phép vào khi đăng nhập rồi không thể vào login hay register lại được
    if(store.getters.isLogin === true){
        next();
    }else{
       next({
            name:"login-page",
            query:{
                redirect:to.name
                
            }
            
        }),
        alert("Vui lòng đăng nhập để truy cập vào trang này !");
       
    }
   
}

export {
    ifNotAuthenticated,ifAuthenticated
}
