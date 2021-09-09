import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAthleteJSONComponent } from './addathletejson.component';


describe('AddAthleteJSONComponent', () => {
  let component: AddAthleteJSONComponent;
  let fixture: ComponentFixture<AddAthleteJSONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAthleteJSONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAthleteJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
