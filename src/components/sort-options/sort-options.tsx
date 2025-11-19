import { useState } from 'react';
import {SortType} from '../../const.ts';

type SortOptionsProps = {
  activeSortType: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortOptions({ activeSortType, onSortChange }: SortOptionsProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleSortTypeClick = (sortType: SortType) => {
    onSortChange(sortType);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(!isOpened)}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={`places__option ${activeSortType === type ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortTypeClick(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;
