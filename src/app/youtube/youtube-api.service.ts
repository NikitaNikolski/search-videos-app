import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { VideosStorageService } from '../core/videos-storage.service';

import { IVideoItem } from '../video-item/video-item.model';
import { YOUTUBE_API_KEY } from '../shared/constants';

@Injectable()
export class YoutubeApiService {

    private base_url = 'https://www.googleapis.com/youtube/v3/';
    private max_results = 50;

    public nextToken: string;
    public lastQuery: string;

    constructor(
        private http: HttpClient,
        private videosStorageService: VideosStorageService
    ) { }

    private async doSearchRequest(url: string, query: string) {
        let videos: IVideoItem[];
        try {
            videos = await this.http.get(url)
                .map(response => {
                    const res = response['items'];

                    this.lastQuery = query;
                    this.nextToken = response['nextPageToken'] ? response['nextPageToken'] : undefined;

                    const ids = [];
                    res.forEach((item) => {
                        ids.push(item.id.videoId);
                    });

                    return this.getVideos(ids);
                })
                .toPromise();
        } catch (error) {
            videos = [];

            console.error(error);
        }

        return videos;
    }

    private async getVideos(ids: string[]) {
        const url = `${this.base_url}videos?id=${ids.join(',')}&maxResults=${this.max_results}&type=video&part=snippet,contentDetails,statistics&key=${YOUTUBE_API_KEY}`;

        let videos: IVideoItem[];
        try {
            videos = await this.http.get(url)
                .map(results => this.transformVideosResponse(results['items']))
                .toPromise();
        } catch (error) {
            videos = [];

            console.error(error);
        }

        return videos;
    }

    private transformVideosResponse(videosResponse: Array<any>): IVideoItem[] {
        return videosResponse.map(video => {
            const videoItem: IVideoItem = {
                id: video.id,
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnailUrl: video.snippet.thumbnails.medium.url,
                inPlaylist: this.videosStorageService.isVideoInPlaylist(video.id),
                statistics: {
                    dislikeCount: video.statistics.dislikeCount,
                    likeCount: video.statistics.likeCount,
                    viewCount: video.statistics.viewCount
                }
            };

            return videoItem;
        });
    }

    public async searchVideosByQuery(query: string) {
        const url = `${this.base_url}search?q=${query}&maxResults=${this.max_results}&type=video&part=snippet,id&key=${YOUTUBE_API_KEY}&videoEmbeddable=true`;
        const videos = await this.doSearchRequest(url, query);

        return videos;
    }

    public async searchNext() {
        const url = `${this.base_url}search?q=${this.lastQuery}&pageToken=${this.nextToken}&maxResults=${this.max_results}&type=video&part=snippet,id&key=${YOUTUBE_API_KEY}&videoEmbeddable=true`;
        const videos = await this.doSearchRequest(url, this.lastQuery);

        return videos;
    }

    public async searchVideosByID(ids: string[]) {
        const videos = await this.getVideos(ids);

        return videos;
    }

}
