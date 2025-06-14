import React from "react";
import { Modal } from "../ui/modal";

interface InfoModalProps {
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  title,
  isOpen,
  children,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-11/12 md:w-3/5 xl:w-2/5"
      showCloseButton={false}
    >
      <div className="m-auto rounded-md bg-white dark:bg-black dark:text-white">
        <div className="w-full border-b px-10 py-5 text-xl font-bold dark:border-slate-500">
          {title}
        </div>
        <div className="w-full p-10">{children}</div>
        <div className="flex w-full justify-between border-t px-10 py-5 dark:border-slate-500">
          <button
            className="rounded bg-blue-500 px-6 py-2 text-sm text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-500 cursor-pointer"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
