import React from "react";
import styles from "./TimeLine.module.css";
import commonStyles from "../CommonStyles.module.css";
import UserProfilePic from "../../utills/UserProfilePic/UserProfilePic";
import {
  AiOutlineComment,
  AiFillLike,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import TextWrapper from "../../utills/TextWrapper/TextWrapper";
import { removeFollower } from "../../../services";

const calculateTime = (time) => {
  const currentTime = new Date();
  const twittedTime = new Date(time);

  if (currentTime.getFullYear() !== twittedTime.getFullYear()) {
    return `${currentTime.getFullYear() - twittedTime.getFullYear()} years`;
  } else if (currentTime.getMonth() !== twittedTime.getMonth()) {
    return `${currentTime.getMonth() - twittedTime.getMonth()} months`;
  } else if (currentTime.getDate() !== twittedTime.getDate()) {
    return `${currentTime.getDate() - twittedTime.getDate()} days`;
  } else if (currentTime.getHours() !== twittedTime.getHours()) {
    return `${currentTime.getHours() - twittedTime.getHours()} hours`;
  } else if (currentTime.getMinutes() !== twittedTime.getMinutes()) {
    return `${currentTime.getMinutes() - twittedTime.getMinutes()} minutes`;
  } else {
    return `${currentTime.getSeconds() - twittedTime.getSeconds()} seconds`;
  }
};

export default function TimeLine(props) {
  const userId = localStorage.getItem("userId");
  const { postList, loadHomePage } = props;

  const requestToUnfollowUser = async (userId) => {
    await removeFollower({ followerId: userId });
    loadHomePage();
  };

  return (
    <div className={styles.allTimeLines}>
      {postList?.length ? (
        postList.map((feed) => {
          return (
            <div
              id={`tweet_${feed.id}`}
              className={`${commonStyles.contentContainer} ${styles.feedContainer} ${commonStyles.borderedDiv}`}
            >
              <div className={commonStyles.contentLeft}>
                <UserProfilePic />
              </div>
              <div className={commonStyles.contentRight}>
                <div className={styles.headerContent}>
                  <div className={styles.userDetails}>
                    <div className={styles.userName}>{feed.user.name}</div>
                    <div
                      className={styles.userId}
                    >{`@${feed.user.userId}`}</div>
                  </div>
                  <div className={styles.createdAt}>
                    {calculateTime(feed.createdAt)}
                  </div>
                  {userId === feed?.user?.userId && <AiFillEdit />}
                  {userId === feed?.user?.userId && <AiFillDelete />}
                  {userId !== feed?.user?.userId ? (
                    <button
                      className={styles.unfollowButton}
                      onClick={requestToUnfollowUser.bind(
                        this,
                        feed?.user?.userId
                      )}
                    >
                      Unfollow
                    </button>
                  ) : null}
                </div>
                <div className={styles.tweetContent}>
                  <p className={styles.tweetText}>{feed.description}</p>
                </div>
                <div className={styles.likesAndCommentContent}>
                  <div className={styles.comments}>
                    <AiOutlineComment />
                    <p>0</p>
                  </div>
                  <div
                    role="button"
                    onClick={() => {}}
                    className={styles.likes}
                  >
                    <AiFillLike />
                    <p>{feed.likesCount}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <TextWrapper
          textLabel="You have no new post!"
          testStyle={{ color: "white" }}
        />
      )}
    </div>
  );
}
