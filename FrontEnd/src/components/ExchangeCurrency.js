import { useEffect, useState } from "react";
import "../styles/exchangeCurrency.css";
import { Link } from "react-router-dom";
import Post from "../services";

export default function ExchangeCurrency() {
  //export the function and make it as the file,
  // everything start with use is a hook

  let [ToAmount, setToAmount] = useState("0"); // when this funciton is used, all the ExchangeCurrency Fucntion runs
  let [FromAmount, setFromAmount] = useState("0");
  let [FromCurrency, setFromCurrency] = useState("2");
  let [exchangerateUSDtoLBP, setExchangeRateUSDtoLBP] = useState(1);
  let [localData, setLocalData] = useState(null);

  useEffect(() => {
    let localUser = localStorage.getItem("user");
    localUser = localUser ? JSON.parse(localUser) : {};
    setLocalData(localUser);
    fetchLiraRate();
  }, []); //the values in this empty list is not changing so the useeffect function will not run
  //setLocalData will assign the values on the next render

  const fetchLiraRate = async () => {
    let url = "https://api.exchangerate-api.com/v4/latest/USD";
    let response = await fetch(url);
    response = await response.json();

    setExchangeRateUSDtoLBP(response.rates.LBP);
  };

  const calculateToAmount = (FromAmount, FromCurrency) => {
    if (FromCurrency == "2") setToAmount(FromAmount * exchangerateUSDtoLBP);
    if (FromCurrency == "1") setToAmount(FromAmount / exchangerateUSDtoLBP);
  };

  const exchangeCurrency = async () => {
    if (FromAmount < 0) return alert("From Amount should be Positive");
    if (isNaN(parseFloat(FromAmount)))
      return alert("Currency Amount is not a number");

    let data = {
      UserID: localData.ID,
      FromCurrencyID: FromCurrency,
      FromAmount: FromAmount,
      ToCurrencyID: FromCurrency == "1" ? "2" : "1",
      ToAmount: ToAmount,
    };

    let response = await Post("/Currency/Exchange", data);
    //data : Userid FromCurr FroAmount Tocur  toamount
    if (response.error) alert(response.error);
    else {
      localStorage.setItem("user", JSON.stringify(response.data));
      setLocalData(response.data);
    }
  };

  return (
    <div className="Exchange-Parent-Container">
      <div className="Exchange-Form-Container">
        <div className="Exchange-Form-Row-Container">
          <div className="Exchange-Form-Input-Container">
            From Currency:{" "}
            <div>
              {" "}
              USD
              <input
                defaultChecked
                name="Currency"
                value="2"
                type="radio"
                className="Exchange-Form-Input"
                onChange={(event) => {
                  setFromCurrency(event.currentTarget.value);
                  calculateToAmount(FromAmount, event.currentTarget.value);
                }}
              ></input>
              LBP
              <input
                name="Currency"
                value="1"
                type="radio"
                className="Exchange-Form-Input"
                onChange={(event) => {
                  setFromCurrency(event.currentTarget.value);
                  calculateToAmount(FromAmount, event.currentTarget.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="Exchange-Form-Row-Container">
          Exchange Rate from USD to LBP : {exchangerateUSDtoLBP}
        </div>
        <div className="Exchange-Form-Row-Container">
          <div className="Exchange-Form-Input-Container">
            From Amount:{" "}
            <input
              className="Exchange-Form-Input"
              onChange={(event) => {
                setFromAmount(event.currentTarget.value);
                calculateToAmount(event.currentTarget.value, FromCurrency);
              }}
            ></input>
          </div>
        </div>
        <div className="Exchange-Form-Row-Container">
          <div className="Exchange-Form-Input-Container">
            To Amount:{" "}
            <input
              value={ToAmount}
              className="Exchange-Form-Input"
              readOnly
            ></input>
          </div>
        </div>
        <div className="Exchange-Form-Button-Container">
          <button className="Exchange-Form-Button" onClick={exchangeCurrency}>
            Exchange
          </button>
        </div>
      </div>

      <div className="Exchange-Form-Container">
        <div className="Exchange-Form-Row-Container">
          <div className="Exchange-Form-Input-Container">
            User: {localData?.Username}
            {/* if local data is null, localdata? return an undefined, which html parse it into empty string */}
          </div>
        </div>
        <div className="Exchange-Form-Row-Container">
          <div className="Exchange-Form-Input-Container">
            {localData?.Balance[0].Currency.Name}:{" "}
            {localData?.Balance[0].Balance}
          </div>
        </div>
        <div className="Exchange-Form-Row-Container">
          <div className="Exchange-Form-Input-Container">
            {localData?.Balance[1].Currency.Name}:{" "}
            {localData?.Balance[1].Balance}
          </div>
        </div>

        <div className="Exchange-Form-Button-Container">
          <Link to={"/Login"}>Logout</Link>
        </div>
      </div>
    </div>
  );
}
