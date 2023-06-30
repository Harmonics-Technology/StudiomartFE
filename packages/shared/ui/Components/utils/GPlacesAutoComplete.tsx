import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  Box,
  Input,
  Spinner,
  List,
  ListItem,
  HStack,
  Text,
  ListIcon,
  FormLabel,
} from "@chakra-ui/react";
import { MdShareLocation } from "react-icons/md";

interface IProps {
  onChange: (e: any) => void;
  onSelect: (e: any) => void;
  address: string;
  className?: string;
  hasLabel?: any;
}

export const GPlacesAutoComplete = ({
  onChange,
  onSelect,
  address,
  className,
  hasLabel,
}: IProps) => {
  const [loading] = useState();
  const renderFunc = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
  }: any) => (
    <Box pos="relative" w="full">
      {hasLabel && (
        <FormLabel textTransform="capitalize" mb="5px" fontSize=".8rem">
          {hasLabel}
        </FormLabel>
      )}
      <Input
        w="full"
        border="2px solid"
        borderColor="gray.300"
        borderRadius="0"
        placeholder=""
        fontSize=".9rem"
        className={className}
        {...getInputProps()}
      />
      <Box pos="absolute" bgColor="white" zIndex="999" w="full">
        {loading && <Spinner />}
        <List mt="1rem" w="full">
          {suggestions.map((suggestion: any) => (
            <ListItem
              {...getSuggestionItemProps(suggestion)}
              key={suggestion.id}
            >
              <HStack
                align="center"
                p=".5rem 1rem"
                w="full"
                fontSize=".8rem"
                fontWeight="500"
                cursor="pointer"
                borderBottom="1px solid #e5e5e5"
                spacing={"0"}
                _hover={{
                  bgColor: "brand.100",
                  color: "white",
                }}
              >
                <ListIcon as={MdShareLocation} color="red.400" />
                <Text noOfLines={1} mb="0">
                  {suggestion.description}
                </Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <PlacesAutocomplete
      value={address}
      onChange={(e: any) => onChange(e)}
      // debounce={500}
      onSelect={(e: any) => onSelect(e)}
      shouldFetchSuggestions={address.length > 3}
    >
      {renderFunc}
    </PlacesAutocomplete>
  );
};
