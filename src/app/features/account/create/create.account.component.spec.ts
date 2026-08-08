import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccountComponent } from './create.account.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Createaccount', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              accountPageData: 'Account page detail for page!!!!',
              userData: {
                content: [{ title: 'section 1', content: 'some content' }],
                description: 'Account page details description...',
                id: undefined,
                title: 'Account page details',
              },
            }),

            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
