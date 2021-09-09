import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindAthleteComponent } from './findathlete.component';


describe('FindAthleteComponent', () => {
  let component: FindAthleteComponent;
  let fixture: ComponentFixture<FindAthleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAthleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
