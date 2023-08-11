import classes from "./App.module.css";
import Header from "./components/Header/Header";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import TaskMenu from "./components/TaskMenu/TaskMenu";
import { TaskProvider } from "./context/task-context";
import Tasks from "./components/Tasks/Tasks";
import bgVideoNight from "./assets/bg/44d8cc48-4db8-4be5-8530-ec86dfe871bf.webm";
import bgVideoDay from "./assets/bg/8a4d521f-4b34-41b0-a1cb-7f30984f033d.webm";
import logo from "./assets/logo/97ced400-bd62-48cd-a883-f2ec8daa6fa9.ico";
function App() {
  return (
    <>
      <TaskProvider>
        <main className={classes.app}>
          <video
            className={classes["background-video"]}
            autoPlay
            loop
            muted
            src={bgVideoDay}
          ></video>
          <div className={classes.centered}>
            <Header />
            <Pomodoro />
            <TaskMenu />
            <Tasks />
          </div>
        </main>
      </TaskProvider>
    </>
  );
}

export default App;
