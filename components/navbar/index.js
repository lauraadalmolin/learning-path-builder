import { MdMenu } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '../button';

import useOutsideClick from '../../hooks/use-outside-click';

import strings from '../../constants/strings.json';
import styles from './style.module.css';

const Navbar = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [headerText, setHeaderText] = useState();
  const [enableTools, setEnableTools] = useState(false);

  const router = useRouter();

  const navigateHandler = () => { router.push('/home') }
  const handleClick = () => { enableTools && setInputVisible(true) }
  const handleClickOutside = () => { enableTools & setInputVisible(false) }
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
    if (!router.pathname) return;
    
    switch (router.pathname) {
      case '/home': {
        setHeaderText(strings.navbarHomeHeaderText);
        setEnableTools(false);
        break;
      }
      case '/builder': {
        // try loading file with id on params
        setHeaderText(strings.navbarBuilderSampleHeaderText);
        setEnableTools(true);
        break;
      }
    }
   
    console.log('here', router.pathname);
  }, [router.pathname]);

  return (
    <nav>
      <ul className={`${styles.navbar} ${styles.ul}`}>
        <div className={styles.leftContainer}>
          <li onClick={navigateHandler} className={`${styles.li} no-select`}>
            <MdMenu className={styles.icon} />
          </li>
          <li ref={ref} onClick={handleClick} className={`${styles.li} ${styles.headerText} no-select`}>
            {!inputVisible && <span>{headerText}</span>}
            { inputVisible && 
              <input 
                value={headerText}
                onChange={inputChangedHandler}
                className={styles.navbarInput}
                onKeyDown={handleKeyDown}/>
            }
          </li>
        </div>
        { enableTools && <div className={styles.rightContainer}>
          <li>
            <Button type='primary' icon='MdCheck'>
              Validar
            </Button>
          </li>
          <li>
            <Button type='primary' icon='MdDownload'>
              Baixar
            </Button>
          </li>
          <li>
            <Button type='primary' icon='MdSave'>
              Salvar
            </Button>
          </li>
        </div> }
      </ul>
    </nav>
  );
}

export default Navbar;