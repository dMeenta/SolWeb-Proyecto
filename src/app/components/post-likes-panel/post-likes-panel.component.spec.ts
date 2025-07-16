import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikesPanelComponent } from './post-likes-panel.component';

describe('PostLikesPanelComponent', () => {
  let component: PostLikesPanelComponent;
  let fixture: ComponentFixture<PostLikesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLikesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLikesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
