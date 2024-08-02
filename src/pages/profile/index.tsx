import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import {
  BsFillEnvelopeFill,
  BsFillTelephoneFill,
  BsFillShieldLockFill,
} from "react-icons/bs";

const Index = () => {
  const [foto, setFoto] = useState(true);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "1234 Elm St, Springfield, IL 62704", // Static for now
    bio: "Software developer with a passion for creating amazing applications.",
    job: "Developer",
    avatarUrl: "https://via.placeholder.com/150",
    password: "",
  });

  useEffect(() => {
    const userProfileData = {
      name: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone_number"),
      address: "1234 Elm St, Springfield, IL 62704",
      bio: localStorage.getItem("bio") || userProfile.bio,
      job: localStorage.getItem("job") || userProfile.job,
      avatarUrl: localStorage.getItem("avatarUrl") || userProfile.avatarUrl,
      password: localStorage.getItem("password"),
    };
    setUserProfile(userProfileData);
  }, []);

  const handleEditBio = () => {
    const newBio = prompt("Enter new bio:", userProfile.bio);
    if (newBio !== null) {
      setUserProfile({ ...userProfile, bio: newBio });
      localStorage.setItem("bio", newBio);
    }
  };

  const handleEditJob = () => {
    const newJob = prompt("Enter new job title:", userProfile.job);
    if (newJob !== null) {
      setUserProfile({ ...userProfile, job: newJob });
      localStorage.setItem("job", newJob);
    }
  };

  const handleEditAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result;
        setUserProfile({ ...userProfile, avatarUrl });
        localStorage.setItem("avatarUrl", avatarUrl);
        setFoto(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="bg-cover bg-center h-56 p-4 relative"
          style={{ backgroundImage: `url(${userProfile.avatarUrl})` }}
        >
          <div className="absolute right-4 top-4">
            <label
              htmlFor="avatarInput"
              className="bg-white text-gray-800 font-bold py-1 px-2 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <FaPencilAlt />
              <input
                type="file"
                id="avatarInput"
                className="hidden"
                accept="image/*"
                onChange={handleEditAvatar}
              />
            </label>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center pb-4">
            {foto ? (
              <img
                className="h-24 w-24 rounded-full shadow-lg border-4 border-white -mt-12"
                src={userProfile.avatarUrl}
                alt="Profile"
              />
            ) : (
              <h1
                className="text-6xl font-bold text-white mt-2 bg-blue-950 rounded-full p-3 w-24 h-24 text-center cursor-pointer"
                onClick={handleEditJob}
              >
                {localStorage.getItem("username")
                  ? localStorage.getItem("username").charAt(0).toUpperCase()
                  : ""}
              </h1>
            )}
            <p className="text-gray-600 cursor-pointer" onClick={handleEditBio}>
              {userProfile.bio}
            </p>
            <div className="mt-2 flex items-center">
              <button
                className="bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full hover:bg-blue-400"
                onClick={handleEditJob}
              >
                {userProfile.job}
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center">
              <BsFillEnvelopeFill className="h-6 w-6 text-gray-600 mr-2" />
              <span className="ml-2 text-gray-600">{userProfile.email}</span>
            </div>
            <div className="flex items-center mt-3">
              <BsFillTelephoneFill className="h-6 w-6 text-gray-600 mr-2" />
              <span className="ml-2 text-gray-600">{userProfile.phone}</span>
            </div>
            <div className="flex items-center mt-3">
              <BsFillShieldLockFill className="h-6 w-6 text-gray-600 mr-2" />
              <span className="ml-2 text-gray-600">
                Password: {userProfile.password}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
