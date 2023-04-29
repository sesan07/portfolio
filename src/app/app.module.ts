import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CloudinaryModule } from '@cloudinary/ng';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MainProjectComponent } from './main-project/main-project.component';
import { TitleComponent } from './title/title.component';
import { CardComponent } from './card/card.component';
import { AnimateEntryDirective } from './animate-entry/animate-entry.directive';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        MainProjectComponent,
        TitleComponent,
        CardComponent,
        AnimateEntryDirective,
    ],
    imports: [BrowserModule, HttpClientModule, CloudinaryModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
