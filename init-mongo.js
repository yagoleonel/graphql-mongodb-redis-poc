// Connect to MongoDB
var conn = new Mongo();
var db = conn.getDB('graphqldata');

// Create a new user with readWrite privileges for the new database
db.createUser({
  user: process.env.MONGO_GRAPHQL_USER,
  pwd: process.env.MONGO_GRAPHQL_USER_PW,
  roles: [{ role: 'readWrite', db: 'graphqldata' }]
});
