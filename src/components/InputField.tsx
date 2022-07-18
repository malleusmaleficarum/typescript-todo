import { FC, useRef } from "react";
import "./InputField.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='input'
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        className='input__text'
        type='text'
        placeholder='Input your task'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className='input__button' type='submit'>
        Add
      </button>
    </form>
  );
};

export default InputField;
