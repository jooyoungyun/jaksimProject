<template>
  <div class="modal-wrapper">
    <div class="modal">
      <img src="../assets/images/logo_black.png" alt="">
      <h2>{{ popupTitle }}</h2>
      <RouterLink :to="targetUrl">{{buttonText}}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({popupTitle : String, buttonText : String , targetUrl : String});


</script>

<style scoped>
.modal-wrapper{
  position: fixed;
  backdrop-filter: blur(5px);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  align-items: center;
  justify-content: center;

  display: flex;
}

.modal-wrapper.active {
  display: flex;
}

.modal{
  border: 3px solid black;
  background-color: white;
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 25px;
}

.modal img{
  width: 200px;
}

.modal a{
  background-color: #6cd5e9;
  border: 2px solid black;
  padding: 3px 10px;
  color: black;
}
</style>