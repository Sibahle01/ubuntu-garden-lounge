const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('Ubuntu2024!', 10)
  await prisma.adminUser.create({
    data: {
      email: 'admin@ubuntugarden.co.za',
      password: hashedPassword,
      name: 'Restaurant Manager',
      role: 'MANAGER'
    }
  })
  
  console.log('✅ Admin user created: admin@ubuntugarden.co.za / Ubuntu2024!')
  
  // Create sample menu items
  const menuItems = [
    {
      name: 'Samosas',
      description: 'Crispy pastry filled with spiced potatoes and peas',
      price: 85.00,
      category: 'APPETIZERS',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
      isFeatured: true,
      isVegetarian: true,
      isSpicy: true,
      order: 1
    }
  ]
  
  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item })
  }
  
  console.log('✅ Created ' + menuItems.length + ' menu items')
  console.log('🎉 Seeding completed!')
}

main()
  .catch(e => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })