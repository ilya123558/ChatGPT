import AddChatBtn from "@components/ui/AddChatBtn/AddChatBtn";
import { ProviderRpcClient } from "everscale-inpage-provider";
import {
  useLogoutMutation,
  useSingInMutation,
} from "@services/AuthService.api";
import { useEffect, useState } from "react";
import { signInFunction } from "@utils/auth/signIn";
import { logoutFunction } from "@utils/auth/logout";

const AuthBtn: React.FC = () => {
  const provider = new ProviderRpcClient();

  const [signIn, { data: singInData, error: singInError }] =
    useSingInMutation();
  const [logout, { data: logoutData, error: logoutError }] =
    useLogoutMutation();

  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  !provider.hasProvider() && setErrorMessage("Нет расширения");

  useEffect(() => {
    if (singInError) {
      setErrorMessage(() => "error singInData");
      return;
    }
    console.log(singInData);

    setLogin(() => true);
  }, [singInData, singInError]);

  useEffect(() => {
    if (logoutError) {
      setErrorMessage(() => "error logoutData");
      return;
    }
    console.log(logoutData);
    setLogin(() => false);
  }, [logoutData, logoutError]);
  console.log(singInData);
  return (
    <>
      {/* <div className='ErrorMessage'>{errorMessage}</div> */}
      <AddChatBtn
        onClickHandler={
          login
            ? () => logoutFunction({ provider, logout, user: singInData })
            : () => signInFunction({ provider, setErrorMessage, signIn })
        }
      >
        {login ? "Sign out" : "Sign in with Ever Wallet"}
      </AddChatBtn>
    </>
  );
};

export default AuthBtn;
