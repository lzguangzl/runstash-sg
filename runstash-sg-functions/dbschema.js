/* To show the db schema in firebase */
let db = {
  users: [
    {
      userId: "",
      email: "",
      username: "",
      createdAt: "",
      imageUrl: "",
      bio: "",
      website: "",
      location: "",
    },
  ],
  profiles: [
    {
      name: "Andrew",
      date: "2020-07-15T10:05:17.245Z",
      distance: 3,
      createdAt: "2020-07-15T10:05:17.245Z",
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      username: "",
      profileId: "",
      comment: "",
      createdAt: "2020-07-15T10:05:17.245Z",
    },
  ],
  notifications: [
    {
      recipient: "",
      sender: "",
      read: "true | false",
      profileId: "",
      type: "like | comment",
      createdAt: "2020-07-15T10:05:17.245Z",
    },
  ],
};

const userDetails = {
  // Redux Data
  credentials: {
    userId: "",
    email: "",
    username: "",
    createdAt: "",
    imageUrl: "",
    bio: "",
    website: "",
    location: "",
  },
  likes: [
    {
      username: "user1",
      profileId: "",
    },
    {
      username: "user1",
      profileId: "",
    },
  ],
};
