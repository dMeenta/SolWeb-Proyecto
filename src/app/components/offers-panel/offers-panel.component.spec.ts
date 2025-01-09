import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersPanelComponent } from './offers-panel.component';

describe('OffersPanelComponent', () => {
  let component: OffersPanelComponent;
  let fixture: ComponentFixture<OffersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
