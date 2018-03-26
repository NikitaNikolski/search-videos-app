import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSearchQueryComponent } from './youtube-search-query.component';

describe('YoutubeSearchQueryComponent', () => {
    let component: YoutubeSearchQueryComponent;
    let fixture: ComponentFixture<YoutubeSearchQueryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YoutubeSearchQueryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YoutubeSearchQueryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
