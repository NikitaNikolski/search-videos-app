import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoPlayerComponent } from './video-player/video-player.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/welcome-page',
        pathMatch: 'full'
    },
    {
        path: 'welcome-page',
        component: WelcomePageComponent
    },
    {
        path: 'search-videos',
        loadChildren: 'app/search-videos/search-videos.module#SearchVideosModule'
    },
    {
        path: 'playlist',
        loadChildren: 'app/playlist/playlist.module#PlaylistModule'
    },
    {
        path: 'detail/:id',
        component: VideoPlayerComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
