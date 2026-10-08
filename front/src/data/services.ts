import type { LucideIcon } from "lucide-react";
import {  HeartPulse, Stethoscope, ScanLine, Activity, Baby, Brain } from "lucide-react";

export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  schedule: string;
  appointmentAvailable: boolean;
  icon: LucideIcon;
  featured: boolean;
}

export const services: Service[] = [
   {
    id: 1,
    slug: "consultorios-externos",
    title: "Consultorios Externos",
    description:
      "Ofrecemos atención en múltiples consultorios con tecnología moderna y equipos interdisciplinarios.",
    longDescription:
      "Nuestros consultorios externos están destinados a la atención médica ambulatoria, brindando un espacio para consultas, controles de salud y seguimiento de pacientes. Buscamos ofrecer una atención cercana, profesional y centrada en las necesidades de cada persona.",
    features: [
      "Consultas médicas programadas",
      "Controles y seguimiento de pacientes",
      "Atención médica ambulatoria",
      "Orientación para estudios y tratamientos",
    ],
    schedule: "Consultar horarios disponibles",
    appointmentAvailable: true,
    icon: HeartPulse,
    featured: false,
  },
  {
    id: 2,
    slug: "guardia",
    title: "Servicio de Guardia",
    description:
      "Disponible las 24 horas, todo el año, con atención médica en distintas especialidades.",
    longDescription:
      "El servicio de guardia está orientado a la evaluación y atención de pacientes que requieren asistencia médica inmediata. Nuestro objetivo es brindar una respuesta oportuna, priorizando la atención según la urgencia de cada situación.",
    features: [
      "Atención médica de urgencias",
      "Evaluación inicial del paciente",
      "Atención según el nivel de urgencia",
      "Orientación para la continuidad de la atención",
    ],
    schedule: "Las 24 horas, todos los días",
    appointmentAvailable: false,
    icon: Stethoscope,
    featured: false,
  },
  {
    id: 3,
    slug: "diagnostico-por-imagenes",
    title: "Diagnóstico por Imágenes",
    description:
      "Estudios con tecnología avanzada e informes confiables para una atención precisa.",
    longDescription:
      "El diagnóstico por imágenes es una herramienta fundamental para la evaluación médica. Permite obtener información que ayuda a los profesionales de la salud a orientar diagnósticos, realizar controles y definir tratamientos adecuados.",
    features: [
      "Estudios por imágenes según indicación médica",
      "Apoyo al diagnóstico clínico",
      "Seguimiento y control de distintas condiciones",
      "Informes para la evaluación profesional",
    ],
    schedule: "Consultar horarios disponibles",
    appointmentAvailable: false,
    icon: ScanLine,
    featured: false,
  },
  {
    id: 4,
    slug: "internacion",
    title: "Servicio de Internación",
    description:
      "Cuidamos y acompañamos a quienes necesitan seguimiento cercano por enfermedad o cirugía.",
    longDescription:
      "El servicio de internación está destinado a pacientes que necesitan cuidados médicos, observación o seguimiento continuo. Buscamos ofrecer un entorno de atención y acompañamiento durante el proceso de recuperación.",
    features: [
      "Seguimiento de pacientes internados",
      "Atención y cuidados durante la recuperación",
      "Evaluación médica según las necesidades del paciente",
      "Acompañamiento durante la internación",
    ],
    schedule: "Según indicación y organización del servicio",
    appointmentAvailable: false,
    icon: Activity,
    featured: false,
  },
  {
    id: 5,
    slug: "unidad-materno-infantil",
    title: "Unidad Materno Infantil",
    description:
      "Acompañamos a las familias con un enfoque humano y un equipo multidisciplinario.",
    longDescription:
      "La unidad materno infantil está orientada al cuidado de la salud de madres, bebés y niños. Su propósito es acompañar a las familias en las distintas etapas de atención, promoviendo el bienestar y el seguimiento profesional.",
    features: [
      "Atención orientada a la salud materno infantil",
      "Seguimiento de madres y niños",
      "Orientación y acompañamiento a las familias",
      "Atención coordinada según las necesidades del paciente",
    ],
    schedule: "Consultar horarios disponibles",
    appointmentAvailable: false,
    icon: Baby,
    featured: false,
  },
  {
    id: 6,
    slug: "medicina-nuclear",
    title: "Medicina Nuclear",
    description:
      "Realizamos diagnósticos y tratamientos especializados con foco en el bienestar del paciente.",
    longDescription:
      "La medicina nuclear utiliza técnicas especializadas que permiten estudiar determinadas funciones del organismo y contribuir al diagnóstico y tratamiento de distintas enfermedades. Los procedimientos se realizan de acuerdo con la indicación y evaluación médica correspondiente.",
    features: [
      "Evaluaciones especializadas según indicación médica",
      "Estudios funcionales del organismo",
      "Apoyo al diagnóstico de distintas enfermedades",
      "Seguimiento mediante técnicas específicas",
    ],
    schedule: "Consultar disponibilidad del servicio",
    appointmentAvailable: false,
    icon: Brain,
    featured: false,
  },
];