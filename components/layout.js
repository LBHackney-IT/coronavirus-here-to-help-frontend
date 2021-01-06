import React from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <footer>
        <p>Should there be a footer here?</p>
      </footer>
    </>
  );
}
