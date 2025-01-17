# @Once - Discord events

It's exactly the same behavior as [@On](/decorators/on) but the method is only executed once

```typescript
import { Discord, On, Once } from "discordx";

@Discord()
abstract class AppDiscord {
  @Once("messageDelete")
  private onMessageDelete() {
    // ...
  }
}
```

## Get the event payload

For each event a list of arguments is injected in your decorated method, you can type this list thanks to the `ArgsOf<"YOUR_EVENT">` type provided by discord.**ts**.

You also receive other useful arguments after that:

1. The event payload (`ArgsOf<"YOUR_EVENT">`)
2. The `Client` instance
3. The [guards](/decorators/guards/) payload

> You should use JS desctructuring for `ArgsOf<"YOUR_EVENT">` like in this example

```typescript
import { Discord, On, Client, ArgsOf } from "discordx";

@Discord()
abstract class AppDiscord {
  @On("messageCreate")
  private onMessage(
    [message]: ArgsOf<"messageCreate">, // Type message automatically
    client: Client, // Client instance injected here,
    guardPayload: any
  ) {
    // ...
  }
}
```
