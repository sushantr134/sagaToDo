const User = require("../models/user");

const data = [
  {
    id: "161b301",
    name: "sushant",
    email: "xd@mfaol.com"
  }
];

//const Op = require("sequelize").Op;

const resolvers = {
  Query: {
    me: () => {
      return data;
    },
    find: (_, { id }) => User.findByPk(id)
  },
  Mutation: {
    createUser: (_, { name, email, password }) => User.create({ name: name, email: email, password: password })
  }
};

module.exports = resolvers;
