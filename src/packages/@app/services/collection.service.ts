import { getAuthHeaders, makeRequest } from "$lib/api/api.common";
import { CollectionRepository } from "@app/repositories/collection.repository";
import constants from "$lib/utils/constants";
import type {
  CreateApiRequestPostBody,
  CreateCollectionPostBody,
  CreateDirectoryPostBody,
  DeleteRequestName,
  ImportBodyUrl,
  UpdateCollectionName,
} from "$lib/utils/dto";
import { ContentTypeEnum } from "$lib/utils/enums/request.enum";
import { createApiRequest } from "./rest-api.service";

export class CollectionService {
  constructor() {}

  private apiUrl: string = constants.API_URL;
  private collectionRepository = new CollectionRepository();

  public fetchCollection = async (workspaceId: string) => {
    const response = await makeRequest(
      "GET",
      `${this.apiUrl}/api/collection/${workspaceId}`,
      {
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    return response;
  };
  public addCollection = async (collection: CreateCollectionPostBody) => {
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/collection`,
      {
        body: collection,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    return response;
  };

  public updateCollectionData = async (
    collectionId: string,
    workspaceId: string,
    name: UpdateCollectionName,
  ) => {
    const response = await makeRequest(
      "PUT",
      `${this.apiUrl}/api/collection/${collectionId}/workspace/${workspaceId}`,
      {
        body: name,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );

    return response;
  };

  public deleteCollection = async (
    workspaceId: string,
    collectionId: string,
  ) => {
    const response = await makeRequest(
      "DELETE",
      `${this.apiUrl}/api/collection/${collectionId}/workspace/${workspaceId}`,
      { headers: { ...getAuthHeaders(), version: "1" } },
    );

    return response;
  };

  public addFolderInCollection = async (
    workspaceId: string,
    collectionId: string,
    folder: CreateDirectoryPostBody,
  ) => {
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/collection/${collectionId}/workspace/${workspaceId}/folder`,
      {
        body: folder,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    return response;
  };

  public updateFolderInCollection = async (
    workspaceId: string,
    collectionId: string,
    folderId: string,
    folder: CreateDirectoryPostBody,
  ) => {
    const response = await makeRequest(
      "PUT",
      `${this.apiUrl}/api/collection/${collectionId}/workspace/${workspaceId}/folder/${folderId}`,
      {
        body: folder,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );

    return response;
  };

  public deleteFolderInCollection = async (
    workspaceId: string,
    collectionId: string,
    folderId: string,
    body,
  ) => {
    const response = await makeRequest(
      "DELETE",
      `${this.apiUrl}/api/collection/${collectionId}/workspace/${workspaceId}/folder/${folderId}`,
      {
        body,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    return response;
  };

  public addRequestInCollection = async (
    apiRequest: CreateApiRequestPostBody,
  ) => {
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/collection/request`,
      {
        body: apiRequest,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    return response;
  };

  public updateRequestInCollection = async (
    requestId: string,
    requestBody: CreateApiRequestPostBody,
  ) => {
    const response = await makeRequest(
      "PUT",
      `${this.apiUrl}/api/collection/request/${requestId}`,
      {
        body: requestBody,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );

    return response;
  };

  public deleteRequestInCollection = async (
    requestId: string,
    deleteRequestBody: DeleteRequestName,
  ) => {
    const response = await makeRequest(
      "DELETE",
      `${this.apiUrl}/api/collection/request/${requestId}`,
      {
        body: deleteRequestBody,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    if (response.isSuccessful) {
      if (
        deleteRequestBody.folderId &&
        deleteRequestBody.collectionId &&
        deleteRequestBody.workspaceId
      ) {
        await this.collectionRepository.deleteRequestInFolder(
          deleteRequestBody.collectionId,
          deleteRequestBody.folderId,
          requestId,
        );
      } else if (
        deleteRequestBody.workspaceId &&
        deleteRequestBody.collectionId
      ) {
        await this.collectionRepository.deleteRequestOrFolderInCollection(
          deleteRequestBody.collectionId,
          requestId,
        );
      }
    }
    return response;
  };

  public validateImportCollectionInput = async (
    data: string = "",
    jsonXml = "",
  ) => {
    const response = await makeRequest("POST", `${this.apiUrl}/validate/oapi`, {
      body: jsonXml,
      headers: {
        ...getAuthHeaders(),
        "x-oapi-url": data,
        version: "1",
        "Content-type": ContentTypeEnum["application/json"],
      },
    });
    return response;
  };

  public validateImportCollectionURL = async (url = "") => {
    return createApiRequest(
      [
        url,
        `GET`,
        `Accept[SPARROW_EQUALS]*/*[SPARROW_AMPERSAND]Connection[SPARROW_EQUALS]keep-alive`,
        ``,
        `TEXT`,
      ],
      ``,
    );
  };

  public importCollection = async (
    workspaceId: string,
    url: ImportBodyUrl,
    activeSync: boolean = false,
  ) => {
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/workspace/${workspaceId}/importUrl/collection`,
      {
        body: { ...url, activeSync },
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    return response;
  };

  public switchCollectionBranch = async (
    collectionId: string,
    branchName: string,
  ) => {
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/collection/${collectionId}/branch`,
      {
        body: {
          branchName,
        },
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );
    return response;
  };

  public importCollectionFile = async (workspaceId: string, file) => {
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/workspace/${workspaceId}/importFile/collection`,
      {
        body: file,
        headers: { ...getAuthHeaders(), version: "1" },
      },
    );

    return response;
  };

  public importCollectionFromJsonObject = async (
    workspaceId: string,
    jsonObject: string,
    contentType: ContentTypeEnum,
  ) => {
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/workspace/${workspaceId}/importJson/collection`,
      {
        body: jsonObject,
        headers: {
          ...getAuthHeaders(),
          version: "1",
          "Content-type": contentType,
        },
      },
    );
    return response;
  };
  public importCollectionFromFile = async (workspaceId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const contentType: ContentTypeEnum = ContentTypeEnum["multipart/form-data"];
    const response = await makeRequest(
      "POST",
      `${this.apiUrl}/api/workspace/${workspaceId}/importFile/collection`,
      {
        body: formData,
        headers: {
          ...getAuthHeaders(),
          version: "1",
          "Content-type": contentType,
        },
      },
    );
    return response;
  };

  public importCollectionFromCurl = async (curl: string) => {
    const response = await makeRequest("POST", `${this.apiUrl}/curl`, {
      body: {
        curl: curl,
      },
      headers: {
        ...getAuthHeaders(),
        version: "1",
        "Content-type": ContentTypeEnum["application/x-www-form-urlencoded"],
      },
    });
    return response;
  };
}
