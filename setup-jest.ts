// setup-jest.ts
//import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

//setupZoneTestEnv();
setupZonelessTestEnv();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});