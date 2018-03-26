import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VideoItemModule } from '../video-item/video-item.module';

import { YoutubeReferenceComponent } from './youtube-reference/youtube-reference.component';
import { YoutubeSearchQueryComponent } from './youtube-search-query/youtube-search-query.component';
import { YoutubeComponent } from './youtube.component';

import { YoutubeApiService } from './youtube-api.service';

@NgModule({
    imports: [
        CommonModule,
        YoutubeRoutingModule,
        SharedModule,
        VideoItemModule
    ],
    declarations: [
        YoutubeReferenceComponent,
        YoutubeSearchQueryComponent,
        YoutubeComponent
    ],
    providers: [
        YoutubeApiService
    ]
})
export class YoutubeModule { }
