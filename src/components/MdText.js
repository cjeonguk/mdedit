import React from 'react';
import mdToHtml from '../scripts/mdToHtml';

const MdText = () => {
  return (
    <main
      className="container-fluid"
      style={{ height: '90%', padding: '12px' }}
    >
      <div className="row h-100">
        <div className="col-6 h-100 form-floating">
          <textarea
            className="form-control h-100"
            style={{ resize: 'none' }}
            id="tArea"
            onChange={(event) => {
              document.getElementById('mdDisplay').innerHTML = mdToHtml(
                event.target.value
              );
            }}
          ></textarea>
        </div>
        <div className="col-6 h-100" id="mdDisplay"></div>
      </div>
    </main>
  );
};

export default MdText;
