import {
  MessageSquare,
  Search,
  Users,
  FileOutput
} from 'lucide-react';
import { NavItem, Evidence, Patient, DataRow } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'chat', label: 'Inicio / Chat', icon: MessageSquare },
  { id: 'doctor-chat', label: 'Chat Médico', icon: Users },
  { id: 'evidence', label: 'Explorador de Evidencia', icon: Search },

  { id: 'export', label: 'Exportar Data', icon: FileOutput },
];

export const MOCK_PATIENT: Patient = {
  id: '1234',
  name: "Juan P.",
  diagnosis: "Hemiparesia Espástica Derecha",
  lastVisit: "14 Nov 2023",
  adherenceRate: 45,
  alerts: ["Baja adherencia detectada", "Faltó a 2 sesiones consecutivas"]
};