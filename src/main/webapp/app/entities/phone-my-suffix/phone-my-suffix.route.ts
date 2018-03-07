import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PhoneMySuffixComponent } from './phone-my-suffix.component';
import { PhoneMySuffixDetailComponent } from './phone-my-suffix-detail.component';
import { PhoneMySuffixPopupComponent } from './phone-my-suffix-dialog.component';
import { PhoneMySuffixDeletePopupComponent } from './phone-my-suffix-delete-dialog.component';

@Injectable()
export class PhoneMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const phoneRoute: Routes = [
    {
        path: 'phone-my-suffix',
        component: PhoneMySuffixComponent,
        resolve: {
            'pagingParams': PhoneMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'phone-my-suffix/:id',
        component: PhoneMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phonePopupRoute: Routes = [
    {
        path: 'phone-my-suffix-new',
        component: PhoneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-my-suffix/:id/edit',
        component: PhoneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-my-suffix/:id/delete',
        component: PhoneMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
