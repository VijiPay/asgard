import { HealthChecks, DiskSpaceCheck, MemoryHeapCheck } from '@adonisjs/core/health'
import { DbCheck } from '@adonisjs/lucid/database'
import db from '@adonisjs/lucid/services/db'

export const healthChecks = new HealthChecks().register([
  new DiskSpaceCheck().warnWhenExceeds(95).failWhenExceeds(90),
  new MemoryHeapCheck(),
  new DbCheck(db.connection()),
])
