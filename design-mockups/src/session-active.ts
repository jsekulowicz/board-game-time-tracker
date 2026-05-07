import './shared/bootstrap';
import {
  formatDuration,
  sessions,
  statusLabel,
  statusTone,
  totalSeconds,
  type Player,
} from './shared/mock-data';

const session = sessions.inProgress;
const root = document.getElementById('root')!;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function renderPlayer(p: Player): string {
  const tracking = p.status === 'tracking';
  const ctaLabel = tracking ? 'Stop' : 'Track';
  const ctaVariant = tracking ? 'primary' : 'secondary';
  const time = formatDuration(totalSeconds(p));
  const tag = (() => {
    switch (p.status) {
      case 'tracking':
        return `<ds-badge tone="success">Tracking</ds-badge>`;
      case 'ready_to_move':
        return `<ds-badge tone="accent">Ready</ds-badge>`;
      case 'turn_ended':
        return `<ds-badge tone="neutral">Turn ended</ds-badge>`;
      case 'passed':
        return `<ds-badge tone="neutral">Passed</ds-badge>`;
    }
  })();
  return `
    <div class="player-card" data-tracking="${tracking}" data-status="${p.status}">
      <div class="player-card__head">
        <span class="player-card__color" style="background:${p.color}"></span>
        <span class="player-card__name">${escapeHtml(p.name)}</span>
        ${tag}
      </div>
      <p class="player-card__time ${tracking ? 'player-card__time--running' : ''}">${time === '0s' ? '0s' : time}</p>
      <p class="player-card__sub">
        <span>${p.moves.length} ${p.moves.length === 1 ? 'move' : 'moves'}</span>
      </p>
      <ds-button class="player-card__cta" variant="${ctaVariant}" size="md" full-width>
        ${ctaLabel}
      </ds-button>
    </div>
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

    <div class="active-page">
      <nav style="font-size:var(--ds-font-size-sm);color:var(--ds-color-fg-muted);margin-bottom:var(--ds-space-3)">
        <a href="#" style="color:inherit;text-decoration:none">Sessions</a>
        <ds-icon name="chevron-right" size="sm" style="vertical-align:-2px;margin-inline:var(--ds-space-1)"></ds-icon>
        <span style="color:var(--ds-color-fg)">${escapeHtml(session.name)}</span>
      </nav>

      <div class="page-header">
        <h1 class="page-title">${escapeHtml(session.game)}</h1>
        <div class="page-header__meta">
          <ds-badge tone="${statusTone(session.status)}">${statusLabel(session.status)}</ds-badge>
          <span class="meta-line">
            <span>Turn ${session.currentTurnIndex + 1}</span>
            <span class="dot"></span>
            <span>Move ${session.currentMoveIndex + 1}</span>
            <span class="dot"></span>
            <span>${session.players.length} players</span>
          </span>
        </div>
      </div>

      <div class="player-grid">
        ${session.players.map(renderPlayer).join('')}
      </div>

      <div class="action-bar">
        <ds-button variant="ghost" size="sm" class="grow">
          <ds-icon slot="leading" name="eye-slash" size="lg"></ds-icon>
          Hide tracked time
        </ds-button>
        <ds-button variant="secondary" size="sm">Pause</ds-button>
        <ds-button variant="danger" size="sm">End</ds-button>
      </div>
    </div>
  </ds-page-shell>
`;
