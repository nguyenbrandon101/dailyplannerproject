
import React from "react";
import WeatherProgress from "./WeatherProgress";
import { CredentialsContext } from "./App";
import {useNavigate} from "react-router-dom";
export default function Todo() {
    const navigate = useNavigate();
    const [cred,setCred] = React.useContext(CredentialsContext)
    const [inputTodo,setInputtodo] = React.useState("")
    /**checkbox state */
    const [checkers,setChecked] = React.useState(true)
    /** Check for edit */
    const [edit,setEdit] = React.useState(false)
    /** updating edit */
    const [Eupdate,setEupdate] = React.useState("")
    /** have done task */
    const [done,setDone] = React.useState(0)
    /** total task */
    const [total,setTotal] = React.useState(0)


    const [todos,setTodos] = React.useState([])
    React.useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
        localStorage.setItem("done", JSON.stringify(done))
        localStorage.setItem("total", JSON.stringify(total))
    }, [todos,done,total])
    /** Handle the submit todo task */
    function handleSubmit(event) {
        event.preventDefault()
        if (inputTodo == "") {
            return inputTodo
        }
        setTotal(prev => prev + 1)
        setTodos(prev => [...prev,{id:`${inputTodo}-${Date.now()}` ,inputTodo: `${[inputTodo]}`, checkers: `${checkers}`, edit: `${edit}`}])
        setInputtodo("")
    }
    /** handle the checkbox */
    function handleCheck(td,event,done) {
        let updateCheck = todos.map(task => {
            if (task.id === td.id) {
                let holder = ({...task, checkers: !task.checkers})
                if (task.checkers === false) {
                    setDone(prev => prev - 1)
                } else {
                    setDone(prev => prev + 1)
                }
                return holder
            }
            return task
        })
        setTodos(updateCheck)
    }
    /** Handle delete */
    function handleDelete(td) {
        setTotal(prev => prev -=1)
        if (td.checkers === false) {
            setDone(prev => prev - 1)
        }
        /* for each todo if the id does not match then we update the todos with ids that dont match */
        setTodos(todos.filter((todo => todo.id !== td.id)))
    }
    /** Handle edit */
    function handleEdit(td,event) {
        let upDateEdit = todos.map(task => {
            if (task.id === td.id) {
                return ({...task, edit: !task.edit})
            }
            return task
        })
        setTodos(upDateEdit)
    }

    function updateEdit(td) {
        if (Eupdate == "") {
            return Eupdate
        }
        let upDateEdit = todos.map(task => {
            if (task.id === td.id) {
                return ({...task, edit: !task.edit,inputTodo: Eupdate})
            }
            return task
        })
        setTodos(upDateEdit)
    }
    /** Reset button */
    function handleReset() {
        setTodos([])
        setDone(0)
        setTotal(0)
    }

    function logout() {
        setCred("")
        navigate("/")
    }
    return (
        <div className="appbody">
            <h1 className="name">Welcome {cred}</h1>
            <button className="logoutbut"onClick={logout}>Log Out</button>
            <WeatherProgress
                done={done}
                total = {total}
            />
            <div className="todoSection">
                <form>
                    <h1> CREATE A TODO</h1>
                    <h2> What's on your todo list?</h2>
                    <input placeholder="ex. Work Out" onChange = {(event) => setInputtodo(event.target.value)} value = {inputTodo} className="enterTodo"></input><button type="Submit" onClick={handleSubmit} className="plusBut">+</button>
                </form>
                {todos.map((td) => (
                    <ul>
                        <li>
                            <div className="todoPage">
                                <div className="todoCont">
                                    <label className ="container">
                                        <span style={{textDecoration: td.checkers ?'none': 'line-through' }}  > {td.inputTodo}</span>
                                        <input type="checkbox" checked ={td.checkers ? '' : 'checked'}></input>
                                        <span onClick={() => handleCheck(td)} class="checkmark"></span>
                                    </label>
                                    <button onClick={(event) => handleEdit(td)} className="editBut">Edit</button>
                                    <button onClick={() => handleDelete(td)} className="deleteBut">Delete</button>
                                </div>
                                <div className="editSection">
                                    {td.edit === true && <input className = "editInput" onChange={(event) => setEupdate(event.target.value)}></input>}
                                    {td.edit === true && <button onClick={()=>{updateEdit(td)}}type="Submit">Done Editing</button>}
                                </div>
                            </div>
                        </li>
                    </ul>
                ))}
                <button className="resetBut" onClick = {handleReset}>New Day / Reset</button>
            </div>
        </div>
    )
}
