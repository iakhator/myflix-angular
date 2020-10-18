import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = {username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

    ngOnInit(): void {
    }

  login(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    // Logic for a successful user registration goes here! To be implemented
    if(result) {
      console.log(result)
      localStorage.setItem('myFlixuser', JSON.stringify(result))
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('You have successfully logged in', 'OK', {
         duration: 2000
      });
    }
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}