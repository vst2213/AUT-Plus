import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./profilepage.css";

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();
  const db = getFirestore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    if (!user) {
      setError("User not authenticated.");
      return;
    }

    try {
      const userId = user.uid;
      const storageRef = ref(storage, `profilePictures/${userId}`);
      setLoading(true);

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, image);

      // Get the URL of the uploaded file
      const url = await getDownloadURL(storageRef);

      // Update the user's profile picture URL in Firestore
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        profilePicture: url,
      });

      // Optionally, update the user's profile picture in Firebase Authentication
      await user.updateProfile({
        photoURL: url,
      });

      setLoading(false);
      alert("Profile picture updated!");

      // Redirect to HomePage after successful upload
      window.location.href = "/home";
    } catch (error) {
      setLoading(false);
      setError("Failed to upload the image. Please try again.");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Update Profile Picture</h2>

      {error && <p className="error-text">{error}</p>}

      {preview && (
        <img src={preview} alt="Profile Preview" className="preview" />
      )}

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ProfilePage;
