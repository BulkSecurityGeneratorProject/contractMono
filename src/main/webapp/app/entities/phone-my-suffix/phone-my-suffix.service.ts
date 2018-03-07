import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PhoneMySuffix } from './phone-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PhoneMySuffix>;

@Injectable()
export class PhoneMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/phones';

    constructor(private http: HttpClient) { }

    create(phone: PhoneMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(phone);
        return this.http.post<PhoneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(phone: PhoneMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(phone);
        return this.http.put<PhoneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PhoneMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PhoneMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PhoneMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PhoneMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PhoneMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PhoneMySuffix[]>): HttpResponse<PhoneMySuffix[]> {
        const jsonResponse: PhoneMySuffix[] = res.body;
        const body: PhoneMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PhoneMySuffix.
     */
    private convertItemFromServer(phone: PhoneMySuffix): PhoneMySuffix {
        const copy: PhoneMySuffix = Object.assign({}, phone);
        return copy;
    }

    /**
     * Convert a PhoneMySuffix to a JSON which can be sent to the server.
     */
    private convert(phone: PhoneMySuffix): PhoneMySuffix {
        const copy: PhoneMySuffix = Object.assign({}, phone);
        return copy;
    }
}
