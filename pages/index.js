import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

export default function Home() {

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Here to help</h1>

          <table class={[styles.govukTable, styles.lbhTable].join(' ')}>
            <tbody class="govuk-table__body">

            <p className={styles.description}>
            Search for residents
              <a href="/residents" className={[styles.govukButton,styles.lbhButton].join(' ')}> GO</a>
            </p>
          <hr />

          <p className={styles.description}>
            View callback list
            <a href="/callback-list" className={[styles.govukButton,styles.lbhButton].join(' ')}> GO</a>
          </p>

          <hr />

          <p className={styles.description}>
            Assign calls
            <a href="/assign-calls" className={[styles.govukButton,styles.lbhButton].join(' ')}> GO</a>
          </p>
          </tbody>
          </table>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </Layout>
  );
}
