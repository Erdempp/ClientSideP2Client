import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {
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
    const teamId = localStorage.getItem('editTeamId');
    if (!teamId) {
      this.router.navigate(['teams']);
    }
    this.teamService.get(teamId).subscribe((data) => {
      console.log(data);
      this.teamForm.setValue({
        _id: data._id,
        name: data.name,
        city: data.city,
        gender: data.gender,
        description: data.description,
      });
    });
  }

  createForm() {
    this.teamForm = this.formBuilder.group({
      _id: [''],
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
      .update(this.teamForm.value._id, {
        name: this.teamForm.value.name,
        city: this.teamForm.value.city,
        gender: this.teamForm.value.gender,
        description: this.teamForm.value.description,
      })
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
