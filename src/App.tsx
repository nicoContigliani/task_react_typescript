/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { Fragment, useState } from 'react';
import logo from './logo.svg';
import './App.css';


type FormElement = React.FormEvent<HTMLFormElement>
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])

  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
    console.log(tasks)
  }

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }
  const toggleDonTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks)
  }
  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };



  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} className="form-control"
              autoFocus
            />
            <button type="submit">Send</button>
          </form>

        </div>
      </div>
      {
        tasks.map((t: ITask, i: number) => (
          <div key={i} className="card card-body mt-2 ">
            <h2
              style={{ textDecoration: t.done ? 'line-through' : "" }}
            >{t.name}</h2>
            <button className="btn btn-primary" onClick={() => toggleDonTask(i)}>
              {t.done ? '✔' : '✗'}
            </button>
            <button
                      onClick={() => removeTask(i)}
                      className="btn btn-danger"
                    >
                      🗑
                    </button>

          </div>
        ))
      }
    </Fragment>
  );
}

export default App;
