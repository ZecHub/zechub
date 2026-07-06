export interface StatusDefinition {
  value: number | string | undefined;
  color?: string | undefined;
  icon: string | undefined;
  label?: string | undefined;
}

export interface StatusProps {
  statusDefinitions: StatusDefinition[] | undefined;
  value: number | string | undefined;
}
