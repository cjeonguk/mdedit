import React from 'react';
import mdToHtml from '../scripts/mdToHtml';

const getMousePos = () => {
  const tArea = document.getElementById('tArea');
  const startPos = tArea.selectionStart;
  const endPos = tArea.selectionEnd;

  return [startPos, endPos];
};

const btnClick = (content, changeLine, selectionStart, selectionEnd) => {
  const tArea = document.getElementById('tArea');
  const [startPos, endPos] = getMousePos();
  const checkFront =
    changeLine && tArea.value.charAt(startPos - 1) !== '\n' && startPos !== 0;
  const checkRear = changeLine && tArea.value.charAt(startPos) !== '\n';
  tArea.value =
    tArea.value.slice(0, startPos) +
    (checkFront ? '\n' : '') +
    content +
    (checkRear ? '\n' : '') +
    tArea.value.slice(endPos);
  tArea.setSelectionRange(
    startPos + selectionStart + (checkFront ? 1 : 0),
    startPos + selectionEnd + (checkFront ? 1 : 0)
  );
};

const Nav = () => {
  const btns = [
    {
      id: 'catalogBtn',
      text: <>목록</>,
      content: '* 목록',
      changeLine: true,
      selection: [2, 4],
    },
    {
      id: 'boldBtn',
      text: <>볼드체</>,
      content: '**텍스트**',
      changeLine: false,
      selection: [2, 5],
    },
    {
      id: 'italicBtn',
      text: <>이탤릭체</>,
      content: '*텍스트*',
      changeLine: false,
      selection: [1, 4],
    },

    {
      id: 'codeBtn',
      text: <>코드</>,
      content: '`코드`',
      changeLine: false,
      selection: [1, 3],
    },
    {
      id: 'longCodeBtn',
      text: <>여러 줄 코드</>,
      content: '```\n코드\n```',
      changeLine: true,
      selection: [4, 6],
    },
    {
      id: 'quotationBtn',
      text: <>인용문</>,
      content: '>',
      changeLine: true,
      selection: [1, 1],
    },
    {
      id: 'linkBtn',
      text: <>링크</>,
      content: '[링크 이름](URL)',
      changeLine: true,
      selection: [1, 6],
    },
    {
      id: 'imgBtn',
      text: <>이미지</>,
      content: '![이미지 이름](URL 또는 파일 경로)',
      changeLine: true,
      selection: [2, 8],
    },
    {
      id: 'separatorBtn',
      text: <>가로줄</>,
      content: '***',
      changeLine: true,
      selection: [4, 4],
    },
  ];
  const btnList = [];
  for (let i = 0; i < btns.length; i++) {
    const content = btns[i].content;
    btnList.push(
      <button
        className="btn btn-secondary rounded-0"
        id={btns[i].id}
        onClick={() => {
          btnClick(
            content,
            btns[i].changeLine,
            btns[i].selection[0],
            btns[i].selection[1]
          );
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
    <nav className="bg-secondary" style={{ height: '10%' }}>
      <ul className="btn-group w-100" style={{ padding: '0px', margin: '0px' }}>
        <button
          id="titleBtn"
          className="btn btn-secondary rounded-0"
          onClick={() => {
            const titleLevel = Number(
              document.getElementById('titleLevel').value
            );
            const content = '#'.repeat(titleLevel) + ' 제목';
            btnClick(content, true, titleLevel + 1, titleLevel + 3);
            document.getElementById('mdDisplay').innerHTML = mdToHtml(
              document.getElementById('tArea')
            );
          }}
        >
          문단 제목
        </button>
        <button
          className="btn btn-secondary rounded-0"
          style={{
            padding: '0',
          }}
        >
          <select
            id="titleLevel"
            style={{
              width: '50px',
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </button>
        {btnList}
      </ul>
    </nav>
  );
};

export default Nav;
