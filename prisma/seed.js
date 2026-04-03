const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Starting database seeding for Ubuntu Garden Lounge...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.reservation.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.adminUser.deleteMany({});
  console.log('✅ Existing data cleared\n');

  // Create Admin User
  console.log('👤 Creating Admin User...');
  const hashedPassword = await bcrypt.hash('Ubuntu2024!', 10);
  await prisma.adminUser.create({
    data: {
      email: 'admin@ubuntugarden.co.za',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created\n');

  // Insert hardcoded menu items
  console.log('📦 Inserting menu items...');
  const menuItems = [
    {
      id: "menu-1",
      name: "Full House",
      description: "West African spiced rice cooked in a rich tomato stew with chicken. Served with plantains.",
      price: 149.99,
      category: "MAIN_COURSES",
      imageUrl: "/uploads/menu/menu-1775141428270-3a6njuwydo2.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: false,
      isSpicy: true,
      order: 1
    },
    {
      id: "menu-2",
      name: "Fish & Chips",
      description: "Grilled spicy beef skewers with traditional peanut spice rub, served with onions and tomatoes.",
      price: 89.99,
      category: "APPETIZERS",
      imageUrl: "/uploads/menu/menu-1775141528183-uusd8l9rac.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: false,
      isSpicy: true,
      order: 2
    },
    {
      id: "menu-3",
      name: "Malva Pudding",
      description: "South African spiced minced meat bake with egg topping, served with yellow rice and chutney.",
      price: 129.99,
      category: "MAIN_COURSES",
      imageUrl: "/uploads/menu/menu-1775141604605-qgw05zlo5gp.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: false,
      isSpicy: false,
      order: 3
    },
    {
      id: "menu-4",
      name: "Cocktails",
      description: "Crispy fried plantain slices served with spicy mayo dipping sauce.",
      price: 59.99,
      category: "APPETIZERS",
      imageUrl: "/uploads/menu/menu-1775141739336-3m1adjk8ghg.jpg",
      isAvailable: true,
      isFeatured: false,
      isVegetarian: true,
      isSpicy: false,
      order: 4
    },
    {
      id: "menu-5",
      name: "Jeqe and Meat",
      description: "Traditional South African sweet sponge pudding with warm custard sauce.",
      price: 79.99,
      category: "DESSERTS",
      imageUrl: "/uploads/menu/menu-1775141836335-wmfvkd4ga6b.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: true,
      isSpicy: false,
      order: 5
    },
    {
      id: "menu-6",
      name: "Samusa",
      description: "Crispy fried samosas filled with spiced potatoes and peas.",
      price: 45.99,
      category: "APPETIZERS",
      imageUrl: "/uploads/menu/menu-1775141958777-0smznpqpuapp.jpg",
      isAvailable: true,
      isFeatured: false,
      isVegetarian: true,
      isSpicy: false,
      order: 6
    }
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price.toFixed(2),
        category: item.category,
        imageUrl: item.imageUrl,
        isAvailable: item.isAvailable,
        isFeatured: item.isFeatured,
        isVegetarian: item.isVegetarian,
        isSpicy: item.isSpicy,
        order: item.order,
      },
    });
    console.log(`   ✓ ${item.name}`);
  }
  console.log('✅ Menu items inserted\n');

  console.log('============================================================');
  console.log('🎉 Database seeding completed successfully!');
  console.log('============================================================\n');
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
