import  db  from "../../src/modules/database/index.ts"

const run = async () => {
  await db.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@gmail.com',
        password: 'hashed-password',
      },
      {
        name: 'Shemang david',
        password: '#535fdvfvdfvetfverfv',
        email: 'dav@gmdail.com',
        isAdmin: true,
      },
      {
        name: 'Bob',
        email: 'bob@gmail.com',
        password: 'password-hashed',
      },
    ],
  })
}

// Auto-run if main script (not imported)
if (require.main === module) {
  run().then(() => {
    console.log('Data seed complete')
    process.exit()
  })
}
