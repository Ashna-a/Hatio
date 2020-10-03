import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Input,
} from "reactstrap";

import NoData from "../NoData";

const SearchModal = ({ className, setGitRepoList, gitRepoList }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [byUser, setByUser] = useState(false);
  const [byRepo, setByRepo] = useState(false);

  const searchInput = useRef();

  const toggle = () => setModal(!modal);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const searchByRepo = () => {
    console.log("searchByRepo");
    fetch(`https://api.github.com/repositories`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          console.log(
            "^^^^^^^^^^^^",
            result &&
              result.length &&
              result.filter((item) => searchInput.current.value === item.name)
          );
          setSearchResult(
            result &&
              result.length &&
              result.filter((item) => searchInput.current.value === item.name)
          );
        },
        (error) => {}
      );
  };

  const searchByUser = () => {
    console.log("searchByUser");
    const username = searchInput.current.value;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then(
        (result) => {
          // setGitRepoList([...gitRepoList, result]);
          setSearchResult(result);
          // handleClose();
        },
        (error) => {}
      );
  };

  console.log("***********a", searchResult);

  const handleSearch = () => {
    byUser ? searchByUser() : searchByRepo();
  };

  const handleClose = () => {
    toggle();
    setSearchResult(null);
    setSelectedList([]);
    setByRepo(false);
    setByUser(false);
  };

  const handleSelect = (e, item) => {
    // eslint-disable-next-line no-unused-expressions
    e.target.checked
      ? setSelectedList([...selectedList, item])
      : setSelectedList(selectedList.filter((repo) => repo.id !== item.id));
  };

  const addBookmark = () => {
    setGitRepoList([...gitRepoList, ...selectedList]);
    handleClose();
  };
  return (
    <div>
      <Button className="" onClick={() => handleClose()}>
        +
      </Button>
      <Modal isOpen={modal} toggle={() => handleClose()} className={className}>
        <ModalHeader toggle={() => handleClose()}>Modal title</ModalHeader>
        <ModalBody>
          <div className="mb-3 d-flex align-items-center">
            <label className="mr-3">Search Github Repo by</label>
            {byUser || byRepo ? (
              <div>
                <input
                  ref={searchInput}
                  className="login-input"
                  placeholder={byUser ? "Search by user" : "Search by name"}
                />
                <Button className="search-btn" onClick={() => handleSearch()}>
                  <img alt="" src="/Search.webp" />
                </Button>
              </div>
            ) : (
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret> Search Github Repo by </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setByUser(!byUser)}>
                    Users
                  </DropdownItem>
                  <DropdownItem onClick={() => setByRepo(!byRepo)}>
                    Repo Name
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>

          <Table>
            <thead>
              <th> Sl.No </th>
              <th> Name </th>
              <th> Select </th>
            </thead>
            <tbody>
              {searchResult && searchResult.length ? (
                searchResult.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>
                      <Input
                        type="checkbox"
                        onChange={(e) => handleSelect(e, item)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => addBookmark()}>
            Add
          </Button>
          <Button color="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SearchModal;
