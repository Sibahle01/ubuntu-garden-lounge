const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("?? Starting database seeding for Ubuntu Garden Lounge...");

  // Hash password for admin
  const hashedPassword = await bcrypt.hash("Ubuntu2024!", 10);
  
  // Create or update admin user
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@ubuntugarden.co.za" },
    update: { password: hashedPassword },
    create: {
      email: "admin@ubuntugarden.co.za",
      password: hashedPassword,
      name: "System Administrator",
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created/updated:", admin.email);

  // Clear and create menu items
  await prisma.menuItem.deleteMany({});
  
  const menuItems = await prisma.menuItem.createMany({
    data: [
      {
        name: "Samosas",
        description: "Crispy pastry filled with spiced potatoes and peas, served with tamarind chutney",
        price: 85.00,
        category: "APPETIZER",
        isFeatured: true,
        isVegetarian: true,
        isSpicy: true,
        order: 1,
      },
      {
        name: "Bobotie",
        description: "Traditional South African spiced minced meat baked with egg topping",
        price: 189.99,
        category: "MAIN",
        isFeatured: true,
        isVegetarian: false,
        isSpicy: true,
        order: 2,
      },
    ],
  });
  console.log(`✅ ${menuItems.count} menu items created`);

  // Create sample reservations
  await prisma.reservation.deleteMany({});
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(19, 0, 0, 0);
  
  const reservations = await prisma.reservation.createMany({
    data: [
      {
        customerName: "Thabo Mbeki",
        customerEmail: "thabo@example.co.za",
        customerPhone: "+27111234567",
        reservationDate: tomorrow,
        time: "19:00",
        partySize: 4,
        specialRequests: "Window table with garden view",
        status: "CONFIRMED",
      },
    ],
  });
  console.log(`✅ ${reservations.count} sample reservations created`);
  
  // Clear and create sample orders
  await prisma.order.deleteMany({});
  
  const sampleOrders = await prisma.order.createMany({
    data: [
      {
        orderNumber: `ORD-${Date.now()}-001`,
        orderType: 'delivery',
        status: 'DELIVERED',
        subtotal: 245.99,
        tax: 34.44,
        total: 280.43,
        name: 'James Wilson',
        email: 'james@example.com',
        phone: '+27112223333',
        specialRequests: 'Please include extra napkins',
      },
      {
        orderNumber: `ORD-${Date.now()}-002`,
        orderType: 'dine-in',
        status: 'PREPARING',
        subtotal: 189.50,
        tax: 26.53,
        total: 216.03,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+27114445555',
        specialRequests: 'Table near the window',
      },
      {
        orderNumber: `ORD-${Date.now()}-003`,
        orderType: 'delivery',
        status: 'PENDING',
        subtotal: 125.75,
        tax: 17.61,
        total: 143.36,
        name: 'Robert Brown',
        email: 'robert@example.com',
        phone: '+27116667777',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ ${sampleOrders.count} sample orders created`);

  // Clear and create order items for these orders
  await prisma.orderItem.deleteMany({});
  const orders = await prisma.order.findMany();
  // Fetch menu items again to ensure we have the correct IDs
  const menuItemsForOrder = await prisma.menuItem.findMany(); 
  
  for (const order of orders) {
    await prisma.orderItem.createMany({
      data: [
        {
          orderId: order.id,
          menuItemId: menuItemsForOrder[0].id, // Samosas
          quantity: 2,
          price: menuItemsForOrder[0].price,
        },
        {
          orderId: order.id,
          menuItemId: menuItemsForOrder[1].id, // Bobotie
          quantity: 1,
          price: menuItemsForOrder[1].price,
        },
      ],
    });
  }
  console.log('✅ Order items created');

  console.log("?? Database seeding completed successfully!");
  console.log(" Admin login: admin@ubuntugarden.co.za");
  console.log(" Admin password: Ubuntu2024!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });