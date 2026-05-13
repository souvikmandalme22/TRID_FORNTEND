# TRID State Architecture

## Stores

### `order.store.ts` — Persisted to localStorage
Holds the complete order flow state.

| Slice         | Type                  | Set by                      |
|---------------|-----------------------|-----------------------------|
| `file`        | `File \| null`        | `setFile()`                 |
| `model`       | `ModelData \| null`   | `setFile()` + `setModelData()` |
| `segment`     | `string \| null`      | `setSegment()`              |
| `material`    | `MaterialSelection`   | `setMaterial()`             |
| `useCase`     | `string \| null`      | `setUseCase()`              |
| `environments`| `string[]`            | `setEnvironments()`         |
| `quantity`    | `number`              | `setQuantity()`             |
| `price`       | `PriceBreakdown`      | `setPrice()`                |
| `orderId`     | `string \| null`      | `setOrderId()`              |

### `ui.store.ts` — Not persisted
Ephemeral UI state (modals, toasts, menus).

## Selectors

```ts
selectIsReadyForPricing(state)  // → boolean
selectIsReadyForCheckout(state) // → boolean
selectProgress(state)           // → 0–100
```

## Hook

`useOrderFlow()` — single hook wrapping all handlers + navigation.
Import this in page components instead of calling the store directly.

## Backend Integration

Call `store.toOrderPayload()` to get a typed `OrderPayload` object
ready to POST to your API endpoint.

```ts
const payload = useOrderStore.getState().toOrderPayload();
await fetch("/api/orders", { method: "POST", body: JSON.stringify(payload) });
```

## Persistence

`File` objects are NOT persisted (not serializable).
All other fields survive page refresh via `localStorage`.
Object URLs are revoked on `clearFile()` and `reset()`.
