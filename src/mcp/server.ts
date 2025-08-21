import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/** MCPサーバーを作成する関数 */
export function createMcpServer() {
  const mcpServer = new McpServer({
    name: "my-mcp-server",
    version: "1.0.0",
  });

  // MCPサーバーから呼び出すことができるツールの定義
  // 足し算を行うtoolを定義する
  mcpServer.registerTool(
    "add",
    {
      // ツール名
      title: "Add Numbers",
      // ツールの説明
      description: "Adds two numbers together.",
      // ツールの情報
      annotations: {
        readOnlyHint: true, // 外部の状態を変更しない
        openWorldHint: false, // 外部システムと接続しない
      },
      // ツールの引数
      inputSchema: {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
      },
      // ツールの出力形式
      outputSchema: {
        result: z.number().describe("The sum of the two numbers"),
      },
    },
    ({ a, b }) => {
      // 足し算 a+bを計算
      const structuredContent = {
        result: a + b,
      };

      // textとstructuredContentを以下の形で返却する
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        structuredContent,
      };
    }
  );

  return mcpServer;
}
