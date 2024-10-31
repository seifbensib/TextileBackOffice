"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

const ProfileBox = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const sub = decoded.sub;

      fetch(`http://localhost:3020/users/${sub}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src="/images/cover/cover-01.png"
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                width={160}
                height={160}
                className="overflow-hidden rounded-full"
                alt="profile"
              />
            </div>
          </div>
          <div className="mt-4">
          
            <p className="font-medium">{user.username}</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;