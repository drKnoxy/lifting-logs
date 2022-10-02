import * as React from "react";
import cx from "classnames";
import { LiftRecord, getSets, calcWeight, oneRepMax } from "./App";

type DisplayTableProps = {
  records: LiftRecord[];
  week: number;
  cycle: number;
};
export function DisplayTable(props: DisplayTableProps) {
  return (
    <div className="m-b-1 xs-expand">
      <table className="table table-bordered table-program">
        <thead>
          <tr>
            <th colSpan={99} className="table-header">
              Week {props.week + 1} / Cycle {props.cycle + 1}
            </th>
          </tr>
          <tr>
            <th className="hidden-sm-down">&nbsp;</th>
            {props.records.map((record) => (
              <th>{record.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getSets(props.week).map((set, setIndex) => (
            <tr
              // ng-className="{ 'active' : $last}"
              className={cx({ active: true })}
            >
              {[0, 3].includes(setIndex) && (
                <th className="hidden-sm-down row-label" rowSpan={3}>
                  {0 === setIndex ? "Warm Up" : "Active"}
                </th>
              )}
              {props.records.map((record) => (
                <td
                  className="nowrap"
                  ng-click="app.isAlertVisible = true; app.alertMessages = app.getPlates(app.calcWeight(app.oneRepMax(record), set.percentage, app.$storage.currentCycle, record.increment))"
                >
                  <span ng-className="{'print-50': $parent.$last}">
                    <span className="calculated-weight">
                      {calcWeight(
                        oneRepMax(record),
                        set.percentage,
                        props.cycle,
                        record.increment
                      )}
                    </span>
                    <span className="separator--weight-and-reps">x</span>
                    <span className="reps">{set.reps}</span>
                  </span>
                  {/* <span ng-if="$parent.$last" className="print-pipe"></span>
                  <span ng-if="$parent.$last" className="print-50"></span> */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr>
            <th className="hidden-sm-down" rowSpan={2}>
              Accessory
            </th>
            {props.records.map((record) => (
              <td>
                <span ng-if="app.$storage.currentWeek !== 3">
                  5 x 10 @
                  {calcWeight(
                    oneRepMax(record),
                    0.6,
                    props.cycle,
                    record.increment
                  )}
                </span>
                <span ng-if="app.$storage.currentWeek === 3">-</span>
              </td>
            ))}
          </tr>
          <tr>
            <td>
              Chin-ups <span className="hidden-sm-down">-</span>5 x 10
            </td>
            <td>
              Hanging Leg Raise <span className="hidden-sm-down">-</span>5 x 10
            </td>
            <td>
              Dumbbell Row <span className="hidden-sm-down">-</span>5 x 10
            </td>
            <td>
              Leg Curl <span className="hidden-sm-down">-</span>5 x 10
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
