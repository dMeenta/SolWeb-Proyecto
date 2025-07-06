import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendshipRequestsListComponent } from './friendship-requests-list.component';

describe('FriendshipRequestsListComponent', () => {
  let component: FriendshipRequestsListComponent;
  let fixture: ComponentFixture<FriendshipRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendshipRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendshipRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
