import style from "./index.module.scss";

const Index = () => {
  return (
    <div className={style.index}>
      <div className="text-handwritten">Stay focused</div>
      <div className={style.button}>Start</div>
    </div>
  );
};
export default Index;
