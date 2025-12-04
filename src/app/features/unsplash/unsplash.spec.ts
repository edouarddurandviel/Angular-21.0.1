import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unsplash } from './unsplash';

describe('Unsplash', () => {
  let component: Unsplash;
  let fixture: ComponentFixture<Unsplash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unsplash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unsplash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
