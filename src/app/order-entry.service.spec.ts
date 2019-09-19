import { TestBed } from '@angular/core/testing';

import { OrderEntryService } from './order-entry.service';

describe('OrderEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderEntryService = TestBed.get(OrderEntryService);
    expect(service).toBeTruthy();
  });
});
