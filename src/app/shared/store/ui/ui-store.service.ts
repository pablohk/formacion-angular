import { Injectable, Signal } from '@angular/core';
import { GenericStoreService } from '../../services/generic-store/generic-store.service';
import { IUiState, UI_INITIAL_STATE } from './ui-store.models';

/**
 * Servicio de estado para la UI.
 * Extiende `GenericStoreService<IUiState>` y expone selectores (señales)
 * y métodos para actualizar el estado global de la interfaz de usuario.
 *
 * El estado concreto se define en `IUiState` y los valores por defecto en
 * `UI_INITIAL_STATE`.
 */
@Injectable({ providedIn: 'root' })
export class UiStoreService extends GenericStoreService<IUiState> {
  /**
   * Inicializa el store con el estado por defecto.
   */
  constructor() {
    super(UI_INITIAL_STATE);
  }

  /**
   * Selector: señal que indica si existe una carga global activa.
   * @returns Signal<boolean>
   */
  public getGlobalLoading(): Signal<boolean> {
    return this.select((state) => state.globalLoading);
  }

  /**
   * Actualiza el flag de carga global.
   * @param isLoading true si hay carga activa, false en caso contrario
   */
  public setGlobalLoading(isLoading: boolean): void {
    this.patchState({ globalLoading: isLoading });
  }

  /**
   * Selector: señal que contiene el mensaje de error global (o null).
   * @returns Signal<string | null>
   */
  public getGlobalError(): Signal<string | null> {
    return this.select((state) => state.globalError);
  }

  /**
   * Establece o limpia el error global.
   * @param error Mensaje de error o null para limpiar
   */
  public setGlobalError(error: string | null): void {
    this.patchState({ globalError: error });
  }

  /**
   * Selector: señal que indica si debe mostrarse el modal de aviso.
   * @returns Signal<boolean>
   */
  public getShowAdviseModal(): Signal<boolean> {
    return this.select((state) => state.showAdviseModal);
  }

  /**
   * Muestra u oculta el modal de aviso.
   * @param show true para mostrar, false para ocultar
   */
  public setShowAdviseModal(show: boolean): void {
    this.patchState({ showAdviseModal: show });
  }
}
