"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode, JwtPayload } from "jwt-decode";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}



  


const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const router = useRouter();
  const [token] = useLocalStorage<string | null>("token", null);
  const [userRole, setUserRole] = useState("");


  useEffect(() => {
    if (!token) {
      router.push("/auth/signin");
    }else{
      const decoded = jwtDecode<JwtPayload>(token);
      const payload = JSON.stringify(decoded);
      const role = JSON.parse(payload).role;
      setUserRole(role);
    }
  }

)
//check if user is admin  or employee then change the menu
const menuGroups = userRole === "admin" ? [
  {
    name: "MAIN MENU",
    menuItems: [
      
      {
        icon: (
          <img
          src="/images/logo/order.png" 
          alt="Icon"
          width="24"
          height="24"
          className="fill-current"
        />
        ),

        label: "Order",
        route: "#",
        children: [
          { label: "New Order", route: "/order/addOrder" },
          { label: "View Orders", route: "/order/viewOrder" },
        ],
      },    
      {
        icon: (
          <img
            src="/images/icon/emp.png" 
            alt="Icon"
            width="24"
            height="24"
            className="fill-current"
          />
        ),
        label: "Employees",
        route: "#",
        children: [
          { label: "Add Employee", route: "/employee/addEmp" },
          { label: "View Employees", route: "/employee/attendance" },
          { label: "Attendance", route: "/employee/presence" },
        ],
      },
      {
        icon: (
          <img
          src="/images/logo/calendar.png" 
          alt="Icon"
          width="24"
          height="24"
          className="fill-current"
        />
        ),
        label: "Calendar",
        route: "/calendar",
      },
      {
        icon: (
            <img
            src="/images/logo/calim.png" 
            alt="Icon"
            width="24"
            height="24"
            className="fill-current"
          />
        
        ),


        label: "Claim",
        route: "/claim",
       
        
      },
      {
        icon: (
          <img
          src="/images/logo/jobseeker.png" 
          alt="Icon"
          width="24"
          height="24"
          className="fill-current"
        />
        ),
        
        label: "Job Seekers",
        route: "/jobSeekers",
       
      },
      {
        icon: (
          <img
          src="/images/logo/profile-user.png" 
          alt="Icon"
          width="24"
          height="24"
          className="fill-current"
        />
        ),
        label: "Profile",
        route: "/profile",
      },
      {
        icon: (
          <img
          src="/images/logo/face-lock.png" 
          alt="Icon"
          width="24"
          height="24"
          className="fill-current"
        />
        ),
        label: "Authentication",
        route: "#",
        children: [
          { label: "Sign Out", route: "/auth/signin" },
        ],
      },
    ],
  },
] : userRole === "employee" ? [
  {
    name: "EMPLOYEE MENU",
    menuItems: [
      {
        icon: (
          <img
            src="/images/logo/profile-user.png"
            alt="Icon"
            width="24"
            height="24"
            className="fill-current"
          />
        ),
        label: "Profile",
        route: "/profile",
      },
      {
        icon: (
          <img
            src="/images/icon/emp.png" 
            alt="Icon"
            width="24"
            height="24"
            className="fill-current"
          />
        ),
        label: "Attendance",
        route: "/employee/PresenceEmp",
      },
      {
        icon: (
          <img
            src="/images/logo/calendar.png"
            alt="Icon"
            width="24"
            height="24"
            className="fill-current"
          />
        ),
        label: "Calendar",
        route: "/calendar",
      },
      {
        icon: (
          <img
            src="/images/logo/calim.png"
            alt="Icon"
            width="24"
            height="24"
            className="fill-current"
          />
        ),
        label: "Claim",
        route: "/claims",
      },
      {
        icon: (
          <img
            src="/images/logo/face-lock.png"
            alt="Icon"
            width="24"
            height="24"
            className="fill-current"
          />
        ),
        label: "Authentication",
        route: "#",
        children: [
          { label: "Sign Out", route: "/auth/signin" },
        ],
      },
    ],
  },
] :[];




  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10">
          <Link href="/">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Image
    width={100}
    height={200}
    src={"/images/logo/mclogo.jpg"}
    alt="Logo"
    priority
    className="dark:hidden"
    style={{ width: "auto", height: "auto" }}
  />
</div>

          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
