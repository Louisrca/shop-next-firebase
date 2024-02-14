import { UUID } from "crypto";

export interface User {
  id?: string | UUID | null;
  email?: string | null;
  fisrtname?: string | null;
  lastname?: string | null;
  role?: string | null;
}
