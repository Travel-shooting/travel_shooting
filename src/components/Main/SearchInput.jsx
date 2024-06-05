import { useState } from "react";
// import { useDispatch } from "react-redux";
import supabase from "../../util/supabase/supabaseClient";

const SearchInput = ({ onSearch }) => {
  // const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search) {
      onSearch(search);
    } else if (e.key === "Enter" && !search) {
      alert("나라를 입력하세요");
    }
  };

  const handleTagClick = (tag) => {
    onSearch(tag);
  };

  return (
    <>
      <p className="h2">
        트래블 슈팅과 함께
        <br />
        여러 나라를 탐험하세요
      </p>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="나라를 입력하세요"
          value={search}
          onChange={searchHandler}
          onKeyPress={handleKeyPress}
        />
        <div className="search-icon">
          <img
            src="https://skwkufggbhgnltheimss.supabase.co/storage/v1/object/public/icon/search.svg"
            alt="검색"
          />
        </div>
      </div>
      <div className="tags">
        {[
          "조용한",
          "따뜻한",
          "화려한",
          "관광지",
          "박물관",
          "유적지",
          "추운",
          "자연",
          "도시",
        ].map((tag) => (
          <div className="tag" key={tag} onClick={() => handleTagClick(tag)}>
            #{tag}
          </div>
        ))}
        {/* {posts.map((post) => (
          <Link to={`/post/${post.id}`} className="post" key={post.id}>
            <div className="post-img">
              <img src={post.image_url || ""} alt="image" />
            </div>
            <p className="post-title">{post.title}</p>
            <span>{post.date}</span>
          </Link>
        ))} */}
      </div>
    </>
  );
};

export default SearchInput;
