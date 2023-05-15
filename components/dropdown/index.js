import Multiselect from 'multiselect-react-dropdown';

import styles from './style.module.css';

const Dropdown = ({ label, placeholder, state, singleSelect }) => {
    
    const style = {
        multiselectContainer: {
            "backgroundColor": "white",
            "fontSize": "12px",
            "borderRadius": "6px",
            "borderColor": "white",
            "padding": "10px 0 10px",
            "marginTop": "6px",
            "cursor": "pointer"
        },
        searchBox: {
            "border": "none",
            "padding": "0 0 0 16px",
            "color": "var(--gray-200)",
            "fontSize": "1rem"
        },
        optionContainer: { 
            "border": "2px solid white",
            "backgroundColor": "rgba(240, 240, 240, 0.473)",
            "boxShadow": "2px 2px 3px gray",
            "marginTop": "8px"
        },
        option: {
            "backgroundColor": "white",
            "color": "gray"
        },
        chips: { 
            "backgroundColor": "#2dc5da",
            "fontSize": "12px",
            "margin": "1px 8px 1px 0", 
            "color": "white"
        },
    }

    const onSelect = (selectedList, _) => {
        state.selectedValues = [...selectedList];
    }
    
    const onRemove = (selectedList, _) => {
        state.selectedValues = [...selectedList];
    }

    return <div className={styles.container}>
        <span className={styles.label}>{label}</span>
        <Multiselect
            singleSelect={singleSelect}
            options={state.options} 
            selectedValues={state.selectedValues}
            onSelect={onSelect} 
            onRemove={onRemove} 
            displayValue="name" 
            closeIcon="cancel"
            showArrow={true}
            placeholder={placeholder}
            emptyRecordMsg="Nenhuma opção disponível"
            style={style}/>
    </div>
};

export default Dropdown;