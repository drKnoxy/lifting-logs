import * as React from "react";

export function AlertInfo({
  onCloseClick,
  alert,
}: {
  onCloseClick: () => void;
  alert: string[];
}) {
  return (
    <div
      style={{
        position: "fixed",
        left: "15px",
        right: "15px",
        zIndex: "100",
      }}
      className="alert alert-info"
    >
      <a onClick={onCloseClick} className="close">
        x
      </a>

      <ul>
        {alert.map((a) => (
          <li>{a}</li>
        ))}
      </ul>
    </div>
  );
}
