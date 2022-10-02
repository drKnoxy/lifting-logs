import * as React from "react";
import cx from "classnames";

type NavBarProps = {
  cycle: number;
  setCycle: (n: number) => void;
  week: number;
  setWeek: (n: number) => void;
};
export function NavBar(props: NavBarProps) {
  return (
    <div className="m-b-1 hidden-print">
      <div className="header-buttons">
        <label>cycle:</label>
        <div className="btn-group">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <a
              className={cx("btn btn-default", {
                active: i == props.cycle,
              })}
              onClick={() => props.setCycle(i)}
            >
              {i + 1}
            </a>
          ))}
        </div>
      </div>
      <div
        className="header-buttons"
        style={{
          clear: "both",
          marginBottom: "4px;",
        }}
      >
        <label>week:</label>
        <div className="btn-group">
          {[0, 1, 2, 3].map((i) => (
            <a
              className={cx("btn btn-default", { active: i === props.week })}
              onClick={() => props.setWeek(i)}
            >
              {i + 1}
            </a>
          ))}
        </div>
      </div>

      <h2 className="display-2">Lifting Routine</h2>
    </div>
  );
}
