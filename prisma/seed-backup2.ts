import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  try {
    // Clear existing menu items
    await prisma.menu_items.deleteMany()
    console.log('Cleared menu items')
    
    // Create menu items
    const menuItems = [
      {
        name: 'Samosas',
        description: 'Crispy pastry filled with spiced potatoes and peas, served with tamarind chutney',
        price: 85.00,
        category: 'APPETIZERS',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&auto=format',
        isFeatured: true,
        isVegetarian: true,
        isSpicy: true,
        order: 1
      },
      {
        name: 'Chakalaka Dip',
        description: 'Spicy vegetable relish served with warm bread',
        price: 75.00,
        category: 'APPETIZERS',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&auto=format',
        isFeatured: false,
        isVegetarian: true,
        isSpicy: true,
        order: 2
      }
    ]
    
    for (const item of menuItems) {
      await prisma.menu_items.create({ data: item })
    }
    
    console.log(\Seeded \ menu items\)

    // Check if admin exists
    const existingAdmin = await prisma.admin_users.findFirst({
      where: { email: 'admin@ubuntugarden.co.za' }
    })

    if (!existingAdmin) {
      const hashedPassword = await hash('Ubuntu2024!', 10)
      
      await prisma.admin_users.create({
        data: {
          email: 'admin@ubuntugarden.co.za',
          password: hashedPassword,
          name: 'Restaurant Manager',
          role: 'MANAGER'
        }
      })
      
      console.log('Admin user created')
    } else {
      console.log('Admin user already exists')
    }

    console.log('Seeding completed')
    
  } catch (error) {
    console.error('Seed error:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.\()
  })
