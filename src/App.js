import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [randomPassword, setRandomPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copyPassword, setCopyPassword] = useState(false);
  const [copyTimer, setCopyTimer] = useState(null);

  const maxLength = 32;
  const minLength = 4;
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*_-+=";

  let copyText = copyPassword ? "Copied!" : "Click to copy";

  function generatePassword() {
    if (
      !(
        includeUppercase ||
        includeLowercase ||
        includeNumbers ||
        includeSymbols
      )
    ) {
      setIncludeLowercase(true);
    }

    let characters =
      (includeUppercase ? upper : "") +
      (includeLowercase ? lower : "") +
      (includeNumbers ? numbers : "") +
      (includeSymbols ? symbols : "");

    let password =
      (includeUppercase
        ? upper.charAt(Math.floor(Math.random() * upper.length))
        : "") +
      (includeSymbols
        ? symbols.charAt(Math.floor(Math.random() * symbols.length))
        : "") +
      (includeNumbers
        ? numbers.charAt(Math.floor(Math.random() * numbers.length))
        : "");

    let totalLength = passwordLength - (password.length || 0);

    for (let i = 0; i < totalLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    var a = password.split("");
    var n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }

    password = a.join("");

    setRandomPassword(password);
  }

  function copyPasswordFunction() {
    navigator.clipboard.writeText(randomPassword);
    setCopyPassword(true);
    clearTimeout(copyTimer);
    setCopyTimer(
      setTimeout(() => {
        setCopyPassword(false);
      }, 2000)
    );
  }

  function refreshResult() {
    setCopyPassword(false);
    generatePassword();
  }

  useEffect(() => {
    generatePassword();
  }, [
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  ]);

  return (
    <div className="App">
      <div className="container">
        <div className="heading">
          <h2>Password Generator</h2>
          <button onClick={() => refreshResult()}>&#x27F3;</button>
        </div>
        <div className="outerBox" onClick={() => copyPasswordFunction()}>
          <div className="passwordDisplay">{randomPassword}</div>
          <div
            className={copyPassword ? "copyActive" : "copyInactive"}
            id="clickToCopy"
          >
            {copyText}
          </div>
        </div>
        <div>
          <div className="boxTitle">
            LENGTH: <span>{passwordLength}</span>
          </div>
          <div className="outerBox slide">
            <div>{minLength}</div>
            <input
              id="slider"
              type="range"
              min={minLength}
              max={maxLength}
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <div>{maxLength}</div>
          </div>
        </div>
        <div>
          <div className="boxTitle">SETTINGS</div>
          <div className="outerBox settings">
            <label>Include Uppercase</label>
            <div className="toggle-rect-bw">
              <input
                type="checkbox"
                id="uppercase"
                defaultChecked={includeUppercase}
                onChange={(e) => setIncludeUppercase(!includeUppercase)}
              />
              <label htmlFor="uppercase"></label>
            </div>
          </div>
        </div>
        <div className="outerBox settings">
          <label>Include Lowercase</label>
          <div className="toggle-rect-bw">
            <input
              type="checkbox"
              id="lowercase"
              key={includeLowercase}
              defaultChecked={includeLowercase}
              onChange={(e) => setIncludeLowercase(!includeLowercase)}
            />
            <label htmlFor="lowercase"></label>
          </div>
        </div>
        <div className="outerBox settings">
          <label>Include Numbers</label>
          <div className="toggle-rect-bw">
            <input
              type="checkbox"
              id="numbers"
              defaultChecked={includeNumbers}
              onChange={(e) => setIncludeNumbers(!includeNumbers)}
            />
            <label htmlFor="numbers"></label>
          </div>
        </div>
        <div className="outerBox settings">
          <label>Include Symbols</label>
          <div className="toggle-rect-bw">
            <input
              type="checkbox"
              id="symbol"
              defaultChecked={includeSymbols}
              onChange={(e) => setIncludeSymbols(!includeSymbols)}
            />
            <label htmlFor="symbol"></label>
          </div>
        </div>
      </div>
    </div>
  );
}
