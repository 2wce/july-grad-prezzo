import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData = [
  {
    id: "34d7831e137a4016a55f98926800a643",
    name: "user 1",
    email: "user1@email.com",
    posts: [
      {
        id: "6399fd6989984c7b871c6301744b0af5",
        title: "Hello",
        published: true,
      },
      {
        id: "68bafebc2a2e4843a56a221c2ceb12ed",
        title: "Hi",
        published: true,
      },
      {
        id: "b2a3208dc801432992812638368e0668",
        title: "Good morning!",
        published: true,
      },
    ],
  },
  {
    id: "b6ec3deac5f94500aef55d9c410e37f7",
    name: "user 2",
    email: "user2@email.com",
    posts: [
      {
        id: "6bb364d2e3364e03b4ca30c6e46ea1dd",
        title: "Thanks, bye!",
        published: true,
      },
      {
        id: "2bc38310a4d1450f9e7c9e7903e458b9",
        title: "Goodbye!",
        published: true,
      },
      {
        id: "611c935266c1402ab76f5235827370f8",
        title: "See you",
        published: true,
      },
    ],
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const t of seedData) {
    const user = await prisma.user.create({
      data: {
        name: t.name,
        email: t.email,
        posts: {
          createMany: {
            data: t.posts,
          },
        },
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
