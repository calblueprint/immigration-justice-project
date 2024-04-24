export const ROLE_DESCRIPTIONS = {
  attorney:
    'Attorneys licensed in any state with or without immigration law experience can represent immigrants and asylum-seekers in removal proceeding before the Immigration Court, the Board of Immigration Appeals and the U.S. Court of Appeals for the Ninth Circuit.',
  interpreter:
    'Interpreters and translators can conduct volunteer translation and live interpretation.',
  legal_fellow:
    'Law students and recent graduates awaiting bar results can assist attorneys to screen potential clients, conduct legal and factual research and write motions and briefs in support of on-going court cases.',
};

export const roleOptions = new Map<string, string>([
  ['ATTORNEY', 'Attorney'],
  ['INTERPRETER', 'Interpreter'],
  ['LEGAL_FELLOW', 'Legal Fellow'],
  ['ATTORNEY,INTERPRETER', 'Attorney and Interpreter'],
  ['LEGAL_FELLOW,INTERPRETER', 'Legal Fellow and Interpreter'],
]);
