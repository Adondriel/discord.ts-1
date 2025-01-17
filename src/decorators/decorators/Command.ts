import { MetadataStorage } from "../..";
import { MethodDecoratorEx } from "../../types/public/decorators";
import { DCommand } from "../classes/DCommand";
import { CommandParams } from "../params/CommandParams";

const testName = RegExp(/^[a-z0-9]+$/);

export function Command(): MethodDecoratorEx;
export function Command(name: string): MethodDecoratorEx;
export function Command(name: string, params: CommandParams): MethodDecoratorEx;
export function Command(name?: string, params?: CommandParams) {
  return function (target: Record<string, any>, key: string) {
    name = name ?? key;
    name = name.toLocaleLowerCase();
    if (!testName.test(name)) throw Error("invalid command name");
    if (params?.aliases) {
      if (params.aliases.some((name) => !testName.test(name))) {
        throw Error("invalid command alias");
      }
    }

    const cmd = DCommand.create(
      name,
      params?.description,
      params?.argSplitter,
      params?.directMessage,
      params?.defaultPermission,
      params?.guilds,
      params?.botIds,
      params?.aliases
    ).decorate(target.constructor, key, target[key]);

    MetadataStorage.instance.addCommand(cmd);
  };
}
