import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import api from '../../util/api/api';
const Select = styled.div`
  width: 230px;
  h3 {
    border-radius: 8px;
    cursor: pointer;
    padding: 10px;
    background-color: var(--lightgrey-color);
  }

  div:nth-child(1) {
    padding: 10px;
    border: none;
    border-radius: 8px;
  }
`;
const CountryBox = styled.div`
  overflow-y: auto;
  width: 100%;
  height: ${(props) => (props.selected ? '200px' : '0px')};

  position: relative;
`;
const CountryList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  align-content: flex-start;
  row-gap: 8px;
  position: absolute;
`;
const CountryItem = styled.li`
  padding: 10px;
  &:hover {
    cursor: pointer;
    background-color: var(--lightgrey-color);
  }
`;
function CountrySelect({ country }) {
  const [countries, setCountries] = useState([]);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const selectedCountry = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const countriesData = await api.countries.getAllCountries();
      setCountries(countriesData);
    }
    fetchData();
  }, []);

  const handleSelectValue = (e) => {
    selectedCountry.current.innerText = e.target.innerText;
    setIsShowOptions(false); // 선택 후 드롭다운 닫기
    localStorage.setItem('country', JSON.stringify(e.target.innerText));
  };

  return (
    <Select>
      <h3 ref={selectedCountry} onClick={() => setIsShowOptions((prev) => !prev)}>
        {country ?? '나라를 선택해주세요'}
      </h3>

      <CountryBox selected={isShowOptions}>
        {isShowOptions && (
          <CountryList>
            {countries.map((filteredCountry, index) => (
              <CountryItem key={index} onClick={(e) => handleSelectValue(e)}>
                {filteredCountry}
              </CountryItem>
            ))}
          </CountryList>
        )}
      </CountryBox>
    </Select>
  );
}

export default CountrySelect;
