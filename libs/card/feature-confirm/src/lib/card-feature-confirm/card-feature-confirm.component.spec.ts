import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeatureConfirmComponent } from './card-feature-confirm.component';

describe('CardFeatureConfirmComponent', () => {
  let component: CardFeatureConfirmComponent;
  let fixture: ComponentFixture<CardFeatureConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFeatureConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFeatureConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
