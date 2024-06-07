import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { manageCountry } from '../../redux/slices/postSlice';
import api from '../../util/api/api';

const Select = styled.div`
  width: 320px;
  font-size: 14px;
  text-align: left;
  position: relative;
`;

const CountryBox = styled.div`
  position: absolute;
  width: 320px;
  overflow-y: scroll;
  height: ${(props) => (props.selected ? '240px' : '0px')};
  margin-bottom: 4px;
  border: ${(props) => (props.selected ? 'solid 1px var(--grey-color) ' : '0px')};
`;

const CountryList = styled.ul`
  list-style: none;
  display: grid;
  width: 320px;
  align-content: flex-start;
  row-gap: 10px;
  position: relative;
  background-color: var(--white-color);
  color: var(--black-color);
`;

const CountryItem = styled.li`
  padding: 10px;
  width: 320px;
  &:hover {
    cursor: pointer;
    background-color: var(--yellow-color);
  }
`;

const TitleInput = styled.div`
  padding: 12px;
  border: 1px solid var(--grey-color);
  color: var(--black-color);
  border-color: ${(props) => props.focused && `var(--yellow-color)`};
`;

function CountrySelect({ country: country }) {
  const dispatch = useDispatch();
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
    setIsShowOptions(false);
    dispatch(manageCountry(e.target.innerText));
  };

  return (
    <Select>
      <TitleInput
        ref={selectedCountry}
        className="title-input"
        focused={isShowOptions}
        country={country}
        onClick={() => setIsShowOptions((prev) => !prev)}
      >
        {country ?? '나라를 선택해주세요'}
      </TitleInput>

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
