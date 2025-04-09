export type Errors = {
  name?: string[];
  email?: string[];
};

export type State = {
  error?: string;
  success?: boolean;
  errors?: Errors;
  message?: string;
};
