import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { city } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class cityService {
   private readonly URL:string="localhost:3000/vechicledetails";
  constructor(private http:HttpClient) { }

  Create(data:city):Observable<city>
  {
    return this.http.post<city>(this.URL,data);
  }
  
}