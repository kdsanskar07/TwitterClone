import React from "react";
import styles from "./Follow.module.css";
import commonStyles from "../CommonStyles.module.css";
import UserProfilePic from "../../utills/UserProfilePic/UserProfilePic";
import { addFollower } from "../../../services";

export default function Follow(props) {
  const { unFollowedUsers, loadHomePage } = props;

  const requestToFollowUser = async (userId) => {
    await addFollower({ followerId: userId });
    loadHomePage();
  };

  return unFollowedUsers && unFollowedUsers?.length ? (
    <div
      className={`${commonStyles.contentContainer} ${styles.followContainer} ${commonStyles.verticalLines} ${commonStyles.borderedDiv}`}
    >
      <div className={styles.title}>Who to Follow</div>
      {unFollowedUsers.map((item, idx) => {
        return (
          <div id={item.userId} className={`${styles.follow}`}>
            <div className={styles.contentLeft}>
              <UserProfilePic />
            </div>
            <div className={`${styles.contentRight} ${styles.personDetails}`}>
              <div className={styles.userName}>{item.name}</div>
              <div className={styles.userID}>@{item.userId}</div>
            </div>
            <button
              className={styles.followButton}
              onClick={requestToFollowUser.bind(this, item.userId)}
            >
              Follow
            </button>
          </div>
        );
      })}
    </div>
  ) : null;
}
