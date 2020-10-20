import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PinComponent} from './pin.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('PinComponent', () => {
  let component: PinComponent;
  let fixture: ComponentFixture<PinComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button list', () => {
    component.preparePins(10); // should create 11 buttons including 0
    fixture.detectChanges();
    const buttons = debugElement.queryAll(By.css('button'));
    expect(buttons).toBeTruthy('could not find buttons');
    expect(buttons.length).toBe(11);
  });

  it('should raises shot event when clicked', () => {
    component.shot.subscribe((pinHits: number) => {
      expect(pinHits).toBe(5);
    });
    component.onPinsHit(5);
  });
});
