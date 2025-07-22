import styles from "./Loader.module.css";
import cx from "classnames";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 z-2">
      <div className="relative h-screen w-screen bg-[rgba(0,0,0,0.5)] z-1">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={cx(styles.loader, "")}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
