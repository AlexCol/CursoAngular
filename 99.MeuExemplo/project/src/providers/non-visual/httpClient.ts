import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiBaseUrlInterceptor } from '../../interceptors/api-base-url.interceptor';

export const httpClientConfig = provideHttpClient(withInterceptors([apiBaseUrlInterceptor]));
