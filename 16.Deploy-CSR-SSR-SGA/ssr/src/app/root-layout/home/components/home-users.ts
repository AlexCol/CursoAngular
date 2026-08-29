import { HttpClient } from '@angular/common/http';
import { afterNextRender, Component, inject, signal } from '@angular/core';
import { User } from '../../../../models/Users';
import { LoggerService } from '../../../../services/logger.service';

@Component({
  selector: 'app-home-users',
  host: { '[class]': 'styles.container' },
  template: `
    <!-- <div [className]="styles.container"> -->
    <h2>Fetch Users</h2>
    <p>Click the button below to fetch users from the server.</p>
    <div [className]="styles.buttonContainer">
      <button [className]="styles.fetchUsersButton" (click)="handleClick()">Fetch Users</button>
      <button [className]="styles.clearUsersButton" (click)="users.set([])">Clear Users</button>
    </div>

    <div [className]="styles.usersList">
      @for (user of users(); track $index) {
        <div [className]="styles.userItem">
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
      }
    </div>
    <!-- </div> -->
  `,
})
export class HomeUsers {
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  styles = usersStyles;
  users = signal<User[]>([]);

  constructor() {
    afterNextRender(() => {
      this.logger.log('HomeUsers runs only on client.');
    });
  }

  handleClick(): void {
    // Como a URL é relativa: '/api/users'
    // ela funciona no mesmo domínio e porta da aplicação, tanto localmente quanto depois do deploy.
    this.http.get<User[]>('/api/users').subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: (error) => {
        this.logger.error('Erro ao buscar usuários:', error);
      },
    });
  }
}

//#region styles
const usersStyles = {
  container: 'w-full mt-4 flex flex-col items-center gap-2 border-t pt-4',
  buttonContainer: 'flex gap-2',
  fetchUsersButton: 'px-4 py-2 bg-green-500 text-white rounded',
  clearUsersButton: 'px-4 py-2 bg-red-500 text-white rounded',

  // usersList: 'mt-4 flex flex-col gap-2',
  usersList: 'mt-4 grid w-full grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:grid-cols-3',
  userItem: 'p-2 border rounded',
};
//#endregion
