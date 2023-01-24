import GraphDisplayer from '../../components/graph-displayer';
import Navbar from '../../components/navbar';
import SideSection from '../../components/side-section';

import styles from './style.module.css';

const Builder = () => {
  return <div className={styles.externalContainer}>
    <Navbar/>
    <div className={styles.rowContainer}>
      <GraphDisplayer/>
      <SideSection/>
    </div>
  </div>;
}

export default Builder;