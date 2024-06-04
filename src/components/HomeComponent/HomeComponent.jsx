import { useEffect } from "react";
import { Link } from "react-router-dom";
function HomeComponent() {
  useEffect(() => {}, []);
  return (
    <div>
      메인 페이지입니다
      <div className="post-input">
        <input type="text" placeholder="제목을 입력하세요" />
        <input type="text" placeholder="내용을 입력하세요" />
        <input type="image" />
        <button>게시물 작성</button>
      </div>
      <div className="search">
        <h3>트래블 슈팅과 함께 여러 나라를 탐험하세요</h3>
        <input
          type="text"
          className="search-input"
          placeholder="검색어를 입력하세요"
          // value={search}
          // onChange={searchHandler}
        />

        <div className="tag">#운치있는</div>
        <div className="tag">#조용한</div>
        <div className="tag">#따뜻한</div>
        <div className="tag">#화려한</div>
        <div className="tag">#관광지</div>
        <div className="tag">#박물관</div>
        <div className="tag">#유적지</div>
      </div>
      <div className="post">
        <div>
          <img src="" alt="post-image" />
          <Link to="/post/1" />
        </div>
        <p>
          title입니다 <Link to="/post/1" className="posts" />
        </p>
      </div>
    </div>
  );
}
export default HomeComponent;
