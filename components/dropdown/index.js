import Multiselect from 'multiselect-react-dropdown';

import styles from './style.module.css';

const Dropdown = ({ label, placeholder, options }) => {
    
    const style = {
        multiselectContainer: { // To change css for multiselect (Width,height,etc..)
            "backgroundColor": "white",
            "fontSize": "12px",
            "borderRadius": "6px",
            "borderColor": "white",
            "padding": "12px 0 12px",
            "marginTop": "6px",
            "marginBottom": "16px"
        },
        searchBox: { // To change search box element look
            "border": "none",
            "padding": "0 0 0 16px",
            "color": "var(--gray-200)",
            "fontSize": "1rem"
        },
        optionContainer: { // To change css for option container 
            "border": "2px solid white",
            "backgroundColor": "rgba(240, 240, 240, 0.473)",
            "boxShadow": "2px 2px 3px gray",
            "marginTop": "6px"
        },
        option: { // To change css for dropdown options
            "backgroundColor": "white",
            "color": "gray"
        },
        // inputField: {
        //     "background-color": "white",    
        // },
        chips: { // To change css chips(Selected options)
            "backgroundColor": "#2dc5da",
            "fontSize": "10px",
            "margin": "0 6px 0 0"
        },
    }

    const state = {
        options: [
            { name: 'Option 1', id: 1 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 2', id: 2 },
            { name: 'Option 3', id: 3 }, { name: 'Option 4', id: 4 }, { name: 'Option 5', id: 5 }, { name: 'Option 6', id: 6 }]
    };

    const onSelect = (selectedList, selectedItem) => {
        console.log('on select')
    }

    const onRemove = (selectedList, removedItem) => {
        console.log('on remove')
    }

    return <div>
        <span className={styles.label}>{label}</span>
        <Multiselect
            options={state.options} 
            selectedValues={state.selectedValue}
            onSelect={onSelect} 
            onRemove={onRemove} 
            displayValue="name" 
            closeIcon="cancel"
            showArrow={true}
            placeholder={placeholder}
            // showCheckbox={true}
            style={style}/>
    </div>
};

export default Dropdown;