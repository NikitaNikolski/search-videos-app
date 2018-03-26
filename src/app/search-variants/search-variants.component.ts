import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-variants',
    templateUrl: './search-variants.component.html',
    styleUrls: ['./search-variants.component.less']
})
export class SearchVariantsComponent implements OnInit {

    private _searchVariants = SearchVariants;

    public selectedSearchVariant: SearchVariants;

    public get searchVariants(): Array<{ variantName: string; variantKey: string }> {
        const variants = [];
        const keys = Object.keys(SearchVariants);

        for (const key of keys) {
            variants.push({
                variantName: SearchVariants[key],
                variantKey: key
            });
        }

        return variants;
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
    }

    public onContinue(event: MouseEvent): void {
        event.stopPropagation();

        let navigateToURL = '';

        switch (SearchVariants[this.selectedSearchVariant]) {
            case SearchVariants.youtubeByLink:
                navigateToURL = 'youtube/paste-link';

                break;

            case SearchVariants.youtubeBySearchType:
                navigateToURL = 'youtube/type-query';

                break;
        }

        this.router.navigate([`../${navigateToURL}`], { relativeTo: this.route });
    }

    public selectSearchVariant(selectedSearchVariant: SearchVariants): void {
        this.selectedSearchVariant = selectedSearchVariant;
    }

}

enum SearchVariants {
    youtubeByLink = 'Youtube by pasting a link',
    youtubeBySearchType = 'Youtube by search field'
}
