import React from "react";
import { Icon, Menu, Table } from "semantic-ui-react";

interface IProps {
  pagination: number[];
  currentPageNumber: number;
  setCurrentPage: (pageNumber: number) => void;
}

export const TransactionsFooter: React.FC<IProps> = ({
  pagination,
  currentPageNumber,
  setCurrentPage,
}) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="4">
          <Menu floated="right" pagination>
            <Menu.Item
              as="a"
              icon
              onClick={() => setCurrentPage(currentPageNumber - 1)}
              disabled={currentPageNumber === 1}
            >
              <Icon name="chevron left" />
            </Menu.Item>
            {pagination.map((pageNumber) => (
              <Menu.Item
                as="a"
                key={pageNumber}
                onClick={(e) => setCurrentPage(pageNumber)}
                active={pageNumber === currentPageNumber}
              >
                {pageNumber}
              </Menu.Item>
            ))}
            <Menu.Item
              as="a"
              icon
              onClick={() => setCurrentPage(currentPageNumber + 1)}
              disabled={currentPageNumber === pagination[pagination.length - 1]}
            >
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};
