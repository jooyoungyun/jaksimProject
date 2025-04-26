<template>
  <header>
    <RouterLink to="/">
      <img class="main-logo" src="../assets/images/logo_black.png" alt="logo">
    </RouterLink>
    <div class="auth-box">
      <button class="effect-button">LOGIN</button>
      <button class="effect-button">JOIN</button>
      <button class="effect-button">새로운 모임 만들기</button>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  /* fixed --> 밑에 깔려있음 */
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  z-index: 20;
}

.main-logo{
  width: 150px;
}

@media screen and (min-width:1024px) {
  header{
    padding: 5px 100px;
  }
}
</style>