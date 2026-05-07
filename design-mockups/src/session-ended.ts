import './shared/bootstrap';
import {
  formatDuration,
  formatStartedAt,
  sessions,
  statusLabel,
  statusTone,
  totalSeconds,
} from './shared/mock-data';

const session = sessions.ended;
const root = document.getElementById('root')!;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

const totals = session.players.map(totalSeconds);
const sessionTotal = totals.reduce((a, b) => a + b, 0);
const longestMove = Math.max(
  ...session.players.flatMap((p) => p.moves.map((m) => m.duration)),
);
const longestMovePlayer = session.players.find((p) =>
  p.moves.some((m) => m.duration === longestMove),
)!;
const turnsCount = Math.max(...session.players.map((p) => p.moves.length));

type ChartRow = Record<string, unknown> & { turn: string };
const chartData: ChartRow[] = [];
for (let t = 0; t < turnsCount; t++) {
  const row: ChartRow = { turn: `Turn ${t + 1}` };
  for (const p of session.players) {
    row[p.id] = p.moves[t]?.duration ?? 0;
  }
  chartData.push(row);
}

const chartSeries = session.players.map((p) => ({
  key: p.id,
  label: p.name,
  color: p.color,
}));

root.innerHTML = `
  <ds-page-shell>
    <span slot="brand" class="brand-line">
      <ds-icon name="clock" size="md"></ds-icon> Board game time tracker
    </span>
    <ds-button slot="header-actions" variant="ghost" size="sm" aria-label="Toggle theme">
      <ds-icon slot="leading" name="moon" size="lg"></ds-icon>
    </ds-button>

    <nav style="font-size:var(--ds-font-size-sm);color:var(--ds-color-fg-muted);margin-bottom:var(--ds-space-3)">
      <a href="#" style="color:inherit;text-decoration:none">Sessions</a>
      <ds-icon name="chevron-right" size="sm" style="vertical-align:-2px;margin-inline:var(--ds-space-1)"></ds-icon>
      <span style="color:var(--ds-color-fg)">${escapeHtml(session.name)}</span>
    </nav>

    <div class="page-header">
      <div class="page-header__titles">
        <h1>${escapeHtml(session.game)}</h1>
        <p class="meta">
          <ds-badge tone="${statusTone(session.status)}">${statusLabel(session.status)}</ds-badge>
          <span>${formatStartedAt(session.startedAt)}</span>
          <span>·</span>
          <span>${session.players.length} players</span>
        </p>
      </div>
    </div>

    <div class="stat-summary">
      <div class="stat-card">
        <p class="stat-card__label">Total time</p>
        <p class="stat-card__value">${formatDuration(sessionTotal)}</p>
        <p class="stat-card__sub">across ${turnsCount} turns</p>
      </div>
      <div class="stat-card">
        <p class="stat-card__label">Average move</p>
        <p class="stat-card__value">${formatDuration(Math.round(sessionTotal / session.players.flatMap((p) => p.moves).length))}</p>
        <p class="stat-card__sub">${session.players.flatMap((p) => p.moves).length} moves total</p>
      </div>
      <div class="stat-card">
        <p class="stat-card__label">Longest move</p>
        <p class="stat-card__value">${formatDuration(longestMove)}</p>
        <p class="stat-card__sub">${escapeHtml(longestMovePlayer.name)}</p>
      </div>
      <div class="stat-card">
        <p class="stat-card__label">Turns</p>
        <p class="stat-card__value">${turnsCount}</p>
        <p class="stat-card__sub">complete turns</p>
      </div>
    </div>

    <div class="split">
      <ds-card elevation="sm">
        <span slot="title">Move duration</span>
        <ds-bar-chart
          domain="turn"
          x-axis-label="Turn"
          y-axis-label="Seconds"
          height="280"
          stacked
          id="chart"
        ></ds-bar-chart>
      </ds-card>

      <ds-card elevation="sm">
        <span slot="title">Players</span>
        <ol class="player-summary">
          ${session.players
            .map(
              (p) => `
                <li>
                  <span class="swatch-dot" style="background:${p.color}"></span>
                  <span class="name">${escapeHtml(p.name)}</span>
                  <span class="total">${formatDuration(totalSeconds(p))}</span>
                  <span class="avg">avg ${formatDuration(Math.round(totalSeconds(p) / p.moves.length))}</span>
                </li>
              `,
            )
            .join('')}
        </ol>
      </ds-card>
    </div>
  </ds-page-shell>
`;

const chart = document.getElementById('chart') as HTMLElement & {
  data: unknown;
  series: unknown;
};
chart.data = chartData;
chart.series = chartSeries;
