/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './src/interfaces/schema-definition/types';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
};

export type Artist = {
  __typename?: 'Artist';
  artist_id?: Maybe<Scalars['Int']>;
  concert_id?: Maybe<Scalars['Int']>;
  datetime?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type Concert = {
  __typename?: 'Concert';
  artists?: Maybe<Artist>;
  city?: Maybe<Scalars['String']>;
  concert_id?: Maybe<Scalars['Int']>;
  datetime?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  popularity?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type Concerts = {
  __typename?: 'Concerts';
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Edge = {
  __typename?: 'Edge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Concert>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPrevPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  concert?: Maybe<Concert>;
  concerts: Concerts;
};


export type QueryConcertArgs = {
  id: Scalars['Int'];
};


export type QueryConcertsArgs = {
  afterCursor?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type Status = {
  __typename?: 'Status';
  success?: Maybe<Scalars['Boolean']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Artist: ResolverTypeWrapper<Artist>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Concert: ResolverTypeWrapper<Concert>;
  Concerts: ResolverTypeWrapper<Concerts>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Edge: ResolverTypeWrapper<Edge>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  Status: ResolverTypeWrapper<Status>;
  String: ResolverTypeWrapper<Scalars['String']>;
  sortOrder: SortOrder;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Artist: Artist;
  Boolean: Scalars['Boolean'];
  Concert: Concert;
  Concerts: Concerts;
  Date: Scalars['Date'];
  Edge: Edge;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  PageInfo: PageInfo;
  Query: {};
  Status: Status;
  String: Scalars['String'];
}>;

export type ArtistResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = ResolversObject<{
  artist_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  concert_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  datetime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConcertResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Concert'] = ResolversParentTypes['Concert']> = ResolversObject<{
  artists?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  concert_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  datetime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConcertsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Concerts'] = ResolversParentTypes['Concerts']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Edge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Concert']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPrevPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  concert?: Resolver<Maybe<ResolversTypes['Concert']>, ParentType, ContextType, RequireFields<QueryConcertArgs, 'id'>>;
  concerts?: Resolver<ResolversTypes['Concerts'], ParentType, ContextType, RequireFields<QueryConcertsArgs, 'first'>>;
}>;

export type StatusResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Artist?: ArtistResolvers<ContextType>;
  Concert?: ConcertResolvers<ContextType>;
  Concerts?: ConcertsResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Edge?: EdgeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
}>;

