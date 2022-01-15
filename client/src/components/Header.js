import React from 'react'
import SaveButton from './SaveButton'
import { useContext } from 'react';
import Context from '../Context';


function Header() {
    const ContextData = useContext(Context);
    // console.log(ContextData);
    return (
        <div className='container mt-3 mb-3 row'>
            <div className='col-9'><h1>{ContextData.text}</h1></div>
            <div className='col-3'>
                <SaveButton text={ContextData.Show?"Close":"Add"}
                color="white" 
                bgcolor={ContextData.Show?"orange":"green"} btnClick={ContextData.ClickEvent} />
            </div>
            
            
        </div>
    )
}

export default Header
