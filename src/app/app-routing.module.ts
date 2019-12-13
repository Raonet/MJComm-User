import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MydetailComponent } from './mydetail/mydetail.component';
import { ForumComponent } from './forum/forum.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { RepairComponent } from './repair/repair.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'userdetail', component: MydetailComponent},
  { path: 'forum', component: ForumComponent},
  { path: 'chat', component: ChatroomComponent},
  { path: 'repair', component: RepairComponent},
  { path: 'feedback', component: FeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
