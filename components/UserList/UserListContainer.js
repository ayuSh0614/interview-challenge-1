import React from 'react';
import UserList from './UserList'; 
import useUserData from '../hooks/useUserData'; 

const UserListContainer = () => {
  const {
    users,
    columnFields,
    handleOnSearch,
    handleSort,
    sortColumn,
    sortDirection
  } = useUserData(); 

  return (
    <UserList
      users={users}
      columnFields={columnFields}
      handleOnSearch={handleOnSearch}
      handleSort={handleSort}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
    />
  );
};

export default UserListContainer;
