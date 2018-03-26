import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeReferenceComponent } from './youtube-reference.component';

describe('YoutubeReferenceComponent', () => {
    let component: YoutubeReferenceComponent;
    let fixture: ComponentFixture<YoutubeReferenceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YoutubeReferenceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YoutubeReferenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
