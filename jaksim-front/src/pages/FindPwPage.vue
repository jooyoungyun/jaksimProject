<template>
  <div class="auth-background">
    <form class="auth-container">
      <div class="auth-head">
        <RouterLink to="/">
          <img class="logo" src="../assets/images/logo_black.png" alt="logo">
        </RouterLink>
        <p class="page-title">Find Password</p>
      </div>
      <div class="input-box">
        <label for="email">이메일</label>
        <input id="email" type="text" placeholder="email 입력">
      </div>
      <div class="input-box">
        <label for="user-name">닉네임</label>
        <input id="user-name" type="text" placeholder="닉네임 입력">
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
      <div class="input-box">
        <label for="password">새로 사용할 비밀번호</label>
        <input id="password" type="password" placeholder="새 비밀번호 입력">
        <p class="status-msg err">8글자 이상으로 설정해 주세요.</p>
        <input type="password" id="password-check" placeholder="비밀번호 확인">
        <p class="status-msg err">비밀번호가 일치하지 않습니다.</p>
      </div>
      <button>비밀번호 변경!</button>
      <AuthFooter footer-location="비밀번호찾기"/>
    </form>
  </div>
</template>

<script setup>
import AuthFooter from '@/components/AuthFooter.vue';

</script>

<style scoped>
/* 회원가입페이지, 로그인 페이지, 비밀번호찾기페이지
  아이디 찾기 페이지에서 공통으로 사용할 디자인
*/
.auth-background {
  display: flex;
  justify-content: center;
  padding: 50px 30px 100px;

  background-image: url(../assets/images/auth-back.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.auth-container {
  border: 4px solid black;
  width: 500px;
  padding: 20px 10px;

  display: flex;
  flex-direction: column;
  row-gap: 40px;

  box-shadow: 15px 15px black;
  backdrop-filter: blur(15px);
}

.auth-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 70px;
}

.page-title {
  font-size: 30px;
  font-weight: 900;
  font-family: "Ubuntu", sans-serif;
}

.input-box {
  border: 3px solid black;
  padding: 25px 20px 10px;

  display: flex;
  flex-direction: column;
  row-gap: 5px;

  position: relative;
}

.input-box input,
.input-box select {
  border: 3px solid black;
  padding: 10px 5px;
}

.auth-container button {
  background-color: #6CD5E9;
  border: 3px solid black;
  padding: 20px;
}

.input-box label {
  border: 3px solid black;
  background-color: #6CD5E9;
  padding: 2px 5px;
  position: absolute;
  top: -25px;
  left: 2px;
}

.status-msg {
  font-size: 14px;
  padding-left: 10px;
}

.status-msg.active {
  display: block;
}


.social-login {
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
}

.auth-container .kakao-btn {
  border: none;
  background-color: #FEE500;
  padding: 12px;
  color: #000000D9;
}

.auth-container .naver-btn {
  border: none;
  background-color: #03C75A;
  padding: 12px;
  color: white;
}

</style>