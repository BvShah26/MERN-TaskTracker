import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Context from '../Context'
import { useContext } from 'react'

//Destructing as it's object.. so it will be easy to access
function Task({ task }) {

    const ContextData = useContext(Context)

    return (
        <div className={`card mt-3 bg-light ${task.reminder ? 'remindMe' : ''}`} onDoubleClick={() => ContextData.OnToggle(task.id)} >
            <div className="card-body">
                <div className="card-title">
                    <div className='row'>
                        <div className='col-10'>
                            <h4>{task.text}</h4>
                            <h5 className="card-text">{task.date}</h5>
                        </div>
                        <div className='col-2'>
                            <h1><FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => ContextData.OnDelete(task.id)} /></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    margin: '2px',
    backgroundColor: '#c0c0c0',

}

export default Task
