import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
      style={{
        height: "100vh",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Link
          to="/docs/general"
          style={{
            textAlign: "center",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <img
            src="/EDFI/img/logo_light.png"
            alt="EFDI"
            style={{ maxWidth: "80%", maxHeight: "40vh", marginBottom: "20px" }}
          />
          <h1 className="hero__title" style={{ color: "#FFFFFF" }}>
            Posgrado {siteConfig.title}
          </h1>
        </Link>
        <Link
          className="button button--secondary button--lg"
          to="/docs/general"
        >
          Ver Mis Entregas
        </Link>
      </div>
    </header>
  );
}
export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomepageHeader />
    </Layout>
  );
}
