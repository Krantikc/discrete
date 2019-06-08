import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceInterpreterComponent } from './voice-interpreter.component';

describe('VoiceInterpreterComponent', () => {
  let component: VoiceInterpreterComponent;
  let fixture: ComponentFixture<VoiceInterpreterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceInterpreterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceInterpreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
