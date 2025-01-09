import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPanelComponent } from './games-panel.component';

describe('GamesPanelComponent', () => {
  let component: GamesPanelComponent;
  let fixture: ComponentFixture<GamesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
