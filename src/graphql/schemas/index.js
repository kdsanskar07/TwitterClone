const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;

const userSchema = require("./userSchema");
const postSchema = require("./postSchema");

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userSchema.query,
    ...postSchema.query,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userSchema.mutation,
    ...postSchema.mutation,
  },
});

const graphQlSchema = new GraphQLSchema({ query: rootQuery, mutation });

module.exports = graphQlSchema;
