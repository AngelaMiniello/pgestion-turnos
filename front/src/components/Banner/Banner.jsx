import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.rowBanner}>
        <div className={styles.colBanner}>
          <div className={styles.textContent}>
            <span className={styles.greeting}> Bienvenido </span>
            <h1 className={styles.bannerp}> Todo lo que tu salud necesita en un sólo lugar </h1>
            <p className={styles.bannerd}>Atención médica integral</p>
          </div>
          <div className={styles.features}>
            <div className={styles.featureicon}>
              <div className={styles.fimg}>
                <img src="/assets/img/imgespecialidades.png" alt="especialidades" className={styles.featureimgage}/>
              </div>
              <p>+70 Especialidades Médicas</p>
            </div>
            <div className={styles.featureicon}>
              <div className={styles.fimg}>
                <img src="/assets/img/imgurgencias.png" alt="urgencias" className={styles.featureimgage}/>
              </div>
            <p>Guardia 24Hs</p>
            </div>
          </div>
        </div>
        <div className={styles.colBannerR}>
          <img src="/assets/img/clinicaimg.png" alt="banner" className={styles.bannerimage}/>
        </div>

      <a href="/">
      </a>
      </div>
    </div>
  );
}

export default Banner;