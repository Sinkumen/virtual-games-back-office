const {
  default: ToastContext,
} = require("@/contexts/ToastContext/ToastContext");
const { useContext } = require("react");

const useToast = () => {
  const { showMessage } = useContext(ToastContext);
  return { showMessage };
};

export default useToast;
