import { useEffect } from "react";
import Head from "next/head";
import Test from "../components/test";
import Router from "next/router";

export default function Home() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/dogs");
    }
  });
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Test>Hello world</Test>
      </main>
    </div>
  );
}
