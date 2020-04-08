import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldService } from '../../../services/field.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css'],
})
export class EditFieldComponent implements OnInit {
  fieldForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fieldService: FieldService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const fieldId = localStorage.getItem('editFieldId');
    if (!fieldId) {
      this.router.navigate(['fields']);
    }
    this.fieldService.get(fieldId).subscribe((data) => {
      this.fieldForm.setValue({
        _id: data._id,
        name: data.name,
        address: data.location.address,
        postalCode: data.location.postalCode,
        length: data.length,
        width: data.width,
        description: data.description,
      });
    });
  }

  createForm() {
    this.fieldForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.fieldForm.invalid) {
      return;
    }

    this.fieldService
      .update(this.fieldForm.value._id, {
        name: this.fieldForm.value.name,
        location: {
          address: this.fieldForm.value.address,
          postalCode: this.fieldForm.value.postalCode,
        },
        length: this.fieldForm.value.length,
        width: this.fieldForm.value.width,
        description: this.fieldForm.value.description,
      })
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['fields']);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
