import { TestBed } from '@angular/core/testing';

import { ScrollEventService } from './scroll-event.service';

describe('ScrollEventService', () => {
  let service: ScrollEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
