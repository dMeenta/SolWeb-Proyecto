import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListObjectComponent } from './friend-list-object.component';

describe('FriendListObjectComponent', () => {
  let component: FriendListObjectComponent;
  let fixture: ComponentFixture<FriendListObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendListObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendListObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
