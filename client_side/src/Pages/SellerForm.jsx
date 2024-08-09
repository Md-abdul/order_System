import { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,Text
} from "@chakra-ui/react";
import { DataContext } from "../Context/DataProvider";
import { Link } from "react-router-dom";

const SellerForm = () => {
  const [sellerQty, setSellerQty] = useState("");
  const [sellerPrice, setSellerPrice] = useState("");
  const { addSeller } = useContext(DataContext);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      sellerQty: Number(sellerQty),
      sellerPrice: Number(sellerPrice),
    };

    addSeller(data);

    toast({
      title: "Seller data submitted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setSellerQty("");
    setSellerPrice("");
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
        <Text textAlign={'center'} size={'md'} fontSize={'20px'}>Seller Form</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              value={sellerQty}
              onChange={(e) => setSellerQty(e.target.value)}
              placeholder="Enter quantity"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={sellerPrice}
              onChange={(e) => setSellerPrice(e.target.value)}
              placeholder="Enter price"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" width="full">
            Submit
          </Button>
        </VStack>
      </form>
      <Text textAlign={'center'} color={'blue'} marginTop={'5px'}>
        <Link to={"/buyerform"}>Seller Form</Link>
      </Text>
    </Box>
  );
};

export default SellerForm;
