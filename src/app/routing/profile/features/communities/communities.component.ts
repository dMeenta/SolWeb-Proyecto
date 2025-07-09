import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Game } from '../../../../models/Game';
import { Router } from '@angular/router';

interface FinalFormatted {
  game: Game;
  joinedAt: {
    date: string;
    time: string;
  };
}

@Component({
  selector: 'app-communities',
  imports: [NgFor, CommonModule],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.css',
})
export class CommunitiesComponent implements OnInit {
  userCommunities: FinalFormatted[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserCommunities(); // llamada desde OnInit
  }

  /* getUser() {
    return this._sharedService.getUserLogged();
  } */

  goToCommunity(idGame: String) {
    this.router.navigateByUrl(`/community/${idGame}`);
  }

  async loadUserCommunities() {
    console.log('Aquí deberían haber comunidades');
    /* const firebaseData = await this.getFirebaseData();
    if (!firebaseData) return;
    console.log(firebaseData);

    const mysqlData = await this.getMsqlData(firebaseData);
    if (!mysqlData) return;

    this.userCommunities = mysqlData; */
  }

  /* async getMsqlData(
    firebaseData: Formatted[]
  ): Promise<FinalFormatted[] | null> {
    const idList = firebaseData.map((item) => item.gameId);

    try {
      const response: ApiResponse<Game[]> = await firstValueFrom(
        this._gameService.getUserGames(idList)
      );

      if (!response.success) {
        console.error('Error al obtener juegos del usuario');
        return null;
      }

      const games: Game[] = response.data;

      console.log(games);
      const result: FinalFormatted[] = firebaseData
        .map((item) => {
          const game = games.find((j) => j.id === item.gameId);
          return {
            game,
            joinedAt: item.joinedAt,
          };
        })
        .filter((item): item is FinalFormatted => item !== null);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  } */

  /* async getFirebaseData(): Promise<Formatted[] | null> {
    const userId = this.getUser()?.uid;
    if (!userId) return null;

    try {
      const response: ApiResponse<any> = await firstValueFrom(
        this._communityService.getCommunitiesByUser(userId)
      );

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      const formatted: Formatted[] = response.data.map((item: FirebaseData) => {
        const datetime = new Date(item.joinedAt.seconds * 1000);
        return {
          gameId: Number(item.gameId),
          joinedAt: {
            date: datetime.toLocaleDateString(),
            time: datetime.toLocaleTimeString(),
          },
        };
      });

      return formatted;
    } catch (error) {
      console.error(error);
      return null;
    }
  } */
}
