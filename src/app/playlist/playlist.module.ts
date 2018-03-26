import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { VideoItemModule } from '../video-item/video-item.module';

import { PlaylistComponent } from './playlist.component';

@NgModule({
    imports: [
        CommonModule,
        VideoItemModule,
        PlaylistRoutingModule
    ],
    declarations: [
        PlaylistComponent
    ],
    providers: []
})
export class PlaylistModule { }
