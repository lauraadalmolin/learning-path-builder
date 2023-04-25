import Multiselect from 'multiselect-react-dropdown';

import styles from './style.module.css';

const Dropdown = ({ label, placeholder, state, singleSelect }) => {
    
    const style = {
        multiselectContainer: {
            "backgroundColor": "white",
            "fontSize": "12px",
            "borderRadius": "6px",
            "borderColor": "white",
            "padding": "12px 0 12px",
            "marginTop": "6px",
            "marginBottom": "16px",
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
            "marginTop": "6px"
        },
        option: {
            "backgroundColor": "white",
            "color": "gray"
        },
        chips: { 
            "backgroundColor": "#2dc5da",
            "fontSize": "12px",
            "margin": "0 6px 0 0", 
            "color": "white"
        },
    }

    const onSelect = (selectedList, _) => {
        state.selectedValues = [...selectedList];
    }
    
    const onRemove = (selectedList, _) => {
        state.selectedValues = [...selectedList];
    }

    return <div>
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
            // customArrow={"A"}
            // showCheckbox={true}
            style={style}/>
    </div>
};

export default Dropdown;