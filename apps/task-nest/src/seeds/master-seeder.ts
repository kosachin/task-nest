// apps/task-nest/src/seeds/master-seeder.ts
import { AppDataSource } from '../config/data-source';
import { seeders } from './index';

async function runAllSeeders() {
  try {
    console.log('⏳ Initializing DB connection for seeding...');
    await AppDataSource.initialize();

    for (const seeder of seeders) {
      try {
        console.log(`🌱 Running ${seeder.name} seeder...`);
        await seeder.run(AppDataSource);
        console.log(`✅ ${seeder.name} seeded.`);
      } catch (err) {
        console.error(`❌ Error in ${seeder.name} seeder:`, err);
      }
    }

    await AppDataSource.destroy();
    console.log('🎉 All seeders completed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder runner failed:', error);
    process.exit(1);
  }
}

runAllSeeders();
