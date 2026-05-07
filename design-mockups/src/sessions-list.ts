import './shared/bootstrap';
import {
  formatDuration,
  formatStartedAt,
  sessionsList,
  statusLabel,
  statusTone,
  totalSeconds,
  type Session,
} from './shared/mock-data';

const root = document.getElementById('root')!;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function gameIcon(): string {
  return `<span class="session-card__icon"><ds-icon name="puzzle-piece" size="lg"></ds-icon></span>`;
}

function tableGameIcon(): string {
  return `<span class="cell-game__icon"><ds-icon name="puzzle-piece" size="md"></ds-icon></span>`;
}

function swatchList(s: Session): string {
  return `<span class="player-swatches">${s.players
    .map((p) => `<span style="background:${p.color}"></span>`)
    .join('')}</span>`;
}

function sessionTotal(s: Session): number {
  return s.players.reduce((sum, p) => sum + totalSeconds(p), 0);
}

function renderCard(s: Session): string {
  const total = sessionTotal(s);
  return `
    <a class="session-card" href="#">
      ${gameIcon()}
      <div>
        <div class="session-card__game">
          <span>${escapeHtml(s.game)}</span>
          <ds-badge tone="${statusTone(s.status)}">${statusLabel(s.status)}</ds-badge>
        </div>
        <p class="session-card__name">${escapeHtml(s.name)}</p>
        <div class="session-card__meta">
          <span><ds-icon name="users" size="sm"></ds-icon> ${s.players.length}</span>
          <span class="numeric">${total > 0 ? formatDuration(total) : '—'}</span>
          <span>${formatStartedAt(s.startedAt)}</span>
        </div>
      </div>
      <ds-icon name="chevron-right" size="md" style="color:var(--ds-color-fg-muted)"></ds-icon>
    </a>
  `;
}

root.innerHTML = `
  <ds-page-shell>
    <span slot="brand" class="brand-line">
      <ds-icon name="clock" size="md"></ds-icon> Board game time tracker
    </span>
    <ds-button slot="header-actions" variant="ghost" size="sm" aria-label="Toggle theme">
      <ds-icon slot="leading" name="moon" size="lg"></ds-icon>
    </ds-button>

    <div class="page-header">
      <h1 class="page-title">Sessions</h1>
      <ds-button variant="primary" size="sm">
        <ds-icon slot="leading" name="plus" size="md"></ds-icon>
        New session
      </ds-button>
    </div>

    <div class="sessions-cards">
      ${sessionsList.map(renderCard).join('')}
    </div>

    <div class="sessions-table">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Status</th>
            <th>Players</th>
            <th class="col-started">Started</th>
            <th class="align-right">Duration</th>
          </tr>
        </thead>
        <tbody>
          ${sessionsList
            .map(
              (s) => `
              <tr>
                <td>
                  <div class="cell-game">
                    ${tableGameIcon()}
                    <div>
                      <div class="cell-game__title">${escapeHtml(s.game)}</div>
                      <p class="cell-game__sub">${escapeHtml(s.name)}</p>
                    </div>
                  </div>
                </td>
                <td><ds-badge tone="${statusTone(s.status)}">${statusLabel(s.status)}</ds-badge></td>
                <td>
                  <span class="cell-players">
                    ${swatchList(s)}
                    <span class="player-count">${s.players.length}</span>
                  </span>
                </td>
                <td class="col-started numeric">${formatStartedAt(s.startedAt)}</td>
                <td class="numeric align-right">${sessionTotal(s) > 0 ? formatDuration(sessionTotal(s)) : '—'}</td>
              </tr>
            `,
            )
            .join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="table-footer">${sessionsList.length} ${sessionsList.length === 1 ? 'session' : 'sessions'}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </ds-page-shell>
`;
