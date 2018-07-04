import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importation des pages
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { SignupPage } from "../pages/signup/signup";
import { InfosPage } from "../pages/signup/infos/infos";
import { SigninPage } from '../pages/signin/signin';
import { ProfilPage } from '../pages/home/profil/profil';
import { RadarPage } from '../pages/radar/radar';
import { RecherchesPage } from '../pages/radar/recherches/recherches';
import { ContactsPage } from '../pages/contacts/contacts';
import { DemandesPage } from '../pages/home/demandes/demandes';
import { MessagesPage } from '../pages/home/messages/messages';
import { ConversationsPage } from '../pages/home/conversations/conversations';

import { MenuPage } from '../pages/navigation/menu/menu';
import { TabsPage } from '../pages/navigation/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { SignOutPage } from '../pages/signout/signout';

// Importation des services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Geolocation } from '@ionic-native/geolocation';
import { RadarService } from '../services/radar.service';

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
