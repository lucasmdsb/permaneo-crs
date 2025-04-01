const modalities = {
  presencial: 'Presencial',
  remote: 'Remoto',
  hybrid: 'Híbrido',
};

const opportunityTypes = {
  replace: 'Substituição',
  increase: 'Aumento de quadro',
  expansion: 'Expansão'
};

const phases = {
  curriculum: 'Currículo',
  triage: 'Triagem',
  selection: 'Seleção em grupo',
  individual: 'Entrevista Individual',
  people: 'Entrevista com RH',
  leader: 'Entrevista com Liderança',
  test: 'Testes e desafios',
  proposal: 'Proposta',
  hiring: 'Contratação',
};

const phaseTypes = {
  empty: 'Sem ação',
  meeting: 'Reunião de vídeo',
  evaluation: 'Teste',
};

const permissions = {
  admin: 'Administrador',
  rh: 'RH',
  manager: 'Gestor',
  candidate: 'Candidato',
};

const languageLevels = {
  basic: 'Nível básico',
  basic_intermediary: 'Nível básicao-intermediário',
  intermediary: 'Nível intermediário',
  advanced: 'Nível avançado',
  fluent_or_native: 'Fluente ou nativo',
};

const additionalType = {
  course: 'Curso',
};

const documentType = {
  curriculum: 'Currículo',
};

type DocumentType = keyof typeof documentType;
type AdditionalType = keyof typeof additionalType;
type LanguageLevel = keyof typeof languageLevels;
type Modality = keyof typeof modalities;
type OpportunityType = keyof typeof opportunityTypes;
type Phase = keyof typeof phases;
type PhaseType = keyof typeof phaseTypes;
type Permissions = keyof typeof permissions;

export const translate = {
  additionalType: (data: AdditionalType) => additionalType[data],
  documentType: (data: DocumentType) => documentType[data],
  languageLevel: (data: LanguageLevel) => languageLevels[data],
  modality: (data: Modality) => modalities[data],
  opportunityType: (data: OpportunityType) => opportunityTypes[data],
  phase: (data: Phase) => phases[data],
  permission: (data: Permissions) => permissions[data],
  phaseType: (data: PhaseType) => phaseTypes[data],
};
