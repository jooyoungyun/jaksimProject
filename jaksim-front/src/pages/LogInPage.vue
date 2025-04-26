<template>
  <div class="auth-background">
    <form class="auth-container" @submit.prevent="onSubmit">
      <div class="auth-head">
        <RouterLink to="/"><img class="logo" src="../assets/images/logo_black.png" alt="logo"></RouterLink>
        <p class="page-title">Log In</p>
      </div>
      <div class="input-box">
        <label for="user-name">아이디</label>
        <input v-model="userId" type="text" id="user-name" placeholder="아이디 입력" />
      </div>
      <div class="input-box">
        <label for="password">비밀번호</label>
        <input v-model="userPassword" type="password" id="password" placeholder="비밀번호 입력" />
      </div>
      <p id="login-msg" style="margin-top: -30px;" class="err status-msg">{{loginErrMsg}}</p>
      <button>로그인!</button>
      <AuthFooter footer-location="로그인"/>
    </form>
  </div>
  <PopUp v-if="isModalOpen" popup-title="로그인 성공!" button-text="메인으로 이동!" target-url="/" />
</template>

<script setup>
import AuthFooter from '@/components/AuthFooter.vue';
import PopUp from '@/components/PopUp.vue';
import axios from 'axios';
import { ref } from 'vue';

const userId = ref("");
const userPassword = ref("");
const loginErrMsg = ref("");
const isModalOpen = ref(false);

async function onSubmit(){
  try{
    const res = await axios.post("http://localhost:8001/api/login", {
      userId : userId.value,
      userPassword : userPassword.value
    });
    // 응답 header의 Authorization부분
    console.log(res.headers.getAuthorization());
    localStorage.setItem("token" , res.headers.getAuthorization());
    loginErrMsg.value = "";
    isModalOpen.value = true;
    
  }catch(err){
    console.log(err);
    if(err.status == 401){
      loginErrMsg.value = "아이디 또는 비밀번호를 확인하세요.";
    }else{
      alert('오류 발생! 관리자에게 문의하세요');
    }
  }
}


</script>

<style scoped>

.auth-background{
  display: flex;
  justify-content: center;
  padding: 50px 30px 100px;

  background-image: url(../assets/images/auth-back.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.auth-container{
  border: 4px solid black;
  width: 500px;
  padding: 20px 10px;

  display: flex;
  flex-direction: column;
  row-gap: 40px;

  box-shadow: 15px 15px black;
  backdrop-filter: blur(15px);
}

.auth-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo{
  height: 70px;
}

.page-title{
  font-size: 30px;
  font-weight: 900;
  font-family: "Ubuntu", sans-serif;
}

.input-box{
  border: 3px solid black;
  padding: 25px 20px 10px;

  display: flex;
  flex-direction: column;
  row-gap: 5px;

  position: relative;
}

.input-box input, .input-box select{
  border: 3px solid black;
  padding: 10px 5px;
}

.auth-container button{
  background-color: #6CD5E9;
  border: 3px solid black;
  padding: 20px;
}

.input-box label{
  border: 3px solid black;
  background-color: #6CD5E9;
  padding: 2px 5px;
  position: absolute;
  top: -25px;
  left: 2px;
}

.status-msg{
  font-size: 14px;
  padding-left: 10px;
}

.status-msg.active{
  display: block;
}


.social-login{
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
}

.auth-container .kakao-btn{
  border: none;
  background-color: #FEE500;
  padding: 12px;
  color: #000000D9;
}

.auth-container .naver-btn{
  border: none;
  background-color: #03C75A;
  padding: 12px;
  color: white;
}

.auth-foot{
  display: flex;
  justify-content: center;
  column-gap: 10px;
  align-items: center;
}

.vertical-line{
  border-right: 1px solid silver;
  height: 15px;
}
</style>