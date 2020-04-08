import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from '../../../services/match.service';
import { first } from 'rxjs/operators';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../models/team.model';
import { FieldService } from '../../../services/field.service';
import { Field } from '../../../models/field.model';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css'],
})
export class CreateMatchComponent implements OnInit {
  matchForm: FormGroup;
  error: string;
  teams: Team[];
  fields: Field[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matchService: MatchService,
    private teamService: TeamService,
    private fieldService: FieldService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.teamService.getAll().subscribe((teams) => {
      this.teams = teams;
    })

    this.fieldService.getAll().subscribe((fields) => {
      this.fields = fields;
    })
  }

  get form() {
    return this.matchForm.controls;
  }

  createForm() {
    this.matchForm = this.formBuilder.group({
      awayTeam: ['', Validators.required],
      field: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.matchForm.invalid) {
      return;
    }

    this.matchService
      .create({
        awayTeam: this.form.awayTeam.value,
        field: this.form.field.value,
        startDateTime: this.form.startDateTime.value,
        endDateTime: this.form.endDateTime.value,
      })
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['matches']);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
