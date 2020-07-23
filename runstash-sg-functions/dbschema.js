/* To show the db schema in firebase */
let db = {
  users: [
    {
      userId: "ckZoFA5nyhSDkeT55ZktIRpmkPs1",
      email: "user@gmail.com",
      username: "user",
      createdAt: "2020-07-16T08:36:55.599Z",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/runstash-sg.appspot.com/o/4529455752.png?alt=media",
      bio: "Hello I am user",
      website: "http://user2.com.sg",
      location: "Los Angeles, CA",
    },
  ],
  profiles: [
    {
      name: "user",
      date: "2020-07-15T10:05:17.245Z",
      distance: 3,
      createdAt: "2020-07-15T10:05:17.245Z",
      likeCount: 5,
      commentCount: 2,
      userImage:
        "https://firebasestorage.googleapis.com/v0/b/runstash-sg.appspot.com/o/4529455752.png?alt=media",
    },
  ],
  comments: [
    {
      username: "user",
      profileId: "8Y2ukpjj1bXbJqMdZe6z",
      comment: "Nice Comment",
      createdAt: "2020-07-15T10:05:17.245Z",
      userImage:
        "https://firebasestorage.googleapis.com/v0/b/runstash-sg.appspot.com/o/4529455752.png?alt=media",
    },
  ],
  notifications: [
    {
      recipient: "user2",
      sender: "user",
      read: "true | false",
      profileId: "8Y2ukpjj1bXbJqMdZe6z",
      type: "like | comment",
      createdAt: "2020-07-15T10:05:17.245Z",
    },
  ],
  likes: [
    {
      profileId: "8Y2ukpjj1bXbJqMdZe6z",
      username: "user",
    },
  ],
};

const userDetails = {
  // Redux Data
  credentials: {
    userId: "ckZoFA5nyhSDkeT55ZktIRpmkPs1",
    email: "user@gmail.com",
    username: "user",
    createdAt: "2020-07-16T08:36:55.599Z",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/runstash-sg.appspot.com/o/4529455752.png?alt=media",
    bio: "Hello I am user",
    website: "http://user2.com.sg",
    location: "Los Angeles, CA",
  },
  likes: [
    {
      username: "user",
      profileId: "8Y2ukpjj1bXbJqMdZe6z",
    },
    {
      username: "user2",
      profileId: "wz7zdO1DWIOVCpBlYSzz",
    },
  ],
};
