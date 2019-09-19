import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { OrderEntry } from './order-entry';
import { Models } from './models';
import { ORDERENTRY } from './mock-order-entry';

@Injectable({
  providedIn: 'root'
})
export class OrderEntryService {
  private orderEntryUrl = 'api/orderEntry';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getOrderEntry(): Observable<OrderEntry> {
    return of(ORDERENTRY);
  }
}
