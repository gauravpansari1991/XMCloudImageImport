import { getToken } from './fetch';
import { getMediaPrerenderUrlGraphQL } from './graphql';
import { PreSignedUploadUrl } from './type';

const getSitecoreMediaUrl = async (itemName: string, itemPath: string): Promise<string> => {
  const endpoint = process.env.GRAPH_QL_AUTHORING_ENDPOINT as string;

  const getAuthToken = await getToken();
  const itemNameSplitted = mediaItemName(itemName, itemPath);
  const mediaItemPath = process.env.ADS_MEDIA_IMPORT_ROOT_PATH_WITHOUT_MEDIA + itemNameSplitted;

  const data = {
    query: getMediaPrerenderUrlGraphQL,
    variables: {
      itemPath: mediaItemPath,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken}`,
    },
  });
  const preSignedUploadUrlJson = (await response.json()) as PreSignedUploadUrl;
  return preSignedUploadUrlJson.data &&
    preSignedUploadUrlJson.data.uploadMedia &&
    preSignedUploadUrlJson.data.uploadMedia.presignedUploadUrl
    ? preSignedUploadUrlJson.data.uploadMedia.presignedUploadUrl
    : '';
};

function mediaItemName(itemName: string, itemPath: string) {
  const itemNameSplitted = itemName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '');
  const splittedUrl = itemPath.split('/');
  const nameFromUrl = splittedUrl[splittedUrl.length - 1]
    .split('.')[0]
    .replace(/[^a-zA-Z0-9]/g, '');
  return itemNameSplitted + '-' + nameFromUrl;
}

export default getSitecoreMediaUrl;
