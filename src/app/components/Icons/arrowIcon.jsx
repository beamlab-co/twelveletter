import React from "react";
import styles from "../menubar/fullscreenMenu.module.css";

const ArrowIcon = ({ width = 20, height = 11, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3292 3.42317H0.585938C0.262354 3.42317 0 3.68552 0 4.0091V5.37629V6.74348C0 7.06706 0.262354 7.32942 0.585938 7.32942H15.3292V9.57839C15.3292 10.6224 16.5914 11.1453 17.3297 10.4071L21.5318 6.20495C21.9895 5.74729 21.9895 5.00529 21.5318 4.54768L17.3297 0.345578C16.5915 -0.392655 15.3292 0.130197 15.3292 1.17424V3.42317Z"
      fill={color}
      className={`${styles.arrowIcon}`}
    />
  </svg>
);

export default ArrowIcon;
