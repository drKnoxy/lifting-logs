import * as React from "react";
import cx from "classnames";

const App = () => {
  const [alert, setAlert] = React.useState<false | string[]>();
  const [isEditMode, setEditMode] = React.useState<boolean>();

  const [week, setCurrentWeek] = React.useState<number>(0);
  const [cycle, setCurrentCycle] = React.useState<number>(0);
  const [records, setRecords] = React.useState<
    Array<{ label: string; reps: number; weight: number; increment: number }>
  >([]);

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
              <EditForm onClose={() => setEditMode(false)} records={records} />
            )}

            {!isEditMode && (
              <div className="row">
                {records.map((record) => {
                  return (
                    <div>
                      <div className="col-sm-12">
                        <strong>{record.label}:</strong>
                        <span>
                          {record.reps} x {record.weight}
                        </span>
                        {record.reps > 1 && (
                          <i>
                            {/* TODO */}
                            {/* (1RM x {app.oneRepMax(record) | round5}) } */}
                          </i>
                        )}
                      </div>
                      <div className="col-xs-12">
                        90% of your 1rm is used as the base for calculations.
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="m-y-1" />

      <NavBar
        cycle={cycle}
        setCycle={setCurrentCycle}
        week={week}
        setWeek={setCurrentWeek}
      />

      <DisplayTable cycle={cycle} records={records} week={week} />

      <footer className="small text-center">
        <hr />
        &lt;3 <a href="https://twitter.com/adamwknox">adamwknox</a> |{" "}
        <a href="https://github.com/drKnoxy/lifters-log">sourcecode</a>
      </footer>
    </div>
  );
};

export default App;
function AlertInfo({
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
      className="alert alert-info ng-hide"
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

function EditForm({
  onClose,
  records,
}: {
  records: { label: string }[];
  onClose: () => void;
}) {
  return (
    <form>
      <div className="card">
        <div className="card-block">
          {records.map((record) => {
            return (
              <div>
                <div className="form-inline">
                  <div className="row">
                    <div className="col-sm-3">
                      <label className="hidden-xs">{record.label}</label>
                      <h4 className="visible-xs">{record.label}</h4>
                    </div>

                    <div className="col-sm-9">
                      <div className="row">
                        <div className="col-xs-6">
                          <fieldset className="form-group">
                            <label className="visible-xs">Reps</label>
                            <input
                              className="form-control"
                              type="number"
                              //   ng-model="record.reps"
                              required
                            />
                          </fieldset>
                          <p className="form-control-static hidden-xs">x</p>
                        </div>
                        <div className="col-xs-6">
                          <fieldset className="form-group">
                            <label className="visible-xs">Weight</label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                type="number"
                                //   ng-model="record.weight"
                                required
                              />
                              <div className="input-group-addon">lbs</div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <a className="btn btn-primary" onClick={onClose}>
            <i className="fa fa-check"></i>
            Done
          </a>
        </div>
      </div>
    </form>
  );
}

type NavBarProps = {
  cycle: number;
  setCycle: (n: number) => void;
  week: number;
  setWeek: (n: number) => void;
};
function NavBar(props: NavBarProps) {
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

type DisplayTableProps = {
  records: { label: string; increment: number }[];
  week: number;
  cycle: number;
};
function DisplayTable(props: DisplayTableProps) {
  return (
    <div className="m-b-1 xs-expand">
      <table
        className="table table-bordered table-program"
        ng-repeat="week in [0,1,2,3]"
        ng-className="{active: week == app.$storage.currentWeek}"
      >
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
              <th className="hidden-sm-down row-label" rowSpan={3}>
                {[0, 3].includes(setIndex) ? "Warm Up" : "Active"}
              </th>
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
                  <span ng-if="$parent.$last" className="print-pipe"></span>
                  <span ng-if="$parent.$last" className="print-50"></span>
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

function getSets(week: number): Array<{ percentage: number; reps: number }> {
  return [];
}

function oneRepMax(s: any): any {
  return null;
}
function calcWeight(a: any, b: any, c: any, d: any): any {
  return null;
}
