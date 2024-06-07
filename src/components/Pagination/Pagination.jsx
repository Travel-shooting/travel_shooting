import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
const Button = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  padding: 0;
  color: ${(props) => (props.selected ? 'var(--black-color)' : 'var(--black-color)')};
  background-color: ${(props) => (props.selected ? 'var(--yellow-color)' : 'transparent')};
  font-weight: ${(props) => (props.selected ? 'regular' : 'normal')};
  margin: 80px;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: auto;
    `}
`;
const Pagination = ({ itemCount, itemCountPerPage, pageCountPerPage, clickListener }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(pageCountPerPage);

  const maxPage = Math.ceil(itemCount / itemCountPerPage);
  const pages = Array.from({ length: maxPage + 1 }, (_, i) => i);

  useEffect(() => {
    if (maxPage < pageCountPerPage) {
      setEndPage(maxPage);
    }
  }, [maxPage, pageCountPerPage]);

  const leftPageClicked = () => {
    setCurrentPage(startPage - pageCountPerPage >= 1 ? currentPage - pageCountPerPage : startPage - 1);
    setStartPage(getStartPage());
    setEndPage(getStartPage() + pageCountPerPage - 1);
    clickListener(currentPage);
  };

  const rightPageClicked = () => {
    setCurrentPage(
      endPage + pageCountPerPage < maxPage ? currentPage + pageCountPerPage : startPage + pageCountPerPage
    );
    setStartPage(startPage + pageCountPerPage);
    setEndPage(getEndPage());
    clickListener(currentPage);
  };

  const pageNumberClicked = (page) => {
    setCurrentPage(page);
    clickListener(page);
  };

  const getStartPage = () => {
    return startPage - pageCountPerPage > 1 ? startPage - pageCountPerPage : 1;
  };

  const getEndPage = () => {
    return endPage + pageCountPerPage < maxPage ? endPage + pageCountPerPage : maxPage;
  };

  return (
    <FlexContainer>
      <Button onClick={leftPageClicked} disabled={startPage === 1}>
        &lt;
      </Button>
      {pages.slice(startPage, endPage + 1).map((page, i) => (
        <Numbering key={i} page={page} currentPage={currentPage} clickListener={pageNumberClicked} />
      ))}
      <Button onClick={rightPageClicked} disabled={endPage === maxPage}>
        &gt;
      </Button>
    </FlexContainer>
  );
};

const Numbering = ({ page, currentPage, clickListener }) => {
  return (
    <Button onClick={() => clickListener(page)} selected={page === currentPage}>
      {page}
    </Button>
  );
};

export default Pagination;
