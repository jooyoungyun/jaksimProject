<template>
  <div class="auth-foot">
    <RouterLink v-if="footerLocation != '회원가입'" to="/sign-in">회원가입</RouterLink>
    <div v-if="footerLocation != '회원가입'" class="vertical-line"></div>
    <RouterLink v-if="footerLocation != '로그인'" to="/log-in">로그인</RouterLink>
    <div v-if="footerLocation != '로그인'" class="vertical-line"></div>
    <RouterLink v-if="footerLocation != 'ID찾기'" to="/find-id">ID 찾기</RouterLink>
    <div v-if="footerLocation != 'ID찾기' && footerLocation != '비밀번호찾기'" class="vertical-line"></div>
    <RouterLink v-if="footerLocation != '비밀번호찾기'" to="/find-pw">비밀번호 찾기</RouterLink>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({footerLocation : String});
</script>

<style scoped>

.auth-foot {
  display: flex;
  justify-content: center;
  column-gap: 10px;
  align-items: center;
}

.vertical-line {
  border-right: 1px solid silver;
  height: 15px;
}
</style>