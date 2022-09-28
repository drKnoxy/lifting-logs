import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

const App = () => {
  const [alert, setAlert] = useState<false | string[]>();
  const [isEditMode, setEditMode] = useState<boolean>();
  const [records, setRecords] = useState<
    Array<{ label: string; reps: number; weight: number }>
  >([]);

  return (
    <div className="container">
      {alert && alert.length && (
        <div
          style="position: fixed; left: 15px; right: 15px; z-index: 100;"
          className="alert alert-info ng-hide"
        >
          <a onClick={() => setAlert(false)} className="close">
            x
          </a>

          <ul>
            {alert.map((a) => (
              <li>{a}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div className="row">
          <div className="col-xs-12 col-lg-6 hidden-print">
            <h1 style="padding-top:0px;">Online 5/3/1 Calculator</h1>
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
            {/* <form name="recordForm"
                  ng-show="app.showEditForm">
                  <div className="card">
                      <div className="card-block">
                          <div ng-repeat="record in app.$storage.records">
                              <div className="form-inline">
                                  <div className="row">
                                      <div className="col-sm-3">
                                          <label className="hidden-xs">{{record.label}}</label>
                                          <h4 className="visible-xs">{{record.label}}</h4>
                                      </div>

                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-xs-6">
                                                  <fieldset class="form-group">
                                                      <label class="visible-xs">Reps</label>
                                                      <input class="form-control"
                                                          id=""
                                                          type="number"
                                                          ng-model="record.reps"
                                                          required />
                                                  </fieldset>
                                                  <p class="form-control-static hidden-xs">x</p>
                                              </div>
                                              <div class="col-xs-6">
                                                  <fieldset class="form-group">
                                                      <label class="visible-xs">Weight</label>
                                                      <div class="input-group">
                                                          <input class="form-control"
                                                              id=""
                                                              type="number"
                                                              ng-model="record.weight"
                                                              required />
                                                          <div class="input-group-addon">
                                                              lbs
                                                          </div>
                                                      </div>
                                                  </fieldset>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <a class="btn btn-primary"
                              ng-disabled="recordForm.$invalid"
                              ng-click="app.showEditForm = false">
                              <i class="fa fa-check"></i>
                              Done
                          </a>

                      </div>
                  </div>
              </form> */}
            {isEditMode && (
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
                          <i ng-show="record.reps > 1">
                            {/* TODO */}
                            {/* (1RM x {{app.oneRepMax(record) | round5}}) } */}
                          </i>
                        )}
                      </div>
                      <div class="col-xs-12">
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
      {/* 
  <hr class="m-y-1" />

  <div class="m-b-1 hidden-print">
      <div class="header-buttons">
          <label>cycle:</label>
          <div class="btn-group">
              <a ng-repeat="cycle in [0,1,2,3,4,5,6,7]"
                  ng-click="app.$storage.currentCycle = cycle"
                  class="btn btn-default"
                  ng-class="{active: (cycle == app.$storage.currentCycle)}">
                  {{ cycle+1 }}
              </a>
          </div>
      </div>
      <div class="header-buttons" style="clear:both;margin-bottom: 4px;">
          <label>week:</label>
          <div class="btn-group">
              <a ng-repeat="week in [0,1,2,3]"
                  ng-click="app.$storage.currentWeek = week"
                  class="btn btn-default"
                  ng-class="{active: (week == app.$storage.currentWeek)}">
                  {{ week+1 }}
              </a>
          </div>
      </div>

      <h2 class="display-2">Lifting Routine</h2>
  </div>

  <div class="m-b-1 xs-expand">
      <table class="table table-bordered table-program"
          ng-repeat="week in [0,1,2,3]"
          ng-class="{active: week == app.$storage.currentWeek}">
          <thead>
              <tr>
                  <th colspan="99"
                      class="table-header">
                      Week {{ week + 1 }} / Cycle {{ app.$storage.currentCycle + 1 }}
                  </th>
              </tr>
              <tr>
                  <th class="hidden-sm-down">&nbsp;</th>
                  <th ng-repeat="record in app.$storage.records">
                      {{record.label}}
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr ng-repeat="set in app.getSets(week)"
                  ng-class="{ 'active' : $last}">
                  <th class="hidden-sm-down row-label"
                      rowspan="3"
                      ng-if="$first || $index === 3">
                      {{ ($first) ? 'Warm Up' : 'Active' }}
                  </th>
                  <td
                      ng-repeat="record in app.$storage.records"
                      class="nowrap"
                      ng-click="app.isAlertVisible = true; app.alertMessages = app.getPlates(app.calcWeight(app.oneRepMax(record), set.percentage, app.$storage.currentCycle, record.increment))"
                  >
                      <span ng-class="{'print-50': $parent.$last}">
                          <span class="calculated-weight">
                              {{ app.calcWeight(app.oneRepMax(record), set.percentage, app.$storage.currentCycle, record.increment) }}
                          </span>
                          <span class="separator--weight-and-reps">x</span>
                          <span class="reps">{{set.reps}}</span>
                      </span>
                      <span ng-if="$parent.$last" class="print-pipe"></span>
                      <span ng-if="$parent.$last" class="print-50"></span>
                  </td>
              </tr>
          </tbody>
          <tbody>
              <tr>
                  <th class="hidden-sm-down"
                      rowspan="2">
                      Accessory
                  </th>
                  <td ng-repeat="record in app.$storage.records">
                      <span ng-if="app.$storage.currentWeek !== 3">
                      5 x 10
                      @{{ app.calcWeight(app.oneRepMax(record), .60, app.$storage.currentCycle, record.increment) }}
                      </span>
                      <span ng-if="app.$storage.currentWeek === 3">
                          -
                      </span>
                  </td>
              </tr>
              <tr>
                  <td>
                      Chin-ups <span class="hidden-sm-down">-</span>
                      5 x 10
                  </td>
                  <td>
                      Hanging Leg Raise <span class="hidden-sm-down">-</span>
                      5 x 10
                  </td>
                  <td>
                      Dumbbell Row <span class="hidden-sm-down">-</span>
                      5 x 10
                  </td>
                  <td>
                      Leg Curl <span class="hidden-sm-down">-</span>
                      5 x 10
                  </td>
              </tr>
          </tbody>
      </table>
  </div> */}

      <footer className="small text-center">
        <hr />
        {/* <3 <a href="https://twitter.com/adamwknox">adamwknox</a> | <a href="https://github.com/drKnoxy/lifters-log">sourcecode</a> */}
      </footer>
    </div>
  );
};

export default App;
