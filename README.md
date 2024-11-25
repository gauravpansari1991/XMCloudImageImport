## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## About Solution
This solution use to import media files from external link to XMC Sitecore.

This solution right now supports app routing, we'll update it to support page routing soon as well.

Solutions consist of Upload and Delete the media files, and upload/delete supports images and videos both, didn't tested with files but should support those as well.

You need to change following things in .env file to use this solution -
1) GRAPH_QL_AUTHORING_ENDPOINT - update GraphQL AUTHORING endpoint not EDGE one
2) AUTHORING_GRAPHQL_TOKEN_CLIENT_ID - Authoring graphQL Token Client ID
3) AUTHORING_GRAPHQL_TOKEN_CLIENT_SECRET- Authoring graphQL Token Client Secret
4) AUTHORING_GRAPHQL_TOKEN_ENDPOINT_URL - - Authoring graphQL Token Endpoint url
5) MEDIA_IMPORT_ROOT_PATH - Sitecore Media item path where you want to import media files
6) MEDIA_IMPORT_ROOT_PATH_WITHOUT_MEDIA - Sitecore Media item path without sitecore/media library

