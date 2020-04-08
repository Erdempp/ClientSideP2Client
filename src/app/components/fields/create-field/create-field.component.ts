import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldService } from '../../../services/field.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css'],
})
export class CreateFieldComponent implements OnInit {
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
  }

  get form() {
    return this.fieldForm.controls;
  }

  createForm() {
    this.fieldForm = this.formBuilder.group({
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
      .create(
        this.form.name.value,
        {
          address: this.form.address.value,
          postalCode: this.form.postalCode.value,
        },
        this.form.length.value,
        this.form.width.value,
        this.form.description.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['fields']);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
