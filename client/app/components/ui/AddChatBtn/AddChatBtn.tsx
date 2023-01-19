import styles from "./AddChatBtn.module.scss";

interface IProps {
  onClickHandler: () => void, 
  children: React.ReactNode
}

const AddChatBtn: React.FC<IProps> = ({onClickHandler, children}) => {
  return (
    <>
      <button className={styles.btn} onClick={onClickHandler}>
        <div className={styles.inner}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
           {children}
        </div>
      </button>
    </>
  );
};

export default AddChatBtn;
