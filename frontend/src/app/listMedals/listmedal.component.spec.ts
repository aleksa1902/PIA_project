import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMedalsComponent } from './listmedals.component';

describe('ListMedalsComponent', () => {
  let component: ListMedalsComponent;
  let fixture: ComponentFixture<ListMedalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
