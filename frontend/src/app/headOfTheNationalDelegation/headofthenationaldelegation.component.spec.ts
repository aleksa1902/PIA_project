import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadOfTheNationalDelegationComponent } from './headofthenationaldelegation.component';


describe('HeadOfTheNationalDelegationComponent', () => {
  let component: HeadOfTheNationalDelegationComponent;
  let fixture: ComponentFixture<HeadOfTheNationalDelegationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadOfTheNationalDelegationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadOfTheNationalDelegationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
