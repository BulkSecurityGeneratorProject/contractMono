import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ContactMySuffix } from './contact-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ContactMySuffix>;

@Injectable()
export class ContactMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/contacts';

    constructor(private http: HttpClient) { }

    create(contact: ContactMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(contact);
        return this.http.post<ContactMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contact: ContactMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(contact);
        return this.http.put<ContactMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ContactMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ContactMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ContactMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ContactMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ContactMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ContactMySuffix[]>): HttpResponse<ContactMySuffix[]> {
        const jsonResponse: ContactMySuffix[] = res.body;
        const body: ContactMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ContactMySuffix.
     */
    private convertItemFromServer(contact: ContactMySuffix): ContactMySuffix {
        const copy: ContactMySuffix = Object.assign({}, contact);
        return copy;
    }

    /**
     * Convert a ContactMySuffix to a JSON which can be sent to the server.
     */
    private convert(contact: ContactMySuffix): ContactMySuffix {
        const copy: ContactMySuffix = Object.assign({}, contact);
        return copy;
    }
}
