<template>
  <header>
		<div class="ass1-header">
			<div class="container">
				
				<router-link to='/' class="ass1-logo">
					App Meme
				</router-link>
				<comp-navigation />
				<div class="ass1-header__search">
					<form action="" v-on:submit.prevent="handleSearch">
						<label>
							<input 
							v-model="stringSearch"
							type="search" name="" class="form-control" placeholder="Nhập từ khóa ...">
							<i class="icon-Search"></i>
						</label>
					</form>
				</div>
				<router-link to="/upload" class="ass1-header__btn-upload ass1-btn">
					<i class="icon-Upvote"></i> Đăng ảnh
				</router-link>
				<router-link to="/login" v-if="!isLogin" class="ass1-header__btn-upload ass1-btn">
					Đăng nhập
				</router-link>
				<!--  Đã đăng nhập thành công -->
				<div class="wrapper-user" v-else-if="currentUser">
					<span>Xin chào</span> |
					<router-link v-bind:to="{name:'profile-page', params:{id:currentUser.USERID}}" class="user-header">
						<span class="avatar">
							<img v-bind:src=formatAvatar alt="avatar">
						</span>
						
						<span class="email"> {{currentUser.email}}</span>
					</router-link>
					<div v-on:click="handleLogout" class="logout">Đăng xuất</div>
				</div>

			</div>
		</div>

	</header>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import CompNavigation from './CompNavigation'
export default {
	name:"comp-header",
	data() {
		return {
			stringSearch:this.$route.query.query
		}
	},
	

	components:{
		CompNavigation
	},
	computed: {
		...mapState({
			currentUser:state=>state.user.currentUser
		}),
		...mapGetters([
			'isLogin'
		]),
		formatAvatar(){
			if(this.currentUser && this.currentUser.profilepicture){
				return this.currentUser.profilepicture
			}else{
				return '/public/images/user-default.jpg'
			}
		}
	},
	methods: {
		...mapActions([
			'logout'
		]),
		handleLogout(){
			this.logout();
			 this.$router.push('/')
                       this.$notify({
                        group: 'noti',
                        duration: 10000,
                        type: 'success',
                        title: 'Thông báo',
                        text: 'Bạn đã đăng xuất thành công!'
                    });
			this.$router.push('/login')
		},
		handleSearch(){
			if(this.stringSearch){
				this.$router.push({
					name:'search-page',
					query:{
						query:this.stringSearch
					}
				}),
				this.stringSearch = ''
			}
		}
	
	
	},
	
}
</script>
<style scoped>
	.user-header {
		position: relative;
		color: #1e1633;
		transition: all .2s ease;
		display: inline-block;
	}
	.user-header:hover {
		color: #3482e2;
	}
	.user-header > span {
		display: inline-block;
		vertical-align: middle;
	}
	.user-header .avatar {
		width: 35px;
		height: 35px;
		margin-right: 4px;
		border-radius: 100%;
		overflow: hidden;
	}
	.user-header .avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.wrapper-user {
		position: relative;
	}
	.logout {
		right: 0;
		/* top: 100%; */
		position: absolute;
		background-color:peru;
		padding: 10px 30px;
		min-width: 150px;
		text-align: right;
		border-radius: 3px;
		box-shadow: 0 0 5px 0px rgba(0,0,0,0.1);
		z-index: 0;
		transition: all .3s ease;
		opacity: 0;
		pointer-events: none;
		cursor: pointer;
		
		color: black;
		opacity: 0;
	}
	.wrapper-user .logout:hover,
	.wrapper-user .user-header:hover + .logout {
		opacity: 1;
		z-index: 2;
		pointer-events: auto;
	}
	.ass1-header__nav > .container ul {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.ass1-header__nav > .container ul li {
		flex: 0 0 25%;
		max-width: 25%;
	}
	.ass1-header__nav > .container ul li:first-child {
		margin-top: 8px;
	}
</style>