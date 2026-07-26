import { queryOptions } from "@tanstack/react-query";

import { $getChangelog } from "./functions";

export const changelogQueryOptions = () =>
  queryOptions({
    queryKey: ["changelog"],
    queryFn: ({ signal }) => $getChangelog({ signal }),
    staleTime: 15 * 60 * 1000,
  });
