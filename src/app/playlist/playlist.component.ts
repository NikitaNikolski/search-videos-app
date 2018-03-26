import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VideosStorageService } from '../core/videos-storage.service';

import { IVideoItem } from '../video-item/video-item.model';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.less']
})
export class PlaylistComponent implements OnInit {

    public videos: IVideoItem[] = [];

    constructor(
        private videosStorageService: VideosStorageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.videos = this.videosStorageService.getVideos();
    }

    public playVideo(video: IVideoItem): void {
        this.videosStorageService.videoToPlay = video;

        this.router.navigate([`../detail/${video.id}`], { relativeTo: this.route });
    }

    public async addToPlaylist(video: IVideoItem) {
        this.videosStorageService.addVideo(video);
    }

    public async removeFromPlaylist(video: IVideoItem) {
        this.videosStorageService.removeVideo(video);
    }

}
