import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Camera } from "lucide-react";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo) {
        navigate("/login");
        return;
      }
      setUser(userInfo);

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/auth/profile/${userInfo._id}`
        );
        const userData = response.data;
        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        try {
          const response = await axios.post(
            `http://localhost:5000/api/auth/upload-profile-image`,
            {
              userId: user._id,
              image: base64String,
            }
          );
          const newImageUrl = response.data.imageUrl;
          setProfileImage(newImageUrl);
          alert("Profile image updated successfully!");
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Failed to upload image. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="select-none flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="text-black px-6 py-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
          <hr />
        </div>

        {/* Profile Section */}
        <div className="px-6 py-6">
          {loading && (
            <p className="text-xs text-purple-600 mb-2">Uploading image...</p>
          )}
          {user ? (
            <div className="">
            <div className=" mb-10 flex items-center gap-6">
              {/* Profile Image with Camera Icon */}
              <div className="relative">
                <img
                  src={
                    profileImage ||
                    "https://placehold.co/96x96/E0BBE4/FFFFFF?text=MD"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-1 right-1 bg-purple-600 p-2 rounded-full hover:bg-purple-500 shadow-md cursor-pointer"
                >
                  <Camera size={16} color="#fff" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* User Info */}
              <div>
                <h3 className="text-gray-800 font-bold text-lg">
                  {user.fullName || "Marry Doe"}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  {user.email || "marry@gmail.com"}
                </p>
               
              </div>
              
            </div>
<div className="flex items-center justify-center text-center">
                 <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed
                  Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna
                  Aliquyam Erat.
                </p>
            </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center">Loading...</p>
          )}
        </div>

        {/* Bottom Section Placeholder */}
        <div className="h-20 border-t bg-gray-50 flex justify-center items-center text-gray-400 text-sm">
          Additional Settings Coming Soon...
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
