import { Dispatch, FC, FormEvent, useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./SingleTodo.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  t: Todo;
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: FC<Props> = ({ index, t, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(t.todo);
  const editRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    if (!edit && !t.isDone) {
      setEdit(!edit);
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleInput = (e: FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    editRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={t.id.toString()} index={index}>
      {(provided) => (
        <form
          className='todos__single'
          onSubmit={(e) => handleInput(e, t.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={editRef}
              className='todos__input'
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : t.isDone ? (
            <s className='todos__text'>{t.todo}</s>
          ) : (
            <span className='todos__text'>{t.todo}</span>
          )}

          <div className='todos__icon'>
            <span className='icon'>
              <AiOutlineEdit onClick={handleEdit} />
            </span>
            <span className='icon' onClick={() => handleDelete(t.id)}>
              <AiOutlineDelete />
            </span>
            <span className='icon' onClick={() => handleDone(t.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
