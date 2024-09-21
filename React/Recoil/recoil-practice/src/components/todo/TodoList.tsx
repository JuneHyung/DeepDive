import { todoListState } from "@/store/todoAtom";
import { useRecoilValue } from "recoil";
import TodoListStats from "./TodoListStats";
import TodoListFilters from "./TodoListFilters";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import { useEffect } from "react";

const TodoList = () => {
  const todoList = useRecoilValue(todoListState);
  useEffect(() => {
    console.log(todoList);
  }, [todoList]);
  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => {
        <TodoItem key={todoItem.id} item={todoItem} />;
      })}
    </>
  );
};

export default TodoList;
