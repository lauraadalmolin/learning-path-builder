import styles from './style.module.css';
import { COLORS } from '../../constants/graph-style';

const Legend = () => {
    return <div className={styles.legend}>
        <div className={styles.legendLine}>
            <span className={styles.legendTitle}>Legenda</span>
        </div>
        <div className={styles.legendLine}>
            <div className={styles.legendColor} style={{backgroundColor: COLORS.Primary}}></div>
            <div className={styles.legendText}>Conteúdo</div>
        </div>
        <div className={styles.legendLine}>
            <div className={styles.legendColor} style={{backgroundColor: COLORS.PrimaryHighlight}}></div>
            <div className={styles.legendText}>Conteúdo ou transição selecionado</div>
        </div>
        <div className={styles.legendLine}>
            <div className={styles.legendColor} style={{backgroundColor: COLORS.Edge}}></div>
            <div className={styles.legendText}>Transição</div>
        </div>
        <div className={styles.legendLine}>
            <div className={styles.legendColor} style={{backgroundColor: COLORS.PreRequisiteEdge}}></div>
            <div className={styles.legendText}>Transição com pré-requisitos</div>
        </div>
    </div>
}

export default Legend;