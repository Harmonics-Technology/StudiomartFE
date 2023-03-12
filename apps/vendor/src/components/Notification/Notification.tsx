import React from 'react';
import { Box, Container, Avatar, Badge, Text, Flex, SimpleGrid , Spacer, HStack, Button } from "@chakra-ui/react";
import NotificationTop from 'src/utils/NotificationTop';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const Notification = () => {
  return (
      <Box>
          <Box>
    <NotificationTop
        page={"Notification"}
        details={"Welcome to your dashboard"}
            right={true}
      />
          </Box>
          <Box w="90%" my="6">
       
     <SimpleGrid  ml="6rem" bg='white'>
                  <Box  height='100px' borderBottom="1px solid black">
  <Box ml='3'>
                          <Flex fontWeight='bold' alignItems="center" >
                              
     <Avatar src='#' mt="3"/>
                              <Text mt="4" ml="4">
Folashade has created a booking and waiting for your approval. This booking need to be confirmed withing 48 hours. View

</Text>
                              <Spacer />
                              <Box marginRight="4" mt="6">
                                  <BsThreeDotsVertical />
                                    <Text fontSize="10px">14h ago</Text>
                                  
                                  </Box>
                          </Flex>
                         
  </Box>        
  </Box>
   {/* <Box bg="white" my="8" mx="8" h="45rem" > */}
  <Box height='100px' borderBottom="1px solid black">
  <Box ml='3'>
                          <Flex fontWeight='bold' alignItems="center" >
                              
     <Avatar src='#' mt="3"/>
                              <Text mt="4" ml="4">
Folashade has created a booking and waiting for your approval. This booking need to be confirmed withing 48 hours. View

</Text>
                              <Spacer />
                              <Box marginRight="4" mt="6">
                                  <BsThreeDotsVertical />
                                    <Text fontSize="10px">14h ago</Text>
                                  
                                  </Box>
                          </Flex>
                         
  </Box>        
          </Box>
          
                  <Box  height='100px' borderBottom="1px solid black">
  <Box ml='3'>
                          <Flex fontWeight='bold' alignItems="center" >
                              
     <Avatar src='#' mt="3"/>
                              <Text mt="4" ml="4">
Folashade has created a booking and waiting for your approval. This booking need to be confirmed withing 48 hours. View

</Text>
                              <Spacer />
                              <Box marginRight="4" mt="6">
                                  <BsThreeDotsVertical />
                                    <Text fontSize="10px">14h ago</Text>
                                  
                                  </Box>
                          </Flex>
                         
  </Box>        
          </Box>
          
                  <Box height='100px' borderBottom="1px solid black">
  <Box ml='3'>
                          <Flex fontWeight='bold' alignItems="center" >
                              
     <Avatar src='#' mt="3"/>
                              <Text mt="4" ml="4">
Folashade has created a booking and waiting for your approval. This booking need to be confirmed withing 48 hours. View

</Text>
                              <Spacer />
                              <Box marginRight="4" mt="6">
                                  <BsThreeDotsVertical />
                                    <Text fontSize="10px">14h ago</Text>
                                  
                                  </Box>
                          </Flex>
                         
  </Box>        
          </Box>
          <Box  height='100px' borderBottom="1px  black">
  <Box ml='3'>
                          <Flex fontWeight='bold' alignItems="center" >
                              
     <Avatar src='#' mt="3"/>
                              <Text mt="4" ml="4">
Folashade has created a booking and waiting for your approval. This booking need to be confirmed withing 48 hours. View

</Text>
                              <Spacer />
                              <Box marginRight="4" mt="6">
                                  <BsThreeDotsVertical />
                                    <Text fontSize="10px">14h ago</Text>
                                  
                                  </Box>
                          </Flex>
                         
  </Box>        
          </Box>
          
          
</SimpleGrid>
          </Box>
          <HStack justifyContent="center">
          <SimpleGrid minChildWidth='10px' spacing='2' w="40%" fontWeight="bold" justifyContent="center" >
  <Button  bg='white' height='30px' cursor="default" >Prev</Button>
  <Button  bg='white' height='30px' cursor="default">1</Button>
  <Button  bg='white' height='30px'cursor="default"> 2</Button>
  <Button  bg='white' height='30px' cursor="default">3</Button>
  <Button bg='white' height='30px' cursor="default">4</Button>
  <Button  height='30px' cursor="default" colorScheme='blue'><Flex>Next <IoIosArrowForward /></Flex></Button>
              </SimpleGrid>
              </HStack>
    </Box>
    
     

  )
}

export default Notification