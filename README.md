# 📁 TanStack Drive

A modern, minimal, and full-featured Google Drive clone built with **TanStack Start**, **Clerk**, and **Drizzle ORM**. Users can securely upload, organize, and manage files and folders — with a beautiful, responsive UI and real cloud storage integration.

---

## 🚀 Features

- 🔐 **Authentication** via Clerk (Sign in / Sign up / Auto-onboarding)
- 📁 **File & Folder Management**: Upload and delete
- 📂 **Nested Folders** support
- 📤 **Cloud File Upload** via UploadThing
- ✅ **Safe folder delete** (only if no subfolders exist)
- 🧭 **Smart routing**: `/drive` auto-loads root folder
- 🧼 **Toast notifications** & SweetAlert confirmations
- 🌗 **Responsive + Dark Theme** UI
- ⚡ Built with **TanStack Start** 

---

## 🛠 Tech Stack

| Name                       | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| **TanStack Start**         | Full-stack React framework with routing, query, forms, and SSR support      |
| **Clerk**                  | Authentication and user management (OAuth, onboarding, JWT, etc.)           |
| **UploadThing**            | File upload and handling with secure endpoints                              |
| **Drizzle ORM**            | Type-safe SQL ORM with schema inference, built for modern TypeScript        |
| **SingleStore (via mysql2)** | High-performance SQL database for scalable storage                         |
| **Tailwind CSS + DaisyUI** | Utility-first styling with ready-made UI components                         |
| **React Query**            | Powerful data fetching, caching, and mutations for client/server syncing    |
| **React Router (TanStack)**| File-based routing with layouts and nested routes                           |


---

## 🌐 Live Demo

👉 **[Try TanStack Drive](https://tanstack-drive.netlify.app/)**

![Background](./public/tanstack-background.png)

