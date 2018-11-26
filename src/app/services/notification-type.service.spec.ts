import { TestBed } from '@angular/core/testing';

import { NotificationTypeService } from './notification-type.service';

describe('NotificationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationTypeService = TestBed.get(NotificationTypeService);
    expect(service).toBeTruthy();
  });
});
