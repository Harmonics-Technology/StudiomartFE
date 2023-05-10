import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { PrimaryTextarea } from "./PrimaryTextArea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    numberOfBedrooms: yup.string().required(),
});

interface CleaningModel {
    numberOfBedrooms?: string;
    reject: any;
}

function RejectReason({reject}: CleaningModel) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CleaningModel>({
        resolver: yupResolver(schema),
        mode: "all",
    });
    const onSubmit = async (data: CleaningModel) => {
        //
    };
    return (
        <Box>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <Text fontWeight="600" fontSize="24px" mb="0">
                    Reason
                </Text>
                <PrimaryTextarea<CleaningModel>
                    name="numberOfBedrooms"
                    error={errors.numberOfBedrooms}
                    placeholder=""
                    defaultValue=""
                    register={register}
                    h="10rem"
                />
                <Button
                    variant="solid"
                    height="3rem"
                    width="full"
                    bgColor="brand.100"
                    color="white"
                    disabled={!isValid}
                    mb="1rem"
                    onClick={reject}
                >
                    Submit
                </Button>
            {/* </form> */}
        </Box>
    );
}

export default RejectReason;
