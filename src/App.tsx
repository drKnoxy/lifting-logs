import * as React from "react";
import { DisplayTable } from "./DisplayTable";
import { AlertInfo } from "./AlertInfo";
import { EditForm } from "./EditForm";
import { NavBar } from "./NavBar";

export type LiftRecord = {
  label: string;
  increment: number;
  reps: number;
  weight: number;
};
const App = () => {
  const [alert, setAlert] = React.useState<false | string[]>();
  const [isEditMode, setEditMode] = React.useState<boolean>();

  const [state, setState] = React.useState<{
    records: LiftRecord[];
    currentCycle: number;
    currentWeek: number;
  }>({
    records: [
      {
        label: "Overhead Press",
        increment: 5,
        reps: 2,
        weight: 115,
      },
      {
        label: "Deadlift",
        increment: 10,
        reps: 3,
        weight: 285,
      },
      {
        label: "Bench Press",
        increment: 5,
        reps: 1,
        weight: 180,
      },
      {
        label: "Back Squat",
        increment: 10,
        reps: 5,
        weight: 265,
      },
    ],
    currentCycle: 0,
    currentWeek: 0,
  });

  return (
    <div className="container">
      {alert && alert.length && (
        <AlertInfo alert={alert} onCloseClick={() => setAlert(false)} />
      )}

      <div>
        <div className="row">
          <div className="col-xs-12 col-lg-6 hidden-print">
            <h1 style={{ paddingTop: "0px" }}>Online 5/3/1 Calculator</h1>
            <p>
              This is a calculator for wendler's 5/3/1 routine. Enter your PRs,
              and the tables below will update with what weights you should be
              using.
            </p>
          </div>
          <div className="col-xs-12 col-lg-6">
            <h2 className="hidden-print">
              Starting PRs
              {!isEditMode && (
                <a
                  className="btn btn-default btn-sm"
                  onClick={() => setEditMode(true)}
                >
                  edit
                </a>
              )}
            </h2>
            {isEditMode && (
              <EditForm
                onClose={() => setEditMode(false)}
                records={state.records}
                setState={setState}
              />
            )}

            {!isEditMode && (
              <div className="row">
                {state.records.map((record) => {
                  return (
                    <div>
                      <div className="col-sm-12">
                        <strong>{record.label}:</strong>
                        <span>
                          {record.reps} x {record.weight}
                        </span>
                        {record.reps > 1 && (
                          <i> (1RM x {round5(oneRepMax(record))})</i>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="col-xs-12">
                  90% of your 1rm is used as the base for calculations.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="m-y-1" />

      <NavBar
        cycle={state.currentCycle}
        setCycle={(currentCycle) => setState((s) => ({ ...s, currentCycle }))}
        week={state.currentWeek}
        setWeek={(currentWeek) => setState((s) => ({ ...s, currentWeek }))}
      />

      <DisplayTable
        cycle={state.currentCycle}
        records={state.records}
        week={state.currentWeek}
      />

      <footer className="small text-center">
        <hr />
        &lt;3 <a href="https://twitter.com/adamwknox">adamwknox</a> |{" "}
        <a href="https://github.com/drKnoxy/lifters-log">sourcecode</a>
      </footer>
    </div>
  );
};

export default App;

export function getSets(
  week: number
): Array<{ percentage: number; reps: string }> {
  const routine531 = [
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "5", percentage: 0.6 },
      { reps: "5", percentage: 0.65 },
      { reps: "5", percentage: 0.75 },
      { reps: "5+", percentage: 0.85 },
    ],
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "3", percentage: 0.6 },
      { reps: "3", percentage: 0.7 },
      { reps: "3", percentage: 0.8 },
      { reps: "3+", percentage: 0.9 },
    ],
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "5", percentage: 0.6 },
      { reps: "5", percentage: 0.75 },
      { reps: "3", percentage: 0.85 },
      { reps: "1+", percentage: 0.95 },
    ],
    [
      { reps: "5", percentage: 0.4 },
      { reps: "5", percentage: 0.5 },
      { reps: "5", percentage: 0.6 },
      { reps: "5+", percentage: 0.6 },
    ],
  ];
  return routine531[week];
}

export function calcWeight(
  weight: number | undefined,
  percentage: number,
  cycle: number,
  increment: number
) {
  // Add an extra check for weight, because it is a user input,
  // so it is very possible for it to be falsey
  if (weight === undefined) {
    return "-";
  }

  weight *= 0.9; // start with 90% of the recorded 1rm
  weight += cycle * increment; // add to the weight based on cycle
  weight *= percentage; // modify the weight used based on the program
  weight = round5(weight); // round it to the nearest 5 lbs

  return weight;
}
// Round to the nearest 5
function round5(num: number) {
  return Math.round(num / 5) * 5;
}

/**
 * Epley Formula for One rep max
 * https://en.wikipedia.org/wiki/One-repetition_maximum
 */
export function oneRepMax(r: { weight: number; reps: number }) {
  if (false === !!r.weight || false === !!r.reps) {
    return 0;
  }

  return r.weight * (1 + r.reps / 30);
}

function getPlates(weight: number) {
  var plates = weightOnBar({ weight });
  return plates.map(({ plate, count }) => `${count} x ${plate}`);
}

/**
 * Returns the weight on each side
 */
function weightOnBar({ weight, bar = 45 }: { weight: number; bar?: number }) {
  var plates = weight - bar;
  var platesPerSide = plates / 2;
  var out: { plate: number; count: number }[] = [];

  [45, 35, 25, 10, 5, 2.5].forEach((p) => {
    var count = Math.floor(platesPerSide / p);
    if (count > 0) {
      out.push({ plate: p, count });
      platesPerSide -= count * p;
    }
  });

  return out;
}
