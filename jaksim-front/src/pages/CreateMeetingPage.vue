<template>
  <JaksimHeader/>
  <main>
    <form class="create-meeting-form" @submit.prevent="onSubmit">
      
      <!-- 커버 이미지 -->
      <div class="form-group">
        <label for="cover-img">커버 이미지</label>
        <input  @input="onImageInput" type="file"  id="cover-img">
      </div>
  
      <!-- 모임명 -->
      <div class="form-group">
        <label for="meeting-name">모임명</label>
        <input v-model="meetingName" type="text" id="meeting-name" placeholder="모임 명을 입력하세요.">
      </div>
  
      <!-- 모임장 -->
      <div class="form-group">
        <label for="host-name">작성자</label>
        <input v-model="meetingWriter" type="text" id="host-name" readonly >
      </div>
  
      <!-- 미션 -->
      <div class="form-group">
        <label for="mission">미션</label>
        <input v-model="meetingMission" type="text" id="mission" placeholder="미션 내용을 입력하세요.">
      </div>
  
      <!-- 미션 요일 -->
      <div class="form-group">
        <label>미션 요일</label>
        <div class="day-checkboxes">
          <label><input v-model="meetingYoils" type="checkbox" value="월"> 월</label>
          <label><input v-model="meetingYoils" type="checkbox" value="화"> 화</label>
          <label><input v-model="meetingYoils" type="checkbox" value="수"> 수</label>
          <label><input v-model="meetingYoils" type="checkbox" value="목"> 목</label>
          <label><input v-model="meetingYoils" type="checkbox" value="금"> 금</label>
          <label><input v-model="meetingYoils" type="checkbox" value="토"> 토</label>
          <label><input v-model="meetingYoils" type="checkbox" value="일"> 일</label>
        </div>
      </div>
  
      <!-- 카테고리 -->
      <div class="form-group">
        <label>카테고리</label>
        <div class="category-radios">
          <label><input v-model="meetingCategory" type="radio" name="category" value="운동"> 운동</label>
          <label><input v-model="meetingCategory" type="radio" name="category" value="스터디"> 스터디</label>
          <label><input v-model="meetingCategory" type="radio" name="category" value="투자"> 투자</label>
          <label><input v-model="meetingCategory" type="radio" name="category" value="여행"> 여행</label>
        </div>
      </div>
  
      <!-- 설명 -->
      <div class="form-group">
        <label for="description">설명</label>
        <textarea v-model="meetingContents" id="description" rows="5" placeholder="모임에 대해 소개해 주세요."></textarea>
      </div>
  
      <!-- 제출 버튼 -->
      <div class="form-group">
        <button type="submit" class="effect-button">모임 만들기</button>
      </div>
  
    </form>
  </main>
  <JaksimFooter/>
</template>

<script setup>
import JaksimFooter from '@/components/JaksimFooter.vue';
import JaksimHeader from '@/components/JaksimHeader.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const coverImage = ref(null);
const meetingName = ref('');
const meetingWriter = ref('');
const meetingMission = ref('');
const meetingYoils = ref([]);
const meetingCategory = ref('');
const meetingContents = ref('');

function onImageInput(e){
  // e.target.files
  console.log(e.target.files[0]);
  coverImage.value = e.target.files[0];
}

async function onSubmit(){
  //formData타입 만들기
  const data = new FormData();
  data.append("meetingName", meetingName.value);
  data.append("meetingWriter", meetingWriter.value);
  data.append("meetingMission", meetingMission.value);
  data.append("meetingYoils", meetingYoils.value);
  if(coverImage.value != null){
    data.append("coverImage", coverImage.value);
  }
  data.append("meetingCategory", meetingCategory.value);
  data.append("meetingContents", meetingContents.value);

  const res = await axios.post(
    "http://localhost:8001/api/meeting",
    data , 
    {headers : {Authorization : localStorage.getItem('token')}}
  );

  alert(res.data + "번 모임이 만들어짐!");
  router.replace("/meeting/" + res.data);
}

onMounted( async ()=>{

  const token = localStorage.getItem("token");
  try{
    const res = await axios.get("http://localhost:8001/api/loggedin" , {headers : {Authorization : token} });
    meetingWriter.value = res.data.userId;
  }catch(e){
    alert("로그인 만료되었음! 다시 로그인 하시오");
    router.replace("/log-in");
  }

});

</script>

<style scoped>

main{
  max-width: 800px;
  margin:  0 auto;
  padding: 50px 20px;
}

.create-meeting-container {
  border: 4px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;

  box-shadow: 10px 10px  black;
}

h1 {
  text-align: center;
  font-weight: 900;
}

.create-meeting-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
textarea,
select {
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
}

input[type="file"] {
  margin-top: 5px;
}

textarea {
  resize: vertical;
}

.days-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.days-checkboxes label {
  display: flex;
  align-items: center;
  gap: 5px;
}


</style>