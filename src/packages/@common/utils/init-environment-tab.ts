import { TabTypeEnum, type Tab } from "@common/types/workspace";
import {
  EnvDefaultEnum,
  EnvScopeEnum,
  type EnvVariableType,
} from "@common/types/workspace/environment";
import { v4 as uuidv4 } from "uuid";

class InitEnvironmentTab {
  private _tab: Tab;
  /**
   *
   * @param _id - Environment mongo id
   * @param _workspaceId - Workspace mongo id to which Environment belongs to
   */
  constructor(_id: string, _workspaceId: string) {
    this._tab = {
      id: _id,
      tabId: uuidv4(),
      name: `New ${EnvDefaultEnum.NAME}`,
      type: TabTypeEnum.ENVIRONMENT,
      description: "",
      source: "USER",
      isDeleted: false,
      activeSync: false,
      property: {
        environment: {
          variable: [
            {
              key: "",
              value: "",
              checked: true,
            },
          ],
          type: EnvScopeEnum.LOCAL,
          state: {
            isSaveInProgress: false,
          },
        },
      },
      path: {
        workspaceId: _workspaceId,
        collectionId: "",
        folderId: "",
      },
      isSaved: true,
      index: 0,
      isActive: true,
      timestamp: new Date().toString(),
    };
    if (!_id || !_workspaceId) {
      console.error(
        "invalid id or workspace id on create new tab environment!",
      );
    }
  }
  public getValue() {
    return this._tab;
  }
  public setId(_id: string) {
    this._tab.id = _id;
    return this;
  }
  public setEnvironmentId(_id: string) {
    this._tab.id = _id;
    return this;
  }
  public setName(_name: string) {
    this._tab.name = _name;
    return this;
  }
  public setDescription(_description: string) {
    this._tab.description = _description;
    return this;
  }
  public setVariable(_variable: EnvVariableType[]) {
    if (this._tab?.property?.environment?.variable) {
      this._tab.property.environment.variable = _variable;
    }
    return this;
  }

  public setType(_type: EnvScopeEnum) {
    if (this._tab?.property?.environment?.type) {
      this._tab.property.environment.type = _type;
    }
    return this;
  }
}

export { InitEnvironmentTab };
