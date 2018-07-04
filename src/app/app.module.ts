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
import { SettingsPage } from '../pages/settings/settings';
import { RadarService } from '../services/radar.service';
import { ContactsPage } from '../pages/contacts/contacts';
import { RecherchesPage } from '../pages/radar/recherches/recherches';
import { SignOutPage } from '../pages/signout/signout';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
	SignupPage,
	InfosPage,
	SigninPage,
	HomePage,
    ProfilPage,
	RadarPage,
	RecherchesPage,
	ContactsPage,
    DemandesPage,
    MessagesPage,
    ConversationsPage,
	MenuPage,
	TabsPage,
	SettingsPage,
	SignOutPage
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
	WelcomePage,
	SignupPage,
	InfosPage,
	SigninPage,
	HomePage,
	ProfilPage,
	RadarPage,
	RecherchesPage,
	ContactsPage,
	DemandesPage,
	MessagesPage,
	ConversationsPage,
	MenuPage,
	TabsPage,
	SettingsPage,
	SignOutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
	UserService,
	Geolocation,
	RadarService
  ]
})
export class AppModule {}
