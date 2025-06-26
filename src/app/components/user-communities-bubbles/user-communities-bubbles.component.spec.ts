import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommunitiesBubblesComponent } from './user-communities-bubbles.component';

describe('UserCommunitiesBubblesComponent', () => {
  let component: UserCommunitiesBubblesComponent;
  let fixture: ComponentFixture<UserCommunitiesBubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCommunitiesBubblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommunitiesBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
