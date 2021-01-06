import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Here to help
        </h1>

        <p className={styles.description}>
          Search for residents
          <a>GO</a>
        </p>

        <hr />

        <p className={styles.description}>
          View callback list
          <a>GO</a>
        </p>

        <hr />

        <p className={styles.description}>
          Assign calls
          <a>GO</a>
        </p>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
