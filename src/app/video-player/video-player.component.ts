import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

import { VideosStorageService } from '../core/videos-storage.service';

import { IVideoItem } from '../video-item/video-item.model';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.less']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {

    private player;

    public videoDataItem: IVideoItem;

    @ViewChild('playerContainer') playerContainer: ElementRef;

    constructor(
        private videosStorageService: VideosStorageService
    ) { }

    ngOnInit() {
        this.videoDataItem = this.videosStorageService.videoToPlay;
    }

    ngAfterViewInit() {
        this.initVideoPlayer();
    }

    private initVideoPlayer(): void {
        this.loadIframeAPI();
        this.createPlayer();
    }

    private loadIframeAPI(): void {
        const htmlElementID = 'youtube_iframe_api';
        const isAPIAlreadyLoaded = document.getElementById(htmlElementID);

        if (!isAPIAlreadyLoaded) {
            const playerApi = document.createElement('script');

            playerApi.type = 'text/javascript';
            playerApi.src = 'https://www.youtube.com/iframe_api';
            playerApi.id = htmlElementID;
            document.body.appendChild(playerApi);
        }
    }

    private createPlayer(): void {
        const interval = setInterval(() => {
            if ((typeof window['YT'] !== 'undefined') && window['YT'] && window['YT'].Player) {
                const playerWidth = this.playerContainer.nativeElement.clientWidth;
                const playerHeight = playerWidth / 1.76;

                this.player = new window['YT'].Player('player', {
                    width: playerWidth, // window.innerWidth - 150 || '440'
                    height: playerHeight, // window.innerHeight - 200 || '250'
                    playerVars: {
                        iv_load_policy: '3',
                        rel: '0',
                        start: this.videoDataItem.startTime || 0
                    },
                    videoId: this.videoDataItem.id,
                    events: {
                        'onReady': this.onPlayerReady
                    }
                });

                clearInterval(interval);
            }
        }, 100);
    }

    private onPlayerReady(event): void {
        event.target.playVideo();
    }

    public async addToPlaylist(video: IVideoItem) {
        this.videosStorageService.addVideo(video);
    }

    public async removeFromPlaylist(video: IVideoItem) {
        this.videosStorageService.removeVideo(video);
    }

}
