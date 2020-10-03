import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import SearchModal from "../modal/SearchModal";
import NoData from "../NoData";
import "./styles.css";

const Dashboard = () => {
  const [gitRepoList, setGitRepoList] = useState([]);

  useEffect(() => {}, []);
  console.log("**********************", gitRepoList);
  return (
    <div className="wrapping-container p-5">
      <Card>
        <CardHeader className="text-left bookmark-head">
          <h3>Bookmarks</h3>
          <SearchModal
            setGitRepoList={setGitRepoList}
            gitRepoList={gitRepoList}
          />
        </CardHeader>
        <CardBody>
          {gitRepoList && gitRepoList && gitRepoList.length ? (
            gitRepoList.map((repo, index) => {
              return (
                <div className="repo border mb-3 w-100 px-4 py-1 rounded d-flex justify-content-between align-items-center">
                  <span> {index + 1} </span>
                  <a href={repo?.url}> {repo?.name} </a>
                  <img alt="bookmark" src="/bookmark.png" />
                </div>
              );
            })
          ) : (
            <NoData />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
