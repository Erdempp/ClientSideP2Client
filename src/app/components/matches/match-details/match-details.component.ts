import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match.model';
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css'],
})
export class MatchDetailsComponent implements OnInit {
  private id: string;
  match: Match;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.matchService.get(this.id).subscribe((match) => {
      if (!match) {
        this.router.navigate(['matches']);
        return;
      }
      this.match = match;
    });
  }
}
