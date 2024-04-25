export interface Query {
  [key: string]: string;
}

export interface GraphqlResult<T> {
  data: T;
  errors?: { message: string }[];
}

export interface GraphqlVariables {
  [key: string]: string | number | boolean | null;
}
