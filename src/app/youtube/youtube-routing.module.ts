import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeReferenceComponent } from './youtube-reference/youtube-reference.component';
import { YoutubeSearchQueryComponent } from './youtube-search-query/youtube-search-query.component';
import { YoutubeComponent } from './youtube.component';

const routes: Routes = [
    {
        path: '',
        component: YoutubeComponent,
        children: [
            {
                path: 'paste-link',
                component: YoutubeReferenceComponent
            },
            {
                path: 'type-query',
                component: YoutubeSearchQueryComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class YoutubeRoutingModule {
    debugger;
}
