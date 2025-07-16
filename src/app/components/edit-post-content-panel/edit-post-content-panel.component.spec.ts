import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostContentPanelComponent } from './edit-post-content-panel.component';

describe('EditPostContentPanelComponent', () => {
  let component: EditPostContentPanelComponent;
  let fixture: ComponentFixture<EditPostContentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPostContentPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostContentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
