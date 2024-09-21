export enum EnvScopeEnum {
  LOCAL = "LOCAL",
  GLOBAL = "GLOBAL",
}

export enum EnvDefaultEnum {
  NAME = "Environment",
}

export interface EnvVariableType {
  key: string;
  value: string;
  checked: boolean;
}

export interface EnvDocumentType {
  id: string;
  environmentId: string;
  workspaceId: string;
  name: string;
  variable: EnvVariableType[];
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface EnvExtractVariableType {
  key: string;
  value: string;
  type: string;
  environment: string;
}

export interface EnvExtractedByWorkspaceType {
  filtered: EnvExtractVariableType[];
  local: EnvDocumentType;
  global: EnvDocumentType;
}

/**
 * Env (Environment) Tab TYPE
 */

export interface EnvTabVariableWrapperType {
  variable: {
    key: string;
    value: string;
    checked: boolean;
  }[];
}

export interface EnvTabVariableScopeWrapperType {
  type: EnvScopeEnum;
}
export interface EnvTabStateType {
  isSaveInProgress: boolean;
}
export interface EnvTabStateWrapperType {
  state: EnvTabStateType;
}
export interface EnvTabItemType
  extends EnvTabVariableScopeWrapperType,
    EnvTabVariableWrapperType,
    EnvTabStateWrapperType {}

export interface EnvTabItemWrapperType {
  environment: EnvTabItemType;
}
