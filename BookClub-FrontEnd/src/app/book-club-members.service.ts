import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class BookClubMembersService {

  baseURL:string ="http://localhost:8080/club-members";
  constructor(private http:HttpClient) { }

  //Look at an old service with full crud and copy it in and rework to work for your interface
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseURL}`);
  };
  // Get by ID is not used in this application, but it's included here as an example
  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseURL}/${id}`);
  }
  // Use the various HTTP methods as needed.
  // All of these still return an observable. We must subscribe in the component in
  // order to trigger the actual API call.
  updateMember(updatedMember: Member): Observable<Member> {
    // For PUT, pass the body data as a second parameter after the URL
    return this.http.put<Member>(`${this.baseURL}/${updatedMember.id}`, updatedMember);
  };
  addMember(newMember: Member): Observable<Member> {
    // For POST, pass the body data as a second parameter after the URL
    return this.http.post<Member>(`${this.baseURL}`, newMember);
  };
  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  };
}