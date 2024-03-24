import { FlowData } from '@/types/misc';

const FLOW_PROLOGUE: FlowData[] = [
  { name: 'Roles', url: 'roles' },
  { name: 'Basic Info', url: 'basic-information' },
  { name: 'Availability', url: 'availability' },
];

const FLOW_EPILOGUE: FlowData[] = [{ name: 'Review & Submit', url: 'review' }];

export const ATTORNEY_FLOW: FlowData[] = [
  ...FLOW_PROLOGUE,
  { name: 'Legal Experience', url: 'legal-experience' },
  ...FLOW_EPILOGUE,
];

export const LEGAL_FELLOW_FLOW: FlowData[] = [
  ...FLOW_PROLOGUE,
  { name: 'Legal Experience', url: 'legal-fellow-experience' },
  ...FLOW_EPILOGUE,
];

export const INTERPRETER_FLOW: FlowData[] = [
  ...FLOW_PROLOGUE,
  ...FLOW_EPILOGUE,
];
