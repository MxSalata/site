// The game servers on the Games page (/games/), in tab order. A change of status or access is a one-line edit here.
// The site is static and can't see House, so each status is set by hand. Never put an address, port, password, token,
// invite link or a player's name here: the join text says what to ask Mikolaj for, not the details.

export type Status = 'playing' | 'request' | 'off';
export type Access = 'invite' | 'password' | 'open';

// What each status is called on the page. A coloured dot sits beside the words, never instead of them.
export const STATUS: Record<Status, string> = {
  playing: 'Playing now',
  request: 'On request',
  off: 'Not running',
};

// Locked: it needs an invite or a password from Mikolaj. Open: anyone with the server's address can join.
export const ACCESS: Record<Access, { icon: 'lock' | 'lock-open'; label: string }> = {
  invite: { icon: 'lock', label: 'Needs an invite' },
  password: { icon: 'lock', label: 'Needs a password' },
  open: { icon: 'lock-open', label: 'Open' },
};

export interface Game {
  id: string; // the game's place on the page: /games/#id
  name: string;
  short: string; // the tab's label
  status: Status;
  access?: Access; // left out until Mikolaj confirms how the game is joined
  description: string;
  join: string;
}

export const GAMES: Game[] = [
  {
    id: 'atm10',
    name: 'Minecraft: All The Mods 10',
    short: 'ATM10',
    status: 'request',
    access: 'invite',
    description: 'All The Mods 10, a large modpack for Minecraft 1.21.1 on NeoForge. The server starts when people want to play.',
    join: 'Ask Mikolaj for an invite. He adds you and sends a personal link that lets your connection in, and the server’s address. You need the All The Mods 10 pack, version 8.2.',
  },
  {
    id: 'dst',
    name: 'Don’t Starve Together',
    short: 'DST',
    status: 'playing',
    access: 'password',
    description: 'A survival world with caves and mods.',
    join: 'Ask Mikolaj for the server’s name and password, then find it in the game’s server list.',
  },
  {
    id: 'palworld',
    name: 'Palworld',
    short: 'Palworld',
    status: 'off',
    description: 'We’ve played it before; the server is stopped for now.',
    join: 'Ask Mikolaj if you’d like to play: he starts the server and tells you how to join.',
  },
  {
    id: 'valheim',
    name: 'Valheim',
    short: 'Valheim',
    status: 'off',
    description: 'We’ve played it before; the server is stopped for now.',
    join: 'Ask Mikolaj if you’d like to play: he starts the server and tells you how to join.',
  },
];
