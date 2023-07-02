import React from "react";
import styles from "./CreateContent.module.css";
import FormControls from "../../utills/FormControls/FormControls";
import commonStyles from "../CommonStyles.module.css";
import TextWrapper from "../../utills/TextWrapper/TextWrapper";
import UserProfilePic from "../../utills/UserProfilePic/UserProfilePic";
import { Formik, Form } from "formik";
import { createPost, getPost } from "../../../services";

export default function CreateContent(props) {
  const userId = localStorage.getItem("userId");

  const contentData = {
    description: "",
  };

  const handleCreateContent = async (values, { setSubmitting }) => {
    try {
      if (values && values.description) {
        await createPost({
          description: values?.description,
          createdAt: new Date().toISOString(),
          likesCount: 0,
          createdBy: userId,
        });
        values.description = "";
        setSubmitting(false);
      }

      props.getLatestPostList();
    } catch (error) {
      console.log("Inside CreateContent.handleCreateContent", error);
    }
  };

  return (
    <div
      className={`${commonStyles.contentContainer} ${styles.createContentContainer} ${commonStyles.borderedDiv}`}
    >
      <div className={commonStyles.contentLeft}>
        <UserProfilePic />
      </div>
      <div className={commonStyles.contentRight}>
        <Formik initialValues={contentData} onSubmit={handleCreateContent}>
          {(formik) => {
            return (
              <Form className={styles.tweetForm}>
                <FormControls
                  type="tweetDescription"
                  isError={formik.errors.description}
                  isTouched={formik.touched.description}
                />
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.tweet}
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    <TextWrapper textLabel="Tweet" />
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
