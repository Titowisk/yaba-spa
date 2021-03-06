import { observer } from "mobx-react-lite";
import React from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { useStore } from "../../stores/store";

function TransactionsFooter() {
  const { transactionsStore } = useStore();
  const {
    pagesArray: pagination,
    currentPage,
    setCurrentPage,
  } = transactionsStore;
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="4">
          <Menu floated="right" pagination>
            <Menu.Item
              as="a"
              icon
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon name="chevron left" />
            </Menu.Item>
            {pagination.map((pageNumber) => (
              <Menu.Item
                as="a"
                key={pageNumber}
                onClick={(e) => setCurrentPage(pageNumber)}
                active={pageNumber === currentPage}
              >
                {pageNumber}
              </Menu.Item>
            ))}
            <Menu.Item
              as="a"
              icon
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pagination[pagination.length - 1]}
            >
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
}

export default observer(TransactionsFooter);
