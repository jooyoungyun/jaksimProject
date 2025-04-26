<template>
  <div class="auth-background">
    <form class="auth-container">
      <div class="auth-head">
        <RouterLink to="/"><img class="logo" src="../assets/images/logo_black.png" alt="logo"></RouterLink>
        <p class="page-title">Find ID</p>
      </div>
      <div class="input-box">
        <label for="email">이메일</label>
        <input type="text" id="email" placeholder="email 입력">
      </div>
      <div class="input-box">
        <label for="find-question">본인 확인 질문</label>
        <select name="" id="find-question">
          <option value="1">내가 태어난 곳은?</option>
          <option value="2">내가 처음 키운 반려동물 이름은?</option>
          <option value="3">가장 좋아하는 책은?</option>
        </select>
        <input id="find-answer" type="text" placeholder="응답 입력">
      </div>
      <button>ID 찾기!</button>
      <AuthFooter footer-location="ID찾기"/>
    </form>
  </div>
</template>

<script setup>
import AuthFooter from '@/components/AuthFooter.vue';

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