import {Points} from '../../types/map-types.ts';

type ListProps = {
  points: Points;
  onListItemHover: (listItemName: string) => void;
};

function List(props: ListProps): JSX.Element {
  const {points, onListItemHover} = props;

  return (
    <ul className="list">
      {points.map((point, index) => {
        const keyValue = `${index}-${point.title}`;
        return (
          <li
            className="list__item"
            key={keyValue}
            // Передаем данные напрямую через замыкание
            onMouseEnter={(evt) => {
              evt.preventDefault();
              onListItemHover(point.title);
            }}
          >
            {point.title}
          </li>
        );
      })}
    </ul>
  );
}

export default List;
