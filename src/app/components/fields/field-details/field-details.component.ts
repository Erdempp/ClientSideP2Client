import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FieldService } from '../../../services/field.service';
import { Field } from '../../../models/field.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FacilityDialogComponent } from './facility-dialog/facility-dialog.component';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css'],
})
export class FieldDetailsComponent implements OnInit, OnDestroy {
  private id: string;
  private sub: Subscription;
  private field: Field;
  currentUser: User;
  facility: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldService: FieldService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(FacilityDialogComponent, {
      width: '250px',
      data: {},
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.facility = result;
      this.addFacility();
    });
  }

  addFacility() {
    this.fieldService.addFacility(this.field._id, this.facility).subscribe((field) => {
      this.field = field;
    })
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.fieldService.get(this.id).subscribe((field) => {
      this.field = field;
      if (!this.field) {
        this.router.navigate(['fields']);
      }
    });

    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
