import { PolicyRepositorySqlite } from "../repository/sqlite/policy.js";
import type { PolicyDto } from "@repo/domain/dto/policy.dto.ts";


export class PolicyService {
  constructor(private repo: PolicyRepositorySqlite) {}

  findAll() {
    return this.repo.findAll();
  }

  create(data: PolicyDto) {
    return this.repo.create(data);
  }
}
