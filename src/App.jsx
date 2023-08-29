import { Suspense, useCallback, useEffect, useState } from "react";
import { Title } from "react-head";
import classes from "./App.module.css";
import bgVideoNight from "./assets/image/bg/44d8cc48-4db8-4be5-8530-ec86dfe871bf.webm";
import bgVideoDay from "./assets/image/bg/8a4d521f-4b34-41b0-a1cb-7f30984f033d.webm";
import Content from "./components/Content/Content";
import BackgroundVideo from "./components/ui/BackgroundVideo/BackgroundVideo";
import Loading from "./components/ui/Loading/Loading";
import { APP_TITLE } from "./constants/configuration";
import { useTheme } from "./context/theme-context";

function App() {
  const [background, setBackground] = useState(bgVideoDay);
  const { theme } = useTheme();

  const updateBackground = useCallback(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours <= 18) setBackground(bgVideoDay);
    else setBackground(bgVideoNight);
  }, [background]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    updateBackground();
    const interval = setInterval(() => {
      updateBackground();
    }, 1000 * 60);

    updateBackground();

    return () => {
      clearInterval(interval);
      document.body.removeAttribute("data-theme");
    };
  }, [theme]);

  return (
    <>
      <Title>{APP_TITLE.DEFAULT}</Title>
      <Suspense fallback={<Loading />}>
        <main className={classes.app}>
          <BackgroundVideo video={background} />
          <Content />
        </main>
      </Suspense>
    </>
  );
}

export default App;
