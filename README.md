# Socials

Give Claude superpowers on X, LinkedIn, and Reddit.

```bash
claude mcp add brainrot-creations/claude-plugins
```

That's it. You're done.

---

## What is this?

A Claude Code plugin that connects Claude to the [Socials](https://socials.brainrotcreations.com) browser extension. Claude reads your feed, crafts replies in your voice, posts content, and engages with your audience — all through natural conversation.

**The vibe:** You talk to Claude. Claude talks to your browser. Your browser does the thing.

## Requirements

| Thing | Why |
|-------|-----|
| [Socials extension](https://socials.brainrotcreations.com) | The bridge between Claude and your browser |
| [Claude Code](https://claude.ai/code) | Where the magic happens |
| Node.js 18+ | Runs the MCP server |

## Quick start

**Option 1: Marketplace (recommended)**

```bash
claude mcp add brainrot-creations/claude-plugins
```

**Option 2: Clone it yourself**

```bash
git clone https://github.com/Brainrot-Creations/claude-plugins.git
cd claude-plugins
npm install && npm run build
```

Then add to `~/.claude/settings.json`:

```json
{
  "plugins": ["/path/to/claude-plugins"]
}
```

## What can it do?

Talk to Claude naturally:

- *"What's happening on my X feed?"*
- *"Find interesting AI posts on LinkedIn and reply to a few"*
- *"Post this thread about the project I just shipped"*
- *"Like and bookmark the best posts from today"*

Claude figures out the rest.

## Agents

Invoke with `@socials:agent-name`:

| Agent | What it does |
|-------|--------------|
| **@socials:manager** | Full-service social media manager |
| **@socials:creator** | Crafts posts in your voice |
| **@socials:engage** | Finds posts and writes thoughtful replies |
| **@socials:growth** | Strategy, content calendars, optimization |

## Skills

| Skill | Invocation |
|-------|------------|
| Setup wizard | `/socials:setup` |
| Post something | `/socials:post` |
| View your feed | `/socials:feed` |
| Search posts | `/socials:search` |
| Engage with posts | `/socials:engage` |

## How it works

```
Claude  --stdio-->  MCP Server  --websocket-->  Browser Extension  -->  X/LinkedIn/Reddit
```

1. Claude starts the MCP server
2. Server opens a WebSocket on `127.0.0.1:9847`
3. Socials extension connects automatically
4. Tool calls flow through to control the browser

## Claude Desktop

Add to your config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "socials": {
      "command": "node",
      "args": ["/path/to/claude-plugins/dist/index.cjs"]
    }
  }
}
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 9847 in use | Kill stale node processes, or set `SOCIALS_MCP_RECLAIM_PORT=1` |
| Extension not connecting | Open the Socials side panel once, then reload |
| Tools not working | Make sure you're signed into Socials |

## Project structure

```
claude-plugins/
├── .claude-plugin/     # Plugin manifest, agents, skills, commands
├── src/                # TypeScript source
├── dist/               # Built output
└── package.json
```

## Fork it

```bash
git clone https://github.com/Brainrot-Creations/claude-plugins.git
```

Break it. Rebuild it. Make it yours.

---

**MIT License** — [LICENSE](./LICENSE)

**Security** — [SECURITY.md](./SECURITY.md)

---

<p align="center">
  <sub>Built by <a href="https://brainrotcreations.com">Brainrot Creations</a></sub><br>
  <sub>Open source · Made for fun · No strings attached</sub>
</p>
