import { Role, Player } from './types';

const FLEX_CHOOSE_ORDER = [Role.projectile, Role.offtank, Role.hitscan, Role.lightheal, Role.maintank, Role.heal];

export function spread(allPlayers: Player[], captains: Player[], squires: Player[], deepness: number = 6) {
  const N = captains.length;
  if ([...allPlayers, ...captains, ...squires].some(player => !player.rank)) {
    const unranked = [...new Set([...allPlayers, ...captains, ...squires].filter(player => !player.rank))];
    throw new Error(`Players without rank exists: ${unranked.map(player => player.name).join(', ')}`);
  }

  // Собираем команду из капитана и оруженосца.
  const squads = generateSquads(captains, squires);

  // Here we have squads with 2 people in each (1 role assigned, squires awating)
  if (deepness <= 1) { return squads; }

  // - (6) Ищем 3-его игрока — берется топ N оставшихся игроков и распределяются по командам в обратном порядке
  //   Учитываем, что игроки из этого списка не должны попадать в команды с капитанами, имеющими с ними один класс.
  let players = allPlayers.filter(player => !captains.includes(player) && !squires.includes(player));
  // TODO: fixme, сейчас могут совпадать роли, и будут скипаться сильные, в итоге плохой баланс
  // Нужен стек, в который будем складывать сильных и пытаться искать им подходящую роль
  let i = 0;
  let distributedPlayers: Player[] = [];
  for (const player of players) {
    const squad = squads[i];
    if (!squad) {
      break;
    }
    if (squad.has(player.main, SquadRoleCollision.CAPTAIN)) {
      continue;
    }
    let role = player.main;
    if (role === Role.flex) {
      for (const frole of FLEX_CHOOSE_ORDER) {
        if (!squad.has(frole, SquadRoleCollision.CAPTAIN)) {
          role = frole;
          break;
        }
      }
    }
    squad.set(role, player);
    distributedPlayers.push(player);
    i += 1;
  }

  // 3 people in each (2 role assigned, squires awating)
  if (deepness <= 2) { return squads; }

  // - (7) *Для четвертого — нужно оставшимся топом игроков закрыть последний незакрытый класс (роль).
  //   Классы Капитана и его помощника отличаются, следовательно 2 уже закрыто.
  //   Начиная с самой слабой команды (по среднему рейтингу) добавить по одному сильному игроку свободного класса.
  players = players.filter(player => !distributedPlayers.includes(player)); // Оставшиеся игроки
  distributedPlayers = [];
  for (const squad of squads.sort((a, b) => a.rank - b.rank)) {
    let i;
    for (i = 0; i < players.length; i += 1) {
      squad.has(players[i].main, SquadRoleCollision.GEMINI);
      break;
    }
    const player = players[i];
    players.splice(i, 1);

    squad.add(player, SquadRoleCollision.GEMINI);
  }

  if (deepness <= 4) { return squads; }

  // Распределяем оставшихся псевдорандомно


  return squads;
}

export type SquadRolesMap<T> = Map<Role, T>;
export enum SquadRoleCollision {
  STRICT,
  GEMINI,
  CAPTAIN,
  ADAPT,
};

export class Squad<T extends Player = Player> {
  displayName: string;
  captain: T;
  squire: T;
  // players: Set<T> = new Set();
  byRoles: SquadRolesMap<T> = new Map();

  constructor(captain: T, squire: T) {
    this.displayName = `Squad ${captain.name}`;
    this.captain = captain;
    this.squire = squire;
    this.set(captain.main, captain);
  }

  assignSquire() {
    this.add(this.squire, SquadRoleCollision.ADAPT);
  }

  set(role: Role, player: T) {
    if (role === Role.flex) {
      throw new Error(`Role "flex" for user "${player.name}" was denied. Use strict role.`);
    }

    const employee = this.byRoles.get(role);
    if (employee) {
      throw new Error(`Role "${Role[role]}" already used by "${employee.name}".`);
    }

    // this.players.add(player);
    this.byRoles.set(role, player);

    // @ts-ignore
    player.activity = {
      squad: this,
      role,
    };
  }

  add(player: T, collision: SquadRoleCollision = SquadRoleCollision.STRICT) {
    if (player.main === Role.flex || collision === SquadRoleCollision.ADAPT) {
      for (const role of FLEX_CHOOSE_ORDER) {
        if (!this.has(role, SquadRoleCollision.STRICT)) {
          this.set(role, player);
          return;
        }
      }
    }

    if (!this.has(player.main, SquadRoleCollision.STRICT)) {
      this.set(player.main, player);
      return;
    }

    // console.log(Role[player.main], this.geminiRole(player.main));
    const geminiRole = (collision === SquadRoleCollision.GEMINI) && this.geminiRole(player.main);
    if (geminiRole && !this.has(geminiRole, SquadRoleCollision.STRICT)) {
      this.set(geminiRole, player);
      return;
    }

    // console.log('QQQQQQ', { geminiRole, collision: SquadRoleCollision[collision] }, player, this.byRoles);
    throw new Error(`Roles ${Role[player.main]}${geminiRole ? ` and ${Role[geminiRole]}` : ''} are busy.`);
  }

  get rank(): number {
    const ranksMap = new Map([...this.byRoles.entries()]
      .map(([role, player]) => [player, player.roles.get(role) || player.rank]));
    ranksMap.set(this.squire, this.squire.rank);

    const ranks = [...ranksMap.values()].filter(Boolean);

    return Math.floor(ranks.reduce((a: number, b: number) => a + b) / ranks.length);
  }

  private geminiRole(role: Role): Role {
    return this.roleGeminies.get(role) || Role.unknown;
  }

  private roleGeminies: Map<Role, Role> = new Map([
    [Role.heal, Role.lightheal],
    [Role.lightheal, Role.heal],
    [Role.maintank, Role.offtank],
    [Role.offtank, Role.maintank],
    [Role.hitscan, Role.projectile],
    [Role.projectile, Role.hitscan],
    // [Role.flex, Role.unknown], // Commented out on purpose
  ]);

  has(role: Role, collision: SquadRoleCollision = SquadRoleCollision.GEMINI): boolean {
    const geminiRole = this.geminiRole(role);

    if (collision === SquadRoleCollision.CAPTAIN) {
      return this.captain.main === role || this.captain.main === geminiRole;
    }

    if (collision === SquadRoleCollision.GEMINI && geminiRole) {
      return this.byRoles.has(role) || this.byRoles.has(geminiRole);
    }

    return this.byRoles.has(role);
  }
}

/**
 * - (3) 1 игрок в команде — Капитан, назначается руками всегда, пляшем от него.
 * - (5) 2-ой — оруженосец, их доложно быть одинаковое количество с капитанами,
 *       но должно быть можно их переназначать руками, поэтому передаём из UI.
 *
 * @param captains Лидеры мнений
 * @param squires Требующие балансировки
 */
function generateSquads<T extends Player = Player>(captains: T[], squires: T[]) {
  if (captains.length !== squires.length) {
    throw new Error(`Squires not enough: ${captains.length} vs ${squires.length}`);
  }

  const result: Squad<T>[] = [];

  // TODO: Which rank we should use to rank sort captains?
  captains.sort((a, b) => b.rank - a.rank);
  squires.sort((a, b) => a.rank - b.rank);

  for (let i = 0; i < captains.length; i += 1) {
    const captain = captains[i];
    const squire = squires[i];

    const squad = new Squad<T>(captain, squire);

    result.push(squad);
  }

  // console.log(result);

  return result;
}
