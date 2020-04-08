import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[];
  currentUser: User;

  constructor(
    private router: Router,
    private matchService: MatchService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.matchService.getAll().subscribe((matches) => {
      this.matches = matches;
    });
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  createMatch() {
    this.router.navigate(['create-match']);
  }

  editMatch(match: Match) {
    localStorage.removeItem('editMatchId');
    localStorage.setItem('editMatchId', match._id);
    this.router.navigate(['edit-match']);
  }

  deleteMatch(match: Match) {
    this.matchService.delete(match._id).subscribe(() => {
      this.matches = this.matches.filter((m) => m !== match);
    });
  }
}
