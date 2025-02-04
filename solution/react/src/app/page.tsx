import styles from "./page.module.css";
// import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Prueba Técnica: Procesamiento de Links con Microservicios</h1>
      </main>
      <footer className={styles.footer}>
        {/* <Footer /> */}
      </footer>
    </div>
  );
}
