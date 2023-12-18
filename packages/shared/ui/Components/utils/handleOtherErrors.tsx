export default function handleOtherErrors(err: any, toast: any, router: any){
    if(err.status == 401){
        toast.error('Your session expired, Please login again', { className: "loginToast" });
        router.push('/login')
        return
      }
      if(err.status == 500){
        toast.error('An Error occured while processing your request, please try again', { className: "loginToast" });
        return
      }
      if(err.status == 404){
        toast.error('The resource you are trying to get cannot be found, please try another resource', { className: "loginToast" });
        return
      }
      toast.error(err?.body?.message || err?.message, {
        className: "loginToast",
      });
}