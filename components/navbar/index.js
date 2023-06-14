import { MdDashboard } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '../button';

import useOutsideClick from '../../hooks/use-outside-click';

import strings from '../../constants/strings.json';
import styles from './style.module.css';

const Navbar = ({ learningPathData = null, showOptions = false, savePathHandler, saveNameHandler, downloadPathHandler, downloadImageHandler }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [headerText, setHeaderText] = useState('');

  const router = useRouter();

  const navigateHandler = () => { router.push('/main') }
  const handleClick = () => { showOptions && setInputVisible(true) }
  const handleClickOutside = () => { showOptions && setInputVisible(false) }

  const ref = useOutsideClick(handleClickOutside);

  const inputChangedHandler = (event) => {
    const enteredValue = event.target.value;
    setHeaderText(enteredValue);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClickOutside();
    }
  };

  useEffect(() => {
    if (learningPathData) {
      const text = !learningPathData.name ? strings.navbarBuilderSampleHeaderText : learningPathData.name;
      setHeaderText(text);
    }
    
  }, [learningPathData]);

  useEffect(() => {
    if (!learningPathData) return;
    if (!showOptions) return;

    if (headerText == '') {
      setHeaderText(learningPathData.name ?? strings.navbarHomeHeaderText);
    }

    if (!inputVisible && !headerText && !learningPathData.name) setInputVisible(true);
    if (inputVisible || !headerText) return;
    
    saveNameHandler(headerText);
  }, [inputVisible])

  return (
    <nav>
      <ul className={`${styles.navbar} ${styles.ul}`}>
        <div className={styles.leftContainer}>
          <li onClick={navigateHandler} className={`${styles.li} no-select`}>
            <MdDashboard className={styles.icon} />
          </li>
          <li ref={ref} onClick={handleClick} className={`${styles.li} ${styles.headerText} no-select`}>
            {!inputVisible && <span>{headerText == "" ? "Milo: Modelador de Rotas de Aprendizagem" : headerText}</span>}
            { inputVisible && 
              <input 
                value={headerText}
                onChange={inputChangedHandler}
                className={styles.navbarInput}
                onKeyDown={handleKeyDown}/>
            }
          </li>
        </div>
        { showOptions && <div className={styles.rightContainer}>
          {/* <li>
            <Button type='primary' icon='MdCheck'>
              Validar
            </Button>
          </li> */}
          <li>
            <Button onClickHandler={downloadImageHandler} type='primary' icon='MdDownload'>
              Exportar imagem
            </Button>
          </li>
          <li>
            <Button onClickHandler={downloadPathHandler} type='primary' icon='MdDownload'>
              Exportar JSON
            </Button>
          </li>
          <li>
            <Button onClickHandler={savePathHandler} type='primary' icon='MdSave'>
              Salvar
            </Button>
          </li>
        </div> }
      </ul>
    </nav>
  );
}

export default Navbar;