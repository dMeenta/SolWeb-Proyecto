import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLayoutComponent } from './modal-layout.component';

describe('ModalLayoutComponent', () => {
  let component: ModalLayoutComponent;
  let fixture: ComponentFixture<ModalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
