import React from 'react';
import mdToHtml from '../scripts/mdToHtml';

const getMousePos = () => {
  const tArea = document.getElementById('tArea');
  const startPos = tArea.selectionStart;
  const endPos = tArea.selectionEnd;

  return [startPos, endPos];
};

const btnClick = (content) => {
  const tArea = document.getElementById('tArea');
  const [startPos, endPos] = getMousePos();
  tArea.value =
    tArea.value.slice(0, startPos) + content + tArea.value.slice(endPos);
};

const Nav = () => {
  const btns = [
    { id: 'catalogBtn', text: '목록', content: '\n* 목록\n' },
    { id: 'boldBtn', text: '볼드체', content: '**텍스트**' },
    { id: 'italicBtn', text: '이탤릭체', content: '*텍스트*' },
    { id: 'codeBtn', text: '코드', content: '`code`' },
    { id: 'longCodeBtn', text: '여러 줄 코드', content: '\n```\ncode\n```\n' },
    { id: 'quotationBtn', text: '인용문', content: '\n>' },
    { id: 'linkBtn', text: '링크', content: '\n[링크 이름](링크 주소)\n' },
    { id: 'separatorBtn', text: '가로줄', content: '\n***\n' },
  ];
  const btnList = [];
  for (let i = 0; i < btns.length; i++) {
    const content = btns[i].content;
    btnList.push(
      <button
        className="btn btn-primary rounded-0"
        id={btns[i].id}
        style={{
          borderLeft: '1px solid lightgray',
          borderRight: '1px solid lightgray',
        }}
        onClick={() => {
          btnClick(content);
          document.getElementById('mdDisplay').innerHTML = mdToHtml(
            document.getElementById('tArea')
          );
        }}
      >
        {btns[i].text}
      </button>
    );
  }

  return (
    <nav className="bg-primary" style={{ height: '10%' }}>
      <ul className="btn-group w-100" style={{ padding: '0px', margin: '0px' }}>
        <button
          id="titleBtn"
          className="btn btn-primary rounded-0"
          style={{
            borderRight: '1px solid lightgray',
          }}
          onClick={() => {
            const titleLevel = document.getElementById('titleLevel').value;
            const content = '\n' + '#'.repeat(titleLevel) + ' 제목\n';
            btnClick(content);
            document.getElementById('mdDisplay').innerHTML = mdToHtml(
              document.getElementById('tArea')
            );
          }}
        >
          문단 제목
        </button>
        {btnList}
        <button
          id="imgBtn"
          className="btn btn-primary rounded-0"
          style={{
            borderLeft: '1px solid lightgray',
          }}
          onClick={() => {
            const imgPath = window.ipcRenderer.openImage();
            for (let i in imgPath) {
              if (imgPath[i] !== '') {
                const content = `\n![image](${imgPath[i]})`;
                btnClick(content);
              }
            }
            document.getElementById('mdDisplay').innerHTML = mdToHtml(
              document.getElementById('tArea')
            );
          }}
        >
          이미지
        </button>
      </ul>
      <div /*style={{ textAlign: 'center' }}*/>
        <select
          id="titleLevel"
          style={{ width: '50px', marginTop: '3px', marginLeft: '27px' }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    </nav>
  );
};

export default Nav;
