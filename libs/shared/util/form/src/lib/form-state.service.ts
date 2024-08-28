import { Injectable } from '@angular/core';
import { type FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormStateService {
  readonly #cardFormState = new BehaviorSubject<FormGroup | null>(null);
  readonly formState$ = this.#cardFormState.asObservable();

  setFormState(form: FormGroup) {
    this.#cardFormState.next(form);
  }
}
