import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {catchError, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {EquipmentDto} from "../dto/equipment.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiEquipmentService {

  constructor(private  httpClient: HttpClient, private env: EnvService) {
  }

  public getAll(): Observable<HttpResponse<Array<EquipmentDto>>> {
    const uri = 'equipment';
    let params = {};

    return this.httpClient.get<Array<EquipmentDto>>(this.env.apiUrl + uri, {
      headers: {}, params: params, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public get(id: string): Observable<HttpResponse<EquipmentDto>> {
    const uri = 'equipment/'+ id;
    return this.httpClient.get<EquipmentDto>(this.env.apiUrl + uri, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public create(obj: EquipmentDto): Observable<HttpResponse<EquipmentDto>> {
    const uri = 'equipment';
    return this.httpClient.post<EquipmentDto>(this.env.apiUrl + uri, obj, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public update(id: string,obj: EquipmentDto): Observable<HttpResponse<EquipmentDto>> {
    const uri = 'equipment/'+ id;
    return this.httpClient.put<EquipmentDto>(this.env.apiUrl + uri, obj, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  public delete(id: string): Observable<HttpResponse<string>> {
    const uri = 'equipment/'+ id;
    return this.httpClient.delete<string>(this.env.apiUrl + uri, {
      headers: {}, params: {}, observe: 'response'}).pipe(catchError(this.handleServerError));
  }

  handleServerError(error: any | any) {
    console.log(error);
    return throwError(error || 'Server error');
  }
}
