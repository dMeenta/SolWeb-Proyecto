import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWithOthersComponent } from './connect-with-others.component';

describe('ConnectWithOthersComponent', () => {
  let component: ConnectWithOthersComponent;
  let fixture: ComponentFixture<ConnectWithOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectWithOthersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectWithOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
