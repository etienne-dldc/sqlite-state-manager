import { useEffect, useState } from "react";
import type { SqlJsStatic } from "sql.js";
import initSqlJs from "sql.js";

type State = { status: "loading" } | { status: "error"; error: Error } | { status: "success"; sqlJs: SqlJsStatic };

export function useSqlJs(sqlJsWasm: string): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    initSqlJs({ locateFile: () => sqlJsWasm })
      .then((sqlJs) => {
        if (cancelled) {
          return;
        }
        setState({ status: "success", sqlJs });
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }
        setState({ status: "error", error });
      });
    return () => {
      cancelled = true;
    };
  }, [sqlJsWasm]);

  return state;
}
