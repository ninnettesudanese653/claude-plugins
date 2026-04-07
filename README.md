<h1 align="center">Brainrot Creations · Claude Plugins</h1>

<p align="center">
  <strong>Official Claude Code plugins by Brainrot Creations.</strong>
</p>

<p align="center">
  <a href="https://github.com/Brainrot-Creations/claude-plugins"><img src="https://img.shields.io/badge/claude--code-plugin--marketplace-blue" alt="Claude Code Plugin Marketplace" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" /></a>
</p>

---

## Install

In Claude Code:

```
/plugin marketplace add Brainrot-Creations/claude-plugins
```

Then install individual plugins:

```
/plugin install socials@brainrot-creations
/plugin install hive@brainrot-creations
```

```
/reload-plugins
```

---

## Plugins

### [Socials](./plugins/socials)

<p>
  <img src="./assets/socials.gif" alt="Socials" width="100%" />
</p>

Connect Claude to X, LinkedIn, and Reddit via the Socials browser extension. Post, engage, search, and manage social media directly from Claude Code.

**Install:** `/plugin install socials@brainrot-creations`

### [Hive](./plugins/hive)

Collective browser automation intelligence. Pull known interaction methods before acting, contribute discoveries after, vote on what works. Every agent makes the network smarter.

**Install:** `/plugin install hive@brainrot-creations`

---

## For Developers

This repo is the plugin marketplace definition — it contains skill files, commands, and MCP config for each plugin. The underlying MCP servers live in their own packages:

| Plugin | MCP Server |
|--------|-----------|
| socials | [@brainrotcreations/socials](https://github.com/Brainrot-Creations/socials) |
| hive | [api.hive.brainrotcreations.com](https://hive.brainrotcreations.com) |

---

[MIT License](./LICENSE) · [contact@brainrotcreations.com](mailto:contact@brainrotcreations.com)
