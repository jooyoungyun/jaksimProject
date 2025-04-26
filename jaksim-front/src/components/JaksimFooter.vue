<template>
<footer>
    <div class="footer-content">
      <RouterLink to="/">
        <img src="../assets/images/logo_gray.png" alt="" class="footer-logo">
      </RouterLink>
      <div class="footer-copyright">
        &copy; 2025 JAKSIM. All rights reserved
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
footer{
  background-color: #333333;
  color: white;
  padding: 20px 10px;
  
}

.footer-content{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer-logo{
  width: 150px;
}

@media screen and (min-width:1024px) {
  footer{
    padding: 5px 100px;
  }
}
</style>