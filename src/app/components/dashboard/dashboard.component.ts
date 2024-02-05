import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { StorageService } from '../../services/storage.service';
import { InstanceObject } from '../../models/instance-object.model';
import { AwsService } from '../../services/aws.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatSnackBarModule, MatButtonModule, NgFor, NgIf, NgStyle, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor (private storage: StorageService, private aws: AwsService, public snackBar: MatSnackBar) {}
  currentUser : any;
  instancesList : InstanceObject[] = [];

  ngOnInit(): void {
    this.currentUser = this.storage.getUser().data.user;
    this.getInstances ();
  }

  getInstance (index : number) {
    const instance = this.instancesList.splice(index, 1);
    this.aws.getServerStatus(instance).subscribe({
      next: (data) => {
        this.instancesList.push (new InstanceObject(data[0]));
      },
      error: (err: HttpErrorResponse) => {
        console.log (err.error.error.message);
        alert(err.error.error.message);
        this.openSnackBar ("Error obtaining instances!", "Dismiss")
      }
    });
  }

  getInstances () {
    this.instancesList = [];
    this.aws.getServerStatus().subscribe({
      next: (data) => {
        data.forEach((element : any) => {
          let instance = new InstanceObject(element);
          this.instancesList.push (instance);
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log (err.error.error.message);
        this.openSnackBar ("Error obtaining instances!", "Dismiss")
      }
    });
  }

  toggleInstance (instance : InstanceObject) {
    if (instance.instanceStatus == "stopped") {
      this.aws.startServer(instance.instanceId).subscribe({
        next: (data) => {
          console.log (data);
          if (data.status == true) {
            this.openSnackBar (instance.instanceName + " Instance started!", "Dismiss");
            this.getInstances ();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log (err.error.error.message);
          alert(err.error.error.message);
          this.getInstances ();
        }
      });
      
    }
    else if (instance.instanceStatus == "running") {
      this.aws.stopServer(instance.instanceId).subscribe({
        next: (data) => {
          console.log (data);
          if (data.status == true) {
            this.openSnackBar (instance.instanceName + " Instance stopped!", "Dismiss");
            this.getInstances ();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log (err.error.error.message);
          alert(err.error.error.message);
          this.getInstances ();
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
 } 
}
