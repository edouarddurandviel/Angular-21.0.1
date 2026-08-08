import { ComponentFixture, TestBed } from '@angular/core/testing';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AccordionComponent } from './accordion.component';

describe('Accordion', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;
  let spectator: Spectator<AccordionComponent>;

  let createComponent = createComponentFactory({
    component: AccordionComponent,
    shallow: true,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spectator = createComponent({
      props: {
        items: [
          {
            title: 'me',
            open: true,
            content: 'some content',
          },
        ],
      },
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('How shoul display accordion content', () => {
    expect(spectator.query<HTMLDivElement>('.accordion-title')?.textContent).toContain('me');

    expect(spectator.query<HTMLDivElement>('.accordion-header span.arrow')).toHaveClass('open');

    expect(spectator.query<HTMLDivElement>('.accordion-body')?.textContent).toContain(
      'some content',
    );

    expect(spectator.query<HTMLDivElement>('.accordion-body')).toHaveClass('open');
  });
});

// Simplifying Component tests with the Spectator library
// Using the unified Spectator interface
// Interacting with the Component and the rendered DOM
// Dispatching synthetic DOM events to simulate user input
// Using Spectator and ng-mocks to fake child Components and Services
