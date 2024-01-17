const adminDB = db.getSiblingDB('admin');

adminDB.createUser({
  user: 'reza',
  pwd: 'reza',
  roles: [
    {
      role: 'readWrite',
      db: 'reza-pack',
    },
    {
      role: 'readWrite',
      db: 'test-reza-pack',
    },
  ],
});

console.log(`User "reza" created successfully in ${db.getName()}!`);
