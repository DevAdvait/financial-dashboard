import "./App.css";
import DailyTradesTaxEstimation from "./DailyTradesTaxEstimation";
import GoalTracker from "./GoalTracker";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="card mt-4 bg-gradient-primary text-white">
              <div className="card-body">
                <h5 className="card-title mb-4">Goal Tracker</h5>
                <GoalTracker />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card mt-4 bg-gradient-success text-white">
              <div className="card-body">
                <h5 className="card-title mb-4">Daily Trades Tax Estimation</h5>
                <DailyTradesTaxEstimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
