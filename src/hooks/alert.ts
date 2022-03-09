import ring from "../assets/ring.mp3";

/**
 * Alert if timer is finish and changes phase.
 * @returns
 */
export const hookAlert = (phase: string) => {
  // Play sound.
  const audio = new Audio(ring);
  audio.volume = 0.3;
  audio.play();

  // Show browser notification.
  return new Notification("Stay focused", {
    body:
      phase === "work"
        ? "Let's continue work!"
        : "It's time for a little break!",
  });
};
