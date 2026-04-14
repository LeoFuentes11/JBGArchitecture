import * as migration_20260414_021140 from './20260414_021140';

export const migrations = [
  {
    up: migration_20260414_021140.up,
    down: migration_20260414_021140.down,
    name: '20260414_021140'
  },
];
