import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSentComponent } from './message-sent.component';

describe('MessageSentComponent', () => {
  let component: MessageSentComponent;
  let fixture: ComponentFixture<MessageSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
