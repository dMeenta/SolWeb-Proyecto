import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryContainerComponent } from './commentary-container.component';

describe('CommentaryContainerComponent', () => {
  let component: CommentaryContainerComponent;
  let fixture: ComponentFixture<CommentaryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentaryContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
