# React Mental Model Quick Reference

## Data flow

```text
parent state
   ↓ props
child component
   ↓ event callback
parent updates state
   ↓
render again
```

Propsは基本的に親から子へ流れます。子から親へ値を戻したい場合、親がcallbackをPropsとして渡します。

## Render

Component関数は「現在のProps / Stateなら何を画面に出すか」を計算します。

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello {name}</h1>;
}
```

render中に副作用を起こさず、同じ入力なら同じJSXを返せる状態を目指します。

## State

Stateはcomponentが時間をまたいで覚える必要がある値です。

Stateにしない例:

- Propsから計算できる値
- 他のstateから計算できる値
- renderのたびに同じように作れる定数

## Event

「ユーザーがクリックした」「送信した」のように原因が特定できる処理はevent handlerへ置きます。

## Effect

EffectはReact外部との同期です。

例:

- timer
- WebSocket
- DOM API / browser API
- 外部widget
- network synchronization

単なるデータ変換には通常不要です。

## 困ったときの5問

1. この値は覚える必要がある？
2. 既存のProps / Stateから計算できない？
3. 誰がこのStateを所有すべき？
4. この処理はユーザー操作が原因？
5. Effectなら、同期している外部システムは何？
