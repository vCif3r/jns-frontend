import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    private _storage = localStorage;

    get<T>(key: string): T | null {
        const data = this._storage.getItem(key);
        if (!data) return null;
        return JSON.parse(data) as T;
    }

    set(key: string, value: any) {
        this._storage.setItem(key, value);
    }

    remove(key: string) {
        this._storage.removeItem(key);
    }
}