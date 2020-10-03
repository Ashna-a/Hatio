
const API_URL = "https://docs.github.com/en/free-pro-team@latest/rest";

export default function fetchHandler({
  url,
  method,
  actionType,
  fileUpload,
  body,
  secure = true,
  shouldDispatch = true
}) {
  return async dispatch => {
    let headersData = fileUpload
      ? {}
      : {
          Accept: "application/json",
          "Content-Type": "application/json"
        };

    if (secure) {
      headersData = {
        ...headersData
      };
    }
    const promise = fetch(`${API_URL}${url}`, {
      method,
      headers: headersData,
      body
    });
    const response = await promise;
    return responseHandler(response, actionType, dispatch, shouldDispatch);
  };
}

async function responseHandler(response, actionType, dispatch, shouldDispatch) {
  let json;
  try {
    json = response.json && (await response.json());
  } catch (error) {
    console.log(`Response is not a json object`); // eslint-disable-line no-console
  }
  json = json || {};

  if (200 <= response.status && response.status < 300) {
    if (shouldDispatch) {
      dispatch({
        type: actionType,
        payload: json
      });
    }
    return json;
  } else {
    return { ...json, hasError: true };
  }
}
