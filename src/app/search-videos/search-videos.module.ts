import { NgModule } from '@angular/core';

import { SearchVideosRoutingModule } from './search-videos-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { SearchVideosComponent } from './search-videos.component';
import { SearchVariantsComponent } from '../search-variants/search-variants.component';

@NgModule({
    imports: [
        SharedModule,
        SearchVideosRoutingModule
    ],
    declarations: [
        SearchVideosComponent,
        SearchVariantsComponent
    ]
})
export class SearchVideosModule { }
