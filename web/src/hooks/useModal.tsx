import { DocsCreate } from '@/components/docs/docs-create';
import { create } from 'zustand';

type ModalType = 'createTask';
type ModalProps = {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
};

export const useModal = create<ModalProps>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false }),
}));

export const ModalProvider = () => {
  const { type } = useModal();

  if (!type) {
    return null;
  }
  return <>{type === 'createTask' ? <DocsCreate /> : null}</>;
};
