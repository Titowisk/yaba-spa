import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import { ITransaction } from '../../models/Transaction'

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  useEffect(() => {
    axios
      .post<ITransaction[]>('https://localhost:5001/api/transactions/DevGetByDate',
      {userId: 1, bankAccountId: 9, year: 2020, month: 1})
      .then(response => {
        console.log(response)
        setTransactions(response.data)
      })
  }, [])

  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Origin</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions.map((transaction: ITransaction) => (
            <Table.Row>
              <Table.Cell style={{textAlign: 'center'}}>
                {transaction.date}
              </Table.Cell>
              <Table.Cell>{transaction.origin}</Table.Cell>
              <Table.Cell style={{textAlign: 'center'}}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
              </Table.Cell>
              <Table.Cell style={{textAlign: 'center'}}>{transaction.category}</Table.Cell>
            </Table.Row>
          ))}

          {/* 
          <Table.Row>
            <Table.Cell>John</Table.Cell>
            <Table.Cell>No Action</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie</Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>Requires call</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill</Table.Cell>
            <Table.Cell>Denied</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row>
          <Table.Row warning>
            <Table.Cell>John</Table.Cell>
            <Table.Cell>No Action</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie</Table.Cell>
            <Table.Cell positive>Approved</Table.Cell>
            <Table.Cell warning>Requires call</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill</Table.Cell>
            <Table.Cell negative>Denied</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row> */}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}
