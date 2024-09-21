import { RecoilRoot } from 'recoil';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

export default App;
