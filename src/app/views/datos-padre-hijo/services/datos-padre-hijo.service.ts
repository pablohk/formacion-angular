import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatosPadreHijoService {
    // Señal mutable privada
    private _infoB: WritableSignal<string | null> = signal<string | null>('Escribe algo...');

    // Actualiza el valor de infoB
    setInfoB(value: string | null): void {
        this._infoB.set(value);
    }

    // Obtiene el valor actual sin suscribirse (snapshot)
    getInfoBSnapshot(): string | null {
        return this._infoB();
    }

    // Obtiene el valor actual como signal
    getInfoB(): Signal<string | null> {
        return this._infoB;
    }

    // Limpia el valor de infoB
    clearInfoB(): void {
        this._infoB.set(null);
    }
}
