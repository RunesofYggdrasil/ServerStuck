"use client";

import React, { useEffect } from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  useEffect(() => {
    function handlePageWidth() {
      const root = document.documentElement;
      const innerWidth = window.innerWidth;
      const scrollbarWidth = innerWidth - root.clientWidth;
      const pageWidth = innerWidth - scrollbarWidth - 16;
      root.style.setProperty("--page-width", pageWidth + "px");
    }

    handlePageWidth();
    window.addEventListener("resize", () => {
      handlePageWidth();
    });
    return () => {
      window.removeEventListener("resize", () => {
        handlePageWidth();
      });
    };
  });
  const allPages = [
    {
      route: "",
      name: "HOME",
    },
    {
      route: "upload",
      name: "UPLOAD",
    },
  ];
  return (
    <nav className={styles.navigationOutside}>
      <div className={styles.navigationInside}>
        <div className={styles.navigationLeft}>
          <p>SERVERSTUCKSHEET</p>
        </div>
        <div className={styles.navigationRight}>
          <ul>
            {allPages.map((page, index) => {
              return (
                <li key={index}>
                  <Link href={"./" + page.route}>{page.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
