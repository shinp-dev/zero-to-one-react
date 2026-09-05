# 15. 総合演習 — Study Task Board

Reactの主要な判断を1つの小さなアプリで統合します。

## 作るもの

学習タスクを追加・完了・検索できるTask Board。

最低要件:

- Task追加Form
- Task list
- 完了 / 未完了切替
- 検索
- 表示filter: all / active / done
- 未完了件数表示
- Componentを3つ以上へ分割

## Task型

```tsx
type Task = {
  id: string;
  title: string;
  done: boolean;
};
```

## Step 1: State候補を決める

まずコードを書かず、次を分類してください。

候補:

- tasks
- inputText
- searchText
- filter
- visibleTasks
- activeCount

どれがStateで、どれがrender中に計算できるでしょうか。

推奨:

```text
tasks       → state
inputText   → state
searchText  → state
filter      → state
visibleTasks→ derived
activeCount → derived
```

## Step 2: State ownerを決める

Component例:

```text
App
├─ TaskForm
├─ TaskToolbar
└─ TaskList
   └─ TaskItem
```

複数Componentが必要とするStateは`App`が持つところから始めます。

## Step 3: Eventを実装

- add
- toggle done
- search change
- filter change

それぞれ「どのユーザー操作が原因か」を明確にします。

## Step 4: 派生値をrender中に計算

```tsx
const visibleTasks = tasks
  .filter(/* filter */)
  .filter(/* search */);

const activeCount = tasks.filter((task) => !task.done).length;
```

これらをEffectで同期しないでください。

## Step 5: Composition

必要なら`Panel`や`EmptyState`など、意味のあるUI単位を作ります。

## 発展1: Context

Themeのように広いsubtreeで必要な値が本当にある場合だけContextを導入してください。

Contextを使わなくても完成する設計なら、それも正解です。

## 発展2: Effect

localStorageへtasksを同期する機能を追加しても構いません。

その場合、Effectについて次を説明してください。

- 外部システムは何か
- setupで何を同期するか
- cleanupは必要か

## 提出時の説明

コードだけでなく次の5問へ回答してください。

1. Stateは何個あり、なぜ必要か
2. 派生値をStateにしなかった箇所はどこか
3. State ownerをそのComponentにした理由
4. Event handlerとEffectをどう分けたか
5. AIに生成させたコードで削除・修正したものは何か

## 完成条件

「動く」だけでなく、**StateとData Flowを説明できること**を完成条件にします。
