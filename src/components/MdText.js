import React from 'react';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

function MdText() {
  const mdToHtml = (mdText) => {
    const htmlText = unified()
      .use(markdown)
      .use(remark2rehype)
      .use(html)
      .processSync(mdText);

    return htmlText;
  };
  return (
    <main
      className="container-fluid"
      style={{ height: '90%', padding: '12px' }}
    >
      <div className="row h-100">
        <div className="col-6 h-100" id="mdDisplay"></div>
        <div className="col-6 h-100 form-floating">
          <textarea
            className="form-control h-100"
            style={{ resize: 'none' }}
            onChange={(event) => {
              document.getElementById('mdDisplay').innerHTML = mdToHtml(
                event.target.value
              );
            }}
          ></textarea>
        </div>
      </div>
    </main>
  );
}

export default MdText;
