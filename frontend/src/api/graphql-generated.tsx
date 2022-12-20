import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Dictionary: any;
  File: any;
};

export type BaseData = {
  createdAt: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Book = BaseData & {
  __typename?: 'Book';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['Dictionary']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type BookInput = {
  bookType: BookType;
  file?: InputMaybe<Scalars['File']>;
  id?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['Dictionary']>;
  title: Scalars['String'];
};

export enum BookType {
  Fiction = 'Fiction',
  NonFiction = 'NonFiction'
}

export type Mutation = {
  __typename?: 'Mutation';
  saveBook: Book;
};


export type MutationSaveBookArgs = {
  input: BookInput;
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
  books: Array<Book>;
};


export type QueryBookArgs = {
  id: Scalars['String'];
};


export type QueryBooksArgs = {
  bookType?: InputMaybe<BookType>;
};

export type BookQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BookQuery = { __typename?: 'Query', book?: { __typename?: 'Book', id: string, title: string, image?: string | null, meta?: any | null, userId: string, createdAt: string, updatedAt: string } | null };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', id: string, title: string, image?: string | null }> };

export type SaveBookMutationVariables = Exact<{
  input: BookInput;
}>;


export type SaveBookMutation = { __typename?: 'Mutation', saveBook: { __typename?: 'Book', id: string, title: string } };


export const BookDocument = gql`
    query Book($id: String!) {
  book(id: $id) {
    id
    title
    image
    meta
    userId
    createdAt
    updatedAt
  }
}
    `;

export function useBookQuery(options: Omit<Urql.UseQueryArgs<BookQueryVariables>, 'query'>) {
  return Urql.useQuery<BookQuery, BookQueryVariables>({ query: BookDocument, ...options });
};
export const BooksDocument = gql`
    query Books {
  books {
    id
    title
    image
  }
}
    `;

export function useBooksQuery(options?: Omit<Urql.UseQueryArgs<BooksQueryVariables>, 'query'>) {
  return Urql.useQuery<BooksQuery, BooksQueryVariables>({ query: BooksDocument, ...options });
};
export const SaveBookDocument = gql`
    mutation SaveBook($input: BookInput!) {
  saveBook(input: $input) {
    id
    title
  }
}
    `;

export function useSaveBookMutation() {
  return Urql.useMutation<SaveBookMutation, SaveBookMutationVariables>(SaveBookDocument);
};