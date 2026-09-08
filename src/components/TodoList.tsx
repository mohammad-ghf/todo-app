import type { TodoType } from "../types/todo";
import Todo from "./Todo";

type TodoListProps = {
  todos: TodoType[];
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
};

const TodoList = ({
  completeTodo,
  deleteTodo,
  todos,
  editTodo
}: TodoListProps) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-black dark:text-white text-center mt-7">
          todo is empty
        </p>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
