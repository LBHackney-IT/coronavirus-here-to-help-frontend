import Header from "./Header";
import styles from "../styles/Home.module.css";
import {useRouter} from "next/router";
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const router = useRouter(); 
  const enableGOVUKJavascrit = () => {
    if(router.pathname.includes('add-support') || router.pathname.includes('manage-request')){
      document.body.className = ""
    } else {
      document.body.className = 'js-enabled'
    }
    const GOVUKFrontend = require("../../public/js/govuk")
    window.GOVUKFrontend.initAll()

  }
  useEffect(enableGOVUKJavascrit, [])
  return (
    <>
      <script src="/js/govuk.js"></script>
      <Header />
      <main className={styles.lbhMainWrapper} id="main-content" role="main">
        <div className={styles.lbhContainer}>{children}</div>
      </main>
    </>
  );
}
