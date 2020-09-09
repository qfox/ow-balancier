export enum Role {
  unknown,
  maintank,
  offtank,
  heal,
  lightheal,
  hitscan,
  projectile,
  flex,
}

export type PlayerRoles = Map<Role, number>;

export interface Player {
  id: string
  name: string
  btag: string
  // apitag: string
  roles: PlayerRoles
  rank: number
  main: Role
  mainRank: number
  r: string
}
