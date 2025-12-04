import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { AccountDetails } from '../../features/account/details/account-details.component';


export const accountResolver: ResolveFn<AccountDetails> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return {
    id: route.queryParams[':id'],
    title: 'Account page details',
    description: 'Account page details description...',
    content: [
      { title: 'Section 1', content: 'Content for section 1' },
      { title: 'Section 2', content: 'Content for section 2' },
      { title: 'Section 3', content: 'Content for section 3' },
    ],
  };
};


  


