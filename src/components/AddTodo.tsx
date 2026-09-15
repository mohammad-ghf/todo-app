type AddTodoPProps = {
    addTodo: (  ) => void
}

const AddTodo = ({addTodo} : AddTodoPProps) => {
  return (
    <div>
      {" "}
      <button
        onClick={addTodo}
        className="w-full py-3 mb-6 bg-gray-700 dark:bg-purple-800 text-white cursor-pointer dark:hover:bg-purple-900 text-sm rounded-md"
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
