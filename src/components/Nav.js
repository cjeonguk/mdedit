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
    { id: 'fileBtn', text: '파일', content: 'a' },
    { id: 'titleBtn', text: '문단 제목', content: 'a' },
    { id: 'paragraphBtn', text: '문단', content: 'a' },
    { id: 'catalogBtn', text: '목록', content: 'b' },
    { id: 'boldBtn', text: '볼드체', content: 'b' },
    { id: 'italicBtn', text: '이탤릭체', content: 'b' },
    { id: 'codeBtn', text: '코드', content: 'c' },
    { id: 'longCodeBtn', text: '여러 줄 코드', content: 'c' },
    { id: 'quotationBtn', text: '인용문', content: 'c' },
    { id: 'linkBtn', text: '링크', content: 'd' },
    { id: 'imgBtn', text: '이미지', content: 'd' },
    { id: 'separatorBtn', text: '가로줄', content: 'd' },
  ];
  const btnList = [];
  let i = 0;
  while (i < btns.length) {
    const content = btns[i].content;
    btnList.push(
      <button
        className="btn btn-light"
        id={btns[i].id}
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
    i += 1;
  }

  return (
    <nav className="bg-light" style={{ height: '10%' }}>
      <ul
        className="btn-group vw-100"
        style={{ padding: '0px', margin: '0px' }}
      >
        {btnList}
      </ul>
    </nav>
  );
};

export default Nav;
