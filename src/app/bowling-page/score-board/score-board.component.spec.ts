import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ScoreBoardComponent} from './score-board.component';
import {DebugElement, Pipe, PipeTransform} from '@angular/core';
import {By} from '@angular/platform-browser';

@Pipe({
  name: 'frameFormat'
})
export class MockFrameFormatPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }
}

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreBoardComponent, MockFrameFormatPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBoardComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display total score', () => {
    component.frames = [{first: 1, second: 2}, {first: 5, second: 5}];
    component.totalScore = 70;
    fixture.detectChanges();
    const h1De = debugElement.query(By.css('#total-score'));
    const h1: HTMLElement = h1De.nativeElement;
    expect(h1.textContent).toEqual('Total Score: 70');
  });

  it('should create score board table', () => {
    component.frames = [{first: 1, second: 2}, {first: 5, second: 5}];
    fixture.detectChanges();
    const tableDe = debugElement.query(By.css('#score-board'));
    const table: HTMLElement = tableDe.nativeElement;
    expect(table).toBeTruthy();
  });
});
