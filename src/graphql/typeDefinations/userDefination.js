const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } =
  graphql;

const userInfo = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    followers: { type: new GraphQLList(GraphQLString) },
    following: { type: new GraphQLList(GraphQLString) },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    isAuthenticated: { type: GraphQLBoolean },
  }),
});

module.exports = userInfo;
