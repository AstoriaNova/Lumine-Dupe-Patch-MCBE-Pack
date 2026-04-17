# Lumine-Dupe-Patch-MCBE-Pack

![Minecraft Bedrock](https://img.shields.io/badge/Platform-Minecraft_Bedrock-62B47A?style=flat-square&logo=minecraft&logoColor=white)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)

**Stops the `/.override` dupe from happening.**

> That's it. One job. Does it well.

---

## 📦 What It Does

- ✅ Blocks the `/.override` command exploit
- ✅ Prevents item merging between slots
- ✅ No more duplication

## ❌ What It Doesn't Do

- No extra features
- No configuration
- No commands to run
- No fancy UI

---

## 🎯 How It Works

When a player tries to use `/.override`, this pack intercepts and cancels the command before it can merge items.

```javascript
// The patch in action:
// Player types /.override → Pack blocks it → Nothing happens