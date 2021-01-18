import React from "react";
import Header from "./Header";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.lbhMainWrapper} id="main-content" role="main">
        <div className={styles.lbhContainer}>{children}</div>
      </main>
    </>
  );
}
