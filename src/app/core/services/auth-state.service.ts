import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

interface Session {
    access_token: string;
  }

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

    signOut(){
        this._storageService.remove('token');
    }

    private _storageService = inject(StorageService);

    getSession(): Session | null {
        let currentSession: Session | null = null; 
        const mbsession = this._storageService.get<Session>('session');

        if (mbsession != null) {
            if(this._isValidSession(mbsession)){
                currentSession = mbsession;
            }else{
                this.signOut();
            }
        }
        return currentSession;
    }

    private _isValidSession(session: Session): boolean {
        return (
            typeof session === 'object' 
            && session !== null 
            && 'access_token' in session
        )
    }
}