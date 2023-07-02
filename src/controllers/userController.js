const User = require("../models/user");
const utils = require("../../lib/utils");

module.exports = {
  createUser: async (parents, args = {}, { req }) => {
    try {
      console.log("Inside auth.createUser, args: ", args);
      const { name, email, password, userId } = args;

      // check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User exists already.");
      }

      // create user
      const saltHash = utils.genPassword(password);
      const newUser = new User({
        userId,
        name,
        email,
        hash: saltHash.hash,
        salt: saltHash.salt,
      });
      const result = await newUser.save();

      // issue JWT token
      const tokenObject = utils.issueJWT(result._id);
      return {
        userId,
        id: result._id,
        token: tokenObject.token,
        tokenExpiration: tokenObject.expires,
      };
    } catch (error) {
      console.log("Inside auth.createUser, error: ", error);
      throw new Error(error);
    }
  },

  login: async (parents, args = {}) => {
    try {
      console.log("Inside auth.login, args: ", args);
      const { email, password } = args;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist!");
      }

      const isvalid = utils.validPassword(password, user.hash, user.salt);
      if (!isvalid) {
        throw new Error("Password is incorrect!");
      }

      // issue JWT token
      const tokenObject = utils.issueJWT(user.id);
      return {
        userId: user.userId,
        id: user.id,
        token: tokenObject.token,
        tokenExpiration: tokenObject.expires,
      };
    } catch (error) {
      console.log("Inside auth.login, error: ", error);
      throw new Error(error);
    }
  },

  getFollowers: async (parents, args, { req }) => {
    try {
      console.log("Inside userController.getFollowers, args: ", {
        args,
        isAuth: req && req.isAuth,
        id: req && req.isAuth ? req.id : null,
      });

      // Check is user is authenticated
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }

      const { userId } = args;

      const followersList = await User.findOne({
        select: ["followers"],
        where: { userId: userId },
      }).then((userInfo) =>
        userInfo && userInfo.followers ? userInfo.followers : []
      );
      console.log("followersList: ", followersList);

      return { followersList };
    } catch (error) {
      console.log("Inside auth.getFollowers, error: ", error);
      throw new Error(error);
    }
  },

  getUnFollowedUsers: async (parents, args, { req }) => {
    try {
      console.log("Inside userController.getUnFollowedUsers, args: ", {
        args,
        isAuth: req && req.isAuth,
        id: req && req.isAuth ? req.id : null,
      });

      // Check is user is authenticated
      if (!req.isAuth) {
        return [{ isAuthenticated: false }];
      }

      const mongoUserId = req && req.id;
      const userInfo = await User.findById(mongoUserId).lean().exec();

      const followedList =
        userInfo && userInfo.following ? userInfo.following : [];

      let unFollowedusers = await User.find({
        userId: { $nin: [...followedList, userInfo.userId] },
      })
        .select({ name: 1, email: 1, userId: 1 })
        .lean()
        .exec();

      if (unFollowedusers.length) {
        unFollowedusers[0]["isAuthenticated"] = true;
      } else {
        unFollowedusers.push({ isAuthenticated: true });
      }

      return unFollowedusers;
    } catch (error) {
      console.log("Inside auth.getUnFollowedUsers, error: ", error);
      throw new Error(error);
    }
  },

  updateUser: async (parents, args, { req }) => {
    try {
      console.log("Inside userController.getFollowers, args: ", {
        args,
        isAuth: req && req.isAuth,
        id: req && req.isAuth ? req.id : null,
      });

      // Check is user is authenticated
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }

      const { type, followerId } = args;

      // find first user
      const mongoUserId = req && req.id;
      const firstUserInfo = await User.findById(mongoUserId);
      let firstUserFollowingList =
        firstUserInfo && firstUserInfo.following ? firstUserInfo.following : [];

      // find second user
      const secondUserInfo = await User.findOne({ userId: followerId });
      let secondUserFollowerList =
        secondUserInfo && secondUserInfo.followers
          ? secondUserInfo.followers
          : [];

      if (type === "addFollower") {
        firstUserFollowingList = [...firstUserFollowingList, followerId];
        secondUserFollowerList = [
          ...secondUserFollowerList,
          firstUserInfo.userId,
        ];
        firstUserFollowingList = [...new Set(firstUserFollowingList)];
        secondUserFollowerList = [...new Set(secondUserFollowerList)];
      } else if (type === "removeFollower") {
        firstUserFollowingList = firstUserFollowingList.filter(
          (userId) => userId != followerId
        );
        secondUserFollowerList = secondUserFollowerList.filter(
          (userId) => userId != firstUserInfo.userId
        );
      }

      // update first user
      await User.findOneAndUpdate(
        { _id: mongoUserId },
        {
          $set: {
            following: firstUserFollowingList,
          },
        }
      );

      // update second user
      await User.findOneAndUpdate(
        { userId: followerId },
        {
          $set: {
            followers: secondUserFollowerList,
          },
        }
      );

      // todo: on success call getUnFollowedUsers and getPosts
      return { status: true };
    } catch (error) {
      console.log("Inside auth.getFollowers, error: ", error);
      throw new Error(error);
    }
  },
};
