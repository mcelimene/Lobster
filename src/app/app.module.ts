import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { ProfilPage } from '../pages/home/profil/profil';
import { ConversationsPage } from '../pages/home/conversations/conversations';
import { MessagesPage } from '../pages/home/messages/messages';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from "../pages/signup/signup";
import { InfosPage } from "../pages/signup/infos/infos";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandesPage } from '../pages/home/demandes/demandes';
import { RadarPage } from '../pages/radar/radar';
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../services/user.service';
import { MenuPage } from '../pages/menu/menu';
import { DisconnectionPage } from '../pages/disconnection/disconnection';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    ProfilPage,
    ConversationsPage,
    MessagesPage,
	HomePage,
	TabsPage,
	SigninPage,
	SignupPage,
	InfosPage,
    WelcomePage,
    DemandesPage,
	RadarPage,
	MenuPage,
	DisconnectionPage,
	SettingsPage
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp, { tabsPlacement: 'bottom' }),
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilPage,
    HomePage,
    ConversationsPage,
    MessagesPage,
    WelcomePage,
	SigninPage,
	SignupPage,
	InfosPage,
	TabsPage,
    DemandesPage,
	RadarPage,
	MenuPage,
	DisconnectionPage,
	SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
	Geolocation,
	UserService
  ]
})
export class AppModule {}
