import classes from "./App.module.css";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import TaskMenu from "./components/TaskMenu/TaskMenu";
import bgVideoNight from "./assets/image/bg/44d8cc48-4db8-4be5-8530-ec86dfe871bf.webm";
import bgVideoDay from "./assets/image/bg/8a4d521f-4b34-41b0-a1cb-7f30984f033d.webm";
import { Suspense, lazy, useEffect, useState } from "react";
import Loading from "./components/ui/Loading/Loading";
import BackgroundVideo from "./components/ui/BackgroundVideo/BackgroundVideo";
import { useTheme } from "./context/theme-context";
import { Title } from "react-head";
import { APP_TITLE } from "./constants/configuration";

const Tasks = lazy(() => import("./components/Tasks/Tasks"));
const Header = lazy(() => import("./components/Header/Header"));
const Configuration = lazy(() =>
  import("./components/Configuration/Configuration")
);

function App() {
  const [background, setBackground] = useState(bgVideoDay);
  const { theme } = useTheme();

  const updateBackground = () => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours <= 18) setBackground(bgVideoDay);
    else setBackground(bgVideoNight);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    return () => document.body.removeAttribute("data-theme");
  }, [theme]);

  useEffect(() => {
    updateBackground();
    const interval = setInterval(() => {
      updateBackground;
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Title>{APP_TITLE.DEFAULT}</Title>
      <Suspense fallback={<Loading />}>
        <main className={classes.app}>
          <BackgroundVideo video={background} />
          <div className={classes.centered}>
            <Configuration />
            <Header />
            <Pomodoro />
            <TaskMenu />
            <Tasks />
          </div>
        </main>
      </Suspense>
    </>
  );
}

export default App;
