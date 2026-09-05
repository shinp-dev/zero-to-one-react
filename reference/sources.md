# 一次資料と監査基準

最終確認: 2026-09-05

## React

- Learn: https://react.dev/learn
- Installation: https://react.dev/learn/installation
- Quick Start: https://react.dev/learn
- Thinking in React: https://react.dev/learn/thinking-in-react
- State as a Snapshot: https://react.dev/learn/state-as-a-snapshot
- Queueing a Series of State Updates: https://react.dev/learn/queueing-a-series-of-state-updates
- Choosing the State Structure: https://react.dev/learn/choosing-the-state-structure
- Sharing State Between Components: https://react.dev/learn/sharing-state-between-components
- Passing Data Deeply with Context: https://react.dev/learn/passing-data-deeply-with-context
- You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
- Synchronizing with Effects: https://react.dev/learn/synchronizing-with-effects
- createContext reference: https://react.dev/reference/react/createContext

## Vite

- Getting Started: https://vite.dev/guide/
- Vite 8 announcement: https://vite.dev/blog/announcing-vite8

Vite 8のNode.js要件は20.19+または22.12+。授業ではNode.js 24 LTSを推奨する。

## 教材で避ける旧前提

- Create React Appを新規教材の標準にしない
- Context ProviderをReact 19以前の`.Provider`記法だけで教えない
- `useEffect`を「stateが変わったら処理する便利フック」として教えない
- API取得や派生stateのためにEffectを反射的に追加しない
- Stateを直接mutationしない
- array indexを安易にkeyへ使わない

## 更新時の確認ポイント

1. React公式Learnの章構成と推奨メンタルモデル
2. Reactのcurrent stable major
3. Context / Effectなどのreference変更
4. Vite current majorとNode.js要件
5. scaffoldコマンドが現行か
