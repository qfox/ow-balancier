import { Role } from './types';
import { people } from './data/people';
import { spread } from './spread';

people.sort((a, b) => b.rank - a.rank);
const captains = people.slice(0, 28);
const squires = people.slice(-28);

// console.log(people.length, captains.map(p => p.r), squires.map(p => p.r));
const squads = spread(people, captains, squires, 3);
squads.forEach(squad => squad.assignSquire());

console.log(squads
  .map(squad => `${squad.rank} | ${squad.displayName} `.padEnd(30, ' ') + ' | ' +
    [Role.maintank, Role.offtank, Role.hitscan, Role.projectile, Role.heal, Role.lightheal]
      .map(role => {
        const player = squad.byRoles.get(role)!;
        return player ? player.r : '  ?';
      }).join(' ') + ' | ' +
    [Role.maintank, Role.offtank, Role.hitscan, Role.projectile, Role.heal, Role.lightheal]
      .map(role => {
        const player = squad.byRoles.get(role)!;
        return (player ? (squad.captain === player ? '§ ' : '') + player.name : '?').slice(0, 11).padEnd(12, ' ');
      }).join(' ')).join('\n'));

const ranks = squads.map(s => s.rank).sort((a, b) => a - b);
console.log({
  'min': ranks[0],
  '20p': ranks[Math.floor(ranks.length / 5)],
  '50p': ranks[Math.floor(ranks.length / 2)],
  'avg': Math.floor(ranks.reduce((a, b) => a + b) / ranks.length),
  '80p': ranks[ranks.length - Math.floor(ranks.length / 5)],
  'max': ranks[ranks.length - 1],
});


// console.log(spread(people, ));
