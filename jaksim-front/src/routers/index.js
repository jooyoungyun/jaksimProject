import CreateMeetingPage from "@/pages/CreateMeetingPage.vue";
import FindIdPage from "@/pages/FindIdPage.vue";
import FindPwPage from "@/pages/FindPwPage.vue";
import LogInPage from "@/pages/LogInPage.vue";
import MainPage from "@/pages/MainPage.vue";
import MeetingDetailPage from "@/pages/MeetingDetailPage.vue";
import SignInPage from "@/pages/SignInPage.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [ 
  {path:'/' ,  component : MainPage } ,
  {path : '/sign-in' , component : SignInPage},
  {path : '/log-in' , component : LogInPage},
  {path : '/find-id' , component : FindIdPage},
  {path : '/find-pw' , component : FindPwPage},
  {path : '/create-meeting' , component : CreateMeetingPage},
  {path : '/meeting/:id' , component : MeetingDetailPage},
];


const router = createRouter({
  history : createWebHistory() , 
  routes : routes
});

export default router;