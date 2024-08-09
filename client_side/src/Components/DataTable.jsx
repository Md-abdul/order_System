import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Heading,
  Spinner,
  Center,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { DataContext } from "../Context/DataProvider";

const DataTable = ({ title, data }) => {
  if (!data) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
      <Heading size="md" mb={4} textAlign="center">
        {title}
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Sr No</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <Tr key={item._id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.buyerQty || item.sellerQty}</Td>
                  <Td>{item.buyerPrice || item.sellerPrice}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="3" textAlign="center">
                  No data available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const DataTables = () => {
  const { buyers, sellers } = useContext(DataContext);

  useEffect(() => {
    //
  }, [buyers, sellers]);

  return (
    <Container maxW="container.xl" mt={10}>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
        <DataTable title="Buyer Data" data={buyers} />
        <DataTable title="Seller Data" data={sellers} />
      </SimpleGrid>
    </Container>
  );
};

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default DataTables;
