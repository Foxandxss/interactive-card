import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cardFeatureHomeComponent } from './card-feature-home.component';

describe('cardFeatureHomeComponent', () => {
  let component: cardFeatureHomeComponent;
  let fixture: ComponentFixture<cardFeatureHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [cardFeatureHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(cardFeatureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
