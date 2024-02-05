import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import User from '../models/User';
import { InstanceObject } from '../models/instance-object.model';

let httpOptions = {
    headers: environment.headers,
    params: new HttpParams ()
};

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  authUrl = `${environment.API_URL}`;
  currentUser!: User;
  data : any;
  constructor(private http: HttpClient, private storage: StorageService) {
    this.data = this.storage.getUser().data;
    this.currentUser = this.data.user;
    httpOptions.headers.Authorization = 'Bearer ' + this.data.token;
  }

  getServerStatus(instances? : InstanceObject[]): Observable<any> {
    if (instances != undefined) {
        let instanceIds : string[] = [];
        instances.forEach(element => {
            instanceIds.push (element.instanceId);
        });
        httpOptions.params.appendAll ({'InstanceIds': instanceIds})
    }
    return this.http.get(environment.API_URL + '/aws/instances', httpOptions);
  }

  startServer(serverId: string): Observable<any> {
    const payload = { serverId: serverId };
    return this.http.post(`${this.authUrl}/aws/start`, payload, httpOptions).pipe(
      catchError((err) => {
        return throwError(() => new HttpErrorResponse(err.error));
      })
    );
  }

  stopServer(serverId: string): Observable<any> {
    const payload = { serverId: serverId };
    return this.http.post(`${this.authUrl}/aws/stop`, payload, httpOptions).pipe(
      catchError((err) => {
        return throwError(() => new HttpErrorResponse(err.error));
      })
    );
  }
}
