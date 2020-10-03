import { HOME } from "./types";
import fetchHandler from "../../utils/fetchResponseHandler";

export const getGitRepoList = () => {
    console.log("***********");
  const fetchOptions = {
    url: ` /repos`,
    method: "GET",
    actionType: HOME.GET_GIT_REPO
  };

  return fetchHandler(fetchOptions);
};
