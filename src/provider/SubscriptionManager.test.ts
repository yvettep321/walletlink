import { mockExtensionProvider } from "../__mocks__/provider";
import { MOCK_ADDERESS } from "../fixtures/provider";
import { Web3Method } from "../relay/Web3Method";
import { AddressString } from "../types";
import { SubscriptionManager } from "./SubscriptionManager";

describe("SubscriptionManager", () => {
  const subscription = new SubscriptionManager(mockExtensionProvider);

  test("@handleRequest", async () => {
    await expect(
      subscription.handleRequest({
        method: Web3Method.requestEthereumAccounts,
        params: [AddressString(MOCK_ADDERESS)],
      }),
    ).resolves.toEqual({});

    subscription.events.on("notification", message => {
      subscription.events.emit("message", {
        type: message.method,
        data: message.params,
      });
    });

    expect(subscription.events).toBeDefined();
  });

  test("@destroy", () => {
    subscription.destroy();

    // TODO: Fill me in
  });
});
