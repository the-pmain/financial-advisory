/**
 * The vocabulary services fail in. They raise a code, the HTTP layer turns it
 * into a status, so an application service never has to know it is behind HTTP.
 */

export type FailureCode = "invalid" | "unauthorized" | "forbidden" | "not-found" | "conflict" | "unavailable";

export class DomainError extends Error {
  constructor(
    readonly code: FailureCode,
    message: string,
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export function invalid(message: string): DomainError {
  return new DomainError("invalid", message);
}

export function unauthorized(message: string): DomainError {
  return new DomainError("unauthorized", message);
}

export function forbidden(message: string): DomainError {
  return new DomainError("forbidden", message);
}

export function notFound(message: string): DomainError {
  return new DomainError("not-found", message);
}

export function conflict(message: string): DomainError {
  return new DomainError("conflict", message);
}

export function unavailable(message: string): DomainError {
  return new DomainError("unavailable", message);
}
