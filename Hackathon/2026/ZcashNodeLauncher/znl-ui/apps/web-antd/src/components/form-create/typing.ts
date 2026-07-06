/** Data Dictionary Selector Component Props Type */
export interface DictSelectProps {
  dictType: string; // Dictionary Type
  valueType?: 'bool' | 'int' | 'str'; // Dictionary Value Type
  selectType?: 'checkbox' | 'radio' | 'select'; // Selector type, drop frame, checkbox, single box radio
  formCreateInject?: any;
}

/** Left Drag Button */
export interface MenuItem {
  label: string;
  name: string;
  icon: string;
}

/** Left drag button class */
export interface Menu {
  title: string;
  name: string;
  list: MenuItem[];
}

/** Generic API drop-down component Props type */
export interface ApiSelectProps {
  name: string; // Component Name
  labelField?: string; // Options Label
  valueField?: string; // The value of the option
  url?: string; // url interface
  isDict?: boolean; // Whether Dictionary Selector
}

/** Select component rule configuration type */
export interface SelectRuleOption {
  label: string; // Label Name
  name: string; // Component Name
  icon: string; // Component Icon
  props?: any[]; // Component rules
  event?: any[]; // Event Configuration
}