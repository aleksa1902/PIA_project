import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateCompetitionComponent } from './datecompetition.component';


describe('DateCompetitionComponent', () => {
  let component: DateCompetitionComponent;
  let fixture: ComponentFixture<DateCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
