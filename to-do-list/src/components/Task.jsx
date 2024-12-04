import { useContext } from "react";
import { ButtonsContext } from "./ToDoList";
import Button from "./Button";

function Task(props) {
    const { deleteTask, moveTaskUp, moveTaskDown } = useContext(ButtonsContext);

    return (
        <li className='task'>
            <span className='text'> {props.task} </span>

            <Button class='delete-button' func={() => deleteTask(props.idx)} text='Delete' />
            <Button class='move-button' func={() => moveTaskUp(props.idx)} text='↑' />
            <Button class='move-button' func={() => moveTaskDown(props.idx)} text='↓' />
        </li>
    );
}

export default Task;