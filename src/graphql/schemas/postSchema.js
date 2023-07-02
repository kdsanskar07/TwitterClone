const graphql = require("graphql");
const { GraphQLString, GraphQLInt, GraphQLList } = graphql;

const { postInfo } = require("../typeDefinations");
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
} = require("../../controllers/postController");

const postSchema = {
  mutation: {
    createPost: {
      type: postInfo,
      args: {
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        likesCount: { type: GraphQLInt },
        createdBy: { type: GraphQLString },
      },
      resolve: createPost,
    },

    updatePost: {
      type: postInfo,
      args: {
        likesCount: { type: GraphQLInt },
        description: { type: GraphQLString },
        postId: { type: GraphQLString },
      },
      resolve: updatePost,
    },

    deletePost: {
      type: postInfo,
      args: {
        postId: { type: GraphQLString },
      },
      resolve: deletePost,
    },
  },

  query: {
    getPost: {
      type: new GraphQLList(postInfo),
      resolve: getPost,
    },
  },
};

module.exports = postSchema;
