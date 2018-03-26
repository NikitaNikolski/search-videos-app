import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { YoutubeApiService } from '../youtube-api.service';
import { VideosStorageService } from '../../core/videos-storage.service';

import { IVideoItem } from '../../video-item/video-item.model';

@Component({
    selector: 'app-youtube-search-query',
    templateUrl: './youtube-search-query.component.html',
    styleUrls: ['./youtube-search-query.component.less']
})
export class YoutubeSearchQueryComponent implements OnInit {
    public searchField: FormControl;
    public videos: Array<IVideoItem> = [];
    public isLoading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private youtubeAPI: YoutubeApiService,
        private videosStorageService: VideosStorageService
    ) { }


    ngOnInit() {
        this.searchField = new FormControl();

        this.searchField.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(query => this.getVideosBySearchQuery(query));
    }

    private async getVideosBySearchQuery(query: string) {
        if (query) {
            this.isLoading = true;

            this.videos = await this.youtubeAPI.searchVideosByQuery(query);

            this.isLoading = false;
        } else {
            this.videos.length = 0;
        }
    }

    public playVideo(video: IVideoItem): void {
        this.videosStorageService.videoToPlay = video;

        this.router.navigate([`../../../detail/${video.id}`], { relativeTo: this.route });
    }

    public async addToPlaylist(video: IVideoItem) {
        this.videosStorageService.addVideo(video);
    }

    public async removeFromPlaylist(video: IVideoItem) {
        this.videosStorageService.removeVideo(video);
    }

    public async loadMore() {
        this.isLoading = true;

        this.videos.push(...await this.youtubeAPI.searchNext());

        this.isLoading = false;
    }

}
