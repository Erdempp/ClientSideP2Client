import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent implements OnInit {
  teamForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private teamService: TeamService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get form() {
    return this.teamForm.controls;
  }

  createForm() {
    this.teamForm = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.teamForm.invalid) {
      return;
    }

    this.teamService
      .create(
        this.form.name.value,
        this.form.city.value,
        this.form.gender.value,
        this.form.description.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['teams']);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
