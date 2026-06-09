#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * SpecBoard MCP server. Gives coding agents a prioritized, status-aware view of
 * specs: they see not just the markdown (canonical in git) but the metadata
 * (status, assignee, priority) layered on top from the DB.
 *
 * SCAFFOLD: tool handlers return placeholders. Wire them to `@specboard/db`
 * (read features + spec_index) and `@specboard/git` (read live spec content).
 */
const server = new McpServer({ name: "specboard", version: "0.1.0" });

server.tool(
  "list_features",
  "List features with their metadata, filterable by status/assignee/tag.",
  {
    workspace: z.string().describe("Workspace slug"),
    status: z.string().optional(),
    assignee: z.string().optional(),
  },
  async ({ workspace, status, assignee }) => ({
    content: [
      {
        type: "text",
        text: `list_features(workspace=${workspace}, status=${status ?? "*"}, assignee=${assignee ?? "*"}) — not implemented (scaffold)`,
      },
    ],
  }),
);

server.tool(
  "read_spec",
  "Read a feature's full spec markdown plus its current metadata.",
  { specId: z.string().uuid() },
  async ({ specId }) => ({
    content: [{ type: "text", text: `read_spec(${specId}) — not implemented (scaffold)` }],
  }),
);

server.tool(
  "update_status",
  "Move a feature to a new status (validated against the workflow).",
  { specId: z.string().uuid(), status: z.string() },
  async ({ specId, status }) => ({
    content: [
      { type: "text", text: `update_status(${specId} -> ${status}) — not implemented (scaffold)` },
    ],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("specboard-mcp failed to start:", err);
  process.exit(1);
});
