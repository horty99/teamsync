export interface PlayerStats {
  id: string;
  playerId: string;
  gameId: string;
  points: number;
  assists: number;
  rebounds: {
    offensive: number;
    defensive: number;
    total: number;
  };
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  minutesPlayed: number;
  fieldGoals: {
    made: number;
    attempted: number;
    percentage: number;
  };
  threePointers: {
    made: number;
    attempted: number;
    percentage: number;
  };
  freeThrows: {
    made: number;
    attempted: number;
    percentage: number;
  };
}

export interface TeamStats {
  id: string;
  gameId: string;
  score: number;
  opponentScore: number;
  rebounds: {
    offensive: number;
    defensive: number;
    total: number;
  };
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fieldGoals: {
    made: number;
    attempted: number;
    percentage: number;
  };
  threePointers: {
    made: number;
    attempted: number;
    percentage: number;
  };
  freeThrows: {
    made: number;
    attempted: number;
    percentage: number;
  };
}

export interface Game {
  id: string;
  date: Date;
  opponent: string;
  location: string;
  isHome: boolean;
  result: 'W' | 'L';
  score: {
    team: number;
    opponent: number;
  };
}