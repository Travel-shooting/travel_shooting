import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  addPost,
  manageRealImages,
  manageTags,
} from "../../../redux/slices/postSlice";
import supabase from "../../../util/supabase/supabaseClient";
import Slider from "../Slider";
import CountrySelect from "./CountrySelect";
import Tags from "./Tags";

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button`
  width: 280px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    background-color: var(--yellow-color);
  }
`;

function NewPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.post.tags);
  const [fileImages, setFileImages] = useState([]);
  const [realFiles, setRealFiles] = useState([]);
  const fileInputRef = useRef();
  const formRef = useRef([]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setFileImages(newPreviewUrls);
    setRealFiles(files);
    console.log(files);
  };

  const uploadImagesToSupabase = async (files, postId) => {
    return Promise.all(
      files.map(async (file, index) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${postId}-${index}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("postImages")
          .upload(fileName, file);

        if (error) throw new Error("이미지 업로드 실패");
        else console.log("이미지 성공...", data);

        return `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/postImages/${fileName}`;
      })
    );
  };

  const handleSubmit = async () => {
    try {
      const postId = Date.now();
      const postFormData = {
        id: postId,
        postUserId: 5,
        postTitle: formRef.current[0].value,
        postContent: formRef.current[1].value,
        postLike: 0,
        country: JSON.parse(localStorage.getItem("country")),
      };
      const tagsFormData = tags.map((tag) => ({
        postId,
        tagId: tag,
      }));

      dispatch(addPost({ postFormData }));
      dispatch(manageTags({ tagsFormData }));

      const uploadedImageUrls = await uploadImagesToSupabase(realFiles, postId);

      await supabase.from("POST").insert({
        ...postFormData,
        imageUrls: uploadedImageUrls,
      });

      dispatch(manageRealImages(postFormData));
      alert("데이터가 정상적으로 추가되었습니다");
      navigate("/");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("에러 발생: " + error.message);
    }
  };

  return (
    <Container direction={"column"}>
      <Slider postImage={fileImages} />
      <input
        ref={(el) => (formRef.current[0] = el)}
        type="text"
        placeholder="제목을 입력해주세요"
      />
      <Container direction={"row"}>
        <CountrySelect />
        <Tags />
      </Container>
      <textarea
        ref={(el) => (formRef.current[1] = el)}
        type="text"
        placeholder="내용을 입력해주세요"
      ></textarea>
      <Container direction={"row"}>
        <HiddenInput
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
        />
        <Button
          bgcolor={"var(--white-color)"}
          color={"var(--yellow-color)"}
          onClick={handleClick}
        >
          사진 업로드
        </Button>
        <Button
          bgcolor={"var(--yellow-color)"}
          color={"var(--yellow-color)"}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </Container>
    </Container>
  );
}

export default NewPost;
