import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoItemComponent } from './video-item.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        VideoItemComponent
    ],
    providers: [],
    exports: [
        VideoItemComponent
    ]
})
export class VideoItemModule { }
