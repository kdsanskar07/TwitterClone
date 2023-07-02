import React from "react";
import { useHistory } from "react-router";
import styles from "./Menu.module.css";
import {
  MdHome,
  MdNotificationsActive,
  MdLogout,
  MdManageAccounts,
} from "react-icons/md";
import { BsTwitter } from "react-icons/bs";

export default function Menu() {
  let history = useHistory();

  const menuList = [
    {
      id: "siteName",
      label: "Twitter",
      icon: <BsTwitter />,
      clickEventMethod: () => {},
    },
    {
      id: "home",
      label: "Home",
      icon: <MdHome />,
      clickEventMethod: () => {},
    },
    {
      id: "notification",
      label: "Notificatiom",
      icon: <MdNotificationsActive />,
      clickEventMethod: () => {},
    },
    {
      id: "profile",
      label: "Profile",
      icon: <MdManageAccounts />,
      clickEventMethod: () => {},
    },
    {
      id: "logout",
      label: "Log out",
      icon: <MdLogout />,
      clickEventMethod: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        history.push("/signin");
      },
    },
  ];

  return (
    <div className={styles.menu}>
      {menuList.map((itemInfo, idx) => {
        return (
          <div
            className={styles.itemContainer}
            onClick={itemInfo.clickEventMethod}
            key={itemInfo.id}
          >
            <div
              className={styles.itemIconContainer}
              style={{ color: !idx ? "#1d9bf0" : "white" }}
            >
              {itemInfo.icon}
            </div>
            <div className={styles.itemLabelContainer}>{itemInfo.label}</div>
          </div>
        );
      })}
    </div>
  );
}
