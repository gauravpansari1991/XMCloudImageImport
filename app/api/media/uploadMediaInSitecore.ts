import { getToken } from './fetch';
import getSitecoreMediaUrl from './getSitecoreMediaUrl';
import { UploadMedia } from './type';

/**
 * fetch custom Site Info using GraphQL
 * @returns The GraphQL response for Custom Site Info
 */
const uploadMediaInSitecore = async (
  itemName: string,
  externalMediaUrl: string
): Promise<UploadMedia> => {
  // Endpoint
  const endpoint = await getSitecoreMediaUrl(itemName, externalMediaUrl);

  const fetchResponse = await fetch(externalMediaUrl);
  const content = await fetchResponse.blob();

  const splittedUrl = externalMediaUrl.split('/');

  const data = new FormData();
  data.append('file', content, splittedUrl[splittedUrl.length - 1]);

  const getAuthToken = await getToken();

  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${getAuthToken}`,
    },
  });
  const uploadMediaJson = (await response.json()) as UploadMedia;
  return uploadMediaJson;
};

export default uploadMediaInSitecore;
