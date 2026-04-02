import type { Permission } from "@/features/auth/models/Permissions";
import { Permissions } from "@/features/auth/models/Permissions";
import type { ReactNode } from "react";

// Importações de ícones MUI (já usados na HomePage atual)
import ReportProblemIcon from "@mui/icons-material/ReportProblem"; // Ocorrências
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Atrasos
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // Espaços
// import VideocamIcon from "@mui/icons-material/Videocam"; // Mídias
import FactCheckIcon from "@mui/icons-material/FactCheck"; // Frequência
import PeopleIcon from "@mui/icons-material/People"; // Usuários
import SchoolIcon from "@mui/icons-material/School"; // Turmas
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Central Pedagógica
import EventIcon from "@mui/icons-material/Event"; // Eventos

export interface FeatureCardConfig {
  icon: ReactNode;
  title: string;
  description: string;
  to: string;
  /**
   * O card aparece se o usuário tiver AO MENOS UMA das permissões listadas.
   * Se vazio, o card aparece para todos os usuários autenticados.
   */
  requiredPermissions: Permission[];
}

export const FEATURE_CARDS: FeatureCardConfig[] = [
  {
    icon: <ReportProblemIcon className="text-accent" />,
    title: "Ocorrências",
    description: "Visualize, registre e gerencie ocorrências disciplinares.",
    to: "/ocorrencias",
    requiredPermissions: [
      Permissions.OCCURRENCES_CREATE,
      Permissions.OCCURRENCES_VIEW_ALL,
      Permissions.OCCURRENCES_VIEW_OWN,
      Permissions.OCCURRENCES_VIEW_CHILD,
    ],
  },
  {
    icon: <AccessTimeIcon className="text-accent" />,
    title: "Atrasos",
    description: "Controle e registre atrasos dos alunos.",
    to: "/atrasos",
    requiredPermissions: [
      Permissions.DELAYS_CREATE,
      Permissions.DELAYS_APPROVE,
      Permissions.DELAYS_VIEW_ALL,
      Permissions.DELAYS_VIEW_OWN,
      Permissions.DELAYS_VIEW_CHILD,
      Permissions.DELAYS_VIEW_OWN_CLASSROOM,
    ],
  },
  {
    icon: <EventIcon className="text-accent" />,
    title: "Horários",
    description: "Consulte e gerencie os horários das turmas.",
    to: "/horarios",
    requiredPermissions: [
      Permissions.SCHEDULES_VIEW,
      Permissions.SCHEDULES_MANAGE,
    ],
  },
  {
    icon: <PeopleIcon className="text-accent" />,
    title: "Usuários",
    description: "Gerencie alunos, professores e responsáveis.",
    to: "/usuarios",
    requiredPermissions: [Permissions.USER_VIEW_ALL, Permissions.USER_CREATE],
  },
  {
    icon: <SchoolIcon className="text-accent" />,
    title: "Turmas",
    description: "Organize e acompanhe as turmas da escola.",
    to: "/turmas",
    requiredPermissions: [
      Permissions.USER_VIEW_ALL, // quem pode ver usuários pode ver turmas
    ],
  },
  {
    icon: <MeetingRoomIcon className="text-accent" />,
    title: "Espaços & Mídias",
    description: "Gerencie ambientes (biblioteca, auditório) e equipamentos.",
    to: "/recursos",
    requiredPermissions: [
      Permissions.SPACES_VIEW_ALL,
      Permissions.SPACES_RESERVATE,
    ],
  },
  {
    icon: <FactCheckIcon className="text-accent" />,
    title: "Frequência",
    description: "Realize chamadas e acompanhe a presença dos alunos.",
    to: "/frequencia",
    requiredPermissions: [
      Permissions.OCCURRENCES_CREATE, // professores que fazem ocorrências também fazem chamada
      Permissions.REPORTS_VIEW_ALL,
      Permissions.REPORTS_VIEW_OWN_CLASSROOM,
    ],
  },
  {
    icon: <MenuBookIcon className="text-accent" />,
    title: "Central Pedagógica",
    description: "Planos de aula, banco de questões, atividades e resoluções.",
    to: "/pedagogico",
    requiredPermissions: [], // visível para todos — funcionalidade futura
  },
  {
    icon: <EventIcon className="text-accent" />,
    title: "Eventos",
    description: "Crie e acompanhe eventos e atividades escolares.",
    to: "/eventos",
    requiredPermissions: [], // visível para todos — funcionalidade futura
  },
];
