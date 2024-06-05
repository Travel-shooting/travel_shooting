import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  addPost,
  manageRealImages,
  manageTags,
} from "../../../redux/slices/postSlice";
import { getPresentTime } from "../../../util/date";
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
  const tags = JSON.parse(localStorage.getItem("tags")) || [];
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
  };

  const uploadImagesToSupabase = async (files, postId) => {
    return Promise.all(
      files.map(async (file, index) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${postId}-${index}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("postImages")
          .upload(fileName, file);

        if (error) {
          console.error(error);
        } else console.log("이미지 성공...", data);

        return `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/postImages/${fileName}`;
      })
    );
  };

  const handleSubmit = async () => {
    const postId = crypto.randomUUID();
    try {
      const uploadedImageUrls = await uploadImagesToSupabase(realFiles, postId);

      const imageURLs = uploadedImageUrls.map((url) => ({
        url,
      }));
      const postFormData = {
        postId,
        postUserId: 5,
        postTitle: formRef.current[0].value,
        postContent: formRef.current[1].value,
        postDate: getPresentTime(),
        postLike: 0,
        imageURL: imageURLs,
        country: JSON.parse(localStorage.getItem("country")),
      };

      const tagsFormData = tags.map((tag) => ({
        tagId: tag,
      }));

      const postError = {
        title: !formRef.current[0].value.trim().length,
        content: !formRef.current[1].value.trim().length,
        country: JSON.parse(localStorage.getItem("country")) == "",
        imageURL: !imageURLs.length,
        tags: !tagsFormData.length,
      };
      if (
        postError.title ||
        postError.content ||
        postError.country ||
        postError.imageURL ||
        postError.tags
      ) {
        alert("업로드에 문제가생겼어요 확인해주세요");
        return;
      }

      dispatch(addPost({ postFormData }));
      dispatch(manageTags({ tagsFormData }));
      dispatch(manageRealImages(postFormData));

      console.log("postFormData: ", postFormData);

      const { data, error } = await supabase.from("POST").insert(postFormData);
      if (error) console.error(error);
      else console.log(data);

      const { tagData, tagError } = await supabase
        .from("TAGS")
        .insert(tagsFormData);
      if (tagError) console.error(tagError);
      else console.log(tagData);

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
