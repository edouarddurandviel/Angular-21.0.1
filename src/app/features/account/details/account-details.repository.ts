import { Post } from './signal/account-details.interface';
import { Observable } from 'rxjs';

export abstract class AccountdetailsRepository {
  abstract getPost(id: number): Observable<Post>;
}
