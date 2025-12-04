import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { HomeContent } from '../../features/home/home';

export const homeDataResolver: ResolveFn<HomeContent> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    return {
      presentation: 'Presentation description',
      introduction: 'Introduction: describe services',
      description: 'Some detailed description',
    };
  };
  


