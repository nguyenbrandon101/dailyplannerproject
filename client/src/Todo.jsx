
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
    const [curr,setCurr] = React.useState(() => JSON.parse(localStorage.getItem("curr")) || cred)
    React.useEffect(() => {
        localStorage.setItem("curr", JSON.stringify(curr))
    }, [curr])

    /** Persisting the TODOS */
    const persist = (updateTodos) => {
        fetch('http://localhost:4000/todo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${curr}`
            },
            body: JSON.stringify(updateTodos),
        }).then(()=> {})
    }
    /** Grabbing Todos from Mongo*/
    /* When the components first mount, we want to do a get request to get the TODO items*/
    React.useEffect(() => {
        fetch('http://localhost:4000/todo', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${curr}`
            },
        }).then((response)=> response.json())
        .then((todos) => setTodos(todos))
    },[todos])
    /** Handle the submit todo task */
    function handleSubmit(event) {
        event.preventDefault()
        if (inputTodo == "") {
            return inputTodo
        }
        setTotal(prev => prev + 1)
        const newTodo = {user: `${curr}`,id:`${inputTodo}-${Date.now()}` ,inputTodo: `${[inputTodo]}`, checkers: `${checkers}`, edit: `${edit}`}
        const updateTodos = [...todos, newTodo]
        setTodos(updateTodos)
        setInputtodo("")
        persist(updateTodos)
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
        persist(updateCheck)
    }
    /** Handle delete */
    function handleDelete(td) {
        if (td.checkers === false) {
            setDone(prev => prev - 1)
        }
        /* for each todo if the id does not match then we update the todos with ids that dont match */
        setTodos(todos.filter((todo => todo.id !== td.id)))
        persist(todos.filter((todo => todo.id !== td.id)))
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
        persist(upDateEdit)
        
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
        persist(upDateEdit)
    }
    /** Reset button */
    function handleReset() {
        setTodos([])
        persist([])

    }

    function logout() {
        setCred(null)
        localStorage.clear()
        navigate("/")
    }
    return (
        <div className="appbody">
            <h1 className="name">Welcome {curr}</h1>
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
