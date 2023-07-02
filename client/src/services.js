const fetchRequest = async (requestBody, sendToken) => {
  const authToken = localStorage.getItem("token");
  try {
    const response = await fetch(window.URL.link, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: sendToken ? authToken : "",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const sendSignUpData = async (data) => {
  let requestBody = {
    query: `mutation{
          createUser(email: "${data.email}", password: "${data.password}", name: "${data.name}", userId: "${data.userId}") {
              userId,
              token,
              tokenExpiration
          }
      }`,
  };
  return await fetchRequest(requestBody, false);
};

const addFollower = async (data) => {
  let requestBody = {
    query: `mutation {
      updateUser(followerId: "${data.followerId}", type: "addFollower") {
        status
      }
    }
    `,
  };
  return await fetchRequest(requestBody, true);
};

const removeFollower = async (data) => {
  let requestBody = {
    query: `mutation {
      updateUser(followerId: "${data.followerId}", type: "removeFollower") {
        status
      }
    }
    `,
  };
  return await fetchRequest(requestBody, true);
};

const createPost = async (data) => {
  let requestBody = {
    query: `mutation {
      createPost(description: "${data.description}", createdAt: "${data.createdAt}", likesCount: ${data.likesCount}, createdBy: "${data.createdBy}") {
        id
      }
    }
    `,
  };
  return await fetchRequest(requestBody, true);
};

const updatePost = async (data) => {
  let requestBody = {
    query: `mutation {
      updatePost(likesCount: ${data.likesCount} , postId: "${data.postId}", description: "${data.description}") {
        status
      }
    }`,
  };
  return await fetchRequest(requestBody, true);
};

const deletePost = async (data) => {
  let requestBody = {
    query: `mutation {
      deletePost(postId: "${data.postId}") {
        status
      }
    }
    `,
  };
  return await fetchRequest(requestBody, true);
};


const sendSignInData = async (data) => {
  let requestBody = {
    query: `
            query{
                login(email:"${data.email}",password:"${data.password}"){
                userId,
                token,
                tokenExpiration
                }
            }`,
  };
  return await fetchRequest(requestBody, false);
};

const getUnFollowedUsers = async () => {
  let requestBody = {
    query: `query {
        getUnFollowedUsers{
          name,
          userId,
          email,
          isAuthenticated,
        }
      }`,
  };
  return await fetchRequest(requestBody, true);
};

const getPost = async () => {
  let requestBody = {
    query: `query {
      getPost{
        id,
        description,
        user {
          id,
          userId,
          name,
          email,
        },
        createdAt,
        likesCount,
      }
    }
    `,
  };
  return await fetchRequest(requestBody, true);
};

export {
  sendSignInData,
  sendSignUpData,
  getUnFollowedUsers,
  addFollower,
  removeFollower,
  updatePost,
  deletePost,
  getPost,
  createPost,
};
