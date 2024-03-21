import { $ } from "bun";
import { describe, test, expect } from "bun:test";
import { TestBuilder } from "../test_builder";
import { sortedShellOutput } from "../util";
import { join } from "path";

describe("exit", async () => {
  TestBuilder.command`exit`.exitCode(0).runAsTest("works");

  describe("argument sets exit code", async () => {
    for (const arg of [0, 2, 11]) {
      TestBuilder.command`exit ${arg}`.exitCode(arg).runAsTest(`${arg}`);
    }
  });

  TestBuilder.command`exit 3 5`.exitCode(1).stderr("exit: too many arguments").runAsTest("too many arguments");
});