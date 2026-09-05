# 13. You Might Not Need an Effect

## 今日のゴール

- Effectを追加する前に不要と判断できる
- render / event / Effectの3種類へ処理を分類できる

## Effectは便利な監視機能ではない

React公式はEffectを、**React外部のシステムと同期するためのescape hatch**として説明しています。

まず次の2ケースではEffectを疑います。

## 1. 表示用データの変換

悪い例:

```tsx
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);
```

良い例:

```tsx
const fullName = `${firstName} ${lastName}`;
```

render中に計算できます。

## 2. ユーザー操作

悪い発想:

「購入ボタンが押されたことをStateに入れ、EffectでPOSTする」

ユーザーが押したことが原因なら、通常はbuttonのevent handlerで処理します。

## 3分類

```text
表示の計算                → render
クリック・submitが原因     → event handler
外部システムとの同期       → Effect
```

## 演習

次を分類してください。

1. searchTextからfilteredItemsを作る
2. 保存buttonでAPIへPOSTする
3. WebSocketへ接続する
4. firstNameとlastNameからfullNameを作る
5. document.titleを現在のroom名へ同期する

## 今日の一言説明

> Effectを使う前に、render中の計算かevent handlerで書けないか確認する。
