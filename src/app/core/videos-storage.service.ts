import { Injectable } from '@angular/core';

import { IVideoItem } from '../video-item/video-item.model';

@Injectable()
export class VideosStorageService {

    private readonly localStorageKeys = {
        videoToPlay: 'videoToPlay',
        playlist: 'playlist'
    };
    private videos: Array<IVideoItem>;
    private _videoToPlay: IVideoItem;

    public get videoToPlay(): IVideoItem {
        return this._videoToPlay;
    }

    public set videoToPlay(video: IVideoItem) {
        this._videoToPlay = video;

        localStorage.setItem(this.localStorageKeys.videoToPlay, JSON.stringify(this._videoToPlay));
    }

    constructor() {
        this.setVideoData();
    }

    private savePlaylist(): void {
        localStorage.setItem(this.localStorageKeys.playlist, JSON.stringify(this.videos));
    }

    private setVideoData(): void {
        this.videos = JSON.parse(localStorage.getItem(this.localStorageKeys.playlist)) || [];
        this._videoToPlay = JSON.parse(localStorage.getItem(this.localStorageKeys.videoToPlay));
    }

    public isVideoInPlaylist(id: string): boolean {
        return this.videos.some(video => video.id === id);
    }

    public addVideo(video: IVideoItem): void {
        this.videos.push(video);

        video.inPlaylist = true;

        this.savePlaylist();
    }

    public removeVideo(videoToRemove: IVideoItem): void {
        const index = this.videos.findIndex(video => video.id === videoToRemove.id);

        if (index > -1) {
            this.videos.splice(index, 1);

            videoToRemove.inPlaylist = false;
        }

        this.savePlaylist();
    }

    public getVideos(): IVideoItem[] {
        return this.videos;
    }

}
