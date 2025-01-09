import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOfferCardComponent } from './game-offer-card.component';

describe('GameOfferCardComponent', () => {
  let component: GameOfferCardComponent;
  let fixture: ComponentFixture<GameOfferCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOfferCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOfferCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
