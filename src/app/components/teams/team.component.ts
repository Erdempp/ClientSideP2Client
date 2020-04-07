import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-teams',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  teams: Team[];
  currentUser: User;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.teamService.getAll().subscribe((teams) => {
      this.teams = teams;
    });
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
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

  deleteTeam(team: Team) {
    this.teamService.delete(team._id).subscribe((data) => {
      this.teams = this.teams.filter((t) => t !== team);
    });
  }
}
