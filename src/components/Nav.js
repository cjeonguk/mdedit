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
    { id: 'titleBtn', text: '문단 제목', content: '\n# 제목\n' },
    { id: 'catalogBtn', text: '목록', content: '\n* 목록\n' },
    { id: 'boldBtn', text: '볼드체', content: '**텍스트**' },
    { id: 'italicBtn', text: '이탤릭체', content: '*텍스트*' },
    { id: 'codeBtn', text: '코드', content: '`code`' },
    { id: 'longCodeBtn', text: '여러 줄 코드', content: '\n```\ncode\n```\n' },
    { id: 'quotationBtn', text: '인용문', content: '\n>' },
    { id: 'linkBtn', text: '링크', content: '\n[링크 이름](링크 주소)\n' },
    {
      id: 'imgBtn',
      text: '이미지',
      content: '\n![이미지 이름](이미지 주소)\n',
    },
    { id: 'separatorBtn', text: '가로줄', content: '\n***\n' },
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
