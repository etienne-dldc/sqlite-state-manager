import { useSqlJs } from "../hooks/useSqlJs";

export const SQL_WASM_PATH = "/wasm/sql-wasm.wasm";

export function App() {
  const sqlJsRes = useSqlJs(SQL_WASM_PATH);

  return null;
}
