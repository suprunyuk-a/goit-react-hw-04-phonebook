import { default as PropTypes } from 'prop-types';
import { nanoid } from 'nanoid';
import { InputGroup, InputLabel, Input, InputBar } from '../App/App.styled';

export function Filter(props) {
  const inputFilterId = nanoid();
  const filterSize = 230;

  const { handleFilter, filter } = props;

  return (
    <>
      <p>Find contacts by name</p>
      <InputGroup size={filterSize}>
        <Input
          type="text"
          id={inputFilterId}
          name="filter"
          value={filter}
          onChange={handleFilter}
          size={filterSize}
        />
        <InputLabel htmlFor={inputFilterId} size={filterSize}>
          Filter
        </InputLabel>
        <InputBar size={filterSize}></InputBar>
      </InputGroup>
    </>
  );
}

Filter.propTypes = {
  handlerFilter: PropTypes.func,
  filter: PropTypes.string,
};
