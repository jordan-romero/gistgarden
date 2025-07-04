import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  // Seed organization
  const org = await db.organization.upsert({
    where: { name: 'Gist Garden Inc' },
    update: {},
    create: {
      name: 'Gist Garden Inc',
    },
  });

  // Seed admin user
  const user = await db.user.upsert({
    where: { email: 'dev@garden.io' },
    update: {},
    create: {
      email: 'dev@garden.io',
      name: 'Seed Planter',
      role: 'ADMIN',
      organizationId: org.id,
    },
  });

  // Seed hello world snippet
  const snippet = await db.snippet.upsert({
    where: { id: 'hello-world-snippet' }, // <-- If you want an idempotent seed
    update: {},
    create: {
      id: 'hello-world-snippet',
      title: 'Hello World Snippet',
      code: 'console.log("hello 🌱")',
      language: 'typescript',
      tags: ['starter', 'hello'],
      growthScore: 5,
      createdById: user.id,
      organizationId: org.id,
      visibility: null,
      published: true,
    },
  });

  console.log('🌱 Seeded:', {
    organization: org.name,
    user: user.email,
    snippet: snippet.title,
  });
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());