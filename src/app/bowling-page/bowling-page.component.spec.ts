import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BowlingPageComponent} from './bowling-page.component';
import {Component} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

@Component({selector: 'app-pin', template: ''})
class MockPinComponent {
}

@Component({selector: 'app-score-board', template: ''})
class MockScoreBoardComponent {
}

describe('BowlingPageComponent', () => {
  let component: BowlingPageComponent;
  let fixture: ComponentFixture<BowlingPageComponent>;
  let store: MockStore;
  const initialState = {frames: []};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BowlingPageComponent, MockScoreBoardComponent, MockPinComponent],
      providers: [provideMockStore({initialState})]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
