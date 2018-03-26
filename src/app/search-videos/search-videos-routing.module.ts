import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchVideosComponent } from './search-videos.component';
import { SearchVariantsComponent } from '../search-variants/search-variants.component';

const routes: Routes = [
    {
        path: '',
        component: SearchVideosComponent,
        children: [
            {
                path: '',
                redirectTo: 'search-variants',
                pathMatch: 'full'
            },
            {
                path: 'search-variants',
                component: SearchVariantsComponent
            },
            {
                path: 'youtube',
                loadChildren: 'app/youtube/youtube.module#YoutubeModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchVideosRoutingModule { }
