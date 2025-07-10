import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';

const prisma = new PrismaClient().$extends({});

const db = enhance(prisma);

async function main() {
    const user = await db.user.create({
        data: {
            name: 'John Doe',
            email: 'a@b.com',
        },
    });
    console.log(user.email);
    const post = await db.post.create({
        data: {
            title: 'Hello World',
        },
    });
    console.log(post.title);
}

main();
