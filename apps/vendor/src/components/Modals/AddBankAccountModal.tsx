import {
	Box,
	Button,
	Flex,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
	BankAccountModel,
	BankResponse,
	StudioService,
	UtilityService,
} from "src/services";
import {
	DisabledInput,
	ModalWrapper,
	PrimaryInput,
	PrimarySelect,
	useNonInitialEffect,
} from "ui";
import * as yup from "yup";
import { VerifyPasswordModal } from "./VerifyPasswordModal";
import { useDebouncedCallback } from "use-debounce";

const schema = yup.object().shape({
	accountName: yup.string().required(),
	accountNumber: yup.string().required(),
	bankCode: yup.string().required(),
});

interface bankProps {
	close: any;
	open: any;
	banks: BankResponse[];
	userId: string;
}

export default function AddBankAccountModal({
	banks,
	close,
	open,
	userId,
}: bankProps) {
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		trigger,
		formState: { errors, isSubmitting, isValid },
	} = useForm<BankAccountModel>({
		resolver: yupResolver(schema),
		mode: "all",
	});

	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentStudioId } = useContext(UserContext);
	const bankCode = watch("bankCode");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	//

	const getBankDetails = async (value: string) => {
		setIsLoading(true);
		setError("");

		await UtilityService.postApiUtilityValidateAccount({
			requestBody: {
				accountNumber: value,
				bankCode,
			},
		})
			.then((response) => {
				console.log({ response });
				if (response?.status) {
					setValue("accountName", (response.data as any)?.accountName);
					setValue("accountNumber", (response.data as any)?.accountNumber);
					trigger();
					return;
				}
				setError(response?.message as string);
			})
			.catch((error) => {
				console.error(error);
				toast.error(error?.message || "An error occured", {
					className: "loginToast",
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const getBankInfo = useDebouncedCallback((value) => {
		setError("");
		setValue("accountName", "");
		if (bankCode && value?.length == 10) {
			getBankDetails(value);
		}
	}, 500);

	const onSubmit = async (data: BankAccountModel) => {
		data.bankName = banks.filter(
			(x: BankResponse) => x.code == data.bankCode
		)[0].name;
		data.studioId = currentStudioId;
		try {
			const result = await StudioService.addBankAccount({ requestBody: data });
			if (result.status) {
				toast.success(
					"Your information has been saved successfully and will reload shortly"
				);
				router.reload();
				return;
			}
			toast.error(result.message as string);
			return;
		} catch (error: any) {
			toast.error(error?.body?.message || error?.message, {
				className: "loginToast",
			});
		}
	};

	return (
		<ModalWrapper
			isOpen={open}
			onClose={close}
			title="Add Bank Account"
			w="30%"
		>
			<Box>
				<form>
					<Stack gap="1rem">
						<PrimarySelect<BankAccountModel>
							label="Bank Name"
							name="bankCode"
							error={errors.bankCode}
							register={register}
							options={banks.map((bank: BankResponse) => (
								<option value={bank.code as string} key={bank.id}>
									{bank.name}
								</option>
							))}
						/>
						<DisabledInput<BankAccountModel>
							label="Account Number"
							type="text"
							placeholder="Enter your account number"
							defaultValue={""}
							icon={isLoading}
							onChange={(e: any) => getBankInfo(e.target.value)}
							isSpin
						/>
						{error && (
							<Text color="red" fontSize=".8rem">
								{error}
							</Text>
						)}
						{/* <PrimaryInput<BankAccountModel>
              label="Account Name"
              type="text"
              placeholder="Enter your account name"
              name="accountName"
              error={errors.accountName}
              register={register}
              defaultValue={""}
            /> */}
						<DisabledInput<BankAccountModel>
							label="Account Name"
							type="text"
							placeholder="Enter your account name"
							value={watch("accountName") || ""}
							readonly={true}
							icon={isLoading}
							isSpin
						/>
						<Flex justifyContent="flex-end" w="full">
							<Button
								isDisabled={!isValid}
								bgColor="brand.100"
								color="white"
								width="100%"
								type="button"
								h="3rem"
								onClick={onOpen}
								isLoading={isSubmitting}
							>
								Add Bank Account
							</Button>
						</Flex>
					</Stack>
				</form>
			</Box>
			<VerifyPasswordModal
				isOpen={isOpen}
				onClose={onClose}
				handleSubmit={handleSubmit(onSubmit)}
				userId={userId}
				submit={true}
			/>
		</ModalWrapper>
	);
}
