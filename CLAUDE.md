# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server sample built with Hono and TypeScript. The project creates a HTTP-based MCP server that exposes MCP tools via HTTP endpoints.

## Architecture

- **Entry point**: `src/index.ts` - Creates a Hono app with a root endpoint and MCP endpoint
- **MCP Server**: `src/mcp/server.ts` - Defines and configures the MCP server with available tools
- **Transport**: Uses `@hono/mcp` for HTTP transport layer integration

The app serves:
- `/` - Basic status endpoint
- `/mcp` - MCP protocol endpoint that handles MCP requests

## Development Commands

```bash
# Start development server
npm run dev

# Install dependencies
npm install
```

## Project Structure

```
src/
├── index.ts       # Main Hono application and server setup
└── mcp/
    └── server.ts  # MCP server configuration and tool definitions
```

## Key Dependencies

- **hono**: Web framework
- **@hono/mcp**: MCP integration for Hono
- **@hono/node-server**: Node.js adapter for Hono
- **@modelcontextprotocol/sdk**: MCP SDK for server implementation
- **zod**: Schema validation for tool parameters

## Adding New MCP Tools

New tools should be registered in `src/mcp/server.ts` using the `mcpServer.registerTool()` method. Each tool requires:
- Name and metadata (title, description, annotations)
- Input/output schema using Zod
- Handler function that returns content and structured data

## TypeScript Configuration

The project uses strict TypeScript settings with ESNext modules. Key settings:
- `"type": "module"` in package.json for ES modules
- `"module": "nodenext"` for Node.js module resolution
- Strict type checking enabled