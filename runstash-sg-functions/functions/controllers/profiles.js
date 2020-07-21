const { db } = require("../util/admin");

// Get all profiles
const getAllProfiles = (req, res) => {
  db.collection("profiles")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let profiles = [];
      data.forEach((doc) => {
        profiles.push({
          profileId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(profiles);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Post one profile
const postOneProfile = (req, res) => {
  const newProfile = {
    username: req.user.username,
    date: new Date().toISOString(),
    userImage: req.user.imageUrl,
    distance: req.body.distance,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("profiles")
    .add(newProfile)
    .then((doc) => {
      let resProfile = newProfile;
      resProfile.profileId = doc.id;
      res.json(resProfile);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: `Something went wrong` });
    });
};

// Get one profile
const getProfile = (req, res) => {
  let profileData = {};
  db.doc(`/profiles/${req.params.profileId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({
          error: "Profile not found",
        });
      }
      profileData = doc.data();
      profileData.profileId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("profileId", "==", req.params.profileId)
        .get();
    })
    .then((data) => {
      profileData.comments = [];
      data.forEach((doc) => {
        profileData.comments.push(doc.data());
      });
      return res.json(profileData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: `Something went wrong` });
    });
};

// Comment on a profile
const commentOnProfile = (req, res) => {
  if (req.body.comment.trim() === "") {
    return res.status(400).json({ comment: "Must not be empty" });
  }

  const newComment = {
    comment: req.body.comment,
    createdAt: new Date().toISOString(),
    profileId: req.params.profileId,
    username: req.user.username,
    userImage: req.user.imageUrl,
  };

  db.doc(`/profiles/${req.params.profileId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Profile not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: `Something went wrong` });
    });
};

// Like a profile
const likeProfile = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("username", "==", req.user.username)
    .where("profileId", "==", req.params.profileId)
    .limit(1);

  const profileDocument = db.doc(`/profiles/${req.params.profileId}`);

  let profileData = {};

  profileDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        profileData = doc.data();
        profileData.profileId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Profile not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            profileId: req.params.profileId,
            username: req.user.username,
          })
          .then(() => {
            profileData.likeCount++;
            return profileDocument.update({ likeCount: profileData.likeCount });
          })
          .then(() => {
            return res.json(profileData);
          });
      } else {
        return res.status(400).json({ error: "Profile already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Unlike a profile
const unlikeProfile = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("username", "==", req.user.username)
    .where("profileId", "==", req.params.profileId)
    .limit(1);

  const profileDocument = db.doc(`/profiles/${req.params.profileId}`);

  let profileData = {};

  profileDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        profileData = doc.data();
        profileData.profileId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Profile not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Profile not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            profileData.likeCount--;
            return profileDocument.update({ likeCount: profileData.likeCount });
          })
          .then(() => {
            res.json(profileData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Delete a profile
const deleteProfile = (req, res) => {
  const document = db.doc(`/profiles/${req.params.profileId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({
          error: "Profile not found",
        });
      }
      if (doc.data().username !== req.user.username) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Profile deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

module.exports = {
  getAllProfiles,
  postOneProfile,
  getProfile,
  commentOnProfile,
  likeProfile,
  unlikeProfile,
  deleteProfile,
};
