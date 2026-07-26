import { createServerFn } from "@tanstack/react-start";

import { getChangelog } from "./service";
import type { Changelog } from "./types";

export const $getChangelog = createServerFn({ method: "GET" }).handler(
  (): Promise<Changelog> => getChangelog(),
);
