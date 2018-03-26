import { Component, OnInit, Input } from '@angular/core';

import { IVideoItem } from './video-item.model';

@Component({
    selector: 'app-video-item',
    templateUrl: './video-item.component.html',
    styleUrls: ['./video-item.component.less']
})
export class VideoItemComponent implements OnInit {

    @Input() videoData: IVideoItem;

    constructor() { }

    ngOnInit() {
    }

}
