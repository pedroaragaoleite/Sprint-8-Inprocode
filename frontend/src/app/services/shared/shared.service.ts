import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  /*
  Uso un servicio compartido para que los dos componentes puedan acceder
  se puede usar un Subject o BehaviourSubject para emitir eventos a los que los
  componente se puedan suscribirse
  */
  private eventRefresh = new Subject<void>;

  // Obsevable al que se suscribirá HomeComponent
  eventRefresh$ = this.eventRefresh.asObservable();

  // Método para llamar desde ModalComponent para emitir evento
  notifyEventChange() {
    this.eventRefresh.next();
  }

  constructor() { }
}
