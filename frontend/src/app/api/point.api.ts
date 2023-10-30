import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {catchError, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {PointDto} from "../dto/point.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiPointService {

  constructor(private  httpClient: HttpClient, private env: EnvService) {
  }

  public getAllEquipment(id: string): Observable<HttpResponse<Array<PointDto>>> {
    const uri = 'point/equipment/'+ id;
    let params = {};

    return this.httpClient.get<Array<PointDto>>(this.env.apiUrl + uri, {
      headers: {}, params: params, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public get(id: string): Observable<HttpResponse<PointDto>> {
    const uri = 'point/'+ id;
    return this.httpClient.get<PointDto>(this.env.apiUrl + uri, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public create(obj: PointDto): Observable<HttpResponse<PointDto>> {
    const uri = 'point';
    return this.httpClient.post<PointDto>(this.env.apiUrl + uri, obj, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public update(id: string,obj: PointDto): Observable<HttpResponse<PointDto>> {
    const uri = 'point/'+ id;
    return this.httpClient.put<PointDto>(this.env.apiUrl + uri, obj, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public delete(id: string): Observable<HttpResponse<string>> {
    const uri = 'point/'+ id;
    return this.httpClient.delete<string>(this.env.apiUrl + uri, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  handleServerError(error: any | any) {
    console.log(error);
    return throwError(error || 'Server error');
  }
}
