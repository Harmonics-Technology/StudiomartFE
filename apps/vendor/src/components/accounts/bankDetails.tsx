import { Button, Flex, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { VerifyPasswordModal } from "@components/Modals/VerifyPasswordModal";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BankAccountModel, Banks, StudioService } from "src/services";
import {
	DisabledInput,
	PrimaryInput,
	PrimarySelect,
	useNonInitialEffect,
} from "ui";
import * as yup from "yup";
import AccountContainer from "./AccountContainer";

const schema = yup.object().shape({
	accountName: yup.string().required(),
	accountNumber: yup.string().required(),
	bankCode: yup.string().required(),
});

interface bankProps {
	banks: Banks[];
	userId: string;
	bankAccounts: any;
}
export default function BankDetails({
	banks,
	bankAccounts,
	userId,
}: bankProps) {
	const { currentStudioId } = useContext(UserContext);

	const {
		handleSubmit,
		register,
		watch,
		getValues,
		setValue,
		formState: { errors, isSubmitting, isValid },
	} = useForm<BankAccountModel>({
		resolver: yupResolver(schema),
		mode: "all",
	});

	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const bankCode = watch("bankCode");
	const accountNumber = watch("accountNumber");
	const [isLoading, setIsLoading] = useState(false);
	//

	const getBankDetails = async () => {
		setIsLoading(true);
		axios
			.get(
				`https://nubapi.com/api/verify?account_number=${accountNumber}&bank_code=${bankCode}`,
				{
					headers: {
						Authorization:
							"Bearer 0NyayB1JYetBjxhDkKHLVzqY5e3XvNAzoaDkGJKZ5560888e",
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				setIsLoading(false);
				setValue("accountName", response.data.account_name);
				return;
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
				toast.error("An error occured", { className: "loginToast" });
			});
	};
	useNonInitialEffect(() => {
		getBankDetails();
	}, [bankCode && accountNumber?.length == 10]);

	const onSubmit = async (data: BankAccountModel) => {
		data.bankName = banks.filter((x: Banks) => x.code == data.bankCode)[0].name;
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
		<>
			<VerifyPasswordModal
				isOpen={isOpen}
				onClose={onClose}
				handleSubmit={handleSubmit(onSubmit)}
				userId={userId}
				submit={true}
			/>

			<AccountContainer bankAccounts={bankAccounts}>
				<form>
					<Stack gap="1rem">
						<PrimarySelect<BankAccountModel>
							label="Bank Name"
							name="bankCode"
							error={errors.bankCode}
							register={register}
							options={
								<>
									<option hidden selected>
										Select a bank
									</option>
									{banks.map((bank: Banks) => (
										<option value={bank.code as string} key={bank.id}>
											{bank.name}
										</option>
									))}
								</>
							}
						/>
						<PrimaryInput<BankAccountModel>
							label="Account Number"
							type="text"
							placeholder="Enter your account number"
							name="accountNumber"
							error={errors.accountNumber}
							register={register}
							defaultValue={""}
						/>
						<DisabledInput<BankAccountModel>
							label="Account Name"
							type="text"
							placeholder="Enter your account name"
							defaultValue={""}
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
			</AccountContainer>
		</>
	);
}
