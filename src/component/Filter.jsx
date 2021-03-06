import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import Input from '../controlled components/Input';
import Select from '../controlled components/Select';
import Sort from './Sort';

function Filter() {
  const {
    filters,
    setFilter,
    columnOptions,
    modifyColumnOptions,
    columnFilter,
    setColumnFilter,
  } = useContext(PlanetContext);
  const { filterByNumericValues, filterByName: { name: inputName } } = filters;
  const [comparisonOptions] = useState(['Greater', 'Equal', 'Lesser']);

  const handleChange = ({ target: { value, name } }) => {
    setColumnFilter({
      ...columnFilter,
      [name]: value,
    });
  };

  const handleNameFilter = ({ target: { value } }) => {
    setFilter({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const removeColumnOptions = () => {
    const newColumns = [...columnOptions];
    newColumns.splice(newColumns.indexOf(columnFilter.column), 1);
    modifyColumnOptions(newColumns);
    setColumnFilter({ ...columnFilter, column: newColumns[0], value: '' });
    console.log(newColumns);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        columnFilter,
      ],
    });
    removeColumnOptions();
  };

  return (
    <header className="header">
      <h1 className="title">Planet Finder</h1>
      <section className="textFilter-section">
        <Input
          placeHolder="Search"
          type="text"
          name="search-name"
          id="search-name"
          testId="name-filter"
          handleChange={ handleNameFilter }
          value={ inputName }
        />
      </section>
      <form onSubmit={ handleSubmit } className="filter-form">
        <Select
          name="column"
          testId="column-filter"
          options={ columnOptions }
          text="Column Filter"
          handleChange={ handleChange }
          value={ columnFilter.column }
        />
        <Select
          name="comparison"
          testId="comparison-filter"
          options={ comparisonOptions }
          text="Comparison Filter"
          handleChange={ handleChange }
          value={ columnFilter.comparison }
        />
        <Input
          placeHolder="Set a value"
          type="number"
          name="value"
          id="value"
          testId="value-filter"
          handleChange={ handleChange }
          value={ columnFilter.value }
          max={ 1000000000000 }
        />
        <button
          type="submit"
          data-testid="button-filter"
          disabled={ columnOptions.length === 0 || columnFilter.value.length === 0 }
          className="form-button"
        >
          Search
        </button>
      </form>
      <section className="sort-section">
        <Sort />
      </section>
    </header>
  );
}

export default Filter;
