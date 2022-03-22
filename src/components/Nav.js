import React from 'react';

function Nav() {
  return (
    <nav className="bg-light" style={{ height: '10%' }}>
      <ul
        className="btn-group vw-100"
        style={{ padding: '0px', margin: '0px' }}
      >
        <button className="btn btn-light">파일</button>
        <button className="btn btn-light">문단 제목</button>
        <button className="btn btn-light">문단</button>
        <button className="btn btn-light">목록 (숫자 X)</button>
        <button className="btn btn-light">볼드체</button>
        <button className="btn btn-light">이탤릭체</button>
        <button className="btn btn-light">코드</button>
        <button className="btn btn-light">여러 줄 코드</button>
        <button className="btn btn-light">인용문</button>
        <button className="btn btn-light">링크</button>
        <button className="btn btn-light">이미지</button>
        <button className="btn btn-light">가로줄</button>
      </ul>
      <div id="details"></div>
    </nav>
  );
}

export default Nav;
