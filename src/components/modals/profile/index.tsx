import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function ProfileModal({ isOpen, closeModal, userProfile, saveProfile }) {
  const [profile, setProfile] = useState(userProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    saveProfile(profile);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Profile Info
                </Dialog.Title>
                <div className="mt-4">
                  <div className="flex flex-col items-center space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full border border-gray-300 rounded p-2"
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "image",
                            value: URL.createObjectURL(e.target.files[0]),
                          },
                        })
                      }
                    />
                    {profile.image && (
                      <img
                        src={profile.image}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    )}
                    <input
                      type="text"
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      placeholder="Bio"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                    <input
                      type="text"
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ProfileModal;
