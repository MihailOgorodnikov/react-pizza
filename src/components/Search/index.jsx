import React from "react";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";

import styles from "./Search.moduls.scss";

//строка поиска
const Search = () => {
    //Используем хук в котором переменная которая ссылается на контекст
    const {setSearchValue} = React.useContext(SearchContext);
    //Локально создаем контекст что бы контралировать импут
    const [ value, setValue] = React.useState('');
    //Для того что бы фокус остался в строке
    const inputRef = React.useRef();
    
    const updateSerchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 250),
        [],
    )

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    }

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSerchValue(event.target.value);
    }

    return (
        <div className="root">
            <svg 
            className="icon"
             viewBox="0 0 32 32" 
             xmlns="http://www.w3.org/2000/svg">
                 <title/>
                 <g id="search">
                     <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
                     </g>
             </svg>
           <input 
           ref={inputRef}
           //Суда мы записыввем то что вводим в строку
            value={value}
            // А от сбда мы получаем то что ввели в строку
            onChange={onChangeInput}
            className="input" 
            placeholder="Поиск пиццы..."
            /> 
            {value &&
                (<svg onClick={onClickClear} className="clear" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                    <path d="M0 0h48v48h-48z" fill="none"/>
                </svg>)
            }
        </div>
    )
};

export default Search;