import { ReactNode, useEffect, useState } from "react";
import { createPortal } from 'react-dom';

type ToastProps = {
  toast: { message: string | null, isSuccess: boolean | null };
  setToast: React.Dispatch<React.SetStateAction<{ message: string | null, isSuccess: boolean | null }>>;
}

type ToastPortalProps = {
  children: ReactNode;
}

const ToastPortal: React.FC<ToastPortalProps> = ({ children }) => {
  const target = document.querySelector("#root");
  return createPortal(children, target!);
};

const Toast: React.FC<ToastProps> = ({ toast, setToast }) => {
  const [id, setId] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [srOnlyText, setSrOnlyText] = useState("");
  const [svgPath, setSvgPath] = useState("");

  useEffect(() => {
    if (toast.isSuccess) {
      setId("toast-success");
      setIconColor("green");
      setSrOnlyText("Check icon");
      setSvgPath("M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z");
    } else {
      setId("toast-danger");
      setIconColor("red");
      setSrOnlyText("Error icon");
      setSvgPath("M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z");
    }
  }, [toast.isSuccess]);

  return (
    <ToastPortal>
      <div id={id} className="flex items-center w-full max-w-md p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed top-4 right-4 z-50" role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${iconColor}-500 bg-${iconColor}-100 rounded-lg dark:bg-${iconColor}-800 dark:text-${iconColor}-200`}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d={svgPath}/>
            </svg>
            <span className="sr-only">{srOnlyText}</span>
        </div>
        <div className="ml-3 text-sm font-normal">{toast.message}</div>
        <button type="button" onClick={() => setToast({ message: null, isSuccess: null })} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      </div>
    </ToastPortal>
  );
};

export default Toast;