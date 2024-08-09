import { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { DataContext } from "../Context/DataProvider";
import { Link } from "react-router-dom";

const BuyerForm = () => {
  const [buyerQty, setBuyerQty] = useState("");
  const [buyerPrice, setBuyerPrice] = useState("");
  const { addBuyer } = useContext(DataContext);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      buyerQty: Number(buyerQty),
      buyerPrice: Number(buyerPrice),
    };

    addBuyer(data);

    toast({
      title: "Buyer data submitted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setBuyerQty("");
    setBuyerPrice("");
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
        <Text textAlign={'center'} size={'md'} fontSize={'20px'}>Buyer Form</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              value={buyerQty}
              onChange={(e) => setBuyerQty(e.target.value)}
              placeholder="Enter quantity"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={buyerPrice}
              onChange={(e) => setBuyerPrice(e.target.value)}
              placeholder="Enter price"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" width="full">
            Submit
          </Button>
        </VStack>
      </form>

      <Text textAlign={'center'} color={'blue'} marginTop={'5px'}>
        <Link to={"/sellerform"}>Seller Form</Link>
      </Text>
    </Box>
  );
};

export default BuyerForm;
