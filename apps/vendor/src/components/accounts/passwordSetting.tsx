import React, { useContext, useState } from "react";
import { Flex, Box, Button, HStack, Stack } from "@chakra-ui/react";
import { DisabledInput, PrimaryInput } from "ui";
// import { ChangePassword } from "src/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AccountSideBar from "@components/accounts/AccountSideBar";
import { UserService } from "src/services";
import { UserContext } from "@components/Context/UserContext";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import YupPassword from "yup-password";
YupPassword(yup);
interface ChangePassword {password:string}
const schema = yup.object().shape({
  password: yup.string().password(),
});
export default function PasswordSetting() {
  const [showAlert, setShowAlert] = useState({ status: false, content: "" });
  const [confirmPassword, setConfirmPassword] = useState ("")
  const [oldPassword, setoldPassword] = useState<boolean>(false);
  const [newPassword, setnewPassword] = useState<boolean>(false);
  const [retypePassword, setretypePassword] = useState<boolean>(false);
  const {logout} = useContext(UserContext)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePassword>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data: ChangePassword) => {
    if (confirmPassword != data.password) {
      toast.error('New password and Re-type password do not match')
      return
    }
    try {
      const result = await UserService.updatePassword({password: data.password})
      if(result.status) {
        setShowAlert({
          status:true,
          content: "Password successfully changed, you will be redirected to login again",
        })
      logout ("vendorToken", "vendor", `/login?from=${encodeURIComponent(router.asPath)}`)
      return 
      }
      setShowAlert({
        status:true,
        content: result.message as string
      })
    } catch (err: any) {
      toast.error(err.message || err.body.message)
    }
  }

  return (
    <Stack direction="row" spacing={6} width='80%' my='3rem' mx='3rem' bgColor='white' p='5rem'>
      <AccountSideBar />
      <Box w="55%" fontFamily='"DM Sans", sans-serif'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <DisabledInput<ChangePassword>
              label="Old Password"
              type={oldPassword ? "text" : "password"}
              icon={true}
              passwordVisible={oldPassword}
              changeVisibility={() => setoldPassword(prev => !prev)}
              placeholder="Enter your old password"
              defaultValue={""}
              disableLabel={false}
            />
            <PrimaryInput<ChangePassword>
              label="New Password"
              type={newPassword ? "text" : "password"}
                  icon={true}
                  passwordVisible={newPassword}
                  changeVisibility={() => setnewPassword(prev => !prev)}
              placeholder="Enter your new password"
              name="password"
              error={errors.password}
              register={register}
              defaultValue={""}
            />
            <DisabledInput<ChangePassword>
              label="Re-Type New Password"
              type={retypePassword ? "text" : "password"}
                  icon={true}
                  passwordVisible={retypePassword}
                  changeVisibility={() => setretypePassword(prev => !prev)}
              placeholder="Enter your new password"
              defaultValue={""}
              disableLabel={false}
              onChange={(e:any) => setConfirmPassword (e.target.value)}
            />

            <Box marginTop={30}>
              <HStack>
                <Button
                  width="50%"
                  type="submit"
                  backgroundColor="brand.100"
                  color="white"
                  isLoading={isSubmitting}
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
      </Box>
    </Stack>
  );
}
