import { create } from 'zustand';
import type { PlayerStats, TeamStats, Game } from '../types/stats';

interface StatsState {
  playerStats: PlayerStats[];
  teamStats: TeamStats[];
  games: Game[];
  getPlayerStats: (playerId: string) => PlayerStats[];
  getGameStats: (gameId: string) => {
    team: TeamStats;
    players: PlayerStats[];
  };
  getSeasonAverages: (playerId: string) => PlayerStats;
  getTeamSeasonAverages: () => TeamStats;
  addPlayerStats: (stats: PlayerStats) => void;
  addTeamStats: (stats: TeamStats) => void;
  addGame: (game: Game) => void;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  playerStats: [],
  teamStats: [],
  games: [],

  getPlayerStats: (playerId) => {
    return get().playerStats.filter(stats => stats.playerId === playerId);
  },

  getGameStats: (gameId) => {
    const team = get().teamStats.find(stats => stats.gameId === gameId)!;
    const players = get().playerStats.filter(stats => stats.gameId === gameId);
    return { team, players };
  },

  getSeasonAverages: (playerId) => {
    const stats = get().getPlayerStats(playerId);
    if (stats.length === 0) return {} as PlayerStats;

    const total = stats.reduce((acc, curr) => ({
      points: acc.points + curr.points,
      assists: acc.assists + curr.assists,
      rebounds: {
        offensive: acc.rebounds.offensive + curr.rebounds.offensive,
        defensive: acc.rebounds.defensive + curr.rebounds.defensive,
        total: acc.rebounds.total + curr.rebounds.total,
      },
      steals: acc.steals + curr.steals,
      blocks: acc.blocks + curr.blocks,
      turnovers: acc.turnovers + curr.turnovers,
      fouls: acc.fouls + curr.fouls,
      minutesPlayed: acc.minutesPlayed + curr.minutesPlayed,
      fieldGoals: {
        made: acc.fieldGoals.made + curr.fieldGoals.made,
        attempted: acc.fieldGoals.attempted + curr.fieldGoals.attempted,
        percentage: 0,
      },
      threePointers: {
        made: acc.threePointers.made + curr.threePointers.made,
        attempted: acc.threePointers.attempted + curr.threePointers.attempted,
        percentage: 0,
      },
      freeThrows: {
        made: acc.freeThrows.made + curr.freeThrows.made,
        attempted: acc.freeThrows.attempted + curr.freeThrows.attempted,
        percentage: 0,
      },
    }));

    const games = stats.length;
    const averages = {
      ...total,
      points: total.points / games,
      assists: total.assists / games,
      rebounds: {
        offensive: total.rebounds.offensive / games,
        defensive: total.rebounds.defensive / games,
        total: total.rebounds.total / games,
      },
      steals: total.steals / games,
      blocks: total.blocks / games,
      turnovers: total.turnovers / games,
      fouls: total.fouls / games,
      minutesPlayed: total.minutesPlayed / games,
      fieldGoals: {
        ...total.fieldGoals,
        percentage: (total.fieldGoals.made / total.fieldGoals.attempted) * 100,
      },
      threePointers: {
        ...total.threePointers,
        percentage: (total.threePointers.made / total.threePointers.attempted) * 100,
      },
      freeThrows: {
        ...total.freeThrows,
        percentage: (total.freeThrows.made / total.freeThrows.attempted) * 100,
      },
    };

    return averages as PlayerStats;
  },

  getTeamSeasonAverages: () => {
    const { teamStats } = get();
    if (teamStats.length === 0) return {} as TeamStats;

    const total = teamStats.reduce((acc, curr) => ({
      score: acc.score + curr.score,
      opponentScore: acc.opponentScore + curr.opponentScore,
      rebounds: {
        offensive: acc.rebounds.offensive + curr.rebounds.offensive,
        defensive: acc.rebounds.defensive + curr.rebounds.defensive,
        total: acc.rebounds.total + curr.rebounds.total,
      },
      assists: acc.assists + curr.assists,
      steals: acc.steals + curr.steals,
      blocks: acc.blocks + curr.blocks,
      turnovers: acc.turnovers + curr.turnovers,
      fouls: acc.fouls + curr.fouls,
      fieldGoals: {
        made: acc.fieldGoals.made + curr.fieldGoals.made,
        attempted: acc.fieldGoals.attempted + curr.fieldGoals.attempted,
        percentage: 0,
      },
      threePointers: {
        made: acc.threePointers.made + curr.threePointers.made,
        attempted: acc.threePointers.attempted + curr.threePointers.attempted,
        percentage: 0,
      },
      freeThrows: {
        made: acc.freeThrows.made + curr.freeThrows.made,
        attempted: acc.freeThrows.attempted + curr.freeThrows.attempted,
        percentage: 0,
      },
    }));

    const games = teamStats.length;
    const averages = {
      ...total,
      score: total.score / games,
      opponentScore: total.opponentScore / games,
      rebounds: {
        offensive: total.rebounds.offensive / games,
        defensive: total.rebounds.defensive / games,
        total: total.rebounds.total / games,
      },
      assists: total.assists / games,
      steals: total.steals / games,
      blocks: total.blocks / games,
      turnovers: total.turnovers / games,
      fouls: total.fouls / games,
      fieldGoals: {
        ...total.fieldGoals,
        percentage: (total.fieldGoals.made / total.fieldGoals.attempted) * 100,
      },
      threePointers: {
        ...total.threePointers,
        percentage: (total.threePointers.made / total.threePointers.attempted) * 100,
      },
      freeThrows: {
        ...total.freeThrows,
        percentage: (total.freeThrows.made / total.freeThrows.attempted) * 100,
      },
    };

    return averages as TeamStats;
  },

  addPlayerStats: (stats) => {
    set((state) => ({
      playerStats: [...state.playerStats, stats],
    }));
  },

  addTeamStats: (stats) => {
    set((state) => ({
      teamStats: [...state.teamStats, stats],
    }));
  },

  addGame: (game) => {
    set((state) => ({
      games: [...state.games, game],
    }));
  },
}));