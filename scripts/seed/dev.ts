import db, { genId } from '../../src/modules/db';

const run = async () => {
  await db.post.createMany({
    data: [
      {
        id: genId(),
        slug: 'ultimate-node-stack',
        title: 'Ultimate Node Stack 2023',
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'draft-post',
        title: 'Draft Post',
      },
    ],
  });
  await db.user.createMany({
    data: [
      {
        id: genId(),
        name: 'Alice',
        email: 'alice@gmail.com',
        password: 'hashed-password'
      },
      {
        id: genId(),
        name: 'Bob',
        email: 'bob@gmail.com',
        password: 'password-hashed'
      },
    ],
  });
};

// Auto-run if main script (not imported)
if (require.main === module) {
  run().then(() => {
    console.log('Data seed complete');
    process.exit();
  });
}
