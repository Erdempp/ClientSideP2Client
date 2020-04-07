import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  teams: Team[];

  constructor(private router: Router, private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getAll().subscribe((teams) => {
      this.teams = teams;
      console.log(teams);
    });
  }

  createTeam() {
    this.router.navigate(['create-team']);
  }

  editTeam(team: Team) {
    localStorage.removeItem('editTeamId');
    localStorage.setItem('editTeamId', team._id);
    this.router.navigate(['edit-team']);
  }
}
