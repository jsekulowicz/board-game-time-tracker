export type GameSessionStatus =
  | 'ready_to_track'
  | 'in_progress'
  | 'paused'
  | 'ended';

export type PlayerStatus = 'tracking' | 'ready_to_move' | 'turn_ended' | 'passed';

export type Move = {
  moveIndex: number;
  turnIndex: number;
  duration: number;
};

export type Player = {
  id: string;
  name: string;
  color: string;
  status: PlayerStatus;
  moves: Move[];
};

export type Session = {
  id: string;
  name: string;
  game: string;
  status: GameSessionStatus;
  startedAt: string;
  currentTurnIndex: number;
  currentMoveIndex: number;
  players: Player[];
};

const palette = ['#E2341D', '#2453B4', '#1F8B5C', '#A6691A', '#7C3AED'];

function makeMoves(durations: number[], turns = 3): Move[] {
  return durations.map((duration, i) => ({
    moveIndex: i,
    turnIndex: Math.floor(i / Math.max(1, Math.floor(durations.length / turns))),
    duration,
  }));
}

export const sessions: Record<
  'ready' | 'inProgress' | 'paused' | 'ended',
  Session
> = {
  ready: {
    id: '1',
    name: 'Friday game night',
    game: 'Wingspan',
    status: 'ready_to_track',
    startedAt: '2026-05-02T19:00:00Z',
    currentTurnIndex: 0,
    currentMoveIndex: 0,
    players: [
      { id: 'p1', name: 'Ada', color: palette[0], status: 'ready_to_move', moves: [] },
      { id: 'p2', name: 'Brendan', color: palette[1], status: 'ready_to_move', moves: [] },
      { id: 'p3', name: 'Cara', color: palette[2], status: 'ready_to_move', moves: [] },
      { id: 'p4', name: 'Dilan', color: palette[3], status: 'ready_to_move', moves: [] },
    ],
  },
  inProgress: {
    id: '2',
    name: 'Lunchtime quickie',
    game: 'Splendor',
    status: 'in_progress',
    startedAt: '2026-05-06T12:30:00Z',
    currentTurnIndex: 2,
    currentMoveIndex: 5,
    players: [
      {
        id: 'p1',
        name: 'Ada',
        color: palette[0],
        status: 'turn_ended',
        moves: makeMoves([42, 38, 51]),
      },
      {
        id: 'p2',
        name: 'Brendan',
        color: palette[1],
        status: 'tracking',
        moves: makeMoves([55, 47]),
      },
      {
        id: 'p3',
        name: 'Cara',
        color: palette[2],
        status: 'ready_to_move',
        moves: makeMoves([39, 44]),
      },
    ],
  },
  paused: {
    id: '3',
    name: 'Saturday epic',
    game: 'Twilight Imperium',
    status: 'paused',
    startedAt: '2026-05-04T10:15:00Z',
    currentTurnIndex: 4,
    currentMoveIndex: 18,
    players: [
      { id: 'p1', name: 'Ada', color: palette[0], status: 'turn_ended', moves: makeMoves([182, 220, 165, 198]) },
      { id: 'p2', name: 'Brendan', color: palette[1], status: 'turn_ended', moves: makeMoves([240, 211, 195, 250]) },
      { id: 'p3', name: 'Cara', color: palette[2], status: 'tracking', moves: makeMoves([225, 234, 209]) },
      { id: 'p4', name: 'Dilan', color: palette[3], status: 'ready_to_move', moves: makeMoves([250, 178, 202, 195]) },
      { id: 'p5', name: 'Esra', color: palette[4], status: 'ready_to_move', moves: makeMoves([198, 215, 209, 230]) },
    ],
  },
  ended: {
    id: '4',
    name: 'Tuesday duel',
    game: 'Azul',
    status: 'ended',
    startedAt: '2026-04-29T20:00:00Z',
    currentTurnIndex: 5,
    currentMoveIndex: 19,
    players: [
      {
        id: 'p1',
        name: 'Ada',
        color: palette[0],
        status: 'turn_ended',
        moves: makeMoves([34, 41, 28, 38, 45], 5),
      },
      {
        id: 'p2',
        name: 'Brendan',
        color: palette[1],
        status: 'turn_ended',
        moves: makeMoves([42, 36, 49, 33, 40], 5),
      },
      {
        id: 'p3',
        name: 'Cara',
        color: palette[2],
        status: 'turn_ended',
        moves: makeMoves([28, 35, 31, 39, 32], 5),
      },
      {
        id: 'p4',
        name: 'Dilan',
        color: palette[3],
        status: 'turn_ended',
        moves: makeMoves([55, 48, 41, 52, 47], 5),
      },
    ],
  },
};

export const sessionsList: Session[] = [
  sessions.inProgress,
  sessions.paused,
  sessions.ended,
  sessions.ready,
  {
    ...sessions.ended,
    id: '5',
    name: 'Birthday board games',
    game: 'Catan',
    startedAt: '2026-04-22T18:30:00Z',
  },
  {
    ...sessions.ended,
    id: '6',
    name: 'Strategy Sunday',
    game: 'Brass: Birmingham',
    startedAt: '2026-04-19T14:00:00Z',
  },
];

export function totalSeconds(p: Player): number {
  return p.moves.reduce((sum, m) => sum + m.duration, 0);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

export function formatStartedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function statusLabel(status: GameSessionStatus): string {
  switch (status) {
    case 'ready_to_track':
      return 'Ready';
    case 'in_progress':
      return 'In progress';
    case 'paused':
      return 'Paused';
    case 'ended':
      return 'Ended';
  }
}

export function statusTone(
  status: GameSessionStatus,
): 'neutral' | 'accent' | 'success' | 'warning' | 'danger' {
  switch (status) {
    case 'ready_to_track':
      return 'neutral';
    case 'in_progress':
      return 'success';
    case 'paused':
      return 'warning';
    case 'ended':
      return 'accent';
  }
}
