import { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";
import { DataContext } from "../Context/DataProvider";

const CompletedTable = () => {
  const { completedTransactions } = useContext(DataContext);

  return (
    <Center>
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        p={5} 
        mt={10} 
        w="50rem" 
        ml={"20rem"}
      >
        <Heading size="md" mb={4} textAlign="center">
          Completed Transactions
        </Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Sr No</Th>
                <Th>Seller Quantity</Th>
                <Th>Seller Price</Th>
                <Th>Buyer Quantity</Th>
                <Th>Buyer Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {completedTransactions.length > 0 ? (
                completedTransactions.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.seller.sellerQty}</Td>
                    <Td>{item.seller.sellerPrice}</Td>
                    <Td>{item.buyer.buyerQty}</Td>
                    <Td>{item.buyer.buyerPrice}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="5" textAlign="center">
                    No completed transactions available
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};

export default CompletedTable;
