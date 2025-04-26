<template>
  <div class="auth-background">
    <form class="auth-container" @submit.prevent="onSubmit">
      <div  class="auth-head">
        <RouterLink to="/">
          <img class="logo" src="../assets/images/logo_black.png" alt="">
        </RouterLink>
        <p class="page-title">Sign In</p>
      </div>
      <div class="input-box">
        <label for="email">이메일</label>
        <input :value="userEmail" @input="onUserEmailInput" id="email" type="text" placeholder="email 입력">
        <p id="email-msg" class="status-msg err">{{userEmailErrMsg}}</p>
      </div>
      <div class="input-box">
        <label for="user-name">닉네임</label>
        <input :value="userNickName" @input="onUserNickNameInput" id="user-name" type="text" placeholder="닉네임 입력">
        <p id="user-name-msg" class="status-msg err">{{userNickNameErrMsg}}</p>
      </div>
      <div class="input-box">
        <label for="password">비밀번호</label>
        <input :value="userPassword" @input="onUserPasswordInput" id="password" type="password" placeholder="비밀번호 입력">
        <p id="password-msg" class="status-msg err">{{userPasswordErrMsg}}</p>
        <input :value="userPasswordCheck" @input="onUserPasswordCheckInput" id="password-check" type="password" placeholder="비밀번호 확인">
        <p id="password-check-msg" class="status-msg err">{{userPasswordCheckErrMsg}}</p>
      </div>
      <div class="input-box">
        <label for="find-question">본인 확인 질문</label>
        <select v-model="userPasswordQuestion" id="find-question">
          <option value="1">내가 태어난 곳은?</option>
          <option value="2">내가 처음 키운 반려동물 이름은?</option>
          <option value="3">가장 좋아하는 책은?</option>
        </select>
        <input :value="userPasswordAnswer" @input="onUserPasswordAnswerInput" id="find-answer" type="text" placeholder="응답 입력">
        <p id="find-answer-msg" class="status-msg err">{{userPasswordAnswerErrMsg}}</p>
      </div>
      <button>회원 가입!</button>
      <AuthFooter footer-location="회원가입"/>
    </form>
  </div>
  <PopUp v-if="isModalOpen" popup-title="회원가입 성공!" button-text="로그인화면으로 이동!" target-url="/log-in"/>
</template>

<script setup>
import AuthFooter from '@/components/AuthFooter.vue';
import PopUp from '@/components/PopUp.vue';
import axios from 'axios';
import { ref } from 'vue';

const isModalOpen = ref(false);

const userEmail = ref('');
const userEmailErrMsg = ref('');

const userNickName = ref('');
const userNickNameErrMsg = ref('');

const userPassword = ref('');
const userPasswordErrMsg = ref('');

const userPasswordCheck = ref('');
const userPasswordCheckErrMsg = ref('');

const userPasswordQuestion = ref('1');

const userPasswordAnswer = ref('');
const userPasswordAnswerErrMsg = ref('');


function onUserEmailInput(e){
  userEmail.value = e.target.value;
  validateUserEmail();
}

function onUserNickNameInput(e){
  userNickName.value = e.target.value;
  validateUserNickName();
}

function onUserPasswordInput(e){
  userPassword.value = e.target.value;
  validateUserPassword();
}

function onUserPasswordCheckInput(e){
  userPasswordCheck.value = e.target.value;
  validateUserPasswordCheck()
}

function onUserPasswordAnswerInput(e){
  userPasswordAnswer.value = e.target.value;
  validateUserPasswordAnswer();
}


//각각의 유효성 검사 함수 , 오류없다 --> true 오류있다-->false
async function  validateUserEmail(){
  if(userEmail.value == ''){
    userEmailErrMsg.value = '필수 입력 값입니다.';
    return false;
  }
  // email 패턴
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(! emailPattern.test(userEmail.value)){
    userEmailErrMsg.value = '이메일 형식을 지켜주세요.';
    return false;
  }

  //email이 이미 가입된 이메일이야..
  const res = await axios.get(`http://localhost:8001/api/join?email=${userEmail.value}`);
  if( res.data ){
    userEmailErrMsg.value = '이미 가입된 이메일입니다.';
    return false;
  }

  userEmailErrMsg.value = '';
  return true;
}

function validateUserNickName(){
  if(userNickName.value == ''){
    userNickNameErrMsg.value = '필수 입력 값입니다.';
    return false;
  }
  
  if(userNickName.value.length < 4){
    userNickNameErrMsg.value = '닉네임은 4글자 이상을 입력하세요.';
    return false;
  }

  if(userNickName.value.length > 20){
    userNickNameErrMsg.value = '닉네임은 20글자 이하를 입력하세요.';
    return false;
  }
  
  userNickNameErrMsg.value = '';
  return true;

}

function validateUserPassword(){
  if(userPassword.value == ''){
    userPasswordErrMsg.value = '필수 입력 값입니다.';
    return false;
  }
  
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  if(!passwordPattern.test(userPassword.value)){
    userPasswordErrMsg.value = '영문자와 숫자 그리고 특수문자의 조합이어야 합니다.';
    return false;
  }

  userPasswordErrMsg.value = '';
  return true;


}

function validateUserPasswordCheck(){
  if(userPasswordCheck.value != userPassword.value){
    userPasswordCheckErrMsg.value = '비밀번호가 일치하지 않습니다.'
    return false;
  }
  userPasswordCheckErrMsg.value = ''
  return true;
}

function validateUserPasswordAnswer(){
  if(userPasswordAnswer.value == ''){
    userPasswordAnswerErrMsg.value = '필수 입력 값입니다.';
    return false;
  }
  if(userPasswordAnswer.value.length > 20){
    userPasswordAnswerErrMsg.value = '20글자 이하를 입력하세요.';
    return false;
  }
  userPasswordAnswerErrMsg.value = '';
  return true;

}

async function onSubmit(){
  const isValidateUserEmail = validateUserEmail();
  const isValidateUserNickName = validateUserNickName();
  const isValidateUserPassword = validateUserPassword();
  const isValidateUserPasswordCheck = validateUserPasswordCheck();
  const isValidateUserPasswordAnswer = validateUserPasswordAnswer();
  if(isValidateUserEmail && isValidateUserNickName && isValidateUserPassword && 
  isValidateUserPasswordAnswer && isValidateUserPasswordCheck){
    
    try{
      // axios post요청
      await axios.post("http://localhost:8001/api/join", {
        userId: userNickName.value,
        userEmail : userEmail.value ,
        userPassword : userPassword.value,
        userPasswordQuestion : userPasswordQuestion.value,
        userPasswordAnswer: userPasswordAnswer.value
      });
      isModalOpen.value = true;

    }catch(err){
      console.log(err);
      alert('오류 발생');
    }
  }
}



</script>


<style scoped>
/* 회원가입페이지, 로그인 페이지, 비밀번호찾기페이지
  아이디 찾기 페이지에서 공통으로 사용할 디자인
*/

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