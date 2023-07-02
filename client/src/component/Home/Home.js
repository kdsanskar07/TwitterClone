import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import commonStyles from "./CommonStyles.module.css";
import { useHistory } from "react-router";
import Menu from "./Menu/Menu";
import CreateContent from "./CreateContent/CreateContent";
import TimeLine from "./TimeLine/TimeLine";
import Follow from "./Follow/Follow";
import { getPost, getUnFollowedUsers } from "../../services";

export default function Home() {
  let history = useHistory();

  const [unFollowedUsers, setUnFollowedusers] = useState([]);
  const [postList, setPostList] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const getLatestPostList = async () => {
    const postListRes = await getPost();
    setPostList(postListRes?.data?.getPost);
  };

  const getUsersList = async () => {
    const unfollowedUserRes = await getUnFollowedUsers();
    let resData = unfollowedUserRes?.data?.getUnFollowedUsers;
    if (
      resData &&
      "isAuthenticated" in resData?.[0] &&
      !resData?.[0]?.isAuthenticated
    ) {
      history.push("/signin");
      return;
    }
    if (!resData || !resData?.length || !resData[0]?.name) {
      resData = [];
    }
    console.log("resData: ", resData);
    setUnFollowedusers(resData);
  };

  const loadHomePage = () => {
    if (!userId || !token) {
      history.push("/signin");
      return;
    }
    getLatestPostList();
    getUsersList();
  };

  useEffect(() => {
    loadHomePage();
  }, []);

  return (
    <div className={`${styles.home}`}>
      <Menu />
      <div className={`${styles.content} ${commonStyles.verticalLines}`}>
        <div className={`${commonStyles.borderedDiv}`}>
          <p className={styles.homeText}>Home</p>
        </div>
        <CreateContent getLatestPostList={getLatestPostList} />
        <TimeLine
          postList={postList}
          loadHomePage={loadHomePage}
          unFollowedUsers={unFollowedUsers}
        />
      </div>
      <Follow loadHomePage={loadHomePage} unFollowedUsers={unFollowedUsers} />
    </div>
  );
}
