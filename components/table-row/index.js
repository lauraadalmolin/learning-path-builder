import Badge from '../badge';
import IconButton from '../icon-button';
import styles from './style.module.css';

const TableRow = ({ learningPathName, contentBadge, focusBadge, navigate }) => {
  return <div className={styles.tableRow} onClick={navigate}>
      <div className={styles.infoContainer}>
        <span className={styles.pathName}>{ learningPathName }</span>
        <Badge>{ contentBadge }</Badge>
        <Badge>{ focusBadge }</Badge>
      </div>
      <div>
        <IconButton type='delete' icon='MdDelete'></IconButton>
        <IconButton type='primary' icon='MdDownload'></IconButton>
      </div>
    </div>;
}

export default TableRow;