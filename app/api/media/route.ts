import { NextResponse } from 'next/server';
import fetchMediaFilesInfo from './fetch';
import { modifyMediaInSitecore } from './modifyMediaInSitecore';
import { GraphQLMediaFilesInnerItemResult } from './type';
import { getMockData } from './mock';

export const dynamic = 'force-dynamic'; // defaults to auto
export const revalidate = 0;

export async function GET() {
  
  // Get Sitecore media library files
  const fetchSitecoreData = await fetchMediaFilesInfo(0);
  let newSitecoreMediaList =
    fetchSitecoreData &&
    fetchSitecoreData.data &&
    fetchSitecoreData.data.search &&
    fetchSitecoreData.data.search.results &&
    fetchSitecoreData.data.search.results.length > 0
      ? fetchSitecoreData.data.search.results
      : ([] as GraphQLMediaFilesInnerItemResult[]);
  console.log('fetchSitecoreData length start', fetchSitecoreData.data.search.results.length);
  console.log('fetchSitecoreData count start', fetchSitecoreData.data.search.totalCount);
  if (
    fetchSitecoreData &&
    fetchSitecoreData.data &&
    fetchSitecoreData.data.search &&
    fetchSitecoreData.data.search.results &&
    fetchSitecoreData.data.search.results.length < fetchSitecoreData.data.search.totalCount
  ) {
    const quotient = Math.floor(
      fetchSitecoreData.data.search.totalCount / fetchSitecoreData.data.search.results.length
    );
    const remainder =
      fetchSitecoreData.data.search.totalCount % fetchSitecoreData.data.search.results.length;
    const totalPages = remainder == 0 ? quotient : quotient + 1;
    console.log('totalPages : ', totalPages);
    for (let i = 1; i < totalPages; i++) {
      const sitecoreMediaItems = await fetchMediaFilesInfo(i);
      fetchSitecoreData.data.search.results.concat(sitecoreMediaItems.data.search.results);
      newSitecoreMediaList = fetchSitecoreData.data.search.results.concat(
        sitecoreMediaItems.data.search.results
      );
      console.log('newSitecoreMediaList count', newSitecoreMediaList?.length);
    }
  }
  console.log('newSitecoreMediaList', newSitecoreMediaList);

  // Mock api call to get media files
  const mockData = getMockData();

  const modifyMediaInSitecoreMedia = await modifyMediaInSitecore(
    newSitecoreMediaList,
    mockData.apiResponse
  );

  return NextResponse.json<string>(modifyMediaInSitecoreMedia);
}
