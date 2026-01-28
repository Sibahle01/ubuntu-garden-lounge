const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Ubuntu2024!', 10);

  await prisma.adminUser.upsert({
    where: { email: 'admin@ubuntugarden.co.za' },
    update: {},
    create: {
      email: 'admin@ubuntugarden.co.za',
      password: hashedPassword,
      name: 'Admin',
      role: 'MANAGER'
    }
  });

  console.log(' Admin user created');

  // Add sample menu items
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Bunny Chow',
        description: 'Traditional South African curry served in bread',
        price: 120.00,
        category: 'MAIN'
      },
      {
        name: 'Bobotie',
        description: 'Cape Malay spiced minced meat bake',
        price: 95.00,
        category: 'MAIN'
      }
    ]
  });

  console.log(' Sample menu items added');
  console.log(' Seed completed!');
}

main()
  .catch((error) => {
    console.error(' Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.();
  });
