import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import Register from './pages/RegisterPage.vue'
import Repassword from './pages/Repassword.vue'
import Upload from './pages/UploadFile.vue'
import PostDetail from './pages/PostDetaill.vue'
import ProfilePage from "./pages/ProfilePage.vue";
import UserPage from "./pages/UserPage.vue";
import ChangePassword from "./pages/ChangePassword.vue";
import Search from './pages/Search.vue'
// import DashboardListPosts from './pages/ListPost.vue'
import DashboardListUser from "./components/DashboardListPosts.vue";
import Admin from './components/Admin.vue'


import { ifNotAuthenticated, ifAuthenticated } from "./plugins/authenticator";

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "home-page"
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login-page",
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/register",
    component: Register,
    name: "register-page",
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/repassword",
    component: Repassword,
    name: "repassword-page"
  },
  {
    path: "/upload",
    component: Upload,
    name: "upload-page",
    beforeEnter: ifAuthenticated
  },
  {
    path: "/post-detail/:id",
    component: PostDetail,
    name: "post-detail"
  },
  // {
  //   path: "/dashboard/posts",
  //   component: DashboardListPosts,
  //   name: "dashboard-posts"
  // },

  {
    path: "/dashboard/posts",
    component: Admin,
    name: "dashboard-posts",
    beforeEnter: ifAuthenticated
  },
  {
    path: "/dashboard/edit-user/:id",
    component: DashboardListUser,
    name: "dashboard-users",
    beforeEnter: ifAuthenticated
  },
  {
    path: "/user/:id/profile/",
    component: ProfilePage,
    name: "profile-page",
    beforeEnter: ifAuthenticated
  },
  {
    path: "/user/:id",
    component: UserPage,
    name: "user-page",
    beforeEnter: ifAuthenticated
  },

  {
    path: "/change-password/:id/profile/",
    component: ChangePassword,
    name: "change-password",
    beforeEnter: ifAuthenticated
  },

  {
    path: "/search",
    component: Search,
    name: "search-page"
  }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;
