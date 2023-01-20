import { ProviderRpcClient } from "everscale-inpage-provider";
import { useLogoutMutation, useSingInMutation, } from "@services/AuthService.api";
import { logoutFunction } from "@utils/auth/logout";
import { useLazyGetUserQuery } from "@services/UserService.api";

import styles from './LogoutBtn.module.scss'

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
      <button className={styles.logoutBtn} onClick={onClickHandler} >
        Sign out
      </button>
    </>
  );
};

export default LogoutBtn;
