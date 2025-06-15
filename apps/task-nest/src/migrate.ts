import { AppDataSource } from './config/data-source';

async function runMigrations() {
  console.log('📦 Starting database migration...');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established.');

    const pendingMigrations = await AppDataSource.showMigrations();
    if (pendingMigrations) {
      console.log('🚀 Running pending migrations...');
      await AppDataSource.runMigrations();
      console.log('✅ Migrations applied successfully!');
    } else {
      console.log('ℹ️ No pending migrations to run.');
    }

    await AppDataSource.destroy();
    console.log('🔒 Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    try {
      await AppDataSource.destroy();
      console.log('🧹 Database connection closed after failure.');
    } catch (closeError) {
      console.error('⚠️ Failed to close connection cleanly:', closeError);
    }
    process.exit(1);
  }
}

runMigrations();
