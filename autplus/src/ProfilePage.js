import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./profilepage.css";

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state for better user feedback

  const auth = getAuth();
  const user = auth.currentUser;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview the selected image
      setError(null); // Clear error when new image is selected
    } else {
      setPreview(null); // If no image is selected, reset the preview
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    try {
      const storage = getStorage();
      const db = getFirestore();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);

      setLoading(true);

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, image);

      // Get the URL of the uploaded file
      const url = await getDownloadURL(storageRef);

      // Update the user's profile picture URL in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        profilePicture: url,
      });

      // Optionally, update the user's profile picture in Firebase Authentication
      await user.updateProfile({
        photoURL: url,
      });

      setLoading(false);
      alert("Profile picture updated!");
    } catch (error) {
      setLoading(false);
      setError("Failed to upload the image. Please try again.");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Update Profile Picture</h2>

      {/* Error Message */}
      {error && <p className="error-text">{error}</p>}

      {/* Image Preview */}
      {preview && (
        <img src={preview} alt="Profile Preview" className="preview" />
      )}

      {/* File Input */}
      <input type="file" onChange={handleFileChange} />

      {/* Upload Button */}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ProfilePage;
