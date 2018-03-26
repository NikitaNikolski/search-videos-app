import { TestBed, inject } from '@angular/core/testing';

import { VideosStorageService } from './videos-storage.service';

describe('VideosStorageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VideosStorageService]
        });
    });

    it('should be created', inject([VideosStorageService], (service: VideosStorageService) => {
        expect(service).toBeTruthy();
    }));
});
