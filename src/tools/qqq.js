const q = require('./build/data/people');
const w = require('./src/data/people2').players;

for (const player of q.people) {
  const found = w.find(x => player.id.toLocaleLowerCase() === x.id.toLocaleLowerCase()
    || player.id.toLocaleLowerCase().split(/-/)[0] === x.id.toLocaleLowerCase());
  console.log(player.id, found && [found.sr_by_class.tank, found.sr_by_class.support, found.sr_by_class.dps]);
}
