import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingPageComponent } from './bowling-page.component';

describe('BowlingPageComponent', () => {
  let component: BowlingPageComponent;
  let fixture: ComponentFixture<BowlingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowlingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
