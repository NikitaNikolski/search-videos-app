import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
    declarations: [
        AppComponent,
        VideoPlayerComponent,
        WelcomePageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
