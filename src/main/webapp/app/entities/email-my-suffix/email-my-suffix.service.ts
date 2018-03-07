import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EmailMySuffix } from './email-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmailMySuffix>;

@Injectable()
export class EmailMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/emails';

    constructor(private http: HttpClient) { }

    create(email: EmailMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(email);
        return this.http.post<EmailMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(email: EmailMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(email);
        return this.http.put<EmailMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmailMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmailMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmailMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmailMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmailMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmailMySuffix[]>): HttpResponse<EmailMySuffix[]> {
        const jsonResponse: EmailMySuffix[] = res.body;
        const body: EmailMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmailMySuffix.
     */
    private convertItemFromServer(email: EmailMySuffix): EmailMySuffix {
        const copy: EmailMySuffix = Object.assign({}, email);
        return copy;
    }

    /**
     * Convert a EmailMySuffix to a JSON which can be sent to the server.
     */
    private convert(email: EmailMySuffix): EmailMySuffix {
        const copy: EmailMySuffix = Object.assign({}, email);
        return copy;
    }
}
