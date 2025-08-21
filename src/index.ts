import { serve } from "@hono/node-server";
import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";
import { createMcpServer } from "./mcp/server.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, MCP Server is available at /mcp");
});

app.all("/mcp", async (c) => {
  // mcpサーバーを作成
  const mcpServer = createMcpServer();
  // 通信に利用するTransportを作成
  const transport = new StreamableHTTPTransport();
  // mcpサーバーに接続
  await mcpServer.connect(transport);
  // mcpサーバーへリクエストを送り、結果を返却
  return transport.handleRequest(c);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
