import { useState, type FormEvent } from 'react';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

type Filter = 'all' | 'active' | 'done';

type TaskFormProps = {
  onAdd: (title: string) => void;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button>Add</button>
    </form>
  );
}

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
};

function TaskList({ tasks, onToggle }: TaskListProps) {
  if (tasks.length === 0) return <p>No tasks</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggle(task.id)}
            />
            {task.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  function addTask(title: string) {
    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title, done: false },
    ]);
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  // 表示用データはStateへコピーせず、現在のStateから導く。
  const visibleTasks = tasks
    .filter((task) => {
      if (filter === 'active') return !task.done;
      if (filter === 'done') return task.done;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()),
    );

  const activeCount = tasks.filter((task) => !task.done).length;

  return (
    <main>
      <h1>Study Task Board</h1>
      <TaskForm onAdd={addTask} />

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="done">Done</option>
      </select>

      <p>{activeCount} active</p>
      <TaskList tasks={visibleTasks} onToggle={toggleTask} />
    </main>
  );
}
