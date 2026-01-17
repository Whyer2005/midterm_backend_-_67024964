import type { PolicyDto } from "@repo/domain/dto/policy.dto.ts";



export class PolicyRepositorySqlite {
  private policies: PolicyDto[] = [];

  findAll() {
    return this.policies;
  }

  create(data: PolicyDto) {
    this.policies.push(data);
    return data;
  }
}
