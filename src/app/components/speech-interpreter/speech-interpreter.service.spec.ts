import { TestBed, inject } from '@angular/core/testing';

import { SpeechInterpreterService } from './speech-interpreter.service';

describe('SpeechInterpreterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechInterpreterService]
    });
  });

  it('should be created', inject([SpeechInterpreterService], (service: SpeechInterpreterService) => {
    expect(service).toBeTruthy();
  }));
});
