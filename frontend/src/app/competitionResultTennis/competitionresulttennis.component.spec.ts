import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionResultTennisComponent } from './competitionresulttennis.component';

describe('CompetitionDelegateComponent', () => {
  let component: CompetitionResultTennisComponent;
  let fixture: ComponentFixture<CompetitionResultTennisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionResultTennisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionResultTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
