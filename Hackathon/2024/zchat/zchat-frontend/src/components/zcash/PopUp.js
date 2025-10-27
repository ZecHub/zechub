import React, {useState, useEffect} from "react";
import "./messages.css";
import "./pop2.css";
import closeButton from "./assets/images/close button.png";
import union1 from "./assets/vectors/union_10_x2.svg";
import union from "./assets/vectors/union_14_x2.svg";
import spin from "./assets/images/Union_spinner.png";
import spinLogo from "./assets/images/Brandmark Yellow 2_spinner.png";
import zStarts from "./assets/images/z star.png";
import QRCode from "./qr/QRCode";

const PopUp = ({ setData, onClose, currentUserData, reciverUserData }) => {
  const [isVisible, setIsVisible] = useState(true); // State to track visibility
  const [isTransactionsVisible, setIsTransactionsVisible] = useState(false); // State to track visibility
  const [isRequestVisible, setIsRequestVisible] = useState(false); // State to track visibility
  const [isNumpadVisible, setIsNumpadVisible] = useState(true); // State to track visibility
  const [isSendVisible, setIsSendVisible] = useState(false); // State to track visibility
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false); // State to track visibility
  const [isZBalanceVisible, setIsZBalanceVisible] = useState(true); // State to track visibility
  const [isRequestSendVisible, setIsRequestSendVisible] = useState(true); // State to track visibility
  const [isCompleteTransactionVisible, setIsCompleteTransactionVisible] = useState(false); // State to track visibility
  const [currentUser, setCurrentUser] = useState('');
  const [amount, setAmount] = useState('0');
  const [amountRequest, setAmountRequest] = useState();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // Fetch the current user's information
    fetch('https://zchat-api.onrender.com/users/me/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setCurrentUser(data))
      .catch(error => console.error('Error fetching current user:', error));

  }, [currentUser.username]);

  const handleSendClick = () => {
    setIsVisible(false); // Hide the parent div when the button is clicked
    setIsRequestVisible(false);
    setIsTransactionsVisible(true);
    setIsSendVisible(true);
  };

  const handleRequestClick = () => {
    setIsVisible(false); // Hide the parent div when the button is clicked
    setIsNumpadVisible(false);
    setIsTransactionsVisible(true);
    setIsRequestVisible(true);
  };

  const handleSubmitRequest = () => {
    setIsSpinnerVisible(true);

    // Automatically hide the transaction display after 2 seconds
    setTimeout(() => {
      setIsSpinnerVisible(false); // Enable the buttons again if necessary
      setIsZBalanceVisible(false);
      setIsRequestSendVisible(false);
      setIsCompleteTransactionVisible(true);

    }, 2000); // 2 seconds
  }

  const handleButtonClick = (value) => {
    if (value === '⌫') {
      if (+amount === 0){
        return
      }
      setAmount((prev) => prev.slice(0, -1));
      console.log(amount)
    } else if (value === ',' | value === '.') {
      setAmount((prev) => {
        if (prev.split('.').length - 1 > 1) {
          return prev.slice(0, -1)
        }
        return(prev + '.')
      });
    } else if (value === '→') {
      if (+amount === 0){
        return
      }
      submitAmount();
    } else {
      setAmount((prev) => '0' + Number(prev + value).toString());
    }
    console.log(+amount)
  };

  useEffect(() => {
    console.log(amount.length); // This will always log the latest value of `amount`
  }, [amount]);

  const submitAmount = () => {
    setIsVisible(false); // Hide the parent div when the button is clicked
    // setIsTransactionsVisible(true);
    // setIsRequestVisible(true);
    if (amount) {
      console.log('Submitted amount:', parseFloat(amount));
      setData(amount);
      // Handle the submitted amount here (e.g., send to backend)
    } else {
      alert('Please enter an amount before submitting');
    }
    const token = localStorage.getItem('access_token');
    if ( currentUser && reciverUserData && Number(amount) ) {
      const payload = {
            sender: currentUser.username,      // Ensure this is correct
            receiver: reciverUserData.username,       // Ensure this is correct
            message: null,      // Ensure this is correct
            transaction: Number(amount)
        };
      // Fetch the current user's information
      fetch('https://zchat-api.onrender.com/zcash/send-to-address/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
        // .then(response => response.json())
        // .then(data => setCurrentUser(data))
        .catch(error => console.error('Error fetching current user:', error));
      }
    setIsSpinnerVisible(true);

    // Automatically hide the transaction display after 2 seconds
    setTimeout(() => {
      setIsSpinnerVisible(false); // Enable the buttons again if necessary
      setIsZBalanceVisible(false);
      setIsRequestSendVisible(false);
      setIsCompleteTransactionVisible(true);

    }, 2000); // 2 seconds
  };

  return(
    <div className="desktop-15">
      { currentUser &&
    <div className="container-6">
        <div className="container-8">
          <img alt="test" className="close-button" src={closeButton} onClick={onClose} />
          <div className="container-11">
            <div style={{ display: isZBalanceVisible ? 'flex' : 'none' }} className="z-balance">
            <div className="brandmark-yellow-11">
            </div>
            <div className="group-5394">
              <div className="balance">
              Balance:
              </div>
              <span className="container-10">
              {parseFloat(currentUser.balance).toFixed(2)}
              </span>
            </div>
            </div>
            <div style={{ display: isRequestSendVisible ? 'flex' : 'none' }} className="request-amount-group-container">
              <div className="column-row-column">
                {
                isVisible && 
                <div className="send-buttons">
                  <div className="send-button-1" onClick={handleRequestClick}>
                    <div className="container-1">
                      <img alt="test" className="union-1" src={union1} />
                    </div>
                    <span className="request">
                    Request
                    </span>
                  </div>
                  <div className="send-button" onClick={handleSendClick}>
                    <div className="container-16">
                      <img alt="test" className="union" src={union} />
                    </div>
                    <span className="send">
                    Send
                    </span>
                  </div>
                </div>
                }
                <div style={{ display: isTransactionsVisible ? 'flex' : 'none' }} className="transactions">
                <div  className="request-amount-group">
                  <div className="request-amount" style={{ flexDirection: isRequestVisible ? 'row-reverse' : 'row' }}>
                      {/* <p style={{ display: isRequestVisible ? 'block' : 'none' }}>Amount to be :</p> */}
                      { isRequestVisible &&
                        <QRCode walletAddress={currentUser.zcash_transparent_address} />
                      }
                      <p style={{ display: isSendVisible ? 'block' : 'none' }}>Amount to be sent to {reciverUserData.username}:</p>
                  </div>
                </div>
                <div className="request-amount-input">
                    {/* <div className="amount-input">25.21</div> */}
                </div>
                { isNumpadVisible &&
                <>
                  <div className="request-amount-input">
                      {/* <div className="amount-input">25.21</div> */}
                      <input className="amount-input" placeholder="25.21" type="number"
                      value={parseFloat(amount).toFixed(2)} onChange={(e) => setAmount(e.target.value)}
                      min={0}
                      readOnly
                      />
                  </div>
                  <div className="number-pad">
                      <div className="number-pad-row">
                          <button onClick={() => handleButtonClick('1')}>1</button>
                          <button onClick={() => handleButtonClick('2')}>2</button>
                          <button onClick={() => handleButtonClick('3')}>3</button>
                      </div>
                      <div className="number-pad-row">
                          <button onClick={() => handleButtonClick('4')}>4</button>
                          <button onClick={() => handleButtonClick('5')}>5</button>
                          <button onClick={() => handleButtonClick('6')}>6</button>
                      </div>
                      <div className="number-pad-row">
                          <button onClick={() => handleButtonClick('7')}>7</button>
                          <button onClick={() => handleButtonClick('8')}>8</button>
                          <button onClick={() => handleButtonClick('9')}>9</button>
                          <button onClick={() => handleButtonClick('⌫')} className="backspace">⌫</button>
                      </div>
                      <div className="number-pad-row">
                          <button onClick={() => handleButtonClick(',')}>,</button>
                          <button onClick={() => handleButtonClick('0')}>0</button>
                          <button onClick={() => handleButtonClick('.')}>.</button>
                          <button onClick={() => handleButtonClick('→')} className="submit">→</button>
                      </div>
                  </div>
                </>
                }
                </div>
              </div>
            </div>
            {/* <div style={{display: "none"}} className="column-row">
              <div className="send-button-1">
                <div className="container-1">
                  <img alt="test" className="union-1" src={union1} />
                </div>
                <span className="request">
                Request
                </span>
              </div>
              <div className="send-button">
                <div className="container-16">
                  <img alt="test" className="union" src={union} />
                </div>
                <span className="send">
                Send
                </span>
              </div>
            </div> */}
            <div style={{ display: isSpinnerVisible ? 'flex' : 'none' }} className="union-spinner">
              <img alt="test" className="spin" src={spin} />
              <img alt="test" className="spin-logo" src={spinLogo} />
            </div>
            <div style={{ display: isCompleteTransactionVisible ? 'flex' : 'none' }} className="send-coin">
              <img alt="test" className="z-starts" src={zStarts} />
              <p className="message">Transaction is being processed!</p>
              <div className="buttons">
                <button className="btn btn-primary">View transaction receipt</button>
                <button className="btn btn-secondary">Return to Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </div>
);
}
export default PopUp;