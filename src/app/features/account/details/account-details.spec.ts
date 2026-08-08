import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountdetailsComponent } from './account-details.component';
import { AccountdetailsService } from './account-details.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AccountDetailStore } from './signal/account-details.store';

describe('Accountdetails', () => {
  let component: AccountdetailsComponent;
  let fixture: ComponentFixture<AccountdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountdetailsComponent],
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
        {
          provide: AccountDetailStore,
          useValue: {
            post: {
              id: 1,
              userId: 1,
              title: 'title',
              body: 'body',
            },
          },
        },

        {
          provide: AccountdetailsService,
          useValue: {
            getPost: jest.fn().mockReturnValue(
              of({
                id: 1,
                userId: 1,
                title: 'title',
                body: 'body',
              }),
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountdetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retreive data', () => {
    expect(component.data()).toEqual({
      accountPageData: 'Account page detail for page!!!!',
      userData: {
        content: [{ title: 'section 1', content: 'some content' }],
        description: 'Account page details description...',
        id: undefined,
        title: 'Account page details',
      },
    });
  });

  it('should get stored post', () => {
    expect(component.store.post()).toEqual({
      id: 1,
      userId: 1,
      title: 'title',
      body: 'body',
    });
  });

  it('should call getPost method', () => {
    const accountService = TestBed.inject(AccountdetailsService);

    expect(accountService.getPost).toHaveBeenCalledTimes(1);
  });
});
