# 🐳 useQueryClient

`useQueryClient`훅은 현재 `QueryClient`인스턴스를 반환함.

```tsx
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
```

## 🌏 Options

- `queryClient?: QueryClient`
- 이 훅을 사용해 **커스텀 `QueryClient`**를 사용할 수 있다. 설정하지 않으면, 가장 가까운 컨텍스트에서 제공되는 `QueryClient`가 사용됨.