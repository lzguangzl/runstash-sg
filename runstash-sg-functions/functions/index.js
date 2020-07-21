const functions = require("firebase-functions");
const express = require("express");
const {
  getAllProfiles,
  postOneProfile,
  getProfile,
  commentOnProfile,
  likeProfile,
  unlikeProfile,
  deleteProfile,
} = require("./controllers/profiles");
const { signup, login, FBAuth } = require("./controllers/auth");
const {
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./controllers/users");
const { db } = require("./util/admin");

const app = express();

// Auth route
app.post("/signup", signup);
app.post("/login", login);

// Profiles route
app.get("/profiles", getAllProfiles);
app.post("/profile", FBAuth, postOneProfile);
app.get("/profile/:profileId", getProfile);
app.delete("/profile/:profileId", FBAuth, deleteProfile);
app.get("/profile/:profileId/like", FBAuth, likeProfile);
app.get("/profile/:profileId/unlike", FBAuth, unlikeProfile);
app.post("/profile/:profileId/comment", FBAuth, commentOnProfile);

// Users route
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);
app.get("/notifications", FBAuth, markNotificationsRead);

// Create notification on like event
const createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/profiles/${snapshot.data().profileId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().username !== snapshot.data().username) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().username,
            sender: snapshot.data().username,
            type: "like",
            read: false,
            profileId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

// Delete notification on unlike event
const deleteNotificationOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  });

// Create notification on comment event
const createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/profiles/${snapshot.data().profileId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().username !== snapshot.data().username) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().username,
            sender: snapshot.data().username,
            type: "comment",
            read: false,
            profileId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

// User image change event
const onUserImageChange = functions.firestore
  .document("/users/{userId}")
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log("Image had changed");
      const batch = db.batch();
      return db
        .collection("profiles")
        .where("username", "==", change.before.data().username)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const profile = db.doc(`/profiles/${doc.id}`);
            batch.update(profile, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

// Profile delete event
const onProfileDelete = functions.firestore
  .document("/profiles/{profileId}")
  .onDelete((snapshot, context) => {
    const profileId = context.params.profileId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("profileId", "==", profileId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("profileId", "==", profileId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("profileId", "==", profileId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
      });
  });

const api = functions.https.onRequest(app);

module.exports = {
  api,
  createNotificationOnLike,
  deleteNotificationOnUnlike,
  createNotificationOnComment,
  onUserImageChange,
  onProfileDelete,
};
