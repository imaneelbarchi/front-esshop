import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  constructor(private userService:UserService) {
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  deleteUser(id:string) {
    this.userService.deleteUser(id).subscribe(() =>{
      this.users = this.users.filter(user => user.id !== id);
    },error =>{
      console.log(error);
    })
  }
}
