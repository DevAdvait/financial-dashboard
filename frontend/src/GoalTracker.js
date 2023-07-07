import { useState } from 'react';
import './GoalTracker.css';

const GoalTracker = () => {
  const initialCapital = 20000;
  const maxCapitalRisked = initialCapital * 0.5;
  const monthlyTarget = 20000;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const nextMonth = (currentMonth + 1) % 12;
  const currentYear = currentDate.getFullYear();
  const lastDayOfMonth = new Date(currentYear, nextMonth, 0).getDate();

  let tradingDaysLeft = 0;
  for (let day = currentDate.getDate(); day <= lastDayOfMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      tradingDaysLeft++;
    }
  }

  const [realizedProfit, setRealizedProfit] = useState(0);
  const [realizedLoss, setRealizedLoss] = useState(0);

  const currentCapital = initialCapital + realizedProfit - realizedLoss;
  const dailyAcceptableLoss = (maxCapitalRisked - realizedLoss) / tradingDaysLeft;
  const dailyExpectedTarget = (monthlyTarget - realizedProfit + realizedLoss) / tradingDaysLeft;

  const daysLeftArray = [];
  for (let day = currentDate.getDate(); day <= lastDayOfMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysLeftArray.push(date.toLocaleDateString());
    }
  }

  return (
    <div className="goal-tracker">
      <div className="table-responsive goal-tracker-table-div">
        <table className="table table-bordered table-hover goal-tracker-table-1">
          <tbody>
            <tr>
              <td>Initial Capital</td>
              <td>{initialCapital}</td>
            </tr>
            <tr>
              <td>Max Capital Risked</td>
              <td>{maxCapitalRisked}</td>
            </tr>
            <tr>
              <td>Monthly Target</td>
              <td>{monthlyTarget}</td>
            </tr>
            <tr>
              <td>Number of Trading Days Left</td>
              <td>{tradingDaysLeft}</td>
            </tr>
            <tr>
              <td>Current Capital</td>
              <td>{currentCapital}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="inputs goal-tracker-inputs">
        <label htmlFor="realizedProfit" className="form-label">Realized Profit:</label>
        <input
          type="number"
          id="realizedProfit"
          className="form-control"
          value={realizedProfit}
          onChange={(e) => setRealizedProfit(parseFloat(e.target.value))}
        />

        <label htmlFor="realizedLoss" className="form-label">Realized Loss:</label>
        <input
          type="number"
          id="realizedLoss"
          className="form-control"
          value={realizedLoss}
          onChange={(e) => setRealizedLoss(parseFloat(e.target.value))}
        />
      </div>

      <table className="table table-bordered table-hover goal-tracker-table-2">
        <thead>
          <tr>
            <th>Days Left</th>
            <th>Daily Expected Target</th>
            <th>Daily Acceptable Loss</th>
          </tr>
        </thead>
        <tbody>
          {daysLeftArray.map((date) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{dailyExpectedTarget.toFixed(2)}</td>
              <td>{dailyAcceptableLoss.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalTracker;
