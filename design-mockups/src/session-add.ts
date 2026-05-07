import './shared/bootstrap';

const root = document.getElementById('root')!;

type DraftPlayer = { name: string; color: string };

const players: DraftPlayer[] = [
  { name: 'Ada', color: '#E2341D' },
  { name: 'Brendan', color: '#2453B4' },
  { name: 'Cara', color: '#1F8B5C' },
  { name: '', color: '#A6691A' },
];

function renderPlayer(p: DraftPlayer, i: number): string {
  return `
    <ds-list-item>
      <button
        slot="leading"
        type="button"
        class="player-row__color"
        aria-label="Player ${i + 1} colour"
        style="background:${p.color}"
      ></button>
      <input
        type="text"
        class="player-row__name"
        placeholder="Player ${i + 1} name"
        value="${p.name.replace(/"/g, '&quot;')}"
      />
      <ds-button
        slot="trailing"
        variant="ghost"
        size="sm"
        label="Remove player"
        aria-label="Remove player"
      >
        <ds-icon slot="leading" name="x-mark" size="lg"></ds-icon>
      </ds-button>
    </ds-list-item>
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

    <nav class="breadcrumbs">
      <a href="#">Sessions</a>
      <ds-icon name="chevron-right" size="sm"></ds-icon>
      <span>New session</span>
    </nav>

    <h1 class="page-title">New session</h1>

    <ds-card class="add-card" elevation="sm">
      <div class="fields">
        <ds-text-field label="Session name" placeholder="e.g. Friday game night"></ds-text-field>
        <ds-text-field label="Game" placeholder="e.g. Wingspan"></ds-text-field>
      </div>

      <header class="players-header">
        <span class="players-header__title">Players</span>
        <span class="players-header__count">${players.length} added</span>
      </header>

      <ds-list>
        ${players.map(renderPlayer).join('')}
      </ds-list>

      <ds-button class="add-player-btn" variant="secondary" size="sm">
        <ds-icon slot="leading" name="plus" size="md"></ds-icon>
        Add player
      </ds-button>

      <ds-divider class="form-divider"></ds-divider>

      <div class="form-actions">
        <ds-button variant="ghost" size="md">Cancel</ds-button>
        <ds-button variant="primary" size="md">
          <ds-icon slot="leading" name="plus" size="md"></ds-icon>
          Create session
        </ds-button>
      </div>
    </ds-card>
  </ds-page-shell>
`;
