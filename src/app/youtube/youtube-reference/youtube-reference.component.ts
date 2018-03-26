import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { YoutubeApiService } from '../youtube-api.service';
import { VideosStorageService } from '../../core/videos-storage.service';

import { IVideoItem } from '../../video-item/video-item.model';

@Component({
    selector: 'app-youtube-reference',
    templateUrl: './youtube-reference.component.html',
    styleUrls: ['./youtube-reference.component.less']
})
export class YoutubeReferenceComponent implements OnInit {

    public searchField: FormControl;
    public video: IVideoItem;
    public isLoading = false;
    public isURLValid = true;

    constructor(
        private youtubeAPI: YoutubeApiService,
        private videosStorageService: VideosStorageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.searchField = new FormControl();

        this.searchField.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(url => this.searchVideoByUrl(url));
    }

    private validateURL(url: string): boolean {
        const regexp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const matches = url.match(regexp);

        return matches ? true : false;
    }

    private getVideoIDFromURL(url: string): string {
        let ID = '';
        const urlParts = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

        if (urlParts[2] !== undefined) {
            ID = urlParts[2].split(/[^0-9a-z_\-]/i)[0];
        } else {
            ID = url;
        }

        return ID;
    }

    private getVideoStartTime(url: string): number {
        const regexp = /youtube.com\S+#t=((\d+h)?(\d+m)?(\d+[s]?)?)/g;
        const match = regexp.exec(url);
        let timeInSeconds = 0;

        if (match) {
            let timeString = match[1].toLowerCase();
            const deviders = [
                {
                    name: 'h',
                    secondsCount: 3600
                },
                {
                    name: 'm',
                    secondsCount: 60
                },
                {
                    name: 's',
                    secondsCount: 1
                }
            ];

            if (!Number.isNaN(+timeString)) {
                timeInSeconds = parseInt(timeString, 10);
            } else {
                for (const devider of deviders) {
                    const devidedArray = timeString.split(devider.name);
                    let time;

                    if (timeString.indexOf(devider.name) > -1) {
                        time = parseInt(devidedArray[0], 10);
                        timeString = devidedArray[1];
                    } else {
                        time = 0;
                        timeString = devidedArray[0];
                    }

                    timeInSeconds += time * devider.secondsCount;
                }
            }
        }

        return timeInSeconds;
    }

    private async searchVideoByUrl(url: string) {
        if (url) {
            this.isURLValid = this.validateURL(url);

            if (this.isURLValid) {
                this.isLoading = true;

                const videoID = this.getVideoIDFromURL(url);
                const videoStartTime = this.getVideoStartTime(url);
                const videos = await this.youtubeAPI.searchVideosByID([videoID]);

                if (videos.length) {
                    videos[0].startTime = videoStartTime;
                }

                this.video = videos[0];

                this.isLoading = false;
            } else {
                this.video = undefined;
            }
        } else {
            this.video = undefined;
            this.isURLValid = true;
        }
    }

    public playVideo(video: IVideoItem): void {
        this.videosStorageService.videoToPlay = video;

        this.router.navigate([`../../../detail/${video.id}&startTime=${10}`], { relativeTo: this.route });
    }

    public async addToPlaylist(video: IVideoItem) {
        this.videosStorageService.addVideo(video);
    }

    public async removeFromPlaylist(video: IVideoItem) {
        this.videosStorageService.removeVideo(video);
    }

}
