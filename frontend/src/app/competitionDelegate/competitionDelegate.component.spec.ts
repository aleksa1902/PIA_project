import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionDelegateComponent } from './competitionDelegate.component';

describe('CompetitionDelegateComponent', () => {
  let component: CompetitionDelegateComponent;
  let fixture: ComponentFixture<CompetitionDelegateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionDelegateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
