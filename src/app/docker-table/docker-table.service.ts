import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {dockerElement} from './doker.model';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DockerTableService {
  baseUrl ='http://localhost:8080/bookservice/books/';
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  postData(urlPrefix: string, query: any): Observable<any> {
    const url =  urlPrefix
    return this.http.post(url, query).pipe(
      catchError(this.handleError)
    )
  }

  getdata(urlPrefix: string, query: any): Observable<any> {
    const url = urlPrefix;
    return this.http.get(url, { params: { query: JSON.stringify(query) } });
  }
  // getdocker( ){

  //   // const queryParems =`?pagesize=${postsPerPage}&page=${currentPage}`;

  //     return this.http.get('localhost:8080/bookservice/books').subscribe(res=>{
  //       console.log(res)
  //     })
  //   }

// deletedocker(dockerId):Observable<any>{

// }
// deletedocker(urlPrefix: string, query: any): Observable<any> {
//   const url = urlPrefix + '/'+ query['_id']
//   return this.http.delete(url, this.httpOptions).pipe(
//     catchError(this.handleError)
//   )
// }

deletedocker(postId:string): Observable<any>{
  return this.http.delete('http://localhost:8080/bookservice/books/'+ postId );
}

updateDocker(docker:any):Observable<void>{
return this.http.put<void>(this.baseUrl+docker.id,docker)

}

handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = error.error.msg;
  }
  return throwError(errorMessage);
}
}
