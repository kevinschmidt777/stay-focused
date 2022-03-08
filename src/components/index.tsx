import style from "./index.module.scss";
import bg from "../assets/bg.webp";
import classNames from "classnames";
import { useEffect, useState } from "react";

const Index = () => {
  const [timer, setTimer] = useState<number>(1500);
  const [focus, setFocus] = useState<"work" | "pause">("work");
  const [pause, setPause] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Request browser permission for notification.
   */
  useEffect(() => {
    if (Notification.permission !== "granted") Notification.requestPermission();
  }, []);

  /**
   * Counting...
   */
  useEffect(() => {
    if (!pause) {
      setTimeout(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          if (focus === "work") {
            // Switch to PAUSE
            setFocus("pause");
            setTimer(300);
            new Notification("Stay focused", {
              icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
              body: "It's time for a little break!",
            });
          } else {
            // SWITCH TO WORK
            setFocus("work");
            setTimer(1500);
            new Notification("Stay focused", {
              icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
              body: "Let's continue work!",
            });
          }
        }
      }, 1000);
    }
  }, [timer, pause]);

  const clickButton = () => {
    setPause(!pause);
  };

  const showTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer - minutes * 60;
    return (
      minutes +
      ":" +
      (seconds.toString().length === 1 ? "0" + seconds : seconds)
    );
  };

  const skipPhase = () => {
    setLoading(true);
    setPause(true);
    setTimeout(() => {
      if (focus === "work") {
        // Switch to PAUSE
        setFocus("pause");
        setTimer(300);
      } else {
        // SWITCH TO WORK
        setFocus("work");
        setTimer(1500);
      }
      setPause(false);
      setLoading(false);
    }, 1005);
  };

  return (
    <div
      className={style.index}
      style={{ backgroundImage: "url('" + bg + "')" }}
    >
      <div>
        <div className={style.logo}>
          <div>Stay focused</div>
          {!pause && (
            <div className={style.focus}>
              {focus === "work" ? "while working" : "while pausing"}
            </div>
          )}
        </div>
        <div className={style.button}>
          <button onClick={() => clickButton()}>
            {loading ? (
              <i className="fa-solid fa-fw fa-circle-notch fa-spin" />
            ) : (
              <i
                className={classNames("fa-solid fa-fw", {
                  "fa-play": pause,
                  "fa-pause": !pause,
                })}
              />
            )}
          </button>
        </div>
        <div className={classNames(style.timer, { [style.invisible]: pause })}>
          {showTimer()}
          <div className={style.skip} onClick={() => skipPhase()}>
            <span>skip phase </span>
            <i className="fa-solid fa-arrow-right" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;