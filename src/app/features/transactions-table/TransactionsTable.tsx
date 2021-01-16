import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import { ITransaction } from '../../models/Transaction'

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [transactionPage, setTransactionPage] = useState<ITransaction[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(15) 
  const [pagination, setPagination] = useState<number[]>([])
  // transactionPage - store the current transactions shown on a page, when it changes it reloads the table
  // numberOfPages = 15
  // HandlePagination(transactions, numberOfPages) => transactionPage

  const GetTransactions = () => 
  {
    axios
      .post<ITransaction[]>('https://localhost:5001/api/transactions/DevGetByDate',
      {userId: 1, bankAccountId: 9, year: 2020, month: 1})
      .then(response => {
        setTransactions(response.data)
        CreatePages(response.data.length)
        HandlePagination(response.data)
      })
  }

  const HandlePagination = (transactionData: ITransaction[]) => 
  {
    let totalOfPages = Math.ceil(transactionData.length / pageSize) 
    let startIndex = (currentPage - 1) * pageSize 
    let endIndex = (currentPage - totalOfPages) * pageSize 

    // console.log("HandlePagination")
    // console.log(`startIndex: ${startIndex}`)
    // console.log(`endIndex: ${endIndex}`)

    if(endIndex === 0){
      setTransactionPage(transactionData.slice(startIndex))
      return
    }


    setTransactionPage(transactionData.slice(startIndex, endIndex))
  }

  const CreatePages = (dataLength: number) => {
    // console.log("Create pages")
    // console.log(`transactions.length: ${dataLength}`)
    // console.log(`pageSize: ${pageSize}`)
    let totalOfPages = dataLength / pageSize
    let pageArray = []
    for (let index = 1; index < totalOfPages + 1; index++) {
      pageArray.push(index);
    }

    setPagination(pageArray)
  }

  useEffect(() => {
    if(transactions.length === 0){
      GetTransactions()
    }
    else {
      HandlePagination(transactions)
    }
    console.log(`useEffect`)
    console.log(`pagination: ${pagination[pagination.length - 1]}`)
    // console.log(`transactions: ${transactions}`)
    // console.log(`pagintransactionPageation: ${transactionPage}`)
  }, [currentPage])

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
          {transactionPage.map((transaction: ITransaction) => (
            <Table.Row key={transaction.id}>
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
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  <Icon name='chevron left' />
                </Menu.Item>
                  {pagination.map((pageItem) => (
                    <Menu.Item as='a' key={pageItem} onClick={(e) => setCurrentPage(pageItem)}>{pageItem}</Menu.Item>
                  ))}
                <Menu.Item as='a' icon onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pagination[pagination.length - 1]}>
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
