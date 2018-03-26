export interface IVideoItem {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    inPlaylist: boolean;
    startTime?: number;
    statistics?: IVideoItemStatistic;
}

export interface IVideoItemStatistic {
    dislikeCount: string;
    likeCount: string;
    viewCount: string;
}
