import './App.css';
import Task from './components/Tasks'
import AddTask from './components/AddTask'
import Header from './components/Header'
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import About from './components/About';
import Context from './Context'
import axios from 'axios'

function App() {

  //Global State
  const [TaskData, SetTaskData] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    FetchTask();
  }, [])

  // Fetch All Task
  const FetchTask = () => {
    axios.get("/api/list")
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.status === true) {
            SetTaskData(res.data.data.tasks)
          }
        }
      });
  }

  // Delete Task
  const deletetask = async (id) => {
    console.log("In Delete", id);
    axios.delete(`/api/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.status === true) {
            console.log("Deleted");
          }
        }
      });
    SetTaskData(TaskData.filter((t) => t.id !== id));
  }

  // Update Reminder Status
  const ToggleReminder = (id) => {
    const tasks = TaskData.filter((t) => t.id === id)
    axios.put(`/api/reminder/${id}`, tasks[0]).then((res) => {
      if (res.status === 200) {
        if (res.data.data.status === true) {
          FetchTask();
        }
      }
    })
  }

  // Add Task
  const addTask = async (newTask) => {
    axios.post("/api/new", newTask)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.status === true) {
            console.log("Task Added");
          }
        }
      })
    FetchTask();
  }



  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={
          (
            <>
              <div className="container-fluid">
                <div className='row'>
                  <div className='col-4'></div>
                  <div className='col-4 border border-1 border-success'>
                    <Context.Provider value={
                      {
                        text: "Task Tracker",
                        ClickEvent: () => setShowAddTask(!showAddTask),
                        Show: showAddTask,
                        onAdd: addTask,
                        data: TaskData,
                        OnDelete: deletetask,
                        OnToggle: ToggleReminder
                      }
                    } >
                      <Header />
                      {showAddTask && <AddTask />}
                      {TaskData.length > 0 ? <Task /> : "No Tasks Found"}
                      <Footer />
                    </Context.Provider>
                  </div>
                  <div className='col-4'></div>
                </div>
              </div>
            </>
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
