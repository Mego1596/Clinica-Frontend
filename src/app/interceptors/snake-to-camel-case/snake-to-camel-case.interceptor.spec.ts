import { TestBed } from '@angular/core/testing';

import { SnakeToCamelCaseInterceptor } from './snake-to-camel-case.interceptor';

describe('SnakeToCamelCaseInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SnakeToCamelCaseInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: SnakeToCamelCaseInterceptor = TestBed.inject(
      SnakeToCamelCaseInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
