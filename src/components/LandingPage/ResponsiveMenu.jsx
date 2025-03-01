import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const ResponsiveMenu = ({ open, setOpen, isAuthenticated, user, navItems }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: open ? 1 : 0,
        x: open ? 0 : -100,
      }}
      className={`fixed top-0 left-0 w-72 h-screen bg-white z-50 shadow-lg transform ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-end">
          <IoClose className="text-3xl cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* User profile section for authenticated users */}
        {isAuthenticated && user && (
          <div className="my-6 pb-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                {user?.avatar || <CgProfile className="text-2xl" />}
              </div>
              <div>
                <p className="font-bold">{user.name}</p>
                {user.email && <p className="text-sm text-gray-600">{user.email}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Navigation menu */}
        <ul className="flex flex-col gap-4 mt-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path || item.link}
                onClick={() => setOpen(false)}
                className="inline-block py-2 hover:text-primary font-semibold"
              >
                {item.label || item.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Additional options for authenticated users */}
        {isAuthenticated && (
          <div className="mt-6 pt-6 border-t">
            <ul className="flex flex-col gap-4">
              <li>
                <a href="/profile" className="inline-block py-2 hover:text-primary font-semibold">
                  Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="inline-block py-2 hover:text-primary font-semibold">
                  Settings
                </a>
              </li>
              <li>
                <a href="/logout" className="inline-block py-2 text-red-500 hover:text-red-600 font-semibold">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResponsiveMenu;