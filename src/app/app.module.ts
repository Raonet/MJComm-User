import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { WelcomeComponent } from './welcome/welcome.component';
import { MydetailComponent } from './mydetail/mydetail.component';
import { ForumComponent } from './forum/forum.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { RepairComponent } from './repair/repair.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { EditorComponent } from './editor/editor.component';
import { NewDetailComponent } from './new-detail/new-detail.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';
import { ChatComponent } from './chat/chat.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MydetailComponent,
    ForumComponent,
    ChatroomComponent,
    RepairComponent,
    FeedbackComponent,
    UserLoginComponent,
    RegisterComponent,
    MenuComponent,
    EditorComponent,
    NewDetailComponent,
    ForumDetailComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
