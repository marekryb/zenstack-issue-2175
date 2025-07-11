import { PrismaClient } from "./.prisma/client";
import { enhance } from "./.zenstack/enhance";

const prisma = new PrismaClient();
const prismaExtended = prisma.$extends({
  model: {
    user: {
      async signUp(email: string) {
        return prisma.user.create({ data: { email } });
      },
    },
  },
});

const db = enhance(prisma);
const dbExtended = enhance(prismaExtended);

async function main() {
  const user = await db.user.create({
    data: {
      name: "John Doe",
      email: "a@b.com",
    },
  });
  console.log(user.email);
  const post = await db.post.create({
    data: {
      title: "Hello World",
    },
  });
  console.log(post.title);

  const newUser = await dbExtended.user.signUp("a@b.com");
  console.log(newUser.email);
}

main();
