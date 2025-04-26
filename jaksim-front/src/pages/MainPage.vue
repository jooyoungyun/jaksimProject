<template>
  <JaksimHeader/>
  <div class="banner">
    <img class="banner-img" src="../assets/images/superman.png" alt="">
    <div class="banner-content">
      <div class="category-container">
        <div style="display: contents;" 
          v-for="ca in categoryList"
          :key="ca.categoryId"
        >
          <input 
            type="radio" 
            name="category" 
            :id="ca.categoryId" 
            :value="ca.categoryValue"
            v-model="category"
            @change="fetchMeetingList()"
          />
          <label :for="ca.categoryId">{{ca.categoryText}}</label>
        </div>
      </div>
      <input :value="keyword" @input="onKeywordInput" @keyup.enter="fetchMeetingList()" class="search-bar" type="search" placeholder="SEARCH">
    </div>
  </div>
  <main>
    <div class="main-header">
      <h2 class="main-title">JAKSIM 모임</h2>
      <p class="main-sub">총 {{totalElements}}개의 모임이 있어요~!</p>
    </div>
    <div class="meeting-container">
      <div v-for="meeting in meetingList" v-bind:key="meeting.meetingId" class="card">
        <div class="card-header">
          <img class="meeting-leader-profile" src="../assets/images/profile1.jpg" alt="">
          <h2 class="card-title">{{ meeting.meetingName }}</h2>
          <p>{{ meeting.likedCnt }}</p>
          <button v-if="meeting.isLiked" class="icon-button" @click="onLikeDelete(meeting.meetingId)">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
            </svg>
          </button>
          <button v-else class="icon-button" @click="onLikeCreate(meeting.meetingId)">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
            </svg>
          </button>
          <button class="effect-button"><b>&gt;</b></button>
        </div>
        <img class="card-cover" :src="`http://localhost:8001/api/image/${meeting.coverImageUrl || 'default_cover.png'}`" alt="">
        <div class="card-body">
          우리는 <br/>
          매주 
          <span v-for="yoil in meeting.meetingYoils" v-bind:key="yoil" class="weekday"
            :class="{
              mon : yoil == '월',
              tue : yoil == '화',
              wed : yoil == '수',
              thu : yoil == '목',
              fri : yoil == '금',
              sat : yoil == '토',
              sun : yoil == '일'
            }"
          >
            {{yoil}}
          </span>
          마다 <br/>
          <span class="mission">{{meeting.meetingMission}}</span>
          미션을 수행합니다!
        </div>
        <div class="card-footer">
          <span class="category">{{meeting.meetingCategory}}</span>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button :disabled="pageGroup[0] == 1" @click="goToPrevGroup()" class="effect-button" >&lt;</button>
      <button class="effect-button" 
        v-for="page in pageGroup"
        v-bind:key="page"
        :class="{ active : page == currentPage }"
        @click="fetchMeetingList( page )"
      >{{page}}</button>
      <button :disabled="pageGroup[pageGroup.length - 1] == lastPage" @click="goToNextGroup()" class="effect-button" >&gt;</button>
    </div>
  </main>
  <JaksimFooter/>
</template>

<script setup>
import JaksimFooter from '@/components/JaksimFooter.vue';
import JaksimHeader from '@/components/JaksimHeader.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

//화면상에 그릴 cateogry 리스트()
const categoryList = [
  {categoryId : "all", categoryValue : "all", categoryText : "ALL"},
  {categoryId : "invest", categoryValue : "투자", categoryText : "투자"},
  {categoryId : "study", categoryValue : "스터디", categoryText : "스터디"},
  {categoryId : "work-out", categoryValue : "운동", categoryText : "운동"},
  {categoryId : "travel", categoryValue : "여행", categoryText : "여행"},
];

// 사용자가 입력한 radio버튼 값
const category = ref("all");
// 사용자가 입력한 keyword 값
const keyword = ref("");

function onKeywordInput(e){
  keyword.value = e.target.value;
}


const meetingList = ref([]);
const totalElements = ref(0);
const pageGroup = ref([]);
const currentPage = ref(1);
const lastPage = ref(1); 

// pageGroup을 계산하는 함수
function calculatePageGroup() {
  const groupSize = 5;
  const start = Math.floor((currentPage.value - 1) / groupSize) * groupSize + 1;
  const end = Math.min(start + groupSize - 1, lastPage.value);

  pageGroup.value = [];
  for (let i = start; i <= end; i++) {
    pageGroup.value.push(i);
  }
}
// 앞 화살표 클릭 시 실행할 함수
function goToPrevGroup() {
  const prevGroupStart = pageGroup.value[0] - 5;
  if (prevGroupStart >= 1) {
    fetchMeetingList(prevGroupStart);
  }
}
//뒤 화살표 클릭시 실행할 함수
function goToNextGroup() {
  const nextGroupStart = pageGroup.value[0] + 5;
  if (nextGroupStart <= lastPage.value) {
    fetchMeetingList(nextGroupStart);
  }
}

