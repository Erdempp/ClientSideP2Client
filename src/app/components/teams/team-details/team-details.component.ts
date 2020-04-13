import { Component, OnInit } from '@angular/core';
import { Team } from '../../../models/team.model';
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerDialogComponent } from './player-dialog/player-dialog.component';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  private id: string;
  private teamPlayerIds: string[];
  team: Team;
  currentUser: User;
  player: User;
  players: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    this.userService.getAll().subscribe((users) => {
      if (!users) {
        this.router.navigate(['teams']);
        return;
      }
      this.players = users
        .filter((u) => u._id !== this.currentUser._id)
        .filter((p) => !this.teamPlayerIds.includes(p._id));

      const dialogRef = this.dialog.open(PlayerDialogComponent, {
        width: '250px',
        data: { players: this.players },
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          return;
        }
        this.player = result;
        this.addPlayer();
      });
    });
  }

  addPlayer() {
    this.teamService.addPlayer(this.team._id, this.player).subscribe((team) => {
      this.team = team;
      this.teamPlayerIds.push(this.player._id);
    });
  }

  removePlayer(player: User) {
    this.teamService.removePlayer(this.team._id, player).subscribe((team) => {
      this.team = team;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.userService.getCurrentUser().subscribe((user) => {
      if (!user) {
        this.router.navigate(['teams']);
        return;
      }
      this.currentUser = user;
    });

    this.teamService.get(this.id).subscribe((team) => {
      if (!team) {
        this.router.navigate(['teams']);
        return;
      }
      this.team = team;
      this.teamPlayerIds = this.team.players.map((player) => player._id);
    });
  }
}
