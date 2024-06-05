import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadPost } from "../../redux/slices/postSlice";
import supabase from "../../util/supabase/supabaseClient";
import { tags } from "../../util/tags";

const SearchInput = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [postDatas, setPostDatas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("POST").select("*");

      if (error) {
        console.error(error);
      } else {
        const updatedData = data.map((item) => {
          const imageURLs = JSON.parse(item.imageURL).map((obj) => obj.url);
          return {
            ...item,
            imageURL: imageURLs,
          };
        });
        console.log(updatedData);
        setPostDatas(updatedData);
        dispatch(loadPost(updatedData));
      }
    };

    fetchData();
  }, []);
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
        {tags.map((tag) => (
          <div className="tag" key={tag} onClick={() => handleTagClick(tag)}>
            #{tag}
          </div>
        ))}
        {postDatas.map((post) => (
          <Link to={`/post/${post.id}`} className="post" key={post.id}>
            <div className="post-img">
              <img src={post.imageURL[0]} alt="image" width={"200px"} />
            </div>
            <p className="post-title">{post.postTitle}</p>
            <span>{post.postDate}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchInput;
