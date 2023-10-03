import { ClerkAPIError } from '@clerk/types';

export const instanceOfClerkError = (
  object: any
): object is { errors: ClerkAPIError[] } => {
  return 'errors' in object;
};
