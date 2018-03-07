import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AddressMySuffix } from './address-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AddressMySuffix>;

@Injectable()
export class AddressMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient) { }

    create(address: AddressMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(address);
        return this.http.post<AddressMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(address: AddressMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(address);
        return this.http.put<AddressMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AddressMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AddressMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AddressMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AddressMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AddressMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AddressMySuffix[]>): HttpResponse<AddressMySuffix[]> {
        const jsonResponse: AddressMySuffix[] = res.body;
        const body: AddressMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AddressMySuffix.
     */
    private convertItemFromServer(address: AddressMySuffix): AddressMySuffix {
        const copy: AddressMySuffix = Object.assign({}, address);
        return copy;
    }

    /**
     * Convert a AddressMySuffix to a JSON which can be sent to the server.
     */
    private convert(address: AddressMySuffix): AddressMySuffix {
        const copy: AddressMySuffix = Object.assign({}, address);
        return copy;
    }
}
