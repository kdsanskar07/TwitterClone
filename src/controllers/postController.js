const Post = require("../models/post");
const User = require("../models/user");

const createPost = async (parents, args, { req }) => {
  try {
    console.log("Inside postController.createPost, args: ", {
      args,
      isAuth: req && req.isAuth,
      id: req && req.isAuth ? req.id : null,
    });

    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const { description, createdAt, likesCount, createdBy } = args;
    if (description.trim().length === 0) {
      throw new Error("Description is Empty while creating Post");
    }
    const newPostData = new Post({
      description,
      createdAt,
      likesCount,
      createdBy,
    });
    const result = await newPostData.save();
    return { id: result._id };
  } catch (error) {
    console.log("Inside postController.createPost, error: ", error);
    throw new Error(error);
  }
};

const updatePost = async (parents, args, { req }) => {
  const { likesCount = null, description = null, postId = null } = args;
  try {
    console.log("Inside postController.createPost, args: ", {
      args,
      isAuth: req && req.isAuth,
      id: req && req.isAuth ? req.id : null,
    });

    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    if (postId === null) {
      throw new Error("Post Id is null");
    }

    if (likesCount) {
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $set: {
            likesCount: likesCount,
          },
        }
      );
    }
    if (description) {
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $set: {
            description: description,
          },
        }
      );
    }
    return { status: true };
  } catch (error) {
    console.log(
      "Inside postController.updatePost, error: ",
      error,
      " LikesCount",
      likesCount,
      " Description",
      description
    );
    throw new Error(error);
  }
};

const deletePost = async (parents, args, { req }) => {
  const { postId } = args;
  try {
    console.log("Inside postController.createPost, args: ", {
      args,
      isAuth: req && req.isAuth,
      id: req && req.isAuth ? req.id : null,
    });

    // Check is user is authenticated
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    if (postId === null) {
      throw new Error("No Post Id is Present for deletion of the post");
    }

    await Post.deleteOne({ _id: postId }).lean().exec();
    return { status: true };
  } catch (error) {
    console.log(
      "Inside postController.deletePost, error: ",
      error,
      " postId",
      postId
    );
    throw new Error(error);
  }
};

const getPost = async (parents, args, { req }) => {
  try {
    console.log("Inside postController.createPost, args: ", {
      args,
      isAuth: req && req.isAuth,
      id: req && req.isAuth ? req.id : null,
    });

    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const mongoUserId = req && req.id;
    const userInfo = await User.findById(mongoUserId);

    const posts = await Post.find({
      createdBy: [...userInfo.following, userInfo.userId],
    })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()
      .exec();
    const postList = [];
    for (const index of posts) {
      const userDetails = await User.findOne({ userId: index.createdBy })
        .lean()
        .exec();
      postList.push({
        id: index._id,
        description: index.description,
        createdAt: index.createdAt,
        likesCount: index.likesCount,
        user: {
          id: userDetails._id,
          userId: userDetails.userId,
          name: userDetails.name,
          email: userDetails.email,
        },
      });
    }
    return postList;
  } catch (error) {
    console.log("Inside postController.getPost, error: ", error);
    throw new Error(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
};
