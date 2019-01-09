export const ENTITY_USER = "user";
export const ENTITY_SIGNUP = "signup";
/* tslint:disable */

export class TokenRequestAccepted extends Error {}
export class EmailIsNotSpecified extends Error {}

export class RecordNotFound extends Error {
  constructor(public entity: string) {
    super();
  }
}
/* tslint:enable */
