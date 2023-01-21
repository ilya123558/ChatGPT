import { ProviderRpcClient } from "everscale-inpage-provider";
import { useLogoutMutation, useSingInMutation, } from "@services/AuthService.api";
import { logoutFunction } from "@utils/auth/logout";
import { useLazyGetUserQuery } from "@services/UserService.api";

import CommonBtn from "../CommonBtn/CommonBtn";

const LogoutBtn: React.FC = () => {
  const provider = new ProviderRpcClient();

  const [logout] = useLogoutMutation();
  const [_, { data: singInData }] = useSingInMutation();
  const [getUser] = useLazyGetUserQuery()

  const onClickHandler = async () => {
    await logoutFunction({ provider, logout, user: singInData })
    await getUser(null)
  }

  return (
    <>
      <CommonBtn onClick={onClickHandler} text={'Log out'}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </CommonBtn>
    </>
  );
};

export default LogoutBtn;
