import React from "react";
import styles from "./UserProfilePic.module.css";
import { BsPerson } from "react-icons/bs";

function UserProfilePic() {
  return (
    <div
      className={styles.profilePicContainer}
    >
    <BsPerson size={30} color="black" />
    </div>
  );
}

export default UserProfilePic;
