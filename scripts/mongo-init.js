db = db.getSiblingDB('dev2048')

db.createUser(
  {
    user: "Antonina",
    pwd: "102030",
    roles: [
        {
            role: "readWrite",
            db: "dev2048"
        }
    ]
  }
);