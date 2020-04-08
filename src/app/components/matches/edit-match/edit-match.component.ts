import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from '../../../services/match.service';
import { first } from 'rxjs/operators';
import { TeamService } from '../../../services/team.service';
import { FieldService } from '../../../services/field.service';
import { Team } from '../../../models/team.model';
import { Field } from '../../../models/field.model';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css'],
})
export class EditMatchComponent implements OnInit {
  matchForm: FormGroup;
  error: string;
  teams: Team[];
  fields: Field[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matchService: MatchService,
    private teamService: TeamService,
    private fieldService: FieldService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const matchId = localStorage.getItem('editMatchId');
    if (!matchId) {
      this.router.navigate(['matches']);
    }
    this.matchService.get(matchId).subscribe((data) => {
      this.matchForm.setValue({
        _id: data._id,
        awayTeam: data.awayTeam._id,
        field: data.field._id,
        startDateTime: data.startDateTime.toString().slice(0, -1),
        endDateTime: data.endDateTime.toString().slice(0, -1),
      });
    });

    this.teamService.getAll().subscribe((teams) => {
      this.teams = teams;
    });

    this.fieldService.getAll().subscribe((fields) => {
      this.fields = fields;
    });
  }

  createForm() {
    this.matchForm = this.formBuilder.group({
      _id: [''],
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
      .update(this.matchForm.value._id, {
        awayTeam: this.matchForm.value.name,
        field: this.matchForm.value.field,
        startDateTime: this.matchForm.value.startDateTime,
        endDateTime: this.matchForm.value.endDateTime,
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
