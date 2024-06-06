import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--lightgrey-color);
  border-radius: 16px;
  position: sticky;
  top: 50%;
  padding: 20px 10px;
  margin: 40px 0;
`;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Item = styled.div`
  width: 180px;
  height: 200px;
  background-image: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
const Font = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 24px;
  line-height: 1.2;
`;

function getRandomElements(arr, count) {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function Travel() {
  const navigate = useNavigate();
  const loadData = JSON.parse(localStorage.getItem('loadData')) || [];
  console.log(loadData);
  const randomData = getRandomElements(loadData, 4); // 랜덤으로 4개 선택
  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Container>
      <Font>
        트래블 슈팅과 함께 <br />
        여러 나라를 탐험하세요!
      </Font>
      <FlexBox>
        {randomData.map((data) => (
          <Item key={data.id} onClick={() => handleNavigate(data.id)}>
            <img src={data.imageURL[0]} alt="image" />
          </Item>
        ))}
      </FlexBox>
    </Container>
  );
}

export default Travel;
