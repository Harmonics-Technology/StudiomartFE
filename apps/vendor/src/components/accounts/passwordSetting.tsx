import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DisabledInput, PrimaryInput } from "ui";
// import { ChangePassword } from "src/services";
import { UserContext } from "@components/Context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UserService } from "src/services";
import * as yup from "yup";
import YupPassword from "yup-password";
import AccountContainer from "./AccountContainer";
YupPassword(yup);
interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
const schema = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup.string().password(),
});
export default function PasswordSetting() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setoldPassword] = useState<boolean>(false);
  const [newPassword, setnewPassword] = useState<boolean>(false);
  const [retypePassword, setretypePassword] = useState<boolean>(false);
  const { logout } = useContext(UserContext);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePassword>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data: ChangePassword) => {
    if (confirmPassword != data.newPassword) {
      toast.error("New password and Re-type password do not match", {
        className: "loginToast",
      });
      return;
    }
    try {
      const result = await UserService.updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (result.status) {
        toast.success(
          "Password successfully changed, you will be redirected to login again"
        );
        logout(
          "vendorToken",
          "vendor",
          `/login?from=${encodeURIComponent(router.asPath)}`
        );
        return;
      }
      toast.error(result.message as string);
    } catch (err: any) {
      toast.error(err.message || err.body.message, {
        className: "loginToast",
      });
    }
  };

  return (
    <AccountContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={0} gap="2rem">
          <PrimaryInput<ChangePassword>
            label="Old Password"
            type={oldPassword ? "text" : "password"}
            icon={true}
            name="oldPassword"
            error={errors.oldPassword}
            register={register}
            passwordVisible={oldPassword}
            changeVisibility={() => setoldPassword((prev) => !prev)}
            placeholder="Enter your old password"
            defaultValue={""}
          />
          <PrimaryInput<ChangePassword>
            label="New Password"
            type={newPassword ? "text" : "password"}
            icon={true}
            passwordVisible={newPassword}
            changeVisibility={() => setnewPassword((prev) => !prev)}
            placeholder="Enter your new password"
            name="newPassword"
            error={errors.newPassword}
            register={register}
            defaultValue={""}
          />
          <DisabledInput<ChangePassword>
            label="Re-Type New Password"
            type={retypePassword ? "text" : "password"}
            icon={true}
            passwordVisible={retypePassword}
            changeVisibility={() => setretypePassword((prev) => !prev)}
            placeholder="Enter your new password"
            defaultValue={""}
            disableLabel={false}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />

          <Box marginTop={30}>
            <HStack justify="flex-end">
              <Button
                width="100%"
                type="submit"
                backgroundColor="brand.100"
                color="white"
                isLoading={isSubmitting}
                h="3rem"
              >
                Update Password
              </Button>

              {/* <Button
             color="white"
             width="50%"
             type="submit"
           >
             Save
           </Button> */}
            </HStack>
          </Box>
        </Stack>
      </form>
    </AccountContainer>
  );
}
