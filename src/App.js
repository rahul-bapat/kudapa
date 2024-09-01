import React, { useState } from "react";
import vowels from "./vowels.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSearch } from "react-icons/bi";
import { getMatchingWordList } from "./kudapa";

const App = () => {
  const [selectedLetters, setSelectedLetters] = useState(["", "", "", "", ""]);
  const [wordList, setWordList] = useState([]);
  const [error, setError] = useState(false);

  const handleLetterChange = (index, value) => {
    const updatedLetters = selectedLetters.slice(0);
    updatedLetters[index] = value;
    setSelectedLetters(updatedLetters);

    setError(false);
    const requiredLetters = updatedLetters.slice(0, 3);
    const hasError = requiredLetters.some((letter) => letter === "");
    setError(hasError);
  };

  const handleSubmit = async () => {
    if (selectedLetters.slice(0, 3).some((letter) => letter === "")) {
      setError(true);
      return;
    }

    const results = await getMatchingWordList(selectedLetters);
    setWordList(results);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-3">ಕುದಪ - ಶಬ್ದ ಶೋಧ</h1>
      <p>ಸ್ವರಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.</p>
      <div className="d-flex mb-3">
        {selectedLetters.map((letter, index) => (
          <div className="me-2" key={index}>
            <select
              value={letter}
              onChange={(e) => handleLetterChange(index, e.target.value)}
              className={`form-select ${error && index < 3 && letter === "" ? "is-invalid" : ""}`}
              style={{ width: "125px" }}
            >
              <option value="">ಆಯ್ಕೆ</option>
              {Object.keys(vowels).map((kannadaLetter) => (
                <option key={kannadaLetter} value={vowels[kannadaLetter]}>
                  {kannadaLetter}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button className="btn btn-secondary" onClick={handleSubmit}>
          <BiSearch size={20} />
        </button>
      </div>
      {error && <div className="invalid-feedback">Please select all mandatory vowels.</div>}
      {wordList.length > 0 && (
        <div className="card mb-3">
          <h2 className="card-header">ಶಬ್ದಗಳು</h2>
          <div className="row">
            {wordList.map((word, index) => (
              <div className="col-md-2" style={{paddingLeft: 25}} key={index}>
                {word}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;