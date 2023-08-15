import classes from "./App.module.css";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import TaskMenu from "./components/TaskMenu/TaskMenu";
import { TaskProvider } from "./context/task-context";
import bgVideoNight from "./assets/image/bg/44d8cc48-4db8-4be5-8530-ec86dfe871bf.webm";
import bgVideoDay from "./assets/image/bg/8a4d521f-4b34-41b0-a1cb-7f30984f033d.webm";
import { Suspense, lazy, useEffect, useState } from "react";
import Loading from "./components/ui/Loading/Loading";
import BackgroundVideo from "./components/ui/BackgroundVideo/BackgroundVideo";

const Tasks = lazy(() => import("./components/Tasks/Tasks"));
const Header = lazy(() => import("./components/Header/Header"));

function App() {
  const [background, setBackground] = useState(bgVideoDay);

  const updateBackground = () => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours <= 18) setBackground(bgVideoDay);
    else setBackground(bgVideoNight);
  };

  useEffect(() => {
    updateBackground();
    const interval = setInterval(() => {
      updateBackground;
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <TaskProvider>
      <Suspense fallback={<Loading />}>
        <main className={classes.app}>
          <BackgroundVideo video={background} />
          <div className={classes.centered}>
            <Header />
            <Pomodoro />
            <TaskMenu />
            <Tasks />
          </div>
        </main>
      </Suspense>
    </TaskProvider>
  );
}

export default App;