// 좋아요 클릭 함수
async function onLikeCreate(meetingId) {
  axios.post(`http://localhost:8001/api/meeting/${meetingId}/like`,null, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
    .then(res => {
      console.log(res);
      let meeting = res.value.find(item => item.meetingId === meetingId);
      if (meeting) {
        meeting.isLiked = true;
        meeting.likedCnt += 1;
      }
      fetchMeetingList(currentPage.value);
    })
    .catch(err => {
      console.error(err);
      alert("오류 발생..");
    });
}

async function onLikeDelete(meetingId) {
  axios.delete(`http://localhost:8001/api/meeting/${meetingId}/like`,null, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
    .then(res => {
      console.log(res);
      fetchMeetingList(currentPage.value);
    })
    .catch(err => {
      console.error(err);
      alert("오류 발생..");
    });
}

// data 불러오기 함수 만들기
async function fetchMeetingList(page = 1){
  try{
    const res = await axios.get("http://localhost:8001/api/meeting" , 
    { params :{
        size : 1,
        page : page ,
        keyword : keyword.value , 
        category : category.value
      }, 
      headers : {
        Authorization : localStorage.getItem('token')
      } 
    } );
    if(res == null){
      alert("결과가 없음...");
      return;
    }
    meetingList.value = res.data.contents;
    totalElements.value = res.data.totalElements;
    currentPage.value = res.data.currentPage;
    lastPage.value = res.data.lastPage;
    calculatePageGroup();


  }catch(e){
    console.log(e);
    alert("오류 발생..");
  }
}

onMounted(()=>{
  fetchMeetingList();
});

watch( keyword, ( newValue )=>{
  if(newValue == ''){
    fetchMeetingList(1);
  }
} );


</script>

<style scoped>
.icon-button{
  background-color: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  justify-content: center;
  align-items: center;
}

button:disabled{
  border-color: silver;
  transform: translateY(3px);
  box-shadow: none;
  cursor: not-allowed;

}

/* search banner 디자인 시작 */
.banner{
  /* background-color: #6CD5E9; */
  background-image: linear-gradient(to bottom, white, #6CD5E9);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
}
.banner-img{
  width: 50%;
  min-width: 300px;
  max-width: 580px;
  /* box-shadow: 0 0 15px black; */
  filter: drop-shadow(0 0 15px black);
  animation-name: fly;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.banner-content{
  position: absolute;
  bottom: 30%;
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 900px;
  min-width: 400px;
}

.category-container{
  transform: skewY(-5deg);
  position: relative;
  margin-bottom: -10px;
  z-index: 1;
}

.category-container label{
  background-color: black;
  box-shadow: 5px 5px #6CD5E9;
  color: white;
  cursor: pointer;
  padding: 2px 6px;
  transition: 0.3s;
  font-weight: 900;
}

.category-container label:hover, .category-container input:checked+label{
  background-color: #6CD5E9;
  color: black;
  box-shadow: 0 0 15px black;
}
.category-container input{
  display: none;
}

.search-bar{
  color: white;
  background-color: black;
  padding: 15px 20px 10px;
  font-size: 25px;
  box-shadow: 0 0 15px black;
  border: none;
  outline: none;
  font-weight: bold;
  transform: skewY(-5deg);
  position: relative;
}
/* search banner 디자인 끝 */

main{
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
}

.meeting-container{
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr;
  margin-top: 30px;
  margin-bottom: 30px;
}

.pagination{
  margin: 0 auto;
}

.active{
  background-color: #6cd5e9;
  transform: translateY(3px);
  box-shadow: none;
}

/* card 디자인시작 */
.card{
  border: 3px solid black;
  box-shadow: 5px 5px black;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.card-header{
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.meeting-leader-profile{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.card-title{
  flex-grow: 1;
  font-size: 18px;
}

.card-cover{
  width: 100%;
  border-radius: 7px;
}

.card-body{
  font-size: 16px;
  line-height: 200%;
}

.weekday , .mission{
  background-color: #2d2d2d;
  padding: 2px 4px;
  border-radius: 3px;
}

.mon{color:#dcecaa }
.tue{color: #3bff8d}
.wed{color: #ffa845}
.thu{color: #ff6b6b}
.fri{color: #93a6ff}
.sat{color: #aafff1}
.sun{color: #cfb5ff}

.mission{
  color: #ff26db;
}

.card-footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category{
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #6cd5e9;

}

.participants{
  display: flex;
}

.profile{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid silver;
  margin-left: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
}

@media screen and (min-width:600px) {
  .meeting-container{
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width:900px) {
  .meeting-container{
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (min-width: 1024px) {
  .meeting-container{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

</style>