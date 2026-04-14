import * as migration_20260414_021140 from './20260414_021140';
import * as migration_20260414_120000 from './20260414_120000_refactor_backend';

export const migrations = [
  {
    up: migration_20260414_021140.up,
    down: migration_20260414_021140.down,
    name: '20260414_021140'
  },
  {
    up: migration_20260414_120000.up,
    down: migration_20260414_120000.down,
    name: '20260414_120000_refactor_backend'
  },
];
