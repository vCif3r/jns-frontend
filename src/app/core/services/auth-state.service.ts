import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

interface Session {
    access_token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    signOut() {
        this._storageService.remove('session');
    }

    private _storageService = inject(StorageService);

    getSession(): Session | null {
        let currentSession: Session | null = null;
        const mbsession = this._storageService.get<Session>('session');

        if (mbsession != null) {
            if (this._isValidSession(mbsession)) {
                currentSession = mbsession;
            } else {
                this.signOut();
            }
        }
        return currentSession;
    }

    private _isValidSession(session: Session): boolean {
        return (
            typeof session === 'object' &&
            session !== null &&
            'access_token' in session
        );
    }

    _isTokenExpired(token: string): boolean {
        const payload = this._decodeJWT(token);
        if (!payload) return true; // Si no podemos decodificar el token, lo consideramos expirado.

        const exp = payload.exp * 1000; // Convertir la expiración a milisegundos
        const now = new Date().getTime(); // Obtener la hora actual en milisegundos

        return exp < now;
    }

    // Función para decodificar el JWT
    private _decodeJWT(token: string): any | null {
        try {
            const payload = token.split('.')[1]; // El payload está en la segunda parte del JWT
            const decoded = atob(payload); // Decodificar base64
            return JSON.parse(decoded); // Convertir de JSON a objeto
        } catch (e) {
            return null; // Si hay un error al decodificar, devolvemos null
        }
    }
}
