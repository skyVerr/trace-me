import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from "../entities/api.class";
import { Contact } from "../entities/contact.class";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(public http: HttpClient) { }

  postContact(email){
    return this.http.post(Api.API_URL+'contacts',email);
  }

  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(Api.API_URL+'contacts');
  }

  postContactConfirm(notification){
    return this.http.post(Api.API_URL+'contacts/confirm',notification);
  }

  deleteContact(contact){
    return this.http.request('delete',Api.API_URL+'contacts',{body: contact});
  }
}
