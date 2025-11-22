import { 
  MessageSquare, 
  Search, 
  Users, 
  FileOutput
} from 'lucide-react';
import { NavItem, Evidence, Patient, DataRow } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'chat', label: 'Inicio / Chat', icon: MessageSquare },
  { id: 'evidence', label: 'Explorador de Evidencia', icon: Search },
  { id: 'patients', label: 'Pacientes (SIC)', icon: Users },
  { id: 'export', label: 'Exportar Data', icon: FileOutput },
];

export const MOCK_EVIDENCE: Evidence = {
  id: 'ev-101',
  title: "Eficacia de la Robótica en la Rehabilitación de la Parálisis Cerebral Infantil",
  authors: ["García A.", "Mendoza L.", "Smith J."],
  year: 2023,
  journal: "Journal of Pediatric Rehabilitation",
  type: "Meta-analysis",
  relevance: "Alta",
  abstract: "Un análisis sistemático de 15 ensayos controlados aleatorizados que demuestra mejoras significativas en la función motora gruesa..."
};

export const MOCK_PATIENT: Patient = {
  id: '1234',
  name: "Juan P.",
  diagnosis: "Hemiparesia Espástica Derecha",
  lastVisit: "14 Nov 2023",
  adherenceRate: 45,
  alerts: ["Baja adherencia detectada", "Faltó a 2 sesiones consecutivas"]
};

export const MOCK_ANONYMIZATION: DataRow[] = [
  {
    id: 'row-1',
    original: { nombre: "Juan Pérez González", rut: "12.345.678-9", diagnostico: "Parálisis Cerebral", direccion: "Av. Providencia 1234" },
    anonymized: { nombre: "J.P.G.", rut: "xxxxxxxx-9", diagnostico: "G80.9", direccion: "Comuna: Providencia" }
  },
  {
    id: 'row-2',
    original: { nombre: "María Soto Silva", rut: "21.987.654-K", diagnostico: "Espina Bífida", direccion: "Calle Los Alerces 555" },
    anonymized: { nombre: "M.S.S.", rut: "xxxxxxxx-K", diagnostico: "Q05.9", direccion: "Comuna: Ñuñoa" }
  },
  {
    id: 'row-3',
    original: { nombre: "Diego Tapia R.", rut: "15.444.333-2", diagnostico: "Distrofia Muscular", direccion: "Pje. El Roble 22" },
    anonymized: { nombre: "D.T.R.", rut: "xxxxxxxx-2", diagnostico: "G71.0", direccion: "Comuna: Maipú" }
  }
];