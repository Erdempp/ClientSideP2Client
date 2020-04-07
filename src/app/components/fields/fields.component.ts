import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { FieldService } from '../../services/field.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
})
export class FieldsComponent implements OnInit {
  fields: Field[];
  currentUser: User;

  constructor(
    private router: Router,
    private fieldService: FieldService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fieldService.getAll().subscribe((fields) => {
      this.fields = fields;
    });
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  createField() {
    this.router.navigate(['create-field']);
  }

  fieldDetails(field: Field) {
    this.router.navigate(['fields'], { queryParams: { id: field._id } });
  }

  editField(field: Field) {
    localStorage.removeItem('editFieldId');
    localStorage.setItem('editFieldId', field._id);
    this.router.navigate(['edit-field']);
  }

  deleteField(field: Field) {
    this.fieldService.delete(field._id).subscribe((data) => {
      this.fields = this.fields.filter((f) => f !== field);
    });
  }
}
