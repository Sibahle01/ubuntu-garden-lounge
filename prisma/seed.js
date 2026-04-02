const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Starting database seeding for Ubuntu Garden Lounge...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.adminUser.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.reservation.deleteMany({});
  console.log('✅ Existing data cleared\n');

  // Create Admin User
  console.log('👤 Creating Admin User...');
  const hashedPassword = await bcrypt.hash('Ubuntu2024!', 10);
  
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@ubuntugarden.co.za',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user created: ${admin.email}\n`);

  console.log('============================================================');
  console.log('🎉 Database seeding completed successfully!');
  console.log('============================================================\n');
  console.log('📊 SEEDING SUMMARY:');
  console.log('   • Admin Users: 1 (admin@ubuntugarden.co.za)');
  console.log('   • Menu Items: 0 (add via admin panel)');
  console.log('\n🚀 NEXT STEPS:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Visit: http://localhost:3000');
  console.log('   3. Admin Login: http://localhost:3000/admin/login');
  console.log('   4. Add menu items via Admin → Menu → Add New\n');
  console.log('🔑 DEFAULT ADMIN CREDENTIALS:');
  console.log('   Email: admin@ubuntugarden.co.za');
  console.log('   Password: Ubuntu2024!');
  console.log('============================================================');
}

main()
  .catch((e) => {
    console.error('❌ SEEDING ERROR:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });