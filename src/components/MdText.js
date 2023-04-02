import React from 'react';
import mdToHtml from '../scripts/mdToHtml';

const MdText = () => {
  return (
    <main
      className="container-fluid"
      style={{ height: '90%', paddingBottom: '1px' }}
    >
      <div className="row h-100">
        <div className="col-6 h-100 form-floating" style={{ padding: '0' }}>
          <textarea
            autoFocus
            className="h-100 w-100"
            style={{
              resize: 'none',
              outline: 'none',
              border: 'none',
              borderRight: '1px solid lightgray',
            }}
            spellCheck={false}
            id="tArea"
            onChange={(event) => {
              document.getElementById('mdDisplay').innerHTML = mdToHtml(
                event.target.value
              );
            }}
            onBlur={(event) => {
              event.target.focus();
            }}
          ></textarea>
        </div>
        <div
          className="col-6"
          id="mdDisplay"
          style={{ overflowY: 'auto', height: '100%' }}
        ></div>
      </div>
    </main>
  );
};

export default MdText;
