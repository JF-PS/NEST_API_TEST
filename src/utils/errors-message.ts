import { codeErrors } from '../enum/code-errors.enum';

export interface TError {
  statusCode: number;
  errorMessage: Record<string, string>;
}

export const errorsMessage: Record<keyof typeof codeErrors, TError> = {
  ACCESS_DENIED: {
    statusCode: 401,
    errorMessage: { en: 'Access denied' },
  },
  USER_ALREADY_EXISTS: {
    statusCode: 412,
    errorMessage: { en: 'This user is already registred with the email: ' },
  },
  USER_DONT_HAVE_THE_PERMISSION: {
    statusCode: 404,
    errorMessage: {
      en: "User don't have the permission to access to this functionnality",
    },
  },
  AUTHENTICATION_DENIED: {
    statusCode: 401,
    errorMessage: {
      en: 'Authentification denied, check your password or email.',
    },
  },
  UNAUTHENTICATED: {
    statusCode: 401,
    errorMessage: { en: 'User is not authenticated' },
  },
  USER_NOT_FOUND: {
    statusCode: 401,
    errorMessage: { en: 'No user registred with the email: ' },
  },
  INCORRECT_PASSWORD: {
    statusCode: 401,
    errorMessage: { en: 'Incorrect password' },
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    errorMessage: { en: '500 Internal Server Error: ' },
  },
  SPOT_NOT_FOUND: {
    statusCode: 404,
    errorMessage: { en: 'No spot found with id: ' },
  },
  SPOT_ID_NOT_MATCH_PROFILE_ID: {
    statusCode: 404,
    errorMessage: {
      en: "Spot profile id doesn't match with the current profile id",
    },
  },
  SPOT_ID_MATCH_PROFILE_ID: {
    statusCode: 404,
    errorMessage: {
      en: "Spot ProfileId is the same that your profileId. You can't rate your own spot.",
    },
  },
  RATING_NOT_FOUND: {
    statusCode: 404,
    errorMessage: { en: 'No rating found with id: ' },
  },
  RATING_ID_NOT_MATCH_PROFILE_ID: {
    statusCode: 404,
    errorMessage: {
      en: "Rating profile id doesn't match already with the current profile id",
    },
  },
  RATING_OUT_OF_RANGE: {
    statusCode: 404,
    errorMessage: { en: 'Rate is not include between 1 and 5' },
  },
  FAVORITE_NOT_FOUND: {
    statusCode: 404,
    errorMessage: { en: 'No favorite found with id: ' },
  },
  FAVORITE_ID_NOT_MATCH_PROFILE_ID: {
    statusCode: 404,
    errorMessage: {
      en: "Favorite profile id doesn't match already with the current profile id",
    },
  },
  SPOT_CATEGORY_NOT_MATCH_TAG_CATEGORY: {
    statusCode: 404,
    errorMessage: { en: "Spot category and tag category doesn't match." },
  },
  TAG_NOT_FOUND: {
    statusCode: 404,
    errorMessage: { en: 'No tag found with id: ' },
  },
  TAG_IS_MANDATORY: {
    statusCode: 404,
    errorMessage: { en: 'Tag in spot is mandatory' },
  },
};
