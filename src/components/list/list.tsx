import {Point, Points} from '../../types/map-types';

type ListProps = {
  points: Points;
  onListItemHover: (listItemName: string) => void;
};

function List(props: ListProps): JSX.Element {
  const {points, onListItemHover} = props;

  return (
    <ul className="list">
      {points.map((point : Point) => (
        <li
          className="list__item"
          key={point.id}
          onMouseEnter={() => {
            onListItemHover(point.title);
          }}
        >
          {point.title}
        </li>
      ))}
    </ul>
  );
}

export default List;
