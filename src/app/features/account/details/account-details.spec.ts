import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountdetailsComponent } from './account.details.component';

describe('Accountdetails', () => {
  let component: AccountdetailsComponent;
  let fixture: ComponentFixture<AccountdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountdetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
