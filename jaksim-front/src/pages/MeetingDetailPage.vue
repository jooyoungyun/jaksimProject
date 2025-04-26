<template>
  <JaksimHeader/>
  <main v-if="meeting != null">
    <div class="admin-buttons">
      <button class="edit-btn">수정</button>
      <button class="delete-btn">삭제</button>
    </div>
    <div class="meeting-detail-container">
      <div class="meeting-cover" 
        :style=" {
          backgroundImage : 
            meeting.coverImageUrl != null ? 
              `url('http://localhost:8001/api/image/${meeting.coverImageUrl}')` : 
              `url('http://localhost:8001/api/image/default_cover.png')`
            } "
      >
        <h2>{{meeting.meetingName}}</h2>
      </div>
      <div class="meeting-info">
        <div class="info-header">미션 요일</div>
        <div class="info-value">
          <p v-for=" yoil in meeting.meetingYoils" v-bind:key="yoil">
            {{yoil}}요일
          </p>
        </div>
        <div class="info-header">미션</div>
        <div class="info-value">
          {{meeting.meetingMission}}
        </div>
      </div>
      <div class="meeting-detail">
        {{meeting.meetingContents}}
      </div>

    </div>
    
  </main>
  <main v-else>
    로딩중 입니다...
  </main>
  <JaksimFooter/>
</template>

<script setup>
import JaksimFooter from '@/components/JaksimFooter.vue';
import JaksimHeader from '@/components/JaksimHeader.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const meeting = ref(null);


async function fetchMeeting(){
  const res = await axios.get(
    "http://localhost:8001/api/meeting/" + route.params.id , 
    {headers : {Authorization : localStorage.getItem('token')}}
  );
  meeting.value = res.data;
  console.log(res.data);

}

onMounted(()=>{
  fetchMeeting();

});

</script>

<style scoped>
main{
  max-width: 800px;
  margin : 30px auto;
  padding: 0 20px;
}

.meeting-detail-container {
  border: 4px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  box-shadow: 10px 10px black;
}

.meeting-detail {
  min-height: 300px;
}

.meeting-cover {

  
  background-position: center;
  background-size: cover;
  height: 200px;
  border-radius: 30px;

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.meeting-cover h2 {
  text-shadow: -1px 0px rgba(255, 255, 255, 0.347), 0px 1px rgba(255, 255, 255, 0.347), 1px 0px rgba(255, 255, 255, 0.347), 0px -1px rgba(255, 255, 255, 0.347);
  font-weight: 900;
}

.meeting-info {
  padding: 20px 0;
  display: grid;
  grid-template-columns: 150px 1fr;
  row-gap: 20px;
}

.info-header {
  border-right: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.info-value {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 20px;
}

.week-calendar {
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
}

.week-days {
  display: flex;
  flex-direction: column;
  border: 3px dashed black;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 50px;

  font-size: 12px;
  cursor: pointer;
  transform: translateY(-8px);
  transition: 0.3s;
}

.week-days.selected {
  background-color: #f8f8f8;
  border-style: solid;
  border-bottom: none;
  transform: translateY(6px);
  position: relative;
}

.complete-detail {
  background-color: #f8f8f8;
  border: 3px solid black;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.complete-member {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}


.member-container {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 15px;
}

.member-container .profile {
  width: 50px;
  height: 50px;
}


/* 팝업창 스타일 */

.popup {
  display: none; /* 숨김 상태 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.popup-content {
  background-color: #fff;
  border: 3px solid black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 600px;
  padding: 20px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.close-btn:hover {
  color: red;
}

.popup-header {
  text-align: center;
  margin-bottom: 20px;
}

.popup-header h1 {
  font-size: 24px;
  font-weight: bold;
}

.popup-header p {
  color: #666;
  font-size: 16px;
}

.verify-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group textarea {
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  resize: vertical;
  font-size: 16px;
}

.form-group input[type="file"] {
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
}

.submit-btn {
  align-self: center;
  background-color: #6CD5E9;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #4aabcb;
}

/* 관리자 버튼 스타일 */
.admin-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.edit-btn, .delete-btn {
  background-color: #6CD5E9;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #4aabcb;
}

.delete-btn {
  background-color: #ff6b6b;
}

.delete-btn:hover {
  background-color: #ff4a4a;
}


/* 태블릿 기준 디자인 */
@media screen and (min-width:700px) {
  .complete-member {
    grid-template-columns: 1fr 1fr;
  }
}



/* 웹 기준 디자인 */
@media screen and (min-width:1024px) {

  .complete-member {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>