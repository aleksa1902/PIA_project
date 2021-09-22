import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionResultComponent } from './competitionresult.component';

describe('CompetitionDelegateComponent', () => {
  let component: CompetitionResultComponent;
  let fixture: ComponentFixture<CompetitionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
