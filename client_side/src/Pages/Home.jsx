import { Flex } from "@chakra-ui/react";
import CompletedTable from "../Components/CompletedTable";
import DataTables from "../Components/DataTable";


const Home = () => {
  return (
    <div>
      <DataTables />

      <Flex>
        <CompletedTable />
      </Flex>
    </div>
  );
};

export default Home;
