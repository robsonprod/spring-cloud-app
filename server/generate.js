var faker = require('faker');

var database = { users: {data:[]}};

for (var i = 1; i<= 50; i++) {
  database.users.data.push({
    id: i,
    name: faker.finance.accountName(),
    login: faker.company.companyName(),
    password: faker.internet.password(),
    createdDate: faker.date.recent(),
    updateDate: faker.date.recent(),
    email: faker.internet.email(),
    admin: faker.random.boolean()
  })
}
database.users.total = database.users.data.length;

console.log(JSON.stringify(database));
