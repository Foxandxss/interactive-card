import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cardFeatureShellComponent } from './card-feature-shell.component';

describe('cardFeatureShellComponent', () => {
  let component: cardFeatureShellComponent;
  let fixture: ComponentFixture<cardFeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [cardFeatureShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(cardFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
