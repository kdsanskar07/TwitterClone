const graphql = require("graphql");
const { GraphQLString, GraphQLList } = graphql;

const { userInfo } = require("../typeDefinations");
const {
  createUser,
  login,
  getFollowers,
  getUnFollowedUsers,
  updateUser,
} = require("../../controllers/userController");

const userSchema = {
  mutation: {
    createUser: {
      type: userInfo,
      args: {
        userId: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: createUser,
    },

    updateUser: {
      type: userInfo,
      args: {
        type: { type: GraphQLString },
        followerId: { type: GraphQLString },
      },
      resolve: updateUser,
    },
  },

  query: {
    login: {
      type: userInfo,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: login,
    },

    getFollowers: {
      type: userInfo,
      args: {
        userId: { type: GraphQLString },
      },
      resolve: getFollowers,
    },

    getUnFollowedUsers: {
      type: new GraphQLList(userInfo),
      resolve: getUnFollowedUsers,
    },
  },
};

module.exports = userSchema;
