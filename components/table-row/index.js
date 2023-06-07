import Badge from '../badge';
import IconButton from '../icon-button';

import styles from './style.module.css';

const TableRow = ({
  lPath,
  numberOfElements,
  numberOfTransitions,
  navigateHandler,
  deleteHandler,
  downloadHandler
}) => {

  const clickHandler = (event, fn) => {
    event.stopPropagation();
    fn(lPath);
  };

  return (
    <div kry={lPath.id} className={styles.tableRow} onClick={navigateHandler}>
      <div className={styles.infoContainer}>
        <span className={styles.pathName}>{lPath.name}</span>
        <Badge>{lPath.focus}</Badge>
        <Badge>{numberOfElements}</Badge>
        <Badge>{numberOfTransitions}</Badge>
      </div>
      <div>
        <IconButton
          onClickHandler={(e) => { clickHandler(e, deleteHandler) }}
          type='delete'
          icon='MdDelete'
        ></IconButton>
        <IconButton
          onClickHandler={(e) => { clickHandler(e, downloadHandler) }}
          type='primary'
          icon='MdDownload'
        ></IconButton>
      </div>
    </div>
  );
};

export default TableRow;