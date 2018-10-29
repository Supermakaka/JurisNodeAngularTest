import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from '../shared/services/model/message';

@Injectable()
export class TwitterService {

  constructor(private http: HttpClient) { }

  getMessages(query: any): Observable<Message[]> {
    return this.http.get<Message[]>(`/api/twitter/search/${query}`);
  }
}