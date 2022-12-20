# pothos-file-upload-react-vite

Example showing how to upload files via GraphQL

## Steps for recreation

### Backend

1. mkdir backend
2. cd backend
3. yarn init
4. ./node_modules/.bin/tsc --init
5. yarn add @pothos/core @graphql-yoga/node @pothos/plugin-scope-auth @pothos/plugin-validation uuid jsonwebtoken luxon graphql builder-pattern zod
6. yarn add -D ts-node-dev typescript @types/jsonwebtoken @types/node @types/uuid @types/luxon

### Frontend

1. yarn create vite frontend --template react-ts
2. yarn add @mui/material @urql/exchange-multipart-fetch graphql luxon react-router-dom urql @mui/icons-material @emotion/react @emotion/styled notistack builder-pattern immutability-helper
3. yarn add -D @graphql-codegen/cli @graphql-codegen/client-preset @graphql-codegen/typescript-operations @graphql-codegen/typescript-urql @types/luxon sass @types/immutability-helper


## Interesting additional plugins

1. @pothos/plugin-sub-graph
