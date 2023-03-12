import {  Box, Button, Text, Flex, Spacer, HStack, Select, Image, Grid, Heading, Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, FormControl, FormLabel, Input, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import TopPage from "src/utils/TopPage";
import {  AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import React from "react";

export const MainDashboard = () => {

  const size = ["xs"]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    
      <>
      <Modal
          size={size}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Services</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Services Name</FormLabel>
                <Input ref={initialRef} placeholder='Bridal Make-up' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Services Category</FormLabel>
                <Select placeholder='Select category'>
                  <option>Makeup studio</option>
                  <option>Gele studio</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Services Price</FormLabel>
                <Input placeholder='Enter Price' />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Details</FormLabel>
                <Input placeholder='Enter details' />
              </FormControl>
            </ModalBody>
  
          <ModalFooter justifyContent="center" gap="2">
          <Button onClick={onClose} w="8rem" >Cancel</Button>
              <Button colorScheme='blue'  w="8rem">
                List Service
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    
    

    <Box>
    <Box>
    <TopPage
        page={"Good Day Adebayo!"}
        details={"Welcome to your dashboard"}
            right={true}
        clickFunction={onOpen}
      />
    </Box>
      <Flex bgColor="blue"  m="2rem" borderRadius="xl">
        <Box w="70%" >
        <Heading fontSize="3xl" color="white" pl="2rem" py="2rem" >Life is much easier with <br />
        with our mobile app</Heading>
          <HStack pl="2rem" pb="2rem">
            <Image  boxSize='80px'
  src='#'  alt='app store' />
            <Image  boxSize='80px'
    objectFit='fill' src='#'alt='playstore' />
          </HStack>
        </Box>
        <Box >
        <Image  boxSize='100px'
    objectFit='cover' src='#' alt='image' />
        </Box>
      </Flex>

      <Flex >
        <Box>
        <Text fontSize="1rem" m="2rem" fontWeight="600">Orders Track</Text>
        </Box>
        <Spacer />
        <Box>
        <Text fontSize="1rem" m="2rem" ml="4rem" fontWeight="600" >Top Services</Text>
        </Box>
        <Spacer />
        <Box>
          <Flex my="2rem" mr="2rem">
           
           <Box h="23px" bgColor="#636363" w="23px" borderRadius="full"  _hover={{
          bgColor: "black",
          transition: ".5s ease",
        }} >
              <AiOutlineArrowLeft size="20px" color="white" />
            </Box>
            <Spacer m="5px"/>
            <Box h="23px" bgColor="#636363" w="23px" borderRadius="full"  _hover={{
          bgColor: "black",
          transition: ".5s ease",
        }} >
          <AiOutlineArrowRight size="20px" color="white"/>
          </Box>
          </Flex>
        </Box>
        </Flex >
        <Flex>
        <Grid templateColumns='repeat(4, 1fr)' mx="2rem" w="45%" bgColor="white" h="7rem" >
          <HStack borderRight="1px solid black" h="12" mt="2rem" >
        <Box pl="4" pt="auto" ml="2"><Text as='b' pl="3" >4</Text>
              <Text fontSize="8px">Total Orders</Text></Box>
          </HStack>
          
          <HStack borderRight="1px solid black"  h="12" mt="2rem" >
        <Box pl="4" pt="auto" ml="2"><Text as='b'pl="3">2</Text>
              <Text fontSize="8px">Active Orders</Text></Box>
          </HStack>
          <HStack borderRight="1px solid black"  h="12" mt="2rem" >
        <Box pl="4" pt="auto" ml="2"><Text as='b' pl="3">1</Text>
            <Text fontSize="8px">In Progress</Text></Box>
          </HStack>
          <HStack >
        <Box pl="4" pt="auto"  ml="2"><Text as='b' pl="3">1</Text>
              <Text fontSize="8px">Canceled</Text></Box>  
            </HStack>
          </Grid>



        
          <Grid templateColumns='repeat(4, 1fr)' mx="2rem" w="50%"  h="7rem" >
            <HStack spacing='20px'>
            <Box w='9.5rem' h='8rem' bg='white' borderRadius="md" >
            <Image  h="5rem"  
            objectFit='cover' src='#' alt='image'  />
                <Box h="4rem" pl="2">
                  <Grid mt=".5">
                  <Text as="b">
              Bridal Makeover
                    </Text>
                    <Text >
              3 Orders
            </Text>
                  </Grid>
           
                </Box>
              </Box>
              
              <Box w='9.5rem' h='8rem' bg='white' borderRadius="md" >
            <Image  h="5rem"  
            objectFit='cover' src='#' alt='image'  />
                <Box h="4rem" pl="2">
                  <Grid mt=".5">
                  <Text as="b">
              Bridal Makeover
                    </Text>
                    <Text >
              3 Orders
            </Text>
                  </Grid>
           
                </Box>
              </Box>

              <Box w='9.5rem' h='8rem' bg='white' borderRadius="md" >
            <Image  h="5rem"  
            objectFit='cover' src='#' alt='image'  />
                <Box h="4rem" pl="2">
                  <Grid mt=".5">
                  <Text as="b">
              Bridal Makeover
                    </Text>
                    <Text >
              3 Orders
            </Text>
                  </Grid>
           
                </Box>
              </Box>
              
            </HStack>
          </Grid>



          </Flex>
      <Flex >
        <Box>
      <Flex m="2rem" >
        <Text fontSize="1rem" fontWeight="600">Services</Text>
        <Text color="blue" pl="4" fontWeight="300" cursor="default" 
        > view all</Text>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Flex my="2rem" mr="2rem">
           
           <Box h="23px" bgColor="#636363" w="23px" borderRadius="full"  _hover={{
          bgColor: "black",
          transition: ".5s ease",
        }} >
              <AiOutlineArrowLeft size="20px" color="white" />
            </Box>
            <Spacer m="5px"/>
            <Box h="23px" bgColor="#636363" w="23px" borderRadius="full"  _hover={{
          bgColor: "black",
          transition: ".5s ease",
        }} >
          <AiOutlineArrowRight size="20px" color="white"/>
          </Box>
          </Flex>
        </Box>
      </Flex>
      <Grid templateColumns='repeat(3, 1fr)' w="95%" ml="2rem" >
        <Box  mr="1" >
        <Image  boxSize='170px'  w="285px" 
            objectFit='cover' src='#' alt='image' bgColor="white" />
          <Box h="150px" w="280px">
            <Text mt="1">
              Bridal Makeover
            </Text>
            <Text mt="-2" fontSize="10px" mr="2">Here at house of Ewa, we offer full bridal makeover to make you stand out
              on your big day at pocket friendly rate. You can be rest assured and trust us to do a very good job</Text>
            <Button w="100%"  bgColor="blue" cursor="default" colorScheme="blue">Take service offline</Button>
            </Box>
        </Box>
        
        <Box  mr="2">
        <Image  boxSize='170px' w="285px" 
            objectFit='cover' src='#' alt='image'  bgColor="white" />
          <Box h="150px" w="280px">
            <Text mt="1">
              Bridal Makeover
            </Text>
            <Text mt="-2" fontSize="10px" mr="2">Here at house of Ewa, we offer full bridal makeover to make you stand out
              on your big day at pocket friendly rate. You can be rest assured and trust us to do a very good job</Text>
            <Button w="100%" bgColor="blue"  cursor="default" colorScheme="blue">Take service offline</Button>
            </Box>
        </Box>

        <Box  >
        <Image  boxSize='170px' w="285px" 
            objectFit='cover' src='#' alt='image' bgColor="white"/>
          <Box h="150px" w="280px">
            <Text mt="1">
              Bridal Makeover
            </Text>
            <Text mt="-2" fontSize="10px" mr="2">Here at house of Ewa, we offer full bridal makeover to make you stand out
              on your big day at pocket friendly rate. You can be rest assured and trust us to do a very good job</Text>
            <Button w="100%" bgColor="blue"  cursor="default" colorScheme="blue">Take service offline</Button>
            </Box>
        </Box>
      </Grid>
      </Box>
      </>
  );
};
