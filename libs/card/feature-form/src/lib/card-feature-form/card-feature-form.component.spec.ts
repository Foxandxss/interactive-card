import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeatureFormComponent } from './card-feature-form.component';

describe('CardFeatureFormComponent', () => {
  let component: CardFeatureFormComponent;
  let fixture: ComponentFixture<CardFeatureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFeatureFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
