import * as React from "react";
import { LiftRecord } from "./App";

type Setter = {
  (s: { records: LiftRecord[] }): { records: LiftRecord[] };
};
export function EditForm({
  onClose,
  records,
  setState,
}: {
  records: LiftRecord[];
  setState: (s: Setter) => void;
  onClose: () => void;
}) {
  const setVal =
    (k: "reps" | "weight", i: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setState((s) => ({
        ...s,
        records: s.records.map((r, ind) => ({
          ...r,
          ...(ind === i ? { [k]: parseInt(e.target.value) || 0 } : undefined),
        })),
      }));
  return (
    <form>
      <div className="card">
        <div className="card-block">
          {records.map((record, i) => {
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
                              value={record.reps}
                              onChange={setVal("reps", i)}
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
                                value={record.weight}
                                onChange={setVal("weight", i)}
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
