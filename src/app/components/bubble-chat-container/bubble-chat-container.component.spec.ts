import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChatContainerComponent } from './bubble-chat-container.component';

describe('BubbleChatContainerComponent', () => {
  let component: BubbleChatContainerComponent;
  let fixture: ComponentFixture<BubbleChatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleChatContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
