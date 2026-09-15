import { AppointmentDialog } from './AppointmentDialog';
import { useAppointmentModal } from './appointmentModalContext';

export function AppointmentModalHost() {
  const { isOpen, close } = useAppointmentModal();
  return <AppointmentDialog open={isOpen} onClose={close} />;
}
