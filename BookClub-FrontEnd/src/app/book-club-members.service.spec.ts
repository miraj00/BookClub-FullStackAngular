import { TestBed } from '@angular/core/testing';

import { BookClubMembersService } from './book-club-members.service';

describe('BookClubMembersService', () => {
  let service: BookClubMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookClubMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
