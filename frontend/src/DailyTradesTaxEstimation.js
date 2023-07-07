import { useState } from "react";
import "./DailyTaxEst.css"

const DailyTradesTaxEstimation = () => {
  const [totalTrades, setTotalTrades] = useState(0);
  const [currentGains, setCurrentGains] = useState(0);

  const [tradeInfo, setTradeInfo] = useState({
    price: 0,
    qty: 0,
    tradeType: "BUY",
  });

  const [buyTrades, setBuyTrades] = useState([]);
  const [sellTrades, setSellTrades] = useState([]);

  const handleTradeInfoSubmit = (e) => {
    e.preventDefault();

    const total = tradeInfo.price * tradeInfo.qty;

    const newTrade = {
      price: tradeInfo.price,
      qty: tradeInfo.qty,
      total: total,
    };

    if (tradeInfo.tradeType === "BUY") {
      setBuyTrades([...buyTrades, newTrade]);
    } else if (tradeInfo.tradeType === "SELL") {
      setSellTrades([...sellTrades, newTrade]);
    }

    setTradeInfo({
      price: 0,
      qty: 0,
      tradeType: "BUY",
    });
  };

  const totalOrders = buyTrades.length + sellTrades.length;
  const totalSellAmount = sellTrades.reduce(
    (total, trade) => total + trade.total,
    0
  );
  const totalBuyAmount = buyTrades.reduce(
    (total, trade) => total + trade.total,
    0
  );
  const brokerage = totalOrders * 20;
  const sttCtt = totalSellAmount * 0.0005;
  const transaction = 0.00053 * (totalSellAmount + totalBuyAmount);
  const gst = 0.18 * transaction + brokerage;
  const sebiCharges = ((totalSellAmount + totalBuyAmount) / 10000000) * 10;
  const stampCharges = (totalBuyAmount * 300) / 10000000;
  const totalTaxEstimation =
    sttCtt + transaction + gst + sebiCharges + stampCharges;

  const gainsAfterTax = currentGains - totalTaxEstimation;

  return (
    <div className="daily-trades-tax-estimation dtte">
      <form className="dtte-form-1">
        <label htmlFor="totalTrades" id='form-label'>Total Trades:</label>
        <input
          type="number"
          id="totalTrades"
          className="form-control"
          value={totalTrades}
          onChange={(e) => setTotalTrades(parseInt(e.target.value))}
        />

        <label htmlFor="currentGains" id='form-label'>Current Gains:</label>
        <input
          type="number"
          id="currentGains"
          step="0.01"
          className="form-control"
          value={currentGains}
          onChange={(e) => setCurrentGains(parseFloat(e.target.value))}
        />
      </form>

      <form onSubmit={handleTradeInfoSubmit} className="dtte-form-2">
        <label htmlFor="price" id='form-label'>Price:</label>
        <input
          type="number"
          id="price"
          step="0.01"
          className="form-control"
          value={tradeInfo.price}
          onChange={(e) =>
            setTradeInfo({ ...tradeInfo, price: parseFloat(e.target.value) })
          }
        />
        <label htmlFor="qty" id='form-label'>Qty:</label>
        <input
          type="number"
          id="qty"
          className="form-control"
          value={tradeInfo.qty}
          onChange={(e) =>
            setTradeInfo({ ...tradeInfo, qty: parseInt(e.target.value) })
          }
        />

        <label htmlFor="tradeType" id='form-label'>Trade Type:</label>
        <select
          id="tradeType"
          className="form-control"
          value={tradeInfo.tradeType}
          onChange={(e) =>
            setTradeInfo({ ...tradeInfo, tradeType: e.target.value })
          }
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="dtte-gat">
        <h2 className="gains-after-tax">
          Gains after Tax: {gainsAfterTax.toFixed(2)}
        </h2>
      </div>

      <h3>Buy Trades</h3>
      <table className="table table-bordered dtte-table-1">
        <thead>
          <tr>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {buyTrades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.price}</td>
              <td>{trade.qty}</td>
              <td>{trade.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Sell Trades</h3>
      <table className="table table-bordered dtte-table-2">
        <thead>
          <tr>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sellTrades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.price}</td>
              <td>{trade.qty}</td>
              <td>{trade.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Tax Estimation</h3>
      <table className="table table-bordered dtte-table-3">
        <thead>
          <tr>
            <th>Tax Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brokerage</td>
            <td>{brokerage.toFixed(2)}</td>
          </tr>
          <tr>
            <td>STT/CTT</td>
            <td>{sttCtt.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Transaction</td>
            <td>{transaction.toFixed(2)}</td>
          </tr>
          <tr>
            <td>GST</td>
            <td>{gst.toFixed(2)}</td>
          </tr>
          <tr>
            <td>SEBI Charges</td>
            <td>{sebiCharges.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Stamp Charges</td>
            <td>{stampCharges.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Tax Estimation</td>
            <td>{totalTaxEstimation.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DailyTradesTaxEstimation;
