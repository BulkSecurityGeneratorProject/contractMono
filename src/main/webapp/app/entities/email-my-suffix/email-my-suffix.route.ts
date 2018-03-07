import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmailMySuffixComponent } from './email-my-suffix.component';
import { EmailMySuffixDetailComponent } from './email-my-suffix-detail.component';
import { EmailMySuffixPopupComponent } from './email-my-suffix-dialog.component';
import { EmailMySuffixDeletePopupComponent } from './email-my-suffix-delete-dialog.component';

@Injectable()
export class EmailMySuffixResolvePagingParams implements Resolve<any> {

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

export const emailRoute: Routes = [
    {
        path: 'email-my-suffix',
        component: EmailMySuffixComponent,
        resolve: {
            'pagingParams': EmailMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emails'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'email-my-suffix/:id',
        component: EmailMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emailPopupRoute: Routes = [
    {
        path: 'email-my-suffix-new',
        component: EmailMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'email-my-suffix/:id/edit',
        component: EmailMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'email-my-suffix/:id/delete',
        component: EmailMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
