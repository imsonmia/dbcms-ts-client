import { log } from "console";

/**
 *
 * @param base Base URL for database access
 * @param db Database name
 * @param table Table name
 * @param mode Nullable HTTP Method: Default "GET" - GET, POST, DELETE...
 * @param body Nullable request body object
 * @returns Data returned by the fetch API
 */
export const query = async (
  base: string,
  db: string,
  table: string,
  mode?: string,
  body?: object
) => {
  const failData = {
    response: {},
    success: false,
  };
  if (base === "" || db === "" || table === "") {
    return failData;
  }
  console.log(
    JSON.stringify({
      mode: "cors",
      method: mode ? mode : "GET",
      body: JSON.stringify(body),
    })
  );
  const fetchResolve = await fetch(
    `${base}/api/query?db=${db}&&table=${table}`,
    {
      mode: "cors",
      method: mode ? mode : "GET",
      body: JSON.stringify(body),
    }
  );
  if (fetchResolve.status !== 200) {
    return failData;
  }
  const dataJson: object = await fetchResolve.json();
  return { response: dataJson, success: true };
};
