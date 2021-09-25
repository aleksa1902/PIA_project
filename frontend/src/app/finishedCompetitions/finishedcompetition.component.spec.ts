import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishedCompetitionComponent } from './finishedcompetition.component';

describe('CompetitionDelegateComponent', () => {
  let component: FinishedCompetitionComponent;
  let fixture: ComponentFixture<FinishedCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
