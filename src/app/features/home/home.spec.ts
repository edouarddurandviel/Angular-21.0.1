import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Home', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
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

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
