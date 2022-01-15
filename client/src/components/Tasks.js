import React from 'react'
import Context from '../Context'
import Task from './Task'
import { useContext } from 'react'

function Tasks() {

    const ContextData = useContext(Context)

    return (
        <div>
            {
                ContextData.data.map((t) =>
                    <Task key={t._id} task={t} />
                )
            }
        </div>
    )
}

Tasks.propTypes = {

}

export default Tasks

