const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } =
  graphql;

const userInfo = require("./userDefination");

const postInfo = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLString },
    user: { type: userInfo },
    createdAt: { type: GraphQLString },
    likesCount: { type: GraphQLInt },
    description: { type: GraphQLString },
    status: { type: GraphQLBoolean }
  }),
});

module.exports = postInfo;
