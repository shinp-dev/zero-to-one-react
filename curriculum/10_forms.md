# 10. Forms — 入力とState

## 今日のゴール

- inputの値をStateで扱える
- submit処理をevent handlerへ置ける

## Controlled Input

```tsx
const [name, setName] = useState('');

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

入力欄の表示値をReact Stateが決めています。

## Form submit

```tsx
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // ユーザーがsubmitしたために行う処理
}
```

この処理はEffectではなくevent handlerです。

## 演習: Task追加Form

State:

```tsx
const [title, setTitle] = useState('');
const [tasks, setTasks] = useState<Task[]>([]);
```

submit時にtaskを追加し、inputを空へ戻してください。

IDは学習用なら`crypto.randomUUID()`を使って構いません。

## 注意

「入力値が変わるたび別StateをEffectで更新する」のではなく、必要ならrender中に派生値を計算します。

## 今日の一言説明

> Formは入力値をStateへ接続し、submitのようなユーザー操作はevent handlerで処理する。
